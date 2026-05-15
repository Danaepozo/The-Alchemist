import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import Anthropic from '@anthropic-ai/sdk'
import { ORION_SYSTEM_PROMPT } from '@/lib/orion/knowledge-base'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const { patient_id, session_date } = await req.json()

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const [patientRes, protocolsRes, sessionsRes, labsRes, alertsRes] = await Promise.all([
      supabase.from('orion_patients').select('*').eq('id', patient_id).single(),
      supabase.from('orion_protocols').select('*').eq('patient_id', patient_id).eq('status', 'active'),
      supabase.from('orion_sessions').select('*').eq('patient_id', patient_id).order('session_date', { ascending: false }).limit(5),
      supabase.from('orion_labs').select('*').eq('patient_id', patient_id).order('test_date', { ascending: false }).limit(5),
      supabase.from('orion_alerts').select('*').eq('patient_id', patient_id).eq('acknowledged', false),
    ])

    const patient = patientRes.data
    const protocols = protocolsRes.data || []
    const sessions = sessionsRes.data || []
    const labs = labsRes.data || []
    const alerts = alertsRes.data || []

    const userMessage = `Generate a pre-session brief for this patient:

PATIENT: ${patient?.full_name}
Date of Birth: ${patient?.date_of_birth}
Gender: ${patient?.gender}
Blood Type: ${patient?.blood_type}
Allergies: ${(patient?.allergies || []).join(', ') || 'None'}
Conditions: ${(patient?.conditions || []).join(', ') || 'None'}
External Medications: ${(patient?.medications || []).join(', ') || 'None'}

ACTIVE PROTOCOLS (${protocols.length}):
${protocols.map(p => `- ${p.protocol_name}: ${p.dose} ${p.dose_unit} ${p.frequency} via ${p.route || 'N/A'} (started ${p.start_date}${p.end_date ? `, ends ${p.end_date}` : ''})`).join('\n') || 'None'}

RECENT SESSIONS (last 5):
${sessions.map(s => `- ${s.session_date}: ${s.session_type} — ${s.chief_complaint || 'No complaint noted'}`).join('\n') || 'None'}

RECENT LABS:
${labs.map(l => `- ${l.test_date}: ${l.test_type} — ${JSON.stringify(l.results)}`).join('\n') || 'None'}

PENDING ALERTS (${alerts.length}):
${alerts.map(a => `- [${a.severity.toUpperCase()}] ${a.title}: ${a.message}`).join('\n') || 'None'}

Session date: ${session_date}`

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      system: ORION_SYSTEM_PROMPT + `\n\nGenerate the pre-session brief in this EXACT format:

## PRE-SESSION BRIEF — [Patient Name] — [Date]

### 🔬 Active Protocols ([count])
[List each protocol: name | dose | frequency | started]

### 📊 Clinical Status
[2-3 sentences on current therapeutic status and trends]

### ⚠️ Alerts ([count])
[Priority ordered, CRITICAL first. If none: "No pending alerts."]

### ✅ Contraindication Check
[Either CLEARED or specific concerns with clinical reasoning]

### 🎯 Recommendations for Today's Session
[3-5 specific, actionable items for this patient today]

---
ORION · The Alchemist Miami · Confidential Medical Record`,
      messages: [{ role: 'user', content: userMessage }],
    })

    const briefing = response.content[0].type === 'text' ? response.content[0].text : ''

    return NextResponse.json({ briefing })
  } catch (error) {
    console.error('Briefing error:', error)
    return NextResponse.json({ error: 'Failed to generate briefing' }, { status: 500 })
  }
}

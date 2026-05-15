import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import Anthropic from '@anthropic-ai/sdk'
import { CONTRAINDICATIONS_SYSTEM_PROMPT } from '@/lib/orion/knowledge-base'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const { patient_id, new_protocol } = await req.json()

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const [patientRes, protocolsRes] = await Promise.all([
      supabase.from('orion_patients').select('*').eq('id', patient_id).single(),
      supabase.from('orion_protocols').select('*').eq('patient_id', patient_id).eq('status', 'active'),
    ])

    const patient = patientRes.data
    const protocols = protocolsRes.data || []

    const userMessage = `Check this patient profile for contraindications and safety issues:

PATIENT: ${patient?.full_name}
Date of Birth: ${patient?.date_of_birth}
Allergies: ${(patient?.allergies || []).join(', ') || 'None'}
Medical Conditions: ${(patient?.conditions || []).join(', ') || 'None'}
External Medications: ${(patient?.medications || []).join(', ') || 'None'}

CURRENT ACTIVE PROTOCOLS (${protocols.length}):
${protocols.map(p => `- ${p.protocol_name} (${p.category}): ${p.dose} ${p.dose_unit} ${p.frequency} — started ${p.start_date}`).join('\n') || 'None'}

${new_protocol ? `NEW PROTOCOL BEING ADDED: ${new_protocol}

Check if this new protocol is safe to add given the patient's current profile and existing protocols.` : 'Review all current protocols for safety issues.'}

Today's date: ${new Date().toISOString().split('T')[0]}

Respond ONLY with valid JSON in the exact format specified.`

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      system: CONTRAINDICATIONS_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMessage }],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : '{}'

    let result
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      result = jsonMatch ? JSON.parse(jsonMatch[0]) : { cleared: false, issues: [], analysis: text }
    } catch {
      result = { cleared: false, issues: [], analysis: text }
    }

    // Auto-create alerts for CRITICAL/HIGH issues
    if (!result.cleared && result.issues?.length > 0) {
      const criticalIssues = result.issues.filter((i: { severity: string }) => ['CRITICAL', 'HIGH'].includes(i.severity))
      for (const issue of criticalIssues) {
        await supabase.from('orion_alerts').insert({
          patient_id,
          alert_type: 'contraindication',
          severity: issue.severity.toLowerCase(),
          title: `Contraindication: ${issue.protocols?.join(' + ') || 'Protocol conflict'}`,
          message: issue.action || issue.issue,
        })
      }
    }

    // Save check record
    await supabase.from('orion_contraindication_checks').insert({
      patient_id,
      cleared: result.cleared,
      issues_found: result.issues,
      ai_analysis: result.analysis,
    })

    return NextResponse.json({ ...result, checked_at: new Date().toISOString() })
  } catch (error) {
    console.error('Contraindication check error:', error)
    return NextResponse.json({ error: 'Check failed' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const patient_id = req.nextUrl.searchParams.get('patient_id')
  if (!patient_id) return NextResponse.json({ error: 'patient_id required' }, { status: 400 })

  const fakeReq = new Request(req.url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ patient_id }),
  })
  return POST(new NextRequest(fakeReq))
}

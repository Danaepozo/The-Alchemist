import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import Anthropic from '@anthropic-ai/sdk'
import { ORION_SYSTEM_PROMPT } from '@/lib/orion/knowledge-base'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function POST(req: NextRequest) {
  try {
    const { lab_id, patient_id } = await req.json()
    const supabase = getSupabase()

    const [patientRes, labRes, protocolsRes, allLabsRes] = await Promise.all([
      supabase.from('orion_patients').select('*').eq('id', patient_id).single(),
      supabase.from('orion_labs').select('*').eq('id', lab_id).single(),
      supabase.from('orion_protocols').select('*').eq('patient_id', patient_id).eq('status', 'active'),
      supabase.from('orion_labs').select('panel_name, test_date, lab_values').eq('patient_id', patient_id).order('test_date', { ascending: false }).limit(5),
    ])

    const patient = patientRes.data
    const lab = labRes.data
    if (!patient || !lab) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const labValues = (lab.lab_values || []) as Array<{
      marker: string; value: string; unit: string; reference_range: string; flag: string
    }>

    const abnormalValues = labValues.filter(v => v.flag === 'H' || v.flag === 'L')

    const patientContext = `
PATIENT: ${patient.full_name}
Age: ${patient.date_of_birth ? Math.floor((Date.now() - new Date(patient.date_of_birth).getTime()) / (365.25 * 24 * 60 * 60 * 1000)) : 'Unknown'} years old
Gender: ${patient.gender || 'Unknown'}
Blood type: ${patient.blood_type || 'Unknown'}
Conditions: ${(patient.conditions || []).join(', ') || 'None reported'}
Allergies: ${(patient.allergies || []).join(', ') || 'None reported'}
Current medications: ${(patient.medications || []).join(', ') || 'None reported'}
Active ORION protocols: ${(protocolsRes.data || []).map((p: { protocol_name: string; dose: string; dose_unit: string }) => `${p.protocol_name} ${p.dose}${p.dose_unit}`).join(', ') || 'None'}

CURRENT LAB PANEL: ${lab.panel_name} — ${lab.test_date}
${labValues.map(v => `  ${v.marker}: ${v.value} ${v.unit} (ref: ${v.reference_range || 'N/A'}) ${v.flag ? `[${v.flag}]` : ''}`).join('\n')}

ABNORMAL VALUES: ${abnormalValues.length === 0 ? 'All within range' : abnormalValues.map(v => `${v.marker} ${v.value} ${v.unit} [${v.flag}]`).join(', ')}

PREVIOUS LABS (for trend analysis):
${(allLabsRes.data || []).filter((l: { test_date: string }) => l.test_date !== lab.test_date).slice(0, 3).map((l: { panel_name: string; test_date: string; lab_values: Array<{ marker: string; value: string; unit: string }> }) => `  ${l.panel_name} (${l.test_date}): ${(l.lab_values || []).slice(0, 5).map(v => `${v.marker} ${v.value}`).join(', ')}`).join('\n') || '  No previous labs on record'}
`

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      system: ORION_SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Analyze these lab results for Dr. Meighen. Provide a clinical interpretation using your full knowledge as ORION.

${patientContext}

Respond with ONLY a valid JSON object (no markdown):
{
  "summary": "2-3 sentence overall clinical summary",
  "findings": [
    {
      "marker": "marker name",
      "value": "value + unit",
      "flag": "H/L/N",
      "significance": "clinical meaning in 1-2 sentences",
      "recommendation": "specific action or protocol suggestion"
    }
  ],
  "deficiencies": ["list of identified deficiencies or suboptimal levels"],
  "patterns": "description of any clinical patterns seen across multiple markers (e.g. inflammation, hormonal imbalance, metabolic dysfunction)",
  "suggested_protocols": ["specific protocol names from Dr. Meighen's catalog that are indicated"],
  "alerts": [
    {
      "severity": "critical/high/medium/low",
      "title": "short alert title",
      "message": "detailed alert message for Dr. Meighen"
    }
  ],
  "follow_up_tests": ["additional tests recommended based on these findings"],
  "overall_score": "Optimal/Good/Suboptimal/Concerning/Critical"
}

Include ALL abnormal values in findings. Only include alerts for values that need Dr. Meighen's attention. Be clinically precise — this is for a physician.`,
        },
      ],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    const analysis = JSON.parse(cleaned)

    // Save analysis to lab record
    await supabase.from('orion_labs').update({ ai_analysis: JSON.stringify(analysis) }).eq('id', lab_id)

    // Auto-create alerts for critical/high findings
    const alertsToCreate = (analysis.alerts || []).filter((a: { severity: string }) =>
      a.severity === 'critical' || a.severity === 'high'
    )

    if (alertsToCreate.length > 0) {
      await supabase.from('orion_alerts').insert(
        alertsToCreate.map((a: { severity: string; title: string; message: string }) => ({
          patient_id,
          alert_type: 'lab_finding',
          severity: a.severity,
          title: a.title,
          message: `[${lab.panel_name} · ${lab.test_date}] ${a.message}`,
          acknowledged: false,
        }))
      )
    }

    return NextResponse.json({ analysis, alerts_created: alertsToCreate.length })
  } catch (err) {
    console.error('Lab analysis error:', err)
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 })
  }
}

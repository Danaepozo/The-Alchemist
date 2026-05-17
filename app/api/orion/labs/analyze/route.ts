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
          content: `Analyze these lab results for Dr. Meighen using your complete functional medicine knowledge base as ORION.

${patientContext}

CRITICAL INSTRUCTION: Apply FUNCTIONAL MEDICINE optimal ranges, NOT just conventional lab reference ranges. Flag values that are within conventional "normal" but outside functional optimal. For example:
- Fasting insulin >6 µIU/mL = flag even if lab says "normal" (<25)
- TSH >2.0 = flag as suboptimal even if lab says "normal" (<4.0)
- Vitamin D <50 ng/mL = flag even if lab says "normal" (>20)
- Homocysteine >7 µmol/L = flag even if lab says "normal" (<15)
- hs-CRP >0.5 mg/L = flag for functional inflammation
- Fasting glucose >85 mg/dL = early metabolic dysfunction signal
- Triglycerides >80 mg/dL = suboptimal
- RBC Magnesium <5.5 mg/dL = functional deficiency
Also recognize clinical PATTERNS across multiple markers (insulin resistance pattern, HPA burnout, methylation dysfunction, leaky gut cascade, neuroinflammation, estrogen dominance, etc.)
Consider cancer prevention markers and early warning signs.
Use your knowledge of the Organic Acids Test, DUTCH, GI-MAP, and advanced cardiovascular markers to provide deep interpretation.

Respond with ONLY a valid JSON object (no markdown):
{
  "summary": "2-3 sentence overall clinical summary using functional medicine lens",
  "functional_vs_conventional": "explain any values that are conventionally 'normal' but functionally suboptimal — this is key for patient education",
  "findings": [
    {
      "marker": "marker name",
      "value": "value + unit",
      "flag": "H/L/N/SUBOPTIMAL",
      "significance": "clinical meaning using functional medicine knowledge in 2-3 sentences",
      "recommendation": "specific action, protocol, or supplement from Dr. Meighen's catalog"
    }
  ],
  "deficiencies": ["list of identified deficiencies or suboptimal levels with functional ranges noted"],
  "patterns": "describe any clinical constellations seen: insulin resistance pattern, HPA burnout, methylation dysfunction, cardiovascular precision risk, leaky gut/inflammation cascade, estrogen metabolism issues, neuroinflammation, etc.",
  "cancer_prevention_notes": "any markers relevant to cancer prevention or early detection (estrogen metabolism, insulin, inflammatory markers, specific tumor markers)",
  "suggested_protocols": ["specific protocol names from Dr. Meighen's catalog that are clinically indicated"],
  "alerts": [
    {
      "severity": "critical/high/medium/low",
      "title": "short alert title",
      "message": "detailed alert message for Dr. Meighen"
    }
  ],
  "follow_up_tests": ["specific additional tests recommended — prioritize functional medicine tests like DUTCH, GI-MAP, OAT, epigenetic age, ApoB, Lp(a), etc. that would give more clinical data"],
  "overall_score": "Optimal/Good/Suboptimal/Concerning/Critical",
  "longevity_assessment": "brief assessment of what these labs tell us about the patient's biological aging trajectory"
}

Be clinically precise and deep — this is for Dr. Meighen who practices precision/functional medicine. Don't just repeat what the lab says. Interpret it through the lens of optimal health and longevity prevention.`,
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

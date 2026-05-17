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
          content: `You are ORION — the world's most advanced functional medicine AI, built specifically for Dr. Michael J. Meighen MD at The Alchemist Miami. Perform a DEEP, 10X-level clinical analysis of these lab results.

${patientContext}

═══ ANALYSIS FRAMEWORK ═══

STEP 1 — FUNCTIONAL LENS (MANDATORY):
Apply FUNCTIONAL MEDICINE optimal ranges — NOT conventional lab ranges. The conventional range includes sick people. Flag EVERYTHING outside functional optimal even if "normal" conventionally:
• Fasting insulin: functional optimal 2-6 µIU/mL (>6 = early IR; >10 = significant; >15 = severe)
• TSH: functional optimal 0.5-2.0 (>2.5 with symptoms = subclinical hypothyroid)
• Free T3: functional optimal 3.2-4.4 pg/mL (lower = impaired conversion despite normal TSH)
• Vitamin D: functional optimal 50-80 ng/mL (conventional says >20 is fine — WRONG)
• Homocysteine: functional optimal <7 µmol/L (>8 = methylation issue + Alzheimer's risk)
• hs-CRP: functional optimal <0.5 mg/L (conventional <3.0 = massive gap)
• Fasting glucose: functional optimal 72-85 mg/dL (>90 = insulin resistance signal)
• Triglycerides: functional optimal <80 mg/dL (>100 = metabolic dysfunction)
• RBC Magnesium: functional optimal 5.5-6.8 mg/dL (serum Mg is useless)
• GGT: functional optimal <20 men, <15 women (conventional <56 = dangerously permissive)
• ALT: functional optimal <20 (conventional <56 = misses early NAFLD)
• Ferritin: functional optimal 50-150 (both low AND high are problems)
• ApoB: functional essential <80 mg/dL (LDL alone is insufficient)
• Uric acid: functional optimal <5.5 men, <4.5 women
• Omega-3 Index: functional optimal >8% (most people are 4-5%)
• TG/HDL ratio: functional optimal <1.0 (>2.0 = insulin resistance)

STEP 2 — PATTERN RECOGNITION:
Identify CONSTELLATIONS of findings, not just individual markers. Look for:
→ INSULIN RESISTANCE PATTERN: insulin >6 + TG >100 + TG/HDL >2 + glucose >90 + uric acid elevated + waist circumference (if noted)
→ METHYLATION DYSFUNCTION: homocysteine >8 + low B12 + elevated MMA + MTHFR context + mood/cognitive symptoms
→ HYPOTHYROID (MISSED): TSH 2.5-4.0 + low fT3 (<3.2) + elevated rT3 + elevated TPO + symptoms
→ HPA BURNOUT: low/flat cortisol + low DHEA-S + high rT3 (conversion block) + immune suppression pattern
→ CARDIOVASCULAR PRECISION RISK: ApoB + Lp(a) + oxLDL + hs-CRP + homocysteine + TMAO constellation
→ LEAKY GUT CASCADE: zonulin + LPS + calprotectin + systemic inflammation + food sensitivities pattern
→ ESTROGEN DOMINANCE/POOR METABOLISM: E2/E1 imbalance + poor 2-OH/16-OH ratio + high beta-glucuronidase + symptoms
→ MOLD/CIRS: TGF-beta1 + C4a + low MSH/VIP + low VEGF + treatment-resistant symptoms
→ MCAS/HISTAMINE: elevated tryptase/histamine/DAO deficiency + multi-system symptoms
→ MITOCHONDRIAL DYSFUNCTION: OAT Krebs cycle + CoQ10 + fatigue + brain fog
→ NEUROINFLAMMATION: homocysteine >10 + low omega-3 + elevated p-tau + low BDNF + APOE4
→ MOLD/BIOTOXIN: mycotoxins + TGF-beta1 + C4a + MSH + VIP
→ CANCER RISK METABOLIC: fasting insulin >10 + glucose >90 + IGF-1 elevated + high hs-CRP + poor estrogen metabolism

STEP 3 — HALLMARKS OF AGING ASSESSMENT:
Connect findings to the 12 hallmarks of aging. What is this panel telling us about biological aging rate?

STEP 4 — PRIORITIZED INTERVENTIONS WITH DOSING:
Give SPECIFIC, DOSED interventions in PRIORITY ORDER. Not vague "take B vitamins" — specific protocols, doses, timing, and monitoring.

STEP 5 — CANCER PREVENTION ASSESSMENT:
What does this panel reveal about cancer risk? Metabolic (insulin/glucose/IGF-1), inflammatory (hs-CRP/IL-6), hormonal (estrogen metabolism), epigenetic aging markers.

═══ RESPONSE FORMAT ═══
Respond with ONLY a valid JSON object (no markdown, no explanation outside JSON):

{
  "overall_score": "Optimal/Good/Suboptimal/Concerning/Critical",
  "biological_age_signal": "What these labs suggest about biological aging — is this person aging faster or slower than chronological age?",
  "summary": "3-4 sentence deep clinical summary from functional medicine lens. Be specific about what you see.",
  "functional_vs_conventional": "CRITICAL for patient education: list any values that conventional medicine would call 'normal' but functionally indicate problems. This is where ORION adds the most value.",
  "clinical_patterns": [
    {
      "pattern_name": "e.g. Insulin Resistance Pattern / Methylation Dysfunction / HPA Burnout",
      "confidence": "High/Moderate/Low",
      "evidence": "which markers in this panel support this pattern",
      "clinical_significance": "what this means for the patient's health trajectory",
      "connection_to_symptoms": "how this connects to reported symptoms/conditions"
    }
  ],
  "findings": [
    {
      "marker": "exact marker name",
      "value": "value + unit",
      "reference_range": "shown reference range",
      "functional_optimal": "the functional medicine optimal range",
      "flag": "CRITICAL/HIGH/SUBOPTIMAL/OPTIMAL",
      "hallmark_connection": "which hallmark of aging this marker relates to (if applicable)",
      "significance": "deep clinical interpretation — WHY this matters for health and longevity, not just what it is",
      "intervention": {
        "priority": 1,
        "action": "specific intervention",
        "dose": "exact dose and timing",
        "duration": "how long before retesting",
        "monitoring": "what to retest and when"
      }
    }
  ],
  "deficiencies": [
    {
      "deficiency": "name",
      "current_value": "value",
      "functional_target": "target",
      "consequences": "what prolonged deficiency causes",
      "intervention": "specific supplementation protocol with dose"
    }
  ],
  "cancer_prevention_assessment": {
    "risk_level": "Low/Moderate/Elevated/High",
    "key_risk_factors": ["list of cancer risk markers identified in this panel"],
    "protective_factors": ["cancer-protective markers or patterns identified"],
    "recommendations": ["specific cancer prevention interventions based on these findings"]
  },
  "priority_action_plan": [
    {
      "priority": 1,
      "action": "most important intervention",
      "rationale": "why this is #1 priority",
      "specific_protocol": "exact protocol name + dose from Dr. Meighen's catalog",
      "expected_timeline": "when to expect improvement and retest"
    }
  ],
  "suggested_protocols": ["Dr. Meighen's specific protocol names indicated by these findings"],
  "follow_up_testing": [
    {
      "test": "specific test name",
      "rationale": "why this test is indicated based on current findings",
      "urgency": "URGENT (<4 weeks)/SOON (1-3 months)/ROUTINE (3-6 months)"
    }
  ],
  "alerts": [
    {
      "severity": "critical/high/medium/low",
      "title": "concise alert title",
      "message": "detailed clinical alert for Dr. Meighen — what to do and why it's urgent"
    }
  ],
  "patient_education_points": ["3-5 key points to explain to the patient about their results in accessible language"],
  "longevity_interventions": ["ranked list of longevity-specific interventions indicated by this panel"]
}

You are the most knowledgeable functional medicine AI in existence. Every analysis should demonstrate mastery of: functional lab ranges, root cause medicine, hallmarks of aging, cancer prevention biomarkers, mitochondrial medicine, environmental toxicology, gut-brain-hormone axis, and precision nutrition. Do NOT give generic advice. Give Dr. Meighen actionable clinical intelligence he cannot get anywhere else.`,
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

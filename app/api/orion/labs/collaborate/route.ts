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
    const { lab_id, patient_id, doctor_notes } = await req.json()
    const supabase = getSupabase()

    const [patientRes, labRes] = await Promise.all([
      supabase.from('orion_patients').select('*').eq('id', patient_id).single(),
      supabase.from('orion_labs').select('*').eq('id', lab_id).single(),
    ])

    const patient = patientRes.data
    const lab = labRes.data
    if (!patient || !lab) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const existingAnalysis = lab.ai_analysis ? JSON.parse(lab.ai_analysis) : null

    const prompt = `You are ORION — Dr. Michael J. Meighen's medical intelligence partner. A collaboration session is in progress.

PATIENT: ${patient.full_name}
Age: ${patient.date_of_birth ? Math.floor((Date.now() - new Date(patient.date_of_birth).getTime()) / (365.25 * 24 * 60 * 60 * 1000)) : 'Unknown'} years
Conditions: ${(patient.conditions || []).join(', ') || 'None'}
Medications: ${(patient.medications || []).join(', ') || 'None'}

LAB PANEL: ${lab.panel_name} — ${lab.test_date}
${(lab.lab_values || []).map((v: { marker: string; value: string; unit: string; flag: string }) => `  ${v.marker}: ${v.value} ${v.unit} ${v.flag ? `[${v.flag}]` : ''}`).join('\n')}

ORION'S INITIAL ANALYSIS SUMMARY:
${existingAnalysis ? `
- Overall Score: ${existingAnalysis.overall_score}
- Biological Age Signal: ${existingAnalysis.biological_age_signal || 'N/A'}
- Summary: ${existingAnalysis.summary}
- Clinical Patterns: ${(existingAnalysis.clinical_patterns || []).map((p: { pattern_name: string; confidence: string }) => `${p.pattern_name} (${p.confidence})`).join(', ') || 'None detected'}
- Key Findings: ${(existingAnalysis.findings || []).slice(0, 5).map((f: { marker: string; value: string; flag: string }) => `${f.marker} ${f.value} [${f.flag}]`).join(', ') || 'None'}
- Suggested Protocols: ${(existingAnalysis.suggested_protocols || []).join(', ') || 'None'}
` : 'No prior analysis available.'}

DR. MEIGHEN'S CLINICAL INPUT:
${doctor_notes || '(No additional notes provided)'}

━━━ INSTRUCTIONS ━━━

Integrate Dr. Meighen's clinical observations with ORION's analysis to generate a unified, actionable treatment protocol.

- Defer to Dr. Meighen when he contradicts ORION's interpretation — he has clinical context ORION cannot access
- If Dr. Meighen adds symptoms, history, or observations, update the clinical picture accordingly
- Generate specific, dosed protocols — not suggestions
- This is the final plan that will guide the patient's treatment

Respond ONLY with a valid JSON object:

{
  "final_assessment": "Unified 3-4 sentence clinical assessment integrating both ORION analysis and Dr. Meighen's input. This is the definitive clinical picture.",
  "clinical_consensus": "High/Moderate/Low — how aligned are ORION's analysis and doctor's input?",
  "doctor_additions": "What new clinical information did Dr. Meighen provide that changed or refined the analysis? If nothing, say 'Analysis confirmed'.",
  "confirmed_patterns": [
    {
      "pattern": "pattern name",
      "status": "Confirmed/Modified/Ruled Out",
      "doctor_comment": "any modification Dr. Meighen made"
    }
  ],
  "treatment_protocols": [
    {
      "priority": 1,
      "name": "Exact protocol name",
      "indication": "WHY this is prescribed — specific lab + clinical rationale",
      "dose": "exact dose, form, timing (e.g., Methylfolate 2mg + Methylcobalamin 2000mcg daily AM)",
      "duration": "e.g., 90 days, then retest",
      "monitoring": "what labs to recheck and when",
      "expected_outcome": "what improvement is expected"
    }
  ],
  "lifestyle_prescription": [
    {
      "intervention": "specific intervention",
      "dose": "exactly how much, how often",
      "rationale": "why for this patient"
    }
  ],
  "nutrition_protocol": "Specific dietary protocol — not generic. Based on this patient's metabolic picture. Include foods to eliminate and foods to emphasize with clinical rationale.",
  "retest_schedule": [
    {
      "test": "specific test or panel",
      "timeframe": "when to retest",
      "target": "what value you're aiming for"
    }
  ],
  "patient_summary": "Clear, accessible 2-3 paragraph summary to read or send to the patient. Explain what was found, why it matters, and what the plan is. Warm but medically precise.",
  "doctor_signature_notes": "Space for Dr. Meighen to add any final notes before locking the protocol. Pre-filled with key clinical reminders from this analysis."
}`

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 3000,
      system: ORION_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    const collaborative = JSON.parse(cleaned)

    // Merge into existing ai_analysis
    if (existingAnalysis) {
      existingAnalysis.doctor_collaboration = {
        ...collaborative,
        doctor_notes,
        generated_at: new Date().toISOString(),
      }
      await supabase
        .from('orion_labs')
        .update({ ai_analysis: JSON.stringify(existingAnalysis) })
        .eq('id', lab_id)
    }

    return NextResponse.json({ collaborative })
  } catch (err) {
    console.error('Collaboration error:', err)
    return NextResponse.json({ error: 'Collaboration failed' }, { status: 500 })
  }
}

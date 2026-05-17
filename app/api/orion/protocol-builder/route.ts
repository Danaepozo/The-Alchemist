import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { ORION_SYSTEM_PROMPT } from '@/lib/orion/knowledge-base'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const { profile, goals, preferences } = await req.json()

    const prompt = `You are ORION — Dr. Michael J. Meighen's precision medicine intelligence. Build a complete, individualized clinical protocol for this patient.

PATIENT PROFILE:
- Age: ${profile.age}
- Gender: ${profile.gender}
- Current conditions: ${profile.conditions || 'None specified'}
- Current medications: ${profile.medications || 'None'}
- Known labs (if provided): ${profile.labs || 'Not provided'}
- Lifestyle: ${profile.lifestyle || 'Not specified'}
- Budget tier: ${preferences.budget} (conservative = supplements only; moderate = supplements + compounded peptides; premium = full clinic protocol)
- Approach: ${preferences.approach} (conservative / moderate / aggressive)

GOALS (in priority order):
${goals.map((g: string, i: number) => `${i+1}. ${g}`).join('\n')}

SPECIAL NOTES:
${preferences.notes || 'None'}

━━━ BUILD A COMPLETE 10X CLINICAL PROTOCOL ━━━

Generate the most advanced, evidence-based, personalized protocol for this patient. Apply full functional medicine and longevity science depth. Be specific with doses, timing, and monitoring.

Respond with ONLY a valid JSON object:

{
  "protocol_name": "Descriptive name for this protocol",
  "clinical_summary": "3-4 sentence clinical rationale — why this protocol for this specific patient profile",
  "biological_age_target": "What biological age improvement is realistic in 6-12 months with this protocol",
  "estimated_timeline": "When to expect results for each goal",

  "foundation_supplements": [
    {
      "name": "exact supplement name",
      "dose": "exact dose + form (e.g., NMN 500mg sublingual)",
      "timing": "exact timing (e.g., AM fasting, with largest meal)",
      "rationale": "why for THIS patient's goals",
      "evidence_level": "Strong RCT / Good observational / Mechanistic / Emerging",
      "priority": 1
    }
  ],

  "peptide_protocols": [
    {
      "name": "peptide name",
      "dose": "exact dose",
      "route": "SQ / intranasal / oral",
      "frequency": "daily / 3x week / cycles",
      "cycle": "e.g., 8 weeks on, 4 weeks off",
      "indication": "specific reason for this patient",
      "monitoring": "what to track"
    }
  ],

  "lifestyle_prescriptions": [
    {
      "category": "Exercise / Sleep / Nutrition / Stress / Thermal therapy",
      "prescription": "exact prescription",
      "dose": "frequency, duration, intensity",
      "rationale": "why critical for this patient"
    }
  ],

  "nutrition_protocol": {
    "framework": "e.g., Time-Restricted Eating 16:8 / Mediterranean / Ketogenic / Pegan",
    "eating_window": "e.g., 8AM-4PM",
    "eliminate": ["list of foods/compounds to remove and why"],
    "emphasize": ["list of foods/nutrients to add and why"],
    "specific_targets": "e.g., protein 1.8g/kg/day, omega-3 3g/day EPA+DHA",
    "meal_timing": "guidance on meal timing for this patient"
  },

  "advanced_therapies": [
    {
      "therapy": "e.g., HBOT / PBM / Sauna / IV therapy / Senolytics",
      "protocol": "exact protocol details",
      "frequency": "how often",
      "rationale": "evidence + why for this patient",
      "available_at_clinic": true
    }
  ],

  "lab_monitoring": [
    {
      "test": "specific test",
      "baseline": "run before starting",
      "retest": "when to retest",
      "target": "what value you are aiming for",
      "reason": "why this test is critical for this protocol"
    }
  ],

  "phase_plan": [
    {
      "phase": 1,
      "name": "Foundation Phase",
      "duration": "weeks 1–4",
      "focus": "what to implement first and why",
      "actions": ["specific actions in this phase"]
    },
    {
      "phase": 2,
      "name": "Optimization Phase",
      "duration": "weeks 5–12",
      "focus": "what to add/adjust",
      "actions": ["specific actions"]
    },
    {
      "phase": 3,
      "name": "Advanced Phase",
      "duration": "months 4–12",
      "focus": "advanced interventions once foundation is set",
      "actions": ["specific actions"]
    }
  ],

  "expected_outcomes": [
    {
      "goal": "specific goal from patient's list",
      "expected_improvement": "what improvement to expect",
      "timeline": "when to expect it",
      "biomarker_changes": "which labs will change and in which direction"
    }
  ],

  "safety_flags": [
    {
      "flag": "any safety consideration",
      "action": "what to monitor or avoid"
    }
  ],

  "patient_handout": "A 2-3 paragraph clear, empowering summary written directly TO the patient explaining their protocol in accessible language. Warm, precise, motivating."
}`

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      system: ORION_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    const protocol = JSON.parse(cleaned)

    return NextResponse.json({ protocol })
  } catch (err) {
    console.error('Protocol builder error:', err)
    return NextResponse.json({ error: 'Protocol generation failed' }, { status: 500 })
  }
}

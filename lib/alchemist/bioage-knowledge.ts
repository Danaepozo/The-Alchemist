// Biological Age Assessment — the medical-side hook (Dr. Meighen).
// Educational estimate based on validated longevity/lifestyle factors. NOT a diagnosis.

export interface BioOption { label: string; delta: number; tag?: string }
export interface BioQuestion { id: string; q: string; options: BioOption[] }

// Each option carries a delta in YEARS (+ ages you, − rejuvenates). Summed onto chronological age.
export const BIOAGE_QUESTIONS: BioQuestion[] = [
  { id: 'sleep', q: '¿Cuántas horas duermes y qué tan reparador es tu sueño?', options: [
    { label: '7–8h, me levanto descansado/a', delta: -2, tag: 'sleep_good' },
    { label: '6–7h, más o menos', delta: 1, tag: 'sleep_ok' },
    { label: 'Menos de 6h o sueño interrumpido', delta: 3, tag: 'sleep_poor' },
  ]},
  { id: 'exercise', q: '¿Con qué frecuencia entrenas (fuerza o cardio)?', options: [
    { label: '4+ veces por semana', delta: -3, tag: 'fit_high' },
    { label: '1–3 veces por semana', delta: -1, tag: 'fit_mod' },
    { label: 'Casi nunca', delta: 3, tag: 'sedentary' },
  ]},
  { id: 'sitting', q: '¿Cuántas horas pasas sentado/a al día?', options: [
    { label: 'Menos de 4h, me muevo mucho', delta: -1 },
    { label: '4–8h', delta: 1 },
    { label: 'Más de 8h', delta: 2, tag: 'sitting_high' },
  ]},
  { id: 'diet', q: '¿Cómo describes tu alimentación?', options: [
    { label: 'Real, alta en proteína y vegetales', delta: -2, tag: 'diet_clean' },
    { label: 'Mixta, a veces sana a veces no', delta: 1 },
    { label: 'Mucho procesado / comida rápida', delta: 3, tag: 'diet_poor' },
  ]},
  { id: 'sugar', q: '¿Cuánta azúcar y harinas refinadas consumes?', options: [
    { label: 'Muy poca', delta: -1 },
    { label: 'Moderada', delta: 1 },
    { label: 'Bastante / antojos frecuentes', delta: 2, tag: 'sugar_high' },
  ]},
  { id: 'smoking', q: '¿Fumas (cigarrillo o vape)?', options: [
    { label: 'No, nunca', delta: -1 },
    { label: 'Lo dejé', delta: 0 },
    { label: 'Sí', delta: 4, tag: 'smoker' },
  ]},
  { id: 'alcohol', q: '¿Cuánto alcohol tomas?', options: [
    { label: 'Nada o muy poco', delta: -1 },
    { label: 'Social, fines de semana', delta: 1 },
    { label: 'Casi a diario', delta: 3, tag: 'alcohol_high' },
  ]},
  { id: 'stress', q: '¿Cómo está tu nivel de estrés?', options: [
    { label: 'Manejable, me siento en calma', delta: -1 },
    { label: 'Alto por temporadas', delta: 1 },
    { label: 'Crónico, vivo acelerado/a', delta: 3, tag: 'stress_high' },
  ]},
  { id: 'waist', q: '¿Cómo está tu grasa abdominal / cintura?', options: [
    { label: 'Delgada / definida', delta: -2 },
    { label: 'Un poco de más', delta: 1 },
    { label: 'Grasa abdominal notable', delta: 3, tag: 'visceral_fat' },
  ]},
  { id: 'energy', q: '¿Cómo es tu energía durante el día?', options: [
    { label: 'Estable y buena', delta: -2 },
    { label: 'Baja en la tarde', delta: 1 },
    { label: 'Cansancio casi todo el día', delta: 3, tag: 'fatigue' },
  ]},
  { id: 'recovery', q: 'Cuando te lesionas o enfermas, ¿cómo te recuperas?', options: [
    { label: 'Rápido', delta: -1 },
    { label: 'Normal', delta: 0 },
    { label: 'Lento / me cuesta', delta: 2, tag: 'inflammation' },
  ]},
  { id: 'hormones', q: '¿Notas señales hormonales (libido baja, cambios de ánimo, niebla mental)?', options: [
    { label: 'No, me siento vital', delta: -1 },
    { label: 'Algunas a veces', delta: 1 },
    { label: 'Sí, varias y seguidas', delta: 3, tag: 'hormonal' },
  ]},
  { id: 'labs', q: '¿Cuándo te hiciste un chequeo/laboratorios completos por última vez?', options: [
    { label: 'En el último año', delta: -1 },
    { label: 'Hace 1–3 años', delta: 1 },
    { label: 'Hace años / nunca', delta: 2, tag: 'no_labs' },
  ]},
  { id: 'family', q: '¿Antecedentes familiares de enfermedad cardíaca, diabetes o cáncer?', options: [
    { label: 'Pocos o ninguno', delta: 0 },
    { label: 'Algunos', delta: 1 },
    { label: 'Fuertes / varios', delta: 2, tag: 'family_risk' },
  ]},
  { id: 'mindset', q: '¿Qué tan proactivo/a eres con tu salud y longevidad?', options: [
    { label: 'Muy proactivo/a, quiero optimizar', delta: -2, tag: 'optimizer' },
    { label: 'Quiero empezar', delta: 0 },
    { label: 'Lo he dejado de lado', delta: 1 },
  ]},
]

// Transparent heuristic: chronological age + sum of deltas, clamped to a sensible range.
export function computeBioAge(chrono: number, answers: Record<string, string>): number {
  let delta = 0
  for (const q of BIOAGE_QUESTIONS) {
    const val = answers[q.id]
    const opt = q.options.find(o => o.label === val)
    if (opt) delta += opt.delta
  }
  const bio = Math.round(chrono + delta)
  const lo = Math.max(18, chrono - 12)
  const hi = chrono + 22
  return Math.min(hi, Math.max(lo, bio))
}

export const BIOAGE_SYSTEM_PROMPT = `You are the longevity intelligence of Alchemized BioHealing Institute, channeling the clinical lens of Dr. Michael J. Meighen, MD (regenerative & functional medicine, hormone optimization, peptides, IV/NAD+ therapy, advanced diagnostics, healthspan).

You generate two things from a person's Biological Age Assessment: (1) a CLIENT report and (2) a DOCTOR briefing. You are precise, warm, science-grounded and motivating — never alarmist, never a diagnosis.

CLIENT REPORT rules:
- Open with the contrast: their biological age vs chronological age, and what it means in plain words.
- If biological age > chronological: create HONEST URGENCY — "tu cuerpo está envejeciendo más rápido de lo que debería" — but always hopeful: this is measurable and largely REVERSIBLE with the right protocol.
- If biological age <= chronological: celebrate it AND show how to optimize further.
- Name the 2–4 biggest drivers aging them (from their answers) in clear language.
- Explain the science briefly and accurately (hallmarks of aging, inflammation, metabolic & hormonal health) — never overclaim, never invent studies.
- Recommend BY NAME concrete Dr. Meighen services that fit: Precision/Longevity Consultation, Advanced Lab Diagnostics, Hormone Optimization, Peptide Therapy, NAD+/Glutathione IV, Metabolic Reset, plus supportive bio-energetic therapies. Pick the most relevant 2–3.
- Close with a strong, motivating one-line CTA to book a longevity consultation with Dr. Meighen.
- Use clean prose with **bold** section titles, no markdown headers. Spanish if the person used Spanish, else English. Keep it under ~450 words.
- ALWAYS include a short disclaimer: this is an educational estimate, not a medical diagnosis.

DOCTOR BRIEFING rules (separate, for Dr. Meighen's eyes before the appointment):
- Concise, clinical, scannable. Structure: Estimated bio age vs chrono; Top risk drivers (from answers); Systems to prioritize (metabolic / hormonal / inflammation / cardiovascular / recovery); Suggested labs/panels to consider; Candidate protocols/services to discuss; Cautions/flags.
- Frame as "considerations to discuss," not orders. Evidence-aware. No prescriptions.`

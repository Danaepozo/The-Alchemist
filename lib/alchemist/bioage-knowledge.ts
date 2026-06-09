// Biological Age Assessment — the medical-side hook (Dr. Meighen).
// Educational estimate based on validated longevity/lifestyle factors. NOT a diagnosis.
// Fully bilingual (EN/ES): every category, question and option carries both languages.

export interface Bi { en: string; es: string }
export interface BioOption { label: Bi; delta: number; tag?: string }
export interface BioQuestion { id: string; cat: Bi; q: Bi; options: BioOption[] }

const SLEEP: Bi = { en: 'Sleep & Recovery', es: 'Sueño y recuperación' }
const MOVE: Bi = { en: 'Movement & Strength', es: 'Movimiento y fuerza' }
const FUNC: Bi = { en: 'Physical Function', es: 'Función física' }
const NUTR: Bi = { en: 'Nutrition', es: 'Nutrición' }
const MIND: Bi = { en: 'Stress & Mind', es: 'Estrés y mente' }
const HABIT: Bi = { en: 'Habits & Biomarkers', es: 'Hábitos y biomarcadores' }
const HIST: Bi = { en: 'History & Hormones', es: 'Historia y hormonas' }

// Each option carries a delta in YEARS (+ ages you, − rejuvenates). Summed onto chronological age.
export const BIOAGE_QUESTIONS: BioQuestion[] = [
  // ── Sleep & Recovery ──
  { id: 'sleep', cat: SLEEP, q: { en: 'How many hours do you sleep, and how restorative is it?', es: '¿Cuántas horas duermes y qué tan reparador es tu sueño?' }, options: [
    { label: { en: '7–8h and I wake up rested', es: '7–8h y me levanto descansado/a' }, delta: -2, tag: 'sleep_good' },
    { label: { en: '6–7h, more or less', es: '6–7h, más o menos' }, delta: 1 },
    { label: { en: 'Under 6h or interrupted sleep', es: 'Menos de 6h o sueño interrumpido' }, delta: 3, tag: 'sleep_poor' },
  ]},
  { id: 'snore', cat: SLEEP, q: { en: 'Do you snore, or have you been told you stop breathing while asleep?', es: '¿Roncas o te han dicho que dejas de respirar al dormir?' }, options: [
    { label: { en: 'No', es: 'No' }, delta: -1 },
    { label: { en: 'Sometimes', es: 'A veces' }, delta: 1 },
    { label: { en: 'Yes, often', es: 'Sí, con frecuencia' }, delta: 3, tag: 'apnea_risk' },
  ]},
  { id: 'recovery', cat: SLEEP, q: { en: 'When you get injured or sick, how do you recover?', es: 'Cuando te lesionas o enfermas, ¿cómo te recuperas?' }, options: [
    { label: { en: 'Fast', es: 'Rápido' }, delta: -1 },
    { label: { en: 'Normal', es: 'Normal' }, delta: 0 },
    { label: { en: 'Slowly, it’s hard', es: 'Lento, me cuesta' }, delta: 2, tag: 'inflammation' },
  ]},

  // ── Movement & Strength ──
  { id: 'exercise', cat: MOVE, q: { en: 'How often do you train (strength or cardio)?', es: '¿Con qué frecuencia entrenas (fuerza o cardio)?' }, options: [
    { label: { en: '4+ times per week', es: '4+ veces por semana' }, delta: -3, tag: 'fit_high' },
    { label: { en: '1–3 times per week', es: '1–3 veces por semana' }, delta: -1 },
    { label: { en: 'Almost never', es: 'Casi nunca' }, delta: 3, tag: 'sedentary' },
  ]},
  { id: 'strength', cat: MOVE, q: { en: 'How strong do you feel (strength and muscle)?', es: '¿Qué tan fuerte te sientes (fuerza y músculo)?' }, options: [
    { label: { en: 'Strong, I keep my muscle', es: 'Fuerte, mantengo músculo' }, delta: -2, tag: 'strong' },
    { label: { en: 'Normal', es: 'Normal' }, delta: 0 },
    { label: { en: 'Weak, losing muscle', es: 'Débil, perdiendo músculo' }, delta: 2, tag: 'sarcopenia' },
  ]},
  { id: 'sitting', cat: MOVE, q: { en: 'How many hours do you sit per day?', es: '¿Cuántas horas pasas sentado/a al día?' }, options: [
    { label: { en: 'Under 4h, I move a lot', es: 'Menos de 4h, me muevo mucho' }, delta: -1 },
    { label: { en: '4–8h', es: '4–8h' }, delta: 1 },
    { label: { en: 'Over 8h', es: 'Más de 8h' }, delta: 2, tag: 'sitting_high' },
  ]},

  // ── Physical Function (tests validated in longevity research) ──
  { id: 'grip', cat: FUNC, q: { en: 'Grip strength: do you open tight jars and carry groceries with ease?', es: 'Fuerza de agarre: ¿abres frascos difíciles y cargas las compras sin problema?' }, options: [
    { label: { en: 'Yes, easily', es: 'Sí, con facilidad' }, delta: -2, tag: 'grip_strong' },
    { label: { en: 'With some effort', es: 'Con algo de esfuerzo' }, delta: 1 },
    { label: { en: 'It’s quite hard', es: 'Me cuesta bastante' }, delta: 3, tag: 'grip_weak' },
  ]},
  { id: 'siterise', cat: FUNC, q: { en: 'Sit-to-rise: can you sit down on the floor and stand up WITHOUT using hands or knees?', es: 'Levantarte del piso: ¿puedes sentarte y pararte del suelo SIN apoyar manos ni rodillas?' }, options: [
    { label: { en: 'Yes, no support', es: 'Sí, sin ningún apoyo' }, delta: -2, tag: 'sitrise_good' },
    { label: { en: 'With one hand or support', es: 'Con una mano o apoyo' }, delta: 1 },
    { label: { en: 'I can’t / very hard', es: 'No puedo / muy difícil' }, delta: 3, tag: 'sitrise_poor' },
  ]},
  { id: 'balance', cat: FUNC, q: { en: 'Balance: can you stand on ONE foot for 10 seconds without holding on?', es: 'Equilibrio: ¿puedes pararte en UN solo pie 10 segundos sin agarrarte?' }, options: [
    { label: { en: 'Yes, easily', es: 'Sí, fácil' }, delta: -2, tag: 'balance_good' },
    { label: { en: 'Barely / wobble', es: 'Apenas / tambaleo' }, delta: 1 },
    { label: { en: 'I can’t', es: 'No lo logro' }, delta: 3, tag: 'balance_poor' },
  ]},
  { id: 'pushups', cat: FUNC, q: { en: 'Push-ups: how many can you do in a row?', es: 'Flexiones: ¿cuántas (push-ups) puedes hacer seguidas?' }, options: [
    { label: { en: 'More than 20', es: 'Más de 20' }, delta: -2, tag: 'pushups_high' },
    { label: { en: 'Between 5 and 20', es: 'Entre 5 y 20' }, delta: 0 },
    { label: { en: 'Under 5 or none', es: 'Menos de 5 o ninguna' }, delta: 2, tag: 'pushups_low' },
  ]},
  { id: 'restingHR', cat: FUNC, q: { en: 'Your resting heart rate (calm pulse):', es: 'Tu frecuencia cardíaca en reposo (pulso en calma):' }, options: [
    { label: { en: 'Under 60 bpm', es: 'Menos de 60 lpm' }, delta: -2, tag: 'rhr_low' },
    { label: { en: '60–75 bpm', es: '60–75 lpm' }, delta: 0 },
    { label: { en: 'Over 75 bpm or I don’t know', es: 'Más de 75 lpm o no la sé' }, delta: 2, tag: 'rhr_high' },
  ]},
  { id: 'whtr', cat: FUNC, q: { en: 'Is your waist LESS than half your height? (waist ÷ height < 0.5 is ideal)', es: 'Tu cintura, ¿mide MENOS de la mitad de tu estatura? (cintura ÷ estatura < 0.5 es lo ideal)' }, options: [
    { label: { en: 'Yes, less than half', es: 'Sí, menos de la mitad' }, delta: -2, tag: 'whtr_good' },
    { label: { en: 'About half', es: 'Más o menos la mitad' }, delta: 1 },
    { label: { en: 'Well over half', es: 'Bastante más de la mitad' }, delta: 3, tag: 'whtr_high' },
  ]},

  // ── Nutrition ──
  { id: 'diet', cat: NUTR, q: { en: 'How would you describe your diet?', es: '¿Cómo describes tu alimentación?' }, options: [
    { label: { en: 'Whole foods, high protein & vegetables', es: 'Real, alta en proteína y vegetales' }, delta: -2, tag: 'diet_clean' },
    { label: { en: 'Mixed, sometimes healthy', es: 'Mixta, a veces sana a veces no' }, delta: 1 },
    { label: { en: 'Lots of processed / fast food', es: 'Mucho procesado / comida rápida' }, delta: 3, tag: 'diet_poor' },
  ]},
  { id: 'protein', cat: NUTR, q: { en: 'Do you eat enough protein (meat, eggs, fish, legumes)?', es: '¿Comes suficiente proteína (carne, huevo, pescado, legumbres)?' }, options: [
    { label: { en: 'Yes, every meal', es: 'Sí, en cada comida' }, delta: -1 },
    { label: { en: 'Sometimes', es: 'A veces' }, delta: 1 },
    { label: { en: 'Little', es: 'Poca' }, delta: 2, tag: 'low_protein' },
  ]},
  { id: 'sugar', cat: NUTR, q: { en: 'How much sugar and refined carbs do you eat?', es: '¿Cuánta azúcar y harinas refinadas consumes?' }, options: [
    { label: { en: 'Very little', es: 'Muy poca' }, delta: -1 },
    { label: { en: 'Moderate', es: 'Moderada' }, delta: 1 },
    { label: { en: 'A lot / frequent cravings', es: 'Bastante / antojos frecuentes' }, delta: 2, tag: 'sugar_high' },
  ]},
  { id: 'hydration', cat: NUTR, q: { en: 'Do you drink enough water daily?', es: '¿Tomas suficiente agua al día?' }, options: [
    { label: { en: 'Yes, well hydrated', es: 'Sí, bien hidratado/a' }, delta: -1 },
    { label: { en: 'So-so', es: 'Regular' }, delta: 0 },
    { label: { en: 'Little', es: 'Poca' }, delta: 1 },
  ]},

  // ── Stress & Mind ──
  { id: 'stress', cat: MIND, q: { en: 'How is your stress level?', es: '¿Cómo está tu nivel de estrés?' }, options: [
    { label: { en: 'Manageable, I feel calm', es: 'Manejable, me siento en calma' }, delta: -1 },
    { label: { en: 'High at times', es: 'Alto por temporadas' }, delta: 1 },
    { label: { en: 'Chronic, always rushing', es: 'Crónico, vivo acelerado/a' }, delta: 3, tag: 'stress_high' },
  ]},
  { id: 'memory', cat: MIND, q: { en: 'Do you notice memory, focus or brain-fog issues?', es: '¿Notas fallas de memoria, concentración o niebla mental?' }, options: [
    { label: { en: 'No, I’m sharp', es: 'No, estoy claro/a' }, delta: -1 },
    { label: { en: 'Sometimes', es: 'A veces' }, delta: 1 },
    { label: { en: 'Often', es: 'Con frecuencia' }, delta: 2, tag: 'cognition' },
  ]},
  { id: 'mood', cat: MIND, q: { en: 'How has your mood been lately?', es: '¿Cómo está tu ánimo últimamente?' }, options: [
    { label: { en: 'Stable and positive', es: 'Estable y positivo' }, delta: -1 },
    { label: { en: 'Ups and downs', es: 'Con altibajos' }, delta: 1 },
    { label: { en: 'Often down or anxious', es: 'Decaído/a o ansioso/a seguido' }, delta: 2, tag: 'mood' },
  ]},
  { id: 'social', cat: MIND, q: { en: 'How connected do you feel to your people?', es: '¿Qué tan conectado/a te sientes con tu gente?' }, options: [
    { label: { en: 'Very supported', es: 'Muy acompañado/a' }, delta: -1 },
    { label: { en: 'Somewhat', es: 'Algo' }, delta: 0 },
    { label: { en: 'I often feel alone', es: 'Me siento solo/a a menudo' }, delta: 2, tag: 'isolation' },
  ]},

  // ── Habits & Biomarkers ──
  { id: 'smoking', cat: HABIT, q: { en: 'Do you smoke (cigarettes or vape)?', es: '¿Fumas (cigarrillo o vape)?' }, options: [
    { label: { en: 'No, never', es: 'No, nunca' }, delta: -1 },
    { label: { en: 'I quit', es: 'Lo dejé' }, delta: 0 },
    { label: { en: 'Yes', es: 'Sí' }, delta: 4, tag: 'smoker' },
  ]},
  { id: 'alcohol', cat: HABIT, q: { en: 'How much alcohol do you drink?', es: '¿Cuánto alcohol tomas?' }, options: [
    { label: { en: 'None or very little', es: 'Nada o muy poco' }, delta: -1 },
    { label: { en: 'Social, weekends', es: 'Social, fines de semana' }, delta: 1 },
    { label: { en: 'Almost daily', es: 'Casi a diario' }, delta: 3, tag: 'alcohol_high' },
  ]},
  { id: 'waist', cat: HABIT, q: { en: 'How is your belly fat / waistline?', es: '¿Cómo está tu grasa abdominal / cintura?' }, options: [
    { label: { en: 'Lean / defined', es: 'Delgada / definida' }, delta: -2 },
    { label: { en: 'A little extra', es: 'Un poco de más' }, delta: 1 },
    { label: { en: 'Noticeable belly fat', es: 'Grasa abdominal notable' }, delta: 3, tag: 'visceral_fat' },
  ]},
  { id: 'bp', cat: HABIT, q: { en: 'How is your blood pressure?', es: '¿Cómo está tu presión arterial?' }, options: [
    { label: { en: 'Normal', es: 'Normal' }, delta: -1 },
    { label: { en: 'I don’t know / don’t check', es: 'No la sé / no me la mido' }, delta: 1, tag: 'bp_unknown' },
    { label: { en: 'High / on treatment', es: 'Alta / en tratamiento' }, delta: 2, tag: 'hypertension' },
  ]},
  { id: 'energy', cat: HABIT, q: { en: 'How is your energy during the day?', es: '¿Cómo es tu energía durante el día?' }, options: [
    { label: { en: 'Stable and good', es: 'Estable y buena' }, delta: -2 },
    { label: { en: 'Drops in the afternoon', es: 'Baja en la tarde' }, delta: 1 },
    { label: { en: 'Tired most of the day', es: 'Cansancio casi todo el día' }, delta: 3, tag: 'fatigue' },
  ]},
  { id: 'labs', cat: HABIT, q: { en: 'When did you last get full lab work?', es: '¿Cuándo te hiciste laboratorios completos por última vez?' }, options: [
    { label: { en: 'Within the last year', es: 'En el último año' }, delta: -1 },
    { label: { en: '1–3 years ago', es: 'Hace 1–3 años' }, delta: 1 },
    { label: { en: 'Years ago / never', es: 'Hace años / nunca' }, delta: 2, tag: 'no_labs' },
  ]},

  // ── History & Hormones ──
  { id: 'family', cat: HIST, q: { en: 'Family history of heart disease, diabetes or cancer?', es: '¿Antecedentes familiares de enfermedad cardíaca, diabetes o cáncer?' }, options: [
    { label: { en: 'Few or none', es: 'Pocos o ninguno' }, delta: 0 },
    { label: { en: 'Some', es: 'Algunos' }, delta: 1 },
    { label: { en: 'Strong / several', es: 'Fuertes / varios' }, delta: 2, tag: 'family_risk' },
  ]},
  { id: 'hormones', cat: HIST, q: { en: 'Hormonal signs (low libido, mood swings, hot flashes, stubborn weight)?', es: '¿Señales hormonales (libido baja, cambios de ánimo, sofocos, peso resistente)?' }, options: [
    { label: { en: 'No, I feel vital', es: 'No, me siento vital' }, delta: -1 },
    { label: { en: 'Some at times', es: 'Algunas a veces' }, delta: 1 },
    { label: { en: 'Yes, several and often', es: 'Sí, varias y seguidas' }, delta: 3, tag: 'hormonal' },
  ]},
  { id: 'mindset', cat: HIST, q: { en: 'How proactive are you with your health and longevity?', es: '¿Qué tan proactivo/a eres con tu salud y longevidad?' }, options: [
    { label: { en: 'Very proactive, I want to optimize', es: 'Muy proactivo/a, quiero optimizar' }, delta: -2, tag: 'optimizer' },
    { label: { en: 'I want to start', es: 'Quiero empezar' }, delta: 0 },
    { label: { en: 'I’ve let it slide', es: 'Lo he dejado de lado' }, delta: 1 },
  ]},
]

// Transparent heuristic: chronological age + sum of deltas, clamped to a sensible range.
// `answers` maps question id → selected option INDEX.
export function computeBioAge(chrono: number, answers: Record<string, number>): number {
  let delta = 0
  for (const q of BIOAGE_QUESTIONS) {
    const opt = q.options[answers[q.id]]
    if (opt) delta += opt.delta
  }
  const bio = Math.round(chrono + delta)
  const lo = Math.max(18, chrono - 14)
  const hi = chrono + 25
  return Math.min(hi, Math.max(lo, bio))
}

export const BIOAGE_SYSTEM_PROMPT = `You are the longevity intelligence of Alchemized BioHealing Institute, channeling the clinical lens of Dr. Michael J. Meighen, MD (regenerative & functional medicine, hormone optimization, peptides, IV/NAD+ therapy, advanced diagnostics, healthspan).

You generate two things from a person's Biological Age Assessment: (1) a CLIENT report and (2) a DOCTOR briefing. You are precise, warm, science-grounded and motivating — never alarmist, never a diagnosis.

CLIENT REPORT rules:
- Open with the contrast: their biological age vs chronological age, and what it means in plain words.
- If biological age > chronological: create HONEST URGENCY — "your body is aging faster than it should" — but always hopeful: this is measurable and largely REVERSIBLE with the right protocol.
- If biological age <= chronological: celebrate it AND show how to optimize further.
- Name the 2–4 biggest drivers aging them (from their answers) in clear language.
- Explain the science briefly and accurately (hallmarks of aging, inflammation, metabolic & hormonal health) — never overclaim, never invent studies.
- Recommend BY NAME concrete Dr. Meighen services that fit: Precision/Longevity Consultation, Advanced Lab Diagnostics, Hormone Optimization, Peptide Therapy, NAD+/Glutathione IV, Metabolic Reset, plus supportive bio-energetic therapies. Pick the most relevant 2–3.
- Close with a strong, motivating one-line CTA to book a longevity consultation with Dr. Meighen.
- Use clean prose with **bold** section titles, no markdown headers. Write in the SAME language the person used (Spanish or English). Keep it under ~450 words.
- ALWAYS include a short disclaimer: this is an educational estimate, not a medical diagnosis.

DOCTOR BRIEFING rules (separate, for Dr. Meighen's eyes before the appointment):
- Concise, clinical, scannable. Structure: Estimated bio age vs chrono; Top risk drivers (from answers); Systems to prioritize (metabolic / hormonal / inflammation / cardiovascular / cognitive / recovery); Suggested labs/panels to consider; Candidate protocols/services to discuss; Cautions/flags.
- Frame as "considerations to discuss," not orders. Evidence-aware. No prescriptions.`

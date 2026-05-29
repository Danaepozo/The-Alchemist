/**
 * THE ALCHEMIST — CATÁLOGO REAL
 * Alchemized BioHealing Institute (by Holistic Bella Vargas LLC & Michael J. Meighen, MD)
 * @ Centner Wellness — Coral Gables, Miami.
 *
 * Fuente única de verdad del catálogo: membresías, paquete de entrada, terapias,
 * protocolos y la oferta 12-en-30-días. La página pública (app/page.tsx) y la IA
 * (Lumina) deben leer de aquí — NO hardcodear precios ni nombres en componentes.
 *
 * Transcrito de los flyers oficiales (2026-05). Precios en USD.
 */

// ─────────────────────────────────────────────────────────────
// Instituto / marca
// ─────────────────────────────────────────────────────────────
export const INSTITUTE = {
  name: 'Alchemized BioHealing Institute',
  by: 'Holistic Bella Vargas LLC & Michael J. Meighen, MD',
  location: 'Centner Wellness — Coral Gables',
  address: '2970 Coral Way, Miami, FL 33145',
  phone: '305-305-3820',
  globalDiscount: '30% off all services for active members',
} as const

// ─────────────────────────────────────────────────────────────
// Tipos
// ─────────────────────────────────────────────────────────────
export interface MembershipCard {
  id: string
  name: string
  /** Precio formateado para UI, ej. "$444/mo" */
  price: string
  /** Valor numérico mensual o del paquete, para cálculos */
  priceNumeric: number
  /** Tipo de cobro */
  billing: 'one-time' | 'monthly'
  /** Precio "antes" tachado, si aplica */
  original: string | null
  /** Promo destacada (ej. primer mes), si aplica */
  promo?: string
  /** Nota corta bajo el precio */
  note: string
  /** Descripción / tagline */
  desc: string
  /** Qué incluye */
  features: string[]
  /** Color de marca del card */
  color: string
  /** Resalta como "Popular" */
  featured: boolean
  /** Marca como "Invite Only" / exclusivo */
  exclusive?: boolean
}

export interface Therapy {
  id: string
  name: string
  description: string
}

export interface ProtocolModality {
  modality: string
  detail: string
}

export interface Protocol {
  id: string
  number: number
  name: string
  focus: string
  modalities: ProtocolModality[]
}

// ─────────────────────────────────────────────────────────────
// Membresías + paquete de entrada (lo que muestra la página)
// Orden ascendente por precio. "Self Love" = Loving Myself (base).
// ─────────────────────────────────────────────────────────────
export const membershipCards: MembershipCard[] = [
  {
    id: 'stress-relief-high-frequency',
    name: 'Stress Relief & High Frequency',
    price: '$333',
    priceNumeric: 333,
    billing: 'one-time',
    original: null,
    note: 'Single package · 1 person',
    desc: 'Reset your body. Calm your mind. Raise your frequency.',
    features: [
      'Cold Plunge + Sauna — 30 min',
      'Epsom Water Flotation — 30 min',
      'The Experience on Vemi — 30 min',
      'Stress Relief IV (Magnesium + B12)',
    ],
    color: '#3DC898',
    featured: false,
  },
  {
    id: 'loving-myself',
    name: 'Loving Myself Membership',
    price: '$444/mo',
    priceNumeric: 444,
    billing: 'monthly',
    original: null,
    note: '1 person · 4 visits/mo · 3-month minimum',
    desc: 'A monthly reset for your nervous system, body & soul.',
    features: [
      '2 Epsom Water Flotation (30 min each)',
      '2 Red Light Therapy (30 min each)',
      '2 Cold Plunge + Infrared Sauna experiences',
      '1 Customized IV Therapy',
      '30% off all services',
    ],
    color: '#C9963C',
    featured: true,
  },
  {
    id: 'soulmates-dates',
    name: 'Soulmates Dates Membership',
    price: '$777/mo',
    priceNumeric: 777,
    billing: 'monthly',
    original: null,
    note: '2 people · same-day visits · 3-month minimum',
    desc: 'A monthly reset for you and your soulmate — reconnect, recharge and elevate together.',
    features: [
      'All Loving Myself benefits',
      '2 Epsom Water Flotation (30 min each)',
      '2 Red Light Therapy (30 min each)',
      '2 Cold Plunge + Infrared Sauna experiences',
      'Vemi Bed — 30 min each (60 min total)',
      '2 Customized IV Therapy',
      '30% off all services',
    ],
    color: '#C9963C',
    featured: false,
  },
  {
    id: 'sacred-family',
    name: 'My Sacred Family Wellness',
    price: '$1,111/mo',
    priceNumeric: 1111,
    billing: 'monthly',
    original: null,
    note: '4 people · monthly membership',
    desc: 'A monthly reset for you and your loved ones — a shared journey to elevate together.',
    features: [
      'All Self-Love benefits + 15 min Red Light Massage Chair each',
      '2 Epsom Water Flotation (30 min each, for 4)',
      '2 Red Light Therapy (30 min each, for 4)',
      '2 Cold Plunge + Infrared Sauna experiences (for 4)',
      'Vemi Bed — 30 min each (60 min total)',
      'EES Unlimited — unlimited sessions/month',
      '1 IV Therapy per person (4 IVs/month)',
      '30% off all services',
    ],
    color: '#E4B85A',
    featured: false,
  },
]

// ─────────────────────────────────────────────────────────────
// Terapias bio-energéticas (9)
// ─────────────────────────────────────────────────────────────
export const therapies: Therapy[] = [
  {
    id: 'floatation-tanks',
    name: 'Floatation Tanks',
    description:
      'Float effortlessly in 1,000 pounds of Epsom salt-infused water for a sensory-deprived experience that relieves pain, calms the mind, and promotes deep relaxation.',
  },
  {
    id: 'temperature-contrast',
    name: 'Temperature Contrast',
    description:
      'Boost circulation, tone your body, and relieve stress with the dynamic combination of a Cold Plunge and Infrared Sauna, creating a rejuvenating thermal shift.',
  },
  {
    id: 'biowell-aoscan',
    name: 'BioWell & AOScan',
    description:
      'Gain valuable insights into your energy and physiology with cutting-edge biofeedback assessments for a comprehensive view of your wellness.',
  },
  {
    id: 'recovery-tri-fusion',
    name: 'Recovery Tri-Fusion',
    description:
      'Experience the powerful synergy of Oxygen Infusion, Red Light Therapy, and Lymphatic Compression for enhanced detoxification, oxygenation, and immune support.',
  },
  {
    id: 'bio-sync-bed',
    name: 'Bio-Sync Bed (Vemi)',
    description:
      'Alleviate musculoskeletal pain and stress while harmonizing your mind and body with advanced technology that balances brain hemispheres and alkalinizes your system.',
  },
  {
    id: 'biocharger',
    name: 'BioCharger',
    description:
      "Recharge your energy, enhance cellular performance, and strengthen immunity through subtle frequencies designed to detoxify and optimize your body's function.",
  },
  {
    id: 'red-light-bed',
    name: 'Red Light Bed',
    description:
      'Revitalize at the cellular level with red light therapy, stimulating regeneration, mitochondrial function, and overall rejuvenation through human photosynthesis.',
  },
  {
    id: 'pemf-ozone-sauna',
    name: 'PEMF Ozone Sauna (HOCATT)',
    description:
      'Eliminate pathogens, toxins, and heavy metals while boosting circulation, supporting immunity, and promoting weight release with ozone and PEMF therapy.',
  },
  {
    id: 'holistic-electromagnetic-booster',
    name: 'Holistic Electromagnetic Booster',
    description:
      'Harness the power of Brain Tapping, EES, and PEMF Therapy to accelerate cellular repair, mitochondrial function, and restore inner balance.',
  },
]

// ─────────────────────────────────────────────────────────────
// Protocolos holísticos (4)
// ─────────────────────────────────────────────────────────────
export const protocols: Protocol[] = [
  {
    id: 'protocol-1',
    number: 1,
    name: 'Inflammation, Toxicity & Metabolic Relief',
    focus: 'Reduce inflammation, detoxify, and support metabolic health.',
    modalities: [
      { modality: 'HOCATT', detail: 'Recipes: Inflammation (93), Detox (6), Obesity (10) — 1-2 sessions/week, 30 min' },
      { modality: 'Red Light Bed', detail: '73 Hz, 292 Hz, 584 Hz — 2 sessions/week, 20 min' },
      { modality: 'Infrared Sauna', detail: '2 sessions/week, 20 min' },
      { modality: 'Cold Plunge', detail: '2 sessions/week, 1-5 min' },
      { modality: 'Floatation', detail: '1 session/week, 60 min' },
      { modality: 'BioCharger', detail: '"Slim & Soothe" and "Pure Detox" — 2-3 sessions/week, 15-45 min' },
      { modality: 'Zero-G Massage Chair', detail: '"Fascia Master" — 2-3 sessions/week, 20 min' },
      { modality: 'EES', detail: '2-3 sessions/week, 30 min' },
    ],
  },
  {
    id: 'protocol-2',
    number: 2,
    name: 'Mental & Emotional Relief',
    focus: 'Calm the nervous system and support mental & emotional balance.',
    modalities: [
      { modality: 'HOCATT', detail: 'Recipes: Healing (49), Mental (63), Depression (37), Anxiety (24) — 1-2 sessions/week, 30 min' },
      { modality: 'Red Light Bed', detail: '73 Hz, 146 Hz, 2,336 Hz — 2 sessions/week, 20 min' },
      { modality: 'Vemi Bio-Sync Bed', detail: '2 sessions/week, 30 min' },
      { modality: 'Infrared Sauna', detail: '2 sessions/week, 20 min' },
      { modality: 'Cold Plunge', detail: '2 sessions/week, 1-5 min' },
      { modality: 'BioCharger', detail: '"Inner Calm" and "Grounded Serenity" — 2-3 sessions/week, 15-45 min' },
      { modality: 'Zero-G Massage Chair', detail: '"Full Body Stretch" — 2-3 sessions/week, 20 min' },
      { modality: 'EES', detail: '2-3 sessions/week, 30 min' },
    ],
  },
  {
    id: 'protocol-3',
    number: 3,
    name: 'Energy Renewal',
    focus: 'Restore energy, improve sleep, and combat fatigue.',
    modalities: [
      { modality: 'HOCATT', detail: 'Recipes: Insomnia (56), Fatigue (3), Regeneration (49) — 1-2 sessions/week, 30 min' },
      { modality: 'Red Light Bed', detail: '73 Hz, 146 Hz, 2,336 Hz — 2 sessions/week, 20 min' },
      { modality: 'Infrared Sauna', detail: '2 sessions/week, 20 min' },
      { modality: 'Cold Plunge', detail: '2 sessions/week, 1-5 min' },
      { modality: 'Floatation', detail: '1 session/week, 60 min' },
      { modality: 'BioCharger', detail: '"Radiant Harmony" and "Clarity Boost" — 2-3 sessions/week, 15-45 min' },
      { modality: 'Zero-G Massage Chair', detail: '"Deep Massage" — 2-3 sessions/week, 20 min' },
      { modality: 'EES', detail: '2-3 sessions/week, 30 min' },
    ],
  },
  {
    id: 'protocol-4',
    number: 4,
    name: 'Rebuild Immune System',
    focus: 'Strengthen immunity and resilience.',
    modalities: [
      { modality: 'HOCATT', detail: 'Recipes: Immune (13), Inflammation (93), Infection (19) — 1-2 sessions/week, 30 min' },
      { modality: 'Red Light Bed', detail: '73 Hz, 146 Hz, 584 Hz — 2 sessions/week, 20 min' },
      { modality: 'Vemi Bio-Sync Bed', detail: '1 session/week, 30 min' },
      { modality: 'Infrared Sauna', detail: '2 sessions/week, 20 min' },
      { modality: 'Cold Plunge', detail: '2 sessions/week, 1-5 min' },
      { modality: 'Floatation', detail: '1 session/week, 60 min' },
      { modality: 'BioCharger', detail: '"Pure Detox" and "Slim & Soothe" — 2-3 sessions/week, 15-45 min' },
      { modality: 'Zero-G Massage Chair', detail: '"Fascia Master" — 2-3 sessions/week, 20 min' },
      { modality: 'EES', detail: '2-3 sessions/week, 30 min' },
    ],
  },
]

// ─────────────────────────────────────────────────────────────
// Oferta clave
// ─────────────────────────────────────────────────────────────
export const SPECIAL_OFFER = {
  headline: 'Commit to 12 essential therapies within 30 days and save 30%',
  perk: 'Plus complimentary access to EES, BioCharger, and Zero-G Massage sessions (based on availability).',
  sessionsRequired: 12,
  timeframeDays: 30,
  discountPercent: 30,
} as const

// ─────────────────────────────────────────────────────────────
// Evidencia científica (REAL y verificada — NO inventar citaciones)
// Solo se incluyen estudios reales, verificados, descritos de forma
// conservadora. `appliesTo` mapea a IDs de `therapies`.
// ─────────────────────────────────────────────────────────────
export interface EvidenceCitation {
  id: string
  /** Hallazgo en lenguaje claro (sin sobre-afirmar) */
  finding: string
  /** Citación formal */
  citation: string
  url: string
  appliesTo: string[]
}

export const citations: EvidenceCitation[] = [
  {
    id: 'sauna-kuopio',
    finding:
      'In a 20-year cohort of 2,315 men, frequent sauna bathing (4–7×/week) was associated with significantly lower cardiovascular and all-cause mortality, in a dose-dependent pattern.',
    citation: 'Laukkanen JA, Laukkanen T, Kunutsor SK, et al. JAMA Internal Medicine. 2015;175(4):542–548.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/25705824/',
    appliesTo: ['temperature-contrast', 'pemf-ozone-sauna'],
  },
  {
    id: 'floatation-rest',
    finding:
      'A clinical study found a single Floatation-REST session produced a large, immediate reduction in anxiety and stress, with improvements in mood and well-being.',
    citation: 'Feinstein JS, Khalsa SS, Yeh HW, et al. PLOS ONE. 2018;13(2):e0190292.',
    url: 'https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0190292',
    appliesTo: ['floatation-tanks'],
  },
  {
    id: 'photobiomodulation-hamblin',
    finding:
      'Red and near-infrared light (photobiomodulation) acts on mitochondrial cytochrome c oxidase to increase ATP and reduce inflammation, supporting cellular repair and recovery.',
    citation: 'Hamblin MR. AIMS Biophysics. 2017;4(3):337–361.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/28748217/',
    appliesTo: ['red-light-bed', 'recovery-tri-fusion'],
  },
  {
    id: 'hallmarks-of-aging',
    finding:
      'The "Hallmarks of Aging" framework defines twelve interconnected biological processes that drive aging — the scientific basis for targeting healthspan, not just lifespan.',
    citation: 'López-Otín C, Blasco MA, Partridge L, Serrano M, Kroemer G. Cell. 2023;186(2):243–278.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/36599349/',
    appliesTo: [],
  },
]

/** Therapy IDs que tienen al menos una citación científica real. */
export const therapiesWithEvidence: string[] = Array.from(
  new Set(citations.flatMap(c => c.appliesTo))
)

// ─────────────────────────────────────────────────────────────
// Signature IV Collection (del flyer oficial). SIN precios.
// "Each IV includes a secret homeopathic blend."
// ─────────────────────────────────────────────────────────────
export const SECRET_BLEND_NOTE = 'Every IV includes our secret homeopathic blend.'

export interface SignatureIV {
  id: string
  name: string
  series: 'pain' | 'alchemy'
  tagline: string
  ingredients: string[]
}

export const IV_SERIES = [
  { id: 'pain', label: 'Pain & Inflammation Series', glyph: '🜂', accent: '#E06090' },
  { id: 'alchemy', label: 'Signature Alchemy Series', glyph: '✦', accent: '#C9963C' },
] as const

export const signatureIVs: SignatureIV[] = [
  // ── Pain & Inflammation Series ──
  { id: 'pain-eraser', name: 'Pain Eraser IV', series: 'pain', tagline: 'Fast-acting relief for pain & inflammation', ingredients: ['Magnesium', 'Vitamin C', 'Anti-inflammatory support', 'Traumeel', 'DMSO'] },
  { id: 'inflammation-reset', name: 'Inflammation Reset', series: 'pain', tagline: 'Reduce swelling, restore balance', ingredients: ['Vitamin C', 'Magnesium', 'Zinc', 'Glutathione', 'Engystol'] },
  { id: 'deep-relief', name: 'Deep Relief Protocol', series: 'pain', tagline: 'Chronic pain + tissue repair', ingredients: ['Magnesium', 'Amino acids', 'L-Glutamine', 'Traumeel', 'Anti-inflammatory blend'] },
  { id: 'recovery-code', name: 'The Recovery Code', series: 'pain', tagline: 'Post-workout, injury, or burnout repair', ingredients: ['Amino acids', 'Taurine', 'Magnesium', 'Vitamin C', 'Zinc'] },
  { id: 'fire-calm', name: 'Fire & Calm IV', series: 'pain', tagline: 'Inflammation down, nervous system calm', ingredients: ['Magnesium', 'Vitamin C', 'Glutathione', 'Anti-inflammatory support'] },
  { id: 'body-reboot', name: 'Body Reboot', series: 'pain', tagline: 'Full system reset', ingredients: ['B Complex', 'Vitamin C', 'Magnesium', 'Glutathione', 'Amino acids'] },
  { id: 'neuro-relief', name: 'Neuro Relief Drip', series: 'pain', tagline: 'Nervous system + pain modulation', ingredients: ['Magnesium', 'B Complex', 'Taurine', 'Amino acids'] },
  // ── Signature Alchemy Series ──
  { id: 'neuro-alchemy', name: 'Neuro Alchemy', series: 'alchemy', tagline: 'Mental clarity + nervous system upgrade', ingredients: ['B Complex', 'Magnesium', 'Taurine', 'Amino acids'] },
  { id: 'cellular-rebirth', name: 'Cellular Rebirth', series: 'alchemy', tagline: 'Deep detox + regeneration', ingredients: ['Glutathione', 'Vitamin C', 'Gerovital', 'Magnesium'] },
  { id: 'adrenal-reset', name: 'Adrenal Reset', series: 'alchemy', tagline: 'Stress, cortisol & burnout recovery', ingredients: ['B Complex', 'Vitamin C', 'Magnesium', 'Amino acids'] },
  { id: 'divine-energy', name: 'Divine Energy IV', series: 'alchemy', tagline: 'Clean energy without the crash', ingredients: ['B12 (Cyanocobalamin — vegan option)', 'B Complex', 'Taurine', 'Amino acids'] },
  { id: 'inner-glow', name: 'Inner Glow Protocol', series: 'alchemy', tagline: 'Beauty + mood + radiance', ingredients: ['Glutathione', 'Vitamin C', 'Biotin', 'Magnesium'] },
  { id: 'the-upgrade', name: 'The Upgrade', series: 'alchemy', tagline: 'Next-level performance & vitality', ingredients: ['B12', 'Amino acids', 'Taurine', 'Zinc', 'Magnesium'] },
  { id: 'vitality-code', name: 'Vitality Code', series: 'alchemy', tagline: 'Daily energy + immune + longevity', ingredients: ['Vitamin C', 'B Complex', 'Zinc', 'Magnesium'] },
  { id: 'longevity-drip', name: 'Longevity Drip', series: 'alchemy', tagline: 'Anti-aging + cellular protection', ingredients: ['Glutathione', 'Vitamin C', 'Gerovital', 'Zinc'] },
  { id: 'the-regenerator', name: 'The Regenerator', series: 'alchemy', tagline: 'Deep healing + full restoration', ingredients: ['Glutathione', 'Amino acids', 'Magnesium', 'L-Glutamine', 'Vitamin C'] },
]

// ─────────────────────────────────────────────────────────────
// Signature care packages / memberships del doctor (W3). SIN precios de IV sueltos.
// ─────────────────────────────────────────────────────────────
export interface CarePackage {
  id: string
  name: string
  tagline: string
  bridges?: string
  includes: string[]
  note?: string
}

export const carePackages: CarePackage[] = [
  {
    id: 'aesthetic-longevity',
    name: 'Aesthetic & Longevity Package',
    tagline: 'For beauty, cellular rejuvenation, metabolism, and total wellness.',
    includes: [
      'Body composition scan', 'Longevity consultation', 'High-dose Vitamin C + Glutathione IV',
      'Red light therapy', 'Skin rejuvenation support', 'Metabolic optimization plan', 'Hormone & wellness review',
    ],
  },
  {
    id: 'nervous-system-longevity',
    name: 'Nervous System & Longevity Package',
    tagline: 'Regulate the system. Elevate the life.',
    bridges: 'Science + spirit + nervous-system regulation.',
    includes: [
      'HRV / stress evaluation', 'SGB consultation', 'IV therapy', 'Red light therapy',
      'Sound healing or meditation integration', 'Breathwork', 'Sleep optimization',
      'Supplement protocol', 'Lifestyle coaching',
    ],
  },
  {
    id: 'inner-alchemy-founding',
    name: 'Inner Alchemy — Founding Members',
    tagline: 'The complete biohacking & longevity membership — body, mind, and soul.',
    includes: [
      'Comprehensive blood panel 4×/year (home or office draws)', 'Epigenetics panel + TruAge biological-age test',
      'GI Effects & DUTCH Plus 2×/year', 'Pre/post heavy-metals testing 2×/year',
      'Functional Movement Screen, RMR & VO2 Max', 'DEXA / body-composition scan 3×/year',
      'Nutrition, exercise & lifestyle programming', 'Mental health / PTSD assessment & interventions',
      'Monthly IV therapy', '6 physician visits per year + monthly team & Bella check-ins',
      'Spiritual assessment & inner trauma-resolution work', 'Collective of healers + wearables & tracking',
    ],
    note: 'Add-ons: peptides, bio-identical hormones, regenerative orthopedics, P-Shot/O-Shot, NAD+, methylene blue, IV exosomes, full-body MRI, Cleerly heart scan, medicine journeys, acupuncture, and more.',
  },
]

export const ORION_SYSTEM_PROMPT = `You are ORION — the medical protocol intelligence system for Dr. Michael J. Meighen MD at The Alchemist Miami.

Dr. Meighen specializes in: Precision Medicine, Functional Medicine, Hormone Optimization (TRT + BHRT), Peptide Therapy (BPC-157, CJC-1295, Ipamorelin, Tirzepatide, TB-500, Sermorelin, PT-141), Longevity Medicine, Nervous System Regulation (polyvagal theory), Pain Resolution, Trauma Physiology, and Biohacking.

His philosophy: "Root cause medicine. The body is an integrated system — physical, emotional, and spiritual cannot be separated."

He works with Bella Vargas (Holistic Healer, Reiki Master, Harvard Coach, Nurse) for somatic and spiritual dimensions of patient care.

MONITORING REQUIREMENTS:
- CJC-1295/Ipamorelin: IGF-1 baseline + at 30 days. Fasting glucose monthly.
- TRT: Hematocrit (threshold 50%), PSA, estradiol at 3 months
- Rapamycin: trough levels target 3-8 ng/mL, lipid panel
- Metformin: GFR every 6 months (suspend if GFR <45), B12 annually
- Vitamin C high dose: G6PD verification BEFORE prescribing >10g

CRITICAL INTERACTIONS:
- Rapamycin + CYP3A4 inhibitors: levels 10-100× higher — CRITICAL
- Metformin + iodinated contrast: suspend 48h before/after — CRITICAL
- Vitamin C IV + G6PD deficiency: hemolysis — CRITICAL
- TRT + warfarin: increased anticoagulation — HIGH
- PT-141 + PDE5 inhibitors: hypotension — HIGH
- Glutathione IV fast drip + asthma: bronchospasm — HIGH`

export const CONTRAINDICATIONS_SYSTEM_PROMPT = `You are ORION's clinical safety module for Dr. Michael J. Meighen MD.

Analyze this patient's complete protocol profile for safety issues.

CHECK THE FOLLOWING:

1. DRUG-DRUG INTERACTIONS:
   - Rapamycin + CYP3A4 inhibitors/inducers
   - Metformin + contrast agents or renal function
   - TRT + anticoagulants (warfarin, etc.)
   - PT-141 + PDE5 inhibitors or antihypertensives
   - GH peptides (CJC-1295, Ipamorelin, Sermorelin) + diabetes medications
   - Tirzepatide + insulin (hypoglycemia risk)

2. PROTOCOL-CONDITION CONTRAINDICATIONS:
   - Cancer history (active or <5 years) + BPC-157, TB-500, CJC-1295, Ipamorelin, Sermorelin → angiogenesis risk
   - GFR <45 + Metformin → lactic acidosis CRITICAL
   - GFR <30 + NAD+ high dose → toxicity
   - G6PD deficiency + Vitamin C >10g → hemolysis CRITICAL
   - Hematocrit >50% + TRT → polycythemia CRITICAL
   - Active uncontrolled diabetes (HbA1c >8%) + GH peptides
   - Active infection + Rapamycin → immunosuppression
   - Severe active asthma + Glutathione IV → bronchospasm HIGH
   - Pregnancy + all peptides and hormones → CRITICAL
   - Active clot/VTE + Estradiol or Progesterone → CRITICAL
   - Personal/family history MTC or MEN2 + Tirzepatide → CRITICAL

3. MONITORING DEFICITS (overdue labs):
   - IGF-1 not checked since starting GH peptides
   - Hematocrit >3 months without check on TRT
   - GFR >6 months without check on Metformin
   - Rapamycin trough not checked this cycle
   - No PSA in 12 months for TRT patient >40 years

4. TIMING CONFLICTS:
   - Metformin prescribed with upcoming contrast imaging
   - Rapamycin with surgery planned within 2 weeks

FOR EACH ISSUE FOUND, respond with this exact JSON format:
{
  "cleared": false,
  "issues": [
    {
      "severity": "CRITICAL | HIGH | MEDIUM | LOW",
      "issue": "description",
      "protocols": ["Protocol A", "Protocol B"],
      "reason": "clinical mechanism",
      "action": "what Dr. Meighen should do"
    }
  ],
  "analysis": "summary paragraph"
}

If all clear, respond with:
{
  "cleared": true,
  "issues": [],
  "analysis": "CLEARED — No contraindications, interactions, or monitoring deficits detected. All active protocols reviewed. Safe to proceed."
}`

export const PROTOCOL_CATALOG = {
  peptides: [
    {
      name: 'BPC-157',
      category: 'peptide',
      description: 'Body Protection Compound. Reparación tisular, GI, anti-inflamatoria.',
      default_dose: '250-500',
      dose_unit: 'mcg',
      frequency: 'daily',
      route: 'subcutaneous',
      typical_cycle_weeks: 12,
      contraindications: ['embarazo', 'historia de cáncer activo', 'enfermedad autoinmune severa'],
      labs_required: [],
      notes: 'Almacenar reconstituido 2-8°C, usar en 28 días.',
    },
    {
      name: 'CJC-1295 + Ipamorelin',
      category: 'peptide',
      description: 'Stack GH. Estimulación de GH sin elevar cortisol.',
      default_dose: '100-300',
      dose_unit: 'mcg',
      frequency: 'daily',
      route: 'subcutaneous',
      timing: '30 min before sleep',
      typical_cycle_weeks: 12,
      contraindications: ['cáncer activo', 'diabetes HbA1c>8%', 'retinopatía diabética', 'acromegalia'],
      labs_required: ['IGF-1 baseline', 'fasting glucose', 'TSH'],
      monitoring: 'IGF-1 at 30 days. Target IGF-1 <350. Fasting glucose monthly.',
    },
    {
      name: 'Tirzepatide',
      category: 'peptide',
      description: 'GLP-1/GIP dual agonist. Metabólico, pérdida de peso, cardiovascular.',
      default_dose: '2.5-15',
      dose_unit: 'mg',
      frequency: 'weekly',
      route: 'subcutaneous',
      contraindications: ['historia personal/familiar CMT', 'MEN2', 'pancreatitis activa', 'gastroparesis'],
      labs_required: ['HbA1c', 'panel lipídico', 'función renal'],
      monitoring: 'HbA1c each 3 months. Lipids. Renal function.',
      notes: 'Escalar 2.5mg → 5mg → 7.5mg → 10mg → 12.5mg → 15mg mensual.',
    },
    {
      name: 'TB-500 (Thymosin Beta-4)',
      category: 'peptide',
      description: 'Reparación muscular/tendinosa. Anti-inflamatorio. Recuperación.',
      default_dose: '2-4',
      dose_unit: 'mg',
      frequency: 'twice-weekly',
      typical_cycle_weeks: 6,
      contraindications: ['cáncer activo', 'autoinmune severo'],
    },
    {
      name: 'Sermorelin',
      category: 'peptide',
      description: 'GHRH análogo. Sueño, anti-aging, composición corporal.',
      default_dose: '200-500',
      dose_unit: 'mcg',
      frequency: 'daily',
      timing: 'nightly',
      typical_cycle_weeks: 16,
      contraindications: ['hipotiroidismo no tratado', 'cáncer activo'],
    },
    {
      name: 'PT-141 (Bremelanotide)',
      category: 'peptide',
      description: 'Sexual wellness. Actúa centralmente (MC4R). Aprobado FDA mujeres.',
      default_dose: '1-2',
      dose_unit: 'mg',
      frequency: 'as-needed',
      route: 'subcutaneous',
      contraindications: ['HTA no controlada', 'enfermedad cardiovascular severa'],
      interactions: ['PDE5 inhibitors (hipotensión)', 'antihypertensives (potenciación)'],
    },
  ],
  hormones: [
    {
      name: 'Testosterone Cypionate',
      category: 'hormone',
      description: 'TRT. Requiere 2× test matutina + síntomas.',
      default_dose: '100-200',
      dose_unit: 'mg',
      frequency: 'weekly',
      route: 'intramuscular or subcutaneous',
      contraindications: ['cáncer próstata activo', 'hematocrito >54%', 'policitemia', 'apnea severa no tratada'],
      labs_required: ['testosterona total/libre', 'LH', 'FSH', 'hematocrito baseline', 'PSA'],
      monitoring: 'Hematocrito UMBRAL 50% — si >50% suspender. PSA a 3 y 6 meses. Estradiol.',
    },
    {
      name: 'Progesterone (Bioidentical)',
      category: 'hormone',
      description: 'Sueño, estado de ánimo, protección endometrial.',
      default_dose: '100-200',
      dose_unit: 'mg',
      frequency: 'daily',
      route: 'oral',
      timing: 'nightly',
      contraindications: ['cáncer hormonodependiente', 'TEV activo', 'enfermedad hepática severa'],
    },
    {
      name: 'Estradiol (Bioidentical)',
      category: 'hormone',
      description: 'TRH femenino. Menopausia, hueso, cognición.',
      default_dose: '1-2',
      dose_unit: 'mg',
      frequency: 'daily',
      contraindications: ['cáncer mama/endometrio', 'TEV activo', 'migraña con aura'],
    },
    {
      name: 'DHEA',
      category: 'hormone',
      description: 'Precursor hormonal. Energía, libido, inmune, anti-aging.',
      default_dose: '25-50',
      dose_unit: 'mg',
      frequency: 'daily',
      route: 'oral',
      contraindications: ['cáncer hormonodependiente', 'trastorno bipolar activo'],
      monitoring: 'DHEA-S cada 3 meses',
    },
  ],
  iv_therapies: [
    {
      name: 'NAD+ IV',
      category: 'iv',
      description: 'Energía celular, reparación ADN, longevidad. INFUSIÓN LENTA.',
      default_dose: '500-1000',
      dose_unit: 'mg',
      frequency: 'weekly',
      duration_minutes: '120-240',
      contraindications: ['GFR <30', 'embarazo'],
      notes: 'Siempre infusión LENTA 2-4h. Pre-hidratar 250-500mL NS.',
    },
    {
      name: 'Glutathione IV',
      category: 'iv',
      description: 'Master antioxidante. Detox, piel, inmune.',
      default_dose: '600-1200',
      dose_unit: 'mg',
      frequency: 'weekly',
      critical_warning: 'ASMA ACTIVA: infusión muy lenta, tener broncodilatador disponible',
    },
    {
      name: 'Vitamin C High-Dose IV',
      category: 'iv',
      description: 'Inmunidad, anti-inflamatorio, colágeno.',
      default_dose: '7500-25000',
      dose_unit: 'mg',
      frequency: 'weekly',
      critical_warning: 'G6PD DEFICIENCY = CONTRAINDICACIÓN ABSOLUTA para dosis >10g (hemólisis). VERIFICAR G6PD PRIMERO.',
    },
    {
      name: 'Myers Cocktail IV',
      category: 'iv',
      description: 'B vitaminas + Mg + Ca + Vitamina C. Fatiga, migraña, bienestar.',
      default_dose: 'standard',
      dose_unit: 'protocol',
      frequency: 'weekly',
      duration_minutes: '30-60',
    },
  ],
  longevity: [
    {
      name: 'Metformin (Longevity)',
      category: 'supplement',
      description: 'mTOR inhibición, anti-aging, metabolismo.',
      default_dose: '500-1000',
      dose_unit: 'mg',
      frequency: 'daily',
      route: 'oral',
      timing: 'with food',
      critical_contraindications: ['GFR <45 (acidosis láctica)', 'falla hepática', 'alcoholismo activo'],
      drug_interactions: ['CONTRASTE YODADO: suspender 48h antes y después'],
      monitoring: 'Creatinina y GFR cada 6 meses. B12 anualmente.',
    },
    {
      name: 'Rapamycin (Longevity)',
      category: 'supplement',
      description: 'mTOR inhibición, autophagia, senolítico. Off-label. 5-6mg semanal.',
      default_dose: '5-6',
      dose_unit: 'mg',
      frequency: 'weekly',
      route: 'oral',
      contraindications: ['infección activa', 'cirugía en ≤2 semanas', 'embarazo'],
      drug_interactions: ['CYP3A4 inhibidores: niveles 10-100× mayor — CRÍTICO'],
      monitoring: 'Trough levels: target 3-8 ng/mL. Panel lipídico. CBC. Función renal.',
    },
  ],
}

export const CRITICAL_INTERACTIONS = [
  {
    drug_a: 'Rapamycin', drug_b: 'CYP3A4 inhibidores', severity: 'CRITICAL',
    effect: 'Niveles Rapamycin 10-100× mayores — toxicidad severa',
    action: 'CONTRAINDICADO sin ajuste estricto de dosis y monitoreo',
  },
  {
    drug_a: 'Metformina', drug_b: 'Contraste yodado', severity: 'CRITICAL',
    effect: 'Acidosis láctica severa',
    action: 'Suspender 48h antes y 48h después del contraste',
  },
  {
    drug_a: 'Vitamina C IV >10g', drug_b: 'G6PD deficiency', severity: 'CRITICAL',
    effect: 'Hemólisis severa potencialmente fatal',
    action: 'CONTRAINDICADO ABSOLUTO — verificar G6PD siempre',
  },
  {
    drug_a: 'TRT', drug_b: 'Warfarina', severity: 'HIGH',
    effect: 'Aumento del efecto anticoagulante',
    action: 'Monitoreo frecuente de INR al iniciar TRT',
  },
  {
    drug_a: 'PT-141', drug_b: 'PDE5 inhibidores', severity: 'HIGH',
    effect: 'Hipotensión severa',
    action: 'No combinar sin ajuste de dosis y supervisión',
  },
  {
    drug_a: 'Glutathione IV', drug_b: 'Asma activa', severity: 'HIGH',
    effect: 'Broncoespasmo si infusión rápida',
    action: 'Infusión muy lenta + broncodilatador disponible',
  },
]

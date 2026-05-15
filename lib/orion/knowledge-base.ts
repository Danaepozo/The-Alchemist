export const ORION_SYSTEM_PROMPT = `You are ORION — the medical protocol intelligence system for Dr. Michael J. Meighen MD at The Alchemist Miami.

Dr. Meighen specializes in: Precision Medicine, Functional Medicine, Hormone Optimization (TRT + BHRT), Peptide Therapy, GLP-1 Agonists, Longevity Medicine, Senolytics, Nervous System Regulation (polyvagal theory), Pain Resolution, Trauma Physiology, IV Nutritional Therapy, and Biohacking.

His philosophy: "Root cause medicine. The body is an integrated system — physical, emotional, and spiritual cannot be separated."

He works with Bella Vargas (Holistic Healer, Reiki Master, Harvard Coach, Nurse) for somatic and spiritual dimensions of patient care.

MONITORING REQUIREMENTS:
- CJC-1295/Ipamorelin/Sermorelin: IGF-1 baseline + at 30 days. Fasting glucose monthly.
- TRT: Hematocrit (threshold 50%), PSA, estradiol at 3 months
- Rapamycin: trough levels target 3-8 ng/mL, lipid panel, CBC
- Metformin: GFR every 6 months (suspend if GFR <45), B12 annually
- Vitamin C high dose: G6PD verification BEFORE prescribing >10g
- Tirzepatide/Semaglutide: HbA1c, lipids, renal function q3 months
- LDN (Low Dose Naltrexone): liver enzymes at baseline and 3 months
- Thymosin Alpha-1: CBC, immunoglobulins if immunocompromised
- DHEA/Pregnenolone: DHEA-S, testosterone, estradiol q3 months
- NMN/NR: fasting glucose, metabolic panel annually
- Dasatinib + Quercetin: CBC, renal panel, LFTs before each cycle
- Canagliflozin/Empagliflozin: GFR, glucose, urinalysis
- HCG: testosterone, LH, FSH, estradiol q6 weeks
- Anastrozole: estradiol q6 weeks (target 20-30 pg/mL in men)

CRITICAL INTERACTIONS:
- Rapamycin + CYP3A4 inhibitors: levels 10-100× higher — CRITICAL
- Metformin + iodinated contrast: suspend 48h before/after — CRITICAL
- Vitamin C IV + G6PD deficiency: hemolysis — CRITICAL
- TRT + warfarin: increased anticoagulation — HIGH
- PT-141 + PDE5 inhibitors: hypotension — HIGH
- Glutathione IV fast drip + asthma: bronchospasm — HIGH
- Tirzepatide/Semaglutide + insulin: hypoglycemia — HIGH
- LDN + opioids: blocks analgesia completely — CRITICAL
- Dasatinib + anticoagulants: bleeding risk — HIGH
- EDTA chelation + renal impairment: nephrotoxicity — HIGH
- Ozone IV + antioxidant IV same day: counteracts ozone — MEDIUM`

export const CONTRAINDICATIONS_SYSTEM_PROMPT = `You are ORION's clinical safety module for Dr. Michael J. Meighen MD.

Analyze this patient's complete protocol profile for safety issues.

CHECK THE FOLLOWING:

1. DRUG-DRUG INTERACTIONS:
   - Rapamycin + CYP3A4 inhibitors/inducers
   - Metformin + contrast agents or renal function
   - TRT + anticoagulants (warfarin, heparin, apixaban)
   - PT-141 + PDE5 inhibitors or antihypertensives
   - GH peptides (CJC-1295, Ipamorelin, Sermorelin) + diabetes medications
   - Tirzepatide/Semaglutide + insulin (hypoglycemia risk)
   - LDN + opioid medications (blocks pain relief)
   - Dasatinib + anticoagulants, antifungals, CYP3A4 drugs
   - EDTA chelation + digoxin (removes calcium)
   - Multiple GH secretagogues simultaneously (IGF-1 overdrive)
   - Testosterone + 5-alpha reductase inhibitors (finasteride/dutasteride)

2. PROTOCOL-CONDITION CONTRAINDICATIONS:
   - Cancer history (active or <5 years) + BPC-157, TB-500, CJC-1295, Ipamorelin, Sermorelin, AOD-9604 → angiogenesis risk
   - GFR <45 + Metformin → lactic acidosis CRITICAL
   - GFR <45 + Canagliflozin/Empagliflozin → reduced efficacy, DKA risk
   - GFR <30 + NAD+ high dose → toxicity
   - G6PD deficiency + Vitamin C >10g → hemolysis CRITICAL
   - Hematocrit >50% + TRT → polycythemia CRITICAL
   - Active uncontrolled diabetes (HbA1c >8%) + GH peptides
   - Active infection + Rapamycin → immunosuppression
   - Severe active asthma + Glutathione IV → bronchospasm HIGH
   - Pregnancy + all peptides and hormones → CRITICAL
   - Active clot/VTE + Estradiol or Progesterone → CRITICAL
   - Personal/family history MTC or MEN2 + Tirzepatide/Semaglutide → CRITICAL
   - Autoimmune disease active flare + Thymosin Alpha-1 → review
   - Active opioid use + LDN → complete block of analgesia CRITICAL
   - Severe hepatic impairment + Dasatinib → dose reduction required
   - Bilateral renal artery stenosis + SGLT2 inhibitors → CRITICAL
   - Prostate cancer + DHEA/Testosterone → CRITICAL
   - Hormone-sensitive cancer + Estradiol/Progesterone/DHEA → CRITICAL

3. MONITORING DEFICITS (overdue labs):
   - IGF-1 not checked since starting GH peptides
   - Hematocrit >3 months without check on TRT
   - GFR >6 months without check on Metformin
   - Rapamycin trough not checked this cycle
   - No PSA in 12 months for TRT patient >40 years
   - Estradiol not checked on Anastrozole (risk of over-suppression)
   - DHEA-S not checked in >3 months on DHEA
   - LFTs not checked in >3 months on LDN or Dasatinib

4. TIMING CONFLICTS:
   - Metformin prescribed with upcoming contrast imaging
   - Rapamycin with surgery planned within 2 weeks
   - Ozone IV + antioxidant IV same day (counterproductive)
   - Dasatinib cycle due but no pre-cycle labs completed

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
      description: 'Body Protection Compound. Tissue repair, GI healing, anti-inflammatory, tendon/ligament.',
      default_dose: '250-500',
      dose_unit: 'mcg',
      frequency: 'daily',
      route: 'subcutaneous or oral',
      typical_cycle_weeks: 12,
      contraindications: ['pregnancy', 'active cancer', 'severe autoimmune disease'],
      labs_required: [],
      notes: 'Store reconstituted 2-8°C, use within 28 days. Oral for GI conditions, SQ for systemic.',
    },
    {
      name: 'CJC-1295 + Ipamorelin',
      category: 'peptide',
      description: 'GH stack. Stimulates GH without raising cortisol. Sleep, body composition, recovery.',
      default_dose: '100-300',
      dose_unit: 'mcg each',
      frequency: 'daily',
      route: 'subcutaneous',
      timing: '30 min before sleep on empty stomach',
      typical_cycle_weeks: 12,
      contraindications: ['active cancer', 'diabetes HbA1c>8%', 'diabetic retinopathy', 'acromegaly'],
      labs_required: ['IGF-1 baseline', 'fasting glucose', 'TSH'],
      monitoring: 'IGF-1 at 30 days. Target IGF-1 <350 ng/mL. Fasting glucose monthly.',
    },
    {
      name: 'Ipamorelin (Solo)',
      category: 'peptide',
      description: 'Selective GH secretagogue. Clean GH pulse — no cortisol, no prolactin elevation.',
      default_dose: '200-300',
      dose_unit: 'mcg',
      frequency: 'daily',
      route: 'subcutaneous',
      timing: 'Before sleep or post-workout',
      typical_cycle_weeks: 12,
      contraindications: ['active cancer', 'uncontrolled diabetes'],
      labs_required: ['IGF-1 baseline'],
      monitoring: 'IGF-1 at 30 days.',
    },
    {
      name: 'Tirzepatide',
      category: 'peptide',
      description: 'GLP-1/GIP dual agonist. Metabolic, weight loss, cardiovascular, anti-inflammatory.',
      default_dose: '2.5-15',
      dose_unit: 'mg',
      frequency: 'weekly',
      route: 'subcutaneous',
      contraindications: ['personal/family history MTC', 'MEN2', 'active pancreatitis', 'gastroparesis'],
      labs_required: ['HbA1c', 'lipid panel', 'renal function', 'amylase/lipase'],
      monitoring: 'HbA1c q3 months. Lipids. Renal function. Monitor for pancreatitis symptoms.',
      notes: 'Titrate: 2.5mg → 5mg → 7.5mg → 10mg → 12.5mg → 15mg monthly as tolerated.',
    },
    {
      name: 'Semaglutide',
      category: 'peptide',
      description: 'GLP-1 agonist. Weight loss, metabolic, cardiovascular protection, anti-inflammatory.',
      default_dose: '0.25-2.4',
      dose_unit: 'mg',
      frequency: 'weekly',
      route: 'subcutaneous',
      contraindications: ['personal/family history MTC', 'MEN2', 'active pancreatitis'],
      labs_required: ['HbA1c', 'lipid panel', 'renal function'],
      monitoring: 'HbA1c q3 months. Watch for GI side effects. Renal function.',
      notes: 'Titrate: 0.25mg → 0.5mg → 1mg → 1.7mg → 2.4mg q4 weeks. Take same day each week.',
    },
    {
      name: 'TB-500 (Thymosin Beta-4)',
      category: 'peptide',
      description: 'Muscle/tendon repair. Anti-inflammatory. Athletic recovery. Wound healing.',
      default_dose: '2-4',
      dose_unit: 'mg',
      frequency: 'twice-weekly',
      route: 'subcutaneous or intramuscular',
      typical_cycle_weeks: 6,
      contraindications: ['active cancer', 'severe autoimmune disease'],
      notes: 'Loading phase: 2x/week for 4-6 weeks. Maintenance: once weekly.',
    },
    {
      name: 'Sermorelin',
      category: 'peptide',
      description: 'GHRH analogue. Sleep quality, anti-aging, body composition. Gentler than CJC-1295.',
      default_dose: '200-500',
      dose_unit: 'mcg',
      frequency: 'daily',
      timing: 'Nightly before sleep',
      typical_cycle_weeks: 16,
      contraindications: ['untreated hypothyroidism', 'active cancer'],
      labs_required: ['IGF-1 baseline', 'TSH'],
    },
    {
      name: 'PT-141 (Bremelanotide)',
      category: 'peptide',
      description: 'Sexual wellness. Central mechanism (MC4R). FDA-approved for HSDD in women.',
      default_dose: '1-2',
      dose_unit: 'mg',
      frequency: 'as-needed',
      route: 'subcutaneous',
      timing: '45 min before sexual activity',
      contraindications: ['uncontrolled hypertension', 'severe cardiovascular disease'],
      interactions: ['PDE5 inhibitors (hypotension)', 'antihypertensives (potentiation)'],
      notes: 'Do not use more than once per 24h. Monitor BP 12h post-dose.',
    },
    {
      name: 'AOD-9604',
      category: 'peptide',
      description: 'GH fragment (176-191). Fat metabolism, no anabolic or IGF-1 effects. Weight management.',
      default_dose: '250-300',
      dose_unit: 'mcg',
      frequency: 'daily',
      route: 'subcutaneous',
      timing: 'Fasting, morning',
      typical_cycle_weeks: 12,
      contraindications: ['pregnancy', 'active cancer (caution)'],
      notes: 'Administer on empty stomach for best results. Minimal side effects vs. full GH.',
    },
    {
      name: 'GHK-Cu (Copper Peptide)',
      category: 'peptide',
      description: 'Tissue regeneration, collagen synthesis, anti-inflammatory, wound healing, hair.',
      default_dose: '1-2',
      dose_unit: 'mg',
      frequency: 'daily',
      route: 'subcutaneous or topical',
      typical_cycle_weeks: 8,
      contraindications: ['Wilson\'s disease (copper storage disorder)'],
      notes: 'Injectable for systemic; topical cream for skin/hair. Well-tolerated.',
    },
    {
      name: 'Epithalon',
      category: 'peptide',
      description: 'Telomere elongation. Epigenetic anti-aging. Pineal gland regulation. Longevity.',
      default_dose: '5-10',
      dose_unit: 'mg',
      frequency: 'daily',
      route: 'subcutaneous or intravenous',
      typical_cycle_weeks: 2,
      contraindications: ['autoimmune disease (caution)', 'active cancer'],
      notes: '10-day cycle, 2x per year. Store protected from light.',
    },
    {
      name: 'Thymosin Alpha-1 (Tα1)',
      category: 'peptide',
      description: 'Immune modulation. Viral/bacterial resistance. Cancer adjunct. Autoimmune regulation.',
      default_dose: '1.6',
      dose_unit: 'mg',
      frequency: 'twice-weekly',
      route: 'subcutaneous',
      typical_cycle_weeks: 6,
      contraindications: ['organ transplant on immunosuppressants'],
      labs_required: ['CBC', 'immunoglobulins if immunocompromised'],
      notes: 'Used in HIV, hepatitis, cancer immunotherapy adjunct. Well-tolerated.',
    },
    {
      name: 'Selank',
      category: 'peptide',
      description: 'Anxiolytic, nootropic, immune modulation. GABA-A + BDNF mechanism. Anti-anxiety.',
      default_dose: '250-500',
      dose_unit: 'mcg',
      frequency: 'daily',
      route: 'intranasal',
      typical_cycle_weeks: 4,
      contraindications: ['severe renal impairment'],
      notes: 'Russian neuropeptide. No tolerance or dependence. Calming without sedation.',
    },
    {
      name: 'Semax',
      category: 'peptide',
      description: 'ACTH analogue. Cognitive enhancement, BDNF, neuroprotection, focus, mood.',
      default_dose: '100-900',
      dose_unit: 'mcg',
      frequency: 'daily',
      route: 'intranasal',
      typical_cycle_weeks: 4,
      contraindications: ['seizure disorder (caution)', 'severe anxiety disorders'],
      notes: 'Powerful nootropic. Start low. May cycle 4 weeks on / 2 weeks off.',
    },
    {
      name: 'DSIP (Delta Sleep Inducing Peptide)',
      category: 'peptide',
      description: 'Deep sleep induction, stress normalization, pain reduction, cortisol regulation.',
      default_dose: '100-200',
      dose_unit: 'mcg',
      frequency: 'daily',
      route: 'subcutaneous',
      timing: '30 min before sleep',
      typical_cycle_weeks: 2,
      contraindications: [],
      notes: 'Use in 7-10 day cycles. Excellent for HPA axis normalization.',
    },
    {
      name: 'KPV',
      category: 'peptide',
      description: 'Alpha-MSH fragment. Anti-inflammatory. Inflammatory bowel disease, skin, gut healing.',
      default_dose: '200-500',
      dose_unit: 'mcg',
      frequency: 'daily',
      route: 'oral or subcutaneous',
      typical_cycle_weeks: 8,
      contraindications: ['pregnancy'],
      notes: 'Oral capsules for gut; SQ for systemic anti-inflammatory.',
    },
    {
      name: 'VIP (Vasoactive Intestinal Peptide)',
      category: 'peptide',
      description: 'CIRS/mold illness treatment. Pulmonary hypertension, anti-inflammatory, immune balance.',
      default_dose: '50',
      dose_unit: 'mcg',
      frequency: '4x daily',
      route: 'intranasal',
      contraindications: ['active mold exposure (must remediate first)', 'severe hypotension'],
      labs_required: ['MMP-9', 'TGF-beta1', 'VEGF', 'VIP level baseline'],
      notes: 'Shoemaker protocol. Must confirm no ongoing biotoxin exposure. 30-day course.',
    },
    {
      name: 'LL-37',
      category: 'peptide',
      description: 'Antimicrobial peptide. Immune defense, biofilm disruption, wound healing.',
      default_dose: '100-200',
      dose_unit: 'mcg',
      frequency: 'daily',
      route: 'subcutaneous',
      typical_cycle_weeks: 4,
      contraindications: ['active autoimmune flare'],
      notes: 'Defensin-like peptide. Used in chronic infections, Lyme, SIBO adjunct.',
    },
    {
      name: 'MOTS-c',
      category: 'peptide',
      description: 'Mitochondrial-derived peptide. Metabolic regulation, insulin sensitivity, exercise mimetic.',
      default_dose: '5-10',
      dose_unit: 'mg',
      frequency: 'weekly',
      route: 'subcutaneous or intravenous',
      contraindications: ['active cancer (caution — research stage)'],
      notes: 'Mitochondrial peptide. Research compound. Promising for metabolic syndrome and longevity.',
    },
    {
      name: 'Humanin',
      category: 'peptide',
      description: 'Mitochondrial peptide. Neuroprotection, anti-apoptotic, metabolic, cardiovascular.',
      default_dose: '2-4',
      dose_unit: 'mg',
      frequency: 'twice-weekly',
      route: 'subcutaneous',
      contraindications: [],
      notes: 'Research stage mitochondrial peptide. Neuroprotective. Pair with MOTS-c for mitochondrial stack.',
    },
    {
      name: 'Oxytocin',
      category: 'peptide',
      description: 'Bonding, social connection, anxiety, PTSD, gut motility, anti-inflammatory.',
      default_dose: '20-40',
      dose_unit: 'IU',
      frequency: 'daily',
      route: 'intranasal',
      contraindications: ['active psychosis'],
      notes: 'Intranasal OXT. Pairs well with trauma/nervous system work. Bella\'s protocols.',
    },
  ],
  hormones: [
    {
      name: 'Testosterone Cypionate',
      category: 'hormone',
      description: 'TRT male. Energy, muscle, libido, mood, cognitive function.',
      default_dose: '100-200',
      dose_unit: 'mg',
      frequency: 'weekly',
      route: 'intramuscular or subcutaneous',
      contraindications: ['active prostate cancer', 'hematocrit >54%', 'polycythemia', 'untreated severe sleep apnea'],
      labs_required: ['total/free testosterone', 'LH', 'FSH', 'hematocrit baseline', 'PSA', 'estradiol'],
      monitoring: 'Hematocrit THRESHOLD 50% — if >50% hold/phlebotomy. PSA at 3 and 6 months. Estradiol target 20-30 pg/mL.',
    },
    {
      name: 'Testosterone Pellets',
      category: 'hormone',
      description: 'Long-acting TRT. Inserted subcutaneously, lasts 3-6 months. Steady levels.',
      default_dose: '150-450',
      dose_unit: 'mg',
      frequency: 'every 3-6 months',
      route: 'subcutaneous implant',
      contraindications: ['active prostate cancer', 'polycythemia'],
      labs_required: ['testosterone', 'hematocrit', 'PSA', 'estradiol before each insertion'],
      notes: 'Good for compliance. Cannot adjust dose once implanted. Check levels at 4 weeks post-insertion.',
    },
    {
      name: 'Progesterone (Bioidentical)',
      category: 'hormone',
      description: 'Sleep, mood, endometrial protection, anxiety reduction. BHRT female.',
      default_dose: '100-200',
      dose_unit: 'mg',
      frequency: 'daily',
      route: 'oral',
      timing: 'Nightly',
      contraindications: ['hormone-sensitive cancer', 'active VTE', 'severe hepatic disease'],
      notes: 'Oral has first-pass conversion to allopregnanolone (anxiolytic/sleep benefit). Topical available.',
    },
    {
      name: 'Estradiol (Bioidentical)',
      category: 'hormone',
      description: 'Female HRT. Menopause symptoms, bone density, cardiovascular, cognition.',
      default_dose: '1-2',
      dose_unit: 'mg',
      frequency: 'daily',
      route: 'oral, patch, or cream',
      contraindications: ['breast/endometrial cancer', 'active VTE', 'migraine with aura (oral only)'],
      notes: 'Transdermal preferred over oral (avoids first-pass, lower clot risk). Pair with progesterone if uterus intact.',
    },
    {
      name: 'DHEA',
      category: 'hormone',
      description: 'Hormonal precursor. Energy, libido, immune, anti-aging, adrenal support.',
      default_dose: '25-50',
      dose_unit: 'mg',
      frequency: 'daily',
      route: 'oral',
      contraindications: ['hormone-sensitive cancer', 'active bipolar disorder'],
      monitoring: 'DHEA-S every 3 months. Monitor testosterone + estradiol in women.',
    },
    {
      name: 'Pregnenolone',
      category: 'hormone',
      description: 'Master precursor hormone. Memory, neuroplasticity, mood, stress resilience.',
      default_dose: '50-200',
      dose_unit: 'mg',
      frequency: 'daily',
      route: 'oral',
      contraindications: ['hormone-sensitive cancer', 'seizure disorder (high doses)'],
      monitoring: 'DHEA-S, testosterone, estradiol, progesterone at 8 weeks.',
      notes: 'Can convert to DHEA, testosterone, or progesterone. Start low.',
    },
    {
      name: 'HCG (Human Chorionic Gonadotropin)',
      category: 'hormone',
      description: 'LH mimic. Preserves testicular function on TRT. Fertility. Natural testosterone stimulation.',
      default_dose: '250-500',
      dose_unit: 'IU',
      frequency: 'twice-weekly',
      route: 'subcutaneous',
      contraindications: ['active prostate cancer', 'testicular cancer'],
      labs_required: ['testosterone', 'LH', 'FSH', 'estradiol'],
      monitoring: 'Estradiol q6 weeks (can elevate significantly). Testosterone q6 weeks.',
    },
    {
      name: 'Anastrozole',
      category: 'hormone',
      description: 'Aromatase inhibitor. Controls estradiol elevation from TRT or HCG. Male HRT adjunct.',
      default_dose: '0.25-1',
      dose_unit: 'mg',
      frequency: 'twice-weekly',
      route: 'oral',
      contraindications: ['severe osteoporosis', 'pregnancy'],
      monitoring: 'Estradiol q6 weeks. Target 20-30 pg/mL in men. Over-suppression risk (joint pain, libido loss, cardiovascular).',
      notes: 'Never use without confirmed high estradiol. Over-suppression is harmful.',
    },
    {
      name: 'Clomiphene (Enclomiphene)',
      category: 'hormone',
      description: 'SERM. Stimulates LH/FSH → natural testosterone. Fertility preservation. Restart post-TRT.',
      default_dose: '12.5-50',
      dose_unit: 'mg',
      frequency: 'daily or EOD',
      route: 'oral',
      contraindications: ['liver disease', 'ovarian cysts (women)', 'hormone-sensitive cancer'],
      labs_required: ['testosterone', 'LH', 'FSH', 'estradiol', 'LFTs'],
      monitoring: 'Testosterone, LH/FSH at 6 weeks.',
    },
    {
      name: 'Melatonin (Therapeutic)',
      category: 'hormone',
      description: 'Circadian reset, sleep architecture, antioxidant, anti-cancer, immune modulation.',
      default_dose: '5-20',
      dose_unit: 'mg',
      frequency: 'nightly',
      route: 'oral',
      timing: '60 min before sleep',
      contraindications: ['autoimmune disease (very high doses)', 'pregnancy'],
      notes: 'Therapeutic doses (5-20mg) differ from standard OTC (0.5-1mg). Anti-inflammatory and antioxidant at higher doses.',
    },
    {
      name: 'Low-Dose Hydrocortisone',
      category: 'hormone',
      description: 'Adrenal insufficiency, chronic fatigue, HPA axis dysfunction. Physiologic replacement.',
      default_dose: '5-20',
      dose_unit: 'mg',
      frequency: 'daily (split dose)',
      route: 'oral',
      timing: 'AM and early afternoon only',
      contraindications: ['uncontrolled infection', 'active peptic ulcer'],
      labs_required: ['cortisol AM', 'ACTH stimulation test', 'DHEA-S'],
      monitoring: 'Morning cortisol. Avoid evening dosing — disrupts sleep.',
      notes: 'Physiologic, not pharmacologic dosing. Must taper if stopping after >4 weeks.',
    },
    {
      name: 'T3 Liothyronine',
      category: 'hormone',
      description: 'Active thyroid hormone. Low T3 syndrome, poor T4→T3 conversion, brain fog, fatigue.',
      default_dose: '5-25',
      dose_unit: 'mcg',
      frequency: 'daily or BID',
      route: 'oral',
      contraindications: ['untreated adrenal insufficiency', 'active cardiac arrhythmia', 'severe CAD'],
      labs_required: ['TSH', 'free T3', 'free T4', 'reverse T3'],
      monitoring: 'Free T3, free T4, TSH at 6 weeks. Heart rate monitoring.',
    },
    {
      name: 'Desiccated Thyroid (NDT)',
      category: 'hormone',
      description: 'Natural T4+T3 combination thyroid. Hypothyroidism. Better symptom control vs T4 alone for some patients.',
      default_dose: '30-120',
      dose_unit: 'mg',
      frequency: 'daily',
      route: 'oral',
      timing: 'Fasting, 30-60 min before breakfast',
      contraindications: ['adrenal insufficiency untreated', 'cardiac arrhythmia'],
      labs_required: ['TSH', 'free T3', 'free T4'],
    },
  ],
  iv_therapies: [
    {
      name: 'NAD+ IV',
      category: 'iv',
      description: 'Cellular energy, DNA repair, longevity, addiction support, cognitive enhancement. SLOW infusion.',
      default_dose: '500-1000',
      dose_unit: 'mg',
      frequency: 'weekly',
      duration_minutes: '120-240',
      contraindications: ['GFR <30', 'pregnancy'],
      notes: 'Always SLOW infusion 2-4h. Pre-hydrate 250-500mL NS. Chest tightness = slow down rate. NAD+ nasal spray for maintenance.',
    },
    {
      name: 'Glutathione IV',
      category: 'iv',
      description: 'Master antioxidant. Detox, skin brightening, immune support, neurological.',
      default_dose: '600-2400',
      dose_unit: 'mg',
      frequency: 'weekly',
      duration_minutes: '15-30',
      critical_warning: 'ACTIVE ASTHMA: very slow infusion, have bronchodilator available. Push slowly.',
      notes: 'Often given as IV push over 15 min or add to bag. Do NOT same day as ozone (counteracts).',
    },
    {
      name: 'Vitamin C High-Dose IV',
      category: 'iv',
      description: 'Immune support, collagen synthesis, anti-inflammatory, anti-cancer adjunct.',
      default_dose: '7500-75000',
      dose_unit: 'mg',
      frequency: 'weekly',
      duration_minutes: '60-120',
      critical_warning: 'G6PD DEFICIENCY = ABSOLUTE CONTRAINDICATION for doses >10g (hemolysis). VERIFY G6PD BEFORE EVERY PATIENT.',
      notes: 'Run through 250mL NS or LR. Add sodium bicarbonate to reduce vein irritation. Check osmolarity at high doses.',
    },
    {
      name: 'Myers Cocktail IV',
      category: 'iv',
      description: 'B vitamins + Mg + Ca + Vitamin C. Fatigue, fibromyalgia, migraine, asthma, immunity.',
      default_dose: 'standard',
      dose_unit: 'protocol',
      frequency: 'weekly',
      duration_minutes: '30-60',
      notes: 'Classic: Mg 200-400mg, Ca 100-200mg, B12 1000mcg, B6 100mg, B5 250mg, B-complex, Vit C 1000-5000mg in 100-250mL',
    },
    {
      name: 'Alpha Lipoic Acid IV',
      category: 'iv',
      description: 'Universal antioxidant (fat and water soluble). Neuropathy, liver, metabolic, heavy metals chelation.',
      default_dose: '300-600',
      dose_unit: 'mg',
      frequency: 'weekly',
      duration_minutes: '60',
      contraindications: ['thiamine deficiency (Wernicke risk)', 'active liver failure'],
      notes: 'Protect from light. Run in 250mL D5W or NS. Excellent for diabetic neuropathy + metabolic syndrome.',
    },
    {
      name: 'Phosphatidylcholine IV',
      category: 'iv',
      description: 'Liver regeneration, brain health, plaque dissolution, detox, cell membrane repair.',
      default_dose: '1000-2000',
      dose_unit: 'mg',
      frequency: 'twice-weekly',
      duration_minutes: '60-120',
      contraindications: ['egg allergy (soy-derived — verify source)', 'acute hepatitis'],
      notes: 'Dilute in 250-500mL NS. Run slow. Pairs with glutathione for detox protocol.',
    },
    {
      name: 'EDTA Chelation IV',
      category: 'iv',
      description: 'Heavy metal detox (lead, mercury, arsenic). Cardiovascular: removes calcium from plaques.',
      default_dose: '1.5-3',
      dose_unit: 'g',
      frequency: 'weekly x 20 sessions',
      duration_minutes: '180',
      contraindications: ['GFR <30 (nephrotoxic)', 'pregnancy', 'severe hypocalcemia'],
      labs_required: ['GFR', 'calcium', 'magnesium', 'CBC', 'heavy metal urine panel baseline'],
      monitoring: 'Renal function every 5 sessions. Replace minerals post-infusion.',
      notes: 'TACT trial validated for cardiovascular benefit in diabetics with prior MI. Replete Ca, Mg, Zn post-infusion.',
    },
    {
      name: 'Ozone IV (MAH)',
      category: 'iv',
      description: 'Major Autohemotherapy. Antimicrobial, immune modulation, oxygen delivery, anti-inflammatory.',
      default_dose: '70-200',
      dose_unit: 'mcg/mL',
      frequency: 'weekly',
      duration_minutes: '30-60',
      contraindications: ['G6PD deficiency', 'hyperthyroidism', 'pregnancy', 'active bleeding', 'uncontrolled hypertension'],
      notes: 'Draw blood → ozonate → reinfuse. Do NOT combine with antioxidant IVs same day. Separate by 48h.',
    },
    {
      name: 'High-Dose B12 IV',
      category: 'iv',
      description: 'Neurological repair, energy, methylation, pernicious anemia, chronic fatigue.',
      default_dose: '1000-5000',
      dose_unit: 'mcg',
      frequency: 'weekly',
      duration_minutes: '15-30',
      contraindications: ['Leber\'s hereditary optic neuropathy'],
      notes: 'Methylcobalamin preferred over cyanocobalamin. Safe at high doses. Check MTHFR status.',
    },
    {
      name: 'Magnesium IV',
      category: 'iv',
      description: 'Relaxation, migraine abort, cardiovascular, sleep, muscle, over 300 enzymatic reactions.',
      default_dose: '1-2',
      dose_unit: 'g',
      frequency: 'weekly',
      duration_minutes: '30-60',
      contraindications: ['renal failure', 'heart block', 'myasthenia gravis'],
      notes: 'Magnesium sulfate or glycinate. Slow infusion to avoid flushing/hypotension.',
    },
    {
      name: 'Amino Acid Infusion',
      category: 'iv',
      description: 'Complete essential + branched chain amino acids. Muscle preservation, liver, recovery.',
      default_dose: '500-1000',
      dose_unit: 'mL',
      frequency: 'weekly',
      duration_minutes: '90-120',
      contraindications: ['severe hepatic encephalopathy', 'renal failure without dialysis'],
      notes: 'Custom compounded or standard formulation. Excellent for post-surgery, sarcopenia, longevity.',
    },
    {
      name: 'Exosome IV',
      category: 'iv',
      description: 'Regenerative medicine. MSC-derived exosomes. Inflammation, tissue repair, anti-aging.',
      default_dose: '5-15',
      dose_unit: 'billion particles',
      frequency: 'monthly or quarterly',
      duration_minutes: '30',
      contraindications: ['active cancer', 'active infection', 'immunosuppression'],
      notes: 'Research stage. Cutting-edge regenerative. Cold-chain required. Premium protocol.',
    },
    {
      name: 'Hydrogen Peroxide IV',
      category: 'iv',
      description: 'Oxidative therapy. Viral, bacterial, fungal infections. Oxygenation.',
      default_dose: '0.03%',
      dose_unit: 'solution',
      frequency: 'weekly',
      duration_minutes: '90-120',
      contraindications: ['G6PD deficiency', 'transplant patients', 'severe anemia'],
      notes: 'Extremely dilute solution. Must be done by trained practitioner. Less common than MAH ozone.',
    },
    {
      name: 'Ketamine IV (Low-Dose)',
      category: 'iv',
      description: 'NMDA antagonist. Treatment-resistant depression, PTSD, chronic pain, neuroplasticity.',
      default_dose: '0.5',
      dose_unit: 'mg/kg',
      frequency: 'twice-weekly x 3 weeks',
      duration_minutes: '40-60',
      contraindications: ['uncontrolled hypertension', 'active psychosis', 'substance abuse disorder', 'severe liver disease'],
      labs_required: ['LFTs', 'BP baseline', 'psychiatric clearance'],
      notes: 'Monitored setting required. Integration session recommended post-infusion. Pairs with trauma protocols.',
    },
  ],
  longevity: [
    {
      name: 'Metformin (Longevity)',
      category: 'supplement',
      description: 'mTOR inhibition, AMPK activation, anti-aging, metabolic optimization.',
      default_dose: '500-1000',
      dose_unit: 'mg',
      frequency: 'daily',
      route: 'oral',
      timing: 'With food',
      critical_contraindications: ['GFR <45 (lactic acidosis)', 'hepatic failure', 'active alcoholism'],
      drug_interactions: ['IODINATED CONTRAST: hold 48h before and after'],
      monitoring: 'Creatinine and GFR every 6 months. B12 annually.',
    },
    {
      name: 'Rapamycin (Longevity)',
      category: 'supplement',
      description: 'mTOR inhibition, autophagy, senolytic adjunct. Longevity. Off-label 5-6mg weekly.',
      default_dose: '5-6',
      dose_unit: 'mg',
      frequency: 'weekly',
      route: 'oral',
      contraindications: ['active infection', 'surgery within 2 weeks', 'pregnancy'],
      drug_interactions: ['CYP3A4 inhibitors: levels 10-100× higher — CRITICAL'],
      monitoring: 'Trough levels target 3-8 ng/mL. Lipid panel. CBC. Renal function.',
    },
    {
      name: 'NMN (Nicotinamide Mononucleotide)',
      category: 'supplement',
      description: 'NAD+ precursor. Mitochondrial function, energy, DNA repair, metabolic health.',
      default_dose: '500-1000',
      dose_unit: 'mg',
      frequency: 'daily',
      route: 'oral',
      timing: 'Morning with or without food',
      contraindications: ['active cancer (caution — NAD+ fuels cell proliferation)'],
      notes: 'Stack with resveratrol or pterostilbene for synergy. Sublingual for faster absorption.',
    },
    {
      name: 'NR (Nicotinamide Riboside)',
      category: 'supplement',
      description: 'NAD+ precursor (alternative to NMN). Mitochondrial support, muscle, liver.',
      default_dose: '300-600',
      dose_unit: 'mg',
      frequency: 'daily',
      route: 'oral',
      contraindications: ['active cancer (caution)'],
      notes: 'Some evidence NMN is more bioavailable. Both are safe. Can use interchangeably.',
    },
    {
      name: 'Berberine',
      category: 'supplement',
      description: 'Metabolic master regulator. AMPK activation. Glucose, lipids, gut microbiome.',
      default_dose: '500',
      dose_unit: 'mg',
      frequency: '3x daily with meals',
      route: 'oral',
      contraindications: ['pregnancy', 'neonates'],
      drug_interactions: ['Metformin (additive hypoglycemia)', 'CYP2D6/3A4 substrates'],
      notes: '"Nature\'s Metformin." Excellent glucose control. Also antimicrobial for SIBO.',
    },
    {
      name: 'Dasatinib + Quercetin (Senolytic)',
      category: 'supplement',
      description: 'Senolytic protocol. Clears senescent cells. Inflammation, aging, tissue rejuvenation.',
      default_dose: 'D: 100mg + Q: 1000mg',
      dose_unit: 'mg',
      frequency: '3 consecutive days per month',
      route: 'oral',
      timing: 'With food',
      contraindications: ['active cancer on chemotherapy', 'severe hepatic impairment', 'QT prolongation'],
      labs_required: ['CBC', 'renal panel', 'LFTs before each cycle', 'EKG (QT interval)'],
      monitoring: 'CBC, LFTs, renal panel before each monthly cycle.',
      notes: 'Intermittent dosing paradigm. Dasatinib is Rx (BCR-ABL inhibitor). Quercetin OTC. Used together synergistically.',
    },
    {
      name: 'Fisetin (Senolytic)',
      category: 'supplement',
      description: 'Natural senolytic flavonoid. Clears senescent cells. Neuroprotection, anti-inflammatory.',
      default_dose: '500-1500',
      dose_unit: 'mg',
      frequency: '2-3 consecutive days per month',
      route: 'oral',
      timing: 'With fatty meal (fat-soluble)',
      contraindications: [],
      notes: 'Gentler alternative to Dasatinib+Quercetin. OTC. Mayo Clinic research. High-dose intermittent.',
    },
    {
      name: 'Spermidine',
      category: 'supplement',
      description: 'Autophagy inducer. Hair, cardiovascular, cognitive, longevity. Wheat germ source.',
      default_dose: '1-5',
      dose_unit: 'mg',
      frequency: 'daily',
      route: 'oral',
      contraindications: [],
      notes: 'Natural polyamine. Caloric restriction mimetic. Pairs with Rapamycin for autophagy stack.',
    },
    {
      name: 'Low Dose Naltrexone (LDN)',
      category: 'supplement',
      description: 'Immune modulator. Autoimmune, fibromyalgia, MS, Crohn\'s, cancer adjunct, chronic pain.',
      default_dose: '1.5-4.5',
      dose_unit: 'mg',
      frequency: 'nightly',
      route: 'oral',
      timing: 'Bedtime (blocks endorphins 2-4h, rebound increase next day)',
      contraindications: ['active opioid use — blocks analgesia CRITICAL', 'organ transplant on immunosuppressants'],
      labs_required: ['LFTs baseline'],
      monitoring: 'LFTs at 3 months. Symptom diary.',
      notes: 'Must compound (standard naltrexone is 50mg). Titrate: 1.5mg → 3mg → 4.5mg weekly.',
    },
    {
      name: 'Canagliflozin (Longevity)',
      category: 'supplement',
      description: 'SGLT2 inhibitor. ITP longevity study. mTORC1 inhibition, cardiovascular, renal protection.',
      default_dose: '100',
      dose_unit: 'mg',
      frequency: 'daily',
      route: 'oral',
      contraindications: ['GFR <45', 'recurrent UTIs', 'DKA history', 'bilateral renal artery stenosis'],
      labs_required: ['GFR', 'glucose', 'urinalysis'],
      monitoring: 'GFR every 6 months. Urinalysis for UTI/yeast. Glucose.',
      notes: 'Shown to extend lifespan in ITP mouse study. Rx drug. Genital hygiene important.',
    },
    {
      name: 'Acarbose (Longevity)',
      category: 'supplement',
      description: 'Alpha-glucosidase inhibitor. Glucose spikes reduction. ITP longevity compound.',
      default_dose: '25-100',
      dose_unit: 'mg',
      frequency: '3x daily with meals',
      route: 'oral',
      contraindications: ['IBD active', 'cirrhosis', 'GFR <25'],
      notes: 'Reduces post-meal glucose spikes. ITP life extension compound. GI side effects common — start low.',
    },
    {
      name: 'Lithium Orotate',
      category: 'supplement',
      description: 'Neuroprotection, BDNF, mood stabilization, Alzheimer\'s prevention, longevity.',
      default_dose: '5-20',
      dose_unit: 'mg',
      frequency: 'daily',
      route: 'oral',
      contraindications: ['renal impairment', 'dehydration', 'on diuretics (monitoring needed)'],
      notes: 'Micro-dose (OTC orotate salt) vs. pharmaceutical lithium carbonate. Safe at low doses. Neuroprotective at <20mg.',
    },
    {
      name: 'Pterostilbene',
      category: 'supplement',
      description: 'Resveratrol analogue (more bioavailable). Sirtuin activation, anti-aging, metabolic, brain.',
      default_dose: '50-150',
      dose_unit: 'mg',
      frequency: 'daily',
      route: 'oral',
      contraindications: [],
      notes: 'More bioavailable than resveratrol. Pairs with NMN. Some concern at very high doses with LDL — monitor.',
    },
    {
      name: 'Astaxanthin',
      category: 'supplement',
      description: 'Most potent natural antioxidant. Skin, eyes, exercise recovery, brain, cardiovascular.',
      default_dose: '4-12',
      dose_unit: 'mg',
      frequency: 'daily',
      route: 'oral',
      timing: 'With fatty meal',
      contraindications: [],
      notes: 'Carotenoid from algae. Crosses blood-brain barrier. 6000× stronger than vitamin C vs. singlet oxygen.',
    },
  ],
}

export const CRITICAL_INTERACTIONS = [
  {
    drug_a: 'Rapamycin', drug_b: 'CYP3A4 inhibitors', severity: 'CRITICAL',
    effect: 'Rapamycin levels 10-100× higher — severe toxicity',
    action: 'CONTRAINDICATED without strict dose adjustment and trough monitoring',
  },
  {
    drug_a: 'Metformin', drug_b: 'Iodinated contrast', severity: 'CRITICAL',
    effect: 'Lactic acidosis risk',
    action: 'Hold 48h before and 48h after contrast',
  },
  {
    drug_a: 'Vitamin C IV >10g', drug_b: 'G6PD deficiency', severity: 'CRITICAL',
    effect: 'Severe potentially fatal hemolysis',
    action: 'ABSOLUTE CONTRAINDICATION — verify G6PD always before high-dose Vit C',
  },
  {
    drug_a: 'LDN', drug_b: 'Opioids', severity: 'CRITICAL',
    effect: 'Complete blockade of opioid analgesia',
    action: 'CONTRAINDICATED in any patient on opioid therapy',
  },
  {
    drug_a: 'TRT', drug_b: 'Warfarin', severity: 'HIGH',
    effect: 'Increased anticoagulant effect',
    action: 'Frequent INR monitoring when starting TRT',
  },
  {
    drug_a: 'PT-141', drug_b: 'PDE5 inhibitors', severity: 'HIGH',
    effect: 'Severe hypotension',
    action: 'Do not combine without dose adjustment and monitoring',
  },
  {
    drug_a: 'Glutathione IV', drug_b: 'Active asthma', severity: 'HIGH',
    effect: 'Bronchospasm if rapid infusion',
    action: 'Very slow infusion + bronchodilator available',
  },
  {
    drug_a: 'Tirzepatide/Semaglutide', drug_b: 'Insulin', severity: 'HIGH',
    effect: 'Severe hypoglycemia',
    action: 'Reduce insulin dose significantly when starting GLP-1. Monitor glucose closely.',
  },
  {
    drug_a: 'Ozone IV', drug_b: 'Antioxidant IV same day', severity: 'MEDIUM',
    effect: 'Antioxidants neutralize therapeutic ozone effect',
    action: 'Separate by minimum 48 hours',
  },
  {
    drug_a: 'Dasatinib', drug_b: 'Anticoagulants', severity: 'HIGH',
    effect: 'Increased bleeding risk',
    action: 'Monitor closely. Consider holding anticoagulant during senolytic cycle.',
  },
  {
    drug_a: 'EDTA Chelation', drug_b: 'GFR <30', severity: 'CRITICAL',
    effect: 'Acute kidney injury / nephrotoxicity',
    action: 'CONTRAINDICATED in severe renal impairment',
  },
  {
    drug_a: 'Multiple GH secretagogues', drug_b: 'Concurrent use', severity: 'HIGH',
    effect: 'IGF-1 over-elevation, acromegaly risk',
    action: 'Do not combine CJC-1295, Ipamorelin, Sermorelin simultaneously',
  },
]

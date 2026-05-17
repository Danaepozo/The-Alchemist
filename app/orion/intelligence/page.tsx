'use client'

import { useState } from 'react'

const SECTIONS = [
  { id: 'breakthroughs', label: 'Longevity Breakthroughs', icon: '◎', color: '#3DC898' },
  { id: 'senolytics', label: 'Senolytics', icon: '⊕', color: '#9A7CE8' },
  { id: 'protocols', label: 'Clinical Protocols', icon: '◈', color: '#C9963C' },
  { id: 'peptides', label: 'Peptide Encyclopedia', icon: '⊛', color: '#3DC898' },
  { id: 'stacks', label: 'Supplement Stacks', icon: '◇', color: '#E4B85A' },
  { id: 'frameworks', label: 'FM Frameworks', icon: '◉', color: '#E06090' },
]

const BREAKTHROUGHS = [
  {
    title: 'Senolytics: Removing Zombie Cells',
    year: '2023–2025',
    impact: 'CRITICAL',
    color: '#9A7CE8',
    summary: 'Senescent cells accumulate with age, secreting the SASP — a cocktail of inflammatory cytokines that drives every hallmark of aging. Clearing them with Dasatinib+Quercetin, Fisetin, and Navitoclax shows dramatic improvements in physical function, immune competence, and cognitive health.',
    key_points: ['D+Q protocol: 100mg Dasatinib + 1000mg Quercetin, 2 days/month. Mayo Clinic Phase 2 trials.', 'Fisetin 1000–1500mg for 2–3 days/month — most accessible natural senolytic', 'Urolithin A 500mg daily — mitophagy activator, VO2max improvement in human RCTs', 'ITP (NIA): Fisetin, Rapamycin, Acarbose among top lifespan-extending compounds'],
    clinical_action: 'Start all longevity patients on Fisetin 100mg daily + 1500mg burst 2 days/month. Discuss D+Q for motivated patients after baseline labs.',
  },
  {
    title: 'Epigenetic Reprogramming — Reversing Aging at the DNA Level',
    year: '2023–2025',
    impact: 'REVOLUTIONARY',
    color: '#E06090',
    summary: 'Partial Yamanaka factor expression (OSK without c-Myc) reverses epigenetic age in animal models and retinal cells without inducing cancer. Altos Labs, Turn Biotechnologies, and Retro Biosciences are in Phase 1. Meanwhile, GrimAge/TruAge clocks are clinically available and modifiable.',
    key_points: ['TRIIM trial (2019): GH + DHEA + Metformin reversed biological age 2.5 years in 1 year', 'DunedinPACE clock: Measures RATE of aging — most actionable clinical tool', 'Measurable clock reversal with: exercise, fasting, rapamycin, sleep optimization', 'Epigenetic clocks predict disease 10–20 years before clinical presentation'],
    clinical_action: 'Order TruAge / GrimAge on all longevity patients as baseline. Retest at 12 months to measure protocol efficacy.',
  },
  {
    title: 'Taurine — The Missing Longevity Amino Acid',
    year: '2023',
    impact: 'HIGH',
    color: '#E4B85A',
    summary: 'June 2023 Science paper: Taurine deficiency is a causal driver of aging. Supplementation extended lifespan 10–12% in mice/worms, improved muscle strength, bone density, energy metabolism, immune function, and cognitive performance.',
    key_points: ['Taurine declines 80% from youth to old age', 'Dose: 1–3g/day — extremely safe, no known toxicity', 'Especially critical for vegetarians/vegans (found primarily in meat/seafood)', 'Mechanism: Reduces mitochondrial ROS, improves calcium handling, reduces inflammation'],
    clinical_action: 'Add Taurine 2g/day to standard longevity stack. Inexpensive, safe, strong evidence.',
  },
  {
    title: 'GLP-1 Agonists: Beyond Obesity — Neuroprotection & Longevity',
    year: '2024',
    impact: 'HIGH',
    color: '#3DC898',
    summary: 'Semaglutide and tirzepatide show effects far beyond weight loss: 20% MACE reduction (SELECT trial), Alzheimer\'s and Parkinson\'s prevention (ongoing EVOKE trials), NASH resolution in 59%, direct anti-inflammatory effects reducing IL-6 and hs-CRP.',
    key_points: ['SELECT trial: Semaglutide reduced major cardiac events 20% in obese, non-diabetic patients', 'GLP-1 receptors in hippocampus + substantia nigra — neuroprotective mechanism', 'SUSTAIN-6 + LEADER trials: Cardiovascular mortality reduction across populations', 'Tirzepatide (GLP-1 + GIP): Superior fat loss with better muscle preservation'],
    clinical_action: 'Consider GLP-1 for: insulin resistance + metabolic syndrome, NASH, APOE4 carriers (neuroprotection), cardiovascular risk.',
  },
  {
    title: 'Muscle as the Longevity Organ — Myokine Revolution',
    year: '2022–2024',
    impact: 'HIGH',
    color: '#C9963C',
    summary: 'Skeletal muscle is now recognized as the largest endocrine organ, secreting 650+ myokines that regulate every organ system. Loss of muscle = loss of the most potent longevity-promoting endocrine gland. VO2max is now established as the single strongest predictor of all-cause mortality.',
    key_points: ['Each 1 MET increase in VO2max = 13% mortality reduction', 'Bottom to top quintile of VO2max fitness = 5x reduction in mortality', 'Irisin (from muscle exercise) crosses BBB → stimulates BDNF → neuroprotection', 'Resistance training: 3x/week minimum. Protein 1.6–2.2g/kg. Progressive overload.'],
    clinical_action: 'Prescribe exercise like a drug: Zone 2 3-4hr/week + resistance 3x/week. Monitor VO2max annually. Sarcopenia = urgent metabolic emergency.',
  },
  {
    title: 'GlyNAC — Glutathione Restoration Reverses Aging Hallmarks',
    year: '2022–2023',
    impact: 'HIGH',
    color: '#9A7CE8',
    summary: 'Dr. Rajagopal Sekhar (Baylor) RCT: Glycine + NAC supplementation for 24 weeks in elderly reversed multiple hallmarks of aging — oxidative stress, mitochondrial dysfunction, inflammation, endothelial dysfunction, insulin resistance, cognitive decline, and strength.',
    key_points: ['Glutathione declines 50% by age 65', 'GlyNAC = 8g Glycine + 8g NAC daily (precursors superior to direct glutathione)', 'Results visible within 24 weeks in elderly', 'Precursor strategy superior: Setria glutathione is less effective than building blocks'],
    clinical_action: 'Add GlyNAC protocol to all patients over 45 or with chronic disease: Glycine 3–8g + NAC 1.8–8g daily.',
  },
]

const SENOLYTIC_PROTOCOLS = [
  { name: 'Dasatinib + Quercetin (D+Q)', tier: 'Advanced', color: '#9A7CE8', dose: 'Dasatinib 100mg + Quercetin 1000mg', frequency: '2 consecutive days per month', mechanism: 'D: Src/BCR-ABL kinase inhibitor kills visceral fat senescent cells. Q: Flavonoid clears endothelial + epithelial senescent cells synergistically.', evidence: 'Mayo Clinic Phase 2 clinical trials. Improved physical function, reduced frailty, IPF improvement, cognitive effects in early AD models.', monitoring: 'CBC, LFTs, renal function q6 months. Watch for myelosuppression (thrombocytopenia)', requires_rx: true },
  { name: 'Fisetin', tier: 'Standard', color: '#3DC898', dose: '1000–1500mg × 2–3 consecutive days/month, or 100mg daily continuously', frequency: 'Monthly burst or daily maintenance', mechanism: 'Flavonoid senolytic. Clears senescent cells, activates autophagy, potent NF-kB inhibitor. Found naturally in strawberries.', evidence: 'ITP (NIA Interventions Testing Program): Extended lifespan in mice. Human bioavailability studies positive.', monitoring: 'Minimal monitoring required. Very safe profile.', requires_rx: false },
  { name: 'Urolithin A', tier: 'Standard', color: '#E4B85A', dose: '500–1000mg/day continuously', frequency: 'Daily', mechanism: 'Gut bacteria metabolite from ellagitannins (pomegranate, berries). Activates mitophagy (mitochondrial quality control). Most Americans cannot produce it from diet.', evidence: 'Human RCTs: Improved mitochondrial gene expression, VO2max, muscle function. Amazentis (Timeline Longevity) trials.', monitoring: 'No specific monitoring needed.', requires_rx: false },
  { name: 'Navitoclax (BCL-2/BCL-xL inhibitor)', tier: 'Experimental', color: '#E06090', dose: 'Clinical trial dosing', frequency: 'Under investigation', mechanism: 'Highly potent anti-apoptotic protein inhibitor. Eliminates senescent cells with greater efficacy than D+Q but with thrombocytopenia risk.', evidence: 'Preclinical: Most potent senolytic known. Human trials ongoing. Watch for next-gen analogs.', monitoring: 'Not for clinical use outside trials currently.', requires_rx: true },
]

const CLINICAL_PROTOCOLS = [
  {
    name: 'Rapamycin Longevity Protocol', color: '#9A7CE8', category: 'mTOR Inhibition',
    protocol: ['Start: 2mg weekly × 4 weeks', 'Titrate to 5–6mg once weekly (fasted AM)', 'Advanced supervised: up to 10mg weekly', 'Take with food (improves absorption, reduces GI effects)'],
    monitoring: ['Fasting glucose + insulin (q3 months)', 'Lipid panel (can elevate TG)', 'CBC (immunosuppression at higher doses)', 'Watch for mouth sores — dose-limiting'],
    contraindications: ['Active infection', 'Grapefruit (CYP3A4 — levels 10x)', 'Pregnancy', 'Severe immunocompromise'],
    evidence: 'Extends lifespan in every tested organism. ITP: 13–26% lifespan extension in mice when started at 20 months (equivalent of age 60 in humans). Human: Improved immune response to flu vaccine 60% in elderly.',
  },
  {
    name: 'NAD+ Optimization Protocol', color: '#C9963C', category: 'Cellular Energy',
    protocol: ['NMN 500–1000mg sublingual, AM fasting', 'TMG 1000mg with NMN (methylation support)', 'Apigenin 50mg (CD38 inhibitor — prevents NAD+ degradation)', 'Resveratrol 500mg + fat (sirtuin activation requires elevated NAD+)', 'Pterostilbene 50mg (bioavailable resveratrol analog)'],
    monitoring: ['NAD+ whole blood assay available at some specialty labs', 'Subjective: energy, sleep quality, exercise recovery at 30/60/90 days', 'No specific safety monitoring required at standard doses'],
    contraindications: ['High-dose NMN may accelerate cell growth — caution in active cancer', 'Resveratrol: Avoid high doses with blood thinners (warfarin interaction)'],
    evidence: 'NAD+ declines 50% per decade after 40. Multiple human RCTs: NMN improves insulin sensitivity, cardiovascular function, muscle strength, sleep quality.',
  },
  {
    name: 'Bredesen ReCODE — Alzheimer\'s Prevention', color: '#3DC898', category: 'Neurological',
    protocol: ['1. Optimize insulin/glucose (HOMA-IR < 1.0 — most critical)', '2. Homocysteine < 7 (methylfolate 2mg + MeCbl 2000mcg + B6 P5P 100mg + TMG 1500mg)', '3. Vitamin D 60–80 ng/mL + K2 MK-7 180mcg', '4. Omega-3 index > 8% (EPA+DHA 3g/day)', '5. Sleep: Treat OSA. 7–9h. Lateral position.', '6. Exercise: Zone 2 3–4h/week + resistance training', '7. Toxin removal: Mercury, mycotoxins if elevated', '8. Hormones: Restore to optimal functional ranges', '9. Inflammation: hs-CRP < 0.5', '10. BDNF: Lion\'s Mane 1g + exercise + sleep'],
    monitoring: ['Cognitive testing (MoCA) baseline + 6 months', 'All ReCODE biomarkers q6 months', 'ApoE genotype if unknown', 'Plasma p-tau 181 if high risk'],
    contraindications: ['No contraindications — lifestyle-based protocol'],
    evidence: '100+ published cases of cognitive improvement/stabilization. Only intervention showing reversal of early AD. APOE4 carriers need aggressive modification.',
  },
  {
    name: 'HBOT Longevity Protocol', color: '#E06090', category: 'Oxygen Therapy',
    protocol: ['60 sessions over 90 days (5 days/week)', '2.0 ATA with 100% O2', '90-minute sessions', 'CRITICAL: Air breaks every 20 min (5 min breathing room air) — generates hyperoxic-hypoxic stimulus', 'Alternative: 40 sessions for cognitive or vascular indication'],
    monitoring: ['Baseline: Telomere length, epigenetic clock, cognitive testing, CBC', 'Retest at session 30 and after completion', 'Ear pressure: Use Sudafed if needed. Contraindicated in active ear infection.'],
    contraindications: ['Untreated pneumothorax', 'Uncontrolled seizure disorder', 'Some chemotherapy agents (bleomycin, doxorubicin)', 'Claustrophobia (mild — manage with anxiolytics)'],
    evidence: 'Efrati 2020 (Aging journal): 20–38% telomere lengthening, 11–37% reduction in senescent T cells. No other intervention has shown telomere lengthening in healthy humans.',
  },
]

const PEPTIDE_ENCYCLOPEDIA = [
  { name: 'BPC-157', category: 'Healing', color: '#3DC898', dose: '250–500mcg SQ near injury or 500mcg oral', frequency: 'Daily × 8–12 weeks', mechanism: 'Upregulates GH receptor expression. Stimulates angiogenesis. Protects gut mucosa. Anti-inflammatory via Nitric Oxide pathway.', indications: ['Gut healing (IBD, leaky gut, ulcers)', 'Tendon/ligament injury', 'Muscle tears', 'Neurological protection', 'Post-surgical healing'], safety: 'Excellent safety profile. No serious adverse events in 30 years of research.' },
  { name: 'Epithalon (Epitalon)', category: 'Longevity', color: '#9A7CE8', dose: '5–10mg SQ or IV', frequency: '10–20 day courses, twice yearly', mechanism: 'Tetrapeptide from bovine pineal extract. Activates telomerase enzyme. Regulates circadian melatonin production. Anti-tumor activity.', indications: ['Telomere lengthening', 'Aging / longevity optimization', 'Sleep quality', 'Immune restoration'], safety: 'Used in Eastern Europe for 30+ years. No significant adverse events reported.' },
  { name: 'CJC-1295 + Ipamorelin', category: 'GH Axis', color: '#C9963C', dose: 'CJC-1295 (no DAC) 100–200mcg + Ipamorelin 100–200mcg SQ', frequency: 'Nightly (or 30 min pre-sleep)', mechanism: 'CJC amplifies GH pulse magnitude (GHRH analog). Ipamorelin selectively stimulates GHSR without elevating cortisol/prolactin. Restores physiological GH pulsatility.', indications: ['Adult GH deficiency', 'Body composition', 'Recovery', 'Sleep quality', 'Cellular repair'], safety: 'NEVER combine multiple GH secretagogues. Monitor IGF-1 target 200–250 ng/mL. No water retention at correct dosing.' },
  { name: 'Thymosin Alpha-1', category: 'Immune', color: '#E06090', dose: '1.6mg SQ', frequency: '2× weekly × 6 months', mechanism: 'Thymic peptide. Restores T-cell function, NK cell activity, dendritic cell maturation. Shifts Th2 → Th1 (anti-cancer immune posture).', indications: ['Immune senescence', 'Chronic viral infection (EBV, CMV)', 'Cancer adjunct', 'Long COVID immune dysfunction', 'Post-antibiotic immune restoration'], safety: 'FDA-approved in 37 countries. Excellent safety profile in 20+ years clinical use.' },
  { name: 'Semax', category: 'Cognitive', color: '#9A7CE8', dose: '100–600mcg intranasal, AM', frequency: 'Daily or 5 days on / 2 off', mechanism: 'ACTH 4–7 analog. Stimulates BDNF synthesis. Improves cerebral blood flow. Neuroprotective via BDNF/TrkB pathway. Antidepressant, anxiolytic, cognitive enhancing.', indications: ['Cognitive enhancement', 'Post-stroke rehabilitation', 'Depression + anxiety', 'ADHD', 'Traumatic brain injury'], safety: 'Used clinically in Russia since 1990s. No significant adverse events at standard doses.' },
  { name: 'SS-31 (Elamipretide)', category: 'Mitochondrial', color: '#E4B85A', dose: '3mg SQ daily', frequency: 'Daily cycling', mechanism: 'Cardiolipin-targeting peptide. Stabilizes mitochondrial inner membrane. Restores electron transport chain efficiency. Reduces mitochondrial ROS.', indications: ['Heart failure / diastolic dysfunction', 'Mitochondrial disease', 'Post-MI cardiac remodeling', 'Aging-associated mitochondrial dysfunction'], safety: 'Phase 2 trials completed. Compelling cardiac data. Generally well-tolerated.' },
  { name: 'MOTS-c', category: 'Metabolic', color: '#3DC898', dose: '5–10mg SQ', frequency: '3× weekly', mechanism: 'Mitochondrially-encoded peptide. AMPK activator. Improves insulin sensitivity at cellular level. Reduces adiposity. Exercise mimetic.', indications: ['Insulin resistance', 'Type 2 diabetes support', 'Obesity', 'Aging-associated metabolic decline'], safety: 'Emerging peptide. Human data limited but growing. Generally well-tolerated in available data.' },
  { name: 'PT-141 (Bremelanotide)', category: 'Sexual', color: '#E06090', dose: '1–2mg SQ', frequency: '1–2 hours before activity', mechanism: 'Melanocortin MC3R/MC4R agonist. Central nervous system mechanism (unlike PDE5 inhibitors). Works in both sexes. FDA-approved for female sexual interest disorder.', indications: ['Female sexual dysfunction (FDA approved — Vyleesi)', 'Male erectile dysfunction (off-label)', 'Low libido in both sexes'], safety: 'Nausea most common side effect (30%). Premedicate with ondansetron 4mg. Blood pressure monitoring.' },
]

const STACKS = [
  {
    name: 'Longevity Core Daily', color: '#3DC898',
    items: ['NMN 500mg sublingual (AM fasting)', 'TMG 1000mg with NMN', 'Resveratrol 500mg + Pterostilbene 50mg (AM with fat)', 'Quercetin 500mg (AM)', 'Fisetin 100mg (AM)', 'Apigenin 50mg (CD38 inhibitor)', 'CoQ10 Ubiquinol 200mg (with meal)', 'Omega-3 EPA+DHA 3g (with meal)', 'Vitamin D3 5000IU + K2 MK-7 180mcg (with fat)', 'Magnesium Glycinate 400mg (PM)', 'Alpha Lipoic Acid 300mg (AM fasting)'],
    goal: 'Foundation longevity stack targeting NAD+, senolytics, mitochondria, and anti-aging pathways',
  },
  {
    name: 'Cognitive Performance', color: '#9A7CE8',
    items: ['Lion\'s Mane 1000mg (AM — NGF synthesis)', 'Bacopa Monnieri 300mg (AM — acetylcholine protection)', 'Alpha GPC 300mg (choline donor)', 'Phosphatidylserine 400mg (cortisol + memory)', 'Acetyl-L-Carnitine 1000mg (mitochondrial cognitive support)', 'Vinpocetine 10mg (cerebral blood flow)', 'Ginkgo Biloba 120mg (circulation)', 'Lithium Orotate 5–10mg (neuroprotection, BDNF)', 'Uridine Monophosphate 250mg (synaptogenesis)', 'Omega-3 DHA 2g (brain-specific neuroprotection)'],
    goal: 'Maximize BDNF, acetylcholine, cerebral blood flow, and neuroprotection. Alzheimer\'s prevention.',
  },
  {
    name: 'Testosterone Optimization', color: '#E4B85A',
    items: ['Tongkat Ali LJ100 (100:1) 400mg AM', 'Ashwagandha KSM-66 600mg PM', 'Boron 10mg with food', 'Zinc 30mg (testosterone synthesis cofactor)', 'Vitamin D3 5000IU (raises T ~1-2 ng/dL per 100IU)', 'Magnesium Glycinate 400mg (lowers SHBG)', 'DHEA 25–50mg (monitor E2)', 'Creatine 5g daily (1.5–3% T increase)', 'Nettle Root 300mg (free testosterone)', 'Shilajit fulvic acid 500mg (testosterone + mitochondria)'],
    goal: 'Natural testosterone support pre-TRT or as adjunct. Lowers SHBG, raises free T, supports adrenal precursors.',
  },
  {
    name: 'Anti-Inflammatory & Immune', color: '#FF8C00',
    items: ['Curcumin BCM-95 or Theracurmin 1000mg 2×/day', 'Boswellia 400mg 3×/day (5-LOX inhibitor)', 'SPM Active — Specialized Pro-resolving Mediators 2 caps/day', 'PEA (Palmitoylethanolamide) 600–1200mg (mast cell stabilizer)', 'Pycnogenol 100mg (NF-kB inhibitor, OPC)', 'Quercetin 1000mg/day', 'Sulforaphane (broccoli sprouts / Avmacol) 30mg/day', 'Omega-3 4g EPA+DHA', 'Vitamin D3 5000IU + K2'],
    goal: 'Resolve chronic inflammation at root level. Not suppression — resolution chemistry.',
  },
  {
    name: 'Cardiovascular Precision', color: '#E06090',
    items: ['Omega-3 EPA+DHA 4g (minimize TG, reduce Lp(a))', 'CoQ10 Ubiquinol 300mg (cardiac energy)', 'Nattokinase 2000 FU + Serrapeptase (fibrinolytic)', 'Tocotrienols 300mg (NOT tocopherols — CVD specific)', 'Bergamot Extract 1000mg (ApoB + LDL particle reduction)', 'Aged Garlic Extract Kyolic 1200mg (arterial stiffness)', 'Magnesium Taurate 400mg (antiarrhythmic + vasodilatory)', 'L-Arginine + L-Citrulline 5g (NO production)', 'Vitamin K2 MK-7 360mcg (plaque regression)'],
    goal: 'Reduce ApoB, Lp(a), arterial stiffness, and inflammation. Target: ApoB <70, hs-CRP <0.5.',
  },
  {
    name: 'Metabolic Reset', color: '#C9963C',
    items: ['Berberine 500mg 3×/day with meals (AMPK — nature\'s metformin)', 'Alpha Lipoic Acid 600mg fasting AM', 'Chromium Picolinate 200mcg with meals', 'Gymnema Sylvestre 400mg before carb meals', 'Inositol (Myo 4g + D-chiro 100mg AM) for PCOS/insulin resistance', 'Ceylon Cinnamon 1g with meals', 'Bitter Melon 1000mg with meals', 'Magnesium Glycinate 400mg (insulin cofactor)', 'Zinc 30mg (insulin signaling)'],
    goal: 'Improve insulin sensitivity, glucose disposal, and metabolic flexibility without pharmaceutical drugs.',
  },
]

const FM_FRAMEWORKS = [
  {
    name: 'The 5 Root Causes', color: '#E4B85A',
    description: 'Every chronic condition has one or more of these underlying drivers. Address all before symptomatic treatment.',
    items: [
      { label: 'TOXINS', desc: 'Heavy metals (mercury, lead), mycotoxins, pesticides (glyphosate), plastics (BPA, phthalates), solvents. Test: heavy metals panel, mycotoxin urine, GGT, ALT' },
      { label: 'MICROBES', desc: 'Gut dysbiosis, SIBO (H2 + CH4 breath test), parasites (GI-MAP), viral reactivation (EBV, CMV, HHV-6), mold illness (CIRS panel)' },
      { label: 'ALLERGENS', desc: 'Delayed IgG food sensitivities (not IgE allergy — different mechanism, different symptoms), environmental (mold, dust, pollen), FODMAP intolerance, gluten/gliadin antibodies' },
      { label: 'STRESS', desc: 'HPA axis dysregulation (cortisol curve), trauma physiology (polyvagal state — sympathetic/dorsal vagal), chronic psychological stress. Test: 4-point cortisol saliva, DHEA-S, HRV' },
      { label: 'POOR NUTRITION', desc: 'Macronutrient imbalance, micronutrient deficiencies (Mg, D3, B12, Zn, Fe), glycemic dysregulation, omega-3:6 imbalance, ultra-processed food chronic inflammation' },
    ]
  },
  {
    name: 'IFM Matrix — 7 Core Physiological Systems', color: '#3DC898',
    description: 'Map all patient symptoms and biomarkers to these 7 nodes to identify the primary dysfunction driving their condition.',
    items: [
      { label: 'ASSIMILATION', desc: 'Digestion, absorption, microbiome, respiration. Key markers: zonulin, LPS, calprotectin, GI-MAP, SIBO, IgA.' },
      { label: 'DEFENSE & REPAIR', desc: 'Immune, inflammation, infection, microbiome. Key markers: hs-CRP, IL-6, ANA, complement, CBC differential.' },
      { label: 'ENERGY', desc: 'Mitochondrial function, oxidative stress, Krebs cycle. Key markers: OAT, CoQ10, lactate/pyruvate, NAD+, 8-OHdG.' },
      { label: 'BIOTRANSFORMATION', desc: 'Liver detox (Phase I, II, III), kidney elimination, bowel regularity. Key markers: GGT, ALT, urinary organic acids, methylation markers.' },
      { label: 'TRANSPORT', desc: 'Cardiovascular, lymph, blood flow. Key markers: ApoB, Lp(a), homocysteine, endothelial function, blood viscosity.' },
      { label: 'COMMUNICATION', desc: 'Hormones, neurotransmitters, immune signals. Key markers: full hormone panel, DUTCH, OAT neurotransmitters, insulin, IGF-1.' },
      { label: 'STRUCTURAL INTEGRITY', desc: 'Cell membranes, musculoskeletal, BBB, gut barrier. Key markers: omega-3 index, phospholipids, zonulin, collagen markers, bone density.' },
    ]
  },
  {
    name: 'Polyvagal & Trauma Physiology', color: '#E06090',
    description: 'The nervous system state determines healing capacity. No protocol works optimally in a dysregulated nervous system.',
    items: [
      { label: 'VENTRAL VAGAL (SAFE)', desc: 'Social engagement, healing mode, optimal digestion and immunity. Therapeutic goal. HRV high, cortisol healthy rhythm, sleep restorative.' },
      { label: 'SYMPATHETIC (THREAT)', desc: 'Fight/flight. Chronic activation = HPA burnout, poor digestion, immune dysregulation, elevated cortisol. Most "Type A" patients live here.' },
      { label: 'DORSAL VAGAL (SHUTDOWN)', desc: 'Freeze/collapse response to overwhelming trauma. Fatigue, dissociation, gut shutdown, depression, very low HRV. Often mislabeled as "depression" or CFS.' },
      { label: 'CLINICAL TOOLS', desc: 'HRV (Oura Ring, Polar H10 + app), somatic therapy, Bella\'s Reiki/nervous system work, vagal toning (humming, gargling, cold water on face, slow exhalation), EMDR, breathwork' },
    ]
  },
]

export default function IntelligencePage() {
  const [active, setActive] = useState('breakthroughs')

  return (
    <div style={{ padding: '2rem', maxWidth: 1100, fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(240,232,216,0.25)', marginBottom: '0.4rem' }}>ORION · INTELLIGENCE HUB</div>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 300, color: '#F0E8D8', letterSpacing: '0.1em', margin: 0 }}>Longevity & Functional Medicine Intelligence</h1>
        <p style={{ fontSize: '0.75rem', color: 'rgba(240,232,216,0.3)', marginTop: '0.4rem' }}>
          Latest research · Clinical protocols · Peptide encyclopedia · Supplement stacks · Diagnostic frameworks
        </p>
      </div>

      {/* Nav */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '1rem' }}>
        {SECTIONS.map(s => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            style={{
              background: active === s.id ? `${s.color}15` : 'transparent',
              border: `1px solid ${active === s.id ? s.color + '40' : 'rgba(240,232,216,0.1)'}`,
              borderRadius: 6, padding: '0.45rem 1rem',
              color: active === s.id ? s.color : 'rgba(240,232,216,0.4)',
              fontSize: '0.72rem', cursor: 'pointer', letterSpacing: '0.06em',
            }}
          >
            {s.icon} {s.label}
          </button>
        ))}
      </div>

      {/* BREAKTHROUGHS */}
      {active === 'breakthroughs' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {BREAKTHROUGHS.map((b, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${b.color}25`, borderRadius: 8, padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div>
                  <div style={{ fontSize: '0.6rem', color: b.color, letterSpacing: '0.15em', marginBottom: '0.3rem' }}>BREAKTHROUGH · {b.year}</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#F0E8D8' }}>{b.title}</div>
                </div>
                <span style={{ fontSize: '0.6rem', fontWeight: 700, color: b.impact === 'REVOLUTIONARY' ? '#E06090' : b.impact === 'CRITICAL' ? '#9A7CE8' : '#C9963C', background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.5rem', borderRadius: 3, flexShrink: 0, marginLeft: '1rem' }}>{b.impact}</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'rgba(240,232,216,0.65)', lineHeight: 1.7, marginBottom: '0.75rem' }}>{b.summary}</p>
              <div style={{ marginBottom: '0.75rem' }}>
                <div style={{ fontSize: '0.58rem', color: b.color, letterSpacing: '0.12em', marginBottom: '0.4rem' }}>KEY FINDINGS</div>
                {b.key_points.map((p, j) => <div key={j} style={{ fontSize: '0.7rem', color: 'rgba(240,232,216,0.55)', lineHeight: 1.7 }}>• {p}</div>)}
              </div>
              <div style={{ padding: '0.6rem 0.875rem', background: `${b.color}08`, border: `1px solid ${b.color}20`, borderRadius: 5 }}>
                <span style={{ fontSize: '0.58rem', color: b.color, letterSpacing: '0.12em' }}>CLINICAL ACTION: </span>
                <span style={{ fontSize: '0.7rem', color: 'rgba(240,232,216,0.65)' }}>{b.clinical_action}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SENOLYTICS */}
      {active === 'senolytics' && (
        <div>
          <div style={{ marginBottom: '1.25rem', padding: '0.875rem 1rem', background: 'rgba(154,124,232,0.06)', border: '1px solid rgba(154,124,232,0.2)', borderRadius: 6, fontSize: '0.72rem', color: 'rgba(240,232,216,0.55)', lineHeight: 1.7 }}>
            <strong style={{ color: '#9A7CE8' }}>Senolytics</strong> are compounds that selectively eliminate senescent ("zombie") cells. These cells accumulate with age and secrete the SASP (Senescence-Associated Secretory Phenotype) — driving inflammation, tissue dysfunction, and every hallmark of aging. Clearing them is one of the most promising clinical interventions in longevity medicine.
          </div>
          {SENOLYTIC_PROTOCOLS.map((p, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${p.color}25`, borderRadius: 8, padding: '1.25rem', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: p.color }}>{p.name}</div>
                <span style={{ fontSize: '0.62rem', color: p.tier === 'Advanced' ? '#E06090' : p.tier === 'Standard' ? '#3DC898' : 'rgba(240,232,216,0.3)', background: 'rgba(255,255,255,0.05)', padding: '0.15rem 0.5rem', borderRadius: 3 }}>{p.tier}{p.requires_rx ? ' · Rx' : ''}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div><div style={{ fontSize: '0.58rem', color: p.color, marginBottom: '0.2rem', letterSpacing: '0.1em' }}>DOSE</div><div style={{ fontSize: '0.72rem', color: '#F0E8D8' }}>{p.dose}</div></div>
                <div><div style={{ fontSize: '0.58rem', color: p.color, marginBottom: '0.2rem', letterSpacing: '0.1em' }}>FREQUENCY</div><div style={{ fontSize: '0.72rem', color: '#F0E8D8' }}>{p.frequency}</div></div>
              </div>
              <div style={{ marginBottom: '0.5rem' }}><div style={{ fontSize: '0.58rem', color: 'rgba(240,232,216,0.3)', letterSpacing: '0.1em', marginBottom: '0.2rem' }}>MECHANISM</div><div style={{ fontSize: '0.7rem', color: 'rgba(240,232,216,0.6)', lineHeight: 1.6 }}>{p.mechanism}</div></div>
              <div style={{ marginBottom: '0.5rem' }}><div style={{ fontSize: '0.58rem', color: 'rgba(240,232,216,0.3)', letterSpacing: '0.1em', marginBottom: '0.2rem' }}>EVIDENCE</div><div style={{ fontSize: '0.7rem', color: 'rgba(240,232,216,0.6)', lineHeight: 1.6 }}>{p.evidence}</div></div>
              <div><div style={{ fontSize: '0.58rem', color: '#C9963C', letterSpacing: '0.1em', marginBottom: '0.2rem' }}>MONITORING</div><div style={{ fontSize: '0.7rem', color: 'rgba(240,232,216,0.55)' }}>{p.monitoring}</div></div>
            </div>
          ))}
        </div>
      )}

      {/* CLINICAL PROTOCOLS */}
      {active === 'protocols' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {CLINICAL_PROTOCOLS.map((p, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${p.color}25`, borderRadius: 8, padding: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div>
                  <div style={{ fontSize: '0.58rem', color: p.color, letterSpacing: '0.15em', marginBottom: '0.2rem' }}>{p.category.toUpperCase()}</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#F0E8D8' }}>{p.name}</div>
                </div>
              </div>
              <div style={{ fontSize: '0.72rem', color: 'rgba(240,232,216,0.55)', lineHeight: 1.6, marginBottom: '1rem' }}>{p.evidence}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <div style={{ fontSize: '0.58rem', color: p.color, letterSpacing: '0.1em', marginBottom: '0.4rem' }}>PROTOCOL</div>
                  {p.protocol.map((step, j) => <div key={j} style={{ fontSize: '0.68rem', color: 'rgba(240,232,216,0.7)', lineHeight: 1.8 }}>{step}</div>)}
                </div>
                <div>
                  <div style={{ fontSize: '0.58rem', color: '#E4B85A', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>MONITORING</div>
                  {p.monitoring.map((m, j) => <div key={j} style={{ fontSize: '0.68rem', color: 'rgba(240,232,216,0.55)', lineHeight: 1.8 }}>• {m}</div>)}
                </div>
                <div>
                  <div style={{ fontSize: '0.58rem', color: '#E06090', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>CONTRAINDICATIONS</div>
                  {p.contraindications.map((c, j) => <div key={j} style={{ fontSize: '0.68rem', color: 'rgba(240,232,216,0.45)', lineHeight: 1.8 }}>✕ {c}</div>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PEPTIDE ENCYCLOPEDIA */}
      {active === 'peptides' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '0.75rem' }}>
          {PEPTIDE_ENCYCLOPEDIA.map((p, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${p.color}20`, borderRadius: 8, padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: p.color }}>{p.name}</div>
                <span style={{ fontSize: '0.58rem', color: 'rgba(240,232,216,0.3)', background: `${p.color}10`, padding: '0.1rem 0.4rem', borderRadius: 3 }}>{p.category}</span>
              </div>
              <div style={{ fontSize: '0.72rem', color: '#F0E8D8', marginBottom: '0.15rem', fontWeight: 500 }}>{p.dose}</div>
              <div style={{ fontSize: '0.65rem', color: '#C9963C', marginBottom: '0.5rem' }}>{p.frequency}</div>
              <div style={{ fontSize: '0.68rem', color: 'rgba(240,232,216,0.5)', lineHeight: 1.5, marginBottom: '0.5rem' }}>{p.mechanism}</div>
              <div style={{ marginBottom: '0.4rem' }}>
                <div style={{ fontSize: '0.58rem', color: p.color, letterSpacing: '0.1em', marginBottom: '0.25rem' }}>INDICATIONS</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                  {p.indications.map((ind, j) => <span key={j} style={{ fontSize: '0.62rem', color: 'rgba(240,232,216,0.5)', background: `${p.color}08`, padding: '0.1rem 0.35rem', borderRadius: 3 }}>{ind}</span>)}
                </div>
              </div>
              <div style={{ fontSize: '0.62rem', color: 'rgba(240,232,216,0.3)', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '0.4rem' }}>{p.safety}</div>
            </div>
          ))}
        </div>
      )}

      {/* SUPPLEMENT STACKS */}
      {active === 'stacks' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {STACKS.map((s, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${s.color}20`, borderRadius: 8, padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: s.color }}>{s.name}</div>
              </div>
              <div style={{ fontSize: '0.7rem', color: 'rgba(240,232,216,0.5)', marginBottom: '0.875rem', fontStyle: 'italic' }}>{s.goal}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '0.3rem' }}>
                {s.items.map((item, j) => (
                  <div key={j} style={{ fontSize: '0.7rem', color: 'rgba(240,232,216,0.65)', padding: '0.25rem 0.5rem', background: `${s.color}06`, borderRadius: 4, borderLeft: `2px solid ${s.color}30` }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FM FRAMEWORKS */}
      {active === 'frameworks' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {FM_FRAMEWORKS.map((f, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${f.color}20`, borderRadius: 8, padding: '1.25rem' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: f.color, marginBottom: '0.4rem' }}>{f.name}</div>
              <div style={{ fontSize: '0.72rem', color: 'rgba(240,232,216,0.5)', marginBottom: '1rem', lineHeight: 1.6 }}>{f.description}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {f.items.map((item, j) => (
                  <div key={j} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '0.75rem', padding: '0.6rem', background: `${f.color}06`, border: `1px solid ${f.color}12`, borderRadius: 5 }}>
                    <div style={{ fontSize: '0.62rem', fontWeight: 700, color: f.color, letterSpacing: '0.08em', lineHeight: 1.4 }}>{item.label}</div>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(240,232,216,0.6)', lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

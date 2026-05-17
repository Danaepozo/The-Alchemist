'use client'

import { useEffect, useState, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

interface Patient {
  id: string
  full_name: string
  date_of_birth: string
  gender: string
  email: string
  phone: string
}

interface LabTest {
  id: string
  name: string
  code?: string
  fasting?: boolean
  notes?: string
  lab?: string
}

interface LabCategory {
  id: string
  label: string
  color: string
  tests: LabTest[]
}

const LAB_CATALOG: LabCategory[] = [
  {
    id: 'metabolic',
    label: 'Metabolic & Insulin Resistance',
    color: '#E4B85A',
    tests: [
      { id: 'glucose', name: 'Fasting Glucose', fasting: true },
      { id: 'insulin', name: 'Fasting Insulin', fasting: true, notes: 'Functional optimal: 2-6 µIU/mL' },
      { id: 'hba1c', name: 'HbA1c', fasting: false },
      { id: 'homa_ir', name: 'HOMA-IR (calculated)', fasting: true, notes: 'Requires glucose + insulin' },
      { id: 'cpeptide', name: 'Fasting C-Peptide', fasting: true },
      { id: 'fructosamine', name: 'Fructosamine', fasting: false },
      { id: 'uric_acid', name: 'Uric Acid', fasting: false, notes: 'Functional optimal: <5.5 men, <4.5 women' },
      { id: 'adiponectin', name: 'Adiponectin', fasting: true },
      { id: 'leptin', name: 'Leptin (fasting)', fasting: true },
      { id: 'glucose_1hr', name: '1-Hour Glucose Challenge (50g)', fasting: false, notes: 'Non-fasting; most predictive metabolic test' },
    ],
  },
  {
    id: 'cardiovascular',
    label: 'Cardiovascular Precision',
    color: '#E06090',
    tests: [
      { id: 'lipid_panel', name: 'Standard Lipid Panel', fasting: true },
      { id: 'apob', name: 'ApoB', fasting: true, notes: 'Optimal <80 mg/dL — essential, not optional' },
      { id: 'lpa', name: 'Lipoprotein(a) — Lp(a)', fasting: false, notes: 'Genetic, check once; optimal <75 nmol/L' },
      { id: 'nmr_lipo', name: 'NMR LipoProfile (particle size/number)', fasting: true, lab: 'LabCorp' },
      { id: 'oxldl', name: 'Oxidized LDL (oxLDL)', fasting: true },
      { id: 'tmao', name: 'TMAO (Trimethylamine N-oxide)', fasting: true },
      { id: 'mpo', name: 'Myeloperoxidase (MPO)', fasting: false },
      { id: 'hscr', name: 'hs-CRP', fasting: false, notes: 'Functional optimal <0.5 mg/L' },
      { id: 'hcy', name: 'Homocysteine', fasting: true, notes: 'Functional optimal <7 µmol/L' },
      { id: 'fibrinogen', name: 'Fibrinogen', fasting: false },
      { id: 'glyca', name: 'GlycA (via NMR)', fasting: true },
      { id: 'ntprobnp', name: 'NT-proBNP', fasting: false },
      { id: 'galectin3', name: 'Galectin-3', fasting: false },
      { id: 'hstroponin', name: 'hs-Troponin I', fasting: false },
      { id: 'cac', name: 'Coronary Artery Calcium Score (CAC)', fasting: false, notes: 'Imaging — low-dose CT; best subclinical plaque screening' },
      { id: 'cimt', name: 'CIMT (Carotid Intima Media Thickness)', fasting: false, notes: 'Ultrasound; arterial aging marker' },
    ],
  },
  {
    id: 'thyroid',
    label: 'Thyroid — Comprehensive',
    color: '#9A7CE8',
    tests: [
      { id: 'tsh', name: 'TSH', fasting: false, notes: 'Functional optimal: 0.5–2.0 mIU/L' },
      { id: 'ft3', name: 'Free T3 (fT3)', fasting: false, notes: 'Active hormone; functional optimal >3.2 pg/mL' },
      { id: 'ft4', name: 'Free T4 (fT4)', fasting: false },
      { id: 'rt3', name: 'Reverse T3 (rT3)', fasting: false, notes: 'Conversion block marker; optimal <15 ng/dL' },
      { id: 'tt3', name: 'Total T3', fasting: false },
      { id: 'tpo', name: 'TPO Antibodies', fasting: false, notes: 'Hashimoto\'s — any elevation is significant' },
      { id: 'tgab', name: 'Anti-Thyroglobulin Antibodies', fasting: false },
      { id: 'tbg', name: 'Thyroid Binding Globulin (TBG)', fasting: false },
      { id: 'tsi', name: 'TSI (Thyroid Stimulating Immunoglobulin)', fasting: false, notes: 'Graves\' disease screening' },
    ],
  },
  {
    id: 'hormones_sex',
    label: 'Sex Hormones',
    color: '#C9963C',
    tests: [
      { id: 'testo_total', name: 'Testosterone Total', fasting: true, notes: 'Morning draw 7-10am' },
      { id: 'testo_free_calc', name: 'Free Testosterone (calculated)', fasting: true },
      { id: 'testo_free_dial', name: 'Free Testosterone (equilibrium dialysis)', fasting: true, notes: 'Gold standard; more accurate than calculated' },
      { id: 'shbg', name: 'SHBG', fasting: true },
      { id: 'e2', name: 'Estradiol (E2)', fasting: false },
      { id: 'e1', name: 'Estrone (E1)', fasting: false },
      { id: 'e3', name: 'Estriol (E3)', fasting: false },
      { id: 'dht', name: 'DHT (Dihydrotestosterone)', fasting: false },
      { id: 'lh', name: 'LH', fasting: false },
      { id: 'fsh', name: 'FSH', fasting: false },
      { id: 'prolactin', name: 'Prolactin', fasting: true, notes: 'Morning; functional optimal <15 men, <20 women' },
      { id: 'dheas', name: 'DHEA-S', fasting: false },
      { id: 'pregnenolone', name: 'Pregnenolone', fasting: true, notes: '"Mother hormone" — functional optimal men 50-100 ng/dL' },
      { id: 'progesterone', name: 'Progesterone', fasting: false },
      { id: 'ohp17', name: '17-OH Progesterone', fasting: true, notes: 'NCAH/CAH screening; morning draw' },
      { id: 'psa', name: 'PSA + Free PSA', fasting: false },
    ],
  },
  {
    id: 'adrenal',
    label: 'Adrenal & HPA Axis',
    color: '#FF8C00',
    tests: [
      { id: 'cortisol_am', name: 'Cortisol AM (8am)', fasting: false, notes: 'Draw at 8am; functional optimal 15-25 µg/dL' },
      { id: 'cortisol_pm', name: 'Cortisol PM (4pm)', fasting: false, notes: 'Diurnal rhythm assessment' },
      { id: 'dutch', name: 'DUTCH Complete (urine hormones)', fasting: false, lab: 'Precision Analytical', notes: 'Gold standard: cortisol rhythm, estrogen metabolites, neurotransmitter metabolites, melatonin' },
      { id: 'salivary_cortisol', name: 'Salivary Cortisol x4 + DHEA', fasting: false, notes: 'Morning/noon/afternoon/evening; HPA axis rhythm' },
      { id: 'aldosterone', name: 'Aldosterone (serum)', fasting: false },
      { id: 'pra', name: 'Plasma Renin Activity (PRA)', fasting: false },
      { id: 'arr', name: 'Aldosterone/Renin Ratio (ARR)', fasting: false, notes: 'Primary hyperaldosteronism screening; affects 10-15% of hypertensives' },
      { id: 'metanephrines', name: 'Plasma Free Metanephrines', fasting: false, notes: 'Pheochromocytoma screening; most sensitive test' },
    ],
  },
  {
    id: 'methylation',
    label: 'Methylation & B-Vitamins',
    color: '#3DC898',
    tests: [
      { id: 'homocysteine', name: 'Homocysteine', fasting: true, notes: 'Functional optimal <7 µmol/L; most doctors ignore until >15' },
      { id: 'mma', name: 'Methylmalonic Acid (MMA)', fasting: false, notes: 'True B12 functional deficiency marker — more accurate than serum B12' },
      { id: 'b12_serum', name: 'Vitamin B12 (serum)', fasting: false, notes: 'Functional optimal >600 pg/mL' },
      { id: 'holotc', name: 'Holotranscobalamin (Active B12)', fasting: false, notes: 'Bioavailable B12; optimal >35 pmol/L' },
      { id: 'folate_rbc', name: 'Folate (RBC)', fasting: false, notes: 'More accurate than serum folate; optimal >1000 ng/mL' },
      { id: 'folate_serum', name: 'Folate (serum)', fasting: false },
      { id: 'p5p', name: 'Pyridoxal-5-Phosphate (P5P/B6 active)', fasting: false, notes: 'Functional B6 — cofactor for neurotransmitters, homocysteine' },
      { id: 'mthfr', name: 'MTHFR Genotype (C677T + A1298C)', fasting: false, notes: 'Genetic test; one-time; affects methylation capacity' },
    ],
  },
  {
    id: 'inflammation',
    label: 'Inflammation & Immune',
    color: '#ff4444',
    tests: [
      { id: 'hscr2', name: 'hs-CRP', fasting: false, notes: 'Functional optimal <0.5 mg/L (conventional <3.0 is too permissive)' },
      { id: 'il6', name: 'IL-6 (Interleukin-6)', fasting: false },
      { id: 'tnf', name: 'TNF-alpha', fasting: false },
      { id: 'esr', name: 'ESR', fasting: false },
      { id: 'fibrinogen2', name: 'Fibrinogen', fasting: false },
      { id: 'ferritin', name: 'Ferritin', fasting: false, notes: 'Dual marker: iron storage AND inflammation; optimal 50-150 ng/mL' },
      { id: 'zonulin', name: 'Zonulin (serum)', fasting: false, notes: 'Intestinal permeability / leaky gut marker' },
      { id: 'lps', name: 'LPS Endotoxin (serum)', fasting: false, notes: 'Endotoxemia from leaky gut; systemic inflammation driver' },
      { id: 'ana', name: 'ANA (Antinuclear Antibody)', fasting: false },
      { id: 'anti_dsdna', name: 'Anti-dsDNA', fasting: false },
      { id: 'complement', name: 'Complement C3 + C4', fasting: false },
      { id: 'ige', name: 'Total IgE', fasting: false },
      { id: 'nk_activity', name: 'NK Cell Activity (functional)', fasting: false, lab: 'RGCC or specialty lab' },
    ],
  },
  {
    id: 'vitamins',
    label: 'Vitamins, Minerals & Nutrients',
    color: '#60C0E0',
    tests: [
      { id: 'vit_d', name: 'Vitamin D 25-OH', fasting: false, notes: 'Functional optimal 50-80 ng/mL (NOT just >20)' },
      { id: 'vit_d_active', name: 'Vitamin D 1,25-OH (Calcitriol)', fasting: false, notes: 'Active form; conversion issues' },
      { id: 'vit_a', name: 'Vitamin A (Retinol)', fasting: false },
      { id: 'vit_k2', name: 'Vitamin K2 (MK-7)', fasting: false, notes: 'Routes calcium to bones not arteries; almost never ordered' },
      { id: 'vit_e', name: 'Vitamin E (alpha-tocopherol)', fasting: false },
      { id: 'vit_c', name: 'Vitamin C (plasma)', fasting: false },
      { id: 'coq10', name: 'CoQ10 (plasma)', fasting: false, notes: 'Depleted by statins; optimal >1.0 µg/mL' },
      { id: 'mg_rbc', name: 'Magnesium RBC', fasting: false, notes: 'ONLY reliable Mg marker; serum Mg is useless. Optimal 5.5-6.8 mg/dL' },
      { id: 'mg_serum', name: 'Magnesium (serum)', fasting: false },
      { id: 'zinc', name: 'Zinc (serum)', fasting: false },
      { id: 'copper', name: 'Copper (serum)', fasting: false },
      { id: 'zinc_copper', name: 'Zinc/Copper Ratio', fasting: false, notes: 'Optimal 0.7-1.0; high Cu/low Zn = Alzheimer\'s risk' },
      { id: 'selenium', name: 'Selenium', fasting: false, notes: 'Thyroid T4→T3 conversion; optimal 120-150 ng/mL' },
      { id: 'iodine_urine', name: 'Iodine (24-hr urine)', fasting: false, notes: 'Thyroid AND breast health; optimal 150-300 µg/day' },
      { id: 'omega3', name: 'Omega-3 Index (EPA+DHA%)', fasting: false, notes: 'Functional optimal >8%; most people are 4-5%' },
      { id: 'omega_ratio', name: 'Omega-6/Omega-3 Ratio', fasting: false, notes: 'Optimal 2-4:1; Western diet = 15-25:1' },
      { id: 'iron_panel', name: 'Iron Panel (serum iron + TIBC + transferrin sat)', fasting: true },
      { id: 'spectracel', name: 'SpectraCell Micronutrient Panel', fasting: false, lab: 'SpectraCell Laboratories', notes: 'Intracellular nutrients — gold standard for functional nutritional assessment' },
      { id: 'lithium_trace', name: 'Lithium (trace mineral, RBC)', fasting: false, notes: 'Neuroprotective trace mineral; NOT psychiatric lithium' },
    ],
  },
  {
    id: 'oxidative',
    label: 'Oxidative Stress & Antioxidants',
    color: '#FF6B35',
    tests: [
      { id: '8ohdg', name: '8-OHdG (DNA oxidative damage)', fasting: false, notes: 'Gold standard DNA oxidative damage marker; rarely ordered' },
      { id: 'f2iso', name: 'F2-Isoprostanes (lipid peroxidation)', fasting: false, notes: 'Most sensitive oxidative stress marker' },
      { id: 'glutathione', name: 'Glutathione (reduced/oxidized ratio)', fasting: false, notes: 'Master antioxidant; ratio should be >10:1' },
      { id: 'mda', name: 'Malondialdehyde (MDA)', fasting: false },
      { id: 'sod', name: 'Superoxide Dismutase (SOD)', fasting: false },
    ],
  },
  {
    id: 'gut',
    label: 'Gut Health & Microbiome',
    color: '#8BC34A',
    tests: [
      { id: 'gimap', name: 'GI-MAP (comprehensive PCR stool)', fasting: false, lab: 'Diagnostic Solutions', notes: 'Gold standard: pathogens, parasites, H. pylori virulence, microbiome, zonulin, calprotectin, sIgA' },
      { id: 'sibo_lactulose', name: 'SIBO Breath Test — Lactulose', fasting: true, notes: 'Small intestinal bacterial overgrowth; hydrogen + methane pattern' },
      { id: 'sibo_glucose', name: 'SIBO Breath Test — Glucose', fasting: true },
      { id: 'zonulin2', name: 'Zonulin (serum or stool)', fasting: false },
      { id: 'calprotectin', name: 'Calprotectin (stool)', fasting: false, notes: 'Gut inflammation marker' },
      { id: 'siga', name: 'Secretory IgA (stool)', fasting: false, notes: 'First-line gut immune defense' },
      { id: 'elastase', name: 'Pancreatic Elastase-1 (stool)', fasting: false, notes: 'Enzyme insufficiency/malabsorption' },
      { id: 'beta_glucuronidase', name: 'Beta-Glucuronidase (stool)', fasting: false, notes: 'High = estrogen recirculation → cancer risk' },
      { id: 'dao', name: 'DAO Enzyme (serum)', fasting: false, notes: 'Diamine oxidase; histamine intolerance' },
      { id: 'food_sensitivity_mrt', name: 'Food Sensitivity — MRT (Mediator Release Test)', fasting: false, lab: 'Oxford Biomedical' },
      { id: 'cyrex3', name: 'Cyrex Array 3 (Gluten/Wheat Reactivity)', fasting: false, lab: 'Cyrex Laboratories' },
      { id: 'cyrex10', name: 'Cyrex Array 10 (Food Sensitivity)', fasting: false, lab: 'Cyrex Laboratories' },
      { id: 'cyrex2', name: 'Cyrex Array 2 (Intestinal Permeability)', fasting: false, lab: 'Cyrex Laboratories' },
    ],
  },
  {
    id: 'mitochondrial',
    label: 'Mitochondrial & Energy',
    color: '#FFC107',
    tests: [
      { id: 'oat', name: 'Organic Acids Test (OAT) — Full Panel', fasting: false, lab: 'Great Plains / Mosaic Diagnostics', notes: 'Krebs cycle, fatty acid oxidation, B-vitamins functional, neurotransmitters, gut dysbiosis, methylation, detox' },
      { id: 'coq10_2', name: 'CoQ10 (plasma)', fasting: false },
      { id: 'carnitine', name: 'Carnitine (total + free + acylcarnitine)', fasting: false },
      { id: 'lactate', name: 'Lactate (plasma)', fasting: false },
      { id: 'pyruvate', name: 'Pyruvate (plasma)', fasting: false },
      { id: 'nad', name: 'NAD+ Intracellular Level', fasting: false, lab: 'Jinfiniti Precision Medicine', notes: 'Declines 50% from age 40-60; optimal >40 µM intracellular' },
    ],
  },
  {
    id: 'longevity',
    label: 'Longevity & Biological Age',
    color: '#3DC898',
    tests: [
      { id: 'truage', name: 'TruAge Complete (epigenetic age — DNA methylation)', fasting: false, lab: 'TruDiagnostic', notes: 'DunedinPACE (aging rate), GrimAge (mortality predictor), PhenoAge, organ-specific clocks' },
      { id: 'glycanage', name: 'GlycanAge (glycan biological age)', fasting: false, lab: 'GlycanAge', notes: 'Immune system age; responds to lifestyle changes in 3 months' },
      { id: 'telomere', name: 'Telomere Length', fasting: false, lab: 'SpectraCell / Life Length', notes: 'Cellular aging clock; predicts cancer risk and mortality' },
      { id: 'igf1', name: 'IGF-1', fasting: true, notes: 'Growth hormone proxy; optimal age-adjusted 150-275 ng/mL' },
      { id: 'klotho', name: 'Klotho (serum)', fasting: false, notes: 'Anti-aging hormone; optimal >800 pg/mL' },
      { id: 'ptau217', name: 'Phospho-tau 217 (p-tau217) — plasma', fasting: false, notes: 'Most sensitive Alzheimer\'s early detection; elevated 15-20 yrs before symptoms' },
      { id: 'nfl', name: 'Neurofilament Light Chain (NfL) — plasma', fasting: false, notes: 'Neurodegeneration / brain aging marker' },
      { id: 'gfap', name: 'GFAP (Glial Fibrillary Acidic Protein)', fasting: false, notes: 'Astrocyte damage; Alzheimer\'s risk marker' },
      { id: 'bdnf', name: 'BDNF (Brain-Derived Neurotrophic Factor)', fasting: false, notes: 'Neurogenesis marker; low = depression + cognitive decline risk' },
      { id: 'galleri', name: 'GALLERI Multi-Cancer Early Detection', fasting: false, lab: 'Grail', notes: 'Detects 50+ cancers from ctDNA in blood; annual for 50+ or high-risk' },
    ],
  },
  {
    id: 'cancer',
    label: 'Cancer Surveillance Markers',
    color: '#E06090',
    tests: [
      { id: 'psa_full', name: 'PSA Total + Free PSA + PSA Velocity', fasting: false },
      { id: 'ca125', name: 'CA-125 (ovarian)', fasting: false },
      { id: 'he4', name: 'HE4 + ROMA Score (ovarian)', fasting: false, notes: 'More specific than CA-125 alone' },
      { id: 'cea', name: 'CEA (colorectal, lung, breast)', fasting: false },
      { id: 'ca199', name: 'CA 19-9 (pancreatic/biliary)', fasting: false },
      { id: 'afp', name: 'AFP (liver, testicular)', fasting: false },
      { id: 'ca153', name: 'CA 15-3 / CA 27.29 (breast)', fasting: false },
      { id: 'ctdna', name: 'ctDNA (Circulating Tumor DNA)', fasting: false, lab: 'Specialty lab', notes: 'Liquid biopsy for cancer monitoring' },
      { id: 'nagalase', name: 'Nagalase', fasting: false, notes: 'Cancer/viral burden; immunosuppression marker' },
    ],
  },
  {
    id: 'environmental',
    label: 'Environmental & Detox',
    color: '#A0A0A0',
    tests: [
      { id: 'heavy_blood', name: 'Heavy Metals — Whole Blood', fasting: false, notes: 'Lead, mercury, arsenic, cadmium — recent/acute exposure' },
      { id: 'heavy_dmsa', name: 'Heavy Metals — Urine (DMSA Provocation)', fasting: false, lab: 'Doctor\'s Data', notes: 'Body burden (stored metals); requires DMSA challenge — more accurate than blood for chronic' },
      { id: 'gpltox', name: 'GPL-TOX (172 Environmental Chemicals)', fasting: false, lab: 'Great Plains / Mosaic Diagnostics', notes: 'Organophosphates, phthalates, benzene, parabens, MTBE, solvents' },
      { id: 'mycotoxins', name: 'Mycotoxins (urine)', fasting: false, lab: 'Great Plains / RealTime Labs', notes: 'Mold toxins; aflatoxins, ochratoxin A, trichothecenes; 25% of US buildings have significant mold' },
      { id: 'glyphosate', name: 'Glyphosate (urine)', fasting: false, notes: 'Most used herbicide; gut microbiome disruptor; optimal non-detectable' },
      { id: 'ermi', name: 'ERMI Home Mold Test', fasting: false, lab: 'EnviroBiomics / Mycometrics', notes: 'DNA-based mold test of home/workplace; >2 = concerning; do BEFORE starting mold treatment' },
    ],
  },
  {
    id: 'mcas_cirs',
    label: 'MCAS / CIRS / Biotoxin',
    color: '#B0A0FF',
    tests: [
      { id: 'tryptase', name: 'Serum Tryptase (baseline)', fasting: false, notes: 'MCAS: >11.4 ng/mL; Mastocytosis: >20 ng/mL' },
      { id: 'methylhistamine', name: 'Urinary Methylhistamine', fasting: false, notes: 'More stable than serum histamine; optimal <200 µg/g creatinine' },
      { id: 'dao2', name: 'DAO Enzyme Activity', fasting: false, notes: 'Histamine intolerance; optimal >3 HDU/mL' },
      { id: 'chromoA', name: 'Chromogranin A', fasting: false, notes: 'MCAS + neuroendocrine tumor screening' },
      { id: 'tgfb1', name: 'TGF-beta1', fasting: false, notes: 'CIRS/Shoemaker: >2380 pg/mL = biotoxin illness' },
      { id: 'msh', name: 'MSH (Melanocyte Stimulating Hormone)', fasting: false, notes: 'CIRS: <35 pg/mL = mold illness; regulates pain, sleep, hormones' },
      { id: 'vip', name: 'VIP (Vasoactive Intestinal Peptide)', fasting: false, notes: 'CIRS: <23 pg/mL; treated with VIP nasal spray' },
      { id: 'c4a', name: 'C4a (Complement component 4a)', fasting: false, notes: 'CIRS: >2830 ng/mL = inflammatory complement activation' },
      { id: 'mmp9', name: 'MMP-9 (Matrix Metalloproteinase 9)', fasting: false, notes: 'CIRS: >332 ng/mL = tissue breakdown' },
      { id: 'vegf', name: 'VEGF (Vascular Endothelial Growth Factor)', fasting: false, notes: 'Low in early CIRS; vascular dysfunction' },
      { id: 'hladr', name: 'HLA-DR Genotype (mold susceptibility)', fasting: false, notes: 'One-time genetic test; 25% of population cannot clear biotoxins' },
      { id: 'adh_osm', name: 'ADH + Osmolality', fasting: false, notes: 'CIRS: low ADH + high osmolality = leaky ADH pattern' },
    ],
  },
  {
    id: 'genetics',
    label: 'Genetics & Pharmacogenomics',
    color: '#78909C',
    tests: [
      { id: 'mthfr2', name: 'MTHFR (C677T + A1298C)', fasting: false, notes: 'Methylation; affects B-vitamin metabolism, homocysteine, cancer risk' },
      { id: 'apoe', name: 'APOE Genotype (e2/e3/e4)', fasting: false, notes: 'Alzheimer\'s risk (APOE4 = 3-15×); lipid metabolism; one-time test' },
      { id: 'comt', name: 'COMT (Val158Met)', fasting: false, notes: 'Dopamine/estrogen metabolism; stress response' },
      { id: 'vdr', name: 'VDR (Vitamin D Receptor)', fasting: false, notes: 'Vitamin D function at receptor level' },
      { id: 'sod2', name: 'SOD2 (Ala16Val)', fasting: false, notes: 'Mitochondrial antioxidant capacity' },
      { id: 'cyp1b1', name: 'CYP1B1 / CYP1A2 (estrogen metabolism)', fasting: false, notes: 'Phase I estrogen hydroxylation; cancer risk' },
      { id: 'pgx', name: 'Pharmacogenomics Panel (CYP2D6, CYP2C19, CYP3A4)', fasting: false, notes: 'Drug metabolism speed; prevents toxicity + underdosing' },
      { id: 'hfe', name: 'HFE Gene (C282Y, H63D) — Hemochromatosis', fasting: false, notes: '1:200 Northern Europeans; iron overload causes liver/heart/pancreas damage' },
      { id: 'cbs', name: 'CBS (Cystathionine Beta-Synthase)', fasting: false, notes: 'Homocysteine conversion; methylation pathway' },
    ],
  },
  {
    id: 'autoimmune',
    label: 'Autoimmune & Neurological',
    color: '#FF7043',
    tests: [
      { id: 'cyrex5', name: 'Cyrex Array 5 (Multiple Autoimmune Reactivity — 24 tissues)', fasting: false, lab: 'Cyrex Laboratories', notes: 'Early autoimmune detection years before diagnosis' },
      { id: 'cyrex7x', name: 'Cyrex Array 7X (Neurological Autoimmune)', fasting: false, lab: 'Cyrex Laboratories', notes: 'Brain antibodies: myelin, GAD65, cerebellar, neuronal; often missed for years' },
      { id: 'ebv', name: 'EBV Reactivation Panel (VCA IgG, EA-D, EBNA)', fasting: false, notes: 'Chronic EBV drives fatigue, autoimmunity, lymphoma; very common and underdiagnosed' },
      { id: 'hhv6', name: 'HHV-6 IgG + IgM', fasting: false },
      { id: 'cmv', name: 'CMV (Cytomegalovirus) IgG + IgM', fasting: false },
      { id: 'coxsackieb', name: 'Coxsackie B Antibodies (1-6)', fasting: false, notes: 'Myocarditis, autoimmunity, chronic fatigue' },
      { id: 'cd4cd8', name: 'CD4/CD8 Ratio (T-cell subsets)', fasting: false, notes: 'Immune balance; optimal ~2.0' },
      { id: 'antigad65', name: 'Anti-GAD65 Antibodies', fasting: false, notes: 'Type 1 diabetes, LADA, neurological autoimmunity' },
      { id: 'celiac', name: 'Celiac Panel (tTG IgA/IgG + DGP)', fasting: false },
    ],
  },
  {
    id: 'liver_renal',
    label: 'Liver & Renal Precision',
    color: '#795548',
    tests: [
      { id: 'ggt', name: 'GGT (Gamma-Glutamyl Transferase)', fasting: false, notes: 'Functional optimal <20 men, <15 women; conventional <56 is dangerously permissive. Sensitive to alcohol, NAFLD, toxins' },
      { id: 'alt_ast', name: 'ALT + AST', fasting: false, notes: 'Functional optimal ALT <20; AST/ALT ratio for NAFLD vs. alcohol' },
      { id: 'fib4', name: 'FIB-4 Score components (Age + AST + Platelets + ALT)', fasting: false, notes: 'Non-invasive liver fibrosis scoring — calculate from standard labs' },
      { id: 'cystatin_c', name: 'Cystatin C', fasting: false, notes: 'Better kidney function marker than creatinine; not affected by muscle mass' },
      { id: 'uacr', name: 'Urine Albumin/Creatinine Ratio (UACR)', fasting: false, notes: 'Early kidney damage; >30 mg/g = microalbuminuria — years before conventional detection' },
    ],
  },
]

// Pre-built panels for quick ordering
const QUICK_PANELS: { name: string; color: string; testIds: string[] }[] = [
  {
    name: 'Core Longevity Panel',
    color: '#3DC898',
    testIds: ['glucose', 'insulin', 'hba1c', 'lipid_panel', 'apob', 'hscr', 'hcy', 'vit_d', 'mg_rbc', 'b12_serum', 'tsh', 'ft3', 'ft4', 'dheas', 'igf1', 'omega3', 'ferritin', 'ggt'],
  },
  {
    name: 'Hormone Optimization Panel',
    color: '#C9963C',
    testIds: ['testo_total', 'testo_free_dial', 'shbg', 'e2', 'dht', 'lh', 'fsh', 'prolactin', 'dheas', 'pregnenolone', 'progesterone', 'tsh', 'ft3', 'rt3', 'cortisol_am', 'igf1'],
  },
  {
    name: 'Cardiovascular Precision Panel',
    color: '#E06090',
    testIds: ['lipid_panel', 'apob', 'lpa', 'hscr', 'hcy', 'fibrinogen', 'tmao', 'oxldl', 'mpo', 'ntprobnp', 'insulin', 'glucose', 'hba1c'],
  },
  {
    name: 'Comprehensive Metabolic',
    color: '#E4B85A',
    testIds: ['glucose', 'insulin', 'hba1c', 'homa_ir', 'uric_acid', 'lipid_panel', 'apob', 'ggt', 'alt_ast', 'cystatin_c', 'uacr', 'ferritin'],
  },
  {
    name: 'Gut & Detox Panel',
    color: '#8BC34A',
    testIds: ['gimap', 'oat', 'zonulin', 'siga', 'calprotectin', 'beta_glucuronidase', 'dao', 'mycotoxins', 'heavy_blood'],
  },
  {
    name: 'Longevity Age Assessment',
    color: '#9A7CE8',
    testIds: ['truage', 'telomere', 'klotho', 'nad', 'igf1', 'bdnf', 'ptau217', 'nfl', 'galleri'],
  },
  {
    name: 'Methylation Deep Dive',
    color: '#3DC898',
    testIds: ['homocysteine', 'mma', 'b12_serum', 'holotc', 'folate_rbc', 'p5p', 'mthfr', 'vit_d', 'mg_rbc'],
  },
  {
    name: 'MCAS / CIRS Screen',
    color: '#B0A0FF',
    testIds: ['tryptase', 'methylhistamine', 'dao', 'dao2', 'tgfb1', 'msh', 'vip', 'c4a', 'mmp9'],
  },
]

function getAge(dob: string) {
  if (!dob) return ''
  const age = Math.floor((Date.now() - new Date(dob).getTime()) / (365.25 * 24 * 60 * 60 * 1000))
  return `${age} years`
}

export default function LabOrderPage() {
  const { id } = useParams()
  const router = useRouter()
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  const [patient, setPatient] = useState<Patient | null>(null)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [search, setSearch] = useState('')
  const [expandedCats, setExpandedCats] = useState<Set<string>>(new Set(['metabolic', 'cardiovascular', 'thyroid', 'hormones_sex']))
  const [sendingEmail, setSendingEmail] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [fasting, setFasting] = useState(false)
  const [notes, setNotes] = useState('')
  const printRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    supabase.from('orion_patients').select('*').eq('id', id).single().then(({ data }) => setPatient(data))
  }, [id, supabase])

  function toggleTest(testId: string) {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(testId) ? next.delete(testId) : next.add(testId)
      return next
    })
  }

  function toggleCategory(cat: LabCategory) {
    const allSelected = cat.tests.every(t => selected.has(t.id))
    setSelected(prev => {
      const next = new Set(prev)
      cat.tests.forEach(t => allSelected ? next.delete(t.id) : next.add(t.id))
      return next
    })
  }

  function applyPanel(panel: typeof QUICK_PANELS[0]) {
    setSelected(prev => {
      const next = new Set(prev)
      panel.testIds.forEach(id => next.add(id))
      return next
    })
  }

  const selectedTests = LAB_CATALOG.flatMap(c => c.tests).filter(t => selected.has(t.id))
  const hasFasting = selectedTests.some(t => t.fasting)

  const filteredCatalog = search
    ? LAB_CATALOG.map(cat => ({
        ...cat,
        tests: cat.tests.filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.notes?.toLowerCase().includes(search.toLowerCase())),
      })).filter(cat => cat.tests.length > 0)
    : LAB_CATALOG

  function handlePrint() {
    const printContent = document.getElementById('lab-order-print')
    if (!printContent) return
    const w = window.open('', '_blank')
    if (!w) return
    w.document.write(`<!DOCTYPE html><html><head><title>Lab Order — ${patient?.full_name}</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: Georgia, serif; color: #1a1a1a; padding: 40px; max-width: 800px; margin: 0 auto; }
      .header { border-bottom: 3px solid #1a1a1a; padding-bottom: 20px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: flex-start; }
      .logo { font-size: 22px; font-weight: bold; letter-spacing: 4px; }
      .subtitle { font-size: 11px; letter-spacing: 2px; color: #555; margin-top: 4px; }
      .doctor { font-size: 12px; color: #555; text-align: right; }
      .order-title { font-size: 16px; font-weight: bold; text-align: center; letter-spacing: 3px; text-transform: uppercase; margin: 24px 0 16px; border: 2px solid #1a1a1a; padding: 10px; }
      .patient-box { border: 1px solid #ccc; padding: 16px; margin-bottom: 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
      .patient-field { font-size: 12px; } .patient-label { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #888; display: block; }
      .category { margin-bottom: 20px; }
      .cat-title { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #444; border-bottom: 1px solid #ddd; padding-bottom: 6px; margin-bottom: 10px; }
      .test-row { display: flex; align-items: flex-start; gap: 8px; margin-bottom: 8px; font-size: 12px; }
      .checkbox { width: 12px; height: 12px; border: 1px solid #1a1a1a; flex-shrink: 0; margin-top: 1px; }
      .test-name { font-weight: 500; }
      .test-notes { font-size: 10px; color: #666; font-style: italic; }
      .test-lab { font-size: 10px; color: #888; }
      .fasting-banner { background: #fff8e1; border: 1px solid #f0c040; padding: 12px; margin-bottom: 20px; font-size: 12px; }
      .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #ccc; display: flex; justify-content: space-between; font-size: 11px; color: #888; }
      .signature { margin-top: 32px; display: flex; gap: 60px; }
      .sig-line { border-top: 1px solid #1a1a1a; padding-top: 6px; font-size: 11px; min-width: 200px; }
      .doctor-notes { margin-top: 16px; border: 1px solid #ddd; padding: 12px; min-height: 60px; font-size: 11px; color: #888; }
      @media print { body { padding: 20px; } }
    </style></head><body>`)
    w.document.write(printContent.innerHTML)
    w.document.write('</body></html>')
    w.document.close()
    w.focus()
    setTimeout(() => { w.print(); }, 500)
  }

  async function handleEmail() {
    if (!patient?.email) { alert('This patient has no email on file.'); return }
    setSendingEmail(true)
    const res = await fetch('/api/orion/labs/order-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        patient,
        selected_tests: selectedTests,
        fasting: hasFasting,
        notes,
        order_date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      }),
    })
    if (res.ok) setEmailSent(true)
    else alert('Error sending email. Check email configuration.')
    setSendingEmail(false)
  }

  const inputStyle = { background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(61,200,152,0.2)', borderRadius: 4, padding: '0.5rem 0.75rem', color: '#F0E8D8', fontSize: '0.8rem', outline: 'none', width: '100%' }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', gap: 0 }}>
      {/* LEFT — Lab catalog */}
      <div style={{ flex: 1, padding: '2rem', overflowY: 'auto', maxHeight: '100vh' }}>
        <Link href={`/orion/patients/${id}`} style={{ fontSize: '0.75rem', color: 'rgba(240,232,216,0.4)', textDecoration: 'none', letterSpacing: '0.1em' }}>
          ← Back to Patient
        </Link>

        <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 300, color: '#3DC898', letterSpacing: '0.1em' }}>Lab Order</h1>
          {patient && <p style={{ fontSize: '0.8rem', color: 'rgba(240,232,216,0.4)', marginTop: '0.25rem' }}>{patient.full_name} · {getAge(patient.date_of_birth)}</p>}
        </div>

        {/* Quick panels */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.62rem', color: 'rgba(240,232,216,0.3)', letterSpacing: '0.2em', marginBottom: '0.6rem' }}>QUICK PANELS</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {QUICK_PANELS.map(panel => (
              <button key={panel.name} onClick={() => applyPanel(panel)} style={{
                background: `${panel.color}12`, border: `1px solid ${panel.color}30`,
                borderRadius: 4, padding: '0.35rem 0.75rem', color: panel.color,
                fontSize: '0.7rem', cursor: 'pointer', letterSpacing: '0.05em',
              }}>+ {panel.name}</button>
            ))}
          </div>
        </div>

        {/* Search */}
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search labs..."
          style={{ ...inputStyle, marginBottom: '1rem' }}
        />

        {/* Categories */}
        {filteredCatalog.map(cat => {
          const allSelected = cat.tests.length > 0 && cat.tests.every(t => selected.has(t.id))
          const someSelected = cat.tests.some(t => selected.has(t.id))
          const isOpen = expandedCats.has(cat.id) || !!search

          return (
            <div key={cat.id} style={{ marginBottom: '0.5rem', border: `1px solid ${cat.color}20`, borderRadius: 6, overflow: 'hidden' }}>
              <div
                onClick={() => {
                  if (!search) {
                    setExpandedCats(prev => {
                      const next = new Set(prev)
                      next.has(cat.id) ? next.delete(cat.id) : next.add(cat.id)
                      return next
                    })
                  }
                }}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: `${cat.color}08`, cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <input type="checkbox" checked={allSelected} ref={el => { if (el) el.indeterminate = someSelected && !allSelected }}
                    onChange={() => toggleCategory(cat)} onClick={e => e.stopPropagation()}
                    style={{ accentColor: cat.color, width: 14, height: 14 }} />
                  <span style={{ fontSize: '0.78rem', color: someSelected ? cat.color : 'rgba(240,232,216,0.6)', fontWeight: someSelected ? 600 : 400 }}>{cat.label}</span>
                  {someSelected && <span style={{ fontSize: '0.62rem', background: `${cat.color}20`, color: cat.color, padding: '0.1rem 0.4rem', borderRadius: 10 }}>{cat.tests.filter(t => selected.has(t.id)).length}</span>}
                </div>
                <span style={{ color: 'rgba(240,232,216,0.3)', fontSize: '0.75rem' }}>{isOpen ? '▲' : '▼'}</span>
              </div>

              {isOpen && (
                <div style={{ padding: '0.5rem 1rem 0.75rem' }}>
                  {cat.tests.map(test => (
                    <div key={test.id} onClick={() => toggleTest(test.id)} style={{
                      display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                      padding: '0.5rem', borderRadius: 4, cursor: 'pointer',
                      background: selected.has(test.id) ? `${cat.color}10` : 'transparent',
                      marginBottom: '0.15rem',
                    }}>
                      <input type="checkbox" checked={selected.has(test.id)} onChange={() => {}} style={{ accentColor: cat.color, width: 14, height: 14, flexShrink: 0, marginTop: 2 }} />
                      <div>
                        <div style={{ fontSize: '0.78rem', color: selected.has(test.id) ? '#F0E8D8' : 'rgba(240,232,216,0.6)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          {test.name}
                          {test.fasting && <span style={{ fontSize: '0.58rem', color: '#E4B85A', background: 'rgba(228,184,90,0.12)', padding: '0.1rem 0.35rem', borderRadius: 2 }}>FASTING</span>}
                        </div>
                        {test.notes && <div style={{ fontSize: '0.65rem', color: 'rgba(240,232,216,0.3)', marginTop: '0.1rem', fontStyle: 'italic' }}>{test.notes}</div>}
                        {test.lab && <div style={{ fontSize: '0.62rem', color: 'rgba(240,232,216,0.25)', marginTop: '0.1rem' }}>📍 {test.lab}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* RIGHT — Order summary */}
      <div style={{ width: 340, background: 'rgba(0,0,0,0.4)', borderLeft: '1px solid rgba(61,200,152,0.12)', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(61,200,152,0.1)' }}>
          <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: '#3DC898', marginBottom: '0.25rem' }}>ORDER SUMMARY</div>
          <div style={{ fontSize: '1.2rem', color: '#F0E8D8', fontWeight: 300 }}>{selected.size} tests selected</div>
          {hasFasting && (
            <div style={{ marginTop: '0.75rem', padding: '0.5rem 0.75rem', background: 'rgba(228,184,90,0.1)', border: '1px solid rgba(228,184,90,0.25)', borderRadius: 4, fontSize: '0.72rem', color: '#E4B85A' }}>
              ⚠ Patient must fast 8-12 hours before draw
            </div>
          )}
        </div>

        {/* Selected tests list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.5rem' }}>
          {selected.size === 0 ? (
            <p style={{ color: 'rgba(240,232,216,0.2)', fontSize: '0.78rem', textAlign: 'center', marginTop: '2rem' }}>Select labs from the list<br />or apply a quick panel</p>
          ) : (
            LAB_CATALOG.map(cat => {
              const catSelected = cat.tests.filter(t => selected.has(t.id))
              if (catSelected.length === 0) return null
              return (
                <div key={cat.id} style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.6rem', color: cat.color, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>{cat.label}</div>
                  {catSelected.map(t => (
                    <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.3rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <span style={{ fontSize: '0.72rem', color: 'rgba(240,232,216,0.7)' }}>{t.name}</span>
                      <button onClick={() => toggleTest(t.id)} style={{ background: 'none', border: 'none', color: 'rgba(240,232,216,0.2)', cursor: 'pointer', fontSize: '0.75rem', padding: '0 4px' }}>✕</button>
                    </div>
                  ))}
                </div>
              )
            })
          )}
        </div>

        {/* Doctor notes */}
        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid rgba(61,200,152,0.1)' }}>
          <label style={{ fontSize: '0.62rem', color: 'rgba(240,232,216,0.3)', letterSpacing: '0.15em', display: 'block', marginBottom: '0.4rem' }}>CLINICAL NOTES / INSTRUCTIONS</label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={3}
            placeholder="Clinical context, special instructions..."
            style={{ ...inputStyle, resize: 'none', fontSize: '0.75rem' }}
          />
        </div>

        {/* Action buttons */}
        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid rgba(61,200,152,0.1)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button
            onClick={handlePrint}
            disabled={selected.size === 0}
            style={{
              background: selected.size === 0 ? 'rgba(61,200,152,0.1)' : '#3DC898',
              border: 'none', borderRadius: 4, padding: '0.75rem',
              color: selected.size === 0 ? 'rgba(61,200,152,0.4)' : '#000',
              fontSize: '0.8rem', fontWeight: 700, cursor: selected.size === 0 ? 'not-allowed' : 'pointer',
              letterSpacing: '0.1em',
            }}
          >
            🖨 PRINT LAB ORDER
          </button>

          <button
            onClick={handleEmail}
            disabled={selected.size === 0 || sendingEmail || !patient?.email}
            style={{
              background: 'transparent',
              border: `1px solid ${selected.size === 0 || !patient?.email ? 'rgba(255,255,255,0.08)' : 'rgba(61,200,152,0.3)'}`,
              borderRadius: 4, padding: '0.75rem',
              color: selected.size === 0 || !patient?.email ? 'rgba(240,232,216,0.2)' : '#3DC898',
              fontSize: '0.8rem', cursor: selected.size === 0 || !patient?.email ? 'not-allowed' : 'pointer',
              letterSpacing: '0.1em',
            }}
          >
            {emailSent ? '✓ Email Sent' : sendingEmail ? 'Sending...' : `✉ EMAIL TO PATIENT`}
          </button>
          {!patient?.email && <div style={{ fontSize: '0.65rem', color: 'rgba(240,232,216,0.25)', textAlign: 'center' }}>No email on file for this patient</div>}
        </div>
      </div>

      {/* Hidden print template */}
      <div id="lab-order-print" style={{ display: 'none' }}>
        <div className="header">
          <div>
            <div className="logo">THE ALCHEMIST MIAMI</div>
            <div className="subtitle">PRECISION · FUNCTIONAL · LONGEVITY MEDICINE</div>
          </div>
          <div className="doctor">
            <strong>Dr. Michael J. Meighen MD</strong><br />
            Board-Certified Physician<br />
            Precision & Functional Medicine<br />
            The Alchemist Miami · Miami, FL
          </div>
        </div>
        <div className="order-title">Laboratory Order</div>
        <div className="patient-box">
          <div className="patient-field"><span className="patient-label">Patient Name</span>{patient?.full_name}</div>
          <div className="patient-field"><span className="patient-label">Date</span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
          <div className="patient-field"><span className="patient-label">Date of Birth</span>{patient?.date_of_birth ? new Date(patient.date_of_birth + 'T12:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '—'} ({getAge(patient?.date_of_birth || '')})</div>
          <div className="patient-field"><span className="patient-label">Gender</span>{patient?.gender || '—'}</div>
          <div className="patient-field"><span className="patient-label">Phone</span>{patient?.phone || '—'}</div>
          <div className="patient-field"><span className="patient-label">Email</span>{patient?.email || '—'}</div>
        </div>
        {hasFasting && (
          <div className="fasting-banner">
            <strong>⚠ FASTING REQUIRED:</strong> Patient must fast for 8–12 hours before blood draw. Water is permitted. Morning draw (before 10am) recommended for optimal hormone levels.
          </div>
        )}
        {LAB_CATALOG.map(cat => {
          const tests = cat.tests.filter(t => selected.has(t.id))
          if (tests.length === 0) return null
          return (
            <div key={cat.id} className="category">
              <div className="cat-title">{cat.label}</div>
              {tests.map(t => (
                <div key={t.id} className="test-row">
                  <div className="checkbox"></div>
                  <div>
                    <span className="test-name">{t.name}</span>
                    {t.fasting && <span style={{ fontSize: '10px', color: '#b07a00', marginLeft: '8px' }}>[FASTING]</span>}
                    {t.lab && <div className="test-lab">Preferred lab: {t.lab}</div>}
                    {t.notes && <div className="test-notes">{t.notes}</div>}
                  </div>
                </div>
              ))}
            </div>
          )
        })}
        {notes && (
          <div>
            <div style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#444', borderBottom: '1px solid #ddd', paddingBottom: '6px', marginBottom: '8px', marginTop: '20px' }}>Clinical Notes</div>
            <div style={{ fontSize: '12px', lineHeight: '1.7' }}>{notes}</div>
          </div>
        )}
        <div className="signature">
          <div className="sig-line">Ordering Physician Signature</div>
          <div className="sig-line">Date</div>
        </div>
        <div className="footer">
          <span>The Alchemist Miami · Precision & Functional Medicine</span>
          <span>Dr. Michael J. Meighen MD · {new Date().getFullYear()}</span>
        </div>
      </div>
    </div>
  )
}

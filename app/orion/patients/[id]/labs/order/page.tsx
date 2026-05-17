'use client'

import React, { useEffect, useState, useRef } from 'react'
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
  fasting?: boolean
  notes?: string
  lab?: string
}

interface LabCategory {
  id: string
  label: string
  color: string
  description?: string
  tests: LabTest[]
}

// ─── PHASE 1: PREVENTION PROFILE ──────────────────────────────────────────────
const PREVENTION_CATALOG: LabCategory[] = [
  {
    id: 'prev_metabolic',
    label: 'Metabolic Foundation',
    color: '#E4B85A',
    description: 'Detects insulin resistance & pre-diabetes 10–15 years before Type 2 develops',
    tests: [
      { id: 'p_glucose', name: 'Fasting Glucose', fasting: true, notes: 'Functional optimal: 72–85 mg/dL' },
      { id: 'p_insulin', name: 'Fasting Insulin', fasting: true, notes: 'Functional optimal: 2–6 µIU/mL' },
      { id: 'p_hba1c', name: 'HbA1c' },
      { id: 'p_homa', name: 'HOMA-IR (calculated)', fasting: true, notes: 'Requires glucose + insulin' },
      { id: 'p_cpeptide', name: 'Fasting C-Peptide', fasting: true },
      { id: 'p_uric', name: 'Uric Acid', notes: 'Functional: <5.5 men / <4.5 women' },
      { id: 'p_1hr', name: '1-Hour Glucose Challenge (50g)', notes: 'Most predictive single metabolic test' },
      { id: 'p_adiponectin', name: 'Adiponectin', fasting: true },
    ],
  },
  {
    id: 'prev_cardio',
    label: 'Cardiovascular Precision',
    color: '#E06090',
    description: 'True cardiovascular risk — LDL alone misses 50% of heart attack patients',
    tests: [
      { id: 'p_apob', name: 'ApoB', notes: 'Functional optimal: <80 mg/dL — best single CVD marker' },
      { id: 'p_lpa', name: 'Lp(a)', notes: 'Genetic risk — test once in life' },
      { id: 'p_nmr', name: 'LDL Particle Size / NMR LipoProfile', notes: 'Pattern A vs B particle size' },
      { id: 'p_hscr', name: 'hs-CRP', notes: 'Functional optimal: <0.5 mg/L (not <3.0)' },
      { id: 'p_homocys', name: 'Homocysteine', notes: 'Functional optimal: <7 µmol/L' },
      { id: 'p_omega3', name: 'Omega-3 Index', notes: 'Functional optimal: >8% (most people are 4–5%)' },
      { id: 'p_lipid', name: 'Full Lipid Panel (Total, LDL, HDL, TG)', fasting: true },
      { id: 'p_oxldl', name: 'Oxidized LDL (oxLDL)', notes: 'Most atherogenic LDL fraction' },
    ],
  },
  {
    id: 'prev_thyroid',
    label: 'Thyroid — Complete Picture',
    color: '#3DC898',
    description: 'TSH alone misses 40% of thyroid dysfunction — full panel required',
    tests: [
      { id: 'p_tsh', name: 'TSH', notes: 'Functional optimal: 0.5–2.0 mIU/L' },
      { id: 'p_ft3', name: 'Free T3', notes: 'Functional optimal: 3.2–4.4 pg/mL — most active thyroid hormone' },
      { id: 'p_ft4', name: 'Free T4', notes: 'Precursor — checks conversion capacity' },
      { id: 'p_rt3', name: 'Reverse T3 (rT3)', notes: 'Elevated = conversion block (stress, inflammation, toxins)' },
      { id: 'p_tpo', name: 'TPO Antibodies', notes: 'Autoimmune thyroid — elevated years before symptoms' },
      { id: 'p_tgab', name: 'Thyroglobulin Antibodies', notes: 'Second autoimmune thyroid marker' },
    ],
  },
  {
    id: 'prev_hormones',
    label: 'Hormonal Architecture',
    color: '#9A7CE8',
    description: 'The hormonal symphony driving energy, cognition, body composition, and longevity',
    tests: [
      { id: 'p_ttest', name: 'Total Testosterone', fasting: true, notes: 'Morning draw (peak at 8–10 AM)' },
      { id: 'p_ftest', name: 'Free Testosterone', fasting: true },
      { id: 'p_shbg', name: 'SHBG', notes: 'Determines bioavailable testosterone' },
      { id: 'p_e2', name: 'Estradiol (E2)', notes: 'Important in both men and women' },
      { id: 'p_dheas', name: 'DHEA-S', notes: 'Master adrenal hormone — declines sharply with age' },
      { id: 'p_cortam', name: 'Cortisol (AM, fasting)', fasting: true, notes: 'Draw 8–9 AM; reflects HPA axis' },
      { id: 'p_igf1', name: 'IGF-1', notes: 'Growth hormone surrogate — both low and high are problems' },
      { id: 'p_prolactin', name: 'Prolactin', fasting: true },
      { id: 'p_prog', name: 'Progesterone (women)', notes: 'Day 21 of cycle for luteal phase assessment' },
      { id: 'p_lh', name: 'LH', fasting: true },
      { id: 'p_fsh', name: 'FSH', fasting: true },
    ],
  },
  {
    id: 'prev_nutrition',
    label: 'Nutritional Deficiencies',
    color: '#C9963C',
    description: 'Hidden deficiencies causing fatigue, depression, inflammation, and accelerated aging',
    tests: [
      { id: 'p_vitd', name: 'Vitamin D (25-OH)', notes: 'Functional optimal: 50–80 ng/mL (conventional >20 is dangerously low)' },
      { id: 'p_b12', name: 'Vitamin B12', notes: 'Serum B12 alone misses functional deficiency' },
      { id: 'p_mma', name: 'Methylmalonic Acid (MMA)', notes: 'Functional B12 deficiency even when serum B12 is "normal"' },
      { id: 'p_folate', name: 'RBC Folate', notes: 'RBC folate is superior to serum folate' },
      { id: 'p_mgrbc', name: 'RBC Magnesium', notes: 'Functional optimal: 5.5–6.8 mg/dL — serum Mg is useless' },
      { id: 'p_zinc', name: 'Plasma Zinc', notes: 'Involved in 300+ enzymatic reactions' },
      { id: 'p_ferritin', name: 'Ferritin', notes: 'Functional optimal: 50–150 ng/mL (both low AND high are problems)' },
      { id: 'p_iron', name: 'Iron + TIBC + Transferrin Saturation' },
      { id: 'p_coq10', name: 'CoQ10 (plasma)', notes: 'Mitochondrial fuel; depleted by statins' },
      { id: 'p_b6', name: 'Vitamin B6 (P5P — active form)', notes: 'Active cofactor for neurotransmitter synthesis' },
    ],
  },
  {
    id: 'prev_inflam',
    label: 'Inflammation & Liver Precision',
    color: '#FF8C00',
    description: 'Silent chronic inflammation = accelerated aging, cancer, and metabolic disease',
    tests: [
      { id: 'p_il6', name: 'IL-6 (Interleukin-6)', notes: 'Cytokine storm marker + metabolic inflammation' },
      { id: 'p_fibrin', name: 'Fibrinogen', notes: 'Clotting + inflammatory marker' },
      { id: 'p_ggt', name: 'GGT', notes: 'Functional optimal: <20 men / <15 women (conv. <56 = dangerously lax)' },
      { id: 'p_alt', name: 'ALT', notes: 'Functional optimal: <20 (conventional <56 misses early NAFLD)' },
      { id: 'p_cmp', name: 'Complete Metabolic Panel (CMP)', fasting: true },
      { id: 'p_cbc', name: 'Complete Blood Count (CBC) + Differential' },
      { id: 'p_8ohdg', name: '8-OHdG (Oxidative DNA Damage)' },
    ],
  },
  {
    id: 'prev_cancer',
    label: 'Cancer Early Surveillance',
    color: '#E06090',
    description: 'Metabolic and protein markers detectable years before clinical diagnosis',
    tests: [
      { id: 'p_psa', name: 'PSA (men)', notes: 'Annual after age 40; velocity matters more than single value' },
      { id: 'p_ca125', name: 'CA-125 (women)', notes: 'Ovarian cancer surveillance' },
      { id: 'p_cea', name: 'CEA', notes: 'Colorectal, lung, breast surveillance' },
      { id: 'p_afp', name: 'AFP (Alpha-Fetoprotein)', notes: 'Liver cancer + germ cell tumors' },
      { id: 'p_ca199', name: 'CA 19-9', notes: 'Pancreatic + GI cancer marker' },
      { id: 'p_ldh', name: 'LDH (Lactate Dehydrogenase)', notes: 'Warburg effect — cancer uses anaerobic glycolysis' },
    ],
  },
  {
    id: 'prev_bioage',
    label: 'Biological Age Assessment',
    color: '#9A7CE8',
    description: 'How fast are you actually aging? These tests reveal your true biological clock',
    tests: [
      { id: 'p_telomere', name: 'Telomere Length (SpectraCell or Life Length)', notes: 'DNA aging clock' },
      { id: 'p_truage', name: 'TruAge / GrimAge (Epigenetic Clock)', notes: 'Most accurate biological age test available' },
      { id: 'p_glycanage', name: 'GlycanAge (Inflammatory Biological Age)', notes: 'IgG glycan profiling — reflects actual tissue aging' },
      { id: 'p_phenoage', name: 'PhenoAge (Blood Biomarker Algorithm)', notes: 'Calculated from 9 routine blood markers' },
    ],
  },
  {
    id: 'prev_genetics',
    label: 'Genetic Foundations',
    color: '#3DC898',
    description: 'One-time tests that inform lifetime clinical decisions',
    tests: [
      { id: 'p_mthfr', name: 'MTHFR (C677T + A1298C)', notes: 'Methylation capacity — critical for protocols' },
      { id: 'p_apoe', name: 'ApoE Genotype', notes: 'Alzheimer\'s risk (APOE4) + cardiovascular + response to diet' },
      { id: 'p_comt', name: 'COMT Polymorphism', notes: 'Dopamine + estrogen metabolism speed' },
      { id: 'p_vdr', name: 'VDR (Vitamin D Receptor)', notes: 'Determines Vitamin D dosing needs' },
    ],
  },
]

// ─── PHASE 2: DEEP DIAGNOSTIC — FULL CATALOG ──────────────────────────────────
const DEEP_CATALOG: LabCategory[] = [
  {
    id: 'metabolic',
    label: 'Metabolic & Insulin Resistance',
    color: '#E4B85A',
    tests: [
      { id: 'glucose', name: 'Fasting Glucose', fasting: true },
      { id: 'insulin', name: 'Fasting Insulin', fasting: true, notes: 'Functional: 2–6 µIU/mL' },
      { id: 'hba1c', name: 'HbA1c' },
      { id: 'homa_ir', name: 'HOMA-IR (calculated)', fasting: true },
      { id: 'cpeptide', name: 'Fasting C-Peptide', fasting: true },
      { id: 'fructosamine', name: 'Fructosamine' },
      { id: 'uric_acid', name: 'Uric Acid', notes: 'Functional: <5.5 men / <4.5 women' },
      { id: 'adiponectin', name: 'Adiponectin', fasting: true },
      { id: 'leptin', name: 'Leptin (fasting)', fasting: true },
      { id: 'glucose_1hr', name: '1-Hour Glucose Challenge (50g)', notes: 'Most predictive metabolic test' },
    ],
  },
  {
    id: 'cardio',
    label: 'Cardiovascular Precision',
    color: '#E06090',
    tests: [
      { id: 'lipid', name: 'Full Lipid Panel', fasting: true },
      { id: 'apob', name: 'ApoB', notes: 'Functional: <80 mg/dL' },
      { id: 'lpa', name: 'Lp(a)', notes: 'Genetic — test once' },
      { id: 'nmr', name: 'LDL Particle Size / NMR LipoProfile' },
      { id: 'hscr', name: 'hs-CRP', notes: 'Functional: <0.5 mg/L' },
      { id: 'homocys', name: 'Homocysteine', notes: 'Functional: <7 µmol/L' },
      { id: 'omega3', name: 'Omega-3 Index', notes: 'Functional: >8%' },
      { id: 'oxldl', name: 'Oxidized LDL (oxLDL)' },
      { id: 'tmao', name: 'TMAO (Trimethylamine N-oxide)', notes: 'Gut-derived CVD risk' },
      { id: 'fibrin', name: 'Fibrinogen' },
      { id: 'galectin', name: 'Galectin-3', notes: 'Cardiac fibrosis marker' },
      { id: 'ntprobnp', name: 'NT-proBNP', notes: 'Subclinical heart stress' },
      { id: 'lipoprotein_a', name: 'Lipoprotein(a) Advanced' },
    ],
  },
  {
    id: 'thyroid',
    label: 'Thyroid — Complete',
    color: '#3DC898',
    tests: [
      { id: 'tsh', name: 'TSH', notes: 'Functional: 0.5–2.0' },
      { id: 'ft3', name: 'Free T3', notes: 'Functional: 3.2–4.4 pg/mL' },
      { id: 'ft4', name: 'Free T4' },
      { id: 'rt3', name: 'Reverse T3 (rT3)' },
      { id: 'tpo', name: 'TPO Antibodies' },
      { id: 'tgab', name: 'Thyroglobulin Antibodies' },
      { id: 'thyroglobulin', name: 'Thyroglobulin (Tg)' },
    ],
  },
  {
    id: 'hormones',
    label: 'Sex Hormones',
    color: '#9A7CE8',
    tests: [
      { id: 'total_test', name: 'Total Testosterone', fasting: true },
      { id: 'free_test', name: 'Free Testosterone', fasting: true },
      { id: 'shbg', name: 'SHBG' },
      { id: 'e2', name: 'Estradiol (E2)' },
      { id: 'e1', name: 'Estrone (E1)' },
      { id: 'e3', name: 'Estriol (E3)' },
      { id: 'prog', name: 'Progesterone' },
      { id: 'dht', name: 'DHT (Dihydrotestosterone)' },
      { id: 'lh', name: 'LH', fasting: true },
      { id: 'fsh', name: 'FSH', fasting: true },
      { id: 'prolactin', name: 'Prolactin', fasting: true },
      { id: 'dutch', name: 'DUTCH Complete (urine — full steroid metabolites)', notes: 'Complete hormone metabolite picture' },
    ],
  },
  {
    id: 'adrenal',
    label: 'Adrenal & HPA Axis',
    color: '#C9963C',
    tests: [
      { id: 'cortam', name: 'Cortisol (AM fasting)', fasting: true },
      { id: 'cortpm', name: 'Cortisol (PM)' },
      { id: 'dheas', name: 'DHEA-S' },
      { id: 'cortisol4pt', name: 'Saliva Cortisol 4-Point (AM/noon/PM/night)', notes: 'Diurnal rhythm assessment' },
      { id: 'aldo', name: 'Aldosterone' },
      { id: 'renin', name: 'Renin Activity (PRA)', notes: 'Aldo/renin ratio for primary hyperaldosteronism' },
      { id: 'metaneph', name: 'Plasma Metanephrines', notes: 'Screen for pheochromocytoma' },
      { id: 'acth', name: 'ACTH (Adrenocorticotropic Hormone)', fasting: true },
    ],
  },
  {
    id: 'methyl',
    label: 'Methylation & B-Vitamins',
    color: '#3DC898',
    tests: [
      { id: 'b12_s', name: 'Vitamin B12 (serum)' },
      { id: 'mma', name: 'Methylmalonic Acid (MMA)', notes: 'Functional B12 deficiency' },
      { id: 'folate_rbc', name: 'RBC Folate' },
      { id: 'homocys_m', name: 'Homocysteine', notes: 'Functional: <7 µmol/L' },
      { id: 'mthfr', name: 'MTHFR Genotype (C677T + A1298C)' },
      { id: 'sam_sad', name: 'SAMe / SAH ratio (methylation capacity)' },
      { id: 'b6_p5p', name: 'Vitamin B6 (P5P)' },
      { id: 'choline', name: 'Plasma Choline' },
      { id: 'betaine', name: 'Plasma Betaine' },
    ],
  },
  {
    id: 'inflam',
    label: 'Inflammation & Immune',
    color: '#FF8C00',
    tests: [
      { id: 'hscr_d', name: 'hs-CRP', notes: 'Functional: <0.5 mg/L' },
      { id: 'il6', name: 'IL-6 (Interleukin-6)' },
      { id: 'il1b', name: 'IL-1β' },
      { id: 'tnfa', name: 'TNF-α' },
      { id: 'esr', name: 'ESR (Erythrocyte Sedimentation Rate)' },
      { id: 'fibrin_d', name: 'Fibrinogen' },
      { id: 'lpla2', name: 'Lp-PLA2 (vascular inflammation)' },
      { id: 'ana', name: 'ANA Screen' },
    ],
  },
  {
    id: 'nutrients',
    label: 'Vitamins, Minerals & Nutrients',
    color: '#C9963C',
    tests: [
      { id: 'vitd', name: 'Vitamin D (25-OH)', notes: 'Functional: 50–80 ng/mL' },
      { id: 'vita', name: 'Vitamin A (Retinol)' },
      { id: 'vite', name: 'Vitamin E (alpha-tocopherol)' },
      { id: 'vitk2', name: 'Vitamin K2 (MK-7)' },
      { id: 'mg_rbc', name: 'RBC Magnesium', notes: 'Functional: 5.5–6.8 mg/dL' },
      { id: 'zinc_p', name: 'Plasma Zinc' },
      { id: 'copper', name: 'Serum Copper' },
      { id: 'zn_cu', name: 'Zinc:Copper Ratio' },
      { id: 'selenium', name: 'Plasma Selenium' },
      { id: 'iodine', name: 'Spot Urine Iodine' },
      { id: 'ferritin_d', name: 'Ferritin', notes: 'Functional: 50–150 ng/mL' },
      { id: 'iron_full', name: 'Iron Panel (Fe, TIBC, Sat%)' },
      { id: 'coq10', name: 'CoQ10 (plasma)' },
      { id: 'carnitine', name: 'L-Carnitine (plasma)' },
      { id: 'spectra', name: 'SpectraCell Micronutrient Panel (comprehensive)', notes: 'Functional intracellular deficiencies' },
    ],
  },
  {
    id: 'oxidative',
    label: 'Oxidative Stress',
    color: '#FF8C00',
    tests: [
      { id: '8ohdg', name: '8-OHdG (oxidative DNA damage)' },
      { id: 'isopros', name: 'F2-Isoprostanes (lipid peroxidation)' },
      { id: 'gssg', name: 'Glutathione (reduced GSH + oxidized GSSG)' },
      { id: 'cat', name: 'Catalase Activity' },
      { id: 'sod', name: 'Superoxide Dismutase (SOD)' },
    ],
  },
  {
    id: 'gut',
    label: 'Gut Health & Microbiome',
    color: '#3DC898',
    tests: [
      { id: 'zonulin', name: 'Zonulin (intestinal permeability / leaky gut)' },
      { id: 'lbp', name: 'LBP (LPS-Binding Protein — endotoxin load)' },
      { id: 'calprotectin', name: 'Fecal Calprotectin (intestinal inflammation)' },
      { id: 'gi360', name: 'GI-MAP / GI Effects (comprehensive stool analysis)', notes: 'Pathogens, dysbiosis, SCFA, inflammation markers' },
      { id: 'siga', name: 'Secretory IgA (sIgA — mucosal immunity)' },
      { id: 'h2breath', name: 'SIBO Breath Test (H2 + CH4)' },
      { id: 'candida_ab', name: 'Candida Antibodies (IgG, IgA, IgM)' },
      { id: 'celiac', name: 'Celiac Panel (tTG-IgA + total IgA)' },
      { id: 'gluten_ab', name: 'Anti-Gliadin Antibodies (IgG + IgA)' },
      { id: 'betag', name: 'Beta-Glucuronidase (estrogen recirculation)' },
    ],
  },
  {
    id: 'mito',
    label: 'Mitochondrial & Energy',
    color: '#9A7CE8',
    tests: [
      { id: 'oat', name: 'OAT — Organic Acids Test (Great Plains / Genova)', notes: 'Krebs cycle, neurotransmitters, yeast, bacteria' },
      { id: 'lactate', name: 'Lactate / Pyruvate Ratio', fasting: true },
      { id: 'coq10_m', name: 'CoQ10 (plasma)' },
      { id: 'carnitine_m', name: 'Carnitine (free + total)' },
      { id: 'atp', name: 'ATP Production (cell energy screen)' },
    ],
  },
  {
    id: 'longevity',
    label: 'Longevity & Biological Age',
    color: '#9A7CE8',
    tests: [
      { id: 'telomere_l', name: 'Telomere Length (SpectraCell or Life Length)' },
      { id: 'truage', name: 'TruAge / GrimAge (DNA methylation clock)' },
      { id: 'glycanage', name: 'GlycanAge (IgG glycan biological age)' },
      { id: 'phenoage', name: 'PhenoAge (routine blood algorithm)' },
      { id: 'igf1_l', name: 'IGF-1', notes: 'GH axis + longevity signaling' },
      { id: 'klotho', name: 'Klotho (anti-aging protein)', notes: 'Emerging longevity biomarker' },
      { id: 'nad', name: 'NAD+ (intracellular)', notes: 'Declines 50% per decade after 40' },
      { id: 'vegf', name: 'VEGF (vascular function)' },
    ],
  },
  {
    id: 'cancer',
    label: 'Cancer Surveillance',
    color: '#E06090',
    tests: [
      { id: 'psa_c', name: 'PSA + Free PSA Ratio (men)' },
      { id: 'ca125_c', name: 'CA-125 (women)' },
      { id: 'cea_c', name: 'CEA' },
      { id: 'afp_c', name: 'AFP' },
      { id: 'ca199_c', name: 'CA 19-9 (pancreatic)' },
      { id: 'ldh_c', name: 'LDH (Warburg effect marker)' },
      { id: 'galleri', name: 'Galleri Multi-Cancer Early Detection (blood)', notes: 'Screens for 50+ cancer types from cfDNA' },
      { id: 'cea_ca', name: 'Circulating Tumor DNA (ctDNA)', notes: 'Liquid biopsy' },
    ],
  },
  {
    id: 'enviro',
    label: 'Environmental & Detox',
    color: '#C9963C',
    tests: [
      { id: 'heavymetal', name: 'Heavy Metals Panel (urine provoked or blood)', notes: 'Mercury, lead, arsenic, cadmium, aluminum' },
      { id: 'mycotox', name: 'Mycotoxins (urine)', notes: 'Mold/biotoxin exposure — Great Plains RealTime Labs' },
      { id: 'glyphosate', name: 'Glyphosate (urine)' },
      { id: 'bpa', name: 'BPA / Phthalates (urine)' },
      { id: 'pcbs', name: 'Pesticide / POPs Panel' },
      { id: 'ggt_e', name: 'GGT', notes: 'Functional: <20 men / <15 women' },
    ],
  },
  {
    id: 'mcas',
    label: 'MCAS / CIRS / Biotoxin',
    color: '#FF8C00',
    tests: [
      { id: 'tryptase', name: 'Serum Tryptase (MCAS)', notes: 'Draw within 15 min of reaction for acute; resting for baseline' },
      { id: 'histamine', name: 'Plasma Histamine + DAO Activity' },
      { id: 'methylhist', name: 'Methylhistamine (24hr urine)', notes: 'Gold standard MCAS marker' },
      { id: 'chromogranin', name: 'Chromogranin A (CgA)' },
      { id: 'prostaglandins', name: 'Prostaglandin D2 (urine)' },
      { id: 'tgfb1', name: 'TGF-β1 (Shoemaker CIRS)', notes: 'Functional: <2380 pg/mL' },
      { id: 'c4a', name: 'C4a (complement activation — CIRS)', notes: 'Functional: <2830 ng/mL' },
      { id: 'msh', name: 'MSH (α-Melanocyte Stimulating Hormone)', notes: 'Functional: 35–81 pg/mL' },
      { id: 'vip', name: 'VIP (Vasoactive Intestinal Peptide)', notes: 'Functional: 23–63 pg/mL' },
      { id: 'mmp9', name: 'MMP-9 (Matrix Metalloproteinase-9)', notes: 'Functional: <332 ng/mL' },
      { id: 'hladq', name: 'HLA-DR/DQ (mold susceptibility genotype)', notes: 'CIRS — identifies "dreamer genotype"' },
      { id: 'vegf_c', name: 'VEGF (vascular endothelial growth factor)' },
    ],
  },
  {
    id: 'neuro',
    label: 'Neurological & Neurotransmitters',
    color: '#9A7CE8',
    tests: [
      { id: 'apoe_n', name: 'ApoE Genotype (Alzheimer\'s risk)', notes: 'APOE4 = 3-12x higher risk' },
      { id: 'oat_nt', name: 'OAT Neurotransmitter Panel (HVA, 5-HIAA, kynurenate, quinolinate)' },
      { id: 'bdnf', name: 'BDNF (Brain-Derived Neurotrophic Factor)', notes: 'Declines in depression, cognitive decline' },
      { id: 'ptau', name: 'Plasma p-tau 181 (pre-Alzheimer\'s)', notes: 'Detectable 10–20 years before symptoms' },
      { id: 'gfap', name: 'GFAP (glial injury marker)' },
      { id: 'nfl', name: 'Neurofilament Light (NfL)', notes: 'Neurodegeneration rate marker' },
    ],
  },
  {
    id: 'autoimmune',
    label: 'Autoimmune Panel',
    color: '#E06090',
    tests: [
      { id: 'ana_a', name: 'ANA + Titer + Pattern' },
      { id: 'anti_ds', name: 'Anti-dsDNA (lupus)' },
      { id: 'anca', name: 'ANCA (vasculitis)' },
      { id: 'rhf', name: 'Rheumatoid Factor (RF)' },
      { id: 'anticci', name: 'Anti-CCP Antibodies (RA-specific)' },
      { id: 'complement', name: 'Complement C3, C4' },
    ],
  },
]

const PREVENTION_PANELS = [
  { id: 'pp_core', label: 'Prevention Core (50 tests)', color: '#3DC898', ids: PREVENTION_CATALOG.flatMap(c => c.tests.map(t => t.id)) },
  { id: 'pp_cardio_meta', label: 'Metabolic + Cardio (16 tests)', color: '#E06090', ids: ['p_glucose','p_insulin','p_hba1c','p_homa','p_uric','p_1hr','p_apob','p_lpa','p_nmr','p_hscr','p_homocys','p_omega3','p_lipid','p_oxldl','p_ggt','p_alt'] },
  { id: 'pp_hormones', label: 'Hormone Architecture (11 tests)', color: '#9A7CE8', ids: ['p_tsh','p_ft3','p_ft4','p_rt3','p_tpo','p_tgab','p_ttest','p_ftest','p_shbg','p_e2','p_dheas','p_cortam','p_igf1'] },
  { id: 'pp_longevity', label: 'Longevity Age Battery (7 tests)', color: '#C9963C', ids: ['p_telomere','p_truage','p_glycanage','p_phenoage','p_8ohdg','p_nad','p_klotho'] },
]

const DEEP_PANELS = [
  { id: 'dp_longevity', label: 'Core Longevity', color: '#3DC898', ids: ['glucose','insulin','hba1c','homa_ir','vitd','b12_s','mma','folate_rbc','mg_rbc','hscr_d','homocys','omega3','apob','tsh','ft3','ft4','total_test','free_test','shbg','e2','dheas','cortam','igf1_l','telomere_l','truage','ferritin_d'] },
  { id: 'dp_cardio', label: 'Cardiovascular Precision', color: '#E06090', ids: ['lipid','apob','lpa','nmr','hscr_d','homocys','omega3','oxldl','tmao','fibrin','lpla2','galectin'] },
  { id: 'dp_gut', label: 'Gut & Detox', color: '#C9963C', ids: ['zonulin','lbp','calprotectin','gi360','siga','h2breath','betag','ggt_e','8ohdg','gssg'] },
  { id: 'dp_mcas', label: 'MCAS / CIRS Screen', color: '#FF8C00', ids: ['tryptase','histamine','methylhist','chromogranin','tgfb1','c4a','msh','vip','mmp9','hladq'] },
  { id: 'dp_neuro', label: 'Neuro & Cognitive', color: '#9A7CE8', ids: ['apoe_n','oat_nt','bdnf','ptau','gfap','nfl','homocys_m','mg_rbc','vitd'] },
]

function allTestsById(): Map<string, LabTest & { categoryLabel: string; categoryColor: string }> {
  const map = new Map()
  for (const cat of [...PREVENTION_CATALOG, ...DEEP_CATALOG]) {
    for (const t of cat.tests) {
      map.set(t.id, { ...t, categoryLabel: cat.label, categoryColor: cat.color })
    }
  }
  return map
}

export default function LabOrderPage() {
  const params = useParams()
  const patientId = params.id as string
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  const [patient, setPatient] = useState<Patient | null>(null)
  const [phase, setPhase] = useState<'prevention' | 'diagnostic'>('prevention')
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['prev_metabolic', 'prev_cardio']))
  const [notes, setNotes] = useState('')
  const [sendingEmail, setSendingEmail] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [emailError, setEmailError] = useState('')

  useEffect(() => {
    supabase.from('orion_patients').select('id, full_name, date_of_birth, gender, email, phone').eq('id', patientId).single()
      .then(({ data }) => { if (data) setPatient(data) })
  }, [patientId])

  const catalog = phase === 'prevention' ? PREVENTION_CATALOG : DEEP_CATALOG
  const panels = phase === 'prevention' ? PREVENTION_PANELS : DEEP_PANELS
  const allTests = allTestsById()

  const filtered = search.trim().length > 1
    ? catalog.map(cat => ({ ...cat, tests: cat.tests.filter(t => t.name.toLowerCase().includes(search.toLowerCase())) })).filter(c => c.tests.length > 0)
    : catalog

  function toggle(id: string) {
    setSelected(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s })
  }
  function toggleCategory(cat: LabCategory) {
    const ids = cat.tests.map(t => t.id)
    const allOn = ids.every(id => selected.has(id))
    setSelected(prev => { const s = new Set(prev); ids.forEach(id => allOn ? s.delete(id) : s.add(id)); return s })
  }
  function applyPanel(ids: string[]) {
    setSelected(prev => { const s = new Set(prev); ids.forEach(id => s.add(id)); return s })
  }
  function toggleExpanded(id: string) {
    setExpanded(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s })
  }

  const selectedTests = [...selected].map(id => allTests.get(id)).filter(Boolean) as (LabTest & { categoryLabel: string; categoryColor: string })[]
  const hasFasting = selectedTests.some(t => t.fasting)

  function handlePrint() {
    const byCategory: Record<string, typeof selectedTests> = {}
    for (const t of selectedTests) {
      if (!byCategory[t.categoryLabel]) byCategory[t.categoryLabel] = []
      byCategory[t.categoryLabel].push(t)
    }

    const phaseLabel = phase === 'prevention' ? 'PREVENTION PROFILE' : 'DEEP DIAGNOSTIC PANEL'
    const patientDob = patient?.date_of_birth ? new Date(patient.date_of_birth + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''

    const w = window.open('', '_blank', 'width=800,height=900')
    if (!w) return

    w.document.write(`<!DOCTYPE html><html><head>
<meta charset="utf-8">
<title>Lab Order — ${patient?.full_name || 'Patient'}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: Georgia, 'Times New Roman', serif; background: #fff; color: #1a1a1a; padding: 40px; font-size: 12px; }
  .header { border-bottom: 2px solid #1a1a1a; padding-bottom: 20px; margin-bottom: 24px; }
  .practice-name { font-size: 20px; font-weight: 300; letter-spacing: 0.15em; color: #1a1a1a; }
  .practice-sub { font-size: 10px; letter-spacing: 0.12em; color: #666; margin-top: 4px; }
  .phase-badge { display: inline-block; border: 1px solid #1a1a1a; padding: 3px 10px; font-size: 9px; letter-spacing: 0.2em; margin-top: 8px; }
  .patient-box { background: #f8f8f8; border: 1px solid #ddd; padding: 14px 18px; margin-bottom: 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
  .patient-row label { font-size: 9px; letter-spacing: 0.1em; color: #888; display: block; }
  .patient-row span { font-size: 12px; }
  .fasting-warn { background: #fff8e6; border: 1px solid #cc9900; padding: 10px 14px; margin-bottom: 20px; font-size: 11px; color: #7a5f00; }
  .category-header { font-size: 9px; letter-spacing: 0.2em; color: #666; border-bottom: 1px solid #ddd; padding-bottom: 4px; margin: 18px 0 8px; }
  .test-row { display: flex; align-items: center; gap: 10px; padding: 4px 0; border-bottom: 1px dotted #eee; }
  .checkbox { width: 12px; height: 12px; border: 1px solid #999; flex-shrink: 0; }
  .test-name { flex: 1; font-size: 11px; }
  .test-note { font-size: 9px; color: #888; }
  .fasting-tag { font-size: 9px; color: #9a6600; font-style: italic; }
  .footer { margin-top: 40px; border-top: 1px solid #ddd; padding-top: 16px; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
  .sig-line { border-bottom: 1px solid #1a1a1a; margin-top: 40px; margin-bottom: 4px; }
  .sig-label { font-size: 9px; color: #888; letter-spacing: 0.08em; }
  .notes-box { border: 1px solid #ddd; padding: 10px 14px; margin-top: 20px; min-height: 60px; font-size: 11px; color: #444; }
  @media print { body { padding: 20px; } }
</style>
</head><body>
<div class="header">
  <div class="practice-name">☿ THE ALCHEMIST MIAMI</div>
  <div class="practice-sub">DR. MICHAEL J. MEIGHEN MD · FUNCTIONAL MEDICINE & LONGEVITY · MIAMI, FLORIDA</div>
  <div class="phase-badge">${phaseLabel} · ${selectedTests.length} TESTS ORDERED</div>
</div>

<div class="patient-box">
  <div class="patient-row"><label>PATIENT</label><span>${patient?.full_name || ''}</span></div>
  ${patientDob ? `<div class="patient-row"><label>DATE OF BIRTH</label><span>${patientDob}</span></div>` : ''}
  <div class="patient-row"><label>ORDER DATE</label><span>${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span></div>
  <div class="patient-row"><label>ORDERED BY</label><span>Dr. Michael J. Meighen MD</span></div>
</div>

${hasFasting ? `<div class="fasting-warn">
  ⚠ FASTING REQUIRED — Please fast 10–12 hours before your blood draw. Water is permitted. Schedule your appointment first thing in the morning when possible.
</div>` : ''}

${Object.entries(byCategory).map(([cat, tests]) => `
<div class="category-header">${cat.toUpperCase()}</div>
${tests.map(t => `<div class="test-row">
  <div class="checkbox"></div>
  <div class="test-name">${t.name}${t.fasting ? ' <span class="fasting-tag">(fasting)</span>' : ''}</div>
  ${t.notes ? `<div class="test-note">${t.notes}</div>` : ''}
</div>`).join('')}
`).join('')}

${notes ? `<div><div class="category-header">CLINICAL NOTES</div><div class="notes-box">${notes}</div></div>` : ''}

<div class="footer">
  <div><div class="sig-line"></div><div class="sig-label">PHYSICIAN SIGNATURE</div></div>
  <div><div class="sig-line"></div><div class="sig-label">DATE</div></div>
</div>
<p style="margin-top:20px;font-size:9px;color:#aaa;text-align:center;">This lab order is valid for 90 days · Present at any LabCorp, Quest Diagnostics, or hospital draw station</p>
</body></html>`)

    w.document.close()
    setTimeout(() => { w.print() }, 600)
  }

  async function handleEmail() {
    if (!patient?.email) { setEmailError('Patient has no email address on file'); return }
    setSendingEmail(true)
    setEmailError('')
    try {
      const res = await fetch('/api/orion/labs/order-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patient,
          selected_tests: selectedTests,
          fasting: hasFasting,
          notes,
          order_date: new Date().toISOString(),
          phase_label: phase === 'prevention' ? 'Prevention Profile' : 'Deep Diagnostic Panel',
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed')
      setEmailSent(true)
      setTimeout(() => setEmailSent(false), 4000)
    } catch (e: unknown) {
      setEmailError(e instanceof Error ? e.message : 'Failed to send')
    } finally {
      setSendingEmail(false)
    }
  }

  const s: Record<string, React.CSSProperties> = {
    page: { display: 'flex', gap: '1.5rem', padding: '1.5rem', minHeight: '100vh', background: '#000', color: '#F0E8D8', fontFamily: 'system-ui, sans-serif', maxWidth: 1400, margin: '0 auto' },
    left: { flex: 1, minWidth: 0 },
    right: { width: 320, flexShrink: 0, position: 'sticky', top: '1.5rem', alignSelf: 'flex-start', display: 'flex', flexDirection: 'column', gap: '0.75rem' },
    input: { width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(240,232,216,0.15)', borderRadius: 4, padding: '0.5rem 0.75rem', color: '#F0E8D8', fontSize: '0.8rem', outline: 'none' },
    catHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 0.75rem', cursor: 'pointer', borderRadius: 4 },
  }

  return (
    <div style={s.page}>
      {/* LEFT PANEL */}
      <div style={s.left}>
        {/* Nav */}
        <div style={{ marginBottom: '1.5rem' }}>
          <a href={`/orion/patients/${patientId}`} style={{ fontSize: '0.72rem', color: 'rgba(240,232,216,0.35)', textDecoration: 'none', letterSpacing: '0.1em' }}>
            ← {patient?.full_name || 'Patient'}
          </a>
          <h1 style={{ fontSize: '1.2rem', fontWeight: 300, color: '#3DC898', letterSpacing: '0.15em', marginTop: '0.5rem' }}>LAB ORDERING SYSTEM</h1>
          <p style={{ fontSize: '0.72rem', color: 'rgba(240,232,216,0.3)', marginTop: '0.2rem' }}>Select tests → print or email order to patient</p>
        </div>

        {/* Phase Toggle */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {[
            { key: 'prevention', label: 'PHASE 1 — PREVENTION PROFILE', sub: 'Detect disease 5–10 years before symptoms. Baseline for every patient.', color: '#3DC898', icon: '◎' },
            { key: 'diagnostic', label: 'PHASE 2 — DEEP DIAGNOSTIC', sub: 'Targeted investigation. Root cause analysis. Protocol generation.', color: '#E4B85A', icon: '⊕' },
          ].map(p => (
            <button
              key={p.key}
              onClick={() => { setPhase(p.key as 'prevention' | 'diagnostic'); setExpanded(new Set()) }}
              style={{
                background: phase === p.key ? `${p.color}15` : 'rgba(255,255,255,0.02)',
                border: `2px solid ${phase === p.key ? p.color : 'rgba(240,232,216,0.1)'}`,
                borderRadius: 8,
                padding: '1rem',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ fontSize: '1rem', marginBottom: '0.4rem', color: p.color }}>{p.icon}</div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', color: phase === p.key ? p.color : '#F0E8D8', marginBottom: '0.35rem' }}>{p.label}</div>
              <div style={{ fontSize: '0.65rem', color: 'rgba(240,232,216,0.4)', lineHeight: 1.5 }}>{p.sub}</div>
            </button>
          ))}
        </div>

        {/* Phase description */}
        <div style={{
          padding: '0.875rem 1rem',
          marginBottom: '1.25rem',
          background: phase === 'prevention' ? 'rgba(61,200,152,0.05)' : 'rgba(228,184,90,0.05)',
          border: `1px solid ${phase === 'prevention' ? 'rgba(61,200,152,0.2)' : 'rgba(228,184,90,0.2)'}`,
          borderRadius: 6,
          fontSize: '0.72rem',
          color: 'rgba(240,232,216,0.55)',
          lineHeight: 1.6,
        }}>
          {phase === 'prevention'
            ? '◎ Prevention Profile establishes a complete functional baseline — insulin metabolism, cardiovascular precision risk, full thyroid picture, hormonal architecture, nutritional deficiencies, cancer markers, and biological age. Run this on every new patient and repeat annually. ORION will generate a comprehensive prevention protocol from the results.'
            : '⊕ Deep Diagnostic goes beyond the baseline into root cause territory — gut health, MCAS/CIRS biotoxin illness, mitochondrial function, neurotransmitter metabolism, methylation depth, environmental toxicology, and precision autoimmune. Use when Phase 1 reveals patterns that need deeper investigation, or when the patient presents with complex, treatment-resistant symptoms.'}
        </div>

        {/* Quick Panels */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: 'rgba(240,232,216,0.25)', marginBottom: '0.5rem' }}>QUICK PANELS</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {panels.map(panel => (
              <button
                key={panel.id}
                onClick={() => applyPanel(panel.ids)}
                style={{
                  background: `${panel.color}10`,
                  border: `1px solid ${panel.color}40`,
                  borderRadius: 4,
                  padding: '0.3rem 0.65rem',
                  color: panel.color,
                  fontSize: '0.68rem',
                  cursor: 'pointer',
                  letterSpacing: '0.05em',
                }}
              >
                {panel.label}
              </button>
            ))}
            <button
              onClick={() => setSelected(new Set())}
              style={{ background: 'transparent', border: '1px solid rgba(240,232,216,0.1)', borderRadius: 4, padding: '0.3rem 0.65rem', color: 'rgba(240,232,216,0.3)', fontSize: '0.68rem', cursor: 'pointer' }}
            >
              Clear all
            </button>
          </div>
        </div>

        {/* Search */}
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search tests..."
          style={{ ...s.input, marginBottom: '1rem' }}
        />

        {/* Catalog */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {filtered.map(cat => {
            const isExpanded = expanded.has(cat.id)
            const selectedInCat = cat.tests.filter(t => selected.has(t.id)).length
            return (
              <div key={cat.id} style={{ border: `1px solid ${selectedInCat > 0 ? cat.color + '35' : 'rgba(240,232,216,0.06)'}`, borderRadius: 6, overflow: 'hidden' }}>
                <div style={s.catHeader} onClick={() => toggleExpanded(cat.id)}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: cat.color, flexShrink: 0, opacity: selectedInCat > 0 ? 1 : 0.3 }} />
                    <div>
                      <div style={{ fontSize: '0.75rem', color: selectedInCat > 0 ? cat.color : '#F0E8D8', fontWeight: selectedInCat > 0 ? 600 : 400 }}>{cat.label}</div>
                      {(cat as LabCategory).description && !isExpanded && (
                        <div style={{ fontSize: '0.62rem', color: 'rgba(240,232,216,0.3)', marginTop: '0.1rem' }}>{(cat as LabCategory).description}</div>
                      )}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {selectedInCat > 0 && <span style={{ fontSize: '0.65rem', color: cat.color, background: `${cat.color}15`, padding: '0.1rem 0.4rem', borderRadius: 2 }}>{selectedInCat}/{cat.tests.length}</span>}
                    <span style={{ fontSize: '0.7rem', color: 'rgba(240,232,216,0.25)' }}>{isExpanded ? '▲' : '▼'}</span>
                  </div>
                </div>

                {isExpanded && (
                  <div style={{ padding: '0 0.75rem 0.75rem' }}>
                    {(cat as LabCategory).description && (
                      <div style={{ fontSize: '0.65rem', color: cat.color, opacity: 0.7, marginBottom: '0.6rem', paddingLeft: '0.25rem', borderLeft: `2px solid ${cat.color}40`, paddingBottom: '0.4rem', lineHeight: 1.5 }}>
                        {(cat as LabCategory).description}
                      </div>
                    )}
                    <button
                      onClick={() => toggleCategory(cat)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: cat.color, fontSize: '0.65rem', letterSpacing: '0.1em', marginBottom: '0.5rem', padding: 0 }}
                    >
                      {cat.tests.every(t => selected.has(t.id)) ? '− Deselect all' : '+ Select all'}
                    </button>
                    {cat.tests.map(test => (
                      <label
                        key={test.id}
                        style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', padding: '0.35rem 0', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.03)' }}
                      >
                        <input
                          type="checkbox"
                          checked={selected.has(test.id)}
                          onChange={() => toggle(test.id)}
                          style={{ marginTop: 2, accentColor: cat.color, width: 13, height: 13, flexShrink: 0 }}
                        />
                        <div>
                          <div style={{ fontSize: '0.75rem', color: selected.has(test.id) ? '#F0E8D8' : 'rgba(240,232,216,0.65)' }}>
                            {test.name}
                            {test.fasting && <span style={{ marginLeft: '0.4rem', fontSize: '0.6rem', color: '#C9963C' }}>fasting</span>}
                          </div>
                          {test.notes && <div style={{ fontSize: '0.62rem', color: 'rgba(240,232,216,0.3)', marginTop: '0.1rem', lineHeight: 1.4 }}>{test.notes}</div>}
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* RIGHT PANEL — ORDER SUMMARY */}
      <div style={s.right}>
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(240,232,216,0.08)', borderRadius: 8, padding: '1rem' }}>
          <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(240,232,216,0.3)', marginBottom: '0.75rem' }}>ORDER SUMMARY</div>

          {/* Phase badge */}
          <div style={{
            fontSize: '0.62rem', letterSpacing: '0.12em', fontWeight: 700,
            color: phase === 'prevention' ? '#3DC898' : '#E4B85A',
            background: phase === 'prevention' ? 'rgba(61,200,152,0.08)' : 'rgba(228,184,90,0.08)',
            border: `1px solid ${phase === 'prevention' ? 'rgba(61,200,152,0.2)' : 'rgba(228,184,90,0.2)'}`,
            borderRadius: 3, padding: '0.25rem 0.5rem', marginBottom: '0.75rem', display: 'inline-block',
          }}>
            {phase === 'prevention' ? '◎ PREVENTION PROFILE' : '⊕ DEEP DIAGNOSTIC'}
          </div>

          {/* Patient */}
          {patient && (
            <div style={{ marginBottom: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#F0E8D8' }}>{patient.full_name}</div>
              {patient.date_of_birth && <div style={{ fontSize: '0.62rem', color: 'rgba(240,232,216,0.35)' }}>{new Date(patient.date_of_birth + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>}
            </div>
          )}

          {/* Count */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.7rem', color: 'rgba(240,232,216,0.4)' }}>Tests selected</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: selected.size > 0 ? '#3DC898' : 'rgba(240,232,216,0.2)' }}>{selected.size}</span>
          </div>

          {hasFasting && (
            <div style={{ padding: '0.5rem', background: 'rgba(201,150,60,0.08)', border: '1px solid rgba(201,150,60,0.2)', borderRadius: 4, fontSize: '0.65rem', color: '#C9963C', marginBottom: '0.5rem' }}>
              ⚠ Fasting required for {selectedTests.filter(t => t.fasting).length} test(s)
            </div>
          )}

          {/* Selected list */}
          {selectedTests.length > 0 && (
            <div style={{ maxHeight: 220, overflowY: 'auto', marginBottom: '0.75rem' }}>
              {selectedTests.map((t, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.25rem 0', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <span style={{ fontSize: '0.68rem', color: 'rgba(240,232,216,0.65)', lineHeight: 1.4 }}>{t.name}</span>
                  <button onClick={() => toggle(t.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(240,232,216,0.2)', fontSize: '0.7rem', padding: '0 0.2rem' }}>✕</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Doctor notes */}
        <div>
          <div style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: 'rgba(240,232,216,0.25)', marginBottom: '0.4rem' }}>CLINICAL NOTES FOR ORDER</div>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={3}
            placeholder="Indication, clinical context, or special instructions for the lab..."
            style={{ ...s.input, resize: 'vertical', lineHeight: 1.6, fontSize: '0.72rem' }}
          />
        </div>

        {/* Action buttons */}
        <button
          onClick={handlePrint}
          disabled={selected.size === 0}
          style={{
            background: selected.size > 0 ? '#3DC898' : 'rgba(61,200,152,0.2)',
            border: 'none', borderRadius: 6, padding: '0.75rem',
            color: selected.size > 0 ? '#000' : 'rgba(0,0,0,0.4)',
            fontSize: '0.75rem', fontWeight: 700, cursor: selected.size > 0 ? 'pointer' : 'not-allowed',
            letterSpacing: '0.12em', width: '100%',
          }}
        >
          🖨 PRINT ORDER ({selected.size} tests)
        </button>

        <button
          onClick={handleEmail}
          disabled={selected.size === 0 || sendingEmail || !patient?.email}
          style={{
            background: 'transparent',
            border: `1px solid ${patient?.email ? 'rgba(61,200,152,0.3)' : 'rgba(240,232,216,0.1)'}`,
            borderRadius: 6, padding: '0.75rem',
            color: patient?.email ? '#3DC898' : 'rgba(240,232,216,0.25)',
            fontSize: '0.72rem', cursor: selected.size > 0 && patient?.email ? 'pointer' : 'not-allowed',
            letterSpacing: '0.1em', width: '100%',
          }}
        >
          {sendingEmail ? '⊕ Sending...' : emailSent ? '✓ Email sent!' : `✉ EMAIL TO PATIENT`}
        </button>

        {!patient?.email && <div style={{ fontSize: '0.62rem', color: 'rgba(240,232,216,0.25)', textAlign: 'center' }}>No email on file for this patient</div>}
        {emailError && <div style={{ fontSize: '0.68rem', color: '#E06090', padding: '0.5rem', background: 'rgba(224,96,144,0.08)', borderRadius: 4 }}>{emailError}</div>}

        <div style={{ fontSize: '0.62rem', color: 'rgba(240,232,216,0.2)', lineHeight: 1.6, textAlign: 'center' }}>
          Order valid 90 days · LabCorp / Quest / hospital draw station
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'

interface RangeLevel {
  label: string
  range: string
  color: string
  bg: string
}

interface Marker {
  name: string
  unit: string
  fasting?: boolean
  gender?: 'M' | 'F' | 'both'
  conventional: string
  levels: RangeLevel[]
  note?: string
}

interface Category {
  id: string
  label: string
  color: string
  icon: string
  markers: Marker[]
}

const G = '#3DC898'   // optimal
const Y = '#E4B85A'   // suboptimal
const O = '#FF8C00'   // concerning
const R = '#E06090'   // critical

function lvl(label: string, range: string, color: string): RangeLevel {
  const bgMap: Record<string, string> = {
    [G]: 'rgba(61,200,152,0.08)',
    [Y]: 'rgba(228,184,90,0.08)',
    [O]: 'rgba(255,140,0,0.08)',
    [R]: 'rgba(224,96,144,0.08)',
  }
  return { label, range, color, bg: bgMap[color] }
}

const CATEGORIES: Category[] = [
  {
    id: 'metabolic', label: 'Metabolic & Insulin', color: '#E4B85A', icon: '◈',
    markers: [
      {
        name: 'Fasting Glucose', unit: 'mg/dL', fasting: true,
        conventional: '70–99',
        levels: [lvl('OPTIMAL', '72 – 85', G), lvl('SUBOPTIMAL', '86 – 99', Y), lvl('CONCERNING', '100 – 125', O), lvl('CRITICAL', '> 125', R)],
        note: '>90 fasting = early insulin resistance signal even if "normal"',
      },
      {
        name: 'Fasting Insulin', unit: 'µIU/mL', fasting: true,
        conventional: '< 25',
        levels: [lvl('OPTIMAL', '2 – 6', G), lvl('SUBOPTIMAL', '6 – 10', Y), lvl('CONCERNING', '10 – 15', O), lvl('CRITICAL', '> 15', R)],
        note: 'Most sensitive early marker — conventional range of <25 misses early IR for 15+ years',
      },
      {
        name: 'HbA1c', unit: '%', fasting: false,
        conventional: '< 5.7%',
        levels: [lvl('OPTIMAL', '< 5.3', G), lvl('SUBOPTIMAL', '5.3 – 5.6', Y), lvl('CONCERNING', '5.7 – 6.4', O), lvl('CRITICAL', '≥ 6.5', R)],
        note: 'Reflects 3-month average glucose — functional target is <5.3',
      },
      {
        name: 'HOMA-IR', unit: '(calculated)', fasting: true,
        conventional: '< 2.0',
        levels: [lvl('OPTIMAL', '< 1.0', G), lvl('SUBOPTIMAL', '1.0 – 1.5', Y), lvl('CONCERNING', '1.5 – 2.9', O), lvl('CRITICAL', '≥ 3.0', R)],
        note: 'Formula: (Glucose × Insulin) / 405. Best single insulin resistance index.',
      },
      {
        name: 'Uric Acid (men)', unit: 'mg/dL', fasting: false,
        conventional: '3.4 – 7.0',
        levels: [lvl('OPTIMAL', '< 5.5', G), lvl('SUBOPTIMAL', '5.5 – 6.0', Y), lvl('CONCERNING', '6.0 – 7.0', O), lvl('CRITICAL', '> 7.0', R)],
        note: 'Elevated = insulin resistance + metabolic inflammation + gout risk',
      },
      {
        name: 'Uric Acid (women)', unit: 'mg/dL', fasting: false,
        conventional: '2.4 – 6.0',
        levels: [lvl('OPTIMAL', '< 4.5', G), lvl('SUBOPTIMAL', '4.5 – 5.0', Y), lvl('CONCERNING', '5.0 – 6.0', O), lvl('CRITICAL', '> 6.0', R)],
        note: 'Post-menopause risk rises significantly — track over time',
      },
      {
        name: 'Triglycerides', unit: 'mg/dL', fasting: true,
        conventional: '< 150',
        levels: [lvl('OPTIMAL', '< 80', G), lvl('SUBOPTIMAL', '80 – 100', Y), lvl('CONCERNING', '100 – 150', O), lvl('CRITICAL', '> 150', R)],
        note: 'Triglycerides >100 = metabolic dysfunction. TG/HDL ratio >2 = insulin resistance.',
      },
      {
        name: 'TG / HDL Ratio', unit: 'ratio', fasting: true,
        conventional: '< 3.0',
        levels: [lvl('OPTIMAL', '< 1.0', G), lvl('SUBOPTIMAL', '1.0 – 2.0', Y), lvl('CONCERNING', '2.0 – 3.5', O), lvl('CRITICAL', '> 3.5', R)],
        note: 'Most powerful surrogate for insulin resistance. >2.0 = metabolic syndrome pattern.',
      },
    ],
  },
  {
    id: 'cardio', label: 'Cardiovascular Precision', color: '#E06090', icon: '♥',
    markers: [
      {
        name: 'hs-CRP', unit: 'mg/L', fasting: false,
        conventional: '< 3.0',
        levels: [lvl('OPTIMAL', '< 0.5', G), lvl('SUBOPTIMAL', '0.5 – 1.0', Y), lvl('CONCERNING', '1.0 – 3.0', O), lvl('CRITICAL', '> 3.0', R)],
        note: 'Conventional <3.0 is dangerously permissive. Each doubling of CRP = 2x MI risk.',
      },
      {
        name: 'Homocysteine', unit: 'µmol/L', fasting: false,
        conventional: '< 15',
        levels: [lvl('OPTIMAL', '< 7', G), lvl('SUBOPTIMAL', '7 – 9', Y), lvl('CONCERNING', '9 – 12', O), lvl('CRITICAL', '> 12', R)],
        note: '>10 = 2x Alzheimer\'s risk. Driven by B12/folate/B6 deficiency + MTHFR variants.',
      },
      {
        name: 'ApoB', unit: 'mg/dL', fasting: false,
        conventional: '< 100',
        levels: [lvl('OPTIMAL', '< 80', G), lvl('SUBOPTIMAL', '80 – 100', Y), lvl('CONCERNING', '100 – 120', O), lvl('CRITICAL', '> 120', R)],
        note: 'Superior to LDL — counts actual atherogenic particles. LDL alone misses ~50% of risk.',
      },
      {
        name: 'Lp(a)', unit: 'nmol/L', fasting: false,
        conventional: '< 75',
        levels: [lvl('OPTIMAL', '< 30', G), lvl('SUBOPTIMAL', '30 – 75', Y), lvl('CONCERNING', '75 – 125', O), lvl('CRITICAL', '> 125', R)],
        note: 'Genetic — 80% determined by DNA. Test once. Elevated = 3-4x higher MI and stroke risk.',
      },
      {
        name: 'Omega-3 Index', unit: '%', fasting: false,
        conventional: '> 4%',
        levels: [lvl('OPTIMAL', '> 8%', G), lvl('SUBOPTIMAL', '6 – 8%', Y), lvl('CONCERNING', '4 – 6%', O), lvl('CRITICAL', '< 4%', R)],
        note: 'Most Americans are at 4–5%. Each 1% increase = 20% reduction in sudden cardiac death.',
      },
      {
        name: 'HDL (men)', unit: 'mg/dL', fasting: true,
        conventional: '> 40',
        levels: [lvl('OPTIMAL', '> 60', G), lvl('SUBOPTIMAL', '50 – 60', Y), lvl('CONCERNING', '40 – 50', O), lvl('CRITICAL', '< 40', R)],
        note: 'HDL is a functional marker — quality matters more than just quantity.',
      },
      {
        name: 'HDL (women)', unit: 'mg/dL', fasting: true,
        conventional: '> 50',
        levels: [lvl('OPTIMAL', '> 70', G), lvl('SUBOPTIMAL', '60 – 70', Y), lvl('CONCERNING', '50 – 60', O), lvl('CRITICAL', '< 50', R)],
        note: 'Women need higher HDL than men for cardioprotection.',
      },
      {
        name: 'GGT (men)', unit: 'U/L', fasting: false,
        conventional: '< 55',
        levels: [lvl('OPTIMAL', '< 20', G), lvl('SUBOPTIMAL', '20 – 30', Y), lvl('CONCERNING', '30 – 55', O), lvl('CRITICAL', '> 55', R)],
        note: 'Liver + oxidative stress + alcohol marker. Conventional <55 is far too permissive.',
      },
      {
        name: 'GGT (women)', unit: 'U/L', fasting: false,
        conventional: '< 38',
        levels: [lvl('OPTIMAL', '< 15', G), lvl('SUBOPTIMAL', '15 – 22', Y), lvl('CONCERNING', '22 – 38', O), lvl('CRITICAL', '> 38', R)],
        note: 'Elevated GGT = depleted glutathione stores and increased cardiovascular mortality.',
      },
      {
        name: 'ALT', unit: 'U/L', fasting: false,
        conventional: '< 56',
        levels: [lvl('OPTIMAL', '< 20', G), lvl('SUBOPTIMAL', '20 – 30', Y), lvl('CONCERNING', '30 – 56', O), lvl('CRITICAL', '> 56', R)],
        note: 'ALT 20-40 looks "normal" conventionally but indicates early NAFLD in the functional lens.',
      },
    ],
  },
  {
    id: 'thyroid', label: 'Thyroid', color: '#3DC898', icon: '◎',
    markers: [
      {
        name: 'TSH', unit: 'mIU/L', fasting: false,
        conventional: '0.4 – 4.0',
        levels: [lvl('OPTIMAL', '0.5 – 2.0', G), lvl('SUBOPTIMAL', '2.0 – 2.5', Y), lvl('CONCERNING', '2.5 – 4.0', O), lvl('CRITICAL', '> 4.0 or < 0.4', R)],
        note: 'TSH 2.5–4.0 with symptoms = functional hypothyroidism. Most patients feel best at 1.0–1.5.',
      },
      {
        name: 'Free T3', unit: 'pg/mL', fasting: false,
        conventional: '2.3 – 4.2',
        levels: [lvl('OPTIMAL', '3.2 – 4.4', G), lvl('SUBOPTIMAL', '2.8 – 3.2', Y), lvl('CONCERNING', '2.3 – 2.8', O), lvl('CRITICAL', '< 2.3', R)],
        note: 'Most active thyroid hormone. Low fT3 with normal TSH = conversion problem (T4→T3 block).',
      },
      {
        name: 'Free T4', unit: 'ng/dL', fasting: false,
        conventional: '0.8 – 1.8',
        levels: [lvl('OPTIMAL', '1.1 – 1.5', G), lvl('SUBOPTIMAL', '0.9 – 1.1', Y), lvl('CONCERNING', '0.7 – 0.9', O), lvl('CRITICAL', '< 0.7', R)],
        note: 'Precursor — normal fT4 with low fT3 = conversion block (stress, inflammation, selenium deficiency).',
      },
      {
        name: 'Reverse T3', unit: 'ng/dL', fasting: false,
        conventional: '9.2 – 24.1',
        levels: [lvl('OPTIMAL', '< 15', G), lvl('SUBOPTIMAL', '15 – 20', Y), lvl('CONCERNING', '20 – 25', O), lvl('CRITICAL', '> 25', R)],
        note: 'Elevated rT3 = T4 is being converted to inactive form. Causes: cortisol, inflammation, toxins.',
      },
      {
        name: 'TPO Antibodies', unit: 'IU/mL', fasting: false,
        conventional: '< 35',
        levels: [lvl('OPTIMAL', '< 15', G), lvl('SUBOPTIMAL', '15 – 35', Y), lvl('CONCERNING', '35 – 150', O), lvl('CRITICAL', '> 150', R)],
        note: 'Hashimoto\'s autoimmunity — detectable 5–10 years before TSH becomes abnormal.',
      },
    ],
  },
  {
    id: 'hormones', label: 'Hormones', color: '#9A7CE8', icon: '◉',
    markers: [
      {
        name: 'Testosterone Total (men)', unit: 'ng/dL', fasting: true,
        conventional: '264 – 916',
        levels: [lvl('OPTIMAL', '600 – 900', G), lvl('SUBOPTIMAL', '400 – 600', Y), lvl('CONCERNING', '300 – 400', O), lvl('CRITICAL', '< 300', R)],
        note: 'Draw at 8–9 AM (daily peak). "Normal at 264" still causes all symptoms of low T.',
      },
      {
        name: 'Testosterone Total (women)', unit: 'ng/dL', fasting: true,
        conventional: '15 – 70',
        levels: [lvl('OPTIMAL', '50 – 100', G), lvl('SUBOPTIMAL', '30 – 50', Y), lvl('CONCERNING', '20 – 30', O), lvl('CRITICAL', '< 20', R)],
        note: 'Low testosterone in women = low libido, fatigue, brain fog, poor muscle tone.',
      },
      {
        name: 'Free Testosterone (men)', unit: 'pg/mL', fasting: true,
        conventional: '9 – 30',
        levels: [lvl('OPTIMAL', '15 – 25', G), lvl('SUBOPTIMAL', '10 – 15', Y), lvl('CONCERNING', '6 – 10', O), lvl('CRITICAL', '< 6', R)],
        note: 'Bioavailable fraction — total T can look fine while free T is critically low (high SHBG).',
      },
      {
        name: 'SHBG (men)', unit: 'nmol/L', fasting: false,
        conventional: '10 – 57',
        levels: [lvl('OPTIMAL', '20 – 40', G), lvl('SUBOPTIMAL', '40 – 55', Y), lvl('CONCERNING', '55 – 70', O), lvl('CRITICAL', '> 70 or < 15', R)],
        note: 'High SHBG = low bioavailable testosterone despite normal total T. Rises with aging.',
      },
      {
        name: 'Estradiol (men)', unit: 'pg/mL', fasting: false,
        conventional: '7.6 – 42.6',
        levels: [lvl('OPTIMAL', '20 – 30', G), lvl('SUBOPTIMAL', '30 – 40', Y), lvl('CONCERNING', '40 – 60', O), lvl('CRITICAL', '> 60 or < 10', R)],
        note: 'Too high = gynecomastia, ED, mood issues. Too low = joint pain, osteoporosis, low libido.',
      },
      {
        name: 'DHEA-S (men)', unit: 'µg/dL', fasting: false,
        conventional: '80 – 560',
        levels: [lvl('OPTIMAL', '300 – 450', G), lvl('SUBOPTIMAL', '200 – 300', Y), lvl('CONCERNING', '100 – 200', O), lvl('CRITICAL', '< 100', R)],
        note: 'Declines ~20% per decade after 30. Master adrenal hormone — reflects biological age.',
      },
      {
        name: 'DHEA-S (women)', unit: 'µg/dL', fasting: false,
        conventional: '35 – 430',
        levels: [lvl('OPTIMAL', '200 – 300', G), lvl('SUBOPTIMAL', '150 – 200', Y), lvl('CONCERNING', '75 – 150', O), lvl('CRITICAL', '< 75', R)],
        note: 'Low DHEA-S in women = adrenal burnout, immune dysfunction, poor stress resilience.',
      },
      {
        name: 'Cortisol AM', unit: 'µg/dL', fasting: true,
        conventional: '6 – 23',
        levels: [lvl('OPTIMAL', '15 – 20', G), lvl('SUBOPTIMAL', '12 – 15 or 20–24', Y), lvl('CONCERNING', '8 – 12 or 24–30', O), lvl('CRITICAL', '< 8 or > 30', R)],
        note: 'Draw 8–9 AM. Low = HPA burnout. High = chronic stress, Cushing\'s. Rhythm is key.',
      },
      {
        name: 'IGF-1 (adults)', unit: 'ng/mL', fasting: false,
        conventional: '88 – 246 (age-dependent)',
        levels: [lvl('OPTIMAL', '150 – 250', G), lvl('SUBOPTIMAL', '100 – 150 or 250–300', Y), lvl('CONCERNING', '75 – 100 or 300–350', O), lvl('CRITICAL', '< 75 or > 350', R)],
        note: 'GH surrogate. Both extremes are problematic — low = sarcopenia; very high = IGF-1 cancer link.',
      },
    ],
  },
  {
    id: 'nutrition', label: 'Nutritional', color: '#C9963C', icon: '◇',
    markers: [
      {
        name: 'Vitamin D (25-OH)', unit: 'ng/mL', fasting: false,
        conventional: '> 20',
        levels: [lvl('OPTIMAL', '50 – 80', G), lvl('SUBOPTIMAL', '30 – 50', Y), lvl('CONCERNING', '20 – 30', O), lvl('CRITICAL', '< 20', R)],
        note: 'Conventional "sufficient" at >20 is critically low. >80 not recommended without K2 + Mg.',
      },
      {
        name: 'Vitamin B12', unit: 'pg/mL', fasting: false,
        conventional: '200 – 900',
        levels: [lvl('OPTIMAL', '800 – 1200', G), lvl('SUBOPTIMAL', '500 – 800', Y), lvl('CONCERNING', '300 – 500', O), lvl('CRITICAL', '< 300', R)],
        note: 'Serum B12 alone is insufficient — always add MMA to detect functional deficiency.',
      },
      {
        name: 'MMA (Methylmalonic Acid)', unit: 'nmol/L', fasting: false,
        conventional: '< 376',
        levels: [lvl('OPTIMAL', '< 180', G), lvl('SUBOPTIMAL', '180 – 243', Y), lvl('CONCERNING', '243 – 376', O), lvl('CRITICAL', '> 376', R)],
        note: 'Elevated MMA = functional B12 deficiency even when serum B12 is "normal".',
      },
      {
        name: 'RBC Magnesium', unit: 'mg/dL', fasting: false,
        conventional: '4.2 – 6.8',
        levels: [lvl('OPTIMAL', '5.5 – 6.8', G), lvl('SUBOPTIMAL', '5.0 – 5.5', Y), lvl('CONCERNING', '4.5 – 5.0', O), lvl('CRITICAL', '< 4.5', R)],
        note: 'Serum magnesium is USELESS — only 1% of Mg is in blood. Always order RBC Mg.',
      },
      {
        name: 'Ferritin', unit: 'ng/mL', fasting: false,
        conventional: '12 – 300',
        levels: [lvl('OPTIMAL', '50 – 150', G), lvl('SUBOPTIMAL', '25 – 50 or 150–200', Y), lvl('CONCERNING', '15 – 25 or 200–300', O), lvl('CRITICAL', '< 15 or > 300', R)],
        note: 'Both extremes are problems. Very high ferritin = inflammation, hemochromatosis, liver disease.',
      },
      {
        name: 'Zinc (plasma)', unit: 'µg/dL', fasting: false,
        conventional: '60 – 120',
        levels: [lvl('OPTIMAL', '90 – 130', G), lvl('SUBOPTIMAL', '70 – 90', Y), lvl('CONCERNING', '60 – 70', O), lvl('CRITICAL', '< 60', R)],
        note: 'Zinc cofactor for 300+ enzymes. Deficiency = immune dysfunction, testosterone production, wound healing.',
      },
      {
        name: 'Vitamin B6 (P5P)', unit: 'nmol/L', fasting: false,
        conventional: '20 – 100',
        levels: [lvl('OPTIMAL', '40 – 80', G), lvl('SUBOPTIMAL', '20 – 40', Y), lvl('CONCERNING', '10 – 20', O), lvl('CRITICAL', '< 10', R)],
        note: 'Active form P5P required for neurotransmitter synthesis, homocysteine clearance, and B12 activation.',
      },
      {
        name: 'CoQ10 (plasma)', unit: 'µg/mL', fasting: false,
        conventional: '0.4 – 1.9',
        levels: [lvl('OPTIMAL', '0.8 – 2.0', G), lvl('SUBOPTIMAL', '0.5 – 0.8', Y), lvl('CONCERNING', '0.3 – 0.5', O), lvl('CRITICAL', '< 0.3', R)],
        note: 'Depleted by statins. Critical for mitochondrial ATP production and cardiac function.',
      },
    ],
  },
  {
    id: 'inflam', label: 'Inflammation', color: '#FF8C00', icon: '◬',
    markers: [
      {
        name: 'IL-6 (Interleukin-6)', unit: 'pg/mL', fasting: false,
        conventional: '< 7',
        levels: [lvl('OPTIMAL', '< 2', G), lvl('SUBOPTIMAL', '2 – 3.5', Y), lvl('CONCERNING', '3.5 – 7', O), lvl('CRITICAL', '> 7', R)],
        note: 'Master pro-inflammatory cytokine. Drives metabolic syndrome, sarcopenia, depression.',
      },
      {
        name: 'Fibrinogen', unit: 'mg/dL', fasting: false,
        conventional: '200 – 400',
        levels: [lvl('OPTIMAL', '200 – 280', G), lvl('SUBOPTIMAL', '280 – 350', Y), lvl('CONCERNING', '350 – 450', O), lvl('CRITICAL', '> 450', R)],
        note: 'Inflammatory clotting protein. Elevated = thrombotic risk + systemic inflammation.',
      },
    ],
  },
  {
    id: 'longevity', label: 'Longevity & Biological Age', color: '#9A7CE8', icon: '⧖',
    markers: [
      {
        name: 'NAD+ (intracellular)', unit: 'µM', fasting: false,
        conventional: 'No standard',
        levels: [lvl('OPTIMAL', '> 40', G), lvl('SUBOPTIMAL', '25 – 40', Y), lvl('CONCERNING', '15 – 25', O), lvl('CRITICAL', '< 15', R)],
        note: 'Declines ~50% per decade after 40. Drives sirtuin activation, DNA repair, and mitochondrial function.',
      },
      {
        name: 'Klotho', unit: 'pg/mL', fasting: false,
        conventional: '350 – 850',
        levels: [lvl('OPTIMAL', '> 700', G), lvl('SUBOPTIMAL', '500 – 700', Y), lvl('CONCERNING', '350 – 500', O), lvl('CRITICAL', '< 350', R)],
        note: 'Anti-aging hormone. Declines with age — low levels = accelerated brain and kidney aging.',
      },
    ],
  },
  {
    id: 'neuro', label: 'Neurological & Cognitive', color: '#9A7CE8', icon: '◎',
    markers: [
      {
        name: 'BDNF', unit: 'ng/mL', fasting: false,
        conventional: '> 4',
        levels: [lvl('OPTIMAL', '> 20', G), lvl('SUBOPTIMAL', '10 – 20', Y), lvl('CONCERNING', '5 – 10', O), lvl('CRITICAL', '< 5', R)],
        note: 'Brain fertilizer — drives neuroplasticity. Low = depression, Alzheimer\'s risk, poor memory.',
      },
    ],
  },
  {
    id: 'cirs', label: 'MCAS / CIRS / Biotoxin', color: '#FF8C00', icon: '⊗',
    markers: [
      {
        name: 'TGF-β1', unit: 'pg/mL', fasting: false,
        conventional: 'No standard',
        levels: [lvl('OPTIMAL', '< 2,380', G), lvl('SUBOPTIMAL', '2,380 – 4,000', Y), lvl('CONCERNING', '4,000 – 6,000', O), lvl('CRITICAL', '> 6,000', R)],
        note: 'Shoemaker CIRS protocol marker. Elevated = mold/biotoxin exposure with immune activation.',
      },
      {
        name: 'MSH (α-MSH)', unit: 'pg/mL', fasting: false,
        conventional: '35 – 81',
        levels: [lvl('OPTIMAL', '40 – 81', G), lvl('SUBOPTIMAL', '28 – 40', Y), lvl('CONCERNING', '14 – 28', O), lvl('CRITICAL', '< 14', R)],
        note: 'Regulates immunity, pain, sleep, and inflammation. Low = CIRS / biotoxin illness signature.',
      },
      {
        name: 'VIP', unit: 'pg/mL', fasting: false,
        conventional: '23 – 63',
        levels: [lvl('OPTIMAL', '35 – 63', G), lvl('SUBOPTIMAL', '23 – 35', Y), lvl('CONCERNING', '14 – 23', O), lvl('CRITICAL', '< 14', R)],
        note: 'Vasoactive Intestinal Peptide — regulates pulmonary function, immune balance. Low = CIRS.',
      },
      {
        name: 'MMP-9', unit: 'ng/mL', fasting: false,
        conventional: '< 983',
        levels: [lvl('OPTIMAL', '< 332', G), lvl('SUBOPTIMAL', '332 – 500', Y), lvl('CONCERNING', '500 – 983', O), lvl('CRITICAL', '> 983', R)],
        note: 'Matrix metalloproteinase — elevated destroys tissue barriers (gut, BBB). CIRS + inflammatory marker.',
      },
    ],
  },
]

function valueColor(value: number, levels: RangeLevel[], unit: string): string {
  // Simple heuristic — can't fully parse ranges, but used for quick lookup
  return 'rgba(240,232,216,0.6)'
}

export default function ReferencePage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [compareValues, setCompareValues] = useState<Record<string, string>>({})

  const q = search.toLowerCase()
  const filtered = CATEGORIES
    .filter(cat => !activeCategory || cat.id === activeCategory)
    .map(cat => ({
      ...cat,
      markers: cat.markers.filter(m =>
        !q || m.name.toLowerCase().includes(q) || m.note?.toLowerCase().includes(q)
      ),
    }))
    .filter(cat => cat.markers.length > 0)

  const totalMarkers = CATEGORIES.reduce((sum, c) => sum + c.markers.length, 0)

  return (
    <div style={{ padding: '2rem', maxWidth: 1100, fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(240,232,216,0.25)', marginBottom: '0.5rem' }}>ORION · CLINICAL REFERENCE</div>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 300, color: '#F0E8D8', letterSpacing: '0.12em', margin: 0 }}>Functional Medicine Reference Guide</h1>
        <p style={{ fontSize: '0.75rem', color: 'rgba(240,232,216,0.3)', marginTop: '0.4rem', lineHeight: 1.6 }}>
          {totalMarkers} biomarkers · Functional optimal ranges vs. conventional reference ranges · Color-coded clinical significance
        </p>

        {/* Legend */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          {[
            { color: G, label: 'OPTIMAL — where you want to be' },
            { color: Y, label: 'SUBOPTIMAL — room to improve' },
            { color: O, label: 'CONCERNING — intervention needed' },
            { color: R, label: 'CRITICAL — urgent action' },
          ].map(item => (
            <div key={item.color} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: item.color, flexShrink: 0 }} />
              <span style={{ fontSize: '0.65rem', color: 'rgba(240,232,216,0.4)', letterSpacing: '0.08em' }}>{item.label}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '0.75rem', padding: '0.6rem 0.875rem', background: 'rgba(201,150,60,0.06)', border: '1px solid rgba(201,150,60,0.15)', borderRadius: 4, fontSize: '0.68rem', color: 'rgba(240,232,216,0.5)', lineHeight: 1.6 }}>
          ⚑ <strong style={{ color: '#C9963C' }}>Functional vs. Conventional:</strong> Conventional reference ranges are built from population averages that include sick people. Functional optimal ranges represent where biomarkers are found in truly healthy, high-functioning individuals. A result can be "normal" conventionally and still indicate a problem in the functional lens.
        </div>
      </div>

      {/* Search + Filter */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search biomarkers..."
          style={{ flex: 1, minWidth: 200, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(240,232,216,0.1)', borderRadius: 6, padding: '0.5rem 0.875rem', color: '#F0E8D8', fontSize: '0.8rem', outline: 'none' }}
        />
      </div>

      {/* Category tabs */}
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <button
          onClick={() => setActiveCategory(null)}
          style={{ background: !activeCategory ? 'rgba(61,200,152,0.12)' : 'transparent', border: `1px solid ${!activeCategory ? 'rgba(61,200,152,0.3)' : 'rgba(240,232,216,0.08)'}`, borderRadius: 4, padding: '0.3rem 0.75rem', color: !activeCategory ? '#3DC898' : 'rgba(240,232,216,0.35)', fontSize: '0.68rem', cursor: 'pointer', letterSpacing: '0.05em' }}
        >All</button>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
            style={{ background: activeCategory === cat.id ? `${cat.color}15` : 'transparent', border: `1px solid ${activeCategory === cat.id ? cat.color + '40' : 'rgba(240,232,216,0.08)'}`, borderRadius: 4, padding: '0.3rem 0.75rem', color: activeCategory === cat.id ? cat.color : 'rgba(240,232,216,0.35)', fontSize: '0.68rem', cursor: 'pointer', letterSpacing: '0.05em' }}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      {/* Marker cards */}
      {filtered.map(cat => (
        <div key={cat.id} style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: `1px solid ${cat.color}25` }}>
            <span style={{ color: cat.color, fontSize: '1rem' }}>{cat.icon}</span>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', color: cat.color, textTransform: 'uppercase' }}>{cat.label}</span>
            <span style={{ fontSize: '0.6rem', color: 'rgba(240,232,216,0.2)', marginLeft: '0.25rem' }}>{cat.markers.length} markers</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '0.75rem' }}>
            {cat.markers.map(marker => {
              const compareVal = compareValues[`${cat.id}_${marker.name}`] || ''
              const numVal = parseFloat(compareVal)

              return (
                <div key={marker.name} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(240,232,216,0.07)', borderRadius: 8, padding: '1rem', transition: 'border-color 0.2s' }}>
                  {/* Marker header */}
                  <div style={{ marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#F0E8D8', lineHeight: 1.3 }}>{marker.name}</div>
                      <div style={{ fontSize: '0.65rem', color: 'rgba(240,232,216,0.3)', marginLeft: '0.5rem', flexShrink: 0 }}>{marker.unit}</div>
                    </div>
                    {marker.fasting && (
                      <span style={{ fontSize: '0.58rem', color: '#C9963C', letterSpacing: '0.08em', marginTop: '0.2rem', display: 'inline-block' }}>FASTING</span>
                    )}
                    <div style={{ fontSize: '0.62rem', color: 'rgba(240,232,216,0.25)', marginTop: '0.25rem' }}>
                      Conventional: <span style={{ color: 'rgba(240,232,216,0.45)' }}>{marker.conventional}</span>
                    </div>
                  </div>

                  {/* Range bands */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: '0.75rem' }}>
                    {marker.levels.map((level, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '0.3rem 0.5rem',
                          borderRadius: 4,
                          background: level.bg,
                          border: `1px solid ${level.color}25`,
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <div style={{ width: 6, height: 6, borderRadius: '50%', background: level.color, flexShrink: 0 }} />
                          <span style={{ fontSize: '0.6rem', letterSpacing: '0.1em', color: level.color, fontWeight: 600 }}>{level.label}</span>
                        </div>
                        <span style={{ fontSize: '0.7rem', color: 'rgba(240,232,216,0.7)', fontFamily: 'monospace' }}>{level.range}</span>
                      </div>
                    ))}
                  </div>

                  {/* Compare my value */}
                  <div style={{ marginBottom: '0.6rem' }}>
                    <div style={{ fontSize: '0.58rem', letterSpacing: '0.1em', color: 'rgba(240,232,216,0.2)', marginBottom: '0.3rem' }}>COMPARE MY VALUE</div>
                    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                      <input
                        type="number"
                        value={compareVal}
                        onChange={e => setCompareValues(prev => ({ ...prev, [`${cat.id}_${marker.name}`]: e.target.value }))}
                        placeholder={`Enter ${marker.unit}`}
                        style={{ flex: 1, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(240,232,216,0.1)', borderRadius: 4, padding: '0.35rem 0.5rem', color: '#F0E8D8', fontSize: '0.72rem', outline: 'none' }}
                      />
                      {compareVal && !isNaN(numVal) && (() => {
                        // Find matching level band by parsing range text
                        let matchedLevel: RangeLevel | null = null
                        for (const level of marker.levels) {
                          const r = level.range.replace(/,/g, '')
                          const gt = r.match(/^>\s*([\d.]+)/)
                          const lt = r.match(/^<\s*([\d.]+)/)
                          const between = r.match(/([\d.]+)\s*[–\-]\s*([\d.]+)/)
                          const gte = r.match(/^≥\s*([\d.]+)/)
                          if (gt && numVal > parseFloat(gt[1])) { matchedLevel = level; break }
                          if (gte && numVal >= parseFloat(gte[1])) { matchedLevel = level; break }
                          if (lt && numVal < parseFloat(lt[1])) { matchedLevel = level; break }
                          if (between && numVal >= parseFloat(between[1]) && numVal <= parseFloat(between[2])) { matchedLevel = level; break }
                        }
                        if (!matchedLevel) return <span style={{ fontSize: '0.68rem', color: 'rgba(240,232,216,0.3)' }}>—</span>
                        return (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.3rem 0.6rem', borderRadius: 4, background: `${matchedLevel.color}18`, border: `1px solid ${matchedLevel.color}40` }}>
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: matchedLevel.color }} />
                            <span style={{ fontSize: '0.65rem', color: matchedLevel.color, fontWeight: 700 }}>{matchedLevel.label}</span>
                          </div>
                        )
                      })()}
                    </div>
                  </div>

                  {/* Clinical note */}
                  {marker.note && (
                    <div style={{ fontSize: '0.65rem', color: 'rgba(240,232,216,0.35)', lineHeight: 1.5, borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '0.5rem' }}>
                      {marker.note}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

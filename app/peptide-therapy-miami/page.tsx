import type { Metadata } from 'next'
import LandingPage, { type LandingData } from '@/components/LandingPage'

export const metadata: Metadata = {
  title: 'Peptide Therapy in Miami · Recovery, Longevity & Performance',
  description: 'Peptide therapy in Miami (Coral Gables) with Dr. Michael J. Meighen — BPC-157, CJC-1295, Ipamorelin, Sermorelin, GHK-Cu and longevity peptides for recovery, energy, body composition and healthspan. Physician-guided.',
  keywords: 'peptide therapy Miami, peptides Miami, BPC-157, CJC-1295, Ipamorelin, Sermorelin, GHK-Cu, growth hormone peptides, longevity, recovery, Dr. Michael Meighen, Coral Gables',
  alternates: { canonical: '/peptide-therapy-miami' },
}

const data: LandingData = {
  path: '/peptide-therapy-miami',
  eyebrow: 'Peptide Therapy · Miami',
  h1: 'Peptide Therapy in Miami',
  lead: [
    '<strong>Peptides</strong> are short chains of amino acids that act as precise signals in the body — telling cells to repair, recover, build, calm or regenerate. Used well, <strong>peptide therapy</strong> supports recovery, energy, body composition, sleep and longevity. At <strong>Alchemized BioHealing Institute</strong> in Coral Gables, Miami, peptide therapy is physician-guided by <strong>Dr. Michael J. Meighen</strong>.',
    'Every protocol is personalized to your labs, goals and physiology — part of a complete biohacking and longevity strategy.',
  ],
  sections: [
    { h2: 'Peptides for recovery, longevity & performance', p: [
      'From injury recovery and tissue repair to growth-hormone support, metabolic health and longevity, peptides are one of the most targeted tools in modern regenerative and functional medicine. Dr. Meighen selects and doses them precisely — never one-size-fits-all — and integrates them with hormone optimization, IV therapy and nervous-system regulation.',
    ] },
    { h2: 'Common peptide categories', p: [
      'Recovery peptides such as <strong>BPC-157</strong> and <strong>TB-500</strong>; growth-hormone secretagogues like <strong>CJC-1295, Ipamorelin and Sermorelin</strong>; longevity peptides such as <strong>Epithalon and GHK-Cu</strong>; and mitochondrial peptides like <strong>MOTS-c</strong>. The right combination depends entirely on your individual assessment.',
    ] },
  ],
  bullets: { h2: 'What peptide therapy can support', items: [
    'Faster recovery from injury, training & burnout',
    'Energy, body composition & metabolic health',
    'Sleep, mood & cognitive clarity',
    'Skin, hair & tissue repair (e.g., GHK-Cu)',
    'Growth-hormone optimization (via analog peptides)',
    'Longevity & cellular health',
  ] },
  faq: [
    { q: 'What is peptide therapy?', a: 'Peptide therapy uses specific amino-acid chains to signal the body to recover, repair, build or regenerate. It is used for recovery, longevity, hormones and performance, and is physician-guided at Alchemized BioHealing Institute in Miami.' },
    { q: 'Where can I get peptide therapy in Miami?', a: 'At Alchemized BioHealing Institute, 2970 Coral Way, Miami, FL 33145 (Coral Gables), with Dr. Michael J. Meighen. Call 305-305-3820 to book a consultation.' },
    { q: 'Which peptides do you offer?', a: 'Depending on your assessment: BPC-157, TB-500, AOD-9604, CJC-1295, Ipamorelin, Sermorelin, MK-677, Epithalon, GHK-Cu and MOTS-c, among others — always personalized and dosed by a physician.' },
    { q: 'Is peptide therapy safe?', a: 'Peptide therapy is medically supervised by Dr. Meighen and tailored to your labs and goals. We assess, personalize and monitor every protocol. Consult the physician for your individual care.' },
  ],
  related: [['Hormone Optimization', '/hormone-optimization-miami'], ['Regenerative Medicine', '/regenerative-medicine-miami'], ['Biohacking', '/biohacking-miami'], ['NAD+ IV Therapy', '/nad-iv-therapy-miami'], ['Services', '/services']],
  ctaLabel: 'Book a peptide consult',
  keywords: 'peptide therapy Miami, BPC-157, CJC-1295, Ipamorelin, longevity peptides, recovery',
}

export default function Page() { return <LandingPage data={data} /> }

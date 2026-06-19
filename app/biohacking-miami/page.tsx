import type { Metadata } from 'next'
import LandingPage, { type LandingData } from '@/components/LandingPage'

export const metadata: Metadata = {
  title: 'Biohacking in Miami · Longevity, Peptides, NAD+ & Bio-Energetic Therapies',
  description: 'Biohacking in Miami (Coral Gables) at Alchemized BioHealing Institute — data-driven longevity, peptide therapy, NAD+ IV, hormone optimization, red light, cold plunge, HOCATT and nervous-system regulation. Where science meets soul.',
  keywords: 'biohacking Miami, biohacking Coral Gables, longevity Miami, NAD+ Miami, peptide therapy, red light therapy, cold plunge, human optimization, healthspan, Dr. Michael Meighen, Holistic Bella',
  alternates: { canonical: '/biohacking-miami' },
}

const data: LandingData = {
  path: '/biohacking-miami',
  eyebrow: 'Biohacking · Coral Gables, Miami',
  h1: 'Biohacking in Miami',
  lead: [
    '<strong>Biohacking</strong> is the art and science of using data, technology and ancestral wisdom to optimize how your body and mind perform — so you don’t just live longer, you live <strong>better</strong>. At <strong>Alchemized BioHealing Institute</strong> in Coral Gables, Miami, biohacking is precise, personal and proactive: we measure, optimize and harmonize your biology as one system.',
    'Founded by <strong>Dr. Michael J. Meighen</strong> (regenerative &amp; functional medicine) and holistic practitioner <strong>Holistic Bella Vargas</strong>, our approach blends advanced diagnostics and longevity medicine with nervous-system regulation and spiritual healing — where science meets soul.',
  ],
  sections: [
    { h2: 'What biohacking looks like here', p: [
      'Real biohacking starts with <strong>data</strong>, not guesswork. We use comprehensive blood panels, epigenetic and biological-age testing, hormone profiles and wearable integration to see exactly where your biology is — then build a personalized protocol of <strong>peptide therapy, hormone optimization, NAD+ and IV therapy</strong>, and bio-energetic modalities to move the needle.',
      'It’s the same science championed by leading longevity researchers — targeting the hallmarks of aging, inflammation, mitochondrial function and metabolic health — applied to <em>you</em> as an individual (an n=1 approach), not a statistic.',
    ] },
    { h2: 'Science meets soul', p: [
      'Most biohacking ignores the nervous system. We don’t. True human optimization also means regulating stress, improving sleep, and reconnecting body, mind and spirit — through breathwork, meditation, sound healing and ancestral practices led by Holistic Bella. Performance and peace, together.',
    ] },
  ],
  bullets: { h2: 'Biohacking tools at Alchemized', items: [
    'Peptide therapy (BPC-157, CJC-1295, Ipamorelin, GHK-Cu and more)',
    'NAD+, glutathione and longevity IV drips (preservative-free)',
    'Bio-identical hormone optimization',
    'Red light therapy, cold plunge + infrared sauna, HOCATT ozone sauna, PEMF',
    'Floatation therapy & nervous-system regulation',
    'Epigenetic & biological-age testing, advanced blood panels',
    'Free Biological Age Calculator to find your starting point',
  ] },
  faq: [
    { q: 'What is biohacking?', a: 'Biohacking is using science, data and lifestyle tools to optimize your body and mind — improving energy, recovery, focus, hormones and longevity. At Alchemized BioHealing Institute in Miami it is physician-guided, data-driven and personalized.' },
    { q: 'Where can I do biohacking in Miami?', a: 'At Alchemized BioHealing Institute, 2970 Coral Way, Miami, FL 33145 (Coral Gables). Call 305-305-3820. We offer peptides, NAD+, hormone optimization, red light, cold plunge, HOCATT and nervous-system regulation.' },
    { q: 'How do I start?', a: 'Begin with our free Biological Age Calculator or a longevity consultation with Dr. Meighen. We measure your biology first, then design a personalized biohacking protocol.' },
    { q: 'Is biohacking safe?', a: 'Our medical biohacking is physician-supervised by Dr. Meighen, a double board-certified physician. Wellness therapies are complementary; we always personalize and monitor your protocol.' },
  ],
  related: [['Regenerative Medicine', '/regenerative-medicine-miami'], ['Peptide Therapy', '/peptide-therapy-miami'], ['NAD+ IV Therapy', '/nad-iv-therapy-miami'], ['Longevity Clinic', '/longevity-clinic-coral-gables'], ['Services', '/services']],
  ctaLabel: 'Book a biohacking consult',
  keywords: 'biohacking Miami, longevity, NAD+, peptide therapy, human optimization, healthspan',
}

export default function Page() { return <LandingPage data={data} /> }

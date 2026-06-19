import type { Metadata } from 'next'
import LandingPage, { type LandingData } from '@/components/LandingPage'

export const metadata: Metadata = {
  title: 'Functional Medicine in Miami · Root-Cause, Hormones, Gut & Longevity',
  description: 'Functional medicine in Miami (Coral Gables) at Alchemized BioHealing Institute — root-cause diagnostics, hormone and metabolic optimization, gut health, epigenetics and personalized longevity protocols with Dr. Michael J. Meighen.',
  keywords: 'functional medicine Miami, medicina funcional Miami, root cause medicine, hormone optimization, gut health, epigenetics, metabolic health, longevity, Dr. Michael Meighen, Coral Gables',
  alternates: { canonical: '/functional-medicine-miami' },
}

const data: LandingData = {
  path: '/functional-medicine-miami',
  eyebrow: 'Functional Medicine · Miami',
  h1: 'Functional Medicine in Miami',
  lead: [
    '<strong>Functional medicine</strong> asks a different question: not just <em>what</em> is wrong, but <em>why</em>. Instead of treating symptoms in isolation, it reads your body as one interconnected system — metabolic, hormonal, genetic, nutritional, neurological and emotional — and resolves the root cause. At <strong>Alchemized BioHealing Institute</strong> in Coral Gables, Miami, functional medicine is led by <strong>Dr. Michael J. Meighen</strong>.',
    'This is proactive, evidence-based medicine beyond the allopathic model — designed to maximize your <strong>healthspan</strong> and vitality, not just your lifespan.',
  ],
  sections: [
    { h2: 'Root-cause, not cookie-cutter', p: [
      'You are not a number from 0 to 10. Functional medicine here begins with deep diagnostics — comprehensive blood panels, hormone profiles (including DUTCH testing), epigenetics, microbiome and body-composition analysis — to map your unique biology. From there we build a personalized protocol that may include <strong>hormone optimization, peptide therapy, NAD+ and IV therapy, precision nutrition and nervous-system regulation</strong>.',
    ] },
    { h2: 'Body and soul, together', p: [
      'Functional medicine treats the whole person. Alongside Dr. Meighen’s clinical lens, Holistic Bella Vargas brings nervous-system regulation, breathwork and ancestral healing — because chronic stress and an unregulated nervous system are root causes too. Science and spirit, woven into one practice.',
    ] },
  ],
  bullets: { h2: 'What functional medicine includes', items: [
    'Root-cause diagnostics & comprehensive lab panels',
    'Hormone & metabolic optimization',
    'Gut health & microbiome support',
    'Epigenetic & biological-age testing',
    'Peptide therapy & NAD+/IV therapy',
    'Precision nutrition, supplements & lifestyle protocols',
    'Nervous-system regulation, breathwork & sleep optimization',
  ] },
  faq: [
    { q: 'What is functional medicine?', a: 'Functional medicine is a root-cause, systems-based approach that identifies why dysfunction is happening and addresses it through personalized diagnostics, nutrition, hormones, peptides and lifestyle — rather than only treating symptoms.' },
    { q: 'Where can I find functional medicine in Miami?', a: 'At Alchemized BioHealing Institute, 2970 Coral Way, Miami, FL 33145 (Coral Gables), led by Dr. Michael J. Meighen. Call 305-305-3820. We welcome you in English and Spanish.' },
    { q: 'How is functional medicine different from conventional medicine?', a: 'Conventional medicine often manages symptoms; functional medicine investigates the root cause across your whole system and builds a proactive, personalized plan to restore balance and extend healthspan.' },
    { q: 'What can functional medicine help with?', a: 'Fatigue, hormonal imbalance, metabolic and gut issues, inflammation, stress and overall longevity and performance. Care is individualized; consult Dr. Meighen for your plan.' },
  ],
  related: [['Hormone Optimization', '/hormone-optimization-miami'], ['Biohacking', '/biohacking-miami'], ['Regenerative Medicine', '/regenerative-medicine-miami'], ['Longevity Clinic', '/longevity-clinic-coral-gables'], ['Services', '/services']],
  ctaLabel: 'Book a functional medicine consult',
  keywords: 'functional medicine Miami, root cause, hormones, gut health, epigenetics, longevity',
}

export default function Page() { return <LandingPage data={data} /> }

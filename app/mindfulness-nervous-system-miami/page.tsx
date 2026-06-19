import type { Metadata } from 'next'
import LandingPage, { type LandingData } from '@/components/LandingPage'

export const metadata: Metadata = {
  title: 'Mindfulness & Nervous System Regulation in Miami',
  description: 'Mindfulness, breathwork and nervous-system regulation in Miami (Coral Gables) with Holistic Bella Vargas — meditation, somatic healing, Reiki, sound healing and ancestral medicine to calm stress, regulate your nervous system and reconnect body, mind and soul.',
  keywords: 'mindfulness Miami, nervous system regulation Miami, breathwork, meditation, somatic healing, Reiki Miami, sound healing, stress, anxiety, ancestral medicine, Holistic Bella, Coral Gables',
  alternates: { canonical: '/mindfulness-nervous-system-miami' },
}

const data: LandingData = {
  path: '/mindfulness-nervous-system-miami',
  eyebrow: 'Mindfulness & Nervous System · Miami',
  h1: 'Mindfulness & Nervous System Regulation in Miami',
  lead: [
    'So much of modern suffering — anxiety, exhaustion, poor sleep, reactivity — lives in a <strong>dysregulated nervous system</strong>. <strong>Mindfulness</strong> and nervous-system regulation help your body shift out of chronic “fight or flight” and back into calm, clarity and connection. At <strong>Alchemized BioHealing Institute</strong> in Coral Gables, Miami, this work is guided by holistic practitioner <strong>Holistic Bella Vargas</strong>.',
    'Where neuroscience meets the soul: breathwork, meditation, somatic release and ancestral healing — woven with Dr. Meighen’s clinical longevity medicine.',
  ],
  sections: [
    { h2: 'Regulate the system, elevate the life', p: [
      'A regulated nervous system is the foundation of healing, performance and peace. Through <strong>breathwork, meditation, somatic practices, Reiki and sound healing</strong> — and clinical tools like HRV evaluation, SGB consultation and the Nervous System &amp; Longevity Program — we help you calm stress, sleep deeply and feel safe in your own body again.',
    ] },
    { h2: 'Mindfulness rooted in ancestral wisdom', p: [
      'Holistic Bella studied directly with shamans and indigenous communities in Guatemala, Mexico and Colombia. Her mindfulness work blends applied neuroscience with ancestral medicine, chakra and energy cleansing, and emotional-spiritual integration — a rare bridge between worlds.',
    ] },
  ],
  bullets: { h2: 'Practices & programs', items: [
    'Breathwork & guided meditation',
    'Somatic release & nervous-system regulation',
    'Reiki, energy & chakra cleansing',
    'Sound healing & meditation circles',
    'HRV / stress evaluation & SGB consultation',
    'Nervous System & Longevity Program',
    'Free Soul Assessment to begin',
  ] },
  faq: [
    { q: 'What is nervous-system regulation?', a: 'It is the practice of helping your nervous system move out of chronic stress (fight-or-flight) into a calm, regulated state — through breathwork, meditation, somatic work and supportive therapies. It improves stress, sleep, mood and resilience.' },
    { q: 'Where can I find mindfulness & nervous-system work in Miami?', a: 'At Alchemized BioHealing Institute, 2970 Coral Way, Miami, FL 33145 (Coral Gables), guided by Holistic Bella Vargas. Call 305-305-3820. We welcome you in English and Spanish.' },
    { q: 'Can this help with anxiety and stress?', a: 'Mindfulness and nervous-system regulation are complementary wellness practices that many find supportive for stress, overwhelm and sleep. They are not a substitute for medical or psychological care; we will guide you to the right support.' },
    { q: 'How do I start?', a: 'Begin with the free Soul Assessment or a session with Holistic Bella. We also offer the Nervous System & Longevity Program combining clinical and holistic tools.' },
  ],
  related: [['Functional Medicine', '/functional-medicine-miami'], ['Biohacking', '/biohacking-miami'], ['Holistic Bella', '/about/bella'], ['Events & Retreats', '/retreats'], ['Soul Assessment', '/assessment']],
  ctaLabel: 'Begin with a session',
  keywords: 'mindfulness Miami, nervous system regulation, breathwork, meditation, Reiki, somatic healing',
}

export default function Page() { return <LandingPage data={data} /> }

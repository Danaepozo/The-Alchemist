import type { Metadata } from 'next'
import LandingPage, { type LandingData } from '@/components/LandingPage'

export const metadata: Metadata = {
  title: 'Hormone Optimization in Miami · Bio-Identical Hormones & BHRT',
  description: 'Hormone optimization in Miami (Coral Gables) with Dr. Michael J. Meighen — bio-identical hormone replacement (BHRT) for testosterone, estrogen, progesterone, thyroid and more. Restore energy, libido, mood and vitality.',
  keywords: 'hormone optimization Miami, bio-identical hormones, BHRT Miami, testosterone therapy, estrogen, progesterone, thyroid, menopause, andropause, libido, Dr. Michael Meighen, Coral Gables',
  alternates: { canonical: '/hormone-optimization-miami' },
}

const data: LandingData = {
  path: '/hormone-optimization-miami',
  eyebrow: 'Hormone Optimization · Miami',
  h1: 'Hormone Optimization in Miami',
  lead: [
    'When hormones fall out of balance, everything feels harder — energy, sleep, mood, libido, focus and body composition. <strong>Hormone optimization</strong> restores your body’s chemistry using <strong>bio-identical hormones</strong> matched to your physiology. At <strong>Alchemized BioHealing Institute</strong> in Coral Gables, Miami, it is led by <strong>Dr. Michael J. Meighen</strong>.',
    'This is precision hormone medicine — measured, personalized and monitored — as part of a complete longevity and functional-medicine strategy.',
  ],
  sections: [
    { h2: 'Bio-identical, data-driven hormone care', p: [
      'We start with comprehensive hormone testing, then optimize <strong>testosterone, estrogen, progesterone, thyroid, cortisol and DHEA</strong> — plus growth-hormone support via analog peptides — with proactive quarterly evaluations. The goal isn’t just “normal” labs; it’s optimal energy, vitality and healthspan.',
    ] },
    { h2: 'For men and women', p: [
      'Whether you’re navigating <strong>andropause, menopause</strong>, low libido, stubborn weight, brain fog or fatigue, hormone optimization can help you feel like yourself again. Care is individualized for each person and integrated with peptides, nutrition and nervous-system regulation.',
    ] },
  ],
  bullets: { h2: 'Hormones we optimize', items: [
    'Testosterone (men & women)',
    'Estrogen & progesterone',
    'Thyroid, cortisol & DHEA',
    'Growth hormone (via analog peptides)',
    'Melatonin & insulin balance',
    'Proactive quarterly hormone evaluation',
  ] },
  faq: [
    { q: 'What is hormone optimization?', a: 'Hormone optimization restores balanced, optimal hormone levels using bio-identical hormones matched to your body. It can improve energy, sleep, libido, mood, focus and body composition. At Alchemized BioHealing Institute it is led by Dr. Meighen in Miami.' },
    { q: 'Where can I get bio-identical hormones in Miami?', a: 'At Alchemized BioHealing Institute, 2970 Coral Way, Miami, FL 33145 (Coral Gables). Call 305-305-3820 to book a hormone consultation with Dr. Michael J. Meighen.' },
    { q: 'Is hormone optimization for men or women?', a: 'Both. We support men through andropause and low testosterone, and women through perimenopause, menopause and hormonal shifts — always personalized and monitored.' },
    { q: 'How do you start?', a: 'With comprehensive hormone testing and a consultation. Dr. Meighen reviews your labs and symptoms, then designs a personalized, monitored optimization plan.' },
  ],
  related: [['Peptide Therapy', '/peptide-therapy-miami'], ['Functional Medicine', '/functional-medicine-miami'], ['Biohacking', '/biohacking-miami'], ['Longevity Clinic', '/longevity-clinic-coral-gables'], ['Services', '/services']],
  ctaLabel: 'Book a hormone consult',
  keywords: 'hormone optimization Miami, bio-identical hormones, BHRT, testosterone, menopause, andropause',
}

export default function Page() { return <LandingPage data={data} /> }

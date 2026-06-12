import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services · Regenerative Medicine, IV Therapy & Bio-Energetic Therapies',
  description: 'Regenerative & functional medicine, peptides, hormone optimization, NAD+ & IV therapy, DiscSeel®, plus bio-energetic therapies — red light, cold plunge, infrared sauna, floatation, HOCATT and more. Coral Gables, Miami.',
  alternates: { canonical: '/services' },
  openGraph: { title: 'Services · Alchemized BioHealing Institute', description: 'Regenerative medicine, IV therapy, peptides, hormones and bio-energetic therapies in Miami.' },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}

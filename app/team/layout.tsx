import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Team · Dr. Michael J. Meighen & Holistic Bella Vargas',
  description: 'Meet the two healers behind Alchemized BioHealing Institute: Dr. Michael J. Meighen (regenerative & longevity medicine) and Holistic Bella Vargas (spiritual, energy & ancestral healing). Two healers, one practice in Miami.',
  alternates: { canonical: '/team' },
  openGraph: { title: 'Our Team · Alchemized BioHealing Institute', description: 'Dr. Michael J. Meighen & Holistic Bella Vargas — two healers, one practice in Miami.' },
}

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return children
}

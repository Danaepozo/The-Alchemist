import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About · Where Science Meets Soul',
  description: 'Alchemized BioHealing Institute is a longevity & regenerative-medicine sanctuary in Coral Gables, Miami — the fusion of Dr. Michael J. Meighen and Holistic Bella Vargas. Proactive, evidence-based care for body and soul.',
  alternates: { canonical: '/about' },
  openGraph: { title: 'About · Alchemized BioHealing Institute', description: 'A longevity & regenerative-medicine sanctuary in Miami where science meets soul.' },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}

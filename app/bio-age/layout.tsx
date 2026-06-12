import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biological Age Calculator · Free Longevity Assessment',
  description: 'Discover your real biological age in 2 minutes with a free longevity assessment based on validated markers, through the clinical lens of Dr. Michael J. Meighen. Get a personalized report. Alchemized BioHealing Institute, Miami.',
  alternates: { canonical: '/bio-age' },
  openGraph: { title: 'Free Biological Age Calculator · Alchemized BioHealing Institute', description: 'Discover your real biological age in 2 minutes — free longevity assessment in Miami.' },
}

export default function BioAgeLayout({ children }: { children: React.ReactNode }) {
  return children
}

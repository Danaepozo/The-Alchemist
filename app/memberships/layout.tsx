import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Memberships · From $333 to Concierge Longevity',
  description: 'Wellness memberships from a $333 entry experience to the $10,000/year Human Restoration concierge medicine program. Every active member receives 30% off all services. Coral Gables, Miami.',
  alternates: { canonical: '/memberships' },
  openGraph: { title: 'Memberships · Alchemized BioHealing Institute', description: 'From a $333 entry experience to concierge longevity medicine. 30% off all services for members.' },
}

export default function MembershipsLayout({ children }: { children: React.ReactNode }) {
  return children
}

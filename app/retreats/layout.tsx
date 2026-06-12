import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Events & Retreats · Samaná Luxury Healing Retreat',
  description: 'Join the Samaná Luxury Healing Retreat in the Dominican Republic (Nov 11–16, 2026) — tree houses, beaches, yoga, bachata, healing workshops and the Luxury Healing Expo. Plus weekly healing events in Miami.',
  alternates: { canonical: '/retreats' },
  openGraph: { title: 'Events & Retreats · Alchemized BioHealing Institute', description: 'Samaná Luxury Healing Retreat (Nov 2026) + weekly healing events in Miami.' },
}

export default function RetreatsLayout({ children }: { children: React.ReactNode }) {
  return children
}

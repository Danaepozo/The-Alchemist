import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Apothecary · Physician-Curated Supplements & Rituals',
  description: 'Physician-curated supplements, longevity drops, regenerative skin elixirs and grounding rituals to continue your healing at home — from Alchemized BioHealing Institute, Miami.',
  alternates: { canonical: '/shop' },
  openGraph: { title: 'The Apothecary · Alchemized BioHealing Institute', description: 'Physician-curated supplements and rituals for home, from Alchemized BioHealing Institute.' },
}

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children
}

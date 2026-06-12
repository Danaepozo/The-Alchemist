// Shared content/data used across the home landing and the dedicated pages
// (About / Services / Team / Shop / Memberships).

export const SERVICES_MARQUEE = [
  'Precision Medicine', 'Peptide Therapy', 'Reiki Healing', 'NAD+ IV Therapy',
  'Chakra Balancing', 'Hormone Optimization', 'Sacred Ceremonies', 'Longevity Programs',
  'Somatic Healing', 'Epigenetic Testing', 'Ancestral Medicine', 'Biohacking Protocols',
]

// Minimal alchemical / sacred-geometry line icons, keyed by therapy id (catalog.ts)
export const THERAPY_ICONS: Record<string, string> = {
  'floatation-tanks': '<path d="M29 10c8 8 14 14 14 22a14 14 0 01-28 0c0-8 6-14 14-22z" stroke="currentColor" stroke-width="1.2" fill="none"/><path d="M20 33a9 9 0 0018 0" stroke="currentColor" stroke-width="1" fill="none"/>',
  'temperature-contrast': '<path d="M29 9v40M14 19l30 20M44 19L14 39M11 29h36" stroke="currentColor" stroke-width="1.2"/><circle cx="29" cy="29" r="5" stroke="currentColor" stroke-width="1.2"/>',
  'biowell-aoscan': '<circle cx="29" cy="29" r="19" stroke="currentColor" stroke-width="1.3"/><circle cx="29" cy="29" r="9" stroke="currentColor" stroke-width="1.1"/><circle cx="29" cy="29" r="2.2" fill="currentColor"/>',
  'recovery-tri-fusion': '<circle cx="29" cy="29" r="8" stroke="currentColor" stroke-width="1.3"/><g stroke="currentColor" stroke-width="1.1"><path d="M29 6v9M29 43v9M6 29h9M43 29h9M13 13l6 6M39 39l6 6M45 13l-6 6M19 39l-6 6"/></g>',
  'bio-sync-bed': '<path d="M29 14a15 15 0 010 30M29 19a10 10 0 010 20M29 24a5 5 0 010 10" stroke="currentColor" stroke-width="1.2" fill="none"/><circle cx="20" cy="29" r="2.2" fill="currentColor"/>',
  'biocharger': '<path d="M29 8l4 12 12 4-12 4-4 12-4-12-12-4 12-4z" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linejoin="round"/><circle cx="29" cy="29" r="3" stroke="currentColor" stroke-width="1"/>',
  'red-light-bed': '<circle cx="29" cy="29" r="8" stroke="currentColor" stroke-width="1.3"/><g stroke="currentColor" stroke-width="1.1"><path d="M29 8v8M29 42v8M8 29h8M42 29h8M15 15l5 5M38 38l5 5M43 15l-5 5M20 38l-5 5"/></g>',
  'pemf-ozone-sauna': '<path d="M29 9v40M14 19l30 20M44 19L14 39M11 29h36" stroke="currentColor" stroke-width="1.1" opacity="0.9"/><circle cx="29" cy="29" r="6" stroke="currentColor" stroke-width="1.2"/>',
  'holistic-electromagnetic-booster': '<path d="M29 8l4 12 12 4-12 4-4 12-4-12-12-4 12-4z" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linejoin="round"/><circle cx="29" cy="29" r="11" stroke="currentColor" stroke-width="0.8" opacity="0.5"/>',
}

export interface ShopProduct { id: string; name: string; desc: string; price: string; tag: string; icon: string }
export const SHOP_PRODUCTS: ShopProduct[] = [
  { id: 'cellular-renewal', name: 'Cellular Renewal Drops', desc: 'Liposomal glutathione + NAD⁺ precursors for daily cellular defense.', price: '$68', tag: 'Bestseller',
    icon: '<rect x="22" y="20" width="14" height="28" rx="4" stroke="currentColor" stroke-width="1.4"/><path d="M25 20v-5h8v5M29 9v4M26 11h6" stroke="currentColor" stroke-width="1.4"/><path d="M25 34h8" stroke="currentColor" stroke-width="1"/>' },
  { id: 'sacred-skin', name: 'Sacred Skin Elixir', desc: 'Botanical regenerative serum — peptides, ancestral oils & gold.', price: '$94', tag: '',
    icon: '<rect x="23" y="18" width="12" height="30" rx="3" stroke="currentColor" stroke-width="1.4"/><path d="M26 18v-4h6v4M29 6v6M27 9h4" stroke="currentColor" stroke-width="1.4"/><circle cx="29" cy="34" r="4" stroke="currentColor" stroke-width="1"/>' },
  { id: 'grounding-bath', name: 'Grounding Bath Ritual', desc: 'Magnesium salts infused with sacred herbs for nervous-system calm.', price: '$42', tag: '',
    icon: '<path d="M19 24h20l-2 22a3 3 0 01-3 3H24a3 3 0 01-3-3z" stroke="currentColor" stroke-width="1.4"/><path d="M17 24h24M24 24v-4h10v4" stroke="currentColor" stroke-width="1.4"/><path d="M27 33l2 2 4-4" stroke="currentColor" stroke-width="1"/>' },
  { id: 'inner-light', name: 'Inner Light Capsules', desc: 'Daily longevity, mood & energy support — clean, vegan formula.', price: '$58', tag: '',
    icon: '<rect x="20" y="16" width="18" height="32" rx="4" stroke="currentColor" stroke-width="1.4"/><path d="M20 26h18M24 16v-3h10v3" stroke="currentColor" stroke-width="1.4"/><circle cx="26" cy="35" r="1.5" fill="currentColor"/><circle cx="32" cy="40" r="1.5" fill="currentColor"/><circle cx="31" cy="32" r="1.5" fill="currentColor"/>' },
]

export interface ServiceCard { icon: string; title: string; desc: string; href: string }
export const SERVICE_CARDS: ServiceCard[] = [
  { icon: '🔬', title: 'Precision Medicine', desc: 'Root-cause diagnostics & personalized protocols', href: '/about/meighen' },
  { icon: '🧪', title: 'Advanced Diagnostics', desc: 'Epigenetic testing, hormone panels, microbiome', href: '/about/meighen' },
  { icon: '💉', title: 'IV Therapy', desc: 'NAD+, Glutathione, B12, Beauty & Longevity drips', href: '/about/meighen' },
  { icon: '🌀', title: 'Spiritual Healing', desc: 'Reiki, chakra balancing, somatic release', href: '/about/bella' },
  { icon: '🌿', title: 'Herbalism & Nature', desc: 'Ancestral plant medicine & natural remedies', href: '/about/bella' },
  { icon: '🔥', title: 'Retreats & Ceremonies', desc: 'Sacred ceremonies & luxury healing experiences', href: '/retreats' },
  { icon: '🌱', title: 'Regenerative Wellness', desc: 'Peptide therapy, longevity & performance', href: '/about/meighen' },
  { icon: '👑', title: 'Luxury Concierge', desc: 'Private, personalized wellness journeys', href: '/booking' },
]

export const FAQS = [
  { q: 'What is Alchemized BioHealing Institute?', a: 'A longevity and regenerative medicine sanctuary in Miami (Coral Gables) where regenerative medicine merges with sacred, ancestral healing and spiritual therapies. Founded by Dr. Michael J. Meighen and Holistic Bella Vargas — uniting body and soul, science and spirit.' },
  { q: 'Where is Alchemized BioHealing Institute located?', a: 'At 2970 Coral Way, Miami, FL 33145 (Centner Wellness, Coral Gables). Reach the team at +1 (305) 305-3820. We welcome you in English & Spanish.' },
  { q: 'What services and therapies do you offer?', a: 'Regenerative medicine, peptide therapy, hormone optimization, IV therapy & NAD+ drips, and bio-energetic therapies — red light therapy, cold plunge + infrared sauna, floatation tanks, Bio-Sync (Vemi) bed, BioCharger and HOCATT ozone sauna — plus spiritual & energy healing, breathwork and nervous-system regulation.' },
  { q: 'How much do memberships cost?', a: 'The entry experience is a one-time $333. Monthly memberships are Loving Myself $444/mo (1 person), Soulmates Dates $777/mo (2 people) and My Sacred Family $1,111/mo (4 people). All active members receive 30% off all services.' },
  { q: 'Do you offer IV therapy and NAD+ in Miami?', a: 'Yes. The Signature IV Collection offers preservative-free, physician-formulated drips across a Pain & Inflammation series and a Signature Alchemy series — including NAD+, glutathione, cellular renewal and longevity drips. Every IV includes a secret homeopathic blend.' },
  { q: 'What is the Nervous System & Longevity Program?', a: 'A physician-designed program by Dr. Meighen that regulates the nervous system and extends healthspan: HRV and stress evaluation, SGB consultation, IV and red light therapy, sound healing or meditation, breathwork, sleep optimization, a supplement protocol and lifestyle coaching.' },
  { q: 'Who are the founders of Alchemized BioHealing?', a: 'Dr. Michael J. Meighen — double board-certified, #1 Amazon best-seller of "A New You," 25+ years in regenerative medicine, peptides and hormones — and Holistic Bella Vargas, a Reiki Master and Harvard-certified happiness coach specializing in spiritual and ancestral healing.' },
]

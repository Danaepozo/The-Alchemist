import type { Metadata } from 'next'
import Link from 'next/link'

const SITE_URL = 'https://the-alchemist-danae.netlify.app'
const PATH = '/longevity-clinic-coral-gables'

export const metadata: Metadata = {
  title: 'Longevity Clinic in Coral Gables | Regenerative & Functional Medicine',
  description: 'Longevity clinic in Coral Gables, Miami. Alchemized BioHealing Institute blends regenerative & functional medicine, hormone optimization, peptides, IV therapy and biohacking with spiritual healing to extend your healthspan. Book a longevity consultation.',
  keywords: ['longevity clinic Coral Gables', 'longevity clinic Miami', 'longevity doctor Miami', 'regenerative medicine Coral Gables', 'functional medicine Miami', 'biohacking Miami', 'healthspan clinic Miami', 'anti-aging clinic Coral Gables', 'hormone optimization Miami', 'peptide therapy Miami'],
  alternates: { canonical: PATH },
  openGraph: {
    title: 'Longevity Clinic in Coral Gables | Alchemized BioHealing Institute',
    description: 'Regenerative & functional medicine, hormone optimization, peptides, IV therapy and biohacking to extend your healthspan. In Coral Gables, Miami.',
    url: `${SITE_URL}${PATH}`,
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
}

const FAQ = [
  { q: 'What does a longevity clinic do?', a: 'A longevity clinic focuses on extending your healthspan — the years you live in vibrant health — not just lifespan. At Alchemized BioHealing Institute we use advanced diagnostics, regenerative and functional medicine, hormone and metabolic optimization, peptides, IV therapy and biohacking, woven together with spiritual and nervous-system healing.' },
  { q: 'Where is your longevity clinic in Coral Gables?', a: 'We are located at 2970 Coral Way, Miami, FL 33145 (Centner Wellness, Coral Gables). Call +1 (305) 305-3820 to book a longevity consultation. We welcome you in English and Spanish.' },
  { q: 'Who leads the longevity program?', a: 'Dr. Michael J. Meighen — double board-certified with 25+ years and the #1 Amazon best-seller "A New You" — leads the clinical longevity program, alongside Holistic Bella Vargas for spiritual and energy healing.' },
]

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['MedicalBusiness', 'LocalBusiness'], '@id': `${SITE_URL}${PATH}/#clinic`,
        name: 'Alchemized BioHealing Institute — Longevity Clinic',
        description: 'Longevity clinic in Coral Gables offering regenerative & functional medicine, hormone optimization, peptides, IV therapy and biohacking to extend healthspan.',
        telephone: '+1-305-305-3820', priceRange: '$$$',
        medicalSpecialty: ['Regenerative Medicine', 'Functional Medicine', 'Longevity'],
        address: { '@type': 'PostalAddress', streetAddress: '2970 Coral Way', addressLocality: 'Miami', addressRegion: 'FL', postalCode: '33145', addressCountry: 'US' },
        geo: { '@type': 'GeoCoordinates', latitude: 25.7506, longitude: -80.2731 },
        areaServed: [{ '@type': 'City', name: 'Coral Gables' }, { '@type': 'City', name: 'Miami' }],
      },
      { '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Longevity Clinic Coral Gables', item: `${SITE_URL}${PATH}` },
      ] },
    ],
  }
  return (
    <main style={{ background: '#000', color: '#F0E8D8', minHeight: '100vh', fontFamily: 'Jost, sans-serif' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section style={{ maxWidth: 860, margin: '0 auto', padding: '120px 1.5rem 4rem' }}>
        <nav style={{ fontSize: '0.8rem', color: 'rgba(240,232,216,0.5)', marginBottom: '2rem' }}>
          <Link href="/" style={{ color: '#C9963C', textDecoration: 'none' }}>Alchemized BioHealing</Link> · Longevity Clinic Coral Gables
        </nav>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: 'clamp(2.2rem, 6vw, 3.6rem)', lineHeight: 1.15, marginBottom: '1.25rem' }}>
          Longevity Clinic in Coral Gables
        </h1>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'rgba(240,232,216,0.8)', marginBottom: '1.5rem' }}>
          Alchemized BioHealing Institute is a <strong style={{ color: '#E4B85A' }}>longevity clinic in Coral Gables, Miami</strong> where regenerative and functional medicine meet sacred, ancestral healing. We help you maximize your <em>healthspan</em> — not just your lifespan — through proactive, evidence-based, deeply personal care.
        </p>
        <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'rgba(240,232,216,0.7)', marginBottom: '2.5rem' }}>
          Led by Dr. Michael J. Meighen and Holistic Bella Vargas, our programs combine advanced diagnostics, hormone and metabolic optimization, peptides, <Link href="/nad-iv-therapy-miami" style={{ color: '#C9963C' }}>NAD+ IV therapy</Link>, red light, cold plunge and infrared sauna with breathwork and nervous-system regulation.
        </p>

        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: '1.9rem', color: '#C9963C', margin: '2rem 0 1rem' }}>What our longevity programs include</h2>
        <ul style={{ listStyle: 'none', padding: 0, lineHeight: 2, color: 'rgba(240,232,216,0.8)' }}>
          {['Comprehensive blood panels, epigenetics & biological-age testing', 'Hormone optimization & peptide therapy', 'Nervous System & Longevity program', 'Bio-energetic therapies & Signature IV drips', 'Spiritual assessment & inner trauma-resolution work'].map(s => (
            <li key={s}>✦ {s}</li>
          ))}
        </ul>

        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: '1.9rem', color: '#C9963C', margin: '2.5rem 0 1rem' }}>Frequently asked questions</h2>
        {FAQ.map(f => (
          <details key={f.q} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,150,60,0.18)', borderRadius: 4, padding: '1.1rem 1.4rem', marginBottom: '0.75rem' }}>
            <summary style={{ cursor: 'pointer', fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', color: '#F0E8D8' }}>{f.q}</summary>
            <p style={{ marginTop: '0.8rem', fontSize: '0.95rem', color: 'rgba(240,232,216,0.7)', lineHeight: 1.7 }}>{f.a}</p>
          </details>
        ))}

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2.5rem' }}>
          <Link href="/booking" style={{ background: 'linear-gradient(135deg, #C9963C, #E4B85A)', color: '#000', padding: '1rem 2.4rem', borderRadius: 2, textDecoration: 'none', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Book a longevity consult</Link>
          <Link href="/" style={{ border: '1px solid #C9963C', color: '#C9963C', padding: '1rem 2.4rem', borderRadius: 2, textDecoration: 'none', fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Explore the Institute</Link>
        </div>
        <p style={{ marginTop: '3rem', fontSize: '0.85rem', color: 'rgba(240,232,216,0.5)' }}>
          Alchemized BioHealing Institute · 2970 Coral Way, Miami, FL 33145 · <a href="tel:+13053053820" style={{ color: '#C9963C' }}>305-305-3820</a>
        </p>
        <p style={{ marginTop: '1.5rem', fontSize: '0.7rem', color: 'rgba(240,232,216,0.35)', lineHeight: 1.6 }}>
          This information is educational and is not medical advice, diagnosis or treatment. Consult Dr. Meighen or a qualified provider regarding your individual care.
        </p>
      </section>
    </main>
  )
}

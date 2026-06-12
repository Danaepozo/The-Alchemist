import type { Metadata } from 'next'
import Link from 'next/link'

const SITE_URL = 'https://the-alchemist-danae.netlify.app'
const PATH = '/nad-iv-therapy-miami'

export const metadata: Metadata = {
  title: 'NAD+ IV Therapy in Miami | NAD+ Drips & IV Vitamin Therapy',
  description: 'NAD+ IV therapy in Miami at Alchemized BioHealing Institute (Coral Gables). Preservative-free, physician-formulated NAD+, glutathione and longevity IV drips for energy, cellular renewal, recovery and healthy aging. Book your NAD+ drip in Miami.',
  keywords: ['NAD+ IV therapy Miami', 'NAD+ drip Miami', 'IV therapy Miami', 'IV vitamin therapy Miami', 'glutathione IV Miami', 'NAD+ Coral Gables', 'longevity IV Miami', 'myers cocktail Miami', 'IV drip Coral Gables'],
  alternates: { canonical: PATH },
  openGraph: {
    title: 'NAD+ IV Therapy in Miami | Alchemized BioHealing Institute',
    description: 'Preservative-free, physician-formulated NAD+ and longevity IV drips in Miami (Coral Gables). Energy, cellular renewal and healthy aging.',
    url: `${SITE_URL}${PATH}`,
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
}

const FAQ = [
  { q: 'What is NAD+ IV therapy?', a: 'NAD+ (nicotinamide adenine dinucleotide) is a coenzyme central to cellular energy and DNA repair. NAD+ IV therapy delivers it directly into the bloodstream for maximum absorption, supporting energy, mental clarity, recovery and healthy aging.' },
  { q: 'How much does NAD+ IV therapy cost in Miami?', a: 'Pricing depends on dose and protocol. NAD+ and longevity drips are part of our Signature IV Collection, and active members receive 30% off all services. Contact us at +1 (305) 305-3820 for current pricing.' },
  { q: 'Where can I get NAD+ IV therapy in Miami?', a: 'At Alchemized BioHealing Institute, 2970 Coral Way, Miami, FL 33145 (Centner Wellness, Coral Gables). Every IV is preservative-free, physician-formulated, and includes our secret homeopathic blend.' },
]

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalProcedure', '@id': `${SITE_URL}${PATH}/#service`,
        name: 'NAD+ IV Therapy', procedureType: 'https://schema.org/NoninvasiveProcedure',
        howPerformed: 'Intravenous infusion of NAD+, vitamins and a homeopathic blend',
        provider: { '@type': 'MedicalBusiness', name: 'Alchemized BioHealing Institute', telephone: '+1-305-305-3820', address: { '@type': 'PostalAddress', streetAddress: '2970 Coral Way', addressLocality: 'Miami', addressRegion: 'FL', postalCode: '33145', addressCountry: 'US' } },
        areaServed: [{ '@type': 'City', name: 'Miami' }, { '@type': 'City', name: 'Coral Gables' }],
      },
      { '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'NAD+ IV Therapy Miami', item: `${SITE_URL}${PATH}` },
      ] },
    ],
  }
  return (
    <main style={{ background: '#000', color: '#F0E8D8', minHeight: '100vh', fontFamily: 'Jost, sans-serif' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section style={{ maxWidth: 860, margin: '0 auto', padding: '120px 1.5rem 4rem' }}>
        <nav style={{ fontSize: '0.8rem', color: 'rgba(240,232,216,0.5)', marginBottom: '2rem' }}>
          <Link href="/" style={{ color: '#C9963C', textDecoration: 'none' }}>Alchemized BioHealing</Link> · NAD+ IV Therapy Miami
        </nav>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: 'clamp(2.2rem, 6vw, 3.6rem)', lineHeight: 1.15, marginBottom: '1.25rem' }}>
          NAD+ IV Therapy in Miami
        </h1>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'rgba(240,232,216,0.8)', marginBottom: '1.5rem' }}>
          Recharge at the cellular level with <strong style={{ color: '#E4B85A' }}>NAD+ IV therapy in Miami</strong> at Alchemized BioHealing Institute in Coral Gables. Our preservative-free, physician-formulated NAD+ and longevity drips support energy, mental clarity, recovery and healthy aging — where vanguard science meets the soul.
        </p>
        <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'rgba(240,232,216,0.7)', marginBottom: '2.5rem' }}>
          Part of our <Link href="/#ivs" style={{ color: '#C9963C' }}>Signature IV Collection</Link>, every drip is crafted by Dr. Michael J. Meighen and Holistic Bella Vargas and includes our secret homeopathic blend. Active members receive 30% off all services.
        </p>

        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: '1.9rem', color: '#C9963C', margin: '2rem 0 1rem' }}>NAD+ &amp; longevity drips we offer</h2>
        <ul style={{ listStyle: 'none', padding: 0, lineHeight: 2, color: 'rgba(240,232,216,0.8)' }}>
          {['Cellular Rebirth — deep detox + regeneration', 'Divine Energy IV — clean energy without the crash', 'Longevity Drip — anti-aging + cellular protection', 'The Regenerator — deep healing + full restoration', 'Vitality Code — daily energy + immune + longevity'].map(s => (
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
          <Link href="/booking" style={{ background: 'linear-gradient(135deg, #C9963C, #E4B85A)', color: '#000', padding: '1rem 2.4rem', borderRadius: 2, textDecoration: 'none', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Book your NAD+ drip</Link>
          <Link href="/" style={{ border: '1px solid #C9963C', color: '#C9963C', padding: '1rem 2.4rem', borderRadius: 2, textDecoration: 'none', fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Explore the Institute</Link>
        </div>
        <p style={{ marginTop: '3rem', fontSize: '0.85rem', color: 'rgba(240,232,216,0.5)' }}>
          Alchemized BioHealing Institute · 2970 Coral Way, Miami, FL 33145 · <a href="tel:+13053053820" style={{ color: '#C9963C' }}>305-305-3820</a>
        </p>
        <p style={{ marginTop: '1.5rem', fontSize: '0.7rem', color: 'rgba(240,232,216,0.35)', lineHeight: 1.6 }}>
          This information is educational and is not medical advice. IV therapies are complementary wellness care and not a substitute for emergency medical treatment. Consult Dr. Meighen regarding your individual care.
        </p>
      </section>
    </main>
  )
}

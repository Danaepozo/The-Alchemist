import Link from 'next/link'
import { SiteNav, SiteFooter } from '@/components/SiteChrome'
import LuminaChat from '@/components/LuminaChat'

const SITE_URL = 'https://alchemizedbiohealing.com'

export interface LandingData {
  path: string
  eyebrow: string
  h1: string
  /** Keyword-rich intro paragraphs */
  lead: string[]
  /** Content sections */
  sections: { h2: string; p: string[] }[]
  /** A bulleted list block */
  bullets: { h2: string; items: string[] }
  faq: { q: string; a: string }[]
  related: [string, string][]
  ctaLabel: string
  keywords: string
}

export default function LandingPage({ data }: { data: LandingData }) {
  const url = `${SITE_URL}${data.path}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage', '@id': `${url}#webpage`, url, name: data.h1,
        about: { '@type': 'MedicalBusiness', name: 'Alchemized BioHealing Institute', telephone: '+1-305-305-3820', address: { '@type': 'PostalAddress', streetAddress: '2970 Coral Way', addressLocality: 'Miami', addressRegion: 'FL', postalCode: '33145', addressCountry: 'US' } },
        keywords: data.keywords, inLanguage: ['en', 'es'], isPartOf: { '@id': `${SITE_URL}/#website` },
      },
      { '@type': 'FAQPage', mainEntity: data.faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: data.h1, item: url },
      ] },
    ],
  }

  return (
    <main style={{ background: '#000', color: '#F0E8D8', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteNav />

      <article style={{ maxWidth: 860, margin: '0 auto', padding: '8rem 1.5rem 4rem' }}>
        <nav style={{ fontSize: '0.78rem', color: 'rgba(240,232,216,0.5)', marginBottom: '1.5rem' }}>
          <Link href="/" style={{ color: '#C9963C', textDecoration: 'none' }}>Alchemized BioHealing</Link> · {data.eyebrow}
        </nav>
        <div style={{ fontSize: '0.72rem', letterSpacing: '0.28em', color: '#3DC898', textTransform: 'uppercase', marginBottom: '1rem' }}>{data.eyebrow}</div>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: 'clamp(2.2rem, 6vw, 3.6rem)', lineHeight: 1.12, marginBottom: '1.5rem', background: 'linear-gradient(135deg, #F0E8D8, #E4B85A, #C9963C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          {data.h1}
        </h1>
        {data.lead.map((p, i) => (
          <p key={i} style={{ fontSize: i === 0 ? '1.12rem' : '1rem', lineHeight: 1.85, color: 'rgba(240,232,216,0.82)', marginBottom: '1.4rem' }} dangerouslySetInnerHTML={{ __html: p }} />
        ))}

        {data.sections.map((s, i) => (
          <section key={i}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', color: '#C9963C', margin: '2.5rem 0 1rem' }}>{s.h2}</h2>
            {s.p.map((p, j) => <p key={j} style={{ fontSize: '1rem', lineHeight: 1.8, color: 'rgba(240,232,216,0.78)', marginBottom: '1rem' }} dangerouslySetInnerHTML={{ __html: p }} />)}
          </section>
        ))}

        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', color: '#C9963C', margin: '2.5rem 0 1rem' }}>{data.bullets.h2}</h2>
        <ul style={{ listStyle: 'none', padding: 0, lineHeight: 2, color: 'rgba(240,232,216,0.82)' }}>
          {data.bullets.items.map(it => <li key={it}>✦ {it}</li>)}
        </ul>

        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', color: '#C9963C', margin: '2.5rem 0 1rem' }}>Frequently asked questions</h2>
        {data.faq.map(f => (
          <details key={f.q} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,150,60,0.18)', borderRadius: 4, padding: '1.1rem 1.4rem', marginBottom: '0.75rem' }}>
            <summary style={{ cursor: 'pointer', fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', color: '#F0E8D8' }}>{f.q}</summary>
            <p style={{ marginTop: '0.8rem', fontSize: '0.95rem', color: 'rgba(240,232,216,0.7)', lineHeight: 1.7 }}>{f.a}</p>
          </details>
        ))}

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2.5rem' }}>
          <Link href="/booking" style={{ background: 'linear-gradient(135deg, #C9963C, #E4B85A)', color: '#000', padding: '1rem 2.4rem', borderRadius: 2, textDecoration: 'none', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{data.ctaLabel}</Link>
          <Link href="/bio-age" style={{ border: '1px solid #3DC898', color: '#3DC898', padding: '1rem 2.4rem', borderRadius: 2, textDecoration: 'none', fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Free Biological Age Test</Link>
        </div>

        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: '1.5rem', color: '#C9963C', margin: '3rem 0 1rem' }}>Explore more</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
          {data.related.map(([label, href]) => (
            <Link key={href} href={href} style={{ fontSize: '0.85rem', color: 'rgba(240,232,216,0.8)', textDecoration: 'none', border: '1px solid rgba(201,150,60,0.25)', borderRadius: 999, padding: '0.45rem 1rem' }}>{label} →</Link>
          ))}
        </div>

        <p style={{ marginTop: '3rem', fontSize: '0.85rem', color: 'rgba(240,232,216,0.5)' }}>
          Alchemized BioHealing Institute · 2970 Coral Way, Miami, FL 33145 · <a href="tel:+13053053820" style={{ color: '#C9963C' }}>305-305-3820</a> · We welcome you in English &amp; Spanish.
        </p>
        <p style={{ marginTop: '1.5rem', fontSize: '0.7rem', color: 'rgba(240,232,216,0.35)', lineHeight: 1.6 }}>
          This information is educational and is not medical advice, diagnosis or treatment. Wellness therapies are complementary and not intended to diagnose, treat, cure or prevent any disease. Consult Dr. Meighen or a qualified provider regarding your individual care.
        </p>
      </article>

      <SiteFooter />
      <LuminaChat />
    </main>
  )
}

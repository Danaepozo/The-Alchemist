import Link from 'next/link'
import { SiteNav, SiteFooter } from '@/components/SiteChrome'
import LuminaChat from '@/components/LuminaChat'

export type LegalSection = { h: string; p: string[] }

export function LegalDoc({
  titleEn, titleEs, updated, en, es,
}: {
  titleEn: string
  titleEs: string
  updated: string
  en: LegalSection[]
  es: LegalSection[]
}) {
  const block = (title: string, langLabel: string, sections: LegalSection[]) => (
    <section style={{ marginBottom: '3.5rem' }}>
      <div style={{ fontSize: '0.72rem', letterSpacing: '0.28em', color: '#3DC898', textTransform: 'uppercase', marginBottom: '0.8rem' }}>{langLabel}</div>
      <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.12, marginBottom: '0.6rem', background: 'linear-gradient(135deg, #F0E8D8, #E4B85A, #C9963C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{title}</h1>
      <p style={{ fontSize: '0.82rem', color: 'rgba(240,232,216,0.4)', marginBottom: '2rem' }}>{updated}</p>
      {sections.map((s, i) => (
        <div key={i} style={{ marginBottom: '1.8rem' }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: 'clamp(1.35rem, 3vw, 1.7rem)', color: '#C9963C', margin: '0 0 0.6rem' }}>{s.h}</h2>
          {s.p.map((para, j) => (
            <p key={j} style={{ fontSize: '0.98rem', lineHeight: 1.8, color: 'rgba(240,232,216,0.8)', marginBottom: '0.8rem' }}>{para}</p>
          ))}
        </div>
      ))}
    </section>
  )

  return (
    <main style={{ background: '#000', color: '#F0E8D8', minHeight: '100vh', fontFamily: 'Jost, sans-serif' }}>
      <SiteNav />
      <article style={{ maxWidth: 780, margin: '0 auto', padding: '8rem 1.5rem 4rem' }}>
        {block(titleEn, 'English', en)}
        <div style={{ borderTop: '1px solid rgba(201,150,60,0.2)', margin: '0 0 3.5rem' }} />
        {block(titleEs, 'Español', es)}
        <p style={{ fontSize: '0.85rem', color: 'rgba(240,232,216,0.5)', marginTop: '2rem' }}>
          Alchemized BioHealing Institute · 2970 Coral Way, Miami, FL 33145 · <a href="mailto:hola@alchemizedbiohealing.com" style={{ color: '#C9963C' }}>hola@alchemizedbiohealing.com</a> · <a href="tel:+13053053820" style={{ color: '#C9963C' }}>305-305-3820</a>
        </p>
        <p style={{ marginTop: '1rem' }}><Link href="/" style={{ color: '#3DC898', textDecoration: 'none', fontSize: '0.85rem' }}>← Home</Link></p>
      </article>
      <SiteFooter />
      <LuminaChat />
    </main>
  )
}

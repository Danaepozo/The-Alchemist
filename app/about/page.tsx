'use client'

import Link from 'next/link'
import { SiteNav, SiteFooter } from '@/components/SiteChrome'
import LuminaChat from '@/components/LuminaChat'

const PILLARS = [
  { k: 'Science', d: 'Regenerative & functional medicine, advanced diagnostics, hormones and peptides — grounded in evidence.' },
  { k: 'Spirit', d: 'Reiki, ancestral medicine, chakra and energy work, and the nervous-system regulation the body craves.' },
  { k: 'Luxury', d: 'A private, unhurried sanctuary in Coral Gables — concierge care designed around you.' },
  { k: 'Connection', d: 'Two practitioners, one team that knows your story and walks the journey beside you.' },
]

export default function AboutPage() {
  return (
    <main style={{ background: '#000', color: '#F0E8D8', minHeight: '100vh' }}>
      <SiteNav />

      <section style={{ padding: '9rem 2rem 4rem', textAlign: 'center', maxWidth: '820px', margin: '0 auto' }}>
        <div style={{ position: 'relative', width: '150px', height: '150px', margin: '0 auto 2.5rem' }}>
          {[0, 20, 40].map((inset, i) => (
            <div key={inset} style={{ position: 'absolute', inset: `${inset}px`, border: '1px solid rgba(201,150,60,0.5)', borderRadius: '50%', animation: `pulse-ring 3s ease-in-out infinite ${i * 0.5}s` }} />
          ))}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.4rem', color: '#C9963C' }}>☿</div>
        </div>
        <div style={{ fontSize: '0.75rem', letterSpacing: '0.3em', color: '#C9963C', textTransform: 'uppercase', marginBottom: '1rem' }}>About the Institute</div>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.2rem, 6vw, 3.6rem)', fontWeight: 300, lineHeight: 1.15, marginBottom: '1.5rem' }}>Where Science Meets Soul</h1>
        <p style={{ fontSize: '1.08rem', color: 'rgba(240,232,216,0.72)', lineHeight: 1.85 }}>
          Alchemized BioHealing Institute is a longevity and regenerative-medicine sanctuary in Coral Gables, Miami — the fusion of <strong style={{ color: '#3DC898' }}>Dr. Michael J. Meighen</strong> and holistic practitioner <strong style={{ color: '#E06090' }}>Bella Vargas</strong>. We blend precision medicine with sacred, ancestral healing so that body and soul are treated as one. Proactive, not reactive. Evidence-based, beyond the allopathic. Designed to maximize not just your lifespan, but your <em>healthspan</em> and vitality.
        </p>
      </section>

      {/* Pillars */}
      <section style={{ padding: '3rem 2rem 5rem', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
          {PILLARS.map(p => (
            <div key={p.k} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,150,60,0.18)', borderRadius: '6px', padding: '2rem 1.75rem', textAlign: 'center' }}>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: '#C9963C', marginBottom: '0.7rem' }}>{p.k}</h3>
              <p style={{ fontSize: '0.86rem', color: 'rgba(240,232,216,0.6)', lineHeight: 1.65 }}>{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story teaser */}
      <section style={{ padding: '5rem 2rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(201,150,60,0.1)', borderBottom: '1px solid rgba(201,150,60,0.1)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ width: 'min(420px, 88vw)', margin: '0 auto 2.5rem', borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(201,150,60,0.3)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
            <img src="/photos/duo-portrait.jpg" alt="Holistic Bella and Dr. Michael J. Meighen" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.9rem, 5vw, 3rem)', fontWeight: 300, marginBottom: '1.25rem' }}>Two Healers. One Practice.</h2>
          <p style={{ color: 'rgba(240,232,216,0.7)', lineHeight: 1.8, fontSize: '1.02rem', marginBottom: '2.2rem' }}>
            It was born from two very different stories that arrived at the same truth: <em>healing is whole only when science and soul move together.</em>
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/team" style={{ background: 'linear-gradient(135deg, #C9963C, #E4B85A)', color: '#000', padding: '1rem 2.4rem', borderRadius: '2px', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Meet the Team →</Link>
            <Link href="/services" style={{ background: 'transparent', color: '#C9963C', padding: '1rem 2.4rem', border: '1px solid #C9963C', borderRadius: '2px', textDecoration: 'none', fontSize: '0.82rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Explore Services</Link>
          </div>
        </div>
      </section>

      <SiteFooter />
      <LuminaChat />
    </main>
  )
}

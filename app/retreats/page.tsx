'use client'

import Link from 'next/link'
import { useState } from 'react'

const GOLD = '#C9963C'
const CREAM = '#F0E8D8'

export default function RetreatsPage() {
  const [es, setEs] = useState(true)
  const t = es ? ES : EN

  return (
    <div style={{ minHeight: '100vh', background: 'radial-gradient(ellipse at 50% -5%, #16321f 0%, #0a140d 45%, #060a07 100%)', color: CREAM }}>
      {/* top bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem' }}>
        <Link href="/" style={{ color: 'rgba(240,232,216,0.6)', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.1em' }}>← Alchemized BioHealing</Link>
        <button onClick={() => setEs(!es)} style={{ background: 'none', border: '1px solid rgba(201,150,60,0.4)', color: GOLD, borderRadius: 4, padding: '0.35rem 0.8rem', fontSize: '0.75rem', cursor: 'pointer' }}>{es ? 'EN' : 'ES'}</button>
      </div>

      {/* hero */}
      <header style={{ textAlign: 'center', padding: '2.5rem 1.5rem 3rem', maxWidth: 820, margin: '0 auto' }}>
        <div style={{ fontSize: '0.72rem', letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase', marginBottom: '1rem' }}>Luxury Healing Expo</div>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(3rem, 11vw, 6rem)', fontWeight: 300, letterSpacing: '0.06em', lineHeight: 1, margin: 0, background: 'linear-gradient(135deg, #F0E8D8, #C9963C, #E4B85A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          {t.title}
        </h1>
        <p style={{ fontSize: '1.1rem', letterSpacing: '0.1em', color: 'rgba(240,232,216,0.75)', marginTop: '1rem', textTransform: 'uppercase' }}>{t.tagline}</p>
        <div style={{ marginTop: '1.75rem', display: 'inline-block', border: '1px solid rgba(201,150,60,0.4)', borderRadius: 8, padding: '0.9rem 1.75rem' }}>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: GOLD }}>{t.dates}</div>
          <div style={{ fontSize: '0.78rem', letterSpacing: '0.15em', color: 'rgba(240,232,216,0.5)', textTransform: 'uppercase' }}>{t.daysLine} · Samaná, 🇩🇴</div>
        </div>
      </header>

      {/* what's included */}
      <section style={{ maxWidth: 920, margin: '0 auto', padding: '1rem 1.5rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.9rem' }}>
          {t.includes.map((it, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,150,60,0.18)', borderRadius: 8, padding: '1rem 1.1rem' }}>
              <span style={{ color: GOLD, fontSize: '1.1rem' }}>{it.icon}</span>
              <span style={{ fontSize: '0.92rem', color: 'rgba(240,232,216,0.85)', lineHeight: 1.5 }}>{it.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* intention */}
      <section style={{ maxWidth: 720, margin: '0 auto', padding: '2rem 1.5rem', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.4rem, 4vw, 2rem)', fontStyle: 'italic', fontWeight: 300, lineHeight: 1.5, color: 'rgba(240,232,216,0.92)' }}>
          {t.intention}
        </p>
      </section>

      {/* pricing */}
      <section style={{ maxWidth: 820, margin: '0 auto', padding: '2rem 1.5rem 1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          {[{ k: t.pricePrivateLabel, v: '$3,888', s: t.priceSub }, { k: t.priceSharedLabel, v: '$2,888', s: t.priceSub }].map((p, i) => (
            <div key={i} style={{ textAlign: 'center', background: 'rgba(201,150,60,0.06)', border: '1px solid rgba(201,150,60,0.3)', borderRadius: 10, padding: '1.75rem' }}>
              <div style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: GOLD }}>{p.k}</div>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.6rem', color: CREAM, margin: '0.5rem 0 0.25rem' }}>{p.v} <span style={{ fontSize: '1rem', color: 'rgba(240,232,216,0.5)' }}>USD</span></div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(240,232,216,0.5)' }}>{p.s}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: '#3DC898' }}>✓ {t.payment}</div>
      </section>

      {/* CTA */}
      <section style={{ textAlign: 'center', padding: '2.5rem 1.5rem 4rem' }}>
        <a href="https://wa.me/13053053820" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', background: 'linear-gradient(135deg, #C9963C, #E4B85A)', color: '#1a1020', padding: '1.1rem 3rem', borderRadius: 4, textDecoration: 'none', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          {t.cta}
        </a>
        <div style={{ marginTop: '1.25rem', fontSize: '0.85rem', color: 'rgba(240,232,216,0.55)' }}>
          ☎ 305-305-3820 · 📷 @holisticbellamedicine · @alchemizedbiohealinginstitute
        </div>
        <p style={{ marginTop: '1.5rem', fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', fontStyle: 'italic', color: GOLD }}>{t.closer}</p>
      </section>
    </div>
  )
}

const EN = {
  title: 'SAMANÁ',
  tagline: 'Reconnect · Renew · Return to You',
  dates: 'November 11–16, 2026',
  daysLine: '6 days to live in freedom',
  includes: [
    { icon: '🏝️', text: 'Mountain tree houses with ocean & jungle views' },
    { icon: '💛', text: 'Reconnect with your inner child' },
    { icon: '🌊', text: 'Paradise beaches, rivers, nature & adventure' },
    { icon: '🧘', text: 'Daily yoga & meditation' },
    { icon: '🍃', text: 'Healthy gourmet meals' },
    { icon: '🔥', text: 'Healing workshops & nervous-system regulation' },
    { icon: '💃', text: 'Bachata classes under the stars' },
    { icon: '✨', text: 'The Luxury Healing Expo — and much more' },
  ],
  intention: '“This is not just a vacation. It is an experience designed to reconnect you with yourself, regulate your nervous system, and remember how good it feels to be alive.”',
  pricePrivateLabel: 'Private Tree House',
  priceSharedLabel: 'Shared Tree House',
  priceSub: 'Accommodation · 6 days',
  payment: 'Payment plans available — reserve with only $500 USD.',
  cta: 'Secure your spot today',
  closer: 'It’s not just a retreat. It’s a transformation.',
}

const ES = {
  title: 'SAMANÁ',
  tagline: 'Reconéctate · Renuévate · Regresa a Ti',
  dates: 'Del 11 al 16 de Noviembre, 2026',
  daysLine: '6 días para vivir en libertad',
  includes: [
    { icon: '🏝️', text: 'Casas en los árboles con vista al mar y la selva' },
    { icon: '💛', text: 'Conecta con tu niño interior' },
    { icon: '🌊', text: 'Playas paradísiacas, ríos, naturaleza y aventura' },
    { icon: '🧘', text: 'Yoga y meditación diaria' },
    { icon: '🍃', text: 'Comidas gourmet saludables' },
    { icon: '🔥', text: 'Talleres de sanación y regulación del sistema nervioso' },
    { icon: '💃', text: 'Clases de Bachata bajo las estrellas' },
    { icon: '✨', text: 'El Luxury Healing Expo — y mucho más' },
  ],
  intention: '“Esto no es solo unas vacaciones. Es una experiencia diseñada para reconectar con tu niño interior, regular tu sistema nervioso y recordar lo bien que se siente estar vivo.”',
  pricePrivateLabel: 'Casa Privada en el Árbol',
  priceSharedLabel: 'Casa Compartida',
  priceSub: 'Alojamiento · 6 días',
  payment: 'Planes de pago disponibles — reserva con solo $500 USD.',
  cta: 'Reserva tu lugar hoy',
  closer: 'No es solo un retiro. Es una transformación.',
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signatureIVs, IV_SERIES, SECRET_BLEND_NOTE } from '@/lib/alchemist/catalog'

export default function IVMenu() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <section id="iv-menu" style={{ padding: '7rem 2rem', maxWidth: 1180, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <div style={{ fontSize: '0.75rem', letterSpacing: '0.3em', color: '#C9963C', textTransform: 'uppercase', marginBottom: '1rem' }}>Signature IV Collection</div>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 300, lineHeight: 1.15 }}>
          IV Therapy for Longevity &amp; Biohacking
        </h2>
        <p style={{ color: 'rgba(240,232,216,0.6)', marginTop: '1rem', maxWidth: 620, margin: '1rem auto 0', lineHeight: 1.7 }}>
          Homeopathic, preservative-free nutrient IVs in Miami — for energy, recovery, inflammation, performance and cellular longevity. <em>Tap any drip to reveal what&rsquo;s inside.</em>
        </p>
        <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#3DC898', letterSpacing: '0.05em' }}>✦ {SECRET_BLEND_NOTE}</div>
      </div>

      {IV_SERIES.map(series => (
        <div key={series.id} style={{ marginTop: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
            <span style={{ fontSize: '1.3rem', color: series.accent }}>{series.glyph}</span>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 400, color: series.accent, letterSpacing: '0.08em' }}>{series.label}</h3>
            <span style={{ fontSize: '1.3rem', color: series.accent }}>{series.glyph}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {signatureIVs.filter(iv => iv.series === series.id).map(iv => {
              const isOpen = open === iv.id
              return (
                <div key={iv.id}
                  onClick={() => setOpen(isOpen ? null : iv.id)}
                  style={{
                    background: isOpen ? 'rgba(201,150,60,0.07)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${isOpen ? series.accent : 'rgba(201,150,60,0.18)'}`,
                    borderRadius: 8, padding: '1.4rem 1.5rem', cursor: 'pointer', transition: 'all 0.2s',
                  }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
                    <div>
                      <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', color: '#F0E8D8' }}>{iv.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'rgba(240,232,216,0.55)', marginTop: '0.2rem', fontStyle: 'italic' }}>{iv.tagline}</div>
                    </div>
                    <span style={{ color: series.accent, fontSize: '1.1rem', transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>＋</span>
                  </div>

                  {isOpen && (
                    <div style={{ marginTop: '1.1rem', paddingTop: '1.1rem', borderTop: `1px solid rgba(201,150,60,0.2)` }}>
                      <div style={{ fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: series.accent, marginBottom: '0.6rem' }}>Inside this drip</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.9rem' }}>
                        {iv.ingredients.map(ing => (
                          <span key={ing} style={{ fontSize: '0.72rem', color: 'rgba(240,232,216,0.8)', background: 'rgba(201,150,60,0.08)', border: '1px solid rgba(201,150,60,0.2)', borderRadius: 20, padding: '0.25rem 0.7rem' }}>{ing}</span>
                        ))}
                        <span style={{ fontSize: '0.72rem', color: '#3DC898', background: 'rgba(61,200,152,0.08)', border: '1px solid rgba(61,200,152,0.25)', borderRadius: 20, padding: '0.25rem 0.7rem' }}>✦ Secret homeopathic blend</span>
                      </div>
                      <Link href="/booking" onClick={e => e.stopPropagation()} style={{ display: 'inline-block', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#000', background: `linear-gradient(135deg, ${series.accent}, #E4B85A)`, padding: '0.55rem 1.25rem', borderRadius: 3, textDecoration: 'none', fontWeight: 700 }}>Book this drip →</Link>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}

      <p style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '0.78rem', color: 'rgba(240,232,216,0.35)', lineHeight: 1.7, maxWidth: 600, margin: '2.5rem auto 0' }}>
        Pricing for public clients shared on request. Members enjoy monthly IVs and member rates as part of the <Link href="#memberships" style={{ color: '#C9963C', textDecoration: 'none' }}>Inner Alchemy</Link> longevity membership.
      </p>
    </section>
  )
}

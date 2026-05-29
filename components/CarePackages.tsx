'use client'

import { useState } from 'react'
import Link from 'next/link'
import { carePackages } from '@/lib/alchemist/catalog'

export default function CarePackages() {
  const [open, setOpen] = useState<string | null>(carePackages[0]?.id ?? null)

  return (
    <section id="programs" style={{ padding: '7rem 2rem', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem', maxWidth: 680, marginLeft: 'auto', marginRight: 'auto' }}>
        <div style={{ fontSize: '0.75rem', letterSpacing: '0.3em', color: '#C9963C', textTransform: 'uppercase', marginBottom: '1rem' }}>Signature Programs</div>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 300, lineHeight: 1.15 }}>
          Longevity, Performance &amp; Aesthetic Medicine
        </h2>
        <p style={{ color: 'rgba(240,232,216,0.65)', marginTop: '1rem', lineHeight: 1.7 }}>
          Designed and delivered by Bella &amp; Dr. Meighen <strong style={{ color: '#C9963C' }}>together</strong> — the clinical and the spiritual woven into one journey. Tap a program to see everything inside.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {carePackages.map(pkg => {
          const isOpen = open === pkg.id
          return (
            <div key={pkg.id}
              onClick={() => setOpen(isOpen ? null : pkg.id)}
              style={{
                background: isOpen ? 'rgba(201,150,60,0.06)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${isOpen ? '#C9963C' : 'rgba(201,150,60,0.2)'}`,
                borderRadius: 10, padding: '1.6rem 1.9rem', cursor: 'pointer', transition: 'all 0.2s',
              }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                <div>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: '#C9963C' }}>{pkg.name}</div>
                  <div style={{ fontSize: '0.9rem', color: 'rgba(240,232,216,0.6)', marginTop: '0.25rem', fontStyle: 'italic' }}>{pkg.tagline}</div>
                </div>
                <span style={{ color: '#C9963C', fontSize: '1.3rem', transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>＋</span>
              </div>

              {isOpen && (
                <div style={{ marginTop: '1.4rem', paddingTop: '1.4rem', borderTop: '1px solid rgba(201,150,60,0.2)' }}>
                  {pkg.bridges && (
                    <div style={{ fontSize: '0.82rem', color: '#3DC898', marginBottom: '1rem', letterSpacing: '0.03em' }}>✦ {pkg.bridges}</div>
                  )}
                  <div style={{ fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9963C', marginBottom: '0.9rem' }}>What&rsquo;s included</div>
                  <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.5rem 1.5rem', marginBottom: '1.25rem' }}>
                    {pkg.includes.map(item => (
                      <li key={item} style={{ fontSize: '0.88rem', color: 'rgba(240,232,216,0.82)', lineHeight: 1.5, paddingLeft: '1.1rem', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0, color: '#C9963C' }}>✦</span>{item}
                      </li>
                    ))}
                  </ul>
                  {pkg.note && (
                    <p style={{ fontSize: '0.8rem', color: 'rgba(240,232,216,0.5)', fontStyle: 'italic', marginBottom: '1.25rem', lineHeight: 1.6 }}>{pkg.note}</p>
                  )}
                  <Link href="/booking" onClick={e => e.stopPropagation()} style={{ display: 'inline-block', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#000', background: 'linear-gradient(135deg, #C9963C, #E4B85A)', padding: '0.7rem 1.75rem', borderRadius: 3, textDecoration: 'none', fontWeight: 700 }}>Apply / Book a consultation →</Link>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <p style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '0.85rem', color: 'rgba(240,232,216,0.55)', maxWidth: 620, margin: '2.5rem auto 0', lineHeight: 1.7 }}>
        Every program pairs Dr. Meighen&rsquo;s regenerative &amp; longevity medicine with Bella&rsquo;s nervous-system and soul work. <Link href="/lyra" style={{ color: '#E06090', textDecoration: 'none' }}>Begin with a soul reading from Lyra</Link> or <Link href="/assessment" style={{ color: '#C9963C', textDecoration: 'none' }}>take your assessment</Link> — every path leads to the program that fits you.
      </p>
    </section>
  )
}

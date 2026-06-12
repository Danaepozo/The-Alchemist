'use client'

import Link from 'next/link'
import { SiteNav, SiteFooter } from '@/components/SiteChrome'
import LuminaChat from '@/components/LuminaChat'
import { membershipCards, HUMAN_RESTORATION, SPECIAL_OFFER } from '@/lib/alchemist/catalog'

export default function MembershipsPage() {
  return (
    <main style={{ background: '#000', color: '#F0E8D8', minHeight: '100vh' }}>
      <SiteNav />

      {/* Membership tiers */}
      <section style={{ padding: '8rem 2rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ fontSize: '0.75rem', letterSpacing: '0.3em', color: '#C9963C', textTransform: 'uppercase', marginBottom: '1rem' }}>Invest in Yourself</div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.2rem, 5.5vw, 3.4rem)', fontWeight: 300 }}>Membership Tiers</h1>
          <p style={{ color: 'rgba(240,232,216,0.6)', marginTop: '1rem', maxWidth: '520px', margin: '1rem auto 0' }}>Every journey begins with a single alchemy. All active members receive 30% off all services.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
          {membershipCards.map((tier: any) => (
            <div key={tier.name} style={{ background: tier.featured ? 'linear-gradient(180deg, #13100A, #0B0B0B)' : 'rgba(255,255,255,0.02)', border: `1px solid ${tier.featured ? 'rgba(201,150,60,0.55)' : 'rgba(201,150,60,0.2)'}`, borderRadius: '4px', padding: '2rem', position: 'relative', overflow: tier.featured ? 'visible' : 'hidden', transform: tier.featured ? 'scale(1.02)' : 'scale(1)', boxShadow: tier.featured ? '0 0 50px rgba(201,150,60,0.18)' : 'none' }}>
              {tier.featured && (
                <div style={{ position: 'absolute', top: '-13px', left: '50%', transform: 'translateX(-50%)', background: '#000', border: '1px solid rgba(201,150,60,0.45)', borderRadius: '30px', padding: '0.25rem 0.85rem', display: 'flex', alignItems: 'center', gap: '0.45rem', whiteSpace: 'nowrap' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M3 7l4 5 5-7 5 7 4-5v11H3z" stroke="#E4B85A" strokeWidth="1.4" fill="none" /></svg>
                  <span style={{ color: '#E4B85A', fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Most Chosen</span>
                </div>
              )}
              {tier.exclusive && <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', border: '1px solid #C9963C', color: '#C9963C', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', padding: '0.2rem 0.5rem', borderRadius: '2px', textTransform: 'uppercase' }}>Invite Only</div>}
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.15rem', color: tier.color, marginBottom: '0.75rem' }}>{tier.name}</div>
              <div style={{ marginBottom: '0.5rem' }}>
                <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', color: '#F0E8D8' }}>{tier.price}</span>
                {tier.original && <span style={{ fontSize: '0.8rem', color: 'rgba(240,232,216,0.4)', textDecoration: 'line-through', marginLeft: '0.5rem' }}>{tier.original}</span>}
              </div>
              {tier.promo && <div style={{ fontSize: '0.75rem', color: '#3DC898', marginBottom: '0.25rem' }}>✦ {tier.promo}</div>}
              <div style={{ fontSize: '0.7rem', color: 'rgba(240,232,216,0.4)', marginBottom: '1.25rem', fontStyle: 'italic' }}>{tier.note}</div>
              <p style={{ fontSize: '0.82rem', color: 'rgba(240,232,216,0.6)', lineHeight: 1.6, marginBottom: '1.25rem' }}>{tier.desc}</p>
              <ul style={{ listStyle: 'none', fontSize: '0.78rem', lineHeight: 1.9, color: 'rgba(240,232,216,0.7)' }}>
                {tier.features.map((f: string) => <li key={f}>✦ {f}</li>)}
              </ul>
              <Link href="/booking" style={{ display: 'block', marginTop: '1.5rem', textAlign: 'center', padding: '0.65rem', border: `1px solid ${tier.color}`, color: tier.color, borderRadius: '2px', textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Begin →</Link>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', color: 'rgba(240,232,216,0.55)', fontSize: '0.9rem', marginTop: '2.5rem', maxWidth: 640, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7 }}>
          ✦ {SPECIAL_OFFER.headline}. {SPECIAL_OFFER.perk}
        </p>
      </section>

      {/* Human Restoration flagship */}
      <section style={{ padding: '4rem 2rem 7rem', position: 'relative', background: 'radial-gradient(ellipse at top, rgba(201,150,60,0.09) 0%, transparent 60%)', borderTop: '1px solid rgba(201,150,60,0.12)' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.2rem' }}>
            <div style={{ fontSize: '0.72rem', letterSpacing: '0.32em', color: '#C9963C', textTransform: 'uppercase', marginBottom: '0.9rem' }}>Flagship · Concierge Medicine &amp; Longevity</div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.2rem, 5.5vw, 3.6rem)', fontWeight: 300, lineHeight: 1.1, background: 'linear-gradient(135deg, #F0E8D8, #C9963C, #3DC898)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{HUMAN_RESTORATION.name}</h2>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '1.25rem', color: '#E4B85A', margin: '0.7rem 0 1.2rem' }}>{HUMAN_RESTORATION.tagline}</p>
            <p style={{ fontSize: '1rem', color: 'rgba(240,232,216,0.7)', maxWidth: 660, margin: '0 auto', lineHeight: 1.8 }}>{HUMAN_RESTORATION.intro}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.6rem', alignItems: 'start' }}>
            {HUMAN_RESTORATION.tiers.map(tier => (
              <div key={tier.id} style={{ background: tier.featured ? 'linear-gradient(180deg, #14110A, #0B0B0B)' : 'rgba(255,255,255,0.02)', border: `1px solid ${tier.featured ? 'rgba(201,150,60,0.55)' : 'rgba(201,150,60,0.22)'}`, borderRadius: '6px', padding: '2.3rem 2rem', position: 'relative', boxShadow: tier.featured ? '0 0 60px rgba(201,150,60,0.16)' : 'none' }}>
                {tier.featured && (
                  <div style={{ position: 'absolute', top: '-13px', left: '50%', transform: 'translateX(-50%)', background: '#000', border: '1px solid rgba(201,150,60,0.5)', borderRadius: '30px', padding: '0.25rem 0.95rem', whiteSpace: 'nowrap' }}>
                    <span style={{ color: '#E4B85A', fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase' }}>★ Most Comprehensive</span>
                  </div>
                )}
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', color: '#C9963C', marginBottom: '0.6rem' }}>{tier.name}</div>
                <div style={{ marginBottom: '0.3rem' }}>
                  <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.6rem', color: '#F0E8D8' }}>{tier.price}</span>
                  <span style={{ fontSize: '0.82rem', color: 'rgba(240,232,216,0.5)', marginLeft: '0.5rem' }}>{tier.billing}</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(240,232,216,0.4)', marginBottom: '1.4rem', fontStyle: 'italic' }}>{tier.note}</div>
                <ul style={{ listStyle: 'none', fontSize: '0.82rem', lineHeight: 1.95, color: 'rgba(240,232,216,0.78)', padding: 0, margin: 0 }}>
                  {tier.features.map(f => <li key={f} style={{ marginBottom: '0.15rem' }}><span style={{ color: '#3DC898' }}>✓</span> {f}</li>)}
                </ul>
                <Link href="/booking" style={{ display: 'block', marginTop: '1.8rem', textAlign: 'center', padding: '0.8rem', background: tier.featured ? 'linear-gradient(135deg, #C9963C, #E4B85A)' : 'transparent', border: '1px solid #C9963C', color: tier.featured ? '#000' : '#C9963C', borderRadius: '2px', textDecoration: 'none', fontSize: '0.76rem', fontWeight: tier.featured ? 700 : 400, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Apply / Begin →</Link>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '3.2rem', textAlign: 'center', maxWidth: 760, marginLeft: 'auto', marginRight: 'auto' }}>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.7rem', fontWeight: 300, color: '#E4B85A', marginBottom: '1.2rem' }}>{HUMAN_RESTORATION.difference.title}</h3>
            {HUMAN_RESTORATION.difference.body.map((p, i) => (
              <p key={i} style={{ fontSize: '0.98rem', color: 'rgba(240,232,216,0.7)', lineHeight: 1.85, marginBottom: '1rem' }}>{p}</p>
            ))}
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '1.35rem', color: '#C9963C', marginTop: '1.8rem', lineHeight: 1.4 }}>{HUMAN_RESTORATION.difference.closing}</p>
          </div>
        </div>
      </section>

      <SiteFooter />
      <LuminaChat />
    </main>
  )
}

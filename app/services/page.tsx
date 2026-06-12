'use client'

import Link from 'next/link'
import { SiteNav, SiteFooter } from '@/components/SiteChrome'
import LuminaChat from '@/components/LuminaChat'
import IVMenu from '@/components/IVMenu'
import CarePackages from '@/components/CarePackages'
import { therapies, protocols, citations, therapiesWithEvidence, SPECIAL_OFFER } from '@/lib/alchemist/catalog'
import { SERVICE_CARDS, THERAPY_ICONS } from '@/lib/alchemist/site-content'

export default function ServicesPage() {
  return (
    <main style={{ background: '#000', color: '#F0E8D8', minHeight: '100vh' }}>
      <SiteNav />

      {/* Service categories */}
      <section style={{ padding: '8rem 2rem 3rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ fontSize: '0.75rem', letterSpacing: '0.3em', color: '#C9963C', textTransform: 'uppercase', marginBottom: '1rem' }}>What We Offer</div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.2rem, 5.5vw, 3.4rem)', fontWeight: 300 }}>Our Services</h1>
          <p style={{ color: 'rgba(240,232,216,0.6)', marginTop: '1rem', maxWidth: '560px', margin: '1rem auto 0', lineHeight: 1.8 }}>Science and soul, woven into one practice. Tap any path to learn more.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {SERVICE_CARDS.map(service => (
            <Link key={service.title} href={service.href}
              style={{ display: 'block', textDecoration: 'none', color: 'inherit', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,150,60,0.15)', borderRadius: '4px', padding: '2rem', transition: 'border-color 0.3s, background 0.3s, transform 0.2s', cursor: 'pointer' }}
              onMouseEnter={e => { const d = e.currentTarget as HTMLAnchorElement; d.style.borderColor = 'rgba(201,150,60,0.5)'; d.style.background = 'rgba(201,150,60,0.05)'; d.style.transform = 'translateY(-3px)' }}
              onMouseLeave={e => { const d = e.currentTarget as HTMLAnchorElement; d.style.borderColor = 'rgba(201,150,60,0.15)'; d.style.background = 'rgba(255,255,255,0.03)'; d.style.transform = 'translateY(0)' }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{service.icon}</div>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', color: '#C9963C', marginBottom: '0.5rem' }}>{service.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'rgba(240,232,216,0.6)', lineHeight: 1.6, marginBottom: '0.85rem' }}>{service.desc}</p>
              <span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C9963C', opacity: 0.85 }}>Learn more →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Doctor signature programs */}
      <CarePackages />

      {/* Bio-energetic therapies */}
      <section style={{ padding: '5rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ fontSize: '0.75rem', letterSpacing: '0.3em', color: '#3DC898', textTransform: 'uppercase', marginBottom: '1rem' }}>Bio-Energetic Therapies</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 300 }}>The Modalities</h2>
          <p style={{ color: 'rgba(240,232,216,0.6)', marginTop: '1rem', maxWidth: '560px', margin: '1rem auto 0' }}>Each therapy is a tool. Together, woven into a protocol, they become transformation.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {therapies.map(t => (
            <div key={t.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,150,60,0.18)', borderRadius: '4px', padding: '1.75rem' }}>
              <div style={{ width: '46px', height: '46px', color: '#C9963C', marginBottom: '1rem' }}>
                <svg viewBox="0 0 58 58" fill="none" style={{ width: '100%', height: '100%' }} dangerouslySetInnerHTML={{ __html: THERAPY_ICONS[t.id] || '' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', gap: '0.5rem' }}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', color: '#C9963C' }}>{t.name}</div>
                {therapiesWithEvidence.includes(t.id) && (
                  <span style={{ flexShrink: 0, fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.1em', color: '#3DC898', border: '1px solid rgba(61,200,152,0.4)', borderRadius: '2px', padding: '0.2rem 0.4rem', textTransform: 'uppercase' }}>Evidence-based</span>
                )}
              </div>
              <p style={{ fontSize: '0.85rem', color: 'rgba(240,232,216,0.6)', lineHeight: 1.65 }}>{t.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Holistic protocols */}
      <section style={{ padding: '4rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.8rem' }}>
          <div style={{ fontSize: '0.75rem', letterSpacing: '0.3em', color: '#C9963C', textTransform: 'uppercase', marginBottom: '1rem' }}>Holistic Protocols</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.9rem, 4.5vw, 2.8rem)', fontWeight: 300 }}>Woven Journeys</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {protocols.map(p => (
            <div key={p.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,150,60,0.18)', borderRadius: '6px', padding: '1.9rem 1.6rem' }}>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '0.95rem', color: '#3DC898', marginBottom: '0.3rem' }}>Protocol {p.number}</div>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', color: '#C9963C', marginBottom: '0.5rem', lineHeight: 1.2 }}>{p.name}</h3>
              <p style={{ fontSize: '0.85rem', color: 'rgba(240,232,216,0.65)', lineHeight: 1.6, marginBottom: '0.9rem' }}>{p.focus}</p>
              <div style={{ fontSize: '0.78rem', color: 'rgba(240,232,216,0.45)', lineHeight: 1.7 }}>
                {p.modalities.slice(0, 6).map(m => m.modality).join(' · ')}
              </div>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', color: '#E4B85A', fontSize: '0.95rem', marginTop: '2.2rem', maxWidth: 620, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7, fontStyle: 'italic' }}>
          ✦ {SPECIAL_OFFER.headline}
        </p>
      </section>

      {/* Signature IV collection */}
      <IVMenu />

      {/* DiscSeel */}
      <section style={{ padding: '5rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ background: 'linear-gradient(160deg, rgba(61,200,152,0.08), rgba(13,13,13,0.6))', border: '1px solid rgba(61,200,152,0.28)', borderRadius: '8px', padding: '2.6rem 2.2rem' }}>
          <div style={{ fontSize: '0.72rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: '#3DC898', marginBottom: '0.9rem' }}>Regenerative Spine Care</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 4.5vw, 2.8rem)', fontWeight: 300, lineHeight: 1.15, marginBottom: '0.4rem' }}>DiscSeel® — A Non-Surgical Alternative for Chronic Back &amp; Neck Pain</h2>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '1.2rem', color: '#E4B85A', marginBottom: '1.6rem' }}>A regenerative alternative to back surgery</p>
          <p style={{ fontSize: '0.98rem', color: 'rgba(240,232,216,0.82)', lineHeight: 1.8, marginBottom: '1.8rem' }}>
            For chronic back and neck pain caused by damaged or torn spinal discs, the DiscSeel® Procedure uses <strong style={{ color: '#F0E8D8' }}>Fibrin</strong> — a natural biologic sealant — to seal the tears and stimulate the disc&rsquo;s own healing. No surgery, no fusion: a single image-guided injection. Dr. Meighen is one of only <strong style={{ color: '#F0E8D8' }}>~30 DiscSeel®-trained providers in the world.</strong>
          </p>
          <Link href="/booking" style={{ background: 'linear-gradient(135deg, #3DC898, #C9963C)', color: '#06201a', padding: '1rem 2.4rem', borderRadius: '2px', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'inline-block' }}>Ask about DiscSeel® →</Link>
          <p style={{ fontSize: '0.72rem', color: 'rgba(240,232,216,0.4)', marginTop: '1.4rem', lineHeight: 1.6 }}>Each case is individually evaluated by Dr. Meighen.</p>
        </div>
      </section>

      {/* Science / evidence */}
      <section style={{ padding: '4rem 2rem 7rem', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '0.75rem', letterSpacing: '0.3em', color: '#3DC898', textTransform: 'uppercase', marginBottom: '1rem' }}>Grounded in Evidence</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 4.5vw, 2.6rem)', fontWeight: 300 }}>The Science</h2>
        </div>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {citations.map(c => (
            <a key={c.id} href={c.url} target="_blank" rel="noopener noreferrer" style={{ display: 'block', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,150,60,0.15)', borderRadius: '4px', padding: '1.4rem 1.5rem', textDecoration: 'none' }}>
              <p style={{ fontSize: '0.92rem', color: 'rgba(240,232,216,0.82)', lineHeight: 1.7, marginBottom: '0.6rem' }}>{c.finding}</p>
              <p style={{ fontSize: '0.78rem', color: '#3DC898' }}>{c.citation} ↗</p>
            </a>
          ))}
        </div>
        <p style={{ fontSize: '0.72rem', color: 'rgba(240,232,216,0.35)', marginTop: '2rem', lineHeight: 1.6, textAlign: 'center' }}>
          Educational information only — not medical advice. Therapies are complementary and not intended to diagnose, treat, cure or prevent any disease. Consult Dr. Meighen for personalized care.
        </p>
      </section>

      <SiteFooter />
      <LuminaChat />
    </main>
  )
}

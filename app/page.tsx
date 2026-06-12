'use client'

import Link from 'next/link'
import LuminaChat from '@/components/LuminaChat'
import { SiteNav, SiteFooter } from '@/components/SiteChrome'
import { SERVICES_MARQUEE, FAQS } from '@/lib/alchemist/site-content'

const EXPLORE: { href: string; icon: string; title: string; desc: string }[] = [
  { href: '/about', icon: '☿', title: 'About', desc: 'Our story & philosophy' },
  { href: '/services', icon: '⚕', title: 'Services', desc: 'Medicine, therapies & IV drips' },
  { href: '/team', icon: '✦', title: 'Team', desc: 'Bella & Dr. Meighen' },
  { href: '/memberships', icon: '♛', title: 'Memberships', desc: 'From $333 to concierge' },
  { href: '/shop', icon: '🌿', title: 'Apothecary', desc: 'Sacred tools for home' },
]

export default function Home() {
  return (
    <main style={{ background: '#000', color: '#F0E8D8', minHeight: '100vh' }}>
      <SiteNav />

      {/* HERO */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px 2rem 4rem', textAlign: 'center', position: 'relative', background: 'radial-gradient(ellipse at center top, rgba(201,150,60,0.08) 0%, transparent 60%)' }}>
        <div className="animate-logo-float" style={{ display: 'inline-block', marginBottom: '2.25rem' }}>
          <img src="/logo-alchemized.png" alt="Alchemized BioHealing Institute" style={{ width: 'clamp(240px, 50vw, 470px)', maxWidth: '88vw', height: 'auto', display: 'block', filter: 'drop-shadow(0 0 30px rgba(201,150,60,0.35))' }} />
        </div>
        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.6rem, 4.5vw, 3rem)', fontWeight: 300, letterSpacing: '0.06em', lineHeight: 1.2, marginBottom: '1.25rem', background: 'linear-gradient(135deg, #F0E8D8 0%, #E4B85A 50%, #C9963C 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          Science Meets Soul.<br />Healing From Within.
        </div>
        <p style={{ fontSize: '1.05rem', color: 'rgba(240,232,216,0.65)', marginBottom: '3rem', maxWidth: '600px', lineHeight: 1.8 }}>
          Where vanguard science meets the soul — an integral healing of body &amp; soul.<br />
          <span style={{ color: 'rgba(240,232,216,0.45)', fontSize: '0.92rem' }}>By Holistic Bella Vargas &amp; Dr. Michael J. Meighen · Miami</span>
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/assessment" style={{ background: 'linear-gradient(135deg, #C9963C, #E4B85A)', color: '#000', padding: '1rem 2.5rem', borderRadius: '2px', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Begin Your Assessment</Link>
          <Link href="/memberships" style={{ background: 'transparent', color: '#C9963C', padding: '1rem 2.5rem', border: '1px solid #C9963C', borderRadius: '2px', textDecoration: 'none', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Explore Memberships</Link>
        </div>
        <div style={{ display: 'flex', gap: '4rem', marginTop: '5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[['100+', 'Services'], ['2', 'Practitioners'], ['∞', 'Possibilities']].map(([num, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', color: '#C9963C' }}>{num}</div>
              <div style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ background: 'rgba(201,150,60,0.06)', borderTop: '1px solid rgba(201,150,60,0.2)', borderBottom: '1px solid rgba(201,150,60,0.2)', padding: '1rem 0', overflow: 'hidden' }}>
        <div className="animate-marquee" style={{ display: 'flex', gap: '3rem', whiteSpace: 'nowrap', width: 'max-content' }}>
          {[...SERVICES_MARQUEE, ...SERVICES_MARQUEE].map((s, i) => (
            <span key={i} style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9963C', opacity: 0.8 }}>◆ {s}</span>
          ))}
        </div>
      </div>

      {/* TWO WAYS TO BEGIN — public tools */}
      <section style={{ padding: '7rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ fontSize: '0.75rem', letterSpacing: '0.3em', color: '#C9963C', textTransform: 'uppercase', marginBottom: '1rem' }}>Begin Your Journey · Free</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5.5vw, 3.4rem)', fontWeight: 300 }}>Two ways to begin</h2>
          <p style={{ color: 'rgba(240,232,216,0.65)', marginTop: '1rem', maxWidth: 560, margin: '1rem auto 0', lineHeight: 1.8 }}>Start with the soul or with the science — both paths lead to the same place: a deeper understanding of you.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.6rem', alignItems: 'stretch' }}>
          <div style={{ display: 'flex', flexDirection: 'column', background: 'linear-gradient(165deg, rgba(224,96,144,0.09), rgba(13,13,13,0.5))', border: '1px solid rgba(224,96,144,0.3)', borderRadius: '10px', padding: '2.4rem 2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.4rem', color: '#E06090', marginBottom: '0.6rem' }}>✧ ⋆ ˚ ☾ ˚ ⋆ ✧</div>
            <div style={{ fontSize: '0.7rem', letterSpacing: '0.26em', color: '#E06090', textTransform: 'uppercase', marginBottom: '0.6rem' }}>With Holistic Bella</div>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.9rem', fontWeight: 300, marginBottom: '0.8rem', color: '#F0E8D8' }}>The Soul Assessment</h3>
            <p style={{ fontSize: '0.95rem', color: 'rgba(240,232,216,0.72)', lineHeight: 1.75, marginBottom: '1.8rem', flex: 1 }}>A free, intuitive reading of your inner world — your patterns, your energy, and what your body and soul are asking for. The gentle first step into Bella&rsquo;s holistic path.</p>
            <Link href="/assessment" style={{ background: 'linear-gradient(135deg, #C9963C, #E06090)', color: '#1a1020', padding: '0.95rem 2rem', borderRadius: '2px', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Begin the Soul Assessment →</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', background: 'linear-gradient(165deg, rgba(61,200,152,0.09), rgba(13,13,13,0.5))', border: '1px solid rgba(61,200,152,0.3)', borderRadius: '10px', padding: '2.4rem 2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.4rem', color: '#3DC898', marginBottom: '0.6rem' }}>◎ ⋆ ˚ ⚕ ˚ ⋆ ◎</div>
            <div style={{ fontSize: '0.7rem', letterSpacing: '0.26em', color: '#3DC898', textTransform: 'uppercase', marginBottom: '0.6rem' }}>With Dr. Meighen</div>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.9rem', fontWeight: 300, marginBottom: '0.8rem', color: '#F0E8D8' }}>Your Biological Age</h3>
            <p style={{ fontSize: '0.95rem', color: 'rgba(240,232,216,0.72)', lineHeight: 1.75, marginBottom: '1.8rem', flex: 1 }}>Your body has two ages — the calendar&rsquo;s and the real one. Discover yours in 2 minutes with a longevity assessment based on validated markers, and receive a personalized report through Dr. Meighen&rsquo;s clinical lens.</p>
            <Link href="/bio-age" style={{ background: 'linear-gradient(135deg, #3DC898, #C9963C)', color: '#06201a', padding: '0.95rem 2rem', borderRadius: '2px', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Calculate my biological age →</Link>
          </div>
        </div>
      </section>

      {/* EXPLORE — links to the pages */}
      <section style={{ padding: '4rem 2rem 7rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ fontSize: '0.75rem', letterSpacing: '0.3em', color: '#C9963C', textTransform: 'uppercase', marginBottom: '1rem' }}>Explore</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.9rem, 5vw, 3rem)', fontWeight: 300 }}>Discover the Institute</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '1.25rem' }}>
          {EXPLORE.map(card => (
            <Link key={card.href} href={card.href}
              style={{ display: 'block', textDecoration: 'none', color: 'inherit', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,150,60,0.18)', borderRadius: '6px', padding: '2rem 1.6rem', textAlign: 'center', transition: 'border-color 0.3s, background 0.3s, transform 0.2s' }}
              onMouseEnter={e => { const d = e.currentTarget as HTMLAnchorElement; d.style.borderColor = 'rgba(201,150,60,0.5)'; d.style.background = 'rgba(201,150,60,0.05)'; d.style.transform = 'translateY(-3px)' }}
              onMouseLeave={e => { const d = e.currentTarget as HTMLAnchorElement; d.style.borderColor = 'rgba(201,150,60,0.18)'; d.style.background = 'rgba(255,255,255,0.02)'; d.style.transform = 'translateY(0)' }}
            >
              <div style={{ fontSize: '1.6rem', color: '#C9963C', marginBottom: '0.7rem' }}>{card.icon}</div>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', color: '#F0E8D8', marginBottom: '0.3rem' }}>{card.title}</div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(240,232,216,0.55)', lineHeight: 1.5 }}>{card.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '5rem 2rem', maxWidth: '820px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ fontSize: '0.75rem', letterSpacing: '0.3em', color: '#C9963C', textTransform: 'uppercase', marginBottom: '1rem' }}>Questions</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.9rem, 5vw, 3rem)', fontWeight: 300 }}>Frequently Asked</h2>
        </div>
        <div style={{ display: 'grid', gap: '0.85rem' }}>
          {FAQS.map((f, i) => (
            <details key={i} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,150,60,0.18)', borderRadius: '4px', padding: '1.25rem 1.5rem' }}>
              <summary style={{ cursor: 'pointer', listStyle: 'none', fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', color: '#F0E8D8' }}>{f.q}</summary>
              <p style={{ marginTop: '0.9rem', fontSize: '0.95rem', color: 'rgba(240,232,216,0.7)', lineHeight: 1.75 }}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: '8rem 2rem', textAlign: 'center', background: 'radial-gradient(ellipse at center, rgba(201,150,60,0.12) 0%, transparent 70%)' }}>
        <div style={{ fontSize: '3rem', marginBottom: '2rem', color: '#C9963C' }}>☿</div>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300, marginBottom: '1rem' }}>Your alchemy begins here</h2>
        <p style={{ color: 'rgba(240,232,216,0.6)', fontSize: '1.05rem', marginBottom: '3rem', maxWidth: '450px', margin: '0 auto 3rem' }}>Let Lumina guide you to the right path.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/assessment" style={{ background: 'linear-gradient(135deg, #C9963C, #E4B85A)', color: '#000', padding: '1rem 2.5rem', borderRadius: '2px', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Begin Soul Assessment</Link>
          <Link href="/booking" style={{ background: 'transparent', color: '#C9963C', padding: '1rem 2.5rem', border: '1px solid #C9963C', borderRadius: '2px', textDecoration: 'none', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Book a Session</Link>
        </div>
      </section>

      <SiteFooter />
      <LuminaChat />
    </main>
  )
}

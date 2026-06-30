'use client'

import { useState } from 'react'
import Link from 'next/link'

const NAV_LINKS: [string, string][] = [
  ['About', '/about'],
  ['Services', '/services'],
  ['Events', '/retreats'],
  ['Team', '/team'],
  ['Memberships', '/memberships'],
  ['Shop', '/shop'],
]

export function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(201,150,60,0.2)',
        padding: '0 2rem', height: '70px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link href="/" aria-label="Home">
          <img src="/logo-alchemized.png" alt="Alchemized BioHealing Institute" style={{ height: '46px', width: 'auto', objectFit: 'contain', display: 'block' }} />
        </Link>
        <div className="nav-desktop" style={{ gap: '2rem', alignItems: 'center' }}>
          {NAV_LINKS.map(([label, href]) => (
            <Link key={href} href={href} style={{ color: '#F0E8D8', textDecoration: 'none', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.8 }}>{label}</Link>
          ))}
          <Link href="/assessment" style={{ background: 'linear-gradient(135deg, #C9963C, #E4B85A)', color: '#000', padding: '0.5rem 1.2rem', borderRadius: '2px', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Begin Your Journey</Link>
        </div>
        <button className="nav-burger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu" aria-expanded={menuOpen} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '0.5rem', flexDirection: 'column', gap: '5px' }}>
          {[0, 1, 2].map(i => (
            <span key={i} style={{ display: 'block', width: '24px', height: '2px', background: '#C9963C', borderRadius: '2px', transition: 'transform 0.3s, opacity 0.3s', transform: menuOpen ? (i === 0 ? 'translateY(7px) rotate(45deg)' : i === 2 ? 'translateY(-7px) rotate(-45deg)' : 'none') : 'none', opacity: menuOpen && i === 1 ? 0 : 1 }} />
          ))}
        </button>
      </nav>

      <div className="nav-mobile-panel" style={{
        position: 'fixed', top: '70px', left: 0, right: 0, zIndex: 99,
        background: 'rgba(0,0,0,0.96)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(201,150,60,0.2)',
        flexDirection: 'column', alignItems: 'center', gap: '1.5rem',
        padding: menuOpen ? '2rem' : '0 2rem', maxHeight: menuOpen ? '460px' : '0',
        overflow: 'hidden', transition: 'max-height 0.4s ease, padding 0.4s ease',
      }}>
        {NAV_LINKS.map(([label, href]) => (
          <Link key={href} href={href} onClick={() => setMenuOpen(false)} style={{ color: '#F0E8D8', textDecoration: 'none', fontSize: '1rem', letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.85 }}>{label}</Link>
        ))}
        <Link href="/assessment" onClick={() => setMenuOpen(false)} style={{ background: 'linear-gradient(135deg, #C9963C, #E4B85A)', color: '#000', padding: '0.7rem 1.8rem', borderRadius: '2px', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Begin Your Journey</Link>
      </div>
    </>
  )
}

export function SiteFooter() {
  return (
    <footer style={{ background: '#0A0A0A', borderTop: '1px solid rgba(201,150,60,0.2)', padding: '4rem 2rem 2rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          <div style={{ flex: 2, minWidth: '250px' }}>
            <img src="/logo-alchemized.png" alt="Alchemized BioHealing Institute" style={{ height: '60px', width: 'auto', objectFit: 'contain', marginBottom: '1rem' }} />
            <p style={{ fontSize: '0.85rem', color: 'rgba(240,232,216,0.5)', lineHeight: 1.8, maxWidth: '320px' }}>Where vanguard science meets the soul. Integral healing of body &amp; soul.<br />By Holistic Bella Vargas &amp; Michael J. Meighen, MD.</p>
            <div style={{ display: 'flex', gap: '0.7rem', marginTop: '1.25rem' }}>
              <a href="https://instagram.com/holisticbellamedicine" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 38, height: 38, borderRadius: '50%', border: '1px solid rgba(201,150,60,0.4)', color: '#C9963C' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" /></svg>
              </a>
              <a href="https://www.tiktok.com/@alchemizedbiohealinginstitute" target="_blank" rel="noopener noreferrer" aria-label="TikTok" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 38, height: 38, borderRadius: '50%', border: '1px solid rgba(201,150,60,0.4)', color: '#C9963C' }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3c.3 2.1 1.5 3.6 3.5 3.8V9c-1.3 0-2.5-.4-3.5-1v6.2a5.7 5.7 0 11-5.7-5.7c.3 0 .6 0 .9.1v2.4a3.3 3.3 0 102.3 3.1V3h2.5z" /></svg>
              </a>
            </div>
          </div>
          <div style={{ flex: 1, minWidth: '150px' }}>
            <div style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9963C', marginBottom: '1rem' }}>Explore</div>
            {NAV_LINKS.map(([label, href]) => (
              <Link key={href} href={href} style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(240,232,216,0.5)', textDecoration: 'none', marginBottom: '0.5rem' }}>{label}</Link>
            ))}
          </div>
          <div style={{ flex: 1, minWidth: '150px' }}>
            <div style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9963C', marginBottom: '1rem' }}>Begin</div>
            {([['Soul Assessment', '/assessment'], ['Biological Age', '/bio-age'], ['Retreats · Samaná', '/retreats'], ['Book a Session', '/booking']] as [string, string][]).map(([label, href]) => (
              <Link key={href} href={href} style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(240,232,216,0.5)', textDecoration: 'none', marginBottom: '0.5rem' }}>{label}</Link>
            ))}
          </div>
          <div style={{ flex: 1, minWidth: '170px' }}>
            <div style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9963C', marginBottom: '1rem' }}>Visit</div>
            <p style={{ fontSize: '0.85rem', color: 'rgba(240,232,216,0.5)', lineHeight: 1.8, marginBottom: '0.75rem' }}>Centner Wellness — Coral Gables<br />2970 Coral Way<br />Miami, FL 33145</p>
            <a href="tel:+13053053820" style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(240,232,216,0.5)', textDecoration: 'none' }}>305-305-3820</a>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(201,150,60,0.1)', paddingTop: '1.6rem', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9963C', marginBottom: '0.9rem' }}>Popular in Miami</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {([
              ['Biohacking Miami', '/biohacking-miami'],
              ['Regenerative Medicine', '/regenerative-medicine-miami'],
              ['Functional Medicine', '/functional-medicine-miami'],
              ['Peptide Therapy', '/peptide-therapy-miami'],
              ['Hormone Optimization', '/hormone-optimization-miami'],
              ['Mindfulness & Nervous System', '/mindfulness-nervous-system-miami'],
              ['NAD+ IV Therapy', '/nad-iv-therapy-miami'],
              ['Longevity Clinic Coral Gables', '/longevity-clinic-coral-gables'],
            ] as [string, string][]).map(([label, href]) => (
              <Link key={href} href={href} style={{ fontSize: '0.78rem', color: 'rgba(240,232,216,0.55)', textDecoration: 'none', border: '1px solid rgba(201,150,60,0.2)', borderRadius: 999, padding: '0.35rem 0.85rem' }}>{label}</Link>
            ))}
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(201,150,60,0.1)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'rgba(240,232,216,0.3)' }}>© 2026 Alchemized BioHealing Institute. All rights reserved.</div>
          <div style={{ fontSize: '0.75rem', color: '#C9963C', opacity: 0.8 }}>Hablamos español · We welcome you in English &amp; Spanish</div>
          <div style={{ fontSize: '0.75rem', color: 'rgba(240,232,216,0.3)' }}>Built by <span style={{ color: '#C9963C' }}>Danae Pozo</span> · Blue Ocean AI Systems · Miami</div>
        </div>
      </div>
    </footer>
  )
}

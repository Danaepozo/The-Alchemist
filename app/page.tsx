'use client'

import { useEffect, useRef, useState } from 'react'
import LuminaChat from '@/components/LuminaChat'
import Link from 'next/link'
import { membershipCards, therapies, protocols, citations, therapiesWithEvidence, SPECIAL_OFFER } from '@/lib/alchemist/catalog'
import IVMenu from '@/components/IVMenu'
import CarePackages from '@/components/CarePackages'

const SERVICES_MARQUEE = [
  'Precision Medicine', 'Peptide Therapy', 'Reiki Healing', 'NAD+ IV Therapy',
  'Chakra Balancing', 'Hormone Optimization', 'Sacred Ceremonies', 'Longevity Programs',
  'Somatic Healing', 'Epigenetic Testing', 'Ancestral Medicine', 'Biohacking Protocols',
]

// Minimal alchemical / sacred-geometry line icons, keyed by therapy id (catalog.ts)
const THERAPY_ICONS: Record<string, string> = {
  'floatation-tanks': '<path d="M29 10c8 8 14 14 14 22a14 14 0 01-28 0c0-8 6-14 14-22z" stroke="currentColor" stroke-width="1.2" fill="none"/><path d="M20 33a9 9 0 0018 0" stroke="currentColor" stroke-width="1" fill="none"/>',
  'temperature-contrast': '<path d="M29 9v40M14 19l30 20M44 19L14 39M11 29h36" stroke="currentColor" stroke-width="1.2"/><circle cx="29" cy="29" r="5" stroke="currentColor" stroke-width="1.2"/>',
  'biowell-aoscan': '<circle cx="29" cy="29" r="19" stroke="currentColor" stroke-width="1.3"/><circle cx="29" cy="29" r="9" stroke="currentColor" stroke-width="1.1"/><circle cx="29" cy="29" r="2.2" fill="currentColor"/>',
  'recovery-tri-fusion': '<circle cx="29" cy="29" r="8" stroke="currentColor" stroke-width="1.3"/><g stroke="currentColor" stroke-width="1.1"><path d="M29 6v9M29 43v9M6 29h9M43 29h9M13 13l6 6M39 39l6 6M45 13l-6 6M19 39l-6 6"/></g>',
  'bio-sync-bed': '<path d="M29 14a15 15 0 010 30M29 19a10 10 0 010 20M29 24a5 5 0 010 10" stroke="currentColor" stroke-width="1.2" fill="none"/><circle cx="20" cy="29" r="2.2" fill="currentColor"/>',
  'biocharger': '<path d="M29 8l4 12 12 4-12 4-4 12-4-12-12-4 12-4z" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linejoin="round"/><circle cx="29" cy="29" r="3" stroke="currentColor" stroke-width="1"/>',
  'red-light-bed': '<circle cx="29" cy="29" r="8" stroke="currentColor" stroke-width="1.3"/><g stroke="currentColor" stroke-width="1.1"><path d="M29 8v8M29 42v8M8 29h8M42 29h8M15 15l5 5M38 38l5 5M43 15l-5 5M20 38l-5 5"/></g>',
  'pemf-ozone-sauna': '<path d="M29 9v40M14 19l30 20M44 19L14 39M11 29h36" stroke="currentColor" stroke-width="1.1" opacity="0.9"/><circle cx="29" cy="29" r="6" stroke="currentColor" stroke-width="1.2"/>',
  'holistic-electromagnetic-booster': '<path d="M29 8l4 12 12 4-12 4-4 12-4-12-12-4 12-4z" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linejoin="round"/><circle cx="29" cy="29" r="11" stroke="currentColor" stroke-width="0.8" opacity="0.5"/>',
}

// Sample apothecary products (placeholders) — real items to be loaded from Shopify
const SHOP_PRODUCTS = [
  { id: 'cellular-renewal', name: 'Cellular Renewal Drops', desc: 'Liposomal glutathione + NAD⁺ precursors for daily cellular defense.', price: '$68', tag: 'Bestseller',
    icon: '<rect x="22" y="20" width="14" height="28" rx="4" stroke="currentColor" stroke-width="1.4"/><path d="M25 20v-5h8v5M29 9v4M26 11h6" stroke="currentColor" stroke-width="1.4"/><path d="M25 34h8" stroke="currentColor" stroke-width="1"/>' },
  { id: 'sacred-skin', name: 'Sacred Skin Elixir', desc: 'Botanical regenerative serum — peptides, ancestral oils & gold.', price: '$94', tag: '',
    icon: '<rect x="23" y="18" width="12" height="30" rx="3" stroke="currentColor" stroke-width="1.4"/><path d="M26 18v-4h6v4M29 6v6M27 9h4" stroke="currentColor" stroke-width="1.4"/><circle cx="29" cy="34" r="4" stroke="currentColor" stroke-width="1"/>' },
  { id: 'grounding-bath', name: 'Grounding Bath Ritual', desc: 'Magnesium salts infused with sacred herbs for nervous-system calm.', price: '$42', tag: '',
    icon: '<path d="M19 24h20l-2 22a3 3 0 01-3 3H24a3 3 0 01-3-3z" stroke="currentColor" stroke-width="1.4"/><path d="M17 24h24M24 24v-4h10v4" stroke="currentColor" stroke-width="1.4"/><path d="M27 33l2 2 4-4" stroke="currentColor" stroke-width="1"/>' },
  { id: 'inner-light', name: 'Inner Light Capsules', desc: 'Daily longevity, mood & energy support — clean, vegan formula.', price: '$58', tag: '',
    icon: '<rect x="20" y="16" width="18" height="32" rx="4" stroke="currentColor" stroke-width="1.4"/><path d="M20 26h18M24 16v-3h10v3" stroke="currentColor" stroke-width="1.4"/><circle cx="26" cy="35" r="1.5" fill="currentColor"/><circle cx="32" cy="40" r="1.5" fill="currentColor"/><circle cx="31" cy="32" r="1.5" fill="currentColor"/>' },
]

// FAQ — visible content that mirrors the FAQPage JSON-LD (SEO featured snippets + GEO)
const FAQS = [
  { q: 'What is Alchemized BioHealing Institute?', a: 'A longevity and regenerative medicine sanctuary in Miami (Coral Gables) where regenerative medicine merges with sacred, ancestral healing and spiritual therapies. Founded by Dr. Michael J. Meighen, MD and Holistic Bella Vargas — uniting body and soul, science and spirit.' },
  { q: 'Where is Alchemized BioHealing Institute located?', a: 'At 2970 Coral Way, Miami, FL 33145 (Centner Wellness, Coral Gables). Reach the team at +1 (305) 305-3820. We welcome you in English & Spanish.' },
  { q: 'What services and therapies do you offer?', a: 'Regenerative medicine, peptide therapy, hormone optimization, IV therapy & NAD+ drips, and bio-energetic therapies — red light therapy, cold plunge + infrared sauna, floatation tanks, Bio-Sync (Vemi) bed, BioCharger and HOCATT ozone sauna — plus spiritual & energy healing, breathwork and nervous-system regulation.' },
  { q: 'How much do memberships cost?', a: 'The entry experience is a one-time $333. Monthly memberships are Loving Myself $444/mo (1 person), Soulmates Dates $777/mo (2 people) and My Sacred Family $1,111/mo (4 people). All active members receive 30% off all services.' },
  { q: 'Do you offer IV therapy and NAD+ in Miami?', a: 'Yes. The Signature IV Collection offers preservative-free, physician-formulated drips across a Pain & Inflammation series and a Signature Alchemy series — including NAD+, glutathione, cellular renewal and longevity drips. Every IV includes a secret homeopathic blend.' },
  { q: 'What is the Nervous System & Longevity Program?', a: 'A physician-designed program by Dr. Meighen that regulates the nervous system and extends healthspan: HRV and stress evaluation, SGB consultation, IV and red light therapy, sound healing or meditation, breathwork, sleep optimization, a supplement protocol and lifestyle coaching.' },
  { q: 'Who are the founders of Alchemized BioHealing?', a: 'Dr. Michael J. Meighen, MD — double board-certified, #1 Amazon best-seller of "A New You," 25+ years in regenerative medicine, peptides and hormones — and Holistic Bella Vargas, a Reiki Master and Harvard-certified happiness coach specializing in spiritual and ancestral healing.' },
]

export default function Home() {
  const revealRefs = useRef<HTMLElement[]>([])
  // Two hero options to choose from: 'vesica' (new) or 'original' (floating logo)
  const [heroVariant, setHeroVariant] = useState<'vesica' | 'original'>('vesica')
  const [menuOpen, setMenuOpen] = useState(false)
  const [toast, setToast] = useState('')

  // Placeholder until Shopify products are defined & Buy Button / Storefront is wired
  const handleAddToCart = (name: string) => {
    setToast(`${name} — checkout coming soon ✨`)
    setTimeout(() => setToast(''), 2600)
  }

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get('hero')
    if (param === 'original' || param === 'vesica') setHeroVariant(param)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    revealRefs.current.forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const addReveal = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el)
  }

  return (
    <main style={{ background: '#000', color: '#F0E8D8', minHeight: '100vh' }}>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(201,150,60,0.2)',
        padding: '0 2rem', height: '70px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <img src="/logo-alchemized.png" alt="Alchemized BioHealing Institute" style={{ height: '48px', width: 'auto', objectFit: 'contain' }} />
        {/* Desktop links */}
        <div className="nav-desktop" style={{ gap: '2rem', alignItems: 'center' }}>
          {['About', 'Services', 'Team', 'Shop', 'Memberships'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{
              color: '#F0E8D8', textDecoration: 'none', fontSize: '0.85rem',
              letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.8,
            }}>{item}</a>
          ))}
          <Link href="/assessment" style={{
            background: 'linear-gradient(135deg, #C9963C, #E4B85A)',
            color: '#000', padding: '0.5rem 1.2rem', borderRadius: '2px',
            textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600,
            letterSpacing: '0.1em', textTransform: 'uppercase'
          }}>Begin Your Journey</Link>
        </div>
        {/* Mobile hamburger */}
        <button className="nav-burger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu" aria-expanded={menuOpen} style={{
          background: 'transparent', border: 'none', cursor: 'pointer', padding: '0.5rem', flexDirection: 'column', gap: '5px'
        }}>
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block', width: '24px', height: '2px', background: '#C9963C', borderRadius: '2px',
              transition: 'transform 0.3s, opacity 0.3s',
              transform: menuOpen ? (i === 0 ? 'translateY(7px) rotate(45deg)' : i === 2 ? 'translateY(-7px) rotate(-45deg)' : 'none') : 'none',
              opacity: menuOpen && i === 1 ? 0 : 1
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile menu panel */}
      <div className="nav-mobile-panel" style={{
        position: 'fixed', top: '70px', left: 0, right: 0, zIndex: 99,
        background: 'rgba(0,0,0,0.96)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(201,150,60,0.2)',
        flexDirection: 'column', alignItems: 'center', gap: '1.5rem',
        padding: menuOpen ? '2rem' : '0 2rem', maxHeight: menuOpen ? '420px' : '0',
        overflow: 'hidden', transition: 'max-height 0.4s ease, padding 0.4s ease'
      }}>
        {['About', 'Services', 'Team', 'Shop', 'Memberships'].map(item => (
          <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} style={{
            color: '#F0E8D8', textDecoration: 'none', fontSize: '1rem',
            letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.85,
          }}>{item}</a>
        ))}
        <Link href="/assessment" onClick={() => setMenuOpen(false)} style={{
          background: 'linear-gradient(135deg, #C9963C, #E4B85A)', color: '#000',
          padding: '0.7rem 1.8rem', borderRadius: '2px', textDecoration: 'none',
          fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase'
        }}>Begin Your Journey</Link>
      </div>

      {/* HERO */}
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '120px 2rem 4rem', textAlign: 'center', position: 'relative',
        background: 'radial-gradient(ellipse at center top, rgba(201,150,60,0.08) 0%, transparent 60%)'
      }}>
        {/* LIVE hero = 'vesica'. The 'original' (large floating logo) is kept as a
            backup — still viewable at ?hero=original. To switch back, change the
            useState default below to 'original'. */}
        {heroVariant === 'original' ? (
          /* OPTION A — Original: large floating logo */
          <div className="animate-logo-float" style={{ display: 'inline-block', marginBottom: '2rem' }}>
            <img src="/logo-alchemized.png" alt="Alchemized BioHealing Institute" style={{
              width: 'clamp(280px, 58vw, 540px)', maxWidth: '86vw', height: 'auto', display: 'block',
              filter: 'drop-shadow(0 0 38px rgba(201,150,60,0.40))'
            }} />
          </div>
        ) : (
          /* OPTION B — Vesica Piscis: small logo above, clean union of circles below */
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
            <img src="/logo-alchemized.png" alt="Alchemized BioHealing Institute" className="animate-logo-float" style={{
              width: 'clamp(140px, 22vw, 215px)', maxWidth: '60vw', height: 'auto', display: 'block', marginBottom: '1.5rem',
              filter: 'drop-shadow(0 0 22px rgba(201,150,60,0.42))'
            }} />
            <div style={{ position: 'relative', width: 'clamp(300px, 60vw, 520px)', maxWidth: '92vw', aspectRatio: '400 / 320' }}>
              <svg viewBox="0 0 400 320" fill="none" className="animate-vesica" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
                <defs>
                  <radialGradient id="heroSage" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#3DC898" stopOpacity="0.5" />
                    <stop offset="55%" stopColor="#3DC898" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#3DC898" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="heroRose" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#E06090" stopOpacity="0.5" />
                    <stop offset="55%" stopColor="#E06090" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#E06090" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="heroGold" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FCEBC0" stopOpacity="0.95" />
                    <stop offset="35%" stopColor="#E4B85A" stopOpacity="0.55" />
                    <stop offset="70%" stopColor="#C9963C" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#C9963C" stopOpacity="0" />
                  </radialGradient>
                  <clipPath id="heroLens"><circle cx="150" cy="160" r="120" /></clipPath>
                </defs>
                <circle cx="150" cy="160" r="135" fill="url(#heroSage)" />
                <circle cx="250" cy="160" r="135" fill="url(#heroRose)" />
                <circle cx="150" cy="160" r="120" stroke="#3DC898" strokeWidth="1" opacity="0.55" />
                <circle cx="250" cy="160" r="120" stroke="#E06090" strokeWidth="1" opacity="0.55" />
                <g clipPath="url(#heroLens)"><circle cx="250" cy="160" r="120" fill="url(#heroGold)" /></g>
                <path d="M200 50 A120 120 0 0 1 200 270 A120 120 0 0 1 200 50 Z" stroke="#E4B85A" strokeWidth="1.4" fill="none" opacity="0.9" />
              </svg>
            </div>
          </div>
        )}
        <div style={{
          fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.6rem, 4.5vw, 3rem)', fontWeight: 300,
          letterSpacing: '0.06em', lineHeight: 1.2, marginBottom: '1.25rem',
          background: 'linear-gradient(135deg, #F0E8D8 0%, #E4B85A 50%, #C9963C 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
        }}>
          Science Meets Soul.<br />Healing From Within.
        </div>
        <p style={{ fontSize: '1.05rem', color: 'rgba(240,232,216,0.65)', marginBottom: '3rem', maxWidth: '600px', lineHeight: 1.8 }}>
          Where vanguard science meets the soul — an integral healing of body &amp; soul.<br />
          <span style={{ color: 'rgba(240,232,216,0.45)', fontSize: '0.92rem' }}>By Holistic Bella Vargas &amp; Dr. Michael J. Meighen, MD · Miami</span>
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/assessment" style={{
            background: 'linear-gradient(135deg, #C9963C, #E4B85A)', color: '#000',
            padding: '1rem 2.5rem', borderRadius: '2px', textDecoration: 'none',
            fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase'
          }}>Begin Your Assessment</Link>
          <a href="#memberships" style={{
            background: 'transparent', color: '#C9963C', padding: '1rem 2.5rem',
            border: '1px solid #C9963C', borderRadius: '2px', textDecoration: 'none',
            fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase'
          }}>Explore Memberships</a>
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
      <div style={{
        background: 'rgba(201,150,60,0.06)', borderTop: '1px solid rgba(201,150,60,0.2)',
        borderBottom: '1px solid rgba(201,150,60,0.2)', padding: '1rem 0', overflow: 'hidden'
      }}>
        <div className="animate-marquee" style={{ display: 'flex', gap: '3rem', whiteSpace: 'nowrap', width: 'max-content' }}>
          {[...SERVICES_MARQUEE, ...SERVICES_MARQUEE].map((s, i) => (
            <span key={i} style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9963C', opacity: 0.8 }}>
              ◆ {s}
            </span>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" ref={addReveal} className="section-reveal" style={{ padding: '8rem 2rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ position: 'relative', width: '160px', height: '160px', margin: '0 auto 3rem' }}>
          {[0, 20, 40].map((inset, i) => (
            <div key={inset} style={{
              position: 'absolute', inset: `${inset}px`, border: '1px solid rgba(201,150,60,0.5)',
              borderRadius: '50%', animation: `pulse-ring 3s ease-in-out infinite ${i * 0.5}s`
            }} />
          ))}
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '3rem', color: '#C9963C', textShadow: '0 0 20px rgba(201,150,60,0.6)'
          }}>☿</div>
        </div>
        <div style={{ fontSize: '0.75rem', letterSpacing: '0.3em', color: '#C9963C', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Our Philosophy</div>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300, marginBottom: '2rem', lineHeight: 1.2 }}>
          The body holds every answer
        </h2>
        <p style={{ fontSize: '1.05rem', lineHeight: 1.9, color: 'rgba(240,232,216,0.75)', marginBottom: '3rem' }}>
          At Alchemized BioHealing Institute, we blend the precision of functional medicine with the wisdom of ancestral healing.
          Every protocol is designed around the whole human — nervous system, spirit, and cellular biology —
          because true transformation happens when science and soul move together.
        </p>
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {['Science', 'Spirit', 'Luxury', 'Connection'].map(pillar => (
            <div key={pillar} style={{ padding: '1rem 1.5rem', border: '1px solid rgba(201,150,60,0.3)', borderRadius: '2px', minWidth: '120px' }}>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', color: '#C9963C' }}>{pillar}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOUNDERS */}
      <section id="team" ref={addReveal as any} className="section-reveal" style={{
        padding: '6rem 2rem', background: 'rgba(255,255,255,0.02)',
        borderTop: '1px solid rgba(201,150,60,0.1)', borderBottom: '1px solid rgba(201,150,60,0.1)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem', maxWidth: 760, marginLeft: 'auto', marginRight: 'auto' }}>
          <div style={{ fontSize: '0.75rem', letterSpacing: '0.3em', color: '#C9963C', textTransform: 'uppercase', marginBottom: '1rem' }}>About Us · Our Story</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 300, lineHeight: 1.15 }}>Two Healers. One Practice.</h2>
          <p style={{ color: 'rgba(240,232,216,0.7)', marginTop: '1.25rem', lineHeight: 1.8, fontSize: '1.02rem' }}>
            Alchemized BioHealing Institute was not born in a boardroom. It was born from two very different stories that arrived at the same truth: <em>healing is whole only when science and soul move together.</em> Bella brings the breath, the ritual, the nervous system and the spirit. Michael brings the labs, the hormones, the regenerative science. Apart, each is powerful. <strong style={{ color: '#C9963C' }}>Together, they are the alchemy</strong> — body &amp; soul, transmuted into vitality.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '2rem', maxWidth: '1100px', margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
          {/* Bella Vargas */}
          <div style={{ flex: '1', minWidth: '320px', maxWidth: '500px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,150,60,0.2)', borderRadius: '4px', padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #E06090, #C9963C)' }} />
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🌿</div>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', fontWeight: 400, color: '#C9963C', marginBottom: '0.25rem' }}>Blenedy Vargas · &ldquo;Holistic Bella&rdquo;</h3>
            <p style={{ fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#E06090', marginBottom: '1.25rem' }}>Co-Founder &amp; Holistic Director</p>
            <p style={{ fontSize: '0.92rem', color: 'rgba(240,232,216,0.72)', lineHeight: 1.75, marginBottom: '1.25rem' }}>
              Bella learned healing the way many women do — holding others long before she learned to hold herself. From theology and clinical psychology to nursing and IV therapy, she wove a rare bridge between worlds, then walked it deeper: studying directly with shamans and indigenous communities in Guatemala, Mexico and Colombia. A Reiki Master and Harvard-certified happiness coach, she became a pioneer of <strong style={{ color: '#E06090' }}>homeopathic, preservative-free IV therapy</strong> — and of a philosophy that has guided everything since: <em>where science and spirit meet.</em>
            </p>
            <ul style={{ listStyle: 'none', fontSize: '0.9rem', lineHeight: 2, color: 'rgba(240,232,216,0.8)' }}>
              {[
                '✦ Harvard Certified Happiness & Life Coach',
                '✦ Holistic Health Practitioner + Reiki Master',
                '✦ Nursing Degree + BS Health Services Admin',
                '✦ Certified: Neuroscience & Chakra Cleansing',
                '✦ Herbalist & Natural Medicine Practitioner',
                '✦ Medicina Ancestral: Guatemala · México · Colombia',
                '✦ Especialista en pacientes con miedo a las agujas 💉',
              ].map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <blockquote style={{ marginTop: '2rem', padding: '1.2rem', borderLeft: '2px solid #E06090', background: 'rgba(224,96,144,0.05)', fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', fontStyle: 'italic', color: 'rgba(240,232,216,0.9)', lineHeight: 1.7 }}>
              &ldquo;Conocida por hacer que hasta los pacientes más nerviosos terminen riéndose durante el IV.&rdquo; ✨
            </blockquote>
            <Link href="/about/bella" style={{ display: 'inline-block', marginTop: '1.5rem', color: '#E06090', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Read Bella&rsquo;s full story →</Link>
          </div>
          {/* Gold thread weaving the two healers together */}
          <div aria-hidden="true" style={{ flex: '0 0 56px', minWidth: 0, alignSelf: 'center', display: 'flex', justifyContent: 'center' }}>
            <svg viewBox="0 0 60 220" fill="none" style={{ width: '56px', height: '220px', overflow: 'visible' }}>
              <defs>
                <linearGradient id="founderThread" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E06090" />
                  <stop offset="50%" stopColor="#E4B85A" />
                  <stop offset="100%" stopColor="#3DC898" />
                </linearGradient>
              </defs>
              <path id="founderWeave" d="M8 12 C 52 60, 8 110, 52 158 C 20 188, 38 200, 30 212" stroke="url(#founderThread)" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.85" />
              <circle r="2.6" fill="#FCEBC0">
                <animateMotion dur="6s" repeatCount="indefinite" rotate="auto"><mpath href="#founderWeave" /></animateMotion>
              </circle>
            </svg>
          </div>
          {/* Dr. Meighen */}
          <div style={{ flex: '1', minWidth: '320px', maxWidth: '500px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,150,60,0.2)', borderRadius: '4px', padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #3DC898, #C9963C)' }} />
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔬</div>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', fontWeight: 400, color: '#C9963C', marginBottom: '0.25rem' }}>Dr. Michael J. Meighen, MD</h3>
            <p style={{ fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#3DC898', marginBottom: '1.25rem' }}>Co-Founder &amp; Medical Director</p>
            <p style={{ fontSize: '0.92rem', color: 'rgba(240,232,216,0.72)', lineHeight: 1.75, marginBottom: '1.25rem' }}>
              Michael learned medicine by becoming the patient. A fracture at 13 ended his athletic career and opened the door to a life in medicine; two orthopedic surgeries and six months in and out of hospitals taught him what it is to receive hard news — and that <em>the body was made to move.</em> Board-certified in Physical Medicine &amp; Rehabilitation and Pain Medicine, with 25+ years and the #1 Amazon best-seller <strong style={{ color: '#3DC898' }}>&ldquo;A New You&rdquo;</strong>, he now blends regenerative orthopedics, hormone optimization, peptides and longevity science — empowering the body to heal itself. <em>Live limitless.</em>
            </p>
            <ul style={{ listStyle: 'none', fontSize: '0.9rem', lineHeight: 2, color: 'rgba(240,232,216,0.8)' }}>
              {[
                '✦ Precision Medicine & Functional Medicine',
                '✦ Hormone Optimization Therapy',
                '✦ Peptide Therapy: BPC-157, CJC-1295, Ipamorelin',
                '✦ Longevity & Performance Medicine',
                '✦ Nervous System Regulation (cellular level)',
                '✦ Pain Resolution & Trauma Physiology',
                '✦ Biohacking & Human Optimization',
                "✦ Men's Health & Regenerative Wellness",
              ].map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <blockquote style={{ marginTop: '2rem', padding: '1.2rem', borderLeft: '2px solid #3DC898', background: 'rgba(61,200,152,0.05)', fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', fontStyle: 'italic', color: 'rgba(240,232,216,0.9)', lineHeight: 1.7 }}>
              &ldquo;Root cause medicine — finding and resolving the origin. Science meets spirit.&rdquo;
            </blockquote>
            <Link href="/about/meighen" style={{ display: 'inline-block', marginTop: '1.5rem', color: '#3DC898', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Read Dr. Meighen&rsquo;s full story →</Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" ref={addReveal as any} className="section-reveal" style={{ padding: '8rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ fontSize: '0.75rem', letterSpacing: '0.3em', color: '#C9963C', textTransform: 'uppercase', marginBottom: '1rem' }}>What We Offer</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 300 }}>Our Services</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {[
            { icon: '🔬', title: 'Precision Medicine', desc: 'Root-cause diagnostics & personalized protocols' },
            { icon: '🧪', title: 'Advanced Diagnostics', desc: 'Epigenetic testing, hormone panels, microbiome' },
            { icon: '💉', title: 'IV Therapy', desc: 'NAD+, Glutathione, B12, Beauty & Longevity drips' },
            { icon: '🌀', title: 'Spiritual Healing', desc: 'Reiki, chakra balancing, somatic release' },
            { icon: '🌿', title: 'Herbalism & Nature', desc: 'Ancestral plant medicine & natural remedies' },
            { icon: '🔥', title: 'Retreats & Ceremonies', desc: 'Sacred ceremonies & luxury healing experiences' },
            { icon: '💊', title: 'Regenerative Wellness', desc: 'Peptide therapy, longevity & performance' },
            { icon: '👑', title: 'Luxury Concierge', desc: 'Private, personalized wellness journeys' },
          ].map((service) => (
            <div key={service.title}
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,150,60,0.15)', borderRadius: '4px', padding: '2rem', transition: 'border-color 0.3s, background 0.3s', cursor: 'default' }}
              onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.borderColor = 'rgba(201,150,60,0.5)'; d.style.background = 'rgba(201,150,60,0.05)' }}
              onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.borderColor = 'rgba(201,150,60,0.15)'; d.style.background = 'rgba(255,255,255,0.03)' }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{service.icon}</div>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', color: '#C9963C', marginBottom: '0.5rem' }}>{service.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'rgba(240,232,216,0.6)', lineHeight: 1.6 }}>{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SIGNATURE PROGRAMS / DOCTOR PACKAGES */}
      <CarePackages />

      {/* QUOTE */}
      <section style={{ padding: '8rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden', background: 'rgba(201,150,60,0.05)', borderTop: '1px solid rgba(201,150,60,0.1)', borderBottom: '1px solid rgba(201,150,60,0.1)' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20rem', color: 'rgba(201,150,60,0.03)', pointerEvents: 'none' }}>☿</div>
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontStyle: 'italic', fontWeight: 300, maxWidth: '700px', margin: '0 auto', lineHeight: 1.5 }}>
          &ldquo;Science meets Spirit.<br />Nervous system regulation.<br />Human connection.&rdquo;
        </p>
      </section>

      {/* MEMBERSHIPS */}
      <section id="memberships" ref={addReveal as any} className="section-reveal" style={{ padding: '8rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ fontSize: '0.75rem', letterSpacing: '0.3em', color: '#C9963C', textTransform: 'uppercase', marginBottom: '1rem' }}>Invest in Yourself</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 300 }}>Membership Tiers</h2>
          <p style={{ color: 'rgba(240,232,216,0.6)', marginTop: '1rem', maxWidth: '500px', margin: '1rem auto 0' }}>Every journey begins with a single alchemy.</p>
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
      </section>

      {/* SIGNATURE IV COLLECTION */}
      <IVMenu />

      {/* LYRA — BELLA'S SPIRITUAL SPACE */}
      <section id="lyra" ref={addReveal as any} className="section-reveal" style={{ padding: '7rem 2rem', textAlign: 'center', background: 'radial-gradient(ellipse at center, rgba(224,96,144,0.07) 0%, transparent 65%)', position: 'relative', overflow: 'hidden' }}>
        {/* Floating particles of light */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          {Array.from({ length: 24 }).map((_, i) => {
            const size = 2 + (i % 5)
            return <span key={i} style={{
              position: 'absolute', borderRadius: '50%', width: `${size}px`, height: `${size}px`,
              left: `${(i * 37) % 100}%`, bottom: `${(i * 53) % 60}%`,
              background: 'radial-gradient(circle, rgba(240,232,216,0.9), rgba(224,96,144,0.2) 60%, transparent)',
              animation: `particleFloat ${7 + (i % 6)}s linear ${-(i * 0.7)}s infinite`,
            }} />
          })}
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: '1.4rem', color: '#C9963C', marginBottom: '0.75rem' }}>✧ ⋆ ˚ ☾ ˚ ⋆ ✧</div>
        <div style={{ fontSize: '0.75rem', letterSpacing: '0.3em', color: '#E06090', textTransform: 'uppercase', marginBottom: '1rem' }}>Holistic Wisdom · Bella&rsquo;s Space</div>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.2rem, 6vw, 4rem)', fontWeight: 300, letterSpacing: '0.2em', marginBottom: '1rem', background: 'linear-gradient(135deg, #F0E8D8, #C9963C, #E06090)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          Meet Lyra
        </h2>
        <p style={{ fontSize: '1.08rem', color: 'rgba(240,232,216,0.7)', maxWidth: 600, margin: '0 auto 2.5rem', lineHeight: 1.8 }}>
          An interactive space of holistic wisdom that reads your body, your patterns and your unconscious — and gives you a deep map of your soul. Where neuroscience and the soul speak with one voice.
        </p>
        <Link href="/lyra" style={{ background: 'linear-gradient(135deg, #C9963C, #E06090)', color: '#1a1020', padding: '1rem 2.75rem', borderRadius: '2px', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          Enter Lyra&rsquo;s Space →
        </Link>
        </div>
      </section>

      {/* ORION — DOCTOR'S CLINICAL INTELLIGENCE */}
      <section id="orion" ref={addReveal as any} className="section-reveal" style={{ padding: '7rem 2rem', textAlign: 'center', background: 'radial-gradient(ellipse at center, rgba(61,200,152,0.07) 0%, transparent 65%)', borderTop: '1px solid rgba(201,150,60,0.1)' }}>
        <div style={{ fontSize: '1.4rem', color: '#3DC898', marginBottom: '0.75rem' }}>◎ ⋆ ˚ ⚕ ˚ ⋆ ◎</div>
        <div style={{ fontSize: '0.75rem', letterSpacing: '0.3em', color: '#3DC898', textTransform: 'uppercase', marginBottom: '1rem' }}>Medical Intelligence · Dr. Meighen&rsquo;s Space</div>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.2rem, 6vw, 4rem)', fontWeight: 300, letterSpacing: '0.2em', marginBottom: '1rem', background: 'linear-gradient(135deg, #F0E8D8, #C9963C, #3DC898)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          Meet Orion
        </h2>
        <p style={{ fontSize: '1.08rem', color: 'rgba(240,232,216,0.7)', maxWidth: 620, margin: '0 auto 2.5rem', lineHeight: 1.8 }}>
          Orion is the clinical brain of the practice — Dr. Meighen&rsquo;s precision-medicine intelligence. It reads your labs and patient data, checks drug interactions against your full regimen, builds regenerative &amp; longevity protocols, and grounds every answer in real medical evidence. The science half of the alchemy.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://orion-danae.netlify.app/orion" target="_blank" rel="noopener noreferrer" style={{ background: 'linear-gradient(135deg, #3DC898, #2BB892)', color: '#062018', padding: '1rem 2.5rem', borderRadius: '2px', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Clinician / Member Access →
          </a>
          <Link href="/about/meighen" style={{ background: 'transparent', color: '#3DC898', padding: '1rem 2.5rem', border: '1px solid #3DC898', borderRadius: '2px', textDecoration: 'none', fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Dr. Meighen&rsquo;s Story
          </Link>
        </div>
      </section>

      {/* BIO-AGE CALCULATOR — medical hook */}
      <section ref={addReveal as any} className="section-reveal" style={{ padding: '6rem 2rem', textAlign: 'center', background: 'radial-gradient(ellipse at center, rgba(61,200,152,0.08) 0%, transparent 65%)', borderTop: '1px solid rgba(61,200,152,0.12)', borderBottom: '1px solid rgba(61,200,152,0.12)' }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🧬</div>
        <div style={{ fontSize: '0.75rem', letterSpacing: '0.3em', color: '#3DC898', textTransform: 'uppercase', marginBottom: '1rem' }}>Gratis · Respaldado por la ciencia</div>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5.5vw, 3.4rem)', fontWeight: 300, marginBottom: '1rem' }}>¿Cuál es tu edad biológica real?</h2>
        <p style={{ fontSize: '1.08rem', color: 'rgba(240,232,216,0.7)', maxWidth: 600, margin: '0 auto 2.2rem', lineHeight: 1.8 }}>
          Tu cuerpo tiene dos edades: la del calendario y la real. Descúbrela en 2 minutos con una evaluación de longevidad basada en marcadores validados, bajo el lente clínico del Dr. Michael J. Meighen, MD — y recibe tu reporte personalizado.
        </p>
        <Link href="/bio-age" style={{ background: 'linear-gradient(135deg, #3DC898, #C9963C)', color: '#06201a', padding: '1.1rem 2.8rem', borderRadius: '2px', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', display: 'inline-block' }}>
          Calcular mi edad biológica →
        </Link>
      </section>

      {/* DISCSEEL — regenerative spine procedure (bilingual EN/ES) */}
      <section ref={addReveal as any} className="section-reveal" style={{ padding: '5rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ background: 'linear-gradient(160deg, rgba(61,200,152,0.08), rgba(13,13,13,0.6))', border: '1px solid rgba(61,200,152,0.28)', borderRadius: '8px', padding: '2.6rem 2.2rem' }}>
          <div style={{ fontSize: '0.72rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: '#3DC898', marginBottom: '0.9rem' }}>Regenerative Spine Care · Cuidado regenerativo de columna</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 4.5vw, 2.8rem)', fontWeight: 300, lineHeight: 1.15, marginBottom: '0.4rem' }}>
            DiscSeel® — A Non-Surgical Alternative for Chronic Back &amp; Neck Pain
          </h2>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '1.2rem', color: '#E4B85A', marginBottom: '1.6rem' }}>
            Alternativa NO quirúrgica para el dolor crónico de espalda y cuello
          </p>
          <p style={{ fontSize: '0.98rem', color: 'rgba(240,232,216,0.82)', lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong style={{ color: '#3DC898' }}>EN ·</strong> For chronic back and neck pain caused by damaged or torn spinal discs, the DiscSeel® Procedure uses <strong style={{ color: '#F0E8D8' }}>Fibrin</strong> — a natural biologic sealant — to seal the tears and stimulate the disc&rsquo;s own healing. No surgery, no fusion: a single image-guided injection. Dr. Meighen is one of only <strong style={{ color: '#F0E8D8' }}>~30 DiscSeel®-trained providers in the world.</strong>
          </p>
          <p style={{ fontSize: '0.98rem', color: 'rgba(240,232,216,0.7)', lineHeight: 1.8, marginBottom: '1.8rem' }}>
            <strong style={{ color: '#3DC898' }}>ES ·</strong> Para el dolor crónico de espalda y cuello por discos dañados o con desgarros, el procedimiento DiscSeel® usa <strong style={{ color: '#F0E8D8' }}>Fibrina</strong> —un sellador biológico natural— para sellar los desgarros y estimular la reparación del propio disco. Sin cirugía, sin fusión: una sola inyección guiada por imagen. El Dr. Meighen es uno de los <strong style={{ color: '#F0E8D8' }}>~30 proveedores entrenados en DiscSeel® del mundo.</strong>
          </p>
          <Link href="/booking" style={{ background: 'linear-gradient(135deg, #3DC898, #C9963C)', color: '#06201a', padding: '1rem 2.4rem', borderRadius: '2px', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'inline-block' }}>
            Ask about DiscSeel® · Pregunta por DiscSeel® →
          </Link>
          <p style={{ fontSize: '0.72rem', color: 'rgba(240,232,216,0.4)', marginTop: '1.4rem', lineHeight: 1.6 }}>
            Each case is individually evaluated by Dr. Meighen. · Cada caso lo evalúa el Dr. Meighen de forma individual.
          </p>
        </div>
      </section>

      {/* THERAPIES */}
      <section id="therapies" ref={addReveal as any} className="section-reveal" style={{ padding: '8rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
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
              <p style={{ fontSize: '0.85rem', color: 'rgba(240,232,216,0.6)', lineHeight: 1.7 }}>{t.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SHOP / APOTHECARY */}
      <section id="shop" ref={addReveal as any} className="section-reveal" style={{ padding: '8rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ fontSize: '0.75rem', letterSpacing: '0.3em', color: '#E06090', textTransform: 'uppercase', marginBottom: '1rem' }}>The Apothecary</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 300 }}>Take the Ritual Home</h2>
          <p style={{ color: 'rgba(240,232,216,0.6)', marginTop: '1rem', maxWidth: '560px', margin: '1rem auto 0' }}>Physician-formulated supplements and sacred self-care — to continue your alchemy between visits.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {SHOP_PRODUCTS.map(p => (
            <div key={p.id} style={{ background: '#0D0D0D', border: '1px solid rgba(201,150,60,0.18)', borderRadius: '6px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', aspectRatio: '1 / 1', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at 50% 40%, #161616, #0a0a0a)', borderBottom: '1px solid rgba(201,150,60,0.12)' }}>
                {p.tag && <span style={{ position: 'absolute', top: '12px', left: '12px', fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#E4B85A', border: '1px solid rgba(201,150,60,0.3)', borderRadius: '30px', padding: '3px 10px' }}>{p.tag}</span>}
                <svg viewBox="0 0 58 58" fill="none" style={{ width: '44%', height: '44%', color: '#C9963C', opacity: 0.6 }} dangerouslySetInnerHTML={{ __html: p.icon }} />
              </div>
              <div style={{ padding: '1.5rem 1.4rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', color: '#F0E8D8', marginBottom: '0.4rem' }}>{p.name}</h3>
                <p style={{ fontSize: '0.82rem', color: 'rgba(240,232,216,0.6)', lineHeight: 1.6, marginBottom: '1.2rem', flex: 1 }}>{p.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.6rem' }}>
                  <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: '#E4B85A' }}>{p.price}</span>
                  <button onClick={() => handleAddToCart(p.name)} style={{
                    fontFamily: 'Jost, sans-serif', fontSize: '0.66rem', letterSpacing: '0.16em', textTransform: 'uppercase',
                    color: '#F0E8D8', border: '1px solid #C9963C', background: 'transparent', borderRadius: '2px',
                    padding: '0.6rem 1rem', cursor: 'pointer'
                  }}>Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '0.78rem', color: 'rgba(240,232,216,0.4)' }}>Sample products — to be connected to live Shopify inventory &amp; secure checkout.</p>
      </section>

      {/* PROTOCOLS */}
      <section id="protocols" ref={addReveal as any} className="section-reveal" style={{ padding: '6rem 2rem', background: 'rgba(201,150,60,0.03)', borderTop: '1px solid rgba(201,150,60,0.1)', borderBottom: '1px solid rgba(201,150,60,0.1)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div style={{ fontSize: '0.75rem', letterSpacing: '0.3em', color: '#C9963C', textTransform: 'uppercase', marginBottom: '1rem' }}>Holistic Protocols</div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 300 }}>Four Paths to Healing</h2>
            <p style={{ color: 'rgba(240,232,216,0.6)', marginTop: '1rem', maxWidth: '560px', margin: '1rem auto 0' }}>{SPECIAL_OFFER.headline}. {SPECIAL_OFFER.perk}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {protocols.map(p => (
              <div key={p.id} style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(201,150,60,0.2)', borderRadius: '4px', padding: '1.75rem' }}>
                <div style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: '#3DC898', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Protocol {p.number}</div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', color: '#C9963C', marginBottom: '0.5rem' }}>{p.name}</div>
                <p style={{ fontSize: '0.8rem', color: 'rgba(240,232,216,0.55)', lineHeight: 1.6, marginBottom: '1rem', fontStyle: 'italic' }}>{p.focus}</p>
                <ul style={{ listStyle: 'none', fontSize: '0.78rem', lineHeight: 1.8, color: 'rgba(240,232,216,0.7)' }}>
                  {p.modalities.map(m => <li key={m.modality}>✦ <strong style={{ color: 'rgba(240,232,216,0.9)' }}>{m.modality}</strong></li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE SCIENCE */}
      <section id="science" ref={addReveal as any} className="section-reveal" style={{ padding: '8rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ fontSize: '0.75rem', letterSpacing: '0.3em', color: '#3DC898', textTransform: 'uppercase', marginBottom: '1rem' }}>Evidence-Based</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 300 }}>The Science</h2>
          <p style={{ color: 'rgba(240,232,216,0.6)', marginTop: '1rem', maxWidth: '560px', margin: '1rem auto 0' }}>Beyond allopathic — but never beyond evidence. A few of the studies behind the work.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {citations.map(c => (
            <div key={c.id} style={{ background: 'rgba(255,255,255,0.02)', borderLeft: '2px solid #3DC898', borderRadius: '0 4px 4px 0', padding: '1.5rem 1.75rem' }}>
              <p style={{ fontSize: '0.95rem', color: 'rgba(240,232,216,0.85)', lineHeight: 1.7, marginBottom: '0.75rem' }}>{c.finding}</p>
              <a href={c.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', color: '#C9963C', textDecoration: 'none', letterSpacing: '0.03em' }}>{c.citation} ↗</a>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '0.7rem', color: 'rgba(240,232,216,0.3)', lineHeight: 1.7, maxWidth: '560px', margin: '2.5rem auto 0' }}>
          This information is educational and is not medical advice, diagnosis, or treatment. Always consult Dr. Meighen or a qualified provider regarding your individual care.
        </p>
      </section>

      {/* FAQ — SEO featured snippets + GEO (AI answer engines) */}
      <section id="faq" ref={addReveal as any} className="section-reveal" style={{ padding: '8rem 2rem', maxWidth: '820px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ fontSize: '0.75rem', letterSpacing: '0.3em', color: '#C9963C', textTransform: 'uppercase', marginBottom: '1rem' }}>Questions &amp; Answers</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 300 }}>Frequently Asked Questions</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
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

      {/* FOOTER */}
      <footer style={{ background: '#0A0A0A', borderTop: '1px solid rgba(201,150,60,0.2)', padding: '4rem 2rem 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <div style={{ flex: 2, minWidth: '250px' }}>
              <img src="/logo-alchemized.png" alt="Alchemized BioHealing Institute" style={{ height: '64px', width: 'auto', objectFit: 'contain', marginBottom: '1rem' }} />
              <p style={{ fontSize: '0.85rem', color: 'rgba(240,232,216,0.5)', lineHeight: 1.8, maxWidth: '320px' }}>Where vanguard science meets the soul. Integral healing of body &amp; soul.<br/>By Holistic Bella Vargas LLC &amp; Michael J. Meighen, MD.</p>
            </div>
            <div style={{ flex: 1, minWidth: '150px' }}>
              <div style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9963C', marginBottom: '1rem' }}>Services</div>
              {['Precision Medicine', 'IV Therapy', 'Reiki & Healing', 'Peptide Therapy', 'Soul Assessment'].map(s => (
                <div key={s} style={{ fontSize: '0.85rem', color: 'rgba(240,232,216,0.5)', marginBottom: '0.5rem' }}>{s}</div>
              ))}
            </div>
            <div style={{ flex: 1, minWidth: '150px' }}>
              <div style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9963C', marginBottom: '1rem' }}>Navigate</div>
              {[['Lyra · Soul Space', '/lyra'], ['Retreats · Samaná', '/retreats'], ['Assessment', '/assessment'], ['Book a Session', '/booking']].map(([label, href]) => (
                <Link key={href} href={href} style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(240,232,216,0.5)', textDecoration: 'none', marginBottom: '0.5rem' }}>{label}</Link>
              ))}
            </div>
            <div style={{ flex: 1, minWidth: '170px' }}>
              <div style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9963C', marginBottom: '1rem' }}>Visit</div>
              <p style={{ fontSize: '0.85rem', color: 'rgba(240,232,216,0.5)', lineHeight: 1.8, marginBottom: '0.75rem' }}>Centner Wellness — Coral Gables<br />2970 Coral Way<br />Miami, FL 33145</p>
              <a href="tel:+13053053820" style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(240,232,216,0.5)', textDecoration: 'none' }}>305-305-3820</a>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(201,150,60,0.1)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'rgba(240,232,216,0.3)' }}>© 2026 Alchemized BioHealing Institute. All rights reserved.</div>
            <div style={{ fontSize: '0.75rem', color: '#C9963C', opacity: 0.8 }}>Hablamos español · We welcome you in English &amp; Spanish</div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(240,232,216,0.3)' }}>Built by <span style={{ color: '#C9963C' }}>Danae Pozo</span> · Blue Ocean AI Systems · Miami</div>
          </div>
        </div>
      </footer>

      {/* Cart toast (placeholder until Shopify checkout is wired) */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 200,
          background: 'rgba(13,13,13,0.96)', border: '1px solid rgba(201,150,60,0.4)', color: '#F0E8D8',
          padding: '0.85rem 1.6rem', borderRadius: '30px', fontSize: '0.85rem', letterSpacing: '0.04em',
          boxShadow: '0 10px 40px rgba(0,0,0,0.6)'
        }}>{toast}</div>
      )}

      <LuminaChat />
    </main>
  )
}

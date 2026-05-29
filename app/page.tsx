'use client'

import { useEffect, useRef } from 'react'
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

export default function Home() {
  const revealRefs = useRef<HTMLElement[]>([])

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
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {['About', 'Services', 'Team', 'Memberships'].map(item => (
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
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '120px 2rem 4rem', textAlign: 'center',
        background: 'radial-gradient(ellipse at center top, rgba(201,150,60,0.08) 0%, transparent 60%)'
      }}>
        <div className="animate-breathe" style={{
          display: 'inline-block', padding: 'clamp(1.5rem, 4vw, 3.25rem)', marginBottom: '2rem',
          border: '1.5px solid rgba(201,150,60,0.6)', borderRadius: '10px',
          boxShadow: '0 0 65px rgba(201,150,60,0.3), inset 0 0 45px rgba(201,150,60,0.06)'
        }}>
          <img src="/logo-alchemized.png" alt="Alchemized BioHealing Institute" style={{
            width: 'clamp(280px, 58vw, 540px)', maxWidth: '86vw', height: 'auto', display: 'block',
            filter: 'drop-shadow(0 0 30px rgba(201,150,60,0.35))'
          }} />
        </div>
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
            <div key={tier.name} style={{ background: tier.featured ? 'rgba(201,150,60,0.08)' : 'rgba(255,255,255,0.02)', border: `1px solid ${tier.featured ? tier.color : 'rgba(201,150,60,0.2)'}`, borderRadius: '4px', padding: '2rem', position: 'relative', overflow: 'hidden', transform: tier.featured ? 'scale(1.02)' : 'scale(1)' }}>
              {tier.featured && <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: '#C9963C', color: '#000', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', padding: '0.2rem 0.5rem', borderRadius: '2px', textTransform: 'uppercase' }}>Popular</div>}
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
      <section id="lyra" ref={addReveal as any} className="section-reveal" style={{ padding: '7rem 2rem', textAlign: 'center', background: 'radial-gradient(ellipse at center, rgba(224,96,144,0.07) 0%, transparent 65%)' }}>
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
          </div>
          <div style={{ borderTop: '1px solid rgba(201,150,60,0.1)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'rgba(240,232,216,0.3)' }}>© 2026 Alchemized BioHealing Institute. All rights reserved.</div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(240,232,216,0.3)' }}>Built by <span style={{ color: '#C9963C' }}>Danae Pozo</span> · Blue Ocean AI Systems · Miami</div>
          </div>
        </div>
      </footer>

      <LuminaChat />
    </main>
  )
}

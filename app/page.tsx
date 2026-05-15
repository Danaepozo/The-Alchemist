'use client'

import { useEffect, useRef } from 'react'
import LuminaChat from '@/components/LuminaChat'
import Link from 'next/link'

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
        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 600, color: '#C9963C', letterSpacing: '0.15em' }}>
          ☿ THE ALCHEMIST
        </div>
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
          fontSize: '5rem', color: '#C9963C', marginBottom: '1.5rem',
          textShadow: '0 0 40px rgba(201,150,60,0.5), 0 0 80px rgba(201,150,60,0.2)'
        }}>☿</div>
        <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.8rem', letterSpacing: '0.3em', color: '#C9963C', textTransform: 'uppercase', marginBottom: '1rem' }}>
          Miami · Integrative Wellness
        </div>
        <h1 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(2.8rem, 7vw, 6rem)', fontWeight: 300, lineHeight: 1.1, marginBottom: '1.5rem',
          background: 'linear-gradient(135deg, #F0E8D8 0%, #C9963C 50%, #F0E8D8 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
        }}>
          Where Science<br />meets Spirit
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'rgba(240,232,216,0.7)', marginBottom: '3rem', maxWidth: '500px', lineHeight: 1.7 }}>
          Nervous system regulation. Human connection.<br />Precision medicine for the whole self.
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
          At The Alchemist, we blend the precision of functional medicine with the wisdom of ancestral healing.
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
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ fontSize: '0.75rem', letterSpacing: '0.3em', color: '#C9963C', textTransform: 'uppercase', marginBottom: '1rem' }}>The Team</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 300 }}>Meet Your Practitioners</h2>
        </div>
        <div style={{ display: 'flex', gap: '2rem', maxWidth: '1100px', margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
          {/* Bella Vargas */}
          <div style={{ flex: '1', minWidth: '320px', maxWidth: '500px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,150,60,0.2)', borderRadius: '4px', padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #E06090, #C9963C)' }} />
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🌿</div>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', fontWeight: 400, color: '#C9963C', marginBottom: '0.25rem' }}>Bella Vargas</h3>
            <p style={{ fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#E06090', marginBottom: '1.5rem' }}>Holistic Wellness Practitioner</p>
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
          </div>
          {/* Dr. Meighen */}
          <div style={{ flex: '1', minWidth: '320px', maxWidth: '500px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,150,60,0.2)', borderRadius: '4px', padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #3DC898, #C9963C)' }} />
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔬</div>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', fontWeight: 400, color: '#C9963C', marginBottom: '0.25rem' }}>Dr. Michael J. Meighen</h3>
            <p style={{ fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#3DC898', marginBottom: '1.5rem' }}>MD — Precision & Functional Medicine</p>
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
          {[
            { name: 'The First Alchemy', price: '$199', original: '$399', note: 'No commitment', desc: 'Your entry into the alchemical world.', features: ['Soul Assessment', 'Lumina AI Consultation', '1 Introductory Session', 'Personalized Roadmap'], color: '#3DC898', featured: false },
            { name: 'The 21-Day Alchemy', price: '$499', original: '$899', note: '21-day protocol', desc: 'A complete 21-day nervous system reset.', features: ['All First Alchemy perks', '3 Weekly Sessions', 'IV Therapy Included', 'Daily Lumina Support'], color: '#C9963C', featured: false },
            { name: 'The Alchemist', price: '$850/mo', original: null, promo: '1st month $590', note: 'Monthly membership', desc: 'Your ongoing alchemical practice.', features: ['4 Sessions/Month', 'Priority Booking', 'Member Pricing on IVs', 'Soul Readings'], color: '#C9963C', featured: true },
            { name: 'The Limitless Protocol', price: '$2,200/mo', original: null, promo: '1st month $1,490', note: 'Full access', desc: 'Unlimited access to the full spectrum.', features: ['Unlimited Sessions', 'Concierge Scheduling', 'All IV Therapy', 'Quarterly Retreats'], color: '#E4B85A', featured: false },
            { name: 'The Inner Circle', price: '$4,500/mo', original: null, note: 'Annual · Invitation only · 12 max', desc: 'The highest tier of transformation.', features: ['Everything Limitless', 'Private Ceremonies', 'Dr. Meighen Direct Access', 'Annual Retreat'], color: '#C9963C', featured: false, exclusive: true },
          ].map((tier: any) => (
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
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: '#C9963C', marginBottom: '1rem' }}>☿ THE ALCHEMIST</div>
              <p style={{ fontSize: '0.85rem', color: 'rgba(240,232,216,0.5)', lineHeight: 1.8, maxWidth: '300px' }}>Miami&rsquo;s premier integrative wellness destination.</p>
            </div>
            <div style={{ flex: 1, minWidth: '150px' }}>
              <div style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9963C', marginBottom: '1rem' }}>Services</div>
              {['Precision Medicine', 'IV Therapy', 'Reiki & Healing', 'Peptide Therapy', 'Soul Assessment'].map(s => (
                <div key={s} style={{ fontSize: '0.85rem', color: 'rgba(240,232,216,0.5)', marginBottom: '0.5rem' }}>{s}</div>
              ))}
            </div>
            <div style={{ flex: 1, minWidth: '150px' }}>
              <div style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9963C', marginBottom: '1rem' }}>Navigate</div>
              {[['Assessment', '/assessment'], ['Book a Session', '/booking'], ['Admin', '/admin']].map(([label, href]) => (
                <Link key={href} href={href} style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(240,232,216,0.5)', textDecoration: 'none', marginBottom: '0.5rem' }}>{label}</Link>
              ))}
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(201,150,60,0.1)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'rgba(240,232,216,0.3)' }}>© 2026 The Alchemist Miami. All rights reserved.</div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(240,232,216,0.3)' }}>Built by <span style={{ color: '#C9963C' }}>Danae Pozo</span> · Blue Ocean AI Systems · Miami</div>
          </div>
        </div>
      </footer>

      <LuminaChat />
    </main>
  )
}

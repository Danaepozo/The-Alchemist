import type { Metadata } from 'next'
import Link from 'next/link'
import AboutShell from '@/components/AboutShell'

export const metadata: Metadata = {
  title: 'Blenedy Vargas — Holistic Bella | Where Science Meets Spirit',
  description: 'Meet Holistic Bella: founder of Alchemized BioHealing Institute, spiritual guide, IV Therapy specialist and nervous system regulation expert. Integrative healing in Miami.',
  keywords: 'Holistic Bella, Alchemized BioHealing Institute, IV Therapy Miami, nervous system regulation, healing retreats, holistic coaching',
}

const ROSE = '#E06090'
const GOLD = '#C9963C'
const CREAM = '#F0E8D8'

const eyebrow = (color = GOLD): React.CSSProperties => ({ fontSize: '0.72rem', letterSpacing: '0.32em', color, textTransform: 'uppercase', fontFamily: "'Jost', sans-serif" })
const h2: React.CSSProperties = { fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.9rem, 4.5vw, 3rem)', fontWeight: 300, lineHeight: 1.15 }
const body: React.CSSProperties = { fontSize: '1.04rem', lineHeight: 1.85, color: 'rgba(240,232,216,0.78)' }
const section: React.CSSProperties = { padding: 'clamp(4rem, 9vw, 7rem) 1.5rem', maxWidth: 980, margin: '0 auto' }

export default function BellaPage() {
  return (
    <AboutShell>
      {/* 1 — HERO */}
      <header style={{ minHeight: '92vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '5rem 1.5rem 3rem', background: 'radial-gradient(ellipse at 50% 28%, rgba(224,96,144,0.16) 0%, transparent 58%), radial-gradient(ellipse at 50% 100%, rgba(201,150,60,0.10) 0%, transparent 60%), #050308' }}>
        <div className="animate-fade-in-up" style={{ ...eyebrow(ROSE), marginBottom: '1.75rem' }}>Lyra · Project Alchemy</div>
        <h1 className="animate-fade-in-up" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(3rem, 11vw, 7rem)', fontWeight: 300, lineHeight: 1, letterSpacing: '0.02em', margin: 0, background: 'linear-gradient(135deg, #F0E8D8 0%, #C9963C 45%, #E06090 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          Blenedy Vargas
        </h1>
        <p className="animate-fade-in-up" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(1.3rem, 3.5vw, 1.9rem)', color: ROSE, marginTop: '0.75rem' }}>Holistic Bella<sup style={{ fontSize: '0.6em' }}>®</sup></p>
        <p style={{ marginTop: '2.25rem', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(1.1rem, 2.6vw, 1.4rem)', color: 'rgba(240,232,216,0.85)', maxWidth: 540, lineHeight: 1.5 }}>
          &ldquo;Where science and spirit meet.&rdquo;
        </p>
        <div aria-hidden style={{ marginTop: '3.5rem', color: 'rgba(240,232,216,0.4)', fontSize: '0.75rem', letterSpacing: '0.2em' }}>↓ Scroll</div>
      </header>

      {/* 2 — INTRODUCTION */}
      <section style={section}>
        <p style={{ ...body, fontSize: '1.15rem', marginBottom: '1.75rem' }}>
          Blenedy Vargas, known internationally as <strong style={{ color: GOLD }}>Holistic Bella®</strong>, is a holistic wellness entrepreneur, spiritual guide, speaker, and founder of the <strong style={{ color: GOLD }}>Alchemized BioHealing Institute</strong> — a space born from one clear vision: that true healing happens when clinical science and ancestral wisdom stop being opposites and recognize themselves as two sides of the same medicine.
        </p>
        <p style={body}>
          Her work moves through territory few navigate with her depth: the intersection of applied neuroscience, nervous system regulation, integrative medicine, and spiritual awakening. She is not another coach, not another therapist, not another facilitator. Bella is an <strong style={{ color: ROSE }}>architect of integral wellbeing</strong> — someone who designs experiences where body, mind, emotions, and spirit find the same frequency.
        </p>
      </section>

      {/* 3 — ACADEMIC BACKGROUND */}
      <section style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(201,150,60,0.12)', borderBottom: '1px solid rgba(201,150,60,0.12)' }}>
        <div style={section}>
          <div style={{ ...eyebrow(), marginBottom: '0.75rem' }}>Academic Background</div>
          <h2 style={{ ...h2, marginBottom: '2.5rem', fontStyle: 'italic', color: CREAM }}>A disciplined mind in service of an awakened heart.</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2.5rem' }}>
            {[
              ['Hospitality and Tourism', 'Universidad del Caribe'],
              ['Theology and Clinical Psychology', 'Universidad Nacional Evangélica'],
              ['Nursing and Health Services Administration', 'Florida National University'],
              ['Intravenous Therapies, Wellness & Complementary Clinical Preparation', 'Saint Petersburg College'],
            ].map(([t, s], i) => (
              <div key={i} style={{ display: 'flex', gap: '1.25rem', alignItems: 'baseline', padding: '1rem 1.25rem', borderLeft: `2px solid ${ROSE}`, background: 'rgba(224,96,144,0.04)' }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", color: GOLD, fontSize: '1.3rem', minWidth: '2.2rem' }}>0{i + 1}</span>
                <div>
                  <div style={{ color: CREAM, fontSize: '1.02rem', fontWeight: 500 }}>{t}</div>
                  <div style={{ color: 'rgba(240,232,216,0.5)', fontSize: '0.85rem', marginTop: '0.15rem' }}>{s}</div>
                </div>
              </div>
            ))}
          </div>
          <p style={body}>
            This multidisciplinary foundation is the clinical bedrock beneath her entire practice. Bella understands the body through physiology and pathology, knows the mind through clinical psychology and theology, and honors the spirit through direct experience with ancestral traditions.
          </p>
        </div>
      </section>

      {/* 4 — CERTIFICATIONS */}
      <section style={section}>
        <div style={{ textAlign: 'center', marginBottom: '3rem', maxWidth: 720, margin: '0 auto 3rem' }}>
          <div style={{ ...eyebrow(), marginBottom: '0.75rem' }}>Certifications</div>
          <h2 style={{ ...h2, fontStyle: 'italic', color: CREAM }}>Each certification is an instrument. Each instrument, another way of listening to the soul.</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          {[
            ['✦', 'Holistic Health Practitioner (HHP)'],
            ['❡', 'Holistic Health Coach'],
            ['☀', 'Happiness Coach — Certified by Harvard'],
            ['◈', 'Life Coach'],
            ['✸', 'Reiki Master'],
            ['❂', 'Energy Cleansing & Chakra Specialist'],
            ['⌘', 'Applied Neuroscience for Wellbeing'],
            ['🜂', 'Ancestral Medicine & Emotional-Spiritual Integration'],
          ].map(([icon, label], i) => (
            <div key={i} className="abh-card" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,150,60,0.2)', borderRadius: 8, padding: '1.5rem' }}>
              <div style={{ fontSize: '1.4rem', color: ROSE, marginBottom: '0.75rem' }}>{icon}</div>
              <div style={{ fontSize: '0.95rem', color: 'rgba(240,232,216,0.88)', lineHeight: 1.5 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 5 — THE ANCESTRAL PATH */}
      <section style={{ background: 'rgba(224,96,144,0.03)', borderTop: '1px solid rgba(201,150,60,0.12)', borderBottom: '1px solid rgba(201,150,60,0.12)' }}>
        <div style={{ ...section, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          <div style={{ minHeight: 280, borderRadius: 12, background: 'linear-gradient(160deg, rgba(224,96,144,0.5), rgba(201,150,60,0.35) 70%, rgba(13,13,13,0.9))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '4rem', color: 'rgba(255,255,255,0.85)', letterSpacing: '0.1em' }}>🜂</div>
          </div>
          <div>
            <div style={{ ...eyebrow(ROSE), marginBottom: '0.75rem' }}>The Ancestral Path</div>
            <h2 style={{ ...h2, marginBottom: '1.5rem', color: CREAM }}>Credentials don&rsquo;t define her. What shaped her was walking.</h2>
            <p style={{ ...body, marginBottom: '1.25rem' }}>
              Bella has studied and learned directly in <strong style={{ color: GOLD }}>Guatemala, Mexico, and Colombia</strong>, working shoulder to shoulder with shamans, spiritual masters, medicine grandmothers, and indigenous communities carrying Maya, Mexica, and Amazonian lineages. She didn&rsquo;t read about ancestral cosmovisions in books — she sat by the fire with those who have lived them for centuries.
            </p>
            <p style={{ ...body, fontStyle: 'italic', color: ROSE }}>That knowledge cannot be bought. It is transmitted. And it is honored.</p>
          </div>
        </div>
      </section>

      {/* 6 — IV THERAPY EXPERTISE */}
      <section style={{ background: 'linear-gradient(180deg, #0a0710, #000)' }}>
        <div style={section}>
          <div style={{ ...eyebrow(), marginBottom: '0.75rem' }}>Biohacking Wellness</div>
          <h2 style={{ ...h2, marginBottom: '1.5rem', color: CREAM }}>Pioneer in homeopathic, preservative-free IV Therapy</h2>
          <p style={{ ...body, marginBottom: '1.5rem' }}>
            Bella is one of the pioneers in her community to advance <strong style={{ color: GOLD }}>homeopathic</strong> intravenous therapy — preservative-free, formulated with a cleaner, more conscious, and more holistic vision of wellbeing. Her IV Therapy protocols are designed to support:
          </p>
          <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.6rem 1.5rem', marginBottom: '1.75rem' }}>
            {['Cellular energy and vitality', 'Nervous system regulation', 'Recovery from stress, travel, and burnout', 'Reduction of chronic inflammation', 'Deep cellular hydration', 'Integral body optimization'].map((it, i) => (
              <li key={i} style={{ position: 'relative', paddingLeft: '1.4rem', fontSize: '0.98rem', color: 'rgba(240,232,216,0.85)', lineHeight: 1.6 }}><span style={{ position: 'absolute', left: 0, color: ROSE }}>✦</span>{it}</li>
            ))}
          </ul>
          <blockquote style={{ borderLeft: `2px solid ${ROSE}`, paddingLeft: '1.5rem', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', fontStyle: 'italic', color: 'rgba(240,232,216,0.92)', lineHeight: 1.6 }}>
            You&rsquo;re not receiving an IV. You&rsquo;re receiving a sacred pause for the body.
          </blockquote>
        </div>
      </section>

      {/* 7 — SERVICES & PROGRAMS */}
      <section style={{ ...section, maxWidth: 1100 }}>
        <div style={{ ...eyebrow(), marginBottom: '0.75rem', textAlign: 'center' }}>Services &amp; Programs</div>
        <h2 style={{ ...h2, textAlign: 'center', marginBottom: '3rem', color: CREAM }}>How Bella accompanies you</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {[
            ['International Healing & Reconnection Retreats', 'Immersive experiences in places of power.'],
            ['Holistic Therapies & Emotional Coaching', '1:1 accompaniment for deep transformation.'],
            ['Spiritual Ceremonies & Conscious Integration', 'Sacred spaces for the soul.'],
            ['Nervous System Education', 'Programs to regulate body and emotion.'],
            ['Luxury Wellness Experiences', 'Wellbeing curated with care and elegance.'],
            ['IV Therapy & Biohacking Wellness', 'Clinical IV with holistic vision.'],
            ['Happiness, Purpose & Alignment Programs', 'For those choosing to live awake.'],
            ['Speaking Engagements & Motivational Content', 'Talks that awaken communities.'],
            ['Personal & Spiritual Transformation Mentorships', 'Companionship along the path.'],
          ].map(([t, d], i) => (
            <div key={i} className="abh-card" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,150,60,0.18)', borderRadius: 8, padding: '1.5rem' }}>
              <div style={{ fontSize: '1.3rem', marginBottom: '0.6rem' }}>🌿</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', color: GOLD, marginBottom: '0.35rem', fontWeight: 400 }}>{t}</h3>
              <p style={{ fontSize: '0.88rem', color: 'rgba(240,232,216,0.6)', lineHeight: 1.6 }}>{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8 — PHILOSOPHY */}
      <section style={{ background: 'radial-gradient(ellipse at center, rgba(224,96,144,0.08), transparent 70%)', borderTop: '1px solid rgba(201,150,60,0.1)', borderBottom: '1px solid rgba(201,150,60,0.1)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: 'clamp(5rem, 10vw, 8rem) 1.5rem', textAlign: 'center' }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.5rem, 4vw, 2.4rem)', fontStyle: 'italic', fontWeight: 300, lineHeight: 1.5, color: CREAM }}>
            &ldquo;True healing happens when a person aligns their body, mind, emotions, and spirit. Wellbeing is not the absence of illness — it is the capacity to feel alive, connected, and in harmony with oneself and with others.&rdquo;
          </p>
          <div style={{ marginTop: '1.75rem', ...eyebrow(ROSE) }}>— Holistic Bella</div>
        </div>
      </section>

      {/* 9 — CTA */}
      <section style={{ ...section, maxWidth: 720 }}>
        <div style={{ background: 'linear-gradient(160deg, rgba(224,96,144,0.1), rgba(201,150,60,0.06))', border: '1px solid rgba(201,150,60,0.3)', borderRadius: 14, padding: 'clamp(2.5rem, 6vw, 4rem)', textAlign: 'center' }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.4rem, 3.5vw, 2rem)', fontWeight: 300, color: CREAM, marginBottom: '2rem' }}>Every path begins with a conversation. Begin yours.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/lyra" style={{ background: `linear-gradient(135deg, ${GOLD}, #E4B85A)`, color: '#000', padding: '1rem 2.5rem', borderRadius: 2, textDecoration: 'none', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Meet Lyra</Link>
            <Link href="/booking" style={{ background: 'transparent', color: ROSE, padding: '1rem 2.5rem', border: `1px solid ${ROSE}`, borderRadius: 2, textDecoration: 'none', fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Book Your Session</Link>
          </div>
        </div>
      </section>

      {/* 10 — TRANSITION TO ORION */}
      <section style={{ maxWidth: 980, margin: '0 auto', padding: '0 1.5rem clamp(5rem, 9vw, 7rem)' }}>
        <Link href="/about/meighen" className="abh-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', textDecoration: 'none', background: 'rgba(61,200,152,0.04)', border: '1px solid rgba(61,200,152,0.25)', borderRadius: 12, padding: '1.75rem 2rem' }}>
          <div>
            <div style={{ ...eyebrow('#3DC898'), marginBottom: '0.4rem' }}>Orion · Project Alchemy</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', color: CREAM }}>Project Alchemy stands on two pillars. Meet Dr. Michael Meighen</div>
          </div>
          <span style={{ color: '#3DC898', fontSize: '1.5rem', flexShrink: 0 }}>→</span>
        </Link>
      </section>
    </AboutShell>
  )
}

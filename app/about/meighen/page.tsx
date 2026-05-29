import type { Metadata } from 'next'
import Link from 'next/link'
import AboutShell from '@/components/AboutShell'

export const metadata: Metadata = {
  title: 'Dr. Michael J. Meighen, MD — Regenerative Medicine & Longevity | Project Alchemy',
  description: 'Board-certified specialist in Physical Medicine, Rehabilitation, and Pain Medicine. Expert in regenerative medicine, PRP, stem cells, hormone optimization, and longevity protocols.',
  keywords: 'Dr. Michael Meighen, regenerative medicine, PRP, stem cell therapy, peptide therapy, longevity, hormone replacement, pain management, livelimitlessmd',
}

const TEAL = '#3DC898'
const GOLD = '#C9963C'
const CREAM = '#F0E8D8'

const eyebrow = (color = GOLD): React.CSSProperties => ({ fontSize: '0.72rem', letterSpacing: '0.32em', color, textTransform: 'uppercase', fontFamily: "'Jost', sans-serif" })
const h2: React.CSSProperties = { fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.9rem, 4.5vw, 3rem)', fontWeight: 300, lineHeight: 1.15 }
const body: React.CSSProperties = { fontSize: '1.04rem', lineHeight: 1.85, color: 'rgba(240,232,216,0.78)' }
const section: React.CSSProperties = { padding: 'clamp(4rem, 9vw, 7rem) 1.5rem', maxWidth: 980, margin: '0 auto' }

const SPECIALTIES: { icon: string; title: string; items: string[] }[] = [
  { icon: '🦴', title: 'Interventional Regenerative Medicine', items: ['Prolotherapy / Prolozone', 'PRP (Platelet Rich Plasma)', 'Mesenchymal Stem Cells (Bone Marrow + Fat-derived)', 'Exosome Therapy', 'Image-guided procedures (ultrasound + fluoroscopy)'] },
  { icon: '💪', title: 'Musculoskeletal Health', items: ['Osteoarthritis (knee, shoulder, hip, spine)', 'Rotator cuff injuries', 'Chronic tendinopathies', 'Ligament injuries (including ACL)', 'Degenerative disc disease'] },
  { icon: '⚡', title: 'Bio-identical Hormone Optimization', items: ['Testosterone, Estrogen, Progesterone', 'Thyroid, Cortisol, DHEA', 'Growth Hormone (via analog peptides)', 'Melatonin, Insulin', 'Proactive quarterly evaluation'] },
  { icon: '🧬', title: 'Peptide Therapy', items: ['Recovery: BPC-157, TB-500, AOD-9604', 'GH analogs: Sermorelin, Tesamorelin, CJC-1295', 'Ghrelin mimetics: Ipamorelin, MK-677', 'Longevity: Epithalon, Thymulin, GHK-Cu', 'Mitochondrial: Mots-C · Senolytics'] },
  { icon: '❤️', title: 'Sexual Health', items: ['Priapus Shot (P-Shot) for men', 'Orgasm Shot (O-Shot) for women', 'Erectile dysfunction & Peyronie’s', 'Vaginal atrophy & incontinence', 'Libido and vitality therapies'] },
  { icon: '✨', title: 'Regenerative Aesthetic Medicine', items: ['Vampire Facial / Vampire Facelift', 'Vampire Breast Lift', 'Hair restoration with PRP', 'Scars, keloids, wounds'] },
  { icon: '📊', title: 'Precision Assessment', items: ['Comprehensive blood panel', 'Genetic & epigenetic testing (Apeiron Zoh)', 'DUTCH test (urinary hormone profile)', 'DEXA scan (body composition & bone density)', 'Wearable integration (Oura Ring)'] },
  { icon: '🌬️', title: 'Optimization Adjuncts', items: ['HBOT (Hyperbaric Oxygen Therapy)', 'PEMF (Pulsed Electromagnetic Field)', 'Infrared sauna + cryotherapy', 'Fasting & hormesis protocols'] },
]

export default function MeighenPage() {
  return (
    <AboutShell>
      {/* 1 — HERO */}
      <header style={{ minHeight: '92vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '5rem 1.5rem 3rem', background: 'radial-gradient(ellipse at 50% 28%, rgba(61,200,152,0.16) 0%, transparent 58%), radial-gradient(ellipse at 50% 100%, rgba(201,150,60,0.10) 0%, transparent 60%), #03080a' }}>
        <div className="animate-fade-in-up" style={{ ...eyebrow(TEAL), marginBottom: '1.75rem' }}>Orion · Project Alchemy</div>
        <h1 className="animate-fade-in-up" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.6rem, 9.5vw, 6.2rem)', fontWeight: 300, lineHeight: 1.02, letterSpacing: '0.02em', margin: 0, background: 'linear-gradient(135deg, #F0E8D8 0%, #C9963C 45%, #3DC898 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          Dr. Michael J. Meighen
        </h1>
        <p className="animate-fade-in-up" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(1.2rem, 3.2vw, 1.8rem)', color: TEAL, marginTop: '0.85rem' }}>MD · Pain Disruptor · Longevity Architect</p>
        <p style={{ marginTop: '2.25rem', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(1.05rem, 2.5vw, 1.35rem)', color: 'rgba(240,232,216,0.85)', maxWidth: 580, lineHeight: 1.5 }}>
          &ldquo;From ground zero to superhero. From human doing to human being.&rdquo;
        </p>
        <div aria-hidden style={{ marginTop: '3.5rem', color: 'rgba(240,232,216,0.4)', fontSize: '0.75rem', letterSpacing: '0.2em' }}>↓ Scroll</div>
      </header>

      {/* 2 — INTRODUCTION */}
      <section style={section}>
        <p style={{ ...body, fontSize: '1.15rem', marginBottom: '1.75rem' }}>
          Dr. Michael J. Meighen is not a conventional physician. He is a disruptor. A longevity architect. A specialist who refuses to accept that the current &ldquo;sick-care&rdquo; model — where symptoms are treated and root causes are ignored — is the best medicine available.
        </p>
        <p style={{ ...body, marginBottom: '1.75rem' }}>
          With over <strong style={{ color: GOLD }}>20 years of clinical experience</strong> and double board certification in <strong style={{ color: GOLD }}>Physical Medicine &amp; Rehabilitation (Physiatry)</strong> and <strong style={{ color: GOLD }}>Pain Medicine</strong>, Dr. Meighen has built a practice that takes the client from &ldquo;ground zero to superhero&rdquo; — from the lowest point of pain, dysfunction, and exhaustion, to the full vitality of a human being optimized across every dimension.
        </p>
        <p style={body}>
          His vision is simple but radical: living <strong style={{ color: TEAL }}>independently, vigorously, and fully to the age of 150</strong>. Yes — you read that correctly. One hundred and fifty.
        </p>
      </section>

      {/* 3 — ORIGIN STORY */}
      <section style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(201,150,60,0.12)', borderBottom: '1px solid rgba(201,150,60,0.12)' }}>
        <div style={section}>
          <div style={{ ...eyebrow(), marginBottom: '0.75rem' }}>Origin Story</div>
          <h2 style={{ ...h2, marginBottom: '2.5rem', fontStyle: 'italic', color: CREAM }}>Three pains that became three missions.</h2>
          {[
            ['The first', 'was watching his father be cut down in the prime of his life by colon cancer. He saw how a vital human being slowly faded inside a medical system that reacted instead of preventing.'],
            ['The second', 'was walking alongside his daughter, who since 2016 has faced multiple health challenges that pulled her out of the body’s natural homeostasis. As a father and a physician, it forced him to seek deeper answers than conventional medicine offered.'],
            ['The third', 'was his own. Professional burnout came face to face with him; hope and joy were replaced by anger and pessimism. He hit bottom — and that bottom became foundation. From there, he understood that the physician also needs medicine.'],
          ].map(([lead, txt], i) => (
            <div key={i} style={{ display: 'flex', gap: '1.25rem', marginBottom: '1.5rem', alignItems: 'flex-start' }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", color: TEAL, fontSize: '1.6rem', minWidth: '2rem' }}>0{i + 1}</span>
              <p style={{ ...body, margin: 0 }}><strong style={{ color: GOLD }}>{lead}</strong> {txt}</p>
            </div>
          ))}
          <p style={{ ...body, fontStyle: 'italic', marginTop: '1.5rem', color: 'rgba(240,232,216,0.65)' }}>
            At fourteen, a football injury broke his right leg. Two surgeries later, he had found his calling: the medicine of the body in motion.
          </p>
        </div>
      </section>

      {/* 4 — CREDENTIALS */}
      <section style={section}>
        <div style={{ textAlign: 'center', marginBottom: '3rem', maxWidth: 720, margin: '0 auto 3rem' }}>
          <div style={{ ...eyebrow(), marginBottom: '0.75rem' }}>Credentials</div>
          <h2 style={{ ...h2, fontStyle: 'italic', color: CREAM }}>Double board certification. Twenty years. One mission.</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          {[
            ['MD', 'Doctor of Medicine'],
            ['Board Certified', 'Physical Medicine & Rehabilitation (Physiatry)'],
            ['Board Certified', 'Pain Medicine'],
            ['20+ years', 'Clinical experience'],
            ['#1 Amazon Bestseller', '“A New You” — regenerative & restorative healing'],
            ['Co-author', '“Codes of Longevity”'],
          ].map(([t, d], i) => (
            <div key={i} className="abh-card" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,150,60,0.2)', borderRadius: 8, padding: '1.5rem' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.35rem', color: TEAL, marginBottom: '0.4rem' }}>{t}</div>
              <div style={{ fontSize: '0.9rem', color: 'rgba(240,232,216,0.7)', lineHeight: 1.5 }}>{d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 5 — THE APPROACH */}
      <section style={{ background: 'linear-gradient(180deg, #03080a, #000)', borderTop: '1px solid rgba(201,150,60,0.12)', borderBottom: '1px solid rgba(201,150,60,0.12)' }}>
        <div style={section}>
          <div style={{ ...eyebrow(), marginBottom: '0.75rem' }}>Precision Medicine · n=1 Approach</div>
          <h2 style={{ ...h2, marginBottom: '1.5rem', color: CREAM }}>You are not a statistic.</h2>
          <p style={{ ...body, marginBottom: '1.5rem' }}>
            Dr. Meighen rejects the cookie-cutter model where every patient receives the same protocol in a fifteen-minute appointment. His practice is radically different.
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.4rem, 3.5vw, 2rem)', fontWeight: 300, color: TEAL, margin: '1.5rem 0', lineHeight: 1.4 }}>
            You are not a knee. You are not a back. You are not a number from 0 to 10.
          </p>
          <p style={body}>
            You are a complex system with multiple variables — metabolic, hormonal, genetic, epigenetic, nutritional, neurological, and emotional — that must be read, measured, optimized, and harmonized as a single symphony. This is the <strong style={{ color: GOLD }}>n=1 approach</strong>: you as an individual, not as a statistic.
          </p>
        </div>
      </section>

      {/* 6 — SPECIALTIES */}
      <section style={{ ...section, maxWidth: 1120 }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ ...eyebrow(), marginBottom: '0.75rem' }}>Specialties</div>
          <h2 style={{ ...h2, color: CREAM }}>The full spectrum of regenerative &amp; longevity medicine</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {SPECIALTIES.map((cat, i) => (
            <div key={i} className="abh-card" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,150,60,0.2)', borderRadius: 10, padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.4rem' }}>{cat.icon}</span>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', color: GOLD, fontWeight: 400 }}>{cat.title}</h3>
              </div>
              <ul style={{ listStyle: 'none' }}>
                {cat.items.map((it, j) => (
                  <li key={j} style={{ position: 'relative', paddingLeft: '1.3rem', fontSize: '0.88rem', color: 'rgba(240,232,216,0.78)', lineHeight: 1.7, marginBottom: '0.25rem' }}>
                    <span style={{ position: 'absolute', left: 0, color: TEAL }}>›</span>{it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 7 — PHILOSOPHY: PAIN DISRUPTOR MANIFESTO */}
      <section style={{ background: 'radial-gradient(ellipse at center, rgba(61,200,152,0.07), transparent 70%)', borderTop: '1px solid rgba(201,150,60,0.1)', borderBottom: '1px solid rgba(201,150,60,0.1)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: 'clamp(5rem, 10vw, 8rem) 1.5rem' }}>
          <div style={{ ...eyebrow(TEAL), marginBottom: '1.5rem', textAlign: 'center' }}>The Pain Disruptor Manifesto</div>
          {[
            'The current pain management model — quite frankly — sucks.',
            'It prolongs the condition instead of resolving it. It disempowers the patient. It turns them into a passive participant in their own health.',
            'My job is to be the Pain Disruptor.',
            'Resolve the pain at its root. Restore function. Give you back the power to be the architect of your own life.',
            'You don’t need more pills. You need more data, more precision, more responsibility for yourself.',
            'Read. Review. Question. Implement. Carpe Diem.',
          ].map((line, i) => (
            <p key={i} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.25rem, 3vw, 1.7rem)', fontStyle: 'italic', fontWeight: 300, lineHeight: 1.5, color: CREAM, marginBottom: '1rem', textAlign: 'center' }}>{line}</p>
          ))}
          <div style={{ marginTop: '1rem', textAlign: 'center', ...eyebrow() }}>— Dr. Michael J. Meighen</div>
        </div>
      </section>

      {/* 8 — VISION: 150 */}
      <section style={{ ...section, textAlign: 'center' }}>
        <div style={{ ...eyebrow(TEAL), marginBottom: '0.5rem' }}>The Vision</div>
        <div aria-hidden style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(7rem, 28vw, 18rem)', fontWeight: 300, lineHeight: 0.9, background: 'linear-gradient(135deg, #3DC898, #C9963C, #E4B85A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', margin: '0.5rem 0' }}>150</div>
        <h2 style={{ ...h2, marginBottom: '2rem', color: CREAM }}>Living independently &amp; vibrantly to 150 is not a dream. It is an executable plan.</h2>
        <p style={{ ...body, maxWidth: 760, margin: '0 auto 1.5rem' }}>
          This is not a metaphor. It is a possibility backed by the most advanced science in longevity — the same science championed by researchers like Dr. David Sinclair and Dr. Kris Verburgh.
        </p>
        <p style={{ ...body, maxWidth: 760, margin: '0 auto' }}>
          With the right combination of nervous-system regulation · hormone optimization · peptide therapy · regenerative medicine · senescent-cell clearance · mitochondrial stimulation · precision nutrition · optimized sleep · and the foundational pillars of movement, sunlight, and toxin reduction — the plan becomes executable.
        </p>
      </section>

      {/* 9 — CTA */}
      <section style={{ ...section, maxWidth: 720 }}>
        <div style={{ background: 'linear-gradient(160deg, rgba(61,200,152,0.1), rgba(201,150,60,0.06))', border: '1px solid rgba(201,150,60,0.3)', borderRadius: 14, padding: 'clamp(2.5rem, 6vw, 4rem)', textAlign: 'center' }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.4rem, 3.5vw, 2rem)', fontWeight: 300, color: CREAM, marginBottom: '2rem' }}>From ground zero to superhero. The path begins with a decision.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/#orion" style={{ background: `linear-gradient(135deg, ${GOLD}, #E4B85A)`, color: '#000', padding: '1rem 2.5rem', borderRadius: 2, textDecoration: 'none', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Meet Orion</Link>
            <Link href="/booking" style={{ background: 'transparent', color: TEAL, padding: '1rem 2.5rem', border: `1px solid ${TEAL}`, borderRadius: 2, textDecoration: 'none', fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Book Your Consultation</Link>
          </div>
        </div>
      </section>

      {/* 10 — TRANSITION TO LYRA */}
      <section style={{ maxWidth: 980, margin: '0 auto', padding: '0 1.5rem clamp(5rem, 9vw, 7rem)' }}>
        <Link href="/about/bella" className="abh-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', textDecoration: 'none', background: 'rgba(224,96,144,0.04)', border: '1px solid rgba(224,96,144,0.25)', borderRadius: 12, padding: '1.75rem 2rem' }}>
          <div>
            <div style={{ ...eyebrow('#E06090'), marginBottom: '0.4rem' }}>Lyra · Project Alchemy</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', color: CREAM }}>Project Alchemy stands on two pillars. Meet Holistic Bella</div>
          </div>
          <span style={{ color: '#E06090', fontSize: '1.5rem', flexShrink: 0 }}>→</span>
        </Link>
      </section>
    </AboutShell>
  )
}

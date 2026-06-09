'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BIOAGE_QUESTIONS, computeBioAge } from '@/lib/alchemist/bioage-knowledge'

const SAGE = '#3DC898'
const GOLD = '#C9963C'
const GOLDL = '#E4B85A'
const CREAM = '#F0E8D8'

type Lang = 'en' | 'es'

const UI = {
  en: {
    title: 'What is your biological age?',
    subtitle: 'Your body has two ages: the calendar one and the real one. Discover it in 2 minutes — through the clinical lens of Dr. Michael J. Meighen, MD.',
    drRole: 'Medical Director · Regenerative Medicine & Longevity',
    creds: [
      'Double board-certified — Physical Medicine & Rehabilitation and Pain Medicine',
      '#1 Amazon best-selling author — "A New You"',
      'One of ~30 DiscSeel® providers worldwide · 25+ years',
      'Peptides · hormone optimization · NAD+ · biohacking & longevity',
    ],
    ageLabel: 'How old are you?',
    agePh: 'Your age',
    progress: 'Longevity assessment',
    emailIntro: 'We’ll email you your full report (optional, but recommended):',
    namePh: 'Your name', emailPh: 'Your email',
    calc: 'Calculate my biological age',
    hint: 'Complete your age and all the questions.',
    resultLabel: 'Your estimated biological age',
    analyzing: '◎ ◎ ◎ analyzing…',
    book: 'Book with Dr. Meighen',
    fail: 'Could not generate the report. Please try again.',
    disclaimer: 'Educational estimate based on lifestyle factors — not a medical diagnosis. Consult Dr. Meighen for a real evaluation.',
  },
  es: {
    title: '¿Cuál es tu edad biológica?',
    subtitle: 'Tu cuerpo tiene dos edades: la del calendario y la real. Descúbrela en 2 minutos — con el lente clínico del Dr. Michael J. Meighen, MD.',
    drRole: 'Director Médico · Medicina Regenerativa & Longevidad',
    creds: [
      'Doble board-certified — Medicina Física & Rehabilitación y Medicina del Dolor',
      'Autor best-seller #1 en Amazon — "A New You"',
      'Uno de ~30 proveedores DiscSeel® del mundo · 25+ años',
      'Péptidos · optimización hormonal · NAD+ · biohacking & longevidad',
    ],
    ageLabel: '¿Cuántos años tienes?',
    agePh: 'Tu edad',
    progress: 'Evaluación de longevidad',
    emailIntro: 'Te enviamos tu reporte completo por email (opcional, pero recomendado):',
    namePh: 'Tu nombre', emailPh: 'Tu email',
    calc: 'Calcular mi edad biológica',
    hint: 'Completa tu edad y todas las preguntas.',
    resultLabel: 'Tu edad biológica estimada',
    analyzing: '◎ ◎ ◎ analizando…',
    book: 'Agenda con el Dr. Meighen',
    fail: 'No se pudo generar el reporte. Inténtalo de nuevo.',
    disclaimer: 'Estimación educativa basada en factores de estilo de vida — no es un diagnóstico médico. Consulta al Dr. Meighen para una evaluación real.',
  },
} as const

function readLangFromCookie(): Lang {
  if (typeof document === 'undefined') return 'en'
  const m = document.cookie.match(/googtrans=([^;]+)/)
  return m && decodeURIComponent(m[1]).endsWith('/es') ? 'es' : 'en'
}

function setLangCookie(next: Lang) {
  const host = window.location.hostname
  if (next === 'es') {
    document.cookie = 'googtrans=/en/es;path=/'
    document.cookie = `googtrans=/en/es;path=/;domain=${host}`
    document.cookie = `googtrans=/en/es;path=/;domain=.${host}`
  } else {
    const past = ';expires=Thu, 01 Jan 1970 00:00:00 GMT'
    document.cookie = `googtrans=;path=/${past}`
    document.cookie = `googtrans=;path=/;domain=${host}${past}`
    document.cookie = `googtrans=;path=/;domain=.${host}${past}`
  }
  window.location.reload()
}

function renderReport(text: string) {
  return text.split('\n').filter(l => l.trim()).map((raw, i) => {
    const line = raw.trim()
    const m = line.match(/^\*\*(.+?)\*\*:?\s*(.*)$/)
    if (m && !m[2].trim()) return <h3 key={i} style={{ fontFamily: 'Cormorant Garamond, serif', color: GOLD, fontSize: '1.3rem', margin: '1.4rem 0 0.4rem' }}>{m[1]}</h3>
    const parts = line.split(/(\*\*[^*]+\*\*)/g)
    return <p key={i} style={{ margin: '0 0 0.8rem', lineHeight: 1.8 }}>{parts.map((p, j) => p.startsWith('**') && p.endsWith('**') ? <strong key={j} style={{ color: GOLDL }}>{p.slice(2, -2)}</strong> : <span key={j}>{p}</span>)}</p>
  })
}

export default function BioAgePage() {
  const [lang, setLang] = useState<Lang>('en')
  useEffect(() => { setLang(readLangFromCookie()) }, [])
  const tt = UI[lang]

  const [chrono, setChrono] = useState('')
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [bioAge, setBioAge] = useState<number | null>(null)
  const [report, setReport] = useState('')
  const [error, setError] = useState('')

  const chronoNum = parseInt(chrono, 10)
  const allAnswered = BIOAGE_QUESTIONS.every(q => answers[q.id] !== undefined)
  const answered = BIOAGE_QUESTIONS.filter(q => answers[q.id] !== undefined).length
  const total = BIOAGE_QUESTIONS.length
  const pct = Math.round((answered / total) * 100)
  const ready = chronoNum >= 18 && chronoNum <= 100 && allAnswered

  async function calculate() {
    if (!ready || loading) return
    setError('')
    const bio = computeBioAge(chronoNum, answers)
    setBioAge(bio); setLoading(true); setReport('')
    const formatted = BIOAGE_QUESTIONS.map(q => `${q.q[lang]}\n→ ${q.options[answers[q.id]].label[lang]}`).join('\n')
    try {
      const res = await fetch('/api/bio-age', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: formatted, chronoAge: chronoNum, bioAge: bio, name, email, lang }),
      })
      if (!res.ok || !res.body) throw new Error('fail')
      const reader = res.body.getReader(); const dec = new TextDecoder(); let buf = '', acc = ''
      while (true) {
        const { done, value } = await reader.read(); if (done) break
        buf += dec.decode(value, { stream: true }); const ls = buf.split('\n'); buf = ls.pop() || ''
        for (const line of ls) { if (!line.trim()) continue; let e: any; try { e = JSON.parse(line) } catch { continue }
          if (e.type === 'delta') { acc += e.text; setReport(acc) } else if (e.type === 'error') throw new Error(e.error) }
      }
      if (!acc) throw new Error('empty')
    } catch { setError(tt.fail) } finally { setLoading(false) }
  }

  const diff = bioAge !== null ? bioAge - chronoNum : 0
  const older = diff > 0
  const cats = Array.from(new Set(BIOAGE_QUESTIONS.map(q => q.cat[lang])))

  return (
    <div translate="no" className="notranslate" style={{ minHeight: '100vh', background: 'radial-gradient(ellipse at 50% -10%, #0a1f1a 0%, #08120f 45%, #050709 100%)', color: CREAM, fontFamily: 'Jost, sans-serif', fontWeight: 300 }}>
      <header style={{ textAlign: 'center', padding: '2.5rem 1.5rem 1.2rem', borderBottom: '1px solid rgba(61,200,152,0.18)', position: 'relative' }}>
        <Link href="/" style={{ position: 'absolute', left: '1.5rem', top: '1.5rem', color: 'rgba(240,232,216,0.5)', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.1em' }}>← Alchemized</Link>
        {/* Language toggle */}
        <div style={{ position: 'absolute', right: '1.5rem', top: '1.3rem', display: 'flex', gap: 2, background: 'rgba(5,5,9,0.6)', border: '1px solid rgba(201,150,60,0.35)', borderRadius: 20, padding: 3 }}>
          {(['en', 'es'] as const).map(l => (
            <button key={l} onClick={() => { if (l !== lang) setLangCookie(l) }} aria-pressed={lang === l}
              style={{ border: 'none', cursor: 'pointer', borderRadius: 16, padding: '0.25rem 0.65rem', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.06em', background: lang === l ? `linear-gradient(135deg,${GOLD},${GOLDL})` : 'transparent', color: lang === l ? '#000' : 'rgba(240,232,216,0.7)' }}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
        <div style={{ fontSize: '1.4rem', color: SAGE, marginBottom: '0.3rem' }}>◎ ⋆ ˚ ⚕ ˚ ⋆ ◎</div>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 6vw, 3.2rem)', fontWeight: 300, letterSpacing: '0.12em', margin: 0, background: 'linear-gradient(135deg, #F0E8D8, #3DC898, #C9963C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{tt.title}</h1>
        <p style={{ fontSize: '0.85rem', color: 'rgba(240,232,216,0.55)', marginTop: '0.6rem', maxWidth: 560, marginInline: 'auto' }}>{tt.subtitle}</p>
      </header>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '2rem 1.25rem 4rem' }}>
        {/* Dr. credentials — clinical authority */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', background: 'rgba(61,200,152,0.06)', border: '1px solid rgba(61,200,152,0.25)', borderRadius: 14, padding: '1.1rem 1.25rem', marginBottom: '1.8rem' }}>
          <div style={{ width: 62, height: 62, flexShrink: 0, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at 50% 35%, #122a23, #060d0b)', boxShadow: '0 0 0 1px rgba(61,200,152,0.5), 0 0 22px rgba(61,200,152,0.3)', fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: CREAM }}>M</div>
          <div style={{ flex: '1 1 240px' }}>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', color: GOLDL, lineHeight: 1.1 }}>Dr. Michael J. Meighen, MD</div>
            <div style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: SAGE, margin: '0.25rem 0 0.6rem' }}>{tt.drRole}</div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '0.28rem' }}>
              {tt.creds.map((c, i) => (
                <li key={i} style={{ fontSize: '0.82rem', color: 'rgba(240,232,216,0.8)', paddingLeft: '1.1rem', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: SAGE }}>✦</span>{c}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {bioAge === null ? (
          <>
            <div style={{ marginBottom: '1.6rem' }}>
              <label style={{ display: 'block', fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', color: CREAM, marginBottom: '0.6rem' }}>{tt.ageLabel}</label>
              <input type="number" value={chrono} onChange={e => setChrono(e.target.value)} placeholder={tt.agePh} min={18} max={100}
                style={{ width: 160, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(61,200,152,0.3)', borderRadius: 10, padding: '0.7rem 1rem', color: CREAM, fontSize: '1rem', outline: 'none', fontFamily: 'inherit' }} />
            </div>
            {/* Progress */}
            <div style={{ position: 'sticky', top: 0, zIndex: 5, background: 'rgba(8,18,15,0.92)', backdropFilter: 'blur(8px)', padding: '0.8rem 0', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(240,232,216,0.6)', marginBottom: '0.4rem' }}>
                <span>{tt.progress}</span><span>{answered}/{total}</span>
              </div>
              <div style={{ height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: `${pct}%`, height: '100%', background: `linear-gradient(90deg, ${SAGE}, ${GOLD})`, transition: 'width 0.3s' }} />
              </div>
            </div>

            {cats.map(cat => (
              <div key={cat}>
                <div style={{ fontSize: '0.72rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: SAGE, margin: '1.9rem 0 0.9rem', borderBottom: '1px solid rgba(61,200,152,0.18)', paddingBottom: '0.4rem' }}>{cat}</div>
                {BIOAGE_QUESTIONS.filter(q => q.cat[lang] === cat).map(q => (
                  <div key={q.id} style={{ marginBottom: '1.4rem' }}>
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', color: CREAM, marginBottom: '0.6rem' }}>{q.q[lang]}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {q.options.map((o, idx) => {
                        const sel = answers[q.id] === idx
                        return (
                          <button key={idx} onClick={() => setAnswers(a => ({ ...a, [q.id]: idx }))}
                            style={{ textAlign: 'left', background: sel ? 'rgba(61,200,152,0.14)' : 'rgba(255,255,255,0.03)', border: `1px solid ${sel ? SAGE : 'rgba(201,150,60,0.18)'}`, borderRadius: 10, padding: '0.7rem 1rem', color: sel ? CREAM : 'rgba(240,232,216,0.8)', fontSize: '0.92rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                            {sel ? '✦ ' : ''}{o.label[lang]}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ))}
            <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(61,200,152,0.15)', paddingTop: '1.5rem' }}>
              <p style={{ color: 'rgba(240,232,216,0.6)', fontSize: '0.88rem', marginBottom: '0.8rem' }}>{tt.emailIntro}</p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
                <input value={name} onChange={e => setName(e.target.value)} placeholder={tt.namePh} style={{ flex: '1 1 140px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(61,200,152,0.25)', borderRadius: 10, padding: '0.7rem 0.9rem', color: CREAM, fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit' }} />
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder={tt.emailPh} style={{ flex: '2 1 200px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(61,200,152,0.25)', borderRadius: 10, padding: '0.7rem 0.9rem', color: CREAM, fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit' }} />
              </div>
              <button onClick={calculate} disabled={!ready} style={{ width: '100%', background: ready ? `linear-gradient(135deg, ${SAGE}, ${GOLD})` : 'rgba(61,200,152,0.3)', color: '#06201a', border: 'none', borderRadius: 12, padding: '1rem', fontSize: '0.95rem', fontWeight: 700, cursor: ready ? 'pointer' : 'default', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {tt.calc}
              </button>
              {!ready && <p style={{ color: 'rgba(240,232,216,0.4)', fontSize: '0.78rem', marginTop: '0.6rem', textAlign: 'center' }}>{tt.hint}</p>}
            </div>
          </>
        ) : (
          <div>
            <div style={{ textAlign: 'center', padding: '2rem 1rem', background: 'rgba(61,200,152,0.06)', border: `1px solid ${older ? 'rgba(224,96,144,0.4)' : 'rgba(61,200,152,0.4)'}`, borderRadius: 14, marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,232,216,0.5)' }}>{tt.resultLabel}</div>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(3.5rem, 16vw, 6rem)', lineHeight: 1, color: older ? '#E06090' : SAGE, margin: '0.3rem 0' }}>{bioAge}</div>
              <div style={{ fontSize: '0.95rem', color: CREAM }}>
                {lang === 'es'
                  ? (older
                    ? <>Tu cuerpo está envejeciendo <strong style={{ color: '#E06090' }}>{diff} año{diff > 1 ? 's' : ''} más rápido</strong> que tu edad real ({chronoNum}). La buena noticia: <strong style={{ color: SAGE }}>es reversible.</strong></>
                    : <>¡Vas <strong style={{ color: SAGE }}>{Math.abs(diff)} año{Math.abs(diff) !== 1 ? 's' : ''} más joven</strong> que tu edad real ({chronoNum})! Optimicémoslo aún más.</>)
                  : (older
                    ? <>Your body is aging <strong style={{ color: '#E06090' }}>{diff} year{diff > 1 ? 's' : ''} faster</strong> than your real age ({chronoNum}). The good news: <strong style={{ color: SAGE }}>it’s reversible.</strong></>
                    : <>You’re <strong style={{ color: SAGE }}>{Math.abs(diff)} year{Math.abs(diff) !== 1 ? 's' : ''} younger</strong> than your real age ({chronoNum})! Let’s optimize it even further.</>)}
              </div>
            </div>
            <div style={{ fontSize: '0.95rem', color: 'rgba(240,232,216,0.9)' }}>
              {report ? renderReport(report) : <div style={{ color: SAGE, letterSpacing: '0.2em' }}>{tt.analyzing}</div>}
            </div>
            {error && <p style={{ color: '#E06090', marginTop: '1rem' }}>{error}</p>}
            {!loading && report && (
              <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
                <Link href="/booking" style={{ background: `linear-gradient(135deg, ${SAGE}, ${GOLD})`, color: '#06201a', padding: '1rem 2.4rem', borderRadius: 2, textDecoration: 'none', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{tt.book}</Link>
              </div>
            )}
            <p style={{ marginTop: '2rem', fontSize: '0.7rem', color: 'rgba(240,232,216,0.35)', lineHeight: 1.6, textAlign: 'center' }}>
              {tt.disclaimer}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BIOAGE_QUESTIONS, computeBioAge } from '@/lib/alchemist/bioage-knowledge'

const SAGE = '#3DC898'
const GOLD = '#C9963C'
const GOLDL = '#E4B85A'
const CREAM = '#F0E8D8'

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
  const [chrono, setChrono] = useState('')
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [bioAge, setBioAge] = useState<number | null>(null)
  const [report, setReport] = useState('')
  const [error, setError] = useState('')

  const chronoNum = parseInt(chrono, 10)
  const allAnswered = BIOAGE_QUESTIONS.every(q => answers[q.id])
  const answered = BIOAGE_QUESTIONS.filter(q => answers[q.id]).length
  const total = BIOAGE_QUESTIONS.length
  const pct = Math.round((answered / total) * 100)
  const ready = chronoNum >= 18 && chronoNum <= 100 && allAnswered

  async function calculate() {
    if (!ready || loading) return
    setError('')
    const bio = computeBioAge(chronoNum, answers)
    setBioAge(bio); setLoading(true); setReport('')
    const formatted = BIOAGE_QUESTIONS.map(q => `${q.q}\n→ ${answers[q.id]}`).join('\n')
    try {
      const res = await fetch('/api/bio-age', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: formatted, chronoAge: chronoNum, bioAge: bio, name, email, lang: 'es' }),
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
    } catch { setError('No se pudo generar el reporte. Inténtalo de nuevo.') } finally { setLoading(false) }
  }

  const diff = bioAge !== null ? bioAge - chronoNum : 0
  const older = diff > 0

  return (
    <div style={{ minHeight: '100vh', background: 'radial-gradient(ellipse at 50% -10%, #0a1f1a 0%, #08120f 45%, #050709 100%)', color: CREAM, fontFamily: 'Jost, sans-serif', fontWeight: 300 }}>
      <header style={{ textAlign: 'center', padding: '2.5rem 1.5rem 1.2rem', borderBottom: '1px solid rgba(61,200,152,0.18)', position: 'relative' }}>
        <Link href="/" style={{ position: 'absolute', left: '1.5rem', top: '1.5rem', color: 'rgba(240,232,216,0.5)', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.1em' }}>← Alchemized</Link>
        <div style={{ fontSize: '1.4rem', color: SAGE, marginBottom: '0.3rem' }}>◎ ⋆ ˚ ⚕ ˚ ⋆ ◎</div>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 6vw, 3.2rem)', fontWeight: 300, letterSpacing: '0.12em', margin: 0, background: 'linear-gradient(135deg, #F0E8D8, #3DC898, #C9963C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>¿Cuál es tu edad biológica?</h1>
        <p style={{ fontSize: '0.85rem', color: 'rgba(240,232,216,0.55)', marginTop: '0.6rem', maxWidth: 560, marginInline: 'auto' }}>Tu cuerpo tiene dos edades: la del calendario y la real. Descúbrela en 2 minutos — con el lente clínico del Dr. Michael J. Meighen, MD.</p>
      </header>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '2rem 1.25rem 4rem' }}>
        {bioAge === null ? (
          <>
            <div style={{ marginBottom: '1.6rem' }}>
              <label style={{ display: 'block', fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', color: CREAM, marginBottom: '0.6rem' }}>¿Cuántos años tienes?</label>
              <input type="number" value={chrono} onChange={e => setChrono(e.target.value)} placeholder="Tu edad" min={18} max={100}
                style={{ width: 160, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(61,200,152,0.3)', borderRadius: 10, padding: '0.7rem 1rem', color: CREAM, fontSize: '1rem', outline: 'none', fontFamily: 'inherit' }} />
            </div>
            {/* Progress */}
            <div style={{ position: 'sticky', top: 0, zIndex: 5, background: 'rgba(8,18,15,0.92)', backdropFilter: 'blur(8px)', padding: '0.8rem 0', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(240,232,216,0.6)', marginBottom: '0.4rem' }}>
                <span>Evaluación de longevidad</span><span>{answered}/{total}</span>
              </div>
              <div style={{ height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: `${pct}%`, height: '100%', background: `linear-gradient(90deg, ${SAGE}, ${GOLD})`, transition: 'width 0.3s' }} />
              </div>
            </div>

            {Array.from(new Set(BIOAGE_QUESTIONS.map(q => q.cat))).map(cat => (
              <div key={cat}>
                <div style={{ fontSize: '0.72rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: SAGE, margin: '1.9rem 0 0.9rem', borderBottom: '1px solid rgba(61,200,152,0.18)', paddingBottom: '0.4rem' }}>{cat}</div>
                {BIOAGE_QUESTIONS.filter(q => q.cat === cat).map(q => (
                  <div key={q.id} style={{ marginBottom: '1.4rem' }}>
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', color: CREAM, marginBottom: '0.6rem' }}>{q.q}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {q.options.map(o => {
                        const sel = answers[q.id] === o.label
                        return (
                          <button key={o.label} onClick={() => setAnswers(a => ({ ...a, [q.id]: o.label }))}
                            style={{ textAlign: 'left', background: sel ? 'rgba(61,200,152,0.14)' : 'rgba(255,255,255,0.03)', border: `1px solid ${sel ? SAGE : 'rgba(201,150,60,0.18)'}`, borderRadius: 10, padding: '0.7rem 1rem', color: sel ? CREAM : 'rgba(240,232,216,0.8)', fontSize: '0.92rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                            {sel ? '✦ ' : ''}{o.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ))}
            <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(61,200,152,0.15)', paddingTop: '1.5rem' }}>
              <p style={{ color: 'rgba(240,232,216,0.6)', fontSize: '0.88rem', marginBottom: '0.8rem' }}>Te enviamos tu reporte completo por email (opcional, pero recomendado):</p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Tu nombre" style={{ flex: '1 1 140px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(61,200,152,0.25)', borderRadius: 10, padding: '0.7rem 0.9rem', color: CREAM, fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit' }} />
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Tu email" style={{ flex: '2 1 200px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(61,200,152,0.25)', borderRadius: 10, padding: '0.7rem 0.9rem', color: CREAM, fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit' }} />
              </div>
              <button onClick={calculate} disabled={!ready} style={{ width: '100%', background: ready ? `linear-gradient(135deg, ${SAGE}, ${GOLD})` : 'rgba(61,200,152,0.3)', color: '#06201a', border: 'none', borderRadius: 12, padding: '1rem', fontSize: '0.95rem', fontWeight: 700, cursor: ready ? 'pointer' : 'default', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Calcular mi edad biológica
              </button>
              {!ready && <p style={{ color: 'rgba(240,232,216,0.4)', fontSize: '0.78rem', marginTop: '0.6rem', textAlign: 'center' }}>Completa tu edad y todas las preguntas.</p>}
            </div>
          </>
        ) : (
          <div>
            <div style={{ textAlign: 'center', padding: '2rem 1rem', background: 'rgba(61,200,152,0.06)', border: `1px solid ${older ? 'rgba(224,96,144,0.4)' : 'rgba(61,200,152,0.4)'}`, borderRadius: 14, marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,232,216,0.5)' }}>Tu edad biológica estimada</div>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(3.5rem, 16vw, 6rem)', lineHeight: 1, color: older ? '#E06090' : SAGE, margin: '0.3rem 0' }}>{bioAge}</div>
              <div style={{ fontSize: '0.95rem', color: CREAM }}>
                {older
                  ? <>Tu cuerpo está envejeciendo <strong style={{ color: '#E06090' }}>{diff} año{diff > 1 ? 's' : ''} más rápido</strong> que tu edad real ({chronoNum}). La buena noticia: <strong style={{ color: SAGE }}>es reversible.</strong></>
                  : <>¡Vas <strong style={{ color: SAGE }}>{Math.abs(diff)} año{Math.abs(diff) !== 1 ? 's' : ''} más joven</strong> que tu edad real ({chronoNum})! Optimicémoslo aún más.</>}
              </div>
            </div>
            <div style={{ fontSize: '0.95rem', color: 'rgba(240,232,216,0.9)' }}>
              {report ? renderReport(report) : <div style={{ color: SAGE, letterSpacing: '0.2em' }}>◎ ◎ ◎ analizando…</div>}
            </div>
            {error && <p style={{ color: '#E06090', marginTop: '1rem' }}>{error}</p>}
            {!loading && report && (
              <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
                <Link href="/booking" style={{ background: `linear-gradient(135deg, ${SAGE}, ${GOLD})`, color: '#06201a', padding: '1rem 2.4rem', borderRadius: 2, textDecoration: 'none', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Agenda con el Dr. Meighen</Link>
              </div>
            )}
            <p style={{ marginTop: '2rem', fontSize: '0.7rem', color: 'rgba(240,232,216,0.35)', lineHeight: 1.6, textAlign: 'center' }}>
              Estimación educativa basada en factores de estilo de vida — no es un diagnóstico médico. Consulta al Dr. Meighen para una evaluación real.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

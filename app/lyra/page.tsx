'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { LYRA_GREETING_ES } from '@/lib/alchemist/lyra-knowledge-base'

const GOLD = '#C9963C'
const ROSE = '#E06090'
const CREAM = '#F0E8D8'

type Msg = { role: 'user' | 'assistant'; content: string }

// Clean markdown-lite renderer (bold, headings, bullets) — no raw asterisks.
function renderInline(t: string, k: string) {
  return t.split(/(\*\*[^*]+\*\*)/g).map((p, i) =>
    p.startsWith('**') && p.endsWith('**')
      ? <strong key={`${k}-${i}`} style={{ color: GOLD, fontWeight: 600 }}>{p.slice(2, -2)}</strong>
      : <span key={`${k}-${i}`}>{p}</span>)
}
function Lyrics({ text }: { text: string }) {
  const lines = text.split('\n'); const out: React.ReactNode[] = []; let key = 0
  for (const raw of lines) {
    const line = raw.trimEnd()
    if (!line) { out.push(<div key={`s${key++}`} style={{ height: '0.6rem' }} />); continue }
    if (/^#{1,3}\s+/.test(line)) {
      out.push(<div key={`h${key++}`} style={{ fontFamily: 'Cormorant Garamond, serif', color: GOLD, fontSize: '1.15rem', margin: '0.6rem 0 0.2rem' }}>{renderInline(line.replace(/^#{1,3}\s+/, ''), `h${key}`)}</div>)
    } else if (/^[-*•]\s+/.test(line)) {
      out.push(<div key={`li${key++}`} style={{ paddingLeft: '1rem', position: 'relative', marginBottom: '0.3rem' }}><span style={{ position: 'absolute', left: 0, color: ROSE }}>✦</span>{renderInline(line.replace(/^[-*•]\s+/, ''), `li${key}`)}</div>)
    } else {
      out.push(<div key={`p${key++}`} style={{ marginBottom: '0.35rem', lineHeight: 1.75 }}>{renderInline(line, `p${key}`)}</div>)
    }
  }
  return <>{out}</>
}

export default function LyraPage() {
  const [messages, setMessages] = useState<Msg[]>([{ role: 'assistant', content: LYRA_GREETING_ES }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' }) }, [messages])

  async function send() {
    const text = input.trim()
    if (!text || loading) return
    const next: Msg[] = [...messages, { role: 'user', content: text }]
    setMessages([...next, { role: 'assistant', content: '' }])
    setInput(''); setLoading(true)
    try {
      const res = await fetch('/api/lyra', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: next }) })
      if (!res.ok || !res.body) throw new Error('fail')
      const reader = res.body.getReader(); const dec = new TextDecoder(); let buf = ''; let acc = ''
      while (true) {
        const { done, value } = await reader.read(); if (done) break
        buf += dec.decode(value, { stream: true }); const ls = buf.split('\n'); buf = ls.pop() || ''
        for (const line of ls) {
          if (!line.trim()) continue; let e: any; try { e = JSON.parse(line) } catch { continue }
          if (e.type === 'delta') { acc += e.text; setMessages(m => { const c = [...m]; c[c.length - 1] = { role: 'assistant', content: acc }; return c }) }
          else if (e.type === 'error') throw new Error(e.error)
        }
      }
      if (!acc) throw new Error('empty')
    } catch {
      setMessages(m => { const c = [...m]; c[c.length - 1] = { role: 'assistant', content: 'Mi amor, algo se interrumpió. Respira un momento e inténtalo de nuevo. 🌙' }; return c })
    } finally { setLoading(false) }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'radial-gradient(ellipse at 50% -10%, #1a1535 0%, #0a0a14 45%, #050509 100%)', color: CREAM, display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{ textAlign: 'center', padding: '2.5rem 1.5rem 1.5rem', borderBottom: '1px solid rgba(201,150,60,0.15)' }}>
        <Link href="/" style={{ position: 'absolute', left: '1.5rem', top: '1.5rem', color: 'rgba(240,232,216,0.5)', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.1em' }}>← Alchemized</Link>
        <div style={{ fontSize: '1.6rem', color: GOLD, marginBottom: '0.3rem' }}>✧ ⋆ ˚ ☾ ˚ ⋆ ✧</div>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.4rem, 7vw, 3.6rem)', fontWeight: 300, letterSpacing: '0.35em', margin: 0, background: 'linear-gradient(135deg, #F0E8D8, #C9963C, #E06090)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>LYRA</h1>
        <div style={{ fontSize: '0.7rem', letterSpacing: '0.3em', color: 'rgba(240,232,216,0.45)', textTransform: 'uppercase', marginTop: '0.5rem' }}>Holistic Wisdom · Bella&rsquo;s Space · Where Science Meets Soul</div>
      </header>

      {/* Conversation */}
      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '2rem 1.25rem', maxWidth: 760, width: '100%', margin: '0 auto' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', marginBottom: '1.25rem' }}>
            <div style={{
              maxWidth: '85%', padding: '1rem 1.25rem', borderRadius: 14, fontSize: '0.95rem',
              background: m.role === 'user' ? 'rgba(201,150,60,0.14)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${m.role === 'user' ? 'rgba(201,150,60,0.3)' : 'rgba(224,96,144,0.22)'}`,
              color: m.role === 'user' ? CREAM : 'rgba(240,232,216,0.92)',
              borderTopRightRadius: m.role === 'user' ? 2 : 14, borderTopLeftRadius: m.role === 'user' ? 14 : 2,
            }}>
              {m.role === 'assistant'
                ? (m.content ? <Lyrics text={m.content} /> : <span style={{ color: ROSE, letterSpacing: '0.2em' }}>✦ ✦ ✦</span>)
                : m.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div style={{ borderTop: '1px solid rgba(201,150,60,0.15)', padding: '1rem 1.25rem 1.5rem', background: 'rgba(5,5,9,0.6)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', gap: '0.6rem', alignItems: 'flex-end' }}>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
            placeholder="Escribe lo que sientes… / Share what you feel…"
            rows={1}
            style={{ flex: 1, resize: 'none', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,150,60,0.25)', borderRadius: 12, padding: '0.85rem 1rem', color: CREAM, fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit', maxHeight: 120 }}
          />
          <button onClick={send} disabled={loading || !input.trim()} style={{
            background: loading || !input.trim() ? 'rgba(201,150,60,0.3)' : `linear-gradient(135deg, ${GOLD}, ${ROSE})`,
            color: '#1a1020', border: 'none', borderRadius: 12, padding: '0.85rem 1.5rem', fontSize: '0.85rem', fontWeight: 700, cursor: loading || !input.trim() ? 'default' : 'pointer', letterSpacing: '0.05em',
          }}>{loading ? '✦' : 'Enviar'}</button>
        </div>
        <p style={{ maxWidth: 760, margin: '0.75rem auto 0', fontSize: '0.68rem', color: 'rgba(240,232,216,0.3)', textAlign: 'center', lineHeight: 1.5 }}>
          Lyra es un espacio de autoconocimiento y bienestar — no reemplaza atención médica ni psicológica. · A space for self-knowledge, not medical care.
        </p>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'

type Entry = {
  id: string
  created_at: string
  source: string
  name: string
  email: string
  bioAge: number | null
  chronoAge: number | null
  wantsAppointment: boolean
  consented: boolean
  clientReport: string
  briefing: string
  detail: string
}

const GOLD = '#C9963C'
const SAGE = '#3DC898'
const ROSE = '#E06090'
const CREAM = '#F0E8D8'

function fmt(s: string) {
  return s
    .split('\n')
    .map((line, i) => {
      const html = line.replace(/\*\*(.*?)\*\*/g, `<strong style="color:${GOLD}">$1</strong>`)
      return <span key={i} dangerouslySetInnerHTML={{ __html: html + '<br/>' }} />
    })
}

export default function StudioPage() {
  const [code, setCode] = useState('')
  const [entries, setEntries] = useState<Entry[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [open, setOpen] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'bio-age' | 'lyra'>('all')

  async function unlock(e?: React.FormEvent) {
    e?.preventDefault()
    setLoading(true); setError('')
    try {
      const r = await fetch('/api/studio/list', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
      if (r.status === 401) { setError('Clave incorrecta.'); setLoading(false); return }
      const d = await r.json()
      setEntries(d.entries || [])
    } catch { setError('No se pudo conectar. Intenta de nuevo.') }
    setLoading(false)
  }

  // ---------- Gate ----------
  if (!entries) {
    return (
      <main style={{ minHeight: '100vh', background: '#000', color: CREAM, display: 'grid', placeItems: 'center', fontFamily: 'Jost, system-ui, sans-serif', padding: '2rem' }}>
        <form onSubmit={unlock} style={{ width: '100%', maxWidth: 380, textAlign: 'center' }}>
          <div style={{ fontSize: '1.4rem', color: GOLD, letterSpacing: '0.3em' }}>✧ ⋆ ☾ ⋆ ✧</div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '2rem', letterSpacing: '0.18em', margin: '0.6rem 0 0.2rem', color: GOLD }}>STUDIO</h1>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,232,216,0.4)', margin: '0 0 2rem' }}>Espacio privado · Bella & Dr. Meighen</p>
          <input
            type="password" value={code} onChange={e => setCode(e.target.value)} placeholder="Clave de acceso" autoFocus
            style={{ width: '100%', padding: '0.85rem 1rem', background: 'rgba(255,255,255,0.04)', border: `1px solid rgba(201,150,60,0.3)`, borderRadius: 4, color: CREAM, fontSize: '1rem', textAlign: 'center', letterSpacing: '0.1em', outline: 'none' }}
          />
          {error && <p style={{ color: ROSE, fontSize: '0.8rem', marginTop: '0.8rem' }}>{error}</p>}
          <button type="submit" disabled={loading || !code}
            style={{ width: '100%', marginTop: '1.2rem', padding: '0.9rem', background: `linear-gradient(135deg,${GOLD},#E4B85A)`, color: '#000', border: 'none', borderRadius: 3, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', fontSize: '0.78rem', cursor: loading ? 'wait' : 'pointer', opacity: loading || !code ? 0.6 : 1 }}>
            {loading ? 'Abriendo…' : 'Entrar'}
          </button>
          <p style={{ fontSize: '0.66rem', color: 'rgba(240,232,216,0.25)', marginTop: '2rem', lineHeight: 1.6 }}>
            Información confidencial. No compartir. Los datos viven cifrados en la base privada;<br />nunca se envían completos por correo.
          </p>
        </form>
      </main>
    )
  }

  // ---------- Inbox ----------
  const shown = entries.filter(e => filter === 'all' || e.source === filter)
  return (
    <main style={{ minHeight: '100vh', background: '#000', color: CREAM, fontFamily: 'Jost, system-ui, sans-serif', padding: '2rem 1rem 5rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '2rem', paddingBottom: '1.4rem', borderBottom: '1px solid rgba(201,150,60,0.2)' }}>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '1.8rem', letterSpacing: '0.18em', margin: 0, color: GOLD }}>STUDIO</h1>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,232,216,0.4)', margin: '0.3rem 0 0' }}>{entries.length} perfiles · espacio privado</p>
        </header>

        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {([['all', 'Todos'], ['bio-age', '🧬 Edad biológica'], ['lyra', '🌙 Lyra']] as const).map(([k, label]) => (
            <button key={k} onClick={() => setFilter(k)}
              style={{ padding: '0.45rem 1rem', borderRadius: 999, border: `1px solid ${filter === k ? GOLD : 'rgba(240,232,216,0.2)'}`, background: filter === k ? 'rgba(201,150,60,0.15)' : 'transparent', color: filter === k ? GOLD : 'rgba(240,232,216,0.6)', fontSize: '0.74rem', cursor: 'pointer', letterSpacing: '0.05em' }}>
              {label}
            </button>
          ))}
        </div>

        {shown.length === 0 && <p style={{ textAlign: 'center', color: 'rgba(240,232,216,0.4)', marginTop: '3rem' }}>Aún no hay perfiles aquí.</p>}

        {shown.map(en => {
          const isBio = en.source === 'bio-age'
          const accent = isBio ? SAGE : ROSE
          const isOpen = open === en.id
          return (
            <div key={en.id} style={{ border: `1px solid rgba(240,232,216,0.12)`, borderLeft: `3px solid ${accent}`, borderRadius: 6, marginBottom: '0.9rem', overflow: 'hidden', background: 'rgba(255,255,255,0.02)' }}>
              <button onClick={() => setOpen(isOpen ? null : en.id)}
                style={{ width: '100%', textAlign: 'left', background: 'transparent', border: 'none', color: CREAM, padding: '1rem 1.2rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                <span>
                  <span style={{ fontSize: '1.02rem', color: CREAM }}>{en.name}</span>
                  {en.email && <span style={{ fontSize: '0.78rem', color: 'rgba(240,232,216,0.45)', marginLeft: '0.6rem' }}>{en.email}</span>}
                  <br />
                  <span style={{ fontSize: '0.72rem', color: accent, letterSpacing: '0.05em' }}>
                    {isBio
                      ? `🧬 Edad biológica ${en.bioAge ?? '—'} vs ${en.chronoAge ?? '—'}`
                      : `🌙 Perfil del Alma${en.wantsAppointment ? ' · quiere cita' : ''}${en.consented ? ' · autorizó compartir' : ''}`}
                  </span>
                </span>
                <span style={{ color: 'rgba(240,232,216,0.3)', fontSize: '0.7rem', whiteSpace: 'nowrap' }}>
                  {new Date(en.created_at).toLocaleDateString()} {isOpen ? '▲' : '▼'}
                </span>
              </button>
              {isOpen && (
                <div style={{ padding: '0 1.2rem 1.4rem', borderTop: '1px solid rgba(240,232,216,0.08)' }}>
                  {en.briefing && (
                    <section style={{ marginTop: '1.1rem' }}>
                      <h3 style={{ color: accent, fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 0.6rem' }}>
                        {isBio ? 'Briefing para el Dr. (pre-cita)' : 'Briefing para Bella'}
                      </h3>
                      <div style={{ fontSize: '0.9rem', lineHeight: 1.8, color: 'rgba(240,232,216,0.92)' }}>{fmt(en.briefing)}</div>
                    </section>
                  )}
                  {en.clientReport && (
                    <section style={{ marginTop: '1.4rem' }}>
                      <h3 style={{ color: 'rgba(240,232,216,0.45)', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 0.6rem' }}>
                        Lo que recibió la persona
                      </h3>
                      <div style={{ fontSize: '0.86rem', lineHeight: 1.75, color: 'rgba(240,232,216,0.6)' }}>{fmt(en.clientReport)}</div>
                    </section>
                  )}
                  {en.email && (
                    <a href={`mailto:${en.email}`} style={{ display: 'inline-block', marginTop: '1.3rem', padding: '0.6rem 1.3rem', background: `linear-gradient(135deg,${accent},${GOLD})`, color: '#06201a', textDecoration: 'none', borderRadius: 3, fontWeight: 700, fontSize: '0.74rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      Escribir a {en.name.split(' ')[0]}
                    </a>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </main>
  )
}

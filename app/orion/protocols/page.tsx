'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'

interface Protocol {
  id: string
  protocol_name: string
  category: string
  dose: string
  dose_unit: string
  frequency: string
  start_date: string
  end_date: string
  status: string
  orion_patients: { id: string; full_name: string }
}

const categoryColors: Record<string, string> = {
  peptide: '#C9963C',
  hormone: '#9A7CE8',
  iv: '#3DC898',
  supplement: '#E4B85A',
}

export default function ProtocolsPage() {
  const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  const [protocols, setProtocols] = useState<Protocol[]>([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('orion_protocols')
        .select('*, orion_patients(id, full_name)')
        .order('start_date', { ascending: false })
      setProtocols(data || [])
      setLoading(false)
    }
    load()
  }, [supabase])

  const filtered = filter === 'all' ? protocols : protocols.filter(p => p.category === filter || p.status === filter)

  const endingSoon = protocols.filter(p => {
    if (!p.end_date || p.status !== 'active') return false
    const days = Math.ceil((new Date(p.end_date).getTime() - Date.now()) / (24 * 60 * 60 * 1000))
    return days <= 14 && days >= 0
  })

  return (
    <div style={{ padding: '2rem', maxWidth: 1100 }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 300, color: '#3DC898', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Protocols</h1>
      <p style={{ fontSize: '0.8rem', color: 'rgba(240,232,216,0.3)', marginBottom: '1.5rem' }}>{protocols.filter(p => p.status === 'active').length} active protocols across all patients</p>

      {/* Ending Soon Banner */}
      {endingSoon.length > 0 && (
        <div style={{ background: 'rgba(228,184,90,0.06)', border: '1px solid rgba(228,184,90,0.2)', borderRadius: 6, padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.72rem', letterSpacing: '0.15em', color: '#E4B85A', textTransform: 'uppercase', marginBottom: '0.5rem' }}>⚠ Ending in 14 days</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {endingSoon.map(p => {
              const days = Math.ceil((new Date(p.end_date).getTime() - Date.now()) / (24 * 60 * 60 * 1000))
              return (
                <Link key={p.id} href={`/orion/patients/${p.orion_patients?.id}`} style={{
                  background: 'rgba(228,184,90,0.1)',
                  border: '1px solid rgba(228,184,90,0.25)',
                  borderRadius: 4,
                  padding: '0.3rem 0.75rem',
                  color: '#E4B85A',
                  fontSize: '0.75rem',
                  textDecoration: 'none',
                }}>
                  {p.orion_patients?.full_name} · {p.protocol_name} · <strong>{days}d</strong>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {['all', 'active', 'peptide', 'hormone', 'iv', 'supplement', 'paused'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            background: filter === f ? 'rgba(61,200,152,0.1)' : 'transparent',
            border: `1px solid ${filter === f ? 'rgba(61,200,152,0.3)' : 'rgba(255,255,255,0.08)'}`,
            borderRadius: 4,
            padding: '0.35rem 0.75rem',
            color: filter === f ? '#3DC898' : 'rgba(240,232,216,0.4)',
            fontSize: '0.72rem',
            cursor: 'pointer',
            textTransform: 'capitalize',
            letterSpacing: '0.08em',
          }}>{f}</button>
        ))}
      </div>

      {loading ? (
        <p style={{ color: '#3DC898' }}>Loading...</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filtered.map(p => {
            const color = categoryColors[p.category] || '#3DC898'
            const daysLeft = p.end_date ? Math.ceil((new Date(p.end_date).getTime() - Date.now()) / (24 * 60 * 60 * 1000)) : null
            return (
              <div key={p.id} style={{
                background: `${color}06`,
                border: `1px solid ${color}20`,
                borderLeft: `3px solid ${color}`,
                borderRadius: 6,
                padding: '1rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color, textTransform: 'uppercase', fontWeight: 600 }}>{p.category}</span>
                    <span style={{ fontSize: '0.9rem', color: '#F0E8D8', fontWeight: 500 }}>{p.protocol_name}</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(240,232,216,0.4)' }}>
                    {p.dose} {p.dose_unit} · {p.frequency}
                    {p.orion_patients && <span style={{ marginLeft: '0.75rem', color: 'rgba(240,232,216,0.6)' }}>→ {p.orion_patients.full_name}</span>}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexShrink: 0 }}>
                  {daysLeft !== null && (
                    <span style={{ fontSize: '0.7rem', color: daysLeft <= 7 ? '#E06090' : 'rgba(240,232,216,0.3)' }}>
                      {daysLeft <= 0 ? 'Ended' : `${daysLeft}d left`}
                    </span>
                  )}
                  <span style={{
                    fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: p.status === 'active' ? '#3DC898' : 'rgba(240,232,216,0.3)',
                    background: p.status === 'active' ? 'rgba(61,200,152,0.1)' : 'rgba(255,255,255,0.04)',
                    padding: '0.2rem 0.5rem', borderRadius: 2,
                  }}>{p.status}</span>
                  {p.orion_patients?.id && (
                    <Link href={`/orion/patients/${p.orion_patients.id}`} style={{ fontSize: '0.75rem', color: '#3DC898', textDecoration: 'none' }}>→</Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

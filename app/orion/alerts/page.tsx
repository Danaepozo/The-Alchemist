'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

interface Alert {
  id: string
  alert_type: string
  severity: string
  title: string
  message: string
  due_date: string
  acknowledged: boolean
  created_at: string
  orion_patients: { id: string; full_name: string }
  orion_protocols: { protocol_name: string } | null
}

type Filter = 'all' | 'critical' | 'high' | 'medium' | 'acknowledged'

const severityColor: Record<string, string> = {
  critical: '#ff4444',
  high: '#FF8C00',
  medium: '#E4B85A',
  low: '#3DC898',
}

const severityIcon: Record<string, string> = {
  critical: '🔴',
  high: '🟠',
  medium: '🟡',
  low: '🟢',
}

export default function AlertsPage() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [filter, setFilter] = useState<Filter>('all')
  const [loading, setLoading] = useState(true)

  async function loadAlerts() {
    const { data } = await supabase
      .from('orion_alerts')
      .select('*, orion_patients(id, full_name), orion_protocols(protocol_name)')
      .order('severity', { ascending: true })
      .order('created_at', { ascending: false })
    setAlerts(data || [])
    setLoading(false)
  }

  useEffect(() => { loadAlerts() }, [supabase])

  async function acknowledge(id: string) {
    await supabase.from('orion_alerts').update({ acknowledged: true }).eq('id', id)
    loadAlerts()
  }

  const filtered = alerts.filter(a => {
    if (filter === 'acknowledged') return a.acknowledged
    if (filter === 'all') return !a.acknowledged
    return a.severity === filter && !a.acknowledged
  })

  const counts = {
    all: alerts.filter(a => !a.acknowledged).length,
    critical: alerts.filter(a => a.severity === 'critical' && !a.acknowledged).length,
    high: alerts.filter(a => a.severity === 'high' && !a.acknowledged).length,
    medium: alerts.filter(a => a.severity === 'medium' && !a.acknowledged).length,
    acknowledged: alerts.filter(a => a.acknowledged).length,
  }

  return (
    <div style={{ padding: '2rem', maxWidth: 900 }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 300, color: '#3DC898', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>Alerts</h1>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {(['all', 'critical', 'high', 'medium', 'acknowledged'] as Filter[]).map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            background: filter === f ? `${f === 'all' ? '#3DC898' : severityColor[f] || '#3DC898'}15` : 'transparent',
            border: `1px solid ${filter === f ? (f === 'all' ? '#3DC898' : severityColor[f] || '#3DC898') : 'rgba(255,255,255,0.1)'}`,
            borderRadius: 4,
            padding: '0.4rem 0.875rem',
            color: filter === f ? (f === 'all' ? '#3DC898' : severityColor[f] || '#3DC898') : 'rgba(240,232,216,0.4)',
            fontSize: '0.75rem',
            cursor: 'pointer',
            letterSpacing: '0.1em',
            textTransform: 'capitalize',
          }}>
            {f} {counts[f] > 0 && <span style={{ marginLeft: '0.3rem' }}>({counts[f]})</span>}
          </button>
        ))}
      </div>

      {loading ? (
        <p style={{ color: '#3DC898', letterSpacing: '0.2em' }}>Loading...</p>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'rgba(61,200,152,0.5)' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✓</div>
          <p>No {filter === 'acknowledged' ? 'acknowledged' : 'pending'} alerts</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          {filtered.map(alert => (
            <div key={alert.id} style={{
              background: `${severityColor[alert.severity] || '#3DC898'}06`,
              border: `1px solid ${severityColor[alert.severity] || '#3DC898'}20`,
              borderLeft: `3px solid ${severityColor[alert.severity] || '#3DC898'}`,
              borderRadius: 6,
              padding: '1.25rem',
              opacity: alert.acknowledged ? 0.5 : 1,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                    <span>{severityIcon[alert.severity] || '⚪'}</span>
                    <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: severityColor[alert.severity], textTransform: 'uppercase', fontWeight: 700 }}>
                      {alert.severity}
                    </span>
                    <span style={{ fontSize: '0.65rem', color: 'rgba(240,232,216,0.25)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      {alert.alert_type?.replace('_', ' ')}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.9rem', color: '#F0E8D8', fontWeight: 500, marginBottom: '0.3rem' }}>{alert.title}</div>
                  <div style={{ fontSize: '0.78rem', color: 'rgba(240,232,216,0.5)', marginBottom: '0.5rem' }}>{alert.message}</div>

                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.72rem', color: 'rgba(240,232,216,0.3)' }}>
                    <span>Patient: <span style={{ color: 'rgba(240,232,216,0.6)' }}>{alert.orion_patients?.full_name}</span></span>
                    {alert.orion_protocols && <span>Protocol: <span style={{ color: 'rgba(240,232,216,0.6)' }}>{alert.orion_protocols.protocol_name}</span></span>}
                    {alert.due_date && <span>Due: <span style={{ color: '#E4B85A' }}>{new Date(alert.due_date).toLocaleDateString()}</span></span>}
                  </div>
                </div>

                {!alert.acknowledged && (
                  <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                    <Link href={`/orion/patients/${alert.orion_patients?.id}`} style={{
                      background: 'rgba(61,200,152,0.1)',
                      border: '1px solid rgba(61,200,152,0.2)',
                      borderRadius: 4,
                      padding: '0.4rem 0.75rem',
                      color: '#3DC898',
                      fontSize: '0.72rem',
                      textDecoration: 'none',
                      letterSpacing: '0.08em',
                    }}>View</Link>
                    <button onClick={() => acknowledge(alert.id)} style={{
                      background: 'transparent',
                      border: '1px solid rgba(240,232,216,0.1)',
                      borderRadius: 4,
                      padding: '0.4rem 0.75rem',
                      color: 'rgba(240,232,216,0.4)',
                      fontSize: '0.72rem',
                      cursor: 'pointer',
                      letterSpacing: '0.08em',
                    }}>Ack</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

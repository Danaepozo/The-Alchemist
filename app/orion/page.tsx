'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'

interface Stats {
  activePatients: number
  activeProtocols: number
  pendingAlerts: number
  todaySessions: number
}

interface Alert {
  id: string
  title: string
  message: string
  severity: string
  created_at: string
  orion_patients: { full_name: string }
}

interface Session {
  id: string
  session_date: string
  session_type: string
  orion_patients: { full_name: string }
}

const severityColor: Record<string, string> = {
  critical: '#ff4444',
  high: '#FF8C00',
  medium: '#E4B85A',
  low: 'rgba(240,232,216,0.4)',
}

export default function OrionDashboard() {
  const supabase = createClientComponentClient()
  const [stats, setStats] = useState<Stats>({ activePatients: 0, activeProtocols: 0, pendingAlerts: 0, todaySessions: 0 })
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const today = new Date().toISOString().split('T')[0]

  useEffect(() => {
    async function load() {
      const [patientsRes, protocolsRes, alertsRes, sessionsRes] = await Promise.all([
        supabase.from('orion_patients').select('*', { count: 'exact', head: true }).eq('status', 'active'),
        supabase.from('orion_protocols').select('*', { count: 'exact', head: true }).eq('status', 'active'),
        supabase.from('orion_alerts').select('*', { count: 'exact', head: true }).eq('acknowledged', false),
        supabase.from('orion_sessions').select('*', { count: 'exact', head: true }).eq('session_date', today),
      ])

      setStats({
        activePatients: patientsRes.count || 0,
        activeProtocols: protocolsRes.count || 0,
        pendingAlerts: alertsRes.count || 0,
        todaySessions: sessionsRes.count || 0,
      })

      const { data: alertData } = await supabase
        .from('orion_alerts')
        .select('*, orion_patients(full_name)')
        .eq('acknowledged', false)
        .order('severity', { ascending: true })
        .limit(5)

      const { data: sessionData } = await supabase
        .from('orion_sessions')
        .select('*, orion_patients(full_name)')
        .eq('session_date', today)
        .order('created_at', { ascending: true })

      setAlerts(alertData || [])
      setSessions(sessionData || [])
      setLoading(false)
    }
    load()
  }, [supabase, today])

  const statCards = [
    { label: 'Active Patients', value: stats.activePatients, color: '#3DC898' },
    { label: 'Active Protocols', value: stats.activeProtocols, color: '#3DC898' },
    { label: 'Pending Alerts', value: stats.pendingAlerts, color: stats.pendingAlerts > 0 ? '#ff4444' : '#3DC898' },
    { label: "Today's Sessions", value: stats.todaySessions, color: '#C9963C' },
  ]

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: '#3DC898', letterSpacing: '0.2em' }}>
      LOADING ORION...
    </div>
  )

  return (
    <div style={{ padding: '2rem', maxWidth: 1200 }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 300, color: '#3DC898', letterSpacing: '0.1em' }}>ORION Dashboard</h1>
        <p style={{ fontSize: '0.8rem', color: 'rgba(240,232,216,0.3)', marginTop: '0.25rem' }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {statCards.map(card => (
          <div key={card.label} style={{
            background: 'rgba(255,255,255,0.02)',
            border: `1px solid ${card.color}30`,
            borderRadius: 6,
            padding: '1.25rem',
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 300, color: card.color }}>{card.value}</div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(240,232,216,0.4)', marginTop: '0.25rem', letterSpacing: '0.05em' }}>{card.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Alerts */}
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,68,68,0.15)', borderRadius: 6, padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '0.85rem', letterSpacing: '0.15em', color: 'rgba(240,232,216,0.7)', textTransform: 'uppercase' }}>
              Critical Alerts {alerts.length > 0 && <span style={{ color: '#ff4444' }}>({alerts.length})</span>}
            </h2>
            <Link href="/orion/alerts" style={{ fontSize: '0.7rem', color: '#3DC898', textDecoration: 'none' }}>View all →</Link>
          </div>
          {alerts.length === 0 ? (
            <p style={{ color: 'rgba(61,200,152,0.6)', fontSize: '0.8rem' }}>✓ No pending alerts</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {alerts.map(alert => (
                <div key={alert.id} style={{
                  padding: '0.75rem',
                  background: `${severityColor[alert.severity]}08`,
                  border: `1px solid ${severityColor[alert.severity]}25`,
                  borderRadius: 4,
                  borderLeft: `3px solid ${severityColor[alert.severity]}`,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: severityColor[alert.severity], textTransform: 'uppercase', fontWeight: 600 }}>
                        {alert.severity}
                      </span>
                      <div style={{ fontSize: '0.8rem', color: '#F0E8D8', marginTop: '0.2rem' }}>{alert.title}</div>
                      <div style={{ fontSize: '0.72rem', color: 'rgba(240,232,216,0.4)', marginTop: '0.15rem' }}>
                        {alert.orion_patients?.full_name}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Today's Sessions */}
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,150,60,0.15)', borderRadius: 6, padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '0.85rem', letterSpacing: '0.15em', color: 'rgba(240,232,216,0.7)', textTransform: 'uppercase' }}>
              Today's Sessions
            </h2>
            <Link href="/orion/sessions" style={{ fontSize: '0.7rem', color: '#3DC898', textDecoration: 'none' }}>View all →</Link>
          </div>
          {sessions.length === 0 ? (
            <p style={{ color: 'rgba(240,232,216,0.3)', fontSize: '0.8rem' }}>No sessions scheduled today</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {sessions.map(session => (
                <div key={session.id} style={{
                  padding: '0.75rem',
                  background: 'rgba(201,150,60,0.05)',
                  border: '1px solid rgba(201,150,60,0.2)',
                  borderRadius: 4,
                }}>
                  <div style={{ fontSize: '0.85rem', color: '#F0E8D8', fontWeight: 500 }}>
                    {session.orion_patients?.full_name}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'rgba(240,232,216,0.4)', marginTop: '0.15rem' }}>
                    {session.session_type}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quick add patient button */}
          <Link href="/orion/patients" style={{
            display: 'block',
            marginTop: '1rem',
            padding: '0.6rem',
            background: 'rgba(61,200,152,0.08)',
            border: '1px solid rgba(61,200,152,0.2)',
            borderRadius: 4,
            color: '#3DC898',
            fontSize: '0.75rem',
            textAlign: 'center',
            textDecoration: 'none',
            letterSpacing: '0.1em',
          }}>+ View All Patients</Link>
        </div>
      </div>
    </div>
  )
}

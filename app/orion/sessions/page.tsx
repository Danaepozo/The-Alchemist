'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'

interface Session {
  id: string
  session_date: string
  session_type: string
  duration_mins: number
  chief_complaint: string
  ai_brief: string
  orion_patients: { id: string; full_name: string }
}

export default function SessionsPage() {
  const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedBrief, setExpandedBrief] = useState<string | null>(null)
  const [generatingBrief, setGeneratingBrief] = useState<string | null>(null)

  const today = new Date().toISOString().split('T')[0]

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('orion_sessions')
        .select('*, orion_patients(id, full_name)')
        .eq('session_date', today)
        .order('created_at', { ascending: true })
      setSessions(data || [])
      setLoading(false)
    }
    load()
  }, [supabase, today])

  async function generateBrief(session: Session) {
    setGeneratingBrief(session.id)
    const res = await fetch('/api/orion/briefing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patient_id: session.orion_patients.id, session_date: today }),
    })
    const data = await res.json()

    await supabase.from('orion_sessions').update({ ai_brief: data.briefing }).eq('id', session.id)

    setSessions(prev => prev.map(s => s.id === session.id ? { ...s, ai_brief: data.briefing } : s))
    setExpandedBrief(session.id)
    setGeneratingBrief(null)
  }

  return (
    <div style={{ padding: '2rem', maxWidth: 900 }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 300, color: '#3DC898', letterSpacing: '0.1em' }}>Today's Sessions</h1>
        <p style={{ fontSize: '0.8rem', color: 'rgba(240,232,216,0.3)', marginTop: '0.25rem' }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {loading ? (
        <p style={{ color: '#3DC898', letterSpacing: '0.2em' }}>Loading...</p>
      ) : sessions.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,150,60,0.1)', borderRadius: 6 }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem', color: 'rgba(201,150,60,0.4)' }}>◷</div>
          <p style={{ color: 'rgba(240,232,216,0.3)' }}>No sessions scheduled for today</p>
          <p style={{ fontSize: '0.75rem', color: 'rgba(240,232,216,0.2)', marginTop: '0.5rem' }}>Sessions are created from patient profiles</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {sessions.map(session => (
            <div key={session.id} style={{
              background: 'rgba(201,150,60,0.04)',
              border: '1px solid rgba(201,150,60,0.15)',
              borderRadius: 6,
              padding: '1.5rem',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%',
                    background: 'rgba(201,150,60,0.15)',
                    border: '1px solid rgba(201,150,60,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.85rem', color: '#C9963C', fontWeight: 600, flexShrink: 0,
                  }}>
                    {session.orion_patients.full_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <div style={{ fontSize: '1rem', color: '#F0E8D8', fontWeight: 500 }}>{session.orion_patients.full_name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(240,232,216,0.4)', marginTop: '0.15rem' }}>
                      {session.session_type} {session.duration_mins && `· ${session.duration_mins} min`}
                    </div>
                  </div>
                </div>
              </div>

              {session.chief_complaint && (
                <div style={{ fontSize: '0.78rem', color: 'rgba(240,232,216,0.5)', marginBottom: '1rem', fontStyle: 'italic' }}>
                  Chief complaint: {session.chief_complaint}
                </div>
              )}

              {/* Actions */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => session.ai_brief ? setExpandedBrief(expandedBrief === session.id ? null : session.id) : generateBrief(session)}
                  disabled={generatingBrief === session.id}
                  style={{
                    background: 'rgba(61,200,152,0.1)',
                    border: '1px solid rgba(61,200,152,0.25)',
                    borderRadius: 4,
                    padding: '0.5rem 1rem',
                    color: '#3DC898',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    letterSpacing: '0.1em',
                  }}
                >
                  {generatingBrief === session.id ? '⊕ Generating...' : session.ai_brief ? (expandedBrief === session.id ? 'Hide Brief' : 'Show Brief') : '⊕ ORION BRIEF'}
                </button>

                <Link href={`/orion/patients/${session.orion_patients.id}`} style={{
                  background: 'transparent',
                  border: '1px solid rgba(240,232,216,0.12)',
                  borderRadius: 4,
                  padding: '0.5rem 1rem',
                  color: 'rgba(240,232,216,0.5)',
                  fontSize: '0.75rem',
                  textDecoration: 'none',
                  letterSpacing: '0.1em',
                }}>View Profile</Link>
              </div>

              {/* AI Brief */}
              {expandedBrief === session.id && session.ai_brief && (
                <div style={{
                  marginTop: '1rem',
                  background: 'rgba(61,200,152,0.04)',
                  border: '1px solid rgba(61,200,152,0.15)',
                  borderRadius: 4,
                  padding: '1.25rem',
                  fontSize: '0.78rem',
                  color: 'rgba(240,232,216,0.75)',
                  lineHeight: 1.8,
                  whiteSpace: 'pre-wrap',
                }}>
                  {session.ai_brief}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

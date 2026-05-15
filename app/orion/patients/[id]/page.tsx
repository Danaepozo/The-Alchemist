'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import { useParams } from 'next/navigation'

interface Patient {
  id: string
  full_name: string
  date_of_birth: string
  gender: string
  email: string
  phone: string
  blood_type: string
  allergies: string[]
  conditions: string[]
  medications: string[]
  notes: string
  status: string
}

interface Protocol {
  id: string
  protocol_name: string
  category: string
  dose: string
  dose_unit: string
  frequency: string
  route: string
  start_date: string
  end_date: string
  status: string
  reason_started: string
}

interface Session {
  id: string
  session_date: string
  session_type: string
  chief_complaint: string
  observations: string
}

const categoryColors: Record<string, string> = {
  peptide: '#C9963C',
  hormone: '#9A7CE8',
  iv: '#3DC898',
  supplement: '#E4B85A',
}

export default function PatientProfile() {
  const { id } = useParams()
  const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  const [patient, setPatient] = useState<Patient | null>(null)
  const [protocols, setProtocols] = useState<Protocol[]>([])
  const [sessions, setSessions] = useState<Session[]>([])
  const [activeTab, setActiveTab] = useState<'sessions' | 'notes'>('sessions')
  const [loading, setLoading] = useState(true)
  const [briefing, setBriefing] = useState('')
  const [briefingLoading, setBriefingLoading] = useState(false)

  useEffect(() => {
    async function load() {
      const [patientRes, protocolsRes, sessionsRes] = await Promise.all([
        supabase.from('orion_patients').select('*').eq('id', id).single(),
        supabase.from('orion_protocols').select('*').eq('patient_id', id).eq('status', 'active').order('start_date', { ascending: false }),
        supabase.from('orion_sessions').select('*').eq('patient_id', id).order('session_date', { ascending: false }).limit(10),
      ])
      setPatient(patientRes.data)
      setProtocols(protocolsRes.data || [])
      setSessions(sessionsRes.data || [])
      setLoading(false)
    }
    load()
  }, [supabase, id])

  async function generateBriefing() {
    setBriefingLoading(true)
    const res = await fetch('/api/orion/briefing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patient_id: id, session_date: new Date().toISOString().split('T')[0] }),
    })
    const data = await res.json()
    setBriefing(data.briefing || 'Error generating briefing')
    setBriefingLoading(false)
  }

  function getAge(dob: string) {
    if (!dob) return '—'
    return Math.floor((Date.now() - new Date(dob).getTime()) / (365.25 * 24 * 60 * 60 * 1000))
  }

  if (loading) return <div style={{ padding: '2rem', color: '#3DC898', letterSpacing: '0.2em' }}>Loading patient...</div>
  if (!patient) return <div style={{ padding: '2rem', color: '#E06090' }}>Patient not found</div>

  return (
    <div style={{ padding: '2rem', maxWidth: 1200 }}>
      {/* Back */}
      <Link href="/orion/patients" style={{ fontSize: '0.75rem', color: 'rgba(240,232,216,0.4)', textDecoration: 'none', letterSpacing: '0.1em' }}>
        ← Back to Patients
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr 280px', gap: '1.5rem', marginTop: '1.5rem' }}>

        {/* LEFT — Profile */}
        <div>
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(61,200,152,0.12)', borderRadius: 6, padding: '1.5rem', marginBottom: '1rem' }}>
            {/* Avatar */}
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: 'rgba(61,200,152,0.12)',
              border: '1px solid rgba(61,200,152,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.25rem', color: '#3DC898', fontWeight: 600, margin: '0 auto 1rem',
            }}>
              {patient.full_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>

            <h2 style={{ fontSize: '1rem', color: '#F0E8D8', textAlign: 'center', marginBottom: '0.25rem' }}>{patient.full_name}</h2>
            <p style={{ fontSize: '0.75rem', color: 'rgba(240,232,216,0.4)', textAlign: 'center', marginBottom: '1.25rem' }}>
              {patient.gender} · {getAge(patient.date_of_birth)} yrs · {patient.blood_type || '—'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.75rem' }}>
              {patient.email && <div style={{ color: 'rgba(240,232,216,0.5)' }}>{patient.email}</div>}
              {patient.phone && <div style={{ color: 'rgba(240,232,216,0.5)' }}>{patient.phone}</div>}
            </div>
          </div>

          {/* Allergies */}
          {patient.allergies?.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(240,232,216,0.3)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Allergies</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {patient.allergies.map(a => (
                  <span key={a} style={{ background: 'rgba(224,96,144,0.15)', border: '1px solid rgba(224,96,144,0.3)', color: '#E06090', fontSize: '0.7rem', padding: '0.2rem 0.5rem', borderRadius: 2 }}>{a}</span>
                ))}
              </div>
            </div>
          )}

          {/* Conditions */}
          {patient.conditions?.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(240,232,216,0.3)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Conditions</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {patient.conditions.map(c => (
                  <span key={c} style={{ background: 'rgba(228,184,90,0.12)', border: '1px solid rgba(228,184,90,0.25)', color: '#E4B85A', fontSize: '0.7rem', padding: '0.2rem 0.5rem', borderRadius: 2 }}>{c}</span>
                ))}
              </div>
            </div>
          )}

          {/* Medications */}
          {patient.medications?.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(240,232,216,0.3)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>External Medications</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {patient.medications.map(m => (
                  <span key={m} style={{ background: 'rgba(154,124,232,0.1)', border: '1px solid rgba(154,124,232,0.2)', color: '#9A7CE8', fontSize: '0.7rem', padding: '0.2rem 0.5rem', borderRadius: 2 }}>{m}</span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1.5rem' }}>
            <button onClick={generateBriefing} disabled={briefingLoading} style={{
              background: briefingLoading ? 'rgba(61,200,152,0.2)' : 'rgba(61,200,152,0.1)',
              border: '1px solid rgba(61,200,152,0.3)',
              borderRadius: 4,
              padding: '0.6rem',
              color: '#3DC898',
              fontSize: '0.75rem',
              cursor: 'pointer',
              letterSpacing: '0.1em',
            }}>
              {briefingLoading ? 'Generating...' : '⊕ ORION BRIEF'}
            </button>
            <Link href={`/api/orion/contraindications?patient_id=${id}`} style={{
              background: 'rgba(228,184,90,0.08)',
              border: '1px solid rgba(228,184,90,0.2)',
              borderRadius: 4,
              padding: '0.6rem',
              color: '#E4B85A',
              fontSize: '0.75rem',
              textDecoration: 'none',
              textAlign: 'center',
              letterSpacing: '0.1em',
            }}>⚠ CHECK CONTRAS</Link>
          </div>
        </div>

        {/* CENTER — Protocols */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '0.85rem', letterSpacing: '0.15em', color: 'rgba(240,232,216,0.6)', textTransform: 'uppercase' }}>
              Active Protocols ({protocols.length})
            </h3>
            <Link href={`/orion/patients/${id}/protocol/new`} style={{
              background: '#3DC898',
              color: '#000',
              padding: '0.4rem 0.9rem',
              borderRadius: 4,
              fontSize: '0.72rem',
              fontWeight: 700,
              textDecoration: 'none',
              letterSpacing: '0.1em',
            }}>+ PROTOCOL</Link>
          </div>

          {protocols.length === 0 ? (
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(61,200,152,0.1)', borderRadius: 6, padding: '2rem', textAlign: 'center', color: 'rgba(240,232,216,0.3)' }}>
              No active protocols
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {protocols.map(protocol => {
                const color = categoryColors[protocol.category] || '#3DC898'
                const daysRemaining = protocol.end_date
                  ? Math.ceil((new Date(protocol.end_date).getTime() - Date.now()) / (24 * 60 * 60 * 1000))
                  : null
                return (
                  <div key={protocol.id} style={{
                    background: `${color}08`,
                    border: `1px solid ${color}25`,
                    borderLeft: `3px solid ${color}`,
                    borderRadius: 6,
                    padding: '1.25rem',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                      <div>
                        <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color, textTransform: 'uppercase', fontWeight: 600 }}>{protocol.category}</span>
                        <div style={{ fontSize: '0.95rem', color: '#F0E8D8', fontWeight: 500, marginTop: '0.2rem' }}>{protocol.protocol_name}</div>
                      </div>
                      <span style={{ fontSize: '0.65rem', color: 'rgba(61,200,152,0.7)', background: 'rgba(61,200,152,0.1)', padding: '0.2rem 0.5rem', borderRadius: 2 }}>Active</span>
                    </div>

                    <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.78rem', color: 'rgba(240,232,216,0.5)', marginBottom: '0.75rem' }}>
                      <span>{protocol.dose} {protocol.dose_unit}</span>
                      <span>{protocol.frequency}</span>
                      {protocol.route && <span>{protocol.route}</span>}
                    </div>

                    {daysRemaining !== null && (
                      <div style={{ marginBottom: '0.75rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'rgba(240,232,216,0.3)', marginBottom: '0.35rem' }}>
                          <span>Cycle Progress</span>
                          <span style={{ color: daysRemaining <= 7 ? '#E06090' : 'rgba(240,232,216,0.4)' }}>
                            {daysRemaining <= 0 ? 'Cycle ended' : `${daysRemaining} days remaining`}
                          </span>
                        </div>
                      </div>
                    )}

                    {protocol.reason_started && (
                      <div style={{ fontSize: '0.72rem', color: 'rgba(240,232,216,0.35)', fontStyle: 'italic' }}>
                        Reason: {protocol.reason_started}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* RIGHT — History */}
        <div>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            {(['sessions', 'notes'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                background: activeTab === tab ? 'rgba(61,200,152,0.1)' : 'transparent',
                border: `1px solid ${activeTab === tab ? 'rgba(61,200,152,0.3)' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: 4,
                padding: '0.4rem 0.75rem',
                color: activeTab === tab ? '#3DC898' : 'rgba(240,232,216,0.4)',
                fontSize: '0.72rem',
                cursor: 'pointer',
                letterSpacing: '0.1em',
                textTransform: 'capitalize',
              }}>{tab}</button>
            ))}
          </div>

          {activeTab === 'sessions' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {sessions.length === 0 ? (
                <p style={{ color: 'rgba(240,232,216,0.3)', fontSize: '0.8rem' }}>No sessions recorded</p>
              ) : sessions.map(session => (
                <div key={session.id} style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(240,232,216,0.06)',
                  borderRadius: 4,
                  padding: '0.875rem',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '0.8rem', color: '#F0E8D8' }}>{session.session_type}</span>
                    <span style={{ fontSize: '0.7rem', color: 'rgba(240,232,216,0.3)' }}>
                      {new Date(session.session_date).toLocaleDateString()}
                    </span>
                  </div>
                  {session.chief_complaint && (
                    <div style={{ fontSize: '0.72rem', color: 'rgba(240,232,216,0.4)' }}>{session.chief_complaint}</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'notes' && (
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(240,232,216,0.06)', borderRadius: 4, padding: '1rem', fontSize: '0.8rem', color: 'rgba(240,232,216,0.6)', lineHeight: 1.7 }}>
              {patient.notes || 'No notes recorded'}
            </div>
          )}

          {/* AI Briefing */}
          {briefing && (
            <div style={{ marginTop: '1.5rem', background: 'rgba(61,200,152,0.05)', border: '1px solid rgba(61,200,152,0.2)', borderRadius: 6, padding: '1.25rem' }}>
              <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: '#3DC898', marginBottom: '0.75rem', textTransform: 'uppercase' }}>ORION Brief</div>
              <div style={{ fontSize: '0.78rem', color: 'rgba(240,232,216,0.7)', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{briefing}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'

interface Patient {
  id: string
  full_name: string
  email: string
  phone: string
  status: string
  conditions: string[]
  allergies: string[]
  created_at: string
  protocol_count?: number
  alert_count?: number
}

export default function PatientsPage() {
  const supabase = createClientComponentClient()
  const [patients, setPatients] = useState<Patient[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('orion_patients')
        .select('*')
        .order('full_name', { ascending: true })
      setPatients(data || [])
      setLoading(false)
    }
    load()
  }, [supabase])

  const filtered = patients.filter(p =>
    p.full_name.toLowerCase().includes(search.toLowerCase()) ||
    p.email?.toLowerCase().includes(search.toLowerCase())
  )

  function getInitials(name: string) {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  }

  return (
    <div style={{ padding: '2rem', maxWidth: 1100 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 300, color: '#3DC898', letterSpacing: '0.1em' }}>Patients</h1>
          <p style={{ fontSize: '0.8rem', color: 'rgba(240,232,216,0.3)', marginTop: '0.25rem' }}>{patients.length} registered patients</p>
        </div>
        <Link href="/orion/patients/new" style={{
          background: '#3DC898',
          color: '#000',
          padding: '0.6rem 1.25rem',
          borderRadius: 4,
          fontSize: '0.8rem',
          fontWeight: 600,
          textDecoration: 'none',
          letterSpacing: '0.1em',
        }}>+ NEW PATIENT</Link>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search patients by name or email..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          width: '100%',
          maxWidth: 400,
          background: 'rgba(61,200,152,0.05)',
          border: '1px solid rgba(61,200,152,0.2)',
          borderRadius: 4,
          padding: '0.7rem 1rem',
          color: '#F0E8D8',
          fontSize: '0.85rem',
          outline: 'none',
          marginBottom: '1.5rem',
        }}
      />

      {loading ? (
        <p style={{ color: '#3DC898', letterSpacing: '0.2em' }}>Loading...</p>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'rgba(240,232,216,0.3)' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⊕</div>
          <p>No patients found</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filtered.map(patient => (
            <Link key={patient.id} href={`/orion/patients/${patient.id}`} style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(61,200,152,0.12)',
                borderRadius: 6,
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                cursor: 'pointer',
                transition: 'border-color 0.2s',
              }}>
                {/* Avatar */}
                <div style={{
                  width: 44, height: 44,
                  borderRadius: '50%',
                  background: 'rgba(61,200,152,0.12)',
                  border: '1px solid rgba(61,200,152,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.85rem',
                  color: '#3DC898',
                  fontWeight: 600,
                  flexShrink: 0,
                }}>
                  {getInitials(patient.full_name)}
                </div>

                {/* Name + email */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.95rem', color: '#F0E8D8', fontWeight: 500 }}>{patient.full_name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(240,232,216,0.4)', marginTop: '0.2rem' }}>
                    {patient.email} {patient.phone && `· ${patient.phone}`}
                  </div>
                </div>

                {/* Conditions */}
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', maxWidth: 300 }}>
                  {(patient.conditions || []).slice(0, 3).map(c => (
                    <span key={c} style={{
                      background: 'rgba(228,184,90,0.1)',
                      border: '1px solid rgba(228,184,90,0.2)',
                      color: '#E4B85A',
                      fontSize: '0.65rem',
                      padding: '0.2rem 0.5rem',
                      borderRadius: 2,
                      letterSpacing: '0.05em',
                    }}>{c}</span>
                  ))}
                  {(patient.allergies || []).slice(0, 2).map(a => (
                    <span key={a} style={{
                      background: 'rgba(224,96,144,0.1)',
                      border: '1px solid rgba(224,96,144,0.2)',
                      color: '#E06090',
                      fontSize: '0.65rem',
                      padding: '0.2rem 0.5rem',
                      borderRadius: 2,
                    }}>⚠ {a}</span>
                  ))}
                </div>

                {/* Status */}
                <div style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: patient.status === 'active' ? '#3DC898' : 'rgba(240,232,216,0.3)',
                  background: patient.status === 'active' ? 'rgba(61,200,152,0.1)' : 'rgba(240,232,216,0.05)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: 2,
                  flexShrink: 0,
                }}>{patient.status}</div>

                <span style={{ color: 'rgba(240,232,216,0.3)', fontSize: '0.9rem' }}>→</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

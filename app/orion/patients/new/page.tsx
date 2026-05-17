'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const inputStyle = {
  width: '100%',
  background: 'rgba(0,0,0,0.3)',
  border: '1px solid rgba(61,200,152,0.2)',
  borderRadius: 4,
  padding: '0.6rem 0.75rem',
  color: '#F0E8D8',
  fontSize: '0.82rem',
  outline: 'none',
  boxSizing: 'border-box' as const,
}

const labelStyle = {
  fontSize: '0.65rem',
  letterSpacing: '0.15em',
  color: 'rgba(240,232,216,0.35)',
  textTransform: 'uppercase' as const,
  display: 'block',
  marginBottom: '0.35rem',
}

export default function NewPatientPage() {
  const router = useRouter()
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    full_name: '',
    date_of_birth: '',
    gender: '',
    email: '',
    phone: '',
    blood_type: '',
    allergies: '',
    conditions: '',
    medications: '',
    notes: '',
    status: 'active',
  })

  function update(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function parseList(val: string): string[] {
    return val.split(',').map(s => s.trim()).filter(Boolean)
  }

  async function save() {
    if (!form.full_name.trim()) { setError('Full name is required'); return }
    setSaving(true)
    setError('')

    const { data, error: err } = await supabase
      .from('orion_patients')
      .insert({
        full_name: form.full_name.trim(),
        date_of_birth: form.date_of_birth || null,
        gender: form.gender || null,
        email: form.email.trim() || null,
        phone: form.phone.trim() || null,
        blood_type: form.blood_type || null,
        allergies: parseList(form.allergies),
        conditions: parseList(form.conditions),
        medications: parseList(form.medications),
        notes: form.notes.trim() || null,
        status: form.status,
      })
      .select()
      .single()

    if (err) {
      setError(err.message)
      setSaving(false)
      return
    }

    router.push(`/orion/patients/${data.id}`)
  }

  return (
    <div style={{ padding: '2rem', maxWidth: 720 }}>
      <Link href="/orion/patients" style={{ fontSize: '0.75rem', color: 'rgba(240,232,216,0.4)', textDecoration: 'none', letterSpacing: '0.1em' }}>
        ← Back to Patients
      </Link>

      <h1 style={{ fontSize: '1.4rem', fontWeight: 300, color: '#3DC898', letterSpacing: '0.1em', margin: '1.5rem 0 0.25rem' }}>New Patient</h1>
      <p style={{ fontSize: '0.78rem', color: 'rgba(240,232,216,0.3)', marginBottom: '2rem' }}>Register a new patient in the ORION system</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>

        {/* Full name */}
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Full Name *</label>
          <input value={form.full_name} onChange={e => update('full_name', e.target.value)} placeholder="First and last name" style={inputStyle} />
        </div>

        {/* DOB */}
        <div>
          <label style={labelStyle}>Date of Birth</label>
          <input type="date" value={form.date_of_birth} onChange={e => update('date_of_birth', e.target.value)} style={inputStyle} />
        </div>

        {/* Gender */}
        <div>
          <label style={labelStyle}>Gender</label>
          <select value={form.gender} onChange={e => update('gender', e.target.value)} style={inputStyle}>
            <option value="">Select...</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-binary">Non-binary</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Email */}
        <div>
          <label style={labelStyle}>Email</label>
          <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="patient@email.com" style={inputStyle} />
        </div>

        {/* Phone */}
        <div>
          <label style={labelStyle}>Phone</label>
          <input value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+1 305 000 0000" style={inputStyle} />
        </div>

        {/* Blood type */}
        <div>
          <label style={labelStyle}>Blood Type</label>
          <select value={form.blood_type} onChange={e => update('blood_type', e.target.value)} style={inputStyle}>
            <option value="">Unknown</option>
            {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        {/* Status */}
        <div>
          <label style={labelStyle}>Status</label>
          <select value={form.status} onChange={e => update('status', e.target.value)} style={inputStyle}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {/* Allergies */}
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Allergies <span style={{ color: 'rgba(240,232,216,0.2)', textTransform: 'none', letterSpacing: 0 }}>(separate with commas)</span></label>
          <input value={form.allergies} onChange={e => update('allergies', e.target.value)} placeholder="Penicillin, Sulfa, Latex..." style={inputStyle} />
        </div>

        {/* Conditions */}
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Conditions / Diagnoses <span style={{ color: 'rgba(240,232,216,0.2)', textTransform: 'none', letterSpacing: 0 }}>(separate with commas)</span></label>
          <input value={form.conditions} onChange={e => update('conditions', e.target.value)} placeholder="Hypothyroidism, Chronic fatigue, Low testosterone..." style={inputStyle} />
        </div>

        {/* Medications */}
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>External Medications <span style={{ color: 'rgba(240,232,216,0.2)', textTransform: 'none', letterSpacing: 0 }}>(separate with commas)</span></label>
          <input value={form.medications} onChange={e => update('medications', e.target.value)} placeholder="Levothyroxine 50mcg, Metformin 500mg..." style={inputStyle} />
        </div>

        {/* Notes */}
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Clinical Notes</label>
          <textarea
            value={form.notes}
            onChange={e => update('notes', e.target.value)}
            rows={4}
            placeholder="Intake notes, relevant history, referral source..."
            style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
          />
        </div>
      </div>

      {error && (
        <div style={{ marginTop: '1rem', padding: '0.75rem 1rem', background: 'rgba(224,96,144,0.1)', border: '1px solid rgba(224,96,144,0.3)', borderRadius: 4, color: '#E06090', fontSize: '0.8rem' }}>
          {error}
        </div>
      )}

      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        <button
          onClick={save}
          disabled={saving}
          style={{
            background: saving ? 'rgba(61,200,152,0.4)' : '#3DC898',
            border: 'none',
            borderRadius: 4,
            padding: '0.75rem 2rem',
            color: '#000',
            fontSize: '0.82rem',
            fontWeight: 700,
            cursor: saving ? 'not-allowed' : 'pointer',
            letterSpacing: '0.1em',
          }}
        >
          {saving ? 'Saving...' : 'CREATE PATIENT'}
        </button>
        <Link href="/orion/patients" style={{
          background: 'transparent',
          border: '1px solid rgba(240,232,216,0.12)',
          borderRadius: 4,
          padding: '0.75rem 1.5rem',
          color: 'rgba(240,232,216,0.4)',
          fontSize: '0.82rem',
          textDecoration: 'none',
          letterSpacing: '0.1em',
        }}>Cancel</Link>
      </div>
    </div>
  )
}

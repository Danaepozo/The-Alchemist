'use client'

import { useEffect, useState, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'
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

interface LabValue {
  marker: string
  value: string
  unit: string
  reference_range: string
  flag: 'H' | 'L' | 'N' | ''
}

interface LabAnalysisFinding {
  marker: string
  value: string
  flag: string
  significance: string
  recommendation: string
}

interface LabAnalysis {
  summary: string
  findings: LabAnalysisFinding[]
  deficiencies: string[]
  patterns: string
  suggested_protocols: string[]
  alerts: { severity: string; title: string; message: string }[]
  follow_up_tests: string[]
  overall_score: string
}

interface Lab {
  id: string
  panel_name: string
  test_date: string
  lab_values: LabValue[]
  notes: string
  ordered_by: string
  ai_analysis?: string
}

const categoryColors: Record<string, string> = {
  peptide: '#C9963C',
  hormone: '#9A7CE8',
  iv: '#3DC898',
  supplement: '#E4B85A',
  longevity: '#E06090',
  diagnostics: '#60C0E0',
}

const COMMON_PANELS = [
  'Complete Blood Count (CBC)',
  'Comprehensive Metabolic Panel (CMP)',
  'Lipid Panel',
  'Thyroid Panel',
  'Sex Hormones',
  'Inflammatory Markers',
  'Vitamins & Nutrients',
  'Longevity Markers',
  'Adrenal / DUTCH',
  'Heavy Metals',
  'Custom Panel',
]

const PANEL_TEMPLATES: Record<string, LabValue[]> = {
  'Sex Hormones': [
    { marker: 'Testosterone Total', value: '', unit: 'ng/dL', reference_range: '264-916', flag: '' },
    { marker: 'Free Testosterone', value: '', unit: 'pg/mL', reference_range: '8.7-25.1', flag: '' },
    { marker: 'Estradiol (E2)', value: '', unit: 'pg/mL', reference_range: '7.6-42.6', flag: '' },
    { marker: 'SHBG', value: '', unit: 'nmol/L', reference_range: '16.5-55.9', flag: '' },
    { marker: 'LH', value: '', unit: 'mIU/mL', reference_range: '1.7-8.6', flag: '' },
    { marker: 'FSH', value: '', unit: 'mIU/mL', reference_range: '1.5-12.4', flag: '' },
    { marker: 'DHEA-S', value: '', unit: 'mcg/dL', reference_range: '102-416', flag: '' },
    { marker: 'Prolactin', value: '', unit: 'ng/mL', reference_range: '4.0-15.2', flag: '' },
    { marker: 'PSA', value: '', unit: 'ng/mL', reference_range: '0-4.0', flag: '' },
  ],
  'Thyroid Panel': [
    { marker: 'TSH', value: '', unit: 'mIU/L', reference_range: '0.4-4.0', flag: '' },
    { marker: 'Free T3', value: '', unit: 'pg/mL', reference_range: '2.0-4.4', flag: '' },
    { marker: 'Free T4', value: '', unit: 'ng/dL', reference_range: '0.8-1.8', flag: '' },
    { marker: 'Total T3', value: '', unit: 'ng/dL', reference_range: '80-200', flag: '' },
    { marker: 'Reverse T3', value: '', unit: 'ng/dL', reference_range: '10-24', flag: '' },
    { marker: 'TPO Antibodies', value: '', unit: 'IU/mL', reference_range: '0-34', flag: '' },
  ],
  'Lipid Panel': [
    { marker: 'Total Cholesterol', value: '', unit: 'mg/dL', reference_range: '<200', flag: '' },
    { marker: 'LDL', value: '', unit: 'mg/dL', reference_range: '<100', flag: '' },
    { marker: 'HDL', value: '', unit: 'mg/dL', reference_range: '>40', flag: '' },
    { marker: 'Triglycerides', value: '', unit: 'mg/dL', reference_range: '<150', flag: '' },
    { marker: 'ApoB', value: '', unit: 'mg/dL', reference_range: '<90', flag: '' },
    { marker: 'Lp(a)', value: '', unit: 'nmol/L', reference_range: '<75', flag: '' },
  ],
  'Longevity Markers': [
    { marker: 'HbA1c', value: '', unit: '%', reference_range: '<5.7', flag: '' },
    { marker: 'Fasting Insulin', value: '', unit: 'mcIU/mL', reference_range: '2-10', flag: '' },
    { marker: 'Fasting Glucose', value: '', unit: 'mg/dL', reference_range: '70-99', flag: '' },
    { marker: 'IGF-1', value: '', unit: 'ng/mL', reference_range: '94-269', flag: '' },
    { marker: 'hs-CRP', value: '', unit: 'mg/L', reference_range: '<1.0', flag: '' },
    { marker: 'Homocysteine', value: '', unit: 'mcmol/L', reference_range: '5-15', flag: '' },
    { marker: 'ApoB', value: '', unit: 'mg/dL', reference_range: '<90', flag: '' },
    { marker: 'Omega-3 Index', value: '', unit: '%', reference_range: '>8', flag: '' },
  ],
  'Vitamins & Nutrients': [
    { marker: 'Vitamin D (25-OH)', value: '', unit: 'ng/mL', reference_range: '40-80', flag: '' },
    { marker: 'Vitamin B12', value: '', unit: 'pg/mL', reference_range: '200-900', flag: '' },
    { marker: 'Folate', value: '', unit: 'ng/mL', reference_range: '>5.4', flag: '' },
    { marker: 'Ferritin', value: '', unit: 'ng/mL', reference_range: '20-250', flag: '' },
    { marker: 'Iron', value: '', unit: 'mcg/dL', reference_range: '60-170', flag: '' },
    { marker: 'Magnesium (RBC)', value: '', unit: 'mg/dL', reference_range: '4.2-6.8', flag: '' },
    { marker: 'Zinc', value: '', unit: 'mcg/dL', reference_range: '60-130', flag: '' },
  ],
  'Inflammatory Markers': [
    { marker: 'hs-CRP', value: '', unit: 'mg/L', reference_range: '<1.0', flag: '' },
    { marker: 'Homocysteine', value: '', unit: 'mcmol/L', reference_range: '5-15', flag: '' },
    { marker: 'ESR', value: '', unit: 'mm/hr', reference_range: '0-20', flag: '' },
    { marker: 'Fibrinogen', value: '', unit: 'mg/dL', reference_range: '200-400', flag: '' },
    { marker: 'IL-6', value: '', unit: 'pg/mL', reference_range: '<7', flag: '' },
    { marker: 'TNF-alpha', value: '', unit: 'pg/mL', reference_range: '<8.1', flag: '' },
  ],
  'Complete Blood Count (CBC)': [
    { marker: 'WBC', value: '', unit: 'K/uL', reference_range: '4.5-11.0', flag: '' },
    { marker: 'RBC', value: '', unit: 'M/uL', reference_range: '4.5-5.9', flag: '' },
    { marker: 'Hemoglobin', value: '', unit: 'g/dL', reference_range: '13.5-17.5', flag: '' },
    { marker: 'Hematocrit', value: '', unit: '%', reference_range: '41-53', flag: '' },
    { marker: 'Platelets', value: '', unit: 'K/uL', reference_range: '150-400', flag: '' },
    { marker: 'MCV', value: '', unit: 'fL', reference_range: '80-100', flag: '' },
  ],
  'Comprehensive Metabolic Panel (CMP)': [
    { marker: 'Glucose', value: '', unit: 'mg/dL', reference_range: '70-99', flag: '' },
    { marker: 'BUN', value: '', unit: 'mg/dL', reference_range: '7-25', flag: '' },
    { marker: 'Creatinine', value: '', unit: 'mg/dL', reference_range: '0.7-1.3', flag: '' },
    { marker: 'eGFR', value: '', unit: 'mL/min', reference_range: '>60', flag: '' },
    { marker: 'ALT', value: '', unit: 'U/L', reference_range: '7-56', flag: '' },
    { marker: 'AST', value: '', unit: 'U/L', reference_range: '10-40', flag: '' },
    { marker: 'Sodium', value: '', unit: 'mEq/L', reference_range: '136-145', flag: '' },
    { marker: 'Potassium', value: '', unit: 'mEq/L', reference_range: '3.5-5.1', flag: '' },
  ],
}

function flagColor(flag: string) {
  if (flag === 'H') return '#E06090'
  if (flag === 'L') return '#E4B85A'
  return '#3DC898'
}

export default function PatientProfile() {
  const { id } = useParams()
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  const [patient, setPatient] = useState<Patient | null>(null)
  const [protocols, setProtocols] = useState<Protocol[]>([])
  const [sessions, setSessions] = useState<Session[]>([])
  const [labs, setLabs] = useState<Lab[]>([])
  const [activeTab, setActiveTab] = useState<'sessions' | 'notes' | 'labs'>('labs')
  const [loading, setLoading] = useState(true)
  const [briefing, setBriefing] = useState('')
  const [briefingLoading, setBriefingLoading] = useState(false)
  const [showAddLab, setShowAddLab] = useState(false)
  const [expandedLab, setExpandedLab] = useState<string | null>(null)
  const [savingLab, setSavingLab] = useState(false)
  const [parsingImage, setParsingImage] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [analyzingLab, setAnalyzingLab] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [newLab, setNewLab] = useState<{
    panel_name: string
    test_date: string
    notes: string
    lab_values: LabValue[]
  }>({
    panel_name: '',
    test_date: new Date().toISOString().split('T')[0],
    notes: '',
    lab_values: [{ marker: '', value: '', unit: '', reference_range: '', flag: '' }],
  })

  useEffect(() => {
    async function load() {
      const [patientRes, protocolsRes, sessionsRes, labsRes] = await Promise.all([
        supabase.from('orion_patients').select('*').eq('id', id).single(),
        supabase.from('orion_protocols').select('*').eq('patient_id', id).eq('status', 'active').order('start_date', { ascending: false }),
        supabase.from('orion_sessions').select('*').eq('patient_id', id).order('session_date', { ascending: false }).limit(10),
        supabase.from('orion_labs').select('*').eq('patient_id', id).order('test_date', { ascending: false }),
      ])
      setPatient(patientRes.data)
      setProtocols(protocolsRes.data || [])
      setSessions(sessionsRes.data || [])
      setLabs(labsRes.data || [])
      setLoading(false)
    }
    load()
  }, [supabase, id])

  function handlePanelSelect(panelName: string) {
    const template = PANEL_TEMPLATES[panelName]
    setNewLab(prev => ({
      ...prev,
      panel_name: panelName,
      lab_values: template
        ? template.map(v => ({ ...v }))
        : [{ marker: '', value: '', unit: '', reference_range: '', flag: '' }],
    }))
  }

  function updateLabValue(index: number, field: keyof LabValue, value: string) {
    setNewLab(prev => {
      const updated = [...prev.lab_values]
      updated[index] = { ...updated[index], [field]: value }
      return { ...prev, lab_values: updated }
    })
  }

  function addMarkerRow() {
    setNewLab(prev => ({
      ...prev,
      lab_values: [...prev.lab_values, { marker: '', value: '', unit: '', reference_range: '', flag: '' }],
    }))
  }

  function removeMarkerRow(index: number) {
    setNewLab(prev => ({
      ...prev,
      lab_values: prev.lab_values.filter((_, i) => i !== index),
    }))
  }

  async function saveLab() {
    if (!newLab.panel_name || !newLab.test_date) return
    setSavingLab(true)
    const filled = newLab.lab_values.filter(v => v.marker && v.value)
    const { data, error } = await supabase.from('orion_labs').insert({
      patient_id: id,
      panel_name: newLab.panel_name,
      test_date: newLab.test_date,
      lab_values: filled,
      notes: newLab.notes,
      ordered_by: 'Dr. Michael J. Meighen',
    }).select().single()

    if (!error && data) {
      setLabs(prev => [data, ...prev])
      setExpandedLab(data.id)
      setShowAddLab(false)
      setImagePreview(null)
      setNewLab({
        panel_name: '',
        test_date: new Date().toISOString().split('T')[0],
        notes: '',
        lab_values: [{ marker: '', value: '', unit: '', reference_range: '', flag: '' }],
      })
      setSavingLab(false)
      // Auto-trigger ORION analysis
      triggerAnalysis(data.id)
    } else {
      setSavingLab(false)
    }
  }

  async function triggerAnalysis(labId: string) {
    setAnalyzingLab(labId)
    try {
      const res = await fetch('/api/orion/labs/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lab_id: labId, patient_id: id }),
      })
      const result = await res.json()
      if (result.analysis) {
        setLabs(prev => prev.map(l =>
          l.id === labId ? { ...l, ai_analysis: JSON.stringify(result.analysis) } : l
        ))
      }
    } catch {
      // Analysis failed silently — can retry manually
    }
    setAnalyzingLab(null)
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setImagePreview(URL.createObjectURL(file))
    setParsingImage(true)
    setShowAddLab(true)

    const formData = new FormData()
    formData.append('image', file)

    try {
      const res = await fetch('/api/orion/labs/parse', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.error) throw new Error(data.error)

      setNewLab({
        panel_name: data.panel_name || '',
        test_date: data.test_date || new Date().toISOString().split('T')[0],
        notes: data.notes || '',
        lab_values: (data.lab_values || []).map((v: LabValue) => ({
          marker: v.marker || '',
          value: v.value || '',
          unit: v.unit || '',
          reference_range: v.reference_range || '',
          flag: v.flag || '',
        })),
      })
    } catch {
      alert('Error reading the image. Try a clearer photo or enter values manually.')
    } finally {
      setParsingImage(false)
    }
  }

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
      <Link href="/orion/patients" style={{ fontSize: '0.75rem', color: 'rgba(240,232,216,0.4)', textDecoration: 'none', letterSpacing: '0.1em' }}>
        ← Back to Patients
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr 320px', gap: '1.5rem', marginTop: '1.5rem' }}>

        {/* LEFT — Profile */}
        <div>
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(61,200,152,0.12)', borderRadius: 6, padding: '1.5rem', marginBottom: '1rem' }}>
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

                    <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.78rem', color: 'rgba(240,232,216,0.5)', marginBottom: '0.5rem' }}>
                      <span>{protocol.dose} {protocol.dose_unit}</span>
                      <span>{protocol.frequency}</span>
                      {protocol.route && <span>{protocol.route}</span>}
                    </div>

                    {daysRemaining !== null && (
                      <div style={{ fontSize: '0.7rem', color: daysRemaining <= 7 ? '#E06090' : 'rgba(240,232,216,0.3)' }}>
                        {daysRemaining <= 0 ? 'Cycle ended' : `${daysRemaining} days remaining`}
                      </div>
                    )}

                    {protocol.reason_started && (
                      <div style={{ fontSize: '0.72rem', color: 'rgba(240,232,216,0.35)', fontStyle: 'italic', marginTop: '0.5rem' }}>
                        Reason: {protocol.reason_started}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {/* ORION Brief result */}
          {briefing && (
            <div style={{ marginTop: '1.5rem', background: 'rgba(61,200,152,0.05)', border: '1px solid rgba(61,200,152,0.2)', borderRadius: 6, padding: '1.25rem' }}>
              <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: '#3DC898', marginBottom: '0.75rem', textTransform: 'uppercase' }}>ORION Brief</div>
              <div style={{ fontSize: '0.78rem', color: 'rgba(240,232,216,0.7)', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{briefing}</div>
            </div>
          )}
        </div>

        {/* RIGHT — Labs / Sessions / Notes */}
        <div>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            {(['labs', 'sessions', 'notes'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                background: activeTab === tab ? 'rgba(61,200,152,0.1)' : 'transparent',
                border: `1px solid ${activeTab === tab ? 'rgba(61,200,152,0.3)' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: 4,
                padding: '0.4rem 0.75rem',
                color: activeTab === tab ? '#3DC898' : 'rgba(240,232,216,0.4)',
                fontSize: '0.72rem',
                cursor: 'pointer',
                letterSpacing: '0.08em',
                textTransform: 'capitalize',
              }}>{tab === 'labs' ? `Labs (${labs.length})` : tab}</button>
            ))}
          </div>

          {/* LABS TAB */}
          {activeTab === 'labs' && (
            <div>
              {/* Upload buttons */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={parsingImage}
                  style={{
                    flex: 1,
                    background: parsingImage ? 'rgba(201,150,60,0.15)' : 'rgba(201,150,60,0.1)',
                    border: '1px solid rgba(201,150,60,0.3)',
                    borderRadius: 4,
                    padding: '0.6rem',
                    color: '#C9963C',
                    fontSize: '0.72rem',
                    cursor: 'pointer',
                    letterSpacing: '0.08em',
                  }}
                >
                  {parsingImage ? '⊕ Reading...' : '📷 SCAN LAB PHOTO'}
                </button>
                <button
                  onClick={() => {
                    setShowAddLab(!showAddLab)
                    setImagePreview(null)
                    if (!showAddLab) setNewLab({ panel_name: '', test_date: new Date().toISOString().split('T')[0], notes: '', lab_values: [{ marker: '', value: '', unit: '', reference_range: '', flag: '' }] })
                  }}
                  style={{
                    flex: 1,
                    background: 'rgba(61,200,152,0.08)',
                    border: '1px dashed rgba(61,200,152,0.3)',
                    borderRadius: 4,
                    padding: '0.6rem',
                    color: '#3DC898',
                    fontSize: '0.72rem',
                    cursor: 'pointer',
                    letterSpacing: '0.08em',
                  }}
                >
                  {showAddLab ? '✕ Cancel' : '+ MANUAL'}
                </button>
              </div>

              {/* Parsing status */}
              {parsingImage && (
                <div style={{
                  background: 'rgba(201,150,60,0.06)',
                  border: '1px solid rgba(201,150,60,0.2)',
                  borderRadius: 6,
                  padding: '1rem',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}>
                  {imagePreview && <img src={imagePreview} alt="lab" style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4, border: '1px solid rgba(201,150,60,0.3)' }} />}
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#C9963C', marginBottom: '0.25rem' }}>ORION reading lab results...</div>
                    <div style={{ fontSize: '0.68rem', color: 'rgba(240,232,216,0.4)' }}>Extracting markers, values, and flags</div>
                  </div>
                </div>
              )}

              {/* Image preview after parsing */}
              {imagePreview && !parsingImage && showAddLab && (
                <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'rgba(61,200,152,0.04)', border: '1px solid rgba(61,200,152,0.15)', borderRadius: 6 }}>
                  <img src={imagePreview} alt="lab" style={{ width: 52, height: 52, objectFit: 'cover', borderRadius: 4, border: '1px solid rgba(61,200,152,0.3)' }} />
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#3DC898' }}>✓ Lab results extracted</div>
                    <div style={{ fontSize: '0.65rem', color: 'rgba(240,232,216,0.4)', marginTop: '0.15rem' }}>Review values below and save</div>
                  </div>
                </div>
              )}

              {/* ADD LAB FORM */}
              {showAddLab && (
                <div style={{
                  background: 'rgba(61,200,152,0.04)',
                  border: '1px solid rgba(61,200,152,0.2)',
                  borderRadius: 6,
                  padding: '1.25rem',
                  marginBottom: '1rem',
                }}>
                  <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: '#3DC898', marginBottom: '1rem', textTransform: 'uppercase' }}>New Lab Panel</div>

                  {/* Panel name */}
                  <div style={{ marginBottom: '0.75rem' }}>
                    <label style={{ fontSize: '0.68rem', color: 'rgba(240,232,216,0.4)', display: 'block', marginBottom: '0.35rem', letterSpacing: '0.1em' }}>PANEL</label>
                    <select
                      value={newLab.panel_name}
                      onChange={e => handlePanelSelect(e.target.value)}
                      style={{
                        width: '100%', background: 'rgba(0,0,0,0.4)',
                        border: '1px solid rgba(61,200,152,0.2)', borderRadius: 4,
                        padding: '0.5rem', color: '#F0E8D8', fontSize: '0.78rem',
                      }}
                    >
                      <option value="">Select panel...</option>
                      {COMMON_PANELS.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>

                  {/* Date */}
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.68rem', color: 'rgba(240,232,216,0.4)', display: 'block', marginBottom: '0.35rem', letterSpacing: '0.1em' }}>DATE</label>
                    <input
                      type="date"
                      value={newLab.test_date}
                      onChange={e => setNewLab(prev => ({ ...prev, test_date: e.target.value }))}
                      style={{
                        width: '100%', background: 'rgba(0,0,0,0.4)',
                        border: '1px solid rgba(61,200,152,0.2)', borderRadius: 4,
                        padding: '0.5rem', color: '#F0E8D8', fontSize: '0.78rem',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  {/* Markers */}
                  <div style={{ marginBottom: '0.75rem' }}>
                    <div style={{ fontSize: '0.68rem', color: 'rgba(240,232,216,0.4)', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>MARKERS</div>

                    <div style={{ display: 'flex', gap: '0.25rem', fontSize: '0.6rem', color: 'rgba(240,232,216,0.25)', marginBottom: '0.35rem', letterSpacing: '0.08em' }}>
                      <span style={{ flex: 2 }}>MARKER</span>
                      <span style={{ width: 50 }}>VALUE</span>
                      <span style={{ width: 40 }}>UNIT</span>
                      <span style={{ width: 30 }}>FLAG</span>
                      <span style={{ width: 20 }}></span>
                    </div>

                    {newLab.lab_values.map((lv, i) => (
                      <div key={i} style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.35rem', alignItems: 'center' }}>
                        <input
                          value={lv.marker}
                          onChange={e => updateLabValue(i, 'marker', e.target.value)}
                          placeholder="Marker name"
                          style={{ flex: 2, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 3, padding: '0.35rem', color: '#F0E8D8', fontSize: '0.72rem' }}
                        />
                        <input
                          value={lv.value}
                          onChange={e => updateLabValue(i, 'value', e.target.value)}
                          placeholder="0.0"
                          style={{ width: 50, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 3, padding: '0.35rem', color: '#F0E8D8', fontSize: '0.72rem' }}
                        />
                        <input
                          value={lv.unit}
                          onChange={e => updateLabValue(i, 'unit', e.target.value)}
                          placeholder="unit"
                          style={{ width: 40, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 3, padding: '0.35rem', color: '#F0E8D8', fontSize: '0.72rem' }}
                        />
                        <select
                          value={lv.flag}
                          onChange={e => updateLabValue(i, 'flag', e.target.value)}
                          style={{ width: 40, background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 3, padding: '0.35rem', color: lv.flag === 'H' ? '#E06090' : lv.flag === 'L' ? '#E4B85A' : '#3DC898', fontSize: '0.72rem' }}
                        >
                          <option value="">—</option>
                          <option value="N">N</option>
                          <option value="H">H</option>
                          <option value="L">L</option>
                        </select>
                        <button onClick={() => removeMarkerRow(i)} style={{ width: 20, background: 'none', border: 'none', color: 'rgba(240,232,216,0.2)', cursor: 'pointer', fontSize: '0.8rem', padding: 0 }}>✕</button>
                      </div>
                    ))}

                    <button onClick={addMarkerRow} style={{ marginTop: '0.35rem', background: 'none', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: 3, padding: '0.3rem 0.75rem', color: 'rgba(240,232,216,0.3)', fontSize: '0.7rem', cursor: 'pointer', width: '100%' }}>
                      + Add marker
                    </button>
                  </div>

                  {/* Notes */}
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.68rem', color: 'rgba(240,232,216,0.4)', display: 'block', marginBottom: '0.35rem', letterSpacing: '0.1em' }}>NOTES (optional)</label>
                    <textarea
                      value={newLab.notes}
                      onChange={e => setNewLab(prev => ({ ...prev, notes: e.target.value }))}
                      rows={2}
                      placeholder="Clinical context, fasting status, etc."
                      style={{
                        width: '100%', background: 'rgba(0,0,0,0.3)',
                        border: '1px solid rgba(255,255,255,0.08)', borderRadius: 4,
                        padding: '0.5rem', color: '#F0E8D8', fontSize: '0.75rem',
                        resize: 'vertical', boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <button onClick={saveLab} disabled={savingLab || !newLab.panel_name} style={{
                    width: '100%',
                    background: savingLab ? 'rgba(61,200,152,0.2)' : '#3DC898',
                    border: 'none', borderRadius: 4,
                    padding: '0.6rem',
                    color: '#000', fontSize: '0.75rem',
                    fontWeight: 700, cursor: 'pointer', letterSpacing: '0.1em',
                  }}>
                    {savingLab ? 'Saving...' : 'SAVE LAB RESULTS'}
                  </button>
                </div>
              )}

              {/* LAB HISTORY */}
              {labs.length === 0 && !showAddLab ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'rgba(240,232,216,0.25)', fontSize: '0.8rem' }}>
                  No lab results yet.<br />
                  <span style={{ fontSize: '0.7rem' }}>Click "+ ADD LAB RESULTS" to begin.</span>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {labs.map(lab => (
                    <div key={lab.id} style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(61,200,152,0.12)',
                      borderRadius: 6,
                      overflow: 'hidden',
                    }}>
                      <button
                        onClick={() => setExpandedLab(expandedLab === lab.id ? null : lab.id)}
                        style={{
                          width: '100%', background: 'none', border: 'none',
                          padding: '0.875rem 1rem', cursor: 'pointer',
                          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        }}
                      >
                        <div style={{ textAlign: 'left' }}>
                          <div style={{ fontSize: '0.82rem', color: '#F0E8D8', fontWeight: 500 }}>{lab.panel_name}</div>
                          <div style={{ fontSize: '0.68rem', color: 'rgba(240,232,216,0.35)', marginTop: '0.15rem' }}>
                            {new Date(lab.test_date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            {' · '}{lab.lab_values?.length || 0} markers
                            {lab.lab_values?.some(v => v.flag === 'H' || v.flag === 'L') && (
                              <span style={{ marginLeft: '0.5rem', color: '#E06090' }}>⚠ abnormal</span>
                            )}
                            {analyzingLab === lab.id && (
                              <span style={{ marginLeft: '0.5rem', color: '#3DC898' }}>⊕ analyzing...</span>
                            )}
                            {lab.ai_analysis && analyzingLab !== lab.id && (() => {
                              try {
                                const a: LabAnalysis = JSON.parse(lab.ai_analysis)
                                const scoreColor = a.overall_score === 'Optimal' ? '#3DC898' : a.overall_score === 'Good' ? '#3DC898' : a.overall_score === 'Suboptimal' ? '#E4B85A' : a.overall_score === 'Concerning' ? '#FF8C00' : '#ff4444'
                                return <span style={{ marginLeft: '0.5rem', color: scoreColor, fontWeight: 600 }}>● {a.overall_score}</span>
                              } catch { return null }
                            })()}
                          </div>
                        </div>
                        <span style={{ color: 'rgba(240,232,216,0.3)', fontSize: '0.8rem' }}>
                          {expandedLab === lab.id ? '▲' : '▼'}
                        </span>
                      </button>

                      {expandedLab === lab.id && (
                        <div style={{ padding: '0 1rem 1rem' }}>
                          {/* Markers table */}
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 50px 30px', gap: '0.1rem', marginBottom: '0.5rem' }}>
                            {['MARKER', 'VALUE', 'UNIT', ''].map(h => (
                              <div key={h} style={{ fontSize: '0.58rem', color: 'rgba(240,232,216,0.2)', letterSpacing: '0.12em', padding: '0.2rem 0' }}>{h}</div>
                            ))}
                          </div>

                          {(lab.lab_values || []).map((lv, i) => (
                            <div key={i} style={{
                              display: 'grid',
                              gridTemplateColumns: '1fr 60px 50px 30px',
                              gap: '0.1rem',
                              padding: '0.3rem 0',
                              borderBottom: '1px solid rgba(255,255,255,0.04)',
                            }}>
                              <div style={{ fontSize: '0.75rem', color: 'rgba(240,232,216,0.7)' }}>{lv.marker}</div>
                              <div style={{ fontSize: '0.75rem', color: lv.flag ? flagColor(lv.flag) : '#F0E8D8', fontWeight: lv.flag ? 600 : 400 }}>{lv.value}</div>
                              <div style={{ fontSize: '0.68rem', color: 'rgba(240,232,216,0.3)' }}>{lv.unit}</div>
                              <div style={{ fontSize: '0.68rem', color: flagColor(lv.flag || 'N'), fontWeight: 600 }}>{lv.flag || ''}</div>
                            </div>
                          ))}

                          {lab.notes && (
                            <div style={{ marginTop: '0.75rem', fontSize: '0.72rem', color: 'rgba(240,232,216,0.4)', fontStyle: 'italic' }}>
                              {lab.notes}
                            </div>
                          )}

                          {/* ORION Analysis */}
                          {analyzingLab === lab.id && (
                            <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(61,200,152,0.05)', border: '1px solid rgba(61,200,152,0.15)', borderRadius: 4, fontSize: '0.72rem', color: '#3DC898', letterSpacing: '0.1em' }}>
                              ⊕ ORION analyzing lab results...
                            </div>
                          )}

                          {lab.ai_analysis && analyzingLab !== lab.id && (() => {
                            try {
                              const a: LabAnalysis = JSON.parse(lab.ai_analysis)
                              const scoreColors: Record<string, string> = { Optimal: '#3DC898', Good: '#3DC898', Suboptimal: '#E4B85A', Concerning: '#FF8C00', Critical: '#ff4444' }
                              const scoreColor = scoreColors[a.overall_score] || '#E4B85A'
                              return (
                                <div style={{ marginTop: '1rem', background: 'rgba(61,200,152,0.04)', border: '1px solid rgba(61,200,152,0.15)', borderRadius: 6, padding: '1rem', fontSize: '0.75rem' }}>
                                  {/* Header */}
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                    <span style={{ fontSize: '0.62rem', letterSpacing: '0.2em', color: '#3DC898', textTransform: 'uppercase' }}>ORION Analysis</span>
                                    <span style={{ fontSize: '0.68rem', fontWeight: 700, color: scoreColor, background: `${scoreColor}15`, padding: '0.15rem 0.5rem', borderRadius: 2 }}>{a.overall_score}</span>
                                  </div>

                                  {/* Summary */}
                                  <p style={{ color: 'rgba(240,232,216,0.75)', lineHeight: 1.7, marginBottom: '0.75rem' }}>{a.summary}</p>

                                  {/* Patterns */}
                                  {a.patterns && (
                                    <div style={{ marginBottom: '0.75rem', padding: '0.6rem', background: 'rgba(228,184,90,0.06)', border: '1px solid rgba(228,184,90,0.15)', borderRadius: 4 }}>
                                      <div style={{ fontSize: '0.6rem', color: '#E4B85A', letterSpacing: '0.15em', marginBottom: '0.3rem' }}>CLINICAL PATTERN</div>
                                      <div style={{ color: 'rgba(240,232,216,0.65)', lineHeight: 1.6 }}>{a.patterns}</div>
                                    </div>
                                  )}

                                  {/* Key Findings */}
                                  {a.findings?.length > 0 && (
                                    <div style={{ marginBottom: '0.75rem' }}>
                                      <div style={{ fontSize: '0.6rem', color: 'rgba(240,232,216,0.3)', letterSpacing: '0.15em', marginBottom: '0.4rem' }}>KEY FINDINGS</div>
                                      {a.findings.map((f, i) => (
                                        <div key={i} style={{ padding: '0.5rem', borderLeft: `2px solid ${f.flag === 'H' ? '#E06090' : f.flag === 'L' ? '#E4B85A' : '#3DC898'}`, marginBottom: '0.4rem', paddingLeft: '0.6rem' }}>
                                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.2rem' }}>
                                            <span style={{ fontWeight: 600, color: f.flag === 'H' ? '#E06090' : f.flag === 'L' ? '#E4B85A' : '#3DC898' }}>{f.marker}</span>
                                            <span style={{ color: 'rgba(240,232,216,0.5)' }}>{f.value}</span>
                                          </div>
                                          <div style={{ color: 'rgba(240,232,216,0.55)', lineHeight: 1.5 }}>{f.significance}</div>
                                          {f.recommendation && <div style={{ color: '#3DC898', marginTop: '0.2rem', fontSize: '0.7rem' }}>→ {f.recommendation}</div>}
                                        </div>
                                      ))}
                                    </div>
                                  )}

                                  {/* Deficiencies */}
                                  {a.deficiencies?.length > 0 && (
                                    <div style={{ marginBottom: '0.75rem' }}>
                                      <div style={{ fontSize: '0.6rem', color: 'rgba(240,232,216,0.3)', letterSpacing: '0.15em', marginBottom: '0.4rem' }}>DEFICIENCIES IDENTIFIED</div>
                                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                                        {a.deficiencies.map((d, i) => (
                                          <span key={i} style={{ background: 'rgba(224,96,144,0.1)', border: '1px solid rgba(224,96,144,0.25)', color: '#E06090', padding: '0.2rem 0.5rem', borderRadius: 2, fontSize: '0.7rem' }}>{d}</span>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Suggested Protocols */}
                                  {a.suggested_protocols?.length > 0 && (
                                    <div style={{ marginBottom: '0.75rem' }}>
                                      <div style={{ fontSize: '0.6rem', color: 'rgba(240,232,216,0.3)', letterSpacing: '0.15em', marginBottom: '0.4rem' }}>SUGGESTED PROTOCOLS</div>
                                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                                        {a.suggested_protocols.map((p, i) => (
                                          <span key={i} style={{ background: 'rgba(201,150,60,0.1)', border: '1px solid rgba(201,150,60,0.25)', color: '#C9963C', padding: '0.2rem 0.5rem', borderRadius: 2, fontSize: '0.7rem' }}>{p}</span>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Follow-up Tests */}
                                  {a.follow_up_tests?.length > 0 && (
                                    <div>
                                      <div style={{ fontSize: '0.6rem', color: 'rgba(240,232,216,0.3)', letterSpacing: '0.15em', marginBottom: '0.4rem' }}>FOLLOW-UP TESTS RECOMMENDED</div>
                                      <div style={{ color: 'rgba(240,232,216,0.45)', lineHeight: 1.8 }}>
                                        {a.follow_up_tests.map((t, i) => <div key={i}>· {t}</div>)}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )
                            } catch { return null }
                          })()}

                          {/* Manual re-analyze button */}
                          {!lab.ai_analysis && analyzingLab !== lab.id && (
                            <button
                              onClick={() => triggerAnalysis(lab.id)}
                              style={{ marginTop: '0.75rem', width: '100%', background: 'rgba(61,200,152,0.08)', border: '1px dashed rgba(61,200,152,0.25)', borderRadius: 4, padding: '0.5rem', color: '#3DC898', fontSize: '0.7rem', cursor: 'pointer', letterSpacing: '0.1em' }}
                            >
                              ⊕ ORION ANALYZE
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SESSIONS TAB */}
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

          {/* NOTES TAB */}
          {activeTab === 'notes' && (
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(240,232,216,0.06)', borderRadius: 4, padding: '1rem', fontSize: '0.8rem', color: 'rgba(240,232,216,0.6)', lineHeight: 1.7 }}>
              {patient.notes || 'No notes recorded'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

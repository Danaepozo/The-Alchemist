'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/auth-helpers-nextjs'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { PROTOCOL_CATALOG } from '@/lib/orion/knowledge-base'

type Step = 1 | 2 | 3 | 4

interface ContraIssue {
  severity: string
  issue: string
  protocols: string[]
  reason: string
  action: string
}

const severityColor: Record<string, string> = {
  CRITICAL: '#ff4444',
  HIGH: '#FF8C00',
  MEDIUM: '#E4B85A',
  LOW: '#3DC898',
}

const allProtocols = [
  ...PROTOCOL_CATALOG.peptides,
  ...PROTOCOL_CATALOG.hormones,
  ...PROTOCOL_CATALOG.iv_therapies,
  ...PROTOCOL_CATALOG.longevity,
]

export default function NewProtocol() {
  const { id } = useParams()
  const router = useRouter()
  const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  const [step, setStep] = useState<Step>(1)
  const [selected, setSelected] = useState<typeof allProtocols[0] | null>(null)
  const [form, setForm] = useState({ dose: '', dose_unit: '', frequency: 'daily', route: '', duration: '', reason: '', notes: '', start_date: new Date().toISOString().split('T')[0], end_date: '' })
  const [contraResult, setContraResult] = useState<{ cleared: boolean; issues: ContraIssue[]; analysis: string } | null>(null)
  const [checking, setChecking] = useState(false)
  const [saving, setSaving] = useState(false)
  const [overrideReason, setOverrideReason] = useState('')

  function selectProtocol(p: typeof allProtocols[0]) {
    setSelected(p)
    setForm(f => ({
      ...f,
      dose: p.default_dose || '',
      dose_unit: p.dose_unit || '',
      frequency: p.frequency || 'daily',
      route: ('route' in p ? p.route : '') || '',
    }))
  }

  async function runContraCheck() {
    setChecking(true)
    const res = await fetch('/api/orion/contraindications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patient_id: id, new_protocol: selected?.name }),
    })
    const data = await res.json()
    setContraResult(data)
    setChecking(false)
  }

  async function prescribe() {
    if (!selected) return
    setSaving(true)
    const { error } = await supabase.from('orion_protocols').insert({
      patient_id: id,
      protocol_name: selected.name,
      category: selected.category,
      dose: form.dose,
      dose_unit: form.dose_unit,
      frequency: form.frequency,
      route: form.route,
      start_date: form.start_date,
      end_date: form.end_date || null,
      cycle_weeks: ('typical_cycle_weeks' in selected ? selected.typical_cycle_weeks : null) || null,
      reason_started: form.reason,
      prescribing_notes: form.notes,
      status: 'active',
    })
    if (!error) {
      router.push(`/orion/patients/${id}`)
    }
    setSaving(false)
  }

  const categoryGroups = [
    { label: 'Peptides', items: PROTOCOL_CATALOG.peptides, color: '#C9963C' },
    { label: 'Hormones', items: PROTOCOL_CATALOG.hormones, color: '#9A7CE8' },
    { label: 'IV Therapies', items: PROTOCOL_CATALOG.iv_therapies, color: '#3DC898' },
    { label: 'Longevity', items: PROTOCOL_CATALOG.longevity, color: '#E4B85A' },
  ]

  return (
    <div style={{ padding: '2rem', maxWidth: 900 }}>
      <Link href={`/orion/patients/${id}`} style={{ fontSize: '0.75rem', color: 'rgba(240,232,216,0.4)', textDecoration: 'none' }}>← Back to Patient</Link>

      <h1 style={{ fontSize: '1.25rem', fontWeight: 300, color: '#3DC898', letterSpacing: '0.1em', marginTop: '1rem', marginBottom: '0.5rem' }}>New Protocol</h1>

      {/* Steps indicator */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
        {[1, 2, 3, 4].map(s => (
          <div key={s} style={{
            height: 3,
            flex: 1,
            background: s <= step ? '#3DC898' : 'rgba(61,200,152,0.15)',
            borderRadius: 2,
            transition: 'background 0.3s',
          }} />
        ))}
      </div>

      {/* Step 1 — Select treatment */}
      {step === 1 && (
        <div>
          <h2 style={{ fontSize: '0.85rem', letterSpacing: '0.15em', color: 'rgba(240,232,216,0.5)', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Step 1 — Select Treatment</h2>
          {categoryGroups.map(group => (
            <div key={group.label} style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: group.color, textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>{group.label}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem' }}>
                {group.items.map((p: any) => (
                  <div key={p.name} onClick={() => selectProtocol(p)} style={{
                    background: selected?.name === p.name ? `${group.color}15` : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${selected?.name === p.name ? group.color : 'rgba(255,255,255,0.06)'}`,
                    borderRadius: 6,
                    padding: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}>
                    <div style={{ fontSize: '0.85rem', color: '#F0E8D8', fontWeight: 500, marginBottom: '0.35rem' }}>{p.name}</div>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(240,232,216,0.4)', lineHeight: 1.5 }}>{p.description}</div>
                    {p.critical_warning && (
                      <div style={{ marginTop: '0.5rem', fontSize: '0.65rem', color: '#ff4444', background: 'rgba(255,68,68,0.08)', padding: '0.3rem 0.5rem', borderRadius: 2 }}>
                        ⚠ {p.critical_warning}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button onClick={() => selected && setStep(2)} disabled={!selected} style={{
            background: selected ? '#3DC898' : 'rgba(61,200,152,0.2)',
            color: selected ? '#000' : 'rgba(240,232,216,0.3)',
            border: 'none', borderRadius: 4, padding: '0.75rem 2rem',
            fontSize: '0.85rem', fontWeight: 600, cursor: selected ? 'pointer' : 'default',
            letterSpacing: '0.1em', marginTop: '1rem',
          }}>Continue →</button>
        </div>
      )}

      {/* Step 2 — Configuration */}
      {step === 2 && selected && (
        <div>
          <h2 style={{ fontSize: '0.85rem', letterSpacing: '0.15em', color: 'rgba(240,232,216,0.5)', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            Step 2 — Configure: {selected.name}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', maxWidth: 600 }}>
            {[
              { label: 'Dose', key: 'dose', placeholder: selected.default_dose },
              { label: 'Unit', key: 'dose_unit', placeholder: selected.dose_unit },
              { label: 'Frequency', key: 'frequency', placeholder: 'daily' },
              { label: 'Route', key: 'route', placeholder: ('route' in selected ? selected.route : '') || 'subcutaneous' },
            ].map(field => (
              <div key={field.key}>
                <label style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: 'rgba(240,232,216,0.4)', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>{field.label}</label>
                <input
                  value={(form as any)[field.key]}
                  onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                  placeholder={field.placeholder}
                  style={{ width: '100%', background: 'rgba(61,200,152,0.05)', border: '1px solid rgba(61,200,152,0.2)', borderRadius: 4, padding: '0.6rem 0.8rem', color: '#F0E8D8', fontSize: '0.85rem', outline: 'none' }}
                />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button onClick={() => setStep(1)} style={{ background: 'transparent', border: '1px solid rgba(240,232,216,0.1)', borderRadius: 4, padding: '0.6rem 1.25rem', color: 'rgba(240,232,216,0.4)', cursor: 'pointer', fontSize: '0.8rem' }}>← Back</button>
            <button onClick={() => setStep(3)} style={{ background: '#3DC898', color: '#000', border: 'none', borderRadius: 4, padding: '0.6rem 1.5rem', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', letterSpacing: '0.1em' }}>Continue →</button>
          </div>
        </div>
      )}

      {/* Step 3 — Dates & Notes */}
      {step === 3 && (
        <div>
          <h2 style={{ fontSize: '0.85rem', letterSpacing: '0.15em', color: 'rgba(240,232,216,0.5)', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Step 3 — Dates & Notes</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 500 }}>
            {[
              { label: 'Start Date', key: 'start_date', type: 'date' },
              { label: 'End Date (optional)', key: 'end_date', type: 'date' },
            ].map(field => (
              <div key={field.key}>
                <label style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: 'rgba(240,232,216,0.4)', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>{field.label}</label>
                <input type={field.type} value={(form as any)[field.key]} onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                  style={{ width: '100%', background: 'rgba(61,200,152,0.05)', border: '1px solid rgba(61,200,152,0.2)', borderRadius: 4, padding: '0.6rem 0.8rem', color: '#F0E8D8', fontSize: '0.85rem', outline: 'none' }}
                />
              </div>
            ))}
            <div>
              <label style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: 'rgba(240,232,216,0.4)', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>Clinical Reason</label>
              <input value={form.reason} onChange={e => setForm(f => ({ ...f, reason: e.target.value }))}
                placeholder="Why is this protocol indicated?"
                style={{ width: '100%', background: 'rgba(61,200,152,0.05)', border: '1px solid rgba(61,200,152,0.2)', borderRadius: 4, padding: '0.6rem 0.8rem', color: '#F0E8D8', fontSize: '0.85rem', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: 'rgba(240,232,216,0.4)', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>Dr. Notes</label>
              <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} rows={3}
                style={{ width: '100%', background: 'rgba(61,200,152,0.05)', border: '1px solid rgba(61,200,152,0.2)', borderRadius: 4, padding: '0.6rem 0.8rem', color: '#F0E8D8', fontSize: '0.85rem', outline: 'none', resize: 'vertical' }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button onClick={() => setStep(2)} style={{ background: 'transparent', border: '1px solid rgba(240,232,216,0.1)', borderRadius: 4, padding: '0.6rem 1.25rem', color: 'rgba(240,232,216,0.4)', cursor: 'pointer', fontSize: '0.8rem' }}>← Back</button>
            <button onClick={() => setStep(4)} style={{ background: '#3DC898', color: '#000', border: 'none', borderRadius: 4, padding: '0.6rem 1.5rem', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', letterSpacing: '0.1em' }}>Continue →</button>
          </div>
        </div>
      )}

      {/* Step 4 — Confirmation + Contra Check */}
      {step === 4 && selected && (
        <div>
          <h2 style={{ fontSize: '0.85rem', letterSpacing: '0.15em', color: 'rgba(240,232,216,0.5)', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Step 4 — Review & Safety Check</h2>

          {/* Summary */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(61,200,152,0.15)', borderRadius: 6, padding: '1.25rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.82rem' }}>
              {[
                { label: 'Protocol', value: selected.name },
                { label: 'Category', value: selected.category },
                { label: 'Dose', value: `${form.dose} ${form.dose_unit}` },
                { label: 'Frequency', value: form.frequency },
                { label: 'Route', value: form.route },
                { label: 'Start', value: form.start_date },
                { label: 'End', value: form.end_date || 'Indefinite' },
                { label: 'Reason', value: form.reason || '—' },
              ].map(item => (
                <div key={item.label}>
                  <span style={{ color: 'rgba(240,232,216,0.35)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{item.label}</span>
                  <div style={{ color: '#F0E8D8', marginTop: '0.15rem' }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Contra Check */}
          {!contraResult ? (
            <button onClick={runContraCheck} disabled={checking} style={{
              background: checking ? 'rgba(228,184,90,0.2)' : 'rgba(228,184,90,0.12)',
              border: '1px solid rgba(228,184,90,0.3)',
              borderRadius: 4, padding: '0.875rem 2rem',
              color: '#E4B85A', fontSize: '0.85rem', cursor: checking ? 'wait' : 'pointer',
              letterSpacing: '0.1em', width: '100%', marginBottom: '1rem',
            }}>
              {checking ? '⊕ ORION analyzing...' : '⚠ RUN CONTRAINDICATION CHECK'}
            </button>
          ) : contraResult.cleared ? (
            <div style={{ background: 'rgba(61,200,152,0.08)', border: '1px solid rgba(61,200,152,0.3)', borderRadius: 4, padding: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '1.25rem' }}>✓</span>
              <div>
                <div style={{ color: '#3DC898', fontWeight: 600, fontSize: '0.85rem' }}>CLEARED BY ORION</div>
                <div style={{ color: 'rgba(240,232,216,0.5)', fontSize: '0.75rem', marginTop: '0.2rem' }}>{contraResult.analysis}</div>
              </div>
            </div>
          ) : (
            <div style={{ marginBottom: '1rem' }}>
              {contraResult.issues.map((issue, i) => (
                <div key={i} style={{
                  background: `${severityColor[issue.severity]}08`,
                  border: `1px solid ${severityColor[issue.severity]}30`,
                  borderLeft: `3px solid ${severityColor[issue.severity]}`,
                  borderRadius: 4, padding: '0.875rem', marginBottom: '0.75rem',
                }}>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: severityColor[issue.severity], fontWeight: 700, textTransform: 'uppercase', flexShrink: 0 }}>{issue.severity}</span>
                    <div>
                      <div style={{ fontSize: '0.82rem', color: '#F0E8D8' }}>{issue.issue}</div>
                      <div style={{ fontSize: '0.72rem', color: 'rgba(240,232,216,0.4)', marginTop: '0.3rem' }}>{issue.reason}</div>
                      <div style={{ fontSize: '0.72rem', color: severityColor[issue.severity], marginTop: '0.3rem', fontWeight: 500 }}>Action: {issue.action}</div>
                    </div>
                  </div>
                </div>
              ))}
              {contraResult.issues.some(i => i.severity === 'CRITICAL') && (
                <div style={{ marginTop: '1rem' }}>
                  <label style={{ fontSize: '0.7rem', color: '#ff4444', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.5rem' }}>
                    CRITICAL issues found. Override reason required:
                  </label>
                  <textarea value={overrideReason} onChange={e => setOverrideReason(e.target.value)} rows={2}
                    placeholder="Document clinical justification for override..."
                    style={{ width: '100%', background: 'rgba(255,68,68,0.05)', border: '1px solid rgba(255,68,68,0.2)', borderRadius: 4, padding: '0.6rem', color: '#F0E8D8', fontSize: '0.8rem', outline: 'none', resize: 'none' }}
                  />
                </div>
              )}
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={() => setStep(3)} style={{ background: 'transparent', border: '1px solid rgba(240,232,216,0.1)', borderRadius: 4, padding: '0.6rem 1.25rem', color: 'rgba(240,232,216,0.4)', cursor: 'pointer', fontSize: '0.8rem' }}>← Back</button>
            <button
              onClick={prescribe}
              disabled={!contraResult || saving || (contraResult?.issues.some(i => i.severity === 'CRITICAL') && !overrideReason)}
              style={{
                flex: 1,
                background: contraResult ? '#3DC898' : 'rgba(61,200,152,0.2)',
                color: contraResult ? '#000' : 'rgba(240,232,216,0.3)',
                border: 'none', borderRadius: 4, padding: '0.75rem',
                fontSize: '0.85rem', fontWeight: 700, cursor: contraResult ? 'pointer' : 'default',
                letterSpacing: '0.1em',
              }}
            >
              {saving ? 'Saving...' : 'PRESCRIBE PROTOCOL'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

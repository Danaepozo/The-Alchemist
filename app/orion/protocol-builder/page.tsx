'use client'

import { useState } from 'react'

const GOALS = [
  'Longevity & Biological Age Reversal',
  'Hormone Optimization (Testosterone / Estrogen / Thyroid)',
  'Metabolic Health & Insulin Resistance',
  'Cardiovascular Risk Reduction',
  'Cognitive Enhancement & Alzheimer\'s Prevention',
  'Energy, Fatigue & Mitochondrial Function',
  'Weight Loss & Body Composition',
  'Gut Health & Microbiome Restoration',
  'Cancer Prevention & Metabolic Oncology',
  'Autoimmune / Chronic Inflammation',
  'Sexual Health & Libido',
  'Sleep Optimization',
  'Athletic Performance & Recovery',
  'Stress Resilience & HPA Optimization',
  'Skin, Hair & Aesthetic Longevity',
  'Neurological Recovery / Post-COVID',
  'Detoxification & Environmental Toxins',
  'Bone Density & Osteoporosis Prevention',
]

interface ProtocolResult {
  protocol_name: string
  clinical_summary: string
  biological_age_target: string
  estimated_timeline: string
  foundation_supplements: Array<{ name: string; dose: string; timing: string; rationale: string; evidence_level: string; priority: number }>
  peptide_protocols: Array<{ name: string; dose: string; route: string; frequency: string; cycle: string; indication: string; monitoring: string }>
  lifestyle_prescriptions: Array<{ category: string; prescription: string; dose: string; rationale: string }>
  nutrition_protocol: { framework: string; eating_window: string; eliminate: string[]; emphasize: string[]; specific_targets: string; meal_timing: string }
  advanced_therapies: Array<{ therapy: string; protocol: string; frequency: string; rationale: string; available_at_clinic: boolean }>
  lab_monitoring: Array<{ test: string; baseline: string; retest: string; target: string; reason: string }>
  phase_plan: Array<{ phase: number; name: string; duration: string; focus: string; actions: string[] }>
  expected_outcomes: Array<{ goal: string; expected_improvement: string; timeline: string; biomarker_changes: string }>
  safety_flags: Array<{ flag: string; action: string }>
  patient_handout: string
}

const inp: React.CSSProperties = {
  width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(240,232,216,0.12)',
  borderRadius: 5, padding: '0.6rem 0.75rem', color: '#F0E8D8', fontSize: '0.8rem', outline: 'none', boxSizing: 'border-box',
}
const lbl: React.CSSProperties = {
  fontSize: '0.6rem', letterSpacing: '0.15em', color: 'rgba(240,232,216,0.3)', display: 'block', marginBottom: '0.35rem',
}

export default function ProtocolBuilderPage() {
  const [profile, setProfile] = useState({ age: '', gender: '', conditions: '', medications: '', labs: '', lifestyle: '' })
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [preferences, setPreferences] = useState({ budget: 'moderate', approach: 'moderate', notes: '' })
  const [building, setBuilding] = useState(false)
  const [result, setResult] = useState<ProtocolResult | null>(null)
  const [error, setError] = useState('')
  const [activeSection, setActiveSection] = useState('supplements')

  function toggleGoal(g: string) {
    setSelectedGoals(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g])
  }

  function up(field: string, val: string) {
    setProfile(prev => ({ ...prev, [field]: val }))
  }

  async function buildProtocol() {
    if (!profile.age || !profile.gender || selectedGoals.length === 0) {
      setError('Please fill in age, gender, and select at least one goal.')
      return
    }
    setBuilding(true)
    setError('')
    setResult(null)
    try {
      const res = await fetch('/api/orion/protocol-builder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile, goals: selectedGoals, preferences }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed')
      setResult(data.protocol)
      setActiveSection('supplements')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Generation failed')
    } finally {
      setBuilding(false)
    }
  }

  const sectionBtn = (id: string, label: string, count?: number) => (
    <button
      onClick={() => setActiveSection(id)}
      style={{
        background: activeSection === id ? 'rgba(61,200,152,0.12)' : 'transparent',
        border: `1px solid ${activeSection === id ? 'rgba(61,200,152,0.35)' : 'rgba(240,232,216,0.08)'}`,
        borderRadius: 5, padding: '0.4rem 0.85rem',
        color: activeSection === id ? '#3DC898' : 'rgba(240,232,216,0.45)',
        fontSize: '0.7rem', cursor: 'pointer', letterSpacing: '0.06em', whiteSpace: 'nowrap',
      }}
    >
      {label}{count !== undefined ? ` (${count})` : ''}
    </button>
  )

  return (
    <div style={{ padding: '2rem', maxWidth: 1100, fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(240,232,216,0.25)', marginBottom: '0.4rem' }}>ORION · AI PROTOCOL BUILDER</div>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 300, color: '#F0E8D8', letterSpacing: '0.1em', margin: 0 }}>Build a Complete Clinical Protocol</h1>
        <p style={{ fontSize: '0.75rem', color: 'rgba(240,232,216,0.3)', marginTop: '0.4rem' }}>
          ORION generates a fully individualized, dosed, phased protocol using the latest functional medicine and longevity science
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: result ? '380px 1fr' : '1fr', gap: '1.5rem' }}>

        {/* INPUT PANEL */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          {/* Patient profile */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(240,232,216,0.07)', borderRadius: 8, padding: '1.25rem' }}>
            <div style={{ fontSize: '0.62rem', letterSpacing: '0.2em', color: '#3DC898', marginBottom: '1rem' }}>PATIENT PROFILE</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={lbl}>Age *</label>
                <input value={profile.age} onChange={e => up('age', e.target.value)} placeholder="e.g. 48" style={inp} />
              </div>
              <div>
                <label style={lbl}>Gender *</label>
                <select value={profile.gender} onChange={e => up('gender', e.target.value)} style={inp}>
                  <option value="">Select...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
            <div style={{ marginTop: '0.75rem' }}>
              <label style={lbl}>Current Conditions / Diagnoses</label>
              <input value={profile.conditions} onChange={e => up('conditions', e.target.value)} placeholder="e.g. hypothyroidism, insulin resistance, fatigue" style={inp} />
            </div>
            <div style={{ marginTop: '0.75rem' }}>
              <label style={lbl}>Current Medications & Supplements</label>
              <input value={profile.medications} onChange={e => up('medications', e.target.value)} placeholder="e.g. Levothyroxine 50mcg, Vitamin D 2000IU" style={inp} />
            </div>
            <div style={{ marginTop: '0.75rem' }}>
              <label style={lbl}>Key Lab Results (if available)</label>
              <textarea value={profile.labs} onChange={e => up('labs', e.target.value)} rows={2} placeholder="e.g. Testosterone 380, Vitamin D 24, HbA1c 5.8, hs-CRP 2.1" style={{ ...inp, resize: 'vertical', lineHeight: 1.6 }} />
            </div>
            <div style={{ marginTop: '0.75rem' }}>
              <label style={lbl}>Lifestyle Context</label>
              <input value={profile.lifestyle} onChange={e => up('lifestyle', e.target.value)} placeholder="e.g. sedentary, poor sleep, stressful job, Miami resident" style={inp} />
            </div>
          </div>

          {/* Goals */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(240,232,216,0.07)', borderRadius: 8, padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.875rem' }}>
              <div style={{ fontSize: '0.62rem', letterSpacing: '0.2em', color: '#C9963C' }}>TREATMENT GOALS *</div>
              <span style={{ fontSize: '0.65rem', color: selectedGoals.length > 0 ? '#C9963C' : 'rgba(240,232,216,0.2)' }}>{selectedGoals.length} selected</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {GOALS.map(g => (
                <button
                  key={g}
                  onClick={() => toggleGoal(g)}
                  style={{
                    background: selectedGoals.includes(g) ? 'rgba(201,150,60,0.12)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${selectedGoals.includes(g) ? 'rgba(201,150,60,0.4)' : 'rgba(240,232,216,0.1)'}`,
                    borderRadius: 4, padding: '0.3rem 0.6rem',
                    color: selectedGoals.includes(g) ? '#C9963C' : 'rgba(240,232,216,0.45)',
                    fontSize: '0.68rem', cursor: 'pointer', letterSpacing: '0.03em', textAlign: 'left',
                  }}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Preferences */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(240,232,216,0.07)', borderRadius: 8, padding: '1.25rem' }}>
            <div style={{ fontSize: '0.62rem', letterSpacing: '0.2em', color: '#9A7CE8', marginBottom: '1rem' }}>PROTOCOL PREFERENCES</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={lbl}>Approach</label>
                <select value={preferences.approach} onChange={e => setPreferences(p => ({ ...p, approach: e.target.value }))} style={inp}>
                  <option value="conservative">Conservative — lifestyle first</option>
                  <option value="moderate">Moderate — supplements + lifestyle</option>
                  <option value="aggressive">Advanced — full clinic protocol</option>
                </select>
              </div>
              <div>
                <label style={lbl}>Budget Level</label>
                <select value={preferences.budget} onChange={e => setPreferences(p => ({ ...p, budget: e.target.value }))} style={inp}>
                  <option value="conservative">Basic ($100–300/mo)</option>
                  <option value="moderate">Standard ($300–800/mo)</option>
                  <option value="premium">Premium ($800+/mo)</option>
                </select>
              </div>
            </div>
            <div style={{ marginTop: '0.75rem' }}>
              <label style={lbl}>Additional Notes for ORION</label>
              <textarea value={preferences.notes} onChange={e => setPreferences(p => ({ ...p, notes: e.target.value }))} rows={2} placeholder="e.g. Patient is very sensitive to stimulants. Prefers oral over injections. Vegetarian." style={{ ...inp, resize: 'vertical', lineHeight: 1.6 }} />
            </div>
          </div>

          {error && <div style={{ padding: '0.75rem', background: 'rgba(224,96,144,0.08)', border: '1px solid rgba(224,96,144,0.25)', borderRadius: 5, fontSize: '0.75rem', color: '#E06090' }}>{error}</div>}

          <button
            onClick={buildProtocol}
            disabled={building}
            style={{
              background: building ? 'rgba(61,200,152,0.3)' : 'linear-gradient(135deg, #3DC898, #2da878)',
              border: 'none', borderRadius: 8, padding: '1rem 1.5rem',
              color: '#000', fontSize: '0.82rem', fontWeight: 700,
              cursor: building ? 'not-allowed' : 'pointer',
              letterSpacing: '0.1em', width: '100%',
              boxShadow: building ? 'none' : '0 4px 20px rgba(61,200,152,0.25)',
            }}
          >
            {building ? '⊕ ORION BUILDING PROTOCOL...' : '⚕ GENERATE COMPLETE PROTOCOL'}
          </button>

          {building && (
            <div style={{ padding: '0.875rem', background: 'rgba(61,200,152,0.04)', border: '1px solid rgba(61,200,152,0.12)', borderRadius: 6, fontSize: '0.7rem', color: 'rgba(240,232,216,0.5)', lineHeight: 1.8 }}>
              ORION is analyzing patient profile, applying functional medicine frameworks, cross-referencing longevity science, checking interactions, and generating your complete personalized protocol...
              <div style={{ marginTop: '0.5rem', color: '#3DC898', fontSize: '0.65rem', letterSpacing: '0.1em' }}>This takes 15–30 seconds</div>
            </div>
          )}
        </div>

        {/* RESULT PANEL */}
        {result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {/* Protocol header */}
            <div style={{ background: 'linear-gradient(135deg, rgba(61,200,152,0.08), rgba(154,124,232,0.05))', border: '1px solid rgba(61,200,152,0.2)', borderRadius: 8, padding: '1.25rem' }}>
              <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: '#3DC898', marginBottom: '0.4rem' }}>ORION PROTOCOL</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#F0E8D8', marginBottom: '0.75rem' }}>{result.protocol_name}</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(240,232,216,0.7)', lineHeight: 1.7, marginBottom: '0.75rem' }}>{result.clinical_summary}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div style={{ padding: '0.6rem', background: 'rgba(154,124,232,0.08)', border: '1px solid rgba(154,124,232,0.15)', borderRadius: 5 }}>
                  <div style={{ fontSize: '0.58rem', color: '#9A7CE8', letterSpacing: '0.12em', marginBottom: '0.2rem' }}>BIOLOGICAL AGE TARGET</div>
                  <div style={{ fontSize: '0.72rem', color: 'rgba(240,232,216,0.75)' }}>{result.biological_age_target}</div>
                </div>
                <div style={{ padding: '0.6rem', background: 'rgba(201,150,60,0.08)', border: '1px solid rgba(201,150,60,0.15)', borderRadius: 5 }}>
                  <div style={{ fontSize: '0.58rem', color: '#C9963C', letterSpacing: '0.12em', marginBottom: '0.2rem' }}>TIMELINE</div>
                  <div style={{ fontSize: '0.72rem', color: 'rgba(240,232,216,0.75)' }}>{result.estimated_timeline}</div>
                </div>
              </div>
            </div>

            {/* Section tabs */}
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {sectionBtn('supplements', '💊 Supplements', result.foundation_supplements?.length)}
              {sectionBtn('peptides', '⊕ Peptides', result.peptide_protocols?.length)}
              {sectionBtn('lifestyle', '◎ Lifestyle', result.lifestyle_prescriptions?.length)}
              {sectionBtn('nutrition', '◈ Nutrition')}
              {sectionBtn('advanced', '⚡ Advanced Therapies', result.advanced_therapies?.length)}
              {sectionBtn('phases', '⊛ Phase Plan')}
              {sectionBtn('labs', '◇ Lab Monitoring', result.lab_monitoring?.length)}
              {sectionBtn('outcomes', '◉ Outcomes')}
              {sectionBtn('patient', '✉ Patient Summary')}
            </div>

            {/* SUPPLEMENTS */}
            {activeSection === 'supplements' && (
              <div>
                <div style={{ fontSize: '0.6rem', letterSpacing: '0.18em', color: '#C9963C', marginBottom: '0.75rem' }}>FOUNDATION SUPPLEMENT PROTOCOL</div>
                {result.foundation_supplements?.sort((a, b) => a.priority - b.priority).map((s, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,150,60,0.12)', borderRadius: 6, padding: '0.875rem', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                      <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#C9963C' }}>{s.priority}. {s.name}</span>
                      <span style={{ fontSize: '0.6rem', color: s.evidence_level?.includes('Strong') ? '#3DC898' : s.evidence_level?.includes('Good') ? '#E4B85A' : 'rgba(240,232,216,0.3)', background: 'rgba(255,255,255,0.05)', padding: '0.1rem 0.4rem', borderRadius: 3 }}>{s.evidence_level}</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#F0E8D8', marginBottom: '0.2rem' }}>{s.dose}</div>
                    <div style={{ fontSize: '0.68rem', color: '#9A7CE8', marginBottom: '0.2rem' }}>⏱ {s.timing}</div>
                    <div style={{ fontSize: '0.68rem', color: 'rgba(240,232,216,0.45)', lineHeight: 1.5 }}>{s.rationale}</div>
                  </div>
                ))}
              </div>
            )}

            {/* PEPTIDES */}
            {activeSection === 'peptides' && (
              <div>
                <div style={{ fontSize: '0.6rem', letterSpacing: '0.18em', color: '#3DC898', marginBottom: '0.75rem' }}>PEPTIDE PROTOCOLS</div>
                {result.peptide_protocols?.length === 0 ? (
                  <div style={{ color: 'rgba(240,232,216,0.3)', fontSize: '0.75rem' }}>No peptides indicated for current goals/budget/approach.</div>
                ) : result.peptide_protocols?.map((p, i) => (
                  <div key={i} style={{ background: 'rgba(61,200,152,0.04)', border: '1px solid rgba(61,200,152,0.15)', borderRadius: 6, padding: '0.875rem', marginBottom: '0.5rem' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#3DC898', marginBottom: '0.35rem' }}>{p.name}</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', marginBottom: '0.4rem' }}>
                      <div style={{ fontSize: '0.68rem', color: '#F0E8D8' }}>{p.dose}</div>
                      <div style={{ fontSize: '0.68rem', color: 'rgba(240,232,216,0.5)' }}>{p.route} · {p.frequency}</div>
                    </div>
                    {p.cycle && <div style={{ fontSize: '0.65rem', color: '#C9963C', marginBottom: '0.3rem' }}>Cycle: {p.cycle}</div>}
                    <div style={{ fontSize: '0.68rem', color: 'rgba(240,232,216,0.5)', marginBottom: '0.2rem' }}>{p.indication}</div>
                    {p.monitoring && <div style={{ fontSize: '0.65rem', color: '#9A7CE8' }}>Monitor: {p.monitoring}</div>}
                  </div>
                ))}
              </div>
            )}

            {/* LIFESTYLE */}
            {activeSection === 'lifestyle' && (
              <div>
                <div style={{ fontSize: '0.6rem', letterSpacing: '0.18em', color: '#E4B85A', marginBottom: '0.75rem' }}>LIFESTYLE PRESCRIPTIONS</div>
                {result.lifestyle_prescriptions?.map((l, i) => (
                  <div key={i} style={{ padding: '0.875rem', border: '1px solid rgba(228,184,90,0.12)', borderRadius: 6, marginBottom: '0.5rem', background: 'rgba(228,184,90,0.03)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                      <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#E4B85A', letterSpacing: '0.1em' }}>{l.category.toUpperCase()}</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#F0E8D8', marginBottom: '0.25rem', fontWeight: 500 }}>{l.prescription}</div>
                    <div style={{ fontSize: '0.68rem', color: '#C9963C', marginBottom: '0.2rem' }}>{l.dose}</div>
                    <div style={{ fontSize: '0.65rem', color: 'rgba(240,232,216,0.45)', lineHeight: 1.5 }}>{l.rationale}</div>
                  </div>
                ))}
              </div>
            )}

            {/* NUTRITION */}
            {activeSection === 'nutrition' && result.nutrition_protocol && (
              <div>
                <div style={{ fontSize: '0.6rem', letterSpacing: '0.18em', color: '#3DC898', marginBottom: '0.75rem' }}>NUTRITION PROTOCOL</div>
                <div style={{ background: 'rgba(61,200,152,0.05)', border: '1px solid rgba(61,200,152,0.15)', borderRadius: 8, padding: '1rem', marginBottom: '0.75rem' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#3DC898', marginBottom: '0.3rem' }}>{result.nutrition_protocol.framework}</div>
                  {result.nutrition_protocol.eating_window && <div style={{ fontSize: '0.7rem', color: '#C9963C' }}>Eating window: {result.nutrition_protocol.eating_window}</div>}
                  {result.nutrition_protocol.specific_targets && <div style={{ fontSize: '0.7rem', color: 'rgba(240,232,216,0.6)', marginTop: '0.3rem' }}>{result.nutrition_protocol.specific_targets}</div>}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <div style={{ fontSize: '0.6rem', color: '#E06090', letterSpacing: '0.12em', marginBottom: '0.4rem' }}>ELIMINATE</div>
                    {result.nutrition_protocol.eliminate?.map((e, i) => (
                      <div key={i} style={{ fontSize: '0.7rem', color: 'rgba(240,232,216,0.55)', lineHeight: 1.7 }}>✕ {e}</div>
                    ))}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.6rem', color: '#3DC898', letterSpacing: '0.12em', marginBottom: '0.4rem' }}>EMPHASIZE</div>
                    {result.nutrition_protocol.emphasize?.map((e, i) => (
                      <div key={i} style={{ fontSize: '0.7rem', color: 'rgba(240,232,216,0.55)', lineHeight: 1.7 }}>✓ {e}</div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ADVANCED THERAPIES */}
            {activeSection === 'advanced' && (
              <div>
                <div style={{ fontSize: '0.6rem', letterSpacing: '0.18em', color: '#E06090', marginBottom: '0.75rem' }}>ADVANCED THERAPIES</div>
                {result.advanced_therapies?.map((t, i) => (
                  <div key={i} style={{ background: 'rgba(224,96,144,0.04)', border: '1px solid rgba(224,96,144,0.15)', borderRadius: 6, padding: '0.875rem', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#E06090' }}>{t.therapy}</span>
                      {t.available_at_clinic && <span style={{ fontSize: '0.6rem', color: '#3DC898', background: 'rgba(61,200,152,0.1)', padding: '0.1rem 0.4rem', borderRadius: 3 }}>CLINIC</span>}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#F0E8D8', marginBottom: '0.2rem' }}>{t.protocol}</div>
                    <div style={{ fontSize: '0.68rem', color: '#C9963C', marginBottom: '0.2rem' }}>{t.frequency}</div>
                    <div style={{ fontSize: '0.65rem', color: 'rgba(240,232,216,0.45)', lineHeight: 1.5 }}>{t.rationale}</div>
                  </div>
                ))}
              </div>
            )}

            {/* PHASE PLAN */}
            {activeSection === 'phases' && (
              <div>
                <div style={{ fontSize: '0.6rem', letterSpacing: '0.18em', color: '#9A7CE8', marginBottom: '0.75rem' }}>PHASED IMPLEMENTATION PLAN</div>
                {result.phase_plan?.map((p, i) => (
                  <div key={i} style={{ marginBottom: '0.75rem', borderLeft: `3px solid ${i===0?'#3DC898':i===1?'#C9963C':'#9A7CE8'}`, paddingLeft: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: i===0?'#3DC898':i===1?'#C9963C':'#9A7CE8' }}>Phase {p.phase}: {p.name}</span>
                      <span style={{ fontSize: '0.65rem', color: 'rgba(240,232,216,0.35)' }}>{p.duration}</span>
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(240,232,216,0.6)', marginBottom: '0.4rem' }}>{p.focus}</div>
                    {p.actions?.map((a, j) => <div key={j} style={{ fontSize: '0.68rem', color: 'rgba(240,232,216,0.45)', lineHeight: 1.7 }}>→ {a}</div>)}
                  </div>
                ))}
              </div>
            )}

            {/* LABS */}
            {activeSection === 'labs' && (
              <div>
                <div style={{ fontSize: '0.6rem', letterSpacing: '0.18em', color: '#E4B85A', marginBottom: '0.75rem' }}>LAB MONITORING SCHEDULE</div>
                {result.lab_monitoring?.map((l, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 70px 80px 100px', gap: '0.5rem', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)', alignItems: 'start' }}>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: '#F0E8D8', marginBottom: '0.1rem' }}>{l.test}</div>
                      <div style={{ fontSize: '0.62rem', color: 'rgba(240,232,216,0.35)', lineHeight: 1.4 }}>{l.reason}</div>
                    </div>
                    <div style={{ fontSize: '0.62rem', color: '#3DC898' }}>{l.baseline}</div>
                    <div style={{ fontSize: '0.62rem', color: '#C9963C' }}>{l.retest}</div>
                    <div style={{ fontSize: '0.62rem', color: '#9A7CE8' }}>{l.target}</div>
                  </div>
                ))}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 70px 80px 100px', gap: '0.5rem', marginTop: '0.25rem' }}>
                  {['TEST', 'BASELINE', 'RETEST', 'TARGET'].map(h => <div key={h} style={{ fontSize: '0.55rem', color: 'rgba(240,232,216,0.2)', letterSpacing: '0.12em' }}>{h}</div>)}
                </div>
              </div>
            )}

            {/* OUTCOMES */}
            {activeSection === 'outcomes' && (
              <div>
                <div style={{ fontSize: '0.6rem', letterSpacing: '0.18em', color: '#3DC898', marginBottom: '0.75rem' }}>EXPECTED OUTCOMES BY GOAL</div>
                {result.expected_outcomes?.map((o, i) => (
                  <div key={i} style={{ background: 'rgba(61,200,152,0.04)', border: '1px solid rgba(61,200,152,0.1)', borderRadius: 6, padding: '0.875rem', marginBottom: '0.5rem' }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#C9963C', marginBottom: '0.3rem' }}>{o.goal}</div>
                    <div style={{ fontSize: '0.72rem', color: '#F0E8D8', marginBottom: '0.2rem' }}>{o.expected_improvement}</div>
                    <div style={{ fontSize: '0.65rem', color: '#9A7CE8', marginBottom: '0.2rem' }}>⏱ {o.timeline}</div>
                    <div style={{ fontSize: '0.65rem', color: 'rgba(240,232,216,0.4)' }}>{o.biomarker_changes}</div>
                  </div>
                ))}
                {result.safety_flags?.length > 0 && (
                  <div style={{ marginTop: '1rem' }}>
                    <div style={{ fontSize: '0.6rem', letterSpacing: '0.18em', color: '#E06090', marginBottom: '0.5rem' }}>SAFETY FLAGS</div>
                    {result.safety_flags.map((f, i) => (
                      <div key={i} style={{ padding: '0.5rem 0.75rem', background: 'rgba(224,96,144,0.06)', border: '1px solid rgba(224,96,144,0.15)', borderRadius: 4, marginBottom: '0.4rem' }}>
                        <div style={{ fontSize: '0.7rem', color: '#E06090', fontWeight: 600 }}>{f.flag}</div>
                        <div style={{ fontSize: '0.65rem', color: 'rgba(240,232,216,0.5)', marginTop: '0.15rem' }}>{f.action}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* PATIENT SUMMARY */}
            {activeSection === 'patient' && (
              <div>
                <div style={{ fontSize: '0.6rem', letterSpacing: '0.18em', color: '#9A7CE8', marginBottom: '0.75rem' }}>PATIENT HANDOUT — READ OR SEND TO PATIENT</div>
                <div style={{ background: 'rgba(154,124,232,0.05)', border: '1px solid rgba(154,124,232,0.15)', borderRadius: 8, padding: '1.25rem', fontSize: '0.78rem', color: 'rgba(240,232,216,0.75)', lineHeight: 1.8 }}>
                  {result.patient_handout}
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  )
}

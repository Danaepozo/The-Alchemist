'use client'

import { useState } from 'react'
import Link from 'next/link'

const STEPS = [
  {
    title: 'Cuerpo Físico',
    subtitle: 'Physical Body',
    icon: '🌿',
    color: '#3DC898',
    questions: [
      { id: 'physical_energy', label: '¿Cómo describirías tu energía física en este momento?', placeholder: 'Describe your current physical energy...' },
      { id: 'physical_pain', label: '¿Tienes algún dolor, tensión o malestar físico recurrente?', placeholder: 'Any recurring pain, tension or discomfort...' },
    ],
  },
  {
    title: 'Mente',
    subtitle: 'Mind',
    icon: '🧠',
    color: '#C9963C',
    questions: [
      { id: 'mind_thoughts', label: '¿Qué pensamientos ocupan más espacio en tu mente actualmente?', placeholder: 'What thoughts take up most space in your mind...' },
      { id: 'mind_sleep', label: '¿Tu mente descansa cuando duermes?', placeholder: 'Does your mind rest when you sleep...' },
    ],
  },
  {
    title: 'Emociones',
    subtitle: 'Emotions',
    icon: '💫',
    color: '#E06090',
    questions: [
      { id: 'emotions_frequent', label: '¿Qué emociones sientes con más frecuencia esta semana?', placeholder: 'What emotions have you felt most this week...' },
      { id: 'emotions_carrying', label: '¿Hay algo que llevas cargando emocionalmente hace tiempo?', placeholder: 'Is there something you have been carrying emotionally...' },
    ],
  },
  {
    title: 'Energía Vital',
    subtitle: 'Vital Energy',
    icon: '⚡',
    color: '#E4B85A',
    questions: [
      { id: 'energy_peak', label: '¿En qué momentos del día sientes más energía?', placeholder: 'When do you feel most energized during the day...' },
      { id: 'energy_drain', label: '¿Qué te drena más?', placeholder: 'What drains your energy the most...' },
    ],
  },
  {
    title: 'Espíritu',
    subtitle: 'Spirit',
    icon: '☿',
    color: '#C9963C',
    questions: [
      { id: 'spirit_purpose', label: '¿Sientes que estás viviendo alineado con tu propósito?', placeholder: 'Do you feel aligned with your purpose...' },
      { id: 'spirit_calling', label: '¿Hay algo que tu alma está pidiendo que aún no has atendido?', placeholder: 'Is there something your soul is calling for...' },
    ],
  },
  {
    title: 'Sueño',
    subtitle: 'Sleep',
    icon: '🌙',
    color: '#3DC898',
    questions: [
      { id: 'sleep_hours', label: '¿Cuántas horas duermes en promedio?', placeholder: 'Average hours of sleep per night...' },
      { id: 'sleep_quality', label: '¿Te despiertas descansado?', placeholder: 'Do you wake up rested and refreshed...' },
    ],
  },
  {
    title: 'Propósito',
    subtitle: 'Purpose',
    icon: '🌟',
    color: '#E4B85A',
    questions: [
      { id: 'purpose_future', label: '¿Qué versión de ti mismo quieres ser en 6 meses?', placeholder: 'Who do you want to be 6 months from now...' },
      { id: 'purpose_today', label: '¿Qué te trajo a The Alchemist hoy?', placeholder: 'What brought you to The Alchemist today...' },
    ],
  },
]

export default function AssessmentPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [soulReading, setSoulReading] = useState('')
  const [error, setError] = useState('')

  const currentStep = STEPS[step]
  const isLastStep = step === STEPS.length - 1
  const isComplete = soulReading !== ''

  const canProceed = currentStep?.questions.every(q => answers[q.id]?.trim())

  const handleNext = async () => {
    if (!canProceed) return
    if (isLastStep) {
      await submitAssessment()
    } else {
      setStep(s => s + 1)
    }
  }

  const submitAssessment = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/soul-reading', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers, name, email }),
      })
      const data = await res.json()
      if (data.soulReading) {
        setSoulReading(data.soulReading)
      } else {
        setError('Could not generate your reading. Please try again.')
      }
    } catch {
      setError('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (isComplete) {
    return (
      <div style={{ background: '#000', minHeight: '100vh', color: '#F0E8D8', padding: '2rem' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', paddingTop: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ fontSize: '3rem', color: '#C9963C', marginBottom: '1rem' }}>☿</div>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 300, color: '#C9963C', marginBottom: '0.5rem' }}>
              Your Soul Reading
            </h1>
            {name && <p style={{ color: 'rgba(240,232,216,0.6)', fontSize: '1rem' }}>Para {name}</p>}
          </div>
          <div style={{ background: 'rgba(201,150,60,0.06)', border: '1px solid rgba(201,150,60,0.3)', borderRadius: '8px', padding: '2.5rem', lineHeight: 1.9, fontSize: '0.95rem', whiteSpace: 'pre-wrap', color: 'rgba(240,232,216,0.9)', marginBottom: '2.5rem' }}>
            {soulReading}
          </div>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/booking" style={{ background: 'linear-gradient(135deg, #C9963C, #E4B85A)', color: '#000', padding: '1rem 2.5rem', borderRadius: '2px', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Book First Alchemy — $199
            </Link>
            <Link href="/" style={{ background: 'transparent', color: '#C9963C', padding: '1rem 2rem', border: '1px solid #C9963C', borderRadius: '2px', textDecoration: 'none', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Return Home
            </Link>
          </div>
          {email && <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'rgba(240,232,216,0.4)', fontSize: '0.8rem' }}>✦ Your reading has been sent to {email}</p>}
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: '#000', minHeight: '100vh', color: '#F0E8D8' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(201,150,60,0.2)', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', color: '#C9963C', textDecoration: 'none' }}>☿ THE ALCHEMIST</Link>
        <div style={{ fontSize: '0.8rem', color: 'rgba(240,232,216,0.5)' }}>Soul Assessment · Step {step + 1} of {STEPS.length}</div>
      </div>

      {/* Progress bar */}
      <div style={{ height: '3px', background: 'rgba(201,150,60,0.15)' }}>
        <div style={{ height: '100%', width: `${((step + 1) / STEPS.length) * 100}%`, background: 'linear-gradient(90deg, #C9963C, #E4B85A)', transition: 'width 0.4s ease' }} />
      </div>

      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '4rem 2rem' }}>
        {/* Step header */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{currentStep.icon}</div>
          <div style={{ fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: currentStep.color, marginBottom: '0.25rem' }}>
            Dimension {step + 1}
          </div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: 300, color: currentStep.color }}>
            {currentStep.title}
          </h2>
          <p style={{ color: 'rgba(240,232,216,0.4)', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{currentStep.subtitle}</p>
        </div>

        {/* Questions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3rem' }}>
          {currentStep.questions.map(q => (
            <div key={q.id}>
              <label style={{ display: 'block', fontSize: '1rem', lineHeight: 1.6, marginBottom: '0.75rem', color: '#F0E8D8' }}>
                {q.label}
              </label>
              <textarea
                value={answers[q.id] || ''}
                onChange={e => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                placeholder={q.placeholder}
                rows={3}
                style={{
                  width: '100%', background: 'rgba(255,255,255,0.04)', border: `1px solid ${answers[q.id]?.trim() ? 'rgba(201,150,60,0.4)' : 'rgba(201,150,60,0.15)'}`,
                  borderRadius: '4px', padding: '0.875rem 1rem', color: '#F0E8D8',
                  fontSize: '0.9rem', lineHeight: 1.7, outline: 'none', resize: 'vertical',
                  fontFamily: 'Jost, sans-serif', transition: 'border-color 0.2s',
                }}
                onFocus={e => (e.target.style.borderColor = 'rgba(201,150,60,0.6)')}
                onBlur={e => (e.target.style.borderColor = answers[q.id]?.trim() ? 'rgba(201,150,60,0.4)' : 'rgba(201,150,60,0.15)')}
              />
            </div>
          ))}
        </div>

        {/* Name/email on last step */}
        {isLastStep && (
          <div style={{ marginBottom: '2rem', padding: '1.5rem', background: 'rgba(201,150,60,0.05)', border: '1px solid rgba(201,150,60,0.2)', borderRadius: '4px' }}>
            <p style={{ fontSize: '0.85rem', color: 'rgba(240,232,216,0.6)', marginBottom: '1.25rem' }}>Optional: receive your Soul Reading by email</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" style={{ flex: 1, minWidth: '150px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,150,60,0.2)', borderRadius: '4px', padding: '0.65rem 0.875rem', color: '#F0E8D8', fontSize: '0.88rem', outline: 'none', fontFamily: 'Jost, sans-serif' }} />
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" type="email" style={{ flex: 2, minWidth: '200px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,150,60,0.2)', borderRadius: '4px', padding: '0.65rem 0.875rem', color: '#F0E8D8', fontSize: '0.88rem', outline: 'none', fontFamily: 'Jost, sans-serif' }} />
            </div>
          </div>
        )}

        {error && <p style={{ color: '#E06090', fontSize: '0.85rem', marginBottom: '1rem' }}>{error}</p>}

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={() => setStep(s => s - 1)} style={{ background: 'none', border: '1px solid rgba(201,150,60,0.3)', color: 'rgba(240,232,216,0.6)', padding: '0.75rem 1.5rem', borderRadius: '2px', cursor: 'pointer', fontSize: '0.85rem', opacity: step === 0 ? 0 : 1, pointerEvents: step === 0 ? 'none' : 'auto' }}>
            ← Back
          </button>
          <button
            onClick={handleNext}
            disabled={!canProceed || loading}
            style={{
              background: canProceed ? 'linear-gradient(135deg, #C9963C, #E4B85A)' : 'rgba(201,150,60,0.2)',
              color: canProceed ? '#000' : 'rgba(240,232,216,0.3)',
              border: 'none', padding: '0.875rem 2.5rem', borderRadius: '2px',
              cursor: canProceed ? 'pointer' : 'default', fontSize: '0.85rem',
              fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
              transition: 'background 0.2s',
            }}
          >
            {loading ? 'Generating your reading...' : isLastStep ? 'Reveal My Soul Reading ☿' : 'Next →'}
          </button>
        </div>

        {/* Step dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2.5rem' }}>
          {STEPS.map((s, i) => (
            <div key={i} style={{ width: i === step ? '20px' : '6px', height: '6px', borderRadius: '3px', background: i <= step ? '#C9963C' : 'rgba(201,150,60,0.2)', transition: 'all 0.3s' }} />
          ))}
        </div>
      </div>
    </div>
  )
}

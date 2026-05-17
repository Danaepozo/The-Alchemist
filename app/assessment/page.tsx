'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/components/LanguageProvider'

export default function AssessmentPage() {
  const { t, lang, toggle } = useLanguage()
  const T = t.assessment
  const STEPS = T.steps

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
  const progress = ((step + 1) / STEPS.length) * 100

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
        body: JSON.stringify({ answers, name, email, lang }),
      })
      const data = await res.json()
      if (data.soulReading) {
        setSoulReading(data.soulReading)
      } else {
        setError(T.error)
      }
    } catch {
      setError(T.connectionError)
    } finally {
      setLoading(false)
    }
  }

  // ── Result page ──────────────────────────────────────────────────────────
  if (isComplete) {
    return (
      <div style={{ background: '#000', minHeight: '100vh', color: '#F0E8D8' }}>
        {/* Header */}
        <div style={{ borderBottom: '1px solid rgba(201,150,60,0.15)', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', color: '#C9963C', textDecoration: 'none', letterSpacing: '0.15em' }}>
            ☿ {t.common.brand}
          </Link>
          <button onClick={toggle} style={langToggleStyle}>{lang === 'en' ? 'ES' : 'EN'}</button>
        </div>

        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '4rem 2rem 6rem' }}>
          {/* Title */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ fontSize: '2.5rem', color: '#C9963C', marginBottom: '1rem', letterSpacing: '0.05em' }}>☿</div>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 300, color: '#C9963C', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
              {T.result.title}
            </h1>
            {name && (
              <p style={{ color: 'rgba(240,232,216,0.5)', fontSize: '1rem', letterSpacing: '0.1em' }}>
                {T.result.subtitle} {name}
              </p>
            )}
            <div style={{ width: '40px', height: '1px', background: 'rgba(201,150,60,0.4)', margin: '1.5rem auto 0' }} />
          </div>

          {/* Soul Reading */}
          <div style={{
            background: 'rgba(201,150,60,0.04)',
            border: '1px solid rgba(201,150,60,0.2)',
            borderRadius: '4px',
            padding: '2.5rem',
            lineHeight: 2,
            fontSize: '0.96rem',
            whiteSpace: 'pre-wrap',
            color: 'rgba(240,232,216,0.9)',
            marginBottom: '3rem',
            letterSpacing: '0.01em',
          }}>
            {soulReading}
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
            <Link href="/booking" style={{
              background: 'linear-gradient(135deg, #C9963C, #E4B85A)',
              color: '#000', padding: '1rem 2.5rem', borderRadius: '2px',
              textDecoration: 'none', fontSize: '0.82rem', fontWeight: 700,
              letterSpacing: '0.15em', textTransform: 'uppercase',
            }}>
              {T.result.bookCta}
            </Link>
            <Link href="/" style={{
              background: 'transparent', color: '#C9963C', padding: '1rem 2rem',
              border: '1px solid rgba(201,150,60,0.4)', borderRadius: '2px',
              textDecoration: 'none', fontSize: '0.82rem', letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>
              {t.common.backHome}
            </Link>
          </div>

          {email && (
            <p style={{ textAlign: 'center', color: 'rgba(240,232,216,0.35)', fontSize: '0.78rem', letterSpacing: '0.05em' }}>
              {T.result.emailSent} {email}
            </p>
          )}
        </div>
      </div>
    )
  }

  // ── Assessment form ──────────────────────────────────────────────────────
  return (
    <div style={{ background: '#000', minHeight: '100vh', color: '#F0E8D8' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(201,150,60,0.15)', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', color: '#C9963C', textDecoration: 'none', letterSpacing: '0.15em' }}>
          ☿ {t.common.brand}
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'rgba(240,232,216,0.4)', letterSpacing: '0.15em' }}>
            {T.stepLabel} {step + 1} {T.of} {STEPS.length}
          </span>
          <button onClick={toggle} style={langToggleStyle}>{lang === 'en' ? 'ES' : 'EN'}</button>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: '2px', background: 'rgba(201,150,60,0.1)' }}>
        <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #C9963C, #E4B85A)', transition: 'width 0.5s ease' }} />
      </div>

      {/* Dimension indicator strip */}
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(201,150,60,0.08)' }}>
        {STEPS.map((s, i) => (
          <div key={i} style={{
            flex: 1, height: '3px',
            background: i < step ? s.color : i === step ? s.color : 'transparent',
            opacity: i < step ? 0.4 : 1,
            transition: 'background 0.3s',
          }} />
        ))}
      </div>

      <div style={{ maxWidth: '620px', margin: '0 auto', padding: '4rem 2rem 6rem' }}>
        {/* Step header */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ fontSize: '1.8rem', marginBottom: '1rem', color: currentStep.color, letterSpacing: '0.1em' }}>
            {currentStep.icon}
          </div>
          <div style={{ fontSize: '0.7rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: currentStep.color, marginBottom: '0.5rem', opacity: 0.8 }}>
            {T.stepLabel} {step + 1}
          </div>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2rem, 6vw, 3rem)',
            fontWeight: 300, color: currentStep.color,
            lineHeight: 1, marginBottom: '0.4rem', letterSpacing: '0.02em',
          }}>
            {currentStep.title}
          </h2>
          <p style={{ color: 'rgba(240,232,216,0.3)', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            {currentStep.subtitle}
          </p>
        </div>

        {/* Questions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', marginBottom: '3rem' }}>
          {currentStep.questions.map((q, qi) => (
            <div key={q.id}>
              <label style={{ display: 'block', fontSize: '1rem', lineHeight: 1.65, marginBottom: '0.875rem', color: 'rgba(240,232,216,0.9)', fontWeight: 300 }}>
                <span style={{ color: currentStep.color, marginRight: '0.5rem', fontSize: '0.75rem', verticalAlign: 'middle' }}>
                  {qi + 1}.
                </span>
                {q.label}
              </label>
              <textarea
                value={answers[q.id] || ''}
                onChange={e => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                placeholder={q.placeholder}
                rows={3}
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${answers[q.id]?.trim() ? `${currentStep.color}55` : 'rgba(201,150,60,0.12)'}`,
                  borderRadius: '3px',
                  padding: '1rem 1.125rem',
                  color: '#F0E8D8',
                  fontSize: '0.9rem',
                  lineHeight: 1.75,
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'Jost, sans-serif',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box',
                }}
                onFocus={e => (e.target.style.borderColor = `${currentStep.color}88`)}
                onBlur={e => (e.target.style.borderColor = answers[q.id]?.trim() ? `${currentStep.color}55` : 'rgba(201,150,60,0.12)')}
              />
            </div>
          ))}
        </div>

        {/* Name/email on last step */}
        {isLastStep && (
          <div style={{ marginBottom: '2.5rem', padding: '1.5rem', background: 'rgba(201,150,60,0.04)', border: '1px solid rgba(201,150,60,0.15)', borderRadius: '3px' }}>
            <p style={{ fontSize: '0.8rem', color: 'rgba(240,232,216,0.5)', marginBottom: '1.25rem', letterSpacing: '0.05em' }}>
              {T.emailOptional}
            </p>
            <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder={T.namePlaceholder}
                style={inputStyle}
              />
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={T.emailPlaceholder}
                type="email"
                style={{ ...inputStyle, flex: 2, minWidth: '200px' }}
              />
            </div>
          </div>
        )}

        {error && (
          <p style={{ color: '#E06090', fontSize: '0.85rem', marginBottom: '1.25rem', letterSpacing: '0.02em' }}>
            {error}
          </p>
        )}

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={() => setStep(s => s - 1)}
            style={{
              background: 'none',
              border: '1px solid rgba(201,150,60,0.2)',
              color: 'rgba(240,232,216,0.5)',
              padding: '0.75rem 1.5rem',
              borderRadius: '2px',
              cursor: 'pointer',
              fontSize: '0.82rem',
              letterSpacing: '0.05em',
              opacity: step === 0 ? 0 : 1,
              pointerEvents: step === 0 ? 'none' : 'auto',
              transition: 'all 0.2s',
            }}
          >
            {t.common.back}
          </button>

          <button
            onClick={handleNext}
            disabled={!canProceed || loading}
            style={{
              background: canProceed ? 'linear-gradient(135deg, #C9963C, #E4B85A)' : 'rgba(201,150,60,0.12)',
              color: canProceed ? '#000' : 'rgba(240,232,216,0.25)',
              border: 'none',
              padding: '0.875rem 2.5rem',
              borderRadius: '2px',
              cursor: canProceed && !loading ? 'pointer' : 'default',
              fontSize: '0.82rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              transition: 'all 0.2s',
              minWidth: '200px',
            }}
          >
            {loading ? T.generating : isLastStep ? T.submitBtn : t.common.next}
          </button>
        </div>

        {/* Step dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '3rem', alignItems: 'center' }}>
          {STEPS.map((s, i) => (
            <div
              key={i}
              onClick={() => i < step && setStep(i)}
              style={{
                width: i === step ? '24px' : '6px',
                height: '6px',
                borderRadius: '3px',
                background: i < step ? s.color : i === step ? s.color : 'rgba(201,150,60,0.15)',
                opacity: i < step ? 0.5 : 1,
                transition: 'all 0.35s',
                cursor: i < step ? 'pointer' : 'default',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const langToggleStyle: React.CSSProperties = {
  background: 'none',
  border: '1px solid rgba(201,150,60,0.3)',
  color: 'rgba(240,232,216,0.6)',
  padding: '0.3rem 0.75rem',
  borderRadius: '2px',
  cursor: 'pointer',
  fontSize: '0.72rem',
  fontWeight: 600,
  letterSpacing: '0.15em',
  transition: 'all 0.2s',
  fontFamily: 'Jost, sans-serif',
}

const inputStyle: React.CSSProperties = {
  flex: 1,
  minWidth: '140px',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(201,150,60,0.15)',
  borderRadius: '3px',
  padding: '0.7rem 1rem',
  color: '#F0E8D8',
  fontSize: '0.88rem',
  outline: 'none',
  fontFamily: 'Jost, sans-serif',
}

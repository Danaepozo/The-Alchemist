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
      window.scrollTo({ top: 0, behavior: 'smooth' })
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
        window.scrollTo({ top: 0, behavior: 'smooth' })
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
        <div style={{ borderBottom: '1px solid rgba(201,150,60,0.15)', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#000', zIndex: 10 }}>
          <Link href="/" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', color: '#C9963C', textDecoration: 'none', letterSpacing: '0.15em' }}>
            ☿ {t.common.brand}
          </Link>
          <button onClick={toggle} style={langToggleStyle}>{lang === 'en' ? 'ES' : 'EN'}</button>
        </div>

        <div style={{ maxWidth: '740px', margin: '0 auto', padding: '4rem 2rem 6rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div style={{ fontSize: '2rem', color: '#C9963C', marginBottom: '1.25rem', letterSpacing: '0.1em', opacity: 0.8 }}>☿</div>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 2.8rem)', fontWeight: 300, color: '#C9963C', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
              {T.result.title}
            </h1>
            {name && (
              <p style={{ color: 'rgba(240,232,216,0.45)', fontSize: '0.9rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                {T.result.subtitle} {name}
              </p>
            )}
            <div style={{ width: '48px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,150,60,0.5), transparent)', margin: '1.75rem auto 0' }} />
          </div>

          {/* Soul Reading */}
          <div style={{
            background: 'rgba(201,150,60,0.03)',
            border: '1px solid rgba(201,150,60,0.18)',
            borderRadius: '4px',
            padding: '2.5rem 2.75rem',
            lineHeight: 2.05,
            fontSize: '0.95rem',
            whiteSpace: 'pre-wrap',
            color: 'rgba(240,232,216,0.88)',
            marginBottom: '3rem',
            letterSpacing: '0.01em',
          }}>
            {soulReading}
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
            <Link href="/booking" style={{
              background: 'linear-gradient(135deg, #C9963C, #E4B85A)',
              color: '#000', padding: '1rem 2.5rem', borderRadius: '2px',
              textDecoration: 'none', fontSize: '0.8rem', fontWeight: 700,
              letterSpacing: '0.15em', textTransform: 'uppercase',
            }}>
              {T.result.bookCta}
            </Link>
            <Link href="/" style={{
              background: 'transparent', color: 'rgba(240,232,216,0.5)', padding: '1rem 2rem',
              border: '1px solid rgba(240,232,216,0.12)', borderRadius: '2px',
              textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>
              {t.common.backHome}
            </Link>
          </div>

          {email && (
            <p style={{ textAlign: 'center', color: 'rgba(240,232,216,0.3)', fontSize: '0.76rem', letterSpacing: '0.06em' }}>
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
      <div style={{ borderBottom: '1px solid rgba(201,150,60,0.12)', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#000', zIndex: 10 }}>
        <Link href="/" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', color: '#C9963C', textDecoration: 'none', letterSpacing: '0.15em' }}>
          ☿ {t.common.brand}
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span style={{ fontSize: '0.7rem', color: 'rgba(240,232,216,0.35)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            {T.stepLabel} {step + 1} {T.of} {STEPS.length}
          </span>
          <button onClick={toggle} style={langToggleStyle}>{lang === 'en' ? 'ES' : 'EN'}</button>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: '1px', background: 'rgba(201,150,60,0.08)' }}>
        <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #C9963C, #E4B85A)', transition: 'width 0.5s ease' }} />
      </div>

      {/* Dimension color strip */}
      <div style={{ display: 'flex', height: '2px' }}>
        {STEPS.map((s, i) => (
          <div key={i} style={{
            flex: 1,
            background: i <= step ? s.color : 'transparent',
            opacity: i < step ? 0.3 : 1,
            transition: 'all 0.4s',
          }} />
        ))}
      </div>

      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '3.5rem 2rem 6rem' }}>
        {/* Step header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.875rem', color: currentStep.color, opacity: 0.9 }}>
            {currentStep.icon}
          </div>
          <div style={{ fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: currentStep.color, marginBottom: '0.4rem', opacity: 0.75 }}>
            {T.stepLabel} {step + 1}
          </div>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(1.8rem, 5vw, 2.6rem)',
            fontWeight: 300, color: currentStep.color,
            lineHeight: 1.05, marginBottom: '0.5rem', letterSpacing: '0.02em',
          }}>
            {currentStep.title}
          </h2>
          <p style={{ color: 'rgba(240,232,216,0.28)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.875rem' }}>
            {currentStep.subtitle}
          </p>
          {'description' in currentStep && (
            <p style={{ color: 'rgba(240,232,216,0.45)', fontSize: '0.88rem', lineHeight: 1.65, fontStyle: 'italic', borderLeft: `2px solid ${currentStep.color}44`, paddingLeft: '1rem' }}>
              {(currentStep as typeof currentStep & { description: string }).description}
            </p>
          )}
        </div>

        {/* Questions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.25rem', marginBottom: '3rem' }}>
          {currentStep.questions.map((q, qi) => (
            <div key={q.id}>
              <label style={{ display: 'block', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '0.875rem', color: 'rgba(240,232,216,0.85)', fontWeight: 300 }}>
                <span style={{ color: currentStep.color, marginRight: '0.6rem', fontSize: '0.7rem', opacity: 0.7, fontFamily: 'Jost, sans-serif', letterSpacing: '0.1em' }}>
                  0{qi + 1}
                </span>
                {q.label}
              </label>
              <textarea
                value={answers[q.id] || ''}
                onChange={e => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                placeholder={q.placeholder}
                rows={4}
                style={{
                  width: '100%',
                  background: answers[q.id]?.trim() ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${answers[q.id]?.trim() ? `${currentStep.color}44` : 'rgba(201,150,60,0.1)'}`,
                  borderRadius: '3px',
                  padding: '1rem 1.125rem',
                  color: '#F0E8D8',
                  fontSize: '0.88rem',
                  lineHeight: 1.8,
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'Jost, sans-serif',
                  transition: 'border-color 0.25s, background 0.25s',
                  boxSizing: 'border-box',
                }}
                onFocus={e => {
                  e.target.style.borderColor = `${currentStep.color}77`
                  e.target.style.background = 'rgba(255,255,255,0.04)'
                }}
                onBlur={e => {
                  e.target.style.borderColor = answers[q.id]?.trim() ? `${currentStep.color}44` : 'rgba(201,150,60,0.1)'
                }}
              />
            </div>
          ))}
        </div>

        {/* Name/email on last step */}
        {isLastStep && (
          <div style={{ marginBottom: '2.5rem', padding: '1.5rem', background: 'rgba(201,150,60,0.03)', border: '1px solid rgba(201,150,60,0.12)', borderRadius: '3px' }}>
            <p style={{ fontSize: '0.78rem', color: 'rgba(240,232,216,0.4)', marginBottom: '1.25rem', letterSpacing: '0.06em' }}>
              {T.emailOptional}
            </p>
            <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}>
              <input value={name} onChange={e => setName(e.target.value)} placeholder={T.namePlaceholder} style={inputStyle} />
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder={T.emailPlaceholder} type="email" style={{ ...inputStyle, flex: 2, minWidth: '200px' }} />
            </div>
          </div>
        )}

        {error && (
          <p style={{ color: '#E06090', fontSize: '0.84rem', marginBottom: '1.25rem' }}>{error}</p>
        )}

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={() => { setStep(s => s - 1); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            style={{
              background: 'none',
              border: '1px solid rgba(201,150,60,0.15)',
              color: 'rgba(240,232,216,0.4)',
              padding: '0.75rem 1.5rem',
              borderRadius: '2px',
              cursor: 'pointer',
              fontSize: '0.8rem',
              letterSpacing: '0.06em',
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
              background: canProceed ? 'linear-gradient(135deg, #C9963C, #E4B85A)' : 'rgba(201,150,60,0.1)',
              color: canProceed ? '#000' : 'rgba(240,232,216,0.2)',
              border: 'none',
              padding: '0.9rem 2.5rem',
              borderRadius: '2px',
              cursor: canProceed && !loading ? 'pointer' : 'default',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              transition: 'all 0.2s',
              minWidth: '210px',
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
              title={s.title}
              style={{
                width: i === step ? '22px' : '5px',
                height: '5px',
                borderRadius: '3px',
                background: i < step ? s.color : i === step ? s.color : 'rgba(201,150,60,0.12)',
                opacity: i < step ? 0.45 : 1,
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
  border: '1px solid rgba(201,150,60,0.25)',
  color: 'rgba(240,232,216,0.5)',
  padding: '0.3rem 0.7rem',
  borderRadius: '2px',
  cursor: 'pointer',
  fontSize: '0.7rem',
  fontWeight: 600,
  letterSpacing: '0.15em',
  transition: 'all 0.2s',
  fontFamily: 'Jost, sans-serif',
}

const inputStyle: React.CSSProperties = {
  flex: 1,
  minWidth: '140px',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(201,150,60,0.12)',
  borderRadius: '3px',
  padding: '0.7rem 1rem',
  color: '#F0E8D8',
  fontSize: '0.87rem',
  outline: 'none',
  fontFamily: 'Jost, sans-serif',
}

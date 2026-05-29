'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/components/LanguageProvider'
import type { AssessmentOption } from '@/lib/i18n/types'

type Answers = Record<string, string | string[]>

// Clean renderer for the Soul Reading — turns **bold** section titles into elegant
// headings and the rest into flowing paragraphs (no raw asterisks).
function SoulReading({ text }: { text: string }) {
  const blocks = text.split('\n').filter(l => l.trim() !== '')
  return (
    <>
      {blocks.map((raw, i) => {
        const line = raw.trim()
        const headingMatch = line.match(/^\*\*(.+?)\*\*:?\s*(.*)$/)
        if (headingMatch && headingMatch[2].trim() === '') {
          return (
            <h3 key={i} style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: 400, color: '#C9963C', margin: '2rem 0 0.6rem', letterSpacing: '0.02em' }}>
              {headingMatch[1]}
            </h3>
          )
        }
        const parts = line.split(/(\*\*[^*]+\*\*)/g)
        return (
          <p key={i} style={{ margin: '0 0 1rem', lineHeight: 1.9 }}>
            {parts.map((p, j) =>
              p.startsWith('**') && p.endsWith('**')
                ? <strong key={j} style={{ color: '#E4B85A', fontWeight: 600 }}>{p.slice(2, -2)}</strong>
                : <span key={j}>{p}</span>
            )}
          </p>
        )
      })}
    </>
  )
}

function collectTags(answers: Answers, steps: ReturnType<typeof useLanguage>['t']['assessment']['steps']): string[] {
  const tags: string[] = []
  for (const step of steps) {
    for (const q of step.questions) {
      if (q.type === 'text') continue
      const ans = answers[q.id]
      if (!ans || !q.options) continue
      const selected = Array.isArray(ans) ? ans : [ans]
      for (const val of selected) {
        const opt = q.options.find((o: AssessmentOption) => o.value === val)
        if (opt?.tags) tags.push(...opt.tags)
      }
    }
  }
  return [...new Set(tags)]
}

function formatAnswersForAI(answers: Answers, steps: ReturnType<typeof useLanguage>['t']['assessment']['steps']): string {
  const lines: string[] = []
  for (const step of steps) {
    lines.push(`\n[${step.title}]`)
    for (const q of step.questions) {
      const ans = answers[q.id]
      if (!ans) continue
      if (q.type === 'text') {
        lines.push(`  ${q.label}\n  → "${ans}"`)
      } else {
        const selected = Array.isArray(ans) ? ans : [ans]
        const labels = selected.map(v => q.options?.find((o: AssessmentOption) => o.value === v)?.label ?? v)
        lines.push(`  ${q.label}\n  → ${labels.join(' / ')}`)
      }
    }
  }
  return lines.join('\n')
}

export default function AssessmentPage() {
  const { t, lang, toggle } = useLanguage()
  const T = t.assessment
  const STEPS = T.steps

  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [soulReading, setSoulReading] = useState('')
  const [error, setError] = useState('')

  const currentStep = STEPS[step]
  const isLastStep = step === STEPS.length - 1
  const isComplete = soulReading !== ''
  const progress = ((step + 1) / STEPS.length) * 100

  const canProceed = currentStep?.questions.every(q => {
    const ans = answers[q.id]
    if (q.type === 'text') return typeof ans === 'string' && ans.trim().length > 0
    if (q.type === 'multi') return Array.isArray(ans) && ans.length > 0
    return typeof ans === 'string' && ans.length > 0
  })

  function selectSingle(qid: string, value: string) {
    setAnswers(prev => ({ ...prev, [qid]: value }))
  }

  function toggleMulti(qid: string, value: string, maxSelect: number) {
    setAnswers(prev => {
      const current = (prev[qid] as string[] | undefined) ?? []
      if (current.includes(value)) {
        return { ...prev, [qid]: current.filter(v => v !== value) }
      }
      if (current.length >= maxSelect) return prev
      return { ...prev, [qid]: [...current, value] }
    })
  }

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
      const tags = collectTags(answers, STEPS)
      const formattedAnswers = formatAnswersForAI(answers, STEPS)
      const res = await fetch('/api/soul-reading', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: formattedAnswers, tags, name, email, lang }),
      })
      if (!res.ok || !res.body) throw new Error('failed')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      let acc = ''
      let scrolled = false
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''
        for (const line of lines) {
          if (!line.trim()) continue
          let ev: any
          try { ev = JSON.parse(line) } catch { continue }
          if (ev.type === 'delta') {
            acc += ev.text
            setSoulReading(acc)
            if (!scrolled) { window.scrollTo({ top: 0, behavior: 'smooth' }); scrolled = true }
          } else if (ev.type === 'error') {
            throw new Error(ev.error || 'failed')
          }
        }
      }
      if (!acc) setError(T.error)
    } catch {
      setError(T.connectionError)
    } finally {
      setLoading(false)
    }
  }

  // ── Result ────────────────────────────────────────────────────────────────
  if (isComplete) {
    return (
      <div style={{ background: '#000', minHeight: '100vh', color: '#F0E8D8' }}>
        <div style={stickyHeader}>
          <Link href="/" style={brandLink}>☿ {t.common.brand}</Link>
          <button onClick={toggle} style={langBtn}>{lang === 'en' ? 'ES' : 'EN'}</button>
        </div>
        <div style={{ maxWidth: '740px', margin: '0 auto', padding: '4rem 2rem 6rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div style={{ fontSize: '2rem', color: '#C9963C', marginBottom: '1.25rem', opacity: 0.7 }}>☿</div>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 2.8rem)', fontWeight: 300, color: '#C9963C', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
              {T.result.title}
            </h1>
            {name && <p style={{ color: 'rgba(240,232,216,0.4)', fontSize: '0.88rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{T.result.subtitle} {name}</p>}
            <div style={{ width: '48px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,150,60,0.4), transparent)', margin: '1.75rem auto 0' }} />
          </div>
          <div style={{ background: 'rgba(201,150,60,0.03)', border: '1px solid rgba(201,150,60,0.15)', borderRadius: '4px', padding: '2.5rem 2.75rem', fontSize: '0.97rem', color: 'rgba(240,232,216,0.9)', marginBottom: '3rem' }}>
            <SoulReading text={soulReading} />
          </div>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
            <Link href="/booking" style={{ background: 'linear-gradient(135deg,#C9963C,#E4B85A)', color: '#000', padding: '1rem 2.5rem', borderRadius: '2px', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              {T.result.bookCta}
            </Link>
            <Link href="/" style={{ background: 'transparent', color: 'rgba(240,232,216,0.45)', padding: '1rem 2rem', border: '1px solid rgba(240,232,216,0.1)', borderRadius: '2px', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {t.common.backHome}
            </Link>
          </div>
          {email && <p style={{ textAlign: 'center', color: 'rgba(240,232,216,0.28)', fontSize: '0.76rem', letterSpacing: '0.06em' }}>{T.result.emailSent} {email}</p>}
        </div>
      </div>
    )
  }

  // ── Form ──────────────────────────────────────────────────────────────────
  return (
    <div style={{ background: '#000', minHeight: '100vh', color: '#F0E8D8' }}>
      <div style={stickyHeader}>
        <Link href="/" style={brandLink}>☿ {t.common.brand}</Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span style={{ fontSize: '0.68rem', color: 'rgba(240,232,216,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            {T.stepLabel} {step + 1} {T.of} {STEPS.length}
          </span>
          <button onClick={toggle} style={langBtn}>{lang === 'en' ? 'ES' : 'EN'}</button>
        </div>
      </div>

      {/* Progress */}
      <div style={{ height: '1px', background: 'rgba(201,150,60,0.08)' }}>
        <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg,#C9963C,#E4B85A)', transition: 'width 0.5s ease' }} />
      </div>
      <div style={{ display: 'flex', height: '2px' }}>
        {STEPS.map((s, i) => (
          <div key={i} style={{ flex: 1, background: i <= step ? s.color : 'transparent', opacity: i < step ? 0.3 : 1, transition: 'all 0.4s' }} />
        ))}
      </div>

      <div style={{ maxWidth: '660px', margin: '0 auto', padding: '3.5rem 1.5rem 6rem' }}>
        {/* Step header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '1.4rem', color: currentStep.color, marginBottom: '0.875rem', opacity: 0.85 }}>{currentStep.icon}</div>
          <div style={{ fontSize: '0.62rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: currentStep.color, marginBottom: '0.4rem', opacity: 0.7 }}>
            {T.stepLabel} {step + 1}
          </div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem,5vw,2.5rem)', fontWeight: 300, color: currentStep.color, lineHeight: 1.05, marginBottom: '0.4rem' }}>
            {currentStep.title}
          </h2>
          <p style={{ color: 'rgba(240,232,216,0.25)', fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.875rem' }}>
            {currentStep.subtitle}
          </p>
          <p style={{ color: 'rgba(240,232,216,0.42)', fontSize: '0.87rem', lineHeight: 1.65, fontStyle: 'italic', borderLeft: `2px solid ${currentStep.color}33`, paddingLeft: '1rem' }}>
            {currentStep.description}
          </p>
        </div>

        {/* Questions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', marginBottom: '3rem' }}>
          {currentStep.questions.map((q, qi) => {
            const ans = answers[q.id]
            const selected = Array.isArray(ans) ? ans : ans ? [ans] : []

            return (
              <div key={q.id}>
                <div style={{ fontSize: '0.92rem', lineHeight: 1.65, marginBottom: '1rem', color: 'rgba(240,232,216,0.82)', fontWeight: 300 }}>
                  <span style={{ color: currentStep.color, marginRight: '0.5rem', fontSize: '0.65rem', letterSpacing: '0.08em', opacity: 0.7 }}>0{qi + 1}</span>
                  {q.label}
                </div>

                {/* Multi-select hint */}
                {q.type === 'multi' && q.maxSelect && (
                  <div style={{ fontSize: '0.7rem', color: 'rgba(240,232,216,0.3)', marginBottom: '0.875rem', letterSpacing: '0.08em' }}>
                    {T.multiSelectHint} {q.maxSelect} {T.multiSelectHint2} · {selected.length}/{q.maxSelect}
                  </div>
                )}

                {/* MC Options */}
                {(q.type === 'single' || q.type === 'multi') && q.options && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.6rem' }}>
                    {q.options.map((opt: AssessmentOption) => {
                      const isSelected = selected.includes(opt.value)
                      const isMultiMaxed = q.type === 'multi' && q.maxSelect && selected.length >= q.maxSelect && !isSelected
                      return (
                        <button
                          key={opt.value}
                          onClick={() => {
                            if (q.type === 'single') selectSingle(q.id, opt.value)
                            else if (q.type === 'multi') toggleMulti(q.id, opt.value, q.maxSelect ?? 99)
                          }}
                          disabled={!!isMultiMaxed}
                          style={{
                            background: isSelected ? `${currentStep.color}14` : 'rgba(255,255,255,0.02)',
                            border: `1px solid ${isSelected ? currentStep.color : 'rgba(201,150,60,0.12)'}`,
                            borderRadius: '3px',
                            padding: '0.875rem 1rem',
                            color: isSelected ? '#F0E8D8' : isMultiMaxed ? 'rgba(240,232,216,0.2)' : 'rgba(240,232,216,0.65)',
                            fontSize: '0.84rem',
                            lineHeight: 1.5,
                            textAlign: 'left',
                            cursor: isMultiMaxed ? 'default' : 'pointer',
                            transition: 'all 0.18s',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.625rem',
                            fontFamily: 'Jost, sans-serif',
                          }}
                          onMouseEnter={e => { if (!isSelected && !isMultiMaxed) (e.currentTarget as HTMLButtonElement).style.borderColor = `${currentStep.color}44` }}
                          onMouseLeave={e => { if (!isSelected) (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(201,150,60,0.12)' }}
                        >
                          <span style={{
                            width: '14px', height: '14px', minWidth: '14px',
                            borderRadius: q.type === 'single' ? '50%' : '3px',
                            border: `1px solid ${isSelected ? currentStep.color : 'rgba(240,232,216,0.2)'}`,
                            background: isSelected ? currentStep.color : 'transparent',
                            marginTop: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'all 0.18s', flexShrink: 0,
                          }}>
                            {isSelected && (
                              <span style={{ width: '6px', height: '6px', borderRadius: q.type === 'single' ? '50%' : '1px', background: '#000', display: 'block' }} />
                            )}
                          </span>
                          {opt.label}
                        </button>
                      )
                    })}
                  </div>
                )}

                {/* Text */}
                {q.type === 'text' && (
                  <textarea
                    value={(ans as string) || ''}
                    onChange={e => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                    placeholder={q.placeholder}
                    rows={3}
                    style={{
                      width: '100%', background: 'rgba(255,255,255,0.03)',
                      border: `1px solid ${ans ? `${currentStep.color}44` : 'rgba(201,150,60,0.1)'}`,
                      borderRadius: '3px', padding: '1rem 1.125rem', color: '#F0E8D8',
                      fontSize: '0.88rem', lineHeight: 1.8, outline: 'none', resize: 'vertical',
                      fontFamily: 'Jost, sans-serif', transition: 'border-color 0.2s', boxSizing: 'border-box',
                    }}
                    onFocus={e => (e.target.style.borderColor = `${currentStep.color}77`)}
                    onBlur={e => (e.target.style.borderColor = ans ? `${currentStep.color}44` : 'rgba(201,150,60,0.1)')}
                  />
                )}
              </div>
            )
          })}
        </div>

        {/* Name/email last step */}
        {isLastStep && (
          <div style={{ marginBottom: '2.5rem', padding: '1.5rem', background: 'rgba(201,150,60,0.03)', border: '1px solid rgba(201,150,60,0.1)', borderRadius: '3px' }}>
            <p style={{ fontSize: '0.78rem', color: 'rgba(240,232,216,0.38)', marginBottom: '1.25rem', letterSpacing: '0.06em' }}>{T.emailOptional}</p>
            <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}>
              <input value={name} onChange={e => setName(e.target.value)} placeholder={T.namePlaceholder} style={inputStyle} />
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder={T.emailPlaceholder} type="email" style={{ ...inputStyle, flex: 2, minWidth: '200px' }} />
            </div>
          </div>
        )}

        {error && <p style={{ color: '#E06090', fontSize: '0.84rem', marginBottom: '1.25rem' }}>{error}</p>}

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={() => { setStep(s => s - 1); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            style={{ background: 'none', border: '1px solid rgba(201,150,60,0.12)', color: 'rgba(240,232,216,0.35)', padding: '0.75rem 1.5rem', borderRadius: '2px', cursor: 'pointer', fontSize: '0.8rem', letterSpacing: '0.06em', opacity: step === 0 ? 0 : 1, pointerEvents: step === 0 ? 'none' : 'auto' }}>
            {t.common.back}
          </button>
          <button onClick={handleNext} disabled={!canProceed || loading}
            style={{ background: canProceed ? 'linear-gradient(135deg,#C9963C,#E4B85A)' : 'rgba(201,150,60,0.08)', color: canProceed ? '#000' : 'rgba(240,232,216,0.18)', border: 'none', padding: '0.9rem 2.5rem', borderRadius: '2px', cursor: canProceed && !loading ? 'pointer' : 'default', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', transition: 'all 0.2s', minWidth: '200px' }}>
            {loading ? T.generating : isLastStep ? T.submitBtn : t.common.next}
          </button>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '3rem', alignItems: 'center' }}>
          {STEPS.map((s, i) => (
            <div key={i} onClick={() => i < step && setStep(i)} title={s.title}
              style={{ width: i === step ? '22px' : '5px', height: '5px', borderRadius: '3px', background: i < step ? s.color : i === step ? s.color : 'rgba(201,150,60,0.1)', opacity: i < step ? 0.4 : 1, transition: 'all 0.35s', cursor: i < step ? 'pointer' : 'default' }} />
          ))}
        </div>
      </div>
    </div>
  )
}

const stickyHeader: React.CSSProperties = {
  borderBottom: '1px solid rgba(201,150,60,0.1)',
  padding: '1rem 2rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'sticky',
  top: 0,
  background: '#000',
  zIndex: 10,
}

const brandLink: React.CSSProperties = {
  fontFamily: 'Cormorant Garamond, serif',
  fontSize: '1.2rem',
  color: '#C9963C',
  textDecoration: 'none',
  letterSpacing: '0.15em',
}

const langBtn: React.CSSProperties = {
  background: 'none',
  border: '1px solid rgba(201,150,60,0.22)',
  color: 'rgba(240,232,216,0.45)',
  padding: '0.3rem 0.7rem',
  borderRadius: '2px',
  cursor: 'pointer',
  fontSize: '0.7rem',
  fontWeight: 600,
  letterSpacing: '0.15em',
  fontFamily: 'Jost, sans-serif',
}

const inputStyle: React.CSSProperties = {
  flex: 1,
  minWidth: '140px',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(201,150,60,0.1)',
  borderRadius: '3px',
  padding: '0.7rem 1rem',
  color: '#F0E8D8',
  fontSize: '0.87rem',
  outline: 'none',
  fontFamily: 'Jost, sans-serif',
}

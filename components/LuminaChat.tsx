'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/components/LanguageProvider'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const QUICK_REPLIES_EN = [
  { label: 'I\'m exhausted all the time', icon: '◌' },
  { label: 'Hormones & energy', icon: '◎' },
  { label: 'Anxiety & stress', icon: '◑' },
  { label: 'I want to feel alive again', icon: '☿' },
  { label: 'Spiritual healing', icon: '◇' },
  { label: 'Weight & metabolism', icon: '◈' },
]

const QUICK_REPLIES_ES = [
  { label: 'Estoy agotado/a todo el tiempo', icon: '◌' },
  { label: 'Hormonas y energía', icon: '◎' },
  { label: 'Ansiedad y estrés', icon: '◑' },
  { label: 'Quiero sentirme vivo/a otra vez', icon: '☿' },
  { label: 'Sanación espiritual', icon: '◇' },
  { label: 'Peso y metabolismo', icon: '◈' },
]

const GREETINGS = {
  en: 'I\'m Lumina ✦ — the guiding intelligence of Alchemized BioHealing Institute.\n\nI\'m here to help you understand what your body, mind, and soul are asking for — and to find the right path forward.\n\nWhat brings you here today?',
  es: 'Soy Lumina ✦ — la inteligencia guía de Alchemized BioHealing Institute.\n\nEstoy aquí para ayudarte a entender lo que tu cuerpo, mente y alma están pidiendo — y encontrar el camino correcto.\n\n¿Qué te trae hoy aquí?',
}

export default function LuminaChat() {
  const { lang, toggle } = useLanguage()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showQuickReplies, setShowQuickReplies] = useState(true)
  const [leadEmail, setLeadEmail] = useState('')
  const [leadCaptured, setLeadCaptured] = useState(false)
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [showNudge, setShowNudge] = useState(false)
  const [nudgeDismissed, setNudgeDismissed] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const messageCount = useRef(0)

  // Set greeting based on language
  useEffect(() => {
    setMessages([{ role: 'assistant', content: GREETINGS[lang] }])
  }, [lang])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  // Attention nudge — invite the visitor to chat a few seconds after landing
  useEffect(() => {
    if (open || nudgeDismissed) { setShowNudge(false); return }
    const t = setTimeout(() => setShowNudge(true), 4000)
    return () => clearTimeout(t)
  }, [open, nudgeDismissed])

  const quickReplies = lang === 'es' ? QUICK_REPLIES_ES : QUICK_REPLIES_EN

  const sendMessage = async (text?: string) => {
    const content = (text ?? input).trim()
    if (!content || loading) return
    setInput('')
    setShowQuickReplies(false)
    messageCount.current += 1

    const newMessages: Message[] = [...messages, { role: 'user', content }]
    setMessages(newMessages)
    setLoading(true)

    // Show lead capture after 3 user messages if not captured yet
    if (messageCount.current === 3 && !leadCaptured) {
      setShowLeadForm(true)
    }

    try {
      const res = await fetch('/api/lumina', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch {
      const errMsg = lang === 'es'
        ? 'Tuve un problema de conexión. Por favor intenta de nuevo.'
        : 'I had a connection issue. Please try again.'
      setMessages(prev => [...prev, { role: 'assistant', content: errMsg }])
    } finally {
      setLoading(false)
    }
  }

  const saveLead = async () => {
    if (!leadEmail.trim()) return
    setLeadCaptured(true)
    setShowLeadForm(false)
    try {
      await fetch('/api/lumina', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages,
          leadData: { email: leadEmail },
        }),
      })
    } catch (e) {
      console.error('Lead save error:', e)
    }
    const confirmMsg = lang === 'es'
      ? `Perfecto, ${leadEmail} — guardaré esta conversación para ti. ¿Seguimos?`
      : `Perfect, I've saved your contact — ${leadEmail}. Shall we continue?`
    setMessages(prev => [...prev, { role: 'assistant', content: confirmMsg }])
  }

  const handleOpen = () => {
    setOpen(true)
    if (messages.length === 0) {
      setMessages([{ role: 'assistant', content: GREETINGS[lang] }])
    }
  }

  return (
    <>
      {/* Floating launcher — pill with avatar + label, pulsing glow, and an attention nudge */}
      {!open && (
        <div style={{ position: 'fixed', bottom: '1.6rem', right: '1.6rem', zIndex: 200, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.7rem' }}>
          {/* Attention nudge bubble */}
          {showNudge && (
            <div style={{ position: 'relative', maxWidth: '230px', background: '#0c0c0c', border: '1px solid rgba(201,150,60,0.3)', borderRadius: '14px 14px 2px 14px', padding: '0.8rem 2rem 0.8rem 0.9rem', boxShadow: '0 10px 34px rgba(0,0,0,0.6)', animation: 'luminaNudge 0.4s ease-out', cursor: 'pointer' }} onClick={handleOpen}>
              <button
                onClick={e => { e.stopPropagation(); setNudgeDismissed(true) }}
                aria-label="close"
                style={{ position: 'absolute', top: '0.35rem', right: '0.45rem', background: 'none', border: 'none', color: 'rgba(240,232,216,0.35)', cursor: 'pointer', fontSize: '0.85rem', lineHeight: 1 }}
              >✕</button>
              <p style={{ margin: 0, fontSize: '0.82rem', lineHeight: 1.55, color: 'rgba(240,232,216,0.85)', fontFamily: 'Jost, sans-serif' }}>
                {lang === 'es'
                  ? <>Hola, soy <strong style={{ color: '#E4B85A' }}>Lumina ✦</strong> ¿Te ayudo a encontrar tu camino? Pregúntame lo que quieras.</>
                  : <>Hi, I’m <strong style={{ color: '#E4B85A' }}>Lumina ✦</strong> Can I help you find your path? Ask me anything.</>}
              </p>
            </div>
          )}

          {/* Pulsing glow ring */}
          <button
            onClick={handleOpen}
            style={{
              position: 'relative',
              display: 'flex', alignItems: 'center', gap: '0.6rem',
              padding: '0.55rem 1.1rem 0.55rem 0.6rem', borderRadius: '40px',
              background: 'linear-gradient(135deg, #C9963C, #E4B85A)',
              border: 'none', cursor: 'pointer',
              boxShadow: '0 6px 26px rgba(201,150,60,0.5)',
              animation: 'luminaGlow 2.6s ease-in-out infinite',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
            title={lang === 'es' ? 'Habla con Lumina' : 'Chat with Lumina'}
          >
            <span style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(0,0,0,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.35rem', color: '#1a1206', flexShrink: 0 }}>☿</span>
            <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15, textAlign: 'left', paddingRight: '0.2rem' }}>
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem', fontWeight: 600, color: '#1a1206', letterSpacing: '0.02em' }}>{lang === 'es' ? 'Habla con Lumina' : 'Chat with Lumina'}</span>
              <span style={{ fontSize: '0.62rem', color: 'rgba(26,18,6,0.7)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{lang === 'es' ? 'Tu guía · en línea' : 'Your guide · online'}</span>
            </span>
          </button>
        </div>
      )}

      {/* Chat panel */}
      {open && (
        <div style={{
          position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 200,
          width: '400px', maxWidth: 'calc(100vw - 1.5rem)',
          height: '580px', maxHeight: 'calc(100vh - 3rem)',
          background: '#070707',
          border: '1px solid rgba(201,150,60,0.25)',
          borderRadius: '8px',
          display: 'flex', flexDirection: 'column',
          boxShadow: '0 16px 60px rgba(0,0,0,0.85), 0 0 0 1px rgba(201,150,60,0.08)',
          overflow: 'hidden',
          animation: 'luminaOpen 0.25s ease-out',
        }}>

          {/* Header */}
          <div style={{
            padding: '0.875rem 1.125rem',
            borderBottom: '1px solid rgba(201,150,60,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'rgba(201,150,60,0.04)',
            flexShrink: 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '38px', height: '38px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #C9963C, #E4B85A)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.1rem', boxShadow: '0 2px 12px rgba(201,150,60,0.3)',
              }}>☿</div>
              <div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem', color: '#C9963C', fontWeight: 500, letterSpacing: '0.05em' }}>
                  Lumina
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3DC898', display: 'inline-block' }} />
                  <span style={{ fontSize: '0.65rem', color: 'rgba(240,232,216,0.4)', letterSpacing: '0.08em' }}>
                    {lang === 'es' ? 'Alchemized · En línea' : 'Alchemized · Online'}
                  </span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                onClick={toggle}
                style={{ background: 'none', border: '1px solid rgba(201,150,60,0.2)', color: 'rgba(240,232,216,0.45)', borderRadius: '3px', padding: '0.2rem 0.55rem', cursor: 'pointer', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.12em', fontFamily: 'Jost, sans-serif' }}
              >
                {lang === 'en' ? 'ES' : 'EN'}
              </button>
              <button
                onClick={() => setOpen(false)}
                style={{ background: 'none', border: 'none', color: 'rgba(240,232,216,0.35)', cursor: 'pointer', fontSize: '1.1rem', padding: '0.25rem', lineHeight: 1 }}
              >✕</button>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: '0.5rem' }}>
                {msg.role === 'assistant' && (
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'linear-gradient(135deg, #C9963C, #E4B85A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', flexShrink: 0, marginBottom: '2px' }}>☿</div>
                )}
                <div style={{
                  maxWidth: '78%',
                  padding: '0.75rem 1rem',
                  borderRadius: msg.role === 'user' ? '14px 14px 4px 14px' : '4px 14px 14px 14px',
                  background: msg.role === 'user'
                    ? 'linear-gradient(135deg, #C9963C, #E4B85A)'
                    : 'rgba(255,255,255,0.055)',
                  border: msg.role === 'assistant' ? '1px solid rgba(201,150,60,0.12)' : 'none',
                  color: msg.role === 'user' ? '#000' : 'rgba(240,232,216,0.88)',
                  fontSize: '0.87rem',
                  lineHeight: 1.65,
                  whiteSpace: 'pre-wrap',
                  fontWeight: msg.role === 'user' ? 500 : 300,
                }}>
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'linear-gradient(135deg, #C9963C, #E4B85A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', flexShrink: 0 }}>☿</div>
                <div style={{ padding: '0.75rem 1rem', borderRadius: '4px 14px 14px 14px', background: 'rgba(255,255,255,0.055)', border: '1px solid rgba(201,150,60,0.12)', display: 'flex', gap: '5px', alignItems: 'center' }}>
                  {[0, 0.2, 0.4].map((delay, i) => (
                    <div key={i} style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#C9963C', animation: `luminaTyping 1.4s ease-in-out infinite ${delay}s` }} />
                  ))}
                </div>
              </div>
            )}

            {/* Lead capture form */}
            {showLeadForm && !leadCaptured && (
              <div style={{ background: 'rgba(201,150,60,0.06)', border: '1px solid rgba(201,150,60,0.2)', borderRadius: '8px', padding: '1rem', marginTop: '0.25rem' }}>
                <p style={{ fontSize: '0.8rem', color: 'rgba(240,232,216,0.6)', marginBottom: '0.75rem', lineHeight: 1.5 }}>
                  {lang === 'es'
                    ? '¿Quieres que te envíe un resumen personalizado de lo que hemos hablado?'
                    : 'Would you like me to send you a personalized summary of our conversation?'}
                </p>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    value={leadEmail}
                    onChange={e => setLeadEmail(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && saveLead()}
                    placeholder={lang === 'es' ? 'tu@email.com' : 'your@email.com'}
                    type="email"
                    style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,150,60,0.2)', borderRadius: '5px', padding: '0.55rem 0.75rem', color: '#F0E8D8', fontSize: '0.82rem', outline: 'none', fontFamily: 'Jost, sans-serif' }}
                  />
                  <button
                    onClick={saveLead}
                    style={{ padding: '0.55rem 0.875rem', background: 'linear-gradient(135deg, #C9963C, #E4B85A)', border: 'none', borderRadius: '5px', color: '#000', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600 }}
                  >
                    {lang === 'es' ? 'Enviar' : 'Send'}
                  </button>
                  <button
                    onClick={() => setShowLeadForm(false)}
                    style={{ padding: '0.55rem 0.6rem', background: 'none', border: '1px solid rgba(240,232,216,0.1)', borderRadius: '5px', color: 'rgba(240,232,216,0.35)', cursor: 'pointer', fontSize: '0.75rem' }}
                  >✕</button>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick replies — only before first user message */}
          {showQuickReplies && (
            <div style={{ padding: '0.5rem 1rem 0.25rem', flexShrink: 0, borderTop: '1px solid rgba(201,150,60,0.08)' }}>
              <div style={{ fontSize: '0.62rem', color: 'rgba(240,232,216,0.25)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                {lang === 'es' ? 'Temas frecuentes' : 'Common topics'}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {quickReplies.map((qr, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(qr.label)}
                    style={{
                      background: 'rgba(201,150,60,0.07)',
                      border: '1px solid rgba(201,150,60,0.18)',
                      borderRadius: '20px',
                      padding: '0.35rem 0.75rem',
                      color: 'rgba(240,232,216,0.6)',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '0.35rem',
                      transition: 'all 0.15s',
                      fontFamily: 'Jost, sans-serif',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(201,150,60,0.14)'
                      e.currentTarget.style.color = 'rgba(240,232,216,0.9)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(201,150,60,0.07)'
                      e.currentTarget.style.color = 'rgba(240,232,216,0.6)'
                    }}
                  >
                    <span style={{ fontSize: '0.65rem', opacity: 0.7 }}>{qr.icon}</span>
                    {qr.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CTA strip — Soul Assessment */}
          <div style={{ padding: '0.5rem 1rem', borderTop: '1px solid rgba(201,150,60,0.08)', display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
            <Link
              href="/assessment"
              onClick={() => setOpen(false)}
              style={{
                flex: 1, textAlign: 'center', padding: '0.45rem',
                background: 'rgba(201,150,60,0.08)',
                border: '1px solid rgba(201,150,60,0.2)',
                borderRadius: '4px', color: 'rgba(240,232,216,0.55)',
                fontSize: '0.7rem', textDecoration: 'none',
                letterSpacing: '0.08em', textTransform: 'uppercase',
                transition: 'all 0.15s',
              }}
            >
              {lang === 'es' ? '✦ Evaluación del Alma' : '✦ Soul Assessment'}
            </Link>
            <Link
              href="/booking"
              onClick={() => setOpen(false)}
              style={{
                flex: 1, textAlign: 'center', padding: '0.45rem',
                background: 'linear-gradient(135deg, rgba(201,150,60,0.2), rgba(228,184,90,0.2))',
                border: '1px solid rgba(201,150,60,0.3)',
                borderRadius: '4px', color: '#C9963C',
                fontSize: '0.7rem', textDecoration: 'none',
                letterSpacing: '0.08em', textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              {lang === 'es' ? '☿ Reservar cita' : '☿ Book a session'}
            </Link>
          </div>

          {/* Input */}
          <div style={{ padding: '0.75rem', borderTop: '1px solid rgba(201,150,60,0.12)', display: 'flex', gap: '0.5rem', flexShrink: 0, background: 'rgba(0,0,0,0.3)' }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              placeholder={lang === 'es' ? 'Escríbeme lo que sientes...' : 'Tell me what you\'re feeling...'}
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(201,150,60,0.15)',
                borderRadius: '6px',
                padding: '0.65rem 0.875rem',
                color: '#F0E8D8',
                fontSize: '0.87rem',
                outline: 'none',
                fontFamily: 'Jost, sans-serif',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => (e.target.style.borderColor = 'rgba(201,150,60,0.4)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(201,150,60,0.15)')}
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              style={{
                padding: '0.65rem 1rem',
                background: input.trim() ? 'linear-gradient(135deg, #C9963C, #E4B85A)' : 'rgba(201,150,60,0.12)',
                border: 'none', borderRadius: '6px',
                color: input.trim() ? '#000' : 'rgba(240,232,216,0.2)',
                cursor: input.trim() ? 'pointer' : 'default',
                fontSize: '1rem', fontWeight: 600,
                transition: 'all 0.2s',
                minWidth: '42px',
              }}
            >→</button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes luminaTyping {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.3; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes luminaOpen {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes luminaGlow {
          0%, 100% { box-shadow: 0 6px 26px rgba(201,150,60,0.5); }
          50% { box-shadow: 0 6px 40px rgba(201,150,60,0.85), 0 0 0 6px rgba(201,150,60,0.12); }
        }
        @keyframes luminaNudge {
          from { opacity: 0; transform: translateY(8px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  )
}

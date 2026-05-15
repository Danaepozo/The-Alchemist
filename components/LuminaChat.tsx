'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function LuminaChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hola, soy Lumina ✨ — tu guía de bienestar en The Alchemist Miami.\n\n¿Cómo puedo orientarte hoy? Cuéntame qué estás sintiendo o qué estás buscando.' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    const newMessages: Message[] = [...messages, { role: 'user', content: text }]
    setMessages(newMessages)
    setLoading(true)
    try {
      const res = await fetch('/api/lumina', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Lo siento, tuve un problema de conexión. Por favor intenta de nuevo.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 200,
          width: '60px', height: '60px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #C9963C, #E4B85A)',
          border: 'none', cursor: 'pointer', display: open ? 'none' : 'flex',
          alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 24px rgba(201,150,60,0.5)',
          fontSize: '1.5rem', transition: 'transform 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        title="Chat with Lumina"
      >
        ☿
      </button>

      {/* Chat overlay */}
      {open && (
        <div style={{
          position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 200,
          width: '380px', maxWidth: 'calc(100vw - 2rem)',
          height: '520px', maxHeight: 'calc(100vh - 4rem)',
          background: '#0A0A0A', border: '1px solid rgba(201,150,60,0.4)',
          borderRadius: '8px', display: 'flex', flexDirection: 'column',
          boxShadow: '0 8px 40px rgba(0,0,0,0.8), 0 0 0 1px rgba(201,150,60,0.1)',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgba(201,150,60,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(201,150,60,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #C9963C, #E4B85A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>☿</div>
              <div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', color: '#C9963C', fontWeight: 500 }}>Lumina</div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(240,232,216,0.5)', letterSpacing: '0.05em' }}>Wellness Concierge · The Alchemist</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: 'rgba(240,232,216,0.5)', cursor: 'pointer', fontSize: '1.2rem', padding: '0.25rem' }}>✕</button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '80%', padding: '0.75rem 1rem', borderRadius: msg.role === 'user' ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
                  background: msg.role === 'user' ? 'linear-gradient(135deg, #C9963C, #E4B85A)' : 'rgba(255,255,255,0.06)',
                  border: msg.role === 'assistant' ? '1px solid rgba(201,150,60,0.15)' : 'none',
                  color: msg.role === 'user' ? '#000' : '#F0E8D8',
                  fontSize: '0.88rem', lineHeight: 1.6,
                  whiteSpace: 'pre-wrap',
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ padding: '0.75rem 1rem', borderRadius: '12px 12px 12px 4px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(201,150,60,0.15)', display: 'flex', gap: '4px', alignItems: 'center' }}>
                  {[0, 0.2, 0.4].map((delay, i) => (
                    <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C9963C', animation: `typing 1.2s ease-in-out infinite ${delay}s` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '0.75rem', borderTop: '1px solid rgba(201,150,60,0.2)', display: 'flex', gap: '0.5rem' }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              placeholder="Ask Lumina anything..."
              style={{
                flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,150,60,0.2)',
                borderRadius: '6px', padding: '0.65rem 0.875rem', color: '#F0E8D8',
                fontSize: '0.88rem', outline: 'none',
              }}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{
                padding: '0.65rem 1rem', background: input.trim() ? 'linear-gradient(135deg, #C9963C, #E4B85A)' : 'rgba(201,150,60,0.2)',
                border: 'none', borderRadius: '6px', color: '#000', cursor: input.trim() ? 'pointer' : 'default',
                fontSize: '0.9rem', fontWeight: 600, transition: 'background 0.2s',
              }}
            >→</button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes typing {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </>
  )
}

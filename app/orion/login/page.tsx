'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

export default function OrionLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Invalid credentials. Access denied.')
      setLoading(false)
    } else {
      router.push('/orion')
      router.refresh()
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif',
    }}>
      {/* Animated rings */}
      <div style={{ position: 'relative', marginBottom: '2rem' }}>
        <div style={{
          width: 120, height: 120,
          border: '1px solid rgba(61,200,152,0.15)',
          borderRadius: '50%',
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          animation: 'spin 20s linear infinite',
        }} />
        <div style={{
          width: 80, height: 80,
          border: '1px solid rgba(61,200,152,0.25)',
          borderRadius: '50%',
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          animation: 'spin 12s linear infinite reverse',
        }} />
        <div style={{
          fontSize: '2.5rem',
          color: '#3DC898',
          position: 'relative',
          zIndex: 1,
          lineHeight: 1,
          padding: '1.5rem',
        }}>⊕</div>
      </div>

      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 300,
        letterSpacing: '0.4em',
        color: '#3DC898',
        marginBottom: '0.5rem',
        textTransform: 'uppercase',
      }}>ORION</h1>

      <p style={{
        fontSize: '0.75rem',
        letterSpacing: '0.25em',
        color: 'rgba(240,232,216,0.4)',
        textTransform: 'uppercase',
        marginBottom: '0.25rem',
      }}>Medical Protocol Intelligence</p>

      <p style={{
        fontSize: '0.7rem',
        color: 'rgba(240,232,216,0.25)',
        marginBottom: '3rem',
        letterSpacing: '0.1em',
      }}>Dr. Michael J. Meighen · The Alchemist Miami</p>

      <form onSubmit={handleLogin} style={{
        width: '100%',
        maxWidth: 360,
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '0 1.5rem',
      }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{
            background: 'rgba(61,200,152,0.05)',
            border: '1px solid rgba(61,200,152,0.2)',
            borderRadius: 4,
            padding: '0.875rem 1rem',
            color: '#F0E8D8',
            fontSize: '0.9rem',
            outline: 'none',
            width: '100%',
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{
            background: 'rgba(61,200,152,0.05)',
            border: '1px solid rgba(61,200,152,0.2)',
            borderRadius: 4,
            padding: '0.875rem 1rem',
            color: '#F0E8D8',
            fontSize: '0.9rem',
            outline: 'none',
            width: '100%',
          }}
        />

        {error && (
          <p style={{ color: '#E06090', fontSize: '0.8rem', textAlign: 'center' }}>{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            background: loading ? 'rgba(61,200,152,0.3)' : '#3DC898',
            color: '#000',
            border: 'none',
            borderRadius: 4,
            padding: '0.875rem',
            fontSize: '0.85rem',
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            cursor: loading ? 'wait' : 'pointer',
            marginTop: '0.5rem',
          }}
        >
          {loading ? 'Authenticating...' : 'Access ORION'}
        </button>
      </form>

      <p style={{
        marginTop: '3rem',
        fontSize: '0.65rem',
        color: 'rgba(240,232,216,0.15)',
        letterSpacing: '0.1em',
      }}>CONFIDENTIAL · AUTHORIZED ACCESS ONLY</p>

      <style>{`
        @keyframes spin { to { transform: translate(-50%,-50%) rotate(360deg); } }
      `}</style>
    </div>
  )
}

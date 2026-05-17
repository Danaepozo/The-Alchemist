'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const navItems = [
  { href: '/orion', label: 'Dashboard', icon: '▦' },
  { href: '/orion/patients', label: 'Patients', icon: '⊕' },
  { href: '/orion/protocols', label: 'Protocols', icon: '◈' },
  { href: '/orion/alerts', label: 'Alerts', icon: '◉' },
  { href: '/orion/sessions', label: "Today's Sessions", icon: '◷' },
  { href: '/orion/reference', label: 'Reference Guide', icon: '◇' },
  { href: '/orion/intelligence', label: 'Intelligence Hub', icon: '◎' },
  { href: '/orion/protocol-builder', label: 'Protocol Builder', icon: '⬡' },
]

export default function OrionLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  const [alertCount, setAlertCount] = useState(0)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    async function checkSession() {
      if (pathname === '/orion/login') { setChecking(false); return }
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.replace('/orion/login')
      } else {
        setChecking(false)
      }
    }
    checkSession()
  }, [pathname])

  useEffect(() => {
    async function fetchAlertCount() {
      const { count } = await supabase
        .from('orion_alerts')
        .select('*', { count: 'exact', head: true })
        .eq('acknowledged', false)
      setAlertCount(count || 0)
    }
    if (!checking) fetchAlertCount()
  }, [checking])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/orion/login')
  }

  if (pathname === '/orion/login') return <>{children}</>
  if (checking) return <div style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3DC898', letterSpacing: '0.3em', fontSize: '0.8rem' }}>ORION</div>

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#000', fontFamily: 'system-ui, sans-serif' }}>
      {/* Sidebar */}
      <aside style={{
        width: 240,
        background: '#000',
        borderRight: '1px solid rgba(61,200,152,0.12)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0, left: 0, bottom: 0,
        zIndex: 50,
      }}>
        {/* Logo */}
        <div style={{ padding: '1.75rem 1.5rem', borderBottom: '1px solid rgba(61,200,152,0.1)' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 300, letterSpacing: '0.4em', color: '#3DC898' }}>ORION</div>
          <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(240,232,216,0.3)', textTransform: 'uppercase', marginTop: '0.25rem' }}>Medical Intelligence</div>
          <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'rgba(240,232,216,0.5)' }}>Dr. Michael J. Meighen</div>
          <div style={{ fontSize: '0.65rem', color: 'rgba(240,232,216,0.25)', marginTop: '0.1rem' }}>The Alchemist Miami</div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '1rem 0' }}>
          {navItems.map(item => {
            const isActive = pathname === item.href || (item.href !== '/orion' && pathname.startsWith(item.href))
            return (
              <Link key={item.href} href={item.href} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1.5rem',
                color: isActive ? '#3DC898' : 'rgba(240,232,216,0.5)',
                background: isActive ? 'rgba(61,200,152,0.08)' : 'transparent',
                borderLeft: isActive ? '2px solid #3DC898' : '2px solid transparent',
                textDecoration: 'none',
                fontSize: '0.85rem',
                letterSpacing: '0.05em',
                transition: 'all 0.15s',
              }}>
                <span style={{ fontSize: '1rem' }}>{item.icon}</span>
                <span>{item.label}</span>
                {item.label === 'Alerts' && alertCount > 0 && (
                  <span style={{
                    marginLeft: 'auto',
                    background: '#E06090',
                    color: '#fff',
                    borderRadius: '50%',
                    width: 18, height: 18,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                  }}>{alertCount}</span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid rgba(61,200,152,0.1)' }}>
          <div style={{ fontSize: '0.65rem', color: 'rgba(240,232,216,0.2)', marginBottom: '0.75rem' }}>ORION v1.0 · 2026</div>
          <button
            onClick={handleLogout}
            style={{
              background: 'none',
              border: '1px solid rgba(240,232,216,0.1)',
              borderRadius: 4,
              padding: '0.5rem 1rem',
              color: 'rgba(240,232,216,0.4)',
              fontSize: '0.75rem',
              cursor: 'pointer',
              width: '100%',
              letterSpacing: '0.1em',
            }}
          >Logout</button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ marginLeft: 240, flex: 1, minHeight: '100vh', background: '#040404' }}>
        {children}
      </main>
    </div>
  )
}

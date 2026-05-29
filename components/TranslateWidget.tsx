'use client'

import { useEffect, useState } from 'react'

declare global {
  interface Window {
    googleTranslateElementInit?: () => void
    google?: any
  }
}

function getCookie(name: string) {
  const m = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')
  return m ? m.pop() || '' : ''
}

export default function TranslateWidget() {
  const [lang, setLang] = useState<'en' | 'es'>('en')

  useEffect(() => {
    const c = getCookie('googtrans') || ''
    setLang(c.endsWith('/es') ? 'es' : 'en')

    if (!document.getElementById('google-translate-script')) {
      window.googleTranslateElementInit = () => {
        try {
          new window.google.translate.TranslateElement(
            { pageLanguage: 'en', includedLanguages: 'en,es', autoDisplay: false },
            'google_translate_element'
          )
        } catch { /* noop */ }
      }
      const s = document.createElement('script')
      s.id = 'google-translate-script'
      s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      document.body.appendChild(s)
    }
  }, [])

  function choose(next: 'en' | 'es') {
    const host = window.location.hostname
    const expire = (v: string) => {
      document.cookie = `googtrans=${v};path=/`
      document.cookie = `googtrans=${v};path=/;domain=${host}`
      document.cookie = `googtrans=${v};path=/;domain=.${host}`
    }
    const clear = () => {
      const past = ';expires=Thu, 01 Jan 1970 00:00:00 GMT'
      document.cookie = `googtrans=;path=/${past}`
      document.cookie = `googtrans=;path=/;domain=${host}${past}`
      document.cookie = `googtrans=;path=/;domain=.${host}${past}`
    }
    if (next === 'es') expire('/en/es')
    else clear()
    window.location.reload()
  }

  return (
    <>
      <style>{`
        .goog-te-banner-frame, .skiptranslate { display: none !important; }
        body { top: 0 !important; position: static !important; }
        #goog-gt-tt, .goog-te-balloon-frame { display: none !important; }
        .goog-text-highlight { background: none !important; box-shadow: none !important; }
      `}</style>
      <div id="google_translate_element" style={{ display: 'none' }} />
      <div role="group" aria-label="Language" style={{ position: 'fixed', left: 16, bottom: 16, zIndex: 1000, display: 'flex', gap: 2, background: 'rgba(5,5,9,0.78)', border: '1px solid rgba(201,150,60,0.35)', borderRadius: 22, padding: 3, backdropFilter: 'blur(10px)' }}>
        {(['en', 'es'] as const).map(l => {
          const active = lang === l
          return (
            <button key={l} onClick={() => choose(l)} aria-pressed={active}
              style={{ border: 'none', cursor: 'pointer', borderRadius: 18, padding: '0.3rem 0.75rem', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em',
                background: active ? 'linear-gradient(135deg,#C9963C,#E4B85A)' : 'transparent', color: active ? '#000' : 'rgba(240,232,216,0.7)' }}>
              {l.toUpperCase()}
            </button>
          )
        })}
      </div>
    </>
  )
}

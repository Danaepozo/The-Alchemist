'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { en, es, Translations } from '@/lib/i18n'

type Language = 'en' | 'es'

interface LanguageContextType {
  lang: Language
  t: Translations
  toggle: () => void
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  t: en,
  toggle: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('en')

  useEffect(() => {
    const saved = localStorage.getItem('alchemist_lang') as Language | null
    if (saved === 'en' || saved === 'es') setLang(saved)
  }, [])

  function toggle() {
    setLang(prev => {
      const next = prev === 'en' ? 'es' : 'en'
      localStorage.setItem('alchemist_lang', next)
      return next
    })
  }

  return (
    <LanguageContext.Provider value={{ lang, t: lang === 'en' ? en : es, toggle }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}

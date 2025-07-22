// contexts/AppContext.tsx
'use client'

import { createContext, useState, useContext, ReactNode, useMemo, useEffect } from 'react'
import frTranslations from '@/locales/fr.json'
import enTranslations from '@/locales/en.json'

type Theme = 'light' | 'dark'
type Language = 'fr' | 'en'

interface AppContextType {
  theme: Theme
  language: Language
  toggleTheme: () => void
  changeLanguage: (lang: Language) => void
  t: (key: string) => string
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export   function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')
  const [language, setLanguage] = useState<Language>('fr')

  // Initialize theme and language from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme || 'dark';
    const storedLanguage = localStorage.getItem('language') as Language || 'fr';
    setTheme(storedTheme);
    setLanguage(storedLanguage);
    // Apply the theme class immediately
    document.documentElement.classList.toggle('dark', storedTheme === 'dark');
  }, []);

  // Fonction de traduction avec support des chemins imbriqués (ex: 'header.home')
  const t = useMemo(() => {
    const translations = language === 'fr' ? frTranslations : enTranslations
    
    return (key: string): string => {
      return key.split('.').reduce((obj, keyPart) => {
        return (obj && typeof obj === 'object' && keyPart in obj) 
          ? obj[keyPart as keyof typeof obj] 
          : key
      }, translations as any) as string
    }
  }, [language])

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', newTheme)
      return newTheme
    })
  }

  const changeLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  // Chargement des préférences au montage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null
    const savedLang = localStorage.getItem('language') as Language | null
    
    if (savedTheme) setTheme(savedTheme)
    if (savedLang) setLanguage(savedLang)
  }, [])

  const contextValue = useMemo(() => ({
    theme,
    language,
    toggleTheme,
    changeLanguage,
    t
  }), [theme, language, t])

  return (
    <AppContext.Provider value={contextValue}>
      <div className={theme}>
        {children}
      </div>
    </AppContext.Provider>
  )
}
export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
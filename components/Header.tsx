'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Settings, ChevronDown, Sun, Moon, Globe } from 'lucide-react'
import { useAppContext } from '@/contexts/Appcontext';
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  const { theme, language, toggleTheme, changeLanguage, t } = useAppContext()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '#home', label: t('header.home') },
    { href: '#about', label: t('header.about') },
    { 
      label: t('header.skills'),
      submenu: [
        { href: '#skills', label: t('header.technical') },
        { href: '#languages', label: t('header.languages') }
      ]
    },
    { href: '#education', label: t('header.education') },
    { href: '#certifications', label: t('header.certifications') },
    { href: '#projects', label: t('header.projects') },
    { href: '#experience', label: t('header.experience') },
    { href: '#competitions', label: t('header.competitions') },
    { href: '#associations', label: t('header.association') },
     
    { href: '#contact', label: t('header.contact') },
  ]

  const toggleSubmenu = (label: string) => {
    setActiveSubmenu(activeSubmenu === label ? null : label)
  }

  const handleLanguageChange = (lang: 'fr' | 'en') => {
    changeLanguage(lang)
    setIsLanguageMenuOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-gray-900/95 backdrop-blur-md border-b border-white/10' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo avec images */}
        <Link href="/" className="flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Image
              alt="photo"
              src="/images/me.png"
              width={60}
              height={60}
              className="rounded-full object-cover border-2 border-purple-500/30"
              priority
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="hidden sm:block">
            <Image
              alt="logo"
              src="/asserts/logo.png"
              width={60}
              height={60}
              className="rounded-full object-cover"
              priority
            />
          </motion.div>
        </Link>

        {/* Navigation Desktop */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <div key={item.label} className="relative">
              {item.href ? (
                <motion.a
                  href={item.href}
                  whileHover={{ y: -2 }}
                  className="text-gray-300 hover:text-white transition-colors relative group px-3 py-2"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                </motion.a>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => toggleSubmenu(item.label)}
                    className="flex items-center text-gray-300 hover:text-white px-3 py-2"
                  >
                    {item.label}
                    <ChevronDown 
                      size={16} 
                      className={`ml-1 transition-transform ${activeSubmenu === item.label ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  
                  <AnimatePresence>
                    {activeSubmenu === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 mt-1 w-48 bg-gray-800 rounded-lg shadow-lg py-2 z-50"
                      >
                        {item.submenu?.map((subItem) => (
                          <a
                            key={subItem.href}
                            href={subItem.href}
                            className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                          >
                            {subItem.label}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Contrôles du thème, langue et admin */}
        <div className="flex items-center space-x-4">
          {/* Sélecteur de thème */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-300 hover:bg-gray-700/50"
            aria-label={theme === 'dark' ? t('header.switchToLight') : t('header.switchToDark')}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Sélecteur de langue */}
          <div className="relative">
            <button 
              onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
              className="flex items-center space-x-1 p-2 rounded-full text-gray-300 hover:bg-gray-700/50"
              aria-label={t('header.changeLanguage')}
            >
              <Globe size={20} />
              <span className="text-sm uppercase">{language}</span>
            </button>
            
            <AnimatePresence>
              {isLanguageMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-24 bg-gray-800 rounded-md shadow-lg py-1 z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => handleLanguageChange('fr')}
                    className={`block w-full text-left px-4 py-2 text-sm ${language === 'fr' ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}
                  >
                    {t('language.french')}
                  </button>
                  <button
                    onClick={() => handleLanguageChange('en')}
                    className={`block w-full text-left px-4 py-2 text-sm ${language === 'en' ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}
                  >
                    {t('language.english')}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bouton Admin */}
          <Link
            href="/admin"
            className="flex items-center space-x-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-3 py-2 rounded-lg transition-colors border border-blue-600/30"
          >
            <Settings size={16} />
            <span className="hidden lg:inline">{t('header.admin')}</span>
          </Link>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
            className="md:hidden text-white p-2 relative z-60"
            aria-label={t('header.menu')}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 25 }}
            className="md:hidden fixed inset-0 bg-gray-900/95 backdrop-blur-md pt-20 pb-10 px-6 overflow-y-auto z-40"
            onClick={() => setIsOpen(false)}
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <div key={item.label} className="border-b border-gray-800 pb-3">
                  {item.href ? (
                    <a
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block text-gray-300 hover:text-white py-3 text-lg"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <>
                      <button
                        onClick={() => toggleSubmenu(item.label)}
                        className="flex items-center justify-between w-full text-gray-300 hover:text-white py-3 text-lg"
                      >
                        {item.label}
                        <ChevronDown 
                          size={20} 
                          className={`transition-transform ${activeSubmenu === item.label ? 'rotate-180' : ''}`} 
                        />
                      </button>
                      
                      <AnimatePresence>
                        {activeSubmenu === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pl-4"
                          >
                            {item.submenu?.map((subItem) => (
                              <a
                                key={subItem.href}
                                href={subItem.href}
                                onClick={() => setIsOpen(false)}
                                className="block py-3 text-gray-400 hover:text-white"
                              >
                                {subItem.label}
                              </a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </div>
              ))}
              
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="mt-6 flex items-center justify-center space-x-2 bg-blue-600/20 text-blue-400 px-4 py-3 rounded-lg border border-blue-600/30"
              >
                <Settings size={18} />
                <span>{t('header.adminSpace')}</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
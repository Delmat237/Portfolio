'use client'

import { useState, useEffect, useRef } from 'react' // Added useRef for click outside
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

  // Refs for closing menus on outside clicks
  const desktopNavRef = useRef<HTMLDivElement>(null);
  const languageMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu and submenus when screen resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setIsOpen(false);
        setActiveSubmenu(null);
        setIsLanguageMenuOpen(false); // Close language menu on resize
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Effect to close submenus/language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close desktop submenu
      if (desktopNavRef.current && !desktopNavRef.current.contains(event.target as Node)) {
        setActiveSubmenu(null);
      }
      // Close language menu
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setIsLanguageMenuOpen(false);
      }
      // Close mobile menu
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        // Only close if the click isn't on the mobile toggle button itself
        const mobileToggleButton = document.querySelector('.md\\:hidden.text-white'); // Target mobile menu button
        if (mobileToggleButton && !mobileToggleButton.contains(event.target as Node)) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);




const navItems = [
  { href: '/#home', label: t('header.home') },
  {
    label: t('header.about'), // New consolidated "About Me" label
    submenu: [
      { href: '/#about', label: t('header.about') },
      { href: '/#education', label: t('header.education') },
      { href: '/#certifications', label: t('header.certifications') },
      { href: '/#associations', label: t('header.association') },
    ]
  },
  {
    label: t('header.skills'),
    submenu: [
      { href: '/#skills', label: t('header.technical') },
      { href: '/#languages', label: t('header.languages') }
    ]
  },
  { href: '/#projects', label: t('header.projects') },
  { href: '/#experience', label: t('header.experience') },
  { href: '/#contact', label: t('header.contact') },
]



  const toggleSubmenu = (label: string) => {
    setActiveSubmenu(activeSubmenu === label ? null : label)
  }

  const handleLanguageChange = (lang: 'fr' | 'en') => {
    changeLanguage(lang)
    setIsLanguageMenuOpen(false)
  }

  // Close all menus when a navigation item is clicked (for mobile)
  const handleNavLinkClick = () => {
    setIsOpen(false);
    setActiveSubmenu(null);
    setIsLanguageMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-gradient-to-r from-gray-950/90 to-black/90 backdrop-blur-md border-b border-purple-800/20 shadow-lg'
          : 'bg-transparent'
      } ${theme === 'light' ? 'text-gray-900 bg-white/95 border-b border-gray-200 shadow-md' : 'text-white'}`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo with images */}
        <Link href="/" className="flex items-center gap-3" onClick={handleNavLinkClick}>
          <motion.div whileHover={{ scale: 1.05 }} className="relative w-[50px] h-[50px]">
            <Image
              alt="photo"
              src="/images/me.png"
              fill // Use fill for better image handling
              className="rounded-full object-cover border-2 border-primary-500/50 shadow-md"
              sizes="(max-width: 768px) 100vw, 50px"
              priority
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="hidden sm:block relative w-[50px] h-[50px]">
            <Image
              alt="logo"
              src="/asserts/logo.png"
              fill // Use fill
              className="rounded-full object-cover border-2 border-purple-500/30 shadow-md"
              sizes="(max-width: 768px) 100vw, 50px"
              priority
            />
          </motion.div>
        </Link>

        {/* Navigation Desktop */}
        <nav className="hidden md:flex items-center space-x-6" ref={desktopNavRef}>
          {navItems.map((item) => (
            <div key={item.label} className="relative group">
              {item.href ? (
                <motion.a
                  href={item.href}
                  whileHover={{ y: -2 }}
                  className={`text-lg px-3 py-2 transition-colors relative group
                    ${theme === 'light' ? 'text-gray-700 hover:text-gray-900' : 'text-gray-300 hover:text-white'}`}
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-primary-400 to-purple-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300`}></span>
                </motion.a>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => toggleSubmenu(item.label)}
                    className={`flex items-center text-lg px-3 py-2 transition-colors
                      ${theme === 'light' ? 'text-gray-700 hover:text-gray-900' : 'text-gray-300 hover:text-white'}`}
                  >
                    {item.label}
                    <ChevronDown
                      size={16}
                      className={`ml-1 transition-transform ${activeSubmenu === item.label ? 'rotate-180' : ''} 
                        ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}
                    />
                  </button>

                  <AnimatePresence>
                    {activeSubmenu === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className={`absolute top-full left-0 mt-1 w-48 rounded-lg shadow-xl py-2 z-50 overflow-hidden
                          ${theme === 'light' ? 'bg-white border border-gray-200' : 'bg-gray-800 border border-gray-700'}`}
                      >
                        {item.submenu?.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            onClick={handleNavLinkClick}
                            className={`block px-4 py-2 text-base 
                              ${theme === 'light' ? 'text-gray-800 hover:bg-gray-100' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Theme, language, and admin controls */}
        <div className="flex items-center space-x-4">
          {/* Theme switcher */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors 
              ${theme === 'light' ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-300 hover:bg-gray-700/50'}`}
            aria-label={theme === 'dark' ? t('header.switchToLight') : t('header.switchToDark')}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Language switcher */}
          <div className="relative" ref={languageMenuRef}>
            <button
              onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
              className={`flex items-center space-x-1 p-2 rounded-full transition-colors 
                ${theme === 'light' ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-300 hover:bg-gray-700/50'}`}
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
                  className={`absolute right-0 mt-2 w-28 rounded-md shadow-lg py-1 z-50 overflow-hidden
                    ${theme === 'light' ? 'bg-white border border-gray-200' : 'bg-gray-800 border border-gray-700'}`}
                >
                  <button
                    onClick={() => handleLanguageChange('fr')}
                    className={`block w-full text-left px-4 py-2 text-sm 
                      ${language === 'fr' 
                        ? 'text-primary-400 font-semibold' 
                        : (theme === 'light' ? 'text-gray-800 hover:bg-gray-100' : 'text-gray-300 hover:bg-gray-700 hover:text-white')}`}
                  >
                    {t('language.french')}
                  </button>
                  <button
                    onClick={() => handleLanguageChange('en')}
                    className={`block w-full text-left px-4 py-2 text-sm 
                      ${language === 'en' 
                        ? 'text-primary-400 font-semibold' 
                        : (theme === 'light' ? 'text-gray-800 hover:bg-gray-100' : 'text-gray-300 hover:bg-gray-700 hover:text-white')}`}
                  >
                    {t('language.english')}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Admin Button */}
          {/* <Link
            href="/admin"
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors border
              ${theme === 'light'
                ? 'bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200'
                : 'bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border-blue-600/30'}`}
          >
            <Settings size={16} />
            <span className="hidden lg:inline text-sm">{t('header.admin')}</span>
          </Link> */}

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
            className={`md:hidden p-2 relative z-60 transition-colors
              ${theme === 'light' ? 'text-gray-700 hover:bg-gray-100' : 'text-white'}`}
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
            className={`md:hidden fixed inset-0 pt-20 pb-10 px-6 overflow-y-auto z-40
              ${theme === 'light' ? 'bg-white/95 backdrop-blur-md' : 'bg-gray-900/95 backdrop-blur-md'}`}
            ref={mobileMenuRef} // Apply ref here
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <div key={item.label} className={`pb-3 ${theme === 'light' ? 'border-b border-gray-200' : 'border-b border-gray-800'}`}>
                  {item.href ? (
                    <Link // Changed from <a> to <Link> for Next.js routing best practices
                      href={item.href}
                      onClick={handleNavLinkClick}
                      className={`block py-3 text-lg transition-colors
                        ${theme === 'light' ? 'text-gray-800 hover:text-gray-950' : 'text-gray-300 hover:text-white'}`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => toggleSubmenu(item.label)}
                        className={`flex items-center justify-between w-full py-3 text-lg transition-colors
                          ${theme === 'light' ? 'text-gray-800 hover:text-gray-950' : 'text-gray-300 hover:text-white'}`}
                      >
                        {item.label}
                        <ChevronDown
                          size={20}
                          className={`transition-transform ${activeSubmenu === item.label ? 'rotate-180' : ''}
                            ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}
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
                              <Link // Changed from <a> to <Link>
                                key={subItem.href}
                                href={subItem.href}
                                onClick={handleNavLinkClick}
                                className={`block py-3 text-base 
                                  ${theme === 'light' ? 'text-gray-700 hover:text-gray-900' : 'text-gray-400 hover:text-white'}`}
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </div>
              ))}

              {/* <Link
                href="/admin"
                onClick={handleNavLinkClick}
                className={`mt-6 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg border
                  ${theme === 'light'
                    ? 'bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200'
                    : 'bg-blue-600/20 text-blue-400 border-blue-600/30 hover:bg-blue-600/30'}`}
              >
                <Settings size={18} />
                <span>{t('header.adminSpace')}</span>
              </Link> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart, Phone } from 'lucide-react'
import Link from 'next/link'
import { useAppContext } from '@/contexts/Appcontext'
import { CONTACT_EMAIL, CONTACT_MAP_URL, CONTACT_PHONE, CONTACT_WHATSAPP } from '@/lib/contact'

const Footer = () => {
  const { t } = useAppContext()

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Delmat237', label: 'Delmat237' },
    { icon: Linkedin, href: 'https://linkedin.com/leonel-azangue', label: 'leonel-azangue' },
    { icon: Mail, href: `mailto:${CONTACT_EMAIL}`, label: CONTACT_EMAIL },
    { icon: Phone, href: CONTACT_WHATSAPP, label: CONTACT_PHONE, external: true },
  ]

  const quickLinks = [
    { name: t('header.home'), href: '#home' },
    { name: t('header.about'), href: '#about' },
    { name: t('header.projects'), href: '#projects' },
    { name: t('header.contact'), href: '#contact' },
  ]

  return (
    <footer className="bg-white dark:bg-dark-900 border-t border-slate-200 dark:border-dark-700 transition-colors duration-300">
      <div className="container-custom section-padding py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold gradient-text mb-4">{t('footer.brand')}</h3>
            <p className="text-slate-600 dark:text-gray-300 mb-6">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  {...('external' in social && social.external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">{t('footer.contact')}</h4>
            <div className="space-y-2 text-slate-600 dark:text-gray-300">
              <p>{CONTACT_EMAIL}</p>
              <p>{CONTACT_PHONE}</p>
              <p>
                <a
                  href={CONTACT_MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                >
                  {t('contact.locationValue')}
                </a>
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-slate-200 dark:border-dark-700 mt-8 pt-8 text-center"
        >
          <p className="text-slate-400 flex items-center justify-center">
            © {new Date().getFullYear()} {t('footer.brand')}. {t('footer.madeWith')}{' '}
            <Heart className="text-red-500 mx-2" size={16} fill="currentColor" />
            {t('footer.byPrefix')}
            <Link
              href="/admin"
              className="hover:text-slate-500 dark:hover:text-slate-200 transition-colors duration-200"
            >
              Delmat
            </Link>
            {t('footer.bySuffix')}
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer

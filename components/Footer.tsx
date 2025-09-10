'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart,Phone } from 'lucide-react'

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: 'https://github.com/Delmat237', label: 'Delmat237' },
    { icon: Linkedin, href: 'https://linkedin.com/leonel-azangue', label: 'leonel-azangue' },
    { icon: Mail, href: 'mailto:azangueleonel9@gmail.com', label: 'azangueleonel9@gmail.com' },
    { icon: Phone, href: 'tel:+237657450314', label: '+237 657450314' },
  ]

  const quickLinks = [
    { name: 'Accueil', href: '#home' },
    { name: 'À propos', href: '#about' },
    { name: 'Projets', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <footer className="bg-dark-900 border-t border-dark-700">
      <div className="container-custom section-padding py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold gradient-text mb-4">Portfolio</h3>
            <p className="text-gray-300 mb-6">
              Ingénieur ayant les connaissances et compétences  en Intelligence Artificielle, Cybersécurité et Analyse de Données. Solutions innovantes pour des problèmes complexes.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
            <div className="space-y-2 text-gray-300">
              <p>azangueleonel9@gmail.com</p>
              <p>+237 657 45 03 14</p>
              <p>Yaoundé, Cameroun</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-dark-700 mt-8 pt-8 text-center"
        >
          <p className="text-gray-400 flex items-center justify-center">
            © {new Date().getFullYear()} Portfolio. Fait avec{' '}
            <Heart className="text-red-500 mx-2" size={16} fill="currentColor" />
            par Delmat. Tout droit réservés
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
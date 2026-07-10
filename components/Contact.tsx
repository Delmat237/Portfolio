'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { useState } from 'react'
import { useAppContext } from '@/contexts/Appcontext'
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_TEL } from '@/lib/contact'

const Contact = () => {
  const { t } = useAppContext()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'success' | 'error' | null>(null)
  const [statusMessage, setStatusMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    setStatusMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('success')
        setStatusMessage(t('contact.success'))
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        const errorData = await response.json()
        setStatus('error')
        setStatusMessage(`${t('contact.sendFailed')}: ${errorData.message || t('contact.error')}`)
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error)
      setStatus('error')
      setStatusMessage(t('contact.networkError'))
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: t('contact.email'),
      value: CONTACT_EMAIL,
      href: `mailto:${CONTACT_EMAIL}`
    },
    {
      icon: Phone,
      title: t('contact.phone'),
      value: CONTACT_PHONE,
      href: CONTACT_PHONE_TEL
    },
    {
      icon: MapPin,
      title: t('contact.location'),
      value: t('contact.locationValue'),
      href: '#'
    }
  ]

  return (
    <section id="contact" className="section-padding bg-slate-50/50 dark:bg-dark-800/50 transition-colors duration-300">
      <div className="container-custom mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            {t('contact.title')}<span className="gradient-text">{t('contact.titleHighlight')}</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                {t('contact.contactInfo')}
              </h3>
              <p className="text-slate-600 dark:text-gray-300 mb-8">
                {t('contact.contactInfoDesc')}
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.title}
                  href={info.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-4 p-4 glass-effect rounded-lg hover:bg-white dark:hover:bg-white/10 transition-all duration-200 shadow-sm"
                >
                  <div className="bg-primary-500/20 p-3 rounded-lg">
                    <info.icon className="text-primary-600 dark:text-primary-400" size={24} />
                  </div>
                  <div>
                    <h4 className="text-slate-900 dark:text-white font-semibold">{info.title}</h4>
                    <p className="text-slate-600 dark:text-gray-300">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-effect rounded-2xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              {t('contact.sendMessage')}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-slate-700 dark:text-white font-medium mb-2">
                    {t('contact.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-dark-700 border border-slate-200 dark:border-dark-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-primary-500 transition-colors"
                    placeholder={t('contact.placeholderName')}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-slate-700 dark:text-white font-medium mb-2">
                    {t('contact.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-dark-700 border border-slate-200 dark:border-dark-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-primary-500 transition-colors"
                    placeholder={t('contact.placeholderEmail')}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-slate-700 dark:text-white font-medium mb-2">
                  {t('contact.subject')}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white dark:bg-dark-700 border border-slate-200 dark:border-dark-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder={t('contact.placeholderSubject')}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-slate-700 dark:text-white font-medium mb-2">
                  {t('contact.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white dark:bg-dark-700 border border-slate-200 dark:border-dark-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                  placeholder={t('contact.placeholderMessage')}
                />
              </div>

              {status && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-lg text-center ${status === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                    }`}
                >
                  {statusMessage}
                </motion.div>
              )}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-primary-500 to-purple-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-primary-600 hover:to-purple-600 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <Send size={20} />
                )}
                <span>{loading ? t('contact.sending') : t('contact.send')}</span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact

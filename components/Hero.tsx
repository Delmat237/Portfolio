'use client'

import { motion } from 'framer-motion'
import { ChevronDown, Github, Linkedin, Mail, Phone } from 'lucide-react'
import Image from 'next/image'

const Hero = () => {
  // const { t } = useAppContext()
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">

      {/* Background Animation */}

      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      {/* Particules d'arrière-plan */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-slate-400 dark:bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="container-custom section-padding relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Texte de présentation */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6"
            >
              Salut, je suis{' '}
              <span className="gradient-text block mt-2">Leonel Delmat AZANGUE</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-slate-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto lg:mx-0"
            >
              Élève-Ingénieur en 4ème année de Génie Informatique à l'ENSPY. <br />
              Expert en <span className="text-primary-600 dark:text-primary-400 font-semibold">Intelligence Artificielle</span>, <span className="text-primary-600 dark:text-primary-400 font-semibold">Data Science</span> et <span className="text-primary-600 dark:text-primary-400 font-semibold">Développement Full Stack</span>.
              <br />Je transforme des données complexes en solutions innovantes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-200"
                onClick={() => {
                  const projectsSection = document.getElementById('projects')
                  if (projectsSection) {
                    projectsSection.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
              >
                Voir mes projets
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-200"
                onClick={async () => {
                  try {
                    const response = await fetch('/documents/CV.pdf')
                    const blob = await response.blob()
                    const url = window.URL.createObjectURL(blob)
                    const link = document.createElement('a')
                    link.href = url
                    link.download = 'CV_Leonel_Delmat_AZANGUE.pdf'
                    document.body.appendChild(link)
                    link.click()
                    window.URL.revokeObjectURL(url)
                    document.body.removeChild(link)
                  } catch (error) {
                    console.error('Erreur lors du téléchargement:', error)
                    alert('Le téléchargement a échoué. Veuillez réessayer.')
                  }
                }}
              >
                Télécharger CV
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex items-center justify-center lg:justify-start space-x-6"
            >
              {[
                { icon: Github, href: 'https://github.com/Delmat237', label: 'Delmat237' },
                { icon: Linkedin, href: 'https://linkedin.com/leonel-azangue', label: 'leonel-azangue' },
                { icon: Mail, href: 'mailto:azangueleonel9@gmail.com', label: 'azangueleonel9@gmail.com' },
                { icon: Phone, href: 'tel:+237657450314', label: '+237 657450314' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-slate-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Image de profil */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative mt-12 lg:mt-0"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full blur-2xl opacity-20 -z-10"></div>
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-primary-500/30 overflow-hidden">
              <Image
                src="/images/profile.jpg" // Remplacez par le chemin de votre image
                alt="Leonel Delmat AZANGUE"
                width={320}
                height={320}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Flèche vers le bas */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gray-700 dark:text-white"
          >
            <ChevronDown size={32} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
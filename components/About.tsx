'use client'

import { motion } from 'framer-motion'
import { BrainCircuit, ShieldCheck, Database, Code, Film, Dumbbell, Activity } from 'lucide-react'
import { useAppContext } from '@/contexts/Appcontext'

const About = () => {
  const { t } = useAppContext()

  const features = [
    { icon: BrainCircuit, titleKey: 'about.featureAiTitle', descKey: 'about.featureAiDesc' },
    { icon: ShieldCheck, titleKey: 'about.featureCyberTitle', descKey: 'about.featureCyberDesc' },
    { icon: Database, titleKey: 'about.featureDataTitle', descKey: 'about.featureDataDesc' },
    { icon: Code, titleKey: 'about.featureDevTitle', descKey: 'about.featureDevDesc' },
    { icon: Activity, titleKey: 'about.featureChessTitle', descKey: 'about.featureChessDesc' },
    { icon: Dumbbell, titleKey: 'about.featureSportTitle', descKey: 'about.featureSportDesc' },
  ]

  return (
    <section id="about" className="section-padding bg-slate-50/50 dark:bg-gray-900/50 transition-colors duration-300">
      <div className="container-custom mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            {t('about.title')} <span className="gradient-text">{t('about.titleHighlight')}</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-gray-300 max-w-3xl mx-auto">
            <span className="font-semibold text-primary-400">{t('about.subtitle')}</span>
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative group flex justify-center md:justify-start"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl blur-xl opacity-10 dark:opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-gray-700/50 w-full max-w-sm mx-auto md:mx-0 h-[300px] sm:h-[400px] md:h-auto">
              <img
                alt="Profil"
                src="/images/profile.png"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-base md:text-lg text-slate-600 dark:text-gray-300 leading-relaxed">
              {t('about.paragraph1')}
            </p>

            <p className="text-base md:text-lg text-slate-600 dark:text-gray-300 leading-relaxed">
              {t('about.paragraph2')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.titleKey}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-3 p-4 rounded-xl glass-effect hover:bg-white dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="bg-primary-500/10 p-2 rounded-lg flex-shrink-0">
                    <feature.icon className="text-primary-400" size={20} />
                  </div>
                  <div>
                    <h3 className="text-slate-900 dark:text-white font-semibold mb-1">
                      {t(feature.titleKey)}
                    </h3>
                    <p className="text-slate-400 text-sm">{t(feature.descKey)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center bg-white dark:bg-gray-800/50 px-6 py-3 rounded-full border border-slate-200 dark:border-gray-700/50 text-sm sm:text-base shadow-sm">
            <Film className="text-purple-400 mr-2" size={20} />
            <span className="text-slate-600 dark:text-gray-300">
              {t('about.hobby')}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

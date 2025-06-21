'use client'

import { motion } from 'framer-motion'
import { BrainCircuit, ShieldCheck, Database, Code, Film, Dumbbell, Activity } from 'lucide-react'

const About = () => {
  const features = [
    {
      icon: BrainCircuit,
      title: 'Intelligence Artificielle',
      description: 'Développement de modèles de ML/DL et recherche en IA'
    },
    {
      icon: ShieldCheck,
      title: 'Cybersécurité',
      description: 'Pentesting, sécurisation des systèmes et cryptographie'
    },
    {
      icon: Database,
      title: 'Science des Données',
      description: 'Analyse de données complexes et visualisations avancées'
    },
    {
      icon: Code,
      title: 'Développement',
      description: 'Applications full-stack avec architectures modernes'
    },
    {
      icon: Activity, 
      title: 'Stratégie & Échecs',
      description: 'Pratique compétitive pour aiguiser ma pensée analytique'
    },
    {
      icon: Dumbbell,
      title: 'Sport & Fitness',
      description: 'Activité physique quotidienne pour équilibre mental'
    }
  ]

  return (
    <section id="about" className="section-padding bg-dark-800/50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Mon <span className="gradient-text">Parcours</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            <span className="font-semibold text-primary-400">Élève-ingénieur en Génie Informatique</span> à l'ENSPY, 
            titulaire d'une licence en Mathématiques .
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Photo de profil avec effet */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative overflow-hidden rounded-2xl border border-gray-700/50">
              <img
                alt="Profil"
                src="/images/profile.jpg"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>

          {/* Contenu texte */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-gray-300 text-lg leading-relaxed">
              Passionné par les <span className="text-primary-400">technologies émergentes</span>, je me spécialise dans 
              l'intersection entre l'IA, la cybersécurité et la science des données. Mon objectif est de développer 
              des solutions innovantes pour résoudre des problèmes sociétaux complexes.
            </p>
            
            <p className="text-gray-300 text-lg leading-relaxed">
              Mon parcours en <span className="text-purple-400">mathématiques</span> me donne une approche analytique 
              unique pour aborder les défis technologiques, tandis que ma pratique des échecs renforce ma capacité 
              à anticiper les problèmes et élaborer des stratégies efficaces.
            </p>

            {/* Grille de compétences */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-3 p-4 rounded-xl glass-effect hover:bg-dark-700/50 transition-colors"
                >
                  <div className="bg-primary-500/10 p-2 rounded-lg flex-shrink-0">
                    <feature.icon className="text-primary-400" size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Section loisirs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center bg-dark-700/50 px-6 py-3 rounded-full border border-gray-700/50">
            <Film className="text-purple-400 mr-2" size={20} />
            <span className="text-gray-300">
              Cinéphile - particulièrement intéressé par les films de sci-fi et les documentaires tech
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
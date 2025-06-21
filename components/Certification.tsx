'use client'

import { motion } from 'framer-motion'
import { FileText, ExternalLink } from 'lucide-react'
import certificationData from '@/data/certificat'


const Certifications = () => {
  const certifications = certificationData
  return (
    <div className="min-h-screen bg-dark-900">
   
      
      <section id="certifications" className="section-padding bg-dark-800/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Mes <span className="gradient-text">Certifications</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Mes acquis académiques et professionnels qui attestent de mes compétences
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((certification, index) => (
              <motion.div
                key={certification.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-effect rounded-2xl overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={certification.image}
                    alt={certification.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <div className="flex space-x-4">
                      <motion.a
                        href={certification.file}
                        download
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition-colors"
                        title="Télécharger le certificat"
                      >
                        <FileText size={20} />
                      </motion.a>
                      <motion.a
                        href={certification.reference}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition-colors"
                        title="Vérifier en ligne"
                      >
                        <ExternalLink size={20} />
                      </motion.a>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {certification.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    <span className="font-medium">Source: </span>
                    {certification.source}
                  </p>
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                    {certification.description}
                  </p>
                  <a
                    href={certification.reference}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-400 hover:text-primary-300 text-xs font-medium inline-flex items-center"
                  >
                    Vérifier cette certification
                    <ExternalLink size={14} className="ml-1" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

   
    </div>
  )
}

export default Certifications
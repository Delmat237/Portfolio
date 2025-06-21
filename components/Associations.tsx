'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import associationData from '@/data/association'

const Associations = () => {
  const associations = associationData;

  return (
    <section id="associations" className="section-padding bg-dark-800/50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Mon <span className="gradient-text">Engagement</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Découvrez les associations et causes que je soutiens, témoignant de mon engagement envers la communauté
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {associations.map((association, index) => (
            <motion.div
                        key={association.title}
                        className="glass-effect rounded-2xl overflow-hidden group hover:scale-105 transition-transform duration-300"
                        >
                        <div className="relative overflow-hidden h-48">
                            {/* Carrousel d'images */}
                            <div className="relative h-full w-full overflow-hidden">
                            {association.images.map((img, imgIndex) => (
                                <motion.img
                                key={imgIndex}
                                src={img}
                                alt={`${association.title} ${imgIndex + 1}`}
                                className="absolute inset-0 w-full h-full object-cover"
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: [0, 1, 1, 0],
                                    transition: {
                                    duration: 20,
                                    delay: imgIndex * 5,
                                    repeat: Infinity,
                                    repeatDelay: (association.images.length - 1) * 5
                                    }
                                }}
                                />
                            ))}
                            </div>
                {association.link && (
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <div className="flex space-x-4">
                      <motion.a
                        href={association.link}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={20} />
                      </motion.a>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">
                  {association.title}
                </h3>
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                  {association.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {association.roles.map((role) => (
                    <span
                      key={role}
                      className="bg-primary-500/20 text-primary-300 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {role}
                    </span>
                  ))}
                </div>
                {association.duration && (
                  <p className="mt-4 text-xs text-gray-400">
                    {association.duration}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Associations
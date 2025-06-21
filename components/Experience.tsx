'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin } from 'lucide-react'
//import  experienceData from '@/data/experience'

const Experience = () => {
  //const experiences = experienceData
  const experiences  = [
    {
          title: '',
          company: '',
          location: '',
          period: '',
          description: [
          ]
        }
  ]

  return (
    <section id="experience" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Mon <span className="gradient-text">Expérience</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Parcours professionnel et expériences qui ont façonné mes compétences
            en développement web
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative mb-12 last:mb-0"
            >
              {/* Timeline line */}
              {index !== experiences.length - 1 && (
                <div className="absolute left-8 top-16 w-0.5 h-full bg-gradient-to-b from-primary-500 to-purple-500"></div>
              )}

              <div className="flex items-start space-x-6">
                {/* Timeline dot */}
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-full"></div>
                </div>

                {/* Content */}
                <div className="flex-1 glass-effect rounded-2xl p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {exp.title}
                      </h3>
                      <h4 className="text-xl text-primary-400 font-semibold">
                        {exp.company}
                      </h4>
                    </div>
                    <div className="flex flex-col md:items-end space-y-2 mt-2 md:mt-0">
                      <div className="flex items-center text-gray-300">
                        <Calendar size={16} className="mr-2" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <MapPin size={16} className="mr-2" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {exp.description.map((item, itemIndex) => (
                      <motion.li
                        key={itemIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: index * 0.2 + itemIndex * 0.1 
                        }}
                        viewport={{ once: true }}
                        className="text-gray-300 flex items-start"
                      >
                        <span className="text-primary-400 mr-3 mt-2">•</span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
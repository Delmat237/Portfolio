'use client'

import { motion } from 'framer-motion'
import { Trophy, Award, Calendar, Users, ExternalLink } from 'lucide-react'
import competitionData from '@/data/competition'

const Competitions = () => {
  const competitions = competitionData;

  return (
    <div className="min-h-screen bg-dark-900">
     
      
      <section id="competitions" className="section-padding bg-dark-800/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Mes <span className="gradient-text">Compétitions</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Mes participations et résultats dans diverses compétitions techniques et hackathons
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {competitions.map((competition, index) => (
              <motion.div
                key={competition.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-effect rounded-2xl overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={competition.image}
                    alt={competition.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <div className="flex space-x-4">
                      <motion.a
                        href={competition.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition-colors"
                        title="Voir les détails"
                      >
                        <ExternalLink size={20} />
                      </motion.a>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white">
                      {competition.title}
                    </h3>
                    {competition.position && (
                      <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center ${
                        competition.position.includes("1ère") ? "bg-yellow-500/20 text-yellow-400" :
                        competition.position.includes("2ème") ? "bg-gray-500/20 text-gray-400" :
                        competition.position.includes("3ème") ? "bg-amber-700/20 text-amber-500" :
                        "bg-purple-500/20 text-purple-400"
                      }`}>
                        {competition.position.includes("ère") || competition.position.includes("ème") ? (
                          <Trophy size={14} className="mr-1" />
                        ) : (
                          <Award size={14} className="mr-1" />
                        )}
                        {competition.position}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                    {competition.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {competition.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-primary-500/20 text-primary-300 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {competition.date}
                    </div>
                    <div className="flex items-center">
                      <Users size={14} className="mr-1" />
                      {competition.team}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


    </div>
  )
}

export default Competitions
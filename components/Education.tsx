'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';
import educationData from '@/data/education'

const educations = educationData;

export default function Education() {
  return (
    <section id="education" className="py-20 px-6">

      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Formation
          </h2>
          <p className="text-xl text-slate-600 dark:text-gray-300 max-w-3xl mx-auto">
            Mon parcours éducatif et mes formations continues pour rester à jour avec les dernières technologies
          </p>
        </motion.div>

        <div className="space-y-8">
          {educations.map((education, index) => (
            <motion.div
              key={education.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-slate-100/50 dark:bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 dark:border-white/20 hover:border-slate-300 dark:hover:border-white/30 transition-all duration-300 shadow-sm hover:shadow-md">
                <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6">
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center mb-4 lg:mb-0 ${education.status === 'Terminé'
                    ? 'bg-green-600/20 text-green-400'
                    : education.status === 'En cours'
                      ? 'bg-blue-600/20 text-blue-400'
                      : 'bg-yellow-600/20 text-yellow-400'
                    }`}>
                    <GraduationCap size={24} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                          {education.title}
                        </h3>
                        <p className="text-primary-600 dark:text-blue-300 text-lg font-medium mb-1">
                          {education.institution}
                        </p>
                        <div className="flex items-center space-x-4 text-slate-500 dark:text-gray-400 text-sm">
                          <div className="flex items-center space-x-1">
                            <Calendar size={14} />
                            <span>{education.period}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin size={14} />
                            <span>{education.location}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end space-y-2 mt-4 sm:mt-0">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${education.status === 'Terminé'
                          ? 'bg-green-600/20 text-green-400'
                          : education.status === 'En cours'
                            ? 'bg-blue-600/20 text-blue-400'
                            : 'bg-yellow-600/20 text-yellow-400'
                          }`}>
                          {education.status}
                        </span>
                        {education.grade !== 'À venir' && education.grade !== 'En cours' && (
                          <div className="flex items-center space-x-1 text-yellow-400">
                            <Award size={14} />
                            <span className="text-sm">{education.grade}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-slate-600 dark:text-gray-300 mb-4 leading-relaxed">
                      {education.description}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {education.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-slate-200/50 dark:bg-white/10 text-slate-700 dark:text-white rounded-full text-sm border border-slate-200 dark:border-white/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline connector */}
              {index < educations.length - 1 && (
                <div className="absolute left-8 top-24 w-0.5 h-8 bg-gradient-to-b from-white/30 to-transparent"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
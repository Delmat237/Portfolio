'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { useAppContext } from '@/contexts/Appcontext'
import { useProjects } from '@/hooks/useProjects'
import MarkdownContent from '@/components/MarkdownContent'

const FILTER_ALL = '__all__'

const Projects = () => {
  const { t } = useAppContext()
  const { projects: projectData, loading } = useProjects()
  const categoryNames = Array.from(new Set(projectData.map((p) => p.category).filter(Boolean)))
  const categories = [
    { key: FILTER_ALL, label: t('projects.filterAll') },
    ...categoryNames.map((name) => ({ key: name, label: name })),
  ]
  const [activeCategory, setActiveCategory] = useState(FILTER_ALL)

  const projects =
    activeCategory === FILTER_ALL
      ? projectData
      : projectData.filter((project) => project.category === activeCategory)

  return (
    <section id="projects" className="section-padding bg-slate-100/50 dark:bg-dark-800/50 transition-colors duration-300">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            {t('projects.title')} <span className="gradient-text">{t('projects.titleHighlight')}</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('projects.description')}
          </p>
        </motion.div>

        {loading && (
          <p className="text-center text-slate-500 dark:text-gray-400 mb-8">Chargement des projets…</p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === category.key
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                  : 'glass-effect text-slate-600 dark:text-gray-300 hover:text-primary-500'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id ?? project.title}
              layout
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-effect rounded-2xl overflow-hidden group hover:scale-105 transition-transform duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 z-10">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md ${project.status === 'Terminé'
                    ? 'bg-green-500/80 text-white'
                    : project.status === 'En cours'
                      ? 'bg-blue-500/80 text-white'
                      : 'bg-yellow-500/80 text-white'
                    }`}>
                    {project.status}
                  </span>
                </div>
                {project.tag && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md bg-purple-500/80 text-white">
                      {project.tag}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 dark:from-dark-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <div className="flex space-x-4">
                    <motion.a
                      href={project.github}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition-colors"
                      title={t('projects.viewCode')}
                    >
                      <Github size={20} />
                    </motion.a>
                    <motion.a
                      href={project.demo}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition-colors"
                      title={t('projects.liveDemo')}
                    >
                      <ExternalLink size={20} />
                    </motion.a>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {project.title}
                </h3>
                <div className="mb-4">
                  <MarkdownContent content={project.description} />
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-primary-500/20 text-primary-300 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects

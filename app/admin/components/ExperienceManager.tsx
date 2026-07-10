'use client'

import { motion } from 'framer-motion'
import { Plus, Edit, Trash2 } from 'lucide-react'

import type { Experience } from '@/data/types'

type ExperienceManagerProps = {
  experiences: Experience[]
  onDelete: (id: number) => void
  setShowForm: (show: boolean) => void
  setEditingExperience: (experience: Experience | null) => void
}

export default function ExperienceManager({
  experiences,
  onDelete,
  setShowForm,
  setEditingExperience,
}: ExperienceManagerProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Gestion des Expériences</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={18} />
          <span>Nouvelle expérience</span>
        </button>
      </div>

      <div className="space-y-4">
        {experiences.map((experience) => (
          <motion.div
            key={experience.id ?? experience.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-100 dark:bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-slate-200 dark:border-white/20"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{experience.title}</h3>
                <p className="text-blue-600 dark:text-blue-300">{experience.company}</p>
                <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">
                  {experience.period} · {experience.location}
                </p>
                <ul className="mt-3 space-y-1 text-sm text-slate-600 dark:text-gray-300">
                  {experience.description.map((line) => (
                    <li key={line}>• {line}</li>
                  ))}
                </ul>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setEditingExperience(experience)
                    setShowForm(true)
                  }}
                  className="p-2 text-blue-400 hover:text-blue-300"
                  title="Modifier"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => experience.id && onDelete(experience.id)}
                  className="p-2 text-red-400 hover:text-red-300"
                  title="Supprimer"
                  disabled={!experience.id}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

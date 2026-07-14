'use client'

import { motion } from 'framer-motion'
import { Plus, Edit, Trash2 } from 'lucide-react'

import type { Competition } from '@/data/types'
import MarkdownContent from '@/components/MarkdownContent'

type CompetitionsManagerProps = {
  competitions: Competition[]
  onDelete: (id: number) => void
  setShowForm: (show: boolean) => void
  setEditingCompetition: (competition: Competition | null) => void
}

export default function CompetitionsManager({
  competitions,
  onDelete,
  setShowForm,
  setEditingCompetition,
}: CompetitionsManagerProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Gestion des Compétitions</h2>
        <button
          onClick={() => {
            setEditingCompetition(null)
            setShowForm(true)
          }}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={18} />
          <span>Nouvelle compétition</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {competitions.map((competition) => (
          <motion.div
            key={competition.id ?? competition.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-100 dark:bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden border border-slate-200 dark:border-white/20"
          >
            {competition.image && (
              <img
                src={competition.image}
                alt={competition.title}
                className="w-full h-36 object-cover"
              />
            )}
            <div className="p-6">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{competition.title}</h3>
                  <p className="text-blue-600 dark:text-blue-300 font-medium">{competition.position}</p>
                  <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">
                    {competition.date} · {competition.team}
                  </p>
                  <div className="mt-3 line-clamp-4">
                    <MarkdownContent content={competition.description} />
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {competition.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-blue-600/30 text-blue-300 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-2 shrink-0">
                  <button
                    onClick={() => {
                      setEditingCompetition(competition)
                      setShowForm(true)
                    }}
                    className="p-2 text-blue-400 hover:text-blue-300"
                    title="Modifier"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => competition.id && onDelete(competition.id)}
                    className="p-2 text-red-400 hover:text-red-300"
                    title="Supprimer"
                    disabled={!competition.id}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

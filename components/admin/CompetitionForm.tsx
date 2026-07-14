'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Plus, Trash2 } from 'lucide-react'
import { useForm } from 'react-hook-form'

import ImageInput from '@/components/admin/ImageInput'
import type { Competition } from '@/data/types'

interface CompetitionFormProps {
  competition?: Competition | null
  onSave: (competition: Competition) => void
  onClose: () => void
}

export default function CompetitionForm({ competition, onSave, onClose }: CompetitionFormProps) {
  const [technologies, setTechnologies] = useState<string[]>(competition?.technologies ?? [])
  const [newTech, setNewTech] = useState('')
  const [imagePreview, setImagePreview] = useState(competition?.image ?? '')

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: (competition || {}) as Partial<Competition>,
  })

  const onSubmit = (data: Partial<Competition>) => {
    onSave({
      ...(competition || {}),
      id: competition?.id,
      title: data.title || '',
      position: data.position || '',
      description: data.description || '',
      date: data.date || '',
      team: data.team || '',
      technologies,
      link: data.link || '#',
      image: imagePreview,
    })
  }

  const addTechnology = () => {
    const tech = newTech.trim()
    if (tech && !technologies.includes(tech)) {
      setTechnologies([...technologies, tech])
      setNewTech('')
    }
  }

  const removeTechnology = (tech: string) => {
    setTechnologies(technologies.filter((t) => t !== tech))
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-white/20 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {competition ? 'Modifier la compétition' : 'Nouvelle compétition'}
          </h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white transition-colors" title="Fermer">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-slate-700 dark:text-white mb-2">Titre</label>
            <input
              {...register('title', { required: 'Le titre est requis' })}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/20 rounded-lg text-slate-900 dark:text-white"
            />
            {typeof errors.title?.message === 'string' && (
              <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 dark:text-white mb-2">Classement / Position</label>
              <input
                {...register('position')}
                placeholder="Ex: 1er Prix, 2ème place"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/20 rounded-lg text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-slate-700 dark:text-white mb-2">Date / Année</label>
              <input
                {...register('date')}
                placeholder="Ex: 2025"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/20 rounded-lg text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-white mb-2">Équipe</label>
            <input
              {...register('team')}
              placeholder="Ex: Équipe Les Avengers"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/20 rounded-lg text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-white mb-2">Description</label>
            <textarea
              {...register('description', { required: 'La description est requise' })}
              rows={6}
              placeholder={'Markdown supporté : **gras**, *liste*, # titre, retour à la ligne'}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/20 rounded-lg text-slate-900 dark:text-white resize-none font-mono text-sm"
            />
            <p className="text-slate-500 dark:text-gray-400 text-xs mt-1">
              Markdown : **gras**, *italique*, # titre, - liste, retour à la ligne
            </p>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-white mb-2">Lien (GitHub, LinkedIn…)</label>
            <input
              {...register('link')}
              placeholder="https://..."
              className="w-full px-4 py-3 bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/20 rounded-lg text-slate-900 dark:text-white"
            />
          </div>

          <ImageInput
            value={imagePreview}
            onChange={setImagePreview}
            label="Image"
          />

          <div>
            <label className="block text-slate-700 dark:text-white mb-2">Technologies</label>
            <div className="flex space-x-2 mb-3">
              <input
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                className="flex-1 px-4 py-2 bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/20 rounded-lg text-slate-900 dark:text-white"
                placeholder="Ajouter une technologie"
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
              />
              <button type="button" onClick={addTechnology} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                <Plus size={18} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="flex items-center space-x-2 px-3 py-1 bg-blue-600/30 text-blue-300 rounded-full text-sm"
                >
                  <span>{tech}</span>
                  <button type="button" onClick={() => removeTechnology(tech)} className="text-red-400 hover:text-red-300">
                    <Trash2 size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium">
              {competition ? 'Mettre à jour' : 'Créer'}
            </button>
            <button type="button" onClick={onClose} className="px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-lg">
              Annuler
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

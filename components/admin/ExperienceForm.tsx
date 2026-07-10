'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Plus, Trash2 } from 'lucide-react'
import { useForm } from 'react-hook-form'

import type { Experience } from '@/data/types'

interface ExperienceFormProps {
  experience?: Experience | null
  onSave: (experience: Experience) => void
  onClose: () => void
}

export default function ExperienceForm({ experience, onSave, onClose }: ExperienceFormProps) {
  const [description, setDescription] = useState<string[]>(experience?.description ?? [])
  const [newLine, setNewLine] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: (experience || {}) as Partial<Experience>,
  })

  const onSubmit = (data: Partial<Experience>) => {
    onSave({
      ...(experience || {}),
      ...data,
      id: experience?.id,
      title: data.title || '',
      company: data.company || '',
      location: data.location || '',
      period: data.period || '',
      description,
    })
  }

  const addLine = () => {
    const line = newLine.trim()
    if (line && !description.includes(line)) {
      setDescription([...description, line])
      setNewLine('')
    }
  }

  const removeLine = (line: string) => {
    setDescription(description.filter((item) => item !== line))
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
            {experience ? 'Modifier l\'expérience' : 'Nouvelle expérience'}
          </h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white transition-colors" title="Fermer">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-slate-700 dark:text-white mb-2">Intitulé du poste</label>
            <input
              {...register('title', { required: 'Le titre est requis' })}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/20 rounded-lg text-slate-900 dark:text-white"
            />
            {typeof errors.title?.message === 'string' && (
              <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-slate-700 dark:text-white mb-2">Entreprise / Organisation</label>
            <input
              {...register('company', { required: 'L\'entreprise est requise' })}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/20 rounded-lg text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 dark:text-white mb-2">Lieu</label>
              <input
                {...register('location')}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/20 rounded-lg text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-slate-700 dark:text-white mb-2">Période</label>
              <input
                {...register('period', { required: 'La période est requise' })}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/20 rounded-lg text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-white mb-2">Points clés</label>
            <div className="flex space-x-2 mb-3">
              <input
                value={newLine}
                onChange={(e) => setNewLine(e.target.value)}
                className="flex-1 px-4 py-2 bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/20 rounded-lg text-slate-900 dark:text-white"
                placeholder="Ajouter une ligne de description"
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addLine())}
              />
              <button type="button" onClick={addLine} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                <Plus size={18} />
              </button>
            </div>
            <div className="space-y-2">
              {description.map((line) => (
                <div key={line} className="flex items-start justify-between gap-3 p-3 bg-slate-50 dark:bg-white/5 rounded-lg">
                  <span className="text-slate-700 dark:text-gray-200 text-sm">{line}</span>
                  <button type="button" onClick={() => removeLine(line)} className="text-red-400 hover:text-red-300">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium">
              {experience ? 'Mettre à jour' : 'Créer'}
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

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface EducationFormProps {
  education?: any;
  onSave: (education: any) => void;
  onClose: () => void;
}

export default function EducationForm({ education, onSave, onClose }: EducationFormProps) {
  const [skills, setSkills] = useState(education?.skills || []);
  const [newSkill, setNewSkill] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: education || {}
  });

  const onSubmit = (data: any) => {
    const educationData = {
      ...data,
      skills
    };
    onSave(educationData);
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s: string) => s !== skill));
  };

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
            {education ? 'Modifier la Formation' : 'Nouvelle Formation'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white transition-colors"
            title="Fermer"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Titre */}
          <div>
            <label className="block text-slate-700 dark:text-white mb-2">Titre de la formation</label>
            <input
              {...register('title', { required: 'Le titre est requis' })}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/20 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
              placeholder="Ex: Master en Informatique"
            />
            {errors.title && typeof errors.title.message === 'string' && (
              <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Institution */}
          <div>
            <label className="block text-slate-700 dark:text-white mb-2">Institution</label>
            <input
              {...register('institution', { required: 'L\'institution est requise' })}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/20 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
              placeholder="Ex: Université de Technologie"
            />
            {errors.institution && typeof errors.institution.message === 'string' && (
              <p className="text-red-400 text-sm mt-1">{errors.institution.message}</p>
            )}
          </div>

          {/* Localisation */}
          <div>
            <label className="block text-slate-700 dark:text-white mb-2">Localisation</label>
            <input
              {...register('location')}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/20 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
              placeholder="Ex: Paris, France"
            />
          </div>

          {/* Période */}
          <div>
            <label className="block text-slate-700 dark:text-white mb-2">Période</label>
            <input
              {...register('period', { required: 'La période est requise' })}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/20 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
              placeholder="Ex: 2020-2022"
            />
            {errors.period && typeof errors.period.message === 'string' && (
              <p className="text-red-400 text-sm mt-1">{errors.period.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-slate-700 dark:text-white mb-2">Description</label>
            <textarea
              {...register('description', { required: 'La description est requise' })}
              rows={4}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/20 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 resize-none"
              placeholder="Décrivez la formation..."
            />
            {errors.description && typeof errors.description.message === 'string' && (
              <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Mention/Grade */}
          <div>
            <label className="block text-slate-700 dark:text-white mb-2">Mention/Grade</label>
            <input
              {...register('grade')}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/20 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
              placeholder="Ex: Mention Très Bien"
            />
          </div>

          {/* Compétences acquises */}
          <div>
            <label className="block text-slate-700 dark:text-white mb-2">Compétences acquises</label>
            <div className="flex space-x-2 mb-3">
              <input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="flex-1 px-4 py-2 bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/20 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                placeholder="Ex: React"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
              />
              <button
                type="button"
                onClick={addSkill}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                title="Ajouter la compétence"
              >
                <Plus size={18} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill: string) => (
                <span
                  key={skill}
                  className="flex items-center space-x-2 px-3 py-1 bg-blue-600/30 text-blue-300 rounded-full text-sm"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="text-blue-300 hover:text-white"
                    title={`Supprimer la compétence ${skill}`}
                  >
                    <Trash2 size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Statut */}
          <div>
            <label className="block text-slate-700 dark:text-white mb-2">Statut</label>
            <select
              {...register('status')}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/20 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
            >
              <option value="En cours" className="bg-white dark:bg-gray-800 text-slate-900 dark:text-white">En cours</option>
              <option value="Terminé" className="bg-white dark:bg-gray-800 text-slate-900 dark:text-white">Terminé</option>
              <option value="Planifié" className="bg-white dark:bg-gray-800 text-slate-900 dark:text-white">Planifié</option>
              <option value="Abandonné" className="bg-white dark:bg-gray-800 text-slate-900 dark:text-white">Abandonné</option>
            </select>
          </div>

          {/* Boutons */}
          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors font-medium"
            >
              {education ? 'Mettre à jour' : 'Créer la formation'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors"
            >
              Annuler
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
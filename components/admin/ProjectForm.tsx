'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, Plus, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface ProjectFormProps {
  project?: any;
  onSave: (project: any) => void;
  onClose: () => void;
}

export default function ProjectForm({ project, onSave, onClose }: ProjectFormProps) {
  const [technologies, setTechnologies] = useState(project?.technologies || []);
  const [newTech, setNewTech] = useState('');
  const [imagePreview, setImagePreview] = useState(project?.image || '');

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: project || {}
  });

  const onSubmit = (data: any) => {
    const projectData = {
      ...data,
      technologies,
      image: imagePreview
    };
    onSave(projectData);
  };

  const addTechnology = () => {
    if (newTech.trim() && !technologies.includes(newTech.trim())) {
      setTechnologies([...technologies, newTech.trim()]);
      setNewTech('');
    }
  };

  const removeTechnology = (tech: string) => {
    setTechnologies(technologies.filter((t: string) => t !== tech));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
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
            {project ? 'Modifier le Projet' : 'Nouveau Projet'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white transition-colors"
            title="Fermer"
            aria-label="Fermer"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Titre */}
          <div>
            <label className="block text-slate-700 dark:text-white mb-2">Titre du projet</label>
            <input
              {...register('title', { required: 'Le titre est requis' })}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/20 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
              placeholder="Ex: E-commerce Platform"
            />
            {typeof errors.title?.message === 'string' && (
              <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-slate-700 dark:text-white mb-2">Description</label>
            <textarea
              {...register('description', { required: 'La description est requise' })}
              rows={4}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/20 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 resize-none"
              placeholder="Décrivez votre projet..."
            />
            {typeof errors.description?.message === 'string' && (
              <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Technologies */}
          <div>
            <label className="block text-slate-700 dark:text-white mb-2">Technologies</label>
            <div className="flex space-x-2 mb-3">
              <input
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                className="flex-1 px-4 py-2 bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/20 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                placeholder="Ex: React"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
              />
              <button
                type="button"
                onClick={addTechnology}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                title="Ajouter la technologie"
                aria-label="Ajouter la technologie"
              >
                <Plus size={18} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech: string) => (
                <span
                  key={tech}
                  className="flex items-center space-x-2 px-3 py-1 bg-blue-600/30 text-blue-300 rounded-full text-sm"
                >
                  <span>{tech}</span>
                  <button
                    type="button"
                    onClick={() => removeTechnology(tech)}
                    className="text-blue-300 hover:text-white"
                    title={`Supprimer ${tech}`}
                    aria-label={`Supprimer ${tech}`}
                  >
                    <Trash2 size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Image */}
          <div>
            <label className="block text-slate-700 dark:text-white mb-2">Image du projet</label>
            <div className="space-y-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="flex items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:border-white/40 transition-colors"
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-center">
                    <Upload className="mx-auto mb-2 text-slate-400" size={24} />
                    <p className="text-slate-400">Cliquez pour uploader une image</p>
                  </div>
                )}
              </label>
              <input
                {...register('imageUrl')}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/20 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                placeholder="Ou collez une URL d'image"
                onChange={(e) => setImagePreview(e.target.value)}
              />
            </div>
          </div>

          {/* URL du projet */}
          <div>
            <label className="block text-slate-700 dark:text-white mb-2">URL du projet (optionnel)</label>
            <input
              {...register('url')}
              type="url"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/20 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
              placeholder="https://mon-projet.com"
            />
          </div>

          {/* URL GitHub */}
          <div>
            <label className="block text-slate-700 dark:text-white mb-2">URL GitHub (optionnel)</label>
            <input
              {...register('github')}
              type="url"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/20 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
              placeholder="https://github.com/username/repo"
            />
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
              <option value="En pause" className="bg-white dark:bg-gray-800 text-slate-900 dark:text-white">En pause</option>
              <option value="Planifié" className="bg-white dark:bg-gray-800 text-slate-900 dark:text-white">Planifié</option>
            </select>
          </div>

          {/* Boutons */}
          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors font-medium"
            >
              {project ? 'Mettre à jour' : 'Créer le projet'}
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
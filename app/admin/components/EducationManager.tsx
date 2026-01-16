'use client'
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2 } from 'lucide-react';

type EducationManagerProps = {
  educations: any[];
  onDelete: (id: number) => void;
  showForm: boolean;
  setShowForm: (show: boolean) => void;
  editingEducation: any;
  setEditingEducation: (education: any) => void;
};

export default function EducationManager({ educations, onDelete, showForm, setShowForm, editingEducation, setEditingEducation }: EducationManagerProps) {

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Gestion des Formations</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={18} />
          <span>Nouvelle Formation</span>
        </button>
      </div>

      <div className="space-y-4">
        {educations.map((education) => (
          <motion.div
            key={education.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-100 dark:bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-slate-200 dark:border-white/20"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-1">{education.title}</h3>
                <p className="text-blue-600 dark:text-blue-300 mb-2">{education.institution}</p>
                <p className="text-slate-600 dark:text-gray-300 mb-3">{education.description}</p>
                <div className="flex items-center space-x-4">
                  <span className="text-slate-400 text-sm">{education.period}</span>
                  <span className={`px-2 py-1 rounded text-xs ${education.status === 'Terminé'
                    ? 'bg-green-600/30 text-green-300'
                    : 'bg-yellow-600/30 text-yellow-300'
                    }`}>
                    {education.status}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setEditingEducation(education);
                    setShowForm(true);
                  }}
                  className="p-2 text-blue-400 hover:text-blue-300"
                  title="Modifier la formation"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => onDelete(education.id)}
                  className="p-2 text-red-400 hover:text-red-300"
                  title="Supprimer la formation"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
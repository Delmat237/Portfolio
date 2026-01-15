'use client'
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2 } from 'lucide-react';

type ProjectsManagerProps = {
  projects: any[];
  onDelete: (id: number) => void;
  showForm: boolean;
  setShowForm: (show: boolean) => void;
  editingProject: any;
  setEditingProject: (project: any) => void;
};

export default function ProjectsManager({ projects, onDelete, showForm, setShowForm, editingProject, setEditingProject }: ProjectsManagerProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Gestion des Projets</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={18} />
          <span>Nouveau Projet</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-32 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
            <p className="text-gray-300 mb-3 text-sm">{project.description}</p>
            <div className="flex flex-wrap gap-1 mb-4">
              {project.technologies.map((tech: string) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-blue-600/30 text-blue-300 rounded text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <span className={`px-2 py-1 rounded text-xs ${project.status === 'Terminé'
                  ? 'bg-green-600/30 text-green-300'
                  : 'bg-yellow-600/30 text-yellow-300'
                }`}>
                {project.status}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setEditingProject(project);
                    setShowForm(true);
                  }}
                  className="p-1 text-blue-400 hover:text-blue-300"
                  title="Modifier le projet"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => onDelete(project.id)}
                  className="p-1 text-red-400 hover:text-red-300"
                  title="Supprimer le projet"
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
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, CheckCircle, AlertCircle, Calendar, 
  TrendingUp, Users, Target, Plus, Edit, Trash2 
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import styles from './ProjectTracker.module.css';

export default function ProjectTracker() {
  const [projects] = useState([
    {
      id: 1,
      title: "E-commerce Platform",
      status: "En cours",
      progress: 75,
      startDate: new Date('2023-10-01'),
      endDate: new Date('2024-01-15'),
      priority: "Haute",
      team: ["John Doe", "Jane Smith"],
      tasks: [
        { id: 1, title: "Setup initial project", completed: true, dueDate: new Date('2023-10-05') },
        { id: 2, title: "Design UI/UX", completed: true, dueDate: new Date('2023-10-20') },
        { id: 3, title: "Implement authentication", completed: true, dueDate: new Date('2023-11-10') },
        { id: 4, title: "Product catalog", completed: false, dueDate: new Date('2023-12-01') },
        { id: 5, title: "Payment integration", completed: false, dueDate: new Date('2023-12-15') },
        { id: 6, title: "Testing & deployment", completed: false, dueDate: new Date('2024-01-10') }
      ],
      milestones: [
        { id: 1, title: "MVP Ready", date: new Date('2023-11-30'), completed: false },
        { id: 2, title: "Beta Testing", date: new Date('2023-12-20'), completed: false },
        { id: 3, title: "Production Launch", date: new Date('2024-01-15'), completed: false }
      ]
    },
    {
      id: 2,
      title: "Mobile App Development",
      status: "Planifié",
      progress: 10,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-04-30'),
      priority: "Moyenne",
      team: ["Alice Johnson"],
      tasks: [
        { id: 1, title: "Research & Planning", completed: true, dueDate: new Date('2024-01-10') },
        { id: 2, title: "Wireframes", completed: false, dueDate: new Date('2024-01-20') },
        { id: 3, title: "Development Setup", completed: false, dueDate: new Date('2024-02-01') }
      ],
      milestones: [
        { id: 1, title: "Design Complete", date: new Date('2024-02-15'), completed: false },
        { id: 2, title: "Alpha Version", date: new Date('2024-03-30'), completed: false }
      ]
    }
  ]);

 const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [progressWidth, setProgressWidth] = useState(0);


    useEffect(() => {
    // Animation de la barre de progression
    setProgressWidth(selectedProject.progress);
  }, [selectedProject]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Terminé': return 'text-green-400 bg-green-400/20';
      case 'En cours': return 'text-blue-400 bg-blue-400/20';
      case 'En pause': return 'text-yellow-400 bg-yellow-400/20';
      case 'Planifié': return 'text-purple-400 bg-purple-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Haute': return 'text-red-400 bg-red-400/20';
      case 'Moyenne': return 'text-yellow-400 bg-yellow-400/20';
      case 'Basse': return 'text-green-400 bg-green-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const completedTasks = selectedProject.tasks.filter(task => task.completed).length;
  const totalTasks = selectedProject.tasks.length;
  const taskProgress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Suivi des Projets</h2>
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          <Plus size={18} />
          <span>Nouveau Projet</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Projects List */}
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold text-white mb-4">Projets</h3>
          <div className="space-y-3">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedProject.id === project.id
                    ? 'bg-blue-600/20 border-blue-500'
                    : 'bg-white/10 border-white/20 hover:border-white/30'
                }`}
                onClick={() => setSelectedProject(project)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-white">{project.title}</h4>
                  <span className={`px-2 py-1 rounded text-xs ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                  <div
                    className={`bg-blue-500 h-2 rounded-full transition-all duration-300 ${styles.projectProgressBar}`}
                    data-progress={project.progress}
                    data-width={project.progress}
                  ></div>
                </div>
                </div>
                <p className="text-gray-400 text-sm">{project.progress}% complété</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Project Details */}
        <div className="lg:col-span-2">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            {/* Project Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{selectedProject.title}</h3>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(selectedProject.status)}`}>
                    {selectedProject.status}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm ${getPriorityColor(selectedProject.priority)}`}>
                    Priorité {selectedProject.priority}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-blue-400 hover:text-blue-300" title="Modifier le projet">
                  <Edit size={18} />
                </button>
                <button className="p-2 text-red-400 hover:text-red-300" title="Supprimer le projet">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="text-blue-400" size={20} />
                  <span className="text-gray-300 text-sm">Progression</span>
                </div>
                <p className="text-2xl font-bold text-white">{selectedProject.progress}%</p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="text-green-400" size={20} />
                  <span className="text-gray-300 text-sm">Tâches</span>
                </div>
                <p className="text-2xl font-bold text-white">{completedTasks}/{totalTasks}</p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="text-purple-400" size={20} />
                  <span className="text-gray-300 text-sm">Équipe</span>
                </div>
                <p className="text-2xl font-bold text-white">{selectedProject.team.length}</p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="text-yellow-400" size={20} />
                  <span className="text-gray-300 text-sm">Échéance</span>
                </div>
                <p className="text-sm font-medium text-white">
                  {format(selectedProject.endDate, 'dd MMM yyyy', { locale: fr })}
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-white mb-4">Timeline du Projet</h4>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Début: {format(selectedProject.startDate, 'dd MMM yyyy', { locale: fr })}</span>
                  <span>Fin: {format(selectedProject.endDate, 'dd MMM yyyy', { locale: fr })}</span>
                </div>
           <div className="w-full bg-gray-700 rounded-full h-3 mb-2 relative overflow-hidden">
              <motion.div
                className={`bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full ${styles.progressBar}`}
                initial={{ width: 0 }}
                animate={{ width: `${progressWidth}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                style={{
                  boxShadow: '0 0 10px rgba(99, 102, 241, 0.5)',
                  willChange: 'width'
                }}
              />
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: 'repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(255,255,255,0.1) 4px, rgba(255,255,255,0.1) 8px)'
          }}
        />
      </div>

              </div>
            </div>

            {/* Tasks */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-white">Tâches</h4>
                <button className="text-blue-400 hover:text-blue-300 text-sm">
                  + Ajouter une tâche
                </button>
              </div>
              <div className="space-y-2">
                {selectedProject.tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      task.completed
                        ? 'bg-green-600/10 border-green-600/30'
                        : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        task.completed
                          ? 'bg-green-600 border-green-600'
                          : 'border-gray-400'
                      }`}>
                        {task.completed && <CheckCircle size={12} className="text-white" />}
                      </div>
                      <span className={`${task.completed ? 'text-gray-400 line-through' : 'text-white'}`}>
                        {task.title}
                      </span>
                    </div>
                    <span className="text-gray-400 text-sm">
                      {format(task.dueDate, 'dd MMM', { locale: fr })}
                    </span>
                  </div>
                ))}

                <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                    <motion.div
                      className="bg-green-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${taskProgress}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                  </div>

              </div>
            </div>

            {/* Milestones */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Jalons</h4>
              <div className="space-y-3">
                {selectedProject.milestones.map((milestone) => (
                  <div
                    key={milestone.id}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div className="flex items-center space-x-3">
                      <Target className={`${milestone.completed ? 'text-green-400' : 'text-gray-400'}`} size={20} />
                      <span className="text-white">{milestone.title}</span>
                    </div>
                    <span className="text-gray-400 text-sm">
                      {format(milestone.date, 'dd MMM yyyy', { locale: fr })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
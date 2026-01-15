'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Calendar, Clock, LogOut, Lock } from 'lucide-react';
import ProjectForm from '@/components/admin/ProjectForm';
import EducationForm from '@/components/admin/EducationForm';
import ProjectTracker from '@/components/admin/ProjectTracker';
import ProjectsManager from 'app/admin/components/ProjectsManager';
import EducationManager from 'app/admin/components/EducationManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import projectData from '@/data/projet';
import educationData from '@/data/education';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('projects');
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showEducationForm, setShowEducationForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [editingEducation, setEditingEducation] = useState(null);

  // State for data
  const [projects, setProjects] = useState<any[]>([]);
  const [educations, setEducations] = useState<any[]>([]);

  // Initialize data from localStorage or default files
  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuth');
    if (isAuth === 'true') setIsAuthenticated(true);

    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    } else {
      setProjects(projectData);
      localStorage.setItem('projects', JSON.stringify(projectData));
    }

    const storedEducations = localStorage.getItem('educations');
    if (storedEducations) {
      setEducations(JSON.parse(storedEducations));
    } else {
      setEducations(educationData);
      localStorage.setItem('educations', JSON.stringify(educationData));
    }
  }, []);

  // Persist data when it changes
  useEffect(() => {
    if (projects.length > 0) localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    if (educations.length > 0) localStorage.setItem('educations', JSON.stringify(educations));
  }, [educations]);

  const handleLogin = (e: any) => {
    e.preventDefault();
    if (password === 'admin') { // Simple checks for demo purposes
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
    } else {
      alert('Mot de passe incorrect');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
  };

  // CRUD Operations - Projects
  const handleSaveProject = (project: any) => {
    if (project.id) {
      // Update
      setProjects(projects.map(p => p.id === project.id ? project : p));
    } else {
      // Create
      const newProject = { ...project, id: Date.now() };
      setProjects([...projects, newProject]);
    }
    setShowProjectForm(false);
    setEditingProject(null);
  };

  const handleDeleteProject = (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  // CRUD Operations - Education
  const handleSaveEducation = (education: any) => {
    if (education.id) {
      setEducations(educations.map(e => e.id === education.id ? education : e));
    } else {
      const newEducation = { ...education, id: Date.now() };
      setEducations([...educations, newEducation]);
    }
    setShowEducationForm(false);
    setEditingEducation(null);
  };

  const handleDeleteEducation = (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
      setEducations(educations.filter(e => e.id !== id));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-md p-8 rounded-2xl w-full max-w-md border border-white/20"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600/20 p-4 rounded-full">
              <Lock className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white text-center mb-6">Accès Administrateur</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Se connecter
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  const tabs = [
    { id: 'projects', label: 'Projets', icon: Eye },
    { id: 'education', label: 'Formations', icon: Calendar },
    { id: 'tracker', label: 'Suivi Projets', icon: Clock }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <Header />
      <div className="mt-10 min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex justify-between items-end"
          >
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Dashboard Admin</h1>
              <p className="text-gray-300">Gérez votre portfolio et suivez vos projets</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors bg-red-400/10 px-4 py-2 rounded-lg"
            >
              <LogOut size={18} />
              <span>Déconnexion</span>
            </button>
          </motion.div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-8 bg-white/10 backdrop-blur-sm rounded-lg p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Content */}
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'projects' && (
                <ProjectsManager
                  projects={projects}
                  onDelete={handleDeleteProject}
                  showForm={showProjectForm}
                  setShowForm={setShowProjectForm}
                  editingProject={editingProject}
                  setEditingProject={setEditingProject}
                />
              )}

              {activeTab === 'education' && (
                <EducationManager
                  educations={educations}
                  onDelete={handleDeleteEducation}
                  showForm={showEducationForm}
                  setShowForm={setShowEducationForm}
                  editingEducation={editingEducation}
                  setEditingEducation={setEditingEducation}
                />
              )}

              {activeTab === 'tracker' && <ProjectTracker />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Modals */}
        <AnimatePresence>
          {showProjectForm && (
            <ProjectForm
              project={editingProject}
              onSave={handleSaveProject}
              onClose={() => {
                setShowProjectForm(false);
                setEditingProject(null);
              }}
            />
          )}

          {showEducationForm && (
            <EducationForm
              education={editingEducation}
              onSave={handleSaveEducation}
              onClose={() => {
                setShowEducationForm(false);
                setEditingEducation(null);
              }}
            />
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </main>
  );
}


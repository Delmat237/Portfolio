'use client';

import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Calendar, Clock, LogOut, Lock, Briefcase, Trophy } from 'lucide-react';
import ProjectForm from '@/components/admin/ProjectForm';
import EducationForm from '@/components/admin/EducationForm';
import ExperienceForm from '@/components/admin/ExperienceForm';
import CompetitionForm from '@/components/admin/CompetitionForm';
import ProjectTracker from '@/components/admin/ProjectTracker';
import ProjectsManager from 'app/admin/components/ProjectsManager';
import EducationManager from 'app/admin/components/EducationManager';
import ExperienceManager from 'app/admin/components/ExperienceManager';
import CompetitionsManager from 'app/admin/components/CompetitionsManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useProjectsAdmin } from '@/hooks/useProjects';
import { useEducationAdmin } from '@/hooks/useEducation';
import { useExperiencesAdmin } from '@/hooks/useExperiences';
import { useCompetitionsAdmin } from '@/hooks/useCompetitions';
import { checkAdminSession, loginAdmin, logoutAdmin } from '@/lib/api-client';
import type { Project, Education, Experience, Competition } from '@/data/types';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('projects');
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showEducationForm, setShowEducationForm] = useState(false);
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [showCompetitionForm, setShowCompetitionForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [editingCompetition, setEditingCompetition] = useState<Competition | null>(null);

  const {
    items: projects,
    loading: projectsLoading,
    error: projectsError,
    createItem: createProject,
    updateItem: updateProject,
    deleteItem: deleteProject,
  } = useProjectsAdmin();

  const {
    items: educations,
    loading: educationsLoading,
    error: educationsError,
    createItem: createEducation,
    updateItem: updateEducation,
    deleteItem: deleteEducation,
  } = useEducationAdmin();

  const {
    items: experiences,
    loading: experiencesLoading,
    error: experiencesError,
    createItem: createExperience,
    updateItem: updateExperience,
    deleteItem: deleteExperience,
  } = useExperiencesAdmin();

  const {
    items: competitions,
    loading: competitionsLoading,
    error: competitionsError,
    createItem: createCompetition,
    updateItem: updateCompetition,
    deleteItem: deleteCompetition,
  } = useCompetitionsAdmin();

  useEffect(() => {
    void checkAdminSession().then((authenticated) => {
      setIsAuthenticated(authenticated);
      setAuthLoading(false);
    });
  }, []);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    try {
      await loginAdmin(password);
      setIsAuthenticated(true);
      setPassword('');
    } catch {
      setLoginError('Mot de passe incorrect ou configuration serveur manquante');
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    setIsAuthenticated(false);
  };

  const handleSaveProject = async (project: Project) => {
    try {
      if (project.id) {
        await updateProject(project.id, project);
      } else {
        const { id: _id, ...payload } = project;
        await createProject(payload);
      }
      setShowProjectForm(false);
      setEditingProject(null);
    } catch {
      alert('Erreur lors de la sauvegarde du projet');
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) return;
    try {
      await deleteProject(id);
    } catch {
      alert('Erreur lors de la suppression');
    }
  };

  const handleSaveEducation = async (education: Education) => {
    try {
      if (education.id) {
        await updateEducation(education.id, education);
      } else {
        const { id: _id, ...payload } = education;
        await createEducation(payload);
      }
      setShowEducationForm(false);
      setEditingEducation(null);
    } catch {
      alert('Erreur lors de la sauvegarde de la formation');
    }
  };

  const handleDeleteEducation = async (id: number) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) return;
    try {
      await deleteEducation(id);
    } catch {
      alert('Erreur lors de la suppression');
    }
  };

  const handleSaveExperience = async (experience: Experience) => {
    try {
      if (experience.id) {
        await updateExperience(experience.id, experience);
      } else {
        const { id: _id, ...payload } = experience;
        await createExperience(payload);
      }
      setShowExperienceForm(false);
      setEditingExperience(null);
    } catch {
      alert('Erreur lors de la sauvegarde de l\'expérience');
    }
  };

  const handleDeleteExperience = async (id: number) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette expérience ?')) return;
    try {
      await deleteExperience(id);
    } catch {
      alert('Erreur lors de la suppression');
    }
  };

  const handleSaveCompetition = async (competition: Competition) => {
    try {
      if (competition.id) {
        await updateCompetition(competition.id, competition);
      } else {
        const { id: _id, ...payload } = competition;
        await createCompetition(payload);
      }
      setShowCompetitionForm(false);
      setEditingCompetition(null);
    } catch {
      alert('Erreur lors de la sauvegarde de la compétition');
    }
  };

  const handleDeleteCompetition = async (id: number) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette compétition ?')) return;
    try {
      await deleteCompetition(id);
    } catch {
      alert('Erreur lors de la suppression');
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-300">Chargement…</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4 transition-colors duration-300">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-50 dark:bg-white/10 backdrop-blur-md p-8 rounded-2xl w-full max-w-md border border-gray-200 dark:border-white/20 shadow-xl"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600/20 p-4 rounded-full">
              <Lock className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">Accès Administrateur</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                className="w-full px-4 py-3 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                autoFocus
              />
            </div>
            {loginError && <p className="text-red-400 text-sm">{loginError}</p>}
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
    { id: 'experience', label: 'Expériences', icon: Briefcase },
    { id: 'competitions', label: 'Compétitions', icon: Trophy },
    { id: 'tracker', label: 'Suivi Projets', icon: Clock },
  ];

  const dataError = projectsError || educationsError || experiencesError || competitionsError;

  return (
    <main className="min-h-screen transition-colors duration-300">
      <Header />
      <div className="mt-10 min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex justify-between items-end"
          >
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Dashboard Admin</h1>
              <p className="text-gray-600 dark:text-gray-300">Gérez votre portfolio et suivez vos projets</p>
              {dataError && (
                <p className="text-amber-500 text-sm mt-2">{dataError}</p>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors bg-red-400/10 px-4 py-2 rounded-lg"
            >
              <LogOut size={18} />
              <span>Déconnexion</span>
            </button>
          </motion.div>

          <div className="flex flex-wrap gap-1 mb-8 bg-gray-100 dark:bg-white/10 backdrop-blur-sm rounded-lg p-1 border border-gray-200 dark:border-transparent">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10'
                    }`}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode='wait'>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'projects' && (
                projectsLoading ? (
                  <p className="text-gray-500">Chargement des projets…</p>
                ) : (
                  <ProjectsManager
                    projects={projects}
                    onDelete={handleDeleteProject}
                    showForm={showProjectForm}
                    setShowForm={setShowProjectForm}
                    editingProject={editingProject}
                    setEditingProject={setEditingProject}
                  />
                )
              )}

              {activeTab === 'education' && (
                educationsLoading ? (
                  <p className="text-gray-500">Chargement des formations…</p>
                ) : (
                  <EducationManager
                    educations={educations}
                    onDelete={handleDeleteEducation}
                    showForm={showEducationForm}
                    setShowForm={setShowEducationForm}
                    editingEducation={editingEducation}
                    setEditingEducation={setEditingEducation}
                  />
                )
              )}

              {activeTab === 'experience' && (
                experiencesLoading ? (
                  <p className="text-gray-500">Chargement des expériences…</p>
                ) : (
                  <ExperienceManager
                    experiences={experiences}
                    onDelete={handleDeleteExperience}
                    setShowForm={setShowExperienceForm}
                    setEditingExperience={setEditingExperience}
                  />
                )
              )}

              {activeTab === 'competitions' && (
                competitionsLoading ? (
                  <p className="text-gray-500">Chargement des compétitions…</p>
                ) : (
                  <CompetitionsManager
                    competitions={competitions}
                    onDelete={handleDeleteCompetition}
                    setShowForm={setShowCompetitionForm}
                    setEditingCompetition={setEditingCompetition}
                  />
                )
              )}

              {activeTab === 'tracker' && <ProjectTracker />}
            </motion.div>
          </AnimatePresence>
        </div>

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

          {showExperienceForm && (
            <ExperienceForm
              experience={editingExperience}
              onSave={handleSaveExperience}
              onClose={() => {
                setShowExperienceForm(false);
                setEditingExperience(null);
              }}
            />
          )}

          {showCompetitionForm && (
            <CompetitionForm
              competition={editingCompetition}
              onSave={handleSaveCompetition}
              onClose={() => {
                setShowCompetitionForm(false);
                setEditingCompetition(null);
              }}
            />
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </main>
  );
}

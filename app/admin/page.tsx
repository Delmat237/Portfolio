'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {  Eye, Calendar, Clock } from 'lucide-react';
import ProjectForm from '@/components/admin/ProjectForm';
import EducationForm from '@/components/admin/EducationForm';
import ProjectTracker from '@/components/admin/ProjectTracker';
import ProjectsManager from 'app/admin/components/ProjectsManager';
import EducationManager from 'app/admin/components/EducationManager';


import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('projects');
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showEducationForm, setShowEducationForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [editingEducation, setEditingEducation] = useState(null);

  const tabs = [
    { id: 'projects', label: 'Projets', icon: Eye },
    { id: 'education', label: 'Formations', icon: Calendar },
    { id: 'tracker', label: 'Suivi Projets', icon: Clock }
  ];

  return (
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
           <Header/>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-bold text-white mb-2">Dashboard Admin</h1>
              <p className="text-gray-300">Gérez votre portfolio et suivez vos projets</p>
            </motion.div>

            {/* Tabs */}
            <div className="flex space-x-1 mb-8 bg-white/10 backdrop-blur-sm rounded-lg p-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                      activeTab === tab.id
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
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'projects' && (
                <ProjectsManager
                  showForm={showProjectForm}
                  setShowForm={setShowProjectForm}
                  editingProject={editingProject}
                  setEditingProject={setEditingProject}
                />
              )}
              
              {activeTab === 'education' && (
                <EducationManager
                  showForm={showEducationForm}
                  setShowForm={setShowEducationForm}
                  editingEducation={editingEducation}
                  setEditingEducation={setEditingEducation}
                />
              )}
              
              {activeTab === 'tracker' && <ProjectTracker />}
            </motion.div>
          </div>

          {/* Modals */}
          {showProjectForm && (
            <ProjectForm
              project={editingProject}
              onClose={() => {
                setShowProjectForm(false);
                setEditingProject(null);
              }}
            />
          )}

          {showEducationForm && (
            <EducationForm
              education={editingEducation}
              onClose={() => {
                setShowEducationForm(false);
                setEditingEducation(null);
              }}
            />
          )}
         
        </div>
         <Footer/>
    </main>
  );
}


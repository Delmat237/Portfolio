// src/pages/projets.tsx
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import ProjectCard from '@/app/components/ProjectCard';
import '@/styles/globals.css';

const ProjectsPage = () => {
  return (
    <div >
      <Header />
      
    {/* Projets */}
<section className="mt-10  py-16 bg-gray-50 dark:bg-gray-900">
  <div className="container mx-auto px-4  items-center">
    <h2 className="text-4xl font-bold text-center mb-12 text-blue-600 dark:text-blue-400">
      Mes Projets
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProjectCard
        title="Analyse de données avec Python"
        description="Projet de classification de données médicales"
        techStack={['Python', 'Pandas', 'Scikit-learn']}
        link="https://github.com"
       
      />
      <ProjectCard
        title="Snappy"
        description="Framework d'API"
        techStack={['Python', 'Java', 'React','Next.js']}
        link="https://github.com"
       
      />
      <ProjectCard
        title="Alaanya com"
        description="Application de mesagerie instantanée"
        techStack={['Java', 'MYSQL']}
        link="https://github.com/Delmat237/ALAANYA_COM"
       
      />
      {/* Ajoutez d'autres cartes ici */}
    </div>
  </div>
</section>


      <Footer />
    </div>
  );
};

export default ProjectsPage;

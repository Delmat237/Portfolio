// src/pages/formations.tsx
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import '@/styles/globals.css';
import SkillCard from '@/app/components/SkillBadge';

const CompetencesPage = () => {
  return (
    <div >
      <Header />
      
      <section className="items-center  mt-10 py-16 bg-gray-50 dark:bg-gray-900">
        <div className=" container mx-auto px-4 lg:px-20">
          <h2 className="  text-4xl font-bold text-center mb-12 text-blue-600 dark:text-blue-400">
            Mes Compétences
          </h2>
          <div className="skills-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <SkillCard title="Résolution de Problèmes" />
                  <SkillCard title="Leadership d'Équipe" />
                  <SkillCard title="Création de Sites Web" />
                  <SkillCard title="Devellopement Mobile" />
                  <SkillCard title="Intelligence Artificielle" />
                  <SkillCard title="Communication" />
                  {/* ... */}
          </div>

            {/* Répétez le pattern pour les autres compétences */}
          
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CompetencesPage;

// src/pages/index.tsx
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

import Image from 'next/image';
import { FaGithub,FaEnvelope,FaLinkedin } from 'react-icons/fa'; // Import the GitHub icon
import '@/styles/globals.css';
import FormationsPage from './formations';
import CompétencesPage from './competences';
import CertificationsPage from './certifications';
import ContactPage from './contact';
import AboutSection from './moi';
import ProjectsPage from './projets';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

 {/* Section principale avec arrière-plan animé */}
 <section className="bg-gradient-to-r from-bg-gray-50 dark:bg-gray-900 text-white min-h-screen flex items-center relative overflow-hidden">
        {/* Arrière-plan animé */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="parallax-container">
            {/* Image 1 */}
          
            {/* Image 2 */}
            <div className="parallax-item">
              <Image
                src="/images/server.png"
                alt="Serveur informatique"
                fill
                className="object-cover opacity-20"
                priority
              />
            </div>
       
              <div className="parallax-item">
              <Image
                src="/images/code1.png"
                alt="Code informatique"
                fill
                className="object-cover opacity-20"
                priority
              />
                 <div className="parallax-item">
              <Image
                src="/images/image.png"
                alt="Code informatique"
                fill
                className="object-cover opacity-20"
                priority
              />
          
            </div>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
  <div className=" flex justify-center items-center flex-col lg:flex-row container mx-auto px-8 md:px-16 gap-25%">
    <div className="max-w-3xl mx-auto text-center mr-50">
      {/* Texte d'introduction */}
      <h3 className="text-2xl font-light mb-4">Salut, c'est moi</h3>
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        AZANGUE Leonel Delmat
      </h1>
      <h3 className="text-lg mb-6">
        Je suis <span className="font-semibold">Élève ingénieur en informatique</span>.
      </h3>

      {/* Description */}
      <p className="text-lg md:text-xl mb-8 leading-relaxed">
        Titulaire d'une licence en mathématiques, je poursuis mes études à l'École Nationale Supérieure Polytechnique
        de Yaoundé (ENSPY), où je suis actuellement en 3ème année de Génie informatique.
      </p>

  
      {/* Réseaux sociaux */}
      <div className="social-media flex justify-center gap-6 mb-6">
        {/* LinkedIn */}
        <a
              href="https://www.linkedin.com/in/leonel-azangue"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center items-center w-16 h-16 bg-transparent border-2 border-blue-400 rounded-full hover:bg-blue-400 hover:text-white transition-all duration-500"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-8 h-8 text-blue-400 hover:text-white" />
           </a>

        {/* GitHub */}
        <a
            href="https://github.com/Delmat237"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center items-center w-16 h-16 bg-transparent border-2 border-blue-400 rounded-full hover:bg-blue-400 hover:text-white transition-all duration-500"
            aria-label="GitHub"
          >
            <FaGithub className="w-8 h-8 text-blue-400 hover:text-white" />
          </a>

      {/* Email */}
       <a
              href="mailto:leonel.azangue@facsciences-uy1.cm"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center items-center w-16 h-16 bg-transparent border-2 border-blue-400 rounded-full hover:bg-blue-400 hover:text-white transition-all duration-500 hover:shadow-lg hover:brightness-110"
              aria-label="Email"
            >
              <FaEnvelope className="w-8 h-8 text-blue-400 hover:text-white" />
            </a>
            
      </div>

      {/* Bouton CV */}
      <a
        href="/CvLeonelAZANGUE.pdf"
        className="inline-block bg-blue-400 text-white px-6 py-3 rounded-lg hover:bg-blue-700 hover:text-white transition-all duration-500 hover:shadow-lg hover:brightness-110"
        
      >
        Télécharger mon CV
      </a>
    </div>
    <div className='relative w-80  h-80 mt-8 md:w-1/2'>
         {/* Image Section */}
            
         <Image
                                alt="Photo de Leonel"
                                src="/images/me.png"
                                width={320} // Largeur fixe pour éviter les décalages de mise en page (CLS)
                                height={320} // Hauteur fixe pour éviter les décalages de mise en page (CLS)
                                className="rounded-full object-cover "
                                priority // Charge cette image en priorité
                              />
    </div>
  </div>
</section>

{/* About me */}
<AboutSection  />

     {/* Projets */}
  
     <ProjectsPage  />

{/* formations */}

<FormationsPage />

    {/* competences */}
    <CompétencesPage/>

        {/* Certification */}

      <CertificationsPage/>

      {/* contacts */}

      <ContactPage />
    
      <Footer />
    </div>
  );
};

export default HomePage;

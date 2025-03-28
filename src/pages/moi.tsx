import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';
import Image from 'next/image';
import '@/styles/globals.css';
const AboutSection = () => {
  return (
    <div >
      <Header />
      
    <section
      id="about"
     className=" place-items: center mt-20 flex justify-center h-sreen items-center space-y-8 flex-col lg:flex-row lg:space-x-12 bg-gray-700 text-white px-4"
    >
           {/* Image Section */}
                <div className="relative w-80 h-80 mt-8 md:w-1/2 ">
                  <Image
                    alt="Photo de Leonel"
                    src="/images/me.png"
                    width={320} // Largeur fixe pour éviter les décalages de mise en page (CLS)
                    height={320} // Hauteur fixe pour éviter les décalages de mise en page (CLS)
                    className="rounded-full object-cover"
                    priority // Charge cette image en priorité
                  />
                </div>
      {/* Texte À propos */}
      <div className="about-content text-center lg:text-left p-6 lg:p-12">
        <h2 className="text-4xl font-bold mb-4">À propos de moi</h2>
        <p className="mb-6 text-lg">
          Je suis passionné par l'IA, la cybersécurité et la science des données. Mon rêve est d'exceller dans ces domaines pour résoudre des problèmes concrets de la société. Pendant mon temps libre,
          j'aime pratiquer du sport, jouer aux échecs et regarder des films.
        </p>
        <a
          href="/CvLeonelAZANGUE.pdf"
          className="inline-block bg-blue-400 text-white px-6 py-3 rounded-lg hover:bg-blue-700 hover:text-white transition-all duration-500 hover:shadow-lg hover:brightness-110"

        >
          Télécharger mon CV
        </a>
      </div>
    </section>
     <Footer />
    </div>
  );
};

export default AboutSection;

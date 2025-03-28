// src/pages/formations.tsx
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import '@/styles/globals.css';

const FormationsPage = () => {
  return (
    <div >
      <Header />
      
      <section className=" mt-10  py-16 bg-gray-50 dark:bg-gray-700">
        <div className="container mx-auto px-4  items-center">
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-600 dark:text-blue-400">
            Formations
          </h2>
          <div className=" timeline">
            <div className="timeline-item">
              <div className="formation timeline-content">
                <h3 className="text-2xl font-bold mb-2">ENSPY - Génie Informatique</h3>
                <p className="text-blue-600 ">2022 - 2027</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="formation  timeline-content">
                <h3 className="text-2xl font-bold mb-2">Networking Essential : CISCO</h3>
                <p className="text-blue-600 ">2024 - 2025</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="formation  timeline-content">
                <h3 className="text-2xl font-bold mb-2">Apprendre React : Udemy</h3>
                <p className="text-blue-600 ">2024 - 2025</p>
              </div>
            </div>
            {/* Ajoutez d'autres formations ici */}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FormationsPage;

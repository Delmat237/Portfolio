// src/pages/formations.tsx
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

import '@/styles/globals.css';
import CertificatCard from '@/app/components/CertificatCard';

const CertificationsPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="mt-10 py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-600 dark:text-blue-400">Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <CertificatCard
                      file="/c-programming-certification.pdf"
                      img="/images/certiC.png"
                      title="Certification en Programmation C"
                      source="Open Classroom"
                      description= "Certification en Programmation C"
                      ref="https://www.coursera.org/account/accomplishments/verify/83JHP7MM86LS"
                  
                  />

                    <CertificatCard
                      file="/c-programming-certification.pdf"
                      img="/images/certiDL.png"
                      title="Certification en Deep Learning"
                      source="Open Classroom"
                      description= "Certification en Deep Learning"
                      ref="https://www.coursera.org/account/accomplishments/verify/83JHP7MM86LS"
                  
                  />
                  <CertificatCard
                      file="/c-programming-certification.pdf"
                      img="/images/certiJS.png"
                      title="Certification en Programmation JavaScript"
                      source="CISCO"
                      description= "Certification en Programmation JavaScript"
                      ref="https://www.coursera.org/account/accomplishments/verify/83JHP7MM86LS"
                  
                  />
          {/* Ajoutez d'autres certifications ici */}
          </div>
         
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CertificationsPage;

// src/pages/contact.tsx
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import '@/styles/globals.css';

const ContactPage = () => {
  return (
    <div >
    <Header />
    
    <section className="mt-10 py-16 y-16 bg-gray-900">
      <div className="container mx-auto px-4  h-screen items-center">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-600 dark:text-blue-400">
          Contact
        </h2>
        <div className="max-w-3xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="Nom" 
                className="w-full p-3 border rounded-lg border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full p-3 border rounded-lg border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
            <textarea 
              rows={5} 
              placeholder="Message" 
              className="w-full p-3 border rounded-lg border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
      <button 
            type="submit" 
            className="flex w-full items-center justify-center bg-blue-400 text-white px-6 py-3 rounded-lg hover:bg-blue-700 hover:text-white transition-all duration-500 hover:shadow-lg hover:brightness-110"
            aria-label="Envoyer le formulaire"
          >
            Envoyer
          </button>

          </form>
        </div>
      </div>
    </section>
  
      <Footer />
    </div>
  );
};

export default ContactPage;

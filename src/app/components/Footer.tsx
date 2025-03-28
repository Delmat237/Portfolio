import { FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-8 mt-auto bg-gray-800 text-white py-4 flex justify-between items-center px-6 fixed bottom-0 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-center md:text-left">
          <p className="mb-2 text-sm">
            Copyright © 2025 par ALD | Tous droits réservés
          </p>
          <p className="text-xs">Développé avec React et Next.js</p>
        </div>
        <a 
          href="" 
          className="hidden md:block scroll-to-top"
          aria-label="Remonter en haut"
        >
          <FaArrowUp 
            className="w-8 h-8 text-blue-400 hover:text-blue-00 transition-colors cursor-pointer"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;

// src/components/Header.tsx
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState } from 'react';

const Header = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-4">
          <Image
            alt="photo"
            src="/images/me.png"
            width={45}
            height={45}
            className="rounded-full object-cover"
            priority
          />
          <Image
            alt="logo"
            src="/images/logo.png"
            width={45}
            height={45}
            className="rounded-full object-cover"
            priority
          />
        </Link>

        {/* Menu desktop */}
        <div className="hidden md:flex gap-6">
          {['Moi','Projets', 'Formations', 'Competences','Certifications', 'Contact'].map((link) => (
            <Link 
              key={link} 
              href={`/${link.toLowerCase()}`}
              className={`hover:text-blue-600 transition-colors ${
                router.pathname === `/${link.toLowerCase()}` ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              {link}
            </Link>
          ))}
        </div>

        {/* Menu mobile */}
        <div className="md:hidden flex items-center gap-4">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-6 h-6 text-gray-600" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          {isOpen && (
            <div className="absolute top-16 right-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 w-48">
              {['Moi','Projets', 'Formations', 'Competences','Certifications', 'Contact'].map((link) => (
                <Link 
                  key={link} 
                  href={`/${link.toLowerCase()}`}
                  className={`block px-4 py-2 hover:bg-blue-50 transition-colors ${
                    router.pathname === `/${link.toLowerCase()}` ? 'text-blue-600' : 'text-gray-600'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;

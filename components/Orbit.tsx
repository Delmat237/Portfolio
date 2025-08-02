'use client';

import { useEffect, useRef, useState } from 'react';
import orbitIcons from '@/data/orbitIcons';

// Composant Orbite 3D
const OrbitingIcons = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    interface MousePosition {
      x: number;
      y: number;
    }

    interface MouseEventWithClient extends MouseEvent {
      clientX: number;
      clientY: number;
    }

    const handleMouseMove = (e: MouseEventWithClient) => {
      if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      setMousePosition({
        x: (e.clientX - centerX) / 10,
        y: (e.clientY - centerY) / 10
      });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-96 flex justify-center items-center mb-16">
      <div 
        ref={containerRef}
        className="relative w-96 h-96"
        style={{
          perspective: '1000px',
          transform: `rotateX(${mousePosition.y * 0.03}deg) rotateY(${mousePosition.x * 0.03}deg)`
        }}
      >
        {/* Orbites multiples */}
        {[0, 1, 2].map((orbitIndex) => {
          const iconsPerOrbit = Math.ceil(orbitIcons.length / 3);
          const startIndex = orbitIndex * iconsPerOrbit;
          const endIndex = Math.min(startIndex + iconsPerOrbit, orbitIcons.length);
          const orbitIcons_slice = orbitIcons.slice(startIndex, endIndex);
          
          return (
            <div key={orbitIndex} className="absolute inset-0">
              {orbitIcons_slice.map((tech, index) => {
                const totalIconsInOrbit = orbitIcons_slice.length;
                const angle = (index * (360 / totalIconsInOrbit)) + (orbitIndex * 15);
                const radius = 80 + orbitIndex * 35;
                const x = Math.cos(angle * Math.PI / 180) * radius;
                const y = Math.sin(angle * Math.PI / 180) * radius;
                const z = Math.sin((angle + orbitIndex * 30) * Math.PI / 180) * 20;
                
                return (
                  <div
                    key={tech.name}
                    className="absolute w-16 h-16 flex items-center justify-center group cursor-pointer"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px)`,
                      animation: `orbit-${orbitIndex} ${15 + orbitIndex * 3}s linear infinite`
                    }}
                  >
                    <div className="relative">
                      <div 
                        className="w-12 h-12 rounded-xl backdrop-blur-sm border border-white/20 flex items-center justify-center transform transition-all duration-300 group-hover:scale-125 group-hover:rotate-12 shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, ${tech.color}20, ${tech.color}40)`,
                          boxShadow: `0 8px 32px ${tech.color}20`
                        }}
                      >
                        <img 
                          src={tech.src} 
                          alt={tech.name}
                          className="w-7 h-7 object-contain"
                          style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.3))' }}
                        />
                      </div>
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        <span className="text-xs text-white bg-black/70 px-2 py-1 rounded-md whitespace-nowrap border border-white/20">
                          {tech.name}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
        
        {/* Centre lumineux */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 blur-xl animate-pulse"></div>
          <div className="absolute w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-spin"></div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes orbit-0 {
          from { transform: translate(-50%, -50%) rotateZ(0deg) translateX(80px) rotateZ(0deg); }
          to { transform: translate(-50%, -50%) rotateZ(360deg) translateX(80px) rotateZ(-360deg); }
        }
        @keyframes orbit-1 {
          from { transform: translate(-50%, -50%) rotateZ(0deg) translateX(115px) rotateZ(0deg); }
          to { transform: translate(-50%, -50%) rotateZ(-360deg) translateX(115px) rotateZ(360deg); }
        }
        @keyframes orbit-2 {
          from { transform: translate(-50%, -50%) rotateZ(0deg) translateX(150px) rotateZ(0deg); }
          to { transform: translate(-50%, -50%) rotateZ(360deg) translateX(150px) rotateZ(-360deg); }
        }
      `}</style>
    </div>
  );
};

export default OrbitingIcons;
'use client';

import { useEffect, useRef, useState } from 'react';
import orbitIcons from '@/data/orbitIcons';

// Composant Orbite 3D
const OrbitingIcons = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(0);

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
          x: (e.clientX - centerX) / 15,
          y: (e.clientY - centerY) / 15,
        });
      }
    };

    let animationId: number | undefined;
    const animate = () => {
      setTime(Date.now() * 0.001);
      animationId = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  // Configuration des orbites
  const orbitConfig = [
    { radius: 90, icons: 7, speed: 0.5, direction: 1, color: 'rgba(60, 110, 200, 0.2)' },
    { radius: 130, icons: 7, speed: 0.3, direction: -1, color: 'rgba(140, 60, 200, 0.2)' },
    { radius: 170, icons: orbitIcons.length - 14, speed: 0.2, direction: 1, color: 'rgba(230, 80, 150, 0.2)' },
  ];

  let iconIndex = 0;

  return (
    <div className="relative w-full h-96 flex justify-center items-center mb-16 overflow-hidden">
      <div
        ref={containerRef}
        className="relative w-96 h-96"
        style={{
          perspective: '1200px',
          transformStyle: 'preserve-3d',
          transform: `rotateX(${mousePosition.y * 0.02}deg) rotateY(${mousePosition.x * 0.02}deg)`,
        }}
      >
        {/* Lignes d'orbite pour la visualisation */}
        {orbitConfig.map((orbit, orbitIndex) => (
          <div
            key={`line-${orbitIndex}`}
            className="absolute inset-0 rounded-full border border-white/10"
            style={{
              width: `${orbit.radius * 2}px`,
              height: `${orbit.radius * 2}px`,
              top: `calc(50% - ${orbit.radius}px)`,
              left: `calc(50% - ${orbit.radius}px)`,
              transform: `rotateX(75deg)`,
              // Animation pour la rotation de l'orbite
              animation: `rotate-line-${orbitIndex} ${30 / orbit.speed}s linear infinite`,
              animationDirection: orbit.direction === 1 ? 'normal' : 'reverse',
            }}
          />
        ))}

        {/* Génération des icônes */}
        {orbitConfig.map((orbit, orbitIndex) => {
          const startIconIndex = iconIndex;
          iconIndex += orbit.icons;
          const orbitIconsSlice = orbitIcons.slice(startIconIndex, iconIndex);

          return (
            <div
              key={orbitIndex}
              className="absolute inset-0"
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateZ(${time * orbit.speed * 50 * orbit.direction}deg)`, // Animation de rotation de l'orbite
              }}
            >
              {orbitIconsSlice.map((tech, index) => {
                const angle = (index * 360) / orbit.icons;
                const offsetAngle = (orbitIndex * 20);
                const iconPositionX = Math.cos((angle + offsetAngle) * Math.PI / 180) * orbit.radius;
                const iconPositionY = Math.sin((angle + offsetAngle) * Math.PI / 180) * orbit.radius;

                return (
                  <div
                    key={tech.name}
                    className="absolute w-16 h-16 flex items-center justify-center group cursor-pointer"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(-50%, -50%) translate3d(${iconPositionX}px, ${iconPositionY}px, 0px)`,
                      transformStyle: 'preserve-3d',
                      animation: `wobble-${orbitIndex} ${50 / orbit.speed}s linear infinite`, // Ajout d'une oscillation
                    }}
                  >
                    <div className="relative">
                      <div
                        className="w-12 h-12 rounded-xl backdrop-blur-sm border border-white/20 flex items-center justify-center transform transition-all duration-300 group-hover:scale-125 group-hover:rotate-12 shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, ${tech.color}15, ${tech.color}35)`,
                          boxShadow: `0 8px 32px ${tech.color}25, inset 0 1px 0 rgba(255,255,255,0.1)`,
                          transform: `rotateZ(${-time * orbit.speed * 50 * orbit.direction}deg)` // Contre-rotation de l'icône
                        }}
                      >
                        <img
                          src={tech.src}
                          alt={tech.name}
                          className="w-7 h-7 object-contain transition-transform duration-300 group-hover:scale-110"
                          style={{
                            filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.3))',
                            imageRendering: 'crisp-edges',
                          }}
                        />
                      </div>
                      <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 pointer-events-none">
                        <div className="bg-gray-900/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/20 shadow-xl">
                          <span className="text-xs text-white font-medium whitespace-nowrap">
                            {tech.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}

        {/* Centre lumineux amélioré */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-20 h-20 rounded-full opacity-15 blur-2xl"
            style={{
              background: `conic-gradient(from ${time * 50}deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b, #3b82f6)`,
            }}
          ></div>
          <div
            className="absolute w-8 h-8 rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)',
              transform: `rotate(${time * 100}deg)`,
            }}
          ></div>
          <div
            className="absolute w-4 h-4 rounded-full bg-white/80"
            style={{
              opacity: 0.5 + 0.5 * Math.sin(time * 2),
            }}
          ></div>
        </div>

        {/* Particules flottantes */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: '50%',
              top: '50%',
              transform: `
                translate(-50%, -50%) 
                translate3d(
                  ${Math.cos(time * 0.5 + i) * (150 + i * 10)}px,
                  ${Math.sin(time * 0.3 + i) * (150 + i * 10)}px,
                  ${Math.sin(time * 0.7 + i) * 50}px
                )
              `,
              opacity: 0.3 + 0.3 * Math.sin(time * 2 + i),
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default OrbitingIcons;
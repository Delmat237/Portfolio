'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import orbitIcons from '@/data/orbitIcons';

// Sphère 3D de technologies — vraie profondeur (distribution de Fibonacci + rotation 3D projetée)
const OrbitingIcons = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rotation = useRef({ x: -0.3, y: 0 });
  const velocity = useRef({ x: 0.0015, y: 0.004 });
  const hovering = useRef(false);
  const [, setTick] = useState(0);

  const RADIUS = 170;

  // Positions de base sur une sphère unité (spirale de Fibonacci) — calculées une seule fois
  const basePositions = useMemo(() => {
    const count = orbitIcons.length;
    const increment = Math.PI * (3 - Math.sqrt(5)); // angle d'or
    return orbitIcons.map((_, i) => {
      const y = 1 - (i / (count - 1)) * 2; // de 1 à -1
      const r = Math.sqrt(1 - y * y);
      const phi = i * increment;
      return { x: Math.cos(phi) * r, y, z: Math.sin(phi) * r };
    });
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      // La position du curseur pilote la vitesse/direction de rotation
      velocity.current.y = ((e.clientX - centerX) / rect.width) * 0.018;
      velocity.current.x = -((e.clientY - centerY) / rect.height) * 0.018;
    };

    let animationId: number;
    const animate = () => {
      // Au survol direct : on ralentit fortement pour laisser lire les icônes
      const damping = hovering.current ? 0.15 : 1;
      rotation.current.x += velocity.current.x * damping;
      rotation.current.y += velocity.current.y * damping;
      setTick((t) => (t + 1) % 1000000);
      animationId = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const { x: rx, y: ry } = rotation.current;
  const cosX = Math.cos(rx), sinX = Math.sin(rx);
  const cosY = Math.cos(ry), sinY = Math.sin(ry);

  // Projette chaque icône : rotation 3D autour de Y puis X, puis profondeur -> échelle/opacité/z-index
  const projected = basePositions.map((p, i) => {
    // rotation autour de Y
    const x1 = p.x * cosY - p.z * sinY;
    const z1 = p.x * sinY + p.z * cosY;
    // rotation autour de X
    const y2 = p.y * cosX - z1 * sinX;
    const z2 = p.y * sinX + z1 * cosX;
    const depth = (z2 + 1) / 2; // 0 (arrière) -> 1 (avant)
    return {
      tech: orbitIcons[i],
      px: x1 * RADIUS,
      py: y2 * RADIUS,
      scale: 0.55 + depth * 0.55,
      opacity: 0.3 + depth * 0.7,
      blur: (1 - depth) * 2.5,
      zIndex: Math.round(depth * 100),
    };
  });

  return (
    <div className="relative w-full h-[28rem] flex justify-center items-center mb-16 overflow-hidden">
      <div
        ref={containerRef}
        className="relative w-96 h-96"
        style={{ perspective: '1000px' }}
        onMouseEnter={() => (hovering.current = true)}
        onMouseLeave={() => (hovering.current = false)}
      >
        {/* Halo central pour donner du volume à la sphère */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-56 h-56 rounded-full blur-3xl opacity-20"
            style={{ background: 'radial-gradient(circle, #6366f1, #8b5cf6 40%, transparent 70%)' }}
          />
        </div>

        {/* Icônes réparties sur la sphère */}
        {projected.map(({ tech, px, py, scale, opacity, blur, zIndex }) => (
          <div
            key={tech.name}
            className="absolute left-1/2 top-1/2 group cursor-pointer"
            style={{
              transform: `translate(-50%, -50%) translate3d(${px}px, ${py}px, 0) scale(${scale})`,
              opacity,
              zIndex,
              willChange: 'transform, opacity',
            }}
          >
            <div className="relative">
              <div
                className="w-12 h-12 rounded-xl backdrop-blur-sm border border-white/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-125 shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${tech.color}20, ${tech.color}40)`,
                  boxShadow: `0 8px 32px ${tech.color}30, inset 0 1px 0 rgba(255,255,255,0.15)`,
                  filter: blur > 0.05 ? `blur(${blur}px)` : undefined,
                }}
              >
                <img
                  src={tech.src}
                  alt={tech.name}
                  className="w-7 h-7 object-contain"
                  style={{ filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.25))' }}
                />
              </div>
              <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 pointer-events-none">
                <div className="bg-white dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/20 shadow-xl">
                  <span className="text-xs text-slate-900 dark:text-white font-medium whitespace-nowrap">
                    {tech.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Noyau lumineux */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 50 }}>
          <div
            className="w-5 h-5 rounded-full"
            style={{
              background: 'radial-gradient(circle, #ffffff, #a5b4fc 60%, transparent)',
              boxShadow: '0 0 24px 6px rgba(139,92,246,0.5)',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default OrbitingIcons;

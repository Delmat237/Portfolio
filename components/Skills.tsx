'use client';
import skillData from '@/data/skill';
import OrbitingIcons from '@/components/Orbit';
import techData from '@/data/tech';

// Composant principal Skills
const Skills = () => {
  return (
    <section id="skills" className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 py-20 relative overflow-hidden">
      {/* Particules d'arrière-plan */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Mes <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Compétences</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Technologies et outils que j'utilise pour créer des expériences exceptionnelles
          </p>

          {/* Orbite 3D */}
          <OrbitingIcons />
        </div>

        {/* Grille des compétences */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {skillData.map((category, categoryIndex) => (
            <div
              key={category.title}
              className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:border-blue-400/30 hover:shadow-xl hover:shadow-blue-400/10"
            >
              <h3 className="text-xl font-bold text-white mb-6 text-center border-b border-white/20 pb-3">
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => {
                  const IconComponent = skill.icon;
                  return (
                    <div key={skill.name} className="group">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <IconComponent className="w-5 h-5 text-blue-400 group-hover:text-pink-400 transition-colors duration-300" />
                          <span className="text-white font-medium text-sm">{skill.name}</span>
                        </div>
                        <span className="text-blue-400 text-xs bg-blue-400/20 px-2 py-1 rounded-full border border-blue-400/30">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-800/50 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-full rounded-full relative transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-pink-400 opacity-50 blur-sm"></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Section Technologies */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Technologies <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Maîtrisées</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {techData.map((techGroup, index) => (
              <div
                key={techGroup.title}
                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 hover:border-blue-400/30 hover:shadow-lg hover:shadow-blue-400/10"
              >
                <h4 className="text-white font-semibold mb-3 text-sm text-center border-b border-white/10 pb-2">
                  {techGroup.title}
                </h4>
                <div className="space-y-2">
                  {techGroup.skills.map((skill, skillIndex) => (
                    <div key={skill.name} className="flex items-center space-x-2 text-gray-300 text-xs py-1 hover:text-white transition-colors duration-200 group">
                      <div 
                        className="w-4 h-4 rounded p-0.5 flex items-center justify-center flex-shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${skill.color}20, ${skill.color}40)`,
                        }}
                      >
                        <img 
                          src={skill.src} 
                          alt={skill.name}
                          className="w-3 h-3 object-contain"
                          style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.2))' }}
                        />
                      </div>
                      <span className="truncate group-hover:text-white transition-colors duration-200">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Skills;
'use client'

import { motion } from 'framer-motion'
import skillData from '@/data/skill'
import OrbitingIcons from '@/components/Orbit'
import techData from '@/data/tech'
import { useAppContext } from '@/contexts/Appcontext'
import type { SkillCategory, SkillItem, SkillLevel } from '@/data/types'

const levelStyles: Record<SkillLevel, string> = {
  expert: 'text-emerald-600 dark:text-emerald-400/80',
  intermediate: 'text-blue-600 dark:text-blue-400/80',
  learning: 'text-amber-600 dark:text-amber-400/80',
  native: 'text-purple-600 dark:text-purple-400/80',
}

const SkillBadge = ({ skill, index }: { skill: SkillItem; index: number }) => {
  const { t } = useAppContext()
  const IconComponent = skill.icon

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      viewport={{ once: true }}
      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/60 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 hover:border-blue-400/40 dark:hover:border-blue-400/30 hover:bg-white dark:hover:bg-white/10 transition-all duration-200 group"
    >
      <IconComponent className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:text-purple-500 transition-colors duration-200 flex-shrink-0" />
      <span className="text-sm text-slate-700 dark:text-gray-200 font-medium">{skill.name}</span>
      {skill.level && (
        <span className={`text-[10px] font-medium tracking-wide ${levelStyles[skill.level]}`}>
          {t(`skills.levels.${skill.level}`)}
        </span>
      )}
    </motion.div>
  )
}

const CategoryCard = ({ category, index }: { category: SkillCategory; index: number }) => {
  const { t } = useAppContext()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      viewport={{ once: true }}
      className="glass-effect rounded-2xl p-6 hover:scale-[1.01] transition-transform duration-300"
    >
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 pb-3 border-b border-slate-200/60 dark:border-white/10">
        {t(`skills.categories.${category.titleKey}`)}
      </h3>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, i) => (
          <SkillBadge key={skill.name} skill={skill} index={i} />
        ))}
      </div>
    </motion.div>
  )
}

const Skills = () => {
  const { t } = useAppContext()

  const technicalCategories = skillData.filter((c) => c.type === 'technical')
  const softSkillsCategory = skillData.find((c) => c.type === 'soft')
  const spokenLanguagesCategory = skillData.find((c) => c.type === 'spoken')

  return (
    <section id="skills" className="min-h-screen bg-slate-50 dark:bg-gradient-to-br dark:from-slate-950 dark:via-blue-950 dark:to-slate-950 py-20 relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-slate-400 dark:bg-white/10 rounded-full animate-pulse"
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
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            {t('skills.title')} <span className="gradient-text">{t('skills.titleHighlight')}</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
            {t('skills.description')}
          </p>
          <OrbitingIcons />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {technicalCategories.map((category, index) => (
            <CategoryCard key={category.titleKey} category={category} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-8">
            {t('skills.technologiesTitle')} <span className="gradient-text">{t('skills.technologiesHighlight')}</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {techData.map((techGroup, groupIndex) => (
              <motion.div
                key={techGroup.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: groupIndex * 0.05 }}
                viewport={{ once: true }}
                className="glass-effect rounded-xl p-4 hover:scale-[1.02] transition-transform duration-300"
              >
                <h4 className="text-slate-900 dark:text-white font-semibold mb-3 text-xs uppercase tracking-wider text-center border-b border-slate-200/60 dark:border-white/10 pb-2">
                  {t(`skills.techCategories.${techGroup.titleKey}`)}
                </h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  {techGroup.skills.map((skill) => (
                    <div
                      key={skill.name}
                      title={skill.name}
                      className="flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-white/50 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 hover:border-blue-400/30 transition-all duration-200 group"
                    >
                      <div
                        className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
                        style={{ background: `linear-gradient(135deg, ${skill.color}20, ${skill.color}40)` }}
                      >
                        <img
                          src={skill.src}
                          alt={skill.name}
                          className="w-3.5 h-3.5 object-contain"
                        />
                      </div>
                      <span className="text-slate-600 dark:text-gray-300 text-xs group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-200 truncate max-w-[80px]">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {(softSkillsCategory || spokenLanguagesCategory) && (
          <div className="grid md:grid-cols-2 gap-6">
            {softSkillsCategory && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-6">
                  {t('skills.softSkillsTitle')} <span className="gradient-text">{t('skills.softSkillsHighlight')}</span>
                </h3>
                <div className="glass-effect rounded-2xl p-6">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {softSkillsCategory.skills.map((skill, i) => (
                      <SkillBadge key={skill.name} skill={skill} index={i} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            {spokenLanguagesCategory && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-6">
                  {t('skills.spokenLanguagesTitle')} <span className="gradient-text">{t('skills.spokenLanguagesHighlight')}</span>
                </h3>
                <div className="glass-effect rounded-2xl p-6">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {spokenLanguagesCategory.skills.map((skill, i) => (
                      <SkillBadge key={skill.name} skill={skill} index={i} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default Skills

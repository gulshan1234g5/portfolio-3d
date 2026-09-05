'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { skills } from '@/data/portfolio';

const categoryColors = {
  frontend: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400', icon: '🌐' },
  backend: { bg: 'bg-green-500/10', border: 'border-green-500/20', text: 'text-green-400', icon: '⚙️' },
  tools: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400', icon: '🛠️' },
  trading: { bg: 'bg-orange-500/10', border: 'border-orange-500/20', text: 'text-orange-400', icon: '📈' },
  '3d': { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400', icon: '🎮' },
};

export function Skills() {
  const categories = Array.from(new Set(skills.map(s => s.category)));

  return (
    <section id="skills" className="py-24 lg:py-32 bg-surface/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="badge mb-4">Tech Stack</span>
          <h2 className="font-display text-display-lg font-bold text-text mb-6">
            Technologies
            <br />
            <span className="text-gradient">I Work With</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
            A curated toolkit built over years of building production systems. 
            Each tool chosen for performance, developer experience, and reliability.
          </p>
        </motion.div>

        <div className="space-y-12">
          {categories.map((category, catIndex) => {
            const categorySkills = skills.filter(s => s.category === category);
            const colors = categoryColors[category] || categoryColors.frontend;

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: catIndex * 0.1, duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-3xl">{colors.icon}</span>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-text capitalize">{category}</h3>
                    <p className="text-text-secondary mt-1">
                      {categorySkills.length} technologies mastered
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {categorySkills.map((skill, i) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ delay: i * 0.05, duration: 0.4 }}
                      className={cn(
                        'group relative glass-card p-6 text-center overflow-hidden',
                        'hover:border-primary/30 hover:bg-surface/70 transition-all duration-500'
                      )}
                    >
                      {/* Proficiency ring */}
                      <div className="w-20 h-20 mx-auto mb-4 relative">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="50%"
                            cy="50%"
                            r="32"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                            className="text-border"
                          />
                          <motion.circle
                            cx="50%"
                            cy="50%"
                            r="32"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                            className={cn(colors.text)}
                            style={{
                              strokeDasharray: 201,
                              strokeDashoffset: 201 * (1 - skill.proficiency / 100),
                            }}
                            initial={{ strokeDashoffset: 201 }}
                            whileInView={{ strokeDashoffset: 201 * (1 - skill.proficiency / 100) }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: i * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                          />
                          <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" className="text-text font-bold text-sm">
                            {skill.proficiency}%
                          </text>
                        </svg>
                      </div>

                      <h4 className="font-medium text-text mb-1">{skill.name}</h4>
                      <p className="text-xs text-text-secondary capitalize">{category}</p>

                      {/* Glow effect on hover */}
                      <motion.div
                        initial={{ opacity: 0, scale: 1.2 }}
                        animate={{ opacity: 0, scale: 1.2 }}
                        whileHover={{ opacity: 0.1, scale: 1, transition: { duration: 0.5 } }}
                        className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 to-transparent pointer-events-none"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
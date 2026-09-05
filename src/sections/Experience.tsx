'use client';

import { motion } from 'framer-motion';
import { Building2, Briefcase, Code, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { experience } from '@/data/portfolio';

export function Experience() {
  return (
    <section id="experience" className="py-24 lg:py-32 bg-surface/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="badge mb-4">Journey</span>
          <h2 className="font-display text-display-lg font-bold text-text mb-6">
            Experience &
            <br />
            <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
            From freelance projects to leading engineering teams at fintech startups.
            A journey of continuous learning and building.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary/20 to-secondary/20"
            style={{ transformOrigin: 'top' }}
          />

          <div className="relative pl-16 space-y-12">
            {experience.map((exp, i) => (
              <motion.article
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative"
              >
                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.15 + 0.3, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute left-[-24px] top-2 w-8 h-8 rounded-full border-4 border-background flex items-center justify-center z-10"
                  style={{
                    background: i === 0 
                      ? 'linear-gradient(135deg, #00ff88, #00d4ff)'
                      : i === 1
                      ? 'linear-gradient(135deg, #00d4ff, #ff6b35)'
                      : 'linear-gradient(135deg, #ff6b35, #00ff88)',
                  }}
                >
                  {i === 0 && <Building2 className="w-4 h-4 text-background" />}
                  {i === 1 && <Briefcase className="w-4 h-4 text-background" />}
                  {i === 2 && <Code className="w-4 h-4 text-background" />}
                </motion.div>

                {/* Content card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 + 0.1, duration: 0.5 }}
                  className="glass-card p-8 ml-4 relative"
                >
                  {/* Period & Type */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="badge">{exp.period}</span>
                    <span className={cn(
                      'px-3 py-1 text-xs font-medium rounded-full',
                      exp.type === 'full-time' && 'bg-blue-500/10 border-blue-500/20 text-blue-400',
                      exp.type === 'freelance' && 'bg-purple-500/10 border-purple-500/20 text-purple-400',
                      exp.type === 'project' && 'bg-green-500/10 border-green-500/20 text-green-400'
                    )}>
                      {exp.type.charAt(0).toUpperCase() + exp.type.slice(1)}
                    </span>
                  </div>

                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="font-display text-xl font-bold text-text mb-2"
                  >
                    {exp.role}
                  </motion.h3>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.4 }}
                    className="text-primary font-medium mb-1"
                  >
                    {exp.company}
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="text-text-secondary mb-6 leading-relaxed"
                  >
                    {exp.description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.4 }}
                    className="flex flex-wrap gap-2"
                  >
                    {exp.technologies.map((tech, j) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.25 + j * 0.05, duration: 0.3 }}
                        className="tag group-hover:text-primary group-hover:border-primary/50 transition-colors"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Current focus */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20"
        >
          <div className="glass-card p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary"
            >
              <Globe className="w-8 h-8" />
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="font-display text-2xl font-bold text-text mb-4"
            >
              Currently Exploring
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-text-secondary max-w-2xl mx-auto mb-8"
            >
              Building the next generation of algorithmic trading infrastructure with 
              AI-assisted strategy discovery, real-time risk analytics, and 
              decentralized execution layers.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-2"
            >
              {['Rust', 'WebAssembly', 'Solana', 'Zero-Knowledge', 'MEV Protection'].map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.08, duration: 0.4 }}
                  className="tag group-hover:text-primary group-hover:border-primary/50 transition-colors"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
'use client';

import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { projects } from '@/data/portfolio';

const categoryColors = {
  Trading: { bg: 'bg-green-500/10', border: 'border-green-500/20', text: 'text-green-400' },
  Automation: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400' },
  'AI/DevTools': { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400' },
  '3D/WebGL': { bg: 'bg-pink-500/10', border: 'border-pink-500/20', text: 'text-pink-400' },
};

export function Projects() {
  return (
    <section id="projects" className="py-24 lg:py-32">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="badge mb-4">Featured Work</span>
          <h2 className="font-display text-display-lg font-bold text-text mb-6">
            Selected
            <br />
            <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
            A curated selection of projects showcasing expertise across trading systems,
            automation, 3D web experiences, and AI-powered development tools.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={cn(
                'group relative glass-card overflow-hidden p-0',
                'hover:border-primary/30 hover:shadow-[0_0_60px_-10px_rgba(0,255,136,0.15)] transition-all duration-700'
              )}
            >
              {/* Project Image */}
              <div className="relative aspect-video overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                  <motion.a
                    href={project.link}
                    className="btn-primary text-sm px-4 py-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Live Demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.a>
                  {project.github && (
                    <motion.a
                      href={project.github}
                      className="btn-secondary text-sm px-4 py-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </motion.a>
                  )}
                </div>
                {/* Placeholder image */}
                <div className="absolute inset-0 bg-gradient-to-br from-surface-elevated via-surface to-background flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <span className="text-4xl">🎯</span>
                    </div>
                    <p className="text-text-muted text-sm">{project.category}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Category badge */}
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className={cn(
                    'inline-block mb-3 px-3 py-1 text-xs font-medium rounded-full',
                    categoryColors[project.category] || categoryColors.Trading
                  )}
                >
                  {project.category}
                </motion.span>

                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="font-display text-xl font-bold text-text mb-3 group-hover:text-primary transition-colors"
                >
                  {project.title}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="text-text-secondary mb-4 line-clamp-3"
                >
                  {project.shortDescription}
                </motion.p>

                {/* Tech tags */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="flex flex-wrap gap-2 mb-4"
                >
                  {project.tech.slice(0, 5).map((tech, j) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + j * 0.05, duration: 0.3 }}
                      className="tag group-hover:text-primary group-hover:border-primary/50 transition-colors"
                    >
                      {tech}
                    </motion.span>
                  ))}
                  {project.tech.length > 5 && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + 5 * 0.05, duration: 0.3 }}
                      className="tag"
                    >
                      +{project.tech.length - 5} more
                    </motion.span>
                  )}
                </motion.div>

                {/* Featured badge */}
                {project.featured && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    className="absolute top-4 right-4"
                  >
                    <span className="px-2 py-1 text-xs font-bold text-background bg-accent rounded-full">
                      Featured
                    </span>
                  </motion.div>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        {/* View all projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <motion.a
            href="#contact"
            className="btn-secondary inline-flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Discuss a Project
            <ArrowRight className="h-5 w-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
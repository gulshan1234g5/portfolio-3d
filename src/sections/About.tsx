'use client';

import { motion } from 'framer-motion';
import { Code, Bot, Globe, Box } from 'lucide-react';
import { cn } from '@/lib/utils';
import { skills, experience } from '@/data/portfolio';

export function About() {
  return (
    <section id="about" className="py-24 lg:py-32 relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="badge mb-4">About Me</span>
          <h2 className="font-display text-display-lg font-bold text-text mb-6">
            Building Digital Experiences
            <br />
            <span className="text-gradient">That Feel Alive</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
            I'm Gulshan Toppo, a creative developer and automation builder passionate about
            crafting digital experiences that push the boundaries of what's possible on the web.
            With a background in algorithmic trading systems and full-stack development,
            I specialize in building high-performance, visually stunning applications.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: Code, title: 'Full-Stack Development', desc: 'Modern web apps with React, Next.js, Node.js & TypeScript' },
            { icon: Bot, title: 'Automation Systems', desc: 'Workflow automation, document processing & orchestration' },
            { icon: Box, title: '3D Web Experiences', desc: 'Immersive WebGL, Three.js, custom shaders & WebGL' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="glass-card p-8 text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-500">
                <item.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="font-display text-xl font-bold text-text mb-3">{item.title}</h3>
              <p className="text-text-secondary">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass-card p-8 md:p-12">
            <h3 className="font-display text-2xl font-bold text-text mb-6 text-center">Development Philosophy</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Code should be as elegant as the interface it powers',
                'Performance is a feature, not an afterthought',
                'Automation amplifies human creativity, not replaces it',
                '3D on the web should feel native, not novelty',
                'Every millisecond of latency matters',
                'Clean code enables fearless refactoring',
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="flex items-start gap-4 p-4 bg-surface/50 rounded-xl border border-border/30"
                >
                  <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                    <span className="text-primary font-bold text-lg">✓</span>
                  </div>
                  <p className="text-text-secondary">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
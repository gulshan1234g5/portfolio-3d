'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { services } from '@/data/portfolio';

const serviceIcons = {
  'trending-up': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  bot: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.429 15.429a12.108 12.108 0 01-5.071 2.071c-2.578.761-5.248.43-7.124-1.07-1.876-1.501-2.79-3.704-2.79-5.964 0-3.054 1.805-5.588 4.23-6.75a1.427 1.427 0 012.574-.294 13.185 13.185 0 016.396 1.924c1.76.954 2.589 2.694 2.589 4.549 0 1.66-.666 3.295-1.805 4.537" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  cube: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.058 8.392l3.388 2.54.869 3.846-3.036 2.281-3.036-2.28.869-3.846 3.388-2.541 3.388 2.54-.869 3.846-3.036 2.281-3.036-2.28.869-3.846z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.364 17.656l3.388-2.541-.869-3.846 3.036-2.28.869 3.846 3.388 2.541-3.388 2.54-.869 3.847-3.036 2.281-3.036-2.28.869-3.847z" />
    </svg>
  ),
  code: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
};

export function Services() {
  return (
    <section id="services" className="py-24 lg:py-32 bg-surface/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="badge mb-4">Services</span>
          <h2 className="font-display text-display-lg font-bold text-text mb-6">
            What I
            <br />
            <span className="text-gradient">Offer</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
            Specialized services for companies looking to automate, scale, and innovate.
            From trading systems to 3D web experiences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="group relative glass-card p-8 overflow-hidden"
            >
              {/* Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="w-16 h-16 mb-6 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary/20 group-hover:border-primary/40 group-hover:text-primary transition-all duration-500"
              >
                {serviceIcons[service.icon as keyof typeof serviceIcons]}
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="font-display text-xl font-bold text-text mb-3"
              >
                {service.title}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="text-text-secondary mb-6"
              >
                {service.description}
              </motion.p>

              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="space-y-3"
              >
                {service.features.map((feature, j) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + j * 0.05, duration: 0.4 }}
                    className="flex items-start gap-3 p-3 bg-surface/50 rounded-xl border border-border/30 group-hover:border-primary/20 transition-colors"
                  >
                    <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-text-secondary">{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>

              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-xl" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
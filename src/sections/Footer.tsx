'use client';

import { motion } from 'framer-motion';
import { Mail, Github, Twitter, Linkedin, Heart, Code, Zap, Cube, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { socialLinks } from '@/data/portfolio';

export function Footer() {
  return (
    <footer className="relative border-t border-border/30 bg-surface/50">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <svg width="100%" height="100%" preserveAspectRatio="none">
          <defs>
            <pattern id="footerGrid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#00ff88" strokeWidth="0.3" opacity="0.03" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footerGrid)" />
        </svg>
      </div>

      <div className="relative section-container py-16 lg:py-24">
        <div className="grid lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-14 h-14 mb-6 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
            >
              <Code className="w-7 h-7 text-background" />
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="font-display text-2xl font-bold text-text mb-4"
            >
              GULSHAN TOPPO
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-text-secondary max-w-xs leading-relaxed"
            >
              Creative Developer · Automation Builder · Trading Systems Explorer
              <br />
              Building digital experiences that feel alive.
            </motion.p>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex gap-4 mt-8"
            >
              {socialLinks.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-11 h-11 rounded-xl bg-surface-elevated border border-border/50 flex items-center justify-center text-text-secondary hover:border-primary/50 hover:text-primary hover:bg-primary/10 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h4 className="font-semibold text-text mb-6">Quick Links</h4>
            <nav className="space-y-4">
              {[
                { label: 'Home', href: '#hero' },
                { label: 'About', href: '#about' },
                { label: 'Skills', href: '#skills' },
                { label: 'Projects', href: '#projects' },
                { label: 'Services', href: '#services' },
                { label: 'Trading Lab', href: '#trading' },
                { label: 'Experience', href: '#experience' },
                { label: 'Contact', href: '#contact' },
              ].map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.05, duration: 0.4 }}
                  whileHover={{ x: 4 }}
                  className="block text-text-secondary hover:text-primary transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h4 className="font-semibold text-text mb-6">Services</h4>
            <nav className="space-y-4">
              {[
                'Trading Systems Development',
                'Process Automation',
                '3D Web Experiences',
                'Full-Stack Web Development',
              ].map((service, i) => (
                <motion.a
                  key={service}
                  href="#services"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.05, duration: 0.4 }}
                  whileHover={{ x: 4 }}
                  className="block text-text-secondary hover:text-primary transition-colors"
                >
                  {service}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="border-t border-border/30 my-12"
        />

        {/* Bottom */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="text-text-secondary text-sm"
          >
            © {new Date().getFullYear()} Gulshan Toppo. Built with precision and passion.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="flex items-center gap-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.4 }}
              className="flex items-center gap-2 text-text-secondary text-sm"
            >
              <Heart className="h-4 w-4 text-red-500" aria-hidden="true" />
              <span>Made with care</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3, duration: 0.4 }}
              className="flex items-center gap-2 text-text-secondary text-sm"
            >
              <Zap className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>Powered by passion</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4, duration: 0.4 }}
              className="flex items-center gap-2 text-text-secondary text-sm"
            >
              <Cube className="h-4 w-4 text-secondary" aria-hidden="true" />
              <span>3D powered</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.4 }}
              className="flex items-center gap-2 text-text-secondary text-sm"
            >
              <TrendingUp className="h-4 w-4 text-green-400" aria-hidden="true" />
              <span>Always growing</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
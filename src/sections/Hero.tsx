'use client';

import { motion, Suspense, lazy } from 'react';
import { useEffect, useState } from 'react';
import { ArrowRight, MousePointer } from 'lucide-react';
import { HeroCanvas } from '@/three/HeroScene';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useMediaQuery';
import ThreeDErrorBoundary from '@/components/ThreeDErrorBoundary';
import { ThreeDFallback } from '@/components/ThreeDFallbacks';

const Hero3DScene = lazy(() => import('@/three/HeroScene').then(m => ({ default: m.Hero3DScene })));

export function Hero() {
  const [threeReady, setThreeReady] = useState(false);
  const [show3D, setShow3D] = useState(true);
  const [showFallback, setShowFallback] = useState(false);
  const [webglSupported, setWebglSupported] = useState<true | false | null>(null);

  // WebGL capability check - runs immediately on mount
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
      
      // Check for basic WebGL 2 features
      const ext = gl.getExtension('OES_texture_float');
      if (!ext) {
        console.warn('WebGL float texture extension not supported');
      }
      setWebglSupported(true);
    } catch (e) {
      console.warn('WebGL check failed:', e);
      setWebglSupported(false);
    }
  }, []);

  // 5-second timeout for 3D initialization
  useEffect(() => {
    if (!show3D) return;
    const timeout = setTimeout(() => {
      if (show3D) {
        console.log('[Hero] 3D timeout reached - disabling 3D');
        setShow3D(false);
        setShowFallback(true);
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [show3D]);

  const reducedMotion = useReducedMotion();

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Premium CSS Fallback - Always rendered first */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {/* Premium CSS fallback - always visible, enhanced when 3D works */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/50 to-background" />
        <div className="absolute inset-0 z-5 opacity-5" aria-hidden="true">
          <svg width="100%" height="100%" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#00ff88" strokeWidth="0.5" opacity="0.1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Floating orbs for atmosphere */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-float" aria-hidden="true" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary/5 blur-3xl animate-float animation-delay-1000" aria-hidden="true" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-accent/5 blur-3xl animate-float animation-delay-2000" aria-hidden="true" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 z-5 opacity-5" aria-hidden="true">
          <svg width="100%" height="100%" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#00ff88" strokeWidth="0.5" opacity="0.1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Main content - Always visible immediately */}
      <div className="relative z-10 section-container min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center max-w-5xl mx-auto px-6"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Available for freelance & consulting
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-display text-display-xl font-bold text-text mb-6 tracking-tight"
          >
            <span className="block">GULSHAN TOPPO</span>
          </motion.h1>

          {/* Titles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 flex-wrap"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-display-sm font-medium text-text text-gradient"
            >
              Creative Developer
            </motion.span>
            <span className="text-text-muted">•</span>
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="text-display-sm font-medium text-text text-gradient"
            >
              Automation Builder
            </motion.span>
            <span className="text-text-muted">•</span>
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-display-sm font-medium text-text text-gradient-warm"
            >
              Trading Systems Explorer
            </motion.span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-display-sm text-text-secondary max-w-2xl mx-auto mb-12 font-light"
          >
            Create Digital Experiences That Feel Alive.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              href="#projects"
              className="group btn-primary magnetic-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Projects
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </motion.a>
            <motion.a
              href="#contact"
              className="btn-secondary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore My Work
            </motion.a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-2 text-text-muted"
            >
              <MousePointer className="h-6 w-6" />
              <span className="text-xs font-medium uppercase tracking-wider">Scroll</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 w-full max-w-5xl px-6"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '5+', label: 'Years Experience' },
              { value: '50+', label: 'Projects Delivered' },
              { value: '30+', label: 'Technologies' },
              { value: '100%', label: 'Client Satisfaction' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="font-display text-3xl md:text-4xl font-bold text-text mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-text-secondary">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 3D Canvas - Loaded asynchronously, NEVER blocks the page */}
<div className="absolute inset-0 z-0" aria-hidden="true">
          {show3D && webglSupported ? (
            <ThreeDErrorBoundary fallback={<ThreeDFallback onRetry={() => window.location.reload()} />}>
              <Suspense fallback={null}>
                <HeroCanvas 
                  onCreated={() => {
                    console.log('[Hero] WebGL canvas created successfully');
                    setShowFallback(false);
                  }}
                />
              </Suspense>
            </ThreeDErrorBoundary>
          ) : (
          <>
            {!webglSupported && <StaticHeroFallback />}
            {!show3D && <StaticHeroFallback />}
          </>
        )}
      </div>
    </section>
  );
}

function StaticHeroFallback() {
  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/50 to-background" />
      <div className="absolute inset-0 z-5 opacity-5" aria-hidden="true">
        <svg width="100%" height="100%" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#00ff88" strokeWidth="0.5" opacity="0.1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Floating orbs for atmosphere */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-float" aria-hidden="true" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary/5 blur-3xl animate-float animation-delay-1000" aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-accent/5 blur-3xl animate-float animation-delay-2000" aria-hidden="true" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 z-5 opacity-5" aria-hidden="true">
        <svg width="100%" height="100%" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#00ff88" strokeWidth="0.5" opacity="0.1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </div>
  );
}
'use client';

import { motion } from 'framer-motion';
import { RefreshCw, AlertCircle, WifiOff } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ThreeDFallback({ onRetry }: { onRetry: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-background px-6"
    >
      <div className="text-center max-w-md mx-auto px-6">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400"
        >
          <AlertCircle className="w-10 h-10" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="font-syne text-2xl font-bold text-text mb-4"
        >
          3D Experience Unavailable
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-text-secondary mb-8 max-w-md mx-auto leading-relaxed"
        >
          Your browser or device doesn&apos;t support WebGL, which is required for the 3D experience. 
          The site will now show a lightweight version without 3D effects.
        </motion.p>

        <motion.button
          onClick={() => window.location.reload()}
          className="btn-primary w-full sm:w-auto"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Reload & Retry 3D
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="mt-6 text-sm text-text-muted"
        >
          Or continue without 3D effects
        </motion.p>
      </div>
    </motion.div>
  );
}

export function NetworkErrorFallback({ onRetry }: { onRetry: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-background px-6"
    >
      <div className="text-center max-w-md mx-auto px-6">
        <motion.div
          initial={{ scale: 0, rotate: 180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400"
        >
          <WifiOff className="w-10 h-10" />
        </motion.div>
        <h2 className="font-syne text-2xl font-bold text-text mb-4">Connection Lost</h2>
        <p className="text-text-secondary mb-8 max-w-md mx-auto leading-relaxed">
          Unable to load the 3D experience. Please check your internet connection and try again.
        </p>
        <motion.button
          onClick={() => window.location.reload()}
          className="btn-primary"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-5 h-5 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.001 8.001 0 01-15.357-2m15.357 2H15" />
          </svg>
          Retry Connection
        </motion.button>
      </div>
    </motion.div>
  );
}

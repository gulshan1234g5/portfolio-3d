'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, AlertTriangle, WifiOff, Code, AlertCircle, Monitor, WifiOff as WifiOffIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function HeroErrorBoundary({ children, fallback }: Props) {
  const [errorState, setErrorState] = useState<{ hasError: boolean; error: Error | null; errorType: 'webgl' | 'network' | 'unknown' }>({
    hasError: false,
    error: null,
    errorType: 'unknown',
  });

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      const error = event.error || new Error(event.message);
      let errorType: 'webgl' | 'network' | 'unknown' = 'unknown';
      const errorMessage = error.message.toLowerCase();
      const errorStack = error.stack?.toLowerCase() || '';
      
      if (
        errorMessage.includes('webgl') ||
        errorMessage.includes('webgl2') ||
        errorMessage.includes('context') ||
        errorMessage.includes('canvas') ||
        errorMessage.includes('webgl context') ||
        errorStack.includes('webgl') ||
        errorStack.includes('webgl2') ||
        errorMessage.includes('losecontext') ||
        errorMessage.includes('context lost')
      ) {
        errorType = 'webgl';
      } else if (
        errorMessage.includes('network') ||
        errorMessage.includes('fetch') ||
        errorMessage.includes('timeout') ||
        errorMessage.includes('econnrefused') ||
        errorMessage.includes('enotfound')
      ) {
        errorType = 'network';
      }

      setErrorState({ hasError: true, error, errorType });
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      const error = event.reason instanceof Error ? event.reason : new Error(String(event.reason));
      setErrorState({ hasError: true, error, errorType: 'unknown' });
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);
    
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, []);

  const handleRetry = () => {
    setErrorState({ hasError: false, error: null, errorType: 'unknown' });
    window.location.reload();
  };

  if (errorState.hasError) {
    const { error, errorType } = errorState;
    
    if (errorType === 'webgl') {
      return <Hero3DFallback onRetry={handleRetry} />;
    }
    
    if (errorType === 'network') {
      return <NetworkErrorFallback onRetry={() => window.location.reload()} />;
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen flex items-center justify-center bg-background px-6"
      >
        <div className="text-center max-w-md mx-auto px-6">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400"
          >
            <AlertTriangle className="w-10 h-10" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="font-syne text-2xl font-bold text-text mb-4"
          >
            Something went wrong
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-text-secondary mb-8 max-w-md mx-auto leading-relaxed"
          >
            An unexpected error occurred while loading the 3D experience. 
            This might be due to a WebGL compatibility issue or a temporary glitch.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="space-y-4"
          >
            <button
              onClick={() => window.location.reload()}
              className="btn-primary w-full sm:w-auto"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
              Reload Page
            </button>

            <button
              onClick={() => window.location.href = '/'}
              className="btn-secondary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Go Home
            </button>
          </motion.div>

          <motion.details
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="mt-8 text-left max-w-md mx-auto"
          >
            <summary className="cursor-pointer text-sm text-text-secondary flex items-center gap-2 select-none">
              <Code className="w-4 h-4" />
              Technical Details
            </summary>
            <pre className="mt-3 p-4 bg-surface border border-border/30 rounded-xl text-xs text-text-secondary overflow-auto max-h-64">
              {error?.message}
              {error?.stack}
            </pre>
          </motion.details>
        </div>
      </motion.div>
    );
  }

  return <>{children}</>;
}

export function Hero3DFallback({ onRetry }: { onRetry: () => void }) {
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.001 8.001 0 00-15.357-2m15.357 2H15" />
          </svg>
          Retry Connection
        </motion.button>
      </div>
    </motion.div>
  );
}
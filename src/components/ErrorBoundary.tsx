'use client';

import { Component, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, AlertTriangle, WifiOff, Code } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
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
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-text-secondary mb-8 max-w-md mx-auto"
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
                <svg className="w-5 h-5 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reload Page
              </button>

              <button
                onClick={() => {
                  window.location.href = '/';
                }}
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
                {this.state.error?.message}
                {this.state.error?.stack}
              </pre>
            </motion.details>
          </div>
      </motion.div>
    );
  }
  }
}

export function WebGLFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20L9.125 17L18 12L9.875 17L9 20L9.125 17" />
          </svg>
        </div>
        <h2 className="font-syne text-2xl font-bold text-text mb-4">WebGL Not Supported</h2>
        <p className="text-text-secondary mb-8 max-w-md mx-auto leading-relaxed">
          Your browser or device doesn&apos;t support WebGL, which is required for the 3D experience. 
          Please try a modern browser like Chrome, Firefox, Safari, or Edge with hardware acceleration enabled.
        </p>
        <div className="space-y-4">
          <a href="https://www.google.com/chrome/" target="_blank" rel="noopener noreferrer" className="btn-primary w-full sm:w-auto" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            Download Chrome
          </a>
          <a href="https://www.mozilla.org/firefox/" target="_blank" rel="noopener noreferrer" className="btn-secondary" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            Download Firefox
          </a>
        </div>
      </div>
    </div>
  );
}

export function NetworkErrorFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
          <WifiOff className="w-10 h-10" />
        </div>
        <h2 className="font-syne text-2xl font-bold text-text mb-4">Connection Lost</h2>
        <p className="text-text-secondary mb-8 max-w-md mx-auto leading-relaxed">
          Unable to load the 3D experience. Please check your internet connection and try again.
        </p>
        <motion.button
          onClick={() => window.location.reload()}
          className="btn-primary"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
          Retry
        </motion.button>
      </div>
    </div>
  );
}
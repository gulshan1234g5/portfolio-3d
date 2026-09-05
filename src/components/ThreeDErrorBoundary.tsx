'use client';

import { Component, ReactNode, ErrorInfo } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, AlertTriangle, Code } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ThreeDErrorBoundary extends Component<{ children: React.ReactNode }, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ThreeDErrorBoundary] caught error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
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
              3D Experience Failed
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-text-secondary mb-8 max-w-md mx-auto leading-relaxed"
            >
              The 3D experience encountered an error. This is usually due to a WebGL compatibility issue.
              The rest of the site works perfectly without 3D.
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
                Reload & Retry 3D
              </button>

              <button
                onClick={() => window.location.href = '/'}
                className="btn-secondary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Continue Without 3D
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

    return this.props.children;
  }
}

export default ThreeDErrorBoundary;
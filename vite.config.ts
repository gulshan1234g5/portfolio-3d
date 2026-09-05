import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  base: '/portfolio-3d/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'framer-motion'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          gsap: ['gsap'],
          fonts: ['@fontsource-variable/space-grotesk', '@fontsource-variable/jetbrains-mono', '@fontsource/syne'],
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    cssCodeSplit: true,
    modulePreload: {
      polyfill: true,
    },
  },
  server: {
    port: 3000,
    host: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'three', '@react-three/fiber', '@react-three/drei', 'gsap'],
  },
});
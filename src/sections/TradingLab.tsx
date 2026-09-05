'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Shield, Target, Zap, BarChart2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TradingCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  metrics: {
    label: string;
    value: string;
    change?: number;
  }[];
}

const tradingCards: TradingCard[] = [
  {
    id: 'trading-systems',
    title: 'Trading Systems',
    description: 'Algorithmic execution engines with smart order routing and latency optimization.',
    icon: <Zap className="h-6 w-6" />,
    color: 'text-green-400',
    metrics: [
      { label: 'Latency', value: '< 1ms' },
      { label: 'Uptime', value: '99.99%' },
      { label: 'Orders/sec', value: '10,000+' },
    ],
  },
  {
    id: 'automation',
    title: 'Automation',
    description: 'Intelligent workflow orchestration with event-driven architecture.',
    icon: <Bot className="h-6 w-6" />,
    color: 'text-blue-400',
    metrics: [
      { label: 'Workflows', value: '500+' },
      { label: 'Success Rate', value: '99.9%' },
      { label: 'Time Saved', value: '85%' },
    ],
  },
  {
    id: 'apis',
    title: 'APIs',
    description: 'High-performance REST and WebSocket APIs with rate limiting and caching.',
    icon: <Zap className="h-6 w-6" />,
    color: 'text-purple-400',
    metrics: [
      { label: 'RPS', value: '50,000+' },
      { label: 'Latency', value: '< 5ms' },
      { label: 'Availability', value: '99.99%' },
    ],
  },
  {
    id: 'data-analysis',
    title: 'Data Analysis',
    description: 'Real-time analytics pipelines with complex event processing.',
    icon: <BarChart2 className="h-6 w-6" />,
    color: 'text-orange-400',
    metrics: [
      { label: 'Events/day', value: '10M+' },
      { label: 'Processing', value: 'Real-time' },
      { label: 'Accuracy', value: '99.99%' },
    ],
  },
  {
    id: 'workflow-tools',
    title: 'Workflow Tools',
    description: 'Developer productivity tools for CI/CD, testing, and deployment automation.',
    icon: <Zap className="h-6 w-6" />,
    color: 'text-pink-400',
    metrics: [
      { label: 'Pipelines', value: '200+' },
      { label: 'Build Time', value: '< 5min' },
      { label: 'Deploy Freq', value: '50/day' },
    ],
  },
];

export function TradingLab() {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  return (
    <section id="trading" className="py-24 lg:py-32 bg-surface/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="badge mb-4">Trading & Automation Lab</span>
          <h2 className="font-display text-display-lg font-bold text-text mb-6">
            Trading & Automation
            <br />
            <span className="text-gradient">Lab</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
            Exploring the intersection of algorithmic trading, intelligent automation,
            and high-performance systems. Real systems, real results.
          </p>
        </motion.div>

        {/* Active card detail view */}
        {activeCard && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-16"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="glass-card p-8 md:p-12 relative overflow-hidden"
            >
              <motion.button
                onClick={() => setActiveCard(null)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-surface/50 hover:bg-surface hover:border-border/50 border border-border/30 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Close detail view"
              >
                <svg className="w-6 h-6 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              {tradingCards.map(card => {
                if (card.id !== activeCard) return null;
                return (
                  <motion.div key={card.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.4 }}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className={cn('w-16 h-16 rounded-2xl flex items-center justify-center', `bg-${card.color.replace('text-', 'bg-')}/10 border border-${card.color.replace('text-', 'border-')}/20`)}>
                        <span className="w-8 h-8">{card.icon}</span>
                      </div>
                      <div>
                        <h3 className="font-display text-2xl font-bold text-text">{card.title}</h3>
                        <p className="text-text-secondary mt-1">{card.description}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-8">
                      {card.metrics.map((metric, i) => (
                        <motion.div
                          key={metric.label}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05, duration: 0.4 }}
                          className="glass-card p-6 text-center"
                        >
                          <div className="font-display text-3xl font-bold text-text mb-1">{metric.value}</div>
                          <div className="text-sm text-text-secondary">{metric.label}</div>
                        </motion.div>
                      ))}
                    </div>

                    <motion.button
                      onClick={() => setActiveCard(null)}
                      className="btn-secondary w-full md:w-auto"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Back to Overview
                    </motion.button>
                  </motion.div>
                ))}
              </motion.div>
            )}

        {/* Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tradingCards.map((card, i) => (
              <motion.article
                key={card.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                onClick={() => setActiveCard(card.id)}
                className={cn(
                  'group relative glass-card p-8 cursor-pointer overflow-hidden',
                  'hover:border-primary/30 hover:shadow-[0_0_60px_-10px_rgba(0,255,136,0.15)] hover:-translate-y-2 transition-all duration-500'
                )}
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className={cn(
                    'w-14 h-14 mb-6 rounded-2xl flex items-center justify-center',
                    `bg-${card.color.replace('text-', 'bg-')}/10 border border-${card.color.replace('text-', 'border-')}/20 text-${card.color} group-hover:bg-${card.color.replace('text-', 'bg-')}/20 group-hover:border-${card.color.replace('text-', 'border-')}/40 transition-all duration-500`
                  )}
                >
                  <span className="w-7 h-7">{card.icon}</span>
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="font-display text-xl font-bold text-text mb-3"
                >
                  {card.title}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="text-text-secondary mb-6"
                >
                  {card.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="space-y-3"
                >
                  {card.metrics.map((metric, j) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + j * 0.05, duration: 0.4 }}
                      className="flex items-center justify-between p-3 rounded-lg bg-surface/50 border border-border/30 group-hover:border-primary/20 transition-colors"
                    >
                      <span className="text-sm text-text-secondary">{metric.label}</span>
                      <span className="font-mono font-semibold text-text">{metric.value}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-xl" />
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
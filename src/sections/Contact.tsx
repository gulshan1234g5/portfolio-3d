'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Twitter, Linkedin, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { socialLinks } from '@/data/portfolio';
import { useReducedMotion } from '@/hooks/useMediaQuery';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const reducedMotion = useReducedMotion();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.trim().length < 20) newErrors.message = 'Message must be at least 20 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('loading');
    try {
      // Simulate form submission (replace with actual endpoint)
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <section id="contact" className="py-24 lg:py-32">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="badge mb-4">Get In Touch</span>
          <h2 className="font-display text-display-lg font-bold text-text mb-6">
            Let&apos;s Build
            <br />
            <span className="text-gradient">Something Great</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
            Have a project in mind? I&apos;m always open to discussing new opportunities, 
            interesting challenges, or just saying hello.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <div className="glass-card p-8 md:p-10">
              <h3 className="font-display text-2xl font-bold text-text mb-8">Send a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={cn(
                      'w-full px-4 py-4 rounded-xl bg-surface border transition-all duration-300',
                      'placeholder:text-text-muted',
                      'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary',
                      errors.name && 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50'
                    )}
                    placeholder="Your name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      id="name-error"
                      className="mt-2 text-sm text-red-400 flex items-center gap-1"
                    >
                      <AlertCircle className="h-4 w-4" />
                      {errors.name}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={cn(
                      'w-full px-4 py-4 rounded-xl bg-surface border transition-all duration-300',
                      'placeholder:text-text-muted',
                      'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary',
                      errors.email && 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50'
                    )}
                    placeholder="you@example.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      id="email-error"
                      className="mt-2 text-sm text-red-400 flex items-center gap-1"
                    >
                      <AlertCircle className="h-4 w-4" />
                      {errors.email}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <label htmlFor="subject" className="block text-sm font-medium text-text-secondary mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={cn(
                      'w-full px-4 py-4 rounded-xl bg-surface border transition-all duration-300',
                      'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary',
                      errors.subject && 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50'
                    )}
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                  >
                    <option value="">Select a topic</option>
                    <option value="trading">Trading Systems Development</option>
                    <option value="automation">Process Automation</option>
                    <option value="web3d">3D Web Experiences</option>
                    <option value="web-dev">Full-Stack Web Development</option>
                    <option value="consulting">Technical Consulting</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.subject && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      id="subject-error"
                      className="mt-2 text-sm text-red-400 flex items-center gap-1"
                    >
                      <AlertCircle className="h-4 w-4" />
                      {errors.subject}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={cn(
                      'w-full px-4 py-4 rounded-xl bg-surface border transition-all duration-300 resize-none',
                      'placeholder:text-text-muted',
                      'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary',
                      errors.message && 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50'
                    )}
                    placeholder="Tell me about your project, goals, or just say hello..."
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      id="message-error"
                      className="mt-2 text-sm text-red-400 flex items-center gap-1"
                    >
                      <AlertCircle className="h-4 w-4" />
                      {errors.message}
                    </motion.p>
                  )}
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary py-4 flex items-center justify-center gap-3"
                >
                  {status === 'loading' && (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  )}
                  {status !== 'loading' && (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>

                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-3 text-green-400"
                  >
                    <CheckCircle className="h-5 w-5 flex-shrink-0" />
                    <p>Message sent successfully! I&apos;ll get back to you soon.</p>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400"
                  >
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    <p>Failed to send message. Please try again or email directly.</p>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass-card p-8 md:p-10 h-full">
              <h3 className="font-display text-2xl font-bold text-text mb-8">Let&apos;s Connect</h3>

              <div className="space-y-6 mb-12">
                {socialLinks.map((social, i) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex items-center gap-4 p-4 rounded-xl bg-surface/50 border border-border/30 hover:border-primary/30 hover:bg-surface/70 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary/20 group-hover:border-primary/40 group-hover:text-primary transition-all duration-300">
                      <social.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary">Connect on {social.label}</p>
                      <p className="font-medium text-text">{social.label}</p>
                    <svg className="h-5 w-5 text-text-muted group-hover:text-primary transition-colors ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </motion.a>
                ))}
              </div>

              <div className="pt-8 border-t border-border/30">
                <h4 className="font-medium text-text mb-4">Or email directly</h4>
                <motion.a
                  href="mailto:toppo.gulshan@gmail.com"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary-dim font-medium transition-colors"
                  whileHover={{ x: 4 }}
                >
                  <Mail className="h-5 w-5" />
                  toppo.gulshan@gmail.com
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
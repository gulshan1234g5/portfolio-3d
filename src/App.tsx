import { Suspense, lazy } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/sections/Footer';
import { Hero } from '@/sections/Hero';
import { About } from '@/sections/About';
import { Skills } from '@/sections/Skills';
import { Projects } from '@/sections/Projects';
import { Services } from '@/sections/Services';
import { TradingLab } from '@/sections/TradingLab';
import { Experience } from '@/sections/Experience';
import { Contact } from '@/sections/Contact';
import { cn } from '@/lib/utils';

const LoadingFallback = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      <p className="text-text-secondary font-medium">Loading...</p>
    </div>
  </div>
);

// Lazy load heavy sections
const AboutSection = lazy(() => import('@/sections/About').then(m => ({ default: m.About })));
const SkillsSection = lazy(() => import('@/sections/Skills').then(m => ({ default: m.Skills })));
const ProjectsSection = lazy(() => import('@/sections/Projects').then(m => ({ default: m.Projects })));
const ServicesSection = lazy(() => import('@/sections/Services').then(m => ({ default: m.Services })));
const TradingLabSection = lazy(() => import('@/sections/TradingLab').then(m => ({ default: m.TradingLab })));
const ExperienceSection = lazy(() => import('@/sections/Experience').then(m => ({ default: m.Experience })));
const ContactSection = lazy(() => import('@/sections/Contact').then(m => ({ default: m.Contact })));

function App() {
  return (
    <>
      <Navigation />
      <main id="main" className="relative min-h-screen">
        <Suspense fallback={<LoadingFallback />}>
          <Hero />
        </Suspense>
        
        <Suspense fallback={<LoadingFallback />}>
          <AboutSection />
        </Suspense>
        
        <Suspense fallback={<LoadingFallback />}>
          <SkillsSection />
        </Suspense>
        
        <Suspense fallback={<LoadingFallback />}>
          <ProjectsSection />
        </Suspense>
        
        <Suspense fallback={<LoadingFallback />}>
          <ServicesSection />
        </Suspense>
        
        <Suspense fallback={<LoadingFallback />}>
          <TradingLabSection />
        </Suspense>
        
        <Suspense fallback={<LoadingFallback />}>
          <ExperienceSection />
        </Suspense>
        
        <Suspense fallback={<LoadingFallback />}>
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default App;
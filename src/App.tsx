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

function App() {
  return (
    <>
      <Navigation />
      <main id="main" className="relative min-h-screen">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <TradingLab />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
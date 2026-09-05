import { useEffect, useRef, useState, useCallback } from 'react';
import Lenis from 'lenis';

export function useLenis() {
  const [lenis] = useState(() => {
    if (typeof window === 'undefined') return null;

    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenisInstance?.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return lenisInstance;
  });

  return lenis;
}

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(scrollProgress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}

export function useScrollPosition(): { x: number; y: number } {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setPosition({ x: window.scrollX, y: window.scrollY });
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return position;
}

export function useScrollDirection(): 'up' | 'down' | null {
  const { y } = useScrollPosition();
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  const lastY = useRef(y);

  useEffect(() => {
    if (y > lastY.current) setDirection('down');
    else if (y < lastY.current) setDirection('up');
    lastY.current = y;
  }, [y]);

  return direction;
}

export function useScrollTo(): (target: string | number, options?: { offset?: number; duration?: number }) => void {
  const lenis = useLenis();

  return useCallback(
    (target: string | number, options: { offset?: number; duration?: number } = {}) => {
      if (!lenis) return;

      const targetElement = typeof target === 'string' ? document.querySelector(target) : null;
      const scrollTarget = targetElement ? targetElement.getBoundingClientRect().top + window.scrollY : target;
      const offset = options.offset || 0;
      const targetScroll = scrollTarget + offset;

      lenis.scrollTo(targetScroll, {
        duration: options.duration || 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    },
    [lenis]
  );
}
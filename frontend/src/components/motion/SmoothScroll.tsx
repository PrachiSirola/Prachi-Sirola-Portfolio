import { useEffect } from 'react';
import Lenis from 'lenis';

/** Inertial smooth scrolling. Skipped when the user prefers reduced motion. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4) });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Route in-page anchor clicks through Lenis so nav links glide too.
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      const hash = anchor?.getAttribute('href');
      if (!anchor || !hash || hash === '#' || hash.startsWith('#main')) return;
      const target = document.querySelector<HTMLElement>(hash);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: -72, duration: 1.4 });
    };
    document.addEventListener('click', onClick);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('click', onClick);
      lenis.destroy();
    };
  }, []);

  return null;
}

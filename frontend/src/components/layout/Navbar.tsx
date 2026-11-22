import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import { NAV_LINKS, PERSONAL_INFO } from '../../data/portfolioData';
import { useActiveSection } from '../../hooks/useActiveSection';

const SECTION_IDS = NAV_LINKS.map((link) => link.href.replace('#', ''));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-ink/15 bg-paper/90 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav
        aria-label="Primary Navigation"
        className="mx-auto flex h-20 max-w-[1320px] items-center justify-between px-5 sm:px-8"
      >
        <a
          href="#top"
          className="flex items-center gap-2 whitespace-nowrap font-sans text-xs font-semibold uppercase tracking-[0.22em] text-ink transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-terra"
          aria-label="Prachi Sirola Home"
        >
          <span
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink font-logo text-[19px] normal-case leading-none tracking-normal text-terra"
            aria-hidden="true"
          >
            PS
          </span>
          <span>{PERSONAL_INFO.role}</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map((item) => {
              const id = item.href.replace('#', '');
              const isActive = activeSection === id;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`text-[11px] font-medium uppercase tracking-[0.18em] transition-colors ${
                      isActive ? 'text-terra' : 'text-ink-700 hover:text-ink'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <a
            href="#contact"
            className="hidden items-center gap-3 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.18em] text-ink transition-colors hover:text-terra lg:inline-flex"
          >
            <span>Available for work</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="inline-flex h-11 w-11 items-center justify-center border border-ink/30 text-ink transition-colors hover:border-ink md:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="border-b border-ink/15 bg-paper px-6 pb-8 pt-4 md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-3.5 text-sm font-medium uppercase tracking-[0.16em] text-ink transition-colors hover:text-terra"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="btn-terra mt-5 flex min-h-[44px] w-full items-center justify-center gap-2 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em]"
            >
              <span>Let&apos;s Connect</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

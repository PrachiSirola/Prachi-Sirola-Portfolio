import { Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

export function Footer() {
  const year = new Date().getFullYear();
  const iconLink =
    'inline-flex h-11 w-11 items-center justify-center border border-ink/30 text-ink transition-colors hover:border-terra hover:bg-terra hover:text-paper';

  return (
    <footer className="border-t border-ink/25">
      <div className="mx-auto flex max-w-[1320px] flex-col items-center justify-between gap-5 px-5 py-8 sm:flex-row sm:px-8">
        <p className="text-center text-xs text-ink-500 sm:text-left">
          <span className="font-serif text-lg text-ink">{PERSONAL_INFO.monogram}</span>
          <span className="mx-3 text-ink/25">|</span>
          &copy; {year} {PERSONAL_INFO.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-2.5">
          <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={iconLink}>
            <Linkedin className="h-4 w-4" />
          </a>
          <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" aria-label="GitHub" className={iconLink}>
            <Github className="h-4 w-4" />
          </a>
          <a href={`mailto:${PERSONAL_INFO.email}`} aria-label="Email Prachi Sirola" className={iconLink}>
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { EDITORIAL_EASE, viewportConfig } from '../../utils/motion';

interface SectionHeadingProps {
  /** First word(s), ink. */
  title: string;
  /** Second word(s), terracotta. */
  accent: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}

/** Two-tone serif heading with a side description and arrow link, as in the reference. */
export function SectionHeading({ title, accent, description, actionLabel, actionHref }: SectionHeadingProps) {
  return (
    <div className="mb-10 grid items-end gap-5 border-t border-ink/25 pt-8 sm:mb-14 md:grid-cols-12">
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="font-serif text-5xl font-normal uppercase leading-[0.95] tracking-tight sm:text-6xl md:col-span-5"
      >
        <span className="block overflow-hidden pb-1">
          <motion.span
            variants={{
              hidden: { y: '108%' },
              visible: { y: '0%', transition: { duration: 0.9, ease: EDITORIAL_EASE } },
            }}
            className="block text-ink"
          >
            {title}
          </motion.span>
        </span>
        <span className="block overflow-hidden pb-1">
          <motion.span
            variants={{
              hidden: { y: '108%' },
              visible: { y: '0%', transition: { duration: 0.9, delay: 0.08, ease: EDITORIAL_EASE } },
            }}
            className="block text-terra"
          >
            {accent}
          </motion.span>
        </span>
      </motion.h2>

      {description && (
        <p className="max-w-xs text-sm leading-relaxed text-ink-700 md:col-span-4">{description}</p>
      )}

      {actionLabel && actionHref && (
        <a
          href={actionHref}
          target={actionHref.startsWith('http') ? '_blank' : undefined}
          rel={actionHref.startsWith('http') ? 'noreferrer' : undefined}
          className="group inline-flex min-h-[44px] items-center gap-4 self-end text-[11px] font-semibold uppercase tracking-[0.18em] text-ink transition-colors hover:text-terra md:col-span-3 md:justify-end"
        >
          <span>{actionLabel}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
        </a>
      )}
    </div>
  );
}

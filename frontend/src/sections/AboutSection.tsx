import { motion } from 'framer-motion';
import { ABOUT_PARAGRAPHS, EDUCATION, PERSONAL_INFO } from '../data/portfolioData';
import { SectionHeading } from '../components/ui/SectionHeading';
import { WordReveal } from '../components/motion/WordReveal';
import { EDITORIAL_EASE, viewportConfig } from '../utils/motion';

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <SectionHeading title="About" accent="Me" description="Engineer first. Builder always." />

        <WordReveal
          text={ABOUT_PARAGRAPHS[0]}
          className="max-w-5xl font-serif text-[1.7rem] leading-[1.25] tracking-tight text-ink sm:text-4xl lg:text-5xl"
        />

        <div className="mt-14 grid gap-10 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.8, ease: EDITORIAL_EASE }}
            className="space-y-5 text-[15px] leading-relaxed text-ink-700 md:col-span-7"
          >
            {ABOUT_PARAGRAPHS.slice(1).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.8, delay: 0.1, ease: EDITORIAL_EASE }}
            className="border border-ink/25 p-6 md:col-span-4 md:col-start-9"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-terra">Education</p>
            <h3 className="mt-3 font-serif text-2xl leading-tight text-ink">{EDUCATION.degree}</h3>
            <p className="mt-1 text-sm text-ink-700">{EDUCATION.institution}</p>
            <p className="mt-3 font-mono text-xs text-ink-500">
              {EDUCATION.period} &middot; CGPA {EDUCATION.cgpa}
            </p>
            <p className="mt-6 border-t border-ink/15 pt-4 font-mono text-xs text-ink-500">
              {PERSONAL_INFO.location}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { HeroCards } from '../components/ui/HeroCards';
import { Magnetic } from '../components/motion/Magnetic';
import { fadeUpVariants, lineRevealVariants } from '../utils/motion';

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const visualY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const wordY = useTransform(scrollYProgress, [0, 1], ['0%', '-6%']);

  return (
    <section ref={ref} id="top" className="relative overflow-hidden pt-24 sm:pt-28">
      {/* Vertical side labels, md+ only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-32 hidden h-72 items-center gap-4 font-mono text-[10px] uppercase tracking-[0.28em] text-ink-500 [writing-mode:vertical-rl] rotate-180 whitespace-nowrap xl:flex"
      >
        <span>AI / ML</span>
        <span className="h-10 w-px bg-ink/40" />
        <span>Full-Stack Development</span>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-[46%] hidden items-center gap-4 font-mono text-[10px] uppercase tracking-[0.28em] text-ink-500 [writing-mode:vertical-rl] whitespace-nowrap xl:flex"
      >
        <span>LLM Systems</span>
        <span className="h-10 w-px bg-ink/40" />
        <span>Backend</span>
      </div>

      <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8">
        {/* Giant display word */}
        <motion.h1
          style={{ y: wordY }}
          aria-label={`${PERSONAL_INFO.name}, ${PERSONAL_INFO.role} portfolio`}
          className="select-none font-hero text-[clamp(3.4rem,23.4vw,21rem)] uppercase leading-[0.86] tracking-[-0.01em] text-ink"
        >
          <span className="block overflow-hidden pb-[0.04em]" aria-hidden="true">
            <motion.span
              custom={0}
              variants={lineRevealVariants}
              initial="hidden"
              animate="visible"
              className="block text-center"
            >
              Portfolio
            </motion.span>
          </span>
        </motion.h1>

        <div className="relative grid items-end gap-10 lg:grid-cols-12 lg:gap-6">
          {/* Identity column */}
          <div className="relative z-10 pb-4 lg:col-span-6 lg:pb-14 xl:col-span-5">
            <motion.p
              custom={0.2}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="mt-8 font-sans text-sm font-medium uppercase tracking-[0.2em] text-ink lg:mt-0"
            >
              Hello, I&apos;m
            </motion.p>

            <h2 className="mt-2 font-serif text-[clamp(3rem,9vw,6.4rem)] font-normal uppercase leading-[0.92] tracking-tight text-ink">
              {PERSONAL_INFO.name.split(' ').map((word, i) => (
                <span key={word} className="block overflow-hidden pb-1">
                  <motion.span
                    custom={i + 1}
                    variants={lineRevealVariants}
                    initial="hidden"
                    animate="visible"
                    className="block"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h2>

            <motion.p
              custom={0.4}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-terra sm:text-sm"
            >
              {PERSONAL_INFO.role} &middot; AI/ML &amp; Full-Stack
            </motion.p>

            <motion.p
              custom={0.48}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="mt-5 max-w-md text-sm leading-relaxed text-ink-700 sm:text-[15px]"
            >
              {PERSONAL_INFO.heroDescription}
            </motion.p>

            <motion.div
              custom={0.56}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              <Magnetic>
                <a
                  href="#work"
                  className="btn-terra inline-flex min-h-[44px] items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em]"
                >
                  <span>View Projects</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={PERSONAL_INFO.resumePath}
                  download="Prachi_Sirola_Resume.pdf"
                  className="inline-flex min-h-[44px] items-center gap-2 border border-ink/80 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-ink hover:text-paper"
                >
                  <span>Resume</span>
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </Magnetic>
            </motion.div>

            <motion.p
              custom={0.64}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              aria-hidden="true"
              className="mt-6 font-script text-5xl leading-none text-ink sm:text-6xl"
            >
              {PERSONAL_INFO.name}
            </motion.p>
          </div>

          {/* Visual column overlapping the giant word */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: visualY }}
            className="relative -mt-4 lg:col-span-6 lg:-mt-[9vw] lg:self-start xl:col-span-7 xl:-mt-[8vw] 2xl:-mt-[7.5rem]"
          >
            <HeroCards />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

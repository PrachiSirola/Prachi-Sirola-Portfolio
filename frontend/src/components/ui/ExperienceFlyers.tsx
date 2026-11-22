import { motion } from 'framer-motion';
import type { ExperienceItem } from '../../types/portfolio';
import { EDITORIAL_EASE, viewportConfig } from '../../utils/motion';

const ACCENTS = ['#C65D3E', '#2F4BD9', '#3F6B5A', '#141210'];
const TAPE = ['#E8D44D', '#E3FF55', '#F1D5C8', '#E8D44D'];

interface ExperienceFlyersProps {
  items: ExperienceItem[];
}

/** Each role is a pinned paper flyer: tape, coloured masthead, bullets, tear-off tech tabs. */
export function ExperienceFlyers({ items }: ExperienceFlyersProps) {
  return (
    <ul className="grid gap-x-8 gap-y-14 md:grid-cols-2">
      {items.map((item, i) => {
        const accent = ACCENTS[i % ACCENTS.length];
        const tilt = i % 2 ? 1.6 : -1.6;
        return (
          <motion.li
            key={item.id}
            initial={{ opacity: 0, y: 90, rotate: tilt * 3 }}
            whileInView={{ opacity: 1, y: 0, rotate: tilt }}
            viewport={viewportConfig}
            whileHover={{ rotate: 0, y: -8, scale: 1.015 }}
            transition={{ duration: 0.9, delay: (i % 2) * 0.12, ease: EDITORIAL_EASE }}
            className={`relative flex flex-col bg-white shadow-[0_28px_60px_-24px_rgba(20,18,16,0.45)] ${
              i === items.length - 1 && items.length % 2 ? 'md:col-span-2 md:mx-auto md:w-1/2' : ''
            }`}
          >
            <span
              aria-hidden="true"
              className="absolute -top-3 left-1/2 z-10 h-7 w-28 -translate-x-1/2 -rotate-3 opacity-90"
              style={{ backgroundColor: TAPE[i % TAPE.length] }}
            />

            <header className="px-6 pb-5 pt-9 text-white" style={{ backgroundColor: accent }}>
              <p className="font-mono text-xs uppercase tracking-[0.2em] opacity-90">{item.period}</p>
              <h3 className="mt-2 font-hero text-4xl uppercase leading-[0.95] sm:text-5xl">{item.company}</h3>
              <p className="mt-1 text-sm opacity-80">{item.location}</p>
            </header>

            <div className="flex-1 px-6 py-6">
              <p className="font-serif text-2xl font-medium uppercase leading-tight text-ink">{item.role}</p>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink-700">
                {item.highlights.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0" style={{ backgroundColor: accent }} aria-hidden="true" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            <ul
              aria-label="Technologies"
              className="flex border-t-2 border-dashed border-ink/30"
            >
              {item.technologies.map((tech) => (
                <li
                  key={tech}
                  className="flex min-h-[96px] flex-1 items-center justify-center border-l border-dashed border-ink/30 px-1 py-3 font-mono text-[10px] uppercase tracking-wider text-ink-700 first:border-l-0 [writing-mode:vertical-rl] rotate-180"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </motion.li>
        );
      })}
    </ul>
  );
}

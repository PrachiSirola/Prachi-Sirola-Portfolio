import { motion } from 'framer-motion';
import { Brain, Layers, Rocket, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO, PILLARS, SKILL_CATEGORIES } from '../data/portfolioData';
import { SectionHeading } from '../components/ui/SectionHeading';
import { FloatingTiles } from '../components/motion/FloatingTiles';
import { EDITORIAL_EASE, viewportConfig } from '../utils/motion';

const ALL_SKILLS = SKILL_CATEGORIES.flatMap((c) => c.skills);
const HALF = Math.ceil(ALL_SKILLS.length / 2);
const ICONS = { layers: Layers, brain: Brain, shield: ShieldCheck, rocket: Rocket };

export function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <SectionHeading
          title="Skills &"
          accent="Expertise"
          description="The stack I use to take products from idea to production."
        />
      </div>

      {/* Decorative drifting rails; the static list below is the accessible source of truth */}
      <div className="mb-12 space-y-1">
        <FloatingTiles items={ALL_SKILLS.slice(0, HALF)} duration={70} />
        <FloatingTiles items={ALL_SKILLS.slice(HALF)} reverse duration={78} />
      </div>

      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        {/* Skill groups */}
        <dl className="divide-y divide-ink/15 border-y border-ink/15 lg:col-span-5">
          {SKILL_CATEGORIES.map((category, i) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.7, delay: i * 0.05, ease: EDITORIAL_EASE }}
              className="grid gap-1.5 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6"
            >
              <dt className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-ink">
                {category.title}
              </dt>
              <dd className="text-sm leading-relaxed text-ink-700">
                {category.skills.join(' · ')}
              </dd>
            </motion.div>
          ))}
        </dl>

        {/* Pull quote */}
        <motion.figure
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.8, ease: EDITORIAL_EASE }}
          className="flex flex-col justify-center lg:col-span-4 lg:border-x lg:border-ink/15 lg:px-10"
        >
          <span className="font-serif text-8xl leading-[0.6] text-terra/40" aria-hidden="true">
            &ldquo;
          </span>
          <blockquote className="mt-2 font-serif text-3xl leading-[1.2] text-ink sm:text-4xl">
            {PERSONAL_INFO.quote}
          </blockquote>
        </motion.figure>

        {/* Pillars */}
        <ul className="grid gap-6 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-1">
          {PILLARS.map((pillar, i) => {
            const Icon = ICONS[pillar.icon];
            return (
              <motion.li
                key={pillar.title}
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.7, delay: i * 0.08, ease: EDITORIAL_EASE }}
                className="flex items-start gap-4"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-terra text-paper">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-ink">
                    {pillar.title}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-ink-700">{pillar.text}</span>
                </span>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

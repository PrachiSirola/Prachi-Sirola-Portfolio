import { motion } from 'framer-motion';
import { STAT_METRICS } from '../data/portfolioData';
import { SectionHeading } from '../components/ui/SectionHeading';
import { EDITORIAL_EASE, viewportConfig } from '../utils/motion';

/** Pricing-style tilted cards; the highlighted one is orange, like the video's membership row. */
export function ImpactSection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <SectionHeading
          title="Impact in"
          accent="Numbers"
          description="What the systems I built actually handle in production."
        />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STAT_METRICS.map((stat, i) => {
            const hot = i === 1;
            return (
              <motion.li
                key={stat.id}
                initial={{ opacity: 0, y: 70, rotate: i % 2 ? 4 : -4 }}
                whileInView={{ opacity: 1, y: hot ? -12 : 0, rotate: i % 2 ? 1.5 : -1.5 }}
                viewport={viewportConfig}
                whileHover={{ y: -18, rotate: 0, scale: 1.03 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: EDITORIAL_EASE }}
                className={`flex min-h-[220px] flex-col justify-between rounded-3xl p-6 shadow-[0_20px_50px_-24px_rgba(20,18,16,0.4)] ${
                  hot ? 'bg-terra text-paper' : 'bg-white text-ink'
                }`}
              >
                <span className="font-serif text-6xl leading-none">{stat.value}</span>
                <span>
                  <span className="block font-mono text-[11px] uppercase tracking-[0.14em]">{stat.label}</span>
                  <span className={`mt-1 block text-sm ${hot ? 'text-paper/80' : 'text-ink-500'}`}>
                    {stat.sublabel}
                  </span>
                </span>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

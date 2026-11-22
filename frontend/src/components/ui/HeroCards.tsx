import { motion } from 'framer-motion';
import { STAT_METRICS } from '../../data/portfolioData';
import { useIsDesktop } from '../../hooks/useIsDesktop';

const STYLES = [
  { bg: '#C65D3E', fg: '#fff', rotate: -10, y: 22, tag: '@ai' },
  { bg: '#E8D44D', fg: '#141210', rotate: -3, y: -12, tag: '@backend' },
  { bg: '#2F4BD9', fg: '#fff', rotate: 4, y: 0, tag: '@fullstack' },
  { bg: '#141210', fg: '#F6EFE4', rotate: 11, y: 26, tag: '@shipped' },
];

/** Hero: stat cards drop in one by one, land in a tilted fan, then float. */
export function HeroCards() {
  const isDesktop = useIsDesktop();
  const spread = isDesktop ? 185 : 74;
  const w = isDesktop ? 220 : 150;
  const h = isDesktop ? 300 : 210;

  return (
    <div
      className="relative mx-auto w-full"
      style={{ height: h + 120 }}
      role="list"
      aria-label="Impact highlights"
    >
      {STAT_METRICS.map((stat, i) => {
        const s = STYLES[i];
        return (
          <motion.div
            key={stat.id}
            role="listitem"
            initial={{ y: -520, opacity: 0, rotate: 0, x: 0 }}
            animate={{ y: s.y, opacity: 1, rotate: s.rotate, x: (i - 1.5) * spread }}
            transition={{ type: 'spring', stiffness: 70, damping: 13, delay: 0.3 + i * 0.14 }}
            className="absolute left-1/2 top-1/2"
            style={{ width: w, height: h, marginLeft: -w / 2, marginTop: -h / 2, zIndex: i }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.2 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
              whileHover={{ scale: 1.06 }}
              className="relative flex h-full flex-col justify-between rounded-[26px] p-4 shadow-[0_24px_50px_-18px_rgba(20,18,16,0.45)] sm:p-5"
              style={{ backgroundColor: s.bg, color: s.fg }}
            >
              <span className="self-start rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold text-ink">
                {s.tag}
              </span>
              <span>
                <span className="block font-serif text-4xl leading-none sm:text-6xl">{stat.value}</span>
                <span className="mt-3 block font-mono text-[9px] uppercase leading-snug tracking-[0.12em] opacity-90 sm:text-[11px]">
                  {stat.label}
                </span>
                <span className="mt-1 hidden text-xs opacity-75 sm:block">{stat.sublabel}</span>
              </span>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

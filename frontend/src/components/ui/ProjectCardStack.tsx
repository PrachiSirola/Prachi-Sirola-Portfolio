import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { ProjectItem } from '../../types/portfolio';
import { useIsDesktop } from '../../hooks/useIsDesktop';
import { ProjectVisualMockup } from '../mockups/ProjectMockups';

const ACCENTS = ['#C65D3E', '#E8B93C', '#3F6B5A', '#2F4BD9', '#D94F8C', '#141210'];
const CARD_W = 300;
const CARD_H = 410;

interface CardProps {
  project: ProjectItem;
  index: number;
  onInspect: (project: ProjectItem) => void;
}

/** Card face shared by the scroll-driven fan and the static grid. */
function CardFace({ project, index, onInspect }: CardProps) {
  const accent = ACCENTS[index % ACCENTS.length];
  return (
    <button
      type="button"
      onClick={() => onInspect(project)}
      aria-label={`Open ${project.name} details`}
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-[28px] border border-ink/10 bg-white p-3 text-left shadow-[0_24px_60px_-20px_rgba(20,18,16,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-terra focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
    >
      <div className="relative h-[200px] shrink-0 overflow-hidden rounded-2xl bg-ink">
        {project.mockupType === 'datalens' ? (
          <div className="flex h-full flex-col justify-center gap-2 p-5 font-mono text-[11px] leading-relaxed text-paper/80">
            <span className="text-terra">&gt; ask in plain English</span>
            <span>SELECT store, SUM(sales)</span>
            <span>FROM orders GROUP BY store;</span>
            <span className="text-[#E8B93C]">→ chart + insight</span>
          </div>
        ) : (
          <ProjectVisualMockup type={project.mockupType} />
        )}
      </div>
      <span
        className="absolute right-5 top-5 rounded-full px-3 py-1 text-[11px] font-semibold text-white"
        style={{ backgroundColor: accent }}
      >
        @{project.category.split(' ')[0].toLowerCase()}
      </span>
      <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
        <span className="flex items-start justify-between gap-3">
          <span className="text-lg font-semibold leading-snug text-ink">{project.name}</span>
          <ArrowUpRight
            className="mt-1 h-5 w-5 shrink-0 text-ink transition-transform duration-300 group-hover:rotate-45 group-hover:text-terra"
            aria-hidden="true"
          />
        </span>
        <span className="mt-1 line-clamp-3 text-sm leading-relaxed text-ink-500">
          {project.shortDescription}
        </span>
        <span className="mt-auto font-mono text-[11px] text-ink-400">
          {project.technologies.slice(0, 3).join(' · ')}
        </span>
      </div>
    </button>
  );
}

interface FanCardProps extends CardProps {
  total: number;
  progress: MotionValue<number>;
}

/** One card: stacked at scroll 0, fans into a tilted row, then the row drifts left. */
function FanCard({ project, index, total, progress, onInspect }: FanCardProps) {
  const center = (total - 1) / 2;
  const sign = index % 2 ? 1 : -1;
  const step = useTransform(progress, [0, 0.25, 0.4], [0, 200, 340]);
  const drift = useTransform(progress, [0.4, 1], [0, 1]);
  const x = useTransform([step, drift], ([s, d]: number[]) => (index - center - center * d) * s);
  const rotate = useTransform(progress, [0, 0.25, 0.45], [0, sign * 8, sign * 2]);
  const y = useTransform(progress, [0, 0.25, 0.45], [index * -3, sign * 14, sign * 10]);
  const scale = useTransform(progress, [0, 0.25], [0.92, 1]);

  return (
    <motion.li
      style={{ x, y, rotate, scale, zIndex: index, width: CARD_W, height: CARD_H }}
      className="absolute left-1/2 top-1/2 -ml-[150px] -mt-[205px] list-none"
    >
      <motion.div
        className="h-full"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3 + index * 0.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <CardFace project={project} index={index} onInspect={onInspect} />
      </motion.div>
    </motion.li>
  );
}

interface StackProps {
  projects: ProjectItem[];
  onInspect: (project: ProjectItem) => void;
}

function DesktopFan({ projects, onInspect }: StackProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  return (
    <div
      ref={ref}
      className="relative left-1/2 w-screen -translate-x-1/2"
      style={{ height: `${projects.length * 85 + 100}vh` }}
    >
      <ul className="sticky top-0 h-screen overflow-hidden">
        {projects.map((project, i) => (
          <FanCard
            key={project.id}
            project={project}
            index={i}
            total={projects.length}
            progress={scrollYProgress}
            onInspect={onInspect}
          />
        ))}
      </ul>
    </div>
  );
}

/** Scroll-pinned card fan on desktop; plain grid on mobile or reduced motion. */
export function ProjectCardStack({ projects, onInspect }: StackProps) {
  const isDesktop = useIsDesktop();
  const reduce = useReducedMotion();

  if (!isDesktop || reduce) {
    return (
      <ul className="mt-10 grid gap-6 sm:grid-cols-2">
        {projects.map((project, i) => (
          <li key={project.id} className="h-[410px]">
            <CardFace project={project} index={i} onInspect={onInspect} />
          </li>
        ))}
      </ul>
    );
  }

  return <DesktopFan projects={projects} onInspect={onInspect} />;
}

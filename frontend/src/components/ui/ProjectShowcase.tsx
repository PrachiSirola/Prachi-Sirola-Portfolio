import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Check, ExternalLink, Github, X } from 'lucide-react';
import type { ProjectItem } from '../../types/portfolio';
import { fadeUpVariants, viewportConfig } from '../../utils/motion';
import { DataLensMockup } from '../mockups/DataLensMockup';
import { ProjectVisualMockup } from '../mockups/ProjectMockups';

interface FeaturedDataLensCardProps {
  project: ProjectItem;
  onInspect: (project: ProjectItem) => void;
}

export function FeaturedDataLensShowcase({ project, onInspect }: FeaturedDataLensCardProps) {
  return (
    <motion.article
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className="mb-8 rounded-2xl border border-white/15 bg-gradient-to-b from-[#161922] to-[#101218] p-6 shadow-glow-subtle sm:p-8"
    >
      <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded border border-white/15 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-silver-200">
            Featured AI System · Flagship
          </div>
          <h3 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl">
            {project.name}
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-silver-300">
            {project.shortDescription}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/[0.03] px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-silver-200 transition-colors hover:border-white/35 hover:text-white"
            >
              <Github className="h-3.5 w-3.5" />
              <span>GitHub</span>
            </a>
          )}
          <button
            type="button"
            onClick={() => onInspect(project)}
            className="btn-terra inline-flex min-h-[44px] items-center gap-2 rounded-md px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em]"
          >
            <span>System Overview</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Prominent Interactive Dashboard Visual */}
      <DataLensMockup />

      {/* Highlights & Stack Strip */}
      <div className="mt-6 grid gap-6 border-t border-white/[0.08] pt-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-silver-400">
            My Contribution
          </p>
          <p className="mt-2 text-sm leading-relaxed text-silver-300">{project.contribution}</p>
        </div>

        <div className="lg:col-span-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-silver-400">
            Technology Stack
          </p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded border border-white/10 bg-[#0A0C10] px-2.5 py-1 font-mono text-[11px] text-silver-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  useEffect(() => {
    if (!project) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/15 bg-[#111319] p-6 shadow-2xl sm:p-8"
          >
            {project.mockupType !== 'datalens' && (
              <div className="mb-6">
                <ProjectVisualMockup type={project.mockupType} />
              </div>
            )}
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-silver-400">
                  {project.category}
                </p>
                <h3
                  id="project-modal-title"
                  className="mt-1.5 font-display text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl"
                >
                  {project.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-silver-300 transition-colors hover:border-white/30 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-silver-300">
              {project.shortDescription}
            </p>

            {project.scaleNote && (
              <div className="mt-4 inline-flex rounded border border-white/15 bg-white/[0.04] px-3 py-1.5 font-mono text-xs text-silver-100">
                {project.scaleNote}
              </div>
            )}

            <div className="mt-6 border-t border-white/10 pt-5">
              <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-silver-400">
                My Contribution
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-silver-200">{project.contribution}</p>
            </div>

            <div className="mt-6 border-t border-white/10 pt-5">
              <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-silver-400">
                Key Features &amp; Engineering Highlights
              </h4>
              <ul className="mt-3 space-y-2.5">
                {project.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-silver-300">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-silver-200" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 border-t border-white/10 pt-5">
              <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-silver-400">
                Technology Stack
              </h4>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded border border-white/10 bg-[#0A0C10] px-2.5 py-1 font-mono text-xs text-silver-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {(project.githubUrl || project.liveDemoUrl) && (
              <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-white/10 pt-5">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-silver-100 transition-colors hover:border-white/35"
                  >
                    <Github className="h-3.5 w-3.5" />
                    <span>View GitHub</span>
                  </a>
                )}
                {project.liveDemoUrl && (
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-terra inline-flex min-h-[44px] items-center gap-2 rounded-md px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em]"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>Live Preview</span>
                  </a>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

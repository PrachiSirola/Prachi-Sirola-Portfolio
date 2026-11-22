import { useState } from 'react';
import { PERSONAL_INFO, PROJECTS } from '../data/portfolioData';
import type { ProjectItem } from '../types/portfolio';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ProjectCardStack } from '../components/ui/ProjectCardStack';
import { ProjectDetailModal } from '../components/ui/ProjectShowcase';

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section id="work" className="scroll-mt-20 pt-16 sm:pt-24">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <SectionHeading
          title="Selected"
          accent="Projects"
          description="Production systems and AI products I designed, built and deployed end to end."
          actionLabel="View GitHub"
          actionHref={PERSONAL_INFO.github}
        />

        <ProjectCardStack projects={PROJECTS} onInspect={setSelectedProject} />

        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
}

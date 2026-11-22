import { EXPERIENCE } from '../data/portfolioData';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ExperienceFlyers } from '../components/ui/ExperienceFlyers';

export function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <SectionHeading
          title="Work"
          accent="Experience"
          description="Where I have shipped production software and AI systems."
        />
        <ExperienceFlyers items={EXPERIENCE} />
      </div>
    </section>
  );
}

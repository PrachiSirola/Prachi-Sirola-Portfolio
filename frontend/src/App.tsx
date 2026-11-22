import { MotionConfig } from 'framer-motion';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { PageBackground } from './components/motion/PageBackground';
import { SmoothScroll } from './components/motion/SmoothScroll';
import { ScrollProgress } from './components/motion/ScrollProgress';
import { HeroSection } from './sections/HeroSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { ImpactSection } from './sections/ImpactSection';
import { YellowBanner } from './components/ui/YellowBanner';
import { ExperienceSection } from './sections/ExperienceSection';
import { SkillsSection } from './sections/SkillsSection';
import { AboutSection } from './sections/AboutSection';
import { ContactSection } from './sections/ContactSection';

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      <ScrollProgress />
      <div className="min-h-screen text-ink">
        <PageBackground />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-terra focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:text-paper"
        >
          Skip to main content
        </a>

        <Navbar />

        <main id="main-content" className="relative z-10">
          <HeroSection />
          <ProjectsSection />
          <YellowBanner />
          <ImpactSection />
          <ExperienceSection />
          <SkillsSection />
          <AboutSection />
          <ContactSection />
        </main>

        <div className="relative z-10">
          <Footer />
        </div>
      </div>
    </MotionConfig>
  );
}

export default App;

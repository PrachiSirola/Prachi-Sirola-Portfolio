import { Box, Compass, Gem, Hexagon, Orbit, Rocket } from 'lucide-react';

const PHRASES = ['Inspired by people', 'Built for scale', 'Shipped to production', 'AI that earns trust'];
const ICONS = [Box, Gem, Hexagon, Rocket, Orbit, Compass];

/** Full-width lime band: oversized scrolling statement with slowly spinning outline icons. */
export function YellowBanner() {
  const track = [...PHRASES, ...PHRASES];
  return (
    <div aria-hidden="true" className="relative my-8 overflow-hidden bg-[#E3FF55] py-10 sm:py-14">
      <div className="marquee-track flex w-max items-center gap-10" style={{ animationDuration: '40s' }}>
        {track.map((phrase, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <span key={`${phrase}-${i}`} className="flex items-center gap-10">
              <span className="whitespace-nowrap font-sans text-5xl font-bold tracking-tight text-ink sm:text-7xl">
                {phrase}
              </span>
              <Icon className="spin-slow h-10 w-10 shrink-0 text-ink sm:h-14 sm:w-14" strokeWidth={1.4} />
            </span>
          );
        })}
      </div>
    </div>
  );
}

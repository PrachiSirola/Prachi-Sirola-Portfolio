const COLORS = ['#C65D3E', '#E8D44D', '#3F6B5A', '#2F4BD9', '#D94F8C', '#141210', '#8A5CF6'];

interface FloatingTilesProps {
  items: string[];
  reverse?: boolean;
  duration?: number;
}

/** Drifting rows of rounded skill tiles. Decorative: skills are also listed as text. */
export function FloatingTiles({ items, reverse = false, duration = 60 }: FloatingTilesProps) {
  const track = [...items, ...items];
  return (
    <div
      aria-hidden="true"
      className="group relative overflow-hidden py-3 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
    >
      <div
        className="marquee-track flex w-max gap-4 group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${duration}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="grid h-[84px] w-[84px] shrink-0 place-items-center rounded-[22px] p-2 text-center text-[11px] font-semibold leading-tight shadow-[0_12px_28px_-12px_rgba(20,18,16,0.5)] transition-transform duration-300 hover:-translate-y-2 hover:rotate-3"
            style={{
              backgroundColor: COLORS[i % COLORS.length],
              color: COLORS[i % COLORS.length] === '#E8D44D' ? '#141210' : '#fff',
              transform: `rotate(${((i % 3) - 1) * 4}deg) translateY(${(i % 2) * 14}px)`,
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

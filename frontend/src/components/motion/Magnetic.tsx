import { useRef } from 'react';
import type { ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/** Wrapper that pulls its child toward the pointer with a spring. */
export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15, mass: 0.2 });
  const sy = useSpring(y, { stiffness: 150, damping: 15, mass: 0.2 });

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

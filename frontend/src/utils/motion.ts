import type { Variants } from 'framer-motion';

export const EDITORIAL_EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay,
      ease: EDITORIAL_EASE,
    },
  }),
};

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

export const lineRevealVariants: Variants = {
  hidden: { y: '108%', opacity: 0 },
  visible: (i = 0) => ({
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.75,
      delay: 0.08 + i * 0.1,
      ease: EDITORIAL_EASE,
    },
  }),
};

export const viewportConfig = {
  once: true,
  margin: '-80px',
} as const;

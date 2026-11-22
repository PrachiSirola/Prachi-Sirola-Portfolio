import { motion, useScroll, useTransform } from 'framer-motion';

const LAYER = "bg-[url('/background.jpg')] bg-cover bg-center";

/**
 * Fixed full-page backdrop. Two copies of background.jpg (one mirrored) drift in
 * opposite directions on scroll and breathe slowly. Multiply blend keeps the
 * white parts transparent so the paper colour still shows through.
 */
export function PageBackground() {
  const { scrollYProgress } = useScroll();
  const yBack = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);
  const yFront = useTransform(scrollYProgress, [0, 1], ['9%', '-9%']);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden mix-blend-multiply"
    >
      <motion.div style={{ y: yBack }} className="absolute -inset-[12%]">
        <div className={`bg-drift h-full w-full ${LAYER}`} />
      </motion.div>
      <motion.div style={{ y: yFront }} className="absolute -inset-[12%] opacity-70">
        <div className="h-full w-full -scale-x-100">
          <div className={`bg-drift-reverse h-full w-full ${LAYER}`} />
        </div>
      </motion.div>
    </div>
  );
}

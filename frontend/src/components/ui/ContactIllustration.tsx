import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

const S = 40;
const OX = 300;
const OY = 235;

/** Isometric projection: x goes right-down, y goes left-down, z goes up. */
const P = (x: number, y: number, z: number): [number, number] => [
  OX + (x - y) * 0.866 * S,
  OY + (x + y) * 0.5 * S - z * S,
];
const pts = (list: [number, number][]) => list.map((p) => p.join(',')).join(' ');

interface BoxProps {
  x: number;
  y: number;
  z: number;
  w: number;
  d: number;
  h: number;
  top: string;
  left: string;
  right: string;
}

function Box({ x, y, z, w, d, h, top, left, right }: BoxProps) {
  const t = z + h;
  return (
    <g>
      <polygon points={pts([P(x, y + d, z), P(x + w, y + d, z), P(x + w, y + d, t), P(x, y + d, t)])} fill={left} />
      <polygon points={pts([P(x + w, y, z), P(x + w, y + d, z), P(x + w, y + d, t), P(x + w, y, t)])} fill={right} />
      <polygon points={pts([P(x, y, t), P(x + w, y, t), P(x + w, y + d, t), P(x, y + d, t)])} fill={top} />
    </g>
  );
}

/** Group whose local (u, v) axes lie on a plane facing +x: u runs along y, v runs up. */
function FaceX({ x, y, z, children }: { x: number; y: number; z: number; children: ReactNode }) {
  const [e, f] = P(x, y, z);
  return <g transform={`matrix(${-0.866 * S} ${0.5 * S} 0 ${-S} ${e} ${f})`}>{children}</g>;
}

function Disc({ cx, cy, z, r, h, top, side }: { cx: number; cy: number; z: number; r: number; h: number; top: string; side: string }) {
  const [tx, ty] = P(cx, cy, z + h);
  const [bx, by] = P(cx, cy, z);
  const rx = r * S * 1.22;
  const ry = r * S * 0.7;
  return (
    <g>
      <path d={`M${tx - rx},${ty} L${bx - rx},${by} A${rx},${ry} 0 0 0 ${bx + rx},${by} L${tx + rx},${ty} Z`} fill={side} />
      <ellipse cx={tx} cy={ty} rx={rx} ry={ry} fill={top} />
    </g>
  );
}

function Tree({ x, y, big = false }: { x: number; y: number; big?: boolean }) {
  const [px, py] = P(x, y, 0);
  const k = big ? 1 : 0.7;
  return (
    <g transform={`translate(${px} ${py}) scale(${k})`}>
      <rect x={-3} y={-30} width={6} height={30} rx={3} fill="#8A5A3C" />
      <circle cx={0} cy={-52} r={26} fill="#7FB235" />
      <circle cx={-14} cy={-40} r={16} fill="#6FA32B" />
      <circle cx={13} cy={-60} r={15} fill="#9BC94A" />
    </g>
  );
}

/** Isometric dev workstation: server rack, monitor with chart, DB stack, floating envelope. */
export function ContactIllustration() {
  const A = P(3.9, 2.0, 3.5);
  const B = P(1.45, 1.45, 3.9);
  const [dbX, dbY] = P(4.3, 4.6, 0);

  return (
    <div className="relative flex h-full w-full items-center">
      <svg viewBox="0 0 600 500" className="h-auto w-full" role="img" aria-label="Illustration of a developer workstation with a server rack, monitor, database and an incoming message">
        <defs>
          <filter id="soft" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>

        <ellipse cx={OX} cy={OY + 3.2 * S + 30} rx={235} ry={80} fill="#1B0F0B" opacity="0.45" filter="url(#soft)" />

        <motion.g initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
          <Box x={0} y={0} z={-0.55} w={6} d={6} h={0.55} top="#F6EFE4" left="#2A1A14" right="#170D09" />
          <Box x={0.35} y={0.35} z={0} w={5.3} d={5.3} h={0.12} top="#FFF8EE" left="#E8DCC8" right="#D6C7AE" />

          {/* Server rack */}
          <Box x={0.8} y={0.8} z={0.12} w={1.3} d={1.3} h={3} top="#FFFFFF" left="#E4E9F2" right="#CDD5E4" />
          <FaceX x={2.1} y={0.8} z={0.12}>
            {[0.75, 1.5, 2.25].map((v) => (
              <line key={v} x1={0.06} x2={1.24} y1={v} y2={v} stroke="#AAB4CB" strokeWidth={0.03} />
            ))}
            {[0, 1, 2, 3].map((k) => (
              <g key={k}>
                <motion.circle
                  cx={0.25}
                  cy={0.37 + k * 0.75}
                  r={0.07}
                  fill={k % 2 ? '#F5A524' : '#2FBF71'}
                  animate={{ opacity: [1, 0.25, 1] }}
                  transition={{ duration: 1.4 + k * 0.35, repeat: Infinity }}
                />
                <rect x={0.55} y={0.3 + k * 0.75} width={0.55} height={0.04} fill="#B6BFD3" />
                <rect x={0.55} y={0.42 + k * 0.75} width={0.4} height={0.04} fill="#B6BFD3" />
              </g>
            ))}
          </FaceX>

          {/* Desk and monitor */}
          <Box x={2.7} y={0.9} z={0.12} w={2.6} d={2.2} h={0.8} top="#FFFFFF" left="#E4E9F2" right="#CDD5E4" />
          <Box x={3.9} y={1.75} z={0.92} w={0.5} d={0.6} h={0.4} top="#CBD2E0" left="#AEB7CC" right="#98A3BC" />
          <Box x={3.8} y={1.2} z={1.32} w={0.18} d={1.7} h={1.3} top="#CBD2E0" left="#AEB7CC" right="#0F172A" />
          <FaceX x={3.98} y={1.2} z={1.32}>
            <rect x={0.15} y={0.98} width={0.7} height={0.07} rx={0.03} fill="#38BDF8" />
            <rect x={0.15} y={0.84} width={1.1} height={0.05} rx={0.02} fill="#475569" />
            <rect x={0.15} y={0.72} width={0.85} height={0.05} rx={0.02} fill="#475569" />
            {[0.28, 0.5, 0.38, 0.7, 0.55].map((height, i) => (
              <motion.rect
                key={i}
                x={0.2 + i * 0.28}
                y={0.1}
                width={0.17}
                height={height * 0.5}
                rx={0.02}
                fill={i === 3 ? '#C65D3E' : '#64748B'}
                style={{ transformBox: 'fill-box', transformOrigin: 'bottom' }}
                animate={{ scaleY: [1, 1.35, 1] }}
                transition={{ duration: 2.4 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}
          </FaceX>

          {/* Database stack */}
          <Disc cx={4.3} cy={4.6} z={0.12} r={0.75} h={0.4} top="#FFFFFF" side="#D5DBE8" />
          <Disc cx={4.3} cy={4.6} z={0.52} r={0.75} h={0.4} top="#FFFFFF" side="#C8D0E2" />
          <Disc cx={4.3} cy={4.6} z={0.92} r={0.75} h={0.4} top="#F4F6FB" side="#141210" />
          <circle cx={dbX - 18} cy={dbY - 20} r={3.5} fill="#2FBF71" />

          <Tree x={0.9} y={4.7} big />
          <Tree x={1.9} y={5.35} />
          <Tree x={5.35} y={0.45} />
        </motion.g>

        {/* Message flow: form (monitor) -> API -> inbox (rack) */}
        <path
          d={`M${A[0]},${A[1]} Q${(A[0] + B[0]) / 2},${Math.min(A[1], B[1]) - 70} ${B[0]},${B[1]}`}
          fill="none"
          stroke="#F6EFE4"
          strokeWidth={2.5}
          strokeDasharray="4 8"
          strokeLinecap="round"
          className="contact-flow"
        />
        <motion.g
          animate={{
            x: [A[0], (A[0] + B[0]) / 2, B[0], B[0]],
            y: [A[1], Math.min(A[1], B[1]) - 52, B[1], B[1]],
            scale: [0.7, 1.1, 0.75, 0.4],
            opacity: [0, 1, 1, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', times: [0, 0.4, 0.85, 1] }}
        >
          <rect x={-30} y={-20} width={60} height={40} rx={6} fill="#F6EFE4" />
          <polyline points="-30,-17 0,4 30,-17" fill="none" stroke="#C65D3E" strokeWidth={3} strokeLinejoin="round" />
        </motion.g>
        <motion.circle
          cx={B[0]}
          cy={B[1]}
          fill="none"
          stroke="#F6EFE4"
          strokeWidth={2.5}
          animate={{ r: [8, 8, 14, 52], opacity: [0, 0, 0.9, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeOut', times: [0, 0.84, 0.88, 1] }}
        />
      </svg>

      <motion.span
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-4 top-5 rounded-full bg-white px-3 py-1.5 font-mono text-[11px] text-ink shadow-md sm:left-8"
      >
        POST /api/contact
      </motion.span>
      <motion.span
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 3.9, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        className="absolute right-4 top-16 rounded-full bg-ink px-3 py-1.5 font-mono text-[11px] text-paper shadow-md sm:right-8"
      >
        SMTP &rarr; Gmail
      </motion.span>
      <motion.span
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        className="absolute bottom-5 left-4 rounded-full bg-white px-3 py-1.5 font-mono text-[11px] text-ink shadow-md sm:left-8"
      >
        reply &lt; 24h
      </motion.span>
    </div>
  );
}

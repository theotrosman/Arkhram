"use client";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useMemo, useEffect, useState } from "react";

const BAT_PATH =
  "M50 26 C44 17 31 12 16 17 C8 20 2 25 0 22 C4 25 6 33 4 38 C12 30 21 32 26 39 C32 28 41 24 50 26 C59 24 68 28 74 39 C79 32 88 30 96 38 C94 33 96 25 100 22 C98 25 92 20 84 17 C69 12 56 17 50 26 Z M50 26 C47 31 50 40 50 40 C50 40 53 31 50 26 Z";

type Bat = {
  id: number;
  y: number;
  size: number;
  dur: number;
  delay: number;
  opacity: number;
  dir: 1 | -1;
  layer: 0 | 1 | 2;
  wob: number;
  color: string;
};

function useBats(): Bat[] {
  return useMemo(() => {
    const palette = [
      "rgba(139,26,26,0.9)",
      "rgba(80,10,10,0.7)",
      "rgba(40,5,5,0.5)",
      "rgba(20,3,3,0.35)",
    ];
    return Array.from({ length: 28 }, (_, i) => {
      const layer = (i % 3) as 0 | 1 | 2;
      return {
        id: i,
        y: 4 + ((i * 29 + 7) % 88),
        size: layer === 0 ? 8 + (i % 5) : layer === 1 ? 16 + (i % 8) : 26 + (i % 14),
        dur: layer === 0 ? 16 + (i % 9) : layer === 1 ? 10 + (i % 6) : 6 + (i % 4),
        delay: (i * 1.3) % 14,
        opacity: layer === 0 ? 0.15 + (i % 4) * 0.06 : layer === 1 ? 0.3 + (i % 4) * 0.09 : 0.5 + (i % 3) * 0.12,
        dir: (i % 2 === 0 ? 1 : -1) as 1 | -1,
        layer,
        wob: 2 + (i % 6) * 1.5,
        color: palette[layer === 2 ? 0 : layer === 1 ? 1 : i % 2 === 0 ? 2 : 3],
      };
    });
  }, []);
}

export function BatSwarm() {
  const { scrollYProgress } = useScroll();
  const bats = useBats();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const intensity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.3, 1.2, 1, 0.2]);

  if (!mounted) return null;

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 8, overflow: "hidden" }}>
      <motion.div style={{ opacity: intensity }}>
        {bats.map((bat) => (
          <motion.div
            key={bat.id}
            style={{
              position: "absolute",
              top: `${bat.y}%`,
              color: bat.color,
            }}
            initial={{ x: bat.dir > 0 ? "-10vw" : "110vw" }}
            animate={{ x: bat.dir > 0 ? "110vw" : "-10vw" }}
            transition={{
              duration: bat.dur,
              delay: bat.delay,
              repeat: Infinity,
              repeatDelay: bat.layer === 2 ? 1 + (bat.id % 5) : bat.id % 3,
              ease: "linear",
            }}
          >
            <motion.div
              animate={{ y: [0, -bat.wob, 0, bat.wob, 0], scaleY: [1, 0.4, 1, 0.4, 1] }}
              transition={{ duration: 0.45 + bat.layer * 0.08, repeat: Infinity, ease: "easeInOut" }}
              style={{ transform: bat.dir < 0 ? "scaleX(-1)" : undefined }}
            >
              <svg
                width={bat.size}
                height={bat.size * 0.52}
                viewBox="0 0 100 52"
                fill="currentColor"
                style={{ display: "block" }}
              >
                <path d={BAT_PATH} />
              </svg>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

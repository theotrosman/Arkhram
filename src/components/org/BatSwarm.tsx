"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo } from "react";

const BatSVG = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size * 0.55}
    viewBox="0 0 100 55"
    fill="currentColor"
    style={{ display: "block" }}
  >
    <path d="M50 27 C44 18 32 13 18 17 C10 20 4 24 0 21 C5 24 7 31 5 36 C13 28 22 30 27 37 C33 27 42 23 50 27 C58 23 67 27 73 37 C78 30 87 28 95 36 C93 31 95 24 100 21 C96 24 90 20 82 17 C68 13 56 18 50 27 Z M50 27 C47 32 50 40 50 40 C50 40 53 32 50 27 Z" />
  </svg>
);

type Bat = {
  id: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  dir: 1 | -1;
  layer: number;
  wobble: number;
};

export function BatSwarm() {
  const { scrollYProgress } = useScroll();

  const bats: Bat[] = useMemo(() => {
    return Array.from({ length: 22 }, (_, i) => {
      const layer = i % 3; // 0=far, 1=mid, 2=near
      return {
        id: i,
        y: 5 + ((i * 37 + 11) % 85),
        size: layer === 0 ? 10 + (i % 6) : layer === 1 ? 18 + (i % 8) : 28 + (i % 12),
        duration: layer === 0 ? 14 + (i % 8) : layer === 1 ? 9 + (i % 6) : 6 + (i % 4),
        delay: (i * 1.7) % 12,
        opacity: layer === 0 ? 0.2 + (i % 3) * 0.08 : layer === 1 ? 0.35 + (i % 3) * 0.1 : 0.5 + (i % 3) * 0.12,
        dir: (i % 2 === 0 ? 1 : -1) as 1 | -1,
        layer,
        wobble: 3 + (i % 5) * 2,
      };
    });
  }, []);

  const swarmIntensity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.4, 1, 1, 0.3]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 10,
        overflow: "hidden",
      }}
    >
      <motion.div style={{ opacity: swarmIntensity }}>
        {bats.map((bat) => (
          <motion.div
            key={bat.id}
            style={{
              position: "absolute",
              top: `${bat.y}%`,
              color: bat.layer === 2 ? "rgba(139,26,26,0.85)" : bat.layer === 1 ? "rgba(80,10,10,0.7)" : "rgba(30,5,5,0.5)",
            }}
            initial={{ x: bat.dir > 0 ? "-8vw" : "108vw" }}
            animate={{ x: bat.dir > 0 ? "108vw" : "-8vw" }}
            transition={{
              duration: bat.duration,
              delay: bat.delay,
              repeat: Infinity,
              repeatDelay: bat.layer === 2 ? 2 + (bat.id % 4) : bat.layer === 1 ? 1 + (bat.id % 3) : bat.id % 2,
              ease: "linear",
            }}
          >
            <motion.div
              animate={{
                y: [0, -bat.wobble, 0, bat.wobble, 0],
                rotate: bat.dir > 0 ? [0, 3, 0, -3, 0] : [0, -3, 0, 3, 0],
              }}
              transition={{
                duration: 0.6 + bat.layer * 0.1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                transform: bat.dir < 0 ? "scaleX(-1)" : "none",
              }}
            >
              <BatSVG size={bat.size} />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const LINE1 = "ARKHRAM";
const LINE2 = "ORGANIZATION";

function GlitchTitle() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 2200);
    const t3 = setTimeout(() => setPhase(3), 3400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div style={{ position: "relative", textAlign: "center" }}>
      {/* Noise scramble → reveal */}
      <motion.div
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "clamp(3.5rem, 14vw, 11rem)",
          fontWeight: 900,
          letterSpacing: "0.25em",
          lineHeight: 0.9,
          position: "relative",
          userSelect: "none",
        }}
      >
        {/* Ghost red layer — chromatic */}
        <motion.span
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            color: "rgba(139,26,26,0.55)",
            display: "block",
          }}
          animate={phase >= 2 ? { x: [0, -3, 2, -1, 0], opacity: [0.55, 0.8, 0.3, 0.6, 0.55] } : { x: 0 }}
          transition={{ duration: 0.18, repeat: phase === 2 ? 4 : 0, ease: "linear" }}
        >
          {LINE1}
        </motion.span>

        {/* Main text */}
        <motion.span
          style={{
            background: "linear-gradient(180deg, #f0e8dc 0%, #b0a090 55%, #5a4a40 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            display: "block",
            position: "relative",
            zIndex: 2,
          }}
          initial={{ opacity: 0, filter: "blur(30px)" }}
          animate={phase >= 1 ? { opacity: 1, filter: "blur(0px)" } : {}}
          transition={{ duration: 1.8, ease: "easeOut" }}
        >
          {LINE1}
        </motion.span>
      </motion.div>

      {/* Subtitle line */}
      <motion.div
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "clamp(0.55rem, 1.8vw, 0.85rem)",
          letterSpacing: "0.75em",
          color: "rgba(192,160,96,0.6)",
          marginTop: "1rem",
          textTransform: "uppercase",
        }}
        initial={{ opacity: 0, y: 12 }}
        animate={phase >= 3 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {LINE2}
      </motion.div>

      {/* Horizontal rule */}
      <motion.div
        style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(139,26,26,0.5), rgba(192,160,96,0.25), rgba(139,26,26,0.5), transparent)",
          marginTop: "2rem",
          marginBottom: "0",
        }}
        initial={{ scaleX: 0 }}
        animate={phase >= 3 ? { scaleX: 1 } : {}}
        transition={{ duration: 1.4, delay: 0.2, ease: "easeOut" }}
      />
    </div>
  );
}

function ScrollCue() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 5, duration: 1.5 }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem" }}
    >
      <motion.div
        animate={{ y: [0, 9, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.35rem" }}
      >
        <span style={{ fontFamily: "monospace", fontSize: "0.52rem", letterSpacing: "0.45em", color: "rgba(212,201,184,0.25)", textTransform: "uppercase" }}>
          scroll
        </span>
        <svg width="1" height="40" viewBox="0 0 1 40" style={{ overflow: "visible" }}>
          <motion.line
            x1="0" y1="0" x2="0" y2="40"
            stroke="rgba(139,26,26,0.35)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 5.5, duration: 1, ease: "easeOut" }}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}

export function IntroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const sectionOpacity = useTransform(scrollYProgress, [0.55, 0.85], [1, 0]);

  return (
    <motion.section
      ref={ref}
      style={{ height: "100vh", position: "relative", overflow: "hidden", opacity: sectionOpacity }}
    >
      {/* Parallax fog */}
      <motion.div style={{ y, position: "absolute", inset: "-20%", pointerEvents: "none" }}>
        <div className="animate-fog" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 110% 55% at 25% 85%, rgba(18,3,3,0.95) 0%, transparent 65%)" }} />
        <div className="animate-fog-slow" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 90% 45% at 75% 90%, rgba(25,4,4,0.75) 0%, transparent 65%)" }} />
        <div className="animate-fog-slower" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 30% at 50% 40%, rgba(10,2,2,0.4) 0%, transparent 70%)" }} />
      </motion.div>

      {/* Gothic spire skyline */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "42%", pointerEvents: "none", zIndex: 2 }}>
        <svg viewBox="0 0 1440 360" preserveAspectRatio="xMidYMax slice" style={{ width: "100%", height: "100%", opacity: 0.1 }}>
          <path d="M0 360 L0 180 L30 180 L30 80 L45 55 L55 30 L65 55 L80 80 L80 180 L140 180 L140 140 L155 115 L165 95 L175 115 L190 140 L190 180 L250 180 L250 150 L265 125 L270 110 L275 125 L290 150 L290 180 L360 180 L360 100 L370 70 L380 40 L390 70 L400 100 L400 180 L470 180 L470 160 L480 140 L490 160 L490 180 L560 180 L560 360 Z" fill="#d4c9b8" />
          <path d="M880 360 L880 160 L895 140 L910 115 L925 90 L935 65 L945 90 L955 115 L970 140 L985 160 L985 200 L1040 200 L1040 160 L1055 130 L1060 105 L1065 130 L1080 160 L1080 200 L1140 200 L1140 175 L1155 150 L1165 130 L1175 150 L1190 175 L1190 200 L1250 200 L1250 170 L1270 140 L1290 115 L1310 140 L1330 170 L1330 200 L1380 200 L1380 160 L1400 130 L1420 160 L1440 180 L1440 360 Z" fill="#d4c9b8" />
          {/* Spire needles */}
          <line x1="55" y1="30" x2="55" y2="0" stroke="#d4c9b8" strokeWidth="1.5" />
          <polygon points="55,0 50,15 60,15" fill="#d4c9b8" />
          <line x1="380" y1="40" x2="380" y2="5" stroke="#d4c9b8" strokeWidth="1.5" />
          <polygon points="380,5 375,20 385,20" fill="#d4c9b8" />
          <line x1="935" y1="65" x2="935" y2="25" stroke="#d4c9b8" strokeWidth="1.5" />
          <polygon points="935,25 929,42 941,42" fill="#d4c9b8" />
          <line x1="1290" y1="115" x2="1290" y2="75" stroke="#d4c9b8" strokeWidth="1.5" />
          <polygon points="1290,75 1284,92 1296,92" fill="#d4c9b8" />
        </svg>
      </div>

      {/* Main content */}
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 10, padding: "0 2rem", gap: "4rem" }}>
        {/* Mono pre-label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1.5 }}
          style={{ fontFamily: "monospace", fontSize: "0.58rem", letterSpacing: "0.55em", color: "rgba(139,26,26,0.5)", textTransform: "uppercase" }}
        >
          ARKHRAM / SYS_INIT / 2026
        </motion.div>

        <GlitchTitle />

        {/* Manifesto line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.2, duration: 2 }}
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(0.65rem, 1.4vw, 0.9rem)",
            fontStyle: "italic",
            color: "rgba(212,201,184,0.35)",
            letterSpacing: "0.08em",
            textAlign: "center",
            maxWidth: "520px",
            lineHeight: 1.9,
          }}
        >
          &ldquo;A system is only as quiet as its darkest layer.&rdquo;
        </motion.p>

        <ScrollCue />
      </div>

      {/* Vignette */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.88) 100%)", pointerEvents: "none", zIndex: 15 }} />
    </motion.section>
  );
}

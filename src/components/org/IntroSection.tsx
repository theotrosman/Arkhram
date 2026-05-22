"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const WHISPER = "A system is only as quiet as its darkest layer.";

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(iv);
    }, 55);
    return () => clearInterval(iv);
  }, [started, text]);

  return (
    <span>
      {displayed}
      {displayed.length < text.length && (
        <span className="cursor-blink" style={{ color: "#8b1a1a" }}>
          |
        </span>
      )}
    </span>
  );
}

export function IntroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const sectionOpacity = useTransform(scrollYProgress, [0.6, 0.9], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const fogY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity: sectionOpacity, height: "100vh" }}
      className="relative flex items-center justify-center overflow-hidden"
    >
      <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* Deep fog layers */}
        <motion.div style={{ y: fogY }}>
          <div
            className="animate-fog"
            style={{
              position: "absolute",
              inset: "-20%",
              background:
                "radial-gradient(ellipse 120% 60% at 30% 80%, rgba(20,5,5,0.9) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            className="animate-fog-slow"
            style={{
              position: "absolute",
              inset: "-20%",
              background:
                "radial-gradient(ellipse 100% 50% at 70% 90%, rgba(30,5,5,0.7) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
        </motion.div>

        {/* Gothic architecture silhouette */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "45%",
            pointerEvents: "none",
          }}
        >
          <svg
            viewBox="0 0 1440 400"
            preserveAspectRatio="xMidYMax slice"
            style={{ width: "100%", height: "100%", opacity: 0.08 }}
          >
            {/* Cathedral towers */}
            <path
              d="M0 400 L0 200 L40 200 L40 100 L50 80 L60 100 L60 200 L120 200 L120 150 L130 130 L140 150 L140 200 L200 200 L200 250 L220 250 L220 180 L240 160 L260 180 L260 250 L280 250 L280 200 L320 200 L320 120 L330 80 L340 120 L340 200 L400 200 L400 170 L420 140 L440 170 L440 200 L500 200 L500 230 L520 210 L540 230 L540 400 Z"
              fill="#d4c9b8"
            />
            <path
              d="M900 400 L900 180 L920 160 L940 180 L940 220 L980 220 L980 150 L1000 120 L1010 100 L1020 120 L1040 150 L1040 220 L1080 220 L1080 200 L1100 170 L1120 200 L1120 220 L1160 220 L1160 180 L1200 140 L1240 180 L1240 220 L1280 220 L1280 200 L1300 170 L1320 170 L1320 200 L1360 200 L1360 160 L1380 130 L1400 160 L1400 200 L1440 200 L1440 400 Z"
              fill="#d4c9b8"
            />
            {/* Spires */}
            <line x1="50" y1="80" x2="50" y2="30" stroke="#d4c9b8" strokeWidth="2" />
            <polygon points="50,15 44,35 56,35" fill="#d4c9b8" />
            <line x1="330" y1="80" x2="330" y2="30" stroke="#d4c9b8" strokeWidth="2" />
            <polygon points="330,15 324,35 336,35" fill="#d4c9b8" />
            <line x1="1010" y1="100" x2="1010" y2="40" stroke="#d4c9b8" strokeWidth="2" />
            <polygon points="1010,25 1003,45 1017,45" fill="#d4c9b8" />
          </svg>
        </div>

        {/* Center content */}
        <motion.div
          style={{ scale, position: "relative", zIndex: 20, textAlign: "center", padding: "0 2rem" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          {/* Small label */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            style={{
              fontFamily: "monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.4em",
              color: "rgba(139,26,26,0.7)",
              marginBottom: "2.5rem",
              textTransform: "uppercase",
            }}
          >
            ARKHRAM / TRANSMISSION_001
          </motion.div>

          {/* Whisper line */}
          <div
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(1rem, 2.5vw, 1.6rem)",
              color: "#d4c9b8",
              letterSpacing: "0.12em",
              lineHeight: 1.8,
              maxWidth: "700px",
              margin: "0 auto",
              fontStyle: "italic",
              opacity: 0.85,
            }}
          >
            <TypewriterText text={`"${WHISPER}"`} delay={1800} />
          </div>

          {/* Scroll prompt */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 5, duration: 1.5 }}
            style={{ marginTop: "5rem" }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.5rem",
                cursor: "default",
              }}
            >
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.35em",
                  color: "rgba(212,201,184,0.3)",
                  textTransform: "uppercase",
                }}
              >
                scroll to enter
              </span>
              <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
                <rect x="6" y="2" width="4" height="8" rx="2" fill="rgba(139,26,26,0.4)" />
                <rect x="5" y="0" width="6" height="14" rx="3" stroke="rgba(139,26,26,0.4)" strokeWidth="1.5" fill="none" />
                <path d="M4 19 L8 23 L12 19" stroke="rgba(139,26,26,0.4)" strokeWidth="1.5" fill="none" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.85) 100%)",
            pointerEvents: "none",
            zIndex: 15,
          }}
        />
      </div>
    </motion.section>
  );
}

"use client";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";

function GlitchText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* Main text */}
      <span className={`animate-glitch ${className}`} style={{ position: "relative", zIndex: 2 }}>
        {text}
      </span>
      {/* Chromatic red layer */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          color: "rgba(139,26,26,0.6)",
          transform: "translate(2px, 0)",
          clipPath: "polygon(0 20%, 100% 20%, 100% 40%, 0 40%)",
          animation: "glitch-1 9s 2s ease-in-out infinite",
          zIndex: 1,
        }}
      >
        {text}
      </span>
      {/* Chromatic blue layer */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          color: "rgba(60,20,80,0.5)",
          transform: "translate(-2px, 0)",
          clipPath: "polygon(0 60%, 100% 60%, 100% 80%, 0 80%)",
          animation: "glitch-1 11s 5s ease-in-out infinite reverse",
          zIndex: 1,
        }}
      >
        {text}
      </span>
    </div>
  );
}

export function OrgReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-10% 0px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const bgOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const bloodGlow = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);

  const vis = isInView;

  return (
    <section
      ref={ref}
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background blood atmosphere */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          opacity: bgOpacity,
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(30,5,5,0.95) 0%, rgba(5,5,5,1) 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Pulsing blood core */}
      <motion.div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(139,26,26,0.06) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: bloodGlow,
          pointerEvents: "none",
        }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Fog layers */}
      <div
        className="animate-fog"
        style={{
          position: "absolute",
          inset: "-10%",
          background: "radial-gradient(ellipse 100% 50% at 20% 100%, rgba(15,3,3,0.8) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Main content */}
      <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 2rem", maxWidth: "900px", margin: "0 auto" }}>
        {/* Pre-label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={vis ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          style={{
            fontFamily: "monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.5em",
            color: "rgba(139,26,26,0.6)",
            marginBottom: "3rem",
            textTransform: "uppercase",
          }}
        >
          ── SYSTEM ENTITY IDENTIFIED ──
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={vis ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(139,26,26,0.5), rgba(192,160,96,0.3), rgba(139,26,26,0.5), transparent)",
            marginBottom: "3rem",
            transformOrigin: "left",
          }}
        />

        {/* ARKHRAM title */}
        <motion.div
          initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
          animate={vis ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 60, filter: "blur(20px)" }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        >
          <GlitchText
            text="ARKHRAM"
            className="font-gothic text-gothic glow-blood"
          />
          <div
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(5rem, 15vw, 12rem)",
              fontWeight: 900,
              letterSpacing: "0.2em",
              lineHeight: 0.85,
              background: "linear-gradient(180deg, #e8e0d5 0%, #a09080 40%, #4a3a30 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "none",
              display: "block",
              marginTop: "-2rem",
            }}
          >
            ARKHRAM
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={vis ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 1 }}
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(0.7rem, 1.5vw, 0.95rem)",
            letterSpacing: "0.6em",
            color: "rgba(192,160,96,0.7)",
            textTransform: "uppercase",
            marginTop: "1.5rem",
            marginBottom: "3rem",
          }}
        >
          Organization
        </motion.div>

        {/* Bottom line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={vis ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(139,26,26,0.5), rgba(192,160,96,0.3), rgba(139,26,26,0.5), transparent)",
            marginBottom: "3rem",
            transformOrigin: "right",
          }}
        />

        {/* Manifesto */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={vis ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.9, duration: 1.5 }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            gap: "2rem",
            maxWidth: "700px",
            margin: "0 auto",
          }}
        >
          <p
            style={{
              fontFamily: "monospace",
              fontSize: "0.72rem",
              color: "rgba(212,201,184,0.45)",
              letterSpacing: "0.05em",
              lineHeight: 1.9,
              textAlign: "right",
            }}
          >
            We do not build products.<br />
            We architect systems.
          </p>
          <div style={{ width: "1px", height: "60px", background: "rgba(139,26,26,0.3)" }} />
          <p
            style={{
              fontFamily: "monospace",
              fontSize: "0.72rem",
              color: "rgba(212,201,184,0.45)",
              letterSpacing: "0.05em",
              lineHeight: 1.9,
              textAlign: "left",
            }}
          >
            Two entities.<br />
            One architecture.
          </p>
        </motion.div>
      </div>

      {/* Corner marks */}
      {[
        { top: 40, left: 40 },
        { top: 40, right: 40 },
        { bottom: 40, left: 40 },
        { bottom: 40, right: 40 },
      ].map((pos, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 0.3, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
          style={{
            position: "absolute",
            ...pos,
            width: 20,
            height: 20,
            borderTop: pos.top !== undefined ? "1px solid rgba(139,26,26,0.5)" : "none",
            borderBottom: pos.bottom !== undefined ? "1px solid rgba(139,26,26,0.5)" : "none",
            borderLeft: pos.left !== undefined ? "1px solid rgba(139,26,26,0.5)" : "none",
            borderRight: pos.right !== undefined ? "1px solid rgba(139,26,26,0.5)" : "none",
          }}
        />
      ))}
    </section>
  );
}

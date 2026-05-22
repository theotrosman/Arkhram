"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

type Archive = {
  code: string;
  name: string;
  status: "ACTIVE" | "DEPLOYED" | "CLASSIFIED";
  classification: string;
  desc: string;
  cinematic: string;
  tech: string[];
  impact: string;
  href: string;
  live?: string;
  authors: string[];
};

const ARCHIVES: Archive[] = [
  {
    code: "ARK-001",
    name: "ESCAPE-C137",
    status: "DEPLOYED",
    classification: "EXPERIENCE / NARRATIVE",
    desc: "A full-stack escape room forged from Rick & Morty's multiverse. 370 commits of atmosphere, paradox, and fourth-wall fractures.",
    cinematic: "You wake inside a dimension that remembers your name. The portal is real — if you can find it.",
    tech: ["C#", "ASP.NET MVC", "JavaScript", "HTML", "CSS", "Sound Design"],
    impact: "Immersive digital experience combining puzzle mechanics with narrative architecture and atmospheric sound design.",
    href: "https://github.com/Arkhram-Organization/ESCAPE-C137",
    authors: ["sebacalvino", "theotrosman"],
  },
  {
    code: "ARK-002",
    name: "PROMPTOOL",
    status: "ACTIVE",
    classification: "AI / GAMIFICATION",
    desc: "Daily game. One AI-generated image. Reconstruct the exact prompt. Scored by Gemini. The only game where your imagination is the controller.",
    cinematic: "The image exists. The prompt that created it does not. Yet.",
    tech: ["React", "Vite", "Supabase", "Groq", "Gemini API", "Node.js", "Vercel"],
    impact: "Transforms prompt engineering into a measurable, gamified daily practice. Wordle for the AI era.",
    href: "https://github.com/theotrosman/PROMPTOOL",
    live: "https://promptool.vercel.app",
    authors: ["theotrosman"],
  },
  {
    code: "ARK-003",
    name: "AUTOMATIS",
    status: "ACTIVE",
    classification: "AI / INFRASTRUCTURE",
    desc: "Describe what you want automated. The AI asks only what it needs. Your n8n workflow executes itself. No technical knowledge required.",
    cinematic: "The machine learns what you want before you finish wanting it.",
    tech: ["Next.js 16", "TypeScript", "Groq / Llama 3.3", "n8n", "Supabase", "Docker"],
    impact: "Collapses the gap between intent and execution. AI-native automation infrastructure for any workflow.",
    href: "https://github.com/Arkhram-Organization/Automatis",
    authors: ["sebacalvino", "theotrosman"],
  },
];

const STATUS_COLORS = {
  ACTIVE: "#22c55e",
  DEPLOYED: "#c0a060",
  CLASSIFIED: "#8b1a1a",
};

function ArchiveEntry({ archive, index }: { archive: Archive; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-10% 0px" });
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setExpanded(!expanded)}
        animate={{
          borderColor: hovered || expanded ? "rgba(139,26,26,0.35)" : "rgba(255,255,255,0.05)",
          background: expanded ? "rgba(12,4,4,1)" : hovered ? "rgba(10,3,3,1)" : "rgba(8,5,5,1)",
        }}
        transition={{ duration: 0.3 }}
        style={{
          border: "1px solid rgba(255,255,255,0.05)",
          cursor: "pointer",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Hover glow */}
        <motion.div
          animate={{ opacity: hovered || expanded ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "3px",
            background: "linear-gradient(180deg, transparent, rgba(139,26,26,0.8), transparent)",
            pointerEvents: "none",
          }}
        />

        {/* Header row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr auto auto",
            alignItems: "center",
            gap: "1.5rem",
            padding: "1.4rem 1.8rem",
          }}
        >
          {/* Code */}
          <div style={{ fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "rgba(139,26,26,0.5)", whiteSpace: "nowrap" }}>
            {archive.code}
          </div>

          {/* Name + classification */}
          <div>
            <div
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
                fontWeight: 600,
                letterSpacing: "0.1em",
                color: "#d4c9b8",
                marginBottom: "0.15rem",
              }}
            >
              {archive.name}
            </div>
            <div style={{ fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.12em", color: "rgba(192,160,96,0.4)", textTransform: "uppercase" }}>
              {archive.classification}
            </div>
          </div>

          {/* Status */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: STATUS_COLORS[archive.status],
                boxShadow: `0 0 8px ${STATUS_COLORS[archive.status]}`,
              }}
            />
            <span style={{ fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.1em", color: STATUS_COLORS[archive.status], opacity: 0.8 }}>
              {archive.status}
            </span>
          </div>

          {/* Expand arrow */}
          <motion.div
            animate={{ rotate: expanded ? 90 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ color: "rgba(139,26,26,0.5)", fontSize: "0.8rem", fontFamily: "monospace" }}
          >
            →
          </motion.div>
        </div>

        {/* Brief desc (always visible) */}
        <div
          style={{
            padding: "0 1.8rem 1.2rem",
            fontFamily: "monospace",
            fontSize: "0.65rem",
            color: "rgba(212,201,184,0.35)",
            letterSpacing: "0.02em",
            lineHeight: 1.7,
          }}
        >
          {archive.desc}
        </div>

        {/* Expanded content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: "hidden" }}
            >
              <div
                style={{
                  padding: "0 1.8rem 1.8rem",
                  borderTop: "1px solid rgba(139,26,26,0.1)",
                  marginTop: "0.5rem",
                  paddingTop: "1.5rem",
                }}
              >
                {/* Cinematic line */}
                <div
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "0.75rem",
                    fontStyle: "italic",
                    color: "rgba(192,160,96,0.5)",
                    marginBottom: "1.5rem",
                    paddingLeft: "1rem",
                    borderLeft: "2px solid rgba(139,26,26,0.3)",
                    lineHeight: 1.7,
                    letterSpacing: "0.04em",
                  }}
                >
                  &ldquo;{archive.cinematic}&rdquo;
                </div>

                {/* Impact */}
                <div style={{ marginBottom: "1.2rem" }}>
                  <div style={{ fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.3em", color: "rgba(139,26,26,0.4)", marginBottom: "0.4rem", textTransform: "uppercase" }}>
                    / impact
                  </div>
                  <p style={{ fontFamily: "monospace", fontSize: "0.65rem", color: "rgba(212,201,184,0.45)", lineHeight: 1.7, letterSpacing: "0.02em" }}>
                    {archive.impact}
                  </p>
                </div>

                {/* Tech stack */}
                <div style={{ marginBottom: "1.2rem" }}>
                  <div style={{ fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.3em", color: "rgba(139,26,26,0.4)", marginBottom: "0.5rem", textTransform: "uppercase" }}>
                    / stack
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                    {archive.tech.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontFamily: "monospace",
                          fontSize: "0.55rem",
                          letterSpacing: "0.08em",
                          color: "rgba(212,201,184,0.5)",
                          border: "1px solid rgba(255,255,255,0.06)",
                          padding: "0.15rem 0.45rem",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Authors */}
                <div style={{ marginBottom: "1.2rem" }}>
                  <div style={{ fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.3em", color: "rgba(139,26,26,0.4)", marginBottom: "0.4rem", textTransform: "uppercase" }}>
                    / operators
                  </div>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    {archive.authors.map((a) => (
                      <span key={a} style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "rgba(192,160,96,0.5)" }}>
                        @{a}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <a
                    href={archive.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="btn-gothic"
                    style={{ padding: "0.5rem 1.2rem", fontSize: "0.6rem", textDecoration: "none", display: "inline-block" }}
                  >
                    ⟶ &nbsp; REPOSITORY
                  </a>
                  {archive.live && (
                    <a
                      href={archive.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="btn-ghost"
                      style={{ padding: "0.5rem 1.2rem", fontSize: "0.6rem", textDecoration: "none", display: "inline-block" }}
                    >
                      ⟶ &nbsp; LIVE INSTANCE
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export function ArchivesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-10% 0px" });

  return (
    <section
      ref={ref}
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "8rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Atmosphere */}
      <div
        className="animate-fog"
        style={{
          position: "absolute",
          inset: "-20%",
          background: "radial-gradient(ellipse 70% 60% at 80% 30%, rgba(15,3,3,0.5) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ width: "100%", maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 5 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: "4rem" }}
        >
          <div style={{ fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.5em", color: "rgba(139,26,26,0.5)", marginBottom: "1rem", textTransform: "uppercase" }}>
            ── ARKHRAM / CLASSIFIED ARCHIVES ──
          </div>
          <h2
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "#d4c9b8",
              marginBottom: "0.75rem",
            }}
          >
            THE ARCHIVES
          </h2>
          <p style={{ fontFamily: "monospace", fontSize: "0.65rem", color: "rgba(212,201,184,0.3)", letterSpacing: "0.05em", maxWidth: "500px", lineHeight: 1.8 }}>
            Each project is an entry in the Arkhram system — a record of intent, architecture, and execution.
            Click to decrypt.
          </p>
        </motion.div>

        {/* Archive entries */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {ARCHIVES.map((archive, i) => (
            <ArchiveEntry key={archive.code} archive={archive} index={i} />
          ))}
        </div>

        {/* Footer label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          style={{
            marginTop: "2rem",
            fontFamily: "monospace",
            fontSize: "0.55rem",
            letterSpacing: "0.2em",
            color: "rgba(139,26,26,0.3)",
            textAlign: "right",
          }}
        >
          TOTAL_RECORDS: {ARCHIVES.length} / ACCESS_LEVEL: PUBLIC / CLASSIFICATION: ARKHRAM_ORG
        </motion.div>
      </div>
    </section>
  );
}

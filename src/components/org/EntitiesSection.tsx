"use client";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

type Entity = {
  id: string;
  username: string;
  handle: string;
  role: string;
  faction: string;
  cipher: string;
  bio: string;
  quote: string;
  skills: string[];
  projects: { name: string; href: string }[];
};

const ENTITIES: Entity[] = [
  {
    id: "ENTITY_01",
    username: "sebacalvino",
    handle: "CALVIÑO",
    role: "Systems Architect",
    faction: "AI / Infrastructure",
    cipher: "SBC-4107",
    bio: "Constructs intelligence where others only see complexity. Full-stack by necessity, systems thinker by nature. Builds what the problem demands — nothing more.",
    quote: "Curiosity over comfort. Iteration over perfection.",
    skills: ["AI Systems", "Python", "C#", "React", "n8n", "Automation"],
    projects: [
      { name: "ESCAPE-C137", href: "https://github.com/Automatis-Organization/ESCAPE-C137" },
      { name: "Tektra", href: "https://github.com/SebaCalvino/Tektra" },
    ],
  },
  {
    id: "ENTITY_02",
    username: "theotrosman",
    handle: "TROSMAN",
    role: "Backend Architect",
    faction: "Systems / Infrastructure",
    cipher: "THT-0293",
    bio: "Backend-first. Every layer has a truth — he finds it at the lowest one. Designs systems that outlast the problem that required them.",
    quote: "Every system reveals its truth in its lowest layer.",
    skills: ["C# / .NET", "Next.js", "TypeScript", "Supabase", "REST", "Vercel"],
    projects: [
      { name: "PROMPTOOL", href: "https://github.com/theotrosman/PROMPTOOL" },
      { name: "Automatis", href: "https://github.com/Automatis-Organization/Automatis" },
    ],
  },
];

function EntityReveal({ entity, index }: { entity: Entity; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-12% 0px" });
  const [hovered, setHovered] = useState(false);

  const fromDir = index === 0 ? -100 : 100;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: fromDir, filter: "blur(16px)" }}
      animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : { opacity: 0, x: fromDir, filter: "blur(16px)" }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative" }}
    >
      {/* Outer glow border */}
      <motion.div
        animate={{
          boxShadow: hovered
            ? "0 0 60px rgba(139,26,26,0.18), inset 0 0 60px rgba(139,26,26,0.04)"
            : "0 0 0px rgba(139,26,26,0)",
          borderColor: hovered ? "rgba(139,26,26,0.3)" : "rgba(255,255,255,0.04)",
        }}
        transition={{ duration: 0.5 }}
        style={{
          border: "1px solid rgba(255,255,255,0.04)",
          background: "linear-gradient(160deg, #0a0606 0%, #060404 60%, #0d0707 100%)",
          padding: "2.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Scan line sweep on hover */}
        <motion.div
          animate={{ y: hovered ? "200%" : "-100%", opacity: hovered ? [0, 0.06, 0] : 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: "40%",
            background: "linear-gradient(180deg, transparent, rgba(139,26,26,0.08), transparent)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Entity ID header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.8rem", position: "relative", zIndex: 1 }}>
          <span style={{ fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.4em", color: "rgba(139,26,26,0.5)", textTransform: "uppercase" }}>
            {entity.id} / AUTOMATIS
          </span>
          <span style={{ fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.2em", color: "rgba(212,201,184,0.2)" }}>
            CIPHER: {entity.cipher}
          </span>
        </div>

        {/* Avatar + identity */}
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", marginBottom: "1.8rem", position: "relative", zIndex: 1 }}>
          <div style={{ position: "relative", flexShrink: 0 }}>
            {/* Avatar with blood glow */}
            <motion.div
              animate={{ filter: hovered ? "grayscale(0%) contrast(1.1)" : "grayscale(40%) contrast(1.05)" }}
              transition={{ duration: 0.5 }}
              style={{
                width: 76,
                height: 76,
                border: "1px solid rgba(139,26,26,0.25)",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Image
                src={`https://github.com/${entity.username}.png?size=200`}
                alt={entity.handle}
                width={76}
                height={76}
                style={{ objectFit: "cover", display: "block" }}
                unoptimized
              />
              {/* CRT scanlines on avatar */}
              <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 4px)", pointerEvents: "none" }} />
            </motion.div>
            {/* Pulse dot */}
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ position: "absolute", bottom: -4, right: -4, width: 8, height: 8, borderRadius: "50%", background: "#8b1a1a", border: "1.5px solid #050505" }}
            />
          </div>

          <div>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", fontWeight: 700, letterSpacing: "0.12em", color: "#e0d8cc", lineHeight: 1, marginBottom: "0.35rem" }}>
              {entity.handle}
            </div>
            <div style={{ fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.08em", color: "rgba(192,160,96,0.55)", marginBottom: "0.2rem" }}>
              {entity.role}
            </div>
            <div style={{ fontFamily: "monospace", fontSize: "0.52rem", letterSpacing: "0.08em", color: "rgba(139,26,26,0.45)" }}>
              {entity.faction}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(139,26,26,0.35), rgba(192,160,96,0.15), transparent)", marginBottom: "1.5rem", position: "relative", zIndex: 1 }} />

        {/* Bio */}
        <p style={{ fontFamily: "monospace", fontSize: "0.68rem", lineHeight: 1.95, color: "rgba(212,201,184,0.5)", marginBottom: "1.2rem", letterSpacing: "0.02em", position: "relative", zIndex: 1 }}>
          {entity.bio}
        </p>

        {/* Quote */}
        <motion.div
          animate={{ borderLeftColor: hovered ? "rgba(139,26,26,0.6)" : "rgba(139,26,26,0.25)" }}
          transition={{ duration: 0.4 }}
          style={{ borderLeft: "1.5px solid rgba(139,26,26,0.25)", paddingLeft: "0.9rem", marginBottom: "1.5rem", position: "relative", zIndex: 1 }}
        >
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: "0.68rem", fontStyle: "italic", color: "rgba(212,201,184,0.3)", letterSpacing: "0.04em", lineHeight: 1.75 }}>
            &ldquo;{entity.quote}&rdquo;
          </p>
        </motion.div>

        {/* Skills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginBottom: "1.5rem", position: "relative", zIndex: 1 }}>
          {entity.skills.map((s) => (
            <span key={s} style={{ fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.1em", color: "rgba(139,26,26,0.65)", border: "1px solid rgba(139,26,26,0.18)", padding: "0.15rem 0.45rem", textTransform: "uppercase" }}>
              {s}
            </span>
          ))}
        </div>

        {/* Linked artifacts */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontFamily: "monospace", fontSize: "0.48rem", letterSpacing: "0.35em", color: "rgba(212,201,184,0.18)", marginBottom: "0.4rem", textTransform: "uppercase" }}>/ artifacts</div>
          {entity.projects.map((p) => (
            <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "0.45rem", fontFamily: "monospace", fontSize: "0.6rem", color: "rgba(192,160,96,0.45)", textDecoration: "none", marginBottom: "0.25rem", transition: "color 0.2s ease" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(192,160,96,0.85)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(192,160,96,0.45)")}
            >
              <span style={{ color: "rgba(139,26,26,0.5)" }}>→</span> {p.name}
            </a>
          ))}
        </div>

        {/* Corner marks */}
        <div style={{ position: "absolute", top: 12, right: 12, width: 12, height: 12, borderTop: "1px solid rgba(139,26,26,0.2)", borderRight: "1px solid rgba(139,26,26,0.2)" }} />
        <div style={{ position: "absolute", bottom: 12, left: 12, width: 12, height: 12, borderBottom: "1px solid rgba(139,26,26,0.2)", borderLeft: "1px solid rgba(139,26,26,0.2)" }} />
      </motion.div>
    </motion.div>
  );
}

export function EntitiesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-8% 0px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section ref={ref} style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "10rem 2rem", position: "relative", overflow: "hidden" }}>
      {/* Moving fog background */}
      <motion.div style={{ y: bgY, position: "absolute", inset: "-15%", pointerEvents: "none" }}>
        <div className="animate-fog-slow" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(18,3,3,0.7) 0%, transparent 70%)" }} />
      </motion.div>

      <div style={{ width: "100%", maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 5 }}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.9 }}
          style={{ marginBottom: "4rem", textAlign: "center" }}
        >
          <div style={{ fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.55em", color: "rgba(139,26,26,0.45)", marginBottom: "0.8rem", textTransform: "uppercase" }}>
            ── ROSTER / ACTIVE OPERATIVES ──
          </div>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)", fontWeight: 700, letterSpacing: "0.22em", color: "#d0c8bc", marginBottom: "0.6rem" }}>
            THE ENTITIES
          </h2>
          <p style={{ fontFamily: "monospace", fontSize: "0.62rem", color: "rgba(212,201,184,0.25)", maxWidth: "420px", margin: "0 auto", lineHeight: 1.8 }}>
            Not developers. Not designers.<br />Operators within the Automatis system.
          </p>
        </motion.div>

        {/* Entity grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))", gap: "2px" }}>
          {ENTITIES.map((e, i) => <EntityReveal key={e.id} entity={e} index={i} />)}
        </div>
      </div>
    </section>
  );
}

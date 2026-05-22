"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

type Entity = {
  id: string;
  username: string;
  codename: string;
  role: string;
  bio: string;
  quote: string;
  tags: string[];
  side: "left" | "right";
  projects: { name: string; href: string }[];
};

const ENTITIES: Entity[] = [
  {
    id: "01",
    username: "sebacalvino",
    codename: "CALVIÑO",
    role: "Systems Architect / AI Engineer",
    bio: "Constructs intelligence from the ground up. Product thinking forged in clean architecture. Where others iterate, he designs the invariants.",
    quote: "Curiosity over comfort. Iteration over perfection.",
    tags: ["AI Systems", "Full-Stack", "Automation", "Python", "C#", "React"],
    side: "left",
    projects: [
      { name: "ESCAPE-C137", href: "https://github.com/Arkhram-Organization/ESCAPE-C137" },
      { name: "Tektra", href: "https://github.com/SebaCalvino/Tektra" },
    ],
  },
  {
    id: "02",
    username: "theotrosman",
    codename: "TROSMAN",
    role: "Backend Architect / Systems Thinker",
    bio: "Every system reveals its truth in its lowest layer. Backend-first. Scalable by design. The architect behind the architecture.",
    quote: "Every system reveals its truth in its lowest layer.",
    tags: ["Backend", "C# / .NET", "Next.js", "TypeScript", "APIs", "Supabase"],
    side: "right",
    projects: [
      { name: "PROMPTOOL", href: "https://github.com/theotrosman/PROMPTOOL" },
      { name: "Automatis", href: "https://github.com/Arkhram-Organization/Automatis" },
    ],
  },
];

function EntityCard({ entity, index }: { entity: Entity; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-15% 0px" });
  const [hovered, setHovered] = useState(false);

  const fromLeft = entity.side === "left";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: fromLeft ? -80 : 80, filter: "blur(12px)" }}
      animate={
        isInView
          ? { opacity: 1, x: 0, filter: "blur(0px)" }
          : { opacity: 0, x: fromLeft ? -80 : 80, filter: "blur(12px)" }
      }
      transition={{ duration: 1.2, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        padding: "2px",
        borderRadius: "2px",
        background: hovered
          ? "linear-gradient(135deg, rgba(139,26,26,0.4), rgba(60,20,10,0.2), rgba(192,160,96,0.15))"
          : "linear-gradient(135deg, rgba(139,26,26,0.12), transparent)",
        cursor: "default",
        transition: "background 0.5s ease",
      }}
    >
      <div
        style={{
          background: "linear-gradient(145deg, #080808 0%, #050505 60%, #0a0505 100%)",
          padding: "2.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background fog on hover */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at 30% 50%, rgba(139,26,26,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Entity ID */}
        <div
          style={{
            fontFamily: "monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.4em",
            color: "rgba(139,26,26,0.5)",
            marginBottom: "1.5rem",
          }}
        >
          ENTIDAD_{entity.id} / ARKHRAM_ROSTER
        </div>

        {/* Avatar + title row */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5rem", marginBottom: "1.5rem" }}>
          {/* Avatar */}
          <div style={{ position: "relative", flexShrink: 0 }}>
            <motion.div
              animate={{
                boxShadow: hovered
                  ? "0 0 30px rgba(139,26,26,0.4), 0 0 60px rgba(139,26,26,0.1)"
                  : "0 0 10px rgba(139,26,26,0.15)",
              }}
              transition={{ duration: 0.5 }}
              style={{
                width: 80,
                height: 80,
                borderRadius: "2px",
                overflow: "hidden",
                border: "1px solid rgba(139,26,26,0.2)",
                position: "relative",
              }}
            >
              <Image
                src={`https://github.com/${entity.username}.png?size=200`}
                alt={entity.codename}
                width={80}
                height={80}
                style={{ objectFit: "cover", filter: "grayscale(30%) contrast(1.1)" }}
                unoptimized
              />
              {/* Scanline over avatar */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.12) 3px, rgba(0,0,0,0.12) 4px)",
                  pointerEvents: "none",
                }}
              />
            </motion.div>
            {/* Status indicator */}
            <div
              style={{
                position: "absolute",
                bottom: -4,
                right: -4,
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#8b1a1a",
                border: "1px solid #050505",
                animation: "pulse-blood 2s ease-in-out infinite",
              }}
            />
          </div>

          {/* Name block */}
          <div>
            <div
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontWeight: 700,
                letterSpacing: "0.15em",
                color: "#e8e0d5",
                lineHeight: 1,
                marginBottom: "0.4rem",
              }}
            >
              {entity.codename}
            </div>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.08em",
                color: "rgba(192,160,96,0.6)",
              }}
            >
              {entity.role}
            </div>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: "0.55rem",
                letterSpacing: "0.1em",
                color: "rgba(139,26,26,0.5)",
                marginTop: "0.2rem",
              }}
            >
              @{entity.username}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, rgba(139,26,26,0.4), rgba(192,160,96,0.2), transparent)",
            marginBottom: "1.5rem",
          }}
        />

        {/* Bio */}
        <p
          style={{
            fontFamily: "monospace",
            fontSize: "0.72rem",
            lineHeight: 1.9,
            color: "rgba(212,201,184,0.55)",
            marginBottom: "1.5rem",
            letterSpacing: "0.02em",
          }}
        >
          {entity.bio}
        </p>

        {/* Quote */}
        <div
          style={{
            borderLeft: "2px solid rgba(139,26,26,0.4)",
            paddingLeft: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          <p
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "0.72rem",
              fontStyle: "italic",
              color: "rgba(212,201,184,0.35)",
              letterSpacing: "0.04em",
              lineHeight: 1.7,
            }}
          >
            &ldquo;{entity.quote}&rdquo;
          </p>
        </div>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.5rem" }}>
          {entity.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "monospace",
                fontSize: "0.55rem",
                letterSpacing: "0.1em",
                color: "rgba(139,26,26,0.7)",
                border: "1px solid rgba(139,26,26,0.2)",
                padding: "0.2rem 0.5rem",
                textTransform: "uppercase",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Projects */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "0.55rem",
              letterSpacing: "0.3em",
              color: "rgba(212,201,184,0.2)",
              marginBottom: "0.3rem",
              textTransform: "uppercase",
            }}
          >
            / linked archives
          </div>
          {entity.projects.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.05em",
                color: "rgba(192,160,96,0.5)",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "rgba(192,160,96,0.9)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "rgba(192,160,96,0.5)")
              }
            >
              <span style={{ color: "rgba(139,26,26,0.6)" }}>→</span>
              {p.name}
            </a>
          ))}
        </div>

        {/* Corner mark */}
        <div
          style={{
            position: "absolute",
            bottom: 16,
            right: 16,
            width: 16,
            height: 16,
            borderBottom: "1px solid rgba(139,26,26,0.25)",
            borderRight: "1px solid rgba(139,26,26,0.25)",
          }}
        />
      </div>
    </motion.div>
  );
}

export function EntitiesSection() {
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
      {/* Background atmosphere */}
      <div
        className="animate-fog-slow"
        style={{
          position: "absolute",
          inset: "-20%",
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(20,3,3,0.6) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ width: "100%", maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 5 }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: "5rem" }}
        >
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.5em",
              color: "rgba(139,26,26,0.5)",
              marginBottom: "1rem",
              textTransform: "uppercase",
            }}
          >
            ── ROSTER / CLASSIFIED ──
          </div>
          <h2
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              fontWeight: 700,
              letterSpacing: "0.25em",
              color: "#d4c9b8",
              marginBottom: "0.5rem",
            }}
          >
            THE ENTITIES
          </h2>
          <p
            style={{
              fontFamily: "monospace",
              fontSize: "0.65rem",
              color: "rgba(212,201,184,0.3)",
              letterSpacing: "0.08em",
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            Two operators. One architecture. Neither product nor team —{" "}
            <em>a system with intent.</em>
          </p>
        </motion.div>

        {/* Entity cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))",
            gap: "2px",
          }}
        >
          {ENTITIES.map((entity, i) => (
            <EntityCard key={entity.id} entity={entity} index={i} />
          ))}
        </div>

        {/* Connector line between cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1, duration: 1.5 }}
          style={{
            textAlign: "center",
            marginTop: "3rem",
            fontFamily: "monospace",
            fontSize: "0.55rem",
            letterSpacing: "0.4em",
            color: "rgba(139,26,26,0.3)",
            textTransform: "uppercase",
          }}
        >
          ✦ &nbsp; unified under arkhram &nbsp; ✦
        </motion.div>
      </div>
    </section>
  );
}

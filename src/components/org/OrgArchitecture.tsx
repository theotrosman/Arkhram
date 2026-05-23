"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Node = {
  id: string;
  label: string;
  sub: string;
  x: number;
  y: number;
  type: "core" | "entity" | "project" | "infra";
};

const NODES: Node[] = [
  { id: "core", label: "AUTOMATIS", sub: "core", x: 50, y: 50, type: "core" },
  { id: "seba", label: "CALVIÑO", sub: "entity_01", x: 20, y: 25, type: "entity" },
  { id: "theo", label: "TROSMAN", sub: "entity_02", x: 80, y: 25, type: "entity" },
  { id: "esc", label: "ESCAPE-C137", sub: "ark-001", x: 15, y: 65, type: "project" },
  { id: "prm", label: "PROMPTOOL", sub: "ark-002", x: 50, y: 80, type: "project" },
  { id: "aut", label: "AUTOMATIS", sub: "ark-003", x: 85, y: 65, type: "project" },
  { id: "sb", label: "SUPABASE", sub: "db", x: 30, y: 88, type: "infra" },
  { id: "gr", label: "GROQ", sub: "ai", x: 70, y: 88, type: "infra" },
  { id: "n8", label: "n8n", sub: "automation", x: 85, y: 44, type: "infra" },
];

const EDGES = [
  ["core", "seba"], ["core", "theo"],
  ["core", "esc"], ["core", "prm"], ["core", "aut"],
  ["seba", "esc"], ["theo", "prm"], ["theo", "aut"], ["seba", "aut"],
  ["prm", "gr"], ["aut", "gr"], ["aut", "n8"], ["esc", "sb"], ["prm", "sb"],
];

const NODE_COLORS = {
  core: { fill: "rgba(139,26,26,0.15)", stroke: "rgba(139,26,26,0.6)", text: "#cc3333" },
  entity: { fill: "rgba(30,10,10,0.8)", stroke: "rgba(192,160,96,0.4)", text: "#c0a060" },
  project: { fill: "rgba(20,8,8,0.8)", stroke: "rgba(139,26,26,0.3)", text: "#d4c9b8" },
  infra: { fill: "rgba(10,5,5,0.8)", stroke: "rgba(255,255,255,0.08)", text: "rgba(212,201,184,0.4)" },
};

function getNodePos(node: Node, svgW: number, svgH: number) {
  return { cx: (node.x / 100) * svgW, cy: (node.y / 100) * svgH };
}

const SVG_W = 600;
const SVG_H = 340;

export function OrgArchitecture() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-10% 0px" });

  const getNode = (id: string) => NODES.find((n) => n.id === id)!;

  return (
    <section
      ref={ref}
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        padding: "8rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Atmosphere */}
      <div
        className="animate-fog-slower"
        style={{
          position: "absolute",
          inset: "-20%",
          background: "radial-gradient(ellipse 80% 60% at 50% 60%, rgba(20,5,5,0.7) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ width: "100%", maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 5 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1 }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <div style={{ fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.5em", color: "rgba(139,26,26,0.5)", marginBottom: "1rem", textTransform: "uppercase" }}>
            ── SYSTEM MAP / LIVE ──
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
            THE ARCHITECTURE
          </h2>
          <p style={{ fontFamily: "monospace", fontSize: "0.65rem", color: "rgba(212,201,184,0.3)", letterSpacing: "0.05em", maxWidth: "460px", margin: "0 auto", lineHeight: 1.8 }}>
            Automatis is not a team. It is a network. Every entity, project, and infrastructure layer
            connected by shared intent.
          </p>
        </motion.div>

        {/* Network diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            border: "1px solid rgba(139,26,26,0.15)",
            background: "rgba(5,5,5,0.9)",
            padding: "2rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Scanlines */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />

          <svg
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            style={{ width: "100%", height: "auto", display: "block", position: "relative", zIndex: 2 }}
          >
            <defs>
              <filter id="node-glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="edge-glow">
                <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Edges */}
            {EDGES.map(([a, b], i) => {
              const na = getNode(a);
              const nb = getNode(b);
              const pa = getNodePos(na, SVG_W, SVG_H);
              const pb = getNodePos(nb, SVG_W, SVG_H);
              const isCoreEdge = a === "core" || b === "core";
              return (
                <motion.line
                  key={`${a}-${b}`}
                  x1={pa.cx}
                  y1={pa.cy}
                  x2={pb.cx}
                  y2={pb.cy}
                  stroke={isCoreEdge ? "rgba(139,26,26,0.3)" : "rgba(255,255,255,0.06)"}
                  strokeWidth={isCoreEdge ? 1.5 : 0.8}
                  strokeDasharray={isCoreEdge ? "none" : "4,4"}
                  filter={isCoreEdge ? "url(#edge-glow)" : "none"}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.04, ease: "easeOut" }}
                />
              );
            })}

            {/* Nodes */}
            {NODES.map((node, i) => {
              const { cx, cy } = getNodePos(node, SVG_W, SVG_H);
              const colors = NODE_COLORS[node.type];
              const r = node.type === "core" ? 32 : node.type === "entity" ? 24 : node.type === "project" ? 20 : 14;
              return (
                <motion.g
                  key={node.id}
                  filter="url(#node-glow)"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: `${cx}px ${cy}px` }}
                >
                  {/* Node circle */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill={colors.fill}
                    stroke={colors.stroke}
                    strokeWidth={node.type === "core" ? 1.5 : 1}
                  />

                  {/* Pulse ring for core */}
                  {node.type === "core" && (
                    <motion.circle
                      cx={cx}
                      cy={cy}
                      r={r + 8}
                      fill="none"
                      stroke="rgba(139,26,26,0.2)"
                      strokeWidth={1}
                      animate={{ r: [r + 5, r + 14, r + 5], opacity: [0.4, 0, 0.4] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )}

                  {/* Label */}
                  <text
                    x={cx}
                    y={cy + (node.type === "core" ? -2 : -1)}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: node.type === "core" ? 7.5 : node.type === "entity" ? 6.5 : 5.5,
                      fill: colors.text,
                      letterSpacing: "0.08em",
                      fontWeight: node.type === "core" ? 700 : 400,
                    }}
                  >
                    {node.label}
                  </text>
                  <text
                    x={cx}
                    y={cy + (node.type === "core" ? 9 : 7)}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{
                      fontFamily: "monospace",
                      fontSize: 4.5,
                      fill: "rgba(212,201,184,0.2)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {node.sub}
                  </text>
                </motion.g>
              );
            })}
          </svg>

          {/* Legend */}
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", marginTop: "1rem", position: "relative", zIndex: 2 }}>
            {(["core", "entity", "project", "infra"] as const).map((type) => (
              <div key={type} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: NODE_COLORS[type].fill,
                    border: `1px solid ${NODE_COLORS[type].stroke}`,
                  }}
                />
                <span style={{ fontFamily: "monospace", fontSize: "0.5rem", color: "rgba(212,201,184,0.25)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  {type}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={{ textAlign: "center", marginTop: "3rem" }}
        >
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: "0.75rem", fontStyle: "italic", color: "rgba(192,160,96,0.35)", letterSpacing: "0.08em" }}>
            &ldquo;Every node carries the weight of the whole.&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}

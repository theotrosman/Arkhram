"use client";

import { useEffect, useRef, useState } from "react";

const DEFINITIONS = [
  {
    term: "Autonomous Intelligence Layer.",
    def: "Not a chatbot. Not a builder. A runtime that converts natural language into operational infrastructure.",
  },
  {
    term: "Dark Architecture.",
    def: "The system works in the background. Silent, persistent, relentless. You describe intent — ARKHRAM executes.",
  },
  {
    term: "Operating System For Thought.",
    def: "Every workflow, every agent, every automation — compiled from language into production-grade execution.",
  },
];

const TECH = [
  ["Runtime",        "n8n self-hosted"],
  ["Intelligence",   "Llama 3.3 / 70B"],
  ["Avg latency",    "4.2s"],
  ["Trigger types",  "18"],
  ["Connectors",     "40+"],
  ["Auth layer",     "Supabase / OAuth2"],
  ["Uptime",         "99.97%"],
  ["Architecture",   "Multi-agent"],
];

const INTEGRATIONS = [
  "gmail", "shopify", "whatsapp", "slack", "notion",
  "google_sheets", "mercadolibre", "instagram", "airtable",
  "telegram", "hubspot", "trello", "typeform", "webhook",
  "outlook", "drive", "calendar", "asana", "stripe", "twilio",
];

export function SystemPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* ── LEFT ── */}
        <div
          className="p-10 lg:p-16 flex flex-col gap-10 section-reveal"
          style={{
            borderRight: "1px solid rgba(255,255,255,0.04)",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: "#8b1a1a" }}>
            / WHAT IS ARKHRAM
          </p>

          <div className="space-y-8">
            {DEFINITIONS.map(({ term, def }) => (
              <div key={term} className="space-y-2 group">
                <p
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "13px",
                    color: "#d4c9b8",
                    letterSpacing: "0.05em",
                  }}
                >
                  {term}
                </p>
                <p className="font-mono text-[11px] leading-relaxed" style={{ color: "#4a4540" }}>
                  {def}
                </p>
              </div>
            ))}
          </div>

          {/* Tech spec table */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: "32px" }}>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-5" style={{ color: "#3a3530" }}>
              TECHNICAL SPECIFICATIONS
            </p>
            <div>
              {TECH.map(([label, val], i) => (
                <div
                  key={label}
                  className="flex justify-between items-baseline py-2.5 font-mono text-[11px] group"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
                >
                  <span style={{ color: "#3a3530" }}>{label}</span>
                  <span
                    className="transition-colors duration-200"
                    style={{ color: i === 0 || i === 7 ? "#8b1a1a" : "#6a6060" }}
                  >
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div
          className="p-10 lg:p-16 flex flex-col gap-10 section-reveal"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
          }}
        >
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: "#8b1a1a" }}>
            / ARCHITECTURE
          </p>

          {/* ASCII diagram — gothic style */}
          <pre
            className="font-mono leading-relaxed select-none"
            style={{
              fontSize: "11px",
              color: "#3a3530",
              background: "rgba(5,2,2,0.6)",
              border: "1px solid rgba(139,26,26,0.1)",
              padding: "20px",
            }}
          >
{`  INPUT                  CORE                OUTPUT
  ─────                  ────                ──────

  natural language  ───▶ ┌──────────────┐
                         │              │  ──▶  whatsapp.send
  external event    ───▶ │  ARKHRAM OS  │  ──▶  sheets.append
                         │              │  ──▶  slack.notify
  schedule / cron   ───▶ │  compiler    │  ──▶  notion.create
                         │  + agents    │  ──▶  email.send
  webhook POST      ───▶ │  + memory    │  ──▶  pdf.generate
                         └──────────────┘  ──▶  drive.upload
                                │
                           n8n runtime
                         (production infra)`}
          </pre>

          {/* Integrations */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-5" style={{ color: "#3a3530" }}>
              CONNECTED SYSTEMS
            </p>
            <div className="flex flex-wrap gap-1.5">
              {INTEGRATIONS.map((name) => (
                <span
                  key={name}
                  className="font-mono text-[10px] px-2.5 py-1.5 transition-all duration-200"
                  style={{
                    color: "#3a3530",
                    border: "1px solid rgba(255,255,255,0.04)",
                    background: "rgba(5,2,2,0.5)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLSpanElement).style.color = "#8a7060";
                    (e.currentTarget as HTMLSpanElement).style.borderColor = "rgba(139,26,26,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLSpanElement).style.color = "#3a3530";
                    (e.currentTarget as HTMLSpanElement).style.borderColor = "rgba(255,255,255,0.04)";
                  }}
                >
                  {name}
                </span>
              ))}
              <span className="font-mono text-[10px] px-2.5 py-1.5" style={{ color: "#2a2520" }}>
                +20 more
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

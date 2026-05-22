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
  {
    name: "Gmail",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M4 6h16l-8 7-8-7z" stroke="#EA4335" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M4 6v12h16V6" stroke="#EA4335" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    name: "Shopify",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M15.5 4.5S15 3 13.5 3c-.8 0-1.5.5-2 1L5 6l-1 14 14 2.5L21 7l-5.5-2.5z" stroke="#96BF48" strokeWidth="1.5"/>
        <path d="M13.5 3C13 5 12.5 9 12.5 9M9 10l.5 7M12.5 10V17M16 10l-.5 7" stroke="#96BF48" strokeWidth="1" strokeLinecap="round" opacity="0.7"/>
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.998-1.41A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" stroke="#25D366" strokeWidth="1.5"/>
        <path d="M8.5 9.5c.5 2 2 3.5 4 4l1-1.5 2 1c0 1.5-1.5 2.5-3 2-2.5-.8-4.5-3-5.2-5.5-.3-1.5.5-2.5 1.7-2.5l1 2-1.5 1z" stroke="#25D366" strokeWidth="1" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    name: "Slack",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <rect x="3" y="3" width="4" height="4" rx="1" fill="#E01E5A" opacity="0.9"/>
        <rect x="3" y="10" width="4" height="4" rx="1" fill="#36C5F0" opacity="0.9"/>
        <rect x="10" y="3" width="4" height="4" rx="1" fill="#2EB67D" opacity="0.9"/>
        <rect x="10" y="10" width="4" height="4" rx="1" fill="#ECB22E" opacity="0.9"/>
        <rect x="3" y="17" width="4" height="4" rx="1" fill="#ECB22E" opacity="0.4"/>
        <rect x="10" y="17" width="4" height="4" rx="1" fill="#E01E5A" opacity="0.4"/>
        <rect x="17" y="3" width="4" height="4" rx="1" fill="#36C5F0" opacity="0.4"/>
        <rect x="17" y="10" width="4" height="4" rx="1" fill="#2EB67D" opacity="0.4"/>
      </svg>
    ),
  },
  {
    name: "Notion",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <rect x="4" y="3" width="16" height="18" rx="2" stroke="#aaa" strokeWidth="1.5"/>
        <path d="M8 8h8M8 12h6M8 16h4" stroke="#aaa" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "Sheets",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <rect x="4" y="3" width="16" height="18" rx="1" stroke="#34A853" strokeWidth="1.5"/>
        <path d="M4 9h16M4 15h16M10 3v18" stroke="#34A853" strokeWidth="1" opacity="0.7"/>
      </svg>
    ),
  },
  {
    name: "MercadoLibre",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <ellipse cx="12" cy="12" rx="9" ry="7" stroke="#FFE600" strokeWidth="1.5"/>
        <path d="M7 12c0-2.5 2.5-5 5-5s5 2.5 5 5" stroke="#FFE600" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="12" cy="15" r="1.5" fill="#FFE600"/>
      </svg>
    ),
  },
  {
    name: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="#E1306C" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="4" stroke="#E1306C" strokeWidth="1.5"/>
        <circle cx="17" cy="7" r="1" fill="#E1306C"/>
      </svg>
    ),
  },
  {
    name: "Telegram",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <circle cx="12" cy="12" r="9" stroke="#2AABEE" strokeWidth="1.5"/>
        <path d="M7 12l3 3 7-7" stroke="#2AABEE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    name: "HubSpot",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <circle cx="12" cy="8" r="3" stroke="#FF7A59" strokeWidth="1.5"/>
        <path d="M12 11v8M8 18h8" stroke="#FF7A59" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="18" cy="8" r="2" stroke="#FF7A59" strokeWidth="1.5"/>
        <path d="M15 8h1" stroke="#FF7A59" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "Airtable",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <rect x="3" y="3" width="8" height="8" rx="1.5" fill="#18BFFF" opacity="0.8"/>
        <rect x="13" y="3" width="8" height="8" rx="1.5" fill="#FCB400" opacity="0.8"/>
        <rect x="3" y="13" width="8" height="8" rx="1.5" fill="#F82B60" opacity="0.8"/>
        <rect x="13" y="13" width="8" height="8" rx="1.5" stroke="#555" strokeWidth="1" opacity="0.4"/>
      </svg>
    ),
  },
  {
    name: "Trello",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="#0079BF" strokeWidth="1.5"/>
        <rect x="6" y="6" width="4" height="10" rx="1" fill="#0079BF" opacity="0.8"/>
        <rect x="13" y="6" width="4" height="7" rx="1" fill="#0079BF" opacity="0.8"/>
      </svg>
    ),
  },
  {
    name: "Drive",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M12 3L3 19h18L12 3z" stroke="#4285F4" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M3 19l6-10" stroke="#34A853" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M21 19l-6-10" stroke="#EA4335" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "Webhook",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M8 9l-3 3 3 3M16 9l3 3-3 3" stroke="#6a5a50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 6l-4 12" stroke="#6a5a50" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "Calendar",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <rect x="3" y="5" width="18" height="16" rx="2" stroke="#4285F4" strokeWidth="1.5"/>
        <path d="M3 10h18M8 3v4M16 3v4" stroke="#4285F4" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="7" y="13" width="3" height="3" rx="0.5" fill="#4285F4" opacity="0.7"/>
      </svg>
    ),
  },
  {
    name: "Stripe",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="#635BFF" strokeWidth="1.5"/>
        <path d="M3 10h18" stroke="#635BFF" strokeWidth="1.5"/>
        <path d="M8 15h3M8 13h5" stroke="#635BFF" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
      </svg>
    ),
  },
  {
    name: "Outlook",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <rect x="2" y="4" width="13" height="16" rx="1.5" stroke="#0078D4" strokeWidth="1.5"/>
        <path d="M15 8l7-3v14l-7-3" stroke="#0078D4" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="8.5" cy="12" r="2.5" stroke="#0078D4" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    name: "Asana",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <circle cx="12" cy="7" r="3" fill="#F06A6A" opacity="0.9"/>
        <circle cx="6" cy="16" r="3" fill="#F06A6A" opacity="0.9"/>
        <circle cx="18" cy="16" r="3" fill="#F06A6A" opacity="0.9"/>
      </svg>
    ),
  },
  {
    name: "Twilio",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <circle cx="12" cy="12" r="9" stroke="#F22F46" strokeWidth="1.5"/>
        <circle cx="9" cy="9" r="1.5" fill="#F22F46"/>
        <circle cx="15" cy="9" r="1.5" fill="#F22F46"/>
        <circle cx="9" cy="15" r="1.5" fill="#F22F46"/>
        <circle cx="15" cy="15" r="1.5" fill="#F22F46"/>
      </svg>
    ),
  },
  {
    name: "+ 22 más",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M12 5v14M5 12h14" stroke="#3a3530" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export function SystemPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
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

        {/* ── LEFT: What is it ── */}
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
              <div key={term} className="space-y-2">
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
                  className="flex justify-between items-baseline py-2.5 font-mono text-[11px]"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
                >
                  <span style={{ color: "#3a3530" }}>{label}</span>
                  <span style={{ color: i === 0 || i === 7 ? "#8b1a1a" : "#6a6060" }}>
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Connected systems with logos ── */}
        <div
          className="p-10 lg:p-16 flex flex-col gap-8 section-reveal"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
          }}
        >
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: "#8b1a1a" }}>
              / CONNECTED SYSTEMS
            </p>
            <span className="font-mono text-[10px]" style={{ color: "#2a2520" }}>40+ connectors</span>
          </div>

          {/* Logo grid */}
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5">
            {INTEGRATIONS.map((integration) => (
              <div
                key={integration.name}
                className="group flex flex-col items-center gap-2 p-2.5"
                style={{
                  border: "1px solid rgba(255,255,255,0.04)",
                  background: "rgba(5,2,2,0.5)",
                  transition: "border-color 0.2s ease, background 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(139,26,26,0.3)";
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(20,5,5,0.8)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.04)";
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(5,2,2,0.5)";
                }}
              >
                <div className="flex items-center justify-center w-8 h-8">
                  {integration.icon}
                </div>
                <span
                  className="font-mono text-center leading-tight"
                  style={{
                    fontSize: "8px",
                    color: "#3a3530",
                    letterSpacing: "0.03em",
                  }}
                >
                  {integration.name}
                </span>
              </div>
            ))}
          </div>

          <p className="font-mono text-[10px] leading-relaxed" style={{ color: "#2a2520" }}>
            Native n8n connectors. If an n8n node exists, ARKHRAM can generate it.
            Generic webhook available for any system with a REST API.
          </p>
        </div>
      </div>
    </section>
  );
}

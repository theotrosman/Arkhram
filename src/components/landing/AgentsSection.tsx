"use client";

import { useEffect, useRef, useState } from "react";

type AgentStatus = "ACTIVE" | "RUNNING" | "IDLE";

interface LogLine {
  delay: number;
  text: string;
  type: "info" | "fetch" | "parse" | "llm" | "output" | "ok" | "err";
}

interface AgentDef {
  id: string;
  name: string;
  trigger: string;
  status: AgentStatus;
  lastRun: string;
  logs: LogLine[];
}

const AGENTS: AgentDef[] = [
  {
    id: "FLW-3041",
    name: "news-monitor-arg",
    trigger: "0 8 * * *",
    status: "RUNNING",
    lastRun: "08:00:01",
    logs: [
      { delay: 0,    text: "cycle started — schedule: 0 8 * * *", type: "info" },
      { delay: 500,  text: "FETCH  infobae.com/economia", type: "fetch" },
      { delay: 1000, text: "↳ 200 OK — 42KB — parsing articles...", type: "fetch" },
      { delay: 1500, text: "↳ extracted: 18 articles", type: "parse" },
      { delay: 1900, text: "↳ filter 'inflación': 4 matches", type: "parse" },
      { delay: 2300, text: "FETCH  clarin.com/economia", type: "fetch" },
      { delay: 2700, text: "↳ 200 OK — 2 relevant articles", type: "fetch" },
      { delay: 3100, text: "LLM    summarizing 6 articles via Llama 3.3...", type: "llm" },
      { delay: 4400, text: "↳ summary generated — 340 words", type: "llm" },
      { delay: 4800, text: "OUTPUT generating PDF: report-2025-05-22.pdf", type: "output" },
      { delay: 5400, text: "↳ 284KB — uploaded to drive:/reports/", type: "output" },
      { delay: 5900, text: "SEND   slack → #economics-team", type: "output" },
      { delay: 6400, text: "✓  completed in 6.4s — next run: tomorrow 08:00", type: "ok" },
    ],
  },
  {
    id: "FLW-3044",
    name: "price-monitor-ml",
    trigger: "*/30 * * * *",
    status: "ACTIVE",
    lastRun: "13:30:00",
    logs: [
      { delay: 0,    text: "cycle started — every 30 min", type: "info" },
      { delay: 500,  text: "FETCH  api.mercadolibre.com/items?ids=...", type: "fetch" },
      { delay: 1000, text: "↳ 200 OK — 12 listings fetched", type: "fetch" },
      { delay: 1400, text: "PARSE  comparing against previous snapshot...", type: "parse" },
      { delay: 1800, text: "↳ change detected: 'HP Notebook 15' -12%", type: "parse" },
      { delay: 2200, text: "↳ change detected: '27\" Monitor' +8%", type: "parse" },
      { delay: 2600, text: "SEND   whatsapp → +54911···4321", type: "output" },
      { delay: 3000, text: "↳ delivered — 2 alerts sent", type: "ok" },
      { delay: 3400, text: "✓  completed in 3.4s — next run: 14:00", type: "ok" },
    ],
  },
  {
    id: "FLW-3047",
    name: "invoice-processor",
    trigger: "gmail.trigger",
    status: "ACTIVE",
    lastRun: "13:41:22",
    logs: [
      { delay: 0,    text: "trigger: gmail — subject: 'Invoice #4921'", type: "info" },
      { delay: 500,  text: "FETCH  attachment: invoice-4921.pdf (284KB)", type: "fetch" },
      { delay: 1000, text: "↳ downloaded — starting extraction...", type: "fetch" },
      { delay: 1400, text: "LLM    extracting: vendor, amount, date, tax id", type: "llm" },
      { delay: 2200, text: "↳ vendor: Servicios Cloud SA", type: "parse" },
      { delay: 2500, text: "↳ amount: $145,800 — date: 05/22/2025", type: "parse" },
      { delay: 2900, text: "↳ tax id: 30-71234567-8 — VAT: $25,518", type: "parse" },
      { delay: 3300, text: "WRITE  sheets → /invoices/2025/may — row 214", type: "output" },
      { delay: 3800, text: "UPLOAD drive → /invoices/2025/may/4921.pdf", type: "output" },
      { delay: 4300, text: "✓  completed in 4.3s — row registered", type: "ok" },
    ],
  },
];

function lineColor(type: LogLine["type"]): string {
  switch (type) {
    case "fetch":   return "#6a5a50";
    case "parse":   return "#8a7a60";
    case "llm":     return "#8b1a1a";
    case "output":  return "#7a6a58";
    case "ok":      return "#6a8a5a";
    case "err":     return "#cc3333";
    default:        return "#4a4540";
  }
}

function statusColor(s: AgentStatus): string {
  switch (s) {
    case "RUNNING": return "#cc6600";
    case "ACTIVE":  return "#6a8a5a";
    default:        return "#4a4540";
  }
}

function AgentLog({ agent }: { agent: AgentDef }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const triggeredRef = useRef(false);

  useEffect(() => {
    if (triggeredRef.current) return;
    triggeredRef.current = true;
    agent.logs.forEach((line, i) => {
      setTimeout(() => setVisibleCount(i + 1), line.delay);
    });
  }, [agent.logs]);

  return (
    <div
      className="p-5 min-h-[240px] font-mono text-[11px] space-y-[3px] relative overflow-hidden"
      style={{ background: "#030303" }}
    >
      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 3px)",
          zIndex: 0,
        }}
      />
      <div className="relative" style={{ zIndex: 1 }}>
        <div className="flex justify-between mb-3" style={{ color: "#3a3530" }}>
          <span>AGENT: {agent.name}</span>
          <span style={{ color: "#2a2520" }}>schedule: {agent.trigger}</span>
        </div>
        {agent.logs.slice(0, visibleCount).map((line, i) => (
          <div key={i} className="leading-relaxed" style={{ color: lineColor(line.type) }}>
            <span style={{ color: "#2a2520", marginRight: "8px" }}>[{agent.lastRun}]</span>
            {line.text}
            {i === visibleCount - 1 && line.type !== "ok" && (
              <span
                className="inline-block align-middle"
                style={{
                  width: 7, height: 11,
                  background: "currentColor",
                  marginLeft: 3,
                  animation: "cursor-blink 1.1s step-end infinite",
                  opacity: 0.6,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const CAPABILITIES = [
  ["Web Scraping",   "Reads public websites, extracts structured data"],
  ["Monitoring",     "Detects changes on sites and reacts automatically"],
  ["LLM Processing", "Summarizes, classifies and transforms content with AI"],
  ["Documents",      "Extracts data from PDFs, emails and attachments"],
  ["Reports",        "Generates PDFs and distributes via Slack, email, Drive"],
  ["Event-driven",   "Reacts to any system event with a REST API or webhook"],
];

export function AgentsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); obs.disconnect(); },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">

        {/* Left — description */}
        <div
          className="p-8 lg:p-12 flex flex-col gap-7 section-reveal"
          style={{
            borderRight: "1px solid rgba(255,255,255,0.04)",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
            background: "rgba(5,2,2,0.5)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: "#8b1a1a" }}>
            / AGENTS
          </p>

          <div className="space-y-2">
            <p
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "13px",
                color: "#d4c9b8",
                letterSpacing: "0.05em",
                lineHeight: 1.5,
              }}
            >
              Workflows that perceive, reason, and act.
            </p>
            <p className="font-mono text-[11px] leading-relaxed" style={{ color: "#4a4540" }}>
              Not scripts. Agents that read the web, process with AI and produce real outputs.
            </p>
          </div>

          <div>
            {CAPABILITIES.map(([cap, desc]) => (
              <div
                key={cap}
                className="py-2.5"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
              >
                <p className="font-mono text-[11px]" style={{ color: "#8a7060" }}>{cap}</p>
                <p className="font-mono text-[10px] mt-0.5 leading-relaxed" style={{ color: "#3a3530" }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>

          <p className="font-mono text-[10px] leading-relaxed mt-auto" style={{ color: "#2a2520" }}>
            Powered by n8n + Llama 3.3. Scraping works on public sites
            without anti-bot protection. Sites with login or CAPTCHA
            are not accessible. Transparent about limitations.
          </p>
        </div>

        {/* Right — live agent display */}
        <div
          className="flex flex-col section-reveal"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
          }}
        >
          {/* Agent tabs */}
          <div
            className="flex items-stretch overflow-x-auto"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", background: "#060606" }}
          >
            {AGENTS.map((agent, i) => (
              <button
                key={agent.id}
                onClick={() => setActiveTab(i)}
                className="flex-shrink-0 px-5 py-3 font-mono text-left transition-all duration-200"
                style={{
                  borderRight: "1px solid rgba(255,255,255,0.04)",
                  borderBottom: activeTab === i ? "2px solid #8b1a1a" : "2px solid transparent",
                  background: activeTab === i ? "#0a0505" : "transparent",
                  color: activeTab === i ? "#8a7060" : "#3a3530",
                }}
              >
                <div className="flex items-center gap-2 mb-0.5" style={{ fontSize: "9px" }}>
                  <span
                    className="rounded-full"
                    style={{
                      width: 6, height: 6, display: "inline-block",
                      background: statusColor(agent.status),
                      boxShadow: agent.status === "RUNNING" ? "0 0 6px rgba(204,102,0,0.8)" : "none",
                    }}
                  />
                  <span className="font-mono tracking-widest uppercase" style={{ fontSize: "9px" }}>
                    {agent.status}
                  </span>
                </div>
                <span className="font-mono" style={{ fontSize: "9px", color: "#2a2520" }}>
                  {agent.id}
                </span>
              </button>
            ))}
          </div>

          {/* Active agent name bar */}
          <div
            className="px-5 py-3 flex items-center justify-between"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.03)", background: "#050505" }}
          >
            <span className="font-mono text-[11px]" style={{ color: "#6a5a50" }}>
              {AGENTS[activeTab].name}
            </span>
            <span
              className="font-mono text-[9px] px-2 py-0.5 border"
              style={{
                color: statusColor(AGENTS[activeTab].status),
                borderColor: `${statusColor(AGENTS[activeTab].status)}40`,
                background: `${statusColor(AGENTS[activeTab].status)}10`,
              }}
            >
              {AGENTS[activeTab].status}
            </span>
          </div>

          {/* Log output */}
          <AgentLog agent={AGENTS[activeTab]} key={activeTab} />

          {/* Footer */}
          <div
            className="px-5 py-2.5 flex items-center justify-between"
            style={{ borderTop: "1px solid rgba(255,255,255,0.03)", background: "#060606" }}
          >
            <span className="font-mono text-[10px]" style={{ color: "#2a2520" }}>
              last run: {AGENTS[activeTab].lastRun}
            </span>
            <span className="font-mono text-[10px]" style={{ color: "#1a1510" }}>
              runtime: n8n / llama 3.3
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

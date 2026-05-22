"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

// ── LIVE TERMINAL LOGS ──
const TERMINAL_LINES = [
  { delay: 0,    type: "sys",    text: "ARKHRAM OS v2.1 — INITIALIZING" },
  { delay: 400,  type: "sys",    text: "Loading autonomous agent network..." },
  { delay: 900,  type: "blank",  text: "" },
  { delay: 1100, type: "agent",  text: "[AGENT-01] Scraping reuters.com/technology..." },
  { delay: 1600, type: "ok",     text: "  → 47 articles extracted — cleaning data" },
  { delay: 2100, type: "ok",     text: "  → Generating intelligence report PDF" },
  { delay: 2500, type: "done",   text: "  ✓ report_2025_05_22.pdf — sent to Slack" },
  { delay: 2900, type: "blank",  text: "" },
  { delay: 3100, type: "agent",  text: "[AGENT-02] Gmail trigger: 'INVOICE' match" },
  { delay: 3500, type: "ok",     text: "  → Extracting attachment (284KB PDF)" },
  { delay: 3900, type: "ok",     text: "  → Uploading to Drive /facturas/2025/may/" },
  { delay: 4300, type: "ok",     text: "  → Logging to Notion database" },
  { delay: 4700, type: "done",   text: "  ✓ FLW-2907 completed — 1628ms" },
  { delay: 5000, type: "blank",  text: "" },
  { delay: 5200, type: "agent",  text: "[AGENT-03] Shopify order #4421 — $12,900" },
  { delay: 5600, type: "ok",     text: "  → Appending to Google Sheets row 848" },
  { delay: 6000, type: "ok",     text: "  → Notifying team via WhatsApp" },
  { delay: 6400, type: "done",   text: "  ✓ FLW-2901 completed — 884ms" },
  { delay: 6700, type: "blank",  text: "" },
  { delay: 6900, type: "agent",  text: "[AGENT-04] Multiagent workflow initiated" },
  { delay: 7300, type: "ok",     text: "  → COORDINATOR: dispatching 3 sub-agents" },
  { delay: 7700, type: "ok",     text: "  → RESEARCHER: analyzing market data" },
  { delay: 8100, type: "ok",     text: "  → WRITER: generating executive summary" },
  { delay: 8500, type: "ok",     text: "  → SENDER: distributing to 12 recipients" },
  { delay: 8900, type: "done",   text: "  ✓ Multiagent task completed — 4.2s" },
  { delay: 9200, type: "blank",  text: "" },
  { delay: 9400, type: "sys",    text: "All systems operational. 27 flows active." },
];

// ── BAT SVG PATH ──
function BatSVG({ size = 24, opacity = 0.6 }: { size?: number; opacity?: number }) {
  return (
    <svg
      width={size}
      height={size * 0.55}
      viewBox="0 0 60 33"
      fill="none"
      style={{ opacity }}
    >
      <path
        d="M30 16 C26 8, 18 4, 8 6 C4 7, 0 10, 0 14 C4 12, 8 14, 10 18 C12 14, 16 12, 20 14 C22 15, 24 17, 26 20 C27 21, 28 22, 30 22 C32 22, 33 21, 34 20 C36 17, 38 15, 40 14 C44 12, 48 14, 50 18 C52 14, 56 12, 60 14 C60 10, 56 7, 52 6 C42 4, 34 8, 30 16Z"
        fill="currentColor"
      />
      <ellipse cx="30" cy="18" rx="4" ry="5" fill="currentColor" />
    </svg>
  );
}

// ── ANIMATED BAT ──
function AnimatedBat({
  startDelay,
  yPos,
  size,
  direction,
  duration,
}: {
  startDelay: number;
  yPos: number;
  size: number;
  direction: "ltr" | "rtl";
  duration: number;
}) {
  const [visible, setVisible] = useState(false);
  const [wingFlap, setWingFlap] = useState(false);

  useEffect(() => {
    const show = setTimeout(() => {
      setVisible(true);
      const flapInterval = setInterval(() => setWingFlap((f) => !f), 180);
      const hide = setTimeout(() => {
        setVisible(false);
        clearInterval(flapInterval);
      }, duration);
      return () => {
        clearTimeout(hide);
        clearInterval(flapInterval);
      };
    }, startDelay);
    return () => clearTimeout(show);
  }, [startDelay, duration]);

  if (!visible) return null;

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        top: `${yPos}%`,
        color: "#1a1010",
        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.8))",
        animation: `${direction === "ltr" ? "bat-fly-1" : "bat-fly-2"} ${duration}ms linear forwards`,
        transform: wingFlap ? "scaleY(0.4)" : "scaleY(1)",
        transition: "transform 0.18s ease",
        zIndex: 5,
      }}
    >
      <BatSVG size={size} opacity={0.5} />
    </div>
  );
}

// ── PARTICLE ──
function Particle({ x, y, size, duration, delay }: { x: number; y: number; size: number; duration: number; delay: number }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        background: Math.random() > 0.7 ? "rgba(139,26,26,0.6)" : "rgba(212,201,184,0.3)",
        animation: `particle-float ${duration}s ease-in ${delay}s infinite`,
        filter: "blur(0.5px)",
      }}
    />
  );
}

export function HeroSection() {
  const [terminalLines, setTerminalLines] = useState<typeof TERMINAL_LINES>([]);
  const [mounted, setMounted] = useState(false);
  const [bats, setBats] = useState<Array<{ id: number; yPos: number; size: number; direction: "ltr" | "rtl"; duration: number; delay: number }>>([]);
  const [particles] = useState(() =>
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 10,
    }))
  );
  const terminalRef = useRef<HTMLDivElement>(null);
  const loopRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleBats = useCallback(() => {
    const batConfigs = [
      { yPos: 15, size: 18, direction: "ltr" as const, duration: 6000, delay: 3000 },
      { yPos: 35, size: 12, direction: "rtl" as const, duration: 8000, delay: 12000 },
      { yPos: 55, size: 22, direction: "ltr" as const, duration: 5500, delay: 20000 },
      { yPos: 25, size: 10, direction: "rtl" as const, duration: 9000, delay: 28000 },
      { yPos: 45, size: 16, direction: "ltr" as const, duration: 7000, delay: 38000 },
    ];
    setBats(batConfigs.map((b, i) => ({ ...b, id: i })));
  }, []);

  useEffect(() => {
    setMounted(true);
    scheduleBats();

    // Terminal animation loop
    const runTerminal = () => {
      setTerminalLines([]);
      TERMINAL_LINES.forEach((line, i) => {
        loopRef.current = setTimeout(() => {
          setTerminalLines((prev) => [...prev, line]);
          if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
          }
        }, line.delay);
      });
      // Restart after last line + pause
      const lastDelay = TERMINAL_LINES[TERMINAL_LINES.length - 1].delay;
      loopRef.current = setTimeout(runTerminal, lastDelay + 4000);
    };
    runTerminal();

    return () => {
      if (loopRef.current) clearTimeout(loopRef.current);
    };
  }, [scheduleBats]);

  function lineStyle(type: string): React.CSSProperties {
    switch (type) {
      case "sys":   return { color: "#5a5550", fontStyle: "italic" };
      case "agent": return { color: "#8b1a1a" };
      case "ok":    return { color: "#4a5540" };
      case "done":  return { color: "#6a8a5a" };
      default:      return { color: "transparent" };
    }
  }

  return (
    <section className="relative min-h-screen overflow-hidden" style={{ background: "#050505" }}>

      {/* ── ATMOSPHERIC BACKGROUND ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        {/* Deep fog layers */}
        <div
          className="absolute inset-0 animate-fog"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 20% 50%, rgba(139,26,26,0.06) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 animate-fog-slow"
          style={{
            background: "radial-gradient(ellipse 60% 80% at 80% 30%, rgba(30,20,20,0.8) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 animate-fog-slower"
          style={{
            background: "radial-gradient(ellipse 100% 50% at 50% 80%, rgba(139,26,26,0.04) 0%, transparent 60%)",
          }}
        />

        {/* Gothic architecture silhouette — CSS drawn */}
        <div className="absolute bottom-0 left-0 right-0" style={{ height: "45%", opacity: 0.12 }}>
          {/* Tower left */}
          <div className="absolute bottom-0 left-[5%]" style={{
            width: 60, height: "70%",
            background: "linear-gradient(180deg, #1a1010 0%, #0d0808 100%)",
            clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
          }} />
          <div className="absolute bottom-0 left-[4%]" style={{
            width: 80, height: "85%",
            background: "#0d0808",
            clipPath: "polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)",
          }} />
          {/* Tower right */}
          <div className="absolute bottom-0 right-[8%]" style={{
            width: 50, height: "60%",
            background: "#0d0808",
            clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
          }} />
          <div className="absolute bottom-0 right-[6%]" style={{
            width: 70, height: "75%",
            background: "#0a0606",
            clipPath: "polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)",
          }} />
          {/* Cathedral center */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2" style={{
            width: 200, height: "50%",
            background: "#080505",
            clipPath: "polygon(10% 100%, 0% 100%, 15% 40%, 30% 20%, 50% 0%, 70% 20%, 85% 40%, 100% 100%, 90% 100%)",
          }} />
        </div>

        {/* Vignette */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)",
        }} />

        {/* Scanlines */}
        <div className="absolute inset-0 scanlines" style={{ opacity: 0.4 }} />

        {/* Noise */}
        <div className="absolute inset-0 noise-overlay" />
      </div>

      {/* ── PARTICLES ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        {mounted && particles.map((p) => (
          <Particle key={p.id} {...p} />
        ))}
      </div>

      {/* ── BATS ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
        {mounted && bats.map((bat) => (
          <AnimatedBat key={bat.id} {...bat} startDelay={bat.delay} />
        ))}
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="relative grid grid-cols-1 lg:grid-cols-2 min-h-screen pt-12" style={{ zIndex: 10 }}>

        {/* LEFT — Hero text */}
        <div className="flex flex-col justify-center px-8 lg:px-16 py-20 lg:py-0">

          {/* System label */}
          <div className="mb-8 flex items-center gap-3">
            <div
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "#8b1a1a", boxShadow: "0 0 8px rgba(139,26,26,0.9)" }}
            />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: "#5a3030" }}>
              ARKHRAM.ORG / AUTONOMOUS INTELLIGENCE / v2.1.0
            </span>
          </div>

          {/* Main logo */}
          <h1
            className="animate-glitch"
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(52px, 10vw, 140px)",
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: "0.05em",
              color: "#d4c9b8",
              textShadow: "0 0 40px rgba(212,201,184,0.08), 0 2px 0 rgba(0,0,0,0.8)",
            }}
          >
            ARKHRAM
          </h1>

          {/* Tagline */}
          <div className="mt-6 mb-8">
            <p
              className="font-mono text-sm tracking-[0.2em] uppercase"
              style={{ color: "#8b1a1a" }}
            >
              The Dark Architecture Of Intelligence
            </p>
            <div className="mt-3 h-px" style={{
              background: "linear-gradient(90deg, rgba(139,26,26,0.6), rgba(192,160,96,0.2), transparent)",
            }} />
          </div>

          {/* Description */}
          <p
            className="font-mono text-sm leading-relaxed max-w-md mb-10"
            style={{ color: "#5a5550" }}
          >
            Autonomous agents. Real workflows. Web scraping, document generation,
            multiagent coordination. An operating system for thought — not another chatbot.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/login"
              className="btn-gothic px-8 py-4 text-xs text-center"
              style={{ fontFamily: "monospace", letterSpacing: "0.2em" }}
            >
              INITIALIZE SYSTEM →
            </Link>
            <Link
              href="#features"
              className="btn-ghost px-8 py-4 text-xs text-center"
              style={{ fontFamily: "monospace", letterSpacing: "0.15em" }}
            >
              EXPLORE CAPABILITIES
            </Link>
          </div>

          {/* Integrations strip */}
          <div className="mt-12 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
            <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-3" style={{ color: "#2a2520" }}>
              Connected Systems
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {["Gmail", "Shopify", "WhatsApp", "Slack", "Notion", "Sheets", "Drive", "Telegram", "HubSpot", "Airtable"].map((s) => (
                <span key={s} className="font-mono text-[10px] transition-colors duration-200" style={{ color: "#3a3530" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#6a5a50")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#3a3530")}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — Live terminal */}
        <div className="flex flex-col justify-center px-6 lg:px-10 py-16 lg:py-20">
          <div className="terminal-window relative" style={{ maxHeight: "70vh" }}>
            {/* Terminal header */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{
                borderBottom: "1px solid rgba(139,26,26,0.15)",
                background: "rgba(10,5,5,0.9)",
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#3a1010" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#2a1a0a" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#1a2a0a" }} />
              </div>
              <span className="font-mono text-[9px] tracking-widest" style={{ color: "#3a2a2a" }}>
                ARKHRAM / LIVE EXECUTION FEED
              </span>
              <div className="flex items-center gap-1.5">
                <div
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: "#8b1a1a", boxShadow: "0 0 6px rgba(139,26,26,0.8)" }}
                />
                <span className="font-mono text-[9px]" style={{ color: "#8b1a1a" }}>LIVE</span>
              </div>
            </div>

            {/* Terminal body */}
            <div
              ref={terminalRef}
              className="relative overflow-hidden scanlines"
              style={{
                height: "420px",
                padding: "16px",
                background: "#020202",
                overflowY: "auto",
              }}
            >
              {/* Top fade */}
              <div className="absolute top-0 left-0 right-0 h-8 pointer-events-none" style={{
                background: "linear-gradient(to bottom, #020202, transparent)",
                zIndex: 2,
              }} />

              <div className="space-y-1">
                {terminalLines.map((line, i) => (
                  <div key={i}>
                    {line.type === "blank" ? (
                      <div style={{ height: "8px" }} />
                    ) : (
                      <p
                        className="font-mono text-[11px] leading-relaxed"
                        style={lineStyle(line.type)}
                      >
                        {line.type === "sys" && (
                          <span style={{ color: "#3a2a2a" }}>// </span>
                        )}
                        {line.text}
                        {i === terminalLines.length - 1 && line.type !== "blank" && (
                          <span
                            className="cursor-blink inline-block ml-0.5 align-middle"
                            style={{ width: 7, height: 12, background: "currentColor", opacity: 0.7 }}
                          />
                        )}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Terminal footer */}
            <div
              className="flex items-center justify-between px-4 py-2"
              style={{
                borderTop: "1px solid rgba(139,26,26,0.1)",
                background: "rgba(5,2,2,0.95)",
              }}
            >
              <span className="font-mono text-[9px]" style={{ color: "#2a1a1a" }}>
                ARKHRAM OS · NODE:CENTRAL · LLAMA 3.3 / 70B
              </span>
              <span className="font-mono text-[9px]" style={{ color: "#3a2020" }}>
                {mounted ? new Date().toISOString().slice(0, 10) : "----"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── SCROLL INDICATOR ── */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 10 }}
      >
        <div
          className="w-px h-12 animate-pulse"
          style={{ background: "linear-gradient(to bottom, rgba(139,26,26,0.6), transparent)" }}
        />
        <span className="font-mono text-[9px] tracking-[0.3em]" style={{ color: "#3a2a2a" }}>
          SCROLL
        </span>
      </div>
    </section>
  );
}

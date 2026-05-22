"use client";

import { useEffect, useRef, useState } from "react";

const LINES = [
  { delay: 0,     type: "prompt",  text: "arkhram --new-session" },
  { delay: 500,   type: "system",  text: "// Session initialized. Describe your automation." },
  { delay: 1100,  type: "blank",   text: "" },
  { delay: 1300,  type: "user",    text: "when shopify registers a new sale, notify the team on whatsapp with order details" },
  { delay: 2700,  type: "ai",      text: "→ Which Shopify store?" },
  { delay: 3500,  type: "user",    text: "mitienda.myshopify.com" },
  { delay: 4400,  type: "ai",      text: "→ WhatsApp number for notifications?" },
  { delay: 5100,  type: "user",    text: "+5491187654321" },
  { delay: 6000,  type: "ai",      text: "→ Include order amount and product name?" },
  { delay: 6700,  type: "user",    text: "yes, with total and customer name" },
  { delay: 7500,  type: "blank",   text: "" },
  { delay: 7700,  type: "schema",  text: "TRIGGER:  shopify.orders [mitienda.myshopify.com]" },
  { delay: 8000,  type: "schema",  text: "ACTION:   whatsapp.send → +5491187654321" },
  { delay: 8300,  type: "schema",  text: "MESSAGE:  \"Order #{id}: {product} — ${total} · {customer}\"" },
  { delay: 8800,  type: "blank",   text: "" },
  { delay: 9000,  type: "confirm", text: "→ Ready to deploy. Activate?" },
  { delay: 9900,  type: "user",    text: "yes" },
  { delay: 10600, type: "blank",   text: "" },
  { delay: 10800, type: "deploy",  text: "[          ] compiling flow..." },
  { delay: 11300, type: "deploy",  text: "[████      ] connecting shopify webhook" },
  { delay: 11800, type: "deploy",  text: "[████████  ] authenticating whatsapp" },
  { delay: 12300, type: "done",    text: "✓  FLW-2910 ACTIVE — awaiting first sale" },
];

export function TerminalDemo() {
  const [visibleCount, setVisibleCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          LINES.forEach((line, i) => {
            setTimeout(() => setVisibleCount(i + 1), line.delay);
          });
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  function lineStyle(type: string): React.CSSProperties {
    switch (type) {
      case "prompt":  return { color: "#8b1a1a" };
      case "system":  return { color: "#2a2520", fontStyle: "italic" };
      case "user":    return { color: "#8a8070" };
      case "ai":      return { color: "#5a5550" };
      case "schema":  return { color: "#6a5a40" };
      case "confirm": return { color: "#6a6060" };
      case "deploy":  return { color: "#3a3530" };
      case "done":    return { color: "#4a8a3a", fontWeight: "bold" };
      default:        return {};
    }
  }

  function linePrefix(type: string) {
    switch (type) {
      case "prompt":  return "❯ ";
      case "user":    return "  $ ";
      case "ai":      return "  ";
      case "schema":  return "    ";
      case "confirm": return "  ";
      case "deploy":  return "    ";
      case "done":    return "    ";
      default:        return "";
    }
  }

  return (
    <section
      id="demo"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr]">

        {/* Label column */}
        <div
          className="p-10 lg:p-12 flex flex-col gap-8"
          style={{
            borderRight: "1px solid rgba(255,255,255,0.04)",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
            background: "rgba(3,2,2,0.6)",
          }}
        >
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: "#8b1a1a" }}>
            / DEMO
          </p>

          <div className="space-y-7">
            {[
              ["01 / DESCRIBE", "Natural language. No forms. No builders."],
              ["02 / ARKHRAM ASKS", "One question at a time. Precise."],
              ["03 / DEPLOYED", "Flow compiled and live in seconds."],
            ].map(([title, desc]) => (
              <div key={title} className="space-y-1.5">
                <p
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "11px",
                    color: "#6a5a50",
                    letterSpacing: "0.1em",
                  }}
                >
                  {title}
                </p>
                <p className="font-mono text-[10px] leading-relaxed" style={{ color: "#2a2520" }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.03)" }}>
            <p className="font-mono text-[9px]" style={{ color: "#1a1a1a" }}>real time: ~12s</p>
            <p className="font-mono text-[9px]" style={{ color: "#1a1a1a" }}>zero code required</p>
          </div>
        </div>

        {/* Terminal */}
        <div ref={ref}>
          {/* Terminal header */}
          <div
            className="flex items-center gap-2 px-5 py-3"
            style={{
              borderBottom: "1px solid rgba(139,26,26,0.1)",
              background: "rgba(5,2,2,0.9)",
            }}
          >
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#3a1010" }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#2a1a0a" }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#1a2a0a" }} />
            </div>
            <span className="ml-3 font-mono text-[10px]" style={{ color: "#2a2020" }}>
              arkhram / new automation session
            </span>
            <div className="ml-auto flex items-center gap-1.5">
              <div
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: "#8b1a1a", boxShadow: "0 0 6px rgba(139,26,26,0.8)" }}
              />
              <span className="font-mono text-[9px]" style={{ color: "#8b1a1a" }}>live session</span>
            </div>
          </div>

          {/* Terminal body */}
          <div
            className="relative scanlines"
            style={{
              background: "#020202",
              padding: "24px",
              minHeight: "420px",
            }}
          >
            <div className="space-y-1">
              {LINES.slice(0, visibleCount).map((line, i) => (
                <div key={i}>
                  {line.type === "blank" ? (
                    <div style={{ height: "10px" }} />
                  ) : (
                    <p
                      className="font-mono text-[12px] leading-relaxed"
                      style={lineStyle(line.type)}
                    >
                      <span style={{ opacity: 0.4 }}>{linePrefix(line.type)}</span>
                      {line.text}
                      {i === visibleCount - 1 && line.type !== "done" && line.type !== "blank" && (
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
        </div>
      </div>
    </section>
  );
}

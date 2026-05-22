"use client";

import { useEffect, useRef, useState } from "react";

const DIRS = [
  {
    path: "intelligence/",
    entries: ["web-scraping.wf", "news-monitor.wf", "research-agent.wf", "pdf-report.wf"],
    color: "#8b1a1a",
  },
  {
    path: "ecommerce/",
    entries: ["new-sale.wf", "low-stock.wf", "post-sale.wf", "refund-handler.wf"],
    color: "#8b1a1a",
  },
  {
    path: "healthcare/",
    entries: ["appointments.wf", "reminder-48h.wf", "patient-intake.wf", "cancellation.wf"],
    color: "#8b1a1a",
  },
  {
    path: "finance/",
    entries: ["invoice-processor.wf", "expense-tracker.wf", "reports.wf"],
    color: "#8b1a1a",
  },
  {
    path: "agencies/",
    entries: ["client-onboarding.wf", "content-approval.wf", "weekly-report.wf"],
    color: "#8b1a1a",
  },
  {
    path: "hr/",
    entries: ["onboarding.wf", "leave-request.wf", "cv-processor.wf"],
    color: "#8b1a1a",
  },
  {
    path: "custom/",
    entries: ["webhook.wf", "schedule.wf", "[any_trigger].wf"],
    color: "#3a3530",
  },
];

export function DirectorySection() {
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
      style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr]">

        {/* Left label */}
        <div
          className="p-10 lg:p-14 flex flex-col gap-5"
          style={{
            borderRight: "1px solid rgba(255,255,255,0.04)",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
            background: "rgba(3,2,2,0.5)",
          }}
        >
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: "#8b1a1a" }}>
            / DOMAINS
          </p>
          <p
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(18px, 2vw, 24px)",
              color: "#d4c9b8",
              letterSpacing: "0.05em",
              lineHeight: 1.3,
            }}
          >
            Every industry.<br />Every process.
          </p>
          <p className="font-mono text-[11px] leading-relaxed" style={{ color: "#3a3530" }}>
            If there are repetitive processes, there is a flow that replaces them.
            ARKHRAM knows the patterns and compiles them.
          </p>
          <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.03)" }}>
            <p className="font-mono text-[9px]" style={{ color: "#2a2520" }}>
              Plantillas generadas por lenguaje natural
            </p>
          </div>
        </div>

        {/* Directory listing */}
        <div
          className="p-8 lg:p-10"
          style={{ background: "#020202" }}
        >
          <div className="font-mono text-[10px] mb-5 tracking-widest uppercase" style={{ color: "#2a2520" }}>
            /automations/
          </div>

          <div>
            {DIRS.map((dir, di) => (
              <div
                key={dir.path}
                className="section-reveal"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(10px)",
                  transition: `opacity 0.5s ease ${di * 0.08}s, transform 0.5s ease ${di * 0.08}s`,
                }}
              >
                {/* Directory row */}
                <div
                  className="flex items-center gap-3 font-mono text-[12px] py-2.5 group"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
                >
                  <span style={{ color: "#2a2520" }}>
                    {di < DIRS.length - 1 ? "├──" : "└──"}
                  </span>
                  <span
                    className="transition-colors duration-200"
                    style={{ color: dir.color === "#8b1a1a" ? "#8b1a1a" : "#3a3530" }}
                  >
                    {dir.path}
                  </span>
                  <span className="ml-auto font-mono text-[9px]" style={{ color: "#2a2520" }}>
                    {dir.color === "#8b1a1a" ? "disponible" : "configurable"}
                  </span>
                </div>

                {/* Files */}
                <div className="ml-6">
                  {dir.entries.map((entry, ei) => (
                    <div
                      key={entry}
                      className="flex items-center gap-3 font-mono text-[11px] py-1.5 transition-colors duration-200"
                      style={{ color: "#2a2520" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#5a5050")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#2a2520")}
                    >
                      <span style={{ color: "#1a1a1a" }}>
                        {ei < dir.entries.length - 1 ? "  ├─" : "  └─"}
                      </span>
                      <span>{entry}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

// ── SCRAPING DEMO ──
function ScrapingDemo() {
  const [step, setStep] = useState(0);
  const steps = [
    { label: "Connecting to reuters.com", status: "proc" },
    { label: "Extracting 47 articles", status: "proc" },
    { label: "Cleaning & structuring data", status: "proc" },
    { label: "Generating intelligence PDF", status: "proc" },
    { label: "Sending to Slack #research", status: "done" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % (steps.length + 2));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const currentStep = step >= steps.length ? steps.length - 1 : step;

  return (
    <div className="space-y-2 mt-4">
      {steps.map((s, i) => (
        <div key={i} className="flex items-center gap-3 font-mono text-[10px]">
          <div
            className="w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-500"
            style={{
              background: i < currentStep
                ? "#4a8a3a"
                : i === currentStep
                ? "#8b1a1a"
                : "#1a1a1a",
              boxShadow: i === currentStep ? "0 0 8px rgba(139,26,26,0.8)" : "none",
            }}
          />
          <span style={{
            color: i < currentStep ? "#4a6a3a" : i === currentStep ? "#8a7060" : "#2a2520",
            transition: "color 0.5s ease",
          }}>
            {s.label}
          </span>
          {i < currentStep && (
            <span style={{ color: "#4a8a3a", marginLeft: "auto" }}>✓</span>
          )}
          {i === currentStep && (
            <span className="ml-auto animate-pulse" style={{ color: "#8b1a1a" }}>▸</span>
          )}
        </div>
      ))}
      <div className="mt-3 h-px" style={{
        background: `linear-gradient(90deg, rgba(139,26,26,0.6) ${(currentStep / steps.length) * 100}%, rgba(255,255,255,0.04) 0%)`,
        transition: "background 0.5s ease",
      }} />
    </div>
  );
}

// ── AGENTS DEMO ──
function AgentsDemo() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 800);
    return () => clearInterval(id);
  }, []);

  const agents = [
    { id: "COORD", label: "Coordinator", x: 50, y: 10, active: tick % 3 === 0 },
    { id: "RES",   label: "Researcher",  x: 15, y: 65, active: tick % 3 === 1 },
    { id: "WRI",   label: "Writer",      x: 50, y: 65, active: tick % 3 === 2 },
    { id: "SND",   label: "Sender",      x: 85, y: 65, active: tick % 4 === 3 },
  ];

  return (
    <div className="relative mt-4" style={{ height: 120 }}>
      <svg className="absolute inset-0 w-full h-full" style={{ overflow: "visible" }}>
        {/* Connection lines */}
        {[[0,1],[0,2],[0,3]].map(([from, to], i) => {
          const a = agents[from], b = agents[to];
          return (
            <line
              key={i}
              x1={`${a.x}%`} y1={`${a.y + 8}%`}
              x2={`${b.x}%`} y2={`${b.y}%`}
              stroke="rgba(139,26,26,0.2)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          );
        })}
      </svg>
      {agents.map((agent) => (
        <div
          key={agent.id}
          className="absolute flex flex-col items-center gap-1"
          style={{
            left: `${agent.x}%`,
            top: `${agent.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className="w-8 h-8 flex items-center justify-center font-mono text-[8px] transition-all duration-300"
            style={{
              background: agent.active ? "rgba(139,26,26,0.2)" : "rgba(20,15,15,0.8)",
              border: `1px solid ${agent.active ? "rgba(139,26,26,0.6)" : "rgba(255,255,255,0.06)"}`,
              color: agent.active ? "#cc4444" : "#3a3530",
              boxShadow: agent.active ? "0 0 12px rgba(139,26,26,0.3)" : "none",
            }}
          >
            {agent.id}
          </div>
          <span className="font-mono text-[8px]" style={{ color: "#2a2520" }}>{agent.label}</span>
        </div>
      ))}
    </div>
  );
}

// ── DOCUMENT DEMO ──
function DocumentDemo() {
  const [progress, setProgress] = useState(0);
  const [docType, setDocType] = useState(0);
  const docs = ["report_Q2_2025.pdf", "dashboard_exec.xlsx", "summary_brief.docx", "analysis_data.pdf"];

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setDocType((d) => (d + 1) % docs.length);
          return 0;
        }
        return p + 4;
      });
    }, 80);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-4 space-y-3">
      <div className="flex items-center gap-2 font-mono text-[10px]">
        <span style={{ color: "#3a3530" }}>Generating:</span>
        <span style={{ color: "#8a7060" }}>{docs[docType]}</span>
      </div>
      <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.04)" }}>
        <div
          className="h-full transition-all duration-75"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, #8b1a1a, #cc3333)",
            boxShadow: "0 0 8px rgba(139,26,26,0.5)",
          }}
        />
      </div>
      <div className="flex justify-between font-mono text-[9px]" style={{ color: "#2a2520" }}>
        <span>{progress}%</span>
        <span>{progress === 100 ? "✓ COMPLETE" : "WRITING..."}</span>
      </div>
      <div className="grid grid-cols-3 gap-1 mt-2">
        {["PDF", "XLSX", "DOCX"].map((t) => (
          <div key={t} className="text-center py-1 font-mono text-[9px]" style={{
            border: "1px solid rgba(255,255,255,0.04)",
            color: "#2a2520",
            background: "rgba(10,5,5,0.5)",
          }}>
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── MEMORY DEMO ──
function MemoryDemo() {
  const [active, setActive] = useState(0);
  const nodes = [
    { label: "User Context", x: 50, y: 15 },
    { label: "Task History", x: 15, y: 55 },
    { label: "Knowledge Base", x: 85, y: 55 },
    { label: "Preferences", x: 30, y: 85 },
    { label: "Patterns", x: 70, y: 85 },
  ];

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % nodes.length), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative mt-4" style={{ height: 110 }}>
      <svg className="absolute inset-0 w-full h-full">
        {nodes.slice(1).map((node, i) => (
          <line
            key={i}
            x1={`${nodes[0].x}%`} y1={`${nodes[0].y + 5}%`}
            x2={`${node.x}%`} y2={`${node.y}%`}
            stroke={active === i + 1 ? "rgba(139,26,26,0.4)" : "rgba(255,255,255,0.04)"}
            strokeWidth="1"
            style={{ transition: "stroke 0.3s ease" }}
          />
        ))}
        {[[1,3],[2,4]].map(([from, to], i) => (
          <line
            key={`cross-${i}`}
            x1={`${nodes[from].x}%`} y1={`${nodes[from].y}%`}
            x2={`${nodes[to].x}%`} y2={`${nodes[to].y}%`}
            stroke="rgba(255,255,255,0.03)"
            strokeWidth="1"
          />
        ))}
      </svg>
      {nodes.map((node, i) => (
        <div
          key={i}
          className="absolute font-mono text-[8px] px-2 py-1 transition-all duration-300"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            transform: "translate(-50%, -50%)",
            background: active === i ? "rgba(139,26,26,0.15)" : "rgba(10,5,5,0.8)",
            border: `1px solid ${active === i ? "rgba(139,26,26,0.4)" : "rgba(255,255,255,0.05)"}`,
            color: active === i ? "#8a5050" : "#2a2520",
            whiteSpace: "nowrap",
          }}
        >
          {node.label}
        </div>
      ))}
    </div>
  );
}

// ── AUTOMATION DEMO ──
function AutomationDemo() {
  const [step, setStep] = useState(0);
  const flow = [
    { icon: "⚡", label: "Trigger", sub: "Gmail: INVOICE" },
    { icon: "⚙", label: "Process", sub: "Extract data" },
    { icon: "📁", label: "Store", sub: "Drive upload" },
    { icon: "📊", label: "Log", sub: "Notion DB" },
    { icon: "✉", label: "Notify", sub: "Slack alert" },
  ];

  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % (flow.length + 1)), 900);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-4">
      <div className="flex items-center gap-1">
        {flow.map((node, i) => (
          <div key={i} className="flex items-center gap-1 flex-1">
            <div
              className="flex-1 flex flex-col items-center gap-1 py-2 transition-all duration-400"
              style={{
                background: i < step ? "rgba(74,138,58,0.08)" : i === step ? "rgba(139,26,26,0.12)" : "rgba(10,5,5,0.5)",
                border: `1px solid ${i < step ? "rgba(74,138,58,0.2)" : i === step ? "rgba(139,26,26,0.3)" : "rgba(255,255,255,0.04)"}`,
              }}
            >
              <span className="text-sm" style={{ opacity: i <= step ? 1 : 0.3 }}>{node.icon}</span>
              <span className="font-mono text-[8px]" style={{ color: i < step ? "#4a6a3a" : i === step ? "#8a5050" : "#2a2520" }}>
                {node.label}
              </span>
            </div>
            {i < flow.length - 1 && (
              <div className="w-2 h-px shrink-0" style={{
                background: i < step ? "rgba(74,138,58,0.4)" : "rgba(255,255,255,0.06)",
              }} />
            )}
          </div>
        ))}
      </div>
      <div className="mt-3 font-mono text-[9px]" style={{ color: "#2a2520" }}>
        {step < flow.length ? `→ ${flow[Math.min(step, flow.length-1)].sub}` : "✓ Flow completed — 1628ms"}
      </div>
    </div>
  );
}

// ── MULTIMODAL DEMO ──
function MultimodalDemo() {
  const [active, setActive] = useState(0);
  const modes = [
    { icon: "📄", label: "Text", color: "#4a5a8a" },
    { icon: "🖼", label: "Image", color: "#5a4a8a" },
    { icon: "🎙", label: "Voice", color: "#8a4a4a" },
    { icon: "📎", label: "Files", color: "#4a8a5a" },
    { icon: "🌐", label: "Web", color: "#8a6a3a" },
  ];

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % modes.length), 1200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-4">
      <div className="flex gap-2 flex-wrap">
        {modes.map((mode, i) => (
          <div
            key={i}
            className="flex items-center gap-1.5 px-3 py-2 font-mono text-[10px] transition-all duration-400"
            style={{
              background: active === i ? `${mode.color}22` : "rgba(10,5,5,0.5)",
              border: `1px solid ${active === i ? `${mode.color}55` : "rgba(255,255,255,0.04)"}`,
              color: active === i ? mode.color : "#2a2520",
              boxShadow: active === i ? `0 0 12px ${mode.color}22` : "none",
            }}
          >
            <span>{mode.icon}</span>
            <span>{mode.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 font-mono text-[9px]" style={{ color: "#3a3530" }}>
        Processing: {modes[active].label} input → structured output
      </div>
    </div>
  );
}

// ── FEATURE CARD ──
interface FeatureCardProps {
  index: number;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  demo: React.ReactNode;
}

function FeatureCard({ index, title, subtitle, description, tag, demo }: FeatureCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="feature-card section-reveal p-6 relative overflow-hidden"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s`,
      }}
    >
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none" style={{
        background: "linear-gradient(225deg, rgba(139,26,26,0.08) 0%, transparent 60%)",
      }} />

      {/* Tag */}
      <div className="flex items-center justify-between mb-4">
        <span
          className="font-mono text-[9px] tracking-[0.2em] uppercase px-2 py-1"
          style={{
            color: "#8b1a1a",
            border: "1px solid rgba(139,26,26,0.2)",
            background: "rgba(139,26,26,0.05)",
          }}
        >
          {tag}
        </span>
        <span className="font-mono text-[9px]" style={{ color: "#2a2520" }}>
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Title */}
      <h3
        className="mb-1"
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "clamp(14px, 1.5vw, 18px)",
          fontWeight: 600,
          color: "#d4c9b8",
          letterSpacing: "0.05em",
        }}
      >
        {title}
      </h3>
      <p className="font-mono text-[10px] mb-3" style={{ color: "#8b1a1a" }}>{subtitle}</p>
      <p className="font-mono text-[11px] leading-relaxed mb-4" style={{ color: "#4a4540" }}>
        {description}
      </p>

      {/* Live demo */}
      <div
        className="relative"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.04)",
          paddingTop: "12px",
        }}
      >
        <span className="font-mono text-[8px] tracking-widest uppercase" style={{ color: "#2a2520" }}>
          LIVE DEMO
        </span>
        {demo}
      </div>
    </div>
  );
}

// ── MAIN FEATURES SECTION ──
export function Features() {
  const features = [
    {
      title: "Web Intelligence",
      subtitle: "Autonomous scraping & analysis",
      description: "AUTOMATIS navigates the web, extracts structured data, cleans it, and generates actionable intelligence reports — automatically.",
      tag: "SCRAPING",
      demo: <ScrapingDemo />,
    },
    {
      title: "Autonomous Agents",
      subtitle: "Multi-agent coordination",
      description: "Multiple specialized agents working in parallel. Coordinator, Researcher, Writer, Sender — each with memory, tools, and reasoning.",
      tag: "AGENTS",
      demo: <AgentsDemo />,
    },
    {
      title: "Document Engine",
      subtitle: "PDF · XLSX · DOCX generation",
      description: "From raw data to polished documents. Reports, dashboards, summaries, presentations — generated and distributed automatically.",
      tag: "DOCUMENTS",
      demo: <DocumentDemo />,
    },
    {
      title: "Intelligent Memory",
      subtitle: "Context · History · Patterns",
      description: "AUTOMATIS remembers. User context, task history, behavioral patterns — all connected in a living knowledge graph.",
      tag: "MEMORY",
      demo: <MemoryDemo />,
    },
    {
      title: "Workflow Automation",
      subtitle: "Triggers · Pipelines · Actions",
      description: "Connect any trigger to any action. Gmail to Drive to Notion to Slack — complex pipelines built from natural language.",
      tag: "AUTOMATION",
      demo: <AutomationDemo />,
    },
    {
      title: "Multimodal Input",
      subtitle: "Text · Image · Voice · Files",
      description: "AUTOMATIS processes any input type. Documents, images, voice recordings, web pages — unified intelligence layer.",
      tag: "MULTIMODAL",
      demo: <MultimodalDemo />,
    },
  ];

  return (
    <section id="features" className="py-20 px-6 lg:px-12 relative">
      {/* Section header */}
      <div className="mb-16 text-center">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: "#8b1a1a" }}>
          / CAPABILITIES
        </p>
        <h2
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(24px, 4vw, 42px)",
            fontWeight: 700,
            color: "#d4c9b8",
            letterSpacing: "0.08em",
          }}
        >
          What AUTOMATIS Does
        </h2>
        <p className="font-mono text-sm mt-4 max-w-xl mx-auto" style={{ color: "#3a3530" }}>
          Not features. Capabilities. Each one is real, operational, and running in production.
        </p>
        <div className="gothic-divider mt-8 max-w-md mx-auto" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
        {features.map((f, i) => (
          <FeatureCard key={f.title} index={i} {...f} />
        ))}
      </div>
    </section>
  );
}

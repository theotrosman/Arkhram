"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

type TermLine = { type: "system" | "input" | "output" | "error" | "success"; text: string };

const INIT_LINES: TermLine[] = [
  { type: "system", text: "ARKHRAM COMMUNICATION RELAY v2.6 — SECURE CHANNEL" },
  { type: "system", text: "Establishing encrypted connection..." },
  { type: "output", text: "Connection established. Identity verification: PENDING." },
  { type: "output", text: 'Type your message below. Fields marked [REQUIRED].' },
];

export function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-8% 0px" });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [lines, setLines] = useState<TermLine[]>(INIT_LINES);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [focused, setFocused] = useState<string | null>(null);

  const pushLine = (line: TermLine) => setLines((l) => [...l, line]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !msg) {
      pushLine({ type: "error", text: "ERROR: All fields required before transmission." });
      return;
    }

    setStatus("sending");
    pushLine({ type: "input", text: `> TRANSMIT name="${name}" email="${email}"` });
    pushLine({ type: "system", text: "Encrypting payload... routing through Arkhram relay..." });

    try {
      const res = await fetch("https://formspree.io/f/xpwzpapq", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, message: msg }),
      });

      if (res.ok) {
        pushLine({ type: "success", text: "✓ Transmission received. Arkhram will respond through secure channels." });
        pushLine({ type: "system", text: "Channel closing in 30s. Stay in the signal." });
        setStatus("sent");
        setName(""); setEmail(""); setMsg("");
      } else {
        throw new Error("relay_rejected");
      }
    } catch {
      pushLine({ type: "error", text: "RELAY ERROR: Transmission failed. Retry or contact via GitHub." });
      setStatus("error");
    }
  };

  const inputStyle = (field: string): React.CSSProperties => ({
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${focused === field ? "rgba(139,26,26,0.5)" : "rgba(255,255,255,0.06)"}`,
    outline: "none",
    color: "#d4c9b8",
    fontFamily: "monospace",
    fontSize: "0.7rem",
    letterSpacing: "0.05em",
    padding: "0.5rem 0",
    width: "100%",
    transition: "border-color 0.3s ease",
    caretColor: "#8b1a1a",
  });

  return (
    <section ref={ref} style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "10rem 2rem", position: "relative", overflow: "hidden" }}>
      <div className="animate-fog-slow" style={{ position: "absolute", inset: "-20%", background: "radial-gradient(ellipse 70% 50% at 40% 60%, rgba(14,2,2,0.65) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ width: "100%", maxWidth: "860px", margin: "0 auto", position: "relative", zIndex: 5 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.9 }}
          style={{ marginBottom: "3.5rem" }}
        >
          <div style={{ fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.55em", color: "rgba(139,26,26,0.45)", marginBottom: "0.8rem", textTransform: "uppercase" }}>
            ── ARKHRAM / ACCESS CHANNEL ──
          </div>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)", fontWeight: 700, letterSpacing: "0.22em", color: "#d0c8bc", marginBottom: "0.6rem" }}>
            OPEN A CHANNEL
          </h2>
          <p style={{ fontFamily: "monospace", fontSize: "0.62rem", color: "rgba(212,201,184,0.25)", lineHeight: 1.8, maxWidth: "440px" }}>
            Arkhram does not have a contact form.<br />
            It has a communication relay.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2px",
          }}
        >
          {/* Terminal log pane */}
          <div style={{ background: "#030303", border: "1px solid rgba(139,26,26,0.12)", padding: "1.4rem", minHeight: "360px", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
            {/* Scanlines */}
            <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)", pointerEvents: "none", zIndex: 1 }} />

            {/* Window bar */}
            <div style={{ display: "flex", gap: "0.3rem", marginBottom: "1rem", position: "relative", zIndex: 2 }}>
              {["#8b1a1a", "#5a5010", "#1a3a1a"].map((c, i) => (
                <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c, opacity: 0.6 }} />
              ))}
              <span style={{ fontFamily: "monospace", fontSize: "0.45rem", letterSpacing: "0.2em", color: "rgba(139,26,26,0.4)", marginLeft: "0.5rem", alignSelf: "center" }}>
                arkhram-relay.sh
              </span>
            </div>

            {/* Log lines */}
            <div style={{ flex: 1, overflow: "hidden", position: "relative", zIndex: 2 }}>
              {lines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i < INIT_LINES.length ? i * 0.15 : 0 }}
                  style={{
                    fontFamily: "monospace",
                    fontSize: "0.58rem",
                    lineHeight: 1.7,
                    letterSpacing: "0.02em",
                    color:
                      line.type === "error" ? "rgba(200,50,50,0.8)"
                      : line.type === "success" ? "rgba(80,200,80,0.8)"
                      : line.type === "input" ? "rgba(192,160,96,0.7)"
                      : line.type === "system" ? "rgba(139,26,26,0.55)"
                      : "rgba(212,201,184,0.4)",
                    marginBottom: "0.1rem",
                  }}
                >
                  {line.type === "system" && <span style={{ color: "rgba(139,26,26,0.4)", marginRight: "0.4rem" }}>$</span>}
                  {line.type === "output" && <span style={{ color: "rgba(80,140,80,0.5)", marginRight: "0.4rem" }}>›</span>}
                  {line.text}
                </motion.div>
              ))}
              {/* Blinking cursor */}
              {status !== "sent" && (
                <span className="cursor-blink" style={{ fontFamily: "monospace", fontSize: "0.58rem", color: "rgba(139,26,26,0.6)" }}>█</span>
              )}
            </div>

            {/* Alt contact */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: "0.8rem", marginTop: "0.8rem", position: "relative", zIndex: 2 }}>
              <div style={{ fontFamily: "monospace", fontSize: "0.45rem", letterSpacing: "0.25em", color: "rgba(212,201,184,0.15)", marginBottom: "0.3rem", textTransform: "uppercase" }}>/ alternative channels</div>
              <a href="https://github.com/Arkhram-Organization" target="_blank" rel="noopener noreferrer"
                style={{ display: "block", fontFamily: "monospace", fontSize: "0.55rem", color: "rgba(192,160,96,0.4)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(192,160,96,0.8)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(192,160,96,0.4)")}
              >
                → github.com/Arkhram-Organization
              </a>
              <a href="mailto:sebaacalvino@gmail.com"
                style={{ display: "block", fontFamily: "monospace", fontSize: "0.55rem", color: "rgba(192,160,96,0.4)", textDecoration: "none", transition: "color 0.2s", marginTop: "0.2rem" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(192,160,96,0.8)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(192,160,96,0.4)")}
              >
                → sebaacalvino@gmail.com
              </a>
            </div>
          </div>

          {/* Input pane */}
          <form onSubmit={handleSubmit} style={{ background: "rgba(8,4,4,1)", border: "1px solid rgba(255,255,255,0.04)", borderLeft: "none", padding: "1.8rem", display: "flex", flexDirection: "column", gap: "1.6rem" }}>
            {/* Name */}
            <div>
              <label style={{ fontFamily: "monospace", fontSize: "0.48rem", letterSpacing: "0.3em", color: "rgba(139,26,26,0.45)", display: "block", marginBottom: "0.5rem", textTransform: "uppercase" }}>
                IDENT [REQUIRED]
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused(null)}
                placeholder="your name or alias"
                style={{ ...inputStyle("name") }}
              />
            </div>

            {/* Email */}
            <div>
              <label style={{ fontFamily: "monospace", fontSize: "0.48rem", letterSpacing: "0.3em", color: "rgba(139,26,26,0.45)", display: "block", marginBottom: "0.5rem", textTransform: "uppercase" }}>
                RETURN CHANNEL [REQUIRED]
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                placeholder="your@email.com"
                style={{ ...inputStyle("email") }}
              />
            </div>

            {/* Message */}
            <div style={{ flex: 1 }}>
              <label style={{ fontFamily: "monospace", fontSize: "0.48rem", letterSpacing: "0.3em", color: "rgba(139,26,26,0.45)", display: "block", marginBottom: "0.5rem", textTransform: "uppercase" }}>
                TRANSMISSION [REQUIRED]
              </label>
              <textarea
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                onFocus={() => setFocused("msg")}
                onBlur={() => setFocused(null)}
                placeholder="What do you want Arkhram to know?"
                rows={5}
                style={{
                  ...inputStyle("msg"),
                  borderBottom: "none",
                  border: `1px solid ${focused === "msg" ? "rgba(139,26,26,0.4)" : "rgba(255,255,255,0.05)"}`,
                  resize: "none",
                  padding: "0.7rem",
                  transition: "border-color 0.3s ease",
                }}
              />
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              whileHover={status === "idle" || status === "error" ? { scale: 1.01 } : {}}
              whileTap={status === "idle" || status === "error" ? { scale: 0.99 } : {}}
              className="btn-gothic"
              style={{
                padding: "0.8rem 1.5rem",
                fontSize: "0.6rem",
                letterSpacing: "0.25em",
                cursor: status === "sending" || status === "sent" ? "not-allowed" : "pointer",
                opacity: status === "sent" ? 0.5 : 1,
                width: "100%",
              }}
            >
              {status === "idle" && "⟶  TRANSMIT"}
              {status === "sending" && "ROUTING..."}
              {status === "sent" && "✓  TRANSMISSION RECEIVED"}
              {status === "error" && "⟶  RETRY TRANSMISSION"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

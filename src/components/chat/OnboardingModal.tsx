"use client";

import { useState } from "react";

const INDUSTRIES = [
  "Inmobiliaria", "Clínica / Salud", "Estudio Contable",
  "Agencia de Marketing", "E-commerce", "Restaurante / Gastronomía",
  "Educación", "Tecnología", "Otro",
];

interface OnboardingModalProps {
  onComplete: (data: { name: string; business_description: string; industry: string }) => void;
}

export function OnboardingModal({ onComplete }: OnboardingModalProps) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [business, setBusiness] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleFinish() {
    setSaving(true);
    onComplete({ name: name.trim(), business_description: business.trim(), industry });
  }

  const progress = ((step + 1) / 3) * 100;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
    >
      <div
        className="w-full max-w-md overflow-hidden"
        style={{
          background: "#060303",
          border: "1px solid rgba(139,26,26,0.25)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.9)",
        }}
      >
        {/* Progress bar */}
        <div className="h-px" style={{ background: "rgba(255,255,255,0.05)" }}>
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, rgba(139,26,26,0.8), rgba(192,100,60,0.4))",
            }}
          />
        </div>

        <div className="p-8">
          {step === 0 && (
            <div className="space-y-6">
              <div>
                <p
                  className="font-mono text-[9px] tracking-[0.3em] uppercase mb-3"
                  style={{ color: "#8b1a1a" }}
                >
                  / CONFIGURACIÓN INICIAL
                </p>
                <h2
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "20px",
                    color: "#d4c9b8",
                    letterSpacing: "0.03em",
                  }}
                >
                  ¿Cómo te llamás?
                </h2>
                <p className="font-mono text-[11px] mt-2" style={{ color: "#3a3530" }}>
                  Para personalizar la experiencia.
                </p>
              </div>
              <input
                autoFocus
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && name.trim() && setStep(1)}
                placeholder="Tu nombre..."
                className="w-full bg-transparent font-mono text-[13px] px-4 py-3 focus:outline-none"
                style={{
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#d4c9b8",
                  caretColor: "#8b1a1a",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(139,26,26,0.5)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
              />
              <button
                onClick={() => name.trim() && setStep(1)}
                disabled={!name.trim()}
                className="w-full py-3 font-mono text-[10px] tracking-[0.2em] disabled:opacity-30 btn-gothic"
              >
                CONTINUAR →
              </button>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <p
                  className="font-mono text-[9px] tracking-[0.3em] uppercase mb-3"
                  style={{ color: "#8b1a1a" }}
                >
                  / TU NEGOCIO
                </p>
                <h2
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "20px",
                    color: "#d4c9b8",
                    letterSpacing: "0.03em",
                  }}
                >
                  ¿En qué rubro?
                </h2>
                <p className="font-mono text-[11px] mt-2" style={{ color: "#3a3530" }}>
                  Para darte ejemplos relevantes.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {INDUSTRIES.map((ind) => (
                  <button
                    key={ind}
                    onClick={() => setIndustry(ind)}
                    className="text-left px-3 py-2.5 font-mono text-[10px] transition-all duration-150"
                    style={{
                      border: `1px solid ${industry === ind ? "rgba(139,26,26,0.5)" : "rgba(255,255,255,0.06)"}`,
                      background: industry === ind ? "rgba(139,26,26,0.08)" : "transparent",
                      color: industry === ind ? "#c4b8a8" : "#4a4540",
                    }}
                    onMouseEnter={(e) => {
                      if (industry !== ind) {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(139,26,26,0.3)";
                        (e.currentTarget as HTMLButtonElement).style.color = "#8a7060";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (industry !== ind) {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.06)";
                        (e.currentTarget as HTMLButtonElement).style.color = "#4a4540";
                      }
                    }}
                  >
                    {ind}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setStep(0)}
                  className="px-4 py-3 font-mono text-[10px] transition-colors duration-200"
                  style={{
                    border: "1px solid rgba(255,255,255,0.06)",
                    color: "#3a3530",
                  }}
                >
                  ← VOLVER
                </button>
                <button
                  onClick={() => industry && setStep(2)}
                  disabled={!industry}
                  className="flex-1 py-3 font-mono text-[10px] tracking-[0.2em] disabled:opacity-30 btn-gothic"
                >
                  CONTINUAR →
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <p
                  className="font-mono text-[9px] tracking-[0.3em] uppercase mb-3"
                  style={{ color: "#8b1a1a" }}
                >
                  / ÚLTIMO PASO
                </p>
                <h2
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "20px",
                    color: "#d4c9b8",
                    letterSpacing: "0.03em",
                  }}
                >
                  Contame un poco más
                </h2>
                <p className="font-mono text-[11px] mt-2" style={{ color: "#3a3530" }}>
                  ¿Cómo se llama tu negocio o qué hacés? (opcional)
                </p>
              </div>
              <textarea
                value={business}
                onChange={(e) => setBusiness(e.target.value)}
                placeholder={`Ej: "Clínica dental en Palermo, 3 odontólogos"`}
                rows={3}
                className="w-full bg-transparent font-mono text-[12px] px-4 py-3 focus:outline-none resize-none"
                style={{
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#c4b8a8",
                  caretColor: "#8b1a1a",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(139,26,26,0.5)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-3 font-mono text-[10px] transition-colors duration-200"
                  style={{
                    border: "1px solid rgba(255,255,255,0.06)",
                    color: "#3a3530",
                  }}
                >
                  ← VOLVER
                </button>
                <button
                  onClick={handleFinish}
                  disabled={saving}
                  className="flex-1 py-3 font-mono text-[10px] tracking-[0.2em] disabled:opacity-50 btn-gothic"
                >
                  {saving ? "GUARDANDO..." : "INICIAR SISTEMA →"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

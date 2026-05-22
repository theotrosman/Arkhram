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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/60 overflow-hidden">
        {/* Top bar */}
        <div className="h-1 bg-zinc-800">
          <div
            className="h-full bg-gradient-to-r from-violet-600 to-indigo-500 transition-all duration-500"
            style={{ width: `${((step + 1) / 3) * 100}%` }}
          />
        </div>

        <div className="p-8">
          {step === 0 && (
            <div className="space-y-6">
              <div>
                <p className="text-xs text-violet-400 uppercase tracking-widest mb-2">Bienvenido</p>
                <h2 className="text-2xl font-bold text-white">¿Cómo te llamás?</h2>
                <p className="text-zinc-500 text-sm mt-1">Para que pueda personalizarte la experiencia.</p>
              </div>
              <input
                autoFocus
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && name.trim() && setStep(1)}
                placeholder="Tu nombre..."
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-violet-500/60 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none transition-colors text-lg"
              />
              <button
                onClick={() => name.trim() && setStep(1)}
                disabled={!name.trim()}
                className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-30 text-white font-semibold transition-all duration-200 hover:shadow-[0_0_20px_rgba(124,58,237,0.3)]"
              >
                Continuar →
              </button>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <p className="text-xs text-violet-400 uppercase tracking-widest mb-2">Tu negocio</p>
                <h2 className="text-2xl font-bold text-white">¿En qué rubro estás?</h2>
                <p className="text-zinc-500 text-sm mt-1">Así puedo darte ejemplos relevantes para vos.</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {INDUSTRIES.map((ind) => (
                  <button
                    key={ind}
                    onClick={() => setIndustry(ind)}
                    className={`text-left px-3 py-2.5 rounded-xl border text-sm transition-all duration-150 ${
                      industry === ind
                        ? "border-violet-500 bg-violet-500/15 text-violet-300"
                        : "border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                    }`}
                  >
                    {ind}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setStep(0)}
                  className="px-4 py-3 rounded-xl border border-zinc-800 text-zinc-500 hover:text-zinc-300 text-sm transition-colors"
                >
                  ← Volver
                </button>
                <button
                  onClick={() => industry && setStep(2)}
                  disabled={!industry}
                  className="flex-1 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-30 text-white font-semibold transition-all duration-200"
                >
                  Continuar →
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <p className="text-xs text-violet-400 uppercase tracking-widest mb-2">Último paso</p>
                <h2 className="text-2xl font-bold text-white">Contame un poco más</h2>
                <p className="text-zinc-500 text-sm mt-1">¿Cómo se llama tu negocio o qué hacés exactamente? (opcional)</p>
              </div>
              <textarea
                value={business}
                onChange={(e) => setBusiness(e.target.value)}
                placeholder={`Ej: "Tengo una clínica dental en Palermo, 3 odontólogos"`}
                rows={3}
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-violet-500/60 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none transition-colors resize-none text-sm"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-3 rounded-xl border border-zinc-800 text-zinc-500 hover:text-zinc-300 text-sm transition-colors"
                >
                  ← Volver
                </button>
                <button
                  onClick={handleFinish}
                  disabled={saving}
                  className="flex-1 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-semibold transition-all duration-200 hover:shadow-[0_0_20px_rgba(124,58,237,0.3)]"
                >
                  {saving ? "Guardando..." : "¡Empezar!"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

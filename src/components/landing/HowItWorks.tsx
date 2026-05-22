"use client";

const steps = [
  {
    n: "01",
    title: "Describís lo que querés",
    desc: "En lenguaje natural, sin tecnicismos. 'Quiero que me avisen por WhatsApp cuando llegue un mail urgente.'",
    color: "from-violet-500/20 to-violet-600/5",
    border: "border-violet-500/20",
  },
  {
    n: "02",
    title: "La IA completa lo que falta",
    desc: "Pregunta de a una cosa por vez: ¿de qué cuenta? ¿qué filtro? ¿a qué número? Sin formularios interminables.",
    color: "from-indigo-500/20 to-indigo-600/5",
    border: "border-indigo-500/20",
  },
  {
    n: "03",
    title: "Tu automatización lista",
    desc: "Confirma el resumen y Arkhram genera el flujo en n8n automáticamente. Activo en segundos.",
    color: "from-violet-400/20 to-purple-600/5",
    border: "border-violet-400/20",
  },
];

export function HowItWorks() {
  return (
    <section className="py-32 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs text-violet-400 uppercase tracking-widest font-medium mb-3">Cómo funciona</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Tres pasos. Sin fricción.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.n}
              className={`relative rounded-2xl border ${step.border} bg-gradient-to-b ${step.color} p-6 backdrop-blur-sm`}
            >
              <span className="text-5xl font-bold text-zinc-800 select-none absolute top-4 right-5 font-mono">
                {step.n}
              </span>
              <h3 className="text-lg font-semibold text-white mt-8 mb-3">{step.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    icon: "💬",
    title: "Chat conversacional",
    desc: "La IA hace preguntas inteligentes de a una. Nunca te abruma con formularios.",
  },
  {
    icon: "⚡",
    title: "Activación instantánea",
    desc: "Generamos el flujo en n8n automáticamente. Confirmas y ya está corriendo.",
  },
  {
    icon: "🔌",
    title: "Conecta con todo",
    desc: "Gmail, WhatsApp, Slack, Notion, Google Sheets, Shopify y decenas más.",
  },
  {
    icon: "🏢",
    title: "Para cualquier rubro",
    desc: "Inmobiliarias, estudios contables, clínicas, agencias, e-commerce. Sin código.",
  },
  {
    icon: "🔒",
    title: "Tus datos seguros",
    desc: "Cada usuario tiene su propio espacio. Tus automatizaciones son solo tuyas.",
  },
  {
    icon: "📊",
    title: "Panel de control",
    desc: "Mirá, pausá y activá tus automatizaciones desde un lugar. Simple.",
  },
];

export function Features() {
  return (
    <section className="py-24 px-4 border-t border-zinc-900">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs text-violet-400 uppercase tracking-widest font-medium mb-3">Capacidades</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Todo lo que necesitás para automatizar
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-xl border border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-900/60 transition-all duration-300 p-5"
            >
              <span className="text-2xl">{f.icon}</span>
              <h3 className="mt-3 text-sm font-semibold text-zinc-100 group-hover:text-white transition-colors">
                {f.title}
              </h3>
              <p className="mt-1.5 text-xs text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const industries = [
  {
    name: "Inmobiliarias",
    icon: "🏠",
    examples: ["Alertas de nuevas consultas", "Seguimiento automático de leads", "Recordatorios de visitas"],
  },
  {
    name: "Clínicas & Salud",
    icon: "🏥",
    examples: ["Confirmación de turnos por WhatsApp", "Recordatorios de citas", "Alta de pacientes"],
  },
  {
    name: "Estudios Contables",
    icon: "📊",
    examples: ["Aviso de vencimientos impositivos", "Recopilación de documentos", "Reportes automáticos"],
  },
  {
    name: "Agencias",
    icon: "🎯",
    examples: ["Onboarding de clientes", "Reportes de campañas", "Aprobación de contenidos"],
  },
  {
    name: "E-commerce",
    icon: "🛒",
    examples: ["Notificaciones de ventas", "Alertas de stock bajo", "Post-venta automático"],
  },
  {
    name: "Recursos Humanos",
    icon: "👥",
    examples: ["Bienvenida a nuevos empleados", "Recopilación de CVs", "Gestión de vacaciones"],
  },
];

export function Industries() {
  return (
    <section className="py-24 px-4 border-t border-zinc-900/80 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-violet-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs text-violet-400 uppercase tracking-widest font-medium mb-3">Para tu rubro</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Diseñado para cualquier negocio
          </h2>
          <p className="text-zinc-500 max-w-md mx-auto text-sm">
            Sin importar el rubro, si hay procesos repetitivos, Arkhram los automatiza.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {industries.map((ind) => (
            <div
              key={ind.name}
              className="group rounded-2xl border border-zinc-800/80 bg-zinc-900/30 hover:border-violet-500/30 hover:bg-zinc-900/60 transition-all duration-300 p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{ind.icon}</span>
                <h3 className="font-semibold text-white text-sm">{ind.name}</h3>
              </div>
              <ul className="space-y-2">
                {ind.examples.map((ex) => (
                  <li key={ex} className="flex items-start gap-2 text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors leading-relaxed">
                    <span className="mt-0.5 w-1 h-1 rounded-full bg-violet-500/60 shrink-0" />
                    {ex}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

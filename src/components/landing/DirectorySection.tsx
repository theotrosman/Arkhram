const DIRS = [
  {
    path: "inmobiliarias/",
    entries: ["leads.wf", "visitas.wf", "contratos.wf", "seguimiento.wf"],
    active: 8,
  },
  {
    path: "salud/",
    entries: ["turnos.wf", "recordatorio-48h.wf", "alta-paciente.wf", "cancelacion.wf"],
    active: 14,
  },
  {
    path: "contabilidad/",
    entries: ["vencimientos.wf", "documentos.wf", "reportes.wf"],
    active: 5,
  },
  {
    path: "ecommerce/",
    entries: ["nueva-venta.wf", "stock-bajo.wf", "post-venta.wf", "devolucion.wf"],
    active: 31,
  },
  {
    path: "agencias/",
    entries: ["onboarding.wf", "aprobacion-contenido.wf", "reporte-semanal.wf"],
    active: 7,
  },
  {
    path: "rrhh/",
    entries: ["ingreso.wf", "vacaciones.wf", "cv-procesado.wf"],
    active: 4,
  },
  {
    path: "custom/",
    entries: ["webhook.wf", "schedule.wf", "[cualquier_trigger].wf"],
    active: 0,
  },
];

export function DirectorySection() {
  return (
    <section className="border-b border-zinc-800">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">

        {/* Left label */}
        <div className="border-b lg:border-b-0 lg:border-r border-zinc-800 p-8 lg:p-14 bg-[#040404] flex flex-col gap-4">
          <div className="font-mono text-[10px] text-zinc-700 uppercase tracking-widest">
            / rubros
          </div>
          <p className="font-mono text-sm text-zinc-400 leading-relaxed">
            Si hay procesos repetitivos, hay un flujo que los reemplaza.
          </p>
          <p className="font-mono text-[10px] text-zinc-700 mt-4 leading-relaxed">
            Cada rubro tiene patrones. Arkhram los conoce y los compila.
          </p>
        </div>

        {/* Directory listing */}
        <div className="p-6 lg:p-10 bg-[#030303]">
          {/* Header */}
          <div className="font-mono text-[10px] text-zinc-700 mb-4 uppercase tracking-widest">
            /automaciones/
          </div>

          <div className="space-y-0">
            {DIRS.map((dir, di) => (
              <div key={dir.path} className="group">
                {/* Directory row */}
                <div className="flex items-center gap-3 font-mono text-[12px] py-2 border-b border-zinc-900/60">
                  <span className="text-zinc-700">
                    {di < DIRS.length - 1 ? "├──" : "└──"}
                  </span>
                  <span className="text-violet-400">{dir.path}</span>
                  {dir.active > 0 && (
                    <span className="ml-auto text-[10px] text-green-700 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-green-600" />
                      {dir.active} active
                    </span>
                  )}
                  {dir.active === 0 && (
                    <span className="ml-auto text-[10px] text-zinc-700">configurable</span>
                  )}
                </div>

                {/* Files */}
                <div className="ml-6 space-y-0">
                  {dir.entries.map((entry, ei) => (
                    <div key={entry} className="flex items-center gap-3 font-mono text-[11px] py-1.5 text-zinc-600 hover:text-zinc-400 transition-colors">
                      <span className="text-zinc-800">
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

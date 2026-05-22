const WHAT_IS = [
  ["Un compilador de flujos de trabajo.", "Describís. La IA extrae la estructura. El sistema la ejecuta."],
  ["Una capa de orquestación conversacional.", "El input es lenguaje natural. El output es infraestructura real."],
  ["Middleware entre intención y ejecución.", "Entre lo que querés que pase y el sistema que lo hace pasar."],
];

const WHAT_IS_NOT = [
  "Otro wrapper de ChatGPT",
  "Un builder con drag-and-drop",
  "Una herramienta de productividad personal",
  "Una landing con demos falsas",
];

const INTEGRATIONS = [
  "gmail", "shopify", "whatsapp", "slack", "notion",
  "google_sheets", "mercadolibre", "instagram", "airtable",
  "telegram", "hubspot", "trello", "typeform", "webhook",
  "outlook", "drive", "calendar", "asana",
];

export function SystemPanel() {
  return (
    <section className="border-b border-zinc-800">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr]">

        {/* ── LEFT: Dense description ── */}
        <div className="border-b lg:border-b-0 lg:border-r border-zinc-800 p-8 lg:p-14 flex flex-col gap-12">

          {/* Section label */}
          <div className="font-mono text-[10px] text-zinc-700 uppercase tracking-widest">
            / qué es arkhram
          </div>

          {/* Definitions */}
          <div className="space-y-8">
            {WHAT_IS.map(([title, desc]) => (
              <div key={title}>
                <p className="font-mono text-sm text-white leading-snug">{title}</p>
                <p className="font-mono text-xs text-zinc-600 mt-1.5 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* What it's NOT */}
          <div>
            <p className="font-mono text-[10px] text-zinc-700 uppercase tracking-widest mb-4">no es</p>
            <div className="space-y-2">
              {WHAT_IS_NOT.map((item) => (
                <div key={item} className="flex items-center gap-3 font-mono text-xs text-zinc-600">
                  <span className="text-red-700">✕</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Architecture + integrations ── */}
        <div className="p-8 lg:p-14 flex flex-col gap-10">

          <div className="font-mono text-[10px] text-zinc-700 uppercase tracking-widest">
            / arquitectura
          </div>

          {/* ASCII diagram */}
          <pre className="font-mono text-[11px] text-zinc-500 leading-relaxed whitespace-pre select-none overflow-x-auto">
{`  input             core               output
  ─────             ────               ──────

  "mándame un       ┌──────────────┐   whatsapp.send
   whatsapp cuando  │              │   ────────────→  +54911...
   llegue un mail   │  arkhram OS  │
   urgente"    ───→ │              │   sheets.log
                    │ orquestador  │   ────────────→  row 848
  "nueva venta  ───→│              │
   de shopify"      │  compilador  │   slack.notify
                    │              │   ────────────→  #ventas
  POST /webhook ───→│              │
                    └──────────────┘
                          │
                    n8n runtime
                    (infraestructura)`}
          </pre>

          {/* Integrations */}
          <div>
            <p className="font-mono text-[10px] text-zinc-700 uppercase tracking-widest mb-4">conectores disponibles</p>
            <div className="flex flex-wrap gap-2">
              {INTEGRATIONS.map((name) => (
                <span
                  key={name}
                  className="font-mono text-[10px] text-zinc-600 border border-zinc-800 px-2 py-1 hover:border-zinc-600 hover:text-zinc-400 transition-colors cursor-default"
                >
                  {name}
                </span>
              ))}
              <span className="font-mono text-[10px] text-zinc-700 px-2 py-1">+40 más</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

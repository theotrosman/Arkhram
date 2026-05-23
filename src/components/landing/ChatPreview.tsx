"use client";

import { useEffect, useState } from "react";

const conversation = [
  { role: "user", text: "Quiero que me avisen cuando llegue un mail urgente" },
  { role: "ai", text: "Entendido. ¿De qué cuenta de Gmail querés monitorear los mails?" },
  { role: "user", text: "mi cuenta del trabajo, juan@empresa.com" },
  { role: "ai", text: "¿Qué hace que un mail sea urgente? ¿Palabras clave en el asunto?" },
  { role: "user", text: "si tiene URGENTE en el asunto" },
  { role: "ai", text: "¿Y cómo querés que te avisen? ¿WhatsApp, Telegram o Slack?" },
  { role: "user", text: "WhatsApp, al +5491187654321" },
  { role: "ai", text: "Perfecto. Voy a crear una automatización que detecta mails con URGENTE y te manda WhatsApp. ¿La activamos?" },
];

export function ChatPreview() {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (visible >= conversation.length) return;
    const t = setTimeout(() => setVisible((v) => v + 1), 480);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs text-violet-400 uppercase tracking-widest font-medium mb-3">En acción</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Así se ve la magia</h2>
        </div>

        <div className="relative rounded-2xl border border-zinc-800 bg-zinc-950/80 backdrop-blur-sm overflow-hidden">
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800/80 bg-zinc-900/50">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
            <span className="ml-3 text-xs text-zinc-500 font-mono">automatis.io/chat</span>
          </div>

          {/* Messages */}
          <div className="p-6 space-y-3 min-h-[380px]">
            {conversation.slice(0, visible).map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
              >
                {msg.role === "ai" && (
                  <div className="w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center text-white text-[10px] font-bold mr-2 shrink-0 mt-0.5">
                    A
                  </div>
                )}
                <div
                  className={`max-w-[75%] px-3.5 py-2 rounded-2xl text-sm ${
                    msg.role === "user"
                      ? "bg-violet-600 text-white rounded-tr-sm"
                      : "bg-zinc-800 text-zinc-200 rounded-tl-sm border border-zinc-700/50"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {visible < conversation.length && (
              <div className="flex justify-start">
                <div className="w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center text-white text-[10px] font-bold mr-2 shrink-0">
                  A
                </div>
                <div className="bg-zinc-800 border border-zinc-700/50 rounded-2xl rounded-tl-sm px-4 py-2.5 flex gap-1.5 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

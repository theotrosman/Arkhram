"use client";

import { useEffect, useState } from "react";
import { Trash2, MessageSquare, Plus } from "lucide-react";

interface Session {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

interface Props {
  activeSessionId: string | null;
  onSelectSession: (id: string) => void;
  onNewSession: () => void;
}

export function ChatHistorySidebar({ activeSessionId, onSelectSession, onNewSession }: Props) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSessions();
  }, []);

  async function loadSessions() {
    try {
      const res = await fetch("/api/chat-sessions");
      if (!res.ok) return;
      const data = await res.json();
      setSessions(data.sessions || []);
    } finally {
      setLoading(false);
    }
  }

  async function deleteSession(id: string, e: React.MouseEvent) {
    e.stopPropagation();
    if (!confirm("¿Eliminar esta conversación?")) return;
    const res = await fetch(`/api/chat-sessions?id=${id}`, { method: "DELETE" });
    if (res.ok) setSessions((prev) => prev.filter((s) => s.id !== id));
  }

  function formatDate(iso: string) {
    const d = new Date(iso);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffDays === 0) return "Hoy";
    if (diffDays === 1) return "Ayer";
    if (diffDays < 7) return `Hace ${diffDays} días`;
    return d.toLocaleDateString("es-AR", { day: "numeric", month: "short" });
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div
        className="px-4 py-3 flex items-center justify-between shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
      >
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "#3a3530" }}>
          / HISTORIAL
        </span>
        <button
          onClick={onNewSession}
          className="flex items-center gap-1 px-2 py-1 font-mono text-[9px] tracking-widest transition-colors duration-200"
          style={{ border: "1px solid rgba(255,255,255,0.06)", color: "#4a4540" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "#8b1a1a";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(139,26,26,0.4)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "#4a4540";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.06)";
          }}
        >
          <Plus className="w-2.5 h-2.5" />
          NUEVA
        </button>
      </div>

      {/* Session list */}
      <div
        className="flex-1 overflow-y-auto"
        style={{ scrollbarWidth: "none" }}
      >
        {loading ? (
          <div className="px-4 py-8 font-mono text-[10px] text-center" style={{ color: "#2a2520" }}>
            Cargando...
          </div>
        ) : sessions.length === 0 ? (
          <div className="px-4 py-8 font-mono text-[10px] text-center" style={{ color: "#2a2520" }}>
            Sin conversaciones aún
          </div>
        ) : (
          sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => onSelectSession(session.id)}
              className="w-full text-left px-4 py-3 flex items-start gap-2.5 group transition-all duration-150"
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.02)",
                background: activeSessionId === session.id
                  ? "rgba(139,26,26,0.06)"
                  : "transparent",
                borderLeft: activeSessionId === session.id
                  ? "2px solid rgba(139,26,26,0.5)"
                  : "2px solid transparent",
              }}
            >
              <MessageSquare
                className="w-3 h-3 mt-0.5 shrink-0"
                style={{ color: activeSessionId === session.id ? "#8b1a1a" : "#2a2520" }}
              />
              <div className="flex-1 min-w-0">
                <p
                  className="font-mono text-[10px] truncate"
                  style={{ color: activeSessionId === session.id ? "#8a7060" : "#4a4540" }}
                >
                  {session.title}
                </p>
                <p className="font-mono text-[9px] mt-0.5" style={{ color: "#2a2520" }}>
                  {formatDate(session.updated_at)}
                </p>
              </div>
              <button
                onClick={(e) => deleteSession(session.id, e)}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 p-0.5"
                style={{ color: "#3a3530" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#cc3333")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#3a3530")}
              >
                <Trash2 className="w-2.5 h-2.5" />
              </button>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

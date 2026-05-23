"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Zap } from "lucide-react";

interface Skill {
  id: string;
  name: string;
  prompt: string;
  icon: string;
}

const ICONS = ["⚡", "🔄", "📊", "📧", "💬", "🛒", "📅", "🔔", "📝", "🤖", "📱", "🌐"];

interface Props {
  onSelectSkill: (prompt: string) => void;
}

export function SkillsManager({ onSelectSkill }: Props) {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ name: "", prompt: "", icon: "⚡" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSkills();
  }, []);

  async function loadSkills() {
    try {
      const res = await fetch("/api/skills");
      if (!res.ok) return;
      const data = await res.json();
      setSkills(data.skills || []);
    } finally {
      setLoading(false);
    }
  }

  async function createSkill() {
    if (!form.name.trim() || !form.prompt.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) return;
      const data = await res.json();
      setSkills((prev) => [...prev, data.skill]);
      setForm({ name: "", prompt: "", icon: "⚡" });
      setCreating(false);
    } finally {
      setSaving(false);
    }
  }

  async function deleteSkill(id: string) {
    const res = await fetch(`/api/skills?id=${id}`, { method: "DELETE" });
    if (res.ok) setSkills((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div
        className="px-4 py-3 flex items-center justify-between shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
      >
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "#3a3530" }}>
          / SKILLS
        </span>
        <button
          onClick={() => setCreating((c) => !c)}
          className="flex items-center gap-1 px-2 py-1 font-mono text-[9px] tracking-widest transition-colors duration-200"
          style={{
            border: `1px solid ${creating ? "rgba(139,26,26,0.4)" : "rgba(255,255,255,0.06)"}`,
            color: creating ? "#8b1a1a" : "#4a4540",
            background: creating ? "rgba(139,26,26,0.06)" : "transparent",
          }}
        >
          <Plus className="w-2.5 h-2.5" />
          {creating ? "CANCELAR" : "NUEVA"}
        </button>
      </div>

      {/* Create form */}
      {creating && (
        <div
          className="px-4 py-4 flex flex-col gap-3 shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", background: "rgba(139,26,26,0.03)" }}
        >
          {/* Icon picker */}
          <div className="flex gap-1.5 flex-wrap">
            {ICONS.map((icon) => (
              <button
                key={icon}
                onClick={() => setForm((f) => ({ ...f, icon }))}
                className="w-7 h-7 flex items-center justify-center text-sm transition-all duration-150"
                style={{
                  border: `1px solid ${form.icon === icon ? "rgba(139,26,26,0.5)" : "rgba(255,255,255,0.06)"}`,
                  background: form.icon === icon ? "rgba(139,26,26,0.1)" : "transparent",
                }}
              >
                {icon}
              </button>
            ))}
          </div>

          {/* Name */}
          <input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Nombre del skill..."
            className="w-full px-3 py-2 font-mono text-[11px] bg-transparent outline-none"
            style={{
              border: "1px solid rgba(255,255,255,0.06)",
              color: "#8a7060",
              caretColor: "#8b1a1a",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(139,26,26,0.3)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")}
          />

          {/* Prompt */}
          <textarea
            value={form.prompt}
            onChange={(e) => setForm((f) => ({ ...f, prompt: e.target.value }))}
            placeholder="Prompt que se enviará al chat..."
            rows={3}
            className="w-full px-3 py-2 font-mono text-[10px] bg-transparent outline-none resize-none"
            style={{
              border: "1px solid rgba(255,255,255,0.06)",
              color: "#6a5a50",
              caretColor: "#8b1a1a",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(139,26,26,0.3)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")}
          />

          <button
            onClick={createSkill}
            disabled={saving || !form.name.trim() || !form.prompt.trim()}
            className="w-full py-2 font-mono text-[10px] tracking-[0.15em] transition-all duration-200"
            style={{
              background: saving ? "rgba(139,26,26,0.2)" : "rgba(139,26,26,0.3)",
              border: "1px solid rgba(139,26,26,0.4)",
              color: "#d4c9b8",
              opacity: saving || !form.name.trim() || !form.prompt.trim() ? 0.5 : 1,
            }}
          >
            {saving ? "GUARDANDO..." : "CREAR SKILL →"}
          </button>
        </div>
      )}

      {/* Skills list */}
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        {loading ? (
          <div className="px-4 py-8 font-mono text-[10px] text-center" style={{ color: "#2a2520" }}>
            Cargando...
          </div>
        ) : skills.length === 0 ? (
          <div className="px-4 py-8 space-y-2 text-center">
            <Zap className="w-5 h-5 mx-auto" style={{ color: "#2a2520" }} />
            <p className="font-mono text-[10px]" style={{ color: "#2a2520" }}>
              Sin skills aún
            </p>
            <p className="font-mono text-[9px]" style={{ color: "#1a1a1a" }}>
              Creá un skill para acceder rápido a tus prompts frecuentes
            </p>
          </div>
        ) : (
          skills.map((skill) => (
            <div
              key={skill.id}
              className="group flex items-start gap-2.5 px-4 py-3 transition-all duration-150"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.02)" }}
            >
              <button
                onClick={() => onSelectSkill(skill.prompt)}
                className="flex-1 text-left flex items-start gap-2.5"
              >
                <span className="text-base shrink-0 mt-0.5">{skill.icon}</span>
                <div>
                  <p className="font-mono text-[10px]" style={{ color: "#8a7060" }}>{skill.name}</p>
                  <p className="font-mono text-[9px] mt-0.5 line-clamp-2" style={{ color: "#3a3530" }}>
                    {skill.prompt}
                  </p>
                </div>
              </button>
              <button
                onClick={() => deleteSkill(skill.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 mt-0.5"
                style={{ color: "#3a3530" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#cc3333")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#3a3530")}
              >
                <Trash2 className="w-2.5 h-2.5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

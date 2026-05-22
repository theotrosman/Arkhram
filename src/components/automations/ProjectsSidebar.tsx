"use client";

import { useState, useEffect } from "react";
import { Folder, FolderPlus, ChevronRight, X, Plus } from "lucide-react";
import { Automation } from "@/lib/types";

interface Project {
  id: string;
  name: string;
  automationIds: string[];
  createdAt: string;
}

function loadProjects(): Project[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("arkhram_projects") ?? "[]");
  } catch {
    return [];
  }
}

function saveProjects(projects: Project[]) {
  localStorage.setItem("arkhram_projects", JSON.stringify(projects));
}

export function ProjectsSidebar() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [assigning, setAssigning] = useState<string | null>(null);

  useEffect(() => {
    setProjects(loadProjects());
    fetch("/api/automations")
      .then((r) => (r.ok ? r.json() : { automations: [] }))
      .then((d) => setAutomations(d.automations ?? []))
      .catch(() => {});
  }, []);

  function createProject() {
    if (!newName.trim()) return;
    const proj: Project = {
      id: crypto.randomUUID(),
      name: newName.trim(),
      automationIds: [],
      createdAt: new Date().toISOString(),
    };
    const updated = [...projects, proj];
    setProjects(updated);
    saveProjects(updated);
    setNewName("");
    setCreating(false);
  }

  function deleteProject(id: string) {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    saveProjects(updated);
    if (expanded === id) setExpanded(null);
  }

  function toggleAutomation(projectId: string, automationId: string) {
    const updated = projects.map((p) => {
      if (p.id !== projectId) return p;
      const ids = p.automationIds.includes(automationId)
        ? p.automationIds.filter((id) => id !== automationId)
        : [...p.automationIds, automationId];
      return { ...p, automationIds: ids };
    });
    setProjects(updated);
    saveProjects(updated);
  }

  const unassigned = automations.filter(
    (a) => !projects.some((p) => p.automationIds.includes(a.id))
  );

  return (
    <div className="h-full flex flex-col" style={{ background: "rgba(5,2,2,0.95)" }}>
      {/* Header */}
      <div
        className="px-4 py-3 flex items-center justify-between shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="flex items-center gap-2">
          <Folder className="w-3.5 h-3.5" style={{ color: "#8b1a1a" }} />
          <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: "#5a5050" }}>
            Proyectos
          </span>
        </div>
        <button
          onClick={() => setCreating(true)}
          className="transition-colors duration-200"
          title="Nuevo proyecto"
          style={{ color: "#2a2520" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#8b1a1a")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#2a2520")}
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1"
        style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(139,26,26,0.15) transparent" }}
      >
        {/* Create form */}
        {creating && (
          <div
            className="mb-3 p-3 space-y-2"
            style={{
              border: "1px solid rgba(139,26,26,0.2)",
              background: "rgba(139,26,26,0.04)",
            }}
          >
            <p className="font-mono text-[9px] tracking-widest uppercase" style={{ color: "#5a3030" }}>
              Nuevo proyecto
            </p>
            <input
              autoFocus
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") createProject();
                if (e.key === "Escape") { setCreating(false); setNewName(""); }
              }}
              placeholder="Nombre del proyecto..."
              className="w-full bg-transparent font-mono text-[11px] px-3 py-2 focus:outline-none"
              style={{
                border: "1px solid rgba(255,255,255,0.07)",
                color: "#c4b8a8",
                caretColor: "#8b1a1a",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(139,26,26,0.4)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}
            />
            <div className="flex gap-2">
              <button
                onClick={createProject}
                className="flex-1 py-1.5 font-mono text-[9px] tracking-widest transition-all duration-200"
                style={{
                  background: "rgba(139,26,26,0.7)",
                  border: "1px solid rgba(139,26,26,0.4)",
                  color: "#d4c9b8",
                }}
              >
                CREAR
              </button>
              <button
                onClick={() => { setCreating(false); setNewName(""); }}
                className="px-3 py-1.5 font-mono text-[9px] transition-colors duration-200"
                style={{
                  border: "1px solid rgba(255,255,255,0.07)",
                  color: "#3a3530",
                }}
              >
                CANCELAR
              </button>
            </div>
          </div>
        )}

        {/* Empty state */}
        {projects.length === 0 && !creating && (
          <div className="flex flex-col items-center justify-center py-12 text-center gap-3">
            <FolderPlus className="w-6 h-6" style={{ color: "#2a2520" }} />
            <p className="font-mono text-[10px]" style={{ color: "#2a2520" }}>
              Organizá tus flujos en proyectos
            </p>
            <button
              onClick={() => setCreating(true)}
              className="font-mono text-[9px] tracking-widest transition-colors duration-200"
              style={{ color: "#5a3030" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#8b1a1a")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#5a3030")}
            >
              + CREAR PROYECTO
            </button>
          </div>
        )}

        {/* Projects list */}
        {projects.map((project) => {
          const projectAutomations = automations.filter((a) =>
            project.automationIds.includes(a.id)
          );
          const isExpanded = expanded === project.id;
          const isAssigning = assigning === project.id;

          return (
            <div key={project.id}>
              <button
                className="w-full flex items-center gap-2 px-3 py-2 text-left group transition-all duration-150"
                onClick={() => setExpanded(isExpanded ? null : project.id)}
                style={{
                  border: "1px solid rgba(255,255,255,0.04)",
                  background: isExpanded ? "rgba(139,26,26,0.04)" : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!isExpanded) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.02)";
                }}
                onMouseLeave={(e) => {
                  if (!isExpanded) (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                }}
              >
                <div
                  className="w-1.5 h-1.5 shrink-0"
                  style={{ background: "#8b1a1a", opacity: 0.6 }}
                />
                <span
                  className="flex-1 font-mono text-[11px] truncate"
                  style={{ color: "#8a7060" }}
                >
                  {project.name}
                </span>
                <span className="font-mono text-[9px]" style={{ color: "#2a2520" }}>
                  {project.automationIds.length}
                </span>
                <ChevronRight
                  className="w-3 h-3 shrink-0 transition-transform duration-200"
                  style={{
                    color: "#2a2520",
                    transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
                  }}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteProject(project.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 shrink-0"
                  style={{ color: "#5a3030" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#cc4444")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#5a3030")}
                >
                  <X className="w-3 h-3" />
                </button>
              </button>

              {isExpanded && (
                <div
                  className="ml-4 mr-1 mb-1 px-3 py-2 space-y-1"
                  style={{ borderLeft: "1px solid rgba(139,26,26,0.15)" }}
                >
                  {projectAutomations.length === 0 ? (
                    <p className="font-mono text-[10px]" style={{ color: "#2a2520" }}>
                      Sin flujos asignados
                    </p>
                  ) : (
                    projectAutomations.map((a) => (
                      <div
                        key={a.id}
                        className="flex items-center gap-2 py-1"
                      >
                        <div
                          className="w-1 h-1 shrink-0"
                          style={{
                            background: a.status === "active" ? "#6a8a5a" : "#3a3530",
                          }}
                        />
                        <span
                          className="flex-1 font-mono text-[10px] truncate"
                          style={{ color: "#5a5050" }}
                        >
                          {a.name}
                        </span>
                        <button
                          onClick={() => toggleAutomation(project.id, a.id)}
                          className="font-mono text-[9px] transition-colors duration-150 shrink-0"
                          style={{ color: "#2a2520" }}
                          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#cc4444")}
                          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#2a2520")}
                        >
                          quitar
                        </button>
                      </div>
                    ))
                  )}
                  {automations.length > 0 && (
                    <button
                      onClick={() => setAssigning(isAssigning ? null : project.id)}
                      className="font-mono text-[9px] tracking-widest transition-colors duration-150 pt-1"
                      style={{ color: "#4a3030" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#8b1a1a")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#4a3030")}
                    >
                      {isAssigning ? "CERRAR" : "+ AGREGAR FLUJO"}
                    </button>
                  )}
                  {isAssigning && (
                    <div className="space-y-0.5 pt-1">
                      {automations
                        .filter((a) => !project.automationIds.includes(a.id))
                        .map((a) => (
                          <button
                            key={a.id}
                            onClick={() => { toggleAutomation(project.id, a.id); setAssigning(null); }}
                            className="w-full text-left font-mono text-[10px] px-2 py-1 truncate transition-colors duration-150"
                            style={{ color: "#3a3530" }}
                            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#8a7060")}
                            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#3a3530")}
                          >
                            {a.name}
                          </button>
                        ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Unassigned section */}
        {unassigned.length > 0 && projects.length > 0 && (
          <div
            className="mt-3 pt-3 space-y-1"
            style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
          >
            <p className="font-mono text-[9px] tracking-widest px-1 mb-1" style={{ color: "#2a2520" }}>
              SIN PROYECTO
            </p>
            {unassigned.map((a) => (
              <div key={a.id} className="flex items-center gap-2 px-2 py-1.5">
                <div
                  className="w-1 h-1 shrink-0"
                  style={{ background: a.status === "active" ? "#6a8a5a" : "#3a3530" }}
                />
                <span className="font-mono text-[10px] truncate" style={{ color: "#3a3530" }}>
                  {a.name}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

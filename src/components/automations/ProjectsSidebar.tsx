"use client";

import { useState, useEffect } from "react";
import { Folder, FolderPlus, ChevronRight, X, Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Automation } from "@/lib/types";
import { getUserId } from "@/lib/supabase";
import { createClient } from "@/lib/supabase/client";

interface Project {
  id: string;
  name: string;
  color: string;
  automationIds: string[];
  createdAt: string;
}

const PROJECT_COLORS = [
  "bg-violet-500",
  "bg-indigo-500",
  "bg-blue-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-rose-500",
];

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
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      const userId = user?.id ?? getUserId();
      if (!userId) return;
      fetch(`/api/automations?userId=${userId}`)
        .then((r) => r.json())
        .then((d) => setAutomations(d.automations ?? []))
        .catch(() => {});
    });
  }, []);

  function createProject() {
    if (!newName.trim()) return;
    const proj: Project = {
      id: crypto.randomUUID(),
      name: newName.trim(),
      color: PROJECT_COLORS[projects.length % PROJECT_COLORS.length],
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
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-zinc-700/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Folder className="w-4 h-4 text-violet-400" />
          <h2 className="text-sm font-semibold text-zinc-200">Proyectos</h2>
        </div>
        <button
          onClick={() => setCreating(true)}
          className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 transition-colors"
          title="Nuevo proyecto"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-3 space-y-1">
          {/* Create project form */}
          {creating && (
            <div className="rounded-xl border border-violet-500/30 bg-violet-500/5 p-3 mb-2 space-y-2">
              <p className="text-xs text-zinc-400 font-medium">Nuevo proyecto</p>
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
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/60 transition-colors"
              />
              <div className="flex gap-2">
                <button
                  onClick={createProject}
                  className="flex-1 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium transition-colors"
                >
                  Crear
                </button>
                <button
                  onClick={() => { setCreating(false); setNewName(""); }}
                  className="px-3 py-1.5 rounded-lg border border-zinc-700 text-zinc-400 text-xs hover:text-zinc-200 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {/* Projects list */}
          {projects.length === 0 && !creating ? (
            <div className="flex flex-col items-center justify-center py-10 text-center gap-3">
              <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                <FolderPlus className="w-4 h-4 text-zinc-600" />
              </div>
              <p className="text-xs text-zinc-500">Organizá tus automatizaciones en proyectos</p>
              <button
                onClick={() => setCreating(true)}
                className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
              >
                + Crear primer proyecto
              </button>
            </div>
          ) : (
            projects.map((project) => {
              const projectAutomations = automations.filter((a) =>
                project.automationIds.includes(a.id)
              );
              const isExpanded = expanded === project.id;
              const isAssigning = assigning === project.id;

              return (
                <div key={project.id} className="rounded-xl overflow-hidden">
                  <button
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-zinc-800/60 rounded-xl transition-colors text-left group"
                    onClick={() => setExpanded(isExpanded ? null : project.id)}
                  >
                    <div className={`w-2 h-2 rounded-full shrink-0 ${project.color}`} />
                    <span className="flex-1 text-xs font-medium text-zinc-300 group-hover:text-white transition-colors truncate">
                      {project.name}
                    </span>
                    <span className="text-[10px] text-zinc-600 shrink-0">
                      {project.automationIds.length}
                    </span>
                    <ChevronRight
                      className={`w-3 h-3 text-zinc-600 shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
                    />
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteProject(project.id); }}
                      className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:text-red-400 text-zinc-600 transition-all shrink-0"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </button>

                  {isExpanded && (
                    <div className="pl-5 pr-3 pb-2 space-y-1">
                      {projectAutomations.length === 0 ? (
                        <p className="text-[11px] text-zinc-600 px-2 py-1">Sin automatizaciones</p>
                      ) : (
                        projectAutomations.map((a) => (
                          <div key={a.id} className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-zinc-800/40">
                            <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${a.status === "active" ? "bg-emerald-500" : "bg-zinc-600"}`} />
                            <span className="text-[11px] text-zinc-400 truncate flex-1">{a.name}</span>
                            <button
                              onClick={() => toggleAutomation(project.id, a.id)}
                              className="text-[10px] text-zinc-600 hover:text-red-400 transition-colors shrink-0"
                            >
                              quitar
                            </button>
                          </div>
                        ))
                      )}
                      {automations.length > 0 && (
                        <button
                          onClick={() => setAssigning(isAssigning ? null : project.id)}
                          className="text-[11px] text-violet-500 hover:text-violet-400 transition-colors px-2 py-1 block"
                        >
                          {isAssigning ? "Cerrar" : "+ Agregar automatización"}
                        </button>
                      )}
                      {isAssigning && (
                        <div className="space-y-1 pt-1">
                          {automations
                            .filter((a) => !project.automationIds.includes(a.id))
                            .map((a) => (
                              <button
                                key={a.id}
                                onClick={() => { toggleAutomation(project.id, a.id); setAssigning(null); }}
                                className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-zinc-800/60 text-[11px] text-zinc-400 hover:text-zinc-200 transition-colors truncate"
                              >
                                {a.name}
                              </button>
                            ))}
                          {automations.filter((a) => !project.automationIds.includes(a.id)).length === 0 && (
                            <p className="text-[11px] text-zinc-600 px-2">Todas asignadas</p>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}

          {/* Unassigned automations */}
          {unassigned.length > 0 && projects.length > 0 && (
            <div className="mt-4 pt-3 border-t border-zinc-800/60">
              <p className="text-[11px] text-zinc-600 px-2 mb-1.5">Sin proyecto</p>
              {unassigned.map((a) => (
                <div key={a.id} className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-zinc-800/40">
                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${a.status === "active" ? "bg-emerald-500" : "bg-zinc-600"}`} />
                  <span className="text-[11px] text-zinc-500 truncate">{a.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

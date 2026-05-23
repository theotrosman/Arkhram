"use client";

import { useState, useCallback } from "react";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { AutomationsSidebar } from "@/components/automations/AutomationsSidebar";
import { ProjectsSidebar } from "@/components/automations/ProjectsSidebar";
import { ChatHistorySidebar } from "@/components/chat/ChatHistorySidebar";
import { SkillsManager } from "@/components/chat/SkillsManager";
import { ChatHeader } from "@/components/layout/ChatHeader";
import { cn } from "@/lib/utils";
import { Zap, Folder, History, Star } from "lucide-react";

type SidebarTab = "automations" | "projects" | "history" | "skills";

const TABS: { id: SidebarTab; icon: React.ElementType; label: string }[] = [
  { id: "automations", icon: Zap,     label: "FLUJOS" },
  { id: "history",     icon: History, label: "HISTORIAL" },
  { id: "skills",      icon: Star,    label: "SKILLS" },
  { id: "projects",    icon: Folder,  label: "PROYECTOS" },
];

export default function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<SidebarTab>("automations");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [skillPrompt, setSkillPrompt] = useState<string | null>(null);

  function handleAutomationCreated() {
    setRefreshTrigger((n) => n + 1);
    setSidebarOpen(true);
    setActiveTab("automations");
  }

  const handleSelectSession = useCallback((id: string) => {
    setActiveSessionId(id);
    setSidebarOpen(false);
  }, []);

  const handleNewSession = useCallback(() => {
    setActiveSessionId(null);
    setSidebarOpen(false);
  }, []);

  const handleSelectSkill = useCallback((prompt: string) => {
    setSkillPrompt(prompt);
    setSidebarOpen(false);
  }, []);

  const handleSkillConsumed = useCallback(() => {
    setSkillPrompt(null);
  }, []);

  return (
    <div className="h-screen flex flex-col" style={{ background: "#050202" }}>
      <ChatHeader
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((s) => !s)}
      />

      <div className="flex-1 flex overflow-hidden">
        <main className="flex-1 overflow-hidden">
          <ChatInterface
            onAutomationCreated={handleAutomationCreated}
            activeSessionId={activeSessionId}
            onSessionCreated={setActiveSessionId}
            injectedPrompt={skillPrompt}
            onInjectedPromptConsumed={handleSkillConsumed}
          />
        </main>

        <aside
          className={cn(
            "shrink-0 overflow-hidden transition-all duration-300 flex flex-col",
            sidebarOpen ? "w-80" : "w-0"
          )}
          style={{
            borderLeft: sidebarOpen ? "1px solid rgba(255,255,255,0.05)" : "none",
            background: "rgba(5,2,2,0.95)",
          }}
        >
          {sidebarOpen && (
            <>
              {/* Tabs */}
              <div
                className="flex shrink-0"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
              >
                {TABS.map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className="flex-1 flex items-center justify-center gap-1 py-2.5 font-mono text-[8px] tracking-[0.08em] transition-colors duration-200"
                    style={{
                      color: activeTab === id ? "#8b1a1a" : "#2a2520",
                      borderBottom: activeTab === id
                        ? "1px solid rgba(139,26,26,0.6)"
                        : "1px solid transparent",
                      background: activeTab === id
                        ? "rgba(139,26,26,0.04)"
                        : "transparent",
                    }}
                  >
                    <Icon className="w-2.5 h-2.5" />
                    <span className="hidden sm:inline">{label}</span>
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-hidden">
                {activeTab === "automations" && <AutomationsSidebar refreshTrigger={refreshTrigger} />}
                {activeTab === "projects"    && <ProjectsSidebar />}
                {activeTab === "history"     && (
                  <ChatHistorySidebar
                    activeSessionId={activeSessionId}
                    onSelectSession={handleSelectSession}
                    onNewSession={handleNewSession}
                  />
                )}
                {activeTab === "skills"      && (
                  <SkillsManager onSelectSkill={handleSelectSkill} />
                )}
              </div>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}

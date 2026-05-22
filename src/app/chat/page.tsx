"use client";

import { useState } from "react";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { AutomationsSidebar } from "@/components/automations/AutomationsSidebar";
import { ChatHeader } from "@/components/layout/ChatHeader";
import { cn } from "@/lib/utils";

export default function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  function handleAutomationCreated() {
    setRefreshTrigger((n) => n + 1);
    setSidebarOpen(true);
  }

  return (
    <div className="h-screen flex flex-col bg-[#050505]">
      {/* Background orb */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 w-[800px] h-[400px] bg-violet-900/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      </div>

      <ChatHeader
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((s) => !s)}
      />

      <div className="flex-1 flex overflow-hidden">
        <main className="flex-1 overflow-hidden">
          <ChatInterface onAutomationCreated={handleAutomationCreated} />
        </main>

        <aside
          className={cn(
            "shrink-0 overflow-hidden transition-all duration-300 border-l border-zinc-800/60",
            sidebarOpen ? "w-80" : "w-0 border-l-0"
          )}
        >
          {sidebarOpen && <AutomationsSidebar refreshTrigger={refreshTrigger} />}
        </aside>
      </div>
    </div>
  );
}

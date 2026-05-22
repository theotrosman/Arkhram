"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Zap, Menu, X, LogOut, User } from "lucide-react";
import { useScramble } from "@/hooks/useScramble";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface ChatHeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function ChatHeader({ sidebarOpen, onToggleSidebar }: ChatHeaderProps) {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const name = useScramble("Arkhram", { delay: 0, speed: 60, trigger: mounted });

  useEffect(() => {
    setMounted(true);
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  const avatar = user?.user_metadata?.avatar_url;
  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Usuario";
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <header className="h-12 border-b border-zinc-800/80 flex items-center justify-between px-4 shrink-0 bg-zinc-950/90 backdrop-blur-md relative z-10">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-violet-600 flex items-center justify-center shadow-[0_0_10px_rgba(124,58,237,0.4)]">
            <Zap className="w-3 h-3 text-white" />
          </div>
          <span className="text-sm font-bold text-white font-mono">
            {mounted ? name : "Arkhram"}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onToggleSidebar}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
        >
          {sidebarOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">Panel</span>
        </button>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="w-7 h-7 rounded-full overflow-hidden border border-zinc-700 hover:border-violet-500/60 transition-colors"
          >
            {avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatar} alt={displayName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-zinc-700 flex items-center justify-center text-[10px] font-bold text-zinc-300">
                {initials}
              </div>
            )}
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-9 w-52 rounded-xl border border-zinc-800 bg-zinc-900/95 backdrop-blur-md shadow-2xl shadow-black/40 p-1.5 z-50">
              <div className="px-3 py-2 border-b border-zinc-800 mb-1">
                <p className="text-xs font-medium text-zinc-200 truncate">{displayName}</p>
                <p className="text-[10px] text-zinc-500 truncate">{user?.email}</p>
              </div>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

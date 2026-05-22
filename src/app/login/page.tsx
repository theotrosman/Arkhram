"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { Zap, Mail, Lock } from "lucide-react";
import { useScramble } from "@/hooks/useScramble";
import Link from "next/link";
import { Suspense } from "react";

function LoginForm() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setMounted(true);
    if (searchParams.get("error")) setError("Error de autenticación. Intentá de nuevo.");
  }, [searchParams]);

  const title = useScramble(mode === "login" ? "Bienvenido de vuelta" : "Crear cuenta", {
    delay: 0, speed: 55, trigger: mounted,
  });

  const supabase = createClient();

  async function handleGoogle() {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) { setError(error.message); setLoading(false); }
  }

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) { setError("Email o contraseña incorrectos."); setLoading(false); return; }
      router.push("/chat");
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) { setError(error.message); setLoading(false); return; }
      setSuccess("Revisá tu email para confirmar tu cuenta.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center px-4">
      {/* Background orbs */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-1/3 right-1/3 w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[100px]" />
      </div>

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-10">
        <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center">
          <Zap className="w-4 h-4 text-white" />
        </div>
        <span className="text-base font-bold text-white font-mono tracking-tight">Arkhram</span>
      </Link>

      {/* Card */}
      <div className="w-full max-w-sm">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm p-7 space-y-5">
          <div>
            <h1 className="text-xl font-bold text-white font-mono">
              {mounted ? title : (mode === "login" ? "Bienvenido de vuelta" : "Crear cuenta")}
            </h1>
            <p className="text-xs text-zinc-500 mt-1">
              {mode === "login" ? "Ingresá a tu cuenta de Arkhram" : "Empezá a automatizar gratis"}
            </p>
          </div>

          {error && (
            <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              {error}
            </div>
          )}
          {success && (
            <div className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2">
              {success}
            </div>
          )}

          {/* Google */}
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl border border-zinc-700 hover:border-zinc-600 bg-zinc-800/60 hover:bg-zinc-800 text-zinc-200 text-sm font-medium transition-all duration-200 disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continuar con Google
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-zinc-800" />
            <span className="text-xs text-zinc-600">o</span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>

          {/* Email form */}
          <form onSubmit={handleEmail} className="space-y-3">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
              <input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-zinc-800/60 border border-zinc-700 focus:border-violet-500/60 focus:outline-none text-sm text-zinc-100 placeholder:text-zinc-600 transition-colors"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-zinc-800/60 border border-zinc-700 focus:border-violet-500/60 focus:outline-none text-sm text-zinc-100 placeholder:text-zinc-600 transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-all duration-200 disabled:opacity-50 hover:shadow-[0_0_20px_rgba(124,58,237,0.35)]"
            >
              {loading ? "Cargando..." : mode === "login" ? "Ingresar" : "Crear cuenta"}
            </button>
          </form>

          <p className="text-center text-xs text-zinc-600">
            {mode === "login" ? "¿No tenés cuenta? " : "¿Ya tenés cuenta? "}
            <button
              onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); setSuccess(""); }}
              className="text-violet-400 hover:text-violet-300 transition-colors"
            >
              {mode === "login" ? "Crear cuenta" : "Iniciar sesión"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

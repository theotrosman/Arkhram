import { createClient } from "@supabase/supabase-js";

// Lazy singleton — avoids build-time crash when env vars are absent
let _supabase: ReturnType<typeof createClient> | null = null;

export const supabase = new Proxy({} as ReturnType<typeof createClient>, {
  get(_target, prop) {
    if (!_supabase) {
      _supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
      );
    }
    return (_supabase as unknown as Record<string | symbol, unknown>)[prop];
  },
});

export function getUserId(): string {
  if (typeof window === "undefined") return "";
  let userId = localStorage.getItem("arkham_user_id");
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem("arkham_user_id", userId);
  }
  return userId;
}

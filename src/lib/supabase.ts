import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function getUserId(): string {
  if (typeof window === "undefined") return "";
  let userId = localStorage.getItem("arkham_user_id");
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem("arkham_user_id", userId);
  }
  return userId;
}

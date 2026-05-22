// Force dynamic rendering for the entire /chat route segment.
// This prevents Next.js from attempting to statically prerender pages
// that depend on Supabase auth (which requires runtime env vars).
export const dynamic = "force-dynamic";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

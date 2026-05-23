import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

async function getUser() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user: error ? null : user, supabase };
}

// GET /api/chat-sessions/messages?session_id=xxx  → load messages
export async function GET(req: NextRequest) {
  const { user, supabase } = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sessionId = req.nextUrl.searchParams.get("session_id");
  if (!sessionId) return NextResponse.json({ error: "session_id required" }, { status: 400 });

  // Verify ownership via session
  const { data: session } = await supabase
    .from("chat_sessions")
    .select("id")
    .eq("id", sessionId)
    .eq("user_id", user.id)
    .single();

  if (!session) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const { data, error } = await supabase
    .from("chat_messages")
    .select("id, role, content, created_at")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ messages: data });
}

// POST /api/chat-sessions/messages  → save a message
export async function POST(req: NextRequest) {
  const { user, supabase } = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { session_id, role, content } = await req.json();
  if (!session_id || !role || !content) {
    return NextResponse.json({ error: "session_id, role, content required" }, { status: 400 });
  }

  // Verify ownership
  const { data: session } = await supabase
    .from("chat_sessions")
    .select("id")
    .eq("id", session_id)
    .eq("user_id", user.id)
    .single();

  if (!session) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const { data, error } = await supabase
    .from("chat_messages")
    .insert({ session_id, user_id: user.id, role, content })
    .select("id, role, content, created_at")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Update session's updated_at
  await supabase
    .from("chat_sessions")
    .update({ updated_at: new Date().toISOString() })
    .eq("id", session_id);

  return NextResponse.json({ message: data });
}

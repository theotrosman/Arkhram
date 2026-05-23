import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

async function getUser() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user: error ? null : user, supabase };
}

// GET /api/chat-sessions  → list all sessions
export async function GET() {
  const { user, supabase } = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("chat_sessions")
    .select("id, title, created_at, updated_at")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false })
    .limit(50);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ sessions: data });
}

// POST /api/chat-sessions  → create new session, returns {session}
export async function POST(req: NextRequest) {
  const { user, supabase } = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title } = await req.json().catch(() => ({}));

  const { data, error } = await supabase
    .from("chat_sessions")
    .insert({ user_id: user.id, title: title || "Nueva conversación" })
    .select("id, title, created_at, updated_at")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ session: data });
}

// PATCH /api/chat-sessions  → update title
export async function PATCH(req: NextRequest) {
  const { user, supabase } = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, title } = await req.json();
  if (!id || !title) return NextResponse.json({ error: "id and title required" }, { status: 400 });

  const { data, error } = await supabase
    .from("chat_sessions")
    .update({ title, updated_at: new Date().toISOString() })
    .eq("id", id)
    .eq("user_id", user.id)
    .select("id, title, created_at, updated_at")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ session: data });
}

// DELETE /api/chat-sessions?id=xxx
export async function DELETE(req: NextRequest) {
  const { user, supabase } = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const { error } = await supabase
    .from("chat_sessions")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

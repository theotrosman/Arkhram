import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

async function getUser() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user: error ? null : user, supabase };
}

export async function GET() {
  const { user, supabase } = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("user_skills")
    .select("id, name, prompt, icon, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ skills: data });
}

export async function POST(req: NextRequest) {
  const { user, supabase } = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, prompt, icon } = await req.json();
  if (!name || !prompt) return NextResponse.json({ error: "name and prompt required" }, { status: 400 });

  const { data, error } = await supabase
    .from("user_skills")
    .insert({ user_id: user.id, name, prompt, icon: icon || "⚡" })
    .select("id, name, prompt, icon, created_at")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ skill: data });
}

export async function DELETE(req: NextRequest) {
  const { user, supabase } = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const { error } = await supabase
    .from("user_skills")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

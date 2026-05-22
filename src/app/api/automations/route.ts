import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { activateWorkflow, deactivateWorkflow, deleteWorkflow } from "@/lib/n8n";
import { z } from "zod";

async function getAuthUser() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return { user: null, supabase };
  return { user, supabase };
}

export async function GET(req: NextRequest) {
  const { user, supabase } = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("automations")
    .select("id, name, description, status, n8n_workflow_id, created_at, updated_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: "Error fetching automations" }, { status: 500 });
  return NextResponse.json({ automations: data });
}

const patchSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["active", "paused", "draft"]),
});

export async function PATCH(req: NextRequest) {
  const { user, supabase } = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { id, status } = patchSchema.parse(body);

    // Verify ownership before updating
    const { data: existing } = await supabase
      .from("automations")
      .select("id, n8n_workflow_id")
      .eq("id", id)
      .eq("user_id", user.id)
      .single();

    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    if (existing.n8n_workflow_id) {
      try {
        if (status === "active") await activateWorkflow(existing.n8n_workflow_id);
        else if (status === "paused") await deactivateWorkflow(existing.n8n_workflow_id);
      } catch {
        // n8n unavailable — continue, state persisted in DB
      }
    }

    const { data, error } = await supabase
      .from("automations")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id)
      .eq("user_id", user.id)
      .select("id, name, description, status, n8n_workflow_id, created_at, updated_at")
      .single();

    if (error) throw error;
    return NextResponse.json({ automation: data });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    return NextResponse.json({ error: "Error updating" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { user, supabase } = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id || !/^[0-9a-f-]{36}$/.test(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    // Verify ownership before deleting
    const { data: existing } = await supabase
      .from("automations")
      .select("id, n8n_workflow_id")
      .eq("id", id)
      .eq("user_id", user.id)
      .single();

    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    if (existing.n8n_workflow_id) {
      try { await deleteWorkflow(existing.n8n_workflow_id); } catch {}
    }

    const { error } = await supabase
      .from("automations")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Error deleting" }, { status: 500 });
  }
}

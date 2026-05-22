import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { activateWorkflow, deactivateWorkflow, deleteWorkflow } from "@/lib/n8n";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "userId requerido" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("automations")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ automations: data });
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json();

    const { data: automation } = await supabase
      .from("automations")
      .select("n8n_workflow_id")
      .eq("id", id)
      .single();

    if (automation?.n8n_workflow_id) {
      try {
        if (status === "active") {
          await activateWorkflow(automation.n8n_workflow_id);
        } else if (status === "paused") {
          await deactivateWorkflow(automation.n8n_workflow_id);
        }
      } catch (n8nError) {
        console.warn("n8n status update failed:", n8nError);
      }
    }

    const { data, error } = await supabase
      .from("automations")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ automation: data });
  } catch (error) {
    return NextResponse.json({ error: "Error actualizando" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id requerido" }, { status: 400 });

    const { data: automation } = await supabase
      .from("automations")
      .select("n8n_workflow_id")
      .eq("id", id)
      .single();

    if (automation?.n8n_workflow_id) {
      try {
        await deleteWorkflow(automation.n8n_workflow_id);
      } catch (n8nError) {
        console.warn("n8n delete failed:", n8nError);
      }
    }

    const { error } = await supabase.from("automations").delete().eq("id", id);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Error eliminando" }, { status: 500 });
  }
}

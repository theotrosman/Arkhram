import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateN8nWorkflow, describeAutomation } from "@/lib/flow-generator";
import { createWorkflow } from "@/lib/n8n";
import { supabase } from "@/lib/supabase";
import { AutomationConfig } from "@/lib/types";

const requestSchema = z.object({
  config: z.object({
    nombre: z.string(),
    trigger: z.object({ tipo: z.string() }).passthrough(),
    acciones: z.array(z.object({ tipo: z.string() }).passthrough()),
    frecuencia: z.enum(["tiempo_real", "cada_hora", "diaria", "semanal"]),
  }),
  userId: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { config, userId } = requestSchema.parse(body);

    const workflow = generateN8nWorkflow(config as AutomationConfig);

    let n8nWorkflowId: string | null = null;
    try {
      n8nWorkflowId = await createWorkflow(workflow);
    } catch (n8nError) {
      console.warn("n8n not available, saving as draft:", n8nError);
    }

    const description = describeAutomation(config as AutomationConfig);

    const { data, error } = await supabase
      .from("automations")
      .insert({
        user_id: userId,
        name: config.nombre,
        description,
        config,
        n8n_workflow_id: n8nWorkflowId,
        status: n8nWorkflowId ? "active" : "draft",
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      automation: data,
      workflow,
      n8nWorkflowId,
    });
  } catch (error) {
    console.error("Generate flow error:", error);
    return NextResponse.json(
      { error: "Error generando el flujo" },
      { status: 500 }
    );
  }
}

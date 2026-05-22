import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateN8nWorkflow, describeAutomation } from "@/lib/flow-generator";
import { createWorkflow } from "@/lib/n8n";
import { createClient } from "@/lib/supabase/server";
import { AutomationConfig } from "@/lib/types";

const triggerSchema = z.object({
  tipo: z.string().max(50),
  cuenta: z.string().max(200).optional(),
  filtro: z.string().max(500).optional(),
  criterio: z.string().max(500).optional(),
  expresion: z.string().max(100).optional(),
}).passthrough();

const actionSchema = z.object({
  tipo: z.string().max(50),
  numero: z.string().max(50).optional(),
  canal: z.string().max(200).optional(),
  mensaje: z.string().max(2000).optional(),
  hoja: z.string().max(200).optional(),
  base: z.string().max(200).optional(),
}).passthrough();

const requestSchema = z.object({
  config: z.object({
    nombre: z.string().min(1).max(200),
    trigger: triggerSchema,
    acciones: z.array(actionSchema).min(1).max(10),
    frecuencia: z.enum(["tiempo_real", "cada_hora", "diaria", "semanal"]),
  }),
});

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { config } = requestSchema.parse(body);

    const workflow = generateN8nWorkflow(config as AutomationConfig);

    let n8nWorkflowId: string | null = null;
    try {
      n8nWorkflowId = await createWorkflow(workflow);
    } catch {
      // n8n unavailable — save as draft
    }

    const description = describeAutomation(config as AutomationConfig);

    const { data, error } = await supabase
      .from("automations")
      .insert({
        user_id: user.id,
        name: config.nombre,
        description,
        config,
        n8n_workflow_id: n8nWorkflowId,
        status: n8nWorkflowId ? "active" : "draft",
      })
      .select("id, name, description, status, n8n_workflow_id, created_at")
      .single();

    if (error) throw error;

    return NextResponse.json({ automation: data, n8nWorkflowId });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid configuration" }, { status: 400 });
    }
    return NextResponse.json({ error: "Error generating flow" }, { status: 500 });
  }
}

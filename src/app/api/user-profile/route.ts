import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const updateSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  business_type: z.string().max(200).optional(),
  business_description: z.string().max(1000).optional(),
  industry: z.string().max(100).optional(),
  preferences: z.record(z.unknown()).optional(),
  ai_notes: z.string().max(5000).optional(),
  onboarding_done: z.boolean().optional(),
});

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ profile: null }, { status: 401 });

  const { data } = await supabase
    .from("user_profiles")
    .select("id, name, business_type, business_description, industry, preferences, ai_notes, onboarding_done, created_at")
    .eq("id", user.id)
    .single();

  return NextResponse.json({ profile: data });
}

export async function PATCH(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const validated = updateSchema.parse(body);

    const { data, error } = await supabase
      .from("user_profiles")
      .upsert({ id: user.id, ...validated }, { onConflict: "id" })
      .select("id, name, business_type, business_description, industry, preferences, ai_notes, onboarding_done")
      .single();

    if (error) return NextResponse.json({ error: "Error saving profile" }, { status: 500 });
    return NextResponse.json({ profile: data });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input", details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Error saving profile" }, { status: 500 });
  }
}

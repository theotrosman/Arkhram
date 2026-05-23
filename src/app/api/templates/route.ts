import { NextRequest, NextResponse } from "next/server";
import { AUTOMATION_TEMPLATES, CATEGORY_LABELS } from "@/lib/automation-templates";

// GET /api/templates?category=ecommerce&featured=true
export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get("category");
  const featured = req.nextUrl.searchParams.get("featured") === "true";

  let templates = [...AUTOMATION_TEMPLATES] as unknown as typeof AUTOMATION_TEMPLATES[number][];

  if (category && category !== "all") {
    templates = templates.filter((t) => t.category === category);
  }

  if (featured) {
    templates = templates.filter((t) => (t as any).is_featured);
  }

  return NextResponse.json({
    templates,
    categories: CATEGORY_LABELS,
    total: AUTOMATION_TEMPLATES.length,
  });
}

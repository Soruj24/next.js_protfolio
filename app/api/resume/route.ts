import { NextResponse } from "next/server";
import { buildResumeData } from "@/lib/resume/resume-mapper";

export const dynamic = "force-dynamic";

/**
 * GET /api/resume → Builds resume data from real portfolio sources.
 * No hardcoded data. No mock data. Single source of truth.
 */
export async function GET() {
  try {
    const data = await buildResumeData();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Resume API error:", error);
    return NextResponse.json(
      { error: "Failed to build resume data" },
      { status: 500 }
    );
  }
}

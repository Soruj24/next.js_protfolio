import { NextResponse } from "next/server";
import { getChartsData } from "@/lib/services/charts-data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getChartsData();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Charts API error:", error);
    return NextResponse.json({ error: "Failed to fetch chart data" }, { status: 500 });
  }
}

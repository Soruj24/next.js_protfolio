import { NextResponse } from "next/server";
import { getPortfolioData } from "@/lib/services/portfolio-data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getPortfolioData();
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120" },
    });
  } catch (error) {
    console.error("Portfolio API error:", error);
    return NextResponse.json({ error: "Failed to fetch portfolio data" }, { status: 500 });
  }
}

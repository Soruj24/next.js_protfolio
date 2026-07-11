import { NextResponse } from "next/server";
import { fetchGitHubData } from "@/lib/github/service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await fetchGitHubData();
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
    });
  } catch (error) {
    console.error("GitHub data fetch error:", error);
    return NextResponse.json(
      { stats: { publicRepos: 0, followers: 0, following: 0, stars: 0, forks: 0 }, recentCommits: [] },
      { status: 500 }
    );
  }
}

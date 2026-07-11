import { NextResponse } from "next/server";
import { fetchAllGitHubData } from "@/lib/github/service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await fetchAllGitHubData();
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
    });
  } catch (error) {
    console.error("GitHub data fetch error:", error);
    return NextResponse.json(
      {
        profile: null,
        repos: [],
        recentCommits: [],
        issues: [],
        pullRequests: [],
        releases: [],
        contributors: [],
        languages: {},
        contributionGraph: [],
      },
      { status: 500 },
    );
  }
}

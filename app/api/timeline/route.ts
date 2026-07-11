import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import { Activity, type ActivityType } from "@/models/Activity";
import { fetchAllGitHubData, type GitHubCommit, type GitHubIssue, type GitHubPullRequest } from "@/lib/github/service";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

export interface TimelineItem {
  id: string;
  type: ActivityType;
  source: "activity" | "github";
  title: string;
  description: string;
  timestamp: string;
  link?: string;
  metadata?: Record<string, unknown>;
}

function activityToTimeline(a: any): TimelineItem {
  return {
    id: String(a._id),
    type: a.type,
    source: "activity",
    title: a.title,
    description: a.description || "",
    timestamp: a.createdAt,
    link: a.link || undefined,
    metadata: a.metadata || {},
  };
}

function commitToTimeline(c: GitHubCommit): TimelineItem {
  return {
    id: `gh-commit-${c.hash}`,
    type: "github",
    source: "github",
    title: "New commit",
    description: c.message.length > 120 ? c.message.slice(0, 120) + "..." : c.message,
    timestamp: c.timestamp,
    link: c.url,
    metadata: { repo: c.repo, sha: c.hash },
  };
}

function issueToTimeline(i: GitHubIssue): TimelineItem {
  return {
    id: `gh-issue-${i.number}-${i.url}`,
    type: "github",
    source: "github",
    title: `Issue ${i.state === "open" ? "opened" : "closed"}: ${i.title}`,
    description: i.labels.map((l) => l.name).join(", ") || "",
    timestamp: i.createdAt,
    link: i.url,
    metadata: { number: i.number, state: i.state },
  };
}

function prToTimeline(pr: GitHubPullRequest): TimelineItem {
  return {
    id: `gh-pr-${pr.number}-${pr.url}`,
    type: "github",
    source: "github",
    title: `PR ${pr.state === "open" ? "opened" : pr.merged ? "merged" : "closed"}: ${pr.title}`,
    description: `${pr.headBranch} → ${pr.baseBranch}`,
    timestamp: pr.createdAt,
    link: pr.url,
    metadata: { number: pr.number, state: pr.state, merged: pr.merged },
  };
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    const role = session?.user?.role;
    if (!session || (role !== "admin" && role !== "editor")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "20")));
    const type = searchParams.get("type") || "all";
    const search = (searchParams.get("search") || "").toLowerCase();

    await connectDB();

    const activityFilter: Record<string, any> = {};
    if (type !== "all" && type !== "github") {
      activityFilter.type = type;
    } else if (type === "github") {
      activityFilter.type = "github";
    }

    if (search) {
      activityFilter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const [activityDocs, totalActivities] = await Promise.all([
      Activity.find(activityFilter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit + 10)
        .lean(),
      Activity.countDocuments(activityFilter),
    ]);

    let allItems: TimelineItem[] = activityDocs.map(activityToTimeline);

    if (type === "all" || type === "github") {
      try {
        const gh = await fetchAllGitHubData();
        const ghCommits = (gh.recentCommits || []).map(commitToTimeline);
        const ghIssues = (gh.issues || []).map(issueToTimeline);
        const ghPRs = (gh.pullRequests || []).map(prToTimeline);
        const ghItems = [...ghCommits, ...ghIssues, ...ghPRs];

        if (type === "github") {
          allItems = ghItems;
        } else {
          allItems = [...allItems, ...ghItems];
        }
      } catch {
        // GitHub API unavailable — return only activity data
      }
    }

    if (search && type !== "github") {
      allItems = allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(search) ||
          item.description.toLowerCase().includes(search)
      );
    }

    const seen = new Set<string>();
    allItems = allItems.filter((item) => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });

    allItems.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    const total = allItems.length;
    const start = (page - 1) * limit;
    const paged = allItems.slice(start, start + limit);

    return NextResponse.json({
      items: paged,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasMore: start + limit < total,
    });
  } catch (error) {
    console.error("Timeline API error:", error);
    return NextResponse.json({ error: "Failed to fetch timeline" }, { status: 500 });
  }
}

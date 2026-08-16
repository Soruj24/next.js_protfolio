import { NextResponse } from "next/server";
import { getAllLinks, updateLinkHealth } from "@/lib/links";

interface HealthCheckResult {
  id: string;
  url: string;
  status: "working" | "redirect" | "broken" | "unchecked";
  statusCode: number | null;
  responseTime: number | null;
  errorMessage: string | null;
}

async function checkUrlHealth(url: string): Promise<Omit<HealthCheckResult, "id">> {
  const startTime = Date.now();

  try {
    if (url.startsWith("mailto:") || url.startsWith("tel:")) {
      return {
        url,
        status: "working",
        statusCode: 200,
        responseTime: 0,
        errorMessage: null,
      };
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(url, {
      method: "HEAD",
      signal: controller.signal,
      redirect: "follow",
      headers: { "User-Agent": "LinkChecker/1.0" },
    });

    clearTimeout(timeout);
    const responseTime = Date.now() - startTime;

    if (response.ok) {
      return { url, status: "working", statusCode: response.status, responseTime, errorMessage: null };
    }

    if (response.status >= 300 && response.status < 400) {
      return { url, status: "redirect", statusCode: response.status, responseTime, errorMessage: `Redirect to ${response.url}` };
    }

    return { url, status: "broken", statusCode: response.status, responseTime, errorMessage: `HTTP ${response.status}` };
  } catch (error: unknown) {
    const responseTime = Date.now() - startTime;
    const message = error instanceof Error ? error.message : "Unknown error";

    if (message.includes("abort")) {
      return { url, status: "broken", statusCode: null, responseTime, errorMessage: "Timeout (10s)" };
    }

    return { url, status: "broken", statusCode: null, responseTime, errorMessage: message };
  }
}

export async function POST() {
  try {
    const links = await getAllLinks();
    const results: HealthCheckResult[] = [];

    const checks = links.map(async (link) => {
      const result = await checkUrlHealth(link.url);
      const healthResult: HealthCheckResult = { id: link._id, ...result };
      await updateLinkHealth(link._id, {
        status: result.status,
        statusCode: result.statusCode,
        responseTime: result.responseTime,
        errorMessage: result.errorMessage,
      });
      return healthResult;
    });

    const allResults = await Promise.allSettled(checks);

    for (const r of allResults) {
      if (r.status === "fulfilled") {
        results.push(r.value);
      }
    }

    const working = results.filter((r) => r.status === "working").length;
    const broken = results.filter((r) => r.status === "broken").length;
    const redirect = results.filter((r) => r.status === "redirect").length;

    return NextResponse.json({
      success: true,
      summary: { total: results.length, working, broken, redirect },
      results,
    });
  } catch (error) {
    return NextResponse.json({ error: "Health check failed" }, { status: 500 });
  }
}

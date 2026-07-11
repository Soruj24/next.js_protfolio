import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";

export const dynamic = "force-dynamic";

interface HealthCheck {
  label: string;
  value: string;
  status: "operational" | "degraded" | "down";
}

export async function GET() {
  const checks: HealthCheck[] = [];

  // 1. API Server — if we're responding, it's online
  checks.push({ label: "API Server", value: "Online", status: "operational" });

  // 2. Database — try to connect and ping
  try {
    const conn = await connectDB();
    if (conn) {
      // Attempt a lightweight ping
      if (conn.connection?.db) {
        await conn.connection.db.admin().ping();
      }
      checks.push({ label: "Database", value: "Connected", status: "operational" });
    } else {
      checks.push({ label: "Database", value: "Disconnected", status: "down" });
    }
  } catch {
    checks.push({ label: "Database", value: "Error", status: "down" });
  }

  // 3. Network — measure response latency
  const start = Date.now();
  try {
    await fetch("https://httpbin.org/get", { method: "HEAD", signal: AbortSignal.timeout(5000) });
    const latency = Date.now() - start;
    checks.push({
      label: "Network",
      value: latency < 1000 ? "Stable" : latency < 3000 ? "Slow" : "Degraded",
      status: latency < 1000 ? "operational" : latency < 3000 ? "degraded" : "down",
    });
  } catch {
    checks.push({ label: "Network", value: "Unreachable", status: "down" });
  }

  const allOperational = checks.every((c) => c.status === "operational");
  const anyDown = checks.some((c) => c.status === "down");

  return NextResponse.json({
    status: allOperational ? "operational" : anyDown ? "down" : "degraded",
    checks,
    lastChecked: new Date().toISOString(),
  });
}

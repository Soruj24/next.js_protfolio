"use client";

import { useState, useEffect, useCallback } from "react";
import type { AnalyticsData, ChartsData } from "@/features/admin/types/analytics";
import type { PeriodOption } from "@/features/admin/lib/analytics";

export function useAnalytics(period: PeriodOption) {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [charts, setCharts] = useState<ChartsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [analyticsRes, chartsRes] = await Promise.all([
        fetch(`/api/analytics?period=${period}`),
        fetch("/api/dashboard/charts", { cache: "no-store" }),
      ]);
      if (!analyticsRes.ok) throw new Error("Failed to fetch analytics");
      const [analyticsData, chartsData] = await Promise.all([
        analyticsRes.json(),
        chartsRes.ok ? chartsRes.json() : null,
      ]);
      setAnalytics(analyticsData);
      if (chartsData) setCharts(chartsData);
      setLastRefresh(new Date());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [period]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return { analytics, charts, loading, error, lastRefresh, refetch: fetchData };
}

"use client";

import { useState, useEffect } from "react";

export function useUnreadCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let active = true;
    const fetchCount = async () => {
      try {
        const res = await fetch("/api/activities?limit=1", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (active && typeof data.unreadCount === "number") {
            setCount(data.unreadCount);
          }
        }
      } catch {}
    };
    fetchCount();
    const interval = setInterval(fetchCount, 60000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  return count;
}

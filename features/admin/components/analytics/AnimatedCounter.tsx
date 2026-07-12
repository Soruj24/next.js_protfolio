"use client";

import { useState, useEffect } from "react";

export default function AnimatedCounter({
  value, prefix = "", suffix = "", decimals = 0,
}: {
  value: number; prefix?: string; suffix?: string; decimals?: number;
}) {
  const [displayed, setDisplayed] = useState(0);
  useEffect(() => {
    const duration = 1200;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Number((eased * value).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value, decimals]);
  return (
    <span>
      {prefix}{displayed.toLocaleString()}{suffix && <span className="text-sm text-gray-500 font-medium ml-1">{suffix}</span>}
    </span>
  );
}

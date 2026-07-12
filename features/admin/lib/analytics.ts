export const ANALYTICS_COLORS = [
  "#22d3ee", "#a78bfa", "#34d399", "#f97316", "#ec4899",
  "#f59e0b", "#3b82f6", "#ef4444", "#8b5cf6", "#06b6d4",
];

export function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode.toUpperCase().split("").map((char) => 0x1f1a5 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export const PERIOD_OPTIONS = ["7d", "30d", "90d"] as const;
export type PeriodOption = (typeof PERIOD_OPTIONS)[number];

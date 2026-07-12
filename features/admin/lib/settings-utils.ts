import { DEFAULT_SETTINGS } from "@/features/admin/data/settings-defaults";
import type { SettingsState } from "@/features/admin/types/settings";

export function deepMerge<T>(target: T, source: unknown): T {
  const output = { ...target };
  const sourceObj = source as Record<string, unknown>;
  for (const key in sourceObj) {
    if (sourceObj[key] && typeof sourceObj[key] === "object" && !Array.isArray(sourceObj[key])) {
      (output as Record<string, unknown>)[key] = deepMerge(
        (target as Record<string, unknown>)[key] as Record<string, unknown>,
        sourceObj[key] as Record<string, unknown>
      );
    } else if (sourceObj[key] !== undefined) {
      (output as Record<string, unknown>)[key] = sourceObj[key];
    }
  }
  return output;
}

export function serializeSettings(data: Record<string, unknown>): SettingsState {
  const result = { ...DEFAULT_SETTINGS };
  const safe = data || {};
  const profile = (safe.profile || {}) as Record<string, unknown>;
  const personal = (safe.personal_info || {}) as Record<string, unknown>;
  const portfolio = (safe.portfolio || {}) as Record<string, unknown>;
  const seo = (safe.seo || {}) as Record<string, unknown>;
  const social = (safe.social_links || []) as Record<string, unknown>[];
  const theme = (safe.theme || {}) as Record<string, unknown>;
  const security = (safe.security || {}) as Record<string, unknown>;
  const notifications = (safe.notifications || {}) as Record<string, unknown>;
  const language = (safe.language || {}) as Record<string, unknown>;
  const dataSection = (safe.data || {}) as Record<string, unknown>;

  const pickDefined = (obj: Record<string, unknown>) =>
    Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined && v !== null));

  result.profile = { ...DEFAULT_SETTINGS.profile, ...pickDefined(profile), availability: (profile.availability as SettingsState["profile"]["availability"]) || "available" };
  result.personal_info = { ...DEFAULT_SETTINGS.personal_info, ...pickDefined(personal) };
  result.portfolio = { ...DEFAULT_SETTINGS.portfolio, ...pickDefined(portfolio) };
  result.seo = { ...DEFAULT_SETTINGS.seo, ...pickDefined(seo), twitter_card: (seo.twitter_card as "summary" | "summary_large_image") || "summary_large_image" };
  result.social_links = Array.isArray(social)
    ? social.map((s) => ({ platform: (s.platform as string) || "", url: (s.url as string) || "", username: (s.username as string) || "", visible: s.visible !== false }))
    : [];
  result.theme = { ...DEFAULT_SETTINGS.theme, ...pickDefined(theme), mode: (theme.mode as "dark" | "light" | "system") || "dark" };
  result.security = { ...DEFAULT_SETTINGS.security, ...Object.fromEntries(Object.entries(security).filter(([k, v]) => v !== undefined && v !== null && k !== "api_keys" && k !== "last_password_change")) };
  result.notifications = { ...DEFAULT_SETTINGS.notifications, ...pickDefined(notifications) };
  result.language = { ...DEFAULT_SETTINGS.language, ...pickDefined(language), time_format: (language.time_format as "12h" | "24h") || "12h" };
  result.data = { ...DEFAULT_SETTINGS.data, ...pickDefined(dataSection), backup_frequency: (dataSection.backup_frequency as "daily" | "weekly" | "monthly" | "never") || "weekly" };
  return result;
}

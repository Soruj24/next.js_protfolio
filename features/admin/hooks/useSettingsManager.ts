"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { toast } from "sonner";
import { usePathname } from "next/navigation";

export type SettingsSection =
  | "profile"
  | "portfolio"
  | "seo"
  | "social"
  | "appearance"
  | "notifications"
  | "security"
  | "data"
  | "content";

export interface SettingsState {
  // Profile
  profile: {
    avatar: string;
    bio: string;
    tagline: string;
    availability: "available" | "busy" | "unavailable";
    hourly_rate: string;
    currency: string;
    response_time: string;
  };
  // Personal info (from existing)
  personal_info: {
    full_name: string;
    email: string;
    phone: string;
    location: string;
    professional_title: string;
    linkedin: string;
    github: string;
    twitter: string;
    website: string;
  };
  // Portfolio
  portfolio: {
    title: string;
    description: string;
    keywords: string[];
    favicon: string;
    og_image: string;
    primary_color: string;
    accent_color: string;
  };
  // SEO
  seo: {
    meta_title: string;
    meta_description: string;
    meta_keywords: string[];
    og_title: string;
    og_description: string;
    og_image: string;
    twitter_card: "summary" | "summary_large_image";
    robots: string;
    canonical_url: string;
    google_analytics_id: string;
  };
  // Social Links
  social_links: {
    platform: string;
    url: string;
    username: string;
    visible: boolean;
  }[];
  // Theme
  theme: {
    mode: "dark" | "light" | "system";
    primary_color: string;
    accent_color: string;
    font_family: string;
    border_radius: string;
    animations_enabled: boolean;
    compact_mode: boolean;
    glassmorphism: boolean;
    gradient_background: boolean;
  };
  // Security
  security: {
    two_factor_enabled: boolean;
    session_timeout: number;
    login_notifications: boolean;
  };
  // Notifications
  notifications: {
    email_notifications: boolean;
    contact_form_alerts: boolean;
    weekly_report: boolean;
    security_alerts: boolean;
    project_updates: boolean;
    marketing_emails: boolean;
    sound_enabled: boolean;
    desktop_notifications: boolean;
  };
  // Language
  language: {
    primary: string;
    timezone: string;
    date_format: string;
    time_format: "12h" | "24h";
  };
  // Data
  data: {
    autosave_enabled: boolean;
    autosave_interval: number;
    last_backup: string | null;
    backup_frequency: "daily" | "weekly" | "monthly" | "never";
    retention_days: number;
  };
}

const DEFAULT_SETTINGS: SettingsState = {
  profile: {
    avatar: "",
    bio: "",
    tagline: "",
    availability: "available",
    hourly_rate: "",
    currency: "USD",
    response_time: "Within 24 hours",
  },
  personal_info: {
    full_name: "",
    email: "",
    phone: "",
    location: "",
    professional_title: "",
    linkedin: "",
    github: "",
    twitter: "",
    website: "",
  },
  portfolio: {
    title: "",
    description: "",
    keywords: [],
    favicon: "",
    og_image: "",
    primary_color: "#06b6d4",
    accent_color: "#8b5cf6",
  },
  seo: {
    meta_title: "",
    meta_description: "",
    meta_keywords: [],
    og_title: "",
    og_description: "",
    og_image: "",
    twitter_card: "summary_large_image",
    robots: "index, follow",
    canonical_url: "",
    google_analytics_id: "",
  },
  social_links: [],
  theme: {
    mode: "dark",
    primary_color: "#06b6d4",
    accent_color: "#8b5cf6",
    font_family: "Inter",
    border_radius: "0.5rem",
    animations_enabled: true,
    compact_mode: false,
    glassmorphism: true,
    gradient_background: true,
  },
  security: {
    two_factor_enabled: false,
    session_timeout: 24,
    login_notifications: true,
  },
  notifications: {
    email_notifications: true,
    contact_form_alerts: true,
    weekly_report: false,
    security_alerts: true,
    project_updates: false,
    marketing_emails: false,
    sound_enabled: true,
    desktop_notifications: false,
  },
  language: {
    primary: "en",
    timezone: "UTC",
    date_format: "MM/DD/YYYY",
    time_format: "12h",
  },
  data: {
    autosave_enabled: true,
    autosave_interval: 30,
    last_backup: null,
    backup_frequency: "weekly",
    retention_days: 30,
  },
};

function deepMerge<T extends Record<string, unknown>>(target: T, source: Partial<T>): T {
  const output = { ...target };
  for (const key in source) {
    if (
      source[key] &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key])
    ) {
      (output as Record<string, unknown>)[key] = deepMerge(
        (target as Record<string, unknown>)[key] as Record<string, unknown>,
        source[key] as Record<string, unknown>
      );
    } else if (source[key] !== undefined) {
      (output as Record<string, unknown>)[key] = source[key];
    }
  }
  return output;
}

function serializeSettings(data: Record<string, unknown>): SettingsState {
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

  result.profile = {
    ...DEFAULT_SETTINGS.profile,
    ...Object.fromEntries(
      Object.entries(profile).filter(([_, v]) => v !== undefined && v !== null)
    ),
    availability: (profile.availability as "available" | "busy" | "unavailable") || "available",
  };
  result.personal_info = {
    ...DEFAULT_SETTINGS.personal_info,
    ...Object.fromEntries(
      Object.entries(personal).filter(([_, v]) => v !== undefined && v !== null)
    ),
  };
  result.portfolio = {
    ...DEFAULT_SETTINGS.portfolio,
    ...Object.fromEntries(
      Object.entries(portfolio).filter(([_, v]) => v !== undefined && v !== null)
    ),
  };
  result.seo = {
    ...DEFAULT_SETTINGS.seo,
    ...Object.fromEntries(
      Object.entries(seo).filter(([_, v]) => v !== undefined && v !== null)
    ),
    twitter_card: (seo.twitter_card as "summary" | "summary_large_image") || "summary_large_image",
  };
  result.social_links = Array.isArray(social) ? social.map((s) => ({
    platform: (s.platform as string) || "",
    url: (s.url as string) || "",
    username: (s.username as string) || "",
    visible: s.visible !== false,
  })) : [];
  result.theme = {
    ...DEFAULT_SETTINGS.theme,
    ...Object.fromEntries(
      Object.entries(theme).filter(([_, v]) => v !== undefined && v !== null)
    ),
    mode: (theme.mode as "dark" | "light" | "system") || "dark",
  };
  result.security = {
    ...DEFAULT_SETTINGS.security,
    ...Object.fromEntries(
      Object.entries(security).filter(
        ([k, v]) => v !== undefined && v !== null && k !== "api_keys" && k !== "last_password_change"
      ),
    ),
  };
  result.notifications = {
    ...DEFAULT_SETTINGS.notifications,
    ...Object.fromEntries(
      Object.entries(notifications).filter(([_, v]) => v !== undefined && v !== null)
    ),
  };
  result.language = {
    ...DEFAULT_SETTINGS.language,
    ...Object.fromEntries(
      Object.entries(language).filter(([_, v]) => v !== undefined && v !== null)
    ),
    time_format: (language.time_format as "12h" | "24h") || "12h",
  };
  result.data = {
    ...DEFAULT_SETTINGS.data,
    ...Object.fromEntries(
      Object.entries(dataSection).filter(([_, v]) => v !== undefined && v !== null)
    ),
    backup_frequency: (dataSection.backup_frequency as "daily" | "weekly" | "monthly" | "never") || "weekly",
  };
  return result;
}

export function useSettingsManager(initialData: Record<string, unknown>) {
  const [settings, setSettings] = useState<SettingsState>(() =>
    deepMerge(DEFAULT_SETTINGS, serializeSettings(initialData))
  );
  const [initialSnapshot, setInitialSnapshot] = useState<string>("");
  const [isDirty, setIsDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const autosaveTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pathname = usePathname();

  // Snapshot on mount
  useEffect(() => {
    setInitialSnapshot(JSON.stringify(settings));
  }, []);

  // Track dirty state
  useEffect(() => {
    const current = JSON.stringify(settings);
    setIsDirty(current !== initialSnapshot && initialSnapshot !== "");
  }, [settings, initialSnapshot]);

  // Unsaved changes warning
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  // Autosave
  useEffect(() => {
    if (!settings.data.autosave_enabled || !isDirty) {
      if (autosaveTimerRef.current) {
        clearInterval(autosaveTimerRef.current);
        autosaveTimerRef.current = null;
      }
      return;
    }

    autosaveTimerRef.current = setInterval(
      () => {
        handleSave(true);
      },
      settings.data.autosave_interval * 1000
    );

    return () => {
      if (autosaveTimerRef.current) {
        clearInterval(autosaveTimerRef.current);
      }
    };
  }, [settings.data.autosave_enabled, settings.data.autosave_interval, isDirty]);

  const handleSave = useCallback(
    async (isAutosave = false) => {
      if (saving) return;
      setSaving(true);
      try {
        const response = await fetch("/api/settings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(settings),
        });

        if (!response.ok) throw new Error("Failed to save settings");

        const newSnapshot = JSON.stringify(settings);
        setInitialSnapshot(newSnapshot);
        setLastSaved(new Date());
        setIsDirty(false);

        if (!isAutosave) {
          toast.success("Settings saved successfully");
        }
      } catch (error) {
        if (!isAutosave) {
          toast.error("Failed to save settings");
        }
        console.error(error);
      } finally {
        setSaving(false);
      }
    },
    [settings, saving]
  );

  const updateSettings = useCallback(
    (section: keyof SettingsState, key: string, value: unknown) => {
      setSettings((prev) => ({
        ...prev,
        [section]: {
          ...(prev[section] as Record<string, unknown>),
          [key]: value,
        },
      }));
    },
    []
  );

  const updateNestedSettings = useCallback(
    (section: keyof SettingsState, updates: Record<string, unknown>) => {
      setSettings((prev) => ({
        ...prev,
        [section]: {
          ...(prev[section] as Record<string, unknown>),
          ...updates,
        },
      }));
    },
    []
  );

  const addSocialLink = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      social_links: [
        ...prev.social_links,
        { platform: "", url: "", username: "", visible: true },
      ],
    }));
  }, []);

  const removeSocialLink = useCallback((index: number) => {
    setSettings((prev) => ({
      ...prev,
      social_links: prev.social_links.filter((_, i) => i !== index),
    }));
  }, []);

  const updateSocialLink = useCallback(
    (index: number, key: string, value: unknown) => {
      setSettings((prev) => ({
        ...prev,
        social_links: prev.social_links.map((link, i) =>
          i === index ? { ...link, [key]: value } : link
        ),
      }));
    },
    []
  );

  const resetSettings = useCallback(() => {
    setSettings(deepMerge(DEFAULT_SETTINGS, serializeSettings(initialData)));
    setInitialSnapshot(JSON.stringify(initialData));
    setIsDirty(false);
    toast.info("Settings reset to last saved state");
  }, [initialData]);

  const exportSettings = useCallback(() => {
    const exportData = { ...settings };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `settings-backup-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Settings exported successfully");
  }, [settings]);

  const importSettings = useCallback(
    (file: File) => {
      return new Promise<void>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const imported = JSON.parse(e.target?.result as string);
            setSettings((prev) => deepMerge(prev, imported));
            toast.success("Settings imported. Review and save.");
            resolve();
          } catch {
            toast.error("Invalid settings file");
            reject(new Error("Invalid JSON"));
          }
        };
        reader.onerror = () => {
          toast.error("Failed to read file");
          reject(new Error("Read error"));
        };
        reader.readAsText(file);
      });
    },
    []
  );

  const getChangedCount = useCallback(() => {
    if (!initialSnapshot) return 0;
    const current = JSON.stringify(settings);
    let count = 0;
    const currentObj = JSON.parse(current);
    const initialObj = JSON.parse(initialSnapshot);
    for (const key in currentObj) {
      if (JSON.stringify(currentObj[key]) !== JSON.stringify(initialObj[key])) {
        count++;
      }
    }
    return count;
  }, [settings, initialSnapshot]);

  return {
    settings,
    isDirty,
    saving,
    lastSaved,
    updateSettings,
    updateNestedSettings,
    addSocialLink,
    removeSocialLink,
    updateSocialLink,
    handleSave,
    resetSettings,
    exportSettings,
    importSettings,
    getChangedCount,
    setSettings,
  };
}

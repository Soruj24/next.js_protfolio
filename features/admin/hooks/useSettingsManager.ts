"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { toast } from "sonner";
import { DEFAULT_SETTINGS } from "@/features/admin/data/settings-defaults";
import { deepMerge, serializeSettings } from "@/features/admin/lib/settings-utils";
import type { SettingsState, SettingsSection } from "@/features/admin/types/settings";

export type { SettingsState, SettingsSection };

export function useSettingsManager(initialData: Record<string, unknown>) {
  const [settings, setSettings] = useState<SettingsState>(
    deepMerge(DEFAULT_SETTINGS, serializeSettings(initialData))
  );
  const [initialSnapshot, setInitialSnapshot] = useState<string>("");
  const [isDirty, setIsDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const autosaveTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setInitialSnapshot(JSON.stringify(settings));
  }, []);

  useEffect(() => {
    const current = JSON.stringify(settings);
    setIsDirty(current !== initialSnapshot && initialSnapshot !== "");
  }, [settings, initialSnapshot]);

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

  const handleSaveRef = useRef<((isAutosave?: boolean) => Promise<void>) | null>(null);

  useEffect(() => {
    if (!settings.data.autosave_enabled || !isDirty) {
      if (autosaveTimerRef.current) {
        clearInterval(autosaveTimerRef.current);
        autosaveTimerRef.current = null;
      }
      return;
    }

    autosaveTimerRef.current = setInterval(
      () => { handleSaveRef.current?.(true); },
      settings.data.autosave_interval * 1000
    );

    return () => {
      if (autosaveTimerRef.current) clearInterval(autosaveTimerRef.current);
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

        if (!isAutosave) toast.success("Settings saved successfully");
      } catch (error) {
        if (!isAutosave) toast.error("Failed to save settings");
        console.error(error);
      } finally {
        setSaving(false);
      }
    },
    [settings, saving]
  );

  useEffect(() => {
    handleSaveRef.current = handleSave;
  }, [handleSave]);

  const updateSettings = useCallback(
    (section: keyof SettingsState, key: string, value: unknown) => {
      setSettings((prev) => ({
        ...prev,
        [section]: { ...(prev[section] as Record<string, unknown>), [key]: value } as any,
      }));
    },
    []
  );

  const updateNestedSettings = useCallback(
    (section: keyof SettingsState, updates: Record<string, unknown>) => {
      setSettings((prev) => ({
        ...prev,
        [section]: { ...(prev[section] as Record<string, unknown>), ...updates } as any,
      }));
    },
    []
  );

  const addSocialLink = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      social_links: [...prev.social_links, { platform: "", url: "", username: "", visible: true }],
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
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: "application/json" });
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
    let count = 0;
    const currentObj = JSON.parse(JSON.stringify(settings));
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

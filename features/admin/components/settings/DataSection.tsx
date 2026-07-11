"use client";

import { useRef, useState } from "react";
import {
  Database,
  Download,
  Upload,
  Clock,
  HardDrive,
  RotateCcw,
  FileJson,
  CheckCircle,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { SettingsState } from "@/features/admin/hooks/useSettingsManager";

interface DataSectionProps {
  settings: SettingsState;
  updateSettings: (section: keyof SettingsState, key: string, value: unknown) => void;
  exportSettings: () => void;
  importSettings: (file: File) => Promise<void>;
  lastSaved: Date | null;
  isDirty: boolean;
}

export default function DataSection({
  settings,
  updateSettings,
  exportSettings,
  importSettings,
  lastSaved,
  isDirty,
}: DataSectionProps) {
  const { data } = settings;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importing, setImporting] = useState(false);

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImporting(true);
    try {
      await importSettings(file);
    } catch {
      // handled in hook
    } finally {
      setImporting(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Autosave */}
      <Card className="bg-gray-900/80 border-gray-800 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-800 pb-5">
          <CardTitle className="text-white flex items-center gap-2 text-lg">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
              <Clock size={16} className="text-white" />
            </div>
            Autosave
          </CardTitle>
          <CardDescription>Automatically save your settings</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30 border border-gray-800">
            <div className="flex items-center gap-3">
              <Clock size={16} className="text-cyan-400" />
              <div>
                <p className="text-sm text-gray-200">Enable Autosave</p>
                <p className="text-xs text-gray-600">
                  Automatically save changes at regular intervals
                </p>
              </div>
            </div>
            <Switch
              checked={data.autosave_enabled}
              onCheckedChange={(v) => updateSettings("data", "autosave_enabled", v)}
              className="data-[state=checked]:bg-cyan-600"
            />
          </div>

          {data.autosave_enabled && (
            <div className="space-y-2 pl-1">
              <Label className="text-gray-300 text-sm">Save Interval</Label>
              <Select
                value={String(data.autosave_interval)}
                onValueChange={(v) =>
                  updateSettings("data", "autosave_interval", Number(v))
                }
              >
                <SelectTrigger className="bg-gray-800/60 border-gray-700/60 text-white max-w-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="15">Every 15 seconds</SelectItem>
                  <SelectItem value="30">Every 30 seconds</SelectItem>
                  <SelectItem value="60">Every minute</SelectItem>
                  <SelectItem value="300">Every 5 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Status bar */}
          <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-800/20 border border-gray-800/50 text-xs">
            <div className="flex items-center gap-1.5">
              {isDirty ? (
                <AlertTriangle size={12} className="text-amber-400" />
              ) : (
                <CheckCircle size={12} className="text-emerald-400" />
              )}
              <span className="text-gray-400">
                {isDirty ? "Unsaved changes" : "All changes saved"}
              </span>
            </div>
            {lastSaved && (
              <span className="text-gray-600">
                Last saved: {lastSaved.toLocaleTimeString()}
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Backup */}
      <Card className="bg-gray-900/80 border-gray-800 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-800 pb-5">
          <CardTitle className="text-white flex items-center gap-2 text-lg">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center">
              <HardDrive size={16} className="text-white" />
            </div>
            Backup Settings
          </CardTitle>
          <CardDescription>Automatic backup configuration</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-gray-300 text-sm">Backup Frequency</Label>
              <Select
                value={data.backup_frequency}
                onValueChange={(v) => updateSettings("data", "backup_frequency", v)}
              >
                <SelectTrigger className="bg-gray-800/60 border-gray-700/60 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="never">Never</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300 text-sm">Retention (days)</Label>
              <Input
                type="number"
                value={data.retention_days}
                onChange={(e) =>
                  updateSettings("data", "retention_days", Number(e.target.value))
                }
                min={1}
                max={365}
                className="bg-gray-800/60 border-gray-700/60 text-white"
              />
            </div>
          </div>
          {data.last_backup && (
            <p className="text-xs text-gray-600">
              Last backup: {new Date(data.last_backup).toLocaleString()}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Export / Import */}
      <Card className="bg-gray-900/80 border-gray-800 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-800 pb-5">
          <CardTitle className="text-white flex items-center gap-2 text-lg">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
              <FileJson size={16} className="text-white" />
            </div>
            Export & Import
          </CardTitle>
          <CardDescription>Transfer your settings between environments</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Export */}
            <div className="p-5 rounded-xl bg-gray-800/30 border border-gray-800 space-y-3">
              <div className="flex items-center gap-2">
                <Download size={16} className="text-emerald-400" />
                <p className="text-sm text-gray-200 font-medium">Export Settings</p>
              </div>
              <p className="text-xs text-gray-500">
                Download all your settings as a JSON file for backup or migration.
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={exportSettings}
                className="w-full border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-200"
              >
                <Download size={14} className="mr-2" /> Export JSON
              </Button>
            </div>

            {/* Import */}
            <div className="p-5 rounded-xl bg-gray-800/30 border border-gray-800 space-y-3">
              <div className="flex items-center gap-2">
                <Upload size={16} className="text-sky-400" />
                <p className="text-sm text-gray-200 font-medium">Import Settings</p>
              </div>
              <p className="text-xs text-gray-500">
                Import settings from a previously exported JSON file.
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={importing}
                className="w-full border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-200"
              >
                {importing ? (
                  <Loader2 size={14} className="mr-2 animate-spin" />
                ) : (
                  <Upload size={14} className="mr-2" />
                )}
                Import JSON
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

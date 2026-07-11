"use client";

import { useState } from "react";
import {
  Shield,
  Key,
  Clock,
  Bell,
  Smartphone,
  Copy,
  Plus,
  Trash2,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { SettingsState } from "@/features/admin/hooks/useSettingsManager";

interface SecuritySectionProps {
  settings: SettingsState;
  updateSettings: (section: keyof SettingsState, key: string, value: unknown) => void;
}

export default function SecuritySection({ settings, updateSettings }: SecuritySectionProps) {
  const { security } = settings;
  const [showNewKeyForm, setShowNewKeyForm] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");

  const sessionTimeouts = [
    { value: 1, label: "1 hour" },
    { value: 4, label: "4 hours" },
    { value: 8, label: "8 hours" },
    { value: 24, label: "24 hours" },
    { value: 72, label: "3 days" },
    { value: 168, label: "1 week" },
  ];

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success("API key copied to clipboard");
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Password */}
      <Card className="bg-gray-900/80 border-gray-800 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-800 pb-5">
          <CardTitle className="text-white flex items-center gap-2 text-lg">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-400 to-rose-500 flex items-center justify-center">
              <Key size={16} className="text-white" />
            </div>
            Password
          </CardTitle>
          <CardDescription>Manage your account password</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="p-4 rounded-xl bg-gray-800/40 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-200 font-medium">Password</p>
                <p className="text-xs text-gray-500">
                  Last changed: {security.last_password_change
                    ? new Date(security.last_password_change).toLocaleDateString()
                    : "Never"}
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-200"
              >
                Change Password
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Two-Factor */}
      <Card className="bg-gray-900/80 border-gray-800 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-800 pb-5">
          <CardTitle className="text-white flex items-center gap-2 text-lg">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <Smartphone size={16} className="text-white" />
            </div>
            Two-Factor Authentication
          </CardTitle>
          <CardDescription>Add an extra layer of security to your account</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-800/40 border border-gray-800">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center",
                  security.two_factor_enabled
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-gray-800 text-gray-500"
                )}
              >
                {security.two_factor_enabled ? (
                  <CheckCircle size={18} />
                ) : (
                  <AlertTriangle size={18} />
                )}
              </div>
              <div>
                <p className="text-sm text-gray-200 font-medium">
                  {security.two_factor_enabled ? "Enabled" : "Disabled"}
                </p>
                <p className="text-xs text-gray-500">
                  {security.two_factor_enabled
                    ? "Your account is protected with 2FA"
                    : "Enable 2FA for enhanced security"}
                </p>
              </div>
            </div>
            <Switch
              checked={security.two_factor_enabled}
              onCheckedChange={(v) => updateSettings("security", "two_factor_enabled", v)}
              className="data-[state=checked]:bg-cyan-600"
            />
          </div>
        </CardContent>
      </Card>

      {/* Sessions */}
      <Card className="bg-gray-900/80 border-gray-800 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-800 pb-5">
          <CardTitle className="text-white flex items-center gap-2 text-lg">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center">
              <Clock size={16} className="text-white" />
            </div>
            Session Management
          </CardTitle>
          <CardDescription>Control session timeout and login alerts</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm">Session Timeout</Label>
            <Select
              value={String(security.session_timeout)}
              onValueChange={(v) => updateSettings("security", "session_timeout", Number(v))}
            >
              <SelectTrigger className="bg-gray-800/60 border-gray-700/60 text-white max-w-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {sessionTimeouts.map((t) => (
                  <SelectItem key={t.value} value={String(t.value)}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-600">
              You will be logged out after this period of inactivity
            </p>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30 border border-gray-800">
            <div className="flex items-center gap-3">
              <Bell size={16} className="text-amber-400" />
              <div>
                <p className="text-sm text-gray-200">Login Notifications</p>
                <p className="text-xs text-gray-600">
                  Get notified of new login sessions
                </p>
              </div>
            </div>
            <Switch
              checked={security.login_notifications}
              onCheckedChange={(v) =>
                updateSettings("security", "login_notifications", v)
              }
              className="data-[state=checked]:bg-cyan-600"
            />
          </div>
        </CardContent>
      </Card>

      {/* API Keys */}
      <Card className="bg-gray-900/80 border-gray-800 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-800 pb-5">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center gap-2 text-lg">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center">
                  <Key size={16} className="text-white" />
                </div>
                API Keys
              </CardTitle>
              <CardDescription className="mt-1">
                Manage API keys for external integrations
              </CardDescription>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowNewKeyForm(!showNewKeyForm)}
              className="border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-200"
            >
              <Plus size={14} className="mr-1" /> Generate Key
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {showNewKeyForm && (
            <div className="p-4 rounded-xl bg-gray-800/40 border border-cyan-500/20 space-y-3">
              <Label className="text-gray-300 text-sm">Key Name</Label>
              <div className="flex gap-2">
                <Input
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="e.g. Production API Key"
                  className="bg-gray-900/60 border-gray-700/60 text-white"
                />
                <Button
                  type="button"
                  size="sm"
                  className="bg-cyan-600 hover:bg-cyan-700 text-white"
                  onClick={() => {
                    if (!newKeyName.trim()) {
                      toast.error("Please enter a key name");
                      return;
                    }
                    toast.success("API key created (demo mode)");
                    setNewKeyName("");
                    setShowNewKeyForm(false);
                  }}
                >
                  Create
                </Button>
              </div>
            </div>
          )}

          <div className="p-8 rounded-xl border border-dashed border-gray-800 text-center">
            <Key size={24} className="text-gray-700 mx-auto mb-3" />
            <p className="text-sm text-gray-500">No API keys generated yet</p>
            <p className="text-xs text-gray-600 mt-1">
              API keys will appear here once you generate them
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

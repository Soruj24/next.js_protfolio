"use client";

import {
  Bell,
  Mail,
  MessageSquare,
  FileText,
  Shield,
  Megaphone,
  Volume2,
  Monitor,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import type { SettingsState } from "@/features/admin/hooks/useSettingsManager";

interface NotificationsSectionProps {
  settings: SettingsState;
  updateSettings: (section: keyof SettingsState, key: string, value: unknown) => void;
}

export default function NotificationsSection({
  settings,
  updateSettings,
}: NotificationsSectionProps) {
  const { notifications } = settings;

  const items = [
    {
      key: "email_notifications",
      icon: Mail,
      iconColor: "text-blue-400",
      label: "Email Notifications",
      desc: "Receive email for important updates",
    },
    {
      key: "contact_form_alerts",
      icon: MessageSquare,
      iconColor: "text-cyan-400",
      label: "Contact Form Alerts",
      desc: "Get notified when someone submits a contact form",
    },
    {
      key: "weekly_report",
      icon: FileText,
      iconColor: "text-emerald-400",
      label: "Weekly Reports",
      desc: "Receive weekly portfolio analytics summary",
    },
    {
      key: "security_alerts",
      icon: Shield,
      iconColor: "text-amber-400",
      label: "Security Alerts",
      desc: "Important security notifications",
    },
    {
      key: "project_updates",
      icon: FileText,
      iconColor: "text-violet-400",
      label: "Project Updates",
      desc: "Notifications about project changes",
    },
    {
      key: "marketing_emails",
      icon: Megaphone,
      iconColor: "text-pink-400",
      label: "Marketing Emails",
      desc: "Product updates and feature announcements",
    },
    {
      key: "sound_enabled",
      icon: Volume2,
      iconColor: "text-rose-400",
      label: "Sound Effects",
      desc: "Play sounds for notifications and actions",
    },
    {
      key: "desktop_notifications",
      icon: Monitor,
      iconColor: "text-sky-400",
      label: "Desktop Notifications",
      desc: "Show browser push notifications",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in-up">
      <Card className="bg-gray-900/80 border-gray-800 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-800 pb-5">
          <CardTitle className="text-white flex items-center gap-2 text-lg">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <Bell size={16} className="text-white" />
            </div>
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Control how and when you receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 divide-y divide-gray-800/50">
          {items.map((item) => {
            const Icon = item.icon;
            const currentValue = notifications[
              item.key as keyof typeof notifications
            ] as boolean;
            return (
              <div
                key={item.key}
                className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gray-800/60 flex items-center justify-center">
                    <Icon size={16} className={item.iconColor} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-200 font-medium">{item.label}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </div>
                <Switch
                  checked={currentValue}
                  onCheckedChange={(v) => updateSettings("notifications", item.key, v)}
                  className="data-[state=checked]:bg-cyan-600"
                />
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}

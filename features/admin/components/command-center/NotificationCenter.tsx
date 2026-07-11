"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Bell, MessageSquare, CheckCircle2, AlertCircle, Clock, X,
  Loader2, FolderGit2, FileText, Shield, Globe, Rocket,
  BarChart3, GitCommitHorizontal, Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
  _id: string;
  title: string;
  description: string;
  type: string;
  link?: string;
  read: boolean;
  createdAt: string;
}

const typeConfig: Record<string, { icon: typeof Bell; color: string }> = {
  contact: { icon: MessageSquare, color: "text-cyan-400 bg-cyan-400/10" },
  project: { icon: FolderGit2, color: "text-emerald-400 bg-emerald-400/10" },
  blog: { icon: FileText, color: "text-purple-400 bg-purple-400/10" },
  security: { icon: Shield, color: "text-amber-400 bg-amber-400/10" },
  system: { icon: Settings, color: "text-blue-400 bg-blue-400/10" },
  analytics: { icon: BarChart3, color: "text-pink-400 bg-pink-400/10" },
  github: { icon: GitCommitHorizontal, color: "text-gray-300 bg-gray-300/10" },
  deployment: { icon: Rocket, color: "text-orange-400 bg-orange-400/10" },
  profile: { icon: Globe, color: "text-blue-400 bg-blue-400/10" },
};

function timeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function NotificationCenter() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await fetch("/api/activities?limit=20");
      if (res.ok) {
        const result = await res.json();
        setNotifications(result.data || []);
        setUnreadCount(result.unreadCount || 0);
      }
    } catch {
      setNotifications([]);
      setUnreadCount(0);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  const markAsRead = useCallback(async (id: string) => {
    setNotifications((prev) => prev.map((n) => (n._id === id ? { ...n, read: true } : n)));
    setUnreadCount((prev) => Math.max(0, prev - 1));
    try {
      await fetch("/api/activities", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    } catch {
      fetchNotifications();
    }
  }, [fetchNotifications]);

  const markAllAsRead = useCallback(async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
    try {
      await fetch("/api/activities", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ readAll: true }),
      });
    } catch {
      fetchNotifications();
    }
  }, [fetchNotifications]);

  const handleNotificationClick = useCallback((notification: Notification) => {
    if (!notification.read) markAsRead(notification._id);
    setOpen(false);
    if (notification.link) router.push(notification.link);
  }, [markAsRead, router]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "relative flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200",
          open ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5",
        )}
      >
        <Bell size={16} />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-cyan-500 rounded-full shadow-lg shadow-cyan-500/30 animate-status-pulse">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-[380px] rounded-2xl border border-white/10 bg-[#0a0a0f]/95 backdrop-blur-2xl shadow-2xl shadow-black/50 overflow-hidden animate-fade-in-up">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-semibold text-white">Notifications</h3>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 text-[10px] font-bold text-cyan-400 bg-cyan-400/10 rounded-full border border-cyan-400/20">
                  {unreadCount} new
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-[10px] font-bold text-gray-500 hover:text-cyan-400 transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          <div className="max-h-[360px] overflow-y-auto scrollbar-hide">
            {loading ? (
              <div className="py-12 text-center">
                <Loader2 size={20} className="mx-auto text-gray-600 animate-spin mb-3" />
                <p className="text-sm text-gray-500 font-medium">Loading...</p>
              </div>
            ) : notifications.length > 0 ? (
              <div className="p-2">
                {notifications.map((notification) => {
                  const config = typeConfig[notification.type] || typeConfig.system;
                  const Icon = config.icon;
                  return (
                    <button
                      key={notification._id}
                      onClick={() => handleNotificationClick(notification)}
                      className={cn(
                        "w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all duration-200 hover:bg-white/5 group",
                        !notification.read && "bg-white/[0.02]",
                      )}
                    >
                      <div className={cn("p-2 rounded-xl shrink-0 mt-0.5", config.color)}>
                        <Icon size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className={cn("text-sm font-medium truncate", notification.read ? "text-gray-300" : "text-white")}>
                            {notification.title}
                          </p>
                          {!notification.read && (
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                          )}
                        </div>
                        {notification.description && (
                          <p className="text-xs text-gray-500 line-clamp-2 font-medium">{notification.description}</p>
                        )}
                        <p className="text-[10px] text-gray-600 font-medium mt-1">
                          {timeAgo(notification.createdAt)}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="py-12 text-center">
                <Bell size={24} className="mx-auto text-gray-600 mb-3" />
                <p className="text-sm text-gray-500 font-medium">No notifications</p>
              </div>
            )}
          </div>

          <div className="border-t border-white/10 px-5 py-3">
            <button
              onClick={() => { setOpen(false); router.push("/admin/inquiries"); }}
              className="w-full text-center text-xs font-semibold text-gray-500 hover:text-cyan-400 transition-colors py-1"
            >
              View all activity
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

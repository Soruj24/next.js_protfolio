"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import {
  Download,
  Eye,
  Clock,
  UserCheck,
  Code2,
  FolderGit2,
  Award,
  Github,
  TrendingUp,
  Loader2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { usePortfolioSettings } from "@/hooks/usePortfolioSettings";

/* ─── Animated Counter Hook ─── */
function useAnimatedCounter(target: number, duration = 1600) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, target, duration]);

  return { count, ref };
}

/* ─── Profile Completion Calculator ─── */
function calculateProfileCompletion(settings: ReturnType<typeof usePortfolioSettings>["settings"]): number {
  if (!settings) return 0;

  let filled = 0;
  const total = 13;

  const p = settings.personal_info;
  if (p?.full_name) filled++;
  if (p?.email) filled++;
  if (p?.phone) filled++;
  if (p?.location) filled++;
  if (p?.professional_title) filled++;

  const pr = settings.profile;
  if (pr?.bio) filled++;
  if (pr?.avatar) filled++;
  if (pr?.tagline) filled++;

  const ts = settings.technical_skills;
  if (ts?.core_technologies?.length > 0) filled++;
  if (ts?.specializations?.length > 0) filled++;

  if (settings.experiences?.length > 0) filled++;
  if (settings.educations?.length > 0) filled++;
  if (settings.social_links?.length > 0) filled++;

  return Math.round((filled / total) * 100);
}

/* ─── Stat Card ─── */
function StatCard({
  icon,
  label,
  value,
  textValue,
  description,
  color,
  gradient,
  border,
  text,
}: {
  icon: React.ReactNode;
  label: string;
  value?: number;
  textValue?: string;
  description: string;
  color: string;
  gradient: string;
  border: string;
  text: string;
}) {
  const { count, ref } = useAnimatedCounter(value ?? 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      className="relative group glass-card rounded-2xl p-5 sm:p-6 hover:bg-white/[0.06] transition-all duration-500 cursor-default overflow-hidden"
    >
      <div className={`absolute inset-0 bg-gradient-to-b ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      <div className="relative z-10">
        <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border ${border} ${text} mb-3`}>
          {icon}
          <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider">{label}</span>
        </div>
        <p className="text-white font-bold text-2xl sm:text-3xl leading-none mb-1" ref={textValue ? undefined : ref}>
          {textValue ?? count.toLocaleString()}
        </p>
        <p className="text-gray-500 text-xs sm:text-sm">{description}</p>
      </div>
    </motion.div>
  );
}

/* ─── Profile Completion Card ─── */
function ProfileCompletionCard({ percentage }: { percentage: number }) {
  const { count, ref } = useAnimatedCounter(percentage, 1400);
  const circumference = 2 * Math.PI * 36;
  const strokeDashoffset = circumference - (count / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative group glass-card rounded-2xl p-5 sm:p-6 hover:bg-white/[0.06] transition-all duration-500 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10 flex items-center gap-5">
        <div ref={ref} className="shrink-0">
          <svg width="88" height="88" viewBox="0 0 88 88" className="-rotate-90">
            <circle cx="44" cy="44" r="36" stroke="rgba(255,255,255,0.06)" strokeWidth="6" fill="none" />
            <circle
              cx="44"
              cy="44"
              r="36"
              stroke="url(#completionGradient)"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: "stroke-dashoffset 0.4s ease" }}
            />
            <defs>
              <linearGradient id="completionGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center" style={{ width: 88, height: 88 }}>
            <span className="text-white font-bold text-lg">{count}%</span>
          </div>
        </div>
        <div className="min-w-0">
          <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-emerald-500/20 text-emerald-400 mb-2">
            <UserCheck className="w-3.5 h-3.5" />
            <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider">Profile</span>
          </div>
          <p className="text-white font-bold text-base sm:text-lg leading-tight mb-1">Profile Completion</p>
          <p className="text-gray-500 text-xs sm:text-sm">
            {percentage >= 80
              ? "Looking great — almost there!"
              : percentage >= 50
              ? "Good progress, keep filling in details."
              : "Add more details to stand out."}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Recent Updates Card ─── */
function RecentUpdatesCard({
  latestExperience,
  skillsCount,
  socialLinksCount,
}: {
  latestExperience: { role: string; company: string; year: string } | null;
  skillsCount: number;
  socialLinksCount: number;
}) {
  const updates = [
    latestExperience && {
      label: "Latest Role",
      value: `${latestExperience.role} at ${latestExperience.company}`,
      sub: latestExperience.year,
    },
    skillsCount > 0 && {
      label: "Technical Skills",
      value: `${skillsCount} technologies`,
      sub: "Core & specializations",
    },
    socialLinksCount > 0 && {
      label: "Connected Platforms",
      value: `${socialLinksCount} links`,
      sub: "Visible on your profile",
    },
  ].filter(Boolean) as { label: string; value: string; sub: string }[];

  if (updates.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card rounded-2xl p-5 sm:p-6"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
          <TrendingUp className="w-5 h-5 text-cyan-400" />
        </div>
        <h3 className="text-lg font-bold text-white">Recent Updates</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {updates.map((u) => (
          <div
            key={u.label}
            className="flex flex-col gap-1 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"
          >
            <span className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wider">{u.label}</span>
            <span className="text-white text-sm font-semibold leading-tight">{u.value}</span>
            <span className="text-gray-500 text-xs">{u.sub}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Analytics Skeleton ─── */
function AnalyticsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="glass-card rounded-2xl p-5 sm:p-6 animate-pulse">
            <div className="h-5 w-20 bg-white/5 rounded-lg mb-3" />
            <div className="h-7 w-16 bg-white/5 rounded mb-2" />
            <div className="h-3 w-24 bg-white/5 rounded" />
          </div>
        ))}
      </div>
      <div className="glass-card rounded-2xl p-5 sm:p-6 animate-pulse">
        <div className="h-5 w-32 bg-white/5 rounded-lg mb-5" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-20 bg-white/[0.03] rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function ResumeAnalytics() {
  const { settings } = usePortfolioSettings();
  const [analytics, setAnalytics] = useState<{
    overview?: { resumeDownloads: number; pageViews: number; visitors: number };
  } | null>(null);
  const [certificatesCount, setCertificatesCount] = useState(0);
  const [githubRepos, setGithubRepos] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [analyticsRes, certsRes, githubRes, portfolioRes] = await Promise.allSettled([
        fetch("/api/analytics?period=30d").then((r) => (r.ok ? r.json() : null)),
        fetch("/api/certificates").then((r) => (r.ok ? r.json() : [])),
        fetch("/api/github").then((r) => (r.ok ? r.json() : null)),
        fetch("/api/portfolio").then((r) => (r.ok ? r.json() : null)),
      ]);

      if (analyticsRes.status === "fulfilled" && analyticsRes.value?.overview) {
        setAnalytics(analyticsRes.value);
      }
      if (certsRes.status === "fulfilled" && Array.isArray(certsRes.value)) {
        setCertificatesCount(certsRes.value.length);
      }
      if (githubRes.status === "fulfilled" && githubRes.value?.repos) {
        setGithubRepos(githubRes.value.repos.length);
      }
      if (portfolioRes.status === "fulfilled" && portfolioRes.value?.projects) {
        setProjectsCount(portfolioRes.value.projects.length);
      }
    } catch {
      setError("Failed to load analytics data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <AnalyticsSkeleton />;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertCircle className="w-10 h-10 text-red-400/70 mb-3" />
        <p className="text-gray-400 text-sm mb-4">{error}</p>
        <button
          onClick={fetchData}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/[0.08] text-gray-300 text-sm hover:bg-white/[0.08] transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
      </div>
    );
  }

  const completion = calculateProfileCompletion(settings);

  const latestExp = settings?.experiences?.length
    ? settings.experiences[settings.experiences.length - 1]
    : null;

  const skillsCount =
    (settings?.technical_skills?.core_technologies?.length ?? 0) +
    (settings?.technical_skills?.specializations?.length ?? 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="space-y-6"
    >
      {/* ─── Section Header ─── */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20">
          <TrendingUp className="w-5 h-5 text-purple-400" />
        </div>
        <h3 className="text-xl font-bold text-white">Analytics & Insights</h3>
      </div>

      {/* ─── Stat Cards Grid ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          icon={<Download className="w-4 h-4" />}
          label="Downloads"
          value={analytics?.overview?.resumeDownloads ?? 0}
          description="Resume downloads (30d)"
          color="cyan"
          gradient="from-cyan-500/20 to-cyan-500/5"
          border="border-cyan-500/20"
          text="text-cyan-400"
        />
        <StatCard
          icon={<Eye className="w-4 h-4" />}
          label="Views"
          value={analytics?.overview?.pageViews ?? 0}
          description="Page views (30d)"
          color="purple"
          gradient="from-purple-500/20 to-purple-500/5"
          border="border-purple-500/20"
          text="text-purple-400"
        />
        <StatCard
          icon={<Clock className="w-4 h-4" />}
          label="Visitors"
          value={analytics?.overview?.visitors ?? 0}
          description="Unique visitors (30d)"
          color="amber"
          gradient="from-amber-500/20 to-amber-500/5"
          border="border-amber-500/20"
          text="text-amber-400"
        />
        <ProfileCompletionCard percentage={completion} />
        <StatCard
          icon={<Code2 className="w-4 h-4" />}
          label="Skills"
          value={skillsCount}
          description="Technologies listed"
          color="emerald"
          gradient="from-emerald-500/20 to-emerald-500/5"
          border="border-emerald-500/20"
          text="text-emerald-400"
        />
        <StatCard
          icon={<FolderGit2 className="w-4 h-4" />}
          label="Projects"
          value={projectsCount}
          description="Published projects"
          color="cyan"
          gradient="from-cyan-500/20 to-cyan-500/5"
          border="border-cyan-500/20"
          text="text-cyan-400"
        />
        <StatCard
          icon={<Award className="w-4 h-4" />}
          label="Certificates"
          value={certificatesCount}
          description="Earned certifications"
          color="purple"
          gradient="from-purple-500/20 to-purple-500/5"
          border="border-purple-500/20"
          text="text-purple-400"
        />
        <StatCard
          icon={<Github className="w-4 h-4" />}
          label="Repos"
          value={githubRepos}
          description="Public repositories"
          color="emerald"
          gradient="from-emerald-500/20 to-emerald-500/5"
          border="border-emerald-500/20"
          text="text-emerald-400"
        />
      </div>

      {/* ─── Recent Updates ─── */}
      <RecentUpdatesCard
        latestExperience={latestExp ? { role: latestExp.role, company: latestExp.company, year: latestExp.year } : null}
        skillsCount={skillsCount}
        socialLinksCount={settings?.social_links?.filter((l) => l.visible).length ?? 0}
      />
    </motion.div>
  );
}

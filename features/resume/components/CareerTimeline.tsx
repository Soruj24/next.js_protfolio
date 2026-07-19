"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Lightbulb,
  FolderGit2,
  Award,
  Trophy,
  GitBranch,
  BookOpen,
  Calendar,
  ExternalLink,
  Loader2,
  RefreshCw,
  AlertCircle,
  Star,
  Users,
  Code2,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { usePortfolioSettings } from "@/hooks/usePortfolioSettings";

/* ─── Types ─── */
type Category =
  | "education"
  | "learning"
  | "projects"
  | "certifications"
  | "achievements"
  | "opensource"
  | "current_learning";

interface TimelineItem {
  id: string;
  date: string;
  sortDate: Date;
  title: string;
  subtitle?: string;
  description: string;
  category: Category;
  tags?: string[];
  link?: string;
  stats?: { label: string; value: string | number }[];
}

/* ─── Category Config ─── */
const CATEGORIES: Record<
  Category,
  { label: string; icon: React.ReactNode; color: string; bg: string; border: string; dot: string }
> = {
  education: {
    label: "Education",
    icon: <GraduationCap className="w-3.5 h-3.5" />,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    dot: "bg-indigo-400",
  },
  learning: {
    label: "Learning Journey",
    icon: <Lightbulb className="w-3.5 h-3.5" />,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    dot: "bg-amber-400",
  },
  projects: {
    label: "Projects",
    icon: <FolderGit2 className="w-3.5 h-3.5" />,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    dot: "bg-cyan-400",
  },
  certifications: {
    label: "Certifications",
    icon: <Award className="w-3.5 h-3.5" />,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    dot: "bg-emerald-400",
  },
  achievements: {
    label: "Achievements",
    icon: <Trophy className="w-3.5 h-3.5" />,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    dot: "bg-yellow-400",
  },
  opensource: {
    label: "Open Source",
    icon: <GitBranch className="w-3.5 h-3.5" />,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    dot: "bg-orange-400",
  },
  current_learning: {
    label: "Current Learning",
    icon: <BookOpen className="w-3.5 h-3.5" />,
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
    dot: "bg-pink-400",
  },
};

const ALL_CATEGORIES: Category[] = [
  "education",
  "learning",
  "projects",
  "certifications",
  "achievements",
  "opensource",
  "current_learning",
];

/* ─── Helpers ─── */
function parseYearToDate(yearStr: string): Date {
  const match = yearStr.match(/(\d{4})/);
  if (match) return new Date(parseInt(match[1]), 0, 1);
  return new Date(0);
}

function parsePeriodToDate(period: string): Date {
  const parts = period.split("-").map((s) => s.trim());
  const lastPart = parts[parts.length - 1];
  const yearMatch = lastPart.match(/(\d{4})/);
  if (yearMatch) return new Date(parseInt(yearMatch[1]), 0, 1);
  return new Date(0);
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

/* ─── Build Timeline Items ─── */
function buildTimelineItems(
  settings: ReturnType<typeof usePortfolioSettings>["settings"],
  projects: any[],
  certificates: any[],
  githubRepos: any[],
  githubJoinedAt: string
): TimelineItem[] {
  const items: TimelineItem[] = [];

  // ── Education ──
  (settings?.educations || []).forEach((edu, i) => {
    const sortDate = edu.period ? parsePeriodToDate(edu.period) : new Date(0);
    items.push({
      id: `edu-${i}`,
      date: edu.period || "",
      sortDate,
      title: edu.degree,
      subtitle: edu.institution,
      description: edu.description || `Studied at ${edu.institution}`,
      category: "education",
      tags: [],
    });
  });

  // ── Projects ──
  (projects || []).forEach((proj) => {
    const sortDate = proj.completionDate
      ? new Date(proj.completionDate)
      : proj.createdAt
      ? new Date(proj.createdAt)
      : new Date(0);
    const dateLabel = proj.completionDate
      ? formatDate(proj.completionDate)
      : proj.createdAt
      ? formatDate(proj.createdAt)
      : "";
    items.push({
      id: `proj-${proj._id || proj.id}`,
      date: dateLabel,
      sortDate,
      title: proj.title,
      subtitle: proj.category,
      description: proj.description || "",
      category: "projects",
      tags: (proj.technologies || []).slice(0, 6),
      link: proj.liveUrl || proj.githubUrl || undefined,
      stats: [
        proj.stats?.views && { label: "Views", value: proj.stats.views },
        proj.stats?.likes && { label: "Likes", value: proj.stats.likes },
      ].filter(Boolean) as { label: string; value: string | number }[],
    });
  });

  // ── Certifications ──
  (certificates || []).forEach((cert) => {
    const sortDate = cert.date ? new Date(cert.date) : new Date(0);
    items.push({
      id: `cert-${cert._id || cert.title}`,
      date: cert.date ? formatDate(cert.date) : "",
      sortDate,
      title: cert.title,
      subtitle: cert.issuer,
      description: cert.description || `Issued by ${cert.issuer}`,
      category: "certifications",
      tags: (cert.skills || []).slice(0, 5),
      link: cert.credentialUrl || undefined,
    });
  });

  // ── Achievements (derived from GitHub + project stats) ──
  const totalStars = (githubRepos || []).reduce((sum, r) => sum + (r.stars || 0), 0);
  const totalForks = (githubRepos || []).reduce((sum, r) => sum + (r.forks || 0), 0);
  const totalRepos = (githubRepos || []).length;

  if (totalStars > 0) {
    items.push({
      id: "ach-stars",
      date: "",
      sortDate: new Date(),
      title: `${totalStars} GitHub Stars`,
      subtitle: "Community recognition",
      description: `Earned ${totalStars} stars across ${totalRepos} public repositories`,
      category: "achievements",
      stats: [
        { label: "Stars", value: totalStars },
        { label: "Forks", value: totalForks },
        { label: "Repos", value: totalRepos },
      ],
    });
  }

  if (totalRepos >= 5) {
    items.push({
      id: "ach-repos",
      date: "",
      sortDate: new Date(Date.now() - 86400000),
      title: "Active Open Source Developer",
      subtitle: "Consistent contributor",
      description: `Maintaining ${totalRepos} public repositories with ongoing contributions`,
      category: "achievements",
    });
  }

  // ── Open Source (GitHub repos) ──
  (githubRepos || [])
    .filter((r) => !r.fork && !r.archived)
    .slice(0, 5)
    .forEach((repo) => {
      const sortDate = repo.createdAt ? new Date(repo.createdAt) : new Date(0);
      items.push({
        id: `os-${repo.name}`,
        date: repo.createdAt ? formatDate(repo.createdAt) : "",
        sortDate,
        title: repo.name,
        subtitle: repo.language || "Multi-language",
        description: repo.description || `Open source project built with ${repo.language || "multiple languages"}`,
        category: "opensource",
        tags: (repo.topics || []).slice(0, 4),
        link: repo.url,
        stats: [
          repo.stars > 0 && { label: "Stars", value: repo.stars },
          repo.forks > 0 && { label: "Forks", value: repo.forks },
        ].filter(Boolean) as { label: string; value: string | number }[],
      });
    });

  // ── Learning Journey (derived from skills + specializations) ──
  const coreTechs = settings?.technical_skills?.core_technologies || [];
  const specializations = settings?.technical_skills?.specializations || [];

  if (coreTechs.length > 0) {
    items.push({
      id: "learn-core",
      date: "",
      sortDate: new Date(Date.now() - 7 * 86400000),
      title: "Core Technologies",
      subtitle: "Technical foundation",
      description: `Proficient in ${coreTechs.length} core technologies including ${coreTechs.slice(0, 4).join(", ")}${coreTechs.length > 4 ? " and more" : ""}`,
      category: "learning",
      tags: coreTechs.slice(0, 6),
    });
  }

  if (specializations.length > 0) {
    items.push({
      id: "learn-spec",
      date: "",
      sortDate: new Date(Date.now() - 14 * 86400000),
      title: "Specializations",
      subtitle: "Deep expertise",
      description: `Specialized in ${specializations.length} key areas: ${specializations.join(", ")}`,
      category: "learning",
      tags: specializations.slice(0, 6),
    });
  }

  // ── Current Learning (recent GitHub activity) ──
  const recentRepos = (githubRepos || [])
    .filter((r) => {
      if (!r.pushedAt) return false;
      const pushed = new Date(r.pushedAt);
      const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000);
      return pushed > thirtyDaysAgo;
    })
    .slice(0, 3);

  recentRepos.forEach((repo) => {
    items.push({
      id: `cl-${repo.name}`,
      date: repo.pushedAt ? formatDate(repo.pushedAt) : "",
      sortDate: repo.pushedAt ? new Date(repo.pushedAt) : new Date(),
      title: repo.name,
      subtitle: repo.language || "Active project",
      description: repo.description || `Currently working on ${repo.name}`,
      category: "current_learning",
      tags: (repo.topics || []).slice(0, 3),
      link: repo.url,
    });
  });

  // If no recent activity, show a placeholder
  if (recentRepos.length === 0 && coreTechs.length > 0) {
    items.push({
      id: "cl-explore",
      date: "",
      sortDate: new Date(),
      title: "Exploring New Technologies",
      subtitle: "Continuous improvement",
      description: `Currently expanding skills in ${specializations.slice(0, 3).join(", ") || "modern web development"}`,
      category: "current_learning",
      tags: specializations.slice(0, 3),
    });
  }

  // ── GitHub Join Date ──
  if (githubJoinedAt) {
    items.push({
      id: "ach-joined",
      date: formatDate(githubJoinedAt),
      sortDate: new Date(githubJoinedAt),
      title: "Joined GitHub",
      subtitle: "The journey began",
      description: "Started the open source journey and began building in public",
      category: "achievements",
    });
  }

  return items;
}

/* ─── Timeline Card ─── */
function TimelineCard({ item, index }: { item: TimelineItem; index: number }) {
  const cat = CATEGORIES[item.category];
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -30 : 30, y: 10 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      className="relative group"
    >
      {/* Connector dot */}
      <div
        className={`absolute top-6 ${isLeft ? "right-0 -mr-[22px] lg:-mr-[26px]" : "left-0 -ml-[22px] lg:-ml-[26px]"} w-3 h-3 rounded-full ${cat.dot} border-2 border-[#0b1120] z-10 hidden md:block group-hover:scale-150 transition-transform duration-300`}
      />

      {/* Card */}
      <div
        className={`glass-card rounded-2xl p-5 sm:p-6 hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-500 ${isLeft ? "lg:mr-8" : "lg:ml-8"}`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md ${cat.bg} border ${cat.border} ${cat.color} text-[10px] font-semibold uppercase tracking-wider`}>
                {cat.icon}
                {cat.label}
              </span>
              {item.date && (
                <span className="text-[10px] text-gray-500 font-medium flex items-center gap-1">
                  <Calendar className="w-2.5 h-2.5" />
                  {item.date}
                </span>
              )}
            </div>
            <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-400 transition-colors leading-tight">
              {item.title}
            </h4>
            {item.subtitle && (
              <p className={`text-sm font-medium mt-0.5 ${cat.color}`}>{item.subtitle}</p>
            )}
          </div>
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 p-1.5 rounded-lg bg-white/5 border border-white/[0.06] text-gray-500 hover:text-cyan-400 hover:border-cyan-500/20 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-400 leading-relaxed mb-3">{item.description}</p>

        {/* Stats */}
        {item.stats && item.stats.length > 0 && (
          <div className="flex gap-4 mb-3">
            {item.stats.map((s) => (
              <div key={s.label} className="flex items-center gap-1.5">
                <span className="text-xs text-gray-500">{s.label}</span>
                <span className="text-xs font-bold text-white">{s.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md text-[11px] bg-white/5 text-gray-400 border border-white/[0.06] group-hover:bg-cyan-500/10 group-hover:text-cyan-300 group-hover:border-cyan-500/20 transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Mobile Timeline Card (single column) ─── */
function MobileTimelineCard({ item }: { item: TimelineItem }) {
  const cat = CATEGORIES[item.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      className="relative group pl-8"
    >
      {/* Dot */}
      <div className={`absolute left-[7px] top-6 w-3 h-3 rounded-full ${cat.dot} border-2 border-[#0b1120] z-10 group-hover:scale-150 transition-transform duration-300`} />

      {/* Card */}
      <div className="glass-card rounded-2xl p-4 sm:p-5 hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-500">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md ${cat.bg} border ${cat.border} ${cat.color} text-[10px] font-semibold uppercase tracking-wider`}>
                {cat.icon}
                {cat.label}
              </span>
            </div>
            <h4 className="text-sm sm:text-base font-bold text-white leading-tight">{item.title}</h4>
            {item.subtitle && (
              <p className={`text-xs font-medium mt-0.5 ${cat.color}`}>{item.subtitle}</p>
            )}
          </div>
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 p-1.5 rounded-lg bg-white/5 border border-white/[0.06] text-gray-500 hover:text-cyan-400 transition-all"
            >
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>

        <p className="text-xs text-gray-400 leading-relaxed mb-2">{item.description}</p>

        {item.stats && item.stats.length > 0 && (
          <div className="flex gap-3 mb-2">
            {item.stats.map((s) => (
              <div key={s.label} className="flex items-center gap-1">
                <span className="text-[10px] text-gray-500">{s.label}</span>
                <span className="text-[10px] font-bold text-white">{s.value}</span>
              </div>
            ))}
          </div>
        )}

        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-1.5 py-0.5 rounded text-[10px] bg-white/5 text-gray-400 border border-white/[0.06]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {item.date && (
          <div className="mt-2 flex items-center gap-1 text-[10px] text-gray-500">
            <Calendar className="w-2.5 h-2.5" />
            {item.date}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Skeleton ─── */
function TimelineSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-8 w-24 bg-white/5 rounded-lg animate-pulse shrink-0" />
        ))}
      </div>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-white/5 hidden md:block" />
        <div className="space-y-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="relative md:pl-12">
              <div className="absolute left-[13px] top-5 w-3 h-3 rounded-full bg-white/5 animate-pulse hidden md:block" />
              <div className="glass-card rounded-2xl p-6 animate-pulse">
                <div className="h-4 w-20 bg-white/5 rounded mb-3" />
                <div className="h-5 w-48 bg-white/5 rounded mb-2" />
                <div className="h-3 w-32 bg-white/5 rounded mb-3" />
                <div className="h-3 w-full bg-white/5 rounded mb-1" />
                <div className="h-3 w-3/4 bg-white/5 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function CareerTimeline() {
  const { settings } = usePortfolioSettings();
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");
  const [projects, setProjects] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [githubRepos, setGithubRepos] = useState<any[]>([]);
  const [githubJoinedAt, setGithubJoinedAt] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [portfolioRes, certsRes, githubRes] = await Promise.allSettled([
        fetch("/api/portfolio").then((r) => (r.ok ? r.json() : null)),
        fetch("/api/certificates").then((r) => (r.ok ? r.json() : [])),
        fetch("/api/github").then((r) => (r.ok ? r.json() : null)),
      ]);

      if (portfolioRes.status === "fulfilled" && portfolioRes.value?.projects) {
        setProjects(portfolioRes.value.projects);
      }
      if (certsRes.status === "fulfilled" && Array.isArray(certsRes.value)) {
        setCertificates(certsRes.value);
      }
      if (githubRes.status === "fulfilled") {
        setGithubRepos(githubRes.value?.repos || []);
        setGithubJoinedAt(githubRes.value?.profile?.joinedAt || "");
      }
    } catch {
      setError("Failed to load timeline data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const allItems = useMemo(
    () => buildTimelineItems(settings, projects, certificates, githubRepos, githubJoinedAt),
    [settings, projects, certificates, githubRepos, githubJoinedAt]
  );

  const filteredItems = useMemo(() => {
    const items = activeCategory === "all" ? allItems : allItems.filter((i) => i.category === activeCategory);
    return items.sort((a, b) => b.sortDate.getTime() - a.sortDate.getTime());
  }, [allItems, activeCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allItems.length };
    allItems.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, [allItems]);

  const activeCategories = useMemo(
    () => ALL_CATEGORIES.filter((c) => categoryCounts[c] && categoryCounts[c] > 0),
    [categoryCounts]
  );

  if (loading) return <TimelineSkeleton />;

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

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* ─── Section Header ─── */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
          <Sparkles className="w-5 h-5 text-cyan-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Career Timeline</h3>
          <p className="text-gray-500 text-xs sm:text-sm mt-0.5">A journey through milestones, projects, and growth</p>
        </div>
      </div>

      {/* ─── Category Filters ─── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex gap-2 overflow-x-auto pb-2 scrollbar-none -mx-1 px-1"
      >
        <button
          onClick={() => setActiveCategory("all")}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 shrink-0 ${
            activeCategory === "all"
              ? "bg-white/10 border border-white/20 text-white"
              : "bg-white/[0.03] border border-white/[0.06] text-gray-500 hover:text-gray-300 hover:bg-white/[0.06]"
          }`}
        >
          All
          <span className={`text-[10px] px-1.5 py-0 rounded-full ${activeCategory === "all" ? "bg-white/10" : "bg-white/5"}`}>
            {categoryCounts.all || 0}
          </span>
        </button>
        {activeCategories.map((cat) => {
          const config = CATEGORIES[cat];
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 shrink-0 ${
                isActive
                  ? `${config.bg} border ${config.border} ${config.color}`
                  : "bg-white/[0.03] border border-white/[0.06] text-gray-500 hover:text-gray-300 hover:bg-white/[0.06]"
              }`}
            >
              {config.icon}
              {config.label}
              <span className={`text-[10px] px-1.5 py-0 rounded-full ${isActive ? "bg-white/10" : "bg-white/5"}`}>
                {categoryCounts[cat] || 0}
              </span>
            </button>
          );
        })}
      </motion.div>

      {/* ─── Timeline ─── */}
      <AnimatePresence mode="wait">
        {filteredItems.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-sm">No items found for this category.</p>
          </motion.div>
        ) : (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Desktop: vertical line */}
            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/20 via-purple-500/10 to-transparent hidden md:block -translate-x-1/2" />

              {/* Desktop: alternating layout */}
              <div className="hidden md:block space-y-8">
                {filteredItems.map((item, idx) => {
                  const isLeft = idx % 2 === 0;
                  const cat = CATEGORIES[item.category];
                  return (
                    <div key={item.id} className="relative">
                      {/* Center dot */}
                      <div className={`absolute left-1/2 top-6 -translate-x-1/2 w-3 h-3 rounded-full ${cat.dot} border-2 border-[#0b1120] z-10 hover:scale-150 transition-transform duration-300`} />

                      <div className={`flex ${isLeft ? "justify-start" : "justify-end"}`}>
                        <div className={`w-[calc(50%-24px)] ${isLeft ? "pr-0" : "pl-0"}`}>
                          <TimelineCard item={item} index={idx} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mobile: single column */}
              <div className="md:hidden relative">
                <div className="absolute left-[13px] top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/20 via-purple-500/10 to-transparent" />
                <div className="space-y-5">
                  {filteredItems.map((item) => (
                    <MobileTimelineCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Summary Bar ─── */}
      {filteredItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 text-gray-500 text-xs"
        >
          <span>Showing {filteredItems.length} milestone{filteredItems.length !== 1 ? "s" : ""}</span>
          {activeCategory !== "all" && (
            <>
              <span className="text-gray-600">&middot;</span>
              <button
                onClick={() => setActiveCategory("all")}
                className="text-cyan-400/70 hover:text-cyan-400 transition-colors inline-flex items-center gap-1"
              >
                View all
                <ArrowRight className="w-3 h-3" />
              </button>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
}

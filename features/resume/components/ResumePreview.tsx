"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Printer,
  Maximize2,
  Minimize2,
  Link2,
  Share2,
  ZoomIn,
  ZoomOut,
  FileText,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Twitter,
  Loader2,
  Check,
  X,
  AlertCircle,
} from "lucide-react";
import { usePortfolioSettings } from "@/hooks/usePortfolioSettings";
import { toast } from "sonner";

const ZOOM_LEVELS = [50, 75, 100, 125, 150] as const;

const docVariants = {
  hidden: { opacity: 0, scale: 0.97, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, ease: "easeOut" as const } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" as const } },
};

const sheetVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.98,
    transition: { duration: 0.2, ease: "easeIn" as const },
  },
};

function estimatePageCount(settings: any): number {
  if (!settings) return 0;
  let chars = 0;
  chars += (settings.profile?.bio || "").length;
  chars += (settings.experiences || []).reduce(
    (sum: number, exp: any) =>
      sum + (exp.description || "").length + (exp.technologies || []).join("").length,
    0
  );
  chars += (settings.educations || []).reduce(
    (sum: number, edu: any) =>
      sum +
      (edu.degree || "").length +
      (edu.institution || "").length +
      (edu.description || "").length,
    0
  );
  chars += (settings.technical_skills?.core_technologies || []).join("").length;
  chars += (settings.technical_skills?.specializations || []).join("").length;
  if (chars > 6000) return 3;
  if (chars > 3500) return 2;
  return 1;
}

function ActionBar({
  pageCount,
  zoom,
  onZoomIn,
  onZoomOut,
  onDownload,
  onPrint,
  onFullscreen,
  onCopyLink,
  onShare,
  isFullscreen,
  copied,
}: {
  pageCount: number;
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onDownload: () => void;
  onPrint: () => void;
  onFullscreen: () => void;
  onCopyLink: () => void;
  onShare: () => void;
  isFullscreen: boolean;
  copied: boolean;
}) {
  return (
    <div className="resume-preview-toolbar flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
      <div className="flex items-center gap-1.5 text-xs text-gray-400 shrink-0">
        <FileText className="w-3.5 h-3.5" />
        <span className="tabular-nums">
          {pageCount} {pageCount === 1 ? "page" : "pages"}
        </span>
      </div>

      <div className="flex items-center gap-0.5">
        <button
          onClick={onZoomOut}
          disabled={zoom <= ZOOM_LEVELS[0]}
          className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          aria-label="Zoom out"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        <span className="text-xs text-gray-300 font-medium w-10 text-center tabular-nums select-none">
          {zoom}%
        </span>
        <button
          onClick={onZoomIn}
          disabled={zoom >= ZOOM_LEVELS[ZOOM_LEVELS.length - 1]}
          className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          aria-label="Zoom in"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex items-center gap-0.5 sm:gap-1">
        <button
          onClick={onDownload}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-cyan-500/20 border border-cyan-500/30 hover:bg-cyan-500/30 transition-all"
        >
          <Download className="w-3.5 h-3.5" />
          Download
        </button>
        <button
          onClick={onDownload}
          className="sm:hidden p-1.5 rounded-lg text-cyan-400 hover:bg-cyan-500/10 transition-all"
          aria-label="Download PDF"
        >
          <Download className="w-4 h-4" />
        </button>

        <button
          onClick={onPrint}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all"
        >
          <Printer className="w-3.5 h-3.5" />
          Print
        </button>
        <button
          onClick={onPrint}
          className="sm:hidden p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          aria-label="Print"
        >
          <Printer className="w-4 h-4" />
        </button>

        <button
          onClick={onFullscreen}
          className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          aria-label={isFullscreen ? "Exit fullscreen" : "Open fullscreen"}
        >
          {isFullscreen ? (
            <Minimize2 className="w-4 h-4" />
          ) : (
            <Maximize2 className="w-4 h-4" />
          )}
        </button>

        <button
          onClick={onCopyLink}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Link2 className="w-3.5 h-3.5" />
          )}
          {copied ? "Copied!" : "Copy Link"}
        </button>
        <button
          onClick={onCopyLink}
          className="sm:hidden p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          aria-label="Copy link"
        >
          {copied ? (
            <Check className="w-4 h-4 text-emerald-400" />
          ) : (
            <Link2 className="w-4 h-4" />
          )}
        </button>

        <button
          onClick={onShare}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all"
        >
          <Share2 className="w-3.5 h-3.5" />
          Share
        </button>
        <button
          onClick={onShare}
          className="sm:hidden p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          aria-label="Share"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function ResumeDocumentContent({ settings }: { settings: any }) {
  const personal = settings?.personal_info;
  const profile = settings?.profile;
  const experiences = settings?.experiences || [];
  const educations = settings?.educations || [];
  const technicalSkills = settings?.technical_skills;

  return (
    <div className="resume-doc-content bg-white text-gray-900 w-full p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col font-sans">
      <header className="mb-5">
        <h1 className="text-[22px] sm:text-[28px] font-black text-[#0f172a] tracking-tight leading-tight">
          {personal?.full_name || "Your Name"}
        </h1>
        <p className="text-[#2b4c7e] text-[13px] sm:text-[15px] font-semibold mt-1 tracking-wide">
          {personal?.professional_title || "Professional Title"}
        </p>
        <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1 mt-3 text-[10px] sm:text-[11px] text-gray-500">
          {personal?.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3 text-gray-400" />
              {personal.email}
            </span>
          )}
          {personal?.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-gray-400" />
              {personal.phone}
            </span>
          )}
          {personal?.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-gray-400" />
              {personal.location}
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1 mt-1 text-[10px] sm:text-[11px] text-gray-500">
          {personal?.linkedin && (
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-[#2b4c7e] transition-colors"
            >
              <Linkedin className="w-3 h-3" />
              LinkedIn
            </a>
          )}
          {personal?.github && (
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-[#2b4c7e] transition-colors"
            >
              <Github className="w-3 h-3" />
              GitHub
            </a>
          )}
          {personal?.twitter && (
            <a
              href={personal.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-[#2b4c7e] transition-colors"
            >
              <Twitter className="w-3 h-3" />
              Twitter / X
            </a>
          )}
        </div>
      </header>

      <div className="h-px bg-gradient-to-r from-[#2b4c7e]/25 via-[#2b4c7e]/10 to-transparent mb-5" />

      {profile?.bio && (
        <section className="mb-5">
          <h2 className="text-[9px] sm:text-[10px] font-bold text-[#2b4c7e] uppercase tracking-[0.18em] mb-2 flex items-center gap-2">
            <span className="w-[5px] h-[5px] rounded-full bg-[#2b4c7e]/60" />
            Professional Summary
          </h2>
          <p className="text-[11px] sm:text-[12px] text-gray-600 leading-[1.7] pl-[13px]">
            {profile.bio}
          </p>
        </section>
      )}

      {experiences.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[9px] sm:text-[10px] font-bold text-[#2b4c7e] uppercase tracking-[0.18em] mb-2.5 flex items-center gap-2">
            <span className="w-[5px] h-[5px] rounded-full bg-[#2b4c7e]/60" />
            Work Experience
          </h2>
          <div className="space-y-3.5 pl-[13px]">
            {experiences.map((exp: any, i: number) => (
              <div key={i} className="relative">
                <div className="absolute left-[-13px] top-[5px] w-[5px] h-[5px] rounded-full bg-[#2b4c7e]/40" />
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5">
                  <h3 className="text-[12px] sm:text-[13px] font-bold text-[#0f172a]">
                    {exp.role}
                  </h3>
                  <span className="text-[9px] sm:text-[10px] text-gray-400 font-medium tabular-nums shrink-0">
                    {exp.year}
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-[#2b4c7e] font-medium mt-0.5">
                  {exp.company}
                </p>
                <p className="text-[10px] sm:text-[11px] text-gray-500 mt-1 leading-[1.65]">
                  {exp.description}
                </p>
                {exp.technologies?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {exp.technologies.map((tech: string) => (
                      <span
                        key={tech}
                        className="px-[6px] py-[1px] rounded text-[8px] sm:text-[9px] bg-gray-100 text-gray-600 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {educations.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[9px] sm:text-[10px] font-bold text-[#2b4c7e] uppercase tracking-[0.18em] mb-2.5 flex items-center gap-2">
            <span className="w-[5px] h-[5px] rounded-full bg-[#2b4c7e]/60" />
            Education
          </h2>
          <div className="space-y-2.5 pl-[13px]">
            {educations.map((edu: any, i: number) => (
              <div key={i} className="relative">
                <div className="absolute left-[-13px] top-[5px] w-[5px] h-[5px] rounded-full bg-[#2b4c7e]/40" />
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5">
                  <h3 className="text-[12px] sm:text-[13px] font-bold text-[#0f172a]">
                    {edu.degree}
                  </h3>
                  {edu.period && (
                    <span className="text-[9px] sm:text-[10px] text-gray-400 font-medium tabular-nums shrink-0">
                      {edu.period}
                    </span>
                  )}
                </div>
                <p className="text-[10px] sm:text-[11px] text-[#2b4c7e] font-medium mt-0.5">
                  {edu.institution}
                </p>
                {edu.description && (
                  <p className="text-[10px] sm:text-[11px] text-gray-500 mt-0.5 leading-[1.65]">
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {technicalSkills && (
        <section>
          <h2 className="text-[9px] sm:text-[10px] font-bold text-[#2b4c7e] uppercase tracking-[0.18em] mb-2.5 flex items-center gap-2">
            <span className="w-[5px] h-[5px] rounded-full bg-[#2b4c7e]/60" />
            Technical Skills
          </h2>
          <div className="pl-[13px] space-y-2">
            {technicalSkills.core_technologies?.length > 0 && (
              <div>
                <p className="text-[9px] text-gray-400 font-semibold uppercase tracking-wider mb-1">
                  Core Technologies
                </p>
                <div className="flex flex-wrap gap-1">
                  {technicalSkills.core_technologies.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-[7px] py-[2px] rounded text-[9px] sm:text-[10px] bg-[#2b4c7e]/8 text-[#2b4c7e] font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {technicalSkills.specializations?.length > 0 && (
              <div>
                <p className="text-[9px] text-gray-400 font-semibold uppercase tracking-wider mb-1">
                  Specializations
                </p>
                <div className="flex flex-wrap gap-1">
                  {technicalSkills.specializations.map((spec: string) => (
                    <span
                      key={spec}
                      className="px-[7px] py-[2px] rounded text-[9px] sm:text-[10px] bg-gray-100 text-gray-600 font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.02]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
        <div className="h-4 w-16 rounded-md bg-white/5 animate-pulse" />
        <div className="h-4 w-24 rounded-md bg-white/5 animate-pulse" />
        <div className="flex gap-1.5">
          <div className="h-7 w-20 rounded-lg bg-white/5 animate-pulse" />
          <div className="h-7 w-16 rounded-lg bg-white/5 animate-pulse" />
        </div>
      </div>
      <div className="p-4 sm:p-6">
        <div className="bg-white rounded-lg p-6 sm:p-8 md:p-10 space-y-4">
          <div className="h-7 w-52 bg-gray-100 rounded-md animate-pulse" />
          <div className="h-4 w-36 bg-gray-100 rounded-md animate-pulse" />
          <div className="h-px bg-gray-200 my-5" />
          <div className="space-y-2.5">
            <div className="h-3 w-full bg-gray-100 rounded animate-pulse" />
            <div className="h-3 w-5/6 bg-gray-100 rounded animate-pulse" />
            <div className="h-3 w-3/4 bg-gray-100 rounded animate-pulse" />
          </div>
          <div className="h-px bg-gray-200 my-5" />
          <div className="space-y-3">
            <div className="flex justify-between">
              <div className="h-4 w-40 bg-gray-100 rounded animate-pulse" />
              <div className="h-3 w-24 bg-gray-100 rounded animate-pulse" />
            </div>
            <div className="h-3 w-full bg-gray-100 rounded animate-pulse" />
            <div className="h-3 w-2/3 bg-gray-100 rounded animate-pulse" />
          </div>
          <div className="h-px bg-gray-200 my-5" />
          <div className="flex gap-2 flex-wrap">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-6 rounded-md bg-gray-100 animate-pulse"
                style={{ width: `${50 + Math.random() * 40}px` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-12 sm:p-16 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/[0.06] mb-5">
        <FileText className="w-7 h-7 text-gray-500" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">No Resume Data</h3>
      <p className="text-sm text-gray-400 max-w-sm mx-auto leading-relaxed">
        Update your portfolio settings to display your professional resume here.
      </p>
    </div>
  );
}

function ErrorState() {
  return (
    <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-12 sm:p-16 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 mb-5">
        <AlertCircle className="w-7 h-7 text-red-400" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">Failed to Load</h3>
      <p className="text-sm text-gray-400 max-w-sm mx-auto leading-relaxed">
        Something went wrong while loading your resume data. Please try again.
      </p>
    </div>
  );
}

export default function ResumePreview() {
  const { settings, loading, error } = usePortfolioSettings();
  const [zoom, setZoom] = useState<number>(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);

  const pageCount = useMemo(() => estimatePageCount(settings), [settings]);

  const handleDownload = useCallback(async () => {
    try {
      const resumeUrl = `${window.location.origin}/resume`;
      const res = await fetch("/api/resume/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: resumeUrl }),
      });
      if (!res.ok) throw new Error("Failed to generate PDF");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "soruj-mahmud-resume.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("Resume downloaded successfully");
    } catch {
      toast.error("Failed to download resume. Please try again.");
    }
  }, []);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/resume`);
      setCopied(true);
      toast.success("Resume link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  }, []);

  const handleShare = useCallback(async () => {
    const data = {
      title: "Soruj Mahmud - Resume",
      text: "Check out Soruj Mahmud's professional resume",
      url: `${window.location.origin}/resume`,
    };
    try {
      if (navigator.share) {
        await navigator.share(data);
      } else {
        await navigator.clipboard.writeText(data.url);
        toast.success("Resume link copied to clipboard");
      }
    } catch {
      toast.error("Failed to share");
    }
  }, []);

  const handleZoomIn = useCallback(() => {
    setZoom((prev) => {
      const idx = ZOOM_LEVELS.indexOf(prev as (typeof ZOOM_LEVELS)[number]);
      return idx < ZOOM_LEVELS.length - 1 ? ZOOM_LEVELS[idx + 1] : prev;
    });
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => {
      const idx = ZOOM_LEVELS.indexOf(prev as (typeof ZOOM_LEVELS)[number]);
      return idx > 0 ? ZOOM_LEVELS[idx - 1] : prev;
    });
  }, []);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!isFullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFullscreen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isFullscreen]);

  if (loading) return <LoadingSkeleton />;
  if (error || !settings) return error ? <ErrorState /> : <EmptyState />;

  const documentContent = <ResumeDocumentContent settings={settings} />;

  const actionBarProps = {
    pageCount,
    zoom,
    onZoomIn: handleZoomIn,
    onZoomOut: handleZoomOut,
    onDownload: handleDownload,
    onPrint: handlePrint,
    onFullscreen: toggleFullscreen,
    onCopyLink: handleCopyLink,
    onShare: handleShare,
    isFullscreen,
    copied,
  };

  return (
    <>
      <motion.div
        variants={docVariants}
        initial="hidden"
        animate="visible"
        className="resume-preview rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
      >
        <ActionBar {...actionBarProps} />
        <div className="resume-preview-scroll overflow-auto max-h-[60vh] sm:max-h-[68vh]">
          <div className="flex justify-center p-3 sm:p-5 md:p-6 lg:p-8">
            <div
              className="w-full max-w-[700px] bg-white rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.04),0_16px_48px_rgba(0,0,0,0.1)] transition-[width] duration-200 ease-out"
              style={{ zoom: zoom / 100 }}
            >
              {documentContent}
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isFullscreen &&
          createPortal(
            <motion.div
              key="resume-fullscreen-overlay"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-50 flex flex-col bg-[#08080c]/95 backdrop-blur-xl"
              role="dialog"
              aria-modal="true"
              aria-label="Resume fullscreen preview"
            >
              <div className="flex-shrink-0 border-b border-white/[0.08] bg-[#08080c]/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 px-4 py-2.5">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 shrink-0">
                    <FileText className="w-3.5 h-3.5" />
                    <span className="tabular-nums">
                      {pageCount} {pageCount === 1 ? "page" : "pages"}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={handleZoomOut}
                      disabled={zoom <= ZOOM_LEVELS[0]}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      aria-label="Zoom out"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <span className="text-xs text-gray-300 font-medium w-12 text-center tabular-nums select-none">
                      {zoom}%
                    </span>
                    <button
                      onClick={handleZoomIn}
                      disabled={zoom >= ZOOM_LEVELS[ZOOM_LEVELS.length - 1]}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      aria-label="Zoom in"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-0.5 sm:gap-1">
                    <button
                      onClick={handleDownload}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-cyan-500/20 border border-cyan-500/30 hover:bg-cyan-500/30 transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Download</span>
                    </button>
                    <button
                      onClick={handlePrint}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Print</span>
                    </button>
                    <button
                      onClick={handleCopyLink}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                    >
                      {copied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Link2 className="w-3.5 h-3.5" />
                      )}
                      <span className="hidden sm:inline">
                        {copied ? "Copied!" : "Copy Link"}
                      </span>
                    </button>
                    <button
                      onClick={handleShare}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Share</span>
                    </button>
                    <div className="w-px h-5 bg-white/10 mx-1 hidden sm:block" />
                    <button
                      onClick={toggleFullscreen}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                      aria-label="Exit fullscreen"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-auto">
                <motion.div
                  variants={sheetVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex justify-center p-4 sm:p-6 md:p-10 min-h-full"
                >
                  <div
                    className="w-full max-w-[900px] bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)] transition-[width] duration-200 ease-out"
                    style={{ zoom: zoom / 100 }}
                  >
                    {documentContent}
                  </div>
                </motion.div>
              </div>
            </motion.div>,
            document.body
          )}
      </AnimatePresence>
    </>
  );
}

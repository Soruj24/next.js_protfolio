"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/shared/SectionTitle";
import ResumePreview from "@/features/resume/components/ResumePreview";
import ResumeAnalytics from "@/features/resume/components/ResumeAnalytics";
import CareerTimeline from "@/features/resume/components/CareerTimeline";
import {
  Briefcase,
  GraduationCap,
  MapPin,
  Calendar,
  Clock,
  Code2,
  User,
  ExternalLink,
  Loader2,
  Zap,
  Globe,
  Mail,
  Phone,
  Linkedin,
  Github,
  Twitter,
  Building2,
  ChevronRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { usePortfolioSettings } from "@/hooks/usePortfolioSettings";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

export default function ResumeCenter() {
  const { settings, loading } = usePortfolioSettings();

  const personal = settings?.personal_info;
  const profile = settings?.profile;
  const technicalSkills = settings?.technical_skills;
  const experiences = settings?.experiences || [];
  const educations = settings?.educations || [];

  const yearsOfExperience = (() => {
    if (experiences.length === 0) return "3+";
    const sorted = [...experiences].sort((a, b) => {
      const yearA = parseInt(a.year?.split("-")[0] || "2022");
      const yearB = parseInt(b.year?.split("-")[0] || "2022");
      return yearA - yearB;
    });
    const firstYear = parseInt(sorted[0]?.year?.split("-")[0] || "2022");
    const lastYear = parseInt(
      sorted[sorted.length - 1]?.year?.split("-").pop()?.split(" ")[0] || new Date().getFullYear().toString()
    );
    const years = lastYear - firstYear;
    return years > 0 ? `${years}+` : "1+";
  })();

  const currentRole = experiences.length > 0 ? experiences[experiences.length - 1].role : "Front-End Developer";
  const currentCompany = experiences.length > 0 ? experiences[experiences.length - 1].company : "";
  const socialLinks = settings?.social_links?.filter((l) => l.visible) || [];

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <Loader2 size={28} className="text-cyan-400 animate-spin" />
      </section>
    );
  }

  return (
    <section
      id="resume"
      className="min-h-screen py-20 md:py-28 relative overflow-hidden resume-page"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionTitle
          title="Resume Center"
          subtitle="A professional hub for my credentials, experience, and technical expertise."
        />

        {/* ─── Quick Stats Row ─── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12 sm:mb-16"
        >
          {[
            {
              icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5" />,
              label: "Experience",
              value: `${yearsOfExperience} Years`,
              color: "cyan",
              gradient: "from-cyan-500/20 to-cyan-500/5",
              border: "border-cyan-500/20",
              text: "text-cyan-400",
            },
            {
              icon: <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />,
              label: "Current Role",
              value: currentRole,
              color: "purple",
              gradient: "from-purple-500/20 to-purple-500/5",
              border: "border-purple-500/20",
              text: "text-purple-400",
            },
            {
              icon: <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />,
              label: "Availability",
              value: profile?.availability || "Open to Work",
              color: "emerald",
              gradient: "from-emerald-500/20 to-emerald-500/5",
              border: "border-emerald-500/20",
              text: "text-emerald-400",
            },
            {
              icon: <Globe className="w-4 h-4 sm:w-5 sm:h-5" />,
              label: "Work Type",
              value: "Remote / Hybrid",
              color: "amber",
              gradient: "from-amber-500/20 to-amber-500/5",
              border: "border-amber-500/20",
              text: "text-amber-400",
            },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={scaleIn}
              className={`relative group glass-card rounded-2xl p-4 sm:p-5 hover:bg-white/[0.06] transition-all duration-500 cursor-default overflow-hidden`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-b ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
              <div className="relative z-10">
                <div
                  className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border ${stat.border} ${stat.text} mb-3`}
                >
                  {stat.icon}
                  <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
                <p className="text-white font-semibold text-sm sm:text-base leading-tight">
                  {stat.value}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ─── Location & Last Updated Bar ─── */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap items-center gap-4 sm:gap-6 mb-12 sm:mb-16 px-1"
        >
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <MapPin className="w-4 h-4 text-cyan-400/70" />
            <span>{personal?.location || "Bangladesh"}</span>
          </div>
          <div className="h-4 w-px bg-white/10 hidden sm:block" />
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Clock className="w-4 h-4 text-purple-400/70" />
            <span>Last updated: {new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>
          </div>
          <div className="h-4 w-px bg-white/10 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
            </span>
            <span className="text-emerald-400 text-sm font-medium">{profile?.availability || "Available"}</span>
          </div>
        </motion.div>

        {/* ─── Main Content: Summary + Preview ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {/* Professional Summary (2 cols) */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <motion.div variants={fadeIn} className="glass-card rounded-2xl p-6 sm:p-8 glow-border">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                  <User className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Professional Summary</h3>
              </div>
              <p className="text-gray-300 text-sm sm:text-[15px] leading-relaxed">
                {profile?.bio ||
                  `Results-driven ${personal?.professional_title || "Front-End Developer"} with ${yearsOfExperience} years of experience crafting high-performance web applications. Passionate about clean architecture, seamless user experiences, and modern development practices.`}
              </p>

              {currentCompany && (
                <div className="mt-6 pt-5 border-t border-white/[0.06]">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-medium">Currently at</p>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                      <Building2 className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">{currentCompany}</p>
                      <p className="text-gray-500 text-xs">{currentRole}</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Contact Card */}
            <motion.div variants={fadeIn} className="glass-card rounded-2xl p-6 sm:p-8 glow-border">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                  <Mail className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Contact</h3>
              </div>
              <div className="space-y-3">
                {personal?.email && (
                  <a
                    href={`mailto:${personal.email}`}
                    className="flex items-center gap-3 text-sm text-gray-300 hover:text-cyan-400 transition-colors group"
                  >
                    <Mail className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors shrink-0" />
                    <span className="truncate">{personal.email}</span>
                  </a>
                )}
                {personal?.phone && (
                  <a
                    href={`tel:${personal.phone}`}
                    className="flex items-center gap-3 text-sm text-gray-300 hover:text-cyan-400 transition-colors group"
                  >
                    <Phone className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors shrink-0" />
                    <span>{personal.phone}</span>
                  </a>
                )}
                {personal?.linkedin && (
                  <a
                    href={personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-gray-300 hover:text-cyan-400 transition-colors group"
                  >
                    <Linkedin className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors shrink-0" />
                    <span>LinkedIn</span>
                    <ExternalLink className="w-3 h-3 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                  </a>
                )}
                {personal?.github && (
                  <a
                    href={personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-gray-300 hover:text-cyan-400 transition-colors group"
                  >
                    <Github className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors shrink-0" />
                    <span>GitHub</span>
                    <ExternalLink className="w-3 h-3 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                  </a>
                )}
                {personal?.twitter && (
                  <a
                    href={personal.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-gray-300 hover:text-cyan-400 transition-colors group"
                  >
                    <Twitter className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors shrink-0" />
                    <span>Twitter / X</span>
                    <ExternalLink className="w-3 h-3 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Resume Preview (3 cols) */}
          <div className="lg:col-span-3">
            <ResumePreview />
          </div>
        </div>

        {/* ─── Experience Timeline ─── */}
        {experiences.length > 0 && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12 sm:mb-16"
          >
            <motion.div variants={fadeIn} className="flex items-center gap-3 mb-8">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                <Briefcase className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Experience</h3>
              <span className="ml-auto text-xs text-gray-500 font-medium">
                {experiences.length} {experiences.length === 1 ? "role" : "roles"}
              </span>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-cyan-500/30 via-purple-500/20 to-transparent hidden sm:block" />

              <div className="space-y-4 sm:space-y-5">
                {experiences.map((exp, idx) => (
                  <motion.div
                    key={idx}
                    variants={fadeIn}
                    className="group relative sm:pl-10"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-[11px] top-5 w-[9px] h-[9px] rounded-full bg-cyan-400 border-2 border-[#0f172a] z-10 hidden sm:block group-hover:scale-125 transition-transform" />

                    <div className="glass-card rounded-2xl p-5 sm:p-6 hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-500">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                        <div>
                          <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                            {exp.role}
                          </h4>
                          <p className="text-cyan-400 font-medium text-sm mt-0.5">{exp.company}</p>
                        </div>
                        <span className="text-xs text-gray-500 font-medium shrink-0 flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" />
                          {exp.year}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 leading-relaxed mb-3">{exp.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-lg text-xs bg-white/5 text-gray-400 border border-white/[0.06] group-hover:bg-cyan-500/10 group-hover:text-cyan-300 group-hover:border-cyan-500/20 transition-all duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ─── Education + Skills Grid ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {/* Education */}
          {educations.length > 0 && (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeIn} className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20">
                  <GraduationCap className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Education</h3>
              </motion.div>

              <div className="space-y-4">
                {educations.map((edu, idx) => (
                  <motion.div
                    key={idx}
                    variants={fadeIn}
                    className="glass-card rounded-2xl p-5 sm:p-6 hover:bg-white/[0.06] hover:border-purple-500/20 transition-all duration-500"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <h4 className="text-base font-bold text-white">{edu.degree}</h4>
                      {edu.period && (
                        <span className="text-xs text-gray-500 font-medium shrink-0 flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" />
                          {edu.period}
                        </span>
                      )}
                    </div>
                    <p className="text-purple-400 font-medium text-sm">{edu.institution}</p>
                    {edu.description && (
                      <p className="text-sm text-gray-400 mt-2 leading-relaxed">{edu.description}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Technical Skills */}
          {technicalSkills && (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeIn} className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <Code2 className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Technical Skills</h3>
              </motion.div>

              <div className="space-y-4">
                {/* Core Technologies */}
                {technicalSkills.core_technologies?.length > 0 && (
                  <motion.div variants={fadeIn} className="glass-card rounded-2xl p-5 sm:p-6">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-[0.15em] mb-4">
                      Core Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {technicalSkills.core_technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 rounded-xl text-sm bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Specializations */}
                {technicalSkills.specializations?.length > 0 && (
                  <motion.div variants={fadeIn} className="glass-card rounded-2xl p-5 sm:p-6">
                    <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-[0.15em] mb-4">
                      Specializations
                    </h4>
                    <div className="space-y-2.5">
                      {technicalSkills.specializations.map((spec) => (
                        <div
                          key={spec}
                          className="flex items-center gap-3 text-sm text-gray-300 group"
                        >
                          <ChevronRight className="w-3.5 h-3.5 text-cyan-400/60 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Social Links */}
                {socialLinks.length > 0 && (
                  <motion.div variants={fadeIn} className="glass-card rounded-2xl p-5 sm:p-6">
                    <h4 className="text-xs font-bold text-purple-400 uppercase tracking-[0.15em] mb-4">
                      Connect
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {socialLinks.map((link) => (
                        <a
                          key={link.platform}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/[0.05] transition-all group"
                        >
                          <span className="truncate">{link.platform}</span>
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ml-auto shrink-0" />
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </div>

        {/* ─── Analytics & Insights ─── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12 sm:mb-16"
        >
          <ResumeAnalytics />
        </motion.div>

        {/* ─── Career Timeline ─── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12 sm:mb-16"
        >
          <CareerTimeline />
        </motion.div>

        {/* ─── Bottom Accent ─── */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-gray-500 text-xs">
            <Sparkles className="w-3 h-3" />
            <span>Built with precision &amp; care</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

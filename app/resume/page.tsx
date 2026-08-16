import {
  Github,
  Globe,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Home,
} from "lucide-react";
import Link from "next/link";
import ResumeDownloadButton from "@/components/ResumeDownloadButton";
import { buildResumeData } from "@/lib/resume/resume-mapper";

export const dynamic = "force-dynamic";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-emerald-800">
        {children}
      </span>
      <span className="h-px flex-1 bg-stone-200" />
    </div>
  );
}

export default async function ResumePage() {
  const data = await buildResumeData();

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-slate-50 text-stone-800 dark:bg-[#030712]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 dark:hidden bg-[linear-gradient(180deg,#f8fafc_0%,#f5f7fb_42%,#eef2ff_100%)]" />
        <div className="absolute inset-0 hidden dark:block bg-[linear-gradient(180deg,#030712_0%,#020617_46%,#0f172a_100%)]" />

        <div className="absolute inset-0 dark:hidden bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.10),transparent_34%),radial-gradient(circle_at_85%_18%,rgba(139,92,246,0.08),transparent_28%),radial-gradient(circle_at_18%_82%,rgba(59,130,246,0.06),transparent_24%)]" />
        <div className="absolute inset-0 hidden dark:block bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.12),transparent_34%),radial-gradient(circle_at_85%_18%,rgba(139,92,246,0.10),transparent_28%),radial-gradient(circle_at_18%_82%,rgba(59,130,246,0.08),transparent_24%)]" />

        <div className="absolute left-[12%] top-20 h-72 w-72 rounded-full bg-cyan-400/10 blur-[120px] animate-glow-pulse dark:bg-cyan-500/10" />
        <div className="absolute right-[10%] top-[18%] h-80 w-80 rounded-full bg-violet-400/10 blur-[140px] animate-glow-pulse dark:bg-violet-500/12" />
        <div className="absolute bottom-12 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-400/8 blur-[140px] animate-glow-pulse dark:bg-blue-500/10" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.06)_1px,transparent_1px)] bg-[size:72px_72px] opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_38%,transparent_82%)] dark:bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] dark:opacity-100" />

        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.025]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.7\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          }}
        />
      </div>

      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <div className="relative isolate">
          <div className="absolute -inset-x-4 -inset-y-6 rounded-[32px] border border-black/5 bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(248,250,252,0.92))] shadow-[0_24px_80px_rgba(15,23,42,0.10),0_8px_30px_rgba(15,23,42,0.06)] backdrop-blur-2xl dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(250,250,249,0.92),rgba(245,245,244,0.88))] dark:shadow-[0_40px_120px_rgba(2,6,23,0.65),0_0_0_1px_rgba(255,255,255,0.03)]" />
          <div className="absolute -inset-x-4 -inset-y-6 rounded-[32px] bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.06),transparent_38%),radial-gradient(circle_at_100%_0%,rgba(139,92,246,0.05),transparent_28%)] dark:bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.10),transparent_40%),radial-gradient(circle_at_100%_0%,rgba(139,92,246,0.08),transparent_30%)]" />

          <div className="relative">
            {/* Header */}
            <header className="mb-16 border-b border-stone-200 pb-10">
              <div className="flex items-center justify-between gap-4 mb-3">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full border border-stone-300 text-stone-700 text-sm font-medium px-4 py-2 hover:bg-stone-100 transition-colors shrink-0"
                >
                  <Home size={16} />
                  Home
                </Link>

                <ResumeDownloadButton />
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl text-stone-900 tracking-tight mb-2">
                {data.name}
              </h1>
              <p className="text-emerald-800 font-semibold text-lg mb-1">
                {data.headline}
              </p>
              {data.subline && (
                <p className="text-stone-500 text-sm italic mb-6">
                  {data.subline}
                </p>
              )}

              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-500">
                {data.location && (
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={14} /> {data.location}
                  </span>
                )}
                {data.email && (
                  <Link
                    href={`mailto:${data.email}`}
                    className="inline-flex items-center gap-1.5 hover:text-emerald-800"
                  >
                    <Mail size={14} /> {data.email}
                  </Link>
                )}
                {data.phone && (
                  <span className="inline-flex items-center gap-1.5">
                    <Phone size={14} /> {data.phone}
                  </span>
                )}
                {data.github && (
                  <Link
                    href={data.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-emerald-800"
                  >
                    <Github size={14} /> GitHub
                  </Link>
                )}
                {data.portfolio && (
                  <Link
                    href={data.portfolio}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-emerald-800"
                  >
                    <Globe size={14} /> Portfolio
                  </Link>
                )}
                {data.linkedin && (
                  <Link
                    href={data.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-emerald-800"
                  >
                    <Linkedin size={14} /> LinkedIn
                  </Link>
                )}
              </div>
            </header>

            {/* Professional Summary */}
            <section className="mb-14">
              <SectionLabel>Professional Summary</SectionLabel>
              {data.summary.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-[15px] leading-relaxed text-stone-600 mb-4"
                >
                  {paragraph}
                </p>
              ))}
            </section>

            {/* Technical Skills */}
            {data.skills.length > 0 && (
              <section className="mb-14">
                <SectionLabel>Technical Skills</SectionLabel>
                <div className="divide-y divide-stone-200 border-y border-stone-200">
                  {data.skills.map((s) => (
                    <div
                      key={s.label}
                      className="grid grid-cols-[110px_1fr] gap-4 py-3 text-sm"
                    >
                      <span className="font-mono text-[12px] text-amber-700 pt-0.5">
                        {s.label}
                      </span>
                      <span className="text-stone-600 leading-relaxed">
                        {s.items}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {data.projects.length > 0 && (
              <section className="mb-14">
                <SectionLabel>Projects</SectionLabel>
                <div className="space-y-8">
                  {data.projects.map((p, idx) => (
                    <div key={p.title} className="relative pl-14">
                      <span className="absolute left-0 top-0 font-serif text-3xl text-stone-200 select-none">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div className="flex items-start justify-between gap-4 mb-1.5">
                        <h3 className="font-serif text-xl text-stone-900">
                          {p.title}
                        </h3>
                        <div className="flex gap-2 shrink-0">
                          {p.githubUrl && (
                            <a
                              href={p.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs text-stone-400 hover:text-emerald-800 underline"
                            >
                              GitHub
                            </a>
                          )}
                          {p.liveUrl && (
                            <a
                              href={p.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs text-stone-400 hover:text-emerald-800 underline"
                            >
                              Live Demo
                            </a>
                          )}
                          {p.documentationUrl && (
                            <a
                              href={p.documentationUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs text-stone-400 hover:text-emerald-800 underline"
                            >
                              Docs
                            </a>
                          )}
                          {p.caseStudyUrl && (
                            <a
                              href={p.caseStudyUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs text-stone-400 hover:text-emerald-800 underline"
                            >
                              Case Study
                            </a>
                          )}
                          {p.demoVideoUrl && (
                            <a
                              href={p.demoVideoUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs text-stone-400 hover:text-emerald-800 underline"
                            >
                              Video
                            </a>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-stone-600 leading-relaxed mb-3">
                        {p.desc}
                      </p>
                      {p.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {p.tags.map((t) => (
                            <span
                              key={t}
                              className="text-[11px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-0.5"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                      {p.stack && (
                        <p className="text-[12.5px] text-stone-400 font-mono">
                          {p.stack}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {data.education.length > 0 && (
              <section className="mb-14">
                <SectionLabel>Education</SectionLabel>
                <div className="grid sm:grid-cols-2 gap-6 text-sm">
                  {data.education.map((edu) => (
                    <div key={edu.title}>
                      <p className="font-medium text-stone-800">{edu.title}</p>
                      <p className="text-stone-500">{edu.institute}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Core Competencies & Languages */}
            <section>
              {data.competencies.length > 0 && (
                <>
                  <SectionLabel>Core Competencies</SectionLabel>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {data.competencies.map((c) => (
                      <span
                        key={c}
                        className="text-xs text-stone-500 border border-stone-200 rounded-full px-3 py-1"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </>
              )}
              {data.languages.length > 0 && (
                <>
                  <SectionLabel>Languages</SectionLabel>
                  <div className="flex flex-wrap gap-2">
                    {data.languages.map((lang) => (
                      <span
                        key={lang}
                        className="text-xs text-stone-500 border border-stone-200 rounded-full px-3 py-1"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

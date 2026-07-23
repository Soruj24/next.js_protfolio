import {
  Github,
  Globe,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Download,
  Home,
} from "lucide-react";
import Link from "next/link";

const skills = [
  {
    label: "Frontend",
    items:
      "Next.js (App Router), React.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Redux Toolkit, React Hook Form, Zod, Framer Motion",
  },
  {
    label: "Backend",
    items:
      "Node.js, Express.js, REST API Development, JWT Authentication, Role-Based Access Control",
  },
  { label: "Database", items: "MongoDB, Mongoose, Vector Databases" },
  {
    label: "AI",
    items:
      "LangChain, LangGraph, DeepAgent, MCP Server, AI SDK, LLM Integration, RAG, Prompt Engineering",
  },
  { label: "Real-Time", items: "Socket.io, WebRTC, Live Chat Systems" },
  {
    label: "Tools",
    items: "Git, GitHub, VS Code, Postman, npm, Vercel, Render",
  },
];

const projects = [
  {
    n: "01",
    title: "Enterprise E-Commerce Platform",
    desc: "Full-stack e-commerce platform with authentication, product management, shopping cart, wishlist, order management, and secure REST APIs.",
    tags: [
      "Authentication",
      "Search & Filtering",
      "Cart & Checkout",
      "Admin Dashboard",
    ],
    stack:
      "Next.js · Redux Toolkit · TypeScript · Tailwind CSS · Express.js · MongoDB · JWT · Cloudinary",
  },
  {
    n: "02",
    title: "Real-Time Messaging Platform",
    desc: "Chat application with real-time messaging, typing indicators, online presence, image sharing, and a scalable backend architecture.",
    tags: ["Socket.io", "Presence & Typing", "Image Upload", "Authentication"],
    stack:
      "Next.js · Socket.io · Express.js · MongoDB · Redux Toolkit · TypeScript · Tailwind CSS",
  },
  {
    n: "03",
    title: "AI SaaS Platform",
    desc: "AI-powered application integrating LLMs via LangChain, LangGraph, DeepAgent, and MCP Server, backed by vector search for intelligent workflows.",
    tags: ["RAG", "AI Agents", "MCP Integration", "Streaming Responses"],
    stack:
      "Next.js · LangChain · LangGraph · DeepAgent · MCP Server · Vector DB · Express.js · MongoDB · AI SDK · TypeScript",
  },
];

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

export default function ResumePage() {
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
            {/* ---------------- Header ---------------- */}
            <header className="mb-16 border-b border-stone-200 pb-10">
              <div className="flex items-center justify-between gap-4 mb-3">
                {/* FIXED: Home now correctly points to "/" instead of the PDF path */}
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full border border-stone-300 text-stone-700 text-sm font-medium px-4 py-2 hover:bg-stone-100 transition-colors shrink-0"
                >
                  <Home size={16} />
                  Home
                </Link>

                {/* FIXED: removed target="_blank" — not needed alongside `download` */}
                <Link
                  href="/api/resume-pdf"
                  download="Soruj_Mahmud_Resume.pdf"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-800 text-white text-sm font-medium px-5 py-2.5 hover:bg-emerald-900 active:scale-[0.98] transition-all shadow-sm"
                >
                  <Download size={16} />
                  Download Resume
                </Link>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl text-stone-900 tracking-tight mb-2">
                Soruj Mahmud
              </h1>
              <p className="text-emerald-800 font-medium mb-6">
                Frontend Developer · Full-Stack JavaScript Developer · AI
                Application Developer
              </p>

              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-500">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={14} /> Tangail, Dhaka, Bangladesh
                </span>
                <Link
                  href="mailto:sorujmahmudb2h@gmail.com"
                  className="inline-flex items-center gap-1.5 hover:text-emerald-800"
                >
                  <Mail size={14} /> sorujmahmudb2h@gmail.com
                </Link>
                <span className="inline-flex items-center gap-1.5">
                  <Phone size={14} /> +8801795397598
                </span>
                <Link
                  href="https://github.com/Soruj24"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-emerald-800"
                >
                  <Github size={14} /> GitHub
                </Link>
                <Link
                  href="https://soruj24.github.io"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-emerald-800"
                >
                  <Globe size={14} /> Portfolio
                </Link>
                <Link
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-emerald-800"
                >
                  <Linkedin size={14} /> LinkedIn
                </Link>
              </div>
            </header>

            {/* ---------------- Summary ---------------- */}
            <section className="mb-14">
              <SectionLabel>Summary</SectionLabel>
              <p className="text-[15px] leading-relaxed text-stone-600 mb-4">
                Motivated Frontend Developer with expertise in modern JavaScript
                technologies including Next.js, React, TypeScript, Redux Toolkit,
                and Tailwind CSS. Experienced in building scalable full-stack
                applications using Express.js and MongoDB while integrating AI
                technologies such as LangChain, LangGraph, DeepAgent, MCP Servers,
                Vector Databases, and WebRTC.
              </p>
              <p className="text-[15px] leading-relaxed text-stone-600">
                Passionate about creating high-performance, responsive,
                user-friendly applications, with a strong grasp of software
                architecture, authentication, state management, API design,
                real-time communication, and AI-powered features.
              </p>
            </section>

            {/* ---------------- Skills ---------------- */}
            <section className="mb-14">
              <SectionLabel>Technical Skills</SectionLabel>
              <div className="divide-y divide-stone-200 border-y border-stone-200">
                {skills.map((s) => (
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

            {/* ---------------- Projects ---------------- */}
            <section className="mb-14">
              <SectionLabel>Projects</SectionLabel>
              <div className="space-y-8">
                {projects.map((p) => (
                  <div key={p.n} className="relative pl-14">
                    <span className="absolute left-0 top-0 font-serif text-3xl text-stone-200 select-none">
                      {p.n}
                    </span>
                    <h3 className="font-serif text-xl text-stone-900 mb-1.5">
                      {p.title}
                    </h3>
                    <p className="text-sm text-stone-600 leading-relaxed mb-3">
                      {p.desc}
                    </p>
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
                    <p className="text-[12.5px] text-stone-400 font-mono">
                      {p.stack}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* ---------------- Education ---------------- */}
            <section className="mb-14">
              <SectionLabel>Education</SectionLabel>
              <div className="grid sm:grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="font-medium text-stone-800">
                    Higher Secondary Certificate (HSC) — Science
                  </p>
                  <p className="text-stone-500">
                    Nagarpur Government College, Tangail, Bangladesh
                  </p>
                </div>
                <div>
                  <p className="font-medium text-stone-800">
                    Secondary School Certificate (SSC) — Science
                  </p>
                  <p className="text-stone-500">Bangladesh</p>
                </div>
              </div>
            </section>

            {/* ---------------- Competencies / Soft Skills / Languages ---------------- */}
            <section>
              <SectionLabel>Competencies &amp; Languages</SectionLabel>
              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  "Frontend Development",
                  "Full-Stack JavaScript",
                  "AI Application Development",
                  "REST API Development",
                  "Real-Time Communication",
                  "Responsive Web Design",
                  "State Management",
                  "AI Agent Development",
                  "Software Architecture",
                ].map((c) => (
                  <span
                    key={c}
                    className="text-xs text-stone-500 border border-stone-200 rounded-full px-3 py-1"
                  >
                    {c}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-stone-500 border border-stone-200 rounded-full px-3 py-1">
                  Bengali — Native
                </span>
                <span className="text-xs text-stone-500 border border-stone-200 rounded-full px-3 py-1">
                  English — Professional Working Proficiency
                </span>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

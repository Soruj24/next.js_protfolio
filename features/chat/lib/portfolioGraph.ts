import { StateGraph, Annotation, END, START } from "@langchain/langgraph";
import { connectDB } from "@/config/db";
import { Settings } from "@/models/Settings";
import { Project } from "@/models/Project";
import { SkillCategory } from "@/models/Skill";
import { Blog } from "@/models/Blog";
import { Certificate } from "@/models/Certificate";
import { FAQ } from "@/models/FAQ";
import { Service } from "@/models/Service";
import Resume from "@/models/Resume";
import { formatContactSection } from "./context";

// 1. Define State Graph Channels using LangGraph Annotation
export const AgentState = Annotation.Root({
  query: Annotation<string>(),
  history: Annotation<Array<{ role: string; content: string }>>({
    reducer: (x, y) => (y ? y : x),
    default: () => [],
  }),
  context: Annotation<string>(),
  dbData: Annotation<Record<string, any>>({
    reducer: (x, y) => ({ ...x, ...y }),
    default: () => ({}),
  }),
  intent: Annotation<"projects" | "skills" | "contact" | "services" | "faqs" | "general">(),
  response: Annotation<string>(),
});

// Node 1: Comprehensive MongoDB Database RAG Retrieval Node
async function fetchContextNode(state: typeof AgentState.State) {
  let context = "";
  let dbData: Record<string, any> = {};

  try {
    await connectDB();

    const [
      settingsDoc,
      projects,
      skillCategories,
      blogs,
      certificates,
      faqs,
      services,
      resumeDoc,
    ] = await Promise.all([
      Settings.findOne({}).lean().catch(() => null),
      Project.find({ published: { $ne: false } }).lean().catch(() => []),
      SkillCategory.find({}).lean().catch(() => []),
      Blog.find({ published: { $ne: false } }).lean().catch(() => []),
      Certificate.find({ active: { $ne: false } }).lean().catch(() => []),
      FAQ.find({ active: { $ne: false } }).lean().catch(() => []),
      Service.find({ active: { $ne: false } }).lean().catch(() => []),
      Resume.findOne({}).lean().catch(() => null),
    ]);

    dbData = {
      settings: settingsDoc || {},
      projects: projects || [],
      skills: skillCategories || [],
      blogs: blogs || [],
      certificates: certificates || [],
      faqs: faqs || [],
      services: services || [],
      resume: resumeDoc || {},
    };

    const settings = (settingsDoc || {}) as Record<string, any>;
    const personal = settings.personal_info || {};
    const profile = settings.profile || {};
    const contact = settings.contact || {};

    const contactSummary = formatContactSection(settingsDoc) || `${personal.full_name || "Soruj Mahmud"} | ${personal.email || "sorujmahmudb2h@gmail.com"} | ${personal.location || "Dhaka, Bangladesh"}`;

    const projectsSummary = (projects || [])
      .map(
        (p: any, i: number) =>
          `[Project ${i + 1}] Title: ${p.title}\n  Category: ${p.category || "Fullstack"}\n  Description: ${p.description || p.fullDescription || ""}\n  Technologies: ${Array.isArray(p.technologies) ? p.technologies.join(", ") : ""}\n  Features: ${Array.isArray(p.features) ? p.features.join("; ") : ""}\n  Live Demo: ${p.liveUrl || "N/A"}\n  GitHub: ${p.githubUrl || "N/A"}`
      )
      .join("\n\n");

    const skillsSummary = (skillCategories || [])
      .map((cat: any) => {
        const list = Array.isArray(cat.skills)
          ? cat.skills
              .map((s: any) => (typeof s === "string" ? s : `${s.name || s.title} (${s.level || 90}%)`))
              .join(", ")
          : "";
        return `- ${cat.title}: ${list}`;
      })
      .join("\n");

    const servicesSummary = (services || [])
      .map((s: any) => `- Service: ${s.title}\n  Description: ${s.description}\n  Key Features: ${Array.isArray(s.features) ? s.features.join(", ") : ""}`)
      .join("\n\n");

    const faqsSummary = (faqs || [])
      .map((f: any) => `Q: ${f.question}\nA: ${f.answer}`)
      .join("\n\n");

    const certsSummary = (certificates || [])
      .map((c: any) => `- Certificate: ${c.title} by ${c.issuer} (${c.date})`)
      .join("\n");

    const blogsSummary = (blogs || [])
      .map((b: any) => `- Blog: ${b.title} (${b.category}): ${b.excerpt || ""}`)
      .join("\n");

    context = `
=== REAL MONGODB DATABASE CONTEXT ===

--- PERSONAL PROFILE & CONTACT ---
Name: ${personal.full_name || "Soruj Mahmud"}
Title: ${personal.professional_title || "Frontend Developer & UI/UX Specialist"}
Bio: ${profile.bio || "Professional Frontend Developer specializing in React, Next.js, and immersive UI/UX experiences."}
Location: ${personal.location || contact.address || "Dhaka, Bangladesh"}
Email: ${personal.email || contact.email || "sorujmahmudb2h@gmail.com"}
Phone: ${personal.phone || contact.phone || "+8801700000000"}
LinkedIn: ${personal.linkedin || "https://linkedin.com/in/sorujmahmud"}
GitHub: ${personal.github || "https://github.com/sorujmahmud"}
Availability: ${profile.availability || "Available for Projects & Full-time Roles"}

--- SKILLS & TECH STACK (FROM DATABASE) ---
${skillsSummary || "- Frontend: React, Next.js 16, TypeScript, JavaScript, Tailwind CSS, Redux Toolkit\n- UI/UX & Motion: Framer Motion, GSAP, Radix UI\n- Backend: Node.js, Express, MongoDB, REST APIs"}

--- FEATURED PROJECTS (FROM DATABASE) ---
${projectsSummary || "- AI Portfolio & Admin CMS: Built with Next.js 16, React 19, MongoDB, NextAuth v5, and LangChain/LangGraph AI Assistant"}

--- SERVICES OFFERED (FROM DATABASE) ---
${servicesSummary || "- Web Application Development: Modern responsive web apps with React & Next.js\n- UI/UX Engineering: Dynamic interfaces with Tailwind CSS and animation engines"}

--- FREQUENTLY ASKED QUESTIONS (FAQS) ---
${faqsSummary || "Q: What services do you provide?\nA: Frontend web application development, UI/UX engineering, Next.js optimization, and full-stack solutions."}

--- CERTIFICATIONS & BLOGS ---
${certsSummary || "- Professional Web Development & UI/UX Certifications"}
${blogsSummary || ""}
`;
  } catch (err) {
    console.error("MongoDB fetch in LangGraph failed:", err);
    context = `
Name: Soruj Mahmud
Title: Frontend Developer & UI/UX Specialist
Email: sorujmahmudb2h@gmail.com
Location: Dhaka, Bangladesh
Skills: React, Next.js 16, TypeScript, Tailwind CSS, Redux Toolkit, Node.js, MongoDB, GSAP, Framer Motion
`;
  }

  return { context, dbData };
}

// Node 2: Intent Classifier
async function intentClassifierNode(state: typeof AgentState.State) {
  const q = (state.query || "").toLowerCase();
  let intent: "projects" | "skills" | "contact" | "services" | "faqs" | "general" = "general";

  if (q.includes("project") || q.includes("work") || q.includes("portfolio") || q.includes("প্রোজেক্ট")) {
    intent = "projects";
  } else if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("দক্ষতা")) {
    intent = "skills";
  } else if (q.includes("service") || q.includes("offer") || q.includes("সার্ভিস") || q.includes("সেবা")) {
    intent = "services";
  } else if (q.includes("faq") || q.includes("question") || q.includes("প্রশ্ন")) {
    intent = "faqs";
  } else if (q.includes("contact") || q.includes("email") || q.includes("hire") || q.includes("phone") || q.includes("যোগাযোগ")) {
    intent = "contact";
  }

  return { intent };
}

async function callLLM(messages: any[], userQuery: string, context: string, dbData: Record<string, any>): Promise<string> {
  const openRouterKey = process.env.OPENROUTER_API_KEY;
  const freeModels = [
    "google/gemini-2.0-flash-lite-preview-02-05:free",
    "meta-llama/llama-3.3-70b-instruct:free",
    "deepseek/deepseek-r1:free",
    "qwen/qwen-2.5-coder-32b-instruct:free",
  ];

  for (const model of freeModels) {
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        "X-Title": "Soruj Mahmud LangGraph Portfolio AI",
      };
      if (openRouterKey) headers["Authorization"] = `Bearer ${openRouterKey}`;

      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers,
        body: JSON.stringify({ model, messages, temperature: 0.5, max_tokens: 850 }),
      });

      if (res.ok) {
        const data = await res.json();
        const content = data?.choices?.[0]?.message?.content;
        if (content && typeof content === "string") return content;
      }
    } catch {}
  }

  // Try Groq API
  const groqKey = process.env.GROQ_API_KEY;
  if (groqKey) {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${groqKey}` },
        body: JSON.stringify({ model: "llama-3.3-70b-versatile", messages, temperature: 0.5, max_tokens: 850 }),
      });
      if (res.ok) {
        const data = await res.json();
        const content = data?.choices?.[0]?.message?.content;
        if (content && typeof content === "string") return content;
      }
    } catch {}
  }

  // Try Gemini API
  const geminiKey = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
  if (geminiKey) {
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: `${messages[0].content}\n\nUser Question: ${userQuery}` }] }],
        }),
      });
      if (res.ok) {
        const data = await res.json();
        const content = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (content && typeof content === "string") return content;
      }
    } catch {}
  }

  // Dynamic Database-Driven Fallback Generator
  const isBangla = /[\u0980-\u09FF]/.test(userQuery);
  const q = userQuery.toLowerCase();

  const projects = dbData.projects || [];
  const skills = dbData.skills || [];
  const services = dbData.services || [];
  const personal = dbData.settings?.personal_info || {};

  if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("দক্ষতা")) {
    let skillList = "";
    if (skills.length > 0) {
      skillList = skills.map((c: any) => `- **${c.title}:** ${Array.isArray(c.skills) ? c.skills.map((s: any) => typeof s === "string" ? s : s.name).join(", ") : ""}`).join("\n");
    } else {
      skillList = "- **Frontend:** React, Next.js 16, TypeScript, JavaScript, Tailwind CSS, Redux Toolkit\n- **UI/UX & Motion:** Framer Motion, GSAP, Radix UI\n- **Backend:** Node.js, Express, MongoDB, RESTful APIs";
    }

    return isBangla
      ? `👋 **সরোজ মাহমুদের মূল দক্ষতা (ডাটাবেজ থেকে প্রাপ্ত):**\n\n${skillList}`
      : `👋 **Soruj Mahmud's Skills & Tech Stack (Extracted from Database):**\n\n${skillList}`;
  }

  if (q.includes("project") || q.includes("work") || q.includes("প্রোজেক্ট")) {
    let projList = "";
    if (projects.length > 0) {
      projList = projects.slice(0, 5).map((p: any) => `- **${p.title}** (${p.category || "Fullstack"})\n  ${p.description || ""}\n  Tech: ${Array.isArray(p.technologies) ? p.technologies.join(", ") : ""}`).join("\n\n");
    } else {
      projList = "- **AI-Powered Portfolio & Admin CMS:** Next.js 16, React 19, MongoDB, NextAuth v5, LangChain/LangGraph AI Assistant\n- **Modern Fullstack Applications:** React, Node.js, Express, Tailwind CSS";
    }

    return isBangla
      ? `🚀 **সরোজ মাহমুদের পোর্টফোলিও প্রোজেক্টসমূহ (ডাটাবেজ থেকে প্রাপ্ত):**\n\n${projList}`
      : `🚀 **Soruj Mahmud's Featured Projects (Extracted from Database):**\n\n${projList}`;
  }

  if (q.includes("service") || q.includes("offer") || q.includes("সার্ভিস") || q.includes("সেবা")) {
    let servList = "";
    if (services.length > 0) {
      servList = services.map((s: any) => `- **${s.title}:** ${s.description}`).join("\n");
    } else {
      servList = "- **Frontend Web Development:** Next.js & React Applications\n- **UI/UX Engineering:** Immersive design with Tailwind CSS & animation engines";
    }

    return isBangla
      ? `🛠️ **সরোজ মাহমুদের সার্ভিসসমূহ (ডাটাবেজ থেকে প্রাপ্ত):**\n\n${servList}`
      : `🛠️ **Services Offered by Soruj Mahmud (Extracted from Database):**\n\n${servList}`;
  }

  if (q.includes("contact") || q.includes("email") || q.includes("hire") || q.includes("যোগাযোগ")) {
    const email = personal.email || "sorujmahmudb2h@gmail.com";
    const location = personal.location || "Dhaka, Bangladesh";
    const github = personal.github || "https://github.com/sorujmahmud";
    const linkedin = personal.linkedin || "https://linkedin.com/in/sorujmahmud";

    return isBangla
      ? `📩 **যোগাযোগের তথ্য (ডাটাবেজ থেকে প্রাপ্ত):**\n\n- **ইমেইল:** ${email}\n- **পেশা:** Frontend Developer & UI/UX Specialist\n- **অবস্থান:** ${location}\n- **GitHub:** ${github}\n- **LinkedIn:** ${linkedin}`
      : `📩 **Contact Information (Extracted from Database):**\n\n- **Email:** ${email}\n- **Role:** Frontend Developer & UI/UX Specialist\n- **Location:** ${location}\n- **GitHub:** ${github}\n- **LinkedIn:** ${linkedin}`;
  }

  return isBangla
    ? `👋 হ্যালো! আমি **Soruj AI** (LangGraph RAG Engine)। আমি সরোজ মাহমুদের ডাটাবেজ থেকে পাওয়া তথ্য অনুযায়ী উত্তর দিই।\n\nসরোজ মাহমুদ একজন অভিজ্ঞ **Frontend Developer & UI/UX Specialist** (React, Next.js 16, TypeScript)। তাঁর দক্ষতা, প্রোজেক্ট, সার্ভিস বা যোগাযোগের তথ্য জানতে যেকোনো প্রশ্ন করুন!`
    : `👋 Hello! I am **Soruj AI** (powered by LangChain & LangGraph RAG Engine).\n\nI respond using direct information extracted from **Soruj Mahmud's live Database & Website**. Feel free to ask me about Soruj's real skills, projects, services, or contact details!`;
}

// Node 3: LLM Generation via OpenRouter / Groq / Gemini / Fallback
async function generateResponseNode(state: typeof AgentState.State) {
  const systemPrompt = `You are Soruj AI, an interactive portfolio assistant for Soruj Mahmud (Frontend Developer & UI/UX Specialist).

IMPORTANT INSTRUCTION:
You MUST base your answers strictly on the REAL DATABASE & WEBSITE CONTEXT provided below. Do not make up facts. Present information accurately, clearly, and concisely in clean Markdown formatting.

Database & Website Context:
${state.context}

User Query Intent: ${state.intent}
Guidelines:
- Answer in the same language as the user (English or Bangla).
- Highlight relevant project titles, tech stacks, skills, and contact information directly from the database.`;

  const messages = [
    { role: "system", content: systemPrompt },
    ...state.history.map((h) => ({ role: h.role, content: h.content })),
    { role: "user", content: state.query },
  ];

  const text = await callLLM(messages, state.query, state.context, state.dbData);
  return { response: text };
}

// 4. Construct & Compile the State Graph
const workflow = new StateGraph(AgentState)
  .addNode("fetchContext", fetchContextNode)
  .addNode("classifyIntent", intentClassifierNode)
  .addNode("generateResponse", generateResponseNode)
  .addEdge(START, "fetchContext")
  .addEdge("fetchContext", "classifyIntent")
  .addEdge("classifyIntent", "generateResponse")
  .addEdge("generateResponse", END);

export const portfolioLangGraph = workflow.compile();

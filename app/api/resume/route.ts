import { connectDB } from "@/config/db";
import Resume from "@/models/Resume";
import { NextRequest, NextResponse } from "next/server";


/**
 * GET  /api/resume   -> returns the current resume data (for admin panel form + public page)
 * PUT  /api/resume   -> updates the resume data (call this from your admin panel's save button)
 *
 * ⚠️ IMPORTANT: PUT should only be callable by you (the admin), not the public.
 * Add your existing auth/middleware check at the top of the PUT handler
 * (see the ADD AUTH CHECK HERE comment below) before going live.
 */

export async function GET() {
    await connectDB();

    let resume = await Resume.findOne({});
    if (!resume) {
        // First-run fallback so the page never breaks before you've saved anything
        resume = await Resume.create({
            name: "Soruj Mahmud",
            role: "Frontend Developer · Full-Stack JavaScript Developer · AI Application Developer",
            location: "Tangail, Dhaka, Bangladesh",
            email: "sorujmahmudb2h@gmail.com",
            phone: "+8801795397598",
            github: "https://github.com/yourusername",
            portfolio: "https://yourportfolio.com",
            linkedin: "https://linkedin.com/in/yourusername",
            summary: [
                "Motivated Frontend Developer with expertise in modern JavaScript technologies including Next.js, React, TypeScript, Redux Toolkit, and Tailwind CSS.",
                "Passionate about creating high-performance, responsive, user-friendly applications with AI-powered features.",
            ],
            skills: [
                { label: "Frontend", items: "Next.js, React.js, TypeScript, Tailwind CSS, Redux Toolkit" },
                { label: "Backend", items: "Node.js, Express.js, REST APIs, JWT" },
                { label: "AI", items: "LangChain, LangGraph, DeepAgent, MCP Server, RAG" },
            ],
            projects: [
                {
                    title: "Enterprise E-Commerce Platform",
                    desc: "Full-stack e-commerce platform with authentication, cart, and admin dashboard.",
                    tags: ["Authentication", "Admin Dashboard"],
                    stack: "Next.js · MongoDB · Express.js",
                },
            ],
            education: [{ title: "HSC — Science", institute: "Nagarpur Government College, Tangail" }],
            competencies: ["Frontend Development", "Full-Stack JavaScript", "AI Application Development"],
            softSkills: ["Problem Solving", "Team Collaboration"],
            languages: ["Bengali — Native", "English — Professional Working Proficiency"],
        });
    }

    return NextResponse.json(resume);
}

export async function PUT(req: NextRequest) {
    // === ADD AUTH CHECK HERE ===
    // e.g. verify a session/JWT that proves this request is really you (the admin)
    // before allowing writes. Example:
    //   const session = await getServerSession();
    //   if (!session || session.user.role !== "admin") {
    //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    //   }

    await connectDB();
    const body = await req.json();

    const updated = await Resume.findOneAndUpdate(
        {},
        { ...body, updatedAt: new Date() },
        { new: true, upsert: true }
    );

    return NextResponse.json(updated);
}
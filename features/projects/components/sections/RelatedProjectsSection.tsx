"use client";
import { Share2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface RelatedProject {
  id: string;
  title: string;
  category: string;
  emoji?: string;
}

interface RelatedProjectsSectionProps {
  currentId: string;
  projects: RelatedProject[];
}

export default function RelatedProjectsSection({ currentId, projects }: RelatedProjectsSectionProps) {
  const related = projects.filter((p) => p.id !== currentId).slice(0, 3);

  if (!related.length) return null;

  return (
    <section id="related-projects" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0">
          <Share2 className="w-5 h-5 text-sky-400" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Related Projects</h2>
          <p className="text-sm text-gray-500 mt-0.5">Similar projects you might find interesting</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {related.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
          >
            <Link
              href={`/projects/${project.id}`}
              className="block p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-cyan-500/20 hover:shadow-[0_0_30px_rgba(6,182,212,0.05)] transition-all duration-300 group"
            >
              <span className="text-2xl mb-2 block">{project.emoji || "🚀"}</span>
              <h4 className="text-white font-semibold text-sm group-hover:text-cyan-400 transition-colors mb-1">
                {project.title}
              </h4>
              <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500 bg-white/5 px-2 py-0.5 rounded">
                {project.category}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { IProject } from "@/types";

interface RelatedProjectsSectionProps {
  currentId: string;
  allProjects: IProject[];
}

export default function RelatedProjectsSection({ currentId, allProjects }: RelatedProjectsSectionProps) {
  const related = allProjects
    .filter((p) => p.id !== currentId)
    .slice(0, 2);

  if (related.length === 0) return null;

  return (
    <section id="related" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Related Projects
          </h2>
          <Link
            href="/#projects"
            className="flex items-center gap-1.5 text-[13px] font-medium text-cyan-400/70 hover:text-cyan-400 transition-colors"
          >
            View all
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {related.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={`/projects/${project._id || project.id}`}
                className="group block rounded-2xl bg-white/[0.02] border border-white/[0.05] overflow-hidden hover:border-white/[0.12] transition-all"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080c15] via-transparent to-transparent" />
                </div>
                <div className="p-4">
                  <h4 className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors mb-1">
                    {project.title}
                  </h4>
                  <p className="text-[12px] text-gray-600 line-clamp-1">{project.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

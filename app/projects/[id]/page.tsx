import { Metadata } from "next";
import { notFound } from "next/navigation";
import { connectDB } from "@/config/db";
import { Project } from "@/models/Project";
import BackButton from "@/components/shared/BackButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Github,
  Globe,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { isValidObjectId } from "@/lib/utils/validation";

interface PageParams {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { id } = await params;
  await connectDB();
  const query = isValidObjectId(id)
    ? { _id: id }
    : { "metadata.slug": new RegExp(`^${id.replace(/-/g, " ")}$`, "i") };
  const project = await Project.findOne(query);

  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} - Project Details`,
    description: project.description || project.metadata?.description || "",
    openGraph: {
      title: project.title,
      description: project.description || project.metadata?.description || "",
    },
  };
}

export default async function ProjectDetailsPage({ params }: PageParams) {
  const { id } = await params;
  await connectDB();

  const query = isValidObjectId(id)
    ? { _id: id }
    : { "metadata.slug": new RegExp(`^${id.replace(/-/g, " ")}$`, "i") };
  const project = await Project.findOne(query);

  if (!project) notFound();

  const projectId = project._id.toString();

  const getAdjacentProjects = async () => {
    const allProjects = await Project.find({})
      .sort({ "metadata.featured": -1, createdAt: -1 })
      .select("_id title metadata.slug")
      .lean();

    const currentIndex = allProjects.findIndex(
      (p) => p._id.toString() === projectId,
    );

    const prev =
      currentIndex > 0
        ? {
            id: allProjects[currentIndex - 1]._id.toString(),
            title: allProjects[currentIndex - 1].title,
            slug:
              allProjects[currentIndex - 1].metadata?.slug ||
              allProjects[currentIndex - 1].title
                .toLowerCase()
                .replace(/\s+/g, "-"),
          }
        : null;

    const next =
      currentIndex < allProjects.length - 1
        ? {
            id: allProjects[currentIndex + 1]._id.toString(),
            title: allProjects[currentIndex + 1].title,
            slug:
              allProjects[currentIndex + 1].metadata?.slug ||
              allProjects[currentIndex + 1].title
                .toLowerCase()
                .replace(/\s+/g, "-"),
          }
        : null;

    return { prev, next };
  };

  const { prev, next } = await getAdjacentProjects();

  return (
    <main className="min-h-screen bg-[#020617] relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-20 relative z-10">
        <div className="mb-10">
          <BackButton fallbackUrl="/projects">
            <ArrowLeft className="w-4 h-4" />
          </BackButton>
        </div>

        <div className="glass-card rounded-3xl p-6 sm:p-10 md:p-14">
          {project.media?.cover && (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8">
              <Image
                src={project.media.cover}
                alt={project.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 75vw"
              />
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Badge
              variant="outline"
              className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 text-xs font-medium"
            >
              {project.metadata?.category || "Project"}
            </Badge>
            {project.metadata?.featured && (
              <Badge
                variant="outline"
                className="bg-amber-500/10 text-amber-400 border-amber-500/20 text-xs font-medium"
              >
                ★ Featured
              </Badge>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed mb-10">
            {project.description || project.metadata?.description}
          </p>

          {project.metadata?.year && (
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-10">
              <Calendar className="w-4 h-4" />
              <span>{project.metadata.year}</span>
            </div>
          )}

          {project.highlights && project.highlights.length > 0 && (
            <div className="mb-12">
              <h3 className="text-lg font-semibold text-white mb-4">Key Highlights</h3>
              <ul className="space-y-3">
                {project.highlights.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-gray-400">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.technologies && project.technologies.length > 0 && (
            <div className="mb-12">
              <h3 className="text-lg font-semibold text-white mb-4">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech: string) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="bg-white/5 text-gray-300 border-white/10 text-xs font-medium"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            {project.media?.demo && (
              <Button asChild size="lg" className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold">
                <a
                  href={project.media.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Live Demo
                  <ExternalLink className="w-3.5 h-3.5 ml-2 opacity-70" />
                </a>
              </Button>
            )}
            {project.media?.github && (
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white/5 border-white/10 text-white hover:bg-white/10 font-semibold"
              >
                <a
                  href={project.media.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-4 h-4 mr-2" />
                  View Code
                </a>
              </Button>
            )}
          </div>
        </div>

        <div className="mt-16 pt-10 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6">
          <div className="flex-1">
            {prev ? (
              <Link
                href={`/projects/${prev.id}`}
                className="group flex items-center gap-3 p-5 rounded-2xl glass-card hover:border-cyan-500/30 transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                <div className="overflow-hidden">
                  <p className="text-xs text-gray-500 mb-1">Previous Project</p>
                  <p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors truncate">
                    {prev.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>
          <div className="flex-1">
            {next ? (
              <Link
                href={`/projects/${next.id}`}
                className="group flex items-center justify-end gap-3 p-5 rounded-2xl glass-card hover:border-cyan-500/30 transition-all duration-300 text-right"
              >
                <div className="overflow-hidden">
                  <p className="text-xs text-gray-500 mb-1">Next Project</p>
                  <p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors truncate">
                    {next.title}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-cyan-400 transition-colors" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

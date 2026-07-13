import { Metadata } from "next";
import { notFound } from "next/navigation";
import { connectDB } from "@/config/db";
import { Project, IProjectDocument } from "@/models/Project";
import { isValidObjectId } from "@/lib/utils/validation";
import ProjectDetailClient from "@/features/projects/components/ProjectDetailClient";

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

  const title = project.seoTitle || `${project.title} — In-Depth Case Study`;
  const description = project.metaDescription || project.description || project.metadata?.description || "";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: project.completionDate?.toString(),
      images: project.image ? [{ url: project.image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: project.image ? [project.image] : undefined,
    },
  };
}

export default async function ProjectDetailsPage({ params }: PageParams) {
  const { id } = await params;
  await connectDB();

  const query = isValidObjectId(id)
    ? { _id: id }
    : { "metadata.slug": new RegExp(`^${id.replace(/-/g, " ")}$`, "i") };
  const project = await Project.findOne(query).lean() as IProjectDocument | null;

  if (!project) notFound();

  const projectId = project._id.toString();

  const allProjects = await Project.find({})
    .sort({ "metadata.featured": -1, createdAt: -1 })
    .select("title metadata.slug metadata.category emoji")
    .lean();

  const allProjectsMapped = allProjects.map((p) => ({
    _id: (p as any)._id.toString(),
    title: (p as any).title,
    category: (p as any).metadata?.category || "",
    emoji: (p as any).emoji || "🚀",
  }));

  const currentIndex = allProjectsMapped.findIndex(
    (p) => p._id === projectId,
  );

  const prev =
    currentIndex > 0
      ? {
          id: allProjectsMapped[currentIndex - 1]._id,
          title: allProjectsMapped[currentIndex - 1].title,
          slug:
            (allProjectsMapped[currentIndex - 1] as any).slug ||
            allProjectsMapped[currentIndex - 1].title.toLowerCase().replace(/\s+/g, "-"),
        }
      : null;

  const next =
    currentIndex < allProjectsMapped.length - 1
      ? {
          id: allProjectsMapped[currentIndex + 1]._id,
          title: allProjectsMapped[currentIndex + 1].title,
          slug:
            (allProjectsMapped[currentIndex + 1] as any).slug ||
            allProjectsMapped[currentIndex + 1].title.toLowerCase().replace(/\s+/g, "-"),
        }
      : null;

  const serialized = JSON.parse(JSON.stringify(project));

  return (
    <ProjectDetailClient
      project={serialized}
      prev={prev}
      next={next}
      allProjects={allProjectsMapped}
    />
  );
}

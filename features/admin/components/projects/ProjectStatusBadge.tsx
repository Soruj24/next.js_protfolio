import type { IProject } from "@/types";

export default function ProjectStatusBadge({ project }: { project: IProject }) {
  if (project.archived) return <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-gray-500/10 text-gray-400 border border-gray-500/20">Archived</span>;
  if (project.published === false) return <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">Draft</span>;
  return <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Published</span>;
}

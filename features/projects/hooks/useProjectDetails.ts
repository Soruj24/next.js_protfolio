"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IProject } from "@/types";

export function useProjectDetails(id: string | string[] | undefined) {
  const [project, setProject] = useState<IProject | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/projects/${id}`);
        if (res.ok) {
          const foundProject = await res.json();
          if (foundProject && !foundProject.error) {
            setProject(foundProject);
          } else {
            router.push("/#projects");
          }
        } else {
          router.push("/#projects");
        }
      } catch {
        router.push("/#projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, router]);

  return { project, loading };
}

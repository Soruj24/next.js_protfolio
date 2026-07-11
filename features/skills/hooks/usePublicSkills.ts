"use client";

import { useEffect, useState } from "react";
import type { ISkillCategory } from "@/models/Skill";

export function usePublicSkills() {
  const [categories, setCategories] = useState<ISkillCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch("/api/skills");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setCategories(data);
          }
        }
      } catch {
        // Skills will remain empty
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  return { categories, loading };
}

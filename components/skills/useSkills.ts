import { useEffect, useState } from "react";
import { skillCategories as localSkills } from "@/data/skills";
import type { ISkillCategory } from "@/models/Skill";

export function useSkills() {
  const [categories, setCategories] = useState<ISkillCategory[]>(
    localSkills as ISkillCategory[],
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch("/api/skills");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setCategories(data);
          }
        }
      } catch {
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  return { categories, loading };
}


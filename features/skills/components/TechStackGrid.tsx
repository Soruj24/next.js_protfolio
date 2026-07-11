"use client";

import React, { useState, useEffect } from "react";
import TechChip from "@/components/shared/TechChip";
import { Loader2 } from "lucide-react";

const TechStackGrid: React.FC = () => {
  const [techStack, setTechStack] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/portfolio")
      .then((r) => r.json())
      .then((data) => {
        const technologies = new Set<string>();
        (data.skills || []).forEach((cat: any) => {
          (cat.skills || []).forEach((skill: any) => {
            if (skill.name) technologies.add(skill.name);
          });
        });
        setTechStack(Array.from(technologies));
      })
      .catch(() => setTechStack([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="mt-20 text-center">
        <h3 className="text-3xl font-bold text-white mb-12 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Technology Stack
        </h3>
        <div className="flex justify-center py-8">
          <Loader2 size={20} className="text-gray-600 animate-spin" />
        </div>
      </div>
    );
  }

  if (techStack.length === 0) return null;

  return (
    <div className="mt-20 text-center">
      <h3 className="text-3xl font-bold text-white mb-12 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
        Technology Stack
      </h3>
      <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
        {techStack.map((tech, index) => (
          <TechChip key={tech} tech={tech} index={index} />
        ))}
      </div>
    </div>
  );
};

export default TechStackGrid;

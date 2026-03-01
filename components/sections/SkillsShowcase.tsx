import { useRef } from "react";
import SectionTitle from "../ui/SectionTitle";
import SkillCategoryCard from "../skills/SkillCategoryCard";
import TechStackGrid from "../skills/TechStackGrid";
import SkillsBackground from "../skills/SkillsBackground";
import { useSkills } from "../skills/useSkills";
import { useSkillsAnimation } from "../skills/useSkillsAnimation";

function SkillsShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<(HTMLDivElement | null)[][]>([]);
  const categoriesRef = useRef<(HTMLDivElement | null)[]>([]);

  const { categories } = useSkills();

  useSkillsAnimation({
    sectionRef,
    categories,
    skillsRef,
    categoriesRef,
  });

  const addToRefs = (
    el: HTMLDivElement | null,
    categoryIndex: number,
    skillIndex: number
  ) => {
    if (!skillsRef.current[categoryIndex]) {
      skillsRef.current[categoryIndex] = [];
    }
    if (el) {
      skillsRef.current[categoryIndex][skillIndex] = el;
    }
  };

  const addCategoryRef = (el: HTMLDivElement | null, index: number) => {
    categoriesRef.current[index] = el;
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="min-h-screen py-20 relative overflow-hidden"
    >
      <SkillsBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionTitle
          title="Technical Expertise"
          subtitle="Mastering the tools and technologies that power modern frontend applications"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {categories.map((category, categoryIndex) => (
            <SkillCategoryCard
              key={category._id || `category-${categoryIndex}`}
              ref={(el) => addCategoryRef(el, categoryIndex)}
              category={category}
              categoryIndex={categoryIndex}
              addToRefs={addToRefs}
            />
          ))}
        </div>

        <TechStackGrid />
      </div>
    </section>
  );
}

export default SkillsShowcase;

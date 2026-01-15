import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import SectionTitle from "../ui/SectionTitle";
import { skillCategories as initialSkills } from "../../data/skills";
import { ISkillCategory } from "@/models/Skill";
import SkillCategoryCard from "../skills/SkillCategoryCard";
import TechStackGrid from "../skills/TechStackGrid";
import SkillsBackground from "../skills/SkillsBackground";

function SkillsShowcase() {
  const [categories, setCategories] = useState<ISkillCategory[]>(initialSkills as ISkillCategory[]);
  const sectionRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<(HTMLDivElement | null)[][]>([]);
  const categoriesRef = useRef<(HTMLDivElement | null)[]>([]);

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
      } catch (error) {
        console.error("Failed to fetch skills:", error);
      }
    };
    fetchSkills();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        categoriesRef.current,
        {
          opacity: 0,
          y: 100,
          rotationY: 90,
        },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          duration: 1,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse",
          },
        }
      );

      skillsRef.current.forEach((skillArray, categoryIndex) => {
        skillArray?.forEach((skill, skillIndex) => {
          if (skill) {
            gsap.fromTo(
              skill,
              { width: "0%", opacity: 0 },
              {
                width: `${categories[categoryIndex].skills[skillIndex].level}%`,
                opacity: 1,
                duration: 2,
                delay: categoryIndex * 0.3 + skillIndex * 0.1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: skill,
                  start: "top 90%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }
        });
      });

      gsap.to(".skill-category", {
        y: -10,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          each: 0.5,
          from: "center",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [categories]);

  const addToRefs = (
    el: HTMLDivElement | null,
    categoryIndex: number,
    skillIndex: number
  ) => {
    if (!skillsRef.current[categoryIndex]) {
      skillsRef.current[categoryIndex] = [];
    }
    if (el && !skillsRef.current[categoryIndex][skillIndex]) {
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

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionTitle
          title="Technical Expertise"
          subtitle="Mastering the tools and technologies that power modern AI applications"
        />

        <div className="grid lg:grid-cols-3 gap-8 mt-16">
          {categories.map((category, categoryIndex) => (
            <SkillCategoryCard
              key={category.title}
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

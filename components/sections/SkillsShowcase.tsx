import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import SectionTitle from "../ui/SectionTitle";
import TechChip from "../ui/TechChip";
import { skillCategories } from "../../data/skills";

function SkillsShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<(HTMLDivElement | null)[][]>([]);
  const categoriesRef = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    const card = categoriesRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = (index: number) => {
    const card = categoriesRef.current[index];
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

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
                width: `${skillCategories[categoryIndex].skills[skillIndex].level}%`,
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
  }, []);

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
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionTitle
          title="Technical Expertise"
          subtitle="Mastering the tools and technologies that power modern AI applications"
        />

        <div className="grid lg:grid-cols-3 gap-8 mt-16">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              ref={(el) => addCategoryRef(el, categoryIndex)}
              onMouseMove={(e) => handleMouseMove(e, categoryIndex)}
              onMouseLeave={() => handleMouseLeave(categoryIndex)}
              className="skill-category group relative"
            >
              <div className="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] p-8 border border-white/10 hover:border-cyan-500/50 transition-all duration-700 h-full relative overflow-hidden group-hover:shadow-[0_0_50px_rgba(6,182,212,0.15)]">
                {/* Background Accent */}
                <div className="absolute -right-20 -top-20 w-40 h-40 bg-cyan-500/10 blur-[80px] group-hover:bg-cyan-500/20 transition-all duration-700" />
                <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-purple-500/10 blur-[80px] group-hover:bg-purple-500/20 transition-all duration-700" />

                <div className="flex items-center mb-10 relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center text-2xl mr-5 border border-white/10 group-hover:scale-110 group-hover:border-cyan-500/50 transition-all duration-500 shadow-inner">
                    <span className="drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
                      {category.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">
                      {category.title}
                    </h3>
                    <div className="h-1 w-12 bg-gradient-to-r from-cyan-500 to-transparent mt-1 rounded-full" />
                  </div>
                </div>

                <div className="space-y-8 relative z-10">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name} className="group/skill">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center space-x-3">
                          <span className="text-xl group-hover/skill:scale-125 transition-transform duration-300">
                            {skill.icon}
                          </span>
                          <span className="font-medium text-gray-300 group-hover/skill:text-white transition-colors duration-300">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-cyan-400 font-mono font-bold text-sm">
                          {skill.level}%
                        </span>
                      </div>

                      <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden backdrop-blur-sm border border-white/5">
                        <div
                          ref={(el) => addToRefs(el, categoryIndex, skillIndex)}
                          className={`h-full rounded-full bg-gradient-to-r ${skill.color} relative overflow-hidden`}
                          style={{ width: "0%" }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/skill:translate-x-full transition-transform duration-1500 ease-in-out" />
                        </div>
                      </div>
                      {'description' in skill && skill.description && (
                        <p className="text-gray-500 text-xs mt-2 font-medium opacity-0 group-hover/skill:opacity-100 transform translate-y-2 group-hover/skill:translate-y-0 transition-all duration-300">
                          {skill.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <h3 className="text-3xl font-bold text-white mb-12 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Technology Stack
          </h3>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {[
              "LangChain",
              "MCP Server",
              "Next.js",
              "React",
              "TypeScript",
              "Node.js",
              "Express.js",
              "MongoDB",
              "OpenAI",
              "Tailwind CSS",
              "GSAP",
              "Python",
              "FastAPI",
              "Docker",
              "AWS",
              "Git",
              "WebSocket",
              "Redis",
              "Pinecone",
              "Vector Databases",
              "AI Agents",
              "Custom Tools",
            ].map((tech, index) => (
              <TechChip key={tech} tech={tech} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SkillsShowcase;

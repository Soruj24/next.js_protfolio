import { useEffect } from "react";
import { gsap } from "gsap";

interface Args {
  sectionRef: React.RefObject<HTMLElement | null>;
  categories: Array<{ skills: Array<{ level: number }> }>;
  skillsRef: React.MutableRefObject<(HTMLDivElement | null)[][]>;
  categoriesRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

export function useSkillsAnimation({
  sectionRef,
  categories,
  skillsRef,
  categoriesRef,
}: Args) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        categoriesRef.current.filter(Boolean),
        { opacity: 0, y: 100, rotationY: 90 },
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
        },
      );

      skillsRef.current.forEach((skillArray, categoryIndex) => {
        skillArray?.forEach((skill, skillIndex) => {
          const skillData = categories[categoryIndex]?.skills[skillIndex];
          if (skill && skillData) {
            gsap.fromTo(
              skill,
              { width: "0%", opacity: 0 },
              {
                width: `${skillData.level}%`,
                opacity: 1,
                duration: 2,
                delay: categoryIndex * 0.3 + skillIndex * 0.1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: skill,
                  start: "top 90%",
                  toggleActions: "play none none reverse",
                },
              },
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
        stagger: { each: 0.5, from: "center" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [categories, sectionRef, categoriesRef, skillsRef]);
}


import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "../ui/SectionTitle";
import personalData from "@/data/Parsonal.json";
import AboutBackground from "../about/AboutBackground";
import AboutContent from "../about/AboutContent";
import AboutStats from "../about/AboutStats";
import AboutImage from "../about/AboutImage";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function AboutSection() {
  const personalInfo = personalData.personal_info || {};
  const expProfessional = personalData.experience?.professional_experience || "AI Software Architect";
  const fullName = personalInfo.full_name || "Soruj Mahmud";
  const professionalTitle = personalInfo.professional_title || "Full Stack Developer";
  
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation for content
      if (textRef.current) {
        gsap.fromTo(
          textRef.current.querySelectorAll(".text-white, .text-gradient, .text-lg"),
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Animation for image
      gsap.fromTo(
        imageRef.current,
        {
          opacity: 0,
          x: 100,
          rotationY: 90,
          scale: 0.8,
        },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          scale: 1,
          duration: 1.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animation for stats cards
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 50,
              scale: 0.5,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              delay: index * 0.2,
              ease: "elastic.out(1, 0.8)",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addCardRef = (el: HTMLDivElement | null, index: number) => {
    cardsRef.current[index] = el;
  };

  const stats = [
    {
      value: "LangChain",
      label: "Specialist",
      color: "from-cyan-500 to-blue-500",
    },
    {
      value: "MCP Server",
      label: "Expert",
      color: "from-purple-500 to-pink-500",
    },
    {
      value: "AI Tools",
      label: "Developer",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen py-32 flex items-center relative overflow-hidden"
    >
      <AboutBackground />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionTitle
          title="The Story"
          subtitle="Merging Human Creativity with Artificial Intelligence"
        />

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8 order-2 lg:order-1">
            <AboutContent
              ref={textRef}
              professionalTitle={professionalTitle}
              fullName={fullName}
              expProfessional={expProfessional}
            />
            
            <AboutStats stats={stats} addCardRef={addCardRef} />
          </div>

          <AboutImage ref={imageRef} />
        </div>
      </div>
    </section>
  );
}

export default AboutSection;

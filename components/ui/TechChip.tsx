import { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface TechChipProps {
  tech: string;
  index: number;
}

function TechChip({ tech, index }: TechChipProps) {
  const chipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        chipRef.current,
        {
          opacity: 0,
          scale: 0,
          rotation: -180,
          y: 100,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          y: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: chipRef.current,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [index]);

  const handleClick = () => {
    gsap.to(chipRef.current, {
      scale: 1.3,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    });

    gsap.to(chipRef.current, {
      background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
      duration: 0.3,
      yoyo: true,
      repeat: 1,
    });
  };

  return (
    <div
      ref={chipRef}
      className="px-6 py-3 bg-white/10 backdrop-blur-lg rounded-2xl border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all duration-300 cursor-pointer transform hover:scale-110 hover:shadow-2xl hover:shadow-cyan-500/25 font-medium"
      onClick={handleClick}
    >
      {tech}
    </div>
  );
}

export default TechChip;
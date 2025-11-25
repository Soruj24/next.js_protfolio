import { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface SectionTitleProps {
  title: string;
  subtitle: string;
}

function SectionTitle({ title, subtitle }: SectionTitleProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleChars = titleRef.current?.textContent?.split("") || [];
      if (titleRef.current) {
        titleRef.current.textContent = "";

        titleChars.forEach((char, index) => {
          const span = document.createElement("span");
          span.textContent = char;
          span.className = "title-char inline-block";
          span.style.opacity = "0";
          span.style.transform = "translateY(50px) rotateX(-90deg)";
          titleRef.current?.appendChild(span);

          gsap.to(span, {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.8,
            delay: index * 0.05,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          });
        });
      }

      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [title, subtitle]);

  return (
    <div ref={containerRef} className="text-center mb-20">
      <h2
        ref={titleRef}
        className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text  "
      >
        {title}
      </h2>
      <p
        ref={subtitleRef}
        className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
      >
        {subtitle}
      </p>
    </div>
  );
}

export default SectionTitle;

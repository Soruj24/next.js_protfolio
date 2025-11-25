import { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface StatCardProps {
  stat: {
    number: string;
    label: string;
    color: string;
  };
  index: number;
}

function StatCard({ stat, index }: StatCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const targetNumber = parseInt(stat.number.replace("+", "").replace("%", ""));

      if (numberRef.current) {
        gsap.fromTo(
          numberRef.current,
          { textContent: "0" },
          {
            textContent: targetNumber.toString(),
            duration: 3,
            snap: { textContent: 1 },
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
            onUpdate: function () {
              if (numberRef.current) {
                const currentValue = Math.floor(Number(this.targets()[0].textContent));
                numberRef.current.textContent =
                  currentValue +
                  (stat.number.includes("+") ? "+" : "") +
                  (stat.number.includes("%") ? "%" : "");
              }
            },
          }
        );
      }

      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          y: 100,
          rotationY: 90,
          scale: 0.5,
        },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          scale: 1,
          duration: 1,
          delay: index * 0.3,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.to(glowRef.current, {
        opacity: 0.5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => ctx.revert();
  }, [stat, index]);

  return (
    <div ref={cardRef} className="text-center group cursor-pointer">
      <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-cyan-500/50 transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-cyan-500/25">
        <div
          ref={glowRef}
          className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.color} opacity-0 blur-xl -z-10`}
        />

        <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-3">
          <span ref={numberRef}>0</span>
        </div>
        <div className="text-gray-400 text-sm uppercase tracking-wider group-hover:text-cyan-400 transition-colors font-light">
          {stat.label}
        </div>

        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );
}

export default StatCard;
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

function MagneticButton({ children, className, ...props }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = button.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      gsap.to(button, {
        x: x * 30,
        y: y * 30,
        rotationX: y * -10,
        rotationY: x * 10,
        duration: 0.8,
        ease: "power2.out",
      });

      const particle = document.createElement("div");
      particle.className = "absolute w-2 h-2 bg-cyan-400 rounded-full pointer-events-none";
      particle.style.left = `${e.clientX - left}px`;
      particle.style.top = `${e.clientY - top}px`;
      button.appendChild(particle);

      gsap.to(particle, {
        x: (Math.random() - 0.5) * 100,
        y: (Math.random() - 0.5) * 100,
        opacity: 0,
        scale: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => particle.remove(),
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.8)",
      });
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <button ref={buttonRef} className={`relative overflow-hidden group ${className}`} {...props}>
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </button>
  );
}

export default MagneticButton;
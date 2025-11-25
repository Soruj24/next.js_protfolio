import { useRef, useEffect } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  originalSize: number;
  update: () => void;
  draw: () => void;
}

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame: number;
    let mouseX = 0;
    let mouseY = 0;

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const particles: Particle[] = [];
    const particleCount = 100;

    class ParticleImpl {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      originalSize: number;

      constructor(canvas: HTMLCanvasElement) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.originalSize = Math.random() * 3 + 1;
        this.size = this.originalSize;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        const hue = 200 + Math.random() * 60;
        this.color = `hsla(${hue}, 70%, 60%, 0.8)`;
      }

      update() {
        if (!canvasRef.current) return;

        this.x += this.speedX;
        this.y += this.speedY;

        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          this.size = this.originalSize * 2;
          const force = (100 - distance) / 100;
          this.x -= dx * force * 0.02;
          this.y -= dy * force * 0.02;
        } else {
          this.size = this.originalSize;
        }

        if (this.x > canvasRef.current.width + 50) this.x = -50;
        else if (this.x < -50) this.x = canvasRef.current.width + 50;
        if (this.y > canvasRef.current.height + 50) this.y = -50;
        else if (this.y < -50) this.y = canvasRef.current.height + 50;
      }

      draw() {
        if (!ctx || !canvasRef.current) return;

        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.size * 3
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const drawConnections = () => {
      if (!ctx) return;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const opacity = 1 - distance / 150;
            ctx.strokeStyle = `rgba(100, 200, 255, ${opacity * 0.2})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push(new ParticleImpl(canvas));
    }

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.fillStyle = "rgba(15, 23, 42, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      drawConnections();

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0">
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}

export default ParticleBackground;
"use client";
import { useRef, useEffect } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  originalSize: number;
  opacity: number;
  layer: number;
  pulse: number;
  update: (mouseX: number, mouseY: number, width: number, height: number) => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

interface Burst {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  color: string;
}

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrame: number;
    let mouseX = -1000;
    let mouseY = -1000;
    let time = 0;
    const bursts: Burst[] = [];

    let viewportW = window.innerWidth;
    let viewportH = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rmQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = rmQuery.matches;
    let running = true;

    const getSettings = (w: number, rm: boolean) => {
      if (rm) {
        if (w < 640) return { layer0Count: 8, layer1Count: 6, connectDist: 0, gridSize: 140 };
        if (w < 1024) return { layer0Count: 12, layer1Count: 8, connectDist: 0, gridSize: 160 };
        return { layer0Count: 16, layer1Count: 10, connectDist: 0, gridSize: 180 };
      }
      if (w < 640) return { layer0Count: 25, layer1Count: 20, connectDist: 140, gridSize: 90 };
      if (w < 1024) return { layer0Count: 40, layer1Count: 30, connectDist: 170, gridSize: 110 };
      return { layer0Count: 50, layer1Count: 40, connectDist: 200, gridSize: 120 };
    };

    let settings = getSettings(viewportW, reducedMotion);

    let particles: ParticleImpl[] = [];
    let canRebuild = false;

    const resizeCanvas = () => {
      viewportW = window.innerWidth;
      viewportH = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(viewportW * dpr);
      canvas.height = Math.floor(viewportH * dpr);
      canvas.style.width = `${viewportW}px`;
      canvas.style.height = `${viewportH}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      settings = getSettings(viewportW, reducedMotion);
      if (canRebuild) rebuildParticles();
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    rmQuery.addEventListener?.("change", (e) => {
      reducedMotion = e.matches;
      settings = getSettings(viewportW, reducedMotion);
      rebuildParticles();
    });

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleClick = (e: MouseEvent) => {
      if (reducedMotion) return;
      bursts.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: 150,
        opacity: 0.8,
        color: "rgba(6, 182, 212, 0.4)"
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    const handleVisibility = () => {
      running = !document.hidden;
      if (running) {
        cancelAnimationFrame(animationFrame);
        animationFrame = requestAnimationFrame(animate);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    class ParticleImpl implements Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      originalSize: number;
      opacity: number;
      layer: number;
      pulse: number;

      constructor(width: number, height: number, layer: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.layer = layer;
        
        if (layer === 1) {
          this.originalSize = Math.random() * 2 + 1.5;
          this.speedX = ((Math.random() * 1 - 0.5) * 0.8) * (reducedMotion ? 0.6 : 1);
          this.speedY = ((Math.random() * 1 - 0.5) * 0.8) * (reducedMotion ? 0.6 : 1);
          this.opacity = Math.random() * 0.5 + 0.3;
        } else {
          this.originalSize = Math.random() * 1 + 0.5;
          this.speedX = ((Math.random() * 0.5 - 0.25) * 0.5) * (reducedMotion ? 0.6 : 1);
          this.speedY = ((Math.random() * 0.5 - 0.25) * 0.5) * (reducedMotion ? 0.6 : 1);
          this.opacity = Math.random() * 0.2 + 0.1;
        }

        this.size = this.originalSize;
        this.pulse = Math.random() * Math.PI * 2;
        
        const hues = [180, 210, 280];
        const hue = hues[Math.floor(Math.random() * hues.length)];
        this.color = `hsla(${hue}, 80%, 60%,`;
      }

      update(mX: number, mY: number, width: number, height: number) {
        this.pulse += reducedMotion ? 0.01 : 0.02;
        const waveX = Math.sin(this.pulse) * 0.2;
        const waveY = Math.cos(this.pulse) * 0.2;
        
        this.x += this.speedX + waveX;
        this.y += this.speedY + waveY;

        const dx = mX - this.x;
        const dy = mY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDist = reducedMotion ? 120 : 200;

        if (distance < maxDist) {
          const force = (maxDist - distance) / maxDist;
          this.x -= dx * force * (reducedMotion ? 0.03 : 0.05);
          this.y -= dy * force * (reducedMotion ? 0.03 : 0.05);
          this.size = this.originalSize * (1 + force * 2);
          if (this.layer === 1) this.opacity = Math.min(0.9, this.opacity + 0.05);
        } else {
          this.size = this.originalSize + Math.sin(this.pulse) * 0.5;
          if (this.layer === 1) this.opacity = Math.max(0.4, this.opacity - 0.01);
        }

        if (this.x > width + 20) this.x = -20;
        else if (this.x < -20) this.x = width + 20;
        if (this.y > height + 20) this.y = -20;
        else if (this.y < -20) this.y = height + 20;
      }

      draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = `${this.color} ${this.opacity})`;
        
        if (this.layer === 1) {
          context.shadowBlur = 15;
          context.shadowColor = "rgba(6, 182, 212, 0.6)";
        }
        
        context.fill();
        context.shadowBlur = 0;
      }
    }

    function rebuildParticles() {
      particles = [];
      for (let i = 0; i < settings.layer0Count; i++) {
        particles.push(new ParticleImpl(viewportW, viewportH, 0));
      }
      for (let i = 0; i < settings.layer1Count; i++) {
        particles.push(new ParticleImpl(viewportW, viewportH, 1));
      }
    }

    canRebuild = true;
    rebuildParticles();

    const drawConnections = () => {
      if (reducedMotion || settings.connectDist <= 0) return;
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        if (particles[i].layer === 0) continue;

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const connectDist = settings.connectDist;

          if (distance < connectDist) {
            const opacity = (1 - distance / connectDist) * 0.2;
            const mDx = (particles[i].x + particles[j].x) / 2 - mouseX;
            const mDy = (particles[i].y + particles[j].y) / 2 - mouseY;
            const mDist = Math.sqrt(mDx * mDx + mDy * mDy);
            const extraOpacity = mDist < 200 ? (200 - mDist) / 200 * 0.4 : 0;

            ctx.strokeStyle = `rgba(100, 200, 255, ${opacity + extraOpacity})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const drawScanningLine = () => {
      if (reducedMotion) return;
      const scanY = (time * 100) % viewportH;
      const gradient = ctx.createLinearGradient(0, scanY - 50, 0, scanY + 50);
      gradient.addColorStop(0, "rgba(6, 182, 212, 0)");
      gradient.addColorStop(0.5, "rgba(6, 182, 212, 0.05)");
      gradient.addColorStop(1, "rgba(6, 182, 212, 0)");
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, scanY - 50, viewportW, 100);
      
      ctx.strokeStyle = "rgba(6, 182, 212, 0.1)";
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(viewportW, scanY);
      ctx.stroke();
    };

    const updateBursts = () => {
      if (reducedMotion) return;
      for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i];
        b.radius += 4;
        b.opacity -= 0.02;
        
        if (b.opacity <= 0) {
          bursts.splice(i, 1);
          continue;
        }

        ctx.strokeStyle = `rgba(6, 182, 212, ${b.opacity})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    const animate = () => {
      if (!running) return;
      time += reducedMotion ? 0.004 : 0.01;
      ctx.fillStyle = "#0b1220";
      ctx.fillRect(0, 0, viewportW, viewportH);

      ctx.strokeStyle = "rgba(30, 41, 59, 0.3)";
      ctx.lineWidth = reducedMotion ? 0.5 : 1;
      const gridSize = settings.gridSize;
      const offsetX = (mouseX * 0.05) % gridSize;
      const offsetY = (mouseY * 0.05) % gridSize;
      
      for(let x = offsetX; x < viewportW; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, viewportH);
        ctx.stroke();
      }
      for(let y = offsetY; y < viewportH; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(viewportW, y);
        ctx.stroke();
      }

      drawScanningLine();

      particles.forEach((particle) => {
        particle.update(mouseX, mouseY, viewportW, viewportH);
        particle.draw(ctx);
      });

      drawConnections();
      updateBursts();

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 bg-[#0b1220]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_70%)]" />
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}

export default ParticleBackground;

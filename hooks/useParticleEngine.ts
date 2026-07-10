"use client";
import { useRef, useEffect } from "react";
import { ParticleImpl, getSettings } from "@/lib/particle-engine/particle";
import type { Burst } from "@/lib/particle-engine/particle";

export function useParticleEngine(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const raw = canvas.getContext("2d", { alpha: false });
    if (!raw) return;
    const ctx = raw;

    let animationFrame: number;
    let mouseX = -1000, mouseY = -1000, time = 0;
    const bursts: Burst[] = [];
    let viewportW = window.innerWidth, viewportH = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rmQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = rmQuery.matches;
    let running = true;

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
    const handleReducedMotion = (e: MediaQueryListEvent) => {
      reducedMotion = e.matches;
      settings = getSettings(viewportW, reducedMotion);
      rebuildParticles();
    };
    rmQuery.addEventListener?.("change", handleReducedMotion);

    const handleMouseMove = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };
    const handleClick = (e: MouseEvent) => {
      if (reducedMotion) return;
      bursts.push({ x: e.clientX, y: e.clientY, radius: 0, maxRadius: 150, opacity: 0.8, color: "rgba(6, 182, 212, 0.4)" });
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    const handleVisibility = () => {
      running = !document.hidden;
      if (running) { cancelAnimationFrame(animationFrame); animationFrame = requestAnimationFrame(animate); }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    function rebuildParticles() {
      particles = [];
      for (let i = 0; i < settings.layer0Count; i++) particles.push(new ParticleImpl(viewportW, viewportH, 0, reducedMotion));
      for (let i = 0; i < settings.layer1Count; i++) particles.push(new ParticleImpl(viewportW, viewportH, 1, reducedMotion));
    }

    canRebuild = true;
    rebuildParticles();

    function drawConnections() {
      if (reducedMotion || settings.connectDist <= 0) return;
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        if (particles[i].layer === 0) continue;
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < settings.connectDist) {
            const opacity = (1 - distance / settings.connectDist) * 0.2;
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
    }

    function drawScanningLine() {
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
    }

    function updateBursts() {
      if (reducedMotion) return;
      for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i];
        b.radius += 4;
        b.opacity -= 0.02;
        if (b.opacity <= 0) { bursts.splice(i, 1); continue; }
        ctx.strokeStyle = `rgba(6, 182, 212, ${b.opacity})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    function animate() {
      if (!running) return;
      time += reducedMotion ? 0.004 : 0.01;
      ctx.fillStyle = "#0b1220";
      ctx.fillRect(0, 0, viewportW, viewportH);
      ctx.strokeStyle = "rgba(30, 41, 59, 0.3)";
      ctx.lineWidth = reducedMotion ? 0.5 : 1;
      const gridSize = settings.gridSize;
      const offsetX = (mouseX * 0.05) % gridSize;
      const offsetY = (mouseY * 0.05) % gridSize;
      for (let x = offsetX; x < viewportW; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, viewportH); ctx.stroke();
      }
      for (let y = offsetY; y < viewportH; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(viewportW, y); ctx.stroke();
      }
      drawScanningLine();
      particles.forEach((p) => { p.update(mouseX, mouseY, viewportW, viewportH, reducedMotion); p.draw(ctx); });
      drawConnections();
      updateBursts();
      animationFrame = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      document.removeEventListener("visibilitychange", handleVisibility);
      rmQuery.removeEventListener?.("change", handleReducedMotion);
    };
  }, [canvasRef]);
}

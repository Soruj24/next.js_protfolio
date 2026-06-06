export interface Particle {
  x: number; y: number; size: number; speedX: number; speedY: number;
  color: string; originalSize: number; opacity: number; layer: number; pulse: number;
  update: (mouseX: number, mouseY: number, width: number, height: number, reducedMotion: boolean) => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

export interface Burst {
  x: number; y: number; radius: number; maxRadius: number; opacity: number; color: string;
}

export interface Settings {
  layer0Count: number; layer1Count: number; connectDist: number; gridSize: number;
}

export function getSettings(w: number, rm: boolean): Settings {
  if (rm) {
    if (w < 640) return { layer0Count: 8, layer1Count: 6, connectDist: 0, gridSize: 140 };
    if (w < 1024) return { layer0Count: 12, layer1Count: 8, connectDist: 0, gridSize: 160 };
    return { layer0Count: 16, layer1Count: 10, connectDist: 0, gridSize: 180 };
  }
  if (w < 640) return { layer0Count: 25, layer1Count: 20, connectDist: 140, gridSize: 90 };
  if (w < 1024) return { layer0Count: 40, layer1Count: 30, connectDist: 170, gridSize: 110 };
  return { layer0Count: 50, layer1Count: 40, connectDist: 200, gridSize: 120 };
}

export class ParticleImpl implements Particle {
  x: number; y: number; size: number; speedX: number; speedY: number;
  color: string; originalSize: number; opacity: number; layer: number; pulse: number;

  constructor(width: number, height: number, layer: number, reducedMotion: boolean) {
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

  update(mX: number, mY: number, width: number, height: number, reducedMotion: boolean) {
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

import { useRef } from 'react';
import type React from 'react';

// Culture palette particle colors — no random-hue default, no Magenta, no Sports colors
const BURST_COLORS = [
  '#8A5CFF', // Aurora Violet
  '#EDE4D3', // Champagne Pearl
  '#E6DFF6', // Soft Lilac
  '#C0C0C0', // Silver
  '#8A5CFF', // Aurora Violet (weighted heavier — appears twice)
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
  gravity: number;
}

interface StampBurstProps {
  children: React.ReactNode;
  particleCount?: number;
}

let globalCanvas: HTMLCanvasElement | null = null;
let globalCtx: CanvasRenderingContext2D | null = null;
let particles: Particle[] = [];
let animId: number | null = null;

function ensureCanvas() {
  if (globalCanvas) return;
  globalCanvas = document.createElement('canvas');
  globalCanvas.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 9999;
  `;
  globalCanvas.width = window.innerWidth;
  globalCanvas.height = window.innerHeight;
  document.body.appendChild(globalCanvas);
  globalCtx = globalCanvas.getContext('2d');

  window.addEventListener('resize', () => {
    if (globalCanvas) {
      globalCanvas.width = window.innerWidth;
      globalCanvas.height = window.innerHeight;
    }
  });
}

function tick() {
  if (!globalCtx || !globalCanvas) return;
  globalCtx.clearRect(0, 0, globalCanvas.width, globalCanvas.height);

  let alive = false;
  for (const p of particles) {
    if (p.alpha <= 0) continue;
    p.x += p.vx;
    p.y += p.vy;
    p.vy += p.gravity;
    p.vx *= 0.98;
    p.alpha -= 0.022;
    if (p.alpha <= 0) continue;
    alive = true;

    globalCtx.save();
    globalCtx.globalAlpha = p.alpha;
    globalCtx.fillStyle = p.color;
    globalCtx.beginPath();
    const sides = 6;
    for (let i = 0; i < sides; i++) {
      const a = (Math.PI * 2 * i) / sides - Math.PI / 6;
      const r = p.size * (1 - 0.15 * (i % 2));
      if (i === 0) globalCtx.moveTo(p.x + r * Math.cos(a), p.y + r * Math.sin(a));
      else globalCtx.lineTo(p.x + r * Math.cos(a), p.y + r * Math.sin(a));
    }
    globalCtx.closePath();
    globalCtx.fill();
    globalCtx.restore();
  }

  if (alive) {
    animId = requestAnimationFrame(tick);
  } else {
    animId = null;
    particles = [];
  }
}

export function StampBurst({ children, particleCount = 30 }: StampBurstProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  function fireParticles(originX: number, originY: number) {
    ensureCanvas();

    const newParticles: Particle[] = Array.from({ length: particleCount }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 2;
      return {
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - Math.random() * 3,
        alpha: 1,
        color: BURST_COLORS[Math.floor(Math.random() * BURST_COLORS.length)],
        size: Math.random() * 8 + 4,
        gravity: 0.12 + Math.random() * 0.08,
      };
    });

    particles.push(...newParticles);

    if (!animId) {
      animId = requestAnimationFrame(tick);
    }
  }

  function handleClick(e: React.MouseEvent) {
    fireParticles(e.clientX, e.clientY);
  }

  return (
    <span ref={containerRef} onClick={handleClick} style={{ display: 'contents' }}>
      {children}
    </span>
  );
}

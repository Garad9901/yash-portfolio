'use client';

import { useEffect, useRef } from 'react';

// A still starfield, drawn once per resize. Cheap, and it never moves on its own.
export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let seed = 7;
    const rand = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth, h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const glow = ctx.createRadialGradient(w * 0.78, h * 0.35, 0, w * 0.78, h * 0.35, Math.max(w, h) * 0.6);
      glow.addColorStop(0, 'rgba(44, 76, 140, 0.20)');
      glow.addColorStop(1, 'rgba(6, 10, 20, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      seed = 7;
      const n = Math.round((w * h) / 5200);
      for (let i = 0; i < n; i++) {
        const x = rand() * w, y = rand() * h, r = rand() < 0.93 ? rand() * 0.9 + 0.2 : rand() * 1.4 + 0.8;
        const warm = rand() < 0.08;
        ctx.fillStyle = warm ? `rgba(255, 196, 130, ${0.35 + rand() * 0.4})` : `rgba(210, 225, 255, ${0.18 + rand() * 0.55})`;
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
      }
    };

    draw();
    window.addEventListener('resize', draw);
    return () => window.removeEventListener('resize', draw);
  }, []);

  return <canvas ref={ref} className="starfield" aria-hidden="true" />;
}

"use client";
import { useRef } from "react";

export default function useFireworks() {
  const canvasRef = useRef(null);

  const launch = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width = window.innerWidth;
    const h = canvas.height = window.innerHeight;

    let particles = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: w / 2,
        y: h / 2,
        dx: (Math.random() - 0.5) * 6,
        dy: (Math.random() - 0.5) * 6,
        life: 100,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,200,100,0.8)";
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        p.life--;
      });
      particles = particles.filter((p) => p.life > 0);
      if (particles.length > 0) requestAnimationFrame(render);
    };
    render();
  };

  return { canvasRef, launch };
}

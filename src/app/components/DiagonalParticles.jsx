"use client"
import { useEffect, useRef } from "react";

export default function DiagonalParticles() {
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const spacing = 60;
    const speed = 0.6;
    const count = Math.ceil(canvas.width / spacing) + 10;
    const particles = [];

    for (let i = 0; i < count; i++) {
      const offsetY = Math.random() * canvas.height;
      const x = i * spacing;
      const y = offsetY;
      particles.push({ x, y });
    }

    intervalRef.current = setInterval(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(255, 255, 255, 0.08)";

      for (let p of particles) {
        p.x += speed;
        p.y += speed;

        if (p.x > canvas.width + 20 || p.y > canvas.height + 20) {
          p.x = p.x - canvas.width - spacing;
          p.y = p.y - canvas.height - spacing;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }, 16);

    return () => {
      clearInterval(intervalRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
}

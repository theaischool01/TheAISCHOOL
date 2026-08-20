"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  baseAlpha: number;
}

const FLAG_COLORS = [
  "#0038A8", // Philippine Navy Blue
  "#CE1126", // Philippine Red
  "#FCD116", // Philippine Golden Yellow
  "#FFFFFF", // Pure White
];

export default function PhFlagParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000, active: false };

    const setCanvasSize = () => {
      if (!canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    };

    const initParticles = () => {
      if (!canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Reduced node density by ~50% so it reads as texture, not clutter
      const isMobile = width < 768;
      const count = isMobile ? 18 : 32;

      particles = [];
      for (let i = 0; i < count; i++) {
        const color = FLAG_COLORS[Math.floor(Math.random() * FLAG_COLORS.length)];
        const alpha = Math.random() * 0.25 + 0.15;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 1.5 + 1.0,
          color,
          alpha,
          baseAlpha: alpha,
        });
      }
    };

    setCanvasSize();
    initParticles();

    // Page load flourish: 3 connector lines drawing toward logo center over ~1.5s
    const startTime = performance.now();
    const loadDuration = 1500; // ms

    const edgePoints = [
      { x: 0, y: 50 },
      { x: 0, y: 300 },
      { x: 50, y: 0 },
    ];

    const handleResize = () => {
      setCanvasSize();
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const parentElem = canvas.parentElement;
    if (parentElem) {
      parentElem.addEventListener("mousemove", handleMouseMove);
      parentElem.addEventListener("mouseleave", handleMouseLeave);
    }
    window.addEventListener("resize", handleResize);

    // Main render loop
    const render = (timestamp: number) => {
      if (!canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      const maxConnectDist = 100;
      const mouseRadius = 140;
      const elapsed = timestamp - startTime;
      const loadProgress = Math.min(1, elapsed / loadDuration);

      // Target logo center area (approx right side center)
      const targetX = width > 1024 ? width * 0.72 : width * 0.5;
      const targetY = height * 0.5;

      // Draw load flourish connector lines
      if (loadProgress > 0) {
        edgePoints.forEach((ep) => {
          const currentX = ep.x + (targetX - ep.x) * loadProgress;
          const currentY = ep.y + (targetY - ep.y) * loadProgress;
          ctx.beginPath();
          ctx.moveTo(ep.x, ep.y);
          ctx.lineTo(currentX, currentY);
          ctx.strokeStyle = "#0038A8";
          ctx.globalAlpha = 0.12 * (1 - loadProgress * 0.5);
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 4]);
          ctx.stroke();
          ctx.setLineDash([]);
        });
      }

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around bounds
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse attraction & line interaction
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseRadius) {
            const force = (1 - dist / mouseRadius) * 0.025;
            p.x += dx * force;
            p.y += dy * force;

            // Line from particle to cursor
            const mouseLineAlpha = (1 - dist / mouseRadius) * 0.25;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = mouseLineAlpha;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        // Connect particles to each other
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDist) {
            const lineAlpha = (1 - dist / maxConnectDist) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = lineAlpha;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (parentElem) {
        parentElem.removeEventListener("mousemove", handleMouseMove);
        parentElem.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-500"
    />
  );
}

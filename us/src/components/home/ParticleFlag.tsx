"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

interface Particle {
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  g: number;
  b: number;
  alpha: number;
  phase: number;
  size: number;
}

export default function ParticleFlag() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion || isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;
    let particles: Particle[] = [];
    let mouseX = -9999;
    let mouseY = -9999;
    let startTime: number | null = null;
    const MORPH_DURATION = 1800; // 1.8s morph animation

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = "/us/assets/us_flag_infinity.png";

    img.onload = () => {
      // Set canvas render resolution
      const displayWidth = Math.min(canvas.parentElement?.clientWidth || 500, 520);
      const displayHeight = Math.round((displayWidth * 340) / 520);
      canvas.width = displayWidth;
      canvas.height = displayHeight;

      // Sample pixels using an offscreen canvas
      const offscreen = document.createElement("canvas");
      const sampleW = 200;
      const sampleH = Math.round((sampleW * displayHeight) / displayWidth);
      offscreen.width = sampleW;
      offscreen.height = sampleH;
      const offCtx = offscreen.getContext("2d");
      if (!offCtx) return;

      offCtx.drawImage(img, 0, 0, sampleW, sampleH);
      const imgData = offCtx.getImageData(0, 0, sampleW, sampleH).data;

      const newParticles: Particle[] = [];
      const scaleX = displayWidth / sampleW;
      const scaleY = displayHeight / sampleH;
      const step = 2; // Sample step for ~2000-2500 particles

      for (let y = 0; y < sampleH; y += step) {
        for (let x = 0; x < sampleW; x += step) {
          const idx = (y * sampleW + x) * 4;
          const alpha = imgData[idx + 3];

          if (alpha > 60) {
            const targetX = x * scaleX;
            const targetY = y * scaleY;

            // Initial cloud position in a loose sphere
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 250 + 100;
            const startX = displayWidth / 2 + Math.cos(angle) * radius;
            const startY = displayHeight / 2 + Math.sin(angle) * radius;

            const origR = imgData[idx];
            const origG = imgData[idx + 1];
            const origB = imgData[idx + 2];

            const maxC = Math.max(origR, origG, origB);
            const minC = Math.min(origR, origG, origB);

            let pr = origR;
            let pg = origG;
            let pb = origB;
            let palpha = 1.0;

            if (origR > 160 && origG > 160 && origB > 160 && maxC - minC < 50) {
              // White dots - keep crisp as-is for high contrast
              pr = origR;
              pg = origG;
              pb = origB;
              palpha = 0.95;
            } else if (origR >= origB && origR >= origG) {
              // Red dots - vibrant, deep, saturated brand red #EE1C25 (238, 28, 37)
              const factor = Math.max(0.85, Math.min(1.15, (origR + origG + origB) / 200));
              pr = Math.min(255, Math.round(238 * factor));
              pg = Math.min(255, Math.round(28 * factor));
              pb = Math.min(255, Math.round(37 * factor));
              palpha = 1.0;
            } else if (origB > origR && origB >= origG) {
              // Blue dots - richer navy blue (16, 42, 92)
              const factor = Math.max(0.8, Math.min(1.2, (origR + origG + origB) / 180));
              pr = Math.min(255, Math.round(16 * factor));
              pg = Math.min(255, Math.round(42 * factor));
              pb = Math.min(255, Math.round(92 * factor));
              palpha = 1.0;
            }

            newParticles.push({
              startX,
              startY,
              targetX,
              targetY,
              x: startX,
              y: startY,
              vx: 0,
              vy: 0,
              r: pr,
              g: pg,
              b: pb,
              alpha: palpha,
              phase: Math.random() * Math.PI * 2,
              size: Math.random() * 0.8 + 1.6,
            });
          }
        }
      }

      particles = newParticles;
      setIsLoaded(true);

      // Mouse position listener relative to canvas
      const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
      };

      const handleMouseLeave = () => {
        mouseX = -9999;
        mouseY = -9999;
      };

      window.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseleave", handleMouseLeave);

      // Canvas Render Loop
      const render = (time: number) => {
        if (!startTime) startTime = time;
        const elapsed = time - startTime;
        const morphProgress = Math.min(elapsed / MORPH_DURATION, 1);
        // Cubic ease-out morph curve
        const easeMorph = 1 - Math.pow(1 - morphProgress, 3);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const repulsionRadius = 75;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // 1. Morph lerp position from initial cloud to flag shape
          const currentBaseX = p.startX + (p.targetX - p.startX) * easeMorph;
          const currentBaseY = p.startY + (p.targetY - p.startY) * easeMorph;

          // 2. Idle sine-wave floating motion once assembled
          const idleOffset = easeMorph >= 1 ? Math.sin(time * 0.002 + p.phase) * 1.5 : 0;

          // 3. Mouse cursor repulsion physics
          if (mouseX > 0 && mouseY > 0) {
            const dx = p.x - mouseX;
            const dy = p.y - mouseY;
            const dist = Math.hypot(dx, dy);

            if (dist < repulsionRadius && dist > 0) {
              const force = (1 - dist / repulsionRadius) * 6;
              p.vx += (dx / dist) * force;
              p.vy += (dy / dist) * force;
            }
          }

          // Spring relaxation of repulsion velocity
          p.vx *= 0.86;
          p.vy *= 0.86;

          p.x = currentBaseX + p.vx;
          p.y = currentBaseY + idleOffset + p.vy;

          // Render particle as small crisp filled dot
          ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${p.alpha})`;
          ctx.fillRect(p.x, p.y, p.size, p.size);
        }

        animFrameId = requestAnimationFrame(render);
      };

      animFrameId = requestAnimationFrame(render);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      };
    };

    return () => {
      cancelAnimationFrame(animFrameId);
    };
  }, [shouldReduceMotion, isMobile]);

  // Fallback to static image on mobile or reduced-motion
  if (shouldReduceMotion || isMobile) {
    return (
      <Image
        src="/us/assets/us_flag_infinity.png"
        alt="Glossy 3D American Flag Infinity Graphic"
        width={520}
        height={340}
        priority
        className="object-contain pointer-events-none select-none drop-shadow-2xl"
      />
    );
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className={`object-contain transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
      {!isLoaded && (
        <Image
          src="/us/assets/us_flag_infinity.png"
          alt="Glossy 3D American Flag Infinity Graphic"
          width={520}
          height={340}
          priority
          className="object-contain pointer-events-none select-none drop-shadow-2xl absolute inset-0 m-auto"
        />
      )}
    </div>
  );
}

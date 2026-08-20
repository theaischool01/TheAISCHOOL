"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ParticleFlag from "./ParticleFlag";
import { useMagneticButton, triggerRipple } from "@us/hooks/useMagneticButton";

export default function USHeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const exploreBtnRef = useRef<HTMLAnchorElement | null>(null);
  const assessmentBtnRef = useRef<HTMLAnchorElement | null>(null);

  // Task 2: Apply reusable magnetic hook to both CTA buttons
  const exploreMagnetic = useMagneticButton(exploreBtnRef, { maxDisplacement: 12, proximity: 90 });
  const assessmentMagnetic = useMagneticButton(assessmentBtnRef, { maxDisplacement: 12, proximity: 90 });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Task 3: Parallax Mouse Handler using requestAnimationFrame
  const animFrameRef = useRef<number | null>(null);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || window.innerWidth < 768) return;
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) / (width / 2);
    const y = (clientY - top - height / 2) / (height / 2);

    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(() => {
      setParallax({ x, y });
    });
  };

  const handleMouseLeave = () => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setParallax({ x: 0, y: 0 });
  };

  const particles = [
    { top: "15%", left: "10%", size: 3 },
    { top: "25%", left: "80%", size: 4 },
    { top: "65%", left: "15%", size: 3 },
    { top: "45%", left: "90%", size: 5 },
    { top: "75%", left: "75%", size: 3 },
  ];

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[calc(100vh-140px)] bg-white text-[#171717] flex flex-col justify-center py-16 lg:py-24 overflow-hidden select-none z-10"
    >
      {/* ================= TASK 3: LAYER 1 (BACK LAYER - GRID & AMBIENT PARTICLES) ================= */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] z-0 transition-transform duration-300 ease-out"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.5) 0.5px, transparent 0.5px), linear-gradient(to bottom, rgba(0,0,0,0.5) 0.5px, transparent 0.5px)`,
          backgroundSize: "30px 30px",
          transform: `translate3d(${parallax.x * 6}px, ${parallax.y * 6}px, 0px)`,
        }}
      />

      {mounted && !shouldReduceMotion && (
        <div
          className="absolute inset-0 pointer-events-none z-0 overflow-hidden transition-transform duration-300 ease-out"
          style={{
            transform: `translate3d(${parallax.x * 6}px, ${parallax.y * 6}px, 0px)`,
          }}
        >
          {particles.map((p, idx) => (
            <motion.div
              key={idx}
              animate={{
                y: [0, -12, 0],
                opacity: [0.1, 0.25, 0.1],
              }}
              transition={{
                duration: 5 + idx * 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                position: "absolute",
                top: p.top,
                left: p.left,
                width: p.size,
                height: p.size,
                borderRadius: "50%",
                backgroundColor: "#EE1C25",
              }}
            />
          ))}
        </div>
      )}

      {/* ================= TASK 3: LAYER 2 (MID LAYER - SOFT AMBIENT RADIAL GLOW BLOB) ================= */}
      <div
        className="absolute top-[50%] left-[75%] -translate-x-1/2 -translate-y-1/2 w-[65vw] h-[65vw] max-w-[650px] max-h-[650px] rounded-full bg-red-500/[0.035] blur-[140px] pointer-events-none z-0 transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${-50 + parallax.x * 14}px, ${-50 + parallax.y * 14}px, 0px)`,
        }}
      />

      {/* ================= TASK 3: LAYER 3 (FRONT LAYER - HEADLINE, MAGNETIC CTAS & PARTICLE FLAG) ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        {/* Left Content Side */}
        <div
          className="w-full lg:w-[48%] space-y-7 flex flex-col items-start text-left z-20 transition-transform duration-300 ease-out"
          style={{
            transform: `translate3d(${parallax.x * 18}px, ${parallax.y * 18}px, 0px)`,
          }}
        >
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-[48px] xl:text-[54px] font-black font-heading text-[#171717] tracking-tight leading-[1.08]">
              Step into the Top 1% of the{" "}
              <span className="text-[#EE1C25] relative inline-block">
                AI-Ready Workforce.
              </span>
            </h1>

            <p className="text-[#6B7280] font-heading font-extrabold text-xs sm:text-sm tracking-widest uppercase">
              WHERE INTELLIGENCE MEETS INNOVATION.
            </p>
          </div>

          {/* TASK 2: Magnetic Action CTAs with Ripple Click Effect */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2">
            <a
              ref={exploreBtnRef}
              href="#courses"
              onClick={triggerRipple}
              style={{
                transform: `translate3d(${exploreMagnetic.x}px, ${exploreMagnetic.y}px, 0px)`,
              }}
              className="relative overflow-hidden inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#EE1C25] hover:bg-[#D3131B] text-white text-xs font-black uppercase tracking-wider rounded-full transition-all duration-200 shadow-[0_4px_14px_rgba(238,28,37,0.18)] hover:shadow-[0_6px_22px_rgba(238,28,37,0.3)] active:scale-95 cursor-pointer"
            >
              <span>EXPLORE PROGRAMS</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              ref={assessmentBtnRef}
              href="#register"
              onClick={triggerRipple}
              style={{
                transform: `translate3d(${assessmentMagnetic.x}px, ${assessmentMagnetic.y}px, 0px)`,
              }}
              className="relative overflow-hidden inline-flex items-center justify-center gap-2 px-8 py-4 border border-neutral-200 bg-white hover:bg-neutral-50 text-[#171717] hover:text-[#EE1C25] text-xs font-black uppercase tracking-wider rounded-full shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <span>TAKE ASSESSMENT</span>
            </a>
          </div>
        </div>

        {/* Right Side: TASK 1 Canvas Particle Flag System */}
        <div
          className="w-full lg:w-[52%] flex justify-center items-center relative overflow-visible select-none py-4 transition-transform duration-300 ease-out"
          style={{
            transform: `translate3d(${parallax.x * 22}px, ${parallax.y * 22}px, 0px)`,
          }}
        >
          {mounted && (
            <div className="relative w-full max-w-[460px] sm:max-w-[500px] lg:max-w-[540px] aspect-[4/3] flex items-center justify-center">
              {/* Dotted backdrop ring */}
              <div className="absolute inset-2 border border-dashed border-neutral-200/80 rounded-full pointer-events-none z-0" />
              <div className="absolute inset-10 border border-neutral-100 rounded-full pointer-events-none z-0" />

              {/* Soft diffused red glow */}
              <div
                className="absolute inset-[-10%] pointer-events-none z-0"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(238,28,37,0.08) 0%, rgba(238,28,37,0.015) 60%, transparent 80%)",
                }}
              />

              {/* TASK 1 Canvas Particle Flag Component */}
              <div className="relative w-full h-full flex items-center justify-center z-10 p-4">
                <ParticleFlag />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

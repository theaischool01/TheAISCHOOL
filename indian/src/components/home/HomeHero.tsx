"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useRegion } from "@/context/RegionContext";

export default function HomeHero() {
  const { regionConfig } = useRegion();
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) / (width / 2);
    const y = (clientY - top - height / 2) / (height / 2);
    setCoords({ x: x * 8, y: y * 8 });
  };

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0 });
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
      className="relative w-full min-h-[calc(100vh-76px)] bg-transparent text-[#171717] flex flex-col justify-center py-12 lg:py-20 overflow-hidden select-none z-10"
    >
      {/* 1. Engineering paper style background grid (0.5px lines, opacity 4%) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.045] z-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.5) 0.5px, transparent 0.5px), linear-gradient(to bottom, rgba(0,0,0,0.5) 0.5px, transparent 0.5px)`,
          backgroundSize: "30px 30px",
        }}
      />

      {/* 2. Soft Red ambient radial glow centered behind content */}
      <div className="absolute top-[50%] left-[75%] -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full bg-red-500/[0.025] blur-[150px] pointer-events-none z-0" />

      {/* 3. Tiny floating red particles */}
      {mounted && !shouldReduceMotion && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {particles.map((p, idx) => (
            <motion.div
              key={idx}
              animate={{
                y: [0, -12, 0],
                opacity: [0.08, 0.16, 0.08]
              }}
              transition={{
                duration: 5 + idx * 1.5,
                repeat: Infinity,
                ease: "easeInOut"
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

      {/* Hero Content Wrapper - 48% / 52% Composition on Desktop */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">

        {/* Left Side (48% on desktop) */}
        <div className="w-full lg:w-[48%] space-y-7 flex flex-col items-start text-left z-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-100 rounded-full">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#EE1C25]">
              {regionConfig.code === "in" 
                ? "India's only school where startup Leaders teach AI skills."
                : `${regionConfig.name}'s only school where startup Leaders teach AI skills.`}
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-[44px] xl:text-[50px] font-black font-heading text-[#171717] tracking-tight leading-[1.1]">
              {regionConfig.code === "in" ? (
                <>
                  India's Only School to Learn AI Skills from Tech Startup{" "}
                  <span className="text-[#EE1C25] relative inline-block">
                    Founders & Leaders.
                  </span>
                </>
              ) : (
                <>
                  Step into the Top 1% of the{" "}
                  <span className="text-[#EE1C25] relative inline-block">
                    AI-Ready Workforce.
                  </span>
                </>
              )}
            </h1>
            <p className="text-[#6B7280] font-heading font-extrabold text-xs sm:text-sm tracking-widest uppercase">
              {regionConfig.code === "in" ? "WHERE INTELLIGENCE MEETS INNOVATION." : "Upskill. Get Hired."}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a
              href="/learn"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#EE1C25] hover:bg-[#D3131B] text-white text-xs font-black uppercase tracking-wider rounded-full transition-all duration-200 shadow-[0_4px_12px_rgba(238,28,37,0.15)] hover:shadow-[0_4px_20px_rgba(238,28,37,0.25)] active:scale-98"
            >
              <span>Explore Programs</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="/assessment"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-neutral-200 bg-white hover:bg-neutral-50 text-[#171717] text-xs font-black uppercase tracking-wider rounded-full shadow-sm transition-all duration-200 active:scale-98"
            >
              <span>Take Assessment</span>
            </a>
          </div>
        </div>

        {/* Right Side (52% on desktop) */}
        <div className="w-full lg:w-[52%] flex justify-center items-center relative overflow-visible select-none">
          {mounted && regionConfig.code === "in" ? (
            <div className="relative w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[540px] aspect-[4/3] flex items-center justify-center">
              {/* Diffused shadow underneath */}
              <div 
                className="absolute w-[80%] h-[75%] bg-white rounded-full blur-2xl pointer-events-none z-0"
                style={{ boxShadow: "0 0 80px 60px #ffffff" }}
              />

              {/* Soft radial red glow */}
              <div
                className="absolute inset-[-15%] pointer-events-none z-10"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(238,28,37,0.07) 0%, rgba(238,28,37,0.015) 55%, transparent 75%)",
                }}
              />

              <motion.div
                style={{ x: coords.x, y: coords.y }}
                animate={{
                  y: shouldReduceMotion ? 0 : [0, -8, 0],
                  scale: shouldReduceMotion ? 1 : [1, 1.02, 1],
                }}
                transition={{
                  y: { duration: 5.0, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
                  scale: { duration: 7.0, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
                }}
                className="relative w-full h-full flex items-center justify-center z-20"
              >
                <Image
                  src={regionConfig.assets.hero}
                  alt="The AI School 3D Infinity Logo"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 540px"
                  className="object-contain pointer-events-none select-none mix-blend-multiply [mask-image:radial-gradient(circle_at_center,black_50%,rgba(0,0,0,0.85)_75%,transparent_98%)]"
                />
              </motion.div>
            </div>
          ) : (
            mounted && (
              <div className="w-full max-w-[500px] aspect-[72/62] z-20">
                <svg viewBox="0 0 720 620" className="w-full h-full">
                  <defs>
                    <radialGradient id="glow" cx="55%" cy="40%" r="55%">
                      <stop offset="0%" stopColor="#EE1C25" stopOpacity="0.08"/>
                      <stop offset="100%" stopColor="#EE1C25" stopOpacity="0"/>
                    </radialGradient>
                  </defs>
                  <rect width="720" height="620" fill="url(#glow)"/>
                  <circle cx="420" cy="330" r="260" fill="none" stroke="#000000" strokeOpacity="0.05"/>
                  <circle cx="420" cy="330" r="260" strokeDasharray="1 7" fill="none" stroke="#EE1C25" strokeOpacity="0.3" strokeWidth="1.5"/>
                  <circle cx="130" cy="120" r="3" fill="#EE1C25" opacity="0.5"/>
                  <circle cx="600" cy="140" r="2.5" fill="#000" opacity="0.2"/>
                  <circle cx="620" cy="100" r="2" fill="#EE1C25" opacity="0.4"/>
                  <circle cx="100" cy="220" r="2" fill="#000" opacity="0.2"/>
                  <ellipse cx="380" cy="580" rx="260" ry="26" fill="#000" opacity="0.06"/>
                  
                  {/* Box 1 (White) */}
                  <polygon points="140,470 180,490 140,510 100,490" fill="#fff" stroke="#00000014"/>
                  <polygon points="100,490 140,510 140,545 100,525" fill="#f1f1f1" stroke="#00000014"/>
                  <polygon points="140,510 180,490 180,525 140,545" fill="#dcdcdc" stroke="#00000014"/>
                  
                  {/* Box 2 (Light Gray) */}
                  <polygon points="240,430 280,450 240,470 200,450" fill="#f2f2f2" stroke="#00000018"/>
                  <polygon points="200,450 240,470 240,545 200,525" fill="#c9c9c9" stroke="#00000018"/>
                  <polygon points="240,470 280,450 280,525 240,545" fill="#a8a8a8" stroke="#00000018"/>
                  
                  {/* Box 3 (Charcoal) */}
                  <polygon points="340,380 380,400 340,420 300,400" fill="#4a4a4a" stroke="#00000030"/>
                  <polygon points="300,400 340,420 340,545 300,525" fill="#2b2b2b" stroke="#00000030"/>
                  <polygon points="340,420 380,400 380,525 340,545" fill="#171717" stroke="#00000030"/>
                  
                  {/* Box 4 (Red - Tallest) */}
                  <polygon points="440,310 480,330 440,350 400,330" fill="#ff6b64" stroke="#00000020"/>
                  <polygon points="400,330 440,350 440,545 400,525" fill="#EE1C25" stroke="#00000020"/>
                  <polygon points="440,350 480,330 480,525 440,545" fill="#b8141a" stroke="#00000020"/>
                  
                  {/* Flagpole & Flag */}
                  <line x1="460" y1="330" x2="460" y2="200" stroke="#171717" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M460,200 L460,235 L525,222 L460,208 Z" fill="#EE1C25"/>
                  <circle cx="460" cy="330" r="6" fill="#fff" stroke="#EE1C25" strokeWidth="2"/>
                  
                  <circle cx="200" cy="260" r="3" fill="#171717" opacity="0.4"/>
                  <circle cx="540" cy="250" r="3" fill="#EE1C25" opacity="0.4"/>
                  <circle cx="560" cy="310" r="2.5" fill="#171717" opacity="0.3"/>
                </svg>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

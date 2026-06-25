"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function HomeHero() {
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

  const trustCompanies = [
    { name: "Google" },
    { name: "AWS" },
    { name: "Microsoft" },
    { name: "NVIDIA" },
    { name: "GitHub" },
    { name: "Hugging Face" }
  ];

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
      className="relative w-full min-h-[80vh] bg-white text-[#171717] flex flex-col justify-between pt-14 pb-12 overflow-hidden border-b border-neutral-150/50 select-none z-10"
    >
      {/* 1. Engineering paper style background grid (0.5px lines, opacity 4%) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04] z-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.5) 0.5px, transparent 0.5px), linear-gradient(to bottom, rgba(0,0,0,0.5) 0.5px, transparent 0.5px)`,
          backgroundSize: "30px 30px",
        }}
      />

      {/* 2. Soft Red ambient radial glow centered behind content */}
      <div className="absolute top-[35%] left-[75%] -translate-x-1/2 -translate-y-1/2 w-[65vw] h-[65vw] rounded-full bg-red-500/[0.018] blur-[140px] pointer-events-none z-0" />

      {/* 3. Tiny floating red particles */}
      {mounted && !shouldReduceMotion && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {particles.map((p, idx) => (
            <motion.div
              key={idx}
              animate={{
                y: [0, -10, 0],
                opacity: [0.08, 0.14, 0.08]
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

      {/* Hero Content Wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center flex-1">
        
        {/* Left Side (45% on desktop layout) */}
        <div className="lg:col-span-5 space-y-7 flex flex-col items-start text-left z-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-50 border border-neutral-150/60 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EE1C25] animate-pulse" />
            <span className="text-[10px] md:text-xs font-black uppercase tracking-wider text-neutral-400 font-sans">
              India's First AI Learning Ecosystem
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[42px] xl:text-[46px] font-black font-heading text-[#171717] tracking-tight leading-[1.12]">
              India's Only School to Learn AI Skills from Tech Startup{" "}
              <span className="text-[#EE1C25] relative inline-block">
                Founders & Leaders.
              </span>
            </h1>
            <p className="text-[#6B7280] font-heading font-extrabold text-xs sm:text-sm tracking-widest uppercase">
              WHERE INTELLIGENCE MEETS INNOVATION.
            </p>
          </div>

          {/* Description */}
          <p className="text-gray-700 text-sm md:text-base leading-relaxed font-sans font-medium max-w-lg">
            At The AI School, we don't just teach. We empower students, professionals, and founders to build real products, resolve real-world challenges, and architect the AI ecosystem.
          </p>
          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a
              href="/courses"
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

        {/* Right Side (55% on desktop - Interactive Knowledge Transformation Flow Engine) */}
        <div className="lg:col-span-7 flex justify-center items-center relative min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] w-full overflow-visible select-none">
          {mounted && (
            <div className="relative w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] lg:w-[580px] lg:h-[580px] flex items-center justify-center">
              
              {/* Subtle background glow & engineering grids */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <div className="absolute w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(255,255,255,1)_0%,rgba(238,28,37,0.008)_40%,rgba(238,28,37,0.001)_75%,transparent_100%)] rounded-full blur-[60px]" />
              </div>

              {/* SVG Trajectories & Flow Particles Layer */}
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none z-10" 
                viewBox="0 0 600 600"
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Curved flow paths (extremely thin, brand red tint, mathematically balanced endpoints) */}
                {/* 1. AI Education -> Center */}
                <path id="flow-edu" d="M 128 195 Q 190 230 300 315" stroke="#EE1C25" strokeWidth="1.2" strokeOpacity="0.08" />
                {/* 2. Coding & Dev -> Center */}
                <path id="flow-code" d="M 90 315 Q 180 305 300 315" stroke="#EE1C25" strokeWidth="1.2" strokeOpacity="0.08" />
                {/* 3. AI Research -> Center */}
                <path id="flow-research" d="M 128 435 Q 190 400 300 315" stroke="#EE1C25" strokeWidth="1.2" strokeOpacity="0.08" />
                {/* 4. Center -> Startup Incubation */}
                <path id="flow-startup" d="M 300 315 Q 410 230 472 195" stroke="#EE1C25" strokeWidth="1.2" strokeOpacity="0.08" />
                {/* 5. Center -> Career Support */}
                <path id="flow-career" d="M 300 315 Q 420 305 510 315" stroke="#EE1C25" strokeWidth="1.2" strokeOpacity="0.08" />
                {/* 6. Center -> Community */}
                <path id="flow-comm" d="M 300 315 Q 410 400 472 435" stroke="#EE1C25" strokeWidth="1.2" strokeOpacity="0.08" />

                {/* Animated Particles flowing along paths */}
                {/* AI Education stream particles (Flowing in) */}
                <circle r="3" fill="#EE1C25" opacity="0.8">
                  <animateMotion path="M 128 195 Q 190 230 300 315" dur="4.2s" repeatCount="indefinite" begin="0s" calcMode="spline" keyTimes="0;1" keySplines="0.4 0 0.2 1" />
                </circle>
                <circle r="2" fill="#EE1C25" opacity="0.4">
                  <animateMotion path="M 128 195 Q 190 230 300 315" dur="4.2s" repeatCount="indefinite" begin="2.1s" calcMode="spline" keyTimes="0;1" keySplines="0.4 0 0.2 1" />
                </circle>

                {/* Coding & Development stream particles (Flowing in) */}
                <circle r="2.5" fill="#EE1C25" opacity="0.7">
                  <animateMotion path="M 90 315 Q 180 305 300 315" dur="3.6s" repeatCount="indefinite" begin="0.8s" calcMode="spline" keyTimes="0;1" keySplines="0.1 0.8 0.3 1" />
                </circle>
                <circle r="4" fill="#EE1C25" opacity="0.9">
                  <animateMotion path="M 90 315 Q 180 305 300 315" dur="3.6s" repeatCount="indefinite" begin="2.4s" calcMode="spline" keyTimes="0;1" keySplines="0.1 0.8 0.3 1" />
                </circle>

                {/* AI Research stream particles (Flowing in) */}
                <circle r="3.5" fill="#EE1C25" opacity="0.75">
                  <animateMotion path="M 128 435 Q 190 400 300 315" dur="4.8s" repeatCount="indefinite" begin="0.5s" calcMode="spline" keyTimes="0;1" keySplines="0.3 0 0.1 1" />
                </circle>
                <circle r="2" fill="#EE1C25" opacity="0.5">
                  <animateMotion path="M 128 435 Q 190 400 300 315" dur="4.8s" repeatCount="indefinite" begin="2.8s" calcMode="spline" keyTimes="0;1" keySplines="0.3 0 0.1 1" />
                </circle>

                {/* Startup Incubation stream particles (Flowing out) */}
                <circle r="3" fill="#EE1C25" opacity="0.8">
                  <animateMotion path="M 300 315 Q 410 230 472 195" dur="4.5s" repeatCount="indefinite" begin="1.2s" calcMode="spline" keyTimes="0;1" keySplines="0.2 0.8 0.4 1" />
                </circle>
                <circle r="2.5" fill="#EE1C25" opacity="0.55">
                  <animateMotion path="M 300 315 Q 410 230 472 195" dur="4.5s" repeatCount="indefinite" begin="3.2s" calcMode="spline" keyTimes="0;1" keySplines="0.2 0.8 0.4 1" />
                </circle>

                {/* Career Support stream particles (Flowing out) */}
                <circle r="4" fill="#EE1C25" opacity="0.85">
                  <animateMotion path="M 300 315 Q 420 305 510 315" dur="3.9s" repeatCount="indefinite" begin="0.2s" calcMode="spline" keyTimes="0;1" keySplines="0.4 0.1 0.2 0.9" />
                </circle>
                <circle r="2" fill="#EE1C25" opacity="0.4">
                  <animateMotion path="M 300 315 Q 420 305 510 315" dur="3.9s" repeatCount="indefinite" begin="2.0s" calcMode="spline" keyTimes="0;1" keySplines="0.4 0.1 0.2 0.9" />
                </circle>

                {/* Community stream particles (Flowing out) */}
                <circle r="3" fill="#EE1C25" opacity="0.75">
                  <animateMotion path="M 300 315 Q 410 400 472 435" dur="5.0s" repeatCount="indefinite" begin="1.6s" calcMode="spline" keyTimes="0;1" keySplines="0.3 0.2 0.1 0.8" />
                </circle>
                <circle r="2" fill="#EE1C25" opacity="0.3">
                  <animateMotion path="M 300 315 Q 410 400 472 435" dur="5.0s" repeatCount="indefinite" begin="3.8s" calcMode="spline" keyTimes="0;1" keySplines="0.3 0.2 0.1 0.8" />
                </circle>
              </svg>

              {/* Central AI Engine Logo Composition (Lowered by 15px for optical center alignment) */}
              <div className="relative w-full max-w-[155px] sm:max-w-[200px] lg:max-w-[260px] aspect-[4/3] flex items-center justify-center z-20 top-[15px]">
                
                {/* Subtle radial white backdrop light behind center logo */}
                <div className="absolute w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(255,255,255,1)_0%,rgba(238,28,37,0.006)_40%,transparent_80%)] rounded-full blur-[50px] pointer-events-none z-0" />

                {/* Grounding shadow beneath center engine */}
                <motion.div
                  animate={shouldReduceMotion ? {} : {
                    scaleX: [1, 0.96, 1],
                    opacity: [0.02, 0.012, 0.02]
                  }}
                  transition={{
                    duration: 12.0,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[110%] h-3.5 bg-black/[0.05] blur-[22px] rounded-full pointer-events-none z-10"
                />

                <motion.div
                  style={{
                    x: coords.x,
                    y: coords.y,
                  }}
                  animate={{
                    y: shouldReduceMotion ? 0 : [0, -1.5, 0], // Subtle slow float
                  }}
                  transition={{
                    x: { type: "spring", stiffness: 100, damping: 20 },
                    y: {
                      duration: 12.0,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }
                  }}
                  className="relative w-full h-full flex justify-center items-center z-20 group cursor-pointer"
                >
                  <div 
                    className="relative w-full h-full mix-blend-multiply"
                    style={{
                      maskImage: "radial-gradient(ellipse 55% 40% at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 90%)",
                      WebkitMaskImage: "radial-gradient(ellipse 55% 40% at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 90%)",
                    }}
                  >
                    <Image
                      src="/assets/image copy.png"
                      alt="The AI School Logo Engine"
                      fill
                      priority
                      sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 260px"
                      className="object-contain pointer-events-none select-none mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-[1.01]"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Interactive Glassmorphic Origin Nodes (Mathematically balanced equidistant spacing around logo center) */}
              
              {/* 1. AI Education (Top Left) */}
              <motion.div 
                animate={shouldReduceMotion ? {} : { y: [0, -4, 0] }}
                transition={{ duration: 6.0, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[32.5%] left-[21.3%] -translate-x-1/2 -translate-y-1/2 z-30"
              >
                <div className="bg-white/70 border border-neutral-150/50 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-2 hover:border-red-200 hover:shadow-md transition-all duration-300 group cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EE1C25] opacity-80" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500 font-sans">
                    AI Education
                  </span>
                </div>
              </motion.div>

              {/* 2. Coding & Development (Middle Left) */}
              <motion.div 
                animate={shouldReduceMotion ? {} : { y: [0, -4, 0] }}
                transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="absolute top-[52.5%] left-[15%] -translate-x-1/2 -translate-y-1/2 z-30"
              >
                <div className="bg-white/70 border border-neutral-150/50 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-2 hover:border-red-200 hover:shadow-md transition-all duration-300 group cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EE1C25] opacity-80" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500 font-sans">
                    Coding & Development
                  </span>
                </div>
              </motion.div>

              {/* 3. AI Research (Bottom Left) */}
              <motion.div 
                animate={shouldReduceMotion ? {} : { y: [0, -4, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute top-[72.5%] left-[21.3%] -translate-x-1/2 -translate-y-1/2 z-30"
              >
                <div className="bg-white/70 border border-neutral-150/50 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-2 hover:border-red-200 hover:shadow-md transition-all duration-300 group cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EE1C25] opacity-80" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500 font-sans">
                    AI Research
                  </span>
                </div>
              </motion.div>

              {/* 4. Startup Incubation (Top Right) */}
              <motion.div 
                animate={shouldReduceMotion ? {} : { y: [0, -4, 0] }}
                transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                className="absolute top-[32.5%] right-[21.3%] translate-x-1/2 -translate-y-1/2 z-30"
              >
                <div className="bg-white/70 border border-neutral-150/50 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-2 hover:border-red-200 hover:shadow-md transition-all duration-300 group cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EE1C25] opacity-80 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500 font-sans">
                    Startup Incubation
                  </span>
                </div>
              </motion.div>

              {/* 5. Career Support (Middle Right) */}
              <motion.div 
                animate={shouldReduceMotion ? {} : { y: [0, -4, 0] }}
                transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
                className="absolute top-[52.5%] right-[15%] translate-x-1/2 -translate-y-1/2 z-30"
              >
                <div className="bg-white/70 border border-neutral-150/50 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-2 hover:border-red-200 hover:shadow-md transition-all duration-300 group cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EE1C25] opacity-80" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500 font-sans">
                    Career Support
                  </span>
                </div>
              </motion.div>

              {/* 6. Community (Bottom Right) */}
              <motion.div 
                animate={shouldReduceMotion ? {} : { y: [0, -4, 0] }}
                transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 1.9 }}
                className="absolute top-[72.5%] right-[21.3%] translate-x-1/2 -translate-y-1/2 z-30"
              >
                <div className="bg-white/70 border border-neutral-150/50 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-2 hover:border-red-200 hover:shadow-md transition-all duration-300 group cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EE1C25] opacity-80" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500 font-sans">
                    Community
                  </span>
                </div>
              </motion.div>

            </div>
          )}
        </div>
      </div>

      {/* 4. Bottom Background Wave Mesh Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none overflow-hidden z-0">
        <svg className="absolute bottom-0 w-full h-24 text-[#ef4444] opacity-[0.08]" preserveAspectRatio="none" viewBox="0 0 1440 74">
          <path fill="currentColor" d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,74L1320,74C1200,74,960,74,720,74C480,74,240,74,120,74L0,74Z"></path>
        </svg>
      </div>

      {/* Grayscale Trust Banner in Glass Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 mt-12">
        <div className="w-full bg-white/40 border border-neutral-150/70 backdrop-blur-md rounded-2xl p-6 md:py-5 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-600 font-sans">
            Trusted by Learners & Startups Across India
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 transition-opacity duration-300">
            {trustCompanies.map((logo, idx) => (
              <span 
                key={idx} 
                className="text-sm font-black font-heading tracking-widest text-neutral-400 hover:text-[#EE1C25] opacity-50 hover:opacity-100 transition-all duration-300 ease-in-out uppercase cursor-pointer"
              >
                {logo.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

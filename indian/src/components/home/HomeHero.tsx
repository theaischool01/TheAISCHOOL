"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useRegion } from "@in/context/RegionContext";
import UpshiftHeroSlide from "./UpshiftHeroSlide";

interface HomeHeroProps {
  activeSlide?: 0 | 1;
  onSlideChange?: (slide: 0 | 1) => void;
}

export default function HomeHero({
  activeSlide = 0,
  onSlideChange,
}: HomeHeroProps) {
  const { regionConfig } = useRegion();
  const shouldReduceMotion = useReducedMotion();
  const isDocumentVisibleRef = useRef(true);

  // Touch Swipe Gesture State
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    // Trigger slide transition on distinct horizontal swipe (> 40px)
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0 && activeSlide === 0) {
        // Swiped Left -> Move to UpShift Slide
        onSlideChange?.(1);
      } else if (diffX < 0 && activeSlide === 1) {
        // Swiped Right -> Move back to AI School Slide
        onSlideChange?.(0);
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Page Visibility API handler (pause timer when tab is hidden)
  useEffect(() => {
    const handleVisibilityChange = () => {
      isDocumentVisibleRef.current = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Automatic 15-second alternating timer (0-15s AI School, 15-30s UpShift, repeat)
  // When activeSlide changes (auto or manual click), interval cleanly resets.
  useEffect(() => {
    const interval = setInterval(() => {
      if (isDocumentVisibleRef.current && onSlideChange) {
        onSlideChange(activeSlide === 0 ? 1 : 0);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [activeSlide, onSlideChange]);

  const particles = [
    { top: "15%", left: "10%", size: 3 },
    { top: "25%", left: "80%", size: 4 },
    { top: "65%", left: "15%", size: 3 },
    { top: "45%", left: "90%", size: 5 },
    { top: "75%", left: "75%", size: 3 },
  ];

  return (
    <section
      aria-label="Hero Highlights"
      className="relative w-full overflow-hidden bg-white select-none z-10 touch-pan-y"
      style={{ minHeight: "calc(100vh - 76px)" }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 2-Slide Horizontal Track (200% width, translates 0% <-> -50%) */}
      <div
        className="flex flex-row w-[200%] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
        style={{
          transform:
            shouldReduceMotion || activeSlide === 0
              ? "translate3d(0%, 0, 0)"
              : "translate3d(-50%, 0, 0)",
          minHeight: "calc(100vh - 76px)",
        }}
      >
        {/* ==================== SLIDE 0: AI SCHOOL HERO ==================== */}
        <div
          aria-hidden={activeSlide !== 0}
          className="w-1/2 flex-shrink-0 min-h-[calc(100vh-76px)] flex flex-col justify-center py-12 lg:py-20 relative overflow-hidden bg-[#fcfcfc] text-[#171717]"
        >
          {/* Engineering paper style background grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.045] z-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(0,0,0,0.5) 0.5px, transparent 0.5px), linear-gradient(to bottom, rgba(0,0,0,0.5) 0.5px, transparent 0.5px)",
              backgroundSize: "30px 30px",
            }}
          />

          {/* Soft Red ambient radial glow centered behind content */}
          <div className="absolute top-[50%] left-[75%] -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full bg-red-500/[0.025] blur-[150px] pointer-events-none z-0" />

          {/* Floating red particles */}
          {!shouldReduceMotion && (
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
              {particles.map((p, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-[#EE1C25]/20"
                  style={{
                    top: p.top,
                    left: p.left,
                    width: p.size,
                    height: p.size,
                  }}
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0.2, 0.6, 0.2],
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          )}

          {/* Hero Content Wrapper - 48% / 52% Composition on Desktop */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
            
            {/* Left Side (48% on desktop) */}
            <div className="w-full lg:w-[48%] space-y-7 flex flex-col items-start text-left z-20">
              {/* Heading */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-[48px] xl:text-[54px] font-black font-heading text-[#171717] tracking-tight leading-[1.08]">
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
                  {regionConfig.code === "in"
                    ? "WHERE INTELLIGENCE MEETS INNOVATION."
                    : "Upskill. Get Hired."}
                </p>
              </div>

              {/* Action CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <a
                  href="/in/learn"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#EE1C25] hover:bg-[#D3131B] text-white text-xs font-black uppercase tracking-wider rounded-full transition-all duration-200 shadow-[0_4px_12px_rgba(238,28,37,0.15)] hover:shadow-[0_4px_20px_rgba(238,28,37,0.25)] active:scale-98"
                >
                  <span>Explore Programs</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="/in/assessment"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-neutral-200 bg-white hover:bg-neutral-50 text-[#171717] text-xs font-black uppercase tracking-wider rounded-full shadow-sm transition-all duration-200 active:scale-98"
                >
                  <span>Take Assessment</span>
                </a>
              </div>
            </div>

            {/* Right Side (52% on desktop) */}
            <div className="w-full lg:w-[52%] flex justify-center items-center relative overflow-visible select-none">
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
                  animate={{
                    y: shouldReduceMotion ? 0 : [0, -8, 0],
                    scale: shouldReduceMotion ? 1 : [1, 1.02, 1],
                  }}
                  transition={{
                    y: {
                      duration: 5.0,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    },
                    scale: {
                      duration: 7.0,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    },
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
            </div>

          </div>
        </div>

        {/* ==================== SLIDE 1: UPSHIFT HERO ==================== */}
        <div
          aria-hidden={activeSlide !== 1}
          className="w-1/2 flex-shrink-0 min-h-[calc(100vh-76px)] flex flex-col justify-center relative overflow-hidden bg-[#110204]"
        >
          <UpshiftHeroSlide isActive={activeSlide === 1} />
        </div>

      </div>

      {/* ==================== COMPACT 2-ITEM PAGINATION CONTROL ==================== */}
      <div 
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center gap-1.5 pointer-events-auto"
        role="tablist"
        aria-label="Hero slide selection"
      >
        {/* Dot 1: AI School Hero */}
        <button
          type="button"
          role="tab"
          aria-selected={activeSlide === 0}
          aria-label="Show AI School hero"
          onClick={() => onSlideChange?.(0)}
          className="group relative p-2 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E31B23] rounded-full transition-all"
        >
          <span
            className={`h-2 rounded-full transition-all duration-300 ease-out block ${
              activeSlide === 0
                ? "w-7 bg-[#E31B23] shadow-[0_0_12px_rgba(227,27,35,0.45)]"
                : activeSlide === 1
                  ? "w-2 bg-white/30 hover:bg-white/50 border border-white/20"
                  : "w-2 bg-neutral-300 hover:bg-neutral-400 border border-neutral-400/30"
            }`}
          />
        </button>

        {/* Dot 2: UpShift Hero */}
        <button
          type="button"
          role="tab"
          aria-selected={activeSlide === 1}
          aria-label="Show UpShift hero"
          onClick={() => onSlideChange?.(1)}
          className="group relative p-2 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E31B23] rounded-full transition-all"
        >
          <span
            className={`h-2 rounded-full transition-all duration-300 ease-out block ${
              activeSlide === 1
                ? "w-7 bg-[#E31B23] shadow-[0_0_12px_rgba(227,27,35,0.45)]"
                : "w-2 bg-neutral-300 hover:bg-neutral-400 border border-neutral-400/30"
            }`}
          />
        </button>
      </div>

    </section>
  );
}

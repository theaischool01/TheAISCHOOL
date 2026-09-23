"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useRegion } from "@in/context/RegionContext";
import UpshiftHeroSlide from "./UpshiftHeroSlide";

interface HomeHeroProps {
  activeSlide?: 0 | 1;
  onSlideChange?: (slide: 0 | 1) => void;
  isPaused?: boolean;
}

export default function HomeHero({
  activeSlide = 0,
  onSlideChange,
  isPaused = false,
}: HomeHeroProps) {
  const { regionConfig } = useRegion();
  const shouldReduceMotion = useReducedMotion();
  const isDocumentVisibleRef = useRef(true);
  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Parallax on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      setCoords({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
  // When isPaused is true (e.g. while popup is open), the timer does not run.
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (isDocumentVisibleRef.current && onSlideChange) {
        onSlideChange(activeSlide === 0 ? 1 : 0);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [activeSlide, onSlideChange, isPaused]);

  return (
    <section
      aria-label="Hero Highlights"
      className="relative w-full overflow-hidden bg-white select-none z-10 touch-pan-y"
      style={{ minHeight: "calc(100vh - 76px)" }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slide Carousel Track */}
      <motion.div
        className="flex w-[200%] h-full"
        animate={{ x: activeSlide === 0 ? "0%" : "-50%" }}
        transition={{
          duration: shouldReduceMotion ? 0.2 : 0.7,
          ease: [0.32, 0.72, 0, 1],
        }}
      >
        {/* ==================== SLIDE 0: Original Indian AI School Hero ==================== */}
        <div
          className="relative w-1/2 flex-shrink-0 flex items-center justify-center min-h-[calc(100vh-76px)] overflow-hidden bg-white py-12 md:py-20"
          style={{ willChange: "transform" }}
        >
          {/* Subtle Grid Background */}
          <div
            className="absolute inset-0 z-0 pointer-events-none opacity-[0.35]"
            style={{
              backgroundImage: `
                linear-gradient(to right, #00000008 1px, transparent 1px),
                linear-gradient(to bottom, #00000008 1px, transparent 1px)
              `,
              backgroundSize: "64px 64px",
            }}
          />

          {/* Hero Content Wrapper */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
            {/* Left Side (48% on desktop) */}
            <div className="w-full lg:w-[48%] space-y-7 flex flex-col items-start text-left z-20">
              {/* Heading */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-[48px] xl:text-[54px] font-black font-heading text-[#171717] tracking-tight leading-[1.08]">
                  India&apos;s Only School to Learn AI Skills from Tech Startup{" "}
                  <span className="text-[#EE1C25] relative inline-block">
                    Founders & Leaders.
                  </span>
                </h1>
                <p className="text-[#6B7280] font-heading font-extrabold text-xs sm:text-sm tracking-widest uppercase">
                  WHERE INTELLIGENCE MEETS INNOVATION.
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

            {/* Right Side: 3D Infinity Logo */}
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
                    src={regionConfig.assets.hero || "/images/in/hero-3d.png"}
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

        {/* ==================== SLIDE 1: UpShift Hero Slide ==================== */}
        <div
          className="relative w-1/2 flex-shrink-0 min-h-[calc(100vh-76px)] overflow-hidden"
          style={{ willChange: "transform" }}
        >
          <UpshiftHeroSlide />
        </div>
      </motion.div>

      {/* Clickable Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5 bg-black/10 backdrop-blur-sm px-3.5 py-2 rounded-full border border-black/5 shadow-xs">
        <button
          type="button"
          onClick={() => onSlideChange?.(0)}
          aria-label="Go to Slide 1 (The AI School)"
          className={`h-2.5 rounded-full transition-all duration-300 ${
            activeSlide === 0
              ? "w-6 bg-[#EE1C25] shadow-xs"
              : "w-2.5 bg-neutral-400/70 hover:bg-neutral-600"
          }`}
        />
        <button
          type="button"
          onClick={() => onSlideChange?.(1)}
          aria-label="Go to Slide 2 (UpShift)"
          className={`h-2.5 rounded-full transition-all duration-300 ${
            activeSlide === 1
              ? "w-6 bg-[#EE1C25] shadow-xs"
              : "w-2.5 bg-neutral-400/70 hover:bg-neutral-600"
          }`}
        />
      </div>
    </section>
  );
}

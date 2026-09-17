"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const UPSHIFT_URL =
  process.env.NEXT_PUBLIC_UPSHIFT_URL || "https://upshift.theaischool.co";

interface UpshiftHeroSlideProps {
  isActive: boolean;
}

export default function UpshiftHeroSlide({ isActive }: UpshiftHeroSlideProps) {
  return (
    <div className="w-full h-full min-h-[calc(100vh-76px)] bg-[#110204] text-white flex flex-col justify-center py-6 lg:py-10 relative overflow-hidden select-none">
      
      {/* Deep Burgundy & Crimson Ambient Glow Background */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 85% 85% at 60% 45%, #440912 0%, #200408 50%, #0d0103 100%)",
        }}
      />

      {/* Subtle Engineering Grid Backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] z-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.4) 0.5px, transparent 0.5px), linear-gradient(to bottom, rgba(255,255,255,0.4) 0.5px, transparent 0.5px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Soft Red Corner Accents */}
      <div className="absolute top-[-10%] right-[-5%] w-[55vw] h-[55vw] rounded-full bg-[#E31B23]/[0.08] blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-[-15%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-[#E31B23]/[0.04] blur-[120px] pointer-events-none z-0" />

      {/* Exact Standalone UpShift "A Bigger You" (Top Right) */}
      <div 
        className="absolute top-5 right-5 sm:top-7 sm:right-8 lg:top-8 lg:right-12 z-30 pointer-events-none user-select-none flex flex-col items-end text-right"
      >
        <span 
          style={{
            fontFamily: "Caveat, 'Segoe Print', 'Comic Sans MS', cursive, sans-serif",
            fontSize: "clamp(24px, 3vw, 38px)",
            fontWeight: 700,
            color: "#FFFFFF",
            lineHeight: 1.05,
            transform: "rotate(-7deg)",
            display: "block",
            letterSpacing: "0.02em"
          }}
        >
          A Bigger<br />You
        </span>
        <svg 
          style={{ width: "64px", height: "13px", marginTop: "3px", marginRight: "4px" }} 
          viewBox="0 0 80 16" 
          fill="none"
        >
          <path d="M 5 8 Q 40 14, 75 4" stroke="#E31B23" strokeWidth="2.8" strokeLinecap="round" />
        </svg>
      </div>

      {/* Bottom-Right Corner: CAREERS / VENTURES / BUSINESSES / IMPACT */}
      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-10 lg:bottom-8 lg:right-14 z-30 text-right pointer-events-none hidden sm:block">
        <div className="text-white/40 text-[10px] sm:text-[11px] font-mono tracking-widest uppercase space-y-1">
          <div>CAREERS</div>
          <div>VENTURES</div>
          <div>BUSINESSES</div>
          <div className="text-white/80 font-bold relative inline-block">
            IMPACT
            <div className="w-full h-[2px] bg-[#E31B23] mt-0.5" />
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-6">
        
        {/* Left Side: Headline, Copy, CTA, Tagline */}
        <div className="w-full lg:w-[48%] space-y-6 flex flex-col items-start text-left z-20 pt-2 lg:pt-0">
          
          {/* Main Headline */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl lg:text-[44px] xl:text-[50px] font-black font-heading text-white tracking-tight leading-[1.1]">
              YOU KNOW AI.<br />
              NOW SHOW WHAT<br />
              <span className="text-white whitespace-nowrap">
                YOU CAN DO WITH IT.
              </span>
            </h1>
          </div>

          {/* Subheading Copy */}
          <p className="text-white/80 text-sm sm:text-base max-w-lg leading-relaxed font-sans font-normal">
            Upshift helps you build real AI skills, create proof of work, and unlock opportunities to earn.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
            <a
              href={UPSHIFT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#E31B23] hover:bg-[#c7131a] text-white text-xs sm:text-sm font-black uppercase tracking-wider rounded-full transition-all duration-200 shadow-[0_4px_20px_rgba(227,27,35,0.4)] hover:shadow-[0_6px_28px_rgba(227,27,35,0.6)] active:scale-98 z-30"
            >
              <span>VISIT UPSHIFT</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Small Tagline at Bottom-Left */}
          <div className="pt-4 text-white/50 text-[10px] sm:text-[11px] font-mono tracking-widest uppercase space-y-0.5">
            <div>SAME PEOPLE.</div>
            <div>A BRIGHTER TOMORROW.</div>
          </div>
        </div>

        {/* Right Side: Fox & Wider Light Beam (Shifted Leftwards) */}
        <div className="w-full lg:w-[52%] flex justify-center lg:justify-center items-center relative overflow-visible select-none lg:-translate-x-6 xl:-translate-x-10">
          <div className="relative w-full max-w-[450px] sm:max-w-[540px] lg:max-w-[610px] aspect-[4/4.1] flex items-center justify-center">
            
            {/* 1. WIDER CINEMATIC OVERHEAD LIGHT BEAM */}
            <div
              className={`absolute -top-36 left-1/2 -translate-x-1/2 w-[420px] sm:w-[540px] lg:w-[640px] h-[700px] pointer-events-none z-10 origin-top transition-all duration-1000 ease-out ${
                isActive ? "opacity-95 scale-y-100" : "opacity-0 scale-y-75"
              }`}
              style={{
                background:
                  "linear-gradient(175deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 230, 230, 0.22) 28%, rgba(227, 27, 35, 0.08) 65%, transparent 95%)",
                clipPath: "polygon(38% 0%, 62% 0%, 100% 100%, 0% 100%)",
                filter: "blur(16px)",
              }}
            />

            {/* 2. Soft Ambient Spotlight Bloom centered on Fox */}
            <div
              className={`absolute w-[84%] h-[84%] rounded-full pointer-events-none z-10 transition-opacity duration-1000 delay-150 ${
                isActive ? "opacity-85" : "opacity-0"
              }`}
              style={{
                background:
                  "radial-gradient(circle, rgba(255, 255, 255, 0.25) 0%, rgba(227, 27, 35, 0.18) 45%, transparent 75%)",
                filter: "blur(28px)",
              }}
            />

            {/* 3. Deep Crimson Core Glow */}
            <div
              className="absolute w-[92%] h-[92%] rounded-full pointer-events-none z-0"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(227,27,35,0.34) 0%, rgba(227,27,35,0.08) 50%, transparent 75%)",
              }}
            />

            {/* 4. Fox Mascot Image */}
            <div
              className={`relative w-full h-full flex items-center justify-center z-20 transition-transform duration-700 ${
                isActive ? "scale-100" : "scale-96"
              }`}
            >
              <Image
                src="/mascot_pointing_cutout.png"
                alt="UpShift Fox Mascot on Rocks"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 55vw, 610px"
                className="object-contain pointer-events-none select-none drop-shadow-[0_22px_45px_rgba(0,0,0,0.85)]"
              />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

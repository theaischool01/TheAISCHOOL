"use client";

import React, { useRef, useState, useEffect } from "react";
import { US_DATA } from "@us/config/usData";

export default function USEcosystemStrip() {
  const { ecosystemPartners } = US_DATA;
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isTriggered, setIsTriggered] = useState(false);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  // Task 1: IntersectionObserver for Glassmorphic Depth Cards entrance animation
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setShouldReduceMotion(true);
      setIsTriggered(true);
      return;
    }

    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setIsTriggered(true);
          observer.disconnect(); // Trigger once per page load
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#FFF8F8] py-12 px-6 md:px-12 border-y border-red-100/60 font-heading overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 space-y-2 text-center lg:text-left">
          <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-none">
            PROGRAM <br />
            <span className="text-[#EE1C25]">PARTNERS</span>
          </h3>
          <p className="text-xs font-semibold text-slate-600 max-w-sm">
            Strategic organizations driving innovation, AI education, and research initiatives.
          </p>
        </div>

        {/* Task 1: Glassmorphic Depth Cards with Floating Badges & Shadow Elevation */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
          {ecosystemPartners.map((partner, idx) => (
            <div
              key={idx}
              className={`group relative bg-white/85 backdrop-blur-md border rounded-2xl pt-10 pb-6 px-6 flex flex-col items-center justify-center min-h-[130px] transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isTriggered || shouldReduceMotion
                  ? "opacity-100 translate-y-0 shadow-[0_20px_40px_rgba(0,0,0,0.08)] border-red-100/80"
                  : "opacity-0 translate-y-6 shadow-sm border-neutral-200/50"
              }`}
              style={{
                transitionDelay: shouldReduceMotion || !isTriggered ? "0ms" : `${idx * 130}ms`,
              }}
            >
              {/* Task 1: Floating Circular Badge with independent drop-shadow */}
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-white border border-red-100/80 flex items-center justify-center p-3 shadow-[0_8px_16px_rgba(238,28,37,0.12)] group-hover:scale-105 transition-transform duration-300">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-10 max-w-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>

              <span className="mt-3 text-xs font-extrabold text-slate-800 text-center tracking-wide uppercase leading-tight">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

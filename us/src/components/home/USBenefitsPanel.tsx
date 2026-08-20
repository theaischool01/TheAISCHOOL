"use client";

import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ABOUT_US_DATA } from "@us/config/aboutUsData";
import {
  Sparkles,
  Users,
  Briefcase,
  Award,
  Zap,
  Globe,
  Clock,
  LucideIcon,
} from "lucide-react";

// Icon mapping for each of the 6 metrics
const metricIconMap: { [key: string]: LucideIcon } = {
  "Mentor Access": Users,
  "Real Projects": Briefcase,
  "Internship Support": Award,
  "Practical Sessions %": Zap,
  "Alumni Network": Globe,
  "Founder Time": Clock,
};

export default function USBenefitsPanel() {
  const { advantageMetrics } = ABOUT_US_DATA;
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<"aiSchool" | "typical">("aiSchool");

  // Number count animation state for all 6 metrics
  const [displayedValues, setDisplayedValues] = useState<{ [key: string]: number }>({
    "Mentor Access": 95,
    "Real Projects": 90,
    "Internship Support": 100,
    "Practical Sessions %": 80,
    "Alumni Network": 88,
    "Founder Time": 92,
  });

  // Re-trigger count animation whenever activeTab changes
  useEffect(() => {
    const targetValues: { [key: string]: number } = {};
    advantageMetrics.forEach((m) => {
      targetValues[m.category] = activeTab === "aiSchool" ? m.aiSchool : m.typical;
    });

    if (shouldReduceMotion) {
      setDisplayedValues(targetValues);
      return;
    }

    const startValues = { ...displayedValues };
    const startTime = performance.now();
    const duration = 500; // 500ms smooth count transition

    let animFrameId: number;

    const updateNumbers = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Cubic ease-out curve
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      const nextValues: { [key: string]: number } = {};
      advantageMetrics.forEach((m) => {
        const startVal = startValues[m.category] ?? targetValues[m.category];
        const targetVal = targetValues[m.category];
        nextValues[m.category] = Math.round(startVal + (targetVal - startVal) * easeProgress);
      });

      setDisplayedValues(nextValues);

      if (progress < 1) {
        animFrameId = requestAnimationFrame(updateNumbers);
      }
    };

    animFrameId = requestAnimationFrame(updateNumbers);

    return () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, [activeTab]);

  return (
    <section
      id="benefits"
      className="relative w-full bg-[#FAFAFA] py-12 lg:py-16 px-6 md:px-12 font-sans overflow-hidden border-b border-neutral-100 select-none"
    >
      {/* Decorative Ghost Background Layer */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        <span className="text-7xl sm:text-9xl font-black text-slate-900/[0.025] tracking-widest uppercase absolute top-4 right-6">
          ADVANTAGE
        </span>
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />
      </div>

      <div className="max-w-4xl mx-auto space-y-7 relative z-10">
        {/* Section Header (Unchanged Intro Copy) */}
        <div className="text-center space-y-2 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#EE1C25] text-xs font-bold uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#EE1C25]" />
            <span>WHY CHOOSE US</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#171717]">
            The <span className="text-[#EE1C25]">AI School Advantage</span>
          </h2>

          <p className="text-xs sm:text-sm font-semibold text-neutral-500 max-w-xl mx-auto">
            A side-by-side performance comparison against traditional tech bootcamps.
          </p>
        </div>

        {/* 1. Pill-Shaped Segmented Toggle Switch */}
        <div className="flex justify-center pt-1">
          <div className="relative inline-flex p-1.5 rounded-full bg-neutral-200/80 border border-neutral-300/60 shadow-inner">
            <button
              onClick={() => setActiveTab("aiSchool")}
              className={`relative z-10 px-5 sm:px-7 py-2.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
                activeTab === "aiSchool" ? "text-white" : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              THE AI SCHOOL
            </button>
            <button
              onClick={() => setActiveTab("typical")}
              className={`relative z-10 px-5 sm:px-7 py-2.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
                activeTab === "typical" ? "text-white" : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              TYPICAL BOOTCAMPS
            </button>

            {/* Sliding Pill Highlight Background */}
            <motion.div
              className="absolute top-1.5 bottom-1.5 rounded-full bg-[#EE1C25] shadow-md"
              initial={false}
              animate={{
                left: activeTab === "aiSchool" ? "6px" : "50%",
                width: "calc(50% - 6px)",
              }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
            />
          </div>
        </div>

        {/* 2. Compact 6 Stat Cards Grid (3 cols x 2 rows on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 pt-2">
          {advantageMetrics.map((item) => {
            const val = displayedValues[item.category] ?? (activeTab === "aiSchool" ? item.aiSchool : item.typical);
            const IconComp = metricIconMap[item.category] || Sparkles;

            return (
              <motion.div
                key={item.category}
                whileHover={{ y: -3 }}
                className="relative bg-white border border-neutral-200/90 rounded-2xl p-4 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 group overflow-hidden"
              >
                {/* Red Top Accent Bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[3px] transition-colors duration-500 ${
                    activeTab === "aiSchool" ? "bg-[#EE1C25]" : "bg-slate-300"
                  }`}
                />

                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[11px] font-extrabold text-neutral-500 uppercase tracking-wider block">
                      {item.category}
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span
                        className={`text-3xl sm:text-4xl font-black tracking-tight transition-colors duration-300 ${
                          activeTab === "aiSchool" ? "text-[#171717]" : "text-slate-700"
                        }`}
                      >
                        {val}%
                      </span>
                      <span
                        className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full transition-colors duration-300 ${
                          activeTab === "aiSchool"
                            ? "bg-red-50 text-[#EE1C25] border border-red-100"
                            : "bg-neutral-100 text-neutral-500 border border-neutral-200"
                        }`}
                      >
                        {activeTab === "aiSchool" ? "Optimal" : "Standard"}
                      </span>
                    </div>
                  </div>

                  {/* Accent Metric Icon with Subtle Scale Pulse */}
                  <motion.div
                    animate={
                      shouldReduceMotion
                        ? undefined
                        : { scale: [1, 1.06, 1] }
                    }
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-300 shrink-0 ${
                      activeTab === "aiSchool"
                        ? "bg-red-50 text-[#EE1C25] border border-red-100"
                        : "bg-neutral-100 text-neutral-500 border border-neutral-200"
                    }`}
                  >
                    <IconComp className="w-4 h-4" />
                  </motion.div>
                </div>

                {/* Animated Progress Bar & Continuous Shimmer Sweep */}
                <div className="mt-4 space-y-1">
                  <div className="relative w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ease-out relative ${
                        activeTab === "aiSchool" ? "bg-[#EE1C25]" : "bg-slate-400"
                      }`}
                      style={{ width: `${val}%` }}
                    >
                      {/* Continuous Shimmer Effect running across the progress bar */}
                      {!shouldReduceMotion && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/45 to-transparent"
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{
                            repeat: Infinity,
                            duration: 2.2,
                            ease: "linear",
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <p className="text-[11px] text-neutral-400 italic text-center pt-1">
          Illustrative performance comparison based on typical program structures.
        </p>
      </div>
    </section>
  );
}

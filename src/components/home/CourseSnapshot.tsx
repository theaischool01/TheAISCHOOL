"use client";

import React, { useEffect, useState, useRef } from "react";
import { Check, BookOpen, Layers, Cpu, Award, MessageCircle, Star, Trophy } from "lucide-react";

// Trimmed to 6 premium items for viewport efficiency
const checklistItems = [
  "Learn from Startup Founders",
  "Live Industry Projects",
  "Personal Mentorship",
  "AI School Alumni Network",
  "Internship Certificate",
  "Placement Support",
];

export default function CourseSnapshot() {
  const [visibleStats, setVisibleStats] = useState<number[]>([0, 0, 0]);
  const [isChecklistVisible, setIsChecklistVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate numbers
          const duration = 1500; // ms
          const steps = 30;
          const stepTime = duration / steps;
          let currentStep = 0;

          const targets = [100, 7, 10];
          const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            const nextStats = targets.map((target) =>
              Math.min(Math.round(target * progress), target)
            );
            setVisibleStats(nextStats);

            if (currentStep >= steps) {
              clearInterval(timer);
              setIsChecklistVisible(true);
            }
          }, stepTime);
        }
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-12 lg:py-0 lg:h-[calc(100vh-100px)] lg:max-h-[680px] lg:min-h-[580px] px-6 md:px-12 border-t border-gray-100 relative z-10 font-heading flex items-center select-none"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[700px] h-[300px] bg-red-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Two-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ================= LEFT COLUMN (55% ON DESKTOP) ================= */}
          <div className="lg:col-span-7 space-y-5 lg:space-y-6 order-2 lg:order-1">
            {/* Header Area */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 bg-red-50 border border-red-100 rounded-full">
                <span className="text-[9px] font-black uppercase tracking-widest text-[#EE1C25]">
                  Course Snapshot
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-950 tracking-tight leading-tight uppercase">
                Everything You Need To <br className="hidden sm:inline" />
                Become <span className="text-[#EE1C25]">Industry Ready</span>
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm font-semibold leading-relaxed max-w-xl">
                Master production-grade workflows through live network challenges, mentored co-creation loops, and professional certifications.
              </p>
            </div>

            {/* Statistic Cards Area */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Metric 1 */}
              <div className="group bg-white border border-gray-100 rounded-2xl p-4 shadow-xs hover:shadow-md transition-all duration-300">
                <BookOpen className="w-4 h-4 text-[#EE1C25] mb-2" />
                <span className="block text-2xl font-black text-gray-950">
                  {visibleStats[0]}+
                </span>
                <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mt-0.5">
                  Hours Learning
                </span>
              </div>

              {/* Metric 2 */}
              <div className="group bg-white border border-gray-100 rounded-2xl p-4 shadow-xs hover:shadow-md transition-all duration-300">
                <Layers className="w-4 h-4 text-[#EE1C25] mb-2" />
                <span className="block text-2xl font-black text-gray-950">
                  {visibleStats[1]}+
                </span>
                <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mt-0.5">
                  Industry Projects
                </span>
              </div>

              {/* Metric 3 */}
              <div className="group bg-white border border-gray-100 rounded-2xl p-4 shadow-xs hover:shadow-md transition-all duration-300">
                <Cpu className="w-4 h-4 text-[#EE1C25] mb-2" />
                <span className="block text-2xl font-black text-gray-950">
                  {visibleStats[2]}+
                </span>
                <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mt-0.5">
                  GenAI Tools
                </span>
              </div>

              {/* Metric 4 (Hierarchical Accent Card) */}
              <div className="group bg-red-50/50 border border-red-100/50 rounded-2xl p-4 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                <Award className="w-4 h-4 text-[#EE1C25]" />
                <div className="mt-2">
                  <span className="block text-xs font-black text-gray-950 uppercase leading-none">
                    Career
                  </span>
                  <span className="block text-[10px] font-bold text-[#EE1C25] uppercase tracking-wider mt-0.5">
                    Focused Curriculum
                  </span>
                </div>
              </div>
            </div>

            {/* Checklist Area (Reduced to 6 items, more compact spacing) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              {checklistItems.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-2.5 transition-all duration-500 transform ${
                    isChecklistVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2"
                  }`}
                  style={{
                    transitionDelay: isChecklistVisible ? `${idx * 75}ms` : "0ms",
                  }}
                >
                  <div className="w-4 h-4 rounded-full bg-red-50 text-[#EE1C25] flex items-center justify-center shrink-0 border border-red-100">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span className="text-[13px] font-bold text-slate-700 leading-none">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <a
                href="/learn"
                className="group inline-flex items-center gap-2 bg-[#EE1C25] hover:bg-[#d61920] text-white font-bold text-xs uppercase tracking-widest px-7 py-3.5 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Explore Curriculum
                <span className="group-hover:translate-x-1 transition-transform inline-block">
                  →
                </span>
              </a>
            </div>
          </div>

          {/* ================= RIGHT COLUMN (45% ON DESKTOP) ================= */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center w-full">
            {/* Visual Frame Wrapper with glow and particle backdrops */}
            <div className="relative w-full max-w-[340px] lg:max-w-[380px] aspect-square rounded-[40px] bg-gradient-to-tr from-slate-50 to-white border border-gray-100 p-6 shadow-xl flex items-center justify-center overflow-visible">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(238,28,37,0.06)_0%,transparent_75%)] pointer-events-none" />
              
              {/* Floating accent particles */}
              <div className="absolute top-6 left-6 w-2 h-2 rounded-full bg-red-400/40 animate-pulse" />
              <div className="absolute bottom-8 right-6 w-3 h-3 rounded-full bg-red-300/30 animate-pulse delay-500" />

              {/* Coded Product Mockup Composition */}
              <div className="relative w-full h-full flex items-center justify-center select-none">
                
                {/* 1. Main Course Card Mockup */}
                <div className="absolute w-[80%] bg-white border border-gray-100 rounded-3xl p-4 shadow-xl rotate-1 z-10">
                  {/* Thumbnail Block */}
                  <div className="w-full h-24 bg-gradient-to-tr from-slate-100 to-slate-50 rounded-2xl mb-3 relative overflow-hidden flex items-center justify-center border border-gray-50">
                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center border border-red-100">
                      <Cpu className="w-5 h-5 text-[#EE1C25]" />
                    </div>
                  </div>
                  {/* Course Title Line */}
                  <h4 className="text-xs font-black text-gray-950 uppercase tracking-wide mb-2">
                    Advanced Generative AI
                  </h4>
                  {/* Progress Bar Container */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[9px] font-bold text-neutral-400 uppercase tracking-wider">
                      <span>Course Progress</span>
                      <span className="text-[#EE1C25]">85%</span>
                    </div>
                    <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#EE1C25] rounded-full" style={{ width: "85%" }} />
                    </div>
                  </div>
                </div>

                {/* 2. Certificate / Badge Card (Overlapping bottom-left) */}
                <div className="absolute -bottom-2 -left-4 w-[48%] bg-white border border-gray-100 rounded-2xl p-3 shadow-lg -rotate-6 z-25 flex items-center gap-2">
                  <div className="p-1.5 bg-red-50 text-[#EE1C25] rounded-lg border border-red-100">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div className="leading-tight">
                    <span className="block text-[9px] font-black text-gray-950 uppercase">Certified</span>
                    <span className="block text-[8px] font-bold text-neutral-400 uppercase tracking-wider">AI Engineer</span>
                  </div>
                </div>

                {/* 3. Mentor Chat Bubble (Overlapping top-right) */}
                <div className="absolute -top-2 -right-4 w-[52%] bg-white border border-gray-100 rounded-2xl p-3 shadow-lg rotate-3 z-20 flex gap-2.5 items-start">
                  <div className="p-1.5 bg-red-50 text-[#EE1C25] rounded-full border border-red-100 shrink-0">
                    <MessageCircle className="w-3.5 h-3.5" />
                  </div>
                  <div className="space-y-1 leading-none">
                    <span className="block text-[9px] font-black text-gray-950">Mentor Feedback</span>
                    <span className="block text-[8px] font-bold text-slate-500">Code review complete</span>
                  </div>
                </div>

                {/* 4. Stat Chip (Floating near top-left) */}
                <div className="absolute top-16 -left-6 bg-white border border-gray-100 rounded-full px-3 py-1 shadow-md rotate-2 z-15 flex items-center gap-1.5">
                  <Star className="w-3 h-3 fill-[#FBBC05] stroke-none" />
                  <span className="text-[9px] font-black text-gray-950 tracking-wider">4.9 RATING</span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Check, BookOpen, Layers, Cpu, Award } from "lucide-react";
import CourseSnapshotVisual from "./CourseSnapshotVisual";

const defaultChecklist = [
  "Learn from Startup Founders",
  "Live Industry Projects",
  "Personal Mentorship",
  "AI School Alumni Network",
  "Internship Certificate",
  "Placement Support",
];

interface CourseSnapshotProps {
  badgeText?: string;
  heading?: string;
  subtext?: string;
  stats?: { value: number; label: string; icon: string }[];
  checklist?: string[];
  ctaText?: string;
}

export default function CourseSnapshot({
  badgeText = "Course Snapshot",
  heading,
  subtext = "Master production-grade workflows through live network challenges, mentored co-creation loops, and professional certifications.",
  stats = [
    { value: 100, label: "Hours Learning", icon: "BookOpen" },
    { value: 7, label: "Industry Projects", icon: "Layers" },
    { value: 10, label: "GenAI Tools", icon: "Cpu" },
  ],
  checklist = defaultChecklist,
  ctaText = "Explore Curriculum",
}: CourseSnapshotProps) {
  const [visibleStats, setVisibleStats] = useState<number[]>([0, 0, 0]);
  const [isChecklistVisible, setIsChecklistVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Fallback heading text preserving layout linebreaks
  const headingText = heading || (
    <>
      Everything You Need To <br className="hidden sm:inline" />
      Become <span className="text-[#EE1C25]">Industry Ready</span>
    </>
  );

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

          const targets = stats.map(s => s.value);
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
  }, [hasAnimated, stats]);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-transparent py-14 lg:py-16 px-6 md:px-12 relative z-10 font-heading flex items-center select-none"
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
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-950 tracking-tight leading-tight uppercase">
                {headingText}
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm font-semibold leading-relaxed max-w-xl">
                {subtext}
              </p>
            </div>

            {/* Asymmetrical Bento layout for Statistic Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {stats.map((stat, idx) => {
                const IconComponent =
                  stat.icon === "BookOpen"
                    ? BookOpen
                    : stat.icon === "Layers"
                    ? Layers
                    : Cpu;

                return (
                  <div
                    key={idx}
                    className="group bg-gradient-to-br from-white to-slate-50 border border-gray-100 rounded-2xl p-4 shadow-xs hover:shadow-md hover:-translate-y-1 hover:border-red-100 transition-all duration-300"
                  >
                    <IconComponent className="w-4 h-4 text-[#EE1C25] mb-2" />
                    <span className="block text-3xl font-black text-gray-950 tracking-tight">
                      {visibleStats[idx] || 0}+
                    </span>
                    <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mt-0.5">
                      {stat.label}
                    </span>
                  </div>
                );
              })}

              {/* Career focused - Asymmetrical Bento Span Card */}
              <div className="group bg-gradient-to-br from-[#EE1C25] to-[#d61920] border border-red-500 rounded-2xl p-4 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between text-white">
                <Award className="w-4 h-4 text-white" />
                <div className="mt-2">
                  <span className="block text-xs font-black uppercase leading-none text-white/90">
                    Career
                  </span>
                  <span className="block text-[10px] font-bold uppercase tracking-wider mt-0.5 text-white/80">
                    Focused Curriculum
                  </span>
                </div>
              </div>
            </div>

            {/* Checklist Flowing Wrap Layout */}
            <div className="flex flex-wrap gap-2 pt-1">
              {checklist.map((item, idx) => (
                <div
                  key={idx}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-50/70 border border-gray-100 rounded-full shadow-xs hover:border-red-200 transition-all duration-500 transform ${
                    isChecklistVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2"
                  }`}
                  style={{
                    transitionDelay: isChecklistVisible ? `${idx * 75}ms` : "0ms",
                  }}
                >
                  <div className="w-3.5 h-3.5 rounded-full bg-red-50 text-[#EE1C25] flex items-center justify-center shrink-0 border border-red-100">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                href="/learn"
                className="group inline-flex items-center gap-2 bg-[#EE1C25] hover:bg-[#d61920] text-white font-bold text-xs uppercase tracking-widest px-7 py-3.5 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                {ctaText}
                <span className="group-hover:translate-x-1 transition-transform inline-block">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* ================= RIGHT COLUMN (45% ON DESKTOP) ================= */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center w-full">
            {/* Visual Frame Wrapper with rounded border-box framing preventing boundary clipping */}
            <div className="relative w-full max-w-[340px] lg:max-w-[380px] aspect-square rounded-[32px] bg-gradient-to-br from-slate-50 to-white border border-gray-100 p-8 shadow-xl flex items-center justify-center overflow-visible">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(238,28,37,0.06)_0%,transparent_75%)] pointer-events-none rounded-[32px]" />
              
              {/* Floating accent particles */}
              <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-red-400/40 animate-pulse" />
              <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-red-300/30 animate-pulse delay-500" />

              {/* Render the new dynamic Isometric SVG visual composition */}
              <div className="relative w-full h-full flex items-center justify-center select-none overflow-visible">
                <CourseSnapshotVisual />
              </div>
            </div>
          </div>

          {/* Link element imports for dynamic typing correctness */}
          <span className="hidden">
            <Link href="/" />
          </span>

        </div>
      </div>
    </section>
  );
}

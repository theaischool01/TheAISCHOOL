"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Terminal,
  Database,
  BarChart3,
  FileSpreadsheet,
  Zap,
  LineChart,
  Layers,
  Eye,
  MessageSquareText,
  Bot,
  Sparkles,
  Check,
  ArrowRight,
} from "lucide-react";

const innerRingCourses = [
  { title: "Python Programming", icon: Terminal, color: "#2563EB" },
  { title: "SQL & Databases", icon: Database, color: "#1D4ED8" },
  { title: "Data Analytics", icon: BarChart3, color: "#F59E0B" },
  { title: "Data Science with Excel", icon: FileSpreadsheet, color: "#10B981" },
  { title: "Prompt Engineering", icon: Zap, color: "#EA580C" },
];

const outerRingCourses = [
  { title: "Machine Learning", icon: LineChart, color: "#EA580C" },
  { title: "Deep Learning", icon: Layers, color: "#6366F1" },
  { title: "Computer Vision", icon: Eye, color: "#06B6D4" },
  { title: "NLP (Natural Language)", icon: MessageSquareText, color: "#EC4899" },
  { title: "Agentic AI", icon: Bot, color: "#16A34A" },
  { title: "Generative AI", icon: Sparkles, color: "#D946EF" },
];

const checklistItems = [
  "Industry-aligned curriculum",
  "Hands-on learning",
  "Real-world projects",
  "Career-focused tracks",
];

export default function EcosystemOrbit() {
  const [hoveredCourse, setHoveredCourse] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isTriggered, setIsTriggered] = useState(false);
  const [isOrbitActive, setIsOrbitActive] = useState(false);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

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

    let timer: NodeJS.Timeout;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setIsTriggered(true);
          observer.disconnect();

          // Task 3: Continuous orbital rotation begins after entrance draw-in completes (~1300ms)
          timer = setTimeout(() => {
            setIsOrbitActive(true);
          }, 1300);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, []);

  const getPositions = (count: number, radiusPercent: number) => {
    return Array.from({ length: count }).map((_, idx) => {
      const angle = (idx * 360) / count;
      const rad = (angle * Math.PI) / 180;
      const x = 50 + radiusPercent * Math.cos(rad);
      const y = 50 + radiusPercent * Math.sin(rad);
      return { x: `${x.toFixed(4)}%`, y: `${y.toFixed(4)}%` };
    });
  };

  const innerPos = getPositions(innerRingCourses.length, 28);
  const outerPos = getPositions(outerRingCourses.length, 42);

  return (
    <section ref={sectionRef} className="w-full bg-white py-16 lg:py-24 px-6 md:px-12 relative z-10 font-heading overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Outer Glass Card Wrapper */}
        <div className="group/orbit bg-gradient-to-br from-[#FFF5F5] via-[#FFF9F9] to-[#FFF5F5] rounded-[3rem] border border-red-200/80 p-8 lg:p-14 shadow-lg hover:shadow-2xl hover:border-red-300 hover:scale-[1.01] transition-all duration-500 relative overflow-hidden">
          {/* Pulsing Red Ambient Radial Glow */}
          <div className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-red-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Left Column: Headline, Checklist & CTA */}
            <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
              <div className="space-y-2">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-950 tracking-tight leading-tight">
                  Explore. <span className="text-[#EE1C25]">Learn.</span> Transform.
                </h2>
              </div>

              <p className="text-slate-600 text-sm md:text-base font-semibold leading-relaxed max-w-lg mx-auto lg:mx-0">
                From foundational skills to advanced specializations, explore our industry-aligned AI programs designed to shape your future.
              </p>

              {/* Task 4: Checklist Tick-In */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto lg:mx-0 pt-2">
                {checklistItems.map((item, idx) => (
                  <div
                    key={item}
                    className={`flex items-center space-x-2 justify-center lg:justify-start transition-all duration-500 ease-out ${
                      isTriggered || shouldReduceMotion ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                    }`}
                    style={{ transitionDelay: shouldReduceMotion || !isTriggered ? "0ms" : `${300 + idx * 120}ms` }}
                  >
                    <div
                      className={`p-1 bg-red-100/80 border border-red-200 rounded-full text-[#EE1C25] transition-transform duration-300 ${
                        isTriggered || shouldReduceMotion ? "scale-100" : "scale-0"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" strokeWidth={3} />
                    </div>
                    <span className="text-xs font-bold text-gray-800">{item}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="pt-4 flex justify-center lg:justify-start">
                <a
                  href="#courses"
                  className="inline-flex items-center gap-2.5 bg-[#EE1C25] hover:bg-[#D3131B] text-[#FFFFFF] font-black text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:scale-105 transition-all duration-300 active:scale-95"
                >
                  <span>EXPLORE ALL COURSES</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Column: Upright Node Orbit around US Infinity Logo */}
            <div className="lg:col-span-7 flex justify-center items-center relative min-h-[500px] select-none">
              <div className="relative w-full max-w-[550px] aspect-square flex items-center justify-center">
                {/* Task 3: Inner Orbit Circle Line (Entrance scale/fade) */}
                <div
                  className={`absolute w-[56%] h-[56%] rounded-full border-2 border-dashed border-red-300/70 pointer-events-none transition-all duration-700 ease-out ${
                    isTriggered || shouldReduceMotion ? "opacity-100 scale-100" : "opacity-0 scale-90"
                  }`}
                />

                {/* Task 3: Outer Orbit Circle Line (Entrance scale/fade) */}
                <div
                  className={`absolute w-[84%] h-[84%] rounded-full border-2 border-dashed border-red-200/80 pointer-events-none transition-all duration-700 ease-out ${
                    isTriggered || shouldReduceMotion ? "opacity-100 scale-100" : "opacity-0 scale-90"
                  }`}
                  style={{ transitionDelay: shouldReduceMotion || !isTriggered ? "0ms" : "150ms" }}
                />

                {/* Task 2 & Task 3: Central US Infinity Logo + Glowing Engine */}
                <div
                  className={`relative z-20 w-36 h-24 sm:w-40 sm:h-28 flex items-center justify-center drop-shadow-2xl hover:scale-110 transition-all duration-500 bg-white/40 backdrop-blur-sm p-2 rounded-3xl border border-red-100 ${
                    isTriggered || shouldReduceMotion ? "opacity-100 scale-100" : "opacity-0 scale-90"
                  }`}
                  style={{ transitionDelay: shouldReduceMotion || !isTriggered ? "0ms" : "200ms" }}
                >
                  {/* Task 2: Glowing Engine Radial Pulse */}
                  <div
                    className={`absolute -inset-4 bg-red-500/25 blur-2xl rounded-full pointer-events-none ${
                      isOrbitActive && !shouldReduceMotion ? "animate-glow-pulse" : "opacity-40"
                    }`}
                  />

                  <Image
                    src="/us/assets/us_flag_infinity.png"
                    alt="US Infinity Logo"
                    width={160}
                    height={110}
                    priority
                    className="object-contain relative z-10"
                  />
                </div>

                {/* Task 1 & 3: Inner Ring Nodes Layer (Rotates CLOCKWISE slow 100s) */}
                <div
                  className={`absolute inset-0 z-10 pointer-events-auto ${
                    isOrbitActive && !shouldReduceMotion ? "animate-orbit-cw" : ""
                  }`}
                >
                  {innerRingCourses.map((course, idx) => {
                    const pos = innerPos[idx];
                    const Icon = course.icon;
                    const isHovered = hoveredCourse === course.title;
                    return (
                      <div
                        key={course.title}
                        onMouseEnter={() => setHoveredCourse(course.title)}
                        onMouseLeave={() => setHoveredCourse(null)}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group/node cursor-pointer transition-all duration-500 ease-out ${
                          isTriggered || shouldReduceMotion ? "opacity-100 scale-100" : "opacity-0 scale-50"
                        }`}
                        style={{
                          left: pos.x,
                          top: pos.y,
                          transitionDelay: shouldReduceMotion || !isTriggered ? "0ms" : `${400 + idx * 70}ms`,
                        }}
                      >
                        {/* Task 1: Counter-Rotate Inner Nodes to remain 100% upright */}
                        <div
                          className={`flex flex-col items-center ${
                            isOrbitActive && !shouldReduceMotion ? "animate-counter-orbit-cw" : ""
                          }`}
                        >
                          {/* Upright Icon Badge */}
                          <div
                            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border-2 flex items-center justify-center transition-all duration-300 ${
                              isHovered
                                ? "scale-125 border-[#EE1C25] bg-red-50 shadow-xl shadow-red-500/30"
                                : "border-neutral-200/90 shadow-md group-hover/node:scale-125 group-hover/node:border-[#EE1C25]"
                            }`}
                          >
                            <Icon className="w-5 h-5 text-[#EE1C25]" />
                          </div>
                          {/* Upright Text Label below icon */}
                          <span
                            className={`text-[9px] sm:text-[10px] font-bold tracking-tight text-center mt-1 px-2 py-0.5 rounded-full transition-all duration-300 ${
                              isHovered
                                ? "bg-[#EE1C25] text-white shadow-md scale-105"
                                : "text-[#EE1C25] bg-white/95 border border-red-100 shadow-xs"
                            }`}
                          >
                            {course.title}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Task 1 & 3: Outer Ring Nodes Layer (Rotates COUNTER-CLOCKWISE slow 150s) */}
                <div
                  className={`absolute inset-0 z-10 pointer-events-auto ${
                    isOrbitActive && !shouldReduceMotion ? "animate-orbit-ccw" : ""
                  }`}
                >
                  {outerRingCourses.map((course, idx) => {
                    const pos = outerPos[idx];
                    const Icon = course.icon;
                    const isHovered = hoveredCourse === course.title;
                    return (
                      <div
                        key={course.title}
                        onMouseEnter={() => setHoveredCourse(course.title)}
                        onMouseLeave={() => setHoveredCourse(null)}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group/node cursor-pointer transition-all duration-500 ease-out ${
                          isTriggered || shouldReduceMotion ? "opacity-100 scale-100" : "opacity-0 scale-50"
                        }`}
                        style={{
                          left: pos.x,
                          top: pos.y,
                          transitionDelay: shouldReduceMotion || !isTriggered ? "0ms" : `${650 + idx * 70}ms`,
                        }}
                      >
                        {/* Task 1: Counter-Rotate Outer Nodes to remain 100% upright */}
                        <div
                          className={`flex flex-col items-center ${
                            isOrbitActive && !shouldReduceMotion ? "animate-counter-orbit-ccw" : ""
                          }`}
                        >
                          {/* Upright Icon Badge */}
                          <div
                            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border-2 flex items-center justify-center transition-all duration-300 ${
                              isHovered
                                ? "scale-125 border-[#EE1C25] bg-red-50 shadow-xl shadow-red-500/30"
                                : "border-neutral-200/90 shadow-md group-hover/node:scale-125 group-hover/node:border-[#EE1C25]"
                            }`}
                          >
                            <Icon className="w-5 h-5 text-[#EE1C25]" />
                          </div>
                          {/* Upright Text Label below icon */}
                          <span
                            className={`text-[9px] sm:text-[10px] font-bold tracking-tight text-center mt-1 px-2 py-0.5 rounded-full transition-all duration-300 ${
                              isHovered
                                ? "bg-[#EE1C25] text-white shadow-md scale-105"
                                : "text-[#EE1C25] bg-white/95 border border-red-100 shadow-xs"
                            }`}
                          >
                            {course.title}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

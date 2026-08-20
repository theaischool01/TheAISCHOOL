"use client";

import React, { useState, useRef, useEffect } from "react";
import { BookOpen, Layers, Cpu, Award, Check, ArrowRight } from "lucide-react";

const checkmarks = [
  "LEARN FROM STARTUP FOUNDERS",
  "LIVE INDUSTRY PROJECTS",
  "PERSONAL MENTORSHIP",
  "AI SCHOOL ALUMNI NETWORK",
  "INTERNSHIP CERTIFICATE",
  "PLACEMENT SUPPORT",
];

export default function CourseSnapshotSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardContainerRef = useRef<HTMLDivElement | null>(null);
  const [isTriggered, setIsTriggered] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  // Task 3: Number counter states
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  // Task 6: Chart Breathing Live Cursor Response State & Target Ref
  const targetSwayRef = useRef({ xRatio: 0, isHovering: false });
  const [barSway, setBarSway] = useState({
    bar1X: 0,
    bar1Rot: 0,
    bar2X: 0,
    bar2Rot: 0,
    bar3X: 0,
    bar3Rot: 0,
  });

  // Task 6: Mouse Handlers for Chart Card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isComplete || shouldReduceMotion || !cardContainerRef.current) return;
    const rect = cardContainerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const xRatio = (e.clientX - centerX) / (rect.width / 2);
    targetSwayRef.current = { xRatio: Math.max(-1, Math.min(1, xRatio)), isHovering: true };
  };

  const handleMouseLeave = () => {
    targetSwayRef.current = { xRatio: 0, isHovering: false };
  };

  // Task 6: Lerp Loop for Smooth Bar Sway
  useEffect(() => {
    if (!isComplete || shouldReduceMotion) return;

    let animId: number;
    let currentRatio = 0;

    const loop = () => {
      const targetRatio = targetSwayRef.current.xRatio;
      currentRatio += (targetRatio - currentRatio) * 0.08;

      if (Math.abs(currentRatio) < 0.001 && !targetSwayRef.current.isHovering) {
        currentRatio = 0;
        setBarSway({ bar1X: 0, bar1Rot: 0, bar2X: 0, bar2Rot: 0, bar3X: 0, bar3Rot: 0 });
      } else {
        setBarSway({
          bar1X: currentRatio * 2,
          bar1Rot: currentRatio * 1,
          bar2X: currentRatio * 3.5,
          bar2Rot: currentRatio * 1.8,
          bar3X: currentRatio * 2.5,
          bar3Rot: currentRatio * -1.2,
        });
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isComplete, shouldReduceMotion]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setShouldReduceMotion(true);
      setIsTriggered(true);
      setIsComplete(true);
      setCount1(100);
      setCount2(7);
      setCount3(10);
      return;
    }

    const node = sectionRef.current;
    if (!node) return;

    let timer1: NodeJS.Timeout;
    let timer2: NodeJS.Timeout;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setIsTriggered(true);
          observer.disconnect();

          // Task 3: Number Counting logic (starts at t = 550ms, synced with bar growth)
          timer1 = setTimeout(() => {
            const animateCount = (target: number, setter: (val: number) => void, duration: number) => {
              const startTime = performance.now();
              const step = (now: number) => {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                setter(Math.floor(progress * target));
                if (progress < 1) requestAnimationFrame(step);
                else setter(target);
              };
              requestAnimationFrame(step);
            };

            animateCount(100, setCount1, 700);
            setTimeout(() => animateCount(7, setCount2, 700), 80);
            setTimeout(() => animateCount(10, setCount3, 700), 160);
          }, 550);

          // Task 5 & 6: Enable ambient orbit loop and live cursor response after entrance completes (t = 1800ms)
          timer2 = setTimeout(() => {
            setIsComplete(true);
          }, 1800);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (timer1) clearTimeout(timer1);
      if (timer2) clearTimeout(timer2);
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-gradient-to-b from-white via-[#FFF8F8] to-white py-16 lg:py-24 px-6 md:px-12 relative z-10 font-heading">
      {/* Background Soft Red Radial Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[700px] h-[350px] bg-red-500/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Heading, Stat Cards, Checkmarks, CTA */}
        <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
          {/* Main Heading */}
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 tracking-tight leading-[1.1] uppercase">
              EVERYTHING YOU NEED TO <br />
              BECOME <span className="text-[#EE1C25]">INDUSTRY READY</span>
            </h2>
            <p className="text-slate-600 text-sm md:text-base font-semibold leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Master production-grade AI skills through live industry projects, personal mentorship, and career-focused certification.
            </p>
          </div>

          {/* Task 3: 4 Stat Cards Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            {/* Card 1 */}
            <div className="bg-white border border-neutral-200/90 rounded-2xl p-5 shadow-sm space-y-3 text-left">
              <BookOpen className="w-5 h-5 text-[#EE1C25]" />
              <div>
                <div className="text-3xl font-black text-slate-900 tracking-tight font-sans">
                  {isTriggered || shouldReduceMotion ? `${count1}+` : "0+"}
                </div>
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mt-0.5">
                  HOURS LEARNING
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-neutral-200/90 rounded-2xl p-5 shadow-sm space-y-3 text-left">
              <Layers className="w-5 h-5 text-[#EE1C25]" />
              <div>
                <div className="text-3xl font-black text-slate-900 tracking-tight font-sans">
                  {isTriggered || shouldReduceMotion ? `${count2}+` : "0+"}
                </div>
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mt-0.5">
                  INDUSTRY PROJECTS
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-neutral-200/90 rounded-2xl p-5 shadow-sm space-y-3 text-left">
              <Cpu className="w-5 h-5 text-[#EE1C25]" />
              <div>
                <div className="text-3xl font-black text-slate-900 tracking-tight font-sans">
                  {isTriggered || shouldReduceMotion ? `${count3}+` : "0+"}
                </div>
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mt-0.5">
                  GENAI TOOLS
                </div>
              </div>
            </div>

            {/* Card 4 (Solid Red Callout Card with Task 3 Shine Sweep) */}
            <div className="relative overflow-hidden bg-[#EE1C25] text-white rounded-2xl p-5 shadow-lg shadow-red-500/25 space-y-3 text-left flex flex-col justify-between">
              {isTriggered && !shouldReduceMotion && (
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent animate-card-shine pointer-events-none"
                  style={{ animationDelay: "750ms" }}
                />
              )}
              <Award className="w-5 h-5 text-white" />
              <div>
                <div className="text-xs font-black uppercase tracking-wider leading-tight">
                  CAREER FOCUS CURRICULUM
                </div>
              </div>
            </div>
          </div>

          {/* Task 4: Row of Pill-shaped Checkmark Badges (Cascade Entrance) */}
          <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start pt-2">
            {checkmarks.map((item, idx) => (
              <div
                key={item}
                className={`bg-white border border-red-100 rounded-full px-3.5 py-1.5 text-[10px] sm:text-[11px] font-extrabold text-slate-700 flex items-center gap-1.5 shadow-xs transition-all duration-400 ease-out ${
                  isTriggered || shouldReduceMotion ? "opacity-100 scale-100" : "opacity-0 scale-90"
                }`}
                style={{ transitionDelay: shouldReduceMotion || !isTriggered ? "0ms" : `${1100 + idx * 70}ms` }}
              >
                <Check className="w-3.5 h-3.5 text-[#EE1C25]" strokeWidth={3} />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="pt-2 flex justify-center lg:justify-start">
            <a
              href="#courses"
              className="inline-flex items-center gap-2.5 bg-[#EE1C25] hover:bg-[#D3131B] text-white font-black text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:scale-105 transition-all duration-300 active:scale-95"
            >
              <span>EXPLORE CURRICULUM</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Right Column: 3D Bar-Chart Graphic in White Card (Task 1, 2, 5, 6) */}
        <div className="lg:col-span-5 flex justify-center">
          <div
            ref={cardContainerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="bg-white border border-neutral-200/80 rounded-[2.5rem] p-10 shadow-xl relative w-full max-w-md aspect-square flex items-center justify-center overflow-hidden cursor-crosshair"
          >
            {/* Task 5: Corner Decorative Red Accent Dots with Ambient Orbit */}
            <div
              className={`absolute top-6 left-6 w-2.5 h-2.5 rounded-full bg-red-300 ${
                isComplete && !shouldReduceMotion ? "animate-dot-orbit-1" : ""
              }`}
            />
            <div
              className={`absolute bottom-6 right-6 w-2.5 h-2.5 rounded-full bg-red-300 ${
                isComplete && !shouldReduceMotion ? "animate-dot-orbit-2" : ""
              }`}
            />

            {/* Task 1: Background Dotted Orbit Ring Draw-In */}
            <div
              className={`absolute w-[75%] h-[75%] rounded-full border border-dashed border-red-200/80 pointer-events-none transition-all duration-500 ease-out ${
                isTriggered || shouldReduceMotion ? "opacity-100 scale-100" : "opacity-0 scale-80"
              }`}
            />

            {/* Task 2 & Task 6: Rising 3D Bar Chart Visual with Live Cursor Response Sway */}
            <div className="relative z-10 flex items-end justify-center gap-4 h-48 w-full max-w-[240px]">
              {/* Bar 1: Black */}
              <div
                className={`w-10 bg-slate-950 rounded-t-xl h-28 shadow-lg relative transition-transform duration-500 ease-out origin-bottom ${
                  isTriggered || shouldReduceMotion ? "scale-y-100" : "scale-y-0"
                }`}
                style={{
                  transitionDelay: shouldReduceMotion || !isTriggered ? "0ms" : "500ms",
                  transform:
                    isComplete && !shouldReduceMotion
                      ? `scaleY(1) translateX(${barSway.bar1X}px) rotate(${barSway.bar1Rot}deg)`
                      : undefined,
                }}
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-1.5 bg-slate-800 rounded-full opacity-60" />
              </div>

              {/* Bar 2: Red Accent */}
              <div
                className={`w-12 bg-[#EE1C25] rounded-t-xl h-44 shadow-xl shadow-red-500/30 relative transition-transform duration-500 ease-out origin-bottom ${
                  isTriggered || shouldReduceMotion ? "scale-y-100" : "scale-y-0"
                }`}
                style={{
                  transitionDelay: shouldReduceMotion || !isTriggered ? "0ms" : "650ms",
                  transform:
                    isComplete && !shouldReduceMotion
                      ? `scaleY(1) translateX(${barSway.bar2X}px) rotate(${barSway.bar2Rot}deg)`
                      : undefined,
                }}
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-2 bg-red-400 rounded-full opacity-80" />
                {/* Floating Red Orbiting Ball Marker Settle */}
                <div
                  className={`absolute -top-12 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#EE1C25] shadow-lg shadow-red-500/50 transition-all duration-400 ease-out ${
                    isTriggered || shouldReduceMotion ? "opacity-100 scale-100" : "opacity-0 scale-0"
                  }`}
                  style={{ transitionDelay: shouldReduceMotion || !isTriggered ? "0ms" : "1150ms" }}
                />
              </div>

              {/* Bar 3: Light Gray */}
              <div
                className={`w-10 bg-slate-100 border border-slate-200 rounded-t-xl h-32 shadow-md relative transition-transform duration-500 ease-out origin-bottom ${
                  isTriggered || shouldReduceMotion ? "scale-y-100" : "scale-y-0"
                }`}
                style={{
                  transitionDelay: shouldReduceMotion || !isTriggered ? "0ms" : "800ms",
                  transform:
                    isComplete && !shouldReduceMotion
                      ? `scaleY(1) translateX(${barSway.bar3X}px) rotate(${barSway.bar3Rot}deg)`
                      : undefined,
                }}
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-1.5 bg-slate-200 rounded-full" />
              </div>
            </div>

            {/* Base Shadow Floor */}
            <div className="absolute bottom-10 w-64 h-6 bg-slate-200/60 rounded-full blur-md pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}

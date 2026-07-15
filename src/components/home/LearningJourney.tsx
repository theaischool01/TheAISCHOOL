"use client";

import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import Image from "next/image";
import { BookOpen, BrainCircuit, Bot, Sparkles } from "lucide-react";

const stages = [
  {
    number: "01",
    title: "AI Fundamentals",
    icon: BookOpen,
    topics: ["AI Fundamentals", "Python for AI"],
    desc: "Establish a solid programming foundation and core math concepts required for intelligent systems.",
    badgeColor: "bg-red-50 text-[#EE1C25] border-red-100",
    hoverColor: "group-hover:border-[#EE1C25]",
  },
  {
    number: "02",
    title: "Core Machine Learning",
    icon: BrainCircuit,
    topics: ["Machine Learning", "Deep Learning"],
    desc: "Train models, understand algorithms, and explore neural architectures to solve real-world analytical tasks.",
    badgeColor: "bg-red-50 text-[#EE1C25] border-red-100",
    hoverColor: "group-hover:border-[#EE1C25]",
  },
  {
    number: "03",
    title: "Advanced Generative AI",
    icon: Sparkles,
    topics: ["Generative AI", "Prompt Engineering", "NLP", "Computer Vision"],
    desc: "Master large language models, image synthesis, natural language processing, and spatial recognition.",
    badgeColor: "bg-red-50 text-[#EE1C25] border-red-100",
    hoverColor: "group-hover:border-[#EE1C25]",
  },
  {
    number: "04",
    title: "Agentic Systems & Placements",
    icon: Bot,
    topics: ["Agentic AI", "AI Projects", "Internships", "Career Opportunities"],
    desc: "Build autonomous agents, deploy scalable projects, gain internship exposure, and route into active startups.",
    badgeColor: "bg-red-50 text-[#EE1C25] border-red-100",
    hoverColor: "group-hover:border-[#EE1C25]",
  },
];

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function LearningJourney() {
  const [activeStage, setActiveStage] = useState<number | null>(null);

  // References for dynamic positioning
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);

  // Calculated SVG paths
  const [paths, setPaths] = useState<string[]>(["", "", "", ""]);

  const calculatePaths = () => {
    if (
      !containerRef.current ||
      !centerRef.current ||
      !card1Ref.current ||
      !card2Ref.current ||
      !card3Ref.current ||
      !card4Ref.current
    ) {
      return;
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const centerRect = centerRef.current.getBoundingClientRect();

    // Visual geometric center of logo circle
    const cX = centerRect.left - containerRect.left + centerRect.width / 2;
    const cY = centerRect.top - containerRect.top + centerRect.height / 2;
    const radius = centerRect.width / 2;

    const cards = [card1Ref, card2Ref, card3Ref, card4Ref];
    const newPaths = cards.map((ref, idx) => {
      if (!ref.current) return "";
      const cardRect = ref.current.getBoundingClientRect();

      let targetX = 0;
      let targetY = 0;

      // Anchor to the center of the nearest edge (vertical center)
      if (idx === 0 || idx === 1) { // Left-side cards: Connect to right-edge, vertical center
        targetX = cardRect.right - containerRect.left;
        targetY = cardRect.top - containerRect.top + cardRect.height / 2;
      } else { // Right-side cards: Connect to left-edge, vertical center
        targetX = cardRect.left - containerRect.left;
        targetY = cardRect.top - containerRect.top + cardRect.height / 2;
      }

      // Compute vector from logo center to the card edge center point
      const dx = targetX - cX;
      const dy = targetY - cY;
      const length = Math.sqrt(dx * dx + dy * dy);

      // Normalize direction vector and multiply by logo radius
      // This ensures the starting point is exactly on the logo circumference
      const startX = cX + (dx / length) * radius;
      const startY = cY + (dy / length) * radius;

      // Generate dynamic symmetrical cubic Bezier curves
      const controlX1 = (targetX + startX) / 2;
      const controlY1 = startY;
      const controlX2 = (targetX + startX) / 2;
      const controlY2 = targetY;

      return `M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${targetX} ${targetY}`;
    });

    setPaths(newPaths);
  };

  useIsomorphicLayoutEffect(() => {
    calculatePaths();

    // Setting up ResizeObserver to recalculate paths dynamically on layout changes
    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(() => {
        calculatePaths();
      });

      [containerRef, centerRef, card1Ref, card2Ref, card3Ref, card4Ref].forEach((ref) => {
        if (ref.current) observer.observe(ref.current);
      });

      return () => {
        observer.disconnect();
      };
    } else {
      window.addEventListener("resize", calculatePaths);
      return () => window.removeEventListener("resize", calculatePaths);
    }
  }, []);

  return (
    <section className="w-full bg-slate-50/50 py-28 lg:py-36 px-6 md:px-12 border-t border-gray-100 relative z-10 font-heading overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[700px] h-[300px] bg-red-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* ================= LEFT SIDE: HEADLINE & CTA ================= */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-black text-gray-950 tracking-tight leading-[1.1] uppercase">
              <span className="text-gray-950 block">YOUR JOURNEY INTO</span>
              <span className="text-[#EE1C25] block">AI STARTS HERE</span>
            </h2>

            <p className="text-slate-700 text-sm font-semibold leading-relaxed max-w-lg mx-auto lg:mx-0">
              From AI Fundamentals to real-world AI projects, follow a structured path designed by industry experts to make you industry-ready.
            </p>

            <div className="pt-4 flex justify-center lg:justify-start">
              <a
                href="/learn"
                className="group inline-flex items-center gap-2.5 bg-[#EE1C25] hover:bg-[#d61920] text-white font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Explore Programs
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* ================= RIGHT SIDE: INTERACTIVE PATHWAY ================= */}
          <div className="lg:col-span-7 relative min-h-[520px] flex items-center justify-center">
            {/* Desktop Visualization (Hidden on Mobile/Tablet) */}
            <div 
              ref={containerRef}
              className="hidden lg:block relative select-none w-[600px] h-[500px]"
            >
              {/* SVG pathways calculated dynamically */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
                viewBox="0 0 600 500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {stages.map((_, idx) => (
                  <path
                    key={idx}
                    d={paths[idx]}
                    stroke={activeStage === idx ? "#EE1C25" : "#E5E7EB"}
                    strokeWidth={activeStage === idx ? "3" : "1.5"}
                    className="transition-all duration-300"
                  />
                ))}
              </svg>

              {/* CENTER HUB (Z-Index 30) */}
              <div
                ref={centerRef}
                className="absolute bg-white border border-neutral-200 rounded-full flex items-center justify-center shadow-md z-30 select-none"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "112px",
                  height: "112px",
                }}
              >
                <div className="absolute inset-1.5 border border-dashed border-red-200/50 rounded-full" />
                <div className="relative w-[65%] h-[65%]">
                  <Image
                    src="/images/logo.png"
                    alt="The AI School Logo"
                    fill
                    sizes="80px"
                    className="object-contain relative z-10"
                    priority
                  />
                </div>
              </div>

              {/* STAGE 1 CARD (Top Left - Z-Index 20) */}
              <div
                ref={card1Ref}
                onMouseEnter={() => setActiveStage(0)}
                onMouseLeave={() => setActiveStage(null)}
                className="absolute group bg-white border border-neutral-200/80 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#EE1C25] transition-all duration-300 cursor-pointer select-none z-20"
                style={{
                  left: "40px",
                  top: "40px",
                  width: "220px",
                  height: "160px",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-red-50 text-[#EE1C25] border border-red-100 rounded-lg">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-black text-neutral-300 group-hover:text-[#EE1C25] transition-colors">STAGE 01</span>
                </div>
                <h4 className="text-sm font-bold text-gray-950 font-heading leading-tight mb-2">
                  {stages[0].title}
                </h4>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {stages[0].topics.map((t) => (
                    <span key={t} className="text-[9px] font-bold bg-neutral-50 border border-neutral-100 text-neutral-600 px-2 py-0.5 rounded-md">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* STAGE 2 CARD (Bottom Left - Z-Index 20) */}
              <div
                ref={card2Ref}
                onMouseEnter={() => setActiveStage(1)}
                onMouseLeave={() => setActiveStage(null)}
                className="absolute group bg-white border border-neutral-200/80 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#EE1C25] transition-all duration-300 cursor-pointer select-none z-20"
                style={{
                  left: "40px",
                  top: "300px",
                  width: "220px",
                  height: "160px",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-red-50 text-[#EE1C25] border border-red-100 rounded-lg">
                    <BrainCircuit className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-black text-neutral-300 group-hover:text-[#EE1C25] transition-colors">STAGE 02</span>
                </div>
                <h4 className="text-sm font-bold text-gray-950 font-heading leading-tight mb-2">
                  {stages[1].title}
                </h4>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {stages[1].topics.map((t) => (
                    <span key={t} className="text-[9px] font-bold bg-neutral-50 border border-neutral-100 text-neutral-600 px-2 py-0.5 rounded-md">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* STAGE 3 CARD (Top Right - Z-Index 20) */}
              <div
                ref={card3Ref}
                onMouseEnter={() => setActiveStage(2)}
                onMouseLeave={() => setActiveStage(null)}
                className="absolute group bg-white border border-neutral-200/80 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#EE1C25] transition-all duration-300 cursor-pointer select-none z-20"
                style={{
                  left: "340px",
                  top: "40px",
                  width: "220px",
                  height: "160px",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-red-50 text-[#EE1C25] border border-red-100 rounded-lg">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-black text-neutral-300 group-hover:text-[#EE1C25] transition-colors">STAGE 03</span>
                </div>
                <h4 className="text-sm font-bold text-gray-950 font-heading leading-tight mb-2">
                  {stages[2].title}
                </h4>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {stages[2].topics.map((t) => (
                    <span key={t} className="text-[9px] font-bold bg-neutral-50 border border-neutral-100 text-neutral-600 px-2 py-0.5 rounded-md">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* STAGE 4 CARD (Bottom Right - Z-Index 20) */}
              <div
                ref={card4Ref}
                onMouseEnter={() => setActiveStage(3)}
                onMouseLeave={() => setActiveStage(null)}
                className="absolute group bg-white border border-neutral-200/80 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#EE1C25] transition-all duration-300 cursor-pointer select-none z-20"
                style={{
                  left: "340px",
                  top: "300px",
                  width: "220px",
                  height: "160px",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-red-50 text-[#EE1C25] border border-red-100 rounded-lg">
                    <Bot className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-black text-neutral-300 group-hover:text-[#EE1C25] transition-colors">STAGE 04</span>
                </div>
                <h4 className="text-sm font-bold text-gray-950 font-heading leading-tight mb-2">
                  {stages[3].title}
                </h4>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {stages[3].topics.map((t) => (
                    <span key={t} className="text-[9px] font-bold bg-neutral-50 border border-neutral-100 text-neutral-600 px-2 py-0.5 rounded-md">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile / Tablet Roadmap Layout (Hidden on Desktop) */}
            <div className="lg:hidden w-full space-y-8 pl-4 border-l border-neutral-200 relative">
              {stages.map((stage, idx) => {
                const Icon = stage.icon;
                return (
                  <div key={idx} className="relative group">
                    {/* Circle Node indicator */}
                    <div className="absolute -left-[25px] top-1 w-4 h-4 bg-white border-2 border-[#EE1C25] rounded-full group-hover:bg-[#EE1C25] transition-colors duration-300" />

                    <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 shadow-xs hover:border-[#EE1C25] transition-all duration-300">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-black text-[#EE1C25] tracking-widest uppercase">Stage {stage.number}</span>
                        <Icon className="w-4 h-4 text-neutral-400" />
                      </div>
                      <h4 className="text-base font-bold text-gray-950 font-heading leading-tight mb-2">
                        {stage.title}
                      </h4>
                      <p className="text-xs text-neutral-500 font-semibold leading-relaxed mb-4">
                        {stage.desc}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {stage.topics.map((t) => (
                          <span key={t} className="text-[9px] font-bold bg-neutral-50 border border-neutral-100 text-neutral-600 px-2.5 py-0.5 rounded-md">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

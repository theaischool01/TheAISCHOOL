"use client";

import React, { useState, useRef, useEffect } from "react";
import { ArrowRight, BookOpen, BrainCircuit, Sparkles, Bot, Trophy } from "lucide-react";

const stages = [
  {
    number: "01",
    title: "AI Fundamentals",
    icon: BookOpen,
    topics: ["AI Fundamentals", "Python for AI"],
    desc: "Establish a solid programming foundation and core math concepts required for intelligent systems.",
    outcome: "Build solid programming and core mathematical foundations for AI.",
    progress: "1 of 4",
  },
  {
    number: "02",
    title: "Core Machine Learning",
    icon: BrainCircuit,
    topics: ["Machine Learning", "Deep Learning"],
    desc: "Train models, understand algorithms, and explore neural architectures to solve real-world analytical tasks.",
    outcome: "Master ML algorithms, neural architectures, and predictive modeling.",
    progress: "2 of 4",
  },
  {
    number: "03",
    title: "Advanced Generative AI",
    icon: Sparkles,
    topics: ["Generative AI", "Prompt Engineering", "NLP", "Computer Vision"],
    desc: "Master large language models, image synthesis, natural language processing, and spatial recognition.",
    outcome: "Develop LLMs, prompt systems, NLP, and multimodal AI tools.",
    progress: "3 of 4",
  },
  {
    number: "04",
    title: "Agentic Systems & Placements",
    icon: Bot,
    topics: ["Agentic AI", "AI Projects", "Internships", "Career Opportunities"],
    desc: "Build autonomous agents, deploy scalable capstones, gain internship exposure, and get hired.",
    outcome: "Deploy autonomous agents, complete capstones, and get job-ready.",
    progress: "4 of 4",
  },
];

export default function LearningJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const originRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);
  const [svgPath, setSvgPath] = useState<string>("");

  // Calculate SVG connecting zigzag path from origin badge through Stage 01 -> 02 -> 03 -> 04
  const calculateZigzagPath = () => {
    if (
      !containerRef.current ||
      !originRef.current ||
      !card1Ref.current ||
      !card2Ref.current ||
      !card3Ref.current ||
      !card4Ref.current
    ) {
      return;
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const getPoint = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      return {
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top + rect.height / 2,
      };
    };

    const p0 = getPoint(originRef.current);
    const p1 = getPoint(card1Ref.current);
    const p2 = getPoint(card2Ref.current);
    const p3 = getPoint(card3Ref.current);
    const p4 = getPoint(card4Ref.current);

    // Smooth cubic bezier path flowing through origin -> p1 -> p2 -> p3 -> p4
    const d = `
      M ${p0.x} ${p0.y}
      C ${p0.x} ${(p0.y + p1.y) / 2}, ${p1.x} ${(p0.y + p1.y) / 2}, ${p1.x} ${p1.y}
      C ${p1.x} ${(p1.y + p2.y) / 2}, ${p2.x} ${(p1.y + p2.y) / 2}, ${p2.x} ${p2.y}
      C ${p2.x} ${(p2.y + p3.y) / 2}, ${p3.x} ${(p2.y + p3.y) / 2}, ${p3.x} ${p3.y}
      C ${p3.x} ${(p3.y + p4.y) / 2}, ${p4.x} ${(p3.y + p4.y) / 2}, ${p4.x} ${p4.y}
    `;

    setSvgPath(d.replace(/\s+/g, " ").trim());
  };

  useEffect(() => {
    calculateZigzagPath();
    window.addEventListener("resize", calculateZigzagPath);
    return () => window.removeEventListener("resize", calculateZigzagPath);
  }, []);

  return (
    <section className="w-full bg-[#FFF8F8] py-16 lg:py-24 px-6 md:px-12 relative z-10 font-heading overflow-hidden border-b border-red-100/60">
      {/* Soft Ambient Red Radial Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[700px] h-[300px] bg-red-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Side: Headline & Description (Preserved intact) */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left sticky top-28">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-950 tracking-tight leading-[1.05] uppercase">
              YOUR JOURNEY <br />
              INTO <br />
              <span className="text-[#EE1C25]">AI STARTS HERE</span>
            </h2>

            <p className="text-slate-600 text-sm md:text-base font-semibold leading-relaxed max-w-lg mx-auto lg:mx-0">
              From AI Fundamentals to real-world production projects, follow a structured path engineered by Silicon Valley & industry experts to make you industry-ready.
            </p>

            <div className="pt-2 flex justify-center lg:justify-start">
              <a
                href="#courses"
                className="inline-flex items-center gap-2.5 bg-[#EE1C25] hover:bg-[#D3131B] text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-lg shadow-red-500/20 hover:shadow-red-500/35 hover:-translate-y-0.5 transition-all duration-300"
              >
                <span>EXPLORE PROGRAMS</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Side: Zigzag Skill-Tree Path (Task 1) */}
          <div className="lg:col-span-7 relative pt-2" ref={containerRef}>
            {/* SVG Connecting Dashed Track Layer */}
            {svgPath && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden md:block">
                <path
                  d={svgPath}
                  fill="none"
                  stroke="#EE1C25"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  opacity="0.45"
                />
              </svg>
            )}

            {/* Task 1: Origin Badge ("THE AI SCHOOL") - Mile Marker Zero */}
            <div className="flex items-center gap-3 mb-8 relative z-10">
              <div
                ref={originRef}
                className="w-16 h-16 rounded-full bg-white border-2 border-[#EE1C25] shadow-md flex items-center justify-center shrink-0"
              >
                <span className="text-[10px] font-black tracking-tight text-[#EE1C25] text-center px-1 leading-tight uppercase">
                  THE AI<br />SCHOOL
                </span>
              </div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                START HERE • SKILL-TREE PATH
              </div>
            </div>

            {/* Zigzag Cards Vertical Stack (Task 1 & Task 2) */}
            <div className="space-y-6 relative z-10">
              {/* Stage 01 - Left Aligned */}
              <div
                ref={card1Ref}
                className="w-full max-w-full md:max-w-sm md:mr-auto bg-white border border-neutral-200/90 rounded-3xl p-6 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#F1F3F5] text-slate-700 flex items-center justify-center font-bold">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                    1 of 4 • STAGE 01
                  </span>
                </div>
                <h4 className="font-bold text-base text-[#171717]">
                  {stages[0].title}
                </h4>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {stages[0].topics.map((t) => (
                    <span key={t} className="px-2.5 py-0.5 rounded-full bg-slate-50 text-[10px] font-bold text-slate-700 border border-neutral-200/60">
                      {t}
                    </span>
                  ))}
                </div>
                {/* Task 3: Outcome Microcopy */}
                <p className="text-xs text-slate-500 font-medium leading-relaxed pt-1 border-t border-slate-100">
                  {stages[0].outcome}
                </p>
              </div>

              {/* Stage 02 - Right Offset */}
              <div
                ref={card2Ref}
                className="w-full max-w-full md:max-w-sm md:ml-auto bg-white border border-neutral-200/90 rounded-3xl p-6 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-[#EE1C25] border border-red-200/60 flex items-center justify-center font-bold">
                    <BrainCircuit className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full bg-red-50 text-[#EE1C25]">
                    2 of 4 • STAGE 02
                  </span>
                </div>
                <h4 className="font-bold text-base text-[#171717]">
                  {stages[1].title}
                </h4>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {stages[1].topics.map((t) => (
                    <span key={t} className="px-2.5 py-0.5 rounded-full bg-slate-50 text-[10px] font-bold text-slate-700 border border-neutral-200/60">
                      {t}
                    </span>
                  ))}
                </div>
                {/* Task 3: Outcome Microcopy */}
                <p className="text-xs text-slate-500 font-medium leading-relaxed pt-1 border-t border-slate-100">
                  {stages[1].outcome}
                </p>
              </div>

              {/* Stage 03 - Left Aligned & Featured */}
              <div
                ref={card3Ref}
                className="w-full max-w-full md:max-w-sm md:mr-auto bg-white border-2 border-[#EE1C25] rounded-3xl p-6 shadow-md space-y-3 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-[#EE1C25] text-white text-[9px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                  FEATURED STAGE
                </div>
                <div className="flex items-center justify-between pt-1">
                  <div className="w-10 h-10 rounded-xl bg-red-100 text-[#EE1C25] flex items-center justify-center font-bold">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full bg-red-100 text-[#EE1C25]">
                    3 of 4 • STAGE 03
                  </span>
                </div>
                <h4 className="font-bold text-base text-[#171717]">
                  {stages[2].title}
                </h4>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {stages[2].topics.map((t) => (
                    <span key={t} className="px-2.5 py-0.5 rounded-full bg-red-50 text-[10px] font-bold text-[#EE1C25] border border-red-200">
                      {t}
                    </span>
                  ))}
                </div>
                {/* Task 3: Outcome Microcopy */}
                <p className="text-xs text-slate-600 font-medium leading-relaxed pt-1 border-t border-red-100">
                  {stages[2].outcome}
                </p>
              </div>

              {/* Stage 04 - Right Offset Destination (Task 2) */}
              <div
                ref={card4Ref}
                className="w-full max-w-full md:max-w-sm md:ml-auto bg-gradient-to-br from-red-50/80 via-white to-white border-2 border-red-500/80 rounded-3xl p-6 shadow-md space-y-3 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-[#EE1C25] text-white shadow-md flex items-center justify-center font-bold">
                      <Bot className="w-5 h-5" />
                    </div>
                    <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                      <Trophy className="w-3 h-3 text-amber-600" /> OUTCOME
                    </span>
                  </div>
                  <span className="text-[10px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#EE1C25] text-white">
                    4 of 4 • DESTINATION
                  </span>
                </div>
                <h4 className="font-bold text-base text-[#171717]">
                  {stages[3].title}
                </h4>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {stages[3].topics.map((t) => (
                    <span key={t} className="px-2.5 py-0.5 rounded-full bg-red-100/60 text-[10px] font-bold text-red-900 border border-red-200">
                      {t}
                    </span>
                  ))}
                </div>
                {/* Task 3: Outcome Microcopy */}
                <p className="text-xs text-slate-700 font-bold leading-relaxed pt-1 border-t border-red-200">
                  {stages[3].outcome}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

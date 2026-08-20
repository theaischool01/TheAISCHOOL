"use client";

import React, { useRef, useState, useEffect } from "react";
import { Terminal, Sparkles, ArrowRight, Layers, Cpu } from "lucide-react";

// Custom hook for per-card IntersectionObserver, stagger rise, and ghost number counting
function useCourseCard(targetNum: number, delayMs: number) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isTriggered, setIsTriggered] = useState(false);
  const [displayNum, setDisplayNum] = useState("00");
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setShouldReduceMotion(true);
      setIsTriggered(true);
      setDisplayNum(String(targetNum).padStart(2, "0"));
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setIsTriggered(true);
          observer.disconnect(); // Trigger once per card

          setTimeout(() => {
            const duration = 500;
            const startTime = performance.now();

            const animate = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const current = Math.floor(progress * targetNum);
              setDisplayNum(String(current).padStart(2, "0"));

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setDisplayNum(String(targetNum).padStart(2, "0"));
              }
            };

            requestAnimationFrame(animate);
          }, delayMs);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [targetNum, delayMs]);

  return { ref, isTriggered, displayNum, shouldReduceMotion };
}

export default function FlagshipLearningFrameworks() {
  const card1 = useCourseCard(1, 0);
  const card2 = useCourseCard(2, 130);
  const card3 = useCourseCard(3, 260);
  const card4 = useCourseCard(4, 390);

  return (
    <section id="courses" className="w-full bg-white py-16 lg:py-24 px-6 md:px-12 relative z-10 font-heading">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Title */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-[1.1] uppercase">
            <span className="text-gray-950 block">FLAGSHIP</span>
            <span className="text-[#EE1C25] block mt-1">COURSES & FRAMEWORKS</span>
          </h2>
          <p className="text-sm font-semibold text-neutral-500">
            Outcome-focused specialized engineering tracks built for immediate industry applicability.
          </p>
        </div>

        <div className="space-y-6">
          {/* TASK 1: Full-Width Flagship Hero Card (Card 01 - AIM-IT Master Class) */}
          <div
            ref={card1.ref}
            onClick={() => (window.location.href = "#register")}
            className={`group relative bg-gradient-to-br from-[#FFF5F5] via-[#FFF8F8] to-white border-2 border-red-200/80 rounded-[2.25rem] p-8 md:p-10 min-h-[340px] flex flex-col justify-between overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer hover:-translate-y-2 hover:border-[#EE1C25] hover:shadow-2xl ${
              card1.isTriggered || card1.shouldReduceMotion
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            {/* TASK 3: Animated Number Counter Ghost Text */}
            <span className="absolute -right-4 -bottom-6 text-[120px] font-black text-black opacity-[0.05] select-none pointer-events-none font-sans">
              {card1.displayNum}
            </span>

            <div className="flex justify-between items-start">
              <div className="p-4 bg-red-50 text-[#C1121C] rounded-2xl border border-red-100 group-hover:scale-105 transition-transform duration-300">
                <Sparkles className="w-8 h-8" />
              </div>
              <span className="bg-[#EE1C25] text-white text-[11px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-sm">
                SPECIAL MASTER CLASS
              </span>
            </div>

            <div className="space-y-4 z-10 my-4">
              <div>
                <h4 className="text-2xl md:text-3xl font-extrabold text-gray-950 font-heading">
                  "AIM-IT" (AI Machine Learning for Industry Transformation) Master Class
                </h4>
                <p className="text-xs md:text-sm text-neutral-600 font-semibold leading-relaxed mt-2.5 italic border-l-2 border-[#EE1C25] pl-3.5 max-w-4xl">
                  "By 2030, 25% of IT work is expected to be done by AI alone, while the remaining 75% will be performed by humans augmented with AI." <span className="not-italic text-[#EE1C25] font-bold">— Gartner</span>
                </p>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {["GenAI", "MLOps", "Agent Architecture", "Prompting", "LLMs"].map((tech) => (
                  <span
                    key={tech}
                    className="bg-white border border-red-100 text-neutral-700 text-[10px] font-extrabold px-3 py-1 rounded-full shadow-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-red-100/80 z-10">
              <div className="text-[10px] text-neutral-500 font-extrabold uppercase tracking-wider">
                90 MIN LIVE • INDUSTRY TRANSFORMATIONS • GARTNER INSIGHTS
              </div>
              {/* TASK 5: CTA Arrow Nudge */}
              <div className="text-xs font-black uppercase tracking-wider text-[#C1121C] flex items-center gap-1 shrink-0">
                <span>REGISTER FREE</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200 ease-out" />
              </div>
            </div>
          </div>

          {/* TASK 2: Bento Grid Asymmetry Row (3 Secondary Cards: 5-col / 4-col / 3-col) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Card 02: AI Ready Developer (md:col-span-5) */}
            <div
              ref={card2.ref}
              onClick={() => (window.location.href = "#register")}
              className={`md:col-span-5 group relative bg-white border border-neutral-200/90 rounded-[2rem] p-8 min-h-[320px] flex flex-col justify-between overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer hover:-translate-y-2 hover:border-[#EE1C25] hover:shadow-2xl ${
                card2.isTriggered || card2.shouldReduceMotion
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              {/* TASK 3: Animated Number Counter Ghost Text */}
              <span className="absolute -right-4 -bottom-6 text-[110px] font-black text-black opacity-[0.04] select-none pointer-events-none font-sans">
                {card2.displayNum}
              </span>

              <div className="flex justify-between items-start">
                <div className="p-3.5 bg-red-50 text-[#EE1C25] rounded-2xl border border-red-100 group-hover:scale-105 transition-transform duration-300">
                  <Terminal className="w-7 h-7" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="bg-[#EE1C25] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                    FUTURE READY
                  </span>
                  <span className="bg-neutral-100 text-slate-700 text-[10px] font-black px-2.5 py-1 rounded-full border border-neutral-200">
                    20 HOURS
                  </span>
                </div>
              </div>

              <div className="space-y-3 z-10 my-4">
                <div>
                  <h4 className="text-xl font-extrabold text-gray-950 font-heading">
                    AI Ready Developer
                  </h4>
                  <p className="text-xs text-neutral-500 font-semibold leading-relaxed mt-1">
                    Transform your coding speed 10x by leveraging LLM primitives, modern AI IDEs (Cursor, Windsurf), automated testing, and prompt engineering.
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {["Cursor", "Windsurf", "Claude 3.5", "OpenAI API", "Vibe Coding"].map((tech) => (
                    <span
                      key={tech}
                      className="bg-neutral-50 border border-neutral-200/80 text-neutral-700 text-[9px] font-extrabold px-2.5 py-0.5 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-200/60 z-10">
                <div className="text-[9px] text-neutral-400 font-extrabold uppercase tracking-wider">
                  20 HOURS • LIVE CAPSTONE • FAST TRACK
                </div>
                {/* TASK 5: CTA Arrow Nudge */}
                <div className="text-xs font-black uppercase tracking-wider text-[#EE1C25] flex items-center gap-1 shrink-0">
                  <span>EXPLORE PROGRAM</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-200 ease-out" />
                </div>
              </div>
            </div>

            {/* Card 03: Build Your Own AI Agent (md:col-span-4) */}
            <div
              ref={card3.ref}
              onClick={() => (window.location.href = "#register")}
              className={`md:col-span-4 group relative bg-white border border-neutral-200/90 rounded-[2rem] p-8 min-h-[320px] flex flex-col justify-between overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer hover:-translate-y-2 hover:border-[#EE1C25] hover:shadow-2xl ${
                card3.isTriggered || card3.shouldReduceMotion
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              {/* TASK 3: Animated Number Counter Ghost Text */}
              <span className="absolute -right-4 -bottom-6 text-[110px] font-black text-black opacity-[0.04] select-none pointer-events-none font-sans">
                {card3.displayNum}
              </span>

              <div className="flex justify-between items-start">
                <div className="p-3.5 bg-red-50 text-[#EE1C25] rounded-2xl border border-red-100 group-hover:scale-105 transition-transform duration-300">
                  <Layers className="w-7 h-7" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="bg-[#EE1C25] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                    AGENT BUILDER
                  </span>
                  <span className="bg-neutral-100 text-slate-700 text-[10px] font-black px-2.5 py-1 rounded-full border border-neutral-200">
                    48 HOURS
                  </span>
                </div>
              </div>

              <div className="space-y-3 z-10 my-4">
                <div>
                  <h4 className="text-xl font-extrabold text-gray-950 font-heading">
                    Build Your Own AI Agent
                  </h4>
                  <p className="text-xs text-neutral-500 font-semibold leading-relaxed mt-1">
                    Master the end-to-end architecture of autonomous AI agents. Build custom tool-calling, memory persistence, vector search, and multi-agent systems.
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {["LangChain", "LlamaIndex", "Vector DBs", "Tool Calling", "Multi-Agent"].map((tech) => (
                    <span
                      key={tech}
                      className="bg-neutral-50 border border-neutral-200/80 text-neutral-700 text-[9px] font-extrabold px-2.5 py-0.5 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-200/60 z-10">
                <div className="text-[9px] text-neutral-400 font-extrabold uppercase tracking-wider">
                  48 HOURS • FLAGSHIP CAPSTONE • 1-ON-1 REVIEW
                </div>
                {/* TASK 5: CTA Arrow Nudge */}
                <div className="text-xs font-black uppercase tracking-wider text-[#EE1C25] flex items-center gap-1 shrink-0">
                  <span>EXPLORE PROGRAM</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-200 ease-out" />
                </div>
              </div>
            </div>

            {/* Card 04: Gen AI 101 (md:col-span-3) */}
            <div
              ref={card4.ref}
              onClick={() => (window.location.href = "#register")}
              className={`md:col-span-3 group relative bg-[#FFF9F5] border border-orange-100 rounded-[2rem] p-8 min-h-[320px] flex flex-col justify-between overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer hover:-translate-y-2 hover:border-[#EE1C25] hover:shadow-2xl ${
                card4.isTriggered || card4.shouldReduceMotion
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              {/* TASK 3: Animated Number Counter Ghost Text */}
              <span className="absolute -right-4 -bottom-6 text-[110px] font-black text-black opacity-[0.04] select-none pointer-events-none font-sans">
                {card4.displayNum}
              </span>

              <div className="flex justify-between items-start">
                <div className="p-3.5 bg-orange-50 text-[#EE1C25] rounded-2xl border border-orange-100 group-hover:scale-105 transition-transform duration-300">
                  <Cpu className="w-7 h-7" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="bg-[#EE1C25] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                    AI FOUNDATIONS
                  </span>
                  <span className="bg-white text-slate-700 text-[10px] font-black px-2.5 py-1 rounded-full border border-orange-200">
                    20 HOURS
                  </span>
                </div>
              </div>

              <div className="space-y-3 z-10 my-4">
                <div>
                  <h4 className="text-xl font-extrabold text-gray-950 font-heading">
                    Gen AI 101
                  </h4>
                  <p className="text-xs text-neutral-600 font-semibold leading-relaxed mt-1">
                    The essential foundational course for tech professionals, product managers, and creators looking to master Generative AI tools and prompt techniques.
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {["ChatGPT", "Claude", "Midjourney", "Workflow Automation", "AI Tools"].map((tech) => (
                    <span
                      key={tech}
                      className="bg-white border border-orange-100 text-neutral-700 text-[9px] font-extrabold px-2.5 py-0.5 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-orange-100 z-10">
                <div className="text-[9px] text-neutral-500 font-extrabold uppercase tracking-wider">
                  20 HOURS • BEGINNER TO PRO • HANDS-ON LABS
                </div>
                {/* TASK 5: CTA Arrow Nudge */}
                <div className="text-xs font-black uppercase tracking-wider text-[#EE1C25] flex items-center gap-1 shrink-0">
                  <span>EXPLORE PROGRAM</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-200 ease-out" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

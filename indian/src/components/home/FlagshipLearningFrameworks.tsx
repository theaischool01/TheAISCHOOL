"use client";

import React from "react";
import {
  Terminal,
  Sparkles,
  Code,
  GitBranch,
  ArrowRight,
} from "lucide-react";

export default function FlagshipLearningFrameworks() {
  return (
    <section className="w-full bg-transparent py-16 lg:py-20 px-6 md:px-12 relative z-10 font-heading">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* ================= SECTION TITLE ================= */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-[1.1] uppercase">
            <span className="text-gray-950 block">FLAGSHIP</span>
            <span className="text-[#EE1C25] block mt-1">LEARNING FRAMEWORKS</span>
          </h2>
          <p className="text-sm font-semibold text-neutral-500">
            Outcome-focused specialized engineering tracks built for immediate industry applicability.
          </p>
        </div>

        {/* ================= BENTO GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">

          {/* Card 1: AI Agent Development (col-span-7) — swapped to first */}
          <div
            onClick={() => window.location.href = "/learn"}
            className="group relative bg-[#FFF5F5] border border-red-100 rounded-[2rem] p-8 min-h-[300px] lg:min-h-[320px] col-span-12 lg:col-span-7 flex flex-col justify-between overflow-hidden transition-all duration-350 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:border-red-300 hover:shadow-[0_20px_50px_-20px_rgba(193,18,28,0.12)] cursor-pointer"
          >
            {/* Background 01 */}
            <span className="absolute -right-4 -bottom-6 text-[110px] font-black text-black opacity-[0.04] select-none pointer-events-none font-sans">
              01
            </span>
            <div className="flex justify-between items-start">
              <div className="p-4 bg-red-50 text-[#C1121C] rounded-2xl border border-red-100/50 group-hover:scale-105 transition-transform duration-300">
                <Terminal className="w-8 h-8" />
              </div>

              {/* Stack Metaphor */}
              <svg className="w-20 h-16 opacity-30 group-hover:opacity-60 transition-opacity" viewBox="0 0 80 60" fill="none">
                <path d="M 10 15 L 70 15 L 60 25 L 20 25 Z" fill="#FFF5F5" stroke="#C1121C" strokeWidth="1.5" />
                <path d="M 10 30 L 70 30 L 60 40 L 20 40 Z" fill="#E5E7EB" stroke="#C1121C" strokeWidth="1.5" />
                <line x1="20" y1="15" x2="20" y2="40" stroke="#C1121C" strokeWidth="2" />
              </svg>
            </div>

            <div className="space-y-3 z-10 my-4">
              <div>
                <h4 className="text-xl font-bold text-gray-950 font-heading">AI Agent Development</h4>
                <p className="text-xs text-neutral-500 font-semibold leading-relaxed mt-1">
                  Design autonomous AI agents with memory, tools, workflows and reasoning.
                </p>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {["CrewAI", "LangChain", "ChromaDB", "Python", "Autogen"].map((tech) => (
                  <span key={tech} className="bg-white border border-red-100 text-neutral-600 text-[9px] font-bold px-2 py-0.5 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-red-100 z-10">
              <div className="flex items-center space-x-2 text-[9px] text-neutral-400 font-bold uppercase tracking-wider">
                <span>Live Projects</span>
                <span>•</span>
                <span>Industry Mentors</span>
                <span>•</span>
                <span>Placement Ready</span>
              </div>
              <div className="text-xs font-black uppercase tracking-wider text-[#C1121C] flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-200 shrink-0">
                <span>Explore Program</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Card 2: Generative AI Engineering (col-span-5) — swapped to second */}
          <div
            onClick={() => window.location.href = "/learn"}
            className="group relative bg-white border border-neutral-200/80 rounded-[2rem] p-8 min-h-[300px] lg:min-h-[320px] col-span-12 lg:col-span-5 flex flex-col justify-between overflow-hidden transition-all duration-350 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:border-[#EE1C25]/40 hover:shadow-[0_20px_50px_-20px_rgba(238,28,37,0.12)] cursor-pointer"
          >
            {/* Background 02 */}
            <span className="absolute -right-4 -bottom-6 text-[110px] font-black text-black opacity-[0.04] select-none pointer-events-none font-sans">
              02
            </span>
            <div className="flex justify-between items-start">
              <div className="p-4 bg-red-50 text-[#EE1C25] rounded-2xl border border-red-100/50 group-hover:scale-105 transition-transform duration-300">
                <Sparkles className="w-8 h-8" />
              </div>

              {/* Connected Node Metaphor */}
              <svg className="w-24 h-16 opacity-30 group-hover:opacity-60 transition-opacity" viewBox="0 0 100 60" fill="none">
                <circle cx="20" cy="30" r="4" fill="#EE1C25" />
                <circle cx="80" cy="15" r="4" fill="#6B7280" />
                <circle cx="80" cy="45" r="4" fill="#6B7280" />
                <path d="M 24 30 L 76 15" stroke="#E5E7EB" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M 24 30 L 76 45" stroke="#E5E7EB" strokeWidth="1.5" strokeDasharray="3 3" />
              </svg>
            </div>

            <div className="space-y-3 z-10 my-4">
              <div>
                <h4 className="text-xl font-bold text-gray-950 font-heading">Generative AI Engineering</h4>
                <p className="text-xs text-neutral-500 font-semibold leading-relaxed max-w-md mt-1">
                  Build production-ready LLM applications using modern AI infrastructure.
                </p>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {["OpenAI", "LangGraph", "Pinecone", "FastAPI", "Docker"].map((tech) => (
                  <span key={tech} className="bg-neutral-50 border border-neutral-100 text-neutral-500 text-[9px] font-bold px-2 py-0.5 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-neutral-100/50 z-10">
              <div className="flex items-center space-x-2 text-[9px] text-neutral-400 font-bold uppercase tracking-wider">
                <span>Live Projects</span>
                <span>•</span>
                <span>Mentors</span>
                <span>•</span>
                <span>Ready</span>
              </div>
              <div className="text-xs font-black uppercase tracking-wider text-[#EE1C25] flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-200 shrink-0">
                <span>Explore Program</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Card 3: Full Stack AI Engineering (col-span-8) */}
          <div
            onClick={() => window.location.href = "/learn"}
            className="group relative bg-white border border-neutral-200/80 rounded-[2rem] p-8 min-h-[300px] lg:min-h-[320px] col-span-12 lg:col-span-8 flex flex-col justify-between overflow-hidden transition-all duration-350 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:border-purple-500/40 hover:shadow-[0_20px_50px_-20px_rgba(139,92,246,0.12)] cursor-pointer"
          >
            {/* Background 03 */}
            <span className="absolute -right-4 -bottom-6 text-[110px] font-black text-black opacity-[0.04] select-none pointer-events-none font-sans">
              03
            </span>
            <div className="flex justify-between items-start">
              <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl border border-purple-100/50 group-hover:scale-105 transition-transform duration-300">
                <Code className="w-8 h-8" />
              </div>

              {/* Deployment Pipeline Metaphor */}
              <svg className="w-32 h-16 opacity-30 group-hover:opacity-60 transition-opacity" viewBox="0 0 120 60" fill="none">
                <rect x="10" y="20" width="24" height="20" rx="4" stroke="#D1D5DB" strokeWidth="1.5" />
                <rect x="48" y="20" width="24" height="20" rx="4" stroke="#D1D5DB" strokeWidth="1.5" strokeDasharray="3 3" />
                <rect x="86" y="20" width="24" height="20" rx="4" stroke="#8B5CF6" strokeWidth="1.5" />
                <path d="M 34 30 L 48 30" stroke="#D1D5DB" strokeWidth="1.5" />
                <path d="M 72 30 L 86 30" stroke="#8B5CF6" strokeWidth="1.5" />
              </svg>
            </div>

            <div className="space-y-3 z-10 my-4">
              <div>
                <h4 className="text-xl font-bold text-gray-950 font-heading">Full Stack AI Engineering</h4>
                <p className="text-xs text-neutral-500 font-semibold leading-relaxed max-w-lg mt-1">
                  Build, deploy and scale complete AI applications from frontend to production.
                </p>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {["FastAPI", "Next.js", "PostgreSQL", "CI/CD", "AWS"].map((tech) => (
                  <span key={tech} className="bg-neutral-50 border border-neutral-100 text-neutral-500 text-[9px] font-bold px-2 py-0.5 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-neutral-100/50 z-10">
              <div className="flex items-center space-x-2 text-[9px] text-neutral-400 font-bold uppercase tracking-wider">
                <span>Live Projects</span>
                <span>•</span>
                <span>Industry Mentors</span>
                <span>•</span>
                <span>Placement Ready</span>
              </div>
              <div className="text-xs font-black uppercase tracking-wider text-[#EE1C25] flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-200 shrink-0">
                <span>Explore Program</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Card 4: AI for Business & Analytics (col-span-4) */}
          <div
            onClick={() => window.location.href = "/learn"}
            className="group relative bg-[#FFF5F5] border border-red-100 rounded-[2rem] p-8 min-h-[300px] lg:min-h-[320px] col-span-12 lg:col-span-4 flex flex-col justify-between overflow-hidden transition-all duration-350 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:border-red-300 hover:shadow-[0_20px_50px_-20px_rgba(193,18,28,0.12)] cursor-pointer"
          >
            {/* Background 04 */}
            <span className="absolute -right-4 -bottom-6 text-[110px] font-black text-black opacity-[0.04] select-none pointer-events-none font-sans">
              04
            </span>
            <div className="flex justify-between items-start">
              <div className="p-4 bg-red-50 text-[#C1121C] rounded-2xl border border-red-100/50 group-hover:scale-105 transition-transform duration-300">
                <GitBranch className="w-8 h-8" />
              </div>

              {/* Branching Roadmap Metaphor */}
              <svg className="w-16 h-16 opacity-30 group-hover:opacity-60 transition-opacity" viewBox="0 0 60 60" fill="none">
                <path d="M 10 50 C 10 30, 30 30, 30 10" stroke="#D1D5DB" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M 30 50 C 30 30, 50 30, 50 10" stroke="#C1121C" strokeWidth="1.5" />
                <circle cx="30" cy="10" r="3" fill="#C1121C" />
                <circle cx="50" cy="10" r="3" fill="#C1121C" />
              </svg>
            </div>

            <div className="space-y-3 z-10 my-4">
              <div>
                <h4 className="text-xl font-bold text-gray-950 font-heading">AI for Business &amp; Analytics</h4>
                <p className="text-xs text-neutral-500 font-semibold leading-relaxed mt-1">
                  Transform business problems into AI-powered data solutions and intelligent decision systems.
                </p>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {["PowerBI", "Python", "SQL", "Pandas", "Scikit-Learn"].map((tech) => (
                  <span key={tech} className="bg-white border border-red-100 text-neutral-600 text-[9px] font-bold px-2 py-0.5 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-red-100 z-10">
              <div className="flex items-center space-x-2 text-[9px] text-neutral-400 font-bold uppercase tracking-wider">
                <span>Live Projects</span>
                <span>•</span>
                <span>Placement Ready</span>
              </div>
              <div className="text-xs font-black uppercase tracking-wider text-[#C1121C] flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-200 shrink-0">
                <span>Explore Program</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

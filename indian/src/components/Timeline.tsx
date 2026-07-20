"use client";

import React, { useState } from 'react';

interface TimelineStep {
  title: string;
  timeframe: string;
  shortDesc: string;
  details: string[];
  roleBadge: string;
  metric: string;
}

const steps: TimelineStep[] = [
  {
    title: "Architecture Design with Founders",
    timeframe: "Week 1",
    shortDesc: "Understand enterprise scaling, choose the right vector databases, and design multi-agent communication networks.",
    details: [
      "Select LLMs and frame proper System Instructions",
      "Map out context windows and token optimization strategies",
      "Design fallback flows and human-in-the-loop triggers"
    ],
    roleBadge: "System Design",
    metric: "Architect phase"
  },
  {
    title: "AI Agent & Workflow Orchestration",
    timeframe: "Week 2 - 3",
    shortDesc: "Implement advanced frameworks like LangGraph and CrewAI to orchestrate complex sequential and parallel agent workflows.",
    details: [
      "Build memory structures (short-term, long-term state)",
      "Integrate vector search indices for real-time RAG context retrieval",
      "Test loop-breaking guardrails and model self-correction cycles"
    ],
    roleBadge: "Core Engineering",
    metric: "Orchestration phase"
  },
  {
    title: "Deploying Live AI Microservices",
    timeframe: "Week 4",
    shortDesc: "Deploy containerized AI service APIs to production, optimizing GPU costs, latency, and request throughput.",
    details: [
      "Wrap agent code inside high-performance FastAPI instances",
      "Implement prompt caching and stream-based API response handlers",
      "Stress test endpoints under simulated real-world concurrent traffic"
    ],
    roleBadge: "Cloud & DevOps",
    metric: "Production-ready"
  },
  {
    title: "Pitching to Ecosystem Investors",
    timeframe: "Weekend Demo",
    shortDesc: "Present your fully deployed AI platform prototypes to startup incubators, venture capitalists, and industry leaders.",
    details: [
      "Demonstrate live agent execution live on stage",
      "Quantify cost efficiencies and architectural choices",
      "Unlock active job placements and funding opportunities"
    ],
    roleBadge: "Industry Handoff",
    metric: "Launch phase"
  }
];

export default function Timeline() {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section className="w-full bg-white py-14 px-6 md:px-12 border-t border-gray-100 relative z-10">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* ================= SECTION HEADER ================= */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#EE1C25] font-heading">Day in the Life</span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight font-heading">
            Immersive Learning Timeline
          </h2>
          <p className="text-[#6B7280] text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-medium">
            Step through our curriculum cycle to see exactly how we turn developers into enterprise AI architects.
          </p>
        </div>

        {/* ================= TIMELINE LAYOUT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Stepper Navigation (Left side) */}
          <div className="lg:col-span-5 space-y-4">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left p-6 rounded-3xl border transition-all duration-300 flex items-start space-x-4 cursor-pointer relative group ${
                    isActive 
                      ? "bg-gray-950 text-white border-gray-950 shadow-lg" 
                      : "bg-white text-gray-900 border-gray-200 hover:border-gray-300 hover:bg-gray-50/50"
                  }`}
                >
                  {/* Left Accent indicator line */}
                  <div className={`absolute top-0 left-0 h-full w-[4px] rounded-l-3xl transition-all duration-300 ${
                    isActive ? "bg-[#EE1C25]" : "bg-transparent group-hover:bg-[#EE1C25]/30"
                  }`} />

                  {/* Icon / Number badge */}
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm font-heading shrink-0 transition-colors ${
                    isActive ? "bg-[#EE1C25] text-white" : "bg-gray-100 text-gray-500 group-hover:bg-red-50 group-hover:text-[#EE1C25]"
                  }`}>
                    {step.timeframe.includes("Weekend") ? "★" : `0${idx + 1}`}
                  </div>

                  {/* Title & Phase */}
                  <div className="space-y-1">
                    <span className={`text-[10px] uppercase font-bold tracking-widest ${
                      isActive ? "text-[#EE1C25]" : "text-gray-400"
                    }`}>
                      {step.timeframe}
                    </span>
                    <h3 className="font-bold text-base sm:text-lg tracking-tight font-heading leading-snug">
                      {step.title}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Panel (Right side) */}
          <div className="lg:col-span-7 bg-gray-50/50 border border-gray-200 rounded-[32px] p-8 md:p-10 shadow-xs space-y-6 relative overflow-hidden min-h-[440px] flex flex-col justify-between">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-red-500/5 to-transparent blur-[80px] pointer-events-none rounded-full" />
            
            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#EE1C25] bg-red-50 px-3 py-1 rounded-full border border-red-100/50 font-heading">
                  {steps[activeStep].roleBadge}
                </span>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest font-mono">
                  {steps[activeStep].metric}
                </span>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight font-heading leading-tight">
                  {steps[activeStep].title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  {steps[activeStep].shortDesc}
                </p>
              </div>

              {/* Action item lists */}
              <div className="space-y-3 pt-4 border-t border-gray-200/50">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Key Milestones & Focus Area</h4>
                <ul className="space-y-2.5">
                  {steps[activeStep].details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start space-x-3 text-sm font-semibold text-gray-800">
                      <svg className="w-5 h-5 text-[#EE1C25] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="leading-snug">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Micro details indicator */}
            <div className="pt-6 border-t border-dashed border-gray-200 text-xs text-gray-400 font-medium flex justify-between items-center relative z-10">
              <span>Interactive Simulator</span>
              <span>Click other weeks to explore</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, BookOpen, BrainCircuit, Bot, Sparkles } from "lucide-react";

// Layout Geometry Constants
const CONTAINER_WIDTH = 600;
const CONTAINER_HEIGHT = 500;

const CENTER_X = CONTAINER_WIDTH / 2; // 300
const CENTER_Y = CONTAINER_HEIGHT / 2; // 250

const CARD_WIDTH = 220;
const CARD_HEIGHT = 160;

const NODE_SIZE = 112;
const NODE_RADIUS = NODE_SIZE / 2; // 56

const OUTER_MARGIN_X = 40;
const OUTER_MARGIN_Y = 40;

const LEFT_X = OUTER_MARGIN_X; // 40
const RIGHT_X = CONTAINER_WIDTH - OUTER_MARGIN_X - CARD_WIDTH; // 600 - 40 - 220 = 340

const TOP_Y = OUTER_MARGIN_Y; // 40
const BOTTOM_Y = CONTAINER_HEIGHT - OUTER_MARGIN_Y - CARD_HEIGHT; // 500 - 40 - 160 = 300

// Helper to calculate exact start and end points for SVG paths
// Start points are on the boundary of the center node (radius 56).
// End points connect to the nearest corner/edge of the stage cards.
const getPathData = (stageIndex: number) => {
  // Center is at (300, 250)
  // Distance from center to corners for bezier target control points
  switch (stageIndex) {
    case 0: { // Top Left (Card sits between X: 40-260, Y: 40-200)
      // Card bottom-right corner is at (260, 200)
      // Path starts at northwest edge of center node: (300 - cos(45)*56, 250 - sin(45)*56)
      const startX = CENTER_X - NODE_RADIUS * Math.SQRT1_2;
      const startY = CENTER_Y - NODE_RADIUS * Math.SQRT1_2;
      const endX = LEFT_X + CARD_WIDTH; // 260
      const endY = TOP_Y + CARD_HEIGHT; // 200
      return `M ${endX} ${endY} C ${(endX + startX) / 2} ${endY}, ${startX} ${(endY + startY) / 2}, ${startX} ${startY}`;
    }
    case 1: { // Bottom Left (Card sits between X: 40-260, Y: 300-460)
      // Card top-right corner is at (260, 300)
      // Path starts at southwest edge of center node
      const startX = CENTER_X - NODE_RADIUS * Math.SQRT1_2;
      const startY = CENTER_Y + NODE_RADIUS * Math.SQRT1_2;
      const endX = LEFT_X + CARD_WIDTH; // 260
      const endY = BOTTOM_Y; // 300
      return `M ${endX} ${endY} C ${(endX + startX) / 2} ${endY}, ${startX} ${(endY + startY) / 2}, ${startX} ${startY}`;
    }
    case 2: { // Top Right (Card sits between X: 340-560, Y: 40-200)
      // Card bottom-left corner is at (340, 200)
      // Path starts at northeast edge of center node
      const startX = CENTER_X + NODE_RADIUS * Math.SQRT1_2;
      const startY = CENTER_Y - NODE_RADIUS * Math.SQRT1_2;
      const endX = RIGHT_X; // 340
      const endY = TOP_Y + CARD_HEIGHT; // 200
      return `M ${endX} ${endY} C ${(endX + startX) / 2} ${endY}, ${startX} ${(endY + startY) / 2}, ${startX} ${startY}`;
    }
    case 3: { // Bottom Right (Card sits between X: 340-560, Y: 300-460)
      // Card top-left corner is at (340, 300)
      // Path starts at southeast edge of center node
      const startX = CENTER_X + NODE_RADIUS * Math.SQRT1_2;
      const startY = CENTER_Y + NODE_RADIUS * Math.SQRT1_2;
      const endX = RIGHT_X; // 340
      const endY = BOTTOM_Y; // 300
      return `M ${endX} ${endY} C ${(endX + startX) / 2} ${endY}, ${startX} ${(endY + startY) / 2}, ${startX} ${startY}`;
    }
    default:
      return "";
  }
};

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

export default function LearningJourney() {
  const [activeStage, setActiveStage] = useState<number | null>(null);

  return (
    <section className="w-full bg-slate-50/50 py-24 px-6 md:px-12 border-t border-gray-100 relative z-10 font-heading overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[700px] h-[300px] bg-red-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* ================= LEFT SIDE: HEADLINE & CTA ================= */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 tracking-tight leading-tight">
              Your Journey Into AI Starts Here
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
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* ================= RIGHT SIDE: INTERACTIVE PATHWAY ================= */}
          <div className="lg:col-span-7 relative min-h-[520px] flex items-center justify-center">
            {/* Desktop Visualization (Hidden on Mobile/Tablet) */}
            <div 
              className="hidden lg:block relative select-none"
              style={{ width: CONTAINER_WIDTH, height: CONTAINER_HEIGHT }}
            >
              {/* SVG pathways from center to stage cards */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
                viewBox={`0 0 ${CONTAINER_WIDTH} ${CONTAINER_HEIGHT}`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {stages.map((_, idx) => (
                  <path
                    key={idx}
                    d={getPathData(idx)}
                    stroke={activeStage === idx ? "#EE1C25" : "#E5E7EB"}
                    strokeWidth={activeStage === idx ? "3" : "1.5"}
                    className="transition-all duration-300"
                  />
                ))}
              </svg>

              {/* CENTER HUB (Exactly centered mathematically) */}
              <div
                className="absolute bg-white border border-neutral-200 rounded-full flex items-center justify-center shadow-md z-20 select-none"
                style={{
                  left: CENTER_X,
                  top: CENTER_Y,
                  transform: "translate(-50%, -50%)",
                  width: NODE_SIZE,
                  height: NODE_SIZE,
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

              {/* STAGE 1 CARD (Top Left) */}
              <div
                onMouseEnter={() => setActiveStage(0)}
                onMouseLeave={() => setActiveStage(null)}
                className="absolute group bg-white border border-neutral-200/80 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#EE1C25] transition-all duration-300 cursor-pointer select-none z-30"
                style={{
                  left: LEFT_X,
                  top: TOP_Y,
                  width: CARD_WIDTH,
                  height: CARD_HEIGHT,
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

              {/* STAGE 2 CARD (Bottom Left) */}
              <div
                onMouseEnter={() => setActiveStage(1)}
                onMouseLeave={() => setActiveStage(null)}
                className="absolute group bg-white border border-neutral-200/80 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#EE1C25] transition-all duration-300 cursor-pointer select-none z-30"
                style={{
                  left: LEFT_X,
                  top: BOTTOM_Y,
                  width: CARD_WIDTH,
                  height: CARD_HEIGHT,
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

              {/* STAGE 3 CARD (Top Right) */}
              <div
                onMouseEnter={() => setActiveStage(2)}
                onMouseLeave={() => setActiveStage(null)}
                className="absolute group bg-white border border-neutral-200/80 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#EE1C25] transition-all duration-300 cursor-pointer select-none z-30"
                style={{
                  left: RIGHT_X,
                  top: TOP_Y,
                  width: CARD_WIDTH,
                  height: CARD_HEIGHT,
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

              {/* STAGE 4 CARD (Bottom Right) */}
              <div
                onMouseEnter={() => setActiveStage(3)}
                onMouseLeave={() => setActiveStage(null)}
                className="absolute group bg-white border border-neutral-200/80 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#EE1C25] transition-all duration-300 cursor-pointer select-none z-30"
                style={{
                  left: RIGHT_X,
                  top: BOTTOM_Y,
                  width: CARD_WIDTH,
                  height: CARD_HEIGHT,
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

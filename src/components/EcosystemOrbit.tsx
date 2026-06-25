"use client";

import React, { useState } from "react";
import { 
  Terminal, 
  Database, 
  BarChart3, 
  FileSpreadsheet, 
  Sparkles, 
  Bot, 
  MessageSquareText, 
  Eye,
  LineChart,
  Layers,
  Zap,
  Cpu,
  ArrowRight,
  Check,
  BookOpen,
  Globe,
  Award,
  TrendingUp
} from "lucide-react";

// Reusable configuration matching mockup category detail and colors
const innerRingCourses = [
  {
    title: "Machine Learning",
    icon: LineChart,
    color: "#EA580C", // Orange
    glowColor: "rgba(234, 88, 12, 0.25)",
    desc: "Build predictive models and algorithms using real-world industrial datasets.",
  },
  {
    title: "Deep Learning",
    icon: Layers,
    color: "#6366F1", // Purple
    glowColor: "rgba(99, 102, 241, 0.25)",
    desc: "Train complex multi-layered neural networks for cognitive computing tasks.",
  },
  {
    title: "Computer Vision",
    icon: Eye,
    color: "#06B6D4", // Cyan
    glowColor: "rgba(6, 182, 212, 0.25)",
    desc: "Analyze visual data, build object detection, and run spatial recognition.",
  },
  {
    title: "Agentic AI",
    icon: Bot,
    color: "#16A34A", // Green
    glowColor: "rgba(22, 163, 74, 0.25)",
    desc: "Deploy autonomous systems, self-improving agents, and reasoning networks.",
  },
];

const outerRingCourses = [
  {
    title: "Python Programming",
    icon: Terminal,
    color: "#2563EB", // Blue
    glowColor: "rgba(37, 99, 235, 0.25)",
    desc: "Learn core software development foundations optimized for machine learning.",
  },
  {
    title: "SQL & Databases",
    icon: Database,
    color: "#1D4ED8", // Royal Blue
    glowColor: "rgba(29, 78, 216, 0.25)",
    desc: "Write query optimizations, execute database migrations, and handle structured data.",
  },
  {
    title: "Data Analytics",
    icon: BarChart3,
    color: "#F59E0B", // Amber
    glowColor: "rgba(245, 158, 11, 0.25)",
    desc: "Synthesize large records into meaningful executive reports and visualizations.",
  },
  {
    title: "Data Science with Excel",
    icon: FileSpreadsheet,
    color: "#10B981", // Green
    glowColor: "rgba(16, 185, 129, 0.25)",
    desc: "Master corporate spreadsheets, data cleanups, and foundational statistical equations.",
  },
  {
    title: "Prompt Engineering",
    icon: Zap,
    color: "#EA580C", // Orange/Red
    glowColor: "rgba(234, 88, 12, 0.25)",
    desc: "Optimize LLM outputs, structure reasoning guidelines, and build prompt chains.",
  },
  {
    title: "Generative AI (Gen AI)",
    icon: Sparkles,
    color: "#D946EF", // Magenta
    glowColor: "rgba(217, 70, 239, 0.25)",
    desc: "Master generative neural models, LLM tuning, and synthetic content systems.",
  },
  {
    title: "NLP (Natural Language Processing)",
    icon: MessageSquareText,
    color: "#EC4899", // Pink
    glowColor: "rgba(236, 72, 153, 0.25)",
    desc: "Process natural language, train transformers, and construct chatbots.",
  },
];

const checklistItems = [
  "Industry-aligned curriculum",
  "Hands-on learning",
  "Real-world projects",
  "Career-focused tracks",
];



export default function EcosystemOrbit() {
  const [hoveredCourse, setHoveredCourse] = useState<{
    title: string;
    desc: string;
    color: string;
  } | null>(null);

  // Helper to compute node positions on a circle
  const getPositions = (count: number, radiusPercent: number) => {
    return Array.from({ length: count }).map((_, idx) => {
      const angle = (idx * 360) / count;
      const rad = (angle * Math.PI) / 180;
      // Center is at 50% 50%
      const x = 50 + radiusPercent * Math.cos(rad);
      const y = 50 + radiusPercent * Math.sin(rad);
      return { x: `${x}%`, y: `${y}%` };
    });
  };

  const innerPos = getPositions(innerRingCourses.length, 25);
  const outerPos = getPositions(outerRingCourses.length, 41);

  return (
    <section className="w-full bg-white py-24 px-6 md:px-12 border-t border-gray-100 relative z-10 font-heading overflow-hidden">
      
      {/* Soft central red radial glow */}
      <div className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-red-500/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        
        {/* ================= PRIMARY GRID MATRIX ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT COLUMN: Headings, description, checklist & CTA */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            <div className="space-y-1">
              <span className="text-[10px] font-black tracking-widest text-[#EE1C25] uppercase bg-red-50 border border-red-100 px-3 py-1 rounded-full w-fit mx-auto lg:mx-0">
                COURSE ECOSYSTEM
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 tracking-tight leading-tight mt-3">
                Explore. <span className="text-[#EE1C25]">Learn.</span> Transform.
              </h2>
            </div>
            
            <p className="text-neutral-500 text-sm font-semibold leading-relaxed max-w-lg mx-auto lg:mx-0">
              From foundational skills to advanced specializations, explore our industry-aligned AI programs designed to shape your future.
            </p>

            {/* Checklist items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto lg:mx-0 pt-2">
              {checklistItems.map((item) => (
                <div key={item} className="flex items-center space-x-2 justify-center lg:justify-start">
                  <div className="p-0.5 bg-red-50 border border-red-100 rounded-full text-[#EE1C25]">
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  </div>
                  <span className="text-xs font-bold text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-center lg:justify-start">
              <a 
                href="/learn" 
                className="group inline-flex items-center gap-2.5 bg-[#EE1C25] hover:bg-[#d61920] text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Explore All Courses
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: Desktop Orbit Visualization */}
          <div className="lg:col-span-7 relative min-h-[580px] flex items-center justify-center">
            
            {/* Desktop Orbit Node system */}
            <div className="hidden lg:block w-full h-[580px] relative">
              
              {/* Concentric Orbit SVG Lines & Decorative Node Dots */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Rings */}
                <circle cx="50" cy="50" r="25" stroke="#E5E7EB" strokeWidth="0.15" fill="none" opacity="0.6" strokeDasharray="1 1.5" />
                <circle cx="50" cy="50" r="41" stroke="#E5E7EB" strokeWidth="0.15" fill="none" opacity="0.6" strokeDasharray="1 1.5" />
                
                {/* Decorative colored dots on orbit lines */}
                <circle cx="50" cy="25" r="0.4" fill="#3B82F6" />
                <circle cx="75" cy="50" r="0.4" fill="#EC4899" />
                <circle cx="50" cy="75" r="0.4" fill="#EA580C" />
                <circle cx="25" cy="50" r="0.4" fill="#10B981" />
                
                <circle cx="50" cy="9" r="0.4" fill="#EA580C" />
                <circle cx="91" cy="50" r="0.4" fill="#3B82F6" />
                <circle cx="50" cy="91" r="0.4" fill="#D946EF" />
                <circle cx="9" cy="50" r="0.4" fill="#10B981" />
              </svg>

              {/* Tooltip Overlay inside orbit box */}
              {hoveredCourse && (
                <div className="absolute top-2 left-2 z-30 w-64 bg-gray-950 text-white rounded-2xl p-4 shadow-xl border border-white/10 animate-fade-in">
                  <span className="text-[9px] font-black tracking-widest uppercase" style={{ color: hoveredCourse.color }}>
                    Course Track
                  </span>
                  <h4 className="text-sm font-bold mt-1">{hoveredCourse.title}</h4>
                  <p className="text-[11px] text-neutral-400 font-semibold leading-relaxed mt-2">
                    {hoveredCourse.desc}
                  </p>
                </div>
              )}

              {/* STATIONARY CENTER BRAND NODE */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white border border-red-100 shadow-2xl rounded-full flex flex-col items-center justify-center text-center p-4 select-none z-20 animate-pulse-slow">
                {/* Soft center red radial glow inside node */}
                <div className="absolute inset-2 bg-gradient-to-br from-[#EE1C25]/5 to-transparent rounded-full opacity-40 blur-md pointer-events-none" />
                <span className="text-[8px] font-bold tracking-widest text-[#EE1C25] uppercase">THE</span>
                <span className="text-sm font-black text-gray-900 tracking-tight uppercase font-sans mt-0.5">AI SCHOOL</span>
                <span className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest mt-0.5">YOUR AI JOURNEY</span>
                
                {/* Red infinity brand logo */}
                <div className="mt-2 flex items-center justify-center">
                  <svg className="w-5 h-3 text-[#EE1C25]" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round">
                    <path d="M25 15 C10 15, 10 35, 25 35 C40 35, 60 15, 75 15 C90 15, 90 35, 75 35 C60 35, 40 15, 25 15 Z" />
                  </svg>
                </div>
              </div>

              {/* INNER RING: Clockwise rotation (80s) */}
              <div 
                className="absolute inset-0 animate-orbit-cw hover:[animation-play-state:paused]"
                style={{ animationDuration: "80s" }}
              >
                {innerRingCourses.map((course, idx) => {
                  const pos = innerPos[idx];
                  const Icon = course.icon;
                  const isHovered = hoveredCourse?.title === course.title;

                  return (
                    <div
                      key={course.title}
                      className="absolute -ml-14 -mt-20 flex flex-col items-center justify-center"
                      style={{ 
                        left: pos.x, 
                        top: pos.y,
                        width: "112px",
                      }}
                      onMouseEnter={() => setHoveredCourse(course)}
                      onMouseLeave={() => setHoveredCourse(null)}
                    >
                      {/* Counter-rotating container to keep node upright */}
                      <div 
                        className="animate-orbit-ccw flex flex-col items-center cursor-pointer transition-all duration-300"
                        style={{ 
                          animationDuration: "80s",
                          transform: isHovered ? "scale(1.08)" : ""
                        }}
                      >
                        {/* Circular node with icon */}
                        <div 
                          className="w-14 h-14 rounded-full bg-white border border-neutral-200/80 shadow-xs flex items-center justify-center transition-all duration-300"
                          style={{
                            borderColor: isHovered ? course.color : "",
                            boxShadow: isHovered ? `0 8px 20px -4px ${course.glowColor}` : "",
                          }}
                        >
                          <Icon className="w-5 h-5" style={{ color: course.color }} />
                        </div>
                        
                        {/* Node Label underneath */}
                        <span 
                          className="text-[9px] font-bold uppercase mt-2 tracking-wide text-center transition-colors leading-tight whitespace-normal max-w-[110px]"
                          style={{ color: course.color }}
                        >
                          {course.title}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* OUTER RING: Counter-Clockwise rotation (120s) */}
              <div 
                className="absolute inset-0 animate-orbit-ccw hover:[animation-play-state:paused]"
                style={{ animationDuration: "120s" }}
              >
                {outerRingCourses.map((course, idx) => {
                  const pos = outerPos[idx];
                  const Icon = course.icon;
                  const isHovered = hoveredCourse?.title === course.title;

                  return (
                    <div
                      key={course.title}
                      className="absolute -ml-14 -mt-20 flex flex-col items-center justify-center"
                      style={{ 
                        left: pos.x, 
                        top: pos.y,
                        width: "112px",
                      }}
                      onMouseEnter={() => setHoveredCourse(course)}
                      onMouseLeave={() => setHoveredCourse(null)}
                    >
                      {/* Counter-rotating container to keep node upright */}
                      <div 
                        className="animate-orbit-cw flex flex-col items-center cursor-pointer transition-all duration-300"
                        style={{ 
                          animationDuration: "120s",
                          transform: isHovered ? "scale(1.08)" : ""
                        }}
                      >
                        {/* Circular node with icon */}
                        <div 
                          className="w-14 h-14 rounded-full bg-white border border-neutral-200/80 shadow-xs flex items-center justify-center transition-all duration-300"
                          style={{
                            borderColor: isHovered ? course.color : "",
                            boxShadow: isHovered ? `0 8px 20px -4px ${course.glowColor}` : "",
                          }}
                        >
                          <Icon className="w-5 h-5" style={{ color: course.color }} />
                        </div>
                        
                        {/* Node Label underneath */}
                        <span 
                          className="text-[9px] font-bold uppercase mt-2 tracking-wide text-center transition-colors leading-tight whitespace-normal max-w-[110px]"
                          style={{ color: course.color }}
                        >
                          {course.title}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Mobile / Tablet Horizontal Swipe Carousel (Hidden on Desktop) */}
            <div className="lg:hidden w-full overflow-x-auto pb-4 flex gap-6 scrollbar-hide snap-x snap-mandatory">
              {[...innerRingCourses, ...outerRingCourses].map((course) => {
                const Icon = course.icon;
                return (
                  <div 
                    key={course.title}
                    className="snap-start shrink-0 w-64 bg-white border border-neutral-200/80 rounded-2xl p-6 shadow-xs flex flex-col justify-between min-h-[160px]"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 rounded-xl bg-neutral-50">
                        <Icon className="w-5 h-5" style={{ color: course.color }} />
                      </div>
                      <span className="text-[9px] font-black text-neutral-300 uppercase tracking-widest">
                        Course Track
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-950 font-heading leading-tight">{course.title}</h4>
                      <p className="text-xs text-neutral-500 font-semibold leading-relaxed mt-2">{course.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>



      </div>

      {/* Global CSS rules for rotations */}
      <style jsx global>{`
        @keyframes orbitCw {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes orbitCcw {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        @keyframes pulseSlow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        .animate-orbit-cw {
          animation-name: orbitCw;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }
        .animate-orbit-ccw {
          animation-name: orbitCcw;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }
        .animate-pulse-slow {
          animation: pulseSlow 5s ease-in-out infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-orbit-cw,
          .animate-orbit-ccw,
          .animate-pulse-slow {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}

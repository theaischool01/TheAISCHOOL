"use client";

import React from "react";
import Image from "next/image";
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
  ArrowRight,
  Check
} from "lucide-react";

// Reusable configuration matching category details
const innerRingCourses = [
  {
    title: "Python Programming",
    icon: Terminal,
    color: "#2563EB", 
    desc: "Learn core software development foundations optimized for machine learning.",
  },
  {
    title: "SQL & Databases",
    icon: Database,
    color: "#1D4ED8", 
    desc: "Write query optimizations, execute database migrations, and handle structured data.",
  },
  {
    title: "Data Analytics",
    icon: BarChart3,
    color: "#F59E0B", 
    desc: "Synthesize large records into meaningful executive reports and visualizations.",
  },
  {
    title: "Data Science with Excel",
    icon: FileSpreadsheet,
    color: "#10B981", 
    desc: "Master corporate spreadsheets, data cleanups, and foundational statistical equations.",
  },
  {
    title: "Prompt Engineering",
    icon: Zap,
    color: "#EA580C", 
    desc: "Optimize LLM outputs, structure reasoning guidelines, and build prompt chains.",
  },
];

const outerRingCourses = [
  {
    title: "Machine Learning",
    icon: LineChart,
    color: "#EA580C", 
    desc: "Build predictive models and algorithms using real-world industrial datasets.",
  },
  {
    title: "Deep Learning",
    icon: Layers,
    color: "#6366F1", 
    desc: "Train complex multi-layered neural networks for cognitive computing tasks.",
  },
  {
    title: "Computer Vision",
    icon: Eye,
    color: "#06B6D4", 
    desc: "Analyze visual data, build object detection, and run spatial recognition.",
  },
  {
    title: "NLP (Natural Language Processing)",
    icon: MessageSquareText,
    color: "#EC4899", 
    desc: "Process natural language, train transformers, and construct chatbots.",
  },
  {
    title: "Agentic AI",
    icon: Bot,
    color: "#16A34A", 
    desc: "Deploy autonomous systems, self-improving agents, and reasoning networks.",
  },
  {
    title: "Generative AI (Gen AI)",
    icon: Sparkles,
    color: "#D946EF", 
    desc: "Master generative neural models, LLM tuning, and synthetic content systems.",
  },
];

const checklistItems = [
  "Industry-aligned curriculum",
  "Hands-on learning",
  "Real-world projects",
  "Career-focused tracks",
];

export default function EcosystemOrbit() {
  const getPositions = (count: number, radiusPercent: number) => {
    return Array.from({ length: count }).map((_, idx) => {
      const angle = (idx * 360) / count;
      const rad = (angle * Math.PI) / 180;
      const x = 50 + radiusPercent * Math.cos(rad);
      const y = 50 + radiusPercent * Math.sin(rad);
      return { x: `${x.toFixed(4)}%`, y: `${y.toFixed(4)}%` };
    });
  };

  const innerPos = getPositions(innerRingCourses.length, 25);
  const outerPos = getPositions(outerRingCourses.length, 41);

  return (
    <section className="w-full bg-transparent py-14 lg:py-16 px-6 md:px-12 relative z-10 font-heading overflow-hidden">
      
      <div className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-red-500/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            <div className="space-y-1">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 tracking-tight leading-tight mt-3">
                Explore. <span className="text-[#EE1C25]">Learn.</span> Transform.
              </h2>
            </div>
            
            <p className="text-neutral-500 text-sm font-semibold leading-relaxed max-w-lg mx-auto lg:mx-0">
              From foundational skills to advanced specializations, explore our industry-aligned AI programs designed to shape your future.
            </p>

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

          <div className="lg:col-span-7 relative min-h-[580px] flex items-center justify-center">
            
            <div className="hidden lg:block w-full h-[580px] relative">
              
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                <circle cx="50" cy="50" r="25" stroke="#D1D5DB" strokeWidth="0.08" fill="none" opacity="0.8" strokeDasharray="1 1.5" />
                <circle cx="50" cy="50" r="41" stroke="#D1D5DB" strokeWidth="0.08" fill="none" opacity="0.8" strokeDasharray="1 1.5" />
                
                <circle cx="50" cy="25" r="0.4" fill="#3B82F6" />
                <circle cx="75" cy="50" r="0.4" fill="#EC4899" />
                <circle cx="50" cy="75" r="0.4" fill="#EA580C" />
                <circle cx="25" cy="50" r="0.4" fill="#10B981" />
                
                <circle cx="50" cy="9" r="0.4" fill="#EA580C" />
                <circle cx="91" cy="50" r="0.4" fill="#3B82F6" />
                <circle cx="50" cy="91" r="0.4" fill="#D946EF" />
                <circle cx="9" cy="50" r="0.4" fill="#10B981" />
              </svg>

              {/* STATIONARY CENTER BRAND NODE (glow, shadow, rotation preserved, next/image logo) */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none z-20 flex items-center justify-center w-28 h-28 opacity-96">
                <div className="relative w-full h-full">
                  <Image 
                    src="/images/copy.png" 
                    alt="The AI School Logo" 
                    fill
                    sizes="112px"
                    className="object-contain relative z-10" 
                    priority
                  />
                </div>
              </div>

              <div 
                className="absolute inset-0 animate-orbit-cw"
                style={{ animationDuration: "80s" }}
              >
                {innerRingCourses.map((course, idx) => {
                  const pos = innerPos[idx];
                  const Icon = course.icon;

                  return (
                    <div
                      key={course.title}
                      className="absolute -ml-14 -mt-7 flex flex-col items-center justify-center"
                      style={{ 
                        left: pos.x, 
                        top: pos.y,
                        width: "112px",
                      }}
                    >
                      <div 
                        className="animate-orbit-ccw flex flex-col items-center"
                        style={{ 
                          animationDuration: "80s"
                        }}
                      >
                        <div 
                          className="w-14 h-14 rounded-full bg-white border border-neutral-200/80 shadow-xs flex items-center justify-center"
                        >
                          <Icon className="w-5 h-5" style={{ color: course.color }} />
                        </div>
                        
                        <span 
                          className="text-[9px] font-bold uppercase mt-2 tracking-wide text-center leading-tight whitespace-normal max-w-[110px]"
                          style={{ color: course.color }}
                        >
                          {course.title}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div 
                className="absolute inset-0 animate-orbit-ccw"
                style={{ animationDuration: "120s" }}
              >
                {outerRingCourses.map((course, idx) => {
                  const pos = outerPos[idx];
                  const Icon = course.icon;

                  return (
                    <div
                      key={course.title}
                      className="absolute -ml-14 -mt-7 flex flex-col items-center justify-center"
                      style={{ 
                        left: pos.x, 
                        top: pos.y,
                        width: "112px",
                      }}
                    >
                      <div 
                        className="animate-orbit-cw flex flex-col items-center"
                        style={{ 
                          animationDuration: "120s"
                        }}
                      >
                        <div 
                          className="w-14 h-14 rounded-full bg-white border border-neutral-200/80 shadow-xs flex items-center justify-center"
                        >
                          <Icon className="w-5 h-5" style={{ color: course.color }} />
                        </div>
                        
                        <span 
                          className="text-[9px] font-bold uppercase mt-2 tracking-wide text-center leading-tight whitespace-normal max-w-[110px]"
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

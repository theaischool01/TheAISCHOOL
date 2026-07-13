"use client";

import React from "react";
import {
  BookOpen,
  Terminal,
  LineChart,
  Layers,
  Sparkles,
  Bot,
  Code,
  Award,
  TrendingUp,
} from "lucide-react";

interface Stage {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  desc: string;
  technologies: string[];
  gradient: string;
}

const stages: Stage[] = [
  {
    title: "AI Fundamentals",
    icon: BookOpen,
    desc: "Aptitude screening, logic building, and foundational systems thinking.",
    technologies: ["Linear Algebra", "Probability", "Algorithms"],
    gradient: "from-blue-500/10 to-transparent",
  },
  {
    title: "Python",
    icon: Terminal,
    desc: "Master syntax, data structures, and standard libraries for AI workflows.",
    technologies: ["OOP", "NumPy", "Pandas"],
    gradient: "from-green-500/10 to-transparent",
  },
  {
    title: "Machine Learning",
    icon: LineChart,
    desc: "Train classical regression, classification, and validation pipelines.",
    technologies: ["Scikit-Learn", "Matplotlib", "Seaborn"],
    gradient: "from-amber-500/10 to-transparent",
  },
  {
    title: "Deep Learning",
    icon: Layers,
    desc: "Architect and train multi-layer artificial neural networks.",
    technologies: ["PyTorch", "TensorFlow", "Keras"],
    gradient: "from-purple-500/10 to-transparent",
  },
  {
    title: "Generative AI",
    icon: Sparkles,
    desc: "Harness large language models, prompt chains, and vector indexes.",
    technologies: ["OpenAI", "LangChain", "Pinecone"],
    gradient: "from-pink-500/10 to-transparent",
  },
  {
    title: "AI Agents",
    icon: Bot,
    desc: "Deploy autonomous software agents with custom tools and memory.",
    technologies: ["CrewAI", "LangGraph", "AutoGen"],
    gradient: "from-cyan-500/10 to-transparent",
  },
  {
    title: "Projects",
    icon: Code,
    desc: "Build and deploy production-grade scalable end-to-end AI applications.",
    technologies: ["FastAPI", "Docker", "AWS / GCP"],
    gradient: "from-red-500/10 to-transparent",
  },
  {
    title: "Internship",
    icon: Award,
    desc: "Gain industry experience inside fast-growing startup teams.",
    technologies: ["Git", "Agile Sprints", "Code Reviews"],
    gradient: "from-indigo-500/10 to-transparent",
  },
  {
    title: "Placement",
    icon: TrendingUp,
    desc: "Launch your career with mock interviews and direct partner referrals.",
    technologies: ["Resume Audit", "Mock Trials", "Placement Pipeline"],
    gradient: "from-emerald-500/10 to-transparent",
  },
];

export default function CareerJourneyCarousel() {
  // Duplicate stages for seamless loop
  const duplicatedStages = stages.concat(stages).concat(stages);

  return (
    <section className="w-full bg-white py-24 border-t border-gray-100 overflow-hidden font-heading relative z-10">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center lg:text-left">
        <span className="text-xs font-bold uppercase tracking-widest text-[#EE1C25]">
          STUDENT ROADMAP
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-gray-950 tracking-tight leading-tight mt-3">
          Your Career Journey
        </h2>
        <p className="text-sm font-semibold text-neutral-500 mt-2">
          Discover the stages of transformation and growth a student completes at The AI School.
        </p>
      </div>

      {/* Desktop Slider Container */}
      <div className="hidden md:block relative w-full overflow-hidden select-none py-6">
        {/* Left and Right Fades for smooth blend */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

        <div className="flex gap-6 animate-carousel-left hover:pause-animation w-max">
          {duplicatedStages.map((stage, idx) => {
            const Icon = stage.icon;
            const stageNum = (idx % stages.length) + 1;
            return (
              <div
                key={`${stage.title}-${idx}`}
                className="w-80 shrink-0 bg-white border border-neutral-200/80 hover:border-[#EE1C25]/40 rounded-2xl p-6 shadow-xs hover:shadow-lg hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group"
              >
                {/* Subtle gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-b ${stage.gradient} opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none`} />

                <div className="relative z-10 flex items-center justify-between mb-4">
                  <div className="p-3 bg-white border border-neutral-200/80 rounded-xl text-gray-800 shadow-xs group-hover:border-[#EE1C25] transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black text-neutral-300 group-hover:text-[#EE1C25] tracking-widest uppercase transition-colors">
                    Stage {String(stageNum).padStart(2, "0")}
                  </span>
                </div>

                <div className="relative z-10 space-y-3">
                  <h4 className="text-sm font-black text-gray-950 font-heading leading-tight group-hover:text-[#EE1C25] transition-colors">
                    {stage.title}
                  </h4>
                  <p className="text-xs text-neutral-500 font-semibold leading-relaxed">
                    {stage.desc}
                  </p>
                  
                  {/* Completion indicator badge showing on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1.5 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EE1C25] animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-wider text-[#EE1C25]">
                      Currently Building...
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {stage.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[9px] font-bold bg-white/70 border border-neutral-200/50 text-neutral-600 px-2 py-0.5 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Swipe Container */}
      <div className="md:hidden w-full overflow-x-auto pb-6 px-6 flex gap-4 scrollbar-hide snap-x snap-mandatory">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          return (
            <div
              key={stage.title}
              className="snap-start shrink-0 w-64 bg-white border border-neutral-200/80 rounded-2xl p-6 shadow-xs relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${stage.gradient} opacity-50 pointer-events-none`} />
              <div className="relative z-10 flex items-center justify-between mb-4">
                <div className="p-3 bg-white border border-neutral-200/80 rounded-xl text-gray-800 shadow-xs">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black text-neutral-300 tracking-widest uppercase">
                  Stage {String(idx + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="relative z-10 space-y-2">
                <h4 className="text-sm font-black text-gray-950 font-heading leading-tight">
                  {stage.title}
                </h4>
                <p className="text-xs text-neutral-500 font-semibold leading-relaxed">
                  {stage.desc}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {stage.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[9px] font-bold bg-white/70 border border-neutral-200/50 text-neutral-600 px-2 py-0.5 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CSS Animation styles */}
      <style jsx global>{`
        @keyframes carouselLeft {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-33.333%, 0, 0);
          }
        }
        .animate-carousel-left {
          animation: carouselLeft 35s linear infinite;
        }
        .hover\\:pause-animation:hover {
          animation-play-state: paused;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

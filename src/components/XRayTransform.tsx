"use client";

import React from "react";
import {
  Link2Off,
  BookOpen,
  Terminal,
  GitBranch,
  Users,
  Code,
  Award,
  Sparkles,
  ArrowRight,
  MessageSquareCode,
  Laptop,
  CheckCircle2
} from "lucide-react";

const challenges = [
  {
    title: "Isolation",
    desc: "Learning in completely isolated, non-competitive academic structures without team validation.",
    icon: Link2Off,
  },
  {
    title: "Outdated Curriculum",
    desc: "Outdated legacy curriculums completely missing generative AI and agentic engineering layers.",
    icon: BookOpen,
  },
  {
    title: "No Production Projects",
    desc: "Zero professional exposure to building, testing, and deploying enterprise-grade production codebases.",
    icon: Terminal,
  },
  {
    title: "No Placement Direction",
    desc: "No structural connection or direct routing pipelines to active technology startup ecosystems.",
    icon: GitBranch,
  },
];

const steps = [
  {
    number: "01",
    title: "Founder Mentorship",
    desc: "Direct access to active startup founders and industry engineering experts. Receive live codebase reviews, strategy sessions, and architecture design feedback.",
    icon: Users,
    detailTitle: "Active Mentoring Panel",
    bullets: ["Live code reviews", "1-on-1 architecture syncs", "Startup strategy frameworks"],
    bgClass: "bg-white",
    zIndexClass: "z-10",
  },
  {
    number: "02",
    title: "Industry Curriculum",
    desc: "A constantly updated, production-first AI curriculum. Learn real-world tools, LLM deployment architectures, vector databases, and prompt engineering protocols.",
    icon: Sparkles,
    detailTitle: "Production AI Stack",
    bullets: ["Large Language Models (LLMs)", "Vector Databases (Pinecone, PGVector)", "Agentic Reasoning Loops"],
    bgClass: "bg-slate-50",
    zIndexClass: "z-20",
  },
  {
    number: "03",
    title: "Production Projects",
    desc: "Build and deploy scalable AI microservices. Gain experience working with continuous integration pipelines, database optimization, and high-concurrency hosting.",
    icon: Code,
    detailTitle: "Microservice Blueprint",
    bullets: ["Deploying APIs via FastAPI/Next.js", "CI/CD automated testing", "Scale optimization metrics"],
    bgClass: "bg-white",
    zIndexClass: "z-30",
  },
  {
    number: "04",
    title: "Internships",
    desc: "Gain practical engineering experience through direct startup ecosystem partnerships. Work on real features, solve live bugs, and participate in sprint cycles.",
    icon: Laptop,
    detailTitle: "Startup Ecosystem Sprint",
    bullets: ["Agile/Scrum participation", "Git workflow collaboration", "Live user feature contribution"],
    bgClass: "bg-slate-50",
    zIndexClass: "z-40",
  },
  {
    number: "05",
    title: "Placements",
    desc: "Unblock your career with direct routing pipelines into premium incubation tracks and active startup talent pools. Get aligned with high-growth technology roles.",
    icon: Award,
    detailTitle: "Placement Outcomes",
    bullets: ["Direct talent pool access", "Incubation track routing", "Fast-track interview matching"],
    bgClass: "bg-white",
    zIndexClass: "z-50",
  },
];

export default function XRayTransform() {
  return (
    <section className="w-full bg-white py-24 px-6 md:px-12 border-t border-gray-100 relative z-10 font-heading">
      <div className="max-w-6xl mx-auto space-y-28">

        {/* ================= SECTION TITLE ================= */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#EE1C25]">
            THE PROBLEM
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-950 tracking-tight leading-tight">
            Challenges Every AI Learner Faces
          </h2>
          <p className="text-sm font-semibold text-neutral-500">
            Most learners struggle with outdated content, lack of mentorship, and unclear career pathways.
          </p>
        </div>

        {/* ================= BENTO GRID CHALLENGE LAYOUT ================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">

          {/* Card 1: Isolation (col-span-12 lg:col-span-7) */}
          <div className="group relative bg-white border border-neutral-200/80 rounded-[2rem] p-8 min-h-[300px] lg:min-h-[320px] col-span-12 lg:col-span-7 flex flex-col justify-between overflow-hidden transition-all duration-350 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:border-[#EE1C25]/40 hover:shadow-[0_20px_50px_-20px_rgba(238,28,37,0.12)] cursor-pointer">
            {/* Background 01 */}
            <span className="absolute -right-4 -bottom-6 text-[110px] font-black text-[#EE1C25] opacity-[0.03] select-none pointer-events-none font-sans">
              01
            </span>
            <div className="flex justify-between items-start">
              <div className="p-4 bg-red-50 text-[#EE1C25] rounded-2xl border border-red-100/50 group-hover:scale-105 transition-transform duration-300">
                <Link2Off className="w-8 h-8" />
              </div>

              {/* Disconnected Node Metaphor */}
              <svg className="w-24 h-16 opacity-30 group-hover:opacity-60 transition-opacity" viewBox="0 0 100 60" fill="none">
                <circle cx="20" cy="30" r="4" fill="#EE1C25" />
                <circle cx="80" cy="15" r="4" fill="#6B7280" />
                <circle cx="80" cy="45" r="4" fill="#6B7280" />
                <path d="M 24 30 L 76 15" stroke="#E5E7EB" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M 24 30 L 76 45" stroke="#E5E7EB" strokeWidth="1.5" strokeDasharray="3 3" />
              </svg>
            </div>
            <div className="space-y-2 z-10">
              <h4 className="text-xl font-bold text-gray-950 font-heading">Isolation</h4>
              <p className="text-xs text-neutral-500 font-semibold leading-relaxed max-w-md">
                Learning in completely isolated, non-competitive academic structures without validation or collaborative ecosystem support.
              </p>
            </div>
          </div>

          {/* Card 2: Outdated Curriculum (col-span-12 lg:col-span-5) */}
          <div className="group relative bg-white border border-neutral-200/80 rounded-[2rem] p-8 min-h-[300px] lg:min-h-[320px] col-span-12 lg:col-span-5 flex flex-col justify-between overflow-hidden transition-all duration-350 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:border-orange-500/40 hover:shadow-[0_20px_50px_-20px_rgba(249,115,22,0.12)] cursor-pointer">
            {/* Background 02 */}
            <span className="absolute -right-4 -bottom-6 text-[110px] font-black text-orange-500 opacity-[0.03] select-none pointer-events-none font-sans">
              02
            </span>
            <div className="flex justify-between items-start">
              <div className="p-4 bg-orange-50 text-orange-500 rounded-2xl border border-orange-100/50 group-hover:scale-105 transition-transform duration-300">
                <BookOpen className="w-8 h-8" />
              </div>

              {/* Old/Deprecated Stack Metaphor */}
              <svg className="w-20 h-16 opacity-30 group-hover:opacity-60 transition-opacity" viewBox="0 0 80 60" fill="none">
                <path d="M 10 15 L 70 15 L 60 25 L 20 25 Z" fill="#E5E7EB" stroke="#D1D5DB" />
                <path d="M 10 30 L 70 30 L 60 40 L 20 40 Z" fill="#F3F4F6" stroke="#D1D5DB" />
                <line x1="20" y1="15" x2="20" y2="40" stroke="#EF4444" strokeWidth="2" />
              </svg>
            </div>
            <div className="space-y-2 z-10">
              <h4 className="text-xl font-bold text-gray-950 font-heading">Outdated Curriculum</h4>
              <p className="text-xs text-neutral-500 font-semibold leading-relaxed">
                Outdated legacy courses completely missing generative AI APIs, vector DB pipelines, and agentic engineering layers.
              </p>
            </div>
          </div>

          {/* Card 3: No Production Projects (col-span-12 lg:col-span-8) */}
          <div className="group relative bg-white border border-neutral-200/80 rounded-[2rem] p-8 min-h-[300px] lg:min-h-[320px] col-span-12 lg:col-span-8 flex flex-col justify-between overflow-hidden transition-all duration-350 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:border-purple-500/40 hover:shadow-[0_20px_50px_-20px_rgba(139,92,246,0.12)] cursor-pointer">
            {/* Background 03 */}
            <span className="absolute -right-4 -bottom-6 text-[110px] font-black text-purple-500 opacity-[0.03] select-none pointer-events-none font-sans">
              03
            </span>
            <div className="flex justify-between items-start">
              <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl border border-purple-100/50 group-hover:scale-105 transition-transform duration-300">
                <Terminal className="w-8 h-8" />
              </div>

              {/* Empty Deployment Pipeline Metaphor */}
              <svg className="w-32 h-16 opacity-30 group-hover:opacity-60 transition-opacity" viewBox="0 0 120 60" fill="none">
                <rect x="10" y="20" width="24" height="20" rx="4" stroke="#D1D5DB" strokeWidth="1.5" />
                <rect x="48" y="20" width="24" height="20" rx="4" stroke="#D1D5DB" strokeWidth="1.5" strokeDasharray="3 3" />
                <rect x="86" y="20" width="24" height="20" rx="4" stroke="#8B5CF6" strokeWidth="1.5" />
                <path d="M 34 30 L 48 30" stroke="#D1D5DB" strokeWidth="1.5" />
                <path d="M 72 30 L 86 30" stroke="#8B5CF6" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="space-y-2 z-10">
              <h4 className="text-xl font-bold text-gray-950 font-heading">No Production Projects</h4>
              <p className="text-xs text-neutral-500 font-semibold leading-relaxed max-w-lg">
                Zero professional exposure to building, testing, and deploying enterprise-grade production codebases with CI/CD optimization.
              </p>
            </div>
          </div>

          {/* Card 4: No Placement Direction (col-span-12 lg:col-span-4) */}
          <div className="group relative bg-white border border-neutral-200/80 rounded-[2rem] p-8 min-h-[300px] lg:min-h-[320px] col-span-12 lg:col-span-4 flex flex-col justify-between overflow-hidden transition-all duration-350 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:border-blue-500/40 hover:shadow-[0_20px_50px_-20px_rgba(59,130,246,0.12)] cursor-pointer">
            {/* Background 04 */}
            <span className="absolute -right-4 -bottom-6 text-[110px] font-black text-blue-500 opacity-[0.03] select-none pointer-events-none font-sans">
              04
            </span>
            <div className="flex justify-between items-start">
              <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100/50 group-hover:scale-105 transition-transform duration-300">
                <GitBranch className="w-8 h-8" />
              </div>

              {/* Broken Roadmap Metaphor */}
              <svg className="w-16 h-16 opacity-30 group-hover:opacity-60 transition-opacity" viewBox="0 0 60 60" fill="none">
                <path d="M 10 50 C 10 30, 30 30, 30 10" stroke="#D1D5DB" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M 30 50 C 30 30, 50 30, 50 10" stroke="#3B82F6" strokeWidth="1.5" />
                <circle cx="30" cy="10" r="3" fill="#EF4444" />
                <circle cx="50" cy="10" r="3" fill="#3B82F6" />
              </svg>
            </div>
            <div className="space-y-2 z-10">
              <h4 className="text-xl font-bold text-gray-950 font-heading">No Placement Direction</h4>
              <p className="text-xs text-neutral-500 font-semibold leading-relaxed">
                No direct routing pipelines to high-growth tech ecosystems or corporate matching networks.
              </p>
            </div>
          </div>

        </div>

        {/* Narrative transition text */}
        <div className="text-center pt-4 relative z-10">
          <p className="text-neutral-500 font-semibold text-sm max-w-lg mx-auto leading-relaxed">
            These challenges are exactly why we built <br />
            <span className="text-[#EE1C25] font-black">TheAISCHOOL Transformation System</span>.
          </p>
        </div>

        {/* ================= TRANSFORMATION PROCESS (STICKY STACK SCROLL) ================= */}
        <div className="space-y-12 pt-8">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-[#EE1C25]">
              TRANSFORMATION PROCESS
            </span>
            <h3 className="text-2xl md:text-4xl font-black text-gray-950 tracking-tight">
              Our Program Curriculum
            </h3>
            <p className="text-sm font-semibold text-neutral-500">
              A structured progression driving learners towards full production competence.
            </p>
          </div>

          {/* Stacking Cards Container */}
          <div className="relative space-y-12 max-w-5xl mx-auto">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className={`sticky top-24 min-h-[460px] md:min-h-[480px] w-full ${step.bgClass} border border-neutral-200/80 rounded-[2.5rem] p-8 md:p-12 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 overflow-hidden ${step.zIndexClass}`}
                >
                  {/* Left Column: Text Content */}
                  <div className="lg:w-1/2 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2.5 bg-red-50 text-[#EE1C25] border border-red-100 rounded-xl">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-black tracking-widest text-[#EE1C25] uppercase">
                          Step {step.number}
                        </span>
                      </div>
                      <span className="text-7xl font-black text-[#EE1C25]/10 font-sans leading-none select-none">
                        {step.number}
                      </span>
                    </div>

                    <h4 className="text-2xl md:text-3xl font-black text-gray-950 tracking-tight leading-tight font-heading">
                      {step.title}
                    </h4>

                    <p className="text-neutral-500 text-sm font-semibold leading-relaxed">
                      {step.desc}
                    </p>

                    <div className="flex flex-wrap gap-2.5 pt-2">
                      <a
                        href="#register"
                        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#EE1C25] hover:text-[#d61920] transition-colors"
                      >
                        Enroll Now
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Right Column: Visual Mockup Panel */}
                  <div className="lg:w-1/2 w-full bg-neutral-50 border border-neutral-200/60 rounded-3xl p-6 md:p-8 flex flex-col justify-between min-h-[220px]">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 border-b border-neutral-200/50 pb-3">
                        <MessageSquareCode className="w-4 h-4 text-neutral-400" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                          {step.detailTitle}
                        </span>
                      </div>

                      <div className="space-y-2.5">
                        {step.bullets.map((bullet) => (
                          <div key={bullet} className="flex items-center space-x-2.5">
                            <CheckCircle2 className="w-4 h-4 text-[#EE1C25] shrink-0" />
                            <span className="text-xs font-bold text-gray-700 leading-tight">
                              {bullet}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-neutral-200/40 flex items-center justify-between text-[9px] font-bold text-neutral-400 uppercase tracking-widest">
                      <span>Live Production Env</span>
                      <span>Verified System</span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

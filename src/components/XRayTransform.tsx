"use client";

import React from "react";
import {
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

const steps = [
  {
    number: "01",
    title: "AI Readiness Assessment",
    desc: "Evaluate the learner's current skills, aptitude and career goals before beginning the program.",
    icon: Users,
    detailTitle: "Skill Profiling",
    bullets: ["Technical aptitude screening", "Career goal mapping", "Personalized learning roadmap"],
  },
  {
    number: "02",
    title: "Program Enrollment",
    desc: "Admission confirmation, onboarding, LMS access and mentor allocation.",
    icon: Sparkles,
    detailTitle: "Onboarding & Setup",
    bullets: ["LMS platform activation", "Community Slack onboarding", "Mentor match alignment"],
  },
  {
    number: "03",
    title: "Live Learning Experience",
    desc: "Attend live classes, access recordings, complete labs and follow the structured curriculum.",
    icon: BookOpen,
    detailTitle: "Classroom Deliverables",
    bullets: ["Interactive live classes", "Hands-on virtual lab sessions", "On-demand class recordings"],
  },
  {
    number: "04",
    title: "Production Projects & Assessments",
    desc: "Complete weekly assignments, practical assessments and industry-level capstone projects.",
    icon: Code,
    detailTitle: "Project Milestones",
    bullets: ["Weekly coding challenges", "Mid-term engineering review", "Scalable capstone deployment"],
  },
  {
    number: "05",
    title: "Mentor & Teaching Support",
    desc: "Receive continuous support from mentors and teaching assistants throughout the learning journey.",
    icon: MessageSquareCode,
    detailTitle: "Support Structure",
    bullets: ["Daily doubt-clearing sessions", "Teaching assistant support", "Direct founder office hours"],
  },
  {
    number: "06",
    title: "Continuous Progress Tracking",
    desc: "Track performance, receive personalized feedback and continuously improve through mentor reviews.",
    icon: CheckCircle2,
    detailTitle: "Performance Analytics",
    bullets: ["Sprint feedback reports", "Code quality assessments", "Milestone review calls"],
  },
  {
    number: "07",
    title: "Hackathons & Innovation Sprints",
    desc: "Participate in AI hackathons, product challenges and collaborative engineering events.",
    icon: Laptop,
    detailTitle: "Innovation Deliverables",
    bullets: ["Team hackathon events", "AI prototyping challenges", "Live project pitches"],
  },
  {
    number: "08",
    title: "Career Readiness Assessment",
    desc: "Complete final assessments, placement preparation, resume reviews and mock interviews.",
    icon: GitBranch,
    detailTitle: "Placement Readiness",
    bullets: ["Technical mock interviews", "Resume & LinkedIn audits", "Profile showcase prep"],
  },
  {
    number: "09",
    title: "Launch Your AI Career",
    desc: "Graduate from The AI School with certification and become ready for internships and placement opportunities.",
    icon: Award,
    detailTitle: "Ecosystem Placement",
    bullets: ["Direct placement referrals", "Ecosystem hiring pipelines", "Certified graduate credentials"],
  },
];

export default function XRayTransform() {
  return (
    <section className="w-full bg-white py-14 px-6 md:px-12 border-t border-gray-100 relative z-10 font-heading">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* ================= SECTION TITLE ================= */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#EE1C25]">
            THE PATHWAY
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-950 tracking-tight leading-tight">
            Flagship Learning Frameworks
          </h2>
          <p className="text-sm font-semibold text-neutral-500">
            Outcome-focused specialized engineering tracks built for immediate industry applicability.
          </p>
        </div>

        {/* ================= BENTO GRID CHALLENGE LAYOUT ================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">

          {/* Card 1: Generative AI Engineering (col-span-12 lg:col-span-7) */}
          <div 
            onClick={() => window.location.href = "/learn"}
            className="group relative bg-white border border-neutral-200/80 rounded-[2rem] p-8 min-h-[300px] lg:min-h-[320px] col-span-12 lg:col-span-7 flex flex-col justify-between overflow-hidden transition-all duration-350 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:border-[#EE1C25]/40 hover:shadow-[0_20px_50px_-20px_rgba(238,28,37,0.12)] cursor-pointer"
          >
            {/* Background 01 */}
            <span className="absolute -right-4 -bottom-6 text-[110px] font-black text-[#EE1C25] opacity-[0.015] select-none pointer-events-none font-sans">
              01
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

          {/* Card 2: AI Agent Development (col-span-12 lg:col-span-5) */}
          <div 
            onClick={() => window.location.href = "/learn"}
            className="group relative bg-white border border-neutral-200/80 rounded-[2rem] p-8 min-h-[300px] lg:min-h-[320px] col-span-12 lg:col-span-5 flex flex-col justify-between overflow-hidden transition-all duration-350 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:border-orange-500/40 hover:shadow-[0_20px_50px_-20px_rgba(249,115,22,0.12)] cursor-pointer"
          >
            {/* Background 02 */}
            <span className="absolute -right-4 -bottom-6 text-[110px] font-black text-orange-500 opacity-[0.015] select-none pointer-events-none font-sans">
              02
            </span>
            <div className="flex justify-between items-start">
              <div className="p-4 bg-orange-50 text-orange-500 rounded-2xl border border-orange-100/50 group-hover:scale-105 transition-transform duration-300">
                <Terminal className="w-8 h-8" />
              </div>

              {/* Old/Deprecated Stack Metaphor */}
              <svg className="w-20 h-16 opacity-30 group-hover:opacity-60 transition-opacity" viewBox="0 0 80 60" fill="none">
                <path d="M 10 15 L 70 15 L 60 25 L 20 25 Z" fill="#E5E7EB" stroke="#D1D5DB" />
                <path d="M 10 30 L 70 30 L 60 40 L 20 40 Z" fill="#F3F4F6" stroke="#D1D5DB" />
                <line x1="20" y1="15" x2="20" y2="40" stroke="#EF4444" strokeWidth="2" />
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

          {/* Card 3: Full Stack AI Engineering (col-span-12 lg:col-span-8) */}
          <div 
            onClick={() => window.location.href = "/learn"}
            className="group relative bg-white border border-neutral-200/80 rounded-[2rem] p-8 min-h-[300px] lg:min-h-[320px] col-span-12 lg:col-span-8 flex flex-col justify-between overflow-hidden transition-all duration-350 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:border-purple-500/40 hover:shadow-[0_20px_50px_-20px_rgba(139,92,246,0.12)] cursor-pointer"
          >
            {/* Background 03 */}
            <span className="absolute -right-4 -bottom-6 text-[110px] font-black text-purple-500 opacity-[0.015] select-none pointer-events-none font-sans">
              03
            </span>
            <div className="flex justify-between items-start">
              <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl border border-purple-100/50 group-hover:scale-105 transition-transform duration-300">
                <Code className="w-8 h-8" />
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

          {/* Card 4: AI for Business & Analytics (col-span-12 lg:col-span-4) */}
          <div 
            onClick={() => window.location.href = "/learn"}
            className="group relative bg-white border border-neutral-200/80 rounded-[2rem] p-8 min-h-[300px] lg:min-h-[320px] col-span-12 lg:col-span-4 flex flex-col justify-between overflow-hidden transition-all duration-350 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:border-blue-500/40 hover:shadow-[0_20px_50px_-20px_rgba(59,130,246,0.12)] cursor-pointer"
          >
            {/* Background 04 */}
            <span className="absolute -right-4 -bottom-6 text-[110px] font-black text-blue-500 opacity-[0.015] select-none pointer-events-none font-sans">
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
            
            <div className="space-y-3 z-10 my-4">
              <div>
                <h4 className="text-xl font-bold text-gray-950 font-heading">AI for Business & Analytics</h4>
                <p className="text-xs text-neutral-500 font-semibold leading-relaxed mt-1">
                  Transform business problems into AI-powered data solutions and intelligent decision systems.
                </p>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {["PowerBI", "Python", "SQL", "Pandas", "Scikit-Learn"].map((tech) => (
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
                <span>Placement Ready</span>
              </div>
              <div className="text-xs font-black uppercase tracking-wider text-[#EE1C25] flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-200 shrink-0">
                <span>Explore Program</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

        </div>


        {/* ================= TRANSFORMATION PROCESS (STICKY STACK SCROLL) ================= */}
        <div className="space-y-12 pt-8">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-[#EE1C25]">
              YOUR AI JOURNEY
            </span>
            <h3 className="text-2xl md:text-4xl font-black text-gray-950 tracking-tight font-heading">
              From Beginner to AI Engineer
            </h3>
            <p className="text-sm font-semibold text-neutral-500">
              A structured learning journey designed by startup founders and engineering leaders.
            </p>
          </div>

          {/* Stacking Cards Container with increased vertical spacing for natural scroll scaling */}
          <div className="relative space-y-16 max-w-5xl mx-auto">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const bgClass = idx % 2 === 0 ? "bg-white" : "bg-slate-50";

              return (
                <div
                  key={step.number}
                  className={`sticky top-24 min-h-[460px] md:min-h-[480px] w-full ${bgClass} border border-neutral-200/80 rounded-[2.5rem] p-8 md:p-12 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 overflow-hidden`}
                  style={{ zIndex: (idx + 1) * 10 }}
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
                        href="/learn"
                        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#EE1C25] hover:text-[#d61920] transition-colors"
                      >
                        {idx === steps.length - 1 ? "Start Your Journey" : "Enroll Now"}
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


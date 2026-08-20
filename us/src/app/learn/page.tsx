import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@us/components/Header";
import Footer from "@us/components/Footer";
import {
  BookOpen,
  Sparkles,
  ArrowRight,
  Clock,
  Award,
  Zap,
  Bot,
  Terminal,
  Cpu,
  Layers,
  CheckCircle2,
  Users,
  Star,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Course Catalog | The AI School US - Master Production-Grade AI",
  description:
    "Explore our complete 5-course curriculum: AIM-IT Master Class, AI Ready Developer, The Art & Science of Prompt Engineering, Build Your Own AI Agent, and Gen AI-101.",
  openGraph: {
    title: "Course Catalog | The AI School US",
    description:
      "Master production-grade AI agents, LLM architectures, and prompt engineering with live startup founder mentorship.",
    url: "https://theaischool.co/us/learn",
  },
};

export default function LearnPage() {
  const otherCourses = [
    {
      id: "ai-ready-developer",
      slug: "ai-ready-developer",
      title: "AI Ready Developer",
      tag: "FUTURE READY",
      duration: "20 Hours",
      level: "Intermediate",
      icon: Terminal,
      iconColor: "text-amber-500",
      iconBg: "bg-amber-50 border-amber-200",
      description:
        "Transform your coding speed 10x using modern AI IDEs (Cursor, Windsurf), LLM primitives, automated testing, and AI-assisted database & cloud workflows.",
      features: [
        "Vibe coding & AI pair-programming",
        "API integration with OpenAI & Claude",
        "AI database & deployment automation",
      ],
      borderStyle: "border-l-4 border-l-[#EE1C25] border-r border-t border-b border-neutral-200/90",
      watermark: "01",
    },
    {
      id: "prompt-engineering",
      slug: "prompt-engineering",
      title: "The Art & Science of Prompt Engineering",
      tag: "PROMPT MASTER",
      duration: "25 Hours",
      level: "All Levels",
      icon: Cpu,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50 border-blue-200",
      description:
        "Master the language that talks to machines. Craft, optimize, and automate prompts that get consistent, reliable results from large language models.",
      features: [
        "Chain-of-thought & few-shot prompting",
        "LLM API integration & prompt automation",
        "Hallucination control & domain templates",
      ],
      borderStyle: "border border-neutral-200/90 hover:border-red-400 bg-gradient-to-br from-white to-red-50/20",
      watermark: "02",
    },
    {
      id: "build-your-own-ai-agent",
      slug: "build-your-own-ai-agent",
      tag: "AGENT BUILDER",
      duration: "45 Hours",
      level: "Advanced",
      title: "Build Your Own AI Agent",
      icon: Bot,
      iconColor: "text-[#EE1C25]",
      iconBg: "bg-red-50 border-red-200",
      description:
        "Architect and deploy autonomous AI agents with memory, reasoning chains, RAG pipelines, function calling, and multi-agent coordination frameworks.",
      features: [
        "LangChain & LlamaIndex agentic workflows",
        "RAG pipelines & vector databases",
        "Autonomous tool execution & state memory",
      ],
      borderStyle: "border-t-4 border-t-[#EE1C25] border-x border-b border-neutral-200/90 shadow-md",
      watermark: "03",
    },
    {
      id: "genai101",
      slug: "genai101",
      title: "Gen AI - 101",
      tag: "AI FOUNDATIONS",
      duration: "15 Hours",
      level: "Beginner to Pro",
      icon: Zap,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50 border-emerald-200",
      description:
        "The essential foundational program for professionals, product leaders, and creators looking to master Generative AI tools, workflows, and practical applications.",
      features: [
        "LLM & Transformer fundamentals visual guide",
        "Mastering ChatGPT, Claude & Midjourney",
        "Workflow automation & ethical AI usage",
      ],
      borderStyle: "border border-neutral-200/90 hover:border-neutral-400 bg-white",
      watermark: "04",
    },
  ];

  return (
    <main className="min-h-screen bg-[#FAFAFA] flex flex-col font-sans selection:bg-red-500 selection:text-white">
      {/* Navigation Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative w-full py-16 lg:py-24 px-6 md:px-12 overflow-hidden border-b border-neutral-200/60 bg-white select-none">
        {/* Ambient background glow & dot grid */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-[500px] h-[500px] bg-red-500/[0.04] rounded-full blur-[140px]" />
          <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-35" />
          <span className="text-8xl sm:text-9xl font-black text-slate-900/[0.03] tracking-widest uppercase absolute top-4 right-10">
            CATALOG
          </span>
        </div>

        <div className="max-w-7xl mx-auto space-y-6 text-center flex flex-col items-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#EE1C25] text-xs font-extrabold uppercase tracking-wider shadow-2xs">
            <BookOpen className="w-3.5 h-3.5 text-[#EE1C25]" />
            <span>OUR PROGRAMS</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#171717] tracking-tight uppercase leading-[1.08]">
            Explore Our <span className="text-[#EE1C25]">Courses</span>
          </h1>

          <p className="text-base sm:text-lg font-medium text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            From foundational prompt techniques to building autonomous multi-agent architectures, master production-grade AI skills with live mentorship from active tech founders.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-3 text-xs font-bold text-neutral-500 uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#EE1C25]" /> Official Certification
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#EE1C25]" /> Founder Mentorship
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#EE1C25]" /> Live Online &amp; Self-Paced
            </span>
          </div>
        </div>
      </section>

      {/* Main Course Content Section */}
      <section className="py-16 lg:py-24 px-6 md:px-12 max-w-7xl mx-auto w-full space-y-16 relative z-10">
        
        {/* ================= 1. FLAGSHIP MASTERCLASS HERO CARD (AIM-IT) ================= */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-black text-[#EE1C25] uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            <span>FEATURED FLAGSHIP MASTERCLASS</span>
          </div>

          <div className="relative bg-white border-2 border-red-500/80 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl overflow-hidden group transition-all duration-300">
            {/* Red Accent Top Glow Bar */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#EE1C25] via-red-600 to-red-400" />
            
            {/* Ghost Background Watermark */}
            <span className="text-8xl sm:text-9xl font-black text-red-500/[0.04] absolute -bottom-6 -right-6 select-none pointer-events-none font-mono">
              AIM-IT
            </span>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              {/* Left Details Side */}
              <div className="lg:col-span-8 space-y-6">
                {/* Badges & Meta */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-[#EE1C25] text-white text-[11px] font-black uppercase tracking-wider shadow-xs flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>FLAGSHIP MASTERCLASS</span>
                  </span>
                  <span className="px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700 text-xs font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-neutral-500" />
                    <span>180 Hours</span>
                  </span>
                  <span className="px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700 text-xs font-bold">
                    All Experience Levels
                  </span>
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#171717] tracking-tight leading-snug">
                    AIM-IT: AI &amp; Machine Learning for Industry Transformation
                  </h2>
                  <p className="text-xs sm:text-sm font-extrabold text-[#EE1C25] uppercase tracking-wider">
                    Learn. Build. Transform with Production Intelligence.
                  </p>
                </div>

                {/* Stat Quote Callout */}
                <div className="bg-red-50/70 border-l-4 border-[#EE1C25] p-4 rounded-r-xl">
                  <p className="text-xs sm:text-sm font-bold text-neutral-800 italic">
                    "Join 15,000+ Engineers &amp; Professionals Building Production AI with Live Founder Mentorship."
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-medium">
                  Gain production-grade AI &amp; ML skills through live online masterclasses led by active tech startup founders and AI architects. From Python fundamentals to building autonomous AI agents and automated MLOps pipelines, transform your career with practical hands-on experience.
                </p>

                {/* Topic Pills */}
                <div className="space-y-2 pt-1">
                  <span className="text-[11px] font-black text-neutral-400 uppercase tracking-widest block">
                    CURRICULUM HIGHLIGHTS
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {["GenAI & Prompting", "Python Refresher", "Vibe Coding", "Agentic AI Coder", "ML/DL Optimization", "MLOps Pipelines"].map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-800 text-[11px] font-bold border border-neutral-200/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right CTA Card Side */}
              <div className="lg:col-span-4 bg-neutral-50 border border-neutral-200/90 rounded-2xl p-6 flex flex-col justify-between space-y-6 shadow-sm">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-neutral-500 border-b border-neutral-200 pb-3">
                    <Layers className="w-4 h-4 text-[#EE1C25]" />
                    <span>Includes 6 In-Depth Modules</span>
                  </div>

                  <ul className="space-y-2.5 text-xs text-neutral-700 font-medium">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Live online interactive classes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>1-on-1 Founder mentorship</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Real-world cloud capstones</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Official AI School Certificate</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3 pt-2">
                  <Link
                    href="/us/courses/aim-it"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#EE1C25] hover:bg-[#D3131B] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
                  >
                    <span>EXPLORE MASTERCLASS</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <p className="text-[10px] text-center font-semibold text-neutral-400 uppercase tracking-wider">
                    Instant Access • Certificate Included
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 2. REMAINING 4 COURSES GRID ================= */}
        <div className="space-y-8 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200/80 pb-4">
            <div>
              <span className="text-xs font-black text-[#EE1C25] uppercase tracking-widest block">
                SPECIALIZED CURRICULUMS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#171717] tracking-tight">
                Targeted AI Programs
              </h2>
            </div>
            <p className="text-xs font-semibold text-neutral-500 max-w-md">
              Intensive, project-driven modules designed for developers, creators, and business leaders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {otherCourses.map((course) => {
              const IconComponent = course.icon;

              return (
                <Link
                  key={course.id}
                  href={`/courses/${course.slug}`}
                  className={`group relative bg-white rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 overflow-hidden ${course.borderStyle}`}
                >
                  {/* Ghost Number Watermark */}
                  <span className="text-7xl font-black text-neutral-900/[0.04] absolute top-4 right-6 select-none pointer-events-none font-mono">
                    {course.watermark}
                  </span>

                  <div className="space-y-6 relative z-10">
                    {/* Header: Tag + Duration Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full bg-red-50 text-[#EE1C25] text-[10px] font-black uppercase tracking-wider border border-red-100">
                        {course.tag}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-lg">
                        <Clock className="w-3.5 h-3.5" />
                        {course.duration}
                      </span>
                    </div>

                    {/* Icon + Title */}
                    <div className="space-y-3">
                      <div className={`w-12 h-12 rounded-2xl ${course.iconBg} flex items-center justify-center border transition-transform duration-300 group-hover:scale-110`}>
                        <IconComponent className={`w-6 h-6 ${course.iconColor}`} />
                      </div>

                      <h3 className="text-xl sm:text-2xl font-black text-[#171717] tracking-tight leading-snug group-hover:text-[#EE1C25] transition-colors">
                        {course.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-medium">
                      {course.description}
                    </p>

                    {/* Highlights List */}
                    <div className="space-y-2 border-t border-neutral-100 pt-4">
                      <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block mb-1">
                        Key Skills &amp; Outcomes
                      </span>
                      <ul className="space-y-1.5 text-xs text-neutral-700 font-medium">
                        {course.features.map((feat, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Action CTA Button */}
                  <div className="pt-6 border-t border-neutral-100/80 mt-6 flex items-center justify-between relative z-10">
                    <span className="text-xs font-extrabold text-[#171717] group-hover:text-[#EE1C25] transition-colors">
                      View Program Details
                    </span>
                    <div className="w-9 h-9 rounded-full bg-neutral-100 group-hover:bg-[#EE1C25] text-neutral-700 group-hover:text-white flex items-center justify-center transition-all duration-200 group-hover:translate-x-1 shadow-2xs">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}

'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, DollarSign, ArrowUpRight, Sparkles, Building2, Terminal, ShieldCheck } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

const activeJobs = [
  {
    id: "JOB-01",
    tag: "INSTRUCTIONAL CORE",
    title: "Full-Stack Instructor (Next.js & Python)",
    desc: "Mentor advanced developer cohorts building live agent applications. Strong expertise in Next.js App Router, LangChain, and Python server environments required.",
    location: "REMOTE (GLOBAL)",
    type: "CONTRACT / PART-TIME",
    compensation: "HOURLY SCALE (INDUSTRY LEADING)",
    accent: true
  },
  {
    id: "JOB-02",
    tag: "ECOSYSTEM GROWTH",
    title: "GenAI Agent Evangelist",
    desc: "Drive partner adoption, build developer advocacy pipelines, and orchestrate ecosystem hackathons across key startup hubs.",
    location: "HYDERABAD, INDIA (ON-SITE)",
    type: "FULL-TIME",
    compensation: "COMPETITIVE PACKAGE",
    accent: false
  }
];

export default function CareerPage() {
  const [hoveredJob, setHoveredJob] = useState<string | null>(null);

  return (
    <main className="w-full bg-white text-gray-900 font-sans min-h-screen antialiased select-none">
      <Header />
      
      {/* ================= HERO SECTION (HIGH TEXT CONTRAST) ================= */}
      <section className="w-full bg-neutral-950 text-white py-14 px-6 md:px-12 relative overflow-hidden">
        {/* Deep ambient red-glow portal blur */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-[#EE1C25]/10 via-transparent to-transparent blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-gradient-to-br from-white/[0.02] to-transparent blur-[80px] pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-[#EE1C25]/10 border border-[#EE1C25]/30 rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#EE1C25]">
            <Sparkles className="w-3.5 h-3.5 virtual-glow" />
            <span>Join the AI School Core</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none uppercase max-w-4xl">
            Build The School Of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EE1C25] via-red-500 to-white">
              Intelligence.
            </span>
          </h1>
          
          <p className="text-neutral-400 text-sm md:text-lg max-w-2xl font-medium leading-relaxed pt-2">
            Collaborate directly with top startup founders, deployment architects, and industry experts. We shape elite AI talent through project-driven learning.
          </p>
        </div>
      </section>

      {/* ================= ECOSYSTEM METRICS LAYER (BENTO BREAK) ================= */}
      <section className="max-w-6xl mx-auto px-6 pt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-20 -mt-8">
        <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-xl flex items-center space-x-4">
          <div className="p-3 bg-red-50 text-[#EE1C25] rounded-xl"><Building2 className="w-5 h-5" /></div>
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-gray-400">HQ Infrastructure</div>
            <div className="text-sm font-extrabold text-gray-900">T-Hub 2.0, Hyderabad</div>
          </div>
        </div>
        <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-xl flex items-center space-x-4">
          <div className="p-3 bg-red-50 text-[#EE1C25] rounded-xl"><Terminal className="w-5 h-5" /></div>
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-gray-400">Our Curriculums</div>
            <div className="text-sm font-extrabold text-gray-900">100% Production Stack</div>
          </div>
        </div>
        <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-xl flex items-center space-x-4">
          <div className="p-3 bg-red-50 text-[#EE1C25] rounded-xl"><ShieldCheck className="w-5 h-5" /></div>
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-gray-400">Ecosystem Network</div>
            <div className="text-sm font-extrabold text-gray-900">Direct Partner Pipelines</div>
          </div>
        </div>
      </section>

      {/* ================= OPEN WORKSPACE POSITIONS TIMELINE ================= */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-14 space-y-10">
        <div className="border-b border-gray-100 pb-4">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tight">
            Open Workspace Positions
          </h2>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">
            Select an opening to review requirements and register your candidacy
          </p>
        </div>

        {/* Dynamic List Generator */}
        <div className="space-y-6">
          {activeJobs.map((job) => {
            const isHovered = hoveredJob === job.id;
            return (
              <div
                key={job.id}
                onMouseEnter={() => setHoveredJob(job.id)}
                onMouseLeave={() => setHoveredJob(null)}
                className="bg-white border border-gray-200/70 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl hover:border-gray-300 transition-all duration-300 relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                {/* Clean left brand accent tag indicator */}
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 transition-transform duration-300 ${job.accent ? 'bg-[#EE1C25]' : 'bg-gray-900 group-hover:bg-[#EE1C25]'}`} />
                
                {/* Info block segment */}
                <div className="space-y-3 flex-1 pl-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#EE1C25] bg-red-50 px-2.5 py-1 rounded-md w-fit block">
                    {job.tag}
                  </span>
                  <h3 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight leading-tight">
                    {job.title}
                  </h3>
                  <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-3xl">
                    {job.desc}
                  </p>
                  
                  {/* Metadata matrix line */}
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-[11px] font-black uppercase tracking-wider text-gray-400 font-mono">
                    <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#EE1C25]" /> {job.location}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {job.type}</span>
                    <span className="flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5 text-emerald-600" /> {job.compensation}</span>
                  </div>
                </div>

                {/* Interactive Action Transition Switch */}
                <div className="shrink-0 self-start lg:self-center pl-2 lg:pl-0">
                  <Link href="/register" className="flex items-center space-x-2 bg-gray-900 hover:bg-[#EE1C25] text-white text-xs font-black uppercase tracking-wider py-4 px-6 rounded-xl transition-all duration-300 shadow-md transform active:scale-[0.98]">
                    <span>Apply Now</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}

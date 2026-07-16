"use client";

import React from 'react';

const problems = [
  "Learning in isolated, static environments",
  "No practical or hands-on enterprise experience",
  "Lack of peer support and structural competition",
  "Outdated curriculum missing cutting-edge GenAI layers"
];

const solutions = [
  {
    icon: (
      <svg className="w-5 h-5 text-[#EE1C25] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m22 8-6 4 6 4V8Z" />
        <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
      </svg>
    ),
    title: "Live Interactive Sessions",
    desc: "Engage in real-time architectural breakdowns with active tech startup founders."
  },
  {
    icon: (
      <svg className="w-5 h-5 text-[#EE1C25] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m18 16 4-4-4-4" />
        <path d="m6 8-4 4 4 4" />
        <path d="m14.5 4-5 16" />
      </svg>
    ),
    title: "Hands-on Enterprise Code",
    desc: "Build, deploy, and ship 7+ real-world projects that mirror production-grade microservices."
  },
  {
    icon: (
      <svg className="w-5 h-5 text-[#EE1C25] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    title: "Dedicated Query Resolution",
    desc: "Get unblocked instantly with explicit founder and mentor syncs directly from a dashboard."
  },
  {
    icon: (
      <svg className="w-5 h-5 text-[#EE1C25] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Active Tech Ecosystem",
    desc: "Immerse yourself in a supportive, highly competitive network of like-minded builders."
  }
];

export default function ProblemSolution() {
  return (
    <section className="w-full bg-white py-14 px-6 md:px-12 border-t border-gray-100 relative z-10 font-heading">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* ================= PART A: THE PAIN POINTS ================= */}
        <div className="space-y-12 text-center max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight font-heading">
            Learning Problems We've All Faced
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {problems.map((prob, idx) => (
              <div 
                key={idx} 
                className="flex items-center space-x-4 bg-gray-50 border border-gray-100 rounded-2xl p-5 shadow-xs"
              >
                <div className="p-2 bg-red-50 rounded-xl text-red-500 shrink-0">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
                    <line x1="9" y1="9" x2="9.01" y2="9" />
                    <line x1="15" y1="9" x2="15.01" y2="9" />
                  </svg>
                </div>
                <span className="text-sm font-bold text-gray-700 text-left leading-tight">
                  {prob}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative Divider Line */}
        <div className="w-px h-16 bg-gradient-to-b from-gray-200 to-transparent mx-auto" />

        {/* ================= PART B: THE ANTIDOTE ================= */}
        <div className="space-y-12 font-heading">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#EE1C25] bg-red-50 px-3 py-1 rounded-full inline-block font-heading">
              The Strategy
            </span>
            <h3 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight font-heading">
              Presenting The AI School Way!
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map((sol, idx) => (
              <div 
                key={idx} 
                className="group relative bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-64 overflow-hidden"
              >
                {/* Accent top dot line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-[#EE1C25] scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                
                <div className="space-y-4">
                  <div className="p-3 bg-red-50 rounded-2xl w-fit group-hover:bg-[#EE1C25] group-hover:text-white transition-colors duration-300">
                    {sol.icon}
                  </div>
                  <h4 className="text-lg font-black text-gray-900 leading-tight font-heading">
                    {sol.title}
                  </h4>
                  <p className="text-gray-500 text-xs font-medium leading-relaxed">
                    {sol.desc}
                  </p>
                </div>
                
                <div className="flex items-center space-x-1 text-[10px] font-black text-[#EE1C25] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Accelerate</span>
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

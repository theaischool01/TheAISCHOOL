"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface TreeNode {
  title: string;
  desc?: string;
  icon: React.ReactNode;
  type: 'problem' | 'solution';
  position: string; // Tailwind coordinate classes
}

const treeNodes: TreeNode[] = [
  // ================= ROOT NODES (THE PROBLEMS) =================
  {
    title: "Learning in Isolation",
    icon: (
      <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    type: 'problem',
    position: "bottom-0 left-[10%] md:left-[15%]"
  },
  {
    title: "No Practical Enterprise Code",
    icon: (
      <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    type: 'problem',
    position: "bottom-16 left-[5%] md:left-[22%]"
  },
  {
    title: "Outdated Academic Curriculums",
    icon: (
      <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    type: 'problem',
    position: "bottom-0 right-[10%] md:right-[15%]"
  },
  {
    title: "Zero Elite Mentor Access",
    icon: (
      <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    type: 'problem',
    position: "bottom-16 right-[5%] md:right-[22%]"
  },

  // ================= CANOPY NODES (THE ANTIDOTES) =================
  {
    title: "Startup Founder Mentors",
    desc: "Direct architectural guidance from ecosystem leaders.",
    icon: (
      <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    type: 'solution',
    position: "top-16 left-[2%] md:left-[10%]"
  },
  {
    title: "7+ Production Projects",
    desc: "Build & deploy live scalable microservices.",
    icon: (
      <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m18 16 4-4-4-4" />
        <path d="m6 8-4 4 4 4" />
        <path d="m14.5 4-5 16" />
      </svg>
    ),
    type: 'solution',
    position: "top-0 left-[20%] md:left-[28%]"
  },
  {
    title: "Instant Founder Syncs",
    desc: "Get unblocked directly through a live portal dashboard.",
    icon: (
      <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    type: 'solution',
    position: "top-0 right-[20%] md:right-[28%]"
  },
  {
    title: "Ecosystem Placements",
    desc: "Direct career pathways connecting into T-Hub pipelines.",
    icon: (
      <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
        <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
      </svg>
    ),
    type: 'solution',
    position: "top-16 right-[2%] md:right-[10%]"
  }
];

export default function TechTree() {
  return (
    <section className="w-full bg-white py-16 px-6 md:px-12 border-t border-gray-100 relative overflow-hidden min-h-[750px] font-heading z-10">
      
      {/* Decorative ambient background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto h-[700px] relative flex flex-col items-center justify-between z-10">
        
        {/* ================= THE TREE TRUNK & CONNECTIONS ================= */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Main vertical transforming core line */}
          <div className="w-[3px] h-[70%] bg-gradient-to-b from-[#EE1C25] via-[#EE1C25]/40 to-gray-200 relative">
            
            {/* Animated data pulse travelling upwards */}
            <motion.div 
              className="absolute left-1/2 -translate-x-1/2 w-2 h-12 bg-gradient-to-b from-white via-[#EE1C25] to-transparent rounded-full shadow-md"
              animate={{ top: ["100%", "-20%"] }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            />

            {/* Central Metaphor Card: The Catalyst Node */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900 border border-gray-800 rounded-2xl px-6 py-3 shadow-2xl z-20 flex items-center space-x-2.5">
              <svg className="w-4 h-4 text-[#EE1C25] animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              </svg>
              <span className="text-xs font-black tracking-widest text-white uppercase font-sans whitespace-nowrap">
                The AI School Way
              </span>
            </div>
          </div>
        </div>

        {/* ================= MAP NODES ACCORDING TO MATRIX COORDINATES ================= */}
        {treeNodes.map((node, idx) => {
          const isProblem = node.type === 'problem';
          
          return (
            <div 
              key={idx} 
              className={`absolute ${node.position} z-10 transition-all duration-300 group`}
            >
              {isProblem ? (
                // PROBLEM CARDS (Root Ecosystem)
                <div className="flex items-center space-x-3 bg-gray-50 border border-gray-200/60 rounded-xl px-4 py-3 shadow-xs max-w-[240px]">
                  <div className="p-2 bg-gray-200/50 rounded-lg text-gray-500 shrink-0">
                    {node.icon}
                  </div>
                  <span className="text-xs font-bold text-gray-500 tracking-tight leading-tight">
                    {node.title}
                  </span>
                </div>
              ) : (
                // SOLUTION CARDS (Canopy Growth Ecosystem)
                <div className="flex flex-col bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:border-gray-300 transition-all duration-300 max-w-[260px] relative">
                  {/* Subtle top accent link indicator */}
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-[#EE1C25] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 bg-[#EE1C25] rounded-xl text-white shadow-xs">
                      {node.icon}
                    </div>
                    <h4 className="text-sm font-black text-gray-900 tracking-tight leading-tight group-hover:text-[#EE1C25] transition-colors font-heading">
                      {node.title}
                    </h4>
                  </div>
                  <p className="text-gray-500 text-[11px] font-medium leading-relaxed font-sans">
                    {node.desc}
                  </p>
                </div>
              )}
            </div>
          );
        })}

        {/* Floating Architectural Header Labels */}
        <div className="absolute top-[-40px] text-center w-full">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#EE1C25] bg-red-50 px-3 py-1 rounded-md">
            Ecosystem Canopy
          </span>
        </div>
        
        <div className="absolute bottom-[-30px] text-center w-full">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 bg-gray-50 border border-gray-100 px-3 py-1 rounded-md">
            Legacy Education Root Friction
          </span>
        </div>

      </div>
    </section>
  );
}

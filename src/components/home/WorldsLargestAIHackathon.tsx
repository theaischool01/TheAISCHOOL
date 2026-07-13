"use client";

import React from "react";

export default function WorldsLargestAIHackathon() {
  return (
    <section className="w-full bg-white py-24 px-6 md:px-12 border-t border-gray-100 relative z-10 font-heading">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Section Label */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#EE1C25]">
            COMING SOON
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-950 tracking-tight leading-tight">
            World&apos;s Largest AI Hackathon
          </h2>
          <p className="text-sm font-semibold text-neutral-500 max-w-xl mx-auto leading-relaxed">
            A next-generation interactive AI hackathon platform is currently under development.
            This experience will feature AI competitions, real-world challenges, startup collaborations,
            industry mentorship, and global participation.
          </p>
        </div>

        {/* Premium Placeholder Container */}
        <div
          className="relative w-full overflow-hidden rounded-[2rem] border border-neutral-200/60 bg-white"
          style={{ minHeight: "700px" }}
        >
          {/* Subtle grid texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.035] z-0"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.6) 0.5px, transparent 0.5px), linear-gradient(to bottom, rgba(0,0,0,0.6) 0.5px, transparent 0.5px)`,
              backgroundSize: "40px 40px",
            }}
          />

          {/* Radial gradient glow — top left */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(238,28,37,0.04)_0%,transparent_70%)] pointer-events-none z-0" />

          {/* Radial gradient glow — bottom right */}
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(59,130,246,0.03)_0%,transparent_70%)] pointer-events-none z-0" />

          {/* Content centered in placeholder */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full min-h-[700px] gap-8 px-8 text-center">

            {/* Coming Soon badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-neutral-50 border border-neutral-200 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#EE1C25] animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">
                Interactive Experience Launching Soon
              </span>
            </div>

            {/* Placeholder label */}
            <div className="space-y-2 max-w-lg">
              <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                TODO
              </p>
              <p className="text-sm font-semibold text-neutral-400 leading-relaxed">
                Upcoming Premium Interactive AI Hackathon Experience
              </p>
            </div>

            {/* Disabled CTA */}
            <button
              disabled
              className="inline-flex items-center justify-center px-8 py-3.5 bg-neutral-100 text-neutral-400 text-xs font-black uppercase tracking-wider rounded-full border border-neutral-200 cursor-not-allowed select-none"
            >
              Launching Soon
            </button>

          </div>
        </div>

      </div>
    </section>
  );
}

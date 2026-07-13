"use client";

import React from "react";

export default function HackathonFuture() {
  return (
    <section className="w-full bg-white py-24 px-6 md:px-12 border-t border-gray-100 relative z-10 font-heading">
      <div className="max-w-7xl mx-auto">
        <div className="bg-slate-50 border border-gray-150 rounded-[2.5rem] p-12 text-center relative overflow-hidden max-w-4xl mx-auto space-y-6">
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-red-500/5 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="p-4 bg-white border border-gray-200 shadow-sm rounded-full w-fit mx-auto text-3xl">
            🚀
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">
              The Future of AI Innovation
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-gray-950 uppercase">
              World&#39;s Largest AI Hackathon Platform
            </h3>
            <p className="text-xs font-semibold text-neutral-500 max-w-md mx-auto leading-relaxed">
              We are scaling the platform to host global concurrent tracks, automated leaderboards, and collaborative developer code sandboxes.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-neutral-100 border border-neutral-200 rounded-full mx-auto">
            <span className="w-2 h-2 rounded-full bg-neutral-400 animate-pulse" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-500">
              Next Track Launching Soon
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

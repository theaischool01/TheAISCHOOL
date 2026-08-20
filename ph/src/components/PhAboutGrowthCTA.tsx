"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PhAboutGrowthCTA() {
  return (
    <section className="py-20 bg-slate-950 text-white border-t border-slate-800 px-6 md:px-12 text-center font-heading">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight">
          Ready to Learn AI from <span className="text-[#EE1C25]">Startup Founders</span>?
        </h2>
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-medium">
          Join our upcoming live cohorts and intensive workshops in the Philippines. Upgrade your skill set with production-grade AI systems.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/ph/workshops"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#EE1C25] hover:bg-[#D3131B] text-white text-xs font-black uppercase tracking-wider rounded-full shadow-lg shadow-red-500/20 transition-all duration-200 hover:scale-105"
          >
            <span>Explore Workshops</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/ph/learn"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black uppercase tracking-wider rounded-full border border-slate-800 transition-colors"
          >
            <span>View Learning Tracks</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { Target, ShieldCheck } from "lucide-react";

export default function USMission() {
  return (
    <section className="w-full bg-white py-16 px-6 md:px-12 border-t border-gray-100 relative z-10 font-heading">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Our Mission Card */}
        <div className="relative overflow-hidden bg-neutral-950 text-white rounded-3xl p-8 md:p-12 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 border border-neutral-800">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#EE1C25]/10 rounded-full blur-3xl" />
          <div className="space-y-4">
            <div className="p-3 bg-neutral-900 w-fit rounded-2xl border border-neutral-800 text-[#EE1C25]">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black tracking-tight uppercase">
              Our <span className="text-[#EE1C25]">Mission</span>
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Our mission is to drive innovation and continuous improvement through comprehensive educational programs in association with global organizations, entrepreneurial support, and robust research commercialization services.
            </p>
          </div>
        </div>

        {/* Our Commitment Card */}
        <div className="relative overflow-hidden bg-[#EE1C25] text-white rounded-3xl p-8 md:p-12 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 border border-red-600">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
          <div className="space-y-4">
            <div className="p-3 bg-red-700 w-fit rounded-2xl text-white">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black tracking-tight uppercase">
              Our <span className="text-black">Commitment</span>
            </h3>
            <p className="text-white/90 text-sm leading-relaxed">
              Our commitment extends to fostering a collaborative ecosystem that encourages lifelong learning, cultivates creativity, and promotes sustainable growth. By aligning our efforts with the evolving needs of the digital age, we aim to be a catalyst for positive change.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

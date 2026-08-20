"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import PhFlagParticleCanvas from "@ph/components/PhFlagParticleCanvas";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export default function PhAboutHero() {
  return (
    <section className="relative py-16 sm:py-24 lg:py-28 px-6 md:px-12 bg-[#FAFBFD] border-b border-slate-200/80 overflow-hidden font-heading select-none">
      {/* Brand Particle Canvas */}
      <PhFlagParticleCanvas />

      {/* Grid Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(15,23,42,0.8) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.8) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Asymmetric Editorial Positioning */}
        <div className="lg:col-span-7 space-y-7 text-left">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-[#EE1C25]"
          >
            <span className="w-6 h-[2px] bg-[#EE1C25]" />
            <span>ABOUT THE AI SCHOOL PHILIPPINES</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.02] max-w-2xl"
          >
            Practical AI education built directly for tech careers.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium max-w-xl"
          >
            We are startup founders, machine learning leads, and deployment consultants bridging the gap between academic theory and production-grade AI systems in the Philippines.
          </motion.p>

          {/* Inline Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="pt-2 flex flex-wrap items-center gap-6 text-xs sm:text-sm font-bold text-slate-800 border-t border-slate-200/80 max-w-xl"
          >
            <div className="flex items-center gap-2">
              <span className="font-mono text-[#EE1C25] font-black">100%</span>
              <span>Founder-Led Mentorship</span>
            </div>
            <span className="w-[1px] h-4 bg-slate-300 hidden sm:inline-block" />
            <div className="flex items-center gap-2">
              <span className="font-mono text-[#EE1C25] font-black">80%</span>
              <span>Hands-on Practice</span>
            </div>
            <span className="w-[1px] h-4 bg-slate-300 hidden sm:inline-block" />
            <div className="flex items-center gap-2">
              <span className="font-mono text-emerald-600 font-black">✓</span>
              <span>Verifiable Credentials</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="pt-2 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/workshops"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#EE1C25] hover:bg-[#D3131B] text-white text-xs font-black uppercase tracking-wider rounded-full shadow-lg shadow-red-500/20 transition-all duration-200 hover:scale-[1.02]"
            >
              <span>Explore Workshops</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/learn"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-950 hover:bg-slate-900 text-white text-xs font-black uppercase tracking-wider rounded-full transition-all duration-200 shadow-sm"
            >
              <span>View Learning Pathways</span>
            </Link>
          </motion.div>
        </div>

        {/* Right Column: Mission Spec Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="lg:col-span-5"
        >
          <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-2xl border border-slate-800 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#EE1C25]" />

            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#EE1C25]">OUR PHILOSOPHY</span>
              <span className="text-xs font-mono text-slate-400">PHILIPPINES ACADEMY</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black tracking-tight text-white font-heading">
                Where Intelligence Meets Innovation.
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed font-medium">
                Empowering Philippine youth, supporting tech startups, and fostering AI innovation across Davao del Norte, Hyderabad HQ, and active global hubs.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs font-mono text-slate-300">
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">PH Campus Address</span>
                <span className="font-bold text-white text-right">Panabo City, Davao del Norte</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">HQ Address</span>
                <span className="font-bold text-white text-right">T-Hub 2.0, Hyderabad</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/contact-us"
                className="w-full py-3.5 bg-[#EE1C25] hover:bg-[#D3131B] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>Connect With Academic Team</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

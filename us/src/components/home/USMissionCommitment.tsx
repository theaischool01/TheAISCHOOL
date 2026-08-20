"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ABOUT_US_DATA } from "@us/config/aboutUsData";
import { Target, HeartHandshake, Quote } from "lucide-react";

export default function USMissionCommitment() {
  const { missionCommitment } = ABOUT_US_DATA;
  const shouldReduceMotion = useReducedMotion();

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: (customDelay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.55,
        delay: shouldReduceMotion ? 0 : customDelay,
        ease: "easeOut" as const,
      },
    }),
  };

  return (
    <section className="relative w-full bg-white py-16 lg:py-24 px-6 md:px-12 font-sans overflow-hidden border-b border-neutral-100">
      {/* Decorative Ghost Background Elements (Layer 0) */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        {/* 1. Low-opacity Infinity Motif Watermark behind Cards */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] opacity-[0.04] text-[#C1121C]">
          <svg viewBox="0 0 520 340" className="w-full h-full fill-none stroke-current stroke-[8]">
            <path d="M140 170 C 140 100, 240 100, 260 170 C 280 240, 380 240, 380 170 C 380 100, 280 100, 260 170 C 240 240, 140 240, 140 170 Z" />
          </svg>
        </div>

        {/* 2. Faint Dot-Grid Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-[#171717] uppercase tracking-tight"
          >
            Driven By <span className="text-[#C1121C]">Purpose</span>
          </motion.h2>
        </div>

        {/* Two-Card Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12 items-stretch">
          {/* Card 1: Our Mission */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative group"
          >
            {/* Layered Shadow Card (Depth offset element behind main card) */}
            <div
              aria-hidden="true"
              className={`absolute inset-0 rounded-3xl bg-neutral-900/40 border border-neutral-800/80 z-0 pointer-events-none transition-all duration-300 ${
                shouldReduceMotion
                  ? "translate-x-2.5 translate-y-2.5"
                  : "translate-x-2.5 translate-y-2.5 group-hover:translate-x-3.5 group-hover:translate-y-3.5"
              }`}
            />

            {/* Main Mission Card Surface */}
            <div
              className={`relative z-10 h-full bg-neutral-950 text-white rounded-3xl p-8 sm:p-10 border border-neutral-800 shadow-xl flex flex-col justify-between overflow-hidden transition-all duration-300 ${
                shouldReduceMotion
                  ? "border-neutral-800"
                  : "group-hover:-translate-y-1.5 group-hover:-translate-x-0.5 group-hover:border-red-600/40"
              }`}
            >
              {/* Red Glow Corner Accent */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#C1121C]/15 blur-2xl rounded-full pointer-events-none" />

              {/* Symmetrical Left-Edge Accent Stripe */}
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#C1121C] group-hover:w-2 group-hover:brightness-125 transition-all duration-300" />

              {/* Ghost Quotation Mark Watermark */}
              <Quote className="w-24 h-24 sm:w-28 sm:h-28 text-white/[0.06] absolute -top-4 -left-2 rotate-180 pointer-events-none select-none z-0" />

              <div className="space-y-6 relative z-10">
                {/* Icon Badge with One-Time Scale-In Animation */}
                <motion.div
                  initial={shouldReduceMotion ? false : { scale: 0.6, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="w-14 h-14 rounded-2xl bg-red-950/70 border border-red-800/50 text-[#C1121C] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform"
                >
                  <Target className="w-7 h-7 text-[#C1121C]" />
                </motion.div>

                <h3 className="text-2xl font-black uppercase tracking-tight text-white flex items-center gap-3">
                  Our Mission
                </h3>

                <p className="text-sm sm:text-base text-neutral-300 font-medium leading-relaxed">
                  "{missionCommitment.mission}"
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-neutral-900 flex items-center justify-between text-xs font-bold text-neutral-400 relative z-10">
                <span className="uppercase tracking-widest text-[#C1121C]">THE AI SCHOOL USA</span>
                <span>EST. DELAWARE, US</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Our Commitment */}
          <motion.div
            custom={0.1} // 100ms stagger
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative group"
          >
            {/* Layered Shadow Card (Depth offset element behind main card) */}
            <div
              aria-hidden="true"
              className={`absolute inset-0 rounded-3xl bg-neutral-900/40 border border-neutral-800/80 z-0 pointer-events-none transition-all duration-300 ${
                shouldReduceMotion
                  ? "translate-x-2.5 translate-y-2.5"
                  : "translate-x-2.5 translate-y-2.5 group-hover:translate-x-3.5 group-hover:translate-y-3.5"
              }`}
            />

            {/* Main Commitment Card Surface */}
            <div
              className={`relative z-10 h-full bg-neutral-900 text-white rounded-3xl p-8 sm:p-10 border border-neutral-800 shadow-xl flex flex-col justify-between overflow-hidden transition-all duration-300 ${
                shouldReduceMotion
                  ? "border-neutral-800"
                  : "group-hover:-translate-y-1.5 group-hover:-translate-x-0.5 group-hover:border-red-600/40"
              }`}
            >
              {/* Red Glow Corner Accent */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#C1121C]/15 blur-2xl rounded-full pointer-events-none" />

              {/* Symmetrical Left-Edge Accent Stripe (Matching Mission Card) */}
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#C1121C] group-hover:w-2 group-hover:brightness-125 transition-all duration-300" />

              {/* Ghost Quotation Mark Watermark */}
              <Quote className="w-24 h-24 sm:w-28 sm:h-28 text-white/[0.06] absolute -top-4 -left-2 rotate-180 pointer-events-none select-none z-0" />

              <div className="space-y-6 relative z-10">
                {/* Icon Badge with One-Time Scale-In Animation */}
                <motion.div
                  initial={shouldReduceMotion ? false : { scale: 0.6, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="w-14 h-14 rounded-2xl bg-neutral-800/90 border border-neutral-700/80 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform"
                >
                  <HeartHandshake className="w-7 h-7 text-[#C1121C]" />
                </motion.div>

                <h3 className="text-2xl font-black uppercase tracking-tight text-white flex items-center gap-3">
                  Our Commitment
                </h3>

                <p className="text-sm sm:text-base text-neutral-300 font-medium leading-relaxed">
                  "{missionCommitment.commitment}"
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs font-bold text-neutral-400 relative z-10">
                <span className="uppercase tracking-widest text-[#C1121C]">SUSTAINABLE GROWTH</span>
                <span>LIFELONG LEARNING</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ABOUT_US_DATA } from "@us/config/aboutUsData";
import { ArrowRight, Sparkles, GraduationCap, CheckCircle2 } from "lucide-react";

export default function USAboutHero() {
  const { hero } = ABOUT_US_DATA;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="relative w-full bg-white py-16 md:py-24 px-6 sm:px-8 lg:px-12 overflow-hidden border-b border-neutral-100">
      {/* Background Soft Radial Blush Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-red-500/5 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Grid Pattern Background Subtle Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column — Text & Copy (Preserved verbatim) */}
          <motion.div
            className="lg:col-span-7 flex flex-col items-start space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Tag Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#C1121C] text-xs font-bold uppercase tracking-wider shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C1121C]" />
              <span>THE AI SCHOOL INC — US</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-black text-[#171717] tracking-tight leading-[1.1] uppercase"
            >
              Who <span className="text-[#C1121C] relative inline-block">
                We are
                <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-[#C1121C] rounded-full" />
              </span>
            </motion.h1>

            {/* Narrative Body */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-neutral-600 font-medium leading-relaxed max-w-2xl"
            >
              {hero.body}
            </motion.p>

            {/* CTA Buttons (Pill shaped) */}
            <motion.div
              variants={itemVariants}
              className="pt-2 flex flex-wrap items-center gap-4"
            >
              <a
                href="#core-members"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#C1121C] hover:bg-[#a00e17] text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider rounded-full shadow-lg shadow-red-600/20 hover:shadow-red-600/40 hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>MEET OUR TEAM</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#benefits"
                className="inline-flex items-center justify-center px-7 py-3.5 bg-white border border-neutral-300 hover:border-black text-[#171717] text-xs sm:text-sm font-extrabold uppercase tracking-wider rounded-full hover:bg-neutral-50 transition-all duration-200"
              >
                OUR ADVANTAGE
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column — Revamped Hero Visual: Real Photo + Floating Stat Cards */}
          <motion.div
            className="lg:col-span-5 relative w-full max-w-[500px] mx-auto lg:ml-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Main Photo Card Container */}
            <motion.div
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.3 }}
              className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-red-500/15 shadow-2xl shadow-neutral-950/10 ring-1 ring-red-500/10 bg-neutral-900 group"
            >
              <Image
                src="/us/images/about/hero-team.jpg"
                alt="The AI School hackathon event with students and mentors"
                fill
                priority
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 500px"
              />

              {/* Bottom third subtle gradient overlay for visual grounding */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
            </motion.div>

            {/* Floating Credibility Badge (Top-Right) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 200 }}
              className="absolute -top-3 -right-2 sm:-top-4 sm:-right-4 z-30 bg-white/95 backdrop-blur-md border border-neutral-200/80 shadow-xl rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2 flex items-center gap-2 text-xs font-bold text-[#171717]"
            >
              <CheckCircle2 className="w-4 h-4 text-[#C1121C] fill-red-50 shrink-0" />
              <span>{hero.trustBadge?.label || "Founder-Led Mentors"}</span>
            </motion.div>

            {/* Floating Stat Card (Bottom-Left 15–20% overlap) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, type: "spring", stiffness: 200 }}
              className="absolute -bottom-5 -left-3 sm:-bottom-7 sm:-left-6 z-30 bg-white/95 backdrop-blur-md border border-neutral-200/80 shadow-2xl rounded-2xl p-3.5 sm:p-4.5 flex items-center gap-3.5 max-w-[240px] sm:max-w-[270px]"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-red-50 border border-red-100 text-[#C1121C] flex items-center justify-center shrink-0 shadow-sm">
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black text-[#C1121C] tracking-tight leading-none">
                  {hero.statCard?.value || "500+"}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-neutral-600 tracking-wide mt-0.5">
                  {hero.statCard?.label || "Students Trained"}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

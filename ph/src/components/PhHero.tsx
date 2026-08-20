"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { PH_DATA } from "@ph/config/phData";
import PhFlagParticleCanvas from "@ph/components/PhFlagParticleCanvas";
import UnfinishedLoopLogo from "@ph/components/UnfinishedLoopLogo";

export default function PhHero() {
  const { hero } = PH_DATA;
  const sectionRef = useRef<HTMLElement | null>(null);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 px-6 md:px-12 bg-white overflow-hidden border-b border-slate-100 select-none font-heading"
    >
      {/* Refined Philippine Flag Colors Low-Density Particle Texture */}
      <PhFlagParticleCanvas />

      {/* Subtle grid background texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] z-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.5) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-red-500/[0.03] blur-[130px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Eyebrow Badge, Headline, Subtext & CTAs */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 text-[#EE1C25] border border-red-100 text-xs font-black uppercase tracking-wider shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{hero.badge}</span>
          </motion.div>

          {/* Clean 2-Line Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.08] font-heading max-w-2xl"
          >
            Learn AI from the Philippines&apos; top startup{" "}
            <span className="text-[#EE1C25]">founders and leaders.</span>
          </motion.h1>

          {/* Streamlined Single-Sentence Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium max-w-xl"
          >
            Master practical AI engineering and product skills with hands-on mentorship built specifically for Philippine tech builders.
          </motion.p>

          {/* CTAs with Tightened Spacing and Baseline Alignment */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.38 }}
            className="pt-2 flex flex-wrap items-center gap-3.5"
          >
            <motion.a
              whileHover={{ scale: 1.03, translateY: -1 }}
              whileTap={{ scale: 0.97 }}
              href={hero.primaryCta.href}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#EE1C25] hover:bg-[#D3131B] text-white text-xs font-black uppercase tracking-wider rounded-full shadow-lg shadow-red-500/20 transition-all duration-200"
            >
              <span>{hero.primaryCta.text}</span>
              <ArrowRight className="w-4 h-4" />
            </motion.a>

            <motion.div whileHover={{ scale: 1.03, translateY: -1 }} whileTap={{ scale: 0.97 }}>
              <Link
                href={hero.secondaryCta.href}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-slate-950 hover:bg-slate-900 text-white text-xs font-black uppercase tracking-wider rounded-full transition-all duration-200 shadow-sm"
              >
                <span>{hero.secondaryCta.text}</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Column: "The Unfinished Loop" Centerpiece Component */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="lg:col-span-5 flex items-center justify-center relative py-4 lg:py-0"
        >
          <UnfinishedLoopLogo containerRef={sectionRef} />
        </motion.div>
      </div>
    </section>
  );
}


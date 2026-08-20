"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@ph/components/Header";
import Footer from "@ph/components/Footer";
import PhFlagParticleCanvas from "@ph/components/PhFlagParticleCanvas";
import { WORKSHOPS_DATA, getAllWorkshopCategories, WorkshopData } from "@ph/config/workshopsData";
import { ArrowRight, ChevronRight, Check, ArrowUpRight } from "lucide-react";

export default function WorkshopsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = getAllWorkshopCategories();

  const filteredWorkshops =
    selectedCategory === "All"
      ? WORKSHOPS_DATA
      : WORKSHOPS_DATA.filter((w) => w.category === selectedCategory);

  const featuredWorkshop = WORKSHOPS_DATA.find((w) => w.slug === "genai-101") || WORKSHOPS_DATA[0];
  const regularWorkshops = filteredWorkshops.filter((w) => selectedCategory !== "All" || w.id !== featuredWorkshop.id);

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#EE1C25] selection:text-white">
      <Header />

      {/* ================= 1. HERO SECTION (Asymmetric, Editorial Art-Direction) ================= */}
      <section className="relative py-16 sm:py-24 lg:py-28 px-6 md:px-12 bg-[#FAFBFD] border-b border-slate-200/80 overflow-hidden font-heading select-none">
        {/* Subtle Brand Particle Texture */}
        <PhFlagParticleCanvas />

        {/* Crisp Architectural Grid Line Texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(15,23,42,0.8) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.8) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Ambient Subtle Red Backdrop Accent */}
        <div className="absolute top-1/3 right-10 w-[500px] h-[500px] rounded-full bg-[#EE1C25]/[0.03] blur-[140px] pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left 7 Columns: Asymmetric Typography & Positioning */}
          <div className="lg:col-span-7 space-y-7 text-left">
            {/* Eyebrow Label with Thin Red Accent Line (No Pill/Sparkle) */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-[#EE1C25]"
            >
              <span className="w-6 h-[2px] bg-[#EE1C25]" />
              <span>THE AI SCHOOL PHILIPPINES</span>
            </motion.div>

            {/* Confident Headline (Single Consistent Slate Color, No Split Mid-Sentence Color) */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.02] font-heading max-w-2xl"
            >
              Practical AI workshops taught by active tech startup leaders.
            </motion.h1>

            {/* Subtitle Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium max-w-xl"
            >
              Intensive, project-driven workshops built for developers, business managers, government departments, and security teams in the Philippines.
            </motion.p>

            {/* Slim Horizontal Stat Bar with Vertical Dividers (No boxed stat cards) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-2 flex flex-wrap items-center gap-6 text-xs sm:text-sm font-bold text-slate-800 border-t border-slate-200/80 max-w-xl"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-[#EE1C25] font-black">12</span>
                <span>Specialized Tracks</span>
              </div>
              <span className="w-[1px] h-4 bg-slate-300 hidden sm:inline-block" />
              <div className="flex items-center gap-2">
                <span className="font-mono text-[#EE1C25] font-black">80%</span>
                <span>Hands-on Practice</span>
              </div>
              <span className="w-[1px] h-4 bg-slate-300 hidden sm:inline-block" />
              <div className="flex items-center gap-2">
                <span className="font-mono text-emerald-600 font-black">✓</span>
                <span>LinkedIn Credential</span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-2 flex flex-wrap items-center gap-4"
            >
              <a
                href="#workshops-grid"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#EE1C25] hover:bg-[#D3131B] text-white text-xs font-black uppercase tracking-wider rounded-full shadow-lg shadow-red-500/20 transition-all duration-200 hover:scale-[1.02]"
              >
                <span>Explore Workshops</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/919030906584"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black uppercase tracking-wider rounded-full transition-all duration-200 shadow-sm"
              >
                <span>Talk to Advisor</span>
              </a>
            </motion.div>
          </div>

          {/* Right 5 Columns: Editorial Flagship Card Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="lg:col-span-5"
          >
            <div className="bg-slate-900 text-white rounded-3xl p-7 sm:p-8 shadow-2xl border border-slate-800 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#EE1C25]" />

              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#EE1C25]">FLAGSHIP WORKSHOP</span>
                <span className="text-xs font-mono text-slate-400">6 HRS • ALL LEVELS</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black tracking-tight text-white font-heading">
                  GenAI 101: Foundation & Tools
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed font-medium">
                  Master Large Language Models, prompt architectures, ChatGPT, Claude 3.5, and automated document synthesis.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                <div className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Key Tools Mastered:</div>
                <div className="flex flex-wrap gap-1.5">
                  {["ChatGPT", "Claude 3.5", "Midjourney", "Perplexity", "ElevenLabs"].map((t, idx) => (
                    <span key={idx} className="bg-slate-800 text-slate-200 px-2.5 py-1 rounded-md font-mono text-[11px]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/ph/workshops/genai-101"
                  className="w-full py-3 bg-[#EE1C25] hover:bg-[#D3131B] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <span>View Full Curriculum</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= 2. WORKSHOP LISTING GRID SECTION ================= */}
      <section id="workshops-grid" className="py-16 sm:py-24 px-6 md:px-12 max-w-7xl mx-auto space-y-12 font-heading">
        {/* Header & Category Tab Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/80 pb-6">
          <div className="space-y-1">
            <span className="text-xs font-mono text-[#EE1C25] uppercase tracking-widest font-bold">DIRECTORY</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              All Workshop Programs
            </h2>
          </div>

          {/* Understated Category Tab Bar with Animated Active Indicator */}
          <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative px-4 py-2 text-xs font-bold transition-all duration-200 cursor-pointer ${
                    isActive ? "text-white" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="tabActiveIndicator"
                      className="absolute inset-0 bg-slate-900 rounded-xl shadow-xs"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Editorial Workshop Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {/* Show Featured wide card if "All" is selected */}
            {selectedCategory === "All" && (
              <motion.div
                key={featuredWorkshop.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="md:col-span-2 bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden group hover:border-[#EE1C25]/50 transition-colors"
              >
                <div className="absolute top-0 left-0 bottom-0 w-[4px] bg-[#EE1C25]" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span className="text-[#EE1C25] font-bold">01 / FEATURED PROGRAM</span>
                    <span>{featuredWorkshop.duration} • {featuredWorkshop.level}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white group-hover:text-[#EE1C25] transition-colors">
                    {featuredWorkshop.title}
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed max-w-xl font-medium">
                    {featuredWorkshop.overview}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-400">
                    {featuredWorkshop.tools.slice(0, 4).map((t, idx) => (
                      <span key={idx} className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md">
                        {t.name}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/ph/workshops/${featuredWorkshop.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#EE1C25] hover:text-white transition-colors shrink-0"
                  >
                    <span>Explore Workshop</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            )}

            {/* Regular Cards */}
            {regularWorkshops.map((ws, idx) => (
              <motion.div
                key={ws.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.03 }}
                className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between space-y-6 group relative overflow-hidden"
              >
                {/* Thin Category Border Line on Left */}
                <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-slate-200 group-hover:bg-[#EE1C25] transition-colors duration-300" />

                <div className="space-y-4">
                  {/* Category Prefix & Specs */}
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400 uppercase font-bold tracking-wider group-hover:text-[#EE1C25] transition-colors">
                      {ws.category}
                    </span>
                    <span className="text-slate-500 font-semibold">{ws.duration}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight leading-snug group-hover:text-[#EE1C25] transition-colors">
                    {ws.title}
                  </h3>

                  {/* Short Teaser Description */}
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3 font-medium">
                    {ws.shortDescription}
                  </p>
                </div>

                {/* Bottom Action Line */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono text-[11px]">{ws.level}</span>
                  <Link
                    href={`/ph/workshops/${ws.slug}`}
                    className="inline-flex items-center gap-1.5 font-extrabold text-slate-900 group-hover:text-[#EE1C25] transition-colors"
                  >
                    <span>View Curriculum</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ================= 3. TRUST & LEARNING PHILOSOPHY ================= */}
      <section className="py-20 bg-slate-900 text-white px-6 md:px-12 font-heading relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-mono text-[#EE1C25] uppercase tracking-widest font-bold">METHODOLOGY</span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Built for real production execution, not passive video lectures.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
              Every course is structured around live implementation. You code, prompt, debug, and publish real projects alongside active tech founders.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60 space-y-2">
              <div className="font-bold text-white text-sm">Active Founders</div>
              <p className="text-slate-400 leading-relaxed">Instructors are tech leads and CTOs building commercial AI products in the PH.</p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60 space-y-2">
              <div className="font-bold text-white text-sm">80% Live Coding & Labs</div>
              <p className="text-slate-400 leading-relaxed">Build prompt libraries, local RAG document engines, and deployed web applications.</p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60 space-y-2">
              <div className="font-bold text-white text-sm">LinkedIn Verification</div>
              <p className="text-slate-400 leading-relaxed">Earn digital certificates backed by The AI School PH & ecosystem partners.</p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60 space-y-2">
              <div className="font-bold text-white text-sm">30-Day Mentorship</div>
              <p className="text-slate-400 leading-relaxed">Access direct office hours with instructors after your cohort concludes.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

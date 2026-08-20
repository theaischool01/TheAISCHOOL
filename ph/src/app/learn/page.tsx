"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@ph/components/Header";
import Footer from "@ph/components/Footer";
import PhFlagParticleCanvas from "@ph/components/PhFlagParticleCanvas";
import { LEARN_CATEGORIES_DATA, LearnCategoryData } from "@ph/config/learnCategoriesData";
import { ArrowRight, ChevronRight, ArrowUpRight, BookOpen, Layers, Check } from "lucide-react";

export default function LearnLandingPage() {
  const [activeCategorySlug, setActiveCategorySlug] = useState<string>("gamer");

  const activeCategory =
    LEARN_CATEGORIES_DATA.find((c) => c.slug === activeCategorySlug) || LEARN_CATEGORIES_DATA[0];

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#EE1C25] selection:text-white">
      <Header />

      {/* ================= 1. HERO SECTION (Asymmetric, Editorial) ================= */}
      <section className="relative py-16 sm:py-24 lg:py-28 px-6 md:px-12 bg-[#FAFBFD] border-b border-slate-200/80 overflow-hidden font-heading select-none">
        <PhFlagParticleCanvas />

        {/* Crisp Grid Texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(15,23,42,0.8) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.8) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-7 text-left">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-[#EE1C25]"
            >
              <span className="w-6 h-[2px] bg-[#EE1C25]" />
              <span>THE AI SCHOOL LEARNING PATHWAYS</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.02] max-w-2xl"
            >
              Master AI engineering, algorithms, data, and autonomous systems.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium max-w-xl"
            >
              Explore 6 structured learning tracks designed for software developers, data analysts, security engineers, and corporate leaders.
            </motion.p>

            {/* Inline Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-2 flex flex-wrap items-center gap-6 text-xs sm:text-sm font-bold text-slate-800 border-t border-slate-200/80 max-w-xl"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-[#EE1C25] font-black">6</span>
                <span>Specialized Categories</span>
              </div>
              <span className="w-[1px] h-4 bg-slate-300 hidden sm:inline-block" />
              <div className="flex items-center gap-2">
                <span className="font-mono text-[#EE1C25] font-black">30+</span>
                <span>Modular Courses</span>
              </div>
              <span className="w-[1px] h-4 bg-slate-300 hidden sm:inline-block" />
              <div className="flex items-center gap-2">
                <span className="font-mono text-emerald-600 font-black">✓</span>
                <span>Verified Credentials</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-2 flex flex-wrap items-center gap-4"
            >
              <a
                href="#categories-explorer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#EE1C25] hover:bg-[#D3131B] text-white text-xs font-black uppercase tracking-wider rounded-full shadow-lg shadow-red-500/20 transition-all duration-200 hover:scale-[1.02]"
              >
                <span>Browse Categories</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* Right Column: Track Overview Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="lg:col-span-5"
          >
            <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-2xl border border-slate-800 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#EE1C25]" />

              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#EE1C25]">FEATURED TRACK</span>
                <span className="text-xs font-mono text-slate-400">FLAGSHIP PATHWAY</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black tracking-tight text-white font-heading">
                  GAMER AI Track
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed font-medium">
                  Generative AI, Prompt Engineering, Data Structures & Algorithms, Applied Data Science, Machine Learning, Deep Learning & Autonomous Agents.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs font-mono text-slate-300">
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Total Courses</span>
                  <span className="font-bold text-white">7 Modules</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Skill Level</span>
                  <span className="font-bold text-white">Beginner to Advanced</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/ph/gamer"
                  className="w-full py-3.5 bg-[#EE1C25] hover:bg-[#D3131B] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <span>Explore GAMER Track</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= 2. SPLIT CATEGORIES EXPLORER ================= */}
      <section id="categories-explorer" className="py-16 sm:py-24 px-6 md:px-12 max-w-7xl mx-auto space-y-12 font-heading">
        <div className="space-y-2">
          <span className="text-xs font-mono text-[#EE1C25] uppercase tracking-widest font-bold">EXPLORER</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Select a Learning Track
          </h2>
          <p className="text-slate-600 text-sm font-medium">
            Click any category on the left to reveal its complete course list and module topics.
          </p>
        </div>

        {/* Split Desktop Layout (Left: Category Cards, Right: Module Explorer) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 6 Animated Category Cards */}
          <div className="lg:col-span-5 space-y-4">
            {LEARN_CATEGORIES_DATA.map((cat) => {
              const isSelected = activeCategorySlug === cat.slug;
              return (
                <div
                  key={cat.id}
                  onClick={() => setActiveCategorySlug(cat.slug)}
                  className={`relative p-6 rounded-3xl border transition-all duration-300 cursor-pointer overflow-hidden group ${
                    isSelected
                      ? "bg-slate-900 text-white border-slate-800 shadow-xl"
                      : "bg-white text-slate-900 border-slate-200/90 hover:border-slate-400 shadow-xs"
                  }`}
                >
                  {/* Left Thin Accent Line */}
                  <div
                    className={`absolute top-0 left-0 bottom-0 w-[4px] transition-colors duration-300 ${
                      isSelected ? "bg-[#EE1C25]" : "bg-slate-200 group-hover:bg-[#EE1C25]"
                    }`}
                  />

                  <div className="space-y-3 relative z-10">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-mono font-bold uppercase tracking-wider ${isSelected ? "text-[#EE1C25]" : "text-slate-500"}`}>
                        {cat.coursesCount} COURSES INCLUDED
                      </span>

                      <span className={`text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full ${isSelected ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-600"}`}>
                        {cat.quickFacts.level}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold tracking-tight leading-snug">
                      {cat.name}
                    </h3>

                    <p className={`text-xs leading-relaxed font-medium line-clamp-2 ${isSelected ? "text-slate-300" : "text-slate-600"}`}>
                      {cat.shortTeaser}
                    </p>

                    <div className="pt-2 flex items-center justify-between text-xs font-bold">
                      <span className={isSelected ? "text-[#EE1C25]" : "text-slate-900 group-hover:text-[#EE1C25]"}>
                        {isSelected ? "Active Selection" : "Click to view courses"}
                      </span>
                      <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? "rotate-90 text-[#EE1C25]" : "group-hover:translate-x-1 text-slate-400"}`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Revealed Modules Panel */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory.slug}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-[#FAFBFD] border border-slate-200/90 rounded-3xl p-8 shadow-xs space-y-6 relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
                  <div>
                    <span className="text-xs font-mono text-[#EE1C25] font-bold uppercase tracking-wider">TRACK DETAILS</span>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">{activeCategory.name}</h3>
                  </div>

                  <Link
                    href={`/ph/learn/${activeCategory.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#EE1C25] hover:bg-[#D3131B] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-colors shadow-sm shrink-0"
                  >
                    <span>Full Curriculum</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <p className="text-slate-600 text-sm font-medium leading-relaxed">
                  {activeCategory.tagline}
                </p>

                {/* Quick Spec Chips */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono text-slate-700 pt-1">
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px] uppercase">Mode</span>
                    <span className="font-bold text-slate-900">{activeCategory.quickFacts.mode}</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px] uppercase">Level</span>
                    <span className="font-bold text-slate-900">{activeCategory.quickFacts.level}</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px] uppercase">Effort</span>
                    <span className="font-bold text-slate-900">{activeCategory.quickFacts.effort}</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px] uppercase">Projects</span>
                    <span className="font-bold text-slate-900">{activeCategory.quickFacts.guidedProjects}</span>
                  </div>
                </div>

                {/* Modules List */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-mono font-bold uppercase text-slate-400 block">INCLUDED COURSES & MODULES:</span>

                  <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                    {activeCategory.courses.map((course, idx) => (
                      <Link
                        key={idx}
                        href={course.url}
                        className="block bg-white border border-slate-200 hover:border-slate-400 rounded-2xl p-4 transition-all duration-200 shadow-2xs group"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono font-bold text-[#EE1C25]">0{idx + 1}</span>
                              <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#EE1C25] transition-colors leading-snug">
                                {course.name}
                              </h4>
                            </div>
                            {course.summary && (
                              <p className="text-xs text-slate-500 font-medium pl-6 leading-relaxed">
                                {course.summary}
                              </p>
                            )}
                          </div>

                          {course.duration && (
                            <span className="text-[11px] font-mono bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md shrink-0 font-semibold">
                              {course.duration}
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Verifiable Digital Certificate Issued</span>
                  <Link
                    href={`/ph/learn/${activeCategory.slug}`}
                    className="text-xs font-black uppercase text-[#EE1C25] hover:underline flex items-center gap-1"
                  >
                    <span>Explore Full Page →</span>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ================= 3. CLOSING CTA BANNER ================= */}
      <section className="py-20 bg-slate-950 text-white border-t border-slate-800 px-6 md:px-12 text-center font-heading">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight">
            Start Your <span className="text-[#EE1C25]">AI Learning Journey</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-medium">
            Join the Philippines&apos; top AI academy and learn directly from startup founders and active tech leads.
          </p>

          <div className="pt-4 flex items-center justify-center">
            <Link
              href="/ph/workshops"
              className="inline-flex items-center gap-2.5 px-9 py-4 bg-[#EE1C25] hover:bg-[#D3131B] text-white text-xs font-black uppercase tracking-wider rounded-full shadow-lg shadow-red-500/20 transition-all duration-200 hover:scale-105"
            >
              <span>View Upcoming Cohorts</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

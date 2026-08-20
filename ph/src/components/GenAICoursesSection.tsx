"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  BookOpen,
  Clock,
  CheckCircle2,
  ArrowRight,
  Code2,
  Sparkles,
  Bot,
  Brain,
  Zap,
} from "lucide-react";
import { PH_DATA } from "@ph/config/phData";

// Icon mapping per course slug
const COURSE_ICONS: Record<string, React.ReactNode> = {
  "ai-ready-developer": <Code2 className="w-5 h-5" />,
  "prompt-engineering": <Sparkles className="w-5 h-5" />,
  "build-your-own-ai-agent": <Bot className="w-5 h-5" />,
  genai101: <Brain className="w-5 h-5" />,
};

export default function GenAICoursesSection() {
  const { courses } = PH_DATA;
  const [activeFilter, setActiveFilter] = useState("All");

  const filterOptions = ["All", "Foundations", "Intermediate", "Advanced"];

  const filteredCourses = courses.filter((c) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Foundations") return c.level.toLowerCase().includes("beginner") || c.level.toLowerCase().includes("foundations") || c.level.toLowerCase().includes("all");
    if (activeFilter === "Intermediate") return c.level.toLowerCase().includes("intermediate");
    if (activeFilter === "Advanced") return c.level.toLowerCase().includes("advanced") || c.level.toLowerCase().includes("flagship") || c.level.toLowerCase().includes("specialist");
    return true;
  });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 24, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.45 },
    },
  };

  return (
    <section className="relative py-20 md:py-28 bg-white border-b border-slate-200/80 overflow-hidden font-heading select-none">
      {/* Background Decorative Ambient Glow & Texture */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-red-500/[0.02] blur-[160px] pointer-events-none rounded-full z-0" />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025] z-0"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(15, 23, 42, 0.4) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          {/* Eyebrow Label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 text-[#EE1C25] border border-red-100 text-xs font-bold uppercase tracking-wider shadow-2xs"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>CAREER-FOCUSED PROGRAMS</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-black text-[#101828] tracking-tight font-heading leading-[1.12]"
          >
            Improve Your Growth With Our <span className="text-[#EE1C25]">GenAI Courses</span>
          </motion.h2>

          {/* Supporting Copy */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#475467] text-base md:text-lg font-medium leading-relaxed max-w-2xl mx-auto"
          >
            Production-focused learning tracks built for developers, creators, and leaders in the Philippines.
          </motion.p>

          {/* Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.28 }}
            className="pt-2 flex flex-wrap items-center justify-center gap-2"
          >
            {filterOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setActiveFilter(opt)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  activeFilter === opt
                    ? "bg-[#101828] text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200/70"
                }`}
              >
                {opt}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Course Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7 items-stretch"
        >
          {filteredCourses.map((course) => (
            <motion.div
              key={course.id}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-white rounded-[24px] p-6 md:p-7 border border-[#E4E7EC] shadow-2xs hover:shadow-xl hover:shadow-red-500/10 hover:border-red-300 transition-all duration-300 flex flex-col justify-between h-full cursor-pointer overflow-hidden"
            >
              {/* Subtle Red Top Accent Line on Hover */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#EE1C25] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-[24px] origin-left" />

              <div className="space-y-5 flex-1 flex flex-col">
                {/* Top Meta Bar: Icon Accent + Duration & Level Pills */}
                <div className="flex items-center justify-between gap-2">
                  {/* Category Accent Icon */}
                  <div className="w-11 h-11 rounded-2xl bg-red-50 text-[#EE1C25] border border-red-100 flex items-center justify-center shadow-2xs group-hover:scale-110 group-hover:bg-[#EE1C25] group-hover:text-white transition-all duration-300">
                    {COURSE_ICONS[course.slug] || <Zap className="w-5 h-5" />}
                  </div>

                  {/* Level & Duration Badges */}
                  <div className="flex items-center gap-1.5 flex-wrap justify-end">
                    <span className="inline-flex items-center gap-1 bg-slate-100 text-[#101828] text-[11px] font-semibold px-2.5 py-1 rounded-full">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {course.duration}
                    </span>
                    <span className="bg-red-50 text-[#EE1C25] text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full border border-red-100/70">
                      {course.level}
                    </span>
                  </div>
                </div>

                {/* Course Title */}
                <div className="min-h-[52px] flex items-center">
                  <h3 className="text-xl md:text-[22px] font-bold text-[#101828] tracking-tight leading-snug group-hover:text-[#EE1C25] transition-colors duration-200">
                    {course.title}
                  </h3>
                </div>

                {/* Course Overview Description */}
                <p className="text-[#475467] text-xs md:text-sm leading-relaxed line-clamp-3 min-h-[58px]">
                  {course.overview}
                </p>

                {/* Key Learning Outcomes Checklist */}
                <div className="pt-4 border-t border-slate-100 flex-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                    WHAT YOU WILL MASTER:
                  </span>
                  <ul className="space-y-2.5 text-xs list-none p-0 m-0">
                    {course.takeaways.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#EE1C25] shrink-0 mt-0.5" />
                        <span className="text-slate-700 font-medium leading-snug line-clamp-1">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom CTA Button - Fixed Alignment */}
              <div className="pt-6 border-t border-slate-100/80 mt-6">
                <Link
                  href="/ph/learn"
                  className="w-full py-3 px-4 bg-[#101828] group-hover:bg-[#EE1C25] text-white text-xs font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm group-hover:shadow-md group-hover:shadow-red-500/20"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

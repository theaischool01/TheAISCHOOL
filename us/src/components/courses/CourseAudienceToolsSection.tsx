"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FullCourseData } from "@us/config/coursesData";
import { CheckCircle2, Cpu, Code, Database, Sparkles, Image as ImageIcon } from "lucide-react";

interface Props {
  course: FullCourseData;
}

export default function CourseAudienceToolsSection({ course }: Props) {
  const shouldReduceMotion = useReducedMotion();

  const toolIconList = [
    Cpu,
    Code,
    Database,
    Sparkles,
    ImageIcon,
  ];

  return (
    <section className="relative w-full bg-white py-16 lg:py-24 px-6 md:px-12 font-sans border-b border-neutral-100 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        {/* Section 5: Who Is This For */}
        <div className="space-y-8 max-w-4xl">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-4xl font-black text-[#171717] uppercase tracking-tight leading-tight">
              Next-level industry transformation with{" "}
              <span className="text-[#C1121C]">
                {course.whoIsThisFor.accentText}
              </span>
            </h2>
            <p className="text-sm sm:text-base font-semibold text-neutral-500 max-w-2xl leading-relaxed">
              {course.whoIsThisFor.subtext}
            </p>
          </div>

          {/* 2-Column Audience Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {course.whoIsThisFor.checklist.map((item, idx) => (
              <motion.div
                key={idx}
                initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 shadow-2xs"
              >
                <CheckCircle2 className="w-5 h-5 text-[#C1121C] fill-red-100 shrink-0" />
                <span className="text-sm font-extrabold text-[#171717] uppercase tracking-wide">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 6: Tools You Master */}
        <div className="space-y-8 pt-8 border-t border-neutral-100">
          <div className="text-center space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-[#171717] uppercase tracking-tight">
              {course.toolsHeading}
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-neutral-500">
              Industry-standard frameworks and GenAI platforms taught in hands-on labs
            </p>
          </div>

          {/* Tools Row with Grayscale-to-Color Hover Effect */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            {course.tools.map((tool, idx) => {
              const ToolIcon = toolIconList[idx % toolIconList.length];

              return (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-3 p-4 px-6 rounded-2xl bg-neutral-50 border border-neutral-200/80 hover:border-red-300 shadow-2xs group transition-all duration-200 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200/60 flex items-center justify-center shadow-2xs group-hover:border-red-200 transition-all">
                    <ToolIcon className="w-5 h-5 text-neutral-400 group-hover:text-[#C1121C] transition-colors" />
                  </div>
                  <div>
                    <span className="block text-sm font-extrabold text-neutral-600 group-hover:text-[#171717] transition-colors">
                      {tool.name}
                    </span>
                    <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                      {tool.type}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FullCourseData } from "@us/config/coursesData";
import { Award, ShieldCheck, CheckCircle2 } from "lucide-react";

interface Props {
  course: FullCourseData;
}

export default function CourseCertificateSection({ course }: Props) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative w-full bg-white py-16 lg:py-24 px-6 md:px-12 font-sans border-b border-neutral-100 overflow-hidden">
      {/* Decorative Ghost Background Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-500/5 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10 text-center flex flex-col items-center">
        <div className="space-y-3 max-w-3xl">
          <h2 className="text-2xl sm:text-4xl font-black text-[#171717] uppercase tracking-tight leading-tight">
            Earn your certification from industry leaders in{" "}
            <span className="text-[#C1121C]">
              {course.certificate.accentText}
            </span>
          </h2>
          <p className="text-sm sm:text-base font-semibold text-neutral-500">
            {course.certificate.subtext}
          </p>
        </div>

        {/* Large Certificate Preview Mockup Card Frame with Corner-Brackets */}
        <motion.div
          initial={shouldReduceMotion ? false : { scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative max-w-3xl w-full bg-gradient-to-br from-neutral-50 via-white to-red-50/20 border border-neutral-200 rounded-3xl p-8 sm:p-12 shadow-xl overflow-hidden group"
        >
          {/* 4 Decorative Corner-Brackets */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#C1121C] rounded-tl-sm pointer-events-none" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#C1121C] rounded-tr-sm pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#C1121C] rounded-bl-sm pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#C1121C] rounded-br-sm pointer-events-none" />

          <div className="relative z-10 space-y-8 flex flex-col items-center">
            {/* Ribbon Badge */}
            <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200 text-[#C1121C] flex items-center justify-center shadow-md">
              <Award className="w-8 h-8 text-[#C1121C]" />
            </div>

            <div className="space-y-2 text-center max-w-xl">
              <span className="text-xs font-black text-[#C1121C] uppercase tracking-widest block">
                OFFICIAL CERTIFICATE OF COMPLETION
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#171717] uppercase tracking-tight">
                {course.name}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-neutral-500">
                Issued by The AI School Inc. USA — Verified by tech startup founders & AI architects.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 border-t border-neutral-200/60 w-full text-xs font-bold text-neutral-600">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C1121C]" /> Industry Recognized
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#C1121C]" /> Shareable on LinkedIn & CV
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

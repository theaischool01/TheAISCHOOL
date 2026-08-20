"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";
import { PH_DATA } from "@ph/config/phData";

export default function QuoteBanner() {
  const { quoteBanner } = PH_DATA;
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scrollScale = useTransform(scrollYProgress, [0, 0.45, 0.9], [0.85, 1, 0.95]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.35, 0.85], [0.4, 1, 0.85]);

  const scale = shouldReduceMotion ? 1 : scrollScale;
  const opacity = shouldReduceMotion ? 1 : scrollOpacity;

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white py-20 lg:py-32 px-6 md:px-12 text-[#171717] overflow-hidden border-y border-neutral-100 select-none font-heading"
    >
      {/* Background Soft Blush & Dot-Grid Texture */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[380px] bg-red-500/5 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none z-0" />

      {/* Large Ghost Quotation Mark Watermark */}
      <motion.div
        animate={
          shouldReduceMotion
            ? false
            : {
                rotate: [180, 186, 174, 180],
                y: [0, -10, 10, 0],
              }
        }
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0"
      >
        <Quote className="w-64 h-64 sm:w-80 sm:h-80 md:w-[360px] md:h-[360px] text-[#C1121C]/[0.07]" />
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10 text-center flex flex-col items-center">
        <motion.div style={{ scale, opacity }} className="space-y-8 flex flex-col items-center">
          <blockquote className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.25] text-[#171717] max-w-5xl">
            "{quoteBanner.quote}"
          </blockquote>

          <div className="pt-2 flex items-center justify-center gap-4">
            <motion.span
              initial={shouldReduceMotion ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ originX: 1 }}
              className="h-[2px] w-12 sm:w-16 bg-[#C1121C]"
            />

            <span className="text-xs sm:text-sm font-black text-[#C1121C] uppercase tracking-[0.25em] whitespace-nowrap">
              {quoteBanner.subline}
            </span>

            <motion.span
              initial={shouldReduceMotion ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ originX: 0 }}
              className="h-[2px] w-12 sm:w-16 bg-[#C1121C]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

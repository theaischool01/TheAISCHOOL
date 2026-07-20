"use client";

import { useEffect, useState } from "react";
import {
  motion,
  type Transition,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import { ArrowRight, Users } from "lucide-react";

export default function AboutHero() {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (shouldReduceMotion) return;

    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } =
      currentTarget.getBoundingClientRect();

    const x =
      (clientX - left - width / 2) / (width / 2);

    const y =
      (clientY - top - height / 2) / (height / 2);

    setCoords({
      x: x * 10,
      y: y * 10,
    });
  };

  const handleMouseLeave = () => {
    setCoords({
      x: 0,
      y: 0,
    });
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [
          number,
          number,
          number,
          number
        ],
      },
    },
  };

  const floatTransition: Transition = shouldReduceMotion
    ? {}
    : {
        y: {
          duration: 3.5,
          repeat: Infinity,
          repeatType: "reverse" as const,
          ease: "easeInOut",
        },
      };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-screen bg-[#FCFCFD] text-slate-900 flex items-center justify-center pt-8 md:pt-12 lg:pt-16 pb-24 md:pb-32 lg:pb-36 overflow-visible border-b border-[#ECECEC]"
    >
      {/* Noise */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015] z-10 bg-repeat bg-center"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Ambient */}
      <div className="absolute inset-0 overflow-clip pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 72% 42%, rgba(238,28,37,0.07), rgba(238,28,37,0.025) 34%, transparent 62%), radial-gradient(ellipse at 24% 18%, rgba(238,28,37,0.045), transparent 44%), linear-gradient(180deg, rgba(255,255,255,0.95), rgba(252,252,253,1))",
          }}
        />
      </div>

      {/* Engineering Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.045]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(238,28,37,.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(238,28,37,.05) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 lg:gap-2 xl:gap-4 items-center">
        {/* Left Side */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-30 lg:col-span-6 flex flex-col items-start text-left space-y-6 md:space-y-8"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#EE1C25] animate-pulse" />

            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.18em] text-slate-500">
              INDIA&apos;S FIRST AI LEARNING ECOSYSTEM
            </span>
          </motion.div>

          {/* Heading */}
          <div className="space-y-4">
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.0] tracking-tight bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#64748B] bg-clip-text text-transparent pb-1"
            >
              Building India&apos;s Next
              <br />
              Generation of AI
              <br />
              Engineers.
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-[#EE1C25] font-black text-sm md:text-base tracking-[0.25em] uppercase"
            >
              Where Intelligence Meets Innovation.
            </motion.p>
          </div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="max-w-2xl text-slate-600 text-base md:text-lg leading-relaxed"
          >
            At The AI School, we don&apos;t just teach Artificial
            Intelligence. We empower students, professionals and
            startup founders to build real AI products, solve
            real-world problems and shape the future of
            technology.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#who-we-are"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#EE1C25] text-white font-black uppercase tracking-wide transition-all duration-300 hover:bg-[#D3131B] hover:shadow-[0_15px_35px_rgba(238,28,37,.35)]"
            >
              Explore Our Story

              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <a
              href="#leadership"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-900 font-black uppercase tracking-wide transition-all duration-300"
            >
              <Users className="w-4 h-4 text-slate-500" />

              Meet Our Leadership
            </a>
          </motion.div>
        </motion.div>

        {/* Right Side */}
        <div className="relative z-10 lg:col-span-6 flex justify-center lg:justify-end items-center lg:pl-8 xl:pl-12">
          {mounted && (
            <motion.div
              style={{
                x: coords.x,
                y: coords.y,
              }}
              animate={{
                y: shouldReduceMotion ? 0 : [0, -10, 0],
              }}
              transition={floatTransition}
              className="relative w-full max-w-[410px] md:max-w-[480px] lg:max-w-[540px] aspect-[3/2] flex items-center justify-center"
            >
              <div
                className="absolute inset-[-8%] pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(238,28,37,0.05), rgba(238,28,37,0.018) 42%, transparent 70%)",
                }}
              />

              {/* Hero Image */}
              <Image
                src="/assets/image2.png"
                alt="The AI School Infinity Logo"
                fill
                priority
                sizes="(max-width:768px) 100vw,
                       (max-width:1200px) 50vw,
                       540px"
                className="object-contain pointer-events-none select-none mix-blend-multiply [mask-image:radial-gradient(ellipse_at_center,black_58%,rgba(0,0,0,0.9)_76%,transparent_100%)]"
              />
            </motion.div>
          )}
        </div>
      </div>

      {/* Bottom Fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(252,252,253,0), rgba(252,252,253,1))",
        }}
      />
    </section>
  );
}

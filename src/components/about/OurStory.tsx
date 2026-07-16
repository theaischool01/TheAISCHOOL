"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Compass, Target, Globe } from "lucide-react";

export default function OurStory() {
  const shouldReduceMotion = useReducedMotion();

  // Motion variants for headers and content
  const textVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } 
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.98 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } 
    }
  };

  return (
    <section className="w-full bg-white text-neutral-900 py-16 relative select-none">
      
      {/* Chapter 01: Who We Are */}
      <div id="who-we-are" className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        <motion.div 
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="lg:col-span-7 space-y-6"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl md:text-4xl font-black font-heading text-[#EE1C25]/20">01</span>
            <span className="h-px w-8 bg-neutral-200" />
            <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-[#EE1C25]">Who We Are</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black font-heading tracking-tight leading-[1.1] text-neutral-900">
            Ecosystem Core of <span className="text-[#EE1C25]">The AI School</span>
          </h2>
          <p className="text-neutral-500 text-base md:text-lg leading-relaxed font-sans font-medium">
            At The AI School, we are driven by a singular vision: to create a future where the youth are empowered, startups thrive, and innovation flourishes. Through our comprehensive approach to skill development, startup support, and academic collaboration, we are committed to making a lasting impact on the lives of individuals and the world around us.
          </p>
        </motion.div>
        
        <motion.div 
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative w-full aspect-[4/3] max-w-[480px] bg-neutral-50 border border-neutral-100 rounded-3xl overflow-hidden p-3 shadow-lg">
            <Image 
              src="/assets/about_hero.png" 
              alt="Cybernetic network representation of The AI School" 
              fill
              sizes="480px"
              className="object-cover rounded-2xl pointer-events-none select-none"
            />
          </div>
        </motion.div>
      </div>

      {/* Thin elegant horizontal spacer divider */}
      <div className="max-w-7xl mx-auto my-16 px-6 md:px-12">
        <div className="h-px w-full bg-neutral-100" />
      </div>

      {/* Chapter 02: Our Mission */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        {/* Visual shape/graphic (Left on Chapter 02) */}
        <motion.div 
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="lg:col-span-5 lg:order-1 flex justify-center"
        >
          <div className="relative w-full aspect-[4/3] max-w-[480px] rounded-3xl bg-neutral-50 border border-neutral-150 overflow-hidden flex flex-col items-center justify-center p-8 shadow-sm">
            {/* Elegant Vector Tech Grid Illustration */}
            <div className="absolute inset-0 opacity-[0.03] bg-repeat bg-center" style={{ backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`, backgroundSize: "20px 20px" }} />
            <Target className="w-16 h-16 text-[#EE1C25]/85 mb-4 relative z-10" />
            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 font-sans z-10">INCUBATE & TRANSFORM</span>
          </div>
        </motion.div>

        {/* Copy text content (Right on Chapter 02) */}
        <motion.div 
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="lg:col-span-7 lg:order-2 space-y-6"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl md:text-4xl font-black font-heading text-[#EE1C25]/20">02</span>
            <span className="h-px w-8 bg-neutral-200" />
            <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-[#EE1C25]">Our Mission</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-black font-heading tracking-tight leading-[1.15] text-neutral-900">
            Our mission is to <span className="text-[#EE1C25] bg-red-50/50 px-2 py-0.5 rounded">drive innovation</span> and continuous improvement.
          </h2>
          <p className="text-neutral-500 text-base md:text-lg leading-relaxed font-sans font-medium">
            Our mission is to drive innovation and continuous improvement through comprehensive educational programs in association with global organizations, entrepreneurial support, and robust research commercialization services.
          </p>
        </motion.div>
      </div>

      {/* Thin elegant horizontal spacer divider */}
      <div className="max-w-7xl mx-auto my-16 px-6 md:px-12">
        <div className="h-px w-full bg-neutral-100" />
      </div>

      {/* Chapter 03: Our Commitment */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        {/* Copy text content (Left on Chapter 03) */}
        <motion.div 
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="lg:col-span-7 space-y-6"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl md:text-4xl font-black font-heading text-[#EE1C25]/20">03</span>
            <span className="h-px w-8 bg-neutral-200" />
            <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-[#EE1C25]">Our Commitment</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black font-heading tracking-tight leading-[1.1] text-neutral-900">
            Fostering a collaborative, lifelong learning ecosystem.
          </h2>
          <blockquote className="border-l-2 border-neutral-900 pl-6 my-4 italic text-neutral-600 text-base md:text-lg font-sans font-medium leading-relaxed">
            “Our commitment extends to fostering a collaborative ecosystem that encourages lifelong learning, cultivates creativity, and promotes sustainable growth by aligning our efforts with the needs of the digital age.”
          </blockquote>
        </motion.div>

        {/* Visual shape/graphic (Right on Chapter 03) */}
        <motion.div 
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative w-full aspect-[4/3] max-w-[480px] rounded-3xl bg-neutral-50 border border-neutral-150 overflow-hidden flex flex-col items-center justify-center p-8 shadow-sm">
            <div className="absolute inset-0 opacity-[0.03] bg-repeat bg-center" style={{ backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`, backgroundSize: "20px 20px" }} />
            <Compass className="w-16 h-16 text-neutral-800 mb-4 relative z-10 animate-spin-slow" />
            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 font-sans z-10">COLLABORATE & GROW</span>
          </div>
        </motion.div>
      </div>

    </section>
  );
}

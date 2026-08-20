"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, Headset, Sparkles } from "lucide-react";

export default function USContactBento() {
  const shouldReduceMotion = useReducedMotion();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        fullName: "",
        email: "",
        mobileNumber: "",
        message: "",
      });
    }, 800);
  };

  return (
    <section className="relative w-full bg-[#FAFAFA] py-16 lg:py-24 px-6 md:px-12 font-sans selection:bg-red-500 selection:text-white border-b border-neutral-100">
      <div className="max-w-5xl mx-auto space-y-10 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-3 flex flex-col items-center">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#C1121C] text-xs font-bold uppercase tracking-wider shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C1121C]" />
            <span>GET IN TOUCH</span>
          </motion.div>

          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-[#171717] uppercase tracking-tight text-center"
          >
            Contact <span className="text-[#C1121C]">The AI School</span>
          </motion.h1>
        </div>

        {/* Bento Grid: 1.4fr : 1fr on Desktop, Stacked on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-3.5 items-stretch">
          {/* TILE 1 — Large Form Tile (Left, Spans both rows) */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.2 : 0.45, delay: 0 }}
            className="relative bg-white border border-neutral-200/80 rounded-2xl p-6 sm:p-10 flex flex-col justify-between shadow-2xs overflow-hidden h-full lg:row-span-2 group"
          >
            {/* Background Ghost Element: Red Headset Outline */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? false
                  : {
                      y: [0, -6, 6, 0],
                    }
              }
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-10 -right-10 pointer-events-none select-none z-0 opacity-[0.06] text-[#C1121C]"
            >
              <Headset className="w-64 h-64 sm:w-80 sm:h-80 stroke-[1.2] fill-none" />
            </motion.div>

            <div className="relative z-10 space-y-6">
              {/* Tile Headline & Subtext */}
              <div className="space-y-1">
                <h2 className="text-2xl sm:text-3xl font-black text-[#171717] uppercase tracking-tight">
                  Talk to us
                </h2>
                <p className="text-xs sm:text-sm font-semibold text-neutral-500">
                  We reply within 24 hours, every time.
                </p>
              </div>

              {/* Form Submission Confirmation Alert */}
              {isSubmitted && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-[#C1121C] text-xs sm:text-sm font-bold flex items-center gap-2.5 animate-fadeIn">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>Message sent successfully! We will reply within 24 hours.</span>
                </div>
              )}

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="fullName" className="block text-xs font-extrabold text-[#171717] uppercase tracking-wider">
                    Full Name <span className="text-[#C1121C]">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full bg-neutral-50 border border-neutral-200/80 rounded-xl px-4 py-3 text-sm font-medium text-[#171717] placeholder-neutral-400 focus:bg-white focus:border-[#C1121C] focus:ring-1 focus:ring-[#C1121C] outline-none transition-all duration-150"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-xs font-extrabold text-[#171717] uppercase tracking-wider">
                    Email Address <span className="text-[#C1121C]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    className="w-full bg-neutral-50 border border-neutral-200/80 rounded-xl px-4 py-3 text-sm font-medium text-[#171717] placeholder-neutral-400 focus:bg-white focus:border-[#C1121C] focus:ring-1 focus:ring-[#C1121C] outline-none transition-all duration-150"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="mobileNumber" className="block text-xs font-extrabold text-[#171717] uppercase tracking-wider">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    id="mobileNumber"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-neutral-50 border border-neutral-200/80 rounded-xl px-4 py-3 text-sm font-medium text-[#171717] placeholder-neutral-400 focus:bg-white focus:border-[#C1121C] focus:ring-1 focus:ring-[#C1121C] outline-none transition-all duration-150"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="block text-xs font-extrabold text-[#171717] uppercase tracking-wider">
                    Message <span className="text-[#C1121C]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your goals..."
                    className="w-full bg-neutral-50 border border-neutral-200/80 rounded-xl px-4 py-3 text-sm font-medium text-[#171717] placeholder-neutral-400 focus:bg-white focus:border-[#C1121C] focus:ring-1 focus:ring-[#C1121C] outline-none transition-all duration-150 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#C1121C] hover:bg-[#a00e17] active:scale-[0.98] text-white font-extrabold uppercase tracking-wider rounded-xl py-3.5 px-6 shadow-md transition-all duration-150 text-sm sm:text-base mt-2 disabled:opacity-70 cursor-pointer"
                >
                  <span>{isSubmitting ? "Sending..." : "Send message"}</span>
                  <Send className="w-4 h-4 ml-1" />
                </button>
              </form>
            </div>
          </motion.div>

          {/* TILE 2 — Address Tile (Top Right) */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.2 : 0.45, delay: 0.08 }}
            className="relative bg-red-50/60 border border-red-100/90 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-4 shadow-2xs overflow-hidden hover:-translate-y-[2px] transition-transform duration-200 ease-out group"
          >
            {/* Background Ghost Element: Red MapPin Outline */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? false
                  : {
                      y: [0, -4, 4, 0],
                    }
              }
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-6 -right-6 pointer-events-none select-none z-0 opacity-[0.07] text-[#C1121C]"
            >
              <MapPin className="w-36 h-36 stroke-[1.2] fill-none" />
            </motion.div>

            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-white border border-red-200 text-[#C1121C] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                  <MapPin className="w-5 h-5 text-[#C1121C]" />
                </div>
                <span className="text-[10px] font-black text-[#C1121C] tracking-widest uppercase px-2.5 py-1 bg-red-100/80 rounded-full border border-red-200/60">
                  HQ
                </span>
              </div>

              <div className="space-y-1">
                <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                  Location
                </span>
                <p className="text-sm sm:text-base font-bold text-[#171717] leading-snug">
                  T-hub 2.0, Knowledge City, Hyderabad, Telangana
                </p>
              </div>
            </div>
          </motion.div>

          {/* TILE 3 — Email + Phone Tile (Bottom Right) */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.2 : 0.45, delay: 0.16 }}
            className="relative bg-white border border-neutral-200/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-2xs overflow-hidden hover:-translate-y-[2px] transition-transform duration-200 ease-out group"
          >
            {/* Background Ghost Element: Red Mail Outline */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? false
                  : {
                      y: [0, -4, 4, 0],
                    }
              }
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute -bottom-6 -right-6 pointer-events-none select-none z-0 opacity-[0.07] text-[#C1121C]"
            >
              <Mail className="w-36 h-36 stroke-[1.2] fill-none" />
            </motion.div>

            <div className="relative z-10 space-y-5">
              {/* Row 1: Email */}
              <a
                href="mailto:usa@theaischool.co"
                className="flex items-center gap-3.5 group/link text-[#171717] hover:text-[#C1121C] transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 text-[#C1121C] flex items-center justify-center shrink-0 group-hover/link:bg-red-100 transition-colors">
                  <Mail className="w-5 h-5 text-[#C1121C]" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                    Email Us
                  </span>
                  <span className="text-sm sm:text-base font-bold underline decoration-transparent group-hover/link:decoration-[#C1121C] transition-all">
                    usa@theaischool.co
                  </span>
                </div>
              </a>

              <div className="w-full h-[1px] bg-neutral-100" />

              {/* Row 2: Phone */}
              <a
                href="tel:+919000066547"
                className="flex items-center gap-3.5 group/link text-[#171717] hover:text-[#C1121C] transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 text-[#C1121C] flex items-center justify-center shrink-0 group-hover/link:bg-red-100 transition-colors">
                  <Phone className="w-5 h-5 text-[#C1121C]" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                    Call Us
                  </span>
                  <span className="text-sm sm:text-base font-bold underline decoration-transparent group-hover/link:decoration-[#C1121C] transition-all">
                    +91 90000 66547
                  </span>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Sparkles, User, Mail, Phone, Building, Send, CheckCircle2, ShieldCheck } from "lucide-react";

export default function CohortRegistrationSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const formItemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section id="register" className="relative py-24 md:py-32 bg-[#FAFBFD] border-t border-slate-200/80 overflow-hidden font-heading select-none">
      {/* Background Ambient Red Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-red-500/[0.025] blur-[160px] pointer-events-none rounded-full z-0" />
      
      {/* Faint Dot Grid Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025] z-0"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(15, 23, 42, 0.4) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Ghost Typography Watermark Element */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-[90px] sm:text-[140px] md:text-[180px] font-black uppercase text-slate-900/[0.018] tracking-widest pointer-events-none select-none z-0 whitespace-nowrap">
        COHORT
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="relative bg-gradient-to-b from-[#0F172A] via-[#101828] to-[#0A0F1D] text-white rounded-[32px] p-8 sm:p-12 md:p-14 shadow-2xl shadow-slate-950/20 border border-slate-800/80 space-y-10 overflow-hidden"
        >
          {/* Subtle Corner Ambient Glow inside Container */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-red-500/10 rounded-full blur-[100px] pointer-events-none z-0" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-red-500/5 rounded-full blur-[100px] pointer-events-none z-0" />

          {/* Top Edge Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#EE1C25] to-transparent" />

          {/* Header Area */}
          <div className="text-center space-y-3.5 max-w-xl mx-auto relative z-10">
            <motion.div
              variants={formItemVariants}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 text-[#EE1C25] border border-red-500/20 text-xs font-bold uppercase tracking-wider shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#EE1C25]" />
              <span>LIMITED COHORT SEATS</span>
            </motion.div>

            <motion.h2
              variants={formItemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-heading leading-tight"
            >
              Register for <span className="text-[#EE1C25]">Philippines Cohort</span>
            </motion.h2>

            <motion.p
              variants={formItemVariants}
              className="text-slate-400 text-sm md:text-base font-medium leading-relaxed"
            >
              Fill in your details below and our academic counseling team will get back to you within 24 hours.
            </motion.p>
          </div>

          {/* Form Area */}
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center space-y-4 bg-slate-900/60 rounded-2xl border border-emerald-500/30 p-8"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white">Application Received!</h3>
              <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                Thank you for registering. Our Philippine academic counselor will reach out to you via call or email within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="pt-2 text-xs font-bold text-[#EE1C25] hover:underline uppercase tracking-wider cursor-pointer"
              >
                Submit another response
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <motion.div variants={formItemVariants} className="space-y-2 text-left">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                    Full Name <span className="text-[#EE1C25]">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <User className="w-4 h-4 text-slate-500 absolute left-4 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Juan Dela Cruz"
                      required
                      className="w-full bg-slate-900/80 border border-slate-800 text-white placeholder-slate-500 text-sm font-medium rounded-2xl pl-11 pr-4 py-3.5 h-[56px] focus:outline-none focus:border-[#EE1C25] focus:ring-2 focus:ring-[#EE1C25]/20 transition-all duration-200"
                    />
                  </div>
                </motion.div>

                {/* Email Address */}
                <motion.div variants={formItemVariants} className="space-y-2 text-left">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                    Email Address <span className="text-[#EE1C25]">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-4 pointer-events-none" />
                    <input
                      type="email"
                      placeholder="juan@domain.com"
                      required
                      className="w-full bg-slate-900/80 border border-slate-800 text-white placeholder-slate-500 text-sm font-medium rounded-2xl pl-11 pr-4 py-3.5 h-[56px] focus:outline-none focus:border-[#EE1C25] focus:ring-2 focus:ring-[#EE1C25]/20 transition-all duration-200"
                    />
                  </div>
                </motion.div>

                {/* Mobile Number */}
                <motion.div variants={formItemVariants} className="space-y-2 text-left">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                    Mobile Number <span className="text-[#EE1C25]">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-4 pointer-events-none" />
                    <input
                      type="tel"
                      placeholder="+63 912 345 6789"
                      required
                      className="w-full bg-slate-900/80 border border-slate-800 text-white placeholder-slate-500 text-sm font-medium rounded-2xl pl-11 pr-4 py-3.5 h-[56px] focus:outline-none focus:border-[#EE1C25] focus:ring-2 focus:ring-[#EE1C25]/20 transition-all duration-200"
                    />
                  </div>
                </motion.div>

                {/* College / Organization Name */}
                <motion.div variants={formItemVariants} className="space-y-2 text-left">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                    College / Organization
                  </label>
                  <div className="relative flex items-center">
                    <Building className="w-4 h-4 text-slate-500 absolute left-4 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="De La Salle University / Tech Corp"
                      className="w-full bg-slate-900/80 border border-slate-800 text-white placeholder-slate-500 text-sm font-medium rounded-2xl pl-11 pr-4 py-3.5 h-[56px] focus:outline-none focus:border-[#EE1C25] focus:ring-2 focus:ring-[#EE1C25]/20 transition-all duration-200"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Submit CTA Button */}
              <motion.div variants={formItemVariants} className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="group w-full h-[58px] bg-[#EE1C25] hover:bg-[#D3131B] text-white text-xs sm:text-sm font-black uppercase tracking-wider rounded-2xl transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:scale-[1.008] active:scale-[0.99] cursor-pointer disabled:opacity-75"
                >
                  {loading ? (
                    <span>Submitting Application...</span>
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </motion.div>

              {/* Trust / Support Microcopy */}
              <motion.div
                variants={formItemVariants}
                className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 text-xs font-medium text-slate-400 border-t border-slate-800/60"
              >
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#EE1C25]" />
                  100% Confidential
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-700 hidden sm:inline-block" />
                <span>Response within 24 Hours</span>
                <span className="w-1 h-1 rounded-full bg-slate-700 hidden sm:inline-block" />
                <span>Direct Counselor Guidance</span>
              </motion.div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

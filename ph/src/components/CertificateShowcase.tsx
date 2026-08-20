"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Award, CheckCircle2, Shield, Share2, ExternalLink } from "lucide-react";

interface CertificateShowcaseProps {
  courseTitle: string;
  certificateTitle: string;
  skills: string[];
  description: string;
}

export default function CertificateShowcase({
  courseTitle,
  certificateTitle,
  skills,
  description,
}: CertificateShowcaseProps) {
  // 3D Tilt Motion Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
      {/* Left: 3D Tilt Certificate Card */}
      <div className="lg:col-span-7 perspective-1000">
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative bg-gradient-to-br from-slate-900 via-slate-950 to-black border-2 border-amber-500/30 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-amber-500/10 cursor-pointer overflow-hidden group"
        >
          {/* Ambient Gold Glow & Guilloche Patterns */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-[90px] pointer-events-none group-hover:bg-amber-500/20 transition-all duration-500" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-red-500/10 rounded-full blur-[90px] pointer-events-none" />

          {/* Certificate Header Stamp */}
          <div className="flex items-center justify-between border-b border-amber-500/20 pb-6 mb-8 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-amber-400">THE AI SCHOOL PH</h4>
                <p className="text-[11px] text-slate-400 font-mono">VERIFIED CREDENTIAL #PH-{Math.floor(100000 + Math.random() * 900000)}</p>
              </div>
            </div>

            <div className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-extrabold uppercase tracking-wider">
              OFFICIAL CERTIFICATE
            </div>
          </div>

          {/* Certificate Body */}
          <div className="space-y-4 relative z-10">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">This certifies that</p>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight underline decoration-amber-500/40 underline-offset-8">
              [ Your Full Name ]
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2">
              has successfully completed all requirements, practical lab projects, and assessment modules for
            </p>
            <h4 className="text-lg sm:text-xl font-extrabold text-amber-400 tracking-tight font-heading">
              {certificateTitle}
            </h4>
          </div>

          {/* Endorsed Skills Badges */}
          <div className="pt-8 border-t border-slate-800/80 mt-8 flex flex-wrap gap-2 relative z-10">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 text-xs font-semibold"
              >
                ✓ {skill}
              </span>
            ))}
          </div>

          {/* Bottom Seal & Signatures */}
          <div className="mt-8 pt-4 flex items-center justify-between text-xs text-slate-400 border-t border-amber-500/20 relative z-10 font-mono">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Verifiable on LinkedIn</span>
            </div>
            <div className="font-bold text-amber-400">The AI School Philippines</div>
          </div>
        </motion.div>
      </div>

      {/* Right: Value Proposition Bullets */}
      <div className="lg:col-span-5 space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-extrabold uppercase tracking-wider">
          <Award className="w-3.5 h-3.5" />
          <span>CAREER CREDENTIAL</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug font-heading">
          Stand Out to Employers with <span className="text-amber-400">Verified Proof</span>
        </h3>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          {description}
        </p>

        <div className="space-y-4 pt-2">
          <div className="flex items-start gap-3.5">
            <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/30">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-white">Direct LinkedIn Integration</h5>
              <p className="text-xs text-slate-400 leading-relaxed">1-click addition to your LinkedIn licenses & certifications section with cryptographic verification.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/30">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-white">Portfolio-Backed Projects</h5>
              <p className="text-xs text-slate-400 leading-relaxed">Includes direct links to your hands-on code repositories and deployed workshop projects.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/30">
              <ExternalLink className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-white">Endorsed by Tech Startup Leaders</h5>
              <p className="text-xs text-slate-400 leading-relaxed">Issued by active startup founders, CTOs, and AI leaders across the Philippines tech ecosystem.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

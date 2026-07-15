"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function USFooter() {
  return (
    <footer className="relative bg-gradient-to-b from-neutral-900 to-neutral-950 text-white pt-16 pb-12 overflow-hidden border-t border-neutral-800 font-heading">
      {/* Background Glow */}
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#EE1C25]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-12 border-b border-neutral-800">
        
        {/* Brand Column (5 columns) */}
        <div className="md:col-span-5 space-y-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tight text-white uppercase">
              THE <span className="text-[#EE1C25]">AI</span> SCHOOL
            </span>
          </div>
          <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
            USA's only school where startup Leaders teach AI skills. Join our community and accelerate your career.
          </p>
        </div>

        {/* Courses Column (3 columns) */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-xs font-black uppercase tracking-widest text-neutral-300">
            Programs
          </h4>
          <ul className="space-y-2 text-sm text-neutral-400">
            <li>
              <Link href="/courses/aim-it" className="hover:text-white transition-colors">
                AIM-IT
              </Link>
            </li>
            <li>
              <Link href="/courses/ai-ready-developer" className="hover:text-white transition-colors">
                AI Ready Developer
              </Link>
            </li>
            <li>
              <Link href="/courses/prompt-engineering-101" className="hover:text-white transition-colors">
                The Art & Science of Prompt Engineering
              </Link>
            </li>
            <li>
              <Link href="/courses/building-your-ai-agent-for-coders" className="hover:text-white transition-colors">
                Build Your Own AI Agent
              </Link>
            </li>
            <li>
              <Link href="/courses/gen-ai-101" className="hover:text-white transition-colors">
                Gen AI-101
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Column (4 columns) */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="text-xs font-black uppercase tracking-widest text-neutral-300">
            Get In Touch
          </h4>
          <ul className="space-y-3 text-sm text-neutral-400">
            <li className="flex items-start gap-3">
              <Mail className="w-4 h-4 mt-0.5 text-[#EE1C25]" />
              <a href="mailto:usa@theaischool.co" className="hover:text-white transition-colors">
                usa@theaischool.co
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-4 h-4 mt-0.5 text-[#EE1C25]" />
              <span>+91 90000 66547</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 mt-0.5 text-[#EE1C25] shrink-0" />
              <span>
                T-hub 2.0, Knowledge City, Hyderabad, Telangana, 500081
              </span>
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright Footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
        <p>&copy; {new Date().getFullYear()} The AI School. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-neutral-400 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-neutral-400 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

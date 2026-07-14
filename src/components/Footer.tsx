'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-neutral-950 text-white pt-16 pb-8 px-6 md:px-12 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* ================= PRIMARY LINKS COLUMNS MATRIX ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 pb-4">
          
          {/* Column 1: Brand Info & Social Network Array */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center space-x-2 mb-3">
              <Link href="/" className="hover:opacity-90 transition-opacity block relative w-[180px] h-10">
                <Image
                  src="/images/logo-footer.png"
                  alt="THE AI SCHOOL"
                  fill
                  sizes="180px"
                  className="object-contain"
                  priority
                />
              </Link>
            </div>
            <p className="text-sm text-neutral-400 font-medium leading-relaxed max-w-xs pt-1">
              India’s only school where startup Leaders teach AI skills.
            </p>
            
            <div className="flex items-center space-x-4 pt-2">
              <a href="https://www.linkedin.com/company/theaischool/" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/the_aischool/" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" window-target="new" y2="6.5"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@the-ai-school" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors" aria-label="YouTube">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163c-.272-1.022-1.074-1.824-2.096-2.097C19.548 3.5 12 3.5 12 3.5s-7.548 0-9.402.566C1.576 4.339.774 5.14.502 6.163 0 8.01 0 12 0 12s0 3.99.502 5.837c.272 1.022 1.074 1.824 2.096 2.097 1.854.566 9.402.566 9.402.566s7.548 0 9.402-.566c1.022-.273 1.824-1.075 2.096-2.097C24 15.99 24 12 24 12s0-3.99-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/people/Theaischool/61558962466200/" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H7v3h2v9h3v-9h3l.5-3H12V6c0-.88.39-1 1-1h2V2h-3c-2.76 0-3 1.76-3 3v3z"/>
                </svg>
              </a>
              <a href="https://x.com/TheAI_SCHOOL" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors font-bold text-lg font-mono">
                𝕏
              </a>
            </div>
          </div>

          {/* Column 2: Core Corporate Routing Paths */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-sm font-black tracking-wider uppercase text-white">Company</h4>
            <ul className="space-y-2.5 text-sm font-semibold text-neutral-400">
              <li><Link href="/about-us" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/career" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/blogs" className="hover:text-white transition-colors">Blogs</Link></li>
              <li><Link href="/login" className="hover:text-[#EE1C25] text-white transition-colors font-bold">Portal Login</Link></li>
              <li><a href="#register" className="hover:text-white transition-colors">Earn with us</a></li>
            </ul>
          </div>

          {/* Column 3: Specialized Sub-Course Anchors */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-sm font-black tracking-wider uppercase text-white">Our Courses</h4>
            <ul className="space-y-2.5 text-sm font-semibold text-neutral-300">
              <li><Link href="/courses/building-your-ai-agent-for-coders" className="hover:text-white transition-colors">Build Your AI Agent</Link></li>
              <li><Link href="/courses/data-analysis-with-ai-and-powerbi" className="hover:text-white transition-colors">Data Analysis & PowerBI</Link></li>
              <li><Link href="/courses/prompt-engineering-101" className="hover:text-white transition-colors">Prompt Engineering 101</Link></li>
              <li><Link href="/courses/advanced-ai-architectures-rag" className="hover:text-white transition-colors">Advanced RAG Systems</Link></li>
              <li><a href="#courses-section" className="text-xs text-neutral-500 hover:text-[#EE1C25] transition-colors block pt-1">View All Specialized Tracks →</a></li>
            </ul>
          </div>

          {/* Column 4: T-Hub Operations Information */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-sm font-black tracking-wider uppercase text-white">Contact Us</h4>
            <ul className="space-y-4 text-sm font-semibold text-neutral-300">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-[#EE1C25] shrink-0 mt-0.5" />
                <span className="leading-snug">T-hub 2.0, Knowledge City, Hyderabad, Telangana, 500081</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[#EE1C25] shrink-0" />
                <a href="mailto:support@theaischool.co" className="hover:text-white transition-colors truncate">
                  support@theaischool.co
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-[#EE1C25] shrink-0" />
                <a href="tel:+919030906584" className="hover:text-white transition-colors">
                  +91 90309 06584
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider Layer */}
        <div className="w-full h-px bg-neutral-800" />

        {/* ================= LOWER SUB-FOOTER RECTANGLE ================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-neutral-400">
          <div>
            © 2026 | All Rights Reserved
          </div>
          <div className="flex items-center space-x-4 md:space-x-6">
            <Link href="/terms-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <span>|</span>
            <Link href="/privacy-policies" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>|</span>
            <Link href="/refund" className="hover:text-white transition-colors">Refund Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

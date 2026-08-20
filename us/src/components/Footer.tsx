"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const companyLinks = [
    { name: "About Us", url: "/us/about-us" },
    { name: "Blogs", url: "/us/blogs" },
    { name: "Contact Us", url: "/us/contact-us" },
    { name: "Earn with us", url: "/us/contact-us" },
  ];

  const courseLinks = [
    { name: "AIM-IT", url: "/us/courses/aim-it" },
    { name: "AI Ready Developer", url: "/us/courses/ai-ready-developer" },
    { name: "The Art & Science of Prompt Engineering", url: "/us/courses/prompt-engineering" },
    { name: "Build Your Own AI Agent", url: "/us/courses/build-your-own-ai-agent" },
    { name: "Gen AI-101", url: "/us/courses/genai101" },
  ];

  return (
    <footer className="bg-[#F5F5F7] text-[#1A1A1A] pt-16 pb-12 border-t border-neutral-200 relative overflow-hidden font-sans">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Top Section: 4 Grid Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-200">
          
          {/* Column 1: Left Brand Column (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/us" className="inline-block">
              <Image
                src="/us/assets/logo.png"
                alt="The AI School USA Logo"
                width={200}
                height={55}
                className="h-10 sm:h-11 w-auto object-contain select-none"
                priority
              />
            </Link>
            
            <p className="text-sm text-[#4B5563] max-w-sm leading-relaxed font-medium">
              USA's only school where startup Leaders teach AI skills.
            </p>

            {/* 5 Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {/* 1. LinkedIn */}
              <a
                href="https://www.linkedin.com/company/theaischool/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-xl bg-white hover:bg-[#EE1C25] text-[#1A1A1A] hover:text-white border border-neutral-200 flex items-center justify-center transition-all duration-200 shadow-2xs hover:scale-105"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* 2. Instagram */}
              <a
                href="https://www.instagram.com/the_aischool/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-xl bg-white hover:bg-[#EE1C25] text-[#1A1A1A] hover:text-white border border-neutral-200 flex items-center justify-center transition-all duration-200 shadow-2xs hover:scale-105"
              >
                <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              {/* 3. YouTube */}
              <a
                href="https://www.youtube.com/@the-ai-school"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-xl bg-white hover:bg-[#EE1C25] text-[#1A1A1A] hover:text-white border border-neutral-200 flex items-center justify-center transition-all duration-200 shadow-2xs hover:scale-105"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163c-.272-1.022-1.074-1.824-2.096-2.097C19.548 3.5 12 3.5 12 3.5s-7.548 0-9.402.566C1.576 4.339.774 5.14.502 6.163 0 8.01 0 12 0 12s0 3.99.502 5.837c.272 1.022 1.074 1.824 2.096 2.097 1.854.566 9.402.566 9.402.566s7.548 0 9.402-.566c1.022-.273 1.824-1.075 2.096-2.097C24 15.99 24 12 24 12s0-3.99-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* 4. Facebook */}
              <a
                href="https://www.facebook.com/people/Theaischool/61558962466200/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-xl bg-white hover:bg-[#EE1C25] text-[#1A1A1A] hover:text-white border border-neutral-200 flex items-center justify-center transition-all duration-200 shadow-2xs hover:scale-105"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H7v3h2v9h3v-9h3l.5-3H12V6c0-.88.39-1 1-1h2V2h-3c-2.76 0-3 1.76-3 3v3z" />
                </svg>
              </a>

              {/* 5. X (Twitter) */}
              <a
                href="https://x.com/TheAI_SCHOOL"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="w-9 h-9 rounded-xl bg-white hover:bg-[#EE1C25] text-[#1A1A1A] hover:text-white border border-neutral-200 flex items-center justify-center transition-all duration-200 shadow-2xs hover:scale-105"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Company Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#1A1A1A]">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              {companyLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.url}
                    className="text-[#4B5563] hover:text-[#EE1C25] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Courses Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#1A1A1A]">
              Our Courses
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              {courseLinks.map((course, idx) => (
                <li key={idx}>
                  <Link
                    href={course.url}
                    className="text-[#4B5563] hover:text-[#EE1C25] transition-colors leading-relaxed block"
                  >
                    {course.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#1A1A1A]">
              Contact Us
            </h4>
            <div className="space-y-3 text-xs text-[#4B5563]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#EE1C25] shrink-0 mt-0.5" />
                <span className="leading-relaxed text-[#4B5563]">
                  T-hub 2.0, Knowledge City, Hyderabad, Telangana
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#EE1C25] shrink-0" />
                <a
                  href="mailto:usa@theaischool.co"
                  className="text-[#4B5563] hover:text-[#EE1C25] transition-colors"
                >
                  usa@theaischool.co
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#EE1C25] shrink-0" />
                <a
                  href="tel:+919000066547"
                  className="text-[#4B5563] hover:text-[#EE1C25] transition-colors"
                >
                  +91 9000066547
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B7280] font-medium">
          <p>© 2026 | All Rights Reserved</p>
          <div className="flex items-center gap-4">
            <Link href="/us/terms-conditions" className="hover:text-[#EE1C25] transition-colors">
              Terms &amp; Conditions
            </Link>
            <span className="text-neutral-300">|</span>
            <Link href="/us/privacy-policies" className="hover:text-[#EE1C25] transition-colors">
              Privacy Policy
            </Link>
            <span className="text-neutral-300">|</span>
            <Link href="/us/refund" className="hover:text-[#EE1C25] transition-colors">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

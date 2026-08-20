"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown, ChevronRight, Menu, X, ArrowUpRight } from "lucide-react";
import RegionFlagSwitcher from "@us/components/RegionFlagSwitcher";
import { COURSES_DATA } from "@us/config/coursesData";
import { setManualRegionPreference } from "@us/utils/geoRedirection";

export default function Header() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  // Active course selection for the Learn flyout menu (defaults to first course)
  const [activeCourseId, setActiveCourseId] = useState<string>(COURSES_DATA[0].id);

  // Mobile drawer states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileLearnOpen, setMobileLearnOpen] = useState(false);
  const [mobileActiveCourseId, setMobileActiveCourseId] = useState<string | null>(null);

  // Active course object for right column preview
  const currentCourse =
    COURSES_DATA.find((c) => c.id === activeCourseId) || COURSES_DATA[0];

  // Motion variants for module list stagger-fade
  const moduleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.025,
        delayChildren: 0.01,
      },
    },
  };

  const moduleItemVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 4 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.14, ease: "easeOut" as const },
    },
  };

  return (
    <>
      {/* 1. Top Announcement Bar */}
      <div className="w-full bg-[#C1121C] text-white py-2.5 px-4 sm:px-8 relative z-[1000] border-b border-white/5 font-sans">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold tracking-wide">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/company/theaischool/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/the_aischool/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4 fill-none stroke-white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@the-ai-school"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
              aria-label="YouTube"
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M23.498 6.163c-.272-1.022-1.074-1.824-2.096-2.097C19.548 3.5 12 3.5 12 3.5s-7.548 0-9.402.566C1.576 4.339.774 5.14.502 6.163 0 8.01 0 12 0 12s0 3.99.502 5.837c.272 1.022 1.074 1.824 2.096 2.097 1.854.566 9.402.566 9.402.566s7.548 0 9.402-.566c1.022-.273 1.824-1.075 2.096-2.097C24 15.99 24 12 24 12s0-3.99-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/people/Theaischool/61558962466200/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M9 8H7v3h2v9h3v-9h3l.5-3H12V6c0-.88.39-1 1-1h2V2h-3c-2.76 0-3 1.76-3 3v3z" />
              </svg>
            </a>
            <a
              href="https://x.com/TheAI_SCHOOL"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
              aria-label="X"
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>

          {/* Tagline */}
          <span className="text-center flex-1 text-xs font-semibold">
            USA's only school where startup Leaders teach AI skills.
          </span>

          <div className="hidden sm:block w-28" />
        </div>
      </div>

      {/* 2. Main Navigation Header */}
      <header className="sticky top-0 w-full bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-2xs z-[999] font-sans transition-all duration-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 sm:px-8 py-4 relative">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src="/us/assets/logo.png"
              alt="The AI School USA Logo"
              width={240}
              height={60}
              className="h-9 sm:h-11 md:h-12 w-auto object-contain select-none"
              priority
              unoptimized
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6 list-none m-0 p-0">
              {/* "Learn" Interactive Two-Panel Flyout Dropdown */}
              <li className="relative group/nav-item">
                <Link
                  href="/learn"
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-bold transition-colors rounded-lg cursor-pointer ${
                    pathname === "/learn"
                      ? "text-[#C1121C] font-black"
                      : "text-[#171717] hover:text-[#C1121C]"
                  }`}
                >
                  <span>Learn</span>
                  <ChevronDown className="w-4 h-4 group-hover/nav-item:rotate-180 transition-transform duration-200" />
                </Link>

                {/* Dropdown Container — Floating Soft Shadow & 16px Radius Facelift */}
                <div className="absolute top-[100%] left-0 pt-3 w-[840px] opacity-0 invisible group-hover/nav-item:opacity-100 group-hover/nav-item:visible transition-all duration-200 pointer-events-none group-hover/nav-item:pointer-events-auto">
                  <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.09)] border border-neutral-100 overflow-hidden grid grid-cols-[350px_1fr] min-h-[400px] relative">
                    
                    {/* Ghost Background Animation 1: Top-Left Faint Ring */}
                    <motion.div
                      animate={
                        shouldReduceMotion
                          ? false
                          : {
                              y: [0, 5, -5, 0],
                              x: [0, 3, -3, 0],
                            }
                      }
                      transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute -top-10 -left-10 w-28 h-28 rounded-full border border-[#C1121C]/[0.08] pointer-events-none select-none z-0"
                    />

                    {/* Ghost Background Animation 2: Mid-Right Faint Dot Grid */}
                    <motion.div
                      animate={
                        shouldReduceMotion
                          ? false
                          : {
                              opacity: [0.03, 0.06, 0.03],
                            }
                      }
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                      }}
                      className="absolute top-8 right-12 w-24 h-24 bg-[radial-gradient(#C1121C_1px,transparent_1px)] [background-size:12px_12px] opacity-[0.04] pointer-events-none select-none z-0"
                    />

                    {/* LEFT COLUMN: List of 5 Courses */}
                    <div className="p-5 sm:p-6 bg-white flex flex-col gap-1.5 border-r border-neutral-200/70 z-10">
                      {/* Red Dot Accent Column Header */}
                      <div className="flex items-center gap-2 px-3 py-1.5 mb-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C1121C] shrink-0" />
                        <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block">
                          COURSES &amp; PROGRAMS
                        </span>
                      </div>

                      {COURSES_DATA.map((course) => {
                        const isActive = activeCourseId === course.id;
                        return (
                          <Link
                            key={course.id}
                            href={`/courses/${course.slug}`}
                            onMouseEnter={() => setActiveCourseId(course.id)}
                            className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-left text-xs sm:text-sm transition-all duration-150 group/row relative overflow-hidden ${
                              isActive
                                ? "bg-[#C1121C] text-white font-extrabold shadow-sm border-l-4 border-red-900/90"
                                : "text-[#C1121C] font-bold hover:bg-red-50/60"
                            }`}
                          >
                            <span className="leading-snug pr-2">{course.name}</span>
                            <ChevronRight
                              className={`w-4 h-4 shrink-0 transition-all duration-150 ${
                                isActive
                                  ? "text-white scale-110 translate-x-1"
                                  : "text-[#C1121C]"
                              }`}
                            />
                          </Link>
                        );
                      })}
                    </div>

                    {/* RIGHT COLUMN: Modules List for Active Course */}
                    <div className="p-6 sm:p-7 bg-white relative overflow-hidden flex flex-col justify-between z-10">
                      <div>
                        {/* Red Dot Accent Column Header */}
                        <div className="flex items-center gap-2 mb-4">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C1121C] shrink-0" />
                          <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block">
                            CURRICULUM MODULES
                          </span>
                        </div>

                        {/* Staggered Module List Animation */}
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={currentCourse.id}
                            variants={moduleContainerVariants}
                            initial="hidden"
                            animate="visible"
                            exit={shouldReduceMotion ? undefined : { opacity: 0, x: -4 }}
                            className="space-y-2 relative z-10"
                          >
                            {currentCourse.modules.map((module) => (
                              <motion.div variants={moduleItemVariants} key={module.id}>
                                <Link
                                  href={`/courses/${currentCourse.slug}`}
                                  className="relative inline-block text-xs sm:text-sm font-semibold text-[#C1121C] leading-snug transition-colors py-0.5 group/mod"
                                >
                                  <span>{module.title}</span>
                                  <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-[#C1121C] group-hover/mod:w-full transition-all duration-200 ease-out" />
                                </Link>
                              </motion.div>
                            ))}
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      {/* Large Ghost "C" Graphic with Slow Ambient Breathing Motion */}
                      <motion.span
                        aria-hidden="true"
                        animate={
                          shouldReduceMotion
                            ? false
                            : {
                                scale: [1, 1.03, 1],
                                y: [0, -4, 0],
                              }
                        }
                        transition={{
                          duration: 9,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute -bottom-8 -right-2 text-[155px] font-black font-serif text-[#C1121C]/[0.05] pointer-events-none select-none z-0 leading-none origin-bottom-right"
                      >
                        C
                      </motion.span>
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <Link
                  href="/about-us"
                  className={`relative px-3 py-2 text-sm font-bold transition-colors ${
                    pathname === "/about-us"
                      ? "text-[#C1121C] font-black after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2.5px] after:bg-[#C1121C] after:rounded-full"
                      : "text-[#171717] hover:text-[#C1121C]"
                  }`}
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/blogs"
                  className={`relative px-3 py-2 text-sm font-bold transition-colors ${
                    pathname === "/blogs"
                      ? "text-[#C1121C] font-black after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2.5px] after:bg-[#C1121C] after:rounded-full"
                      : "text-[#171717] hover:text-[#C1121C]"
                  }`}
                >
                  Blogs
                </Link>
              </li>

              <li>
                <Link
                  href="/contact-us"
                  className={`relative px-3 py-2 text-sm font-bold transition-colors ${
                    pathname === "/contact-us"
                      ? "text-[#C1121C] font-black after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2.5px] after:bg-[#C1121C] after:rounded-full"
                      : "text-[#171717] hover:text-[#C1121C]"
                  }`}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>

          {/* Locale Flag Switcher & Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <RegionFlagSwitcher />

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#171717] hover:text-[#C1121C] focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden w-full bg-white border-t border-black/5 px-6 py-4 animate-in fade-in slide-in-from-top-4 duration-200 max-h-[75vh] overflow-y-auto">
            <ul className="flex flex-col list-none m-0 p-0">
              <li>
                <button
                  onClick={() => setMobileLearnOpen(!mobileLearnOpen)}
                  className="flex items-center justify-between w-full font-bold text-[#171717] py-3 text-left border-b border-neutral-100"
                >
                  <span>Learn</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      mobileLearnOpen ? "rotate-180 text-[#C1121C]" : "text-neutral-400"
                    }`}
                  />
                </button>
                {/* Mobile Accordion for 5 Courses */}
                {mobileLearnOpen && (
                  <div className="flex flex-col gap-1 pl-3 border-l-2 border-neutral-100 my-2">
                    {COURSES_DATA.map((course) => {
                      const isCourseOpen = mobileActiveCourseId === course.id;
                      return (
                        <div key={course.id} className="py-1">
                          <button
                            onClick={() =>
                              setMobileActiveCourseId(isCourseOpen ? null : course.id)
                            }
                            className="flex items-center justify-between w-full text-xs font-bold text-[#C1121C] py-2 text-left hover:underline"
                          >
                            <span>{course.name}</span>
                            <ChevronDown
                              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                isCourseOpen ? "rotate-180 text-[#C1121C]" : "text-neutral-400"
                              }`}
                            />
                          </button>

                          {/* Mobile Inline Modules */}
                          {isCourseOpen && (
                            <div className="flex flex-col gap-1.5 pl-3 mt-1 pb-2 border-l border-red-100">
                              {course.modules.map((mod) => (
                                <Link
                                  key={mod.id}
                                  href={`/courses/${course.slug}`}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="text-xs text-[#C1121C] hover:underline py-0.5 block leading-relaxed"
                                >
                                  {mod.title}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </li>

              <li>
                <Link
                  href="/about-us"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block font-bold py-3 border-b border-neutral-100 ${
                    pathname === "/about-us" ? "text-[#C1121C] font-black" : "text-[#171717]"
                  }`}
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/blogs"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block font-bold py-3 border-b border-neutral-100 ${
                    pathname === "/blogs" ? "text-[#C1121C] font-black" : "text-[#171717]"
                  }`}
                >
                  Blogs
                </Link>
              </li>

              <li>
                <Link
                  href="/contact-us"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block font-bold py-3 ${
                    pathname === "/contact-us" ? "text-[#C1121C] font-black" : "text-[#171717]"
                  }`}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
}

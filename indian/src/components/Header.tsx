"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  ChevronDown, 
  Menu, 
  X, 
  ChevronRight
} from "lucide-react";
import RegionFlagSwitcher from "./RegionFlagSwitcher";
import { useRegion } from "@in/context/RegionContext";

// Comprehensive Structured Indian Course Catalog
const CATEGORIES = [
  {
    id: "agents",
    name: "AI Agents & Autonomous Systems",
    courses: [
      { name: "Building & Deploying AI Agents", url: "/in/courses/building-and-deploying-ai-agents" },
      { name: "AI Agent Chatbot Creation", url: "/in/courses/ai-agent-chatbot-creation" },
      { name: "Building Your AI Agent for Coders", url: "/in/courses/building-your-ai-agent-for-coders" },
    ]
  },
  {
    id: "leadership",
    name: "AI for Leaders & Founders",
    courses: [
      { name: "AIM-IT: AI Management & Implementation", url: "/in/courses/aim-it" },
      { name: "Generative AI for Leaders", url: "/in/courses/genai-for-leaders" },
      { name: "Generative AI for Finance Professionals", url: "/in/courses/genai-for-finance-professionals" },
    ]
  },
  {
    id: "engineering",
    name: "Prompt & Model Engineering",
    courses: [
      { name: "Prompt Engineering Bootcamp", url: "/in/courses/prompt-engineering" },
      { name: "AI Ready Developer Course", url: "/in/courses/ai-ready-developer" },
      { name: "Generative AI for Beginners", url: "/in/courses/generative-ai-for-beginners" },
    ]
  },
  {
    id: "creative",
    name: "Creative & Enterprise AI",
    courses: [
      { name: "Generative AI Masterclass", url: "/in/courses/genai-masterclass" },
      { name: "Creative AI & Design Systems", url: "/in/courses/genai-101" },
    ]
  }
];

interface HeaderProps {
  theme?: "light" | "dark";
}

export default function Header({ theme = "light" }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("agents");
  const [mobileLearnOpen, setMobileLearnOpen] = useState(false);
  const [mobileActiveCategory, setMobileActiveCategory] = useState<string | null>("agents");
  
  const pathname = usePathname();
  const { regionConfig } = useRegion();

  const activeCourses = CATEGORIES.find(c => c.id === activeCategory)?.courses || [];

  const isDark = theme === "dark";

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-colors duration-700 border-b backdrop-blur-md ${
          isDark
            ? "bg-[#110204]/95 border-white/10 text-white"
            : "bg-white/95 border-black/5 text-[#171717]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          {/* Logo Section */}
          <a href="/in" className="flex items-center gap-2 group cursor-pointer">
            <div className="relative w-36 h-10 transition-transform duration-200 group-hover:scale-105">
              <Image
                src={regionConfig.assets.logo}
                alt={`${regionConfig.name} - The AI School Logo`}
                fill
                priority
                className={`object-contain transition-all duration-700 ${
                  isDark ? "brightness-0 invert" : ""
                }`}
              />
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8 list-none m-0 p-0">
              {/* Mega Dropdown for 'Learn' */}
              <li className="relative group/nav-item py-4">
                <a 
                  href="/in/learn" 
                  className={`flex items-center gap-1.5 text-sm font-bold transition-colors cursor-pointer ${
                    isDark
                      ? "text-white/90 hover:text-white"
                      : pathname.includes("/learn") || pathname.includes("/courses/")
                      ? "text-[#C1121C]"
                      : "text-[#171717] hover:text-[#C1121C]"
                  }`}
                >
                  Learn{" "}
                  <ChevronDown
                    className={`w-4 h-4 group-hover/nav-item:rotate-180 transition-transform duration-200 ${
                      isDark ? "text-white/70" : ""
                    }`}
                  />
                  {(pathname.includes("/learn") || pathname.includes("/courses/")) && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#C1121C] rounded-full" />
                  )}
                </a>

                {/* Mega Dropdown Menu */}
                <div className="absolute top-[100%] left-1/2 -translate-x-1/2 pt-4 w-[95vw] max-w-5xl opacity-0 invisible group-hover/nav-item:opacity-100 group-hover/nav-item:visible transition-all duration-300 pointer-events-none group-hover/nav-item:pointer-events-auto">
                  <div
                    className={`rounded-xl shadow-2xl border overflow-hidden grid grid-cols-[300px_1fr] min-h-[460px] ${
                      isDark
                        ? "bg-[#180407] border-white/10 text-white"
                        : "bg-white border-black/5 text-[#171717]"
                    }`}
                  >
                    {/* Left Sidebar */}
                    <div
                      className={`p-5 flex flex-col gap-1 border-r ${
                        isDark
                          ? "bg-[#130305] border-white/10"
                          : "bg-neutral-50 border-black/5"
                      }`}
                    >
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat.id}
                          onMouseEnter={() => setActiveCategory(cat.id)}
                          className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-left text-sm font-bold transition-all duration-150 ${
                            activeCategory === cat.id
                              ? "bg-[#C1121C] text-white"
                              : isDark
                              ? "text-white/80 hover:bg-white/5"
                              : "text-[#171717] hover:bg-neutral-100"
                          }`}
                        >
                          <span>{cat.name}</span>
                          <ChevronRight className="w-4 h-4 opacity-70" />
                        </button>
                      ))}
                    </div>

                    {/* Right Course Grid */}
                    <div
                      className={`p-8 max-h-[520px] overflow-y-auto ${
                        isDark ? "bg-[#180407]" : "bg-white"
                      }`}
                    >
                      <div className="grid grid-cols-2 gap-4">
                        {activeCourses.map((course, idx) => (
                          <a
                            key={idx}
                            href={course.url}
                            className={`p-4 rounded-lg border-l-3 border-transparent hover:border-[#C1121C] text-sm font-medium transition-all duration-200 shadow-sm ${
                              isDark
                                ? "bg-white/[0.04] hover:bg-white/[0.08] text-white/90 hover:text-white"
                                : "bg-neutral-50 hover:bg-red-50/40 text-[#171717] hover:text-[#C1121C]"
                            }`}
                          >
                            {course.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              {regionConfig.navigation.map((nav, idx) => {
                if (nav.url.endsWith("/learn")) return null;
                const isActive =
                  pathname === nav.url ||
                  (nav.url !== "/" && pathname.startsWith(nav.url));
                return (
                  <li key={idx}>
                    <a
                      href={nav.url}
                      className={`px-3 py-2 text-sm font-bold transition-colors relative block ${
                        isDark
                          ? isActive
                            ? "text-[#EE1C25]"
                            : "text-white/90 hover:text-white"
                          : isActive
                          ? "text-[#C1121C]"
                          : "text-[#171717] hover:text-[#C1121C]"
                      }`}
                    >
                      {nav.name}
                      {isActive && (
                        <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#C1121C] rounded-full" />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Flags and Mobile toggler */}
          <div className="flex items-center gap-5">
            <RegionFlagSwitcher />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                isDark
                  ? "text-white hover:bg-white/10"
                  : "text-[#171717] hover:bg-neutral-50"
              }`}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden w-full border-t px-6 py-4 animate-in fade-in slide-in-from-top-4 duration-200 max-h-[75vh] overflow-y-auto ${
              isDark
                ? "bg-[#180407] border-white/10 text-white"
                : "bg-white border-black/5 text-[#171717]"
            }`}
          >
            <ul className="flex flex-col list-none m-0 p-0">
              <li>
                <button
                  onClick={() => setMobileLearnOpen(!mobileLearnOpen)}
                  className={`flex items-center justify-between w-full font-bold py-3 text-left border-b ${
                    isDark ? "border-white/10 text-white" : "border-neutral-100 text-[#171717]"
                  }`}
                >
                  <span>Learn</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      mobileLearnOpen
                        ? "rotate-180 text-[#C1121C]"
                        : isDark
                        ? "text-white/50"
                        : "text-neutral-400"
                    }`}
                  />
                </button>
                {mobileLearnOpen && (
                  <div
                    className={`flex flex-col gap-1 pl-3 border-l-2 my-2 ${
                      isDark ? "border-white/10" : "border-neutral-100"
                    }`}
                  >
                    {CATEGORIES.map((cat) => {
                      const isCatOpen = mobileActiveCategory === cat.id;
                      return (
                        <div key={cat.id} className="py-1">
                          <button
                            onClick={() =>
                              setMobileActiveCategory(isCatOpen ? null : cat.id)
                            }
                            className={`flex items-center justify-between w-full text-xs font-bold py-2 text-left hover:text-[#C1121C] ${
                              isDark ? "text-white/80" : "text-neutral-700"
                            }`}
                          >
                            <span>{cat.name}</span>
                            <ChevronDown
                              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                isCatOpen
                                  ? "rotate-180 text-[#C1121C]"
                                  : isDark
                                  ? "text-white/50"
                                  : "text-neutral-400"
                              }`}
                            />
                          </button>
                          {isCatOpen && (
                            <div className="flex flex-col gap-2 pl-3 mt-1 pb-2 border-l border-red-500/40">
                              {cat.courses.map((course, idx) => (
                                <a
                                  key={idx}
                                  href={course.url}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className={`text-xs py-1 block transition-colors leading-relaxed ${
                                    isDark
                                      ? "text-white/60 hover:text-[#EE1C25]"
                                      : "text-neutral-500 hover:text-[#C1121C]"
                                  }`}
                                >
                                  {course.name}
                                </a>
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
                <a
                  href="/in/about-us"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block font-bold py-3 border-b ${
                    isDark ? "border-white/10 text-white" : "border-neutral-100 text-[#171717]"
                  }`}
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/in/blogs"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block font-bold py-3 border-b ${
                    isDark ? "border-white/10 text-white" : "border-neutral-100 text-[#171717]"
                  }`}
                >
                  Blogs
                </a>
              </li>
              <li>
                <a
                  href="/in/contact-us"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block font-bold py-3 ${
                    isDark ? "text-white" : "text-[#171717]"
                  }`}
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
}

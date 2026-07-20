"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { useRegion } from "@/context/RegionContext";
import { REGIONS } from "@/config/regions";
import { getSupportedRegions } from "@/lib/region";

interface Course {
  name: string;
  url: string;
}

interface Category {
  id: string;
  name: string;
  courses: Course[];
}

const CATEGORIES: Category[] = [
  {
    id: "ai-internship",
    name: "AI Virtual Internship",
    courses: [
      { name: "Building Your AI Agent (For Coders)", url: "/courses/building-your-ai-agent-for-coders" },
      { name: "Data Analysis with AI and PowerBI (For All)", url: "/courses/data-analysis-with-ai-and-powerbi" },
      { name: "Building & Deploying AI Agents (No-Code – For All)", url: "/courses/building-and-deploying-ai-agents" },
      { name: "No-Code AI Web Development (For All)", url: "/courses/no-code-ai-web-development" },
      { name: "AI Cloud Engineer (For All)", url: "/courses/ai-cloud-engineer" },
      { name: "AI Agent Chatbot Creation (For All)", url: "/courses/ai-agent-chatbot-creation" },
      { name: "Python for Data Analytics (For Coders)", url: "/courses/python-for-data-analytics" },
      { name: "Mobile App Development (For Coders)", url: "/courses/mobile-app-development" },
      { name: "Digital Marketing & Lead Generation (For All)", url: "/courses/digital-marketing-and-lead-generation" },
      { name: "Cyber Security with AI (For All)", url: "/courses/cyber-security-with-ai" },
    ],
  },
  {
    id: "prompt-eng",
    name: "Prompt engineering 101",
    courses: [
      { name: "AI to GenAI", url: "/courses/ai-to-genai" },
      { name: "Understanding Prompt Engineering", url: "/courses/understanding-prompt-engineering" },
      { name: "Core Prompt Engineering Techniques", url: "/courses/core-prompt-engineering-techniques" },
      { name: "Prompt Engineering for Academic Subjects", url: "/courses/prompt-engineering-for-academic-subjects" },
      { name: "Various AI tool and Prompts", url: "/courses/various-ai-tool-and-prompts" },
      { name: "Advanced Prompt Engineering Techniques", url: "/courses/advanced-prompt-engineering-techniques" },
      { name: "Ethical Considerations and the Future of Prompt Engineer", url: "/courses/ethical-considerations-and-the-future-of-prompt-engineer" },
    ],
  },
  {
    id: "gamer",
    name: "GAMER",
    courses: [
      { name: "Essentials: Generative AI, Prompt Engineering & ChatGPT", url: "/courses/essentials-generative-ai-prompt-engineering-and-chatgpt" },
      { name: "Programming Refreshers – Python", url: "/courses/programming-refreshers-python" },
      { name: "Data Structure and Algorithms with Python", url: "/courses/data-structure-and-algorithms-with-python" },
      { name: "Applied Data Science with Python", url: "/courses/applied-data-science-with-python" },
      { name: "Machine Learning", url: "/courses/machine-learning" },
      { name: "Deep Learning", url: "/courses/deep-learning" },
      { name: "Build Your Own Agent", url: "/courses/build-your-own-agent" },
    ],
  },
  {
    id: "build-agent",
    name: "Build Your Own Agent",
    courses: [
      { name: "Foundations of Large Language Models (LLMs)", url: "/courses/foundations-of-large-language-models" },
      { name: "Setting Up Your Development Environment", url: "/courses/setting-up-your-development-environment" },
      { name: "Core Concepts of LLM", url: "/courses/core-concepts-of-llm" },
      { name: "Introduction to Intelligent Agents", url: "/courses/introduction-to-intelligent-agents" },
      { name: "Building Basic LLM Agents", url: "/courses/building-basic-llm-agents" },
      { name: "Advanced Agent Features", url: "/courses/advanced-agent-features" },
      { name: "Integrating Agents with APIs", url: "/courses/integrating-agents-with-apis" },
      { name: "Reinforcement Learning for Agents", url: "/courses/reinforcement-learning-for-agents" },
      { name: "AI Agents Market", url: "/courses/ai-agents-market" },
    ],
  },
  {
    id: "python-prog",
    name: "Python & Programming",
    courses: [
      { name: "Python Powerhouse Gen AI From Basics to Advanced Programming", url: "/courses/python-powerhouse-gen-ai" },
      { name: "Mastering Time Series Analysis and Forecasting with Python", url: "/courses/mastering-time-series-analysis-and-forecasting" },
      { name: "Data Diving: A Beginner's Guide to Data bricks", url: "/courses/data-diving-beginners-guide-to-databricks" },
      { name: "Advanced DataBricks – Data Warehouse Performance Optimization", url: "/courses/advanced-databricks-performance-optimization" },
    ],
  },
  {
    id: "data-science",
    name: "Data Science and Analytics",
    courses: [
      { name: "Power BI and AI Integration for Building Intelligent Dashboards", url: "/courses/power-bi-and-ai-integration" },
      { name: "Applied Statistics Real World Problem Solving", url: "/courses/applied-statistics-real-world-problem-solving" },
      { name: "SQL for Data Engineers Designing and Building Data Pipelines", url: "/courses/sql-for-data-engineers" },
      { name: "UCI Data Preprocessing and Exploratory Data Analysis", url: "/courses/uci-data-preprocessing-and-eda" },
    ],
  },
  {
    id: "tools-tech",
    name: "Tools & Technologies",
    courses: [
      { name: "Docker", url: "/courses/docker" },
      { name: "AWS-Security", url: "/courses/aws-security" },
      { name: "Unit Testing", url: "/courses/unit-testing" },
    ],
  },
  {
    id: "business-prof",
    name: "Business & Professional",
    courses: [
      { name: "Advanced Excel Techniques for Professionals", url: "/courses/advanced-excel-techniques-for-professionals" },
      { name: "Mastering Aptitude: A Comprehensive Guide to Problem Solving", url: "/courses/mastering-aptitude-comprehensive-guide" },
      { name: "Professional Business Strategy Managing Organisational Value", url: "/courses/professional-business-strategy" },
    ],
  },
];

export default function Header() {
  const { currentRegion, regionConfig, setRegion } = useRegion();
  const pathname = usePathname();
  const [activeCategory, setActiveCategory] = useState("ai-internship");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileLearnOpen, setMobileLearnOpen] = useState(false);
  const [mobileActiveCategory, setMobileActiveCategory] = useState<string | null>(null);

  const activeCourses = CATEGORIES.find((c) => c.id === activeCategory)?.courses || [];

  const handleRegionChange = (code: string) => {
    document.cookie = `preferred_region=${code}; path=/; max-age=31536000; SameSite=Lax`;
    setRegion(code);
    const targetRegion = REGIONS[code];
    if (targetRegion) {
      window.location.href = targetRegion.path;
    }
  };

  return (
    <>
      {/* Announcement Bar with Social Links */}
      <div className="w-full bg-[#C1121C] text-white py-2.5 px-8 relative z-[1000] border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold tracking-wide">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a href="https://www.linkedin.com/company/theaischool/" target="_blank" rel="noopener noreferrer" className="hover:scale-115 transition-transform" aria-label="LinkedIn">
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/the_aischool/" target="_blank" rel="noopener noreferrer" className="hover:scale-115 transition-transform" aria-label="Instagram">
              <svg className="w-4 h-4 fill-none stroke-white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
            <a href="https://www.youtube.com/@the-ai-school" target="_blank" rel="noopener noreferrer" className="hover:scale-115 transition-transform" aria-label="YouTube">
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M23.498 6.163c-.272-1.022-1.074-1.824-2.096-2.097C19.548 3.5 12 3.5 12 3.5s-7.548 0-9.402.566C1.576 4.339.774 5.14.502 6.163 0 8.01 0 12 0 12s0 3.99.502 5.837c.272 1.022 1.074 1.824 2.096 2.097 1.854.566 9.402.566 9.402.566s7.548 0 9.402-.566c1.022-.273 1.824-1.075 2.096-2.097C24 15.99 24 12 24 12s0-3.99-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="https://www.facebook.com/people/Theaischool/61558962466200/" target="_blank" rel="noopener noreferrer" className="hover:scale-115 transition-transform" aria-label="Facebook">
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M9 8H7v3h2v9h3v-9h3l.5-3H12V6c0-.88.39-1 1-1h2V2h-3c-2.76 0-3 1.76-3 3v3z"/>
              </svg>
            </a>
            <a href="https://x.com/TheAI_SCHOOL" target="_blank" rel="noopener noreferrer" className="hover:scale-115 transition-transform" aria-label="X">
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
          {/* Announcement text */}
          <span className="text-center flex-1">
            {regionConfig.code === "in" 
              ? "India's only school where startup Leaders teach AI skills."
              : `${regionConfig.name}'s only school where startup Leaders teach AI skills.`}
          </span>
          <div className="hidden sm:block text-right">
            {/* Phone number removed from top banner per request */}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 w-full bg-white/95 backdrop-blur-md border-b border-black/5 z-[999]">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5 relative">
          {/* Logo */}
          <a href={regionConfig.path} className="flex items-center">
            <img 
              src={regionConfig.assets.logo} 
              alt="The AI School Logo" 
              className="h-11 w-auto select-none"
            />
          </a>

          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6 list-none m-0 p-0">
              <li className="relative group/nav-item">
                <a
                  href="/learn"
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-bold hover:text-[#C1121C] hover:bg-neutral-50 rounded-lg transition-all duration-200 relative ${
                    pathname === "/learn" || pathname.startsWith("/courses/") ? "text-[#C1121C]" : "text-[#171717]"
                  }`}
                >
                  Learn <ChevronDown className="w-4 h-4 group-hover/nav-item:rotate-180 transition-transform duration-200" />
                  {(pathname === "/learn" || pathname.startsWith("/courses/")) && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#C1121C] rounded-full" />
                  )}
                </a>

                {/* Mega Dropdown Menu */}
                <div className="absolute top-[100%] left-1/2 -translate-x-1/2 pt-4 w-[95vw] max-w-5xl opacity-0 invisible group-hover/nav-item:opacity-100 group-hover/nav-item:visible transition-all duration-300 pointer-events-none group-hover/nav-item:pointer-events-auto">
                  <div className="bg-white rounded-xl shadow-2xl border border-black/5 overflow-hidden grid grid-cols-[300px_1fr] min-h-[460px]">
                    {/* Left Sidebar */}
                    <div className="bg-neutral-50 p-5 flex flex-col gap-1 border-r border-black/5">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat.id}
                          onMouseEnter={() => setActiveCategory(cat.id)}
                          className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-left text-sm font-bold transition-all duration-150 ${
                            activeCategory === cat.id
                              ? "bg-[#C1121C] text-white"
                              : "text-[#171717] hover:bg-neutral-150"
                          }`}
                        >
                          <span>{cat.name}</span>
                          <ChevronRight className="w-4 h-4 opacity-70" />
                        </button>
                      ))}
                    </div>

                    {/* Right Course Grid */}
                    <div className="p-8 bg-white max-h-[520px] overflow-y-auto">
                      <div className="grid grid-cols-2 gap-4">
                        {activeCourses.map((course, idx) => (
                          <a
                            key={idx}
                            href={course.url}
                            className="p-4 rounded-lg bg-neutral-50 hover:bg-red-50/40 border-l-3 border-transparent hover:border-[#C1121C] text-sm font-medium text-[#171717] hover:text-[#C1121C] transition-all duration-200 shadow-sm"
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
                if (nav.url === "/learn") return null; // Already rendered with mega menu
                const isActive = pathname === nav.url || (nav.url !== "/" && pathname.startsWith(nav.url));
                return (
                  <li key={idx}>
                    <a 
                      href={nav.url} 
                      className={`px-3 py-2 text-sm font-bold hover:text-[#C1121C] transition-colors relative block ${
                        isActive ? "text-[#C1121C]" : "text-[#171717]"
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
            {/* Desktop Action Buttons */}

            <div className="flex items-center gap-2">
              {getSupportedRegions().includes("us") && currentRegion !== "us" && (
                <img
                  src="https://flagcdn.com/w40/us.png"
                  alt="USA Flag"
                  onClick={() => handleRegionChange("us")}
                  className="w-7 rounded-sm shadow-sm hover:scale-105 cursor-pointer transition-transform opacity-80 hover:opacity-100"
                  title="United States"
                />
              )}
              {getSupportedRegions().includes("ph") && currentRegion !== "ph" && (
                <img
                  src="https://flagcdn.com/w40/ph.png"
                  alt="Philippines Flag"
                  onClick={() => handleRegionChange("ph")}
                  className="w-7 rounded-sm shadow-sm hover:scale-105 cursor-pointer transition-transform opacity-80 hover:opacity-100"
                  title="Philippines"
                />
              )}
              {currentRegion !== "in" && (
                <img
                  src="https://flagcdn.com/w40/in.png"
                  alt="India Flag"
                  onClick={() => handleRegionChange("in")}
                  className="w-7 rounded-sm shadow-sm hover:scale-105 cursor-pointer transition-transform opacity-80 hover:opacity-100"
                  title="India"
                />
              )}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#171717] hover:bg-neutral-50 rounded-lg transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden w-full bg-white border-t border-black/5 px-6 py-4 animate-in fade-in slide-in-from-top-4 duration-200 max-h-[75vh] overflow-y-auto">
            <ul className="flex flex-col list-none m-0 p-0">
              <li>
                <button
                  onClick={() => setMobileLearnOpen(!mobileLearnOpen)}
                  className="flex items-center justify-between w-full font-bold text-[#171717] py-3 text-left border-b border-neutral-100"
                >
                  <span>Learn</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileLearnOpen ? 'rotate-180 text-[#C1121C]' : 'text-neutral-400'}`} />
                </button>
                {mobileLearnOpen && (
                  <div className="flex flex-col gap-1 pl-3 border-l-2 border-neutral-100 my-2">
                    {CATEGORIES.map((cat) => {
                      const isCatOpen = mobileActiveCategory === cat.id;
                      return (
                        <div key={cat.id} className="py-1">
                          <button
                            onClick={() => setMobileActiveCategory(isCatOpen ? null : cat.id)}
                            className="flex items-center justify-between w-full text-xs font-bold text-neutral-700 py-2 text-left hover:text-[#C1121C]"
                          >
                            <span>{cat.name}</span>
                            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isCatOpen ? 'rotate-180 text-[#C1121C]' : 'text-neutral-400'}`} />
                          </button>
                          {isCatOpen && (
                            <div className="flex flex-col gap-2 pl-3 mt-1 pb-2 border-l border-red-100">
                              {cat.courses.map((course, idx) => (
                                <a
                                  key={idx}
                                  href={course.url}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="text-xs text-neutral-500 hover:text-[#C1121C] py-1 block transition-colors leading-relaxed"
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
                  href="/about-us" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block font-bold text-[#171717] py-3 border-b border-neutral-100"
                >
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="/blogs" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block font-bold text-[#171717] py-3 border-b border-neutral-100"
                >
                  Blogs
                </a>
              </li>
              <li>
                <a 
                  href="/contact-us" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="block font-bold text-[#171717] py-3"
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

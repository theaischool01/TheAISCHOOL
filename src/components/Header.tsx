"use client";

import { useState } from "react";
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
      { name: "Introduction to Prompts", url: "/courses/introduction-to-prompts" },
      { name: "Advanced Prompting Techniques", url: "/courses/advanced-prompting-techniques" },
      { name: "Prompting for Business Automation", url: "/courses/prompting-for-business-automation" },
    ],
  },
  {
    id: "gamer",
    name: "GAMER",
    courses: [
      { name: "Game Development with AI", url: "/courses/game-development-with-ai" },
      { name: "AI NPC Design & Implementation", url: "/courses/ai-npc-design-and-implementation" },
    ],
  },
  {
    id: "build-agent",
    name: "Build Your Own Agent",
    courses: [
      { name: "AI Agent Architectures", url: "/courses/ai-agent-architectures" },
      { name: "Autonomous Agents with LangChain", url: "/courses/autonomous-agents-with-langchain" },
      { name: "Multi-Agent Systems & CrewAI", url: "/courses/multi-agent-systems-and-crewai" },
    ],
  },
  {
    id: "python-prog",
    name: "Python & Programming",
    courses: [
      { name: "Python Programming Fundamentals", url: "/courses/python-programming-fundamentals" },
      { name: "Advanced OOP in Python", url: "/courses/advanced-oop-in-python" },
      { name: "Python for Automation", url: "/courses/python-for-automation" },
    ],
  },
  {
    id: "data-science",
    name: "Data Science and Analytics",
    courses: [
      { name: "Data Science Boot Camp", url: "/courses/data-science-boot-camp" },
      { name: "Machine Learning Pipelines", url: "/courses/machine-learning-pipelines" },
      { name: "Statistical Modeling & Inference", url: "/courses/statistical-modeling-and-inference" },
    ],
  },
  {
    id: "tools-tech",
    name: "Tools & Technologies",
    courses: [
      { name: "Git & Version Control", url: "/courses/git-and-version-control" },
      { name: "Docker & Containerization for AI", url: "/courses/docker-and-containerization-for-ai" },
      { name: "Vector Databases (Pinecone, Chroma)", url: "/courses/vector-databases" },
    ],
  },
  {
    id: "business-prof",
    name: "Business & Professional",
    courses: [
      { name: "AI Product Management", url: "/courses/ai-product-management" },
      { name: "AI Consulting Frameworks", url: "/courses/ai-consulting-frameworks" },
      { name: "Fintech & AI Strategy", url: "/courses/fintech-and-ai-strategy" },
    ],
  },
];

export default function Header() {
  const { currentRegion, regionConfig, setRegion } = useRegion();
  const [activeCategory, setActiveCategory] = useState("ai-internship");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      <div className="w-full bg-[#EE1C25] text-white py-2.5 px-8 relative z-[1000] border-b border-white/5">
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
            <a href={`tel:${regionConfig.phone}`} className="hover:underline">{regionConfig.phone}</a>
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
                  className="flex items-center gap-1 px-3 py-2 text-sm font-bold text-[#171717] hover:text-[#EE1C25] hover:bg-neutral-50 rounded-lg transition-all duration-200"
                >
                  Learn <ChevronDown className="w-4 h-4 group-hover/nav-item:rotate-180 transition-transform duration-200" />
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
                              ? "bg-[#EE1C25] text-white"
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
                            className="p-4 rounded-lg bg-neutral-50 hover:bg-red-50/40 border-l-3 border-transparent hover:border-[#EE1C25] text-sm font-medium text-[#171717] hover:text-[#EE1C25] transition-all duration-200 shadow-sm"
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
                return (
                  <li key={idx}>
                    <a href={nav.url} className="px-3 py-2 text-sm font-bold text-[#171717] hover:text-[#EE1C25] transition-colors">
                      {nav.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Flags and Mobile toggler */}
          <div className="flex items-center gap-5">
            {/* Desktop Action Buttons */}
            <div className="hidden md:flex items-center gap-5 mr-1 relative">
              <a href="/login" className="text-sm font-extrabold text-[#171717] hover:text-[#EE1C25] transition-colors">
                Login
              </a>
            </div>

            <div className="flex items-center gap-2">
              {getSupportedRegions().includes("in") && (
                <img
                  src="https://flagcdn.com/w40/in.png"
                  alt="India Flag"
                  onClick={() => handleRegionChange("in")}
                  className={`w-7 rounded-sm shadow-sm hover:scale-105 cursor-pointer transition-transform ${currentRegion === "in" ? "ring-2 ring-[#EE1C25]" : "opacity-60"}`}
                  title="India"
                />
              )}
              {getSupportedRegions().includes("us") && (
                <img
                  src="https://flagcdn.com/w40/us.png"
                  alt="USA Flag"
                  onClick={() => handleRegionChange("us")}
                  className={`w-7 rounded-sm shadow-sm hover:scale-105 cursor-pointer transition-transform ${currentRegion === "us" ? "ring-2 ring-[#EE1C25]" : "opacity-60"}`}
                  title="United States"
                />
              )}
              {getSupportedRegions().includes("ph") && (
                <img
                  src="https://flagcdn.com/w40/ph.png"
                  alt="Philippines Flag"
                  onClick={() => handleRegionChange("ph")}
                  className={`w-7 rounded-sm shadow-sm hover:scale-105 cursor-pointer transition-transform ${currentRegion === "ph" ? "ring-2 ring-[#EE1C25]" : "opacity-60"}`}
                  title="Philippines"
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
          <div className="md:hidden w-full bg-white border-t border-black/5 px-6 py-4 animate-in fade-in slide-in-from-top-4 duration-200">
            <ul className="flex flex-col list-none m-0 p-0">
              <li>
                <div className="font-bold text-sm text-[#6B7280] mb-2">Learn</div>
                <div className="flex flex-col gap-1.5 pl-3 border-l border-neutral-100 mb-2">
                  {CATEGORIES.map((cat) => (
                    <div key={cat.id} className="py-1">
                      <div className="text-xs font-extrabold text-[#171717] mb-1">{cat.name}</div>
                      <div className="flex flex-col gap-1 pl-2">
                        {cat.courses.slice(0, 3).map((course, idx) => (
                          <a key={idx} href={course.url} className="text-xs text-[#6B7280] hover:text-[#EE1C25]">
                            {course.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </li>
              <li>
                <a href="/about-us" className="block font-bold text-[#171717] py-2">
                  About Us
                </a>
              </li>
              <li>
                <a href="/blogs" className="block font-bold text-[#171717] py-2">
                  Blogs
                </a>
              </li>
              <li>
                <a href="/contact-us" onClick={() => setMobileMenuOpen(false)} className="block font-bold text-[#171717] py-2">
                  Contact Us
                </a>
              </li>
              <li className="pt-2 border-t border-neutral-100 flex flex-col gap-3">
                <a href="/login" onClick={() => setMobileMenuOpen(false)} className="block text-center font-bold text-[#171717] hover:text-[#EE1C25] py-2.5 rounded-lg border border-neutral-200">
                  Login
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
}

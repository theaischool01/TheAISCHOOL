"use client";

import React, { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BookOpen, GraduationCap, ArrowRight, Code, Users } from "lucide-react";

interface Course {
  name: string;
  url: string;
  description: string;
  audience: "For Coders" | "For All";
  duration: string;
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
      { name: "Building Your AI Agent (For Coders)", url: "/courses/building-your-ai-agent-for-coders", description: "Learn to design, orchestrate, and deploy autonomous LLM agents using Python, LangChain, and CrewAI.", audience: "For Coders", duration: "8 Weeks" },
      { name: "Data Analysis with AI and PowerBI (For All)", url: "/courses/data-analysis-with-ai-and-powerbi", description: "Master business intelligence, interactive dashboard creation, and automated analytical reporting powered by GenAI.", audience: "For All", duration: "6 Weeks" },
      { name: "Building & Deploying AI Agents (No-Code – For All)", url: "/courses/building-and-deploying-ai-agents", description: "Deploy conversational and workflow-automation agents without writing code using modern drag-and-drop tools.", audience: "For All", duration: "6 Weeks" },
      { name: "No-Code AI Web Development (For All)", url: "/courses/no-code-ai-web-development", description: "Build state-of-the-art landing pages, directories, and web apps with visual builders augmented by generative AI.", audience: "For All", duration: "6 Weeks" },
      { name: "AI Cloud Engineer (For All)", url: "/courses/ai-cloud-engineer", description: "Configure, deploy, and scale AI models on Google Cloud Platform and AWS infrastructures.", audience: "For All", duration: "8 Weeks" },
      { name: "AI Agent Chatbot Creation (For All)", url: "/courses/ai-agent-chatbot-creation", description: "Create smart conversational interfaces with memory, retrieval, and tools to automate customer operations.", audience: "For All", duration: "4 Weeks" },
      { name: "Python for Data Analytics (For Coders)", url: "/courses/python-for-data-analytics", description: "Process data at scale using Pandas, NumPy, and clean scripting methodologies for automated reporting.", audience: "For Coders", duration: "6 Weeks" },
      { name: "Mobile App Development (For Coders)", url: "/courses/mobile-app-development", description: "Create responsive mobile applications leveraging AI APIs and modern hybrid frameworks.", audience: "For Coders", duration: "8 Weeks" },
      { name: "Digital Marketing & Lead Generation (For All)", url: "/courses/digital-marketing-and-lead-generation", description: "Harness AI to research markets, write high-converting copy, design campaigns, and automate outreach channels.", audience: "For All", duration: "6 Weeks" },
      { name: "Cyber Security with AI (For All)", url: "/courses/cyber-security-with-ai", description: "Protect digital infrastructure by detecting vulnerabilities and analyzing threats using advanced AI models.", audience: "For All", duration: "8 Weeks" },
    ],
  },
  {
    id: "prompt-eng",
    name: "Prompt Engineering 101",
    courses: [
      { name: "Introduction to Prompts", url: "/courses/introduction-to-prompts", description: "Understand LLM mechanics and master basic prompt structures to improve daily operational productivity.", audience: "For All", duration: "2 Weeks" },
      { name: "Advanced Prompting Techniques", url: "/courses/advanced-prompting-techniques", description: "Deep dive into Chain-of-Thought, Few-Shot prompting, and system routing frameworks.", audience: "For All", duration: "4 Weeks" },
      { name: "Prompting for Business Automation", url: "/courses/prompting-for-business-automation", description: "Engineer enterprise prompts to automate tasks, generate structured data, and process text fields.", audience: "For All", duration: "4 Weeks" },
    ],
  },
  {
    id: "gamer",
    name: "GAMER",
    courses: [
      { name: "Game Development with AI", url: "/courses/game-development-with-ai", description: "Integrate generative AI inside real-time assets, level design, and interactive scripting pathways.", audience: "For Coders", duration: "8 Weeks" },
      { name: "AI NPC Design & Implementation", url: "/courses/ai-npc-design-and-implementation", description: "Build non-player characters with context awareness, personality modules, and LLM-powered dialogue trees.", audience: "For Coders", duration: "6 Weeks" },
    ],
  },
  {
    id: "build-agent",
    name: "Build Your Own Agent",
    courses: [
      { name: "AI Agent Architectures", url: "/courses/ai-agent-architectures", description: "Study the theory and paradigms of single and multi-agent loops, tooling, and planning systems.", audience: "For Coders", duration: "6 Weeks" },
      { name: "Autonomous Agents with LangChain", url: "/courses/autonomous-agents-with-langchain", description: "Build memory networks, document retrievers, and tool integrations using the LangChain library.", audience: "For Coders", duration: "8 Weeks" },
      { name: "Multi-Agent Systems & CrewAI", url: "/courses/multi-agent-systems-and-crewai", description: "Collaborate tasks across discrete virtual agents to model complex organizational workflows.", audience: "For Coders", duration: "6 Weeks" },
    ],
  },
  {
    id: "python-prog",
    name: "Python & Programming",
    courses: [
      { name: "Python Programming Fundamentals", url: "/courses/python-programming-fundamentals", description: "Beginner-friendly entry path to loops, functions, variables, and clean coding best practices.", audience: "For All", duration: "4 Weeks" },
      { name: "Advanced OOP in Python", url: "/courses/advanced-oop-in-python", description: "Master inheritance, abstractions, custom decorators, and modular software packaging.", audience: "For Coders", duration: "6 Weeks" },
      { name: "Python for Automation", url: "/courses/python-for-automation", description: "Automate manual tasks, web scraping pipelines, and file system processes with script utilities.", audience: "For Coders", duration: "6 Weeks" },
    ],
  },
  {
    id: "data-science",
    name: "Data Science and Analytics",
    courses: [
      { name: "Data Science Boot Camp", url: "/courses/data-science-boot-camp", description: "Full-scale training on statistics, data manipulation, cleaning, and model deployments.", audience: "For Coders", duration: "12 Weeks" },
      { name: "Machine Learning Pipelines", url: "/courses/machine-learning-pipelines", description: "Implement, evaluate, and productionize supervised and unsupervised machine learning models.", audience: "For Coders", duration: "8 Weeks" },
      { name: "Statistical Modeling & Inference", url: "/courses/statistical-modeling-and-inference", description: "Analyze variance, construct hypothesis models, and run reliable experiments to back data insights.", audience: "For Coders", duration: "6 Weeks" },
    ],
  },
  {
    id: "tools-tech",
    name: "Tools & Technologies",
    courses: [
      { name: "Git & Version Control", url: "/courses/git-and-version-control", description: "Learn repository setups, branching strategies, conflicts resolution, and collaboration in Teams.", audience: "For All", duration: "2 Weeks" },
      { name: "Docker & Containerization for AI", url: "/courses/docker-and-containerization-for-ai", description: "Package AI environments and database systems into lightweight, production-ready Docker containers.", audience: "For Coders", duration: "4 Weeks" },
      { name: "Vector Databases (Pinecone, Chroma)", url: "/courses/vector-databases", description: "Deploy vector schemas, semantic query routing, and secure vector embeddings setups.", audience: "For Coders", duration: "4 Weeks" },
    ],
  },
  {
    id: "business-prof",
    name: "Business & Professional",
    courses: [
      { name: "AI Product Management", url: "/courses/ai-product-management", description: "Design requirements, orchestrate prompt loops, and guide models validation for software products.", audience: "For All", duration: "6 Weeks" },
      { name: "AI Consulting Frameworks", url: "/courses/ai-consulting-frameworks", description: "Advise enterprise executives on identifying opportunities, ROI metrics, and safety boundaries for AI.", audience: "For All", duration: "6 Weeks" },
      { name: "Fintech & AI Strategy", url: "/courses/fintech-and-ai-strategy", description: "Explore credit scoring systems, anomaly checks, and personalized finance pipelines powered by AI.", audience: "For All", duration: "6 Weeks" },
    ],
  },
];

export default function LearnPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredCourses = useMemo(() => {
    let list: { course: Course; categoryName: string }[] = [];
    
    CATEGORIES.forEach((cat) => {
      if (selectedCategory === "all" || selectedCategory === cat.id) {
        cat.courses.forEach((c) => {
          list.push({ course: c, categoryName: cat.name });
        });
      }
    });

    return list;
  }, [selectedCategory]);

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-white pt-20 pb-16 px-6 md:px-12 border-b border-gray-100 overflow-hidden">
        {/* Soft Grid and Glow */}
        <div 
          className="absolute inset-0 pointer-events-none select-none z-0"
          style={{ 
            backgroundImage: 'radial-gradient(circle at 1px 1px, #e5e7eb 1.2px, transparent 0)', 
            backgroundSize: '24px 24px',
            opacity: 0.6
          }}
        />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-red-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center relative z-10 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#EE1C25] font-heading">
            OUR CURRICULUM
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight font-heading max-w-4xl mx-auto leading-tight">
            Learn AI from Tech Startup Founders & Leaders
          </h1>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Gain production-ready skills by building real projects. Filter through our specialized internship tracks, technical frameworks, and professional consulting paths.
          </p>
        </div>
      </section>

      {/* Main Catalog Content */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">
          
          {/* Left Category Tabs (Sticky) */}
          <div className="space-y-2 lg:sticky lg:top-28 self-start">
            <h3 className="text-xs font-black uppercase tracking-wider text-neutral-400 mb-4 px-2">
              Filter Categories
            </h3>
            
            <button
              onClick={() => setSelectedCategory("all")}
              className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-left text-xs font-bold transition-all ${
                selectedCategory === "all"
                  ? "bg-[#EE1C25] text-white shadow-md shadow-red-500/10"
                  : "text-neutral-600 hover:bg-neutral-50 hover:text-[#EE1C25]"
              }`}
            >
              <span>All Specializations</span>
              <BookOpen className="w-3.5 h-3.5 opacity-70" />
            </button>

            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-left text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? "bg-[#EE1C25] text-white shadow-md shadow-red-500/10"
                    : "text-neutral-600 hover:bg-neutral-50 hover:text-[#EE1C25]"
                }`}
              >
                <span className="truncate pr-2">{cat.name}</span>
                <GraduationCap className="w-3.5 h-3.5 opacity-70 shrink-0" />
              </button>
            ))}
          </div>

          {/* Right Courses Grid */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                Showing {filteredCourses.length} Courses
              </span>
            </div>

            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCourses.map(({ course, categoryName }, idx) => (
                  <div
                    key={idx}
                    className="group bg-white border border-gray-200 rounded-3xl p-6 flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-xl hover:border-red-500/20 transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Top Accent line */}
                    <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-[#EE1C25] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />

                    <div>
                      {/* Badges */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider bg-neutral-50 px-2 py-0.5 rounded border border-neutral-100">
                          {categoryName}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border flex items-center gap-1 ${
                            course.audience === "For Coders" 
                              ? "bg-red-50/50 text-[#EE1C25] border-red-100/50" 
                              : "bg-green-50 text-green-700 border-green-100"
                          }`}>
                            {course.audience === "For Coders" ? (
                              <>
                                <Code className="w-2.5 h-2.5" />
                                Coders
                              </>
                            ) : (
                              <>
                                <Users className="w-2.5 h-2.5" />
                                All Levels
                              </>
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Course title & details */}
                      <h3 className="text-lg font-black text-gray-900 pt-1 group-hover:text-[#EE1C25] transition-colors duration-200 font-heading leading-tight">
                        {course.name}
                      </h3>
                      <p className="text-xs text-neutral-500 leading-relaxed font-sans font-medium mt-3 mb-6">
                        {course.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase">
                        Duration: {course.duration}
                      </span>
                      <a
                        href={course.url}
                        className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider text-[#EE1C25] hover:text-neutral-900 transition-colors"
                      >
                        Explore Course
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-neutral-50 rounded-3xl border border-dashed border-neutral-200">
                <span className="block text-sm font-bold text-neutral-400 uppercase tracking-widest">
                  No courses found
                </span>
                <p className="text-xs text-neutral-400 mt-2 max-w-xs mx-auto">
                  Try searching for another keyword or clearing filters.
                </p>
              </div>
            )}
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}

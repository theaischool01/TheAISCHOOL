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
      { name: "AI to GenAI", url: "/courses/ai-to-genai", description: "Introduction to the transition from traditional artificial intelligence systems to generative AI models.", audience: "For All", duration: "1 Week" },
      { name: "Understanding Prompt Engineering", url: "/courses/understanding-prompt-engineering", description: "Learn how LLMs process instructions and why prompts are the key interface.", audience: "For All", duration: "2 Weeks" },
      { name: "Core Prompt Engineering Techniques", url: "/courses/core-prompt-engineering-techniques", description: "Master basic structure, formats, and framing methodologies to get predictable outputs.", audience: "For All", duration: "2 Weeks" },
      { name: "Prompt Engineering for Academic Subjects", url: "/courses/prompt-engineering-for-academic-subjects", description: "Apply prompt structures to streamline research, writing, and studying complex topics.", audience: "For All", duration: "2 Weeks" },
      { name: "Various AI tool and Prompts", url: "/courses/various-ai-tool-and-prompts", description: "Explore prompts specifically optimized for ChatGPT, Claude, Midjourney, and other key tools.", audience: "For All", duration: "2 Weeks" },
      { name: "Advanced Prompt Engineering Techniques", url: "/courses/advanced-prompt-engineering-techniques", description: "Chain-of-thought, few-shot prompting, and automated prompt generators.", audience: "For All", duration: "4 Weeks" },
      { name: "Ethical Considerations and the Future of Prompt Engineer", url: "/courses/ethical-considerations-and-the-future-of-prompt-engineer", description: "Learn about safety filters, jailbreaking, and how prompt engineering is evolving.", audience: "For All", duration: "2 Weeks" },
    ],
  },
  {
    id: "gamer",
    name: "GAMER",
    courses: [
      { name: "Essentials: Generative AI, Prompt Engineering & ChatGPT", url: "/courses/essentials-generative-ai-prompt-engineering-and-chatgpt", description: "A fast-track core curriculum covering fundamentals of modern generative models.", audience: "For All", duration: "4 Weeks" },
      { name: "Programming Refreshers – Python", url: "/courses/programming-refreshers-python", description: "Review variables, lists, dicts, functions, and modules in Python to build your coding base.", audience: "For Coders", duration: "2 Weeks" },
      { name: "Data Structure and Algorithms with Python", url: "/courses/data-structure-and-algorithms-with-python", description: "Master stack, queues, trees, searching, sorting, and big-O notation using clean Python.", audience: "For Coders", duration: "6 Weeks" },
      { name: "Applied Data Science with Python", url: "/courses/applied-data-science-with-python", description: "Clean data, run statistics, and create visualizations using Pandas, NumPy, and Seaborn.", audience: "For Coders", duration: "6 Weeks" },
      { name: "Machine Learning", url: "/courses/machine-learning", description: "Train and evaluate linear models, decision trees, random forests, and clustering algorithms.", audience: "For Coders", duration: "6 Weeks" },
      { name: "Deep Learning", url: "/courses/deep-learning", description: "Build and train neural networks, CNNs, RNNs, and custom layers using PyTorch.", audience: "For Coders", duration: "8 Weeks" },
      { name: "Build Your Own Agent", url: "/courses/build-your-own-agent", description: "Develop custom autonomous software agents with memory, toolsets, and execution loops.", audience: "For Coders", duration: "6 Weeks" },
    ],
  },
  {
    id: "build-agent",
    name: "Build Your Own Agent",
    courses: [
      { name: "Foundations of Large Language Models (LLMs)", url: "/courses/foundations-of-large-language-models", description: "Study transformer architectures, tokens, embeddings, and context window mechanics.", audience: "For Coders", duration: "4 Weeks" },
      { name: "Setting Up Your Development Environment", url: "/courses/setting-up-your-development-environment", description: "Configure Python, conda environments, VS Code, and API keys for AI agent coding.", audience: "For Coders", duration: "1 Week" },
      { name: "Core Concepts of LLM", url: "/courses/core-concepts-of-llm", description: "Understand temperature, system instructions, and JSON mode outputs for structured results.", audience: "For Coders", duration: "2 Weeks" },
      { name: "Introduction to Intelligent Agents", url: "/courses/introduction-to-intelligent-agents", description: "Learn about single-loop agents, memory storage, and basic tool calls.", audience: "For Coders", duration: "3 Weeks" },
      { name: "Building Basic LLM Agents", url: "/courses/building-basic-llm-agents", description: "Orchestrate simple agents that use search APIs and compute math tasks.", audience: "For Coders", duration: "4 Weeks" },
      { name: "Advanced Agent Features", url: "/courses/advanced-agent-features", description: "Implement long-term memory, planning layers, and self-reflection loops.", audience: "For Coders", duration: "6 Weeks" },
      { name: "Integrating Agents with APIs", url: "/courses/integrating-agents-with-apis", description: "Connect your autonomous agents to databases, web hooks, and third-party integrations.", audience: "For Coders", duration: "4 Weeks" },
      { name: "Reinforcement Learning for Agents", url: "/courses/reinforcement-learning-for-agents", description: "Explore agent optimization using feedback loops and reward models.", audience: "For Coders", duration: "6 Weeks" },
      { name: "AI Agents Market", url: "/courses/ai-agents-market", description: "Understand monetization, deployment channels, and the commercial ecosystem for AI agents.", audience: "For All", duration: "2 Weeks" },
    ],
  },
  {
    id: "python-prog",
    name: "Python & Programming",
    courses: [
      { name: "Python Powerhouse Gen AI From Basics to Advanced Programming", url: "/courses/python-powerhouse-gen-ai", description: "Learn Python programming starting from zero up to advanced generator/decorator patterns.", audience: "For All", duration: "8 Weeks" },
      { name: "Mastering Time Series Analysis and Forecasting with Python", url: "/courses/mastering-time-series-analysis-and-forecasting", description: "Model seasonal trends, autocorrelation, and predict future data points using Python.", audience: "For Coders", duration: "6 Weeks" },
      { name: "Data Diving: A Beginner's Guide to Data bricks", url: "/courses/data-diving-beginners-guide-to-databricks", description: "Get started with Apache Spark, lakehouses, and notebooks in the Databricks cloud platform.", audience: "For All", duration: "4 Weeks" },
      { name: "Advanced DataBricks – Data Warehouse Performance Optimization", url: "/courses/advanced-databricks-performance-optimization", description: "Tune cluster scaling, optimize Delta Lake file sizes, and write fast Spark queries.", audience: "For Coders", duration: "6 Weeks" },
    ],
  },
  {
    id: "data-science",
    name: "Data Science and Analytics",
    courses: [
      { name: "Power BI and AI Integration for Building Intelligent Dashboards", url: "/courses/power-bi-and-ai-integration", description: "Learn to build automated, highly intelligent dashboards by connecting Power BI with modern generative AI features.", audience: "For All", duration: "6 Weeks" },
      { name: "Applied Statistics Real World Problem Solving", url: "/courses/applied-statistics-real-world-problem-solving", description: "Master hypothesis testing, regression models, and exploratory stats to solve critical business problems.", audience: "For Coders", duration: "6 Weeks" },
      { name: "SQL for Data Engineers Designing and Building Data Pipelines", url: "/courses/sql-for-data-engineers", description: "Learn advanced SQL queries, window functions, and database optimizations for building scalable ETL pipelines.", audience: "For Coders", duration: "8 Weeks" },
      { name: "UCI Data Preprocessing and Exploratory Data Analysis", url: "/courses/uci-data-preprocessing-and-eda", description: "Master data cleaning, scaling, outliers detection, and visualization workflows using standard datasets.", audience: "For Coders", duration: "4 Weeks" },
    ],
  },
  {
    id: "tools-tech",
    name: "Tools & Technologies",
    courses: [
      { name: "Docker", url: "/courses/docker", description: "Learn containerization concepts, write Dockerfiles, and package AI/backend services for clean deployment.", audience: "For Coders", duration: "4 Weeks" },
      { name: "AWS-Security", url: "/courses/aws-security", description: "Secure cloud resources, configure IAM policies, inspect network traffic, and manage credentials on AWS.", audience: "For Coders", duration: "6 Weeks" },
      { name: "Unit Testing", url: "/courses/unit-testing", description: "Write testable code, configure mocks, and use PyTest or Jest to build solid CI/CD pipelines.", audience: "For Coders", duration: "3 Weeks" },
    ],
  },
  {
    id: "business-prof",
    name: "Business & Professional",
    courses: [
      { name: "Advanced Excel Techniques for Professionals", url: "/courses/advanced-excel-techniques-for-professionals", description: "Master complex lookup functions, pivot tables, macros, and financial modeling tools in Microsoft Excel.", audience: "For All", duration: "4 Weeks" },
      { name: "Mastering Aptitude: A Comprehensive Guide to Problem Solving", url: "/courses/mastering-aptitude-comprehensive-guide", description: "Build quantitative, logical, and verbal problem-solving skills for tech interviews and entrance exams.", audience: "For All", duration: "6 Weeks" },
      { name: "Professional Business Strategy Managing Organisational Value", url: "/courses/professional-business-strategy", description: "Understand corporate finance, market positioning, risk management, and building high-growth business frameworks.", audience: "For All", duration: "6 Weeks" },
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

'use client';
export const dynamic = 'force-dynamic';
import React, { useState, use } from 'react';
import { Clock, Award, ShieldCheck, CheckCircle, ChevronDown, ChevronUp, Users, Smartphone, BarChart, Sparkles, ArrowLeft } from 'lucide-react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// 1. Centralized Data Architecture to support every course automatically
const coursesData: Record<string, any> = {
  "building-your-ai-agent-for-coders": {
    title: "Building Your AI Agent (For Coders)",
    tagline: "Transform your skills into building next-generation AI systems",
    headline: "Building AI Agents for Coders to Lead in the Age of AI",
    inclusions: ["120 Hours", "Get Certified by the Best in AI Skilling", "Mentors: Tech Startup Founders"],
    price: "999",
    originalPrice: "1999",
    discount: "50%",
    modules: [
      { id: 1, name: "Foundations of AI & Python for Agents", points: ["Understand how AI agents operate in real-world applications.", "Learn Python fundamentals required for building intelligent agents.", "Develop a mindset for automation and scalable system design."] },
      { id: 2, name: "NLP and LLM Integration", points: ["Master prompt chaining and embedding lookups.", "Integrate open-source LLMs into runtime servers."] },
      { id: 3, name: "Memory & Conversational AI Systems", points: ["Design custom message windows and memory persistence layers."] }
    ],
    tools: ["n8n", "FlowiseAI", "Python", "OpenAI"],
    outcomes: ["Build real AI agents that think, respond", "Use LLMs, tools, and APIs effectively", "Gain hands-on skills for AI systems", "Build smart workflows with memory and reasoning"],
    faqs: [
      { q: "What makes an AI agent 'smart'?", a: "It becomes smart by using AI models to understand, reason, and choose the best action based on your active inputs." },
      { q: "Do AI agents need coding?", a: "For this specific track, Python baseline logic is utilized to scale operational custom agents seamlessly." }
    ]
  },
  "data-analysis-with-ai-and-powerbi": {
    title: "Data Analysis with AI and PowerBI (For All)",
    tagline: "Uncover insights and drive business growth using AI-powered analytics",
    headline: "Master Modern Data Analysis & PowerBI to Make Smart Decisions",
    inclusions: ["120 Hours", "Industry-recognized Analytics Certification", "Mentors: Senior Data Scientists"],
    price: "999",
    originalPrice: "1999",
    discount: "50%",
    modules: [
      { id: 1, name: "Data Transformation & Cleaning", points: ["Import and clean structured and unstructured data using Power Query.", "Use AI functions to handle missing values and detect anomalies.", "Shape data models for optimum performance."] },
      { id: 2, name: "DAX Formulas & Data Modeling", points: ["Write calculated columns and measures with DAX.", "Implement time intelligence and advanced relationship structures."] },
      { id: 3, name: "AI Visualizations & Dashboards", points: ["Create stunning, interactive reports using custom themes.", "Deploy AI-driven visuals like Key Influencers and Q&A boxes."] }
    ],
    tools: ["PowerBI", "Excel", "SQL", "ChatGPT-4"],
    outcomes: ["Design industry-standard interactive dashboards", "Clean and prepare complex datasets with ease", "Use DAX for advanced analytics and metrics", "Harness AI tools to interpret and explain data trends"],
    faqs: [
      { q: "Is prior coding experience required for this course?", a: "No, this course is designed for absolute beginners. We teach everything from scratch." },
      { q: "Will I get access to case studies?", a: "Yes, you will work on 5 real-world case studies from retail, healthcare, and finance." }
    ]
  },
  "building-and-deploying-ai-agents": {
    title: "Building & Deploying AI Agents (No-Code)",
    tagline: "Build autonomous software agents without writing a single line of code",
    headline: "No-Code Agent Architecture for Business Automation & Operations",
    inclusions: ["120 Hours", "Certification in No-Code AI Architectures", "Mentors: AI Automation Founders"],
    price: "999",
    originalPrice: "1999",
    discount: "50%",
    modules: [
      { id: 1, name: "Visual Agent Orchestration Platforms", points: ["Learn to navigate node-based environments like Flowise and n8n.", "Understand agent flow layouts, nodes, and action logic.", "Set up secure API connections and secrets."] },
      { id: 2, name: "Integrating Tools & Third-party APIs", points: ["Connect your agents to Slack, Gmail, Google Sheets, and CRM databases.", "Design trigger-action pipelines that execute automatically."] },
      { id: 3, name: "Production Deployment & Monitoring", points: ["Deploy agents to Cloud platforms with single-click configurations.", "Monitor error rates, trace logic paths, and optimize execution costs."] }
    ],
    tools: ["n8n", "FlowiseAI", "Make.com", "Zapier", "OpenAI"],
    outcomes: ["Build fully autonomous business workflow agents", "Connect agent systems to standard productivity tools", "Optimize prompt templates visually", "Manage production API runs and budgets"],
    faqs: [
      { q: "Can I use these agents in my business immediately?", a: "Absolutely! The course focuses on production-ready automations for everyday tasks." },
      { q: "How do no-code agents compare to coded ones?", a: "No-code agents are faster to build and iterate, perfect for 90% of business process automations." }
    ]
  },
  "no-code-ai-web-development": {
    title: "No-Code AI Web Development (For All)",
    tagline: "Create and launch beautiful, interactive web apps using modern AI builders",
    headline: "Deploy Scalable Web Applications Fast Using AI-Driven Builders",
    inclusions: ["120 Hours", "Full-Stack No-Code Certification", "Mentors: Product & Design Leaders"],
    price: "999",
    originalPrice: "1999",
    discount: "50%",
    modules: [
      { id: 1, name: "Intro to Visual Page Builders", points: ["Understand layout principles, responsiveness, and web styling.", "Configure database collections and fields visually.", "Connect user actions to custom workflow actions."] },
      { id: 2, name: "AI Co-pilot Development Flow", points: ["Generate components and styles with natural language prompts.", "Refine generated layouts to meet strict design system standards."] },
      { id: 3, name: "Publishing, SEO & Analytics", points: ["Configure custom domains, SSL certificates, and SEO tags.", "Integrate Google Analytics and custom tracking pixels."] }
    ],
    tools: ["Webflow", "Framer", "Bubble", "v0.dev", "Relume"],
    outcomes: ["Build high-converting landing pages and SaaS UIs", "Manage database collections without writing SQL", "Create custom animations and transitions visually", "Deploy production-grade websites instantly"],
    faqs: [
      { q: "Do I need to know HTML/CSS?", a: "No, but you will naturally learn how they work under the hood through visual builders." },
      { q: "Are Framer and Webflow sites scalable?", a: "Yes, they host some of the largest websites in the world with absolute speed." }
    ]
  },
  "ai-cloud-engineer": {
    title: "AI Cloud Engineer (For All)",
    tagline: "Deploy and optimize machine learning models at scale in the cloud",
    headline: "Scale AI Infrastructure & Deploy Models with Confidence",
    inclusions: ["120 Hours", "Cloud Infrastructure Certification", "Mentors: Ex-Google & Ex-AWS Tech Leads"],
    price: "999",
    originalPrice: "1999",
    discount: "50%",
    modules: [
      { id: 1, name: "Cloud Computing Basics for AI", points: ["Set up GPU-enabled VM instances on GCP and AWS.", "Configure security groups, IAM access, and ssh environments.", "Understand pricing models and optimize cost setups."] },
      { id: 2, name: "Docker Containerization & Pipelines", points: ["Containerize Python AI models for consistent runtimes.", "Deploy models via fast api endpoints inside Docker containers."] },
      { id: 3, name: "Orchestration & Vector Storage Scale", points: ["Learn vector databases setup on cloud architectures.", "Manage auto-scaling parameters for inference pipelines."] }
    ],
    tools: ["AWS", "GCP", "Docker", "Kubernetes", "Pinecone"],
    outcomes: ["Set up custom GPU servers for AI training/inference", "Build secure APIs for deep learning models", "Manage cloud budgets and scale parameters", "Design high-availability database connections"],
    faqs: [
      { q: "Is prior Linux experience required?", a: "A basic understanding of command-line is helpful, but we cover all commands in detail." },
      { q: "Which cloud provider is prioritized?", a: "We cover both AWS and GCP to give you a well-rounded skill set." }
    ]
  },
  "ai-agent-chatbot-creation": {
    title: "AI Agent Chatbot Creation (For All)",
    tagline: "Design, build, and deploy conversational customer service agents",
    headline: "Create Next-Generation Conversational Assistants",
    inclusions: ["120 Hours", "Chatbot Architecture Certification", "Mentors: Conversational AI Designers"],
    price: "999",
    originalPrice: "1999",
    discount: "50%",
    modules: [
      { id: 1, name: "Chat UX & Conversation Design", points: ["Learn how to draft natural fallback flows and intents.", "Configure system prompts to maintain strict brand voices.", "Integrate rich UI features like buttons and quick replies."] },
      { id: 2, name: "Context Management & Memory", points: ["Pass variables and user context between sessions.", "Implement context-aware routing to direct chats to live support agents."] },
      { id: 3, name: "Omnichannel Deployment", points: ["Deploy bots directly to WhatsApp, Telegram, and website widgets.", "Manage chat history databases and analyze user queries."] }
    ],
    tools: ["Voiceflow", "Botpress", "OpenAI", "Twilio", "Meta APIs"],
    outcomes: ["Build and test intelligent customer support chatbots", "Design state machine logic flows for conversational UX", "Connect APIs to fetch order status and user data on-the-fly", "Deploy bots to major messaging channels"],
    faqs: [
      { q: "Will I learn how to deploy on WhatsApp?", a: "Yes, WhatsApp API configuration is a core module in this course." },
      { q: "Can I connect this to my customer database?", a: "Yes, we teach how to make GET and POST requests inside your conversational flows." }
    ]
  },
  "python-for-data-analytics": {
    title: "Python for Data Analytics (For Coders)",
    tagline: "Unlock insights from complex datasets with pandas and numpy",
    headline: "Master Modern Python Frameworks for Data Ingestion & Analysis",
    inclusions: ["120 Hours", "Python Analytics Certification", "Mentors: Lead Data Analytics Engineers"],
    price: "999",
    originalPrice: "1999",
    discount: "50%",
    modules: [
      { id: 1, name: "Python Core for Analytics", points: ["Learn lists, dictionaries, loops, and list comprehensions.", "Write reusable functions and modular scripts.", "Install and manage libraries inside virtual environments."] },
      { id: 2, name: "Pandas & Numpy Data Wrangling", points: ["Import CSVs, JSONs, and SQL databases into DataFrames.", "Clean missing values, filter rows, and group metrics.", "Perform statistical calculations over series objects."] },
      { id: 3, name: "Visualization & EDA", points: ["Plot stunning distribution and relationship graphs with Seaborn.", "Identify trends, correlations, and outliers via data exploration."] }
    ],
    tools: ["Python", "Jupyter", "Pandas", "Numpy", "Seaborn"],
    outcomes: ["Write efficient Python scripts for data transformation", "Perform exploratory data analysis on raw business data", "Create presentation-ready data visualizations", "Automate daily reporting and file cleaning workflows"],
    faqs: [
      { q: "Do I need math background?", a: "Only high-school level algebra is required. We explain all statistical concepts intuitively." },
      { q: "Will we use Jupyter Notebooks?", a: "Yes, the course is completely centered on Jupyter labs for interactive coding." }
    ]
  },
  "mobile-app-development": {
    title: "Mobile App Development (For Coders)",
    tagline: "Build stunning cross-platform mobile apps using React Native and Expo",
    headline: "Deploy High-Performance Apps to iOS and Android App Stores",
    inclusions: ["120 Hours", "Mobile Developer Certification", "Mentors: Senior Mobile Founders"],
    price: "999",
    originalPrice: "1999",
    discount: "50%",
    modules: [
      { id: 1, name: "React Native Core Layouts", points: ["Understand Flexbox positioning, SafeAreaView, and mobile UX layouts.", "Use state and props to update dynamic interface cards.", "Implement navigation bars, stack navigations, and drawer systems."] },
      { id: 2, name: "Mobile Hardware Integration", points: ["Request permissions and access the camera, photo gallery, and location.", "Save data locally on the device using Async Storage."] },
      { id: 3, name: "Publishing to Google Play & App Store", points: ["Build binaries using Expo Application Services (EAS).", "Configure app icons, splash screens, and store descriptions."] }
    ],
    tools: ["React Native", "Expo", "TypeScript", "TailwindCSS", "Node.js"],
    outcomes: ["Build cross-platform mobile apps from a single codebase", "Integrate phone hardware and sensors", "Manage global application state securely", "Publish production apps directly to the stores"],
    faqs: [
      { q: "Do I need a Mac to build iOS apps?", a: "With Expo, you can build and test iOS apps even if you are on Windows or Linux!" },
      { q: "Will I learn how to push updates without store approval?", a: "Yes, we cover Expo Updates for instant over-the-air code pushes." }
    ]
  },
  "digital-marketing-and-lead-generation": {
    title: "Digital Marketing & Lead Gen (For All)",
    tagline: "Scale customer acquisition with AI-driven marketing campaigns",
    headline: "Harness AI to Automate Content Creation & Skyrocket Sales Leads",
    inclusions: ["120 Hours", "AI Growth Marketing Certification", "Mentors: Growth Leads & CMOs"],
    price: "999",
    originalPrice: "1999",
    discount: "50%",
    modules: [
      { id: 1, name: "AI-Powered Content Scaling", points: ["Generate SEO-optimized articles and social copies using ChatGPT and Claude.", "Create striking visuals and video drafts with AI tools.", "Design high-converting email copy layouts."] },
      { id: 2, name: "Performance Marketing Automation", points: ["Set up automated Facebook, Google, and LinkedIn ad accounts.", "Build custom target audiences based on analytics data."] },
      { id: 3, name: "Lead Capture Funnels & CRM", points: ["Design landing pages optimized for mobile lead captures.", "Configure CRM pipelines to automatically follow up with leads."] }
    ],
    tools: ["ChatGPT", "Midjourney", "Ad Manager", "Hubspot", "Apollo.io"],
    outcomes: ["Deploy high-volume lead generation funnels", "Write highly optimized SEO content with AI assistance", "Build automated email drip marketing flows", "Analyze acquisition cost metrics"],
    faqs: [
      { q: "Do we learn how to run paid ads?", a: "Yes, we cover budgets, bidding, and analytics tracking for paid ads." },
      { q: "Is prior marketing knowledge required?", a: "No, we cover foundational marketing concepts in the first week." }
    ]
  },
  "cyber-security-with-ai": {
    title: "Cyber Security with AI (For All)",
    tagline: "Protect modern digital networks using AI-driven threat intelligence",
    headline: "Automate Vulnerability Scanning & Secure App Infrastructure",
    inclusions: ["120 Hours", "AI Cyber Security Certification", "Mentors: Senior Security Architects"],
    price: "999",
    originalPrice: "1999",
    discount: "50%",
    modules: [
      { id: 1, name: "Fundamentals of Modern Networks", points: ["Understand ports, protocols, firewalls, and proxy systems.", "Analyze server request logs to spot scanning patterns.", "Set up secure certificates and encrypted routes."] },
      { id: 2, name: "AI Threat Detection & Alerting", points: ["Write scripts to flag suspicious IP addresses automatically.", "Use machine learning tools to detect zero-day anomalies in logs."] },
      { id: 3, name: "Application Penetration Testing", points: ["Identify vulnerabilities in standard web APIs and forms.", "Write remediation reports and implement secure header rules."] }
    ],
    tools: ["Linux", "Python", "Wireshark", "Splunk", "OWASP ZAP"],
    outcomes: ["Audit websites and APIs for security weaknesses", "Identify and isolate malicious traffic patterns using AI tools", "Configure high-security web servers and reverse proxies", "Implement standard compliance security policies"],
    faqs: [
      { q: "Is this ethical hacking?", a: "Yes, we focus entirely on defensive security and authorized testing practices." },
      { q: "Do I need coding experience?", a: "Basic python commands are introduced, making it accessible to beginners." }
    ]
  }
};

export default function CourseDetailPage({ params }: { params: any }) {
  const resolvedParams: any = use(params);
  const course = coursesData[resolvedParams.slug] || coursesData["building-your-ai-agent-for-coders"];
  const [activeModule, setActiveModule] = useState<number | null>(1);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <main className="w-full bg-white text-gray-900 font-sans min-h-screen">
      {/* Navigation Header */}
      <Header />
      
      {/* ================= HERO SECTION LAYER ================= */}
      <section className="w-full bg-gradient-to-r from-neutral-950 via-neutral-900 to-[#C1121C]/20 text-white py-14 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <button onClick={() => window.history.back()} className="inline-flex items-center gap-2 text-xs font-bold text-neutral-400 hover:text-white transition-colors mb-4 uppercase tracking-widest">
              <ArrowLeft className="w-4 h-4" /> Back to courses
            </button>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight font-heading">
              {course.title}
            </h1>
            <p className="text-neutral-300 text-lg md:text-xl font-medium max-w-xl font-heading">
              "{course.tagline}"
            </p>
          </div>
          <div className="lg:col-span-5 flex justify-center">
            {/* Standard geometric placeholder mimicking your cybernetic layout visual */}
            <div className="w-72 h-72 rounded-full border-4 border-[#C1121C]/40 flex items-center justify-center p-6 bg-black/40 relative animate-pulse shadow-2xl">
              <span className="text-9xl font-sans font-black text-[#C1121C]/20 absolute select-none">∞</span>
              <span className="text-xs font-black tracking-widest text-white uppercase text-center relative z-10 font-heading">AI Architecture Portal</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PRIMARY CONTENT WRAPPER GRID ================= */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT INTERACTIVE TRACK PANELS (7 Columns wide) */}
          <div className="lg:col-span-7 space-y-16">
            
            {/* Overview Row Section */}
            <div className="space-y-6">
              <h2 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight font-heading">
                {course.headline}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
                <div className="text-center p-4 bg-gray-50 rounded-2xl"><Smartphone className="w-5 h-5 mx-auto text-[#C1121C] mb-1" /><span className="text-xs font-bold text-gray-700">Online Mode</span></div>
                <div className="text-center p-4 bg-gray-50 rounded-2xl"><BarChart className="w-5 h-5 mx-auto text-[#C1121C] mb-1" /><span className="text-xs font-bold text-gray-700">Skill Level</span></div>
                <div className="text-center p-4 bg-gray-50 rounded-2xl"><Clock className="w-5 h-5 mx-auto text-[#C1121C] mb-1" /><span className="text-xs font-bold text-gray-700">120 Hours</span></div>
                <div className="text-center p-4 bg-gray-50 rounded-2xl"><Award className="w-5 h-5 mx-auto text-[#C1121C] mb-1" /><span className="text-xs font-bold text-gray-700">Certified</span></div>
              </div>
            </div>

            {/* Curriculum Accordion Framework */}
            <div className="space-y-6">
              <h3 className="text-2xl font-black tracking-tight text-gray-900 font-heading">Curriculum Syllabus & Modules</h3>
              <div className="space-y-4">
                {course.modules.map((mod: any, index: number) => {
                  const isOpen = activeModule === mod.id;
                  return (
                    <div key={mod.id} className="border border-gray-200 rounded-2xl overflow-hidden shadow-xs transition-all bg-white">
                      <button 
                        onClick={() => setActiveModule(isOpen ? null : mod.id)}
                        className="w-full p-5 text-left flex items-center justify-between font-bold text-gray-900 bg-white hover:bg-gray-50/50 transition-colors"
                      >
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-[#C1121C] block mb-1">Module {index + 1}</span>
                          <span className="text-base font-extrabold text-gray-900">{mod.name}</span>
                        </div>
                        {isOpen ? <ChevronUp className="w-4 h-4 text-[#C1121C]" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                      </button>
                      {isOpen && (
                        <div className="p-6 bg-gray-50/50 border-t border-gray-100 space-y-3">
                          {mod.points.map((pt: string, pIdx: number) => (
                            <div key={pIdx} className="flex items-start text-sm text-gray-600"><span className="text-[#C1121C] mr-2">•</span><p>{pt}</p></div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tools Grid Panel */}
            <div className="space-y-4">
              <h3 className="text-xl font-black text-gray-900 font-heading">Tools You Master</h3>
              <div className="flex flex-wrap gap-4">
                {course.tools.map((tool: string, idx: number) => (
                  <span key={idx} className="bg-gray-100 font-mono text-xs font-black uppercase tracking-wider text-gray-700 px-4 py-2.5 rounded-xl border border-gray-200/50">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Outcomes Block Section */}
            <div className="space-y-4 bg-gray-950 text-white p-8 rounded-3xl relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C1121C]/10 rounded-full blur-2xl pointer-events-none" />
              <h3 className="text-xl font-black tracking-tight font-heading">Key Outcomes</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {course.outcomes.map((out: string, idx: number) => (
                  <div key={idx} className="flex items-center space-x-2.5 text-sm font-medium text-neutral-300">
                    <CheckCircle className="w-4 h-4 text-[#C1121C] shrink-0" />
                    <span>{out}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic FAQs Panel Layer */}
            <div className="space-y-6">
              <h3 className="text-2xl font-black tracking-tight text-gray-900 font-heading">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {course.faqs.map((faq: any, idx: number) => {
                  const isOpen = activeFaq === idx;
                  return (
                    <div key={idx} className="border border-gray-200 rounded-2xl bg-white shadow-xs">
                      <button 
                        onClick={() => setActiveFaq(isOpen ? null : idx)}
                        className="w-full p-5 text-left flex items-center justify-between font-bold text-gray-900"
                      >
                        <span className="text-sm md:text-base font-bold">{faq.q}</span>
                        {isOpen ? <ChevronUp className="w-4 h-4 text-[#C1121C]" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                      </button>
                      {isOpen && <p className="p-5 text-sm text-gray-600 bg-gray-50 border-t border-gray-100 leading-relaxed">{faq.a}</p>}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT SIDEBAR ACTION CTA BOX (5 Columns wide - LOCKED STICKY CONTRAINT) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6 z-20">
            <div className="bg-white border-2 border-gray-900 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-[#C1121C]" />
              
              <h3 className="text-xl font-black text-gray-900 mb-4 font-heading">Start learning today!</h3>
              <p className="text-xs font-semibold text-gray-400 mb-6">Maximize your productivity and apply it in your work to get best results</p>
              
              <div className="space-y-3.5 mb-6 pb-6 border-b border-gray-100">
                {course.inclusions.map((inc: string, idx: number) => (
                  <div key={idx} className="flex items-center space-x-2.5 text-xs font-bold text-gray-700">
                    <ShieldCheck className="w-4 h-4 text-[#C1121C] shrink-0" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-baseline space-x-3 mb-6">
                <span className="text-3xl font-black text-gray-900 font-mono">₹{course.price}</span>
                <span className="text-sm font-semibold text-gray-400 line-through font-mono">₹{course.originalPrice}</span>
                <span className="text-xs font-black uppercase tracking-wider bg-red-100 text-[#C1121C] px-2 py-0.5 rounded-md">
                  {course.discount} OFF
                </span>
              </div>

              <button className="w-full bg-[#C1121C] hover:bg-gray-900 text-white font-black py-4 px-6 rounded-xl transition-colors duration-300 shadow-md transform active:scale-[0.99] flex items-center justify-center space-x-2">
                <span>Enroll Now</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

interface LeaderData {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin: string;
}

const featuredLeaders: LeaderData[] = [
  { 
    name: "Ganta Srinath Reddy", 
    role: "Founder / CEO", 
    bio: "Visionary technical architect anchoring elite generative AI skilling paths for corporate ecosystems and technical workforces internationally. Ex-Tech Lead & Startup Architect with a decade of deploying high-scale AI systems.",
    image: "/assets/srinath.png",
    linkedin: "#"
  },
  { 
    name: "K. Spandana", 
    role: "Co-Founder", 
    bio: "Leading operational scale and foundational incubation paths across academic institutions and startup frameworks. Manages university alignments and student success programs.",
    image: "/assets/manaswini.png", // Kept mapping as per original code
    linkedin: "#"
  }
];

const leadershipTeam: LeaderData[] = [
  { 
    name: "ReddyReddy Manaswini", 
    role: "Head of Strategic Alliances", 
    bio: "Skilled professional with extensive experience in client relationships, stakeholder management, and establishing cross-functional enterprise bridges to connect students with corporate internships.",
    image: "/assets/spandana.png", // Kept mapping as per original code
    linkedin: "#"
  },
  { 
    name: "Rupak Thummalaeddy", 
    role: "Strategic Advisor", 
    bio: "Guiding product expansion and high-level industrial integration roadmaps for our emerging technical cohorts, ensuring curricula align with active hiring goals.",
    image: "/assets/rupak.png",
    linkedin: "#"
  }
];

const industryMentors: LeaderData[] = [
  { 
    name: "Ranjan Relan", 
    role: "Founding Mentor & AI Scientist", 
    bio: "Consultant for global startups and data engineering leader. Focuses on designing deep learning models, vector databases pipelines, and custom agentic frameworks.",
    image: "/assets/ranjan.png",
    linkedin: "#"
  },
  { 
    name: "Arun Chinnachamy", 
    role: "Curriculum Advisor & Tech Leader", 
    bio: "Startup CTO and advisor specializing in mobile scaling, distributed systems, and modern AI course syllabus frameworks that teach production-grade engineering.",
    image: "/assets/arun.png",
    linkedin: "#"
  },
  { 
    name: "Gopi Krishna Lakkepuram", 
    role: "Founding Mentor & Principal Architect", 
    bio: "Lead system architect with expert knowledge in cloud orchestration, GPU clustering, and hosting LLM runtimes under tight execution latency budgets.",
    image: "/assets/gopi.png",
    linkedin: "#"
  },
  { 
    name: "Kiran Babu", 
    role: "Founding Mentor & Platform Engineer", 
    bio: "Senior platform infrastructure engineer leading Docker containerizations, CI/CD pipeline automations, and secure vector database deployments.",
    image: "/assets/kiran.png",
    linkedin: "#"
  },
  { 
    name: "Executive Mentors", 
    role: "Strategic Enterprise Advisors", 
    bio: "A collective of active technology founders and VP level architects from top product firms directing curriculum updates based on modern industry requirements.",
    image: "/assets/logo.png",
    linkedin: "#"
  }
];

export default function Visionaries() {
  const shouldReduceMotion = useReducedMotion();

  // Unified scroll animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } 
    }
  };

  const linkedinIcon = (
    <svg className="w-3.5 h-3.5 fill-neutral-500 group-hover/link:fill-white transition-colors" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );

  return (
    <section id="leadership" className="w-full bg-white text-slate-900 py-14 px-6 md:px-12 relative overflow-hidden select-none border-b border-gray-200">
      {/* Red lighting accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full bg-red-50 blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        
        {/* ================= CATEGORY 1: FEATURED FOUNDERS ================= */}
        <div className="space-y-12">
          <div className="text-center space-y-2">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#EE1C25]">Visionaries</span>
            <h2 className="text-2xl md:text-4xl font-black font-heading tracking-tight text-white">Featured Profiles</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto justify-items-center">
            {featuredLeaders.map((leader, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="w-full max-w-[350px] bg-white border border-gray-200 rounded-2xl overflow-hidden p-5 flex flex-col justify-between space-y-5 hover:-translate-y-1 transition-all duration-300 shadow-xl group/card"
              >
                <div className="space-y-3.5">
                  {/* Portrait size: 340-380px reduced width/height */}
                  <div className="relative w-full h-[320px] rounded-xl overflow-hidden bg-gray-50 border border-gray-200">
                    <Image 
                      src={leader.image} 
                      alt={leader.name} 
                      fill
                      priority={idx === 0}
                      sizes="340px"
                      className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-[1.03]" 
                    />
                  </div>
                  {/* Details */}
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#EE1C25]">
                      {leader.role}
                    </span>
                    <h3 className="text-lg md:text-xl font-black font-heading tracking-tight text-slate-900 leading-tight">
                      {leader.name}
                    </h3>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed font-sans font-medium line-clamp-3">
                    {leader.bio}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <a href="#" className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-white transition-colors group/link" aria-label="LinkedIn profile">
                    {linkedinIcon}
                    <span>LinkedIn</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================= CATEGORY 2: LEADERSHIP TEAM ================= */}
        <div className="space-y-12">
          <div className="text-center space-y-2">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#EE1C25]">Core Management</span>
            <h2 className="text-xl md:text-3xl font-black font-heading tracking-tight text-white">Leadership Team</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 max-w-2xl mx-auto justify-items-center">
            {leadershipTeam.map((leader, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="w-full max-w-[260px] bg-white border border-gray-200 rounded-2xl overflow-hidden p-4 flex flex-col justify-between space-y-4 hover:-translate-y-1 transition-all duration-300 group/card"
              >
                <div className="space-y-3">
                  {/* Secondary sized image: h-[230px] */}
                  <div className="relative w-full h-[230px] rounded-lg overflow-hidden bg-gray-50 border border-gray-200">
                    <Image 
                      src={leader.image} 
                      alt={leader.name} 
                      fill
                      sizes="240px"
                      className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-[1.03]" 
                    />
                  </div>
                  {/* Details */}
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#EE1C25]">
                      {leader.role}
                    </span>
                    <h3 className="text-base font-black font-heading tracking-tight text-slate-900 leading-tight">
                      {leader.name}
                    </h3>
                  </div>
                  <p className="text-neutral-400 text-xs leading-relaxed font-sans font-medium line-clamp-3">
                    {leader.bio}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center">
                  <a href="#" className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-neutral-400 hover:text-white transition-colors group/link" aria-label="LinkedIn profile">
                    {linkedinIcon}
                    <span>LinkedIn</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================= CATEGORY 3: INDUSTRY MENTORS ================= */}
        <div className="space-y-12">
          <div className="text-center space-y-2">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#EE1C25]">Academic & Tech Advisory</span>
            <h2 className="text-xl md:text-3xl font-black font-heading tracking-tight text-white">Industry Mentors</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto justify-items-center">
            {industryMentors.map((leader, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="w-full max-w-[220px] bg-white border border-gray-200 rounded-xl overflow-hidden p-3.5 flex flex-col justify-between space-y-3.5 hover:-translate-y-1 transition-all duration-300 group/card"
              >
                <div className="space-y-2.5">
                  {/* Compact sized image: h-[190px] */}
                  <div className="relative w-full h-[190px] rounded-lg overflow-hidden bg-gray-50 border border-gray-200">
                    <Image 
                      src={leader.image} 
                      alt={leader.name} 
                      fill
                      sizes="200px"
                      className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-[1.03]" 
                    />
                  </div>
                  {/* Details */}
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-black uppercase tracking-wider text-[#EE1C25]">
                      {leader.role}
                    </span>
                    <h3 className="text-sm font-black font-heading tracking-tight text-slate-900 leading-tight line-clamp-1">
                      {leader.name}
                    </h3>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center">
                  <a href="#" className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-neutral-400 hover:text-white transition-colors group/link" aria-label="LinkedIn profile">
                    {linkedinIcon}
                    <span>LinkedIn</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

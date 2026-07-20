"use client";

import React, { useState } from 'react';

interface TeamMember {
  name: string;
  role: string;
  subRole: string;
  image: string;
  chips: string[];
  linkedin: string;
}

const founders: TeamMember[] = [
  {
    name: "Ganta Srinath Reddy",
    role: "Founder & CEO",
    subRole: "The AI School",
    image: "/assets/srinath.png",
    chips: ["10+ Yrs Exp", "Startups", "Tech Architect"],
    linkedin: "#"
  },
  {
    name: "K. Spandana",
    role: "Co-Founder",
    subRole: "The AI School",
    image: "/assets/manaswini.png", // Kept mapping as per original code
    chips: ["8+ Yrs Exp", "Operations", "Incubation"],
    linkedin: "#"
  }
];

const mentors: TeamMember[] = [
  {
    name: "Ranjan Relan",
    role: "Founding Mentor & AI Scientist",
    subRole: "Tech Architecture Expert",
    image: "/assets/ranjan.png",
    chips: ["Ex-Data Lead", "AI Architect"],
    linkedin: "#"
  },
  {
    name: "Arun Chinnachamy",
    role: "Curriculum Advisor & Tech Leader",
    subRole: "Ecosystem Innovator",
    image: "/assets/arun.png",
    chips: ["Startup Advisor", "Ex-CTO"],
    linkedin: "#"
  },
  {
    name: "Gopi Krishna Lakkepuram",
    role: "Founding Mentor & Principal Architect",
    subRole: "Industry Practitioner",
    image: "/assets/gopi.png",
    chips: ["Principal Architect", "Cloud Expert"],
    linkedin: "#"
  },
  {
    name: "Kiran Babu",
    role: "Founding Mentor & Platform Engineer",
    subRole: "Ecosystem Leader",
    image: "/assets/kiran.png",
    chips: ["Platform Engineer", "Infra Lead"],
    linkedin: "#"
  },
  {
    name: "Raja Mamidi",
    role: "Mentor",
    subRole: "Tech Innovator",
    image: "/assets/raja.png",
    chips: ["Tech Innovator", "Product Lead"],
    linkedin: "#"
  }
];

const leadership: TeamMember[] = [
  {
    name: "ReddyReddy Manaswini",
    role: "Head of Strategic Alliances",
    subRole: "Enterprise Partnerships",
    image: "/assets/spandana.png", // Kept mapping as per original code
    chips: ["Strategic Alliances", "Partnerships"],
    linkedin: "#"
  },
  {
    name: "Rupak Thummalaeddy",
    role: "Strategic Advisor",
    subRole: "Product & Integration",
    image: "/assets/rupak.png",
    chips: ["Strategic Advisor", "Product Strategy"],
    linkedin: "#"
  }
];

export default function MentorCarousel() {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (name: string) => {
    setImageErrors(prev => ({ ...prev, [name]: true }));
  };

  const renderCard = (member: TeamMember, isFounder = false) => {
    const errorKey = member.name;
    const hasError = imageErrors[errorKey];

    return (
      <div 
        key={member.name}
        className={`group bg-white border rounded-3xl overflow-hidden transition-all duration-300 flex flex-col relative z-10 w-full hover:-translate-y-2
          ${isFounder 
            ? 'border-red-500/20 shadow-[0_10px_30px_-10px_rgba(238,28,37,0.08)] hover:shadow-[0_20px_40px_-5px_rgba(238,28,37,0.15)] bg-gradient-to-br from-white to-red-50/10' 
            : 'border-gray-200 shadow-sm hover:shadow-xl'
          }`}
        style={{ maxWidth: isFounder ? '315px' : '300px' }}
      >
        {/* Top border red line animation */}
        <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-[#EE1C25] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center z-20" />

        {/* Image Container with Zoom effect */}
        <div className="w-full aspect-[4/3] bg-neutral-50 relative overflow-hidden">
          {!hasError ? (
            <img 
              src={member.image} 
              alt={member.name} 
              className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-500"
              onError={() => handleImageError(errorKey)}
            />
          ) : (
            <div className="absolute inset-0 bg-neutral-50 flex items-center justify-center p-6 text-center font-mono text-neutral-300 uppercase font-black tracking-wider text-xs select-none">
              {member.name.split(' ')[0]} Visual
            </div>
          )}

          {/* LinkedIn Icon Floating inside circular white button with premium hover animation */}
          <div className="absolute bottom-4 right-4 z-10">
            <a 
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#EE1C25] text-neutral-400 hover:text-white"
              aria-label={`${member.name} LinkedIn Profile`}
            >
              <svg className="w-4 h-4 fill-current transition-colors" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Content Area with adjusted padding for Founders */}
        <div className={`flex-1 flex flex-col justify-between border-t border-gray-50 ${isFounder ? 'p-5' : 'p-6'}`}>
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#EE1C25] bg-red-50 px-2 py-0.5 rounded font-heading inline-block">
              {member.role}
            </span>
            <h3 className="text-lg font-black text-gray-900 group-hover:text-[#EE1C25] transition-colors duration-200 font-heading">
              {member.name}
            </h3>
            <p className="text-xs text-neutral-400 font-medium leading-tight">
              {member.subRole}
            </p>
          </div>

          {/* Premium Experience Chips */}
          <div className="flex flex-wrap gap-1.5 pt-4 mt-3 border-t border-gray-100">
            {member.chips.map((chip, idx) => (
              <span 
                key={idx} 
                className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border ${
                  isFounder 
                    ? 'bg-red-50/50 text-[#EE1C25] border-red-100/50' 
                    : 'bg-neutral-50 text-neutral-500 border-neutral-100'
                }`}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="w-full bg-white pt-[120px] pb-[100px] px-6 md:px-12 border-t border-gray-100 relative overflow-hidden z-10">
      
      {/* Background Layer with grid and very faint constellation connectors */}
      <div 
        className="absolute inset-0 pointer-events-none select-none z-0"
        style={{ 
          backgroundImage: 'radial-gradient(circle at 1px 1px, #e5e7eb 1.2px, transparent 0)', 
          backgroundSize: '28px 28px',
          opacity: 0.7
        }}
      />
      
      {/* 2-3 faint SVG constellation curves and a few red nodes (Opacity under 6%) */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        {/* Subtle Glow behind Founders */}
        <div className="absolute top-[350px] left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-red-500/[0.03] rounded-full blur-[100px]" />
        
        <svg className="absolute inset-0 w-full h-full text-[#EE1C25]/[0.04]" xmlns="http://www.w3.org/2000/svg">
          <path d="M 20% 380 Q 40% 480 50% 600" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M 80% 380 Q 60% 480 50% 600" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M 50% 280 Q 50% 500 50% 750" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
          
          <circle cx="20%" cy="380" r="3" fill="#EE1C25" className="opacity-40 animate-pulse" />
          <circle cx="80%" cy="380" r="3" fill="#EE1C25" className="opacity-40 animate-pulse" />
          <circle cx="50%" cy="500" r="2.5" fill="#EE1C25" className="opacity-30 animate-pulse" />
          <circle cx="35%" cy="650" r="2" fill="#EE1C25" className="opacity-20" />
          <circle cx="65%" cy="650" r="2" fill="#EE1C25" className="opacity-20" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ================= SECTION HEADER ================= */}
        <div className="text-center space-y-4 max-w-3xl mx-auto pb-[48px]">
          <span className="text-xs font-bold uppercase tracking-widest text-[#EE1C25] font-heading">
            OUR PEOPLE
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight font-heading">
            Meet the People Behind The AI School
          </h2>
          <p className="text-base text-gray-500 font-medium leading-relaxed">
            Learn directly from startup founders, experienced mentors, and industry leaders building the future of AI.
          </p>
        </div>

        {/* ================= TIERS CONTAINER ================= */}
        <div className="space-y-[72px]">
          
          {/* TIER 1: FOUNDERS */}
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">
                FOUNDERS
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              {founders.map(member => renderCard(member, true))}
            </div>
          </div>

          {/* TIER 2: INDUSTRY MENTORS */}
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">
                INDUSTRY MENTORS
              </span>
            </div>
            {/* Desktop: 5, Tablet: 3 then 2, Mobile: 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center justify-center">
              {mentors.map(member => renderCard(member, false))}
            </div>
          </div>

          {/* TIER 3: LEADERSHIP TEAM */}
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">
                LEADERSHIP TEAM
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              {leadership.map(member => renderCard(member, false))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}


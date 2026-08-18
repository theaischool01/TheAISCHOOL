"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const LinkedInIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.78a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
  </svg>
);

const TwitterIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export interface Leader {
  name: string;
  role: string;
  image: string;
  initials?: string;
  bio?: string;
  linkedin?: string;
  twitter?: string;
}

export interface Partner {
  name: string;
  title: string;
  image: string;
  initials?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
}

/* Reusable Leader row card (Circle + Box side-by-side, mirrored Co-Founder layout) */
export function LeaderRowCard({
  leader,
  reversed = false,
}: {
  leader: Leader;
  reversed?: boolean;
}) {
  return (
    <div
      className={`flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 w-full max-w-4xl mx-auto ${
        reversed ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Large Circle Photo (220-260px desktop) */}
      <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full border-4 border-white shadow-xl overflow-hidden bg-slate-100 shrink-0 ring-1 ring-slate-200/80 group transition-transform duration-300 hover:scale-[1.02]">
        {leader.image ? (
          <Image
            src={leader.image}
            alt={leader.name}
            fill
            sizes="(max-width: 640px) 192px, 256px"
            className="object-cover object-top"
          />
        ) : (
          <span className="flex items-center justify-center w-full h-full text-3xl font-extrabold text-slate-500">
            {leader.initials}
          </span>
        )}
      </div>

      {/* Rectangular Info Box (Compact height, vertically centered, light reddish background) */}
      <div className="flex-1 w-full bg-[#FFF5F5] border border-red-100 rounded-2xl p-6 md:p-8 shadow-xs hover:shadow-md hover:border-red-200 transition-all duration-300 flex flex-col justify-center space-y-3 min-h-[140px] md:min-h-[160px] text-center md:text-left">
        {/* Name */}
        <h4 className="text-lg sm:text-xl font-black text-gray-950 uppercase tracking-tight leading-snug">
          {leader.name}
        </h4>

        {/* Title / Role in Accent Red */}
        <p className="text-xs sm:text-sm font-extrabold text-[#EE1C25] uppercase tracking-wider">
          {leader.role}
        </p>

        {/* Short Bio / Tagline */}
        {leader.bio && (
          <p className="text-xs font-semibold text-slate-600 leading-relaxed">
            {leader.bio}
          </p>
        )}

        {/* Social / Link Icons */}
        <div className="flex items-center justify-center md:justify-start gap-3 pt-1">
          {leader.linkedin && (
            <a
              href={leader.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white border border-red-100 text-slate-600 hover:text-[#EE1C25] hover:bg-red-100/50 hover:border-red-200 flex items-center justify-center transition-all duration-200"
              aria-label={`${leader.name} LinkedIn`}
            >
              <LinkedInIcon />
            </a>
          )}
          {leader.twitter && (
            <a
              href={leader.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white border border-red-100 text-slate-600 hover:text-[#EE1C25] hover:bg-red-100/50 hover:border-red-200 flex items-center justify-center transition-all duration-200"
              aria-label={`${leader.name} Twitter`}
            >
              <TwitterIcon />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* Reusable Partner Card: Two separate, distinct rectangular boxes (sharp rounded-none corners, exact matching width) stacked vertically with gap */
export function PartnerCard({
  partner,
  isAlternate = false,
}: {
  partner: Partner;
  isAlternate?: boolean;
}) {
  return (
    <div className="flex flex-col space-y-4 w-full max-w-[200px] sm:max-w-[220px] mx-auto group">
      {/* Upper Box: Standalone Photo Box (sharp corners - rounded-none) */}
      <div className="relative w-full h-[200px] sm:h-[220px] rounded-none overflow-hidden border border-slate-200/80 bg-black shadow-xs group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300 shrink-0">
        {partner.image ? (
          <Image
            src={partner.image}
            alt={partner.name}
            fill
            sizes="220px"
            className="object-cover object-top"
          />
        ) : (
          <span className="flex items-center justify-center w-full h-full text-xl font-extrabold text-slate-400">
            {partner.initials}
          </span>
        )}
      </div>

      {/* Lower Box: Standalone Info Box (Alternating Reddish bg-[#FFF5F5] vs White bg-white) */}
      <div
        className={`w-full border rounded-none p-3.5 sm:p-4 shadow-xs group-hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center text-center space-y-1.5 min-h-[90px] sm:min-h-[100px] ${
          isAlternate
            ? "bg-[#FFF5F5] border-red-100 group-hover:border-red-200"
            : "bg-white border-slate-200/80 group-hover:border-slate-300"
        }`}
      >
        {/* Name */}
        <h5 className="text-[10px] sm:text-[11px] font-black text-gray-950 uppercase tracking-tight leading-tight max-w-full text-center">
          {partner.name}
        </h5>

        {/* Designation/Title in Accent Red */}
        <p className="text-[8.5px] sm:text-[9px] font-extrabold text-[#EE1C25] uppercase tracking-wider leading-snug max-w-full text-center">
          {partner.title}
        </p>

        {/* Social Link Icons Row */}
        <div className="flex items-center justify-center gap-2 pt-1">
          {partner.linkedinUrl && (
            <a
              href={partner.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-6 h-6 rounded-full border text-slate-600 hover:text-[#EE1C25] flex items-center justify-center transition-all duration-200 ${
                isAlternate
                  ? "bg-white border-red-100 hover:bg-red-100/50 hover:border-red-200"
                  : "bg-slate-50 border-slate-200 hover:bg-red-50 hover:border-red-100"
              }`}
              aria-label={`${partner.name} LinkedIn`}
            >
              <LinkedInIcon className="w-3 h-3" />
            </a>
          )}
          {partner.twitterUrl && (
            <a
              href={partner.twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-6 h-6 rounded-full border text-slate-600 hover:text-[#EE1C25] flex items-center justify-center transition-all duration-200 ${
                isAlternate
                  ? "bg-white border-red-100 hover:bg-red-100/50 hover:border-red-200"
                  : "bg-slate-50 border-slate-200 hover:bg-red-50 hover:border-red-100"
              }`}
              aria-label={`${partner.name} Twitter`}
            >
              <TwitterIcon className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* Reusable MentorAvatar Component (Clean, borderless unit with small circular image + text + icons) */
export function MentorAvatar({ mentor }: { mentor: Partner }) {
  return (
    <div className="flex flex-col items-center text-center space-y-2.5 w-[130px] sm:w-[150px] shrink-0 snap-start group/mentor select-none">
      {/* Small Circular Avatar Image (90-110px desktop, 75-80px mobile) */}
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-2 border-white shadow-md overflow-hidden bg-slate-100 shrink-0 ring-1 ring-slate-200/80 transition-transform duration-300 group-hover/mentor:scale-105">
        {mentor.image ? (
          <Image
            src={mentor.image}
            alt={mentor.name}
            fill
            sizes="112px"
            className="object-cover object-top"
          />
        ) : (
          <span className="flex items-center justify-center w-full h-full text-lg font-extrabold text-slate-500">
            {mentor.initials}
          </span>
        )}
      </div>

      {/* Centered Name, Title & Social Links */}
      <div className="flex flex-col items-center text-center space-y-1 w-full px-1">
        {/* Name */}
        <h5 className="text-[11px] sm:text-xs font-black text-gray-950 uppercase tracking-tight leading-snug line-clamp-1">
          {mentor.name}
        </h5>

        {/* Title / Role in Accent Red */}
        <p className="text-[8.5px] sm:text-[9px] font-extrabold text-[#EE1C25] uppercase tracking-wider leading-tight line-clamp-1">
          {mentor.title}
        </p>

        {/* Social Link Icons Row */}
        <div className="flex items-center justify-center gap-1.5 pt-1">
          {mentor.linkedinUrl && (
            <a
              href={mentor.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 rounded-full bg-slate-50 border border-slate-200 text-slate-600 hover:text-[#EE1C25] hover:bg-red-50 hover:border-red-100 flex items-center justify-center transition-all duration-200"
              aria-label={`${mentor.name} LinkedIn`}
            >
              <LinkedInIcon className="w-3 h-3" />
            </a>
          )}
          {mentor.twitterUrl && (
            <a
              href={mentor.twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 rounded-full bg-slate-50 border border-slate-200 text-slate-600 hover:text-[#EE1C25] hover:bg-red-50 hover:border-red-100 flex items-center justify-center transition-all duration-200"
              aria-label={`${mentor.name} Twitter`}
            >
              <TwitterIcon className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TeamPreview() {
  const founders: Leader[] = [
    {
      name: "Ganta Srinath Reddy",
      role: "Founder/CEO",
      initials: "SR",
      image: "/mentors/srinath.webp",
      bio: "Startup founder and veteran AI solutions architect leading LLM pipelines, agent orchestration frameworks, and production-ready machine learning architectures.",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
    {
      name: "K. Spandana",
      role: "Co-Founder",
      initials: "KS",
      image: "/mentors/spandana.webp",
      bio: "Deep-learning operations specialist and educator driving curriculum design, student mentorship tracks, and strategic placement partnerships.",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  ];

  const partnerAvatars: Partner[] = [
    {
      initials: "AC",
      image: "/mentors/arun.webp",
      name: "Arun Chinnachamy",
      title: "Founder, ResidualHue",
      linkedinUrl: "https://www.linkedin.com/in/arun-chinnachamy/",
      twitterUrl: "https://twitter.com",
    },
    {
      initials: "GK",
      image: "/mentors/gopi.webp",
      name: "Gopi Krishna",
      title: "Founder & CEO, hyperleap.ai",
      linkedinUrl: "https://www.linkedin.com/in/gopil/",
      twitterUrl: "https://twitter.com",
    },
    {
      initials: "KB",
      image: "/mentors/kiran.webp",
      name: "Kiran Babu",
      title: "Co-Founder & CEO, rava.ai",
      linkedinUrl: "https://www.linkedin.com/in/yerranagu/",
      twitterUrl: "https://twitter.com",
    },
    {
      initials: "RM",
      image: "/mentors/raja.webp",
      name: "Raja Mamidi",
      title: "Co-Founder, DotCheckout",
      linkedinUrl: "https://www.linkedin.com/in/tmpraneethnaidu/",
      twitterUrl: "https://twitter.com",
    },
    {
      initials: "RR",
      image: "/mentors/ranjan.webp",
      name: "Ranjan Relan",
      title: "Founder & CEO, AgentAnalytics.AI",
      linkedinUrl: "https://www.linkedin.com/in/ranjan-relan/",
      twitterUrl: "https://twitter.com",
    },
  ];

  /* Complete 6-mentor list for Expert Network */
  const mentorAvatars: Partner[] = [
    {
      initials: "VP",
      image: "/images/mentor_vikas_v2.png",
      name: "Vikas Patel",
      title: "ML Consultant",
      linkedinUrl: "https://linkedin.com",
      twitterUrl: "https://twitter.com",
    },
    {
      initials: "SP",
      image: "/images/mentor_sagnik_v2.png",
      name: "Sagnik Pal",
      title: "Senior AI Architect",
      linkedinUrl: "https://linkedin.com",
      twitterUrl: "https://twitter.com",
    },
    {
      initials: "AV",
      image: "/images/mentor_akhil_v2.png",
      name: "Akhil Vydyula",
      title: "Agent Specialist",
      linkedinUrl: "https://linkedin.com",
      twitterUrl: "https://twitter.com",
    },
    {
      initials: "AP",
      image: "/images/mentor_anshu_v2.png",
      name: "Anshu Pandey",
      title: "NLP Researcher",
      linkedinUrl: "https://linkedin.com",
      twitterUrl: "https://twitter.com",
    },
    {
      initials: "HK",
      image: "/images/mentor_harish_v2.png",
      name: "Harish Kumar",
      title: "RAG Architect",
      linkedinUrl: "https://linkedin.com",
      twitterUrl: "https://twitter.com",
    },
    {
      initials: "MB",
      image: "/images/mentor_mohit.png",
      name: "Mohit Bhatia",
      title: "AI Mentor",
      linkedinUrl: "https://linkedin.com",
      twitterUrl: "https://twitter.com",
    },
  ];

  return (
    <section className="w-full bg-transparent py-16 lg:py-20 px-6 md:px-12 relative z-10 font-heading select-none">
      {/* Global Style for Smooth Continuous Marquee Animation */}
      <style jsx global>{`
        @keyframes mentorMarquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-mentor-marquee {
          animation: mentorMarquee 32s linear infinite;
        }
      `}</style>

      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header Title */}
        <div className="text-center space-y-2">
          <h3 className="text-2xl md:text-3xl font-black text-gray-950 uppercase tracking-tight">
            Our Leadership Members
          </h3>
        </div>

        {/* ================= SECTION 1: FOUNDERS (MIRRORED HORIZONTAL PAIRS) ================= */}
        <div className="w-full space-y-16 md:space-y-20">
          {founders.map((founder, idx) => (
            <LeaderRowCard
              key={idx}
              leader={founder}
              reversed={idx % 2 === 1} // Row 1: circle-left/box-right, Row 2: box-left/circle-right
            />
          ))}
        </div>

        {/* ================= SECTION 2: INDUSTRY PARTNERS (TWO SHARP MATCHING BOXES PER PERSON) ================= */}
        <div className="w-full pt-4">
          <hr className="border-gray-200/60 mb-12" />
          
          <div className="flex items-center justify-between mb-10">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400">
                INDUSTRY PARTNERS
              </span>
              <h4 className="text-lg font-black text-gray-950 uppercase tracking-tight">
                Backed by Tech Founders
              </h4>
            </div>
            <Link 
              href="/about-us" 
              className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#EE1C25] hover:text-[#d61920] group"
            >
              <span>MEET OUR PARTNERS</span> 
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 items-start justify-items-center">
            {partnerAvatars.map((partner, idx) => (
              <PartnerCard key={idx} partner={partner} isAlternate={idx % 2 === 0} />
            ))}
          </div>
        </div>

        {/* ================= SECTION 3: EXPERT NETWORK (CONTINUOUS AUTO-SCROLLING MARQUEE) ================= */}
        <div className="w-full pt-4">
          <hr className="border-gray-200/60 mb-12" />
          
          <div className="flex items-center justify-between mb-10">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400">
                EXPERT NETWORK
              </span>
              <h4 className="text-lg font-black text-gray-950 uppercase tracking-tight">
                Learn Live with ML Architects
              </h4>
            </div>
            <Link 
              href="/about-us" 
              className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#EE1C25] hover:text-[#d61920] group"
            >
              <span>VIEW ALL MENTORS</span> 
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Continuous Auto-Scrolling Marquee Track with Duplicated List for Seamless Loop */}
          <div className="relative w-full overflow-hidden group">
            {/* Left Edge Gradient Fade */}
            <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
            {/* Right Edge Gradient Fade */}
            <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

            {/* Marquee Track: duplicated list renders 12 items (2 x 6 mentors) moving continuously */}
            <div className="flex items-start gap-8 sm:gap-10 w-max animate-mentor-marquee hover:[animation-play-state:paused] py-4 px-3">
              {[...mentorAvatars, ...mentorAvatars].map((mentor, idx) => (
                <MentorAvatar key={idx} mentor={mentor} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

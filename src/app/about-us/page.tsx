'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect, useRef } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';
import { 
  Sparkles, Target, Compass, Award, ShieldCheck, Zap, 
  ArrowRight, ArrowUpRight, HelpCircle, CheckCircle2, XCircle,
  Rocket, Users, Trophy, Globe, MinusCircle
} from 'lucide-react';

// ================= HOOKS & UTILS =================

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function RevealOnScroll({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-800 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// CountUp Animation Component
function AnimatedCount({ value, label, prefix = "", suffix = "" }: { value: number; label: string; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    let totalDuration = 1500;
    let incrementTime = Math.abs(Math.floor(totalDuration / end));

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start === end) clearInterval(timer);
          }, incrementTime);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center p-5 bg-gray-50 border border-gray-150 rounded-2xl relative overflow-hidden group">
      <div className="absolute inset-0 bg-red-500/[0.01] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      <span className="block text-4xl md:text-5xl font-black text-gray-900 tracking-tight font-sans relative z-10">
        {prefix}{count}{suffix}
      </span>
      <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mt-2 relative z-10">{label}</span>
    </div>
  );
}

// Custom inline SVG LinkedIn icon
const LinkedinIcon = () => (
  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

// Reusable Team Member Card Component (Fixes fallback badge overlapping)
function TeamMemberCard({ member, size = 120, isPremium = false, description = "" }: { member: any; size?: number; isPremium?: boolean; description?: string }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div 
      className={`border rounded-2xl p-6 flex flex-col items-center text-center space-y-4 hover:-translate-y-1 hover:shadow-md transition-all group duration-300 relative overflow-hidden ${
        isPremium ? "bg-white border-gray-200/90 shadow-xs" : "bg-gray-50/50 border-gray-150"
      }`}
    >
      {/* Avatar Container with configurable size and zero overlap */}
      <div 
        style={{ width: `${size}px`, height: `${size}px` }} 
        className="rounded-full overflow-hidden border-4 border-white shadow-xs shrink-0 bg-red-50 flex items-center justify-center relative"
      >
        {!imgFailed && member.image ? (
          <img 
            src={member.image} 
            alt={member.name} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
            onError={() => setImgFailed(true)} 
          />
        ) : (
          <span className="text-red-600 font-extrabold text-xl uppercase select-none">{member.initials}</span>
        )}
      </div>

      {/* Name, Title, and Integrated LinkedIn Link */}
      <div className="space-y-1.5 flex-1 flex flex-col justify-between w-full">
        <div>
          <div className="flex items-center justify-center gap-1.5">
            <h4 className="font-extrabold text-gray-900 text-sm leading-tight">{member.name}</h4>
            <a 
              href={member.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-red-500 hover:text-[#d61920] transition-colors shrink-0"
              aria-label={`${member.name} LinkedIn`}
            >
              <LinkedinIcon />
            </a>
          </div>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">{member.title}</p>
          {member.company && (
            <p className="text-[9px] text-[#EE1C25] font-black uppercase tracking-widest mt-0.5">{member.company}</p>
          )}
        </div>

        {/* Short context line */}
        {description && (
          <p className="text-[11px] text-slate-500 leading-relaxed font-semibold mt-2 border-t border-gray-100/70 pt-2 px-1">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

// ================= MAIN COMPONENT =================

export default function AboutUsPage() {
  const [activeSection, setActiveSection] = useState("story");
  const [showStickyNav, setShowStickyNav] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const sectionsRef = {
    story: useRef<HTMLDivElement>(null),
    impact: useRef<HTMLDivElement>(null),
    whyUs: useRef<HTMLDivElement>(null),
    people: useRef<HTMLDivElement>(null),
    journey: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    // Sticky Nav visibility spy
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        setShowStickyNav(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) heroObserver.observe(heroRef.current);

    // Section jump highlighting spy
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.25, rootMargin: "-80px 0px -40% 0px" }
    );

    Object.values(sectionsRef).forEach((ref) => {
      if (ref.current) sectionObserver.observe(ref.current);
    });

    return () => {
      heroObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  const scrollToSection = (id: keyof typeof sectionsRef) => {
    const targetRef = sectionsRef[id];
    if (targetRef.current) {
      const headerOffset = 130;
      const elementPosition = targetRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Static Data
  const leadership = [
    {
      name: "Ganta Srinath Reddy",
      title: "Founder/CEO",
      initials: "SR",
      image: "/mentors/srinath.webp",
      linkedin: "https://www.linkedin.com/in/srinathreddy-g/",
      desc: "Spearheading curriculum engineering and strategic partnerships globally."
    },
    {
      name: "K. Spandana",
      title: "Co-Founder",
      initials: "KS",
      image: "/mentors/spandana.webp",
      linkedin: "https://www.linkedin.com/company/theaischool/",
      desc: "Managing academic operations, mentor frameworks, and student success pipelines."
    },
    {
      name: "Manaswini Reddy",
      title: "Head of Strategic Alliances",
      initials: "MR",
      image: "/mentors/manaswini.webp",
      linkedin: "https://www.linkedin.com/in/reddyreddy-manaswini-181581135/",
      desc: "Forging enterprise ties and university collaborations across active hubs."
    },
    {
      name: "Rupak Thummalaeddy",
      title: "Strategic Advisor",
      initials: "RT",
      image: "/mentors/rupak.webp",
      linkedin: "https://www.linkedin.com/company/theaischool/",
      desc: "Advising on company growth strategy, startup scaling, and long-term milestones."
    },
  ];

  const partners = [
    {
      name: "Arun Chinnachamy",
      title: "Founder",
      company: "ResidualHue",
      initials: "AC",
      image: "/mentors/arun.webp",
      linkedin: "https://www.linkedin.com/in/arun-chinnachamy/",
      desc: "Founder of ResidualHue, aligning AI talent with production demands."
    },
    {
      name: "Gopi Krishna",
      title: "Founder & CEO",
      company: "hyperleap.ai",
      initials: "GK",
      image: "/mentors/gopi.webp",
      linkedin: "https://www.linkedin.com/in/gopil/",
      desc: "Founder & CEO of hyperleap.ai, advising on custom LLM application layers."
    },
    {
      name: "Kiran Babu",
      title: "Co-Founder and CEO",
      company: "rava.ai",
      initials: "KB",
      image: "/mentors/kiran.webp",
      linkedin: "https://www.linkedin.com/in/yerranagu/",
      desc: "Co-Founder and CEO of rava.ai, advising on autonomous agent design."
    },
    {
      name: "Raja Mamidi",
      title: "Co-Founder",
      company: "DotCheckout",
      initials: "RM",
      image: "/mentors/raja.webp",
      linkedin: "https://www.linkedin.com/in/tmpraneethnaidu/",
      desc: "Co-Founder of DotCheckout, linking payment stack deployments."
    },
    {
      name: "Ranjan Relan",
      title: "Founder/CEO",
      company: "AgentAnalytics.AI",
      initials: "RR",
      image: "/mentors/ranjan.webp",
      linkedin: "https://www.linkedin.com/in/ranjan-relan/",
      desc: "Founder of AgentAnalytics.AI, shaping analytics pipelines curricula."
    },
  ];

  const mentors = [
    {
      name: "Vikas Patel",
      title: "ML Scientist @ Nykaa",
      initials: "VP",
      image: "/images/mentor_vikas_v2.png",
      linkedin: "https://www.linkedin.com/in/vikaspatel79/",
    },
    {
      name: "Sagnik Pal",
      title: "Generative AI Consultant & Trainer",
      initials: "SP",
      image: "/images/mentor_sagnik_v2.png",
      linkedin: "https://www.linkedin.com/in/sagnikpal/",
    },
    {
      name: "Akhil Vydyula",
      title: "Senior Data Scientist @ PwC",
      initials: "AV",
      image: "/images/mentor_akhil_v2.png",
      linkedin: "https://www.linkedin.com/in/akhilvydyula/",
    },
    {
      name: "Anshu Pandey",
      title: "Head of Technology @ Blue Data",
      initials: "AP",
      image: "/images/mentor_anshu_v2.png",
      linkedin: "https://www.linkedin.com/in/anshupandey/",
    },
    {
      name: "Harish Kumar",
      title: "Lead Data Scientist",
      initials: "HK",
      image: "/images/mentor_harish_v2.png",
      linkedin: "https://www.linkedin.com/in/harishkumar1111/",
    },
  ];

  return (
    <main className="w-full bg-white text-gray-900 min-h-screen font-sans">
      <Header />

      {/* ================= 1. CINEMATIC HERO ================= */}
      <div ref={heroRef} className="relative w-full bg-[#FCFCFD] text-slate-900 flex items-center justify-center pt-12 pb-20 border-b border-[#ECECEC]">
        <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-0" style={{ backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`, backgroundSize: "30px 30px" }} />
        <div className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-red-500/[0.015] blur-[120px] pointer-events-none z-0" />
        
        <div className="max-w-6xl mx-auto px-6 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-[#EE1C25]/10 border border-[#EE1C25]/20 rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#EE1C25]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Behind the Intelligence</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none uppercase max-w-4xl mx-auto">
            Practical AI Education <br />
            <span className="text-[#EE1C25]">Built For Careers.</span>
          </h1>
          <p className="text-slate-500 text-sm md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            We are startup founders, research engineers, and deployment consultants bridging the gap between theoretical knowledge and production-ready AI systems.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <button onClick={() => scrollToSection("story")} className="bg-[#EE1C25] hover:bg-[#d61920] text-white font-extrabold text-xs uppercase tracking-wider px-8 py-4 rounded-xl transition-all shadow-md cursor-pointer">
              Our Story
            </button>
            <button onClick={() => scrollToSection("whyUs")} className="border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-extrabold text-xs uppercase tracking-wider px-8 py-4 rounded-xl transition-all shadow-sm cursor-pointer">
              Why Choose Us
            </button>
          </div>
        </div>
      </div>

      {/* ================= STICKY SUB-NAVIGATION BAR ================= */}
      {showStickyNav && (
        <div className="sticky top-20 w-full bg-white/95 backdrop-blur-md border-b border-gray-150 z-[990] py-3.5 px-6 hidden md:block animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-widest text-gray-400">About Section Menu</span>
            <div className="flex space-x-8">
              {(Object.keys(sectionsRef) as Array<keyof typeof sectionsRef>).map((key) => {
                const labelMap = { story: "Story", impact: "Impact", whyUs: "Why Us", people: "People", journey: "Journey" };
                return (
                  <button
                    key={key}
                    onClick={() => scrollToSection(key)}
                    className={`text-xs font-black uppercase tracking-widest transition-colors cursor-pointer ${
                      activeSection === key ? "text-[#EE1C25]" : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    {labelMap[key]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ================= 2. IMPACT BY THE NUMBERS ================= */}
      <div id="impact" ref={sectionsRef.impact} className="w-full bg-white border-b border-gray-100 py-14 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <AnimatedCount value={500} label="Students Trained" suffix="+" />
            <AnimatedCount value={85} label="Outcome Rate" suffix="%" />
            <AnimatedCount value={9} label="Industry Mentors" suffix="+" />
            <AnimatedCount value={3} label="Hackathons Hosted" suffix="+" />
          </div>
        </div>
      </div>

      {/* ================= 3. WHO WE ARE (team photo asset grayscale/duotone) ================= */}
      <div id="story" ref={sectionsRef.story} className="w-full bg-white py-14 px-6 md:px-12 border-b border-gray-100">
        <RevealOnScroll className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl md:text-4xl font-black text-[#EE1C25]/20">01</span>
              <span className="h-px w-8 bg-neutral-200" />
              <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-[#EE1C25]">Who We Are</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-[1.1] text-gray-950 uppercase">
              Connecting Ambition with Practical AI Expertise.
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed font-semibold">
              The AI School was founded to break down the barrier between theoretical academic courses and actual startup production requirements. We operate out of T-Hub 2.0 in Hyderabad, providing students direct links to real startups, founders, and engineers.
            </p>
          </div>
          {/* Framed duotone group photo */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full aspect-[4/3] max-w-[480px] bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden p-2">
              <div className="relative w-full h-full rounded-xl overflow-hidden filter grayscale-[40%]">
                <img 
                  src="/images/hackathon_stage1.jpg" 
                  alt="The AI School team group photo on stage" 
                  className="object-cover w-full h-full select-none"
                />
                {/* Red multiply blend overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-red-600/10 to-transparent mix-blend-multiply pointer-events-none" />
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>

      {/* ================= 4. FOUNDER'S NOTE ================= */}
      <div className="w-full bg-gray-50 border-b border-gray-150 py-14 px-6 md:px-12">
        <RevealOnScroll className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Circular Photo (Zero overlap fallback) */}
          <div className="w-28 h-28 rounded-full border-4 border-white shadow-md overflow-hidden shrink-0 bg-red-50 flex items-center justify-center relative">
            <img 
              src="/mentors/srinath.webp" 
              alt="Ganta Srinath Reddy" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-4 text-center md:text-left flex-1">
            <blockquote className="text-lg md:text-xl font-bold font-heading italic text-gray-800 leading-relaxed">
              &ldquo;We built The AI School because certificates without careers weren't good enough. Every mentor here has built something real — and they're in the room with you while you build yours.&rdquo;
            </blockquote>
            <div>
              <h4 className="font-extrabold text-gray-900 text-sm">Ganta Srinath Reddy</h4>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-0.5">Founder & CEO, The AI School</p>
            </div>
          </div>
        </RevealOnScroll>
      </div>

      {/* ================= 5. MISSION + COMMITMENT (Redesigned with top border & watermark) ================= */}
      <div className="w-full bg-white py-14 px-6 md:px-12 border-b border-gray-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Mission Card */}
          <RevealOnScroll className="bg-gray-50 border border-gray-200 rounded-3xl p-8 space-y-6 relative overflow-hidden flex flex-col justify-between border-t-[3px] border-t-[#EE1C25]">
            <Target className="absolute -bottom-8 -right-8 w-32 h-32 text-[#EE1C25]/[0.025] pointer-events-none" />
            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-red-50 border-2 border-red-100 text-[#EE1C25] flex items-center justify-center shrink-0">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-gray-900 uppercase tracking-tight">Our Mission</h3>
                  <p className="text-[10px] font-bold text-[#EE1C25] uppercase tracking-widest">DRIVE INNOVATION</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 font-semibold leading-relaxed pt-2">
                Our mission is to drive innovation and continuous improvement through comprehensive educational programs, entrepreneurial support, and robust industry network pipelines in association with global organizations.
              </p>
            </div>
          </RevealOnScroll>

          {/* Commitment Card */}
          <RevealOnScroll className="bg-gray-50 border border-gray-200 rounded-3xl p-8 space-y-6 relative overflow-hidden flex flex-col justify-between border-t-[3px] border-t-[#171717]" delay={150}>
            <Compass className="absolute -bottom-8 -right-8 w-32 h-32 text-neutral-900/[0.02] pointer-events-none" />
            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-neutral-100 border-2 border-neutral-200 text-neutral-800 flex items-center justify-center shrink-0">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-gray-900 uppercase tracking-tight">Our Commitment</h3>
                  <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">COLLABORATIVE GROWTH</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 font-semibold leading-relaxed pt-2">
                Our commitment extends to fostering a collaborative ecosystem that encourages lifelong learning, cultivates creativity, and promotes sustainable growth by aligning efforts with the needs of the digital age.
              </p>
            </div>
          </RevealOnScroll>

        </div>
      </div>

      {/* ================= 6. OUR VALUES (Enhanced 64px icon & hover state) ================= */}
      <div className="w-full bg-gray-50/50 py-14 px-6 md:px-12 border-b border-gray-100">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#EE1C25]">FOUNDATIONAL ETHOS</span>
            <h2 className="text-2xl md:text-4xl font-black text-gray-950 uppercase tracking-tight">Our Core Values</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: "Real Mastery", desc: "No fluff or plain video libraries. We teach raw code, engineering stack and models deployment." },
              { icon: Award, title: "Outcome-Driven", desc: "Success is measured in products built, startups launched, and high-impact job conversions." },
              { icon: ShieldCheck, title: "Industry Sync", desc: "Our syllabus shifts dynamically according to modern LLM benchmarks and frameworks." },
              { icon: Compass, title: "Curiosity Always", desc: "Encouraging experimentations with cutting-edge agent pipelines and custom configurations." }
            ].map((v, idx) => (
              <RevealOnScroll key={idx} className="bg-white border border-gray-200 p-6 rounded-2xl space-y-4 hover:shadow-md transition-shadow group cursor-default" delay={idx * 100}>
                <div className="w-16 h-16 rounded-full bg-red-50 border-2 border-red-100 text-[#EE1C25] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <v.icon className="w-6 h-6" />
                </div>
                <h4 className="font-extrabold text-gray-900 text-sm uppercase">{v.title}</h4>
                <p className="text-xs text-slate-500 font-bold leading-relaxed">{v.desc}</p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>

      {/* ================= 7. WHY US (Redesigned Row-by-Row Comparison Table) ================= */}
      <div id="whyUs" ref={sectionsRef.whyUs} className="w-full bg-white py-14 px-6 md:px-12 border-b border-gray-100">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#EE1C25]">THE TRANSFORMATION</span>
            <h2 className="text-2xl md:text-4xl font-black text-gray-950 uppercase tracking-tight">The AI School vs. Typical Bootcamp</h2>
          </div>

          <RevealOnScroll className="border border-gray-200 rounded-3xl overflow-hidden shadow-md">
            {/* Header row */}
            <div className="grid grid-cols-2 bg-gray-50 border-b border-gray-200 p-4 text-center">
              <div className="font-black text-gray-900 text-sm uppercase tracking-wider relative flex items-center justify-center">
                <span>The AI School</span>
                <span className="absolute top-0 right-0 bg-[#EE1C25] text-white text-[8px] font-black uppercase tracking-widest py-0.5 px-1.5 rounded-sm transform translate-x-2 -translate-y-2">
                  RECOMMENDED
                </span>
              </div>
              <div className="font-black text-gray-400 text-sm uppercase tracking-wider">
                Typical Bootcamp
              </div>
            </div>

            {/* Alternating Rows */}
            {[
              {
                topic: "Mentors",
                us: "Startup Founders & Industry Leaders",
                them: "Certified Trainers"
              },
              {
                topic: "Curriculum",
                us: "Live real-world startup projects",
                them: "Textbook case studies"
              },
              {
                topic: "Support",
                us: "1:1 mentorship, hackathons, placement support",
                them: "Self-paced videos only"
              },
              {
                topic: "Network",
                us: "Lifetime alumni + founder network",
                them: "No ongoing community"
              }
            ].map((row, idx) => (
              <div key={idx} className={`grid grid-cols-2 p-5 items-center relative gap-4 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}>
                
                {/* Center Divider/VS Badge on Desktop */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-7 h-7 bg-white border border-gray-200 rounded-full text-[9px] font-black text-gray-400 z-10 shadow-xs">
                  VS
                </div>

                {/* AI School Column */}
                <div className="flex items-start space-x-3 pr-2 md:pr-4">
                  <CheckCircle2 className="w-5 h-5 text-[#EE1C25] shrink-0 fill-red-500/10 mt-0.5" />
                  <div>
                    <span className="block text-[9px] font-black text-gray-400 uppercase tracking-widest">{row.topic}</span>
                    <span className="font-extrabold text-gray-900 text-xs md:text-sm">{row.us}</span>
                  </div>
                </div>

                {/* Typical Bootcamp Column */}
                <div className="flex items-start space-x-3 pl-2 md:pl-6 border-l border-gray-100">
                  <MinusCircle className="w-5 h-5 text-gray-300 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[9px] font-black text-gray-400 uppercase tracking-widest">{row.topic}</span>
                    <span className="font-bold text-slate-500 text-xs md:text-sm">{row.them}</span>
                  </div>
                </div>

              </div>
            ))}
          </RevealOnScroll>
        </div>
      </div>

      {/* ================= 8. PEOPLE (Redesigned with hierarchy and description context) ================= */}
      <div id="people" ref={sectionsRef.people} className="w-full bg-white py-14 px-6 md:px-12 border-b border-gray-100">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#EE1C25]">THE ECOSYSTEM DIRECTORS</span>
            <h2 className="text-2xl md:text-4xl font-black text-gray-950 uppercase tracking-tight">Our Core Team</h2>
          </div>

          <div className="space-y-16">
            
            {/* Leadership Section (size 140px, premium bg-white) */}
            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-[#EE1C25] border-b border-gray-100 pb-2">Leadership Team</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {leadership.map((l, idx) => (
                  <RevealOnScroll key={idx} delay={idx * 80}>
                    <TeamMemberCard member={l} size={140} isPremium={true} description={l.desc} />
                  </RevealOnScroll>
                ))}
              </div>
            </div>

            {/* Strategic Advisors / Partners Section (size 120px) */}
            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-neutral-500 border-b border-gray-100 pb-2">Industry Partners & Advisors</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {partners.map((p, idx) => (
                  <RevealOnScroll key={idx} delay={idx * 80}>
                    <TeamMemberCard member={p} size={120} isPremium={false} description={p.desc} />
                  </RevealOnScroll>
                ))}
              </div>
            </div>

            {/* Technical Mentors Section (size 120px) */}
            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-neutral-500 border-b border-gray-100 pb-2">Technical Mentors</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {mentors.map((m, idx) => (
                  <RevealOnScroll key={idx} delay={idx * 80}>
                    <TeamMemberCard member={m} size={120} isPremium={false} />
                  </RevealOnScroll>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ================= 9. ALUMNI SPOTLIGHT ================= */}
      <div className="w-full bg-gray-50/50 py-14 px-6 md:px-12 border-b border-gray-100">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#EE1C25]">CAREER PATHWAYS</span>
            <h2 className="text-2xl md:text-4xl font-black text-gray-950 uppercase tracking-tight">Alumni Outcome Spotlight</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Priya S.", before: "Marketing Executive", after: "AI Product Analyst at ResHue", initials: "PS", story: "Leveraged LLM workflows to automate strategic marketing analysis." },
              { name: "Rahul K.", before: "Junior Software Engineer", after: "Lead Agent Developer at rava.ai", initials: "RK", story: "Transitioned from legacy web structures to custom agent orchestration." },
              { name: "Suresh P.", before: "College Graduate", after: "Generative AI Architect at DotCheckout", initials: "SP", story: "Graduated with 3 live startup deployment projects directly in his CV." }
            ].map((alumni, idx) => (
              <RevealOnScroll key={idx} className="bg-white border border-gray-200 p-6 rounded-2xl space-y-4 shadow-xs" delay={idx * 100}>
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-red-50 text-[#EE1C25] font-extrabold text-[10px] uppercase flex items-center justify-center">
                    {alumni.initials}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-gray-900 text-sm">{alumni.name}</h4>
                  </div>
                </div>
                <div className="space-y-1 border-t border-b border-gray-100 py-3 text-xs font-bold text-gray-700">
                  <div>Before: <span className="text-gray-400">{alumni.before}</span></div>
                  <div className="text-emerald-600 font-extrabold">After: {alumni.after}</div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">{alumni.story}</p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>

      {/* ================= 10. JOURNEY / MILESTONES (Redesigned Connected timeline cards) ================= */}
      <div id="journey" ref={sectionsRef.journey} className="w-full bg-white py-14 px-6 md:px-12 border-b border-gray-100">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#EE1C25]">THE EVOLUTION</span>
            <h2 className="text-2xl md:text-4xl font-black text-gray-950 uppercase tracking-tight">Our Timeline Milestones</h2>
          </div>

          {/* Desktop Connected Horizontal Timeline */}
          <div className="hidden md:block relative py-12">
            {/* Center connector line */}
            <div className="absolute top-[38px] left-10 right-10 h-[3px] bg-gray-100 z-0">
              <div className="w-full h-full bg-[#EE1C25]" />
            </div>

            <div className="grid grid-cols-5 gap-6 relative z-10">
              {[
                { title: "Founded", date: "2024", icon: Rocket, desc: "The AI School launches in Hyderabad, India out of T-Hub 2.0." },
                { title: "First Cohort", date: "Late 2024", icon: Users, desc: "First batch of AI ready Developers enrolled in production-sync tracks." },
                { title: "First Hackathon", date: "Early 2025", icon: Trophy, desc: "Hosted in partnership with T-Hub 2.0, showcasing student projects to active VCs." },
                { title: "National Recognition", date: "Mid 2025", icon: Award, desc: "Forged partnerships with BSNL Academy and Ministry representatives." },
                { title: "Global Expansion", date: "2026", icon: Globe, desc: "USA and Philippines regional portals launch to match worldwide AI staffing demands." }
              ].map((point, idx) => {
                const Icon = point.icon;
                return (
                  <div key={idx} className="flex flex-col items-center text-center space-y-6">
                    {/* Dot Marker with Icon inside */}
                    <div className="w-10 h-10 rounded-full bg-white border-2 border-[#EE1C25] text-[#EE1C25] flex items-center justify-center shadow-md shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    {/* Card Content underneath */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs w-full min-h-[140px] flex flex-col justify-between text-left">
                      <div>
                        <span className="block text-[10px] font-black text-[#EE1C25] uppercase tracking-widest">{point.date}</span>
                        <h4 className="font-extrabold text-sm text-gray-900 uppercase mt-1">{point.title}</h4>
                      </div>
                      <p className="text-[11px] text-slate-500 font-semibold leading-relaxed mt-2">{point.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile vertical timeline */}
          <div className="block md:hidden relative pl-6 border-l-2 border-gray-100 space-y-8 py-2">
            {[
              { title: "Founded", date: "2024", icon: Rocket, desc: "The AI School launches in Hyderabad, India out of T-Hub 2.0." },
              { title: "First Cohort", date: "Late 2024", icon: Users, desc: "First batch of AI ready Developers enrolled in production-sync tracks." },
              { title: "First Hackathon", date: "Early 2025", icon: Trophy, desc: "Hosted in partnership with T-Hub 2.0, showcasing student projects to active VCs." },
              { title: "National Recognition", date: "Mid 2025", icon: Award, desc: "Forged partnerships with BSNL Academy and Ministry representatives." },
              { title: "Global Expansion", date: "2026", icon: Globe, desc: "USA and Philippines regional portals launch to match worldwide AI staffing demands." }
            ].map((point, idx) => {
              const Icon = point.icon;
              return (
                <div key={idx} className="relative space-y-1.5">
                  <div className="absolute -left-[30px] top-1.5 w-8 h-8 rounded-full bg-white border-2 border-[#EE1C25] text-[#EE1C25] flex items-center justify-center shadow-xs">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="block text-[9px] font-black text-[#EE1C25] uppercase tracking-widest">{point.date}</span>
                  <h4 className="font-extrabold text-sm text-gray-900 uppercase">{point.title}</h4>
                  <p className="text-xs text-slate-500 font-bold leading-relaxed">{point.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= 11. GLOBAL REACH ================= */}
      <div className="w-full bg-gray-50/50 py-14 px-6 md:px-12 border-b border-gray-100">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#EE1C25]">ACTIVE REGIONS</span>
            <h2 className="text-2xl md:text-4xl font-black text-gray-950 uppercase tracking-tight">Our Global Operations</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "India", code: "in", flag: "in.png", desc: "Headquarters based in T-Hub 2.0, Hyderabad. Main training and engineering hub." },
              { name: "United States", code: "us", flag: "us.png", desc: "Marketing operations and tech stack curriculum alignments for US startups." },
              { name: "Philippines", code: "ph", flag: "ph.png", desc: "Practical program pipelines matching ICT requirements in Southeast Asia." }
            ].map((region, idx) => (
              <RevealOnScroll key={idx} className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col space-y-4 hover:shadow-md transition-shadow" delay={idx * 100}>
                <div className="flex items-center space-x-3">
                  <img src={`https://flagcdn.com/w40/${region.flag}`} alt={region.name} className="w-7 rounded-sm shadow-sm" />
                  <h4 className="font-extrabold text-gray-900 text-sm uppercase">{region.name}</h4>
                </div>
                <p className="text-xs text-slate-500 font-bold leading-relaxed">{region.desc}</p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>

      {/* ================= 12. CLOSING CTA BANNER ================= */}
      <div className="w-full bg-[#EE1C25] text-white py-16 px-8 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-white/[0.015] blur-[140px] pointer-events-none rounded-full" />
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
            Ready to Build Real AI Applications?
          </h2>
          <p className="text-white/80 text-sm md:text-base max-w-xl mx-auto font-medium leading-relaxed">
            Stop waiting for theoretical certifications. Join The AI School ecosystem today and learn how to build practical projects directly from industry engineers.
          </p>
          <div className="pt-4">
            <a href="/learn" className="inline-flex items-center gap-2.5 bg-white text-[#EE1C25] font-extrabold text-xs uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg hover:bg-gray-50 transition-all duration-300">
              Apply For Next Cohort
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* ================= 13. FOOTER ================= */}
      <Footer />
    </main>
  );
}

"use client";

import { useRef } from "react";
import { ArrowRight, BookOpen, Star, Sparkles, Award } from "lucide-react";

interface BentoItem {
  type: "course" | "founder";
  title: string;
  subtitle: string;
  badge: string;
  details: string[];
  metric?: { value: string; label: string };
  imageSrc?: string;
  highlighted?: boolean;
}

const BENTO_ITEMS: BentoItem[] = [
  {
    type: "course",
    title: "AI Agent Engineering",
    subtitle: "Building the next generation of autonomous software assistants.",
    badge: "Most Popular",
    details: ["Multi-Agent Orchestration (CrewAI)", "Vector DB Integrations (Pinecone/Chroma)", "Production Agent Deployments"],
    metric: { value: "4.9★", label: "Rating" },
    highlighted: true,
  },
  {
    type: "founder",
    title: "Ganta Srinath Reddy",
    subtitle: "Founder & Lead Architect",
    badge: "Founder",
    details: ["Ex-Tech Lead & Startup Architect", "Trained 10k+ engineers in AI integrations", "Mentoring AI Agent Deployment strategies"],
    metric: { value: "12+", label: "Years Exp" },
  },
  {
    type: "course",
    title: "No-Code AI App Development",
    subtitle: "Ship full-stack AI web products without writing standard code.",
    badge: "Beginner Friendly",
    details: ["LLM API orchestration", "Prompt Engineering Pipelines", "Visual UI builder integration"],
    metric: { value: "100%", label: "Hands-on" },
  },
  {
    type: "founder",
    title: "Ranjan Relan",
    subtitle: "Founding Mentor & AI Scientist",
    badge: "Mentor",
    details: ["Consultant for global startups", "Data Engineering & PowerBI Leader", "AI Analytics pioneer"],
    metric: { value: "15+", label: "AI Projects" },
  },
  {
    type: "course",
    title: "AI Cloud Architectures",
    subtitle: "Scaling and hosting AI pipelines on enterprise infrastructure.",
    badge: "Advanced",
    details: ["GPU resource optimization", "Docker & Kubernetes scaling", "Vector indexing latency speedups"],
    metric: { value: "3x", label: "Job Growth" },
  },
  {
    type: "founder",
    title: "Arun Chinnachamy",
    subtitle: "Curriculum Advisor & Tech Leader",
    badge: "Mentor",
    details: ["Startup CTO & advisor", "Mobile & Distributed AI Specialist", "Leading course syllabus frameworks"],
    metric: { value: "8+", label: "Scale-ups" },
  },
];

export default function BentoGrid() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
  };

  return (
    <section className="py-14 bg-neutral-50/70 border-t border-neutral-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-[#EE1C25] rounded-full text-xs font-bold font-heading mb-4 uppercase tracking-wide">
              <Sparkles className="w-3.5 h-3.5" /> Built on Real Experience
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-[#171717] tracking-tight">
              Curriculum & Mentor Matrix
            </h2>
            <p className="mt-4 text-[#6B7280] text-lg font-medium leading-relaxed">
              No generic theory. Learn custom engineering practices and architectural strategies created directly by startup architects.
            </p>
          </div>
          
          {/* Scroll Controls */}
          <div className="flex gap-3">
            <button
              onClick={scrollLeft}
              className="p-3 bg-white hover:bg-neutral-150 rounded-full border border-black/5 shadow-sm transition-colors text-[#171717]"
              aria-label="Scroll left"
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
            </button>
            <button
              onClick={scrollRight}
              className="p-3 bg-white hover:bg-neutral-150 rounded-full border border-black/5 shadow-sm transition-colors text-[#171717]"
              aria-label="Scroll right"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bento Horizontal Scroll Track */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-2 hide-scrollbar snap-x snap-mandatory scroll-smooth"
        >
          {BENTO_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className={`flex-none w-[360px] md:w-[420px] rounded-2xl p-8 border snap-start transition-all duration-300 relative overflow-hidden group select-none ${
                item.highlighted
                  ? "bg-[#171717] text-white border-neutral-800 shadow-xl"
                  : "bg-white text-[#171717] border-black/5 hover:border-[#EE1C25]/20 shadow-md hover:shadow-lg"
              }`}
            >
              {/* Highlight Background Glow */}
              {item.highlighted && (
                <div className="absolute inset-0 bg-gradient-to-tr from-[#EE1C25]/20 to-transparent opacity-40 pointer-events-none" />
              )}

              <div className="relative z-10 flex flex-col h-full justify-between min-h-[300px]">
                <div>
                  {/* Badge & Icon Row */}
                  <div className="flex justify-between items-start mb-6">
                    <span
                      className={`text-xs font-bold font-heading px-3 py-1 rounded-full uppercase tracking-wider ${
                        item.highlighted
                          ? "bg-[#EE1C25] text-white"
                          : "bg-neutral-100 text-neutral-600"
                      }`}
                    >
                      {item.badge}
                    </span>
                    {item.type === "course" ? (
                      <BookOpen className={`w-5 h-5 ${item.highlighted ? "text-[#EE1C25]" : "text-neutral-400"}`} />
                    ) : (
                      <Award className="w-5 h-5 text-[#EE1C25]" />
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-extrabold font-heading mb-2 leading-tight">
                    {item.title}
                  </h3>
                  <p className={`text-sm mb-6 ${item.highlighted ? "text-neutral-400" : "text-[#6B7280]"}`}>
                    {item.subtitle}
                  </p>

                  {/* Syllabus / Highlights Details list */}
                  <ul className="space-y-2 list-none p-0 m-0 mb-6">
                    {item.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-center gap-2.5 text-sm font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#EE1C25] flex-shrink-0" />
                        <span className={item.highlighted ? "text-neutral-300" : "text-neutral-700"}>
                          {detail}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Metrics Row */}
                {item.metric && (
                  <div className="flex items-center gap-4 pt-4 border-t border-dashed border-neutral-200/20">
                    <div className="text-3xl font-extrabold font-heading text-[#EE1C25] drop-shadow-sm">
                      {item.metric.value}
                    </div>
                    <div className={`text-xs uppercase tracking-wider font-bold ${item.highlighted ? "text-neutral-400" : "text-[#6B7280]"}`}>
                      {item.metric.label}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

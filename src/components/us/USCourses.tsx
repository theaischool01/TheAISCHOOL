"use client";

import React from "react";
import Link from "next/link";
import { Cpu, Code, HelpCircle } from "lucide-react";

const courses = [
  {
    badge: "FUTURE READY",
    title: "AI Ready Developer",
    hours: "20 Hours",
    description: "Transform your software development career by learning to integrate Artificial Intelligence. This course bridges the gap between traditional coding and AI-assisted workflows.",
    icon: Code,
    color: "from-blue-50 to-indigo-50/50 hover:border-blue-300",
    badgeColor: "bg-blue-100 text-blue-800",
    href: "/courses/ai-ready-developer"
  },
  {
    badge: "AGENT BUILDER",
    title: "Build Your Own AI Agent",
    hours: "48 Hours",
    description: "Go beyond standard prompting. This hands-on specialized course teaches you how to architect, design, and deploy autonomous AI agents to automate complex tasks.",
    icon: Cpu,
    color: "from-red-50 to-pink-50/50 hover:border-red-300",
    badgeColor: "bg-red-100 text-red-800",
    href: "/courses/building-your-ai-agent-for-coders"
  },
  {
    badge: "AI FOUNDATIONS",
    title: "Gen AI 101",
    hours: "20 Hours",
    description: "Your essential entry point into the world of Artificial Intelligence. Gain a solid foundation in Generative AI mechanics, prompt engineering, and everyday workflows.",
    icon: HelpCircle,
    color: "from-amber-50 to-orange-50/50 hover:border-amber-300",
    badgeColor: "bg-amber-100 text-amber-800",
    href: "/courses/gen-ai-101"
  }
];

export default function USCourses() {
  return (
    <section className="w-full bg-transparent py-16 px-6 md:px-12 border-t border-gray-100 relative z-10 font-heading">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-4xl font-black text-gray-950 tracking-tight uppercase">
            Don't Just Use AI — <span className="text-[#EE1C25]">Build With It</span>
          </h2>
          <p className="text-sm font-semibold text-neutral-500 max-w-xl mx-auto">
            Acquire developer-grade AI engineering capabilities and lead the industry transition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {courses.map((course, idx) => {
            const Icon = course.icon;
            return (
              <div
                key={idx}
                className={`bg-gradient-to-br ${course.color} border border-neutral-100 rounded-3xl p-8 flex flex-col justify-between hover:-translate-y-2 hover:shadow-lg transition-all duration-300`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${course.badgeColor}`}>
                      {course.badge}
                    </span>
                    <span className="text-xs font-black text-neutral-400 uppercase tracking-widest">
                      {course.hours}
                    </span>
                  </div>
                  
                  <div className="p-3 bg-white w-fit rounded-2xl shadow-xs">
                    <Icon className="w-6 h-6 text-[#EE1C25]" />
                  </div>

                  <h3 className="text-xl font-black text-gray-950 tracking-tight">
                    {course.title}
                  </h3>

                  <p className="text-neutral-600 text-sm leading-relaxed line-clamp-3">
                    {course.description}
                  </p>
                </div>

                <div className="pt-6">
                  <Link
                    href={course.href}
                    className="inline-flex items-center text-xs font-black uppercase tracking-wider text-[#EE1C25] hover:text-red-700 gap-1 group"
                  >
                    <span>View Curriculum</span>
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

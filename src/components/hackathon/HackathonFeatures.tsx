"use client";

import React from "react";
import { Users, Building2, Sparkles, Trophy } from "lucide-react";

const features = [
  {
    title: "1-on-1 Mentor Sessions",
    description: "Work directly with industry veterans from DOT, COAI, TCOE, and Telecom startups to refine architectures.",
    icon: Users,
  },
  {
    title: "National Showcase Stage",
    description: "Pitch prototypes to decision-makers, government officials, and venture capitalists at major telecom summits.",
    icon: Trophy,
  },
  {
    title: "Startup Incubation Pipelines",
    description: "Top prototypes get fast-tracked into startup accelerators and tech hubs across India.",
    icon: Building2,
  },
  {
    title: "Telecom & GenAI Integrations",
    description: "Gain hands-on training with cutting-edge network APIs and state-of-the-art Generative AI frameworks.",
    icon: Sparkles,
  }
];

export default function HackathonFeatures() {
  return (
    <section className="w-full bg-white py-24 px-6 md:px-12 border-t border-gray-100 relative z-10 font-heading">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#EE1C25]">
            Platform Advantages
          </span>
          <h3 className="text-3xl md:text-4xl font-black text-gray-950 leading-tight uppercase">
            Engineered For High Impact Teams
          </h3>
          <p className="text-sm font-semibold text-slate-500 leading-relaxed">
            We provide developer teams with industrial support, mentorship, and cloud infrastructures to transform raw code into functional product prototypes.
          </p>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="bg-white border border-gray-200/80 rounded-3xl p-6 shadow-xs hover:shadow-lg transition-all duration-300 space-y-4">
                <div className="p-2.5 bg-red-50 text-[#EE1C25] rounded-xl w-fit">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-gray-950 leading-snug">{feature.title}</h4>
                <p className="text-xs font-semibold text-neutral-500 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

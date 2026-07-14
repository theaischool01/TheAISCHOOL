"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function MentorsGrid() {
  const [showAll, setShowAll] = useState(false);

  const mentors = [
    {
      name: "Vikas Patel",
      title: "ML Scientist @ Nykaa",
      initials: "VP",
      image: "/images/mentor_vikas.png",
      bio: "Machine Learning Scientist at Nykaa with extensive experience in insurance, healthcare, finance, and e-commerce.",
      linkedin: "https://www.linkedin.com/in/vikaspatel79/",
    },
    {
      name: "Sagnik Pal",
      title: "Generative AI Consultant & Trainer",
      initials: "SP",
      image: "/images/mentor_sagnik.png",
      bio: "Expert in leveraging AI and cutting-edge technologies to drive transformative business outcomes.",
      linkedin: "https://www.linkedin.com/company/theaischool/",
    },
    {
      name: "Akhil Vydyula",
      title: "Senior Data Scientist @ PwC",
      initials: "AV",
      image: "/images/mentor_akhil.png",
      bio: "Senior Data Scientist at PwC, Data & Analytics and Engineering Specialist.",
      linkedin: "https://www.linkedin.com/company/theaischool/",
    },
    {
      name: "Anshu Pandey",
      title: "Head of Technology @ Blue Data",
      initials: "AP",
      image: "/images/mentor_anshu.png",
      bio: "Head of Technology at Blue Data, helping enterprises accelerate their data and AI transformation strategy.",
      linkedin: "https://www.linkedin.com/company/theaischool/",
    },
    {
      name: "Harish Kumar",
      title: "Lead Data Scientist",
      initials: "HK",
      image: "/images/mentor_harish.png",
      bio: "11 years of IT experience; has conducted over 60 training sessions in Generative AI, ML/AI, and AWS.",
      linkedin: "https://www.linkedin.com/company/theaischool/",
    },
    {
      name: "Mohit Bhatia",
      title: "Staff Program Manager",
      initials: "MB",
      image: "/images/mentor_mohit.png",
      bio: "AI/ML and Data enthusiast, working with data, analysis, AI, and strategy & insights for 12+ years.",
      linkedin: "https://www.linkedin.com/company/theaischool/",
    },
    {
      name: "T M Praneeth Naidu",
      title: "CTO @ Cognisys AI",
      initials: "PN",
      image: "/images/mentor_praneeth.png",
      bio: "Project Associate in MathWorks GNSS Project | AI & Machine Learning | Data & Video Analytics | Generative AI & NLP for Business Solutions.",
      linkedin: "https://www.linkedin.com/company/theaischool/",
    },
    {
      name: "Dr. Pradeep Kumar Boya",
      title: "Co-Founder & CEO, CognisysAI",
      initials: "PB",
      image: "/images/mentor_pradeep.png",
      bio: "Co-Founder & CEO - CognisysAI Pvt. Ltd. || CTO - Incline Inventions Pvt. Ltd.",
      linkedin: "https://www.linkedin.com/company/theaischool/",
    },
    {
      name: "Anjaneyalu T",
      title: "Manager, AI and Data Science",
      initials: "AT",
      image: "/images/mentor_anjaneyulu.png",
      bio: "Senior Data Scientist with experience in Computer Vision, Natural Language Processing, and structured data analysis.",
      linkedin: "https://www.linkedin.com/company/theaischool/",
    },
  ];

  const displayedMentors = showAll ? mentors : mentors.slice(0, 6);

  return (
    <section className="w-full bg-white py-16 px-6 md:px-12 border-t border-gray-100 font-heading select-none">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Title */}
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#EE1C25]">
            Mentorship Pool
          </span>
          <h3 className="text-2xl md:text-3xl font-black text-gray-950 uppercase tracking-tight">
            Our Mentors
          </h3>
        </div>

        {/* 3 columns desktop, 1 mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedMentors.map((mentor, idx) => (
            <div 
              key={idx}
              className="bg-gradient-to-br from-white to-slate-50 border border-gray-100 rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-300 min-h-[220px]"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  {/* Avatar Container: Sinks in Image if configured, else Initials Fallback */}
                  <div className="w-16 h-16 rounded-full bg-slate-200 text-slate-600 font-extrabold text-xl flex items-center justify-center shrink-0 border border-slate-300/40 overflow-hidden relative select-none">
                    {mentor.image ? (
                      <Image
                        src={mentor.image}
                        alt={mentor.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    ) : (
                      mentor.initials
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-gray-900 tracking-tight uppercase leading-snug">
                      {mentor.name}
                    </h4>
                    <p className="text-[10px] font-extrabold text-[#EE1C25] uppercase tracking-wider mt-0.5 leading-snug">
                      {mentor.title}
                    </p>
                  </div>
                </div>

                <p className="text-xs font-semibold text-slate-500 leading-relaxed line-clamp-3">
                  {mentor.bio}
                </p>
              </div>

              {/* LinkedIn icon */}
              <div className="pt-4 border-t border-slate-100/60 mt-4 flex justify-between items-center">
                <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">
                  Direct Mentor Access
                </span>
                <a 
                  href={mentor.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center hover:bg-[#EE1C25] hover:border-[#EE1C25] hover:text-white text-slate-400 transition-all duration-300"
                  aria-label="LinkedIn Profile"
                >
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View All Mentors Button */}
        {mentors.length > 6 && (
          <div className="text-center pt-6">
            <button 
              onClick={() => setShowAll(!showAll)}
              className="bg-[#EE1C25] hover:bg-[#d61920] text-white text-xs font-black uppercase tracking-widest px-8 py-3.5 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 focus:outline-none"
            >
              {showAll ? "Show Less" : "View All Mentors"}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

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
      image: "/images/mentor_vikas_v2.png",
      bio: "Machine Learning Scientist at Nykaa with extensive experience in insurance, healthcare, finance, and e-commerce.",
      linkedin: "https://www.linkedin.com/in/vikaspatel79/",
    },
    {
      name: "Sagnik Pal",
      title: "Generative AI Consultant & Trainer",
      initials: "SP",
      image: "/images/mentor_sagnik_v2.png",
      bio: "Expert in leveraging AI and cutting-edge technologies to drive transformative business outcomes.",
      linkedin: "https://www.linkedin.com/in/sagnikpal/",
    },
    {
      name: "Akhil Vydyula",
      title: "Senior Data Scientist @ PwC",
      initials: "AV",
      image: "/images/mentor_akhil_v2.png",
      bio: "Senior Data Scientist at PwC, Data & Analytics and Engineering Specialist.",
      linkedin: "https://www.linkedin.com/in/akhilvydyula/",
    },
    {
      name: "Anshu Pandey",
      title: "Head of Technology @ Blue Data",
      initials: "AP",
      image: "/images/mentor_anshu_v2.png",
      bio: "Head of Technology at Blue Data, helping enterprises accelerate their data and AI transformation strategy.",
      linkedin: "https://www.linkedin.com/in/anshupandey/",
    },
    {
      name: "Harish Kumar",
      title: "Lead Data Scientist",
      initials: "HK",
      image: "/images/mentor_harish_v2.png",
      bio: "11 years of IT experience; has conducted over 60 training sessions in Generative AI, ML/AI, and AWS.",
      linkedin: "https://www.linkedin.com/in/harishkumar1111/",
    },
    {
      name: "Mohit Bhatia",
      title: "Staff Program Manager",
      initials: "MB",
      image: "/images/mentor_mohit.png",
      bio: "AI/ML and Data enthusiast, working with data, analysis, AI, and strategy & insights for 12+ years.",
      linkedin: "https://www.linkedin.com/in/mohit-bhatia-6a165324/",
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
      linkedin: "https://www.linkedin.com/in/drpradeepkumarboya8888/",
    },
    {
      name: "Anjaneyalu T",
      title: "Manager, AI and Data Science",
      initials: "AT",
      image: "/images/mentor_anjaneyulu.png",
      bio: "Senior Data Scientist with experience in Computer Vision, Natural Language Processing, and structured data analysis.",
      linkedin: "https://www.linkedin.com/in/anjaneyalu-t-83615661/",
    },
  ];

  const displayedMentors = showAll ? mentors : mentors.slice(0, 6);

  return (
    <section className="w-full bg-white py-12 md:py-16 px-6 md:px-12 font-heading select-none">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Title */}
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#EE1C25]">
            Mentorship Pool
          </span>
          <h3 className="text-2xl md:text-3xl font-black text-gray-950 uppercase tracking-tight">
            Our Mentors
          </h3>
        </div>

        {/* 3 columns desktop, 2 tablet, 1 mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {displayedMentors.map((mentor, idx) => (
            <div 
              key={idx}
              className="group bg-white border border-gray-100 rounded-[20px] p-7 flex flex-col justify-between shadow-sm hover:-translate-y-2 hover:shadow-xl hover:border-[#EE1C25]/20 transition-all duration-300 min-h-[280px]"
            >
              <div className="space-y-5">
                <div className="flex items-center gap-5">
                  {/* Avatar: 72px circular */}
                  <div className="w-[72px] h-[72px] rounded-full bg-slate-100 text-slate-600 font-extrabold text-xl flex items-center justify-center shrink-0 border-2 border-slate-100 overflow-hidden relative group-hover:border-[#EE1C25]/30 transition-colors duration-300">
                    {mentor.image ? (
                      <Image
                        src={mentor.image}
                        alt={mentor.name}
                        fill
                        sizes="72px"
                        className="object-cover"
                      />
                    ) : (
                      mentor.initials
                    )}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-black text-gray-900 tracking-tight uppercase leading-snug">
                      {mentor.name}
                    </h4>
                    <p className="text-[11px] font-extrabold text-[#EE1C25] uppercase tracking-wider leading-snug">
                      {mentor.title}
                    </p>
                  </div>
                </div>

                <p className="text-[13px] font-semibold text-slate-500 leading-relaxed line-clamp-3">
                  {mentor.bio}
                </p>
              </div>

              {/* Footer with Premium LinkedIn Button */}
              <div className="pt-5 border-t border-slate-100/60 mt-5 flex justify-between items-center">
                <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">
                  Direct Mentor Access
                </span>
                <a 
                  href={mentor.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#0A66C2] hover:bg-[#EE1C25] hover:border-[#EE1C25] hover:text-white shadow-sm hover:shadow-md hover:scale-110 transition-all duration-300"
                  aria-label={`${mentor.name} LinkedIn Profile`}
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View All Mentors Button */}
        {mentors.length > 6 && (
          <div className="text-center pt-4">
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

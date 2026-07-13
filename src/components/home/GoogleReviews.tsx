"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";

interface Review {
  name: string;
  rating: number;
  text: string;
}

const reviews: Review[] = [
  {
    name: "Abinesh D",
    rating: 5,
    text: "I've had a genuinely positive experience with The AI School. The team teaches cutting-edge AI topics effectively with kindness, clarity and practical learning.",
  },
  {
    name: "Sannidhan Katta",
    rating: 5,
    text: "Exceptional place to dive deep into AI and Machine Learning. The instructors are highly knowledgeable and make complex concepts easy to understand.",
  },
  {
    name: "Alakesh Hazarika",
    rating: 5,
    text: "My internship at The AI School was an excellent learning experience. Practical guidance helped me grow professionally.",
  },
  {
    name: "Sufian Mohammed",
    rating: 5,
    text: "No fluff. No fake promises. The AI School helped me start getting freelance projects in Data Analytics.",
  },
  {
    name: "Thilagan M",
    rating: 5,
    text: "Prompt Engineering sessions covered LLMs, Generative AI and modern AI tools through practical demonstrations.",
  },
  {
    name: "Kundini Tadepalli",
    rating: 5,
    text: "Wonderful sessions with an engaging teaching style. The interactive approach made learning enjoyable.",
  },
  {
    name: "Princedaniel Yovan",
    rating: 5,
    text: "Eye-opening AI sessions that introduced me to many modern AI tools.",
  },
  {
    name: "Shruthi",
    rating: 5,
    text: "Prompt Engineering was explained in a simple and practical way that helped me understand AI better.",
  },
];

function ReviewCard({ review }: { review: Review }) {
  return (
    <div 
      className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 w-[450px] shrink-0 select-none"
    >
      <div className="space-y-4">
        {/* Header Information */}
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gray-50 rounded-xl text-gray-700 border border-gray-100">
            <svg className="w-5 h-5 text-[#EE1C25]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
              <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
            </svg>
          </div>
          <div>
            <h4 className="font-extrabold text-gray-950 leading-tight font-heading flex items-center gap-2">
              {review.name}
            </h4>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Verified Google Review</span>
          </div>
        </div>

        {/* Main Review Quote */}
        <div className="relative min-h-[85px] flex flex-col justify-center">
          <svg className="w-8 h-8 text-red-500/5 absolute -top-2 -left-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <p className="text-gray-600 text-sm leading-relaxed relative z-10 pl-4 border-l-2 border-red-100 italic">
            &ldquo;{review.text}&rdquo;
          </p>
        </div>
      </div>

      {/* Google Review Details Widget (styled exactly like PlacementJourney but review-centric) */}
      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex items-center justify-between gap-2">
        <div className="flex items-center space-x-2.5">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-[#FBBC05] stroke-none" />
            ))}
          </div>
          <div className="truncate">
            <div className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Google Review</div>
          </div>
        </div>

        {/* ArrowRightLeft SVG replacement or divider */}
        <div className="text-xs font-black text-gray-400">|</div>

        <div className="text-center">
          <div className="text-xs font-extrabold text-gray-700">4.9 / 5 Rating</div>
        </div>

        <div className="text-xs font-black text-gray-400">|</div>

        <div className="flex items-center space-x-2 text-right">
          <div className="truncate">
            <div className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Google Logo</div>
            <div className="text-[9px] font-extrabold text-neutral-400 uppercase tracking-widest">Verified Review</div>
          </div>
          <div className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center shrink-0 shadow-xs relative">
            <div className="relative w-4 h-4">
              <Image
                src="/images/logo.png"
                alt="Google Logo"
                fill
                sizes="16px"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GoogleReviews() {
  const duplicatedReviews = reviews.concat(reviews).concat(reviews);
  const rowRef = useRef<HTMLDivElement>(null);

  // Touch handlers for mobile
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDown, setIsDown] = useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!rowRef.current) return;
    setIsDown(true);
    setStartX(e.touches[0].pageX - rowRef.current.offsetLeft);
    setScrollLeft(rowRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDown || !rowRef.current) return;
    const x = e.touches[0].pageX - rowRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    rowRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="w-full bg-white py-24 px-6 md:px-12 border-t border-gray-100 relative z-10 font-heading overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#EE1C25] font-heading">
            CAREER TRANSFORMATIONS
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight font-heading">
            Trusted by Thousands of Learners
          </h2>
          <p className="text-sm font-semibold text-slate-500 leading-relaxed mt-2">
            Real experiences from students who built their AI careers with The AI School.
          </p>
        </div>

        {/* Marquee Row */}
        <div 
          ref={rowRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={() => setIsDown(false)}
          className="relative w-full overflow-hidden py-4 select-none scrollbar-hide"
        >
          {/* Left and Right Gradient Fades */}
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

          {/* Marquee Mover */}
          <div className="flex gap-8 animate-carousel-left hover:pause-animation w-max">
            {duplicatedReviews.map((review, idx) => (
              <ReviewCard key={`${review.name}-${idx}`} review={review} />
            ))}
          </div>
        </div>

      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

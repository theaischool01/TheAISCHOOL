"use client";

import React, { useRef, useState } from "react";
import { Star } from "lucide-react";

interface Review {
  name: string;
  rating: number;
  text: string;
}

const row1Reviews: Review[] = [
  {
    name: "Abinesh D",
    rating: 5,
    text: "I've had a genuinely positive experience with The AI School. The team teaches cutting-edge AI topics with kindness, clarity and practical learning. The experience has been incredibly valuable.",
  },
  {
    name: "Sannidhan Katta",
    rating: 5,
    text: "Exceptional place to dive deep into AI and Machine Learning. The instructors are knowledgeable, passionate and make complex concepts easy to understand.",
  },
  {
    name: "Alakesh Hazarika",
    rating: 5,
    text: "My web development internship at The AI School was an excellent learning experience. The practical guidance helped me grow professionally.",
  },
  {
    name: "Sufian Mohammed",
    rating: 5,
    text: "No fluff. No fake promises. The AI School helped me start getting freelance projects in Data Analytics with practical mentorship.",
  },
];

const row2Reviews: Review[] = [
  {
    name: "Thilagan M",
    rating: 5,
    text: "The Prompt Engineering training explained LLMs, Generative AI and modern AI tools through practical demonstrations that were easy to understand.",
  },
  {
    name: "Kundini Tadepalli",
    rating: 5,
    text: "Wonderful sessions with an engaging teaching style. The interactive approach made learning enjoyable and helped us grow.",
  },
  {
    name: "Princedaniel Yovan",
    rating: 5,
    text: "Eye-opening AI sessions that introduced me to many modern AI tools and expanded my understanding of Artificial Intelligence.",
  },
  {
    name: "Shruthi",
    rating: 5,
    text: "Prompt Engineering was explained in a simple and practical way that helped me understand how to communicate effectively with AI systems.",
  },
];

function ReviewCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-80 shrink-0 min-h-[250px] max-h-[350px] bg-white border border-neutral-200/80 rounded-2xl p-6 shadow-xs flex flex-col justify-between relative overflow-hidden select-none hover:shadow-md transition-shadow duration-300">
      {/* Quote decoration */}
      <span className="absolute right-4 bottom-2 text-7xl font-black text-neutral-100/60 font-sans pointer-events-none select-none">
        &ldquo;
      </span>

      <div className="space-y-3 relative z-10 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          {/* Stars */}
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-[#FBBC05] stroke-none" />
            ))}
          </div>

          {/* Review text */}
          <p className={`text-xs text-neutral-500 font-semibold leading-relaxed ${expanded ? "" : "line-clamp-4"}`}>
            {review.text}
          </p>

          {review.text.length > 130 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-[10px] font-black text-[#EE1C25] uppercase tracking-wider hover:underline"
            >
              {expanded ? "Show Less" : "Read More"}
            </button>
          )}
        </div>

        {/* Student metadata + Google Verification badge */}
        <div className="border-t border-neutral-100 pt-3 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-black tracking-wider text-gray-900 font-heading">
              {review.name}
            </span>
            <span className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest">
              Verified Google Review
            </span>
          </div>

          {/* Google logo badge styling */}
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              fill="#EA4335"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function GoogleReviews() {
  const row1Duplicated = row1Reviews.concat(row1Reviews).concat(row1Reviews);
  const row2Duplicated = row2Reviews.concat(row2Reviews).concat(row2Reviews);

  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  // Drag and swipe states for mobile touch devices
  const [startX1, setStartX1] = useState(0);
  const [scrollLeft1, setScrollLeft1] = useState(0);
  const [isDown1, setIsDown1] = useState(false);

  const [startX2, setStartX2] = useState(0);
  const [scrollLeft2, setScrollLeft2] = useState(0);
  const [isDown2, setIsDown2] = useState(false);

  const handleTouchStart = (
    e: React.TouchEvent,
    rowRef: React.RefObject<HTMLDivElement | null>,
    setStartX: React.Dispatch<React.SetStateAction<number>>,
    setScrollLeft: React.Dispatch<React.SetStateAction<number>>,
    setIsDown: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (!rowRef.current) return;
    setIsDown(true);
    setStartX(e.touches[0].pageX - rowRef.current.offsetLeft);
    setScrollLeft(rowRef.current.scrollLeft);
  };

  const handleTouchMove = (
    e: React.TouchEvent,
    rowRef: React.RefObject<HTMLDivElement | null>,
    startX: number,
    scrollLeft: number,
    isDown: boolean
  ) => {
    if (!isDown || !rowRef.current) return;
    const x = e.touches[0].pageX - rowRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag sensitivity
    rowRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="w-full bg-slate-50/50 py-24 border-t border-gray-100 overflow-hidden font-heading relative z-10">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-[#EE1C25]">
            TESTIMONIALS
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-950 tracking-tight leading-tight mt-3">
            Trusted by Thousands of Learners
          </h2>
          <p className="text-sm font-semibold text-slate-500 mt-2">
            Real experiences from students who built their AI careers with The AI School.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end justify-center gap-1.5">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#FBBC05] stroke-none" />
            ))}
          </div>
          <div className="text-xs font-bold text-gray-700">
            <span className="text-[#EE1C25] font-black mr-1">Google Reviews</span>
            <span>4.9 / 5</span>
          </div>
        </div>
      </div>

      {/* Row 1 — Sliding Left */}
      <div 
        ref={row1Ref}
        onTouchStart={(e) => handleTouchStart(e, row1Ref, setStartX1, setScrollLeft1, setIsDown1)}
        onTouchMove={(e) => handleTouchMove(e, row1Ref, startX1, scrollLeft1, isDown1)}
        onTouchEnd={() => setIsDown1(false)}
        className="relative w-full overflow-hidden select-none py-3 mb-3 scroll-smooth"
      >
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-slate-50/50 to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-slate-50/50 to-transparent z-20 pointer-events-none" />

        <div className="flex gap-6 animate-carousel-left hover:pause-animation w-max">
          {row1Duplicated.map((review, idx) => (
            <ReviewCard key={`${review.name}-r1-${idx}`} review={review} />
          ))}
        </div>
      </div>

      {/* Row 2 — Sliding Right */}
      <div 
        ref={row2Ref}
        onTouchStart={(e) => handleTouchStart(e, row2Ref, setStartX2, setScrollLeft2, setIsDown2)}
        onTouchMove={(e) => handleTouchMove(e, row2Ref, startX2, scrollLeft2, isDown2)}
        onTouchEnd={() => setIsDown2(false)}
        className="relative w-full overflow-hidden select-none py-3 scroll-smooth"
      >
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-slate-50/50 to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-slate-50/50 to-transparent z-20 pointer-events-none" />

        <div className="flex gap-6 animate-carousel-right hover:pause-animation w-max">
          {row2Duplicated.map((review, idx) => (
            <ReviewCard key={`${review.name}-r2-${idx}`} review={review} />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes carouselRight {
          0% {
            transform: translate3d(-33.333%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
        .animate-carousel-right {
          animation: carouselRight 35s linear infinite;
        }
      `}</style>
    </section>
  );
}

"use client";

import React, { useRef, useState } from "react";
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

const GoogleGLogo = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69c-.29 1.5-1.14 2.77-2.4 3.61v3h3.86c2.26-2.09 3.59-5.17 3.59-8.46z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.37 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.37 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
    />
  </svg>
);

const getInitials = (name: string) => {
  const parts = name.split(" ");
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

function ReviewCard({ review }: { review: Review }) {
  return (
    <div 
      className="relative bg-white border border-gray-200/80 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between space-y-5 w-[360px] md:w-[400px] shrink-0 select-none group overflow-hidden"
    >
      {/* Decorative vertical red hover bar (hardware-accelerated, no reflow) */}
      <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#EE1C25] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center z-10" />

      {/* Decorative large quotation mark */}
      <div className="absolute top-2 right-6 text-neutral-100/80 text-7xl font-serif select-none pointer-events-none leading-none">
        &ldquo;
      </div>

      {/* Main Review Quote */}
      <div className="pt-2">
        <p className="text-gray-600 text-sm md:text-base leading-relaxed font-medium font-sans">
          {review.text}
        </p>
      </div>

      {/* Divider */}
      <div className="w-full border-t border-gray-100 pt-4 flex items-center justify-between">
        
        {/* Left Side: Avatar, Name & Stars */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-600 font-extrabold text-xs uppercase transition-transform duration-250 group-hover:scale-105 shrink-0">
            {getInitials(review.name)}
          </div>
          <div>
            <h4 className="font-extrabold text-gray-900 leading-tight font-heading text-sm">
              {review.name}
            </h4>
            <div className="flex gap-0.5 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#F5A623] stroke-none" />
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Google branding */}
        <div className="flex items-center space-x-2 bg-gray-50 border border-gray-100 rounded-lg py-1.5 px-2.5">
          <GoogleGLogo />
          <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest leading-none">
            Verified
          </span>
        </div>

      </div>
    </div>
  );
}

export default function GoogleReviews() {
  const duplicatedReviews = reviews.concat(reviews).concat(reviews);
  const rowRef = useRef<HTMLDivElement>(null);

  // Touch handlers for mobile scrolling
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
    <section className="w-full bg-white py-14 lg:py-16 px-6 md:px-12 relative z-10 font-heading overflow-hidden">
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

        {/* Marquee Row container */}
        <div 
          ref={rowRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={() => setIsDown(false)}
          className="relative w-full overflow-hidden py-4 select-none scrollbar-hide marquee-container"
        >
          {/* Left and Right Gradient Fades */}
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

          {/* Marquee Mover with animation */}
          <div className="flex gap-8 animate-marquee-left w-max will-change-transform">
            {duplicatedReviews.map((review, idx) => (
              <ReviewCard key={`${review.name}-${idx}`} review={review} />
            ))}
          </div>
        </div>

      </div>

      <style jsx global>{`
        @keyframes marqueeLeft {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-33.3333%, 0, 0);
          }
        }
        .animate-marquee-left {
          animation: marqueeLeft 48s linear infinite;
        }
        .marquee-container:hover .animate-marquee-left {
          animation-play-state: paused;
        }
        @media (max-width: 768px) {
          .animate-marquee-left {
            animation-duration: 65s;
          }
        }
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

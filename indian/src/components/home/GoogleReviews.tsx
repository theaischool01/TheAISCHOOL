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
    text: "I've had a genuinely positive experience with The AI School. The team not only teaches cutting-edge topics effectively but does so with a remarkable sense of kindness and inclusivity. Empowering tech education where curiosity is guided with care!",
  },
  {
    name: "Sannidhan Katta",
    rating: 5,
    text: "Exceptional place to dive deep into AI and Machine Learning. The instructors are highly knowledgeable, passionate, and create an inspiring environment for building a career in AI.",
  },
  {
    name: "Kruthika Mohanraj",
    rating: 5,
    text: "The teaching is awesome! Rahul Sir and Atif Sir guide us daily with real-world examples, cyber concepts, and hacking tools that make complex ideas clear and easy to understand.",
  },
  {
    name: "Alakesh Hazarika",
    rating: 5,
    text: "I had a great experience during my Web Development internship at The AI School. The guidance was excellent, and learning through practical work really helped me grow in my software journey.",
  },
  {
    name: "Mutharasi",
    rating: 5,
    text: "As a Chemical Engineering student, taking Prompt Engineering showed me how tools like ChatGPT can be integrated into technical problem-solving and academic work. It expanded my view on how AI supports all domains.",
  },
  {
    name: "Thilagan M",
    rating: 5,
    text: "Valuable Prompt Engineering training! The sessions covered foundational concepts and practical techniques for designing effective prompts when working with LLMs like ChatGPT and Claude.",
  },
  {
    name: "Prem Kumar",
    rating: 5,
    text: "The Prompt Engineering session was really insightful. Concepts like LLMs, Generative AI, and tools like Lovable AI and Gamma were explained clearly through practical examples.",
  },
  {
    name: "Princedaniel Yovan",
    rating: 5,
    text: "A mind-opening session! As an AI and ML student, I didn't have exposure to so many AI tools previously. I learned about cutting-edge tools and workflows that expanded my technical horizons.",
  },
  {
    name: "Nathi Joshitha",
    rating: 5,
    text: "The freelance initiative by The AI School is a great way for learners to gain real-world project experience, build a strong portfolio, and earn while learning.",
  },
  {
    name: "Kundini Tadepalli",
    rating: 5,
    text: "Thank you for conducting such wonderful sessions! Invaluable guidance that helped us learn and grow. The interactive approach made learning complex AI tools engaging and enjoyable.",
  },
  {
    name: "Thanushka Murugan",
    rating: 5,
    text: "The overall internship program is very good and I learned a lot through practical sessions. I gained great hands-on experience throughout the entire track.",
  },
  {
    name: "Rishi Rich Deb",
    rating: 5,
    text: "Thank you for always taking the time to explain things in a way we can understand. Your patience, dedication, and interactive lessons make learning AI engaging and fun!",
  },
  {
    name: "Shruthi",
    rating: 5,
    text: "The Prompt Engineering course teaches how to give clear, smart instructions to AI. It drastically improves AI responses by using the right words, structure, and prompt design.",
  },
  {
    name: "RELO FF",
    rating: 5,
    text: "Srinath Sir and Praneeth Sir make learning AI concepts so easy! Their dedicated guidance and doubt-solving made our learning experience seamless and practical.",
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

function ReviewCard({ review, idx }: { review: Review; idx: number }) {
  const isRedShaded = idx % 2 === 1;

  return (
    <div 
      className={`relative ${
        isRedShaded 
          ? "bg-[#FFF5F5] border border-red-100/70" 
          : "bg-white border border-gray-200/80"
      } rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between space-y-5 w-[360px] md:w-[400px] shrink-0 select-none group overflow-hidden`}
    >
      {/* Decorative vertical red hover bar (hardware-accelerated, no reflow) */}
      <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#C1121C] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center z-10" />

      {/* Decorative large quotation mark */}
      <div className="absolute top-2 right-6 text-neutral-100/80 text-7xl font-serif select-none pointer-events-none leading-none">
        &ldquo;
      </div>

      {/* Main Review Quote */}
      <div className="pt-2">
        <p className={`${isRedShaded ? "text-gray-700" : "text-gray-600"} text-sm md:text-base leading-relaxed font-medium font-sans`}>
          {review.text}
        </p>
      </div>

      {/* Divider */}
      <div className={`w-full border-t ${isRedShaded ? "border-red-100" : "border-gray-100"} pt-4 flex items-center justify-between`}>
        
        {/* Left Side: Avatar, Name & Stars */}
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-xs uppercase transition-transform duration-250 group-hover:scale-105 shrink-0 ${
            isRedShaded 
              ? "bg-[#C1121C] text-white border border-[#C1121C]" 
              : "bg-red-50 border border-red-100 text-red-600"
          }`}>
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
        <div className={`flex items-center space-x-2 border rounded-lg py-1.5 px-2.5 ${
          isRedShaded 
            ? "bg-white border-red-100" 
            : "bg-gray-50 border-gray-100"
        }`}>
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
    <section className="w-full bg-transparent py-16 lg:py-20 px-6 md:px-12 relative z-10 font-heading overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
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
              <ReviewCard key={`${review.name}-${idx}`} review={review} idx={idx} />
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

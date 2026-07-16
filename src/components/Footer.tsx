'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Mail, Phone } from 'lucide-react';
import { useRegion } from '@/context/RegionContext';

export default function Footer() {
  const { regionConfig } = useRegion();

  const courses = [
    { label: "Build Your AI Agent", href: "/courses/building-your-ai-agent-for-coders" },
    { label: "Data Analysis & PowerBI", href: "/courses/data-analysis-with-ai-and-powerbi" },
    { label: "Prompt Engineering 101", href: "/courses/prompt-engineering-101" },
    { label: "Advanced RAG Systems", href: "/courses/advanced-ai-architectures-rag" },
  ];

  return (
    <footer className="w-full bg-gradient-to-tr from-[#1a0203] via-black to-[#3d0a0d] text-white pt-16 pb-8 px-6 md:px-12 relative border-t border-white/5 z-20 font-heading">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* ================= PRIMARY LINKS COLUMNS MATRIX ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 pb-4">
          
          {/* Column 1: Brand Info & Social Network Array */}
          <div className="md:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left space-y-6">
            <div className="flex items-center justify-center sm:justify-start w-full sm:-ml-4">
              <Link href={regionConfig.path} className="relative w-[230px] h-[92px] block hover:opacity-90 transition-opacity">
                <Image
                  src="/images/logo-footer.png"
                  alt="The AI School Logo"
                  fill
                  sizes="230px"
                  className="object-contain"
                  priority
                />
              </Link>
            </div>
            <p className="text-sm text-neutral-400 font-medium leading-relaxed max-w-xs sm:pl-0.5">
              {regionConfig.code === "in" 
                ? "India’s only school where startup Leaders teach AI skills."
                : `${regionConfig.name}'s only school where startup Leaders teach AI skills.`}
            </p>
            
            <div className="flex items-center justify-center sm:justify-start space-x-4 pt-1 w-full sm:pl-0.5">
              {regionConfig.socialLinks.map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-neutral-400 hover:text-white transition-colors" 
                  aria-label={social.provider}
                >
                  {social.provider === "linkedin" && (
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  )}
                  {social.provider === "instagram" && (
                    <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                  )}
                  {social.provider === "youtube" && (
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.163c-.272-1.022-1.074-1.824-2.096-2.097C19.548 3.5 12 3.5 12 3.5s-7.548 0-9.402.566C1.576 4.339.774 5.14.502 6.163 0 8.01 0 12 0 12s0 3.99.502 5.837c.272 1.022 1.074 1.824 2.096 2.097 1.854.566 9.402.566 9.402.566s7.548 0 9.402-.566c1.022-.273 1.824-1.075 2.096-2.097C24 15.99 24 12 24 12s0-3.99-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  )}
                  {social.provider === "facebook" && (
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M9 8H7v3h2v9h3v-9h3l.5-3H12V6c0-.88.39-1 1-1h2V2h-3c-2.76 0-3 1.76-3 3v3z"/>
                    </svg>
                  )}
                  {social.provider === "twitter" && (
                    <span className="font-bold text-lg font-mono leading-none">𝕏</span>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Core Corporate Routing Paths */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-sm font-black tracking-wider uppercase text-white">Company</h4>
            <ul className="space-y-2.5 text-sm font-semibold text-neutral-400">
              <li><Link href="/about-us" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/career" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/blogs" className="hover:text-white transition-colors">Blogs</Link></li>
              <li><a href="#register" className="hover:text-white transition-colors">Earn with us</a></li>
            </ul>
          </div>

          {/* Column 3: Specialized Sub-Course Anchors */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-sm font-black tracking-wider uppercase text-white">Our Courses</h4>
            <ul className="space-y-2.5 text-sm font-semibold text-neutral-300">
              {courses.map((course, idx) => (
                <li key={idx}>
                  <Link href={course.href} className="hover:text-white transition-colors">
                    {course.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Localized Office Contact Details */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-sm font-black tracking-wider uppercase text-white">Contact Info</h4>
            <ul className="space-y-3.5 text-sm font-semibold text-neutral-400">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#EE1C25] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{regionConfig.address}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#EE1C25] shrink-0" />
                <a href={`mailto:${regionConfig.email}`} className="hover:text-white transition-colors">
                  {regionConfig.email}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#EE1C25] shrink-0" />
                <a href={`tel:${regionConfig.phone}`} className="hover:text-white transition-colors">
                  {regionConfig.phone}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* ================= SECONDARY LEGAL FOOTNOTE BAR ================= */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-semibold text-neutral-500">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <span className="text-neutral-400">{regionConfig.businessName}</span>
            <span className="hidden md:inline text-neutral-600">•</span>
            <span>{regionConfig.copyright}</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {regionConfig.legalLinks.map((link, idx) => (
              <Link key={idx} href={link.url} className="hover:text-white transition-colors">
                {link.name}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import { PH_DATA } from "@ph/config/phData";

export default function Footer() {
  const { region, socialLinks, legalLinks } = PH_DATA;

  const courses = [
    { label: "GAMER Program", href: "/learn" },
    { label: "Build Your Own Agent", href: "/learn" },
    { label: "Python & Programming", href: "/learn" },
    { label: "Data Science and Analytics", href: "/learn" },
    { label: "Tools & Technologies", href: "/learn" },
    { label: "Business & Professional", href: "/learn" },
  ];

  return (
    <footer className="w-full bg-[#FFF8F8] text-[#101828] relative border-t border-[#EAECEF] z-20 font-heading">
      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto pt-16 pb-12 px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 md:gap-12">
          {/* Column 1: Brand (~30%) */}
          <div className="md:col-span-4 flex flex-col items-start space-y-4">
            <Link href="/" className="inline-block shrink-0">
              <img
                src="/ph/the-ai-school-ph-logo.png"
                alt="THE AI SCHOOL Philippines"
                className="w-[170px] md:w-[220px] h-auto object-contain transition-opacity hover:opacity-95"
              />
            </Link>

            <p className="text-sm text-[#475467] font-medium leading-relaxed max-w-sm">
              {region.tagline}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3.5 pt-2">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white border border-[#EAECEF] flex items-center justify-center text-[#475467] hover:text-[#ED1C24] hover:border-[#ED1C24]/30 hover:shadow-xs transition-all duration-200"
                  aria-label={social.provider}
                >
                  {social.provider === "linkedin" && (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  )}
                  {social.provider === "instagram" && (
                    <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                  )}
                  {social.provider === "youtube" && (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.163c-.272-1.022-1.074-1.824-2.096-2.097C19.548 3.5 12 3.5 12 3.5s-7.548 0-9.402.566C1.576 4.339.774 5.14.502 6.163 0 8.01 0 12 0 12s0 3.99.502 5.837c.272 1.022 1.074 1.824 2.096 2.097 1.854.566 9.402.566 9.402.566s7.548 0 9.402-.566c1.022-.273 1.824-1.075 2.096-2.097C24 15.99 24 12 24 12s0-3.99-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  )}
                  {social.provider === "facebook" && (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M9 8H7v3h2v9h3v-9h3l.5-3H12V6c0-.88.39-1 1-1h2V2h-3c-2.76 0-3 1.76-3 3v3z"/>
                    </svg>
                  )}
                  {social.provider === "twitter" && (
                    <span className="font-bold text-sm font-mono">𝕏</span>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Company (~18%) */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-sm font-bold tracking-wider uppercase text-[#101828]">Company</h4>
            <ul className="space-y-3 text-sm font-medium text-[#475467] list-none p-0 m-0">
              <li><Link href="/about-us" className="hover:text-[#ED1C24] transition-colors duration-200">About Us</Link></li>
              <li><Link href="/workshops" className="hover:text-[#ED1C24] transition-colors duration-200">Workshops</Link></li>
              <li><Link href="/learn" className="hover:text-[#ED1C24] transition-colors duration-200">Learn</Link></li>
              <li><Link href="/blogs" className="hover:text-[#ED1C24] transition-colors duration-200">Blogs</Link></li>
              <li><Link href="/contact-us" className="hover:text-[#ED1C24] transition-colors duration-200">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Our Courses (~25%) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-sm font-bold tracking-wider uppercase text-[#101828]">Our Courses</h4>
            <ul className="space-y-3 text-sm font-medium text-[#475467] list-none p-0 m-0">
              {courses.map((course, idx) => (
                <li key={idx}>
                  <Link href={course.href} className="hover:text-[#ED1C24] transition-colors duration-200">
                    {course.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info (~27%) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-sm font-bold tracking-wider uppercase text-[#101828]">Contact Info</h4>
            <ul className="space-y-3.5 text-sm text-[#475467] list-none p-0 m-0">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#ED1C24] shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="text-[#101828] font-bold">Philippines Address:</p>
                  <p className="text-[#475467] leading-relaxed">{region.phAddress}</p>
                  <p className="text-[#101828] font-bold pt-1.5">HQ Address:</p>
                  <p className="text-[#475467] leading-relaxed">{region.hqAddress}</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#ED1C24] shrink-0" />
                <a href={`mailto:${region.email}`} className="text-xs font-semibold text-[#475467] hover:text-[#ED1C24] transition-colors duration-200">
                  {region.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#ED1C24] shrink-0" />
                <a href={`tel:${region.phone}`} className="text-xs font-semibold text-[#475467] hover:text-[#ED1C24] transition-colors duration-200">
                  {region.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div className="w-full bg-[#F7F7F8] border-t border-[#EAECEF] py-6 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-[#667085]">
          <div>{region.copyright}</div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {legalLinks.map((link, idx) => (
              <Link key={idx} href={link.url} className="hover:text-[#ED1C24] transition-colors duration-200">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

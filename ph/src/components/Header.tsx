"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { PH_DATA } from "@ph/config/phData";
import RegionFlagSwitcher from "@ph/components/RegionFlagSwitcher";

export default function Header() {
  const { region, megaMenuCategories, navigation } = PH_DATA;
  const pathname = usePathname();
  const [activeCategory, setActiveCategory] = useState("gamer");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileLearnOpen, setMobileLearnOpen] = useState(false);

  const activeCourses = megaMenuCategories.find((c) => c.id === activeCategory)?.courses || [];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="w-full bg-[#C1121C] text-white py-2.5 px-6 md:px-12 relative z-[1000] border-b border-white/5 font-heading">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold tracking-wide">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {PH_DATA.socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform opacity-90 hover:opacity-100"
                aria-label={social.provider}
              >
                {social.provider === "linkedin" && (
                  <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                )}
                {social.provider === "instagram" && (
                  <svg className="w-3.5 h-3.5 fill-none stroke-white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                )}
                {social.provider === "youtube" && (
                  <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                    <path d="M23.498 6.163c-.272-1.022-1.074-1.824-2.096-2.097C19.548 3.5 12 3.5 12 3.5s-7.548 0-9.402.566C1.576 4.339.774 5.14.502 6.163 0 8.01 0 12 0 12s0 3.99.502 5.837c.272 1.022 1.074 1.824 2.096 2.097 1.854.566 9.402.566 9.402.566s7.548 0 9.402-.566c1.022-.273 1.824-1.075 2.096-2.097C24 15.99 24 12 24 12s0-3.99-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                )}
                {social.provider === "facebook" && (
                  <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                    <path d="M9 8H7v3h2v9h3v-9h3l.5-3H12V6c0-.88.39-1 1-1h2V2h-3c-2.76 0-3 1.76-3 3v3z"/>
                  </svg>
                )}
                {social.provider === "twitter" && (
                  <span className="font-bold text-xs font-mono">𝕏</span>
                )}
              </a>
            ))}
          </div>

          {/* Announcement text */}
          <span className="text-center flex-1">{region.announcement}</span>
        </div>
      </div>

      {/* Main Header Nav */}
      <header className="sticky top-0 w-full bg-white/95 backdrop-blur-md border-b border-black/5 z-[999] font-heading">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-4">
          {/* Logo */}
          <Link href="/ph" className="flex items-center shrink-0">
            <img
              src="/ph/the-ai-school-ph-logo.png"
              alt="THE AI SCHOOL Philippines"
              className="w-[155px] sm:w-[170px] md:w-[210px] h-auto object-contain transition-opacity hover:opacity-95"
            />
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6 list-none m-0 p-0">
              {navigation.map((nav, idx) => {
                if (nav.name === "Learn") {
                  return (
                    <li key={idx} className="relative group/nav-item">
                      <Link
                        href="/ph/learn"
                        className={`flex items-center gap-1 px-3 py-2 text-sm font-bold hover:text-[#C1121C] hover:bg-neutral-50 rounded-lg transition-all duration-200 relative ${
                          pathname.includes("/learn") || pathname.includes("/courses/") ? "text-[#C1121C]" : "text-[#171717]"
                        }`}
                      >
                        Learn <ChevronDown className="w-4 h-4 group-hover/nav-item:rotate-180 transition-transform duration-200" />
                        {(pathname.includes("/learn") || pathname.includes("/courses/")) && (
                          <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#C1121C] rounded-full" />
                        )}
                      </Link>

                      {/* Mega Dropdown Menu */}
                      <div className="absolute top-[100%] left-1/2 -translate-x-1/2 pt-4 w-[95vw] max-w-5xl opacity-0 invisible group-hover/nav-item:opacity-100 group-hover/nav-item:visible transition-all duration-300 pointer-events-none group-hover/nav-item:pointer-events-auto">
                        <div className="bg-white rounded-xl shadow-2xl border border-black/5 overflow-hidden grid grid-cols-[280px_1fr] min-h-[420px]">
                          {/* Left Sidebar Categories */}
                          <div className="bg-neutral-50 p-4 flex flex-col gap-1 border-r border-black/5">
                            {megaMenuCategories.map((cat) => {
                              const slugMap: Record<string, string> = {
                                gamer: "gamer",
                                "build-agent": "build-your-own-agent",
                                "python-prog": "python-programming",
                                "data-science": "data-science-analytics",
                                "tools-tech": "tools-technologies",
                                "business-prof": "business-professional",
                              };
                              const categorySlug = slugMap[cat.id] || cat.id;

                              return (
                                <Link
                                  key={cat.id}
                                  href={`/ph/learn/${categorySlug}`}
                                  onMouseEnter={() => setActiveCategory(cat.id)}
                                  className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-left text-xs font-bold transition-all duration-150 ${
                                    activeCategory === cat.id
                                      ? "bg-[#C1121C] text-white"
                                      : "text-[#171717] hover:bg-neutral-200/50"
                                  }`}
                                >
                                  <span>{cat.name}</span>
                                  <ChevronRight className="w-3.5 h-3.5 opacity-70" />
                                </Link>
                              );
                            })}
                          </div>

                          {/* Right Course Grid */}
                          <div className="p-6 bg-white max-h-[480px] overflow-y-auto">
                            <div className="grid grid-cols-2 gap-3">
                              {activeCourses.map((course, cIdx) => {
                                const slugMap: Record<string, string> = {
                                  gamer: "gamer",
                                  "build-agent": "build-your-own-agent",
                                  "python-prog": "python-programming",
                                  "data-science": "data-science-analytics",
                                  "tools-tech": "tools-technologies",
                                  "business-prof": "business-professional",
                                };
                                const currentSlug = slugMap[activeCategory] || activeCategory;
                                const courseUrl = `/ph/learn/${currentSlug}#module-${cIdx + 1}`;

                                return (
                                  <Link
                                    key={cIdx}
                                    href={courseUrl}
                                    className="p-3.5 rounded-lg bg-neutral-50 hover:bg-red-50/40 border-l-2 border-transparent hover:border-[#C1121C] text-xs font-semibold text-[#171717] hover:text-[#C1121C] transition-all duration-200 shadow-2xs"
                                  >
                                    {course.name}
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                }

                const isActive = pathname === nav.url || (nav.url !== "/" && pathname.startsWith(nav.url));
                return (
                  <li key={idx}>
                    <Link
                      href={nav.url}
                      className={`px-3 py-2 text-sm font-bold hover:text-[#C1121C] transition-colors relative block ${
                        isActive ? "text-[#C1121C]" : "text-[#171717]"
                      }`}
                    >
                      {nav.name}
                      {isActive && (
                        <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#C1121C] rounded-full" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Region Flag Switcher & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <RegionFlagSwitcher />

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#171717] hover:text-[#C1121C] focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden w-full bg-white border-t border-black/5 px-6 py-4 animate-in fade-in duration-200 max-h-[75vh] overflow-y-auto">
            <ul className="flex flex-col list-none m-0 p-0">
              {navigation.map((nav, idx) => (
                <li key={idx}>
                  <Link
                    href={nav.url}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block font-bold text-[#171717] hover:text-[#C1121C] py-3 border-b border-neutral-100 text-sm"
                  >
                    {nav.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </>
  );
}

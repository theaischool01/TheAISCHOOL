'use client';
export const dynamic = 'force-dynamic';
import React, { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Compass, Globe, Users, ArrowUpRight, CheckCircle2 } from 'lucide-react';

import AboutHero from "@/components/about/AboutHero";
import Visionaries from "@/components/about/Visionaries";
import OurStory from "@/components/about/OurStory";
import LeadershipGrid from "@/components/about/LeadershipGrid";
import IndustryPartnersGrid from "@/components/about/IndustryPartnersGrid";
import MentorsGrid from "@/components/about/MentorsGrid";

export default function AboutUsPage() {

  return (
    <main className="w-full bg-white text-gray-900 min-h-screen font-sans">
      <Header />
      
      {/* ================= NEW HERO: CINEMATIC INTRODUCTION ================= */}
      <AboutHero />
      
      {/* ================= SECTION 1 & 2: OUR STORY storytelling experience ================= */}
      <OurStory />
      
      {/* ================= SECTION 3: INLINE REVEAL LEADERSHIP STORIES ================= */}
      <Visionaries />

      {/* ================= SECTION 4: LEADERSHIP GRID ================= */}
      <LeadershipGrid />

      {/* ================= SECTION 5: PARTNERS GRID ================= */}
      <IndustryPartnersGrid />

      {/* ================= SECTION 6: MENTORS GRID ================= */}
      <MentorsGrid />

      <Footer />
    </main>
  );
}

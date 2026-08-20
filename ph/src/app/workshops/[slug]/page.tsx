import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@ph/components/Header";
import Footer from "@ph/components/Footer";
import CohortRegistrationSection from "@ph/components/CohortRegistrationSection";
import FaqAccordion from "@ph/components/FaqAccordion";
import CertificateShowcase from "@ph/components/CertificateShowcase";
import { WORKSHOPS_DATA, getWorkshopBySlug } from "@ph/config/workshopsData";
import { ArrowRight, ChevronRight, Check, ShieldCheck, ArrowUpRight } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return WORKSHOPS_DATA.map((w) => ({
    slug: w.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const workshop = getWorkshopBySlug(slug);

  if (!workshop) {
    return {
      title: "Workshop Not Found | The AI School PH",
    };
  }

  return {
    title: `${workshop.title} Workshop | The AI School Philippines`,
    description: workshop.shortDescription,
    openGraph: {
      title: `${workshop.title} Workshop | The AI School PH`,
      description: workshop.shortDescription,
      url: `https://theaischool.co/ph/workshops/${workshop.slug}`,
      siteName: "The AI School PH",
      locale: "en_PH",
      type: "website",
    },
  };
}

export default async function WorkshopDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const workshop = getWorkshopBySlug(slug);

  if (!workshop) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#EE1C25] selection:text-white">
      <Header />

      {/* Breadcrumb Navigation */}
      <div className="bg-[#FAFBFD] border-b border-slate-200/80 py-3.5 px-6 md:px-12 text-xs font-semibold text-slate-500 font-heading">
        <div className="max-w-7xl mx-auto flex items-center gap-2 flex-wrap">
          <Link href="/ph" className="hover:text-slate-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/ph/workshops" className="hover:text-slate-900 transition-colors">
            Workshops
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#EE1C25] font-bold">{workshop.title}</span>
        </div>
      </div>

      {/* ================= 1. HERO SECTION (Asymmetric, Editorial) ================= */}
      <section className="relative py-16 sm:py-24 bg-[#FAFBFD] border-b border-slate-200/80 overflow-hidden font-heading select-none">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-[#EE1C25]">
              <span className="w-6 h-[2px] bg-[#EE1C25]" />
              <span>{workshop.category} WORKSHOP</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.04]">
              {workshop.title}
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium">
              {workshop.overview}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-700 pt-2 font-mono">
              <span className="bg-slate-200/70 border border-slate-300 px-3 py-1.5 rounded-lg">
                Duration: {workshop.duration}
              </span>
              <span className="bg-slate-200/70 border border-slate-300 px-3 py-1.5 rounded-lg">
                Level: {workshop.level}
              </span>
              <span className="bg-slate-200/70 border border-slate-300 px-3 py-1.5 rounded-lg">
                Format: {workshop.format}
              </span>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#register"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#EE1C25] hover:bg-[#D3131B] text-white text-xs font-black uppercase tracking-wider rounded-full shadow-lg shadow-red-500/20 transition-all duration-200 hover:scale-[1.02]"
              >
                <span>Enroll in Next Cohort</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/919030906584"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-4 bg-slate-950 hover:bg-slate-900 text-white text-xs font-black uppercase tracking-wider rounded-full transition-all duration-200 shadow-sm"
              >
                <span>Talk to Advisor</span>
              </a>
            </div>
          </div>

          {/* Right Column: Quick Spec Box */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-2xl border border-slate-800 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#EE1C25]" />

              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h3 className="text-sm font-extrabold text-white uppercase tracking-wider font-mono">QUICK SPECIFICATIONS</h3>
                <span className="text-xs text-amber-400 font-bold">★ {workshop.stats.rating} Rating</span>
              </div>

              <div className="space-y-4 text-xs font-medium">
                <div className="flex justify-between items-center py-2 border-b border-slate-800/60">
                  <span className="text-slate-400">Hands-on Ratio</span>
                  <span className="font-bold text-white font-mono">{workshop.stats.handsOnPercent} Practical</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-800/60">
                  <span className="text-slate-400">Projects Built</span>
                  <span className="font-bold text-white font-mono">{workshop.stats.projectsCount} Projects</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-800/60">
                  <span className="text-slate-400">Total Graduates</span>
                  <span className="font-bold text-white font-mono">{workshop.stats.totalLearners} Alumni</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-800/60">
                  <span className="text-slate-400">Official Certificate</span>
                  <span className="font-bold text-emerald-400">Yes (LinkedIn Verifiable)</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="#register"
                  className="w-full py-3.5 bg-[#EE1C25] hover:bg-[#D3131B] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <span>Reserve Cohort Seat</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. TRUST STRIP (Slim Typographic Divider Bar) ================= */}
      <section className="py-6 bg-slate-900 text-white font-heading text-xs sm:text-sm font-bold border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-wrap items-center justify-around gap-6 text-center">
          <div className="flex items-center gap-2">
            <span className="text-[#EE1C25]">●</span>
            <span>Instructors: Active Tech Startup Leaders</span>
          </div>
          <span className="w-[1px] h-4 bg-slate-800 hidden md:inline-block" />
          <div className="flex items-center gap-2">
            <span className="text-[#EE1C25]">●</span>
            <span>{workshop.stats.handsOnPercent} Practical Hands-on Coding/Labs</span>
          </div>
          <span className="w-[1px] h-4 bg-slate-800 hidden md:inline-block" />
          <div className="flex items-center gap-2">
            <span className="text-[#EE1C25]">●</span>
            <span>Verifiable Digital LinkedIn Certificate</span>
          </div>
        </div>
      </section>

      {/* ================= 3. TOOLS COVERED ================= */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto space-y-10 font-heading">
        <div className="space-y-2">
          <span className="text-xs font-mono text-[#EE1C25] uppercase tracking-widest font-bold">TOOLKIT</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Tools & Platforms You Will Master
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium max-w-xl">
            Hands-on practice using actual commercial tools and open platforms for {workshop.title}.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshop.tools.map((tool, idx) => (
            <div
              key={idx}
              className="bg-[#FAFBFD] border border-slate-200/90 rounded-2xl p-6 space-y-3 shadow-xs hover:border-slate-400 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#EE1C25] bg-red-50 px-2.5 py-1 rounded-md border border-red-100">
                  {tool.category}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">{tool.name}</h3>
              <p className="text-slate-600 text-xs leading-relaxed font-medium">{tool.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 4. WHAT YOU'LL LEARN / CURRICULUM ================= */}
      <section className="py-20 bg-[#FAFBFD] border-t border-b border-slate-200/80 px-6 md:px-12 font-heading">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#EE1C25] uppercase tracking-widest font-bold">CURRICULUM</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Module-by-Module Breakdown
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {workshop.whatYoullLearn.map((mod, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/90 rounded-3xl p-8 space-y-5 shadow-xs relative overflow-hidden"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <span className="text-2xl font-black text-[#EE1C25] font-mono">MODULE {mod.moduleNumber}</span>
                  <span className="text-xs font-mono text-slate-400">SECTION {idx + 1} OF 4</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 tracking-tight leading-snug">
                  {mod.title}
                </h3>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                  {mod.description}
                </p>

                <div className="pt-3 space-y-2.5 border-t border-slate-100">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block">Learning Outcomes:</span>
                  {mod.keyTakeaways.map((takeaway, tIdx) => (
                    <div key={tIdx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                      <Check className="w-4 h-4 text-[#EE1C25] shrink-0 mt-0.5" />
                      <span>{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 5. WHO THIS COURSE IS FOR ================= */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto space-y-10 font-heading">
        <div className="space-y-2">
          <span className="text-xs font-mono text-[#EE1C25] uppercase tracking-widest font-bold">AUDIENCE</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Who Should Enroll
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {workshop.whoItsFor.map((aud, idx) => (
            <div
              key={idx}
              className="bg-[#FAFBFD] border border-slate-200/90 rounded-2xl p-6 space-y-3 text-left"
            >
              <span className="text-xs font-mono text-[#EE1C25] font-bold">0{idx + 1}</span>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">{aud.title}</h3>
              <p className="text-slate-600 text-xs leading-relaxed font-medium">{aud.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 6. CERTIFICATE SHOWCASE ================= */}
      <section className="py-24 bg-slate-950 text-white border-t border-b border-slate-800 px-6 md:px-12 font-heading">
        <CertificateShowcase
          courseTitle={workshop.title}
          certificateTitle={workshop.certificate.title}
          skills={workshop.certificate.skills}
          description={workshop.certificate.description}
        />
      </section>

      {/* ================= 7. COURSE-SPECIFIC FAQ ACCORDION ================= */}
      <section className="py-20 px-6 md:px-12 max-w-5xl mx-auto space-y-10 font-heading">
        <div className="space-y-2 text-center max-w-xl mx-auto">
          <span className="text-xs font-mono text-[#EE1C25] uppercase tracking-widest font-bold">FREQUENTLY ASKED QUESTIONS</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {workshop.title} Q&A
          </h2>
          <p className="text-slate-600 text-sm font-medium">
            Specific answers regarding prerequisites, schedule, and certification for this course.
          </p>
        </div>

        <FaqAccordion faqs={workshop.faqs} courseTitle={workshop.title} />
      </section>

      {/* Cohort Registration Form */}
      <CohortRegistrationSection />

      {/* ================= 8. CLOSING CTA BANNER ================= */}
      <section className="py-20 bg-slate-950 text-white border-t border-slate-800 px-6 md:px-12 text-center font-heading">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight">
            Ready to Master <span className="text-[#EE1C25]">{workshop.title}</span>?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-medium">
            Join the next live cohort in the Philippines and learn directly from tech startup leaders.
          </p>

          <div className="pt-4 flex items-center justify-center">
            <a
              href="#register"
              className="inline-flex items-center gap-2.5 px-9 py-4 bg-[#EE1C25] hover:bg-[#D3131B] text-white text-xs font-black uppercase tracking-wider rounded-full shadow-lg shadow-red-500/20 transition-all duration-200 hover:scale-105"
            >
              <span>Apply for Cohort</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@ph/components/Header";
import Footer from "@ph/components/Footer";
import CohortRegistrationSection from "@ph/components/CohortRegistrationSection";
import FaqAccordion from "@ph/components/FaqAccordion";
import CertificateShowcase from "@ph/components/CertificateShowcase";
import { LEARN_CATEGORIES_DATA, getLearnCategoryBySlug } from "@ph/config/learnCategoriesData";
import { ArrowRight, ChevronRight, Check, ShieldCheck, ArrowUpRight, BookOpen, Layers } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return LEARN_CATEGORIES_DATA.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getLearnCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category Not Found | The AI School PH",
    };
  }

  return {
    title: `${category.name} Learning Track | The AI School Philippines`,
    description: category.shortTeaser,
    openGraph: {
      title: `${category.name} Learning Track | The AI School PH`,
      description: category.shortTeaser,
      url: `https://theaischool.co/ph/learn/${category.slug}`,
      siteName: "The AI School PH",
      locale: "en_PH",
      type: "website",
    },
  };
}

export default async function CategoryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getLearnCategoryBySlug(slug);

  if (!category) {
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
          <Link href="/ph/learn" className="hover:text-slate-900 transition-colors">
            Learn
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#EE1C25] font-bold">{category.name}</span>
        </div>
      </div>

      {/* ================= 1. HERO SECTION (Asymmetric, Editorial) ================= */}
      <section className="relative py-16 sm:py-24 bg-[#FAFBFD] border-b border-slate-200/80 overflow-hidden font-heading select-none">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-[#EE1C25]">
              <span className="w-6 h-[2px] bg-[#EE1C25]" />
              <span>SPECIALIZED LEARNING TRACK</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.04]">
              {category.name}
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium">
              {category.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-700 pt-2 font-mono">
              <span className="bg-slate-200/70 border border-slate-300 px-3 py-1.5 rounded-lg">
                Courses: {category.coursesCount} Modules
              </span>
              <span className="bg-slate-200/70 border border-slate-300 px-3 py-1.5 rounded-lg">
                Level: {category.quickFacts.level}
              </span>
              <span className="bg-slate-200/70 border border-slate-300 px-3 py-1.5 rounded-lg">
                Mode: {category.quickFacts.mode}
              </span>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#curriculum-breakdown"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#EE1C25] hover:bg-[#D3131B] text-white text-xs font-black uppercase tracking-wider rounded-full shadow-lg shadow-red-500/20 transition-all duration-200 hover:scale-[1.02]"
              >
                <span>Explore Curriculum</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#register"
                className="inline-flex items-center gap-2 px-7 py-4 bg-slate-950 hover:bg-slate-900 text-white text-xs font-black uppercase tracking-wider rounded-full transition-all duration-200 shadow-sm"
              >
                <span>Enroll in Track</span>
              </a>
            </div>
          </div>

          {/* Right Column: Spec Summary Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-2xl border border-slate-800 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#EE1C25]" />

              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h3 className="text-sm font-extrabold text-white uppercase tracking-wider font-mono">PATHWAY SPECIFICATIONS</h3>
                <span className="text-xs font-mono text-[#EE1C25] font-bold">{category.coursesCount} MODULES</span>
              </div>

              <div className="space-y-4 text-xs font-medium font-mono">
                <div className="flex justify-between items-center py-2 border-b border-slate-800/60">
                  <span className="text-slate-400">Weekly Effort</span>
                  <span className="font-bold text-white">{category.quickFacts.effort}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-800/60">
                  <span className="text-slate-400">Guided Projects</span>
                  <span className="font-bold text-white">{category.quickFacts.guidedProjects}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-800/60">
                  <span className="text-slate-400">Instruction Mode</span>
                  <span className="font-bold text-white">{category.quickFacts.mode}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-800/60">
                  <span className="text-slate-400">Digital Certificate</span>
                  <span className="font-bold text-emerald-400">Verified LinkedIn Endorsement</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="#register"
                  className="w-full py-3.5 bg-[#EE1C25] hover:bg-[#D3131B] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <span>Apply for Next Cohort</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. QUICK-FACTS STRIP (Slim Typographic Bar) ================= */}
      <section className="py-6 bg-slate-900 text-white font-heading text-xs sm:text-sm font-bold border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-wrap items-center justify-around gap-6 text-center">
          <div className="flex items-center gap-2">
            <span className="text-[#EE1C25]">●</span>
            <span>Mode: {category.quickFacts.mode}</span>
          </div>
          <span className="w-[1px] h-4 bg-slate-800 hidden md:inline-block" />
          <div className="flex items-center gap-2">
            <span className="text-[#EE1C25]">●</span>
            <span>Skill Level: {category.quickFacts.level}</span>
          </div>
          <span className="w-[1px] h-4 bg-slate-800 hidden md:inline-block" />
          <div className="flex items-center gap-2">
            <span className="text-[#EE1C25]">●</span>
            <span>Effort: {category.quickFacts.effort}</span>
          </div>
          <span className="w-[1px] h-4 bg-slate-800 hidden md:inline-block" />
          <div className="flex items-center gap-2">
            <span className="text-[#EE1C25]">●</span>
            <span>Projects: {category.quickFacts.guidedProjects}</span>
          </div>
        </div>
      </section>

      {/* ================= 3. WHAT YOU'LL LEARN / MODULE BREAKDOWN ================= */}
      <section id="curriculum-breakdown" className="py-20 bg-white border-b border-slate-200/80 px-6 md:px-12 font-heading">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#EE1C25] uppercase tracking-widest font-bold">TIMELINE ROADMAP</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Detailed Curriculum & Modules
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-medium max-w-xl">
              Progression roadmap designed to take you step-by-step through {category.name}.
            </p>
          </div>

          <div className="space-y-6">
            {category.detailedModules.map((mod, idx) => (
              <div
                key={idx}
                id={`module-${idx + 1}`}
                className="bg-[#FAFBFD] border border-slate-200/90 rounded-3xl p-7 sm:p-8 space-y-4 shadow-xs relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-black text-[#EE1C25] font-mono">0{idx + 1}</span>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                      {mod.title}
                    </h3>
                  </div>

                  {mod.duration && (
                    <span className="text-xs font-mono font-bold bg-slate-200/80 text-slate-700 px-3 py-1 rounded-md shrink-0 self-start sm:self-auto">
                      {mod.duration}
                    </span>
                  )}
                </div>

                <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                  {mod.summary}
                </p>

                <div className="pt-2 space-y-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block">Core Topics Covered:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {mod.bulletTopics.map((topic, tIdx) => (
                      <div key={tIdx} className="flex items-start gap-2 text-xs text-slate-700 font-medium bg-white p-3 rounded-xl border border-slate-200/80">
                        <Check className="w-4 h-4 text-[#EE1C25] shrink-0 mt-0.5" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 4. TOOLS & TECHNOLOGIES MASTERED ================= */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto space-y-10 font-heading">
        <div className="space-y-2">
          <span className="text-xs font-mono text-[#EE1C25] uppercase tracking-widest font-bold">TECH STACK</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Tools & Platforms You Master
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.tools.map((tool, idx) => (
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

      {/* ================= 5. COURSE OUTCOMES ================= */}
      <section className="py-20 bg-[#FAFBFD] border-t border-b border-slate-200/80 px-6 md:px-12 font-heading">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#EE1C25] uppercase tracking-widest font-bold">CAREER OUTCOMES</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              What You Will Achieve
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {category.outcomes.map((out, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/90 rounded-3xl p-7 space-y-3 shadow-xs"
              >
                <span className="text-xs font-mono text-[#EE1C25] font-bold">OUTCOME 0{idx + 1}</span>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">{out.title}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">{out.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 6. CERTIFICATE SHOWCASE ================= */}
      <section className="py-24 bg-slate-950 text-white border-t border-b border-slate-800 px-6 md:px-12 font-heading">
        <CertificateShowcase
          courseTitle={category.name}
          certificateTitle={category.certificate.title}
          skills={category.certificate.skills}
          description={category.certificate.description}
        />
      </section>

      {/* ================= 7. CATEGORY-SPECIFIC FAQ ACCORDION ================= */}
      <section className="py-20 px-6 md:px-12 max-w-5xl mx-auto space-y-10 font-heading">
        <div className="space-y-2 text-center max-w-xl mx-auto">
          <span className="text-xs font-mono text-[#EE1C25] uppercase tracking-widest font-bold">FREQUENTLY ASKED QUESTIONS</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {category.name} FAQs
          </h2>
          <p className="text-slate-600 text-sm font-medium">
            Specific answers regarding prerequisites, schedule, and projects for {category.name}.
          </p>
        </div>

        <FaqAccordion faqs={category.faqs} courseTitle={category.name} />
      </section>

      {/* Cohort Registration Form */}
      <CohortRegistrationSection />

      {/* ================= 8. CLOSING CTA BANNER ================= */}
      <section className="py-20 bg-slate-950 text-white border-t border-slate-800 px-6 md:px-12 text-center font-heading">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight">
            Ready to Enroll in <span className="text-[#EE1C25]">{category.name}</span>?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-medium">
            Join the next live cohort in the Philippines and learn directly from active startup leaders.
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

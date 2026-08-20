import Link from "next/link";
import { US_DATA } from "@us/config/usData";
import { BookOpen, Clock, CheckCircle, ArrowRight, Sparkles, Layers } from "lucide-react";

export default function USCoursesSection() {
  const { courses } = US_DATA;

  return (
    <section id="courses" className="py-16 md:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-100 text-[#EE1C25] text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Practical Curriculums</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Don't Just Use AI – <span className="text-[#EE1C25]">Build With It</span>
          </h2>

          <p className="text-slate-600 text-base leading-relaxed">
            Our intensive hands-on programs take you step-by-step from zero to engineering production-grade AI systems, multi-agent frameworks, and automated applications.
          </p>
        </div>

        {/* 4 Courses Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/us/courses/${course.slug}`}
              className={`group relative bg-white rounded-3xl p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:-translate-y-1 ${
                course.featured
                  ? "border-red-500 ring-2 ring-red-500/20"
                  : "border-slate-200/90 hover:border-slate-300"
              }`}
            >
              {/* Featured Ribbon */}
              {course.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-[#EE1C25] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>{course.badge}</span>
                </div>
              )}

              <div className="space-y-5">
                {/* Header & Badges */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                    <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg">
                      <Clock className="w-3.5 h-3.5 text-slate-600" />
                      {course.duration}
                    </span>
                    <span className="bg-red-50 text-[#EE1C25] px-2.5 py-1 rounded-lg font-bold text-[11px]">
                      {course.level}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 tracking-tight leading-snug group-hover:text-[#EE1C25] transition-colors">
                    {course.title}
                  </h3>
                </div>

                {/* Overview */}
                <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                  {course.overview}
                </p>

                {/* Key Takeaways List */}
                <div className="space-y-2 border-t border-slate-100 pt-4">
                  <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#EE1C25]" />
                    <span>Key Takeaways &amp; Builds</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {course.takeaways.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Action Link */}
              <div className="pt-6 border-t border-slate-100/80 mt-6">
                <div
                  className={`w-full inline-flex items-center justify-center py-3 rounded-xl text-xs font-bold transition-all duration-200 ${
                    course.featured
                      ? "bg-[#EE1C25] hover:bg-[#D3131B] text-white shadow-md"
                      : "bg-slate-900 hover:bg-slate-800 text-white"
                  }`}
                >
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* "Explore All Courses" CTA Button below grid */}
        <div className="flex justify-center pt-4">
          <Link
            href="/us/learn"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#171717] hover:bg-[#EE1C25] text-white text-xs font-black uppercase tracking-wider rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>EXPLORE ALL COURSES</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

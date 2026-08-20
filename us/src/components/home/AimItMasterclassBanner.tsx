import Link from "next/link";
import { Sparkles, Users, ArrowRight, Zap } from "lucide-react";
import { US_DATA } from "@us/config/usData";

export default function AimItMasterclassBanner() {
  const { aimItBanner } = US_DATA;

  return (
    <section id="aim-it" className="py-12 bg-white relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white p-8 sm:p-12 overflow-hidden shadow-2xl border border-slate-800">
          {/* Subtle Red ambient glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/20 rounded-full blur-[120px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Info */}
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-800/60 text-red-400 text-xs font-bold uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5" />
                <span>{aimItBanner.tag}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                {aimItBanner.title}
              </h2>

              <p className="text-slate-300 text-base max-w-2xl">
                {aimItBanner.subtitle}
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs font-semibold text-slate-300">
                <div className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700">
                  <Users className="w-4 h-4 text-[#EE1C25]" />
                  <span>{aimItBanner.statsCallout}</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>{aimItBanner.badge}</span>
                </div>
              </div>
            </div>

            {/* Right Call To Action */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <Link
                href="#register"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-white bg-[#EE1C25] hover:bg-[#D3131B] rounded-2xl shadow-xl shadow-red-600/30 hover:shadow-red-600/50 transition-all duration-200 active:scale-95 group text-center"
              >
                <span>{aimItBanner.ctaText}</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { US_DATA } from "@us/config/usData";
import { Sparkles, Cpu, Layers } from "lucide-react";

export default function UnparalleledCurriculumBanner() {
  const { unparalleledBanner } = US_DATA;

  return (
    <section className="py-16 bg-slate-950 text-white relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-red-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/90 border border-red-800 text-red-400 text-xs font-bold uppercase tracking-wider">
          <Cpu className="w-4 h-4 text-[#EE1C25]" />
          <span>Industry-Defined Standards</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
          {unparalleledBanner.headline}
        </h2>

        <p className="text-xl font-medium text-red-400 max-w-2xl mx-auto">
          {unparalleledBanner.subheadline}
        </p>

        <p className="text-slate-400 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed pt-2">
          {unparalleledBanner.description}
        </p>
      </div>
    </section>
  );
}

'use client';
import React, { useState } from 'react';
import { DollarSign, Shield, ClipboardCheck, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

export default function EarnWithUsPage() {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    qualification: '', availability: '', status: '',
    address: '', city: '', state: '', zip: ''
  });
  const [contributions, setContributions] = useState<string[]>([]);
  const [agreed, setAgreed] = useState(false);

  const toggleContribution = (track: string) => {
    setContributions(prev => prev.includes(track) ? prev.filter(t => t !== track) : [...prev, track]);
  };

  return (
    <main className="w-full bg-white text-gray-900 font-sans min-h-screen select-none">
      <Header />
      
      {/* ================= HEADER STRIP ================= */}
      <section className="max-w-4xl mx-auto px-6 pt-20 text-center space-y-4">
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight uppercase">
          Freelance & Remote Opportunities
        </h1>
        <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Apply for flexible freelance opportunities and collaborate remotely with innovative teams and projects.
        </p>
      </section>

      {/* ================= COMPACT ENTRY REGISTRY TERMINAL ================= */}
      <section className="max-w-4xl mx-auto px-6 py-12 pb-24">
        <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-10 shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-[#EE1C25] rounded-t-3xl" />

          <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
            
            {/* Step Row 1: Identity Parameters */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-2 flex items-center gap-2"><ClipboardCheck className="w-4 h-4 text-[#EE1C25]" /> 01. Identity Parameters</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="First Name *" required className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-xs font-semibold focus:outline-none focus:border-gray-900 focus:bg-white transition-all" />
                <input type="text" placeholder="Last Name *" required className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-xs font-semibold focus:outline-none focus:border-gray-900 focus:bg-white transition-all" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="email" placeholder="Email Address *" required className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-xs font-semibold focus:outline-none focus:border-gray-900 focus:bg-white transition-all" />
                <input type="tel" placeholder="Phone/Mobile Number *" required className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-xs font-semibold focus:outline-none focus:border-gray-900 focus:bg-white transition-all" />
              </div>
            </div>

            {/* Step Row 2: Logistics / Location Mapping */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-2 flex items-center gap-2"><Shield className="w-4 h-4 text-[#EE1C25]" /> 02. Logistics Location Matrix</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Complete Street Address *" required className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-xs font-semibold focus:outline-none focus:border-gray-900 focus:bg-white transition-all" />
                <input type="text" placeholder="City *" required className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-xs font-semibold focus:outline-none focus:border-gray-900 focus:bg-white transition-all" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input type="text" placeholder="State *" required className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-xs font-semibold focus:outline-none focus:border-gray-900 focus:bg-white transition-all" />
                <input type="text" placeholder="Zip Code *" required className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-xs font-semibold focus:outline-none focus:border-gray-900 focus:bg-white transition-all" />
                <select required className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-xs font-bold text-gray-500 focus:outline-none focus:border-gray-900 focus:bg-white transition-all">
                  <option value="">Select Country *</option>
                  <option value="India">India</option>
                  <option value="Philippines">Philippines</option>
                </select>
              </div>
            </div>

            {/* Step Row 3: Competency Metrics */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-2 flex items-center gap-2"><DollarSign className="w-4 h-4 text-[#EE1C25]" /> 03. Qualifications & Competency</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <select required className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-xs font-bold text-gray-500 focus:outline-none focus:border-gray-900 focus:bg-white transition-all">
                  <option value="">Highest Qualification *</option>
                  <option value="B.Tech">B.Tech / Professional Degree</option>
                  <option value="Undergraduate">Undergraduate</option>
                </select>
                <select required className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-xs font-bold text-gray-500 focus:outline-none focus:border-gray-900 focus:bg-white transition-all">
                  <option value="">Current Status *</option>
                  <option value="Student">Student</option>
                  <option value="Professional">Working Professional</option>
                </select>
                <select required className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-xs font-bold text-gray-500 focus:outline-none focus:border-gray-900 focus:bg-white transition-all">
                  <option value="">Weekly Availability *</option>
                  <option value="10-20">10-20 Hours</option>
                  <option value="20-40">20-40 Hours</option>
                </select>
              </div>
            </div>

            {/* Step Row 4: Task Track Routing Selection Array */}
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-gray-700 block">I'm ready to contribute to:</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Image Fine-Tuning & Annotation",
                  "Video Fine-Tuning & Annotation",
                  "Audio Fine-Tuning & Annotation",
                  "Text Fine-Tuning & Annotation"
                ].map((track) => {
                  const isChecked = contributions.includes(track);
                  return (
                    <button
                      type="button" key={track} onClick={() => toggleContribution(track)}
                      className={`p-4 border text-left rounded-xl text-xs font-bold transition-all flex items-center justify-between ${isChecked ? 'border-[#EE1C25] bg-red-50/20 text-gray-900' : 'border-gray-200 bg-gray-50/50 text-gray-500 hover:border-gray-300'}`}
                    >
                      <span>{track}</span>
                      <div className={`w-3.5 h-3.5 rounded-md border flex items-center justify-center text-white ${isChecked ? 'bg-[#EE1C25] border-[#EE1C25]' : 'border-gray-300 bg-white'}`}>
                        {isChecked && "✓"}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Terms Consent and Submit Trigger */}
            <div className="space-y-5 pt-4 border-t border-gray-100">
              <label className="flex items-start space-x-3 text-[10px] font-bold leading-relaxed text-gray-400 select-none cursor-pointer">
                <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 rounded border-gray-300 text-[#EE1C25] focus:ring-[#EE1C25]" />
                <span>I understand that this is a freelance / remote opportunity and not a full-time guaranteed employment position. I agree to comply with company policies, project requirements, and professional communication standards.</span>
              </label>

              <button type="submit" disabled={!agreed} className="w-full flex items-center justify-center space-x-2 bg-gray-900 text-white disabled:bg-gray-300 hover:bg-[#EE1C25] font-black py-4 px-6 rounded-xl transition-all duration-300 shadow-md transform active:scale-[0.99]">
                <span>Submit Candidate Profile</span>
              </button>
            </div>

          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}

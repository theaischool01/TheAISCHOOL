"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";

export default function USRegistration() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneCode: "+1",
    phone: "",
    linkedin: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phoneCode: "+1",
        phone: "",
        linkedin: ""
      });
    }, 1500);
  };

  return (
    <section className="w-full bg-white py-20 px-6 md:px-12 border-t border-gray-100 relative z-10 font-heading">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Text and Abstract Graphic */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#EE1C25]">
              Get Started
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-950 tracking-tight uppercase leading-tight">
              Begin Your <br />
              <span className="text-[#EE1C25]">AI Journey</span> Today
            </h2>
            <p className="text-neutral-500 text-sm font-semibold leading-relaxed">
              Submit your application to join the next cohort of future AI leaders. Our admissions team will review your profile and get in touch within 24 hours.
            </p>
          </div>

          {/* Abstract Dot/Orbit/Isometric Motif Graphic */}
          <div className="relative w-full max-w-[320px] aspect-video bg-neutral-50 rounded-2xl border border-neutral-100 p-6 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(238,28,37,0.04)_0%,transparent_60%)]" />
            <svg viewBox="0 0 200 100" className="w-full h-full">
              {/* Concentric Dotted Orbits */}
              <circle cx="100" cy="50" r="40" fill="none" stroke="#EE1C25" strokeOpacity="0.15" strokeDasharray="2 4" />
              <circle cx="100" cy="50" r="60" fill="none" stroke="#171717" strokeOpacity="0.08" strokeDasharray="1 6" />
              
              {/* Floating Isometric Diamonds (Nodes) */}
              <polygon points="100,42 108,50 100,58 92,50" fill="#EE1C25" />
              <polygon points="60,22 65,27 60,32 55,27" fill="#171717" opacity="0.3" />
              <polygon points="140,68 145,73 140,78 135,73" fill="#171717" opacity="0.3" />
              
              {/* Connection Lines */}
              <line x1="60" y1="27" x2="100" y2="50" stroke="#171717" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.2" />
              <line x1="140" y1="73" x2="100" y2="50" stroke="#171717" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.2" />
            </svg>
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="lg:col-span-7 flex justify-center w-full">
          <div className="w-full max-w-xl bg-white border border-neutral-100 rounded-3xl p-8 md:p-10 shadow-xl relative">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">First Name</label>
                  <input
                    type="text"
                    required
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    placeholder="John"
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-[#EE1C25] transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Last Name</label>
                  <input
                    type="text"
                    required
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    placeholder="Doe"
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-[#EE1C25] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Email Address</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="john.doe@example.com"
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-[#EE1C25] transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Phone Number</label>
                <div className="flex gap-2">
                  <select
                    value={form.phoneCode}
                    onChange={(e) => setForm({ ...form, phoneCode: e.target.value })}
                    className="px-3 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-[#EE1C25] transition-colors"
                  >
                    <option value="+1">+1 (US)</option>
                    <option value="+91">+91 (IN)</option>
                    <option value="+44">+44 (UK)</option>
                  </select>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="(555) 000-0000"
                    className="flex-1 px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-[#EE1C25] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">LinkedIn Profile URL</label>
                <input
                  type="url"
                  required
                  value={form.linkedin}
                  onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-[#EE1C25] transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#EE1C25] hover:bg-[#D3131B] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-200 shadow-md hover:shadow-lg disabled:bg-neutral-300 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <span>Submit Application</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              {success && (
                <div className="p-4 bg-green-50 text-green-700 text-xs font-bold rounded-xl text-center">
                  Application submitted successfully! We will get in touch soon.
                </div>
              )}
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}

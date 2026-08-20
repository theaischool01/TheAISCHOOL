"use client";

import Header from "@ph/components/Header";
import Footer from "@ph/components/Footer";
import { PH_DATA } from "@ph/config/phData";
import { MapPin, Mail, Phone, Send } from "lucide-react";

export default function ContactUsPage() {
  const { region } = PH_DATA;

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans">
      <Header />

      {/* Hero */}
      <section className="py-16 md:py-20 bg-slate-950 text-white px-6 md:px-12 text-center border-b border-slate-800">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#EE1C25]">
            GET IN TOUCH
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-heading">
            Contact <span className="text-[#EE1C25]">Us</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Have questions about our AI engineering programs, enterprise workshops, or university partnerships? Reach out to our team.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 md:px-12 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Left Column: Addresses */}
        <div className="md:col-span-5 space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-slate-900 uppercase font-heading">
              Our Locations
            </h2>
            <p className="text-xs text-slate-500">
              For any support, please mail to <a href={`mailto:${region.email}`} className="text-[#EE1C25] font-bold">{region.email}</a>. Our support team will get back to you within 24 hours.
            </p>
          </div>

          <div className="space-y-6 text-xs text-slate-700">
            <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <MapPin className="w-5 h-5 text-[#EE1C25] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-extrabold text-slate-900 uppercase text-xs">Philippines Address</h4>
                <p className="mt-1 leading-relaxed text-slate-600">{region.phAddress}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <MapPin className="w-5 h-5 text-[#EE1C25] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-extrabold text-slate-900 uppercase text-xs">HQ Address</h4>
                <p className="mt-1 leading-relaxed text-slate-600">{region.hqAddress}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <Mail className="w-5 h-5 text-[#EE1C25] shrink-0" />
              <div>
                <h4 className="font-extrabold text-slate-900 uppercase text-xs">Email</h4>
                <p className="mt-0.5 text-slate-600 font-semibold">{region.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <Phone className="w-5 h-5 text-[#EE1C25] shrink-0" />
              <div>
                <h4 className="font-extrabold text-slate-900 uppercase text-xs">Phone</h4>
                <p className="mt-0.5 text-slate-600 font-semibold">{region.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="md:col-span-7 bg-slate-950 text-white rounded-3xl p-8 md:p-10 shadow-2xl border border-slate-800 space-y-6">
          <h3 className="text-xl font-black uppercase text-white font-heading">Send Us A Message</h3>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                required
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#EE1C25]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#EE1C25]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Message</label>
              <textarea
                rows={4}
                placeholder="How can we help you?"
                required
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#EE1C25]"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 bg-[#EE1C25] hover:bg-[#D3131B] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-500/20"
            >
              <span>Send Message</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}

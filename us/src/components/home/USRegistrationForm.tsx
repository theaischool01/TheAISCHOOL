"use client";

import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Building2,
  MapPin,
  Send,
  CheckCircle2,
  Briefcase,
} from "lucide-react";

export default function USRegistrationForm() {
  const [activeTab, setActiveTab] = useState<"buy" | "apply">("buy");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    targetCourse: "AIM-IT Master Class",
    orgName: "",
    address: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <section id="register" className="w-full bg-[#FFF8F8] py-16 lg:py-24 px-6 md:px-12 relative z-10 font-heading">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 tracking-tight leading-tight uppercase">
            Secure Your Learning Seat
          </h2>
          <p className="text-slate-600 text-sm font-semibold">
            Apply today to lock in your direct alignment track with active tech ecosystem startup leaders.
          </p>
        </div>

        {/* Form Card Container */}
        <div className="bg-white border-t-4 border-t-[#EE1C25] border border-neutral-200/90 rounded-[2.5rem] p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
          {/* Top Toggle Tabs */}
          <div className="flex items-center gap-3 mb-8">
            <button
              type="button"
              onClick={() => setActiveTab("buy")}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-extrabold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === "buy"
                  ? "bg-[#EE1C25] text-white shadow-md shadow-red-500/25"
                  : "bg-neutral-100/90 hover:bg-neutral-200/80 text-slate-600"
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>BUY COURSE TRACK</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("apply")}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-extrabold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === "apply"
                  ? "bg-[#EE1C25] text-white shadow-md shadow-red-500/25"
                  : "bg-neutral-100/90 hover:bg-neutral-200/80 text-slate-600"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>APPLY FOR JOBS</span>
            </button>
          </div>

          {isSubmitted ? (
            <div className="py-12 px-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-red-50 border border-red-200 text-[#EE1C25] flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 uppercase">
                {activeTab === "buy" ? "Booking Confirmed!" : "Application Submitted!"}
              </h3>
              <p className="text-slate-600 text-sm max-w-md mx-auto font-semibold">
                Thank you, <span className="text-slate-900 font-extrabold">{formData.fullName}</span>. Our admissions team has reserved your enrollment details and sent confirmation to <span className="text-[#EE1C25] font-extrabold">{formData.email}</span>.
              </p>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="text-xs font-bold text-slate-500 hover:text-[#EE1C25] underline pt-4 cursor-pointer"
              >
                Submit another response
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="flex items-center gap-1.5 text-xs font-black text-slate-800 uppercase tracking-wider">
                    <User className="w-3.5 h-3.5 text-[#EE1C25]" />
                    <span>FULL NAME</span>
                    <span className="text-[#EE1C25]">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    className="w-full bg-slate-50 border border-slate-200/90 focus:bg-white focus:border-[#EE1C25] focus:ring-2 focus:ring-red-100 rounded-2xl px-4 py-3.5 text-sm font-semibold text-slate-900 placeholder-slate-400 outline-none transition-all"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <label className="flex items-center gap-1.5 text-xs font-black text-slate-800 uppercase tracking-wider">
                    <Mail className="w-3.5 h-3.5 text-[#EE1C25]" />
                    <span>EMAIL ADDRESS</span>
                    <span className="text-[#EE1C25]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full bg-slate-50 border border-slate-200/90 focus:bg-white focus:border-[#EE1C25] focus:ring-2 focus:ring-red-100 rounded-2xl px-4 py-3.5 text-sm font-semibold text-slate-900 placeholder-slate-400 outline-none transition-all"
                  />
                </div>

                {/* Mobile Number */}
                <div className="space-y-2">
                  <label className="flex items-center gap-1.5 text-xs font-black text-slate-800 uppercase tracking-wider">
                    <Phone className="w-3.5 h-3.5 text-[#EE1C25]" />
                    <span>MOBILE NUMBER</span>
                    <span className="text-[#EE1C25]">*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    required
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-slate-50 border border-slate-200/90 focus:bg-white focus:border-[#EE1C25] focus:ring-2 focus:ring-red-100 rounded-2xl px-4 py-3.5 text-sm font-semibold text-slate-900 placeholder-slate-400 outline-none transition-all"
                  />
                </div>

                {/* Select Target Course */}
                <div className="space-y-2">
                  <label className="flex items-center gap-1.5 text-xs font-black text-slate-800 uppercase tracking-wider">
                    <GraduationCap className="w-3.5 h-3.5 text-[#EE1C25]" />
                    <span>SELECT TARGET COURSE</span>
                    <span className="text-[#EE1C25]">*</span>
                  </label>
                  <select
                    name="targetCourse"
                    required
                    value={formData.targetCourse}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200/90 focus:bg-white focus:border-[#EE1C25] focus:ring-2 focus:ring-red-100 rounded-2xl px-4 py-3.5 text-sm font-semibold text-slate-900 outline-none transition-all cursor-pointer"
                  >
                    <option value="AIM-IT Master Class">AIM-IT Master Class</option>
                    <option value="AI Ready Developer">AI Ready Developer</option>
                    <option value="Build Your Own AI Agent">Build Your Own AI Agent</option>
                    <option value="Gen AI 101">Gen AI 101</option>
                  </select>
                </div>

                {/* College & Organization Name */}
                <div className="md:col-span-2 space-y-2">
                  <label className="flex items-center gap-1.5 text-xs font-black text-slate-800 uppercase tracking-wider">
                    <Building2 className="w-3.5 h-3.5 text-[#EE1C25]" />
                    <span>COLLEGE & ORGANIZATION NAME</span>
                    <span className="text-[#EE1C25]">*</span>
                  </label>
                  <input
                    type="text"
                    name="orgName"
                    required
                    value={formData.orgName}
                    onChange={handleChange}
                    placeholder="University or Corporate entity"
                    className="w-full bg-slate-50 border border-slate-200/90 focus:bg-white focus:border-[#EE1C25] focus:ring-2 focus:ring-red-100 rounded-2xl px-4 py-3.5 text-sm font-semibold text-slate-900 placeholder-slate-400 outline-none transition-all"
                  />
                </div>

                {/* Complete Physical Mailing Address */}
                <div className="md:col-span-2 space-y-2">
                  <label className="flex items-center gap-1.5 text-xs font-black text-slate-800 uppercase tracking-wider">
                    <MapPin className="w-3.5 h-3.5 text-[#EE1C25]" />
                    <span>COMPLETE PHYSICAL MAILING ADDRESS</span>
                    <span className="text-[#EE1C25]">*</span>
                  </label>
                  <textarea
                    name="address"
                    required
                    rows={3}
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter full address details for tracking and certificate shipping logistics"
                    className="w-full bg-slate-50 border border-slate-200/90 focus:bg-white focus:border-[#EE1C25] focus:ring-2 focus:ring-red-100 rounded-2xl px-4 py-3.5 text-sm font-semibold text-slate-900 placeholder-slate-400 outline-none transition-all resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#0B0F19] hover:bg-slate-900 text-white font-black text-xs uppercase tracking-wider py-4 rounded-2xl shadow-xl hover:shadow-2xl flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer active:scale-98 group"
                >
                  <span>
                    {isSubmitting
                      ? "Processing..."
                      : activeTab === "buy"
                      ? "Complete Course Booking"
                      : "Submit Job Application"}
                  </span>
                  <Send className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

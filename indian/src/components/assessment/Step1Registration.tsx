"use client";

import React, { useState } from 'react';
import { User, Mail, Phone, GraduationCap, Target, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { CandidateProfile } from './types';
import { MOCK_CANDIDATE } from './mockTemplates';
import { saveStudentProfile } from './groqClient';

interface Step1Props {
  initialData: CandidateProfile;
  demoMode: boolean;
  onComplete: (data: CandidateProfile) => void;
}

export default function Step1Registration({ initialData, demoMode, onComplete }: Step1Props) {
  const [formData, setFormData] = useState<CandidateProfile>(initialData.name ? initialData : {
    name: '',
    email: '',
    phone: '',
    college: '',
    targetDomain: 'AI & Machine Learning Engineering',
    experienceLevel: 'Student / Fresher'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const fillDemoData = () => {
    setFormData(MOCK_CANDIDATE);
    setErrors({});
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 8) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (!formData.college.trim()) errs.college = 'College or organization is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await saveStudentProfile(formData);
    } catch {
      // Non-blocking fallback
    } finally {
      setSubmitting(false);
      onComplete(formData);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Step Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#E1002A] text-xs font-bold tracking-wide uppercase mb-3 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#E1002A]" />
          Step 1 of 6 • Candidate Profile
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
          Welcome to <span className="text-[#E1002A]">AI Career Mentor</span>
        </h1>
        <p className="mt-2.5 text-sm sm:text-base text-zinc-600 max-w-xl mx-auto leading-relaxed">
          Begin your comprehensive AI readiness evaluation. Enter your basic details to personalize the adaptive interview, live AI speech assessment, and tailored career roadmap.
        </p>

        {/* Quick sample auto-fill */}
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={fillDemoData}
            className="text-xs text-zinc-600 hover:text-[#E1002A] border border-zinc-200 hover:border-red-300 bg-zinc-50 hover:bg-red-50/50 px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Sparkles className="w-3 h-3 text-[#E1002A]" />
            Quick Test: Auto-fill Sample Candidate
          </button>
        </div>
      </div>

      {/* Form Card */}
      <div className="rounded-2xl bg-white border border-zinc-200 p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                Full Name <span className="text-[#E1002A]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Aryan Sharma"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-50 border text-zinc-900 text-sm placeholder-zinc-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E1002A]/20 transition-all ${
                    errors.name ? 'border-red-500' : 'border-zinc-300 focus:border-[#E1002A]'
                  }`}
                />
              </div>
              {errors.name && <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                Email Address <span className="text-[#E1002A]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. aryan@example.com"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-50 border text-zinc-900 text-sm placeholder-zinc-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E1002A]/20 transition-all ${
                    errors.email ? 'border-red-500' : 'border-zinc-300 focus:border-[#E1002A]'
                  }`}
                />
              </div>
              {errors.email && <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                Mobile Number <span className="text-[#E1002A]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. +91 98765 43210"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-50 border text-zinc-900 text-sm placeholder-zinc-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E1002A]/20 transition-all ${
                    errors.phone ? 'border-red-500' : 'border-zinc-300 focus:border-[#E1002A]'
                  }`}
                />
              </div>
              {errors.phone && <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.phone}</p>}
            </div>

            {/* College / Organization */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                College / Organization <span className="text-[#E1002A]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  placeholder="e.g. IIT Delhi / B.Tech CS"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-50 border text-zinc-900 text-sm placeholder-zinc-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E1002A]/20 transition-all ${
                    errors.college ? 'border-red-500' : 'border-zinc-300 focus:border-[#E1002A]'
                  }`}
                />
              </div>
              {errors.college && <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.college}</p>}
            </div>

            {/* Target Domain */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                Primary Career Track
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                  <Target className="w-4 h-4" />
                </div>
                <select
                  value={formData.targetDomain}
                  onChange={(e) => setFormData({ ...formData, targetDomain: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E1002A]/20 focus:border-[#E1002A] transition-all appearance-none"
                >
                  <option value="AI & Machine Learning Engineering">AI & Machine Learning Engineering</option>
                  <option value="Generative AI & Agent Architectures">Generative AI & Agent Architectures</option>
                  <option value="Data Analytics & PowerBI">Data Analytics & PowerBI</option>
                  <option value="AI Cloud & Distributed Systems">AI Cloud & Distributed Systems</option>
                  <option value="Full-Stack AI Application Development">Full-Stack AI Application Development</option>
                </select>
              </div>
            </div>

            {/* Current Stage */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                Current Stage
              </label>
              <select
                value={formData.experienceLevel}
                onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E1002A]/20 focus:border-[#E1002A] transition-all appearance-none"
              >
                <option value="Student / Fresher">College Student (1st - 3rd Year)</option>
                <option value="Final Year Student">Final Year / Graduating Batch</option>
                <option value="Junior (1-2 yrs)">Recent Graduate / Junior Engineer (0-2 Yrs)</option>
                <option value="Mid-Level (3-5 yrs)">Working Professional Looking to Pivot to AI</option>
              </select>
            </div>
          </div>

          {/* Privacy & Consent Note */}
          <div className="pt-2 flex items-start gap-2 text-xs text-zinc-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              Your information is securely encrypted and evaluated by The AI School intelligence suite. We will never share your contact details.
            </span>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="w-full group py-3.5 px-6 rounded-xl bg-[#E1002A] hover:bg-[#c40024] text-white font-bold text-sm shadow-md shadow-[#E1002A]/20 hover:shadow-[#E1002A]/30 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {submitting ? (
                <span>Initializing Assessment Environment...</span>
              ) : (
                <>
                  <span>Save & Proceed to Video Self-Intro</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

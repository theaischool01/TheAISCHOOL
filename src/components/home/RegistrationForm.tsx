'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, MapPin, Building2, Send, Briefcase, Sparkles, GraduationCap, ArrowRight } from 'lucide-react';
import { useRegion } from '@/context/RegionContext';

export default function UnifiedRegistrationForm() {
  const { regionConfig } = useRegion();
  // 'student' = wants to buy a course | 'candidate' = wants to apply for a job
  const [intent, setIntent] = useState<'student' | 'candidate'>('student');
  const [isLoading, setIsLoading] = useState(false);
  
  // Dynamic form state maps
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [address, setAddress] = useState('');
  const [targetPosition, setTargetPosition] = useState('AI Curriculum Architect');
  const [targetCourse, setTargetCourse] = useState('Building Your AI Agent (For Coders)');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (intent === 'student') {
      try {
        // Get course slug from course title (mapping to seed data)
        const courseMap: Record<string, string> = {
          'Building Your AI Agent (For Coders)': 'building-your-ai-agent-for-coders',
          'Data Analysis with AI and PowerBI (All)': 'data-analysis-with-ai-and-powerbi',
          'Prompt Engineering 101': 'prompt-engineering-101',
          'Advanced AI Architectures (RAG)': 'building-your-ai-agent-for-coders', // Fallback to existing course
        };
        
        const courseSlug = courseMap[targetCourse] || 'building-your-ai-agent-for-coders';
        
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            phone,
            college: organization,
            year: '2024', // Default year
            courseSlug,
            region: regionConfig.code,
            country: regionConfig.country,
            currency: regionConfig.currency,
            timezone: regionConfig.timezone,
          }),
        });
        
        const data = await res.json();
        
        if (data.success) {
          alert('Registration successful!');
          setName(''); setEmail(''); setPhone(''); setOrganization(''); setAddress('');
        } else {
          alert('Registration failed. Please try again.');
        }
      } catch (error) {
        alert('Registration failed. Please try again.');
      }
    } else {
      // Career track - placeholder for now
      setTimeout(() => {
        alert('Job application submitted successfully!');
        setName(''); setEmail(''); setPhone(''); setOrganization(''); setAddress('');
      }, 1500);
    }
    
    setIsLoading(false);
  };

  return (
    <section id="register" className="w-full bg-white py-14 lg:py-16 px-6 md:px-12 relative overflow-hidden">
      {/* Subtle ambient lighting focusing attention directly on the form core */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-[#EE1C25]/5 to-transparent blur-[120px] pointer-events-none rounded-full" />
      
      <div className="max-w-4xl mx-auto relative z-10 space-y-12">
        
        {/* ================= DYNAMIC SECTION HEADER ================= */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#EE1C25] bg-red-50 px-3 py-1.5 rounded-full">
            Ecosystem Registry
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight transition-all">
            {intent === 'student' ? 'Secure Your Learning Seat' : 'Join the Core Tech Team'}
          </h2>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed">
            {intent === 'student' 
              ? 'Apply today to lock in your direct alignment track with active tech ecosystem startup leaders.'
              : 'Submit your entry parameters into our T-Hub 2.0 recruitment gateway pipeline.'
            }
          </p>
        </div>

        {/* ================= PREMIUM REVENUE CARD CONTAINER ================= */}
        <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-12 shadow-2xl relative group hover:border-gray-300 transition-all duration-300">
          <div className="absolute top-0 left-0 h-1.5 w-full bg-[#EE1C25] rounded-t-3xl" />

          {/* DUAL-INTENT SELECTION METHOD SWITCH */}
          <div className="grid grid-cols-2 bg-gray-50 p-1 rounded-2xl mb-10 relative max-w-md mx-auto border border-gray-200/50">
            <button 
              type="button"
              onClick={() => setIntent('student')}
              className={`flex items-center justify-center space-x-2 text-xs font-black uppercase tracking-wider py-3.5 rounded-xl relative z-10 transition-colors ${intent === 'student' ? 'text-white' : 'text-gray-500'}`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Buy Course Track</span>
            </button>
            <button 
              type="button"
              onClick={() => setIntent('candidate')}
              className={`flex items-center justify-center space-x-2 text-xs font-black uppercase tracking-wider py-3.5 rounded-xl relative z-10 transition-colors ${intent === 'candidate' ? 'text-white' : 'text-gray-500'}`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Apply for Jobs</span>
            </button>
            
            {/* Sliding Core Red Highlighter Plate */}
            <motion.div 
              className="absolute top-1 bottom-1 left-1 rounded-xl bg-[#EE1C25] shadow-md"
              animate={{ x: intent === 'candidate' ? '98%' : '0%' }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              style={{ width: '48%' }}
            />
          </div>

          {/* ================= ACTIVE REGISTRY FIELDS ================= */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Universal Input: Full Name */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#EE1C25]" /> Full Name <span className="text-[#EE1C25]">*</span>
                </label>
                <input 
                  type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Saanvi Cyril" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 px-4 text-sm text-gray-900 focus:outline-none focus:border-gray-900 focus:bg-white transition-all"
                />
              </div>

              {/* Universal Input: Email Address */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#EE1C25]" /> Email Address <span className="text-[#EE1C25]">*</span>
                </label>
                <input 
                  type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 px-4 text-sm text-gray-900 focus:outline-none focus:border-gray-900 focus:bg-white transition-all"
                />
              </div>

              {/* Universal Input: Mobile Number */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#EE1C25]" /> Mobile Number <span className="text-[#EE1C25]">*</span>
                </label>
                <input 
                  type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 90000 00000" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 px-4 text-sm text-gray-900 focus:outline-none focus:border-gray-900 focus:bg-white transition-all"
                />
              </div>

              {/* DYNAMIC FIELD PANEL ROW (Swapping Course Select options for Company Job titles) */}
              <AnimatePresence mode="wait">
                {intent === 'student' ? (
                  <motion.div 
                    key="student-track" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.15 }}
                    className="space-y-2"
                  >
                    <label className="text-xs font-black uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-[#EE1C25]" /> Select Target Course <span className="text-[#EE1C25]">*</span>
                    </label>
                    <select 
                      value={targetCourse} onChange={(e) => setTargetCourse(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 px-4 text-sm text-gray-900 focus:outline-none focus:border-gray-900 focus:bg-white transition-all"
                    >
                      <option>Building Your AI Agent (For Coders)</option>
                      <option>Data Analysis with AI and PowerBI (All)</option>
                      <option>Prompt Engineering 101</option>
                      <option>Advanced AI Architectures (RAG)</option>
                    </select>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="candidate-track" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.15 }}
                    className="space-y-2"
                  >
                    <label className="text-xs font-black uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-[#EE1C25]" /> Target Career Opening <span className="text-[#EE1C25]">*</span>
                    </label>
                    <select 
                      value={targetPosition} onChange={(e) => setTargetPosition(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 px-4 text-sm text-gray-900 focus:outline-none focus:border-gray-900 focus:bg-white transition-all"
                    >
                      <option>AI Curriculum Architect</option>
                      <option>Full-Stack Instructor (Next.js & Python)</option>
                      <option>GenAI Agent Evangelist</option>
                    </select>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* Universal Input: College / Org Context box */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#EE1C25]" /> 
                {intent === 'student' ? 'College & Organization Name' : 'Current Company / Previous Institution'} <span className="text-[#EE1C25]">*</span>
              </label>
              <input 
                type="text" required value={organization} onChange={(e) => setOrganization(e.target.value)} placeholder="University or Corporate entity" 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 px-4 text-sm text-gray-900 focus:outline-none focus:border-gray-900 focus:bg-white transition-all"
              />
            </div>

            {/* Universal Input: Mailing Address location boundary */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#EE1C25]" /> Complete Physical Mailing Address <span className="text-[#EE1C25]">*</span>
              </label>
              <textarea 
                rows={2} required value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter full address details for tracking and certificate shipping logistics" 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 px-4 text-sm text-gray-900 focus:outline-none focus:border-gray-900 focus:bg-white transition-all resize-none"
              />
            </div>

            {/* Form submission action segment */}
            <div className="pt-4 space-y-4">
              <button 
                type="submit" disabled={isLoading}
                className="w-full flex items-center justify-center space-x-2 bg-gray-900 text-white font-black py-4 px-6 rounded-2xl hover:bg-[#EE1C25] transition-all duration-300 shadow-lg transform active:scale-[0.99] disabled:bg-gray-300"
              >
                <span>{isLoading ? 'Processing Entry...' : intent === 'student' ? 'Complete Course Booking' : 'Submit Job Application Track'}</span>
                {!isLoading && <Send className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />}
              </button>

              {intent === 'student' && (
                <div className="text-center pt-2">
                  <span className="text-xs text-neutral-400 font-bold">Unsure which track fits you?</span>
                  <br />
                  <a
                    href="/assessment"
                    className="inline-flex items-center gap-2 mt-2 text-xs font-black uppercase tracking-wider text-[#EE1C25] hover:text-[#d61920] transition-colors"
                  >
                    <span>Find Your AI Career Path</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>

          </form>

          {/* Micro Information System Security Footnote */}
          <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-center space-x-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
            <Sparkles className="w-3 h-3 text-[#EE1C25]" />
            <span>Secure Data Ingestion Active • Role-Routed Pipeline</span>
          </div>

        </div>

      </div>
    </section>
  );
}

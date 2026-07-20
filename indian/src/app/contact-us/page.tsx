'use client';
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, ShieldCheck } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRegion } from '@/context/RegionContext';

export const dynamic = 'force-dynamic';

export default function ContactUsPage() {
  const { currentRegion } = useRegion();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone: mobile,
          subject: "Contact Form Inquiry",
          message,
          region: currentRegion,
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Message securely routed to our support team. We will reply within 24 hours.");
        setName(''); setEmail(''); setMobile(''); setMessage('');
      } else {
        alert("Failed to submit message. Please try again.");
      }
    } catch (err) {
      alert("Failed to submit message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full bg-white text-gray-900 font-sans min-h-screen select-none">
      <Header />
      
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* ================= LEFT SIDE: CORPORATE INFO WORKSPACE ================= */}
        <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
          <div className="space-y-3">
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight uppercase">
              Contact Us
            </h1>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed font-medium">
              Have questions regarding curriculum tracks, incubation models, or enterprise partnerships? Connect to our desk.
            </p>
          </div>

          {/* Directory Parameter Cards */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-gray-50 text-[#EE1C25] rounded-xl border border-gray-100"><MapPin className="w-5 h-5" /></div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-gray-400">HQ Presence</h4>
                <p className="text-sm font-bold text-gray-800">T-hub 2.0, Knowledge City, Hyderabad, Telangana</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-gray-50 text-[#EE1C25] rounded-xl border border-gray-100"><Mail className="w-5 h-5" /></div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-gray-400">Electronic Desk</h4>
                <a href="mailto:support@theaischool.co" className="text-sm font-bold text-gray-900 hover:text-[#EE1C25] transition-colors">support@theaischool.co</a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-gray-50 text-[#EE1C25] rounded-xl border border-gray-100"><Phone className="w-5 h-5" /></div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-gray-400">Voice Ingress</h4>
                <a href="tel:+919030906584" className="text-sm font-bold text-gray-900 hover:text-[#EE1C25] transition-colors">+91 90309 06584</a>
              </div>
            </div>
          </div>

          {/* Response SLA Tag */}
          <div className="bg-red-50/60 border border-red-100 rounded-2xl p-4 flex items-center space-x-3 text-xs font-bold text-[#EE1C25]">
            <Clock className="w-4 h-4 shrink-0 animate-spin" style={{ animationDuration: '6s' }} />
            <span>SLA Guarantee: Our Support team will get back to you within 24 hours.</span>
          </div>
        </div>

        {/* ================= RIGHT SIDE: HIGH-CONTRAST MESSAGE ENGINE ================= */}
        <div className="lg:col-span-7 bg-white border border-gray-200 rounded-3xl p-8 md:p-10 shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-[#EE1C25] rounded-t-3xl" />
          
          <form onSubmit={handleSendMessage} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-gray-700">Full Name <span className="text-[#EE1C25]">*</span></label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter full name" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 px-4 text-sm text-gray-900 focus:outline-none focus:border-gray-900 focus:bg-white transition-all" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-gray-700">Email Address <span className="text-[#EE1C25]">*</span></label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@domain.com" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 px-4 text-sm text-gray-900 focus:outline-none focus:border-gray-900 focus:bg-white transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-gray-700">Mobile Number <span className="text-[#EE1C25]">*</span></label>
                <input type="tel" required value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="+91 081234 56789" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 px-4 text-sm text-gray-900 focus:outline-none focus:border-gray-900 focus:bg-white transition-all" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-gray-700">Your Message <span className="text-[#EE1C25]">*</span></label>
              <textarea rows={5} required value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message parameter queries here..." className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 px-4 text-sm text-gray-900 focus:outline-none focus:border-gray-900 focus:bg-white transition-all resize-none" />
            </div>

            <button type="submit" disabled={loading} className="w-full flex items-center justify-center space-x-2 bg-gray-900 hover:bg-[#EE1C25] disabled:bg-gray-300 text-white font-black py-4 px-6 rounded-xl transition-all duration-300 shadow-md transform active:scale-[0.99]">
              <span>{loading ? 'Routing Message...' : 'Submit Message'}</span>
              {!loading && <Send className="w-4 h-4" />}
            </button>
          </form>
        </div>

      </section>

      <Footer />
    </main>
  );
}

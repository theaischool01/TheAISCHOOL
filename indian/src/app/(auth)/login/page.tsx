'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, ShieldCheck, Terminal, Server, Globe } from 'lucide-react';

export default function EyeCatchingLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');

  const handleAuthentication = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        window.location.href = '/admin/assessment-leads';
      } else {
        setErrorMsg(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setErrorMsg('Authentication request failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="w-full min-h-screen bg-white flex flex-col md:flex-row select-none">
      
      {/* ================= LEFT SIDE: THE CINEMATIC IDENTITY PANEL ================= */}
      <section className="w-full md:w-[45%] lg:w-[40%] bg-neutral-950 text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden shrink-0 border-b md:border-b-0 md:border-r border-white/5">
        {/* Dynamic Abstract Red Nebula Mesh Layer */}
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-[#EE1C25]/15 via-transparent to-transparent blur-[100px] pointer-events-none rounded-full" />
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-gradient-to-br from-white/[0.02] to-transparent blur-[80px] pointer-events-none" />

        {/* Top Branding Ingress */}
        <div className="relative z-10 flex items-center space-x-3">
          <div className="w-2.5 h-2.5 bg-[#EE1C25] rounded-full animate-ping" />
          <span className="text-lg font-black tracking-tighter uppercase font-sans">
            THE <span className="text-[#EE1C25]">AI</span> SCHOOL
          </span>
        </div>

        {/* Central Narrative Statement */}
        <div className="relative z-10 my-auto py-12 space-y-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#EE1C25] bg-[#EE1C25]/10 px-3 py-1 rounded-md border border-[#EE1C25]/20 w-fit block">
            Security Core Verified
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white font-sans">
            Connect to the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400">
              Ecosystem Engine.
            </span>
          </h1>
          <p className="text-xs font-semibold text-neutral-400 max-w-sm leading-relaxed">
            Authorized entry point for active student cohorts, partner institutions, and administrative startup architects.
          </p>
        </div>

        {/* Bottom Infrastructure Live Telemetry Metrics */}
        <div className="relative z-10 pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2 text-neutral-400">
            <Server className="w-3.5 h-3.5 text-[#EE1C25]" />
            <div className="text-[10px] font-bold font-mono uppercase tracking-wider">
              <div>Node: T-Hub 2.0</div>
              <div className="text-[9px] text-emerald-500 font-sans normal-case">Status: Encrypted</div>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-neutral-400">
            <Globe className="w-3.5 h-3.5 text-neutral-500" />
            <div className="text-[10px] font-bold font-mono uppercase tracking-wider">
              <div>Ecosystem Auth</div>
              <div className="text-[9px] text-neutral-500 font-sans normal-case">Single-Sign Routing</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= RIGHT SIDE: THE PRISTINE WORKSPACE INPUTS ================= */}
      <section className="flex-1 bg-white flex items-center justify-center p-6 md:p-12 relative">
        {/* Subtle dynamic background spatial cross grids */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        
        <div className="w-full max-w-md space-y-8 relative z-10">
          
          {/* Header Typography Setup */}
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-black text-neutral-900 tracking-tight uppercase">
              Ecosystem Gateway
            </h2>
            <p className="text-xs font-bold text-neutral-400 leading-relaxed">
              Enter your single identifier token parameters to populate your personalized terminal workspace dashboard.
            </p>
          </div>

          {/* Core Login Form Interactivity */}
          <form onSubmit={handleAuthentication} className="space-y-5">
            
            {/* User ID / Email Input Box */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-700 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#EE1C25]" /> Identity Email / User ID
              </label>
              <div className="relative group">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-4 px-4 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all duration-300 shadow-xs"
                />
              </div>
            </div>

            {/* Security Token Input Box */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-700 flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-[#EE1C25]" /> Security PIN Token
                </label>
                <a href="#" className="text-[9px] font-black uppercase tracking-widest text-neutral-400 hover:text-[#EE1C25] transition-colors">
                  Reset Token?
                </a>
              </div>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-4 px-4 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all duration-300 font-mono shadow-xs"
              />
            </div>

             {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-500 rounded-xl text-xs font-bold text-center">
                {errorMsg}
              </div>
            )}

            {/* Authorization Action Switch */}
            <div className="pt-3">
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center space-x-2 bg-neutral-950 hover:bg-[#EE1C25] disabled:bg-neutral-300 text-white font-black py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform active:scale-[0.99]"
              >
                <span className="text-xs font-black uppercase tracking-wider">
                  {isLoading ? 'Verifying Credentials...' : 'Secure Authorization'}
                </span>
                {!isLoading && <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />}
              </button>
            </div>

          </form>

          {/* Micro Footer Automated Message Status */}
          <div className="pt-4 border-t border-neutral-100 flex items-center justify-center space-x-2 text-[9px] font-black uppercase tracking-widest text-neutral-400 font-mono">
            <Terminal className="w-3.5 h-3.5 text-[#EE1C25]" />
            <span>Automated Server-Side Role Routing Enabled</span>
          </div>

        </div>
      </section>

    </main>
  );
}

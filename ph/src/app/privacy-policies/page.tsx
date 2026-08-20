"use client";

import Header from "@ph/components/Header";
import Footer from "@ph/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans">
      <Header />

      <section className="py-16 md:py-20 bg-slate-950 text-white px-6 md:px-12 text-center border-b border-slate-800">
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-heading">
            Privacy Policy
          </h1>
          <p className="text-slate-400 text-xs md:text-sm">Last updated: 2026</p>
        </div>
      </section>

      <section className="py-16 px-6 md:px-12 max-w-4xl mx-auto space-y-6 text-sm text-slate-600 leading-relaxed font-medium">
        <p>
          At The AI School Philippines, accessible from our platforms, one of our main priorities is the privacy of our visitors and students. This Privacy Policy document contains types of information that is collected and recorded by The AI School and how we use it.
        </p>
        <h3 className="text-lg font-bold text-slate-900 uppercase pt-4 font-heading">Information We Collect</h3>
        <p>
          When you register for a cohort, submit an inquiry, or participate in workshops, we may ask for personal information including your full name, email address, phone number, organization name, and billing details.
        </p>
        <h3 className="text-lg font-bold text-slate-900 uppercase pt-4 font-heading">How We Use Your Information</h3>
        <p>
          We use the information we collect to provide, operate, and maintain our educational services, communicate with you regarding cohort updates, process transactions, and send relevant AI training materials.
        </p>
      </section>

      <Footer />
    </main>
  );
}

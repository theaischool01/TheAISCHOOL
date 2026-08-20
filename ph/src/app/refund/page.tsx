"use client";

import Header from "@ph/components/Header";
import Footer from "@ph/components/Footer";

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans">
      <Header />

      <section className="py-16 md:py-20 bg-slate-950 text-white px-6 md:px-12 text-center border-b border-slate-800">
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-heading">
            Refund Policy
          </h1>
          <p className="text-slate-400 text-xs md:text-sm">Last updated: 2026</p>
        </div>
      </section>

      <section className="py-16 px-6 md:px-12 max-w-4xl mx-auto space-y-6 text-sm text-slate-600 leading-relaxed font-medium">
        <p>
          Thank you for enrolling at The AI School Philippines. We strive to provide world-class practical AI education taught directly by tech founders.
        </p>
        <h3 className="text-lg font-bold text-slate-900 uppercase pt-4 font-heading">Cohort Cancellation &amp; Refunds</h3>
        <p>
          If you request a refund prior to the cohort orientation or within the initial eligibility period specified for your program, a refund will be processed minus administrative processing fees.
        </p>
        <h3 className="text-lg font-bold text-slate-900 uppercase pt-4 font-heading">Contact Support</h3>
        <p>
          For any refund inquiries, please email support@theaischool.co with your registration reference number and enrollment details.
        </p>
      </section>

      <Footer />
    </main>
  );
}

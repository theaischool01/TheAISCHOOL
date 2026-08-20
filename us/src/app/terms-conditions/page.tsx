"use client";

import Header from "@us/components/Header";
import Footer from "@us/components/Footer";

export default function USTermsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans">
      <Header />

      <section className="py-16 md:py-20 bg-slate-950 text-white px-6 md:px-12 text-center border-b border-slate-800">
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-heading">
            Terms &amp; Conditions
          </h1>
          <p className="text-slate-400 text-xs md:text-sm">Last updated: 2026</p>
        </div>
      </section>

      <section className="py-16 px-6 md:px-12 max-w-4xl mx-auto space-y-6 text-sm text-slate-600 leading-relaxed font-medium">
        <p>
          Welcome to The AI School USA. These terms and conditions outline the rules and regulations for the use of The AI School's Website and Educational Services.
        </p>
        <h3 className="text-lg font-bold text-slate-900 uppercase pt-4 font-heading">Intellectual Property Rights</h3>
        <p>
          Other than the content you own, under these Terms, The AI School and/or its licensors own all the intellectual property rights and materials contained in this Website and course curriculums.
        </p>
        <h3 className="text-lg font-bold text-slate-900 uppercase pt-4 font-heading">Student Code of Conduct</h3>
        <p>
          Students are expected to adhere to professional standards during live mentor sessions, hackathons, and collaborative group assignments.
        </p>
      </section>

      <Footer />
    </main>
  );
}

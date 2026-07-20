'use client';
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RefundPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 select-none">
      <Header />
      
      {/* Hero Header Section */}
      <section className="relative w-full py-16 bg-neutral-950 text-white overflow-hidden border-b border-white/5">
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-[#EE1C25]/10 via-transparent to-transparent blur-[100px] pointer-events-none rounded-full" />
        <div className="max-w-5xl mx-auto px-6 relative z-10 space-y-4">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase">
            Refund Policy
          </h1>
          <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider font-mono">
            Last Updated: June 17, 2026
          </p>
        </div>
      </section>

      {/* Main Content Body */}
      <section className="py-12 px-6 max-w-4xl mx-auto relative z-10">
        <div className="space-y-10 text-neutral-600 text-sm leading-relaxed font-medium">
          
          <div className="space-y-4">
            <p>
              Thanks for your interest in <strong>The AI SCHOOL</strong>. We ensure to provide an excellent experience and learning to all our users. As with any online purchase experience, some terms and conditions govern the Refund Policy. When you purchase a program on The AI SCHOOL, you agree to our Terms & Conditions and Refund Policy.
            </p>
            <p>
              Our Refund Policy is as follows:
            </p>
          </div>

          <div className="w-full h-px bg-neutral-200" />

          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <span className="w-6 h-6 rounded-full bg-red-50 text-[#EE1C25] flex items-center justify-center font-black text-xs shrink-0 border border-red-100/50">1</span>
              <p className="text-sm font-semibold text-neutral-800">
                You acknowledge that the Services purchased by you are non-transferable and non-refundable.
              </p>
            </div>

            <div className="flex gap-4 items-start">
              <span className="w-6 h-6 rounded-full bg-red-50 text-[#EE1C25] flex items-center justify-center font-black text-xs shrink-0 border border-red-100/50">2</span>
              <p className="text-sm font-semibold text-neutral-800">
                You acknowledge that we are under no obligation to refund any fees and applicable charges paid by you, in full or partially, under no circumstances, including for modifying and extending the duration of the Service, change in the commencement date of the Service, your failure to attend or participate in the Service, modification of the structure or content of the Service.
              </p>
            </div>

            <div className="flex gap-4 items-start">
              <span className="w-6 h-6 rounded-full bg-red-50 text-[#EE1C25] flex items-center justify-center font-black text-xs shrink-0 border border-red-100/50">3</span>
              <p className="text-sm font-semibold text-neutral-800">
                If a refund is provided, you hereby agree and acknowledge that such amount to be refunded may either be paid in cash or credit (for purchase of any other Services of The AI SCHOOL of equivalent value) at the sole discretion of The AI SCHOOL.
              </p>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}

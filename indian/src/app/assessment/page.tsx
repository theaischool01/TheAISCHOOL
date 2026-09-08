"use client";

import React from "react";
import Header from "@in/components/Header";
import Footer from "@in/components/Footer";
import AssessmentContainer from "@in/components/assessment/AssessmentContainer";

export default function IndiaAssessmentPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans selection:bg-[#E1002A]/15 selection:text-[#E1002A]">
      <Header />
      <main className="flex-1 bg-white">
        <AssessmentContainer />
      </main>
      <Footer />
    </div>
  );
}

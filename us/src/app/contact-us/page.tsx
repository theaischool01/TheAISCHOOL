import React from "react";
import type { Metadata } from "next";
import Header from "@us/components/Header";
import Footer from "@us/components/Footer";
import USContactBento from "@us/components/home/USContactBento";

export const metadata: Metadata = {
  title: "Contact Us | The AI School US",
  description:
    "Reach out to The AI School USA. We reply within 24 hours to help you start your AI engineering and leadership journey.",
  openGraph: {
    title: "Contact Us | The AI School US",
    description: "Get in touch with The AI School US team.",
    url: "https://theaischool.co/us/contact-us",
  },
};

export default function ContactUsPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col selection:bg-red-500 selection:text-white">
      {/* Navigation Header */}
      <Header />

      {/* Bento Grid Contact Us Content */}
      <USContactBento />

      {/* Footer */}
      <Footer />
    </main>
  );
}

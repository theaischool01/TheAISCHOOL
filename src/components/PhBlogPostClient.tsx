"use client";

import React, { use } from "react";
import Header from "@ph/components/Header";
import Footer from "@ph/components/Footer";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, User, Share2 } from "lucide-react";
import { BLOGS_DATA, articlesContent } from "@/config/blogsData";

export default function PhBlogPostClient({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const post = BLOGS_DATA.find((p) => p.slug === slug) || BLOGS_DATA[0];
  const articleData = articlesContent[post.slug] || {
    subtitle: post.excerpt,
    contentHtml: (
      <div className="space-y-6 text-slate-700 leading-relaxed font-sans">
        <p className="text-lg font-medium text-slate-900 leading-relaxed">
          {post.excerpt}
        </p>
        <p>
          Generative AI, machine learning systems, and autonomous code execution environments are rapidly reshaping modern software workflows. Building production-ready applications requires an understanding of model context limits, prompt structures, and agent logic.
        </p>
      </div>
    ),
  };

  return (
    <main className="w-full bg-white text-slate-900 font-sans min-h-screen">
      <Header />

      <article className="max-w-4xl mx-auto px-6 py-12 space-y-8 font-heading">
        {/* Back Link */}
        <Link
          href="/ph/blogs"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-500 hover:text-[#EE1C25] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO BLOGS</span>
        </Link>

        {/* Post Metadata Header */}
        <div className="space-y-4">
          <span className="bg-red-50 text-[#EE1C25] border border-red-100 text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-md inline-block">
            {post.category}
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
            {articleData.subtitle}
          </p>

          <div className="pt-4 border-t border-slate-100 flex items-center gap-4 text-xs font-mono text-slate-500">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{post.date}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{post.readTime}</span>
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="w-full h-72 sm:h-96 rounded-3xl overflow-hidden border border-slate-200 shadow-md">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Post Body Content */}
        <div className="prose prose-slate max-w-none py-6 border-b border-slate-100 font-sans">
          {articleData.contentHtml}
        </div>

        {/* Post Footer CTA */}
        <div className="bg-[#FAFBFD] border border-slate-200/90 rounded-3xl p-8 text-center space-y-4">
          <h3 className="text-xl font-black text-slate-900 uppercase">
            Want to Build Production AI Systems?
          </h3>
          <p className="text-slate-600 text-sm font-medium max-w-lg mx-auto">
            Join our live cohorts and intensive workshops to learn hands-on AI engineering directly from tech startup founders.
          </p>
          <div className="pt-2">
            <Link
              href="/ph/workshops"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#EE1C25] hover:bg-[#D3131B] text-white text-xs font-black uppercase tracking-wider rounded-full shadow-md transition-all hover:scale-105"
            >
              Explore Workshops
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}

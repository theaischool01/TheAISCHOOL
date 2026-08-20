"use client";

import React from "react";
import Header from "@ph/components/Header";
import Footer from "@ph/components/Footer";
import Link from "next/link";
import { Sparkles, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { BLOGS_DATA } from "@ph/config/blogsData";

export default function PhBlogsPage() {
  const featuredPost = BLOGS_DATA.find((post: any) => post.featured) || BLOGS_DATA[0];
  const regularPosts = BLOGS_DATA.filter((post: any) => post.slug !== featuredPost.slug);

  return (
    <main className="w-full bg-white text-slate-900 font-sans min-h-screen">
      <Header />

      {/* Hero Header Block */}
      <section className="w-full py-16 bg-gradient-to-b from-neutral-50/50 to-white border-b border-neutral-100 font-heading">
        <div className="max-w-7xl mx-auto px-6 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-none mb-4 uppercase">
            The Knowledge Hub
          </h1>
          <p className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl">
            Explore articles, research breakdowns, and tutorials on Generative AI, autonomous agents, and modern tech engineering.
          </p>
        </div>
      </section>

      {/* Blog Listing Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-16 space-y-12">
        {/* Featured Article Card */}
        {featuredPost && (
          <div className="relative group bg-neutral-900 text-white rounded-3xl overflow-hidden shadow-2xl border border-neutral-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 md:p-10">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="bg-[#EE1C25] text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5 font-mono">
                  <Sparkles className="w-3.5 h-3.5" />
                  Featured Story
                </span>
                <span className="text-xs font-mono text-slate-400">{featuredPost.category}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight text-white group-hover:text-red-400 transition-colors font-heading">
                <Link href={`/blogs/${featuredPost.slug}`}>
                  {featuredPost.title}
                </Link>
              </h2>

              <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium line-clamp-3">
                {featuredPost.excerpt}
              </p>

              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={featuredPost.author.avatar}
                    alt={featuredPost.author.name}
                    className="w-10 h-10 rounded-full border border-neutral-700 object-cover"
                  />
                  <div>
                    <p className="text-xs font-bold text-white">{featuredPost.author.name}</p>
                    <p className="text-[11px] text-slate-400 font-mono">{featuredPost.author.role}</p>
                  </div>
                </div>

                <Link
                  href={`/blogs/${featuredPost.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#EE1C25] hover:text-white transition-colors"
                >
                  <span>Read Post</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 h-64 lg:h-full rounded-2xl overflow-hidden border border-neutral-800 relative">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        )}

        {/* Regular Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post: any, idx: number) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="h-48 overflow-hidden relative border-b border-slate-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{post.readTime}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-snug group-hover:text-[#EE1C25] transition-colors font-heading">
                    <Link href={`/blogs/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-slate-600 text-xs leading-relaxed font-medium line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-7 h-7 rounded-full border border-slate-200 object-cover"
                  />
                  <span className="font-bold text-slate-800 text-xs">{post.author.name}</span>
                </div>

                <Link
                  href={`/blogs/${post.slug}`}
                  className="font-bold text-[#EE1C25] hover:text-slate-900 transition-colors flex items-center gap-1"
                >
                  <span>Read</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

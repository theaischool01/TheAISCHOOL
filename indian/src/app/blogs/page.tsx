'use client';
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Sparkles, Clock, ArrowRight, User } from 'lucide-react';
import { motion } from 'framer-motion';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  image: string;
  featured?: boolean;
}

export const BLOGS_DATA: BlogPost[] = [
  {
    slug: "can-ai-generate-code-faster-than-humans",
    title: "Can AI Generate Code Faster Than Humans?",
    excerpt: "An in-depth review of autonomous coding agents, prompt-driven application scaffolding, and whether engineering speeds are truly 10x-ing.",
    category: "AI Coding",
    date: "June 15, 2026",
    readTime: "8 min read",
    author: {
      name: "Ganta Srinath",
      role: "Lead Tech Architect",
      avatar: "/assets/srinath.png"
    },
    image: "/assets/blog_code_faster.png",
    featured: true
  },
  {
    slug: "getting-started-with-midjourney",
    title: "Getting Started with Midjourney",
    excerpt: "Learn how to master photorealistic image generation, parameter settings, and prompt syntax frameworks to unleash digital artwork.",
    category: "Generative Art",
    date: "June 12, 2026",
    readTime: "6 min read",
    author: {
      name: "Arun Chinnachamy",
      role: "Design Advisor",
      avatar: "/assets/arun.png"
    },
    image: "/assets/blog_midjourney.png"
  },
  {
    slug: "autonomous-ai-agents-the-future-of-saas",
    title: "Autonomous AI Agents: The Future of SaaS",
    excerpt: "How multi-agent systems and platforms like n8n, Flowise, and LangChain are reshaping traditional API service integrations.",
    category: "AI Agents",
    date: "June 10, 2026",
    readTime: "10 min read",
    author: {
      name: "Ranjan Relan",
      role: "AI Scientist",
      avatar: "/assets/ranjan.png"
    },
    image: "/assets/autonomous_agents_saas_hero.png"
  },
  {
    slug: "mastering-prompt-engineering-for-business",
    title: "Mastering Prompt Engineering for Business",
    excerpt: "Learn how to ask the right questions to solve real enterprise challenges — from prompt templates to variables and automation workflows.",
    category: "Automation",
    date: "June 08, 2026",
    readTime: "5 min read",
    author: {
      name: "Ganta Srinath",
      role: "Lead Tech Architect",
      avatar: "/assets/srinath.png"
    },
    image: "/assets/prompt_engineering_business_hero.png"
  },
{
    slug: "what-is-generative-ai-a-beginners-guide",
    title: "What is Generative AI? A Beginner's Guide",
    excerpt: "Demystifying Generative AI — explore how machines learn patterns to create text, images, code, and more, and discover how to start using it today.",
    category: "Gen AI: Start Here!",
    date: "April 19, 2025",
    readTime: "5 min read",
    author: {
      name: "Deepak Yadav",
      role: "AI Educator",
      avatar: "/assets/student_1.png"
    },
    image: "/assets/gen_ai_guide_premium_hero.png"
  },
  {
    slug: "the-evolution-of-generative-ai-from-gans-to-gpt-4",
    title: "The Evolution of Generative AI: From GANs to GPT-4",
    excerpt: "Trace the transformative journey of Generative AI, comparing the competitive dynamics of GANs with the advanced contextual power of GPT-4 and modern transformers.",
    category: "Generative AI: Then vs Now",
    date: "April 19, 2025",
    readTime: "5 min read",
    author: {
      name: "Deepak Yadav",
      role: "AI Educator",
      avatar: "/assets/student_1.png"
    },
    image: "/assets/ai_evolution_classic.png"
  },
  {
    slug: "top-5-uses-of-generative-ai-youre-already-using-every-day-without-realizing-it",
    title: "Top 5 Uses of Generative AI You're Already Using Every Day Without Realizing It",
    excerpt: "Discover the hidden ways Generative AI supports your daily routine — from smart email responders and photo tools to voice assistants and streaming recommendations.",
    category: "Generative AI Is in Your Life!",
    date: "April 19, 2025",
    readTime: "5 min read",
    author: {
      name: "Deepak Yadav",
      role: "AI Educator",
      avatar: "/assets/student_1.png"
    },
    image: "/assets/everyday_ai_tech_elegant.png"
  },
  {
    slug: "how-transformer-models-transformed-generative-ai",
    title: "How Transformer Models Transformed Generative AI",
    excerpt: "Demystify the architecture powering ChatGPT, Claude, and Midjourney — discover the magic of attention mechanism, neural layers, and multi-token processing.",
    category: "How Transformers Changed AI?",
    date: "April 19, 2025",
    readTime: "5 min read",
    author: {
      name: "Deepak Yadav",
      role: "AI Educator",
      avatar: "/assets/student_1.png"
    },
    image: "/assets/transformers_premium_hero.png"
  },
  {
    slug: "gans-vs-diffusion-models-what-drives-todays-ai-art",
    title: "GANs vs. Diffusion Models: What Drives Today's AI Art?",
    excerpt: "Compare the competitive dynamics of GANs with the step-by-step denoising of Diffusion Models, and discover what powers platforms like Midjourney and DALL-E.",
    category: "What Makes AI Art Better?",
    date: "April 19, 2025",
    readTime: "5 min read",
    author: {
      name: "Deepak Yadav",
      role: "AI Educator",
      avatar: "/assets/student_1.png"
    },
    image: "/assets/gans_vs_diffusion_premium_hero.png"
  },
  {
    slug: "behind-the-magic-the-math-behind-generative-ai",
    title: "Behind the Magic: The Math Behind Generative AI",
    excerpt: "Demystify the mathematical foundations of Gen AI — learn how probability, linear algebra, calculus, and vectors convert prompt thoughts into outputs.",
    category: "The Math Behind Gen AI",
    date: "April 19, 2025",
    readTime: "5 min read",
    author: {
      name: "Deepak Yadav",
      role: "AI Educator",
      avatar: "/assets/student_1.png"
    },
    image: "/assets/math_behind_ai_premium_hero.png"
  },
  {
    slug: "generative-ai-in-healthcare-from-drug-discovery-to-diagnosis",
    title: "Generative AI in Healthcare: From Drug Discovery to Diagnosis",
    excerpt: "Explore how Generative AI serves as an invisible partner in medicine — from mapping protein folds and discovering molecules to writing radiology reports.",
    category: "AI is Changing Healthcare!",
    date: "April 19, 2025",
    readTime: "5 min read",
    author: {
      name: "Deepak Yadav",
      role: "AI Educator",
      avatar: "/assets/student_1.png"
    },
    image: "/assets/healthcare_ai_premium_hero.png"
  },
  {
    slug: "how-generative-ai-is-revolutionizing-the-game-in-content-creation",
    title: "How Generative AI is Revolutionizing the Game in Content Creation",
    excerpt: "Discover how AI text, image, and video generators speed up production, eliminate creator's block, and serve as your ultimate co-creative assistant.",
    category: "AI Powers the Future of Content!",
    date: "April 19, 2025",
    readTime: "5 min read",
    author: {
      name: "Deepak Yadav",
      role: "AI Educator",
      avatar: "/assets/student_1.png"
    },
    image: "/assets/content_creation_premium_hero.png"
  },
  {
    slug: "getting-started-with-midjourney-how-to-make-ai-art",
    title: "Getting Started with Midjourney: How to Make AI Art",
    excerpt: "Learn how to use Midjourney's Discord commands to translate your creative descriptions into stunning, customized digital masterpieces.",
    category: "Start Making AI Art Today!",
    date: "April 19, 2025",
    readTime: "5 min read",
    author: {
      name: "Deepak Yadav",
      role: "AI Educator",
      avatar: "/assets/student_1.png"
    },
    image: "/assets/midjourney_guide_premium_hero.png"
  },
  {
    slug: "building-a-simple-text-generator-with-gpt-3-api",
    title: "Building a Simple Text Generator with GPT-3 API",
    excerpt: "Building a Simple Text Generator with GPT-3 API",
    category: "Your First GPT-3 App Starts Here!",
    date: "April 19, 2025",
    readTime: "5 min read",
    author: {
      name: "Deepak Yadav",
      role: "AI Educator",
      avatar: "/assets/student_1.png"
    },
    image: "/assets/blog_18.png"
  },
  {
    slug: "top-10-generative-ai-tools-for-creatives-in-2025",
    title: "Top 10 Generative AI Tools for Creatives in 2025",
    excerpt: "An essential list of the most impactful Generative AI platforms empowering artists, designers, copywriters, and video producers in 2025.",
    category: "Must-Have AI Tools in 2025!",
    date: "April 19, 2025",
    readTime: "5 min read",
    author: {
      name: "Deepak Yadav",
      role: "AI Educator",
      avatar: "/assets/student_1.png"
    },
    image: "/assets/creative_ai_tools_premium_hero.png"
  },
];

export default function BlogsPage() {
  const featuredPost = BLOGS_DATA.find(post => post.featured) || BLOGS_DATA[0];
  const regularPosts = BLOGS_DATA.filter(post => post.slug !== featuredPost.slug);

  return (
    <main className="w-full bg-white text-gray-900 font-sans min-h-screen">
      <Header />

      {/* Hero Header Block */}
      <section className="w-full py-16 bg-gradient-to-b from-neutral-50/50 to-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-none mb-4 font-heading">
            The Knowledge Hub
          </h1>
          <p className="text-[#6B7280] text-lg max-w-2xl font-medium leading-relaxed font-sans">
            Deep technical insights, prompt frameworks, and industry architectural guides written by active startup builders.
          </p>
        </div>
      </section>

      {/* Main Listing Grid UI Overhaul */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="space-y-12">
          
          {/* Featured Spotlight Card */}
          {featuredPost && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="group cursor-pointer rounded-[32px] overflow-hidden border-2 border-gray-900 shadow-2xl bg-white grid grid-cols-1 lg:grid-cols-12"
              onClick={() => window.location.href = `/blogs/${featuredPost.slug}`}
            >
              {/* Image Block */}
              <div className="lg:col-span-7 relative h-72 lg:h-[480px] overflow-hidden border-b-2 lg:border-b-0 lg:border-r-2 border-gray-900">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-6 left-6 bg-[#EE1C25] text-white px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase">
                  {featuredPost.category}
                </div>
              </div>

              {/* Text Info */}
              <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between bg-white relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#EE1C25]/5 rounded-full blur-2xl pointer-events-none" />
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-xs font-bold text-gray-400">
                    <span>{featuredPost.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#EE1C25]" /> {featuredPost.readTime}</span>
                  </div>
                  <h2 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight font-heading group-hover:text-[#EE1C25] transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed font-sans font-medium">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="pt-8 border-t border-gray-100 flex items-center justify-end">
                  <span className="w-10 h-10 flex items-center justify-center bg-gray-900 text-white rounded-full group-hover:bg-[#EE1C25] transition-colors duration-300">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Secondary Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, idx) => (
              <motion.div 
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group cursor-pointer bg-white border border-gray-100 rounded-[24px] overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
                onClick={() => window.location.href = `/blogs/${post.slug}`}
              >
                <div>
                  <div className="relative h-56 overflow-hidden bg-neutral-100">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs text-gray-900 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase border border-gray-200">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-3 text-xs font-bold text-gray-400">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-[#EE1C25]" /> {post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-black text-gray-900 tracking-tight leading-tight font-heading group-hover:text-[#EE1C25] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed font-sans font-medium line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="pt-4 border-t border-gray-50 flex items-center justify-end">
                    <span className="w-8 h-8 flex items-center justify-center bg-gray-50 text-gray-900 rounded-full group-hover:bg-[#EE1C25] group-hover:text-white transition-colors duration-300">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}

import React from "react";

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
      avatar: "/assets/srinath.png",
    },
    image: "/assets/blog_code_faster.png",
    featured: true,
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
      avatar: "/assets/arun.png",
    },
    image: "/assets/blog_midjourney.png",
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
      avatar: "/assets/ranjan.png",
    },
    image: "/assets/autonomous_agents_saas_hero.png",
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
      avatar: "/assets/srinath.png",
    },
    image: "/assets/prompt_engineering_business_hero.png",
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
      avatar: "/assets/student_1.png",
    },
    image: "/assets/gen_ai_guide_premium_hero.png",
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
      avatar: "/assets/student_1.png",
    },
    image: "/assets/ai_evolution_classic.png",
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
      avatar: "/assets/student_1.png",
    },
    image: "/assets/everyday_ai_tech_elegant.png",
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
      avatar: "/assets/student_1.png",
    },
    image: "/assets/transformers_premium_hero.png",
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
      avatar: "/assets/student_1.png",
    },
    image: "/assets/gans_vs_diffusion_premium_hero.png",
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
      avatar: "/assets/student_1.png",
    },
    image: "/assets/math_behind_ai_premium_hero.png",
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
      avatar: "/assets/student_1.png",
    },
    image: "/assets/healthcare_ai_premium_hero.png",
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
      avatar: "/assets/student_1.png",
    },
    image: "/assets/content_creation_premium_hero.png",
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
      avatar: "/assets/student_1.png",
    },
    image: "/assets/midjourney_guide_premium_hero.png",
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
      avatar: "/assets/student_1.png",
    },
    image: "/assets/blog_18.png",
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
      avatar: "/assets/student_1.png",
    },
    image: "/assets/creative_ai_tools_premium_hero.png",
  },
];

export const articlesContent: Record<string, { subtitle: string; contentHtml: React.ReactNode }> = {
  "can-ai-generate-code-faster-than-humans": {
    subtitle: "An inside look at GitHub Copilot — how it works, what it generates, and whether AI coding is truly better than human coding.",
    contentHtml: (
      <div className="space-y-6 text-slate-700 leading-relaxed font-sans">
        <p className="text-lg font-medium text-slate-900 leading-relaxed">
          A few years back, the notion of AI generating actual, working code could've been considered a neat science fiction idea. Jump forward to the present, and software like GitHub Copilot is assisting developers globally in writing code quicker, cleaner, and occasionally smarter.
        </p>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight font-heading uppercase">
          Introduction
        </h2>
        <p>
          But can AI code better than humans? The short answer is <em>it depends</em>. The longer answer? Well, that's where it gets interesting. Just a few years ago, AI assistance was limited to basic autocomplete in your IDE. Today, platforms generate complete application layouts, configure global state managers, and write complex database migrations from simple natural language prompts.
        </p>
        <p>
          Whether you're developing high-volume SaaS tools, building landing pages, or optimizing server logic, AI agents have become an indispensable assistant. It isn't about replacing human developers — it is about removing the mundane, repetitive tasks so engineers can focus on architecture and data pipelines.
        </p>
        <div className="p-6 bg-red-50/60 border-l-4 border-[#EE1C25] rounded-r-2xl my-4">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#EE1C25] mb-1 font-heading">Key Insight</h3>
          <p className="text-xs sm:text-sm font-semibold text-slate-800">
            AI might be the copilot, but you're still the one flying the plane. The developer's role is shifting from code creator to code reviewer and architect.
          </p>
        </div>
      </div>
    ),
  },
};

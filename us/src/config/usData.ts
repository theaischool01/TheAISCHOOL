export interface Partner {
  name: string;
  logo: string;
  category?: string;
}

export interface Mentor {
  name: string;
  role: string;
  company: string;
  image: string;
  bio: string;
}

export interface Leadership {
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin?: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  badge: string;
  duration: string;
  level: string;
  overview: string;
  takeaways: string[];
  featured?: boolean;
}

export interface NavCategory {
  title: string;
  items: { name: string; url: string; description?: string }[];
}

export const US_DATA = {
  hero: {
    badge: "🚀 The #1 AI Academy in the US",
    headline: "Step into the Top 1%",
    headlineGradient: "of the AI-Ready Workforce",
    subheadline: "Upskill. Get Hired.",
    description:
      "Master production-grade AI agents, LLM architectures, and prompt engineering through hands-on industry projects designed by active tech leaders.",
    primaryCta: { text: "Explore Courses", href: "#courses" },
    secondaryCta: { text: "Register Now", href: "#register" },
    stats: [
      { label: "Hours of Practical Training", value: "100s+" },
      { label: "Real-World Projects", value: "7+" },
      { label: "GenAI Tools Mastered", value: "10+" },
    ],
  },

  ecosystemPartners: [
    { name: "T-Hub", logo: "/us/assets/t-hub.png" },
    { name: "MATH", logo: "/us/assets/math.png" },
    { name: "Dept. of Science & Technology", logo: "/us/assets/dst.png" },
  ],

  aimItBanner: {
    tag: "SPECIAL MASTER CLASS",
    title: "AIM-IT Master Class",
    subtitle: "Accelerate your transition into AI Engineering in just 90 minutes.",
    statsCallout: "Join 15,000+ Engineers & Professionals Building Production AI",
    ctaText: "Register for Free Master Class",
    badge: "Live Interactive Session",
  },

  partnersGrid: [
    { name: "Department of Telecommunications (DoT)", logo: "/us/assets/dot.png" },
    { name: "ITU WTSA", logo: "/us/assets/itu.png" },
    { name: "Bharat Dynamics (BDL)", logo: "/us/assets/bdl.png" },
    { name: "BSNL Academy", logo: "/us/assets/bsnl.png" },
    { name: "STAR", logo: "/us/assets/star.png" },
    { name: "Jaipuria Institute", logo: "/us/assets/jaipuria.png" },
    { name: "Uber", logo: "/us/assets/uber.png" },
    { name: "SRM University", logo: "/us/assets/srm.png" },
    { name: "ICT Academy", logo: "/us/assets/ict.png" },
    { name: "TCOE India", logo: "/us/assets/tcoe.png" },
    { name: "Computer Society of India (CSI)", logo: "/us/assets/csi.png" },
    { name: "AVPL", logo: "/us/assets/avpl.png" },
    { name: "Area 51", logo: "/us/assets/area51.png" },
    { name: "Mapúa University", logo: "/us/assets/mapua.png" },
    { name: "RFgen", logo: "/us/assets/rfgen.png" },
    { name: "Hyperleap AI", logo: "/us/assets/hyperleap.png" },
    { name: "rava.ai", logo: "/us/assets/rava.png" },
    { name: "AgentAnalytics.AI", logo: "/us/assets/agentanalytics.png" },
    { name: "Saven Technologies", logo: "/us/assets/ai_alliance.png" },
  ],

  leadership: [
    {
      name: "Ganta Srinath Reddy",
      role: "Founder & CEO",
      image: "/us/assets/srinath.jpg",
      bio: "Serial tech entrepreneur and AI visionary with over 15 years building scalable software products and driving AI education globally.",
      linkedin: "https://www.linkedin.com/company/theaischool/",
    },
    {
      name: "Appi Reddy A",
      role: "Co-Founder",
      image: "/us/assets/appi_reddy.jpg",
      bio: "Operations executive and technology leader passionate about building high-impact learning frameworks and enterprise AI partnerships.",
      linkedin: "https://www.linkedin.com/company/theaischool/",
    },
  ],

  mentors: [
    {
      name: "Ranjan Relan",
      role: "AI & Tech Leader",
      company: "AI Systems",
      image: "",
      bio: "Technology leader specializing in enterprise AI solutions, cloud infrastructure, and data architecture.",
    },
    {
      name: "Arun Chinnachamy",
      role: "Engineering Director",
      company: "Tech Systems",
      image: "",
      bio: "Expert in building scalable distributed software, MLOps pipelines, and high-performance engineering teams.",
    },
    {
      name: "Gopi Krishna",
      role: "AI Architect & Lead Instructor",
      company: "The AI School",
      image: "",
      bio: "Specializes in Large Language Models, RAG systems, and enterprise AI transformations.",
    },
    {
      name: "Kiran Babu",
      role: "GenAI Engineering Lead",
      company: "AI Systems Inc.",
      image: "",
      bio: "Expert in LLM fine-tuning, prompt design patterns, and autonomous agent frameworks.",
    },
    {
      name: "Raja Mamidi",
      role: "Agentic AI Specialist",
      company: "Hyperleap",
      image: "",
      bio: "Pioneer in multi-agent orchestration, tool integration, and AI app architecture.",
    },
  ],

  courses: [
    {
      id: "ai-ready-dev",
      slug: "ai-ready-developer",
      title: "AI Ready Developer",
      badge: "Fast Track",
      duration: "20 Hours",
      level: "Intermediate",
      overview:
        "Transform your coding speed 10x by leveraging LLM primitives, modern AI IDEs (Cursor, Windsurf), automated testing, and prompt engineering.",
      takeaways: [
        "Vibe coding & AI-assisted development tools",
        "API integration with OpenAI & Claude Sonnet",
        "Context window optimization & prompt patterns",
        "Building full-stack web MVPs with AI tools",
      ],
      featured: true,
    },
    {
      id: "prompt-engineering",
      slug: "prompt-engineering",
      title: "The Art & Science of Prompt Engineering",
      badge: "Specialist",
      duration: "25 Hours",
      level: "All Levels",
      overview:
        "Master the language that talks to machines. Craft, optimize, and automate prompts that get consistent, reliable results from large language models.",
      takeaways: [
        "Chain-of-thought & few-shot prompting",
        "API interactions & prompt automation",
        "Hallucination reduction & quality control",
        "Domain-specific prompt engineering",
      ],
      featured: false,
    },
    {
      id: "build-ai-agent",
      slug: "build-your-own-ai-agent",
      title: "Build Your Own AI Agent",
      badge: "Flagship Program",
      duration: "45 Hours",
      level: "Advanced",
      overview:
        "Master the end-to-end architecture of autonomous AI agents. Build custom tool-calling, memory persistence, vector search, and multi-agent systems.",
      takeaways: [
        "LangChain & LlamaIndex agentic workflows",
        "Retrieval-Augmented Generation (RAG) pipelines",
        "Function calling & custom tool definitions",
        "Production deployment & agent evaluation",
      ],
      featured: true,
    },
    {
      id: "gen-ai-101",
      slug: "genai101",
      title: "Gen AI 101",
      badge: "Foundations",
      duration: "20 Hours",
      level: "Beginner to Pro",
      overview:
        "The essential foundational course for tech professionals, product managers, and creators looking to master Generative AI tools and prompt techniques.",
      takeaways: [
        "LLM & Transformer concepts explained visually",
        "Mastering ChatGPT, Claude, and Midjourney",
        "Workflow automation with AI integrations",
        "Ethical AI, security, & IP considerations",
      ],
      featured: false,
    },
  ],

  courseSnapshot: {
    stats: [
      { number: "100s+", label: "Hours of Practical Code & Builds" },
      { number: "7+", label: "Production-Grade Capstone Projects" },
      { number: "10+", label: "Cutting-Edge GenAI Tools & Frameworks" },
    ],
    highlights: [
      "100% Live & interactive sessions with active AI engineers",
      "Hands-on building: code real AI agents from Day 1",
      "Personalized code reviews & 1-on-1 mentorship",
      "Official certification upon capstone completion",
      "Direct access to hiring network and alumni community",
    ],
  },

  unparalleledBanner: {
    headline: "Unparalleled Curriculum",
    subheadline: "Engineered for real-world execution, not theoretical lectures.",
    description:
      "Our programs are continuously updated to reflect breaking developments in Reasoning Models, Multi-Agent Systems, and Automated Coding. Build software that matters.",
  },

  learnMegaMenu: {
    mainCourses: [
      {
        name: "AIM-IT Master Class",
        url: "#aim-it",
        description: "90-minute live masterclass on building production AI",
      },
      {
        name: "AI Ready Developer",
        url: "#courses",
        description: "20h program to boost dev speed 10x with AI tools",
      },
      {
        name: "Prompt Engineering 101",
        url: "#courses",
        description: "Master techniques for GPT-4o, Claude 3.5 & DeepSeek",
      },
      {
        name: "Build Your Own AI Agent",
        url: "#courses",
        description: "48h intensive on autonomous multi-agent architectures",
      },
      {
        name: "Gen AI 101",
        url: "#courses",
        description: "Complete foundational program for tech leaders & creators",
      },
    ],
    subTopics: [
      { name: "Vibe Coding & Cursor Workflows", url: "#courses" },
      { name: "Agentic AI Coder Architecture", url: "#courses" },
      { name: "MLOps Engineer & RAG Pipelines", url: "#courses" },
      { name: "Multi-Agent System Orchestration", url: "#courses" },
      { name: "Fine-Tuning & Model Evaluation", url: "#courses" },
    ],
  },

  footer: {
    brandName: "The AI School",
    tagline: "Empowering the next 1% of AI engineers and startup leaders across the globe.",
    contact: {
      email: "usa@theaischool.co",
      phone: "+91 9000066547",
      address: "T-hub 2.0, Knowledge City, Hyderabad, Telangana",
    },
    socials: [
      { name: "LinkedIn", url: "https://www.linkedin.com/company/theaischool/" },
      { name: "Twitter / X", url: "https://x.com/TheAI_SCHOOL" },
      { name: "YouTube", url: "https://www.youtube.com/@the-ai-school" },
      { name: "Instagram", url: "https://www.instagram.com/the_aischool/" },
    ],
    companyLinks: [
      { name: "About Us", url: "/about-us" },
      { name: "Blogs", url: "/blogs" },
      { name: "Contact Us", url: "/contact-us" },
      { name: "Courses", url: "#courses" },
    ],
    legalLinks: [
      { name: "Privacy Policy", url: "/privacy-policies" },
      { name: "Terms & Conditions", url: "/terms-conditions" },
    ],
    copyright: "© 2026 The AI School USA. All rights reserved.",
  },
};

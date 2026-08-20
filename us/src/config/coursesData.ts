export interface CourseMentor {
  id: string;
  name: string;
  role: string;
  company: string;
  titleAndCompany: string;
  linkedin: string;
  image?: string;
}

export const COURSE_MENTORS: CourseMentor[] = [
  {
    id: "mentor-srinath",
    name: "Ganta Srinath Reddy",
    role: "Founder & CEO",
    company: "The AI SCHOOL",
    titleAndCompany: "Founder & CEO - The AI SCHOOL",
    linkedin: "https://www.linkedin.com/in/srinathreddy-g/",
    image: "/us/assets/srinath.jpg",
  },
  {
    id: "mentor-gopi",
    name: "Gopi Krishna Lakkepuram",
    role: "Founder & CEO",
    company: "Hyperleap AI",
    titleAndCompany: "Founder & CEO - Hyperleap AI",
    linkedin: "https://www.linkedin.com/in/gopikr/",
    image: "/us/assets/gopi.png",
  },
  {
    id: "mentor-praneeth",
    name: "T M Praneeth Naidu",
    role: "Founder & CTO",
    company: "Cognisys AI",
    titleAndCompany: "Founder & CTO - Cognisys AI",
    linkedin: "https://www.linkedin.com/in/tmpraneethnaidu/",
    image: "/us/assets/praneeth.jpg",
  },
];

export interface CourseModule {
  id: string;
  title: string;
}

export interface DetailedModule {
  id: string;
  title: string;
  bullets: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FactChip {
  label: string;
  icon: string;
}

export interface StickyInclusion {
  text: string;
  icon: string;
}

export interface ToolItem {
  name: string;
  type: string;
}

export interface FullCourseData {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  eyebrow: string;
  heroHeadlineMain: string;
  heroHeadlineSuffix: string;
  subheading: string;
  description: string;
  chips: FactChip[];
  stickyCard: {
    heading: string;
    subtext: string;
    inclusions: StickyInclusion[];
    buttonText: string;
  };
  accordionHeading: string;
  detailedModules: DetailedModule[];
  outcomesHeading: string;
  outcomes: string[];
  whoIsThisFor: {
    heading: string;
    accentText: string;
    subtext: string;
    checklist: string[];
  };
  toolsHeading: string;
  tools: ToolItem[];
  certificate: {
    heading: string;
    accentText: string;
    subtext: string;
  };
  ctaBanner: {
    heading: string;
    buttonText: string;
  };
  faqsHeading: string;
  faqsAccentText: string;
  faqs: FAQItem[];
}

// Nav Header compact course data format
export interface CourseData {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  modules: CourseModule[];
}

export const COURSES_DATA: CourseData[] = [
  {
    id: "aim-it",
    slug: "aim-it",
    name: "AIM-IT: AI & Machine Learning for Industry Transformation",
    shortName: "AIM-IT: AI & ML for Industry",
    modules: [
      { id: "m1-1", title: "Essentials of GenAI & Prompt Engineering" },
      { id: "m1-2", title: "Python for AI – Refresher Course" },
      { id: "m1-3", title: "Vibe Coding / Vibe Coder" },
      { id: "m1-4", title: "Agentic AI Coder / Building Agents" },
      { id: "m1-5", title: "ML/DL Model Development: Techniques for Performance and Optimization" },
      { id: "m1-6", title: "MLOps Engineer: Building Scalable ML Deployment Pipelines" },
    ],
  },
  {
    id: "ai-ready-developer",
    slug: "ai-ready-developer",
    name: "AI Ready Developer",
    shortName: "AI Ready Developer",
    modules: [
      { id: "m2-1", title: "AI in the Modern Development Lifecycle" },
      { id: "m2-2", title: "AI for Requirement Gathering & System Design" },
      { id: "m2-3", title: "AI-Assisted Development & Testing" },
      { id: "m2-4", title: "AI for Databases & Data Pipelines" },
      { id: "m2-5", title: "AI-Enabled Cloud & Deployment Automation" },
    ],
  },
  {
    id: "prompt-engineering",
    slug: "prompt-engineering",
    name: "The Art & Science of Prompt Engineering",
    shortName: "The Art & Science of Prompt Engineering",
    modules: [
      { id: "m3-1", title: "Introduction to Prompt Engineering" },
      { id: "m3-2", title: "Foundations of Effective Prompting" },
      { id: "m3-3", title: "Advanced Prompting Techniques" },
      { id: "m3-4", title: "Optimizing LLM Responses" },
      { id: "m3-5", title: "API Interactions and Automation" },
      { id: "m3-6", title: "Domain-Specific Prompting Use Cases" },
    ],
  },
  {
    id: "build-your-own-agent",
    slug: "build-your-own-agent",
    name: "Build Your Own Agent",
    shortName: "Build Your Own Agent",
    modules: [
      { id: "m4-1", title: "Introduction to AI Agents and LLMs" },
      { id: "m4-2", title: "Foundations of LLM APIs" },
      { id: "m4-3", title: "Architecting an AI Agent" },
      { id: "m4-4", title: "Building a Basic Conversational Agent" },
      { id: "m4-5", title: "Advanced Agent Capabilities" },
      { id: "m4-6", title: "Agents with External Integrations" },
    ],
  },
  {
    id: "gen-ai-101",
    slug: "gen-ai-101",
    name: "Gen AI - 101",
    shortName: "Gen AI - 101",
    modules: [
      { id: "m5-1", title: "The Foundations of Generative AI" },
      { id: "m5-2", title: "Practical Applications of Generative AI" },
      { id: "m5-3", title: "Hands-On Skills with Generative AI Tools" },
      { id: "m5-4", title: "Problem-Solving Using Generative AI" },
      { id: "m5-5", title: "Ethical and Responsible AI Usage" },
      { id: "m5-6", title: "Future Trends and Career Opportunities" },
    ],
  },
];

// Rich Course Landing Page Content Data Map
export const FULL_COURSES_MAP: Record<string, FullCourseData> = {
  "aim-it": {
    id: "aim-it",
    slug: "aim-it",
    name: "AIM-IT: AI & Machine Learning for Industry Transformation",
    shortName: "AIM-IT",
    eyebrow: "AI & ML PROGRAM",
    heroHeadlineMain: "AIM-IT",
    heroHeadlineSuffix: ": AI & Machine Learning for Industry Transformation",
    subheading: "Learn. Build. Transform with Intelligence.",
    description:
      "Gain production-grade AI & ML skills through live online masterclasses led by active tech startup founders and AI architects. From Python fundamentals to building autonomous AI agents and automated MLOps pipelines, transform your career with practical hands-on experience.",
    chips: [
      { label: "Online mode", icon: "Globe" },
      { label: "Skill level: All levels", icon: "BarChart2" },
      { label: "Duration: 180 hours", icon: "Clock" },
      { label: "Certificate included", icon: "Award" },
    ],
    stickyCard: {
      heading: "Start learning today!",
      subtext:
        "Maximize your productivity and apply it in your work to get the best results.",
      inclusions: [
        { text: "180 hours of learning", icon: "Clock" },
        { text: "Certified by the best in AI learning", icon: "Award" },
        { text: "Mentors: tech startup founders", icon: "Users" },
      ],
      buttonText: "Enroll now",
    },
    accordionHeading: "AI for next-generation industry transformation",
    detailedModules: [
      {
        id: "mod-1",
        title: "Module 1 — Essentials of GenAI & Prompt Engineering",
        bullets: [
          "Reinforces Python programming skills with an emphasis on AI and ML workflows.",
          "Revisits key topics like data structures, libraries, and scripting for automation.",
          "Prepares learners for advanced applications in AI model development and deployment.",
        ],
      },
      {
        id: "mod-2",
        title: "Module 2 — Python for AI – Refresher Course",
        bullets: [
          "Covers core Python syntax, functions, and OOP concepts needed for AI development.",
          "Introduces essential libraries: NumPy, Pandas, and Matplotlib for data handling.",
          "Builds a strong coding foundation before moving into ML-specific tooling.",
        ],
      },
      {
        id: "mod-3",
        title: "Module 3 — Vibe Coding / Vibe Coder",
        bullets: [
          "Introduces AI-assisted coding workflows using modern AI pair-programming tools.",
          "Teaches how to prompt, iterate, and debug code collaboratively with AI copilots.",
          "Focuses on shipping working prototypes faster without sacrificing code quality.",
        ],
      },
      {
        id: "mod-4",
        title: "Module 4 — Agentic AI Coder / Building Agents",
        bullets: [
          "Explains the architecture of autonomous AI agents and multi-step reasoning chains.",
          "Hands-on practice building agents that can plan, execute, and self-correct tasks.",
          "Covers tool-calling, memory, and orchestration patterns used in production agents.",
        ],
      },
      {
        id: "mod-5",
        title: "Module 5 — ML/DL Model Development: Techniques for Performance and Optimization",
        bullets: [
          "Covers model selection, training, and evaluation across ML and deep learning approaches.",
          "Introduces hyperparameter tuning, regularization, and performance benchmarking.",
          "Focuses on optimizing models for accuracy, latency, and resource efficiency.",
        ],
      },
      {
        id: "mod-6",
        title: "Module 6 — MLOps Engineer: Building Scalable ML Deployment Pipelines",
        bullets: [
          "Teaches CI/CD practices adapted for machine learning model deployment.",
          "Covers containerization, model versioning, and monitoring in production.",
          "Builds skills to deploy and maintain scalable, reliable ML systems end-to-end.",
        ],
      },
    ],
    outcomesHeading: "Key outcomes",
    outcomes: [
      "Learn through live online master classes led by AI industry experts.",
      "Gain hands-on experience with real-world projects and cloud-based labs.",
      "Master AI, ML, GenAI, and MLOps to build intelligent, scalable systems.",
      "Become industry-ready with practical skills from code to cloud deployment.",
    ],
    whoIsThisFor: {
      heading: "Next-level industry transformation with AI, ML & intelligent automation",
      accentText: "AI, ML & Intelligent Automation",
      subtext:
        "Discover how to design, build, and deploy intelligent AI and ML systems that drive innovation, automation, and industry transformation.",
      checklist: [
        "Working professionals",
        "Postgraduate students",
        "Corporate employees",
        "Undergraduate learners",
        "Recent graduates",
      ],
    },
    toolsHeading: "Tools you master",
    tools: [
      { name: "NotebookLM", type: "AI Research Assistant" },
      { name: "Claude 3.5 Sonnet", type: "LLM Assistant" },
      { name: "ChatGPT 4o", type: "Prompt & Code Copilot" },
      { name: "LangChain & LlamaIndex", type: "Agentic Frameworks" },
      { name: "Midjourney & Flux", type: "Generative Media" },
    ],
    certificate: {
      heading:
        "Earn your certification from industry leaders in AI & ML, and digital transformation",
      accentText: "AI & ML, and digital transformation",
      subtext: "Looks great on your desk, your CV, and on LinkedIn.",
    },
    ctaBanner: {
      heading: "Ready to build what's next?",
      buttonText: "Enroll now",
    },
    faqsHeading: "Frequently asked questions",
    faqsAccentText: "(FAQs)",
    faqs: [
      {
        id: "faq-1",
        question: "Who can join this program?",
        answer:
          "Anyone with an interest in enhancing their skills and exploring emerging technologies can join. No specific background is required.",
      },
      {
        id: "faq-2",
        question: "Do I need prior experience or technical knowledge?",
        answer:
          "No prior AI or ML experience is required. The program starts with foundational modules and progressively builds toward advanced topics, so learners of all levels can follow along.",
      },
      {
        id: "faq-3",
        question: "What can I expect to learn?",
        answer:
          "You'll learn practical AI and machine learning skills — from prompt engineering and Python fundamentals to building autonomous agents and deploying models through MLOps pipelines — all applied through hands-on projects.",
      },
      {
        id: "faq-4",
        question: "Is the program theory-based or practical?",
        answer:
          "The program is heavily practical. While core concepts are explained clearly, most of your time is spent building real projects, working in cloud-based labs, and applying what you learn immediately.",
      },
      {
        id: "faq-5",
        question: "Will I receive a certificate after completion?",
        answer:
          "Yes. On completing the program, you'll receive a certificate of participation from The AI School, recognized by industry mentors and suitable to share on LinkedIn or your resume.",
      },
      {
        id: "faq-6",
        question: "How much time do I need to commit each week?",
        answer:
          "The program is designed for working professionals and students alike. Most learners commit 4-6 hours per week across live sessions and self-paced project work, though this can flex around your schedule.",
      },
    ],
  },
  "ai-ready-developer": {
    id: "ai-ready-developer",
    slug: "ai-ready-developer",
    name: "AI Ready Developer",
    shortName: "AI Ready Developer",
    eyebrow: "DEVELOPER PROGRAM",
    heroHeadlineMain: "AI Ready",
    heroHeadlineSuffix: " Developer",
    subheading: "From code to cloud with intelligent AI systems.",
    description:
      "A 20-hour immersive learning journey, combining hands-on coding, AI model integration, and cloud deployment.",
    chips: [
      { label: "Online mode", icon: "Globe" },
      { label: "Skill level: All levels", icon: "BarChart2" },
      { label: "Duration: 20 hours", icon: "Clock" },
      { label: "Certificate included", icon: "Award" },
    ],
    stickyCard: {
      heading: "Start learning today!",
      subtext:
        "Maximize your productivity and apply it in your work to get the best results.",
      inclusions: [
        { text: "20 hours of learning", icon: "Clock" },
        { text: "Get certified as an Industry-Ready AI Developer", icon: "Award" },
        { text: "Mentors: Tech startup founders", icon: "Users" },
      ],
      buttonText: "Enroll now",
    },
    accordionHeading:
      "Unleash the power of intelligent AI systems from code to cloud!",
    detailedModules: [
      {
        id: "mod-2-1",
        title: "Module 1 — AI in the Modern Development Lifecycle",
        bullets: [
          "AI integration in the software development lifecycle (SDLC)",
          "AI technology stack and tools",
          "AI ethics, data privacy, and security",
        ],
      },
      {
        id: "mod-2-2",
        title: "Module 2 — AI for Requirement Gathering & System Design",
        bullets: [
          "Using AI to translate business requirements into technical specifications",
          "AI-assisted system architecture and design pattern selection",
          "Rapid prototyping and design validation with AI tools",
        ],
      },
      {
        id: "mod-2-3",
        title: "Module 3 — AI-Assisted Development & Testing",
        bullets: [
          "Pair programming with AI copilots for faster, cleaner code",
          "Automated test generation and AI-assisted debugging",
          "Code review and quality assurance using AI-powered tools",
        ],
      },
      {
        id: "mod-2-4",
        title: "Module 4 — AI for Databases & Data Pipelines",
        bullets: [
          "AI-assisted schema design and query optimization",
          "Building and automating data pipelines with AI tooling",
          "Data validation, cleaning, and transformation using AI",
        ],
      },
      {
        id: "mod-2-5",
        title: "Module 5 — AI-Enabled Cloud & Deployment Automation",
        bullets: [
          "Automating cloud infrastructure provisioning with AI assistance",
          "AI-driven CI/CD pipeline optimization",
          "Monitoring, scaling, and incident response with AI-powered observability",
        ],
      },
    ],
    outcomesHeading: "Key outcomes",
    outcomes: [
      "Build intelligent AI-integrated applications",
      "Automate development and deployment with AI tools",
      "Leverage data and cloud intelligence",
      "Adopt responsible and scalable AI practices",
    ],
    whoIsThisFor: {
      heading: "Ever wondered how AI powers intelligent systems in the cloud?",
      accentText: "AI powers intelligent systems",
      subtext:
        "Discover how to build, train, and deploy AI-driven solutions that combine automation, reasoning, and creativity right from code to cloud.",
      checklist: [
        "Full stack developers",
        "Cloud architects & practitioners",
        "Backend & API developers",
        "Database engineers & administrators",
        "DevOps & deployment engineers",
      ],
    },
    toolsHeading: "Tools you master",
    tools: [
      { name: "DALL·E", type: "Generative AI" },
      { name: "NotebookLM", type: "AI Research Assistant" },
      { name: "Claude 3.5 Sonnet", type: "LLM Assistant" },
      { name: "ChatGPT 4o", type: "Prompt & Code Copilot" },
      { name: "Midjourney & Flux", type: "Image Generation" },
    ],
    certificate: {
      heading:
        "Earn your certification from leaders in Intelligent AI and Cloud Computing",
      accentText: "Intelligent AI and Cloud Computing",
      subtext: "Looks great on your desk, your CV, and on LinkedIn.",
    },
    ctaBanner: {
      heading: "Ready to build what's next?",
      buttonText: "Enroll now",
    },
    faqsHeading: "Frequently asked questions",
    faqsAccentText: "(FAQs)",
    faqs: [
      {
        id: "faq-2-1",
        question: "Who can join this program?",
        answer:
          "Anyone with an interest in enhancing their skills and exploring emerging technologies can join. No specific background is required.",
      },
      {
        id: "faq-2-2",
        question: "Do I need prior experience or technical knowledge?",
        answer:
          "Basic familiarity with programming concepts is helpful but not mandatory. The program is structured to bring developers of varying experience levels up to speed on AI-assisted workflows.",
      },
      {
        id: "faq-2-3",
        question: "What can I expect to learn?",
        answer:
          "You'll learn how to integrate AI into every stage of the development lifecycle — from requirement gathering and system design to AI-assisted coding, database automation, and cloud deployment.",
      },
      {
        id: "faq-2-4",
        question: "Is the program theory-based or practical?",
        answer:
          "The program is hands-on and project-driven. You'll work directly with AI development tools, cloud environments, and real deployment pipelines throughout the course.",
      },
      {
        id: "faq-2-5",
        question: "Will I receive a certificate after completion?",
        answer:
          "Yes. On completing the program, you'll be certified as an Industry-Ready AI Developer, recognized by industry mentors and suitable to share on LinkedIn or your resume.",
      },
      {
        id: "faq-2-6",
        question: "How much time do I need to commit each week?",
        answer:
          "The course totals 20 hours and is designed to be completed flexibly alongside work or studies, typically over 3-4 weeks at a comfortable pace.",
      },
    ],
  },
  "prompt-engineering": {
    id: "prompt-engineering",
    slug: "prompt-engineering",
    name: "The Art & Science of Prompt Engineering",
    shortName: "Prompt Engineering",
    eyebrow: "PROMPT ENGINEERING PROGRAM",
    heroHeadlineMain: "Art & Science",
    heroHeadlineSuffix: " of Prompt Engineering",
    subheading: "Master the language that talks to machines.",
    description:
      "A 25-hour hands-on program teaching you to craft, optimize, and automate prompts that get consistent, reliable results from large language models.",
    chips: [
      { label: "Online mode", icon: "Globe" },
      { label: "Skill level: All levels", icon: "BarChart2" },
      { label: "Duration: 25 hours", icon: "Clock" },
      { label: "Certificate included", icon: "Award" },
    ],
    stickyCard: {
      heading: "Start learning today!",
      subtext:
        "Maximize your productivity and apply it in your work to get the best results.",
      inclusions: [
        { text: "25 hours of learning", icon: "Clock" },
        { text: "Get certified in Advanced Prompt Engineering", icon: "Award" },
        { text: "Mentors: Tech startup founders", icon: "Users" },
      ],
      buttonText: "Enroll now",
    },
    accordionHeading:
      "Unlock the full power of language models through better prompts",
    detailedModules: [
      {
        id: "mod-3-1",
        title: "Module 1 — Introduction to Prompt Engineering",
        bullets: [
          "What prompt engineering is and why it matters for working with LLMs",
          "Understanding how large language models interpret and respond to input",
          "Common pitfalls that lead to inconsistent or unreliable outputs",
        ],
      },
      {
        id: "mod-3-2",
        title: "Module 2 — Foundations of Effective Prompting",
        bullets: [
          "Structuring clear, specific, and context-rich prompts",
          "Using role-based and instruction-based prompting techniques",
          "Iterating and refining prompts through systematic testing",
        ],
      },
      {
        id: "mod-3-3",
        title: "Module 3 — Advanced Prompting Techniques",
        bullets: [
          "Chain-of-thought and step-by-step reasoning prompts",
          "Few-shot and zero-shot prompting strategies",
          "Prompt chaining for multi-step tasks and complex workflows",
        ],
      },
      {
        id: "mod-3-4",
        title: "Module 4 — Optimizing LLM Responses",
        bullets: [
          "Controlling tone, format, and length of model outputs",
          "Reducing hallucinations and improving factual accuracy",
          "Techniques for handling ambiguous or underspecified queries",
        ],
      },
      {
        id: "mod-3-5",
        title: "Module 5 — API Interactions and Automation",
        bullets: [
          "Integrating LLM APIs into applications and scripts",
          "Automating prompt workflows for repeatable, scalable use cases",
          "Managing tokens, rate limits, and cost-efficient API usage",
        ],
      },
      {
        id: "mod-3-6",
        title: "Module 6 — Domain-Specific Prompting Use Cases",
        bullets: [
          "Applying prompt engineering to marketing, coding, research, and support",
          "Building prompt templates tailored to specific industries and tasks",
          "Evaluating and benchmarking prompt performance across use cases",
        ],
      },
    ],
    outcomesHeading: "Key outcomes",
    outcomes: [
      "Craft precise, high-performing prompts for any LLM",
      "Reduce hallucinations and improve output reliability",
      "Automate prompt workflows through APIs",
      "Apply prompt engineering across real-world business use cases",
    ],
    whoIsThisFor: {
      heading: "Ever wondered how the right words unlock better AI results?",
      accentText: "the right words unlock better AI results",
      subtext:
        "Discover how to design, test, and optimize prompts that turn generic AI outputs into precise, dependable results.",
      checklist: [
        "Content creators / marketers",
        "Product managers",
        "Software developers",
        "Customer support teams",
        "Business analysts / consultants",
      ],
    },
    toolsHeading: "Tools you master",
    tools: [
      { name: "Claude 3.5 Sonnet", type: "LLM Assistant" },
      { name: "NotebookLM", type: "AI Research Assistant" },
      { name: "ChatGPT 4o", type: "Prompt & Code Copilot" },
      { name: "DALL·E", type: "Generative AI" },
      { name: "LangChain & LlamaIndex", type: "Agent Frameworks" },
    ],
    certificate: {
      heading:
        "Earn your certification from leaders in Prompt Engineering and Applied AI",
      accentText: "Prompt Engineering and Applied AI",
      subtext: "Looks great on your desk, your CV, and on LinkedIn.",
    },
    ctaBanner: {
      heading: "Ready to build what's next?",
      buttonText: "Enroll now",
    },
    faqsHeading: "Frequently asked questions",
    faqsAccentText: "(FAQs)",
    faqs: [
      {
        id: "faq-3-1",
        question: "Who can join this program?",
        answer:
          "Anyone with an interest in enhancing their skills and exploring emerging technologies can join. No specific background is required.",
      },
      {
        id: "faq-3-2",
        question: "Do I need prior experience or technical knowledge?",
        answer:
          "No prior technical experience is required. The program starts with prompting fundamentals and progressively moves into API-based automation, so learners of all backgrounds can follow along.",
      },
      {
        id: "faq-3-3",
        question: "What can I expect to learn?",
        answer:
          "You'll learn how to craft effective prompts, apply advanced techniques like chain-of-thought and few-shot prompting, integrate LLM APIs into workflows, and tailor prompts to specific industries and use cases.",
      },
      {
        id: "faq-3-4",
        question: "Is the program theory-based or practical?",
        answer:
          "The program is highly practical. You'll spend most of your time writing, testing, and refining real prompts, with hands-on exercises using live LLM APIs throughout.",
      },
      {
        id: "faq-3-5",
        question: "Will I receive a certificate after completion?",
        answer:
          "Yes. On completing the program, you'll receive a certification in Advanced Prompt Engineering, recognized by industry mentors and suitable to share on LinkedIn or your resume.",
      },
      {
        id: "faq-3-6",
        question: "How much time do I need to commit each week?",
        answer:
          "The course totals 25 hours and is designed to fit around a busy schedule, typically completed over 4-5 weeks at a comfortable pace.",
      },
    ],
  },
  "build-your-own-agent": {
    id: "build-your-own-agent",
    slug: "build-your-own-agent",
    name: "Build Your Own Agent",
    shortName: "Build Your Own Agent",
    eyebrow: "AI AGENTS PROGRAM",
    heroHeadlineMain: "Build Your Own",
    heroHeadlineSuffix: " AI Agent",
    subheading: "Where innovation meets automation.",
    description:
      "A 45-hour hands-on program teaching you to design, build, and deploy intelligent AI agents powered by large language models.",
    chips: [
      { label: "Online mode", icon: "Globe" },
      { label: "Skill level: All levels", icon: "BarChart2" },
      { label: "Duration: 45 hours", icon: "Clock" },
      { label: "Certificate included", icon: "Award" },
    ],
    stickyCard: {
      heading: "Start learning today!",
      subtext:
        "Maximize your productivity and apply it in your work to get the best results.",
      inclusions: [
        { text: "45 hours of learning", icon: "Clock" },
        { text: "Get certified in Building Intelligent AI Agents", icon: "Award" },
        { text: "Mentors: Tech startup founders", icon: "Users" },
      ],
      buttonText: "Enroll now",
    },
    accordionHeading:
      "Unleash the power of intelligence through AI agents with LLMs!",
    detailedModules: [
      {
        id: "mod-4-1",
        title: "Module 1 — Introduction to AI Agents and LLMs",
        bullets: [
          "Overview of AI agents and their role in automation and decision-making.",
          "Understanding Large Language Models (LLMs) and their capabilities.",
          "Exploring real-world applications of AI agents powered by LLMs.",
        ],
      },
      {
        id: "mod-4-2",
        title: "Module 2 — Foundations of LLM APIs",
        bullets: [
          "Understanding how LLM APIs work: requests, responses, and tokens",
          "Authentication, rate limits, and cost management basics",
          "Sending your first API calls and handling responses programmatically",
        ],
      },
      {
        id: "mod-4-3",
        title: "Module 3 — Architecting an AI Agent",
        bullets: [
          "Core components of an agent: perception, reasoning, memory, and action",
          "Designing agent workflows and decision-making logic",
          "Choosing the right architecture for different agent use cases",
        ],
      },
      {
        id: "mod-4-[#]",
        title: "Module 4 — Building a Basic Conversational Agent",
        bullets: [
          "Setting up a simple conversational loop with an LLM backend",
          "Managing context and conversation history",
          "Handling user input and generating coherent, relevant responses",
        ],
      },
      {
        id: "mod-4-5",
        title: "Module 5 — Advanced Agent Capabilities",
        bullets: [
          "Adding memory and state management for longer-running tasks",
          "Implementing multi-step reasoning and task planning",
          "Enabling agents to self-correct and handle errors gracefully",
        ],
      },
      {
        id: "mod-4-6",
        title: "Module 6 — Agents with External Integrations",
        bullets: [
          "Connecting agents to external tools, APIs, and databases",
          "Implementing tool-calling and function execution",
          "Building agents that can take real-world actions, not just respond",
        ],
      },
    ],
    outcomesHeading: "Key outcomes",
    outcomes: [
      "Understand AI agents and LLM basics with real-world uses.",
      "Design and build intelligent agent workflows.",
      "Create a smart chatbot with context and memory.",
      "Add advanced features and connect agents to real tools.",
    ],
    whoIsThisFor: {
      heading: "Still wondering how AI agents actually think and act?",
      accentText: "AI Agents actually think and act",
      subtext:
        "Learn to build intelligent AI agents with LLMs and apply automation, reasoning, and creativity across domains.",
      checklist: [
        "Students / Non-coders",
        "Teachers / Professors",
        "AI enthusiasts / Researchers",
        "Coders / Professionals",
        "Government / Corporates",
      ],
    },
    toolsHeading: "Tools you master",
    tools: [
      { name: "ChatGPT 4o", type: "Prompt & Code Copilot" },
      { name: "DALL·E", type: "Generative AI" },
      { name: "NotebookLM", type: "AI Research Assistant" },
      { name: "Claude 3.5 Sonnet", type: "LLM Assistant" },
      { name: "LangChain & LlamaIndex", type: "Agent Frameworks" },
    ],
    certificate: {
      heading:
        "Get certified by the leaders in AI Agent Building and LLM Innovation",
      accentText: "AI Agent Building and LLM Innovation",
      subtext: "Looks great on your desk, your CV, and on LinkedIn.",
    },
    ctaBanner: {
      heading: "Ready to build what's next?",
      buttonText: "Enroll now",
    },
    faqsHeading: "Frequently asked questions",
    faqsAccentText: "(FAQs)",
    faqs: [
      {
        id: "faq-4-1",
        question: "Who can join this course?",
        answer:
          "Anyone with an interest in enhancing their skills and exploring emerging technologies can join. No specific background is required.",
      },
      {
        id: "faq-4-2",
        question: "Do I need coding skills to build an AI agent?",
        answer:
          "No prior coding experience is required. The course starts with LLM and API fundamentals and builds up gradually, so both coders and non-coders can follow along and build a working agent by the end.",
      },
      {
        id: "faq-4-3",
        question: "What will I learn in this course?",
        answer:
          "You'll learn to architect, build, and deploy AI agents — from basic conversational agents to advanced systems with memory, multi-step reasoning, and integrations with external tools and APIs.",
      },
      {
        id: "faq-4-4",
        question: "How long is the course?",
        answer:
          "The course totals 45 hours, structured across 6 modules that progress from foundational concepts to advanced, real-world agent building.",
      },
      {
        id: "faq-4-5",
        question: "Will I receive a certificate?",
        answer:
          "Yes. On completing the course, you'll receive a certification in Building Intelligent AI Agents, recognized by industry mentors and suitable to share on LinkedIn or your resume.",
      },
      {
        id: "faq-4-6",
        question: "How much time do I need to commit each week?",
        answer:
          "The course is designed to fit around a busy schedule, typically completed over 6-8 weeks with 5-7 hours per week of live sessions and project work.",
      },
    ],
  },
  "gen-ai-101": {
    id: "gen-ai-101",
    slug: "gen-ai-101",
    name: "Gen AI - 101",
    shortName: "Gen AI - 101",
    eyebrow: "GENERATIVE AI PROGRAM",
    heroHeadlineMain: "Gen AI",
    heroHeadlineSuffix: " - 101",
    subheading: "The foundations of Generative AI.",
    description:
      "Join live online sessions to explore the world of Generative AI with expert instructors. Engage in interactive discussions, hands-on activities, and real-world projects to understand how AI creates text, images, music, and more.",
    chips: [
      { label: "Online mode", icon: "Globe" },
      { label: "Skill level: Beginner", icon: "BarChart2" },
      { label: "Duration: 20 hours", icon: "Clock" },
      { label: "Certificate included", icon: "Award" },
    ],
    stickyCard: {
      heading: "Start learning today!",
      subtext:
        "Maximize your productivity and apply it in your work to get the best results.",
      inclusions: [
        { text: "20 hours of learning", icon: "Clock" },
        { text: "Get certified in the Fundamentals of GenAI", icon: "Award" },
        { text: "Mentors: Tech startup founders", icon: "Users" },
      ],
      buttonText: "Enroll now",
    },
    accordionHeading:
      "Unleash the creative power of Generative AI from text to imagination!",
    detailedModules: [
      {
        id: "mod-5-1",
        title: "Module 1 — The Foundations of Generative AI",
        bullets: [
          "The basic concepts of Artificial Intelligence and Machine Learning.",
          "The architecture and working principles of Generative AI models like GPT, BERT, and DALL·E.",
          "How generative models differ from traditional predictive AI systems.",
        ],
      },
      {
        id: "mod-5-2",
        title: "Module 2 — Practical Applications of Generative AI",
        bullets: [
          "Real-world use cases across industries: marketing, design, education, and more.",
          "How businesses are integrating Generative AI into their workflows.",
          "Identifying opportunities to apply Generative AI in your own field.",
        ],
      },
      {
        id: "mod-5-3",
        title: "Module 3 — Hands-On Skills with Generative AI Tools",
        bullets: [
          "Getting hands-on with leading text, image, and media generation tools.",
          "Crafting effective prompts to get high-quality creative outputs.",
          "Combining multiple AI tools into a single creative workflow.",
        ],
      },
      {
        id: "mod-5-4",
        title: "Module 4 — Problem-Solving Using Generative AI",
        bullets: [
          "Using Generative AI to brainstorm, prototype, and iterate on ideas.",
          "Applying AI-generated content to solve real business and creative problems.",
          "Evaluating and refining AI outputs for quality and relevance.",
        ],
      },
      {
        id: "mod-5-5",
        title: "Module 5 — Ethical and Responsible AI Usage",
        bullets: [
          "Understanding bias, misinformation, and originality concerns in generative AI.",
          "Best practices for responsible and transparent AI usage.",
          "Navigating copyright, attribution, and ethical considerations in AI-generated content.",
        ],
      },
      {
        id: "mod-5-6",
        title: "Module 6 — Future Trends and Career Opportunities",
        bullets: [
          "Emerging trends shaping the future of Generative AI.",
          "Career paths and roles opening up in the Generative AI space.",
          "How to keep building your skills as the field continues to evolve.",
        ],
      },
    ],
    outcomesHeading: "Key outcomes",
    outcomes: [
      "Understand the core concepts and architecture of Generative AI models.",
      "Learn to create text, images, and media using leading AI tools.",
      "Apply Generative AI for real-world problem solving and innovation.",
      "Explore ethical practices, future trends, and AI career opportunities.",
    ],
    whoIsThisFor: {
      heading: "Still wondering how Generative AI creates text, images, and ideas?",
      accentText: "Generative AI creates text, images, and ideas",
      subtext:
        "Learn Generative AI from scratch and build creative intelligence across domains.",
      checklist: [
        "Students / Non-coders",
        "Teachers / Professors",
        "AI enthusiasts / Researchers",
        "Coders / Professionals",
        "Government / Corporates",
      ],
    },
    toolsHeading: "Tools you master",
    tools: [
      { name: "ChatGPT 4o", type: "Prompt & Code Copilot" },
      { name: "DALL·E", type: "Generative AI" },
      { name: "NotebookLM", type: "AI Research Assistant" },
      { name: "Claude 3.5 Sonnet", type: "LLM Assistant" },
      { name: "Midjourney & Flux", type: "Generative Media" },
    ],
    certificate: {
      heading:
        "Get certified by the best in Generative AI Learning and Innovation",
      accentText: "Generative AI Learning and Innovation",
      subtext: "Looks great on your desk, your CV, and on LinkedIn.",
    },
    ctaBanner: {
      heading: "Ready to build what's next?",
      buttonText: "Enroll now",
    },
    faqsHeading: "Frequently asked questions",
    faqsAccentText: "(FAQs)",
    faqs: [
      {
        id: "faq-5-1",
        question: "Who can join this course?",
        answer:
          "Anyone! It's designed for students, teachers, coders, non-coders, professionals, and even government officers — no prior experience needed.",
      },
      {
        id: "faq-5-2",
        question: "Do I need coding skills to learn Gen AI - 101?",
        answer:
          "No coding skills are required. This course focuses on understanding and applying Generative AI tools through hands-on activities, not writing code.",
      },
      {
        id: "faq-5-3",
        question: "What will I learn in this course?",
        answer:
          "You'll learn the foundations of Generative AI, how to use leading AI tools to create text, images, and media, and how to apply Generative AI to solve real-world problems responsibly and ethically.",
      },
      {
        id: "faq-5-4",
        question: "How long is the course?",
        answer:
          "The course totals 20 hours, delivered through live online sessions across 6 modules.",
      },
      {
        id: "faq-5-5",
        question: "Will I receive a certificate?",
        answer:
          "Yes. On completing the course, you'll receive a certification in the Fundamentals of GenAI, recognized by industry mentors and suitable to share on LinkedIn or your resume.",
      },
      {
        id: "faq-5-6",
        question: "How much time do I need to commit each week?",
        answer:
          "The course is designed to fit around a busy schedule, typically completed over 3-4 weeks with a few hours per week of live sessions and hands-on practice.",
      },
    ],
  },
};

// Fallback generator for other course slugs
export function getCourseDataBySlug(slug: string): FullCourseData {
  if (FULL_COURSES_MAP[slug]) {
    return FULL_COURSES_MAP[slug];
  }

  const baseInfo = COURSES_DATA.find((c) => c.slug === slug) || COURSES_DATA[0];

  return {
    ...FULL_COURSES_MAP["aim-it"],
    id: baseInfo.id,
    slug: baseInfo.slug,
    name: baseInfo.name,
    shortName: baseInfo.shortName,
    heroHeadlineMain: baseInfo.shortName,
    heroHeadlineSuffix: `: ${baseInfo.name}`,
    accordionHeading: `${baseInfo.name} Curriculum`,
  };
}

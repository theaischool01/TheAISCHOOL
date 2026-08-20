export interface CoreMember {
  id: string;
  name: string;
  role: string;
  linkedin: string;
  image?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  company: string;
  linkedin?: string;
  image?: string;
  isPending?: boolean;
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  bio: string;
  linkedin?: string;
  image?: string;
  isPending?: boolean;
}

export interface BenefitItem {
  id: string;
  text: string;
  typicalText?: string;
}

export interface AdvantageMetric {
  category: string;
  aiSchool: number;
  typical: number;
  isHeadline?: boolean;
}

export interface MissionCommitment {
  mission: string;
  commitment: string;
}

export const ABOUT_US_DATA = {
  hero: {
    heading: "Who We are",
    headingAccent: "We are",
    body: "At The AI SCHOOL Inc, we are driven by a singular vision: to create a future where the youth are empowered, startups thrive, and innovation flourishes. Through our comprehensive approach to skill development, startup support, and academic collaboration, we are committed to making a lasting impact on the lives of individuals and the world around us.",
    statCard: {
      value: "500+",
      label: "Students Trained",
    },
    trustBadge: {
      label: "Founder-Led Mentors",
    },
  },

  coreMembers: [
    {
      id: "core-1",
      name: "Ganta Srinath Reddy",
      role: "Founder/CEO",
      linkedin: "https://www.linkedin.com/in/srinathreddy-g/",
      image: "/us/assets/srinath.jpg",
    },
    {
      id: "core-2",
      name: "Appireddy A",
      role: "Co-Founder",
      linkedin: "https://www.linkedin.com/in/appireddya/",
      image: "/us/assets/appi_reddy.jpg",
    },
    {
      id: "core-3",
      name: "K Spandana",
      role: "Co-Founder",
      linkedin: "https://www.linkedin.com/in/spandana-k-2b6a2713b/",
      image: "/us/images/about/core-members/k-spandana.jpg",
    },
    {
      id: "core-4",
      name: "ReddyReddy Manaswini",
      role: "Head of Strategic Alliances",
      linkedin: "https://www.linkedin.com/in/reddyreddy-manaswini-181581135/",
      image: "/us/images/about/core-members/manaswini-reddy.jpg",
    },
    {
      id: "core-5",
      name: "Deepak Boorla",
      role: "Program Lead",
      linkedin: "https://www.linkedin.com/in/deepak-boorla-31926b219/",
      image: "/us/images/about/core-members/deepak-boorla.jpg",
    },
  ] as CoreMember[],

  benefits: [
    { id: "b1", text: "MENTORS ARE TECH STARTUP FOUNDERS", typicalText: "Recorded lectures & TAs" },
    { id: "b2", text: "IMPROVE YOUR PERSONAL PRODUCTIVITY BY 40%", typicalText: "Generic tutorial pace" },
    { id: "b3", text: "STAY AHEAD FROM YOUR PEERS WITH REAL PROJECTS", typicalText: "Toy assignments" },
    { id: "b4", text: "THE AI SCHOOL ALUMNI STATUS", typicalText: "Basic completion certificate" },
    { id: "b5", text: "DISCUSS YOUR IDEAS WITH INNOVATORS AND GET VALIDATED", typicalText: "No direct idea validation" },
    { id: "b6", text: "1:1 MENTORS WITH FOUNDERS", typicalText: "Group Q&A only" },
    { id: "b7", text: "PARTICIPATE IN HACKATHONS TO SHOWCASE YOUR TRUE POTENTIAL", typicalText: "Not provided" },
    { id: "b8", text: "80% PRACTICAL SESSIONS", typicalText: "80% Theory lectures" },
    { id: "b9", text: "INTERNSHIP GUARANTEED", typicalText: "Not guaranteed" },
  ] as BenefitItem[],

  // Shared comparison metrics across Bar Race and Radar Chart.
  // Note: "Practical Sessions %" at 80 is an exact stated metric for The AI School.
  // All other values are illustrative estimates for visual comparison, not sourced data.
  advantageMetrics: [
    { category: "Mentor Access", aiSchool: 95, typical: 40, isHeadline: true },
    { category: "Real Projects", aiSchool: 90, typical: 35, isHeadline: false },
    { category: "Internship Support", aiSchool: 100, typical: 20, isHeadline: true },
    { category: "Practical Sessions %", aiSchool: 80, typical: 30, isHeadline: true },
    { category: "Alumni Network", aiSchool: 88, typical: 30, isHeadline: false },
    { category: "Founder Time", aiSchool: 92, typical: 25, isHeadline: false },
  ] as AdvantageMetric[],

  missionCommitment: {
    mission:
      "Our mission is to drive innovation and continuous improvement through comprehensive educational programs in association with global organizations, entrepreneurial support, and robust research commercialization services.",
    commitment:
      "Our commitment extends to fostering a collaborative ecosystem that encourages lifelong learning, cultivates creativity, and promotes sustainable growth. By aligning our efforts with the evolving needs of the digital age, we aim to be a catalyst for positive change.",
  } as MissionCommitment,

  quoteBanner: {
    quote: " USA's ONLY SCHOOL TO LEARN AI SKILLS FROM TECH STARTUP FOUNDERS & LEADERS. ",
    subline: "WHERE INTELLIGENCE MEETS INNOVATION.",
  },

  teamMembers: [
    {
      id: "t1",
      name: "Gopi Krishna",
      role: "Founder & CEO",
      company: "hyperleap.ai",
      linkedin: "https://www.linkedin.com/company/theaischool/",
      image: "/us/assets/gopi.png",
    },
    {
      id: "t2",
      name: "Kiran Babu",
      role: "Co-Founder and CEO",
      company: "rava.ai",
      linkedin: "https://www.linkedin.com/company/theaischool/",
      image: "/us/assets/kiran.png",
    },
    {
      id: "t3",
      name: "Raja Mamidi",
      role: "Co-Founder",
      company: "DotCheckout",
      linkedin: "https://www.linkedin.com/company/theaischool/",
      image: "/us/assets/raja.png",
    },
    {
      id: "t4",
      name: "Arun Chinnachamy",
      role: "Co-Founder & CTO",
      company: "Tech Startup",
      linkedin: "https://www.linkedin.com/company/theaischool/",
      image: "/us/assets/arun.png",
    },
    {
      id: "t5",
      name: "Ranjan Relan",
      role: "Founder/CEO",
      company: "AgentAnalytics.AI",
      linkedin: "https://www.linkedin.com/company/theaischool/",
      image: "/us/assets/ranjan.png",
    },
  ] as TeamMember[],

  howItWorks: {
    eyebrow: "HOW IT WORKS",
    heading: "How the mentorship works",
    cards: [
      {
        id: "step-1",
        title: "Matched with a founder",
        subtitle: "Active builder, your domain",
        icon: "UserCheck",
      },
      {
        id: "step-2",
        title: "Build real agents",
        subtitle: "Not toy exercises",
        icon: "Wrench",
      },
      {
        id: "step-3",
        title: "Take it to work",
        subtitle: "Ship what you build",
        icon: "Briefcase",
      },
    ],
    ctaText: "Explore programs",
  },

  mentors: [
    {
      id: "m1",
      name: "Sivaram A",
      role: "AI Advisory / Solution Architect",
      company: "AI Advisory / Solution Architect",
      bio: "AI Solution Architect with expertise in AI technologies like Generative AI, Computer Vision, and Machine Learning.",
      linkedin: "https://www.linkedin.com/company/theaischool/",
      image: "/us/images/mentor_sivaram.png",
    },
    {
      id: "m2",
      name: "Vikas Patel",
      role: "ML Scientist",
      company: "Machine Learning Scientist at Nykaa",
      bio: "Machine Learning Scientist at Nykaa with extensive experience in insurance, healthcare, finance, and e-commerce.",
      linkedin: "https://www.linkedin.com/company/theaischool/",
      image: "/us/images/mentor_vikas.png",
    },
    {
      id: "m3",
      name: "Sagnik Pal",
      role: "Generative AI Consultant & Trainer",
      company: "Generative AI Consultant & Trainer",
      bio: "Expert in leveraging AI and cutting-edge technologies to drive transformative business outcomes.",
      linkedin: "https://www.linkedin.com/company/theaischool/",
      image: "/us/images/mentor_sagnik.png",
    },
    {
      id: "m4",
      name: "Akhil Vydyula",
      role: "Senior Data Scientist",
      company: "Senior Data Scientist at PwC",
      bio: "Senior Data Scientist at PwC, Data & Analytics and Engineering Specialist.",
      linkedin: "https://www.linkedin.com/company/theaischool/",
      image: "/us/images/mentor_akhil.png",
    },
    {
      id: "m5",
      name: "Anshu Pandey",
      role: "Head of Technology",
      company: "Head of Technology at Blue Data",
      bio: "As the Head of Technology at Blue Data, helps enterprises accelerate their data and AI transformation strategy.",
      linkedin: "https://www.linkedin.com/company/theaischool/",
      image: "/us/images/mentor_anshu.png",
    },
    {
      id: "m6",
      name: "Harish Kumar",
      role: "Lead Data Scientist",
      company: "Lead Data Scientist",
      bio: "11 years of IT experience; conducted over 60 training sessions in Generative AI, ML/AI, and AWS.",
      linkedin: "https://www.linkedin.com/company/theaischool/",
      image: "/us/images/mentor_harish.png",
    },
    {
      id: "m7",
      name: "Mohit Bhatia",
      role: "Staff Program Manager",
      company: "Staff Program Manager",
      bio: "AI/ML and Data enthusiast, working with data, analysis, AI, and strategy & insights for 12+ years.",
      linkedin: "https://www.linkedin.com/company/theaischool/",
      image: "/us/images/mentor_mohit.png",
    },
    {
      id: "m8",
      name: "T M Praneeth Naidu",
      role: "CTO @ Cognisys AI",
      company: "CTO @ Cognisys AI",
      bio: "Project Associate in MathWorks GNSS Project | AI & Machine Learning | Data & Video Analytics | Generative AI & NLP for Business Solutions.",
      linkedin: "https://www.linkedin.com/company/theaischool/",
      image: "/us/images/mentor_praneeth.png",
    },
    {
      id: "m9",
      name: "Dr. Pradeep Kumar Boya",
      role: "Co-Founder & CEO, CognisysAI",
      company: "Co-Founder & CEO - CognisysAI Pvt. Ltd. || CTO - Incline Inventions Pvt. Ltd.",
      bio: "Co-Founder & CEO - CognisysAI Pvt. Ltd. || CTO - Incline Inventions Pvt. Ltd.",
      linkedin: "https://www.linkedin.com/company/theaischool/",
      image: "/us/images/mentor_pradeep.png",
    },
    {
      id: "m10",
      name: "Anjaneyalu T",
      role: "Manager - Artificial Intelligence and Data Science | Trainer",
      company: "Senior Data Scientist",
      bio: "Senior Data Scientist with a wealth of experience in Computer Vision (CV), Natural Language Processing (NLP), and structured data analysis.",
      linkedin: "https://www.linkedin.com/company/theaischool/",
      image: "/us/images/mentor_anjaneyalu.png",
    },
  ] as Mentor[],
};

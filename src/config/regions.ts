export interface RegionConfig {
  code: string;
  name: string;
  path: string;
  currency: string;
  locale: string;
  country: string;
  timezone: string;
  phone: string;
  email: string;
  flagUrl: string;
  whatsappNumber: string;
  businessName: string;
  copyright: string;
  address: string;
  assets: {
    hero: string;
    logo: string;
    favicon: string;
    ogImage: string;
    illustration: string;
  };
  navigation: { name: string; url: string }[];
  socialLinks: { provider: string; url: string }[];
  legalLinks: { name: string; url: string }[];
  metadata: {
    title: string;
    description: string;
    keywords: string;
  };
}

export const REGIONS: Record<string, RegionConfig> = {
  in: {
    code: "in",
    name: "India",
    path: "/",
    currency: "INR",
    locale: "en-IN",
    country: "IN",
    timezone: "Asia/Kolkata",
    phone: "+91 97059 93456",
    email: "support@theaischool.co",
    flagUrl: "https://flagcdn.com/w40/in.png",
    whatsappNumber: "919705993456",
    businessName: "Learning Paths Technologies LLP",
    copyright: "© 2026 The AI School. All rights reserved.",
    address: "T-hub 2.0, Knowledge City, Hyderabad, Telangana, 500081",
    assets: {
      hero: "/assets/image2.png",
      logo: "/assets/logo.png",
      favicon: "/favicon.ico",
      ogImage: "/assets/logo.png",
      illustration: "/assets/hero_illustration.png",
    },
    navigation: [
      { name: "Learn", url: "/learn" },
      { name: "About Us", url: "/about-us" },
      { name: "Blogs", url: "/blogs" },
      { name: "Contact Us", url: "/contact-us" },
    ],
    socialLinks: [
      { provider: "linkedin", url: "https://www.linkedin.com/company/theaischool/" },
      { provider: "instagram", url: "https://www.instagram.com/the_aischool/" },
      { provider: "youtube", url: "https://www.youtube.com/@the-ai-school" },
      { provider: "facebook", url: "https://www.facebook.com/people/Theaischool/61558962466200/" },
      { provider: "twitter", url: "https://x.com/TheAI_SCHOOL" },
    ],
    legalLinks: [
      { name: "Privacy Policy", url: "/privacy-policies" },
      { name: "Terms & Conditions", url: "/terms-conditions" },
      { name: "Refund Policy", url: "/refund" },
    ],
    metadata: {
      title: "The AI School - Learn AI Skills from Startup Leaders",
      description: "India's only school where startup leaders teach AI skills directly. Get hands-on internships, prompt engineering, and agent building courses.",
      keywords: "AI training, AI school, Artificial Intelligence courses, India AI school",
    }
  },
  us: {
    code: "us",
    name: "United States",
    path: "https://theaischool.co/us/",
    currency: "USD",
    locale: "en-US",
    country: "US",
    timezone: "America/New_York",
    phone: "+1 (800) 555-0199",
    email: "usa@theaischool.co",
    flagUrl: "https://flagcdn.com/w40/us.png",
    whatsappNumber: "18005550199",
    businessName: "The AI School Inc.",
    copyright: "© 2026 The AI School USA. All rights reserved.",
    address: "Delaware, United States",
    assets: {
      hero: "/assets/image2.png",
      logo: "/assets/logo.png",
      favicon: "/favicon.ico",
      ogImage: "/assets/logo.png",
      illustration: "/assets/hero_illustration.png",
    },
    navigation: [
      { name: "Learn", url: "/learn" },
      { name: "About Us", url: "/about-us" },
      { name: "Blogs", url: "/blogs" },
      { name: "Contact Us", url: "/contact-us" },
    ],
    socialLinks: [
      { provider: "linkedin", url: "https://www.linkedin.com/company/theaischool/" },
    ],
    legalLinks: [
      { name: "Privacy Policy", url: "/privacy-policies" },
      { name: "Terms & Conditions", url: "/terms-conditions" },
    ],
    metadata: {
      title: "The AI School USA - Learn AI Skills from Tech Leaders",
      description: "USA's premier destination to learn Artificial Intelligence, Agent architectures, and Prompt Engineering from tech startup founders.",
      keywords: "AI training USA, AI school US, build AI agents, prompt engineering courses",
    }
  },
  ph: {
    code: "ph",
    name: "Philippines",
    path: "https://theaischool.co/ph/",
    currency: "PHP",
    locale: "en-PH",
    country: "PH",
    timezone: "Asia/Manila",
    phone: "+63 2 8123 4567",
    email: "ph@theaischool.co",
    flagUrl: "https://flagcdn.com/w40/ph.png",
    whatsappNumber: "63281234567",
    businessName: "The AI School Philippines",
    copyright: "© 2026 The AI School PH. All rights reserved.",
    address: "Manila, Philippines",
    assets: {
      hero: "/assets/image2.png",
      logo: "/assets/logo.png",
      favicon: "/favicon.ico",
      ogImage: "/assets/logo.png",
      illustration: "/assets/hero_illustration.png",
    },
    navigation: [
      { name: "Learn", url: "/learn" },
      { name: "About Us", url: "/about-us" },
      { name: "Blogs", url: "/blogs" },
      { name: "Contact Us", url: "/contact-us" },
    ],
    socialLinks: [
      { provider: "linkedin", url: "https://www.linkedin.com/company/theaischool/" },
    ],
    legalLinks: [
      { name: "Privacy Policy", url: "/privacy-policies" },
      { name: "Terms & Conditions", url: "/terms-conditions" },
    ],
    metadata: {
      title: "The AI School Philippines - Master AI Engineering",
      description: "Philippines' first tech school for practical AI engineering, agent development, and prompt engineering.",
      keywords: "AI school Philippines, learn AI Manila, prompt engineering course PH",
    }
  }
};

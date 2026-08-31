export function generateStaticParams() {
  return [
    { slug: "building-your-ai-agent-for-coders" },
    { slug: "ai-agent-chatbot-creation" },
    { slug: "building-and-deploying-ai-agents" },
    { slug: "ai-cloud-engineer" },
    { slug: "cyber-security-with-ai" },
    { slug: "data-analysis-with-ai-and-powerbi" },
    { slug: "python-for-data-analytics" },
    { slug: "no-code-ai-web-development" },
    { slug: "mobile-app-development" },
    { slug: "digital-marketing-and-lead-generation" },
  ];
}

import IndiaCourseDetailPage from "@in/app/courses/[slug]/page";

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <IndiaCourseDetailPage params={params} />;
}

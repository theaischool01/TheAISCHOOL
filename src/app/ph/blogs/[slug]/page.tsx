export function generateStaticParams() {
  return [
    { slug: "prompt-engineering-guide-101" },
    { slug: "what-is-generative-ai" },
    { slug: "ai-in-healthcare" },
    { slug: "can-ai-generate-code-faster-than-humans" },
    { slug: "midjourney-v6-guide" },
    { slug: "ai-agents-the-future" },
    { slug: "evolution-of-generative-ai" },
    { slug: "everyday-ai-tools" },
    { slug: "transformers-explained" },
  ];
}

import PhBlogPostClient from "@/components/PhBlogPostClient";

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <PhBlogPostClient params={params} />;
}
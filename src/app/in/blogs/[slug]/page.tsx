export function generateStaticParams() {
  return [
    { slug: "can-ai-generate-code-faster-than-humans" },
    { slug: "what-is-generative-ai" },
    { slug: "midjourney-v6-guide" },
    { slug: "prompt-engineering-tips" },
    { slug: "ai-agents-the-future" },
    { slug: "evolution-of-generative-ai" },
    { slug: "everyday-ai-tools" },
    { slug: "transformers-explained" },
  ];
}

import IndiaBlogPostPage from "@in/app/blogs/[slug]/page";

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <IndiaBlogPostPage params={params} />;
}

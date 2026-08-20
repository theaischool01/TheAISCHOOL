import PhCategoryDetailPage, { generateStaticParams as phGenerateStaticParams } from "@ph/app/learn/[slug]/page";

export const generateStaticParams = phGenerateStaticParams;

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <PhCategoryDetailPage params={params} />;
}

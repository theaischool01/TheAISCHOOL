import PhWorkshopDetailPage, { generateStaticParams as phGenerateStaticParams } from "@ph/app/workshops/[slug]/page";

export const generateStaticParams = phGenerateStaticParams;

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <PhWorkshopDetailPage params={params} />;
}

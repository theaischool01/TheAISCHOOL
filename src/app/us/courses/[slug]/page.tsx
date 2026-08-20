import USCourseDetailPage, { generateStaticParams as usGenerateStaticParams } from "@us/app/courses/[slug]/page";

export const generateStaticParams = usGenerateStaticParams;

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <USCourseDetailPage params={params} />;
}

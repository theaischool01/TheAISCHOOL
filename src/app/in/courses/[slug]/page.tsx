import IndiaCourseDetailPage from "@in/app/courses/[slug]/page";

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <IndiaCourseDetailPage params={params} />;
}

import IndiaBlogPostPage from "@in/app/blogs/[slug]/page";

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <IndiaBlogPostPage params={params} />;
}

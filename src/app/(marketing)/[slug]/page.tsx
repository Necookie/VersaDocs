import { notFound } from "next/navigation";
import { ContentPage } from "@/features/marketing/components/content-page";
import { marketingPages } from "@/features/marketing/content/marketing-pages";

type MarketingPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(marketingPages).map((slug) => ({ slug }));
}

export default async function MarketingPage({ params }: MarketingPageProps) {
  const { slug } = await params;
  const page = marketingPages[slug];

  if (!page) {
    notFound();
  }

  return <ContentPage page={page} />;
}

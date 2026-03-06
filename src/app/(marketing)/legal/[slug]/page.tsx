import { notFound } from "next/navigation";
import { ContentPage } from "@/features/marketing/components/content-page";
import { legalPages } from "@/features/marketing/content/legal-pages";

type LegalPageProps = {
  params: Promise<{ slug: string }>;
};

const DEVELOPMENT_NOTICE =
  "VersaDocs is currently under active development and is not yet a public production service. Legal content on this page is temporary and will be replaced before launch.";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(legalPages).map((slug) => ({ slug }));
}

export default async function LegalPage({ params }: LegalPageProps) {
  const { slug } = await params;
  const page = legalPages[slug];

  if (!page) {
    notFound();
  }

  return <ContentPage page={page} notice={DEVELOPMENT_NOTICE} />;
}

import Link from "next/link";
import { ContentPage as ContentPageType } from "@/features/marketing/content/types";
import { Button } from "@/components/ui/button";

type ContentPageProps = {
  page: ContentPageType;
  notice?: string;
};

export function ContentPage({ page, notice }: ContentPageProps) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 px-4 py-24">
      <section className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-xl shadow-slate-900/5 md:p-12">
        {page.badge ? (
          <p className="mb-4 inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-800">
            {page.badge}
          </p>
        ) : null}
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
          {page.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
          {page.subtitle}
        </p>

        {notice ? (
          <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm font-medium text-blue-900">
            {notice}
          </div>
        ) : null}

        <div className="mt-8 space-y-5">
          {page.sections.map((section) => (
            <article key={section.title} className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="text-lg font-bold text-slate-900">{section.title}</h2>
              <p className="mt-2 text-slate-600">{section.body}</p>
            </article>
          ))}
        </div>

        {page.ctaLabel && page.ctaHref ? (
          <div className="mt-8">
            <Button asChild className="h-11 rounded-full px-6">
              <Link href={page.ctaHref}>{page.ctaLabel}</Link>
            </Button>
          </div>
        ) : null}
      </section>
    </main>
  );
}

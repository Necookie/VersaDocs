export type ContentSection = {
  title: string;
  body: string;
};

export type ContentPage = {
  title: string;
  subtitle: string;
  badge?: string;
  sections: ContentSection[];
  ctaLabel?: string;
  ctaHref?: string;
};

export type AppLink = {
  label: string;
  href: string;
};

export type FooterLinkGroup = {
  title: string;
  links: AppLink[];
};

export const signedInNavbarLinks: AppLink[] = [
  { label: "Templates", href: "/templates" },
  { label: "Upgrade", href: "/pricing" },
  { label: "Dashboard", href: "/dashboard" },
];

export const footerLinkGroups: FooterLinkGroup[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Templates", href: "/templates" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
      { label: "Security", href: "/legal/security" },
    ],
  },
];

import { ContentPage } from "@/features/marketing/content/types";

export const marketingPages: Record<string, ContentPage> = {
  features: {
    title: "Product Features",
    subtitle:
      "VersaDocs focuses on fast resume iteration, template quality, and clean export workflows for practical job-search execution.",
    badge: "Under active development",
    sections: [
      {
        title: "Resume Editing Workspace",
        body: "Form-first editing is designed to reduce formatting friction and keep users focused on outcomes.",
      },
      {
        title: "Template Switching",
        body: "Users can switch layouts while preserving data so experimentation does not become rework.",
      },
      {
        title: "Export Reliability",
        body: "PDF generation and preview paths are being hardened for consistent output across devices.",
      },
    ],
    ctaLabel: "Open Editor",
    ctaHref: "/editor",
  },
  templates: {
    title: "Resume Templates",
    subtitle:
      "Template catalog pages are being expanded. Current templates prioritize readability, ATS compatibility, and consistent spacing.",
    badge: "Preview mode",
    sections: [
      {
        title: "Current Focus",
        body: "Core templates are tuned for software, operations, and early-career profiles.",
      },
      {
        title: "Design Principles",
        body: "Visual hierarchy, concise sectioning, and low-noise typography are the baseline standards.",
      },
      {
        title: "Roadmap",
        body: "Additional style packs and role-specific variants will ship as the editor stabilizes.",
      },
    ],
    ctaLabel: "Start Building",
    ctaHref: "/editor",
  },
  pricing: {
    title: "Pricing",
    subtitle:
      "Public billing is not live yet. Current access and limits may change during development.",
    badge: "Development pricing placeholder",
    sections: [
      {
        title: "Current Access",
        body: "Core editing is available while feature gating and subscription infrastructure are finalized.",
      },
      {
        title: "Future Structure",
        body: "Planned tiers will separate free essentials from premium templates and advanced automation.",
      },
      {
        title: "Billing Readiness",
        body: "Checkout, invoicing, and tax handling are intentionally deferred until production launch criteria are met.",
      },
    ],
    ctaLabel: "Go to Dashboard",
    ctaHref: "/dashboard",
  },
  about: {
    title: "About VersaDocs",
    subtitle:
      "VersaDocs is being built to make resume creation faster, clearer, and more maintainable for evolving careers.",
    sections: [
      {
        title: "Mission",
        body: "Reduce resume friction so users can spend more time applying and interviewing.",
      },
      {
        title: "Build Philosophy",
        body: "Practical UX, predictable output, and incremental improvement over large unstable rewrites.",
      },
      {
        title: "Current Stage",
        body: "Internal development and iteration with features shipping behind controlled release decisions.",
      },
    ],
    ctaLabel: "View Features",
    ctaHref: "/features",
  },
  blog: {
    title: "Blog",
    subtitle:
      "Content publishing is not active yet. This route exists to provide a stable destination for navigation and future posts.",
    badge: "Content pipeline not launched",
    sections: [
      {
        title: "Planned Topics",
        body: "Resume strategy, ATS behavior, technical interviewing, and job-search process design.",
      },
      {
        title: "Editorial Status",
        body: "Authoring flow, moderation, and publish tooling are currently being implemented.",
      },
      {
        title: "Interim Usage",
        body: "Use the editor and templates directly while blog infrastructure is completed.",
      },
    ],
    ctaLabel: "Browse Templates",
    ctaHref: "/templates",
  },
  careers: {
    title: "Careers",
    subtitle:
      "VersaDocs is not publicly hiring at this stage. This page is a placeholder for future team growth.",
    badge: "No open roles currently",
    sections: [
      {
        title: "Hiring Status",
        body: "Open positions are paused while core product milestones are delivered.",
      },
      {
        title: "Future Roles",
        body: "Likely hiring domains include frontend engineering, product design, and growth operations.",
      },
      {
        title: "Contact Path",
        body: "Formal applications will be enabled once role definitions and interview loops are finalized.",
      },
    ],
    ctaLabel: "Return Home",
    ctaHref: "/",
  },
  examples: {
    title: "Resume Examples",
    subtitle:
      "Examples are being curated and QA-reviewed. This placeholder keeps the navigation destination stable during development.",
    badge: "Examples in preparation",
    sections: [
      {
        title: "Quality Standard",
        body: "Published examples must be concise, role-specific, and realistic to actual hiring expectations.",
      },
      {
        title: "Coverage Goal",
        body: "The collection will include intern, junior, and experienced tracks across multiple industries.",
      },
      {
        title: "Next Milestone",
        body: "Initial example set will launch after template previews and export QA are complete.",
      },
    ],
    ctaLabel: "Create Your Resume",
    ctaHref: "/editor",
  },
};

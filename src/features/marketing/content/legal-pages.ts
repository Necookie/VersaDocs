import { ContentPage } from "@/features/marketing/content/types";

export const legalPages: Record<string, ContentPage> = {
  privacy: {
    title: "Temporary Privacy Notice",
    subtitle:
      "This project is under development and not available for public production use. This temporary notice applies only during development.",
    badge: "Development-only policy",
    sections: [
      {
        title: "Data Handling",
        body: "Data entered in this environment may be used for debugging, QA, and product validation by authorized contributors.",
      },
      {
        title: "Retention and Deletion",
        body: "Retention windows and deletion workflows are provisional and may change before public launch.",
      },
      {
        title: "Policy Maturity",
        body: "A production-grade privacy policy will be published before any public release and legal launch announcement.",
      },
    ],
    ctaLabel: "Back to Home",
    ctaHref: "/",
  },
  terms: {
    title: "Temporary Terms of Use",
    subtitle:
      "VersaDocs is currently a development-stage system. These temporary terms exist to clarify non-public testing usage.",
    badge: "Development-only policy",
    sections: [
      {
        title: "Permitted Access",
        body: "Access is limited to approved testing and development activities until public launch is declared.",
      },
      {
        title: "Service Expectations",
        body: "Availability, behavior, and feature scope may change without notice as the product is actively iterated.",
      },
      {
        title: "Binding Terms at Launch",
        body: "Formal production terms will replace this temporary version before public use is enabled.",
      },
    ],
    ctaLabel: "Review Privacy Notice",
    ctaHref: "/legal/privacy",
  },
  security: {
    title: "Temporary Security Statement",
    subtitle:
      "Security controls are in-progress and continuously improving while the platform remains in development mode.",
    badge: "Development-only policy",
    sections: [
      {
        title: "Current Security Posture",
        body: "Baseline controls are being validated through iterative hardening and internal testing.",
      },
      {
        title: "Known Gaps",
        body: "Some production controls, audits, and certifications are intentionally deferred until pre-launch readiness.",
      },
      {
        title: "Disclosure Timeline",
        body: "A formal security overview and production guarantees will be published before public rollout.",
      },
    ],
    ctaLabel: "Review Terms",
    ctaHref: "/legal/terms",
  },
};

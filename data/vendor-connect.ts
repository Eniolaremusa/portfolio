import type { CaseStudy } from "./types";

const assetBase = "/case study/vendor-connect";

export const vendorConnect: CaseStudy = {
  slug: "vendor-connect",
  title: "Vendor Connect",
  description:
    "A B2B event operations platform helping organizers manage vendor relationships while enabling businesses to discover, apply for, and manage booth opportunities.",
  eyebrow: "VENDOR CONNECT CASE STUDY",
  headline: "Designing trust into event operations.",
  intro:
    "Vendor Connect is a B2B platform that helps event organizers manage booth sales while giving vendors a single place to discover, apply for, and manage exhibition opportunities. By replacing fragmented workflows across spreadsheets, email, payments, and manual approvals, the platform creates a trusted operational system for both sides.",
  role: "Product designer",
  team: "PM & 1 engineer",
  timeline: "3 months",
  images: {
    hero: [`${assetBase}/hero.svg`],
  },
  productContext:
    "Event organizers traditionally rely on spreadsheets, email threads, PDFs, and manual payment tracking to manage vendor applications. Vendors, meanwhile, search across multiple event websites with little visibility into application status or organizer credibility.\n\nVendor Connect brings both sides into a shared platform where event discovery, applications, payments, booth allocation, and reputation are managed through one connected workflow.",
  businessProblem:
    "Two strangers agreeing to exchange real money for a physical booth space have no history to trust. Vendors need to know an event and its organizer are legitimate before paying to participate. Organizers need to know a vendor will show up, perform professionally, and pay what they owe.\n\nAnd because Vendor Connect never touches the money itself, payments happen directly between the two parties, the platform can't rely on holding funds as leverage if something goes wrong. Every design decision here comes back to the same question: how do you build trust between two parties before they've ever worked together?",
  decisions: [
    {
      eyebrow: "DESIGN DECISION 01",
      title: "Helping vendors evaluate opportunities before committing",
      rejected:
        "Existing event listings focused primarily on discovery but provided little context for making informed decisions. Vendors often had to leave the platform to understand whether an event matched their business.",
      decided:
        "Designed detailed event pages that combined venue information, organizer profiles, booth pricing, requirements, attendance estimates, media galleries, and booth options into a single decision-making experience.",
      layoutVariant: "three-column",
      image: `${assetBase}/ds1.svg`,
      mobileImage: `${assetBase}/ds1-m.svg`,
      desktopImageScale: 0.85,
    },
    {
      eyebrow: "DESIGN DECISION 02",
      title: "Turning vendor management into one connected workflow",
      rejected:
        "Before. Organizers managed applications, payments, approvals, and booth assignments through disconnected spreadsheets and emails, making every event difficult to coordinate.",
      decided:
        "After. Designed a connected workflow covering application review, approvals, payment requests, booth assignment, invoices, and application tracking from submission through event completion.",
      layoutVariant: "three-column",
      image: `${assetBase}/ds2.svg`,
      mobileImage: `${assetBase}/ds2-m.svg`,
      desktopImageScale: 0.85,
    },
    {
      eyebrow: "DESIGN DECISION 03",
      title: "Designing trust beyond the transaction",
      rejected:
        "Before. The platform intentionally avoided becoming a payment processor, allowing organizers to continue using their preferred payment methods.",
      decided:
        "After. Since payments happened outside the platform, trust had to be built elsewhere. I designed a reputation system that combined identity verification, business documentation, platform ratings, and admin moderation to create accountability across both sides of the marketplace. This allowed organizers to keep their existing payment workflows while giving vendors greater confidence throughout the process.",
      layoutVariant: "three-column",
      image: `${assetBase}/ds3.svg`,
      mobileImage: `${assetBase}/ds3-m.svg`,
      desktopImageScale: 0.85,
    },
  ],
  constraints:
    "Unified event discovery, applications, payments, and booth management into one operational workflow. Reduced administrative overhead by replacing fragmented communication across spreadsheets and email. Established a scalable trust framework through verification, reviews, moderation, and platform ratings. Designed reusable workflows supporting vendors, organizers, and administrators within a shared system.",
  constraintsTitle: "Outcomes",
  takeaways:
    "Working on Vendor Connect reinforced that successful marketplaces are rarely about matching supply and demand alone. The real challenge was designing operational workflows that reduced friction while creating enough trust for businesses to confidently work together without the platform directly handling financial transactions.",
  takeawaysTitle: "Takeaways",
  isMobile: false,
  heroIntrinsicAspect: true,
  hasPullQuote: false,
};

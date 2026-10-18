/** Homepage “Read case study” bottom sheet — Figma 187:15790 */
export const caseStudyPreviewSheetSlugs = [
  "cbf-flo",
  "onarvo-desk",
  "applatch",
  "deploy-design-system",
] as const;

export type CaseStudyPreviewSheetSlug =
  (typeof caseStudyPreviewSheetSlugs)[number];

export function isCaseStudyPreviewSheetSlug(
  slug: string,
): slug is CaseStudyPreviewSheetSlug {
  return (caseStudyPreviewSheetSlugs as readonly string[]).includes(slug);
}

const previewOverlay = (folder: string, file: string) =>
  `/Preview overlay/${folder}/${file}`;

export interface CaseStudyPreviewSheetHighlight {
  label: string;
  body: string;
}

export interface CaseStudyPreviewSheetHeaderCta {
  label: string;
  href: string;
  external?: boolean;
}

export interface CaseStudyPreviewSheetContent {
  eyebrow: string;
  headline: string;
  summary: string;
  highlights: readonly CaseStudyPreviewSheetHighlight[];
  /** Defaults to “Read full case study” → /{slug} when omitted */
  headerCta?: CaseStudyPreviewSheetHeaderCta;
}

export const caseStudyPreviewContent: Record<
  CaseStudyPreviewSheetSlug,
  CaseStudyPreviewSheetContent
> = {
  "cbf-flo": {
    eyebrow: "CBF FLO CASE STUDY",
    headline: "Operations platform for commercial cleaning businesses.",
    summary:
      "CBF Flo brings scheduling, staffing, payroll, and customer management into one platform, replacing disconnected tools and spreadsheets.",
    highlights: [
      {
        label: "MY ROLE",
        body: "Led product design independently, from defining scope with the founder to shipping features.",
      },
      {
        label: "KEY SOLUTIONS",
        body: "Automated estimates, smarter scheduling, and configurable payment reminders.",
      },
      {
        label: "IMPACT",
        body: "66% faster estimates · 20% fewer reassignments · Payroll down to 1–2 hours.",
      },
    ],
  },
  "onarvo-desk": {
    eyebrow: "ONARVO DESK",
    headline: "Reducing first response time by 62% for care support teams.",
    summary:
      "Onarvo Front Desk is a support workspace for care teams, bringing conversations, customer context, AI summaries, and automation into one interface.",
    highlights: [
      {
        label: "MY ROLE",
        body: "Redesigned the support experience alongside product and engineering, balancing agent efficiency, privacy, and simplicity for non-technical users.",
      },
      {
        label: "KEY SOLUTIONS",
        body: "Introduced a two-column conversation workspace, related tickets, AI summaries, and configurable macros and workflows.",
      },
      {
        label: "IMPACT",
        body: "Reduced average first response time by 62%, resolution time from 3 to 2 days, and overdue tickets from 23% to 9%.",
      },
    ],
  },
  applatch: {
    eyebrow: "APPLATCH KIDS",
    headline: "Helping children build healthier digital habits through play.",
    summary:
      "Applatch is a gamified educational platform combining quizzes, rewards, screen time management, and location awareness to make screen time more meaningful.",
    highlights: [
      {
        label: "MY ROLE",
        body: "Led product design from the ground up, balancing engaging experiences for children with parents' need for oversight and control.",
      },
      {
        label: "KEY SOLUTIONS",
        body: "Combined educational quizzes, rewards, and screen time controls with age-appropriate interfaces, including pictorial questions and text-to-speech.",
      },
      {
        label: "IMPACT",
        body: "Increased signup completion by 40% and reached 3,000+ families within three months.",
      },
    ],
  },
  "deploy-design-system": {
    eyebrow: "DEPLOY DESIGN SYSTEM",
    headline: "Building a reusable foundation for consistent product experiences.",
    summary:
      "A comprehensive Figma component library developed at Deploy Studio, covering foundational styles, interface components, and complex application patterns.",
    highlights: [
      {
        label: "MY ROLE",
        body: "Created a reusable component library spanning foundational UI elements and complex product interfaces.",
      },
      {
        label: "KEY SOLUTIONS",
        body: "Designed consistent components and variants for forms, navigation, data tables, calendars, dashboards, and other interaction patterns.",
      },
      {
        label: "IMPACT",
        body: "30+ component types, including reusable layouts, interactive controls, and data-heavy UI patterns.",
      },
    ],
    headerCta: {
      label: "{Explore in Figma}",
      href: "https://www.figma.com/design/w3grv6yecuFM6MUWwJZJ2v/Deploy-DS---Portfolio?node-id=533-3025",
      external: true,
    },
  },
};

export const caseStudyPreviewSlides: Record<
  CaseStudyPreviewSheetSlug,
  readonly string[]
> = {
  "cbf-flo": [
    previewOverlay("Cbf flo", "Calendar year.png"),
    previewOverlay("Cbf flo", "empty house.png"),
    previewOverlay("Cbf flo", "Map.png"),
    previewOverlay("Cbf flo", "New automarion.png"),
    previewOverlay("Cbf flo", "Operations.png"),
  ],
  "onarvo-desk": [
    previewOverlay("Onarvo desk", "Tickets.png"),
    previewOverlay("Onarvo desk", "Create a ticket.png"),
    previewOverlay("Onarvo desk", "workflows.png"),
    previewOverlay("Onarvo desk", "general.png"),
  ],
  applatch: [
    previewOverlay("Applatch", "age 3-5.png"),
    previewOverlay("Applatch", "Gems.png"),
    previewOverlay("Applatch", "Parent.png"),
    previewOverlay("Applatch", "Profiles.png"),
    previewOverlay("Applatch", "Used Apps.png"),
  ],
  "deploy-design-system": [
    previewOverlay("Deploy Design system", "Evening 2.png"),
    previewOverlay("Deploy Design system", "Evening 3.png"),
    previewOverlay("Deploy Design system", "Frame 1618873206.png"),
    previewOverlay("Deploy Design system", "Frame 1618873207.png"),
    previewOverlay("Deploy Design system", "Frame 1618873209.png"),
  ],
};

export function getCaseStudyPreviewContent(
  slug: CaseStudyPreviewSheetSlug,
): CaseStudyPreviewSheetContent {
  return caseStudyPreviewContent[slug];
}

export function getCaseStudyPreviewHeaderCta(
  slug: CaseStudyPreviewSheetSlug,
): CaseStudyPreviewSheetHeaderCta {
  const content = caseStudyPreviewContent[slug];
  return (
    content.headerCta ?? {
      label: "{Read full case study}",
      href: `/${slug}`,
      external: false,
    }
  );
}

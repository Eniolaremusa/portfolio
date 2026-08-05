export type DecisionLayoutVariant = "three-column" | "two-column";

export interface DecisionContent {
  eyebrow: string;
  title: string;
  explored?: string;
  rejected?: string;
  decided: string;
  layoutVariant: DecisionLayoutVariant;
  image: string;
  /** Second phone mockup for mobile-product dual layout (Applatch, Propheski) */
  imageSecondary?: string;
  /** Optional mobile-specific asset; shown below 768px when set */
  mobileImage?: string;
  /** Scales image within desktop frame (768px+); e.g. 0.85 for 15% inset */
  desktopImageScale?: number;
}

export interface CaseStudy {
  slug: string;
  /** Short name used on home cards and wayfinding */
  title: string;
  /** One-line description for home cards */
  description: string;
  /** Page eyebrow, e.g. "CBF FLO CASE STUDY" */
  eyebrow?: string;
  /** Page headline (falls back to title) */
  headline?: string;
  /** Page intro paragraph below headline (falls back to description) */
  intro?: string;
  homeCardImage?: string;
  role: string;
  team: string;
  timeline: string;
  images: {
    hero: string[];
    /** Optional mobile-specific hero; shown below 768px when set */
    heroMobile?: string;
    pullQuote?: string;
    context?: string[];
  };
  productContext: string;
  businessProblem: string;
  pullQuote?: string;
  decisions: DecisionContent[];
  constraints: string;
  constraintsTitle?: string;
  takeaways: string;
  takeawaysTitle?: string;
  /** Scales decision phone assets at tablet (768–1023px); e.g. 0.85 */
  tabletDecisionImageScale?: number;
  /** Hero container wraps image intrinsic height (width fills, no fixed aspect frame) */
  heroIntrinsicAspect?: boolean;
  /** Frame inset around intrinsic hero; default true. Set false to hug the asset flush. */
  heroPadded?: boolean;
  isMobile: boolean;
  hasPullQuote: boolean;
}

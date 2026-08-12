export type DecisionLayoutVariant = "three-column" | "two-column";

/**
 * How decision product frames are arranged (desktop-style case studies).
 * - single: one full-width CBF Flo frame
 * - pair: two side-by-side frames (Applatch paired sizing, stack on mobile)
 * - single-then-pair: full-width frame, then a two-up row underneath
 */
export type DecisionImageArrangement = "single" | "pair" | "single-then-pair";

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
  /** Third frame for single-then-pair arrangements (e.g. Homeward Decision 1) */
  imageTertiary?: string;
  /**
   * Desktop-style multi-frame layout. Defaults to "single".
   * When "pair", uses image + imageSecondary.
   * When "single-then-pair", uses image (full), then imageSecondary + imageTertiary.
   */
  imageArrangement?: DecisionImageArrangement;
  /** Optional mobile-specific asset; shown below 768px when set */
  mobileImage?: string;
  /** Scales image within desktop frame (768px+); e.g. 0.85 for 15% inset */
  desktopImageScale?: number;
  /**
   * Per-decision frame overrides (desktop-style CaseStudyImageCard path).
   * Defaults: padded true, contain, center — match CBF Flo decision treatment.
   */
  imagePadded?: boolean;
  imageFit?: "contain" | "cover";
  imageObjectPosition?: "top" | "center" | "bottom";
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
  /** Optional live prototype URL — shows "View Prototype" CTAs when set */
  prototypeUrl?: string;
  isMobile: boolean;
  hasPullQuote: boolean;
}

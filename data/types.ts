export type DecisionLayoutVariant = "three-column" | "two-column";

export interface DecisionContent {
  eyebrow: string;
  title: string;
  explored?: string;
  rejected?: string;
  decided: string;
  layoutVariant: DecisionLayoutVariant;
  image: string;
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
    pullQuote?: string;
    context?: string[];
  };
  productContext: string;
  businessProblem: string;
  pullQuote?: string;
  decisions: DecisionContent[];
  constraints: string;
  takeaways: string;
  isMobile: boolean;
  hasPullQuote: boolean;
}

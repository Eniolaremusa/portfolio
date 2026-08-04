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
  title: string;
  description: string;
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

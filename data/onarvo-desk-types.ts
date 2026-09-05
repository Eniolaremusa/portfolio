export interface OnarvoDeskHero {
  eyebrow: string;
  headline: string;
  intro: string;
  role: string;
  team: string;
  timeline: string;
  industry: string;
  heroImage: string;
  heroAlt: string;
  heroWidth: number;
  heroHeight: number;
}

export type OnarvoDeskSummaryVariant = "neutral" | "solutions" | "results";

export interface OnarvoDeskQuickSummaryColumn {
  label: string;
  items: string[];
  variant: OnarvoDeskSummaryVariant;
}

export interface OnarvoDeskComparisonCard {
  text: string;
}

export interface OnarvoDeskFinding {
  lead: string;
  body: string;
}

export type OnarvoDeskDecisionOptionVariant = "option" | "decision";

export interface OnarvoDeskDecisionOption {
  label: string;
  text: string;
  variant: OnarvoDeskDecisionOptionVariant;
}

export interface OnarvoDeskDecisionImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface OnarvoDeskDecision {
  number: string;
  title: string;
  body: string;
  optionsLabel?: string;
  options?: OnarvoDeskDecisionOption[];
  tradeoffCallout?: string;
  image: OnarvoDeskDecisionImage;
  imageCaption?: string;
}

export interface OnarvoDeskImpactStat {
  value: string;
  label: string;
}

export interface OnarvoDeskReflectionItem {
  title: string;
  body: string;
}

export interface OnarvoDesk {
  slug: string;
  title: string;
  description: string;
  hero: OnarvoDeskHero;
  quickSummary: {
    title: string;
    columns: OnarvoDeskQuickSummaryColumn[];
  };
  beforeAfter: {
    title: string;
    subtitle: string;
    beforeLabel: string;
    afterLabel: string;
    before: OnarvoDeskComparisonCard[];
    after: OnarvoDeskComparisonCard[];
    screenshot: {
      src: string;
      alt: string;
      width: number;
      height: number;
      caption: string;
    };
  };
  research: {
    title: string;
    primaryResearch: string;
    secondaryResearch: string;
    findings: OnarvoDeskFinding[];
  };
  decisionsIntro: {
    title: string;
  };
  decisions: OnarvoDeskDecision[];
  impactStats: {
    title: string;
    stats: OnarvoDeskImpactStat[];
  };
  reflection: {
    title: string;
    items: OnarvoDeskReflectionItem[];
  };
}

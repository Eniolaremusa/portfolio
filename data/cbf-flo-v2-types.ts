export interface CaseStudyV2Hero {
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

export interface CaseStudyV2QuickSummaryColumn {
  label: string;
  items: string[];
}

export interface CaseStudyV2ProblemSolutionCard {
  text: string;
}

export interface CaseStudyV2Persona {
  label: string;
  image: string;
  alt: string;
  width: number;
  height: number;
  pain: string;
  consequence: string;
  need: string;
}

export interface CaseStudyV2Phase {
  title: string;
  items: string[];
}

export interface CaseStudyV2RoleBlock {
  title: string;
  description: string;
  flowImage: string;
  flowAlt: string;
  flowWidth: number;
  flowHeight: number;
  decisions: CaseStudyV2DesignDecision[];
  /** Outcome line shown after the role’s decision blocks */
  impactLine?: string;
}

export interface CaseStudyV2DesignDecisionOption {
  label: string;
  text: string;
  isDecision?: boolean;
}

export interface CaseStudyV2DesignDecisionImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface CaseStudyV2DesignDecision {
  title: string;
  body: string;
  decisionCallout?: string;
  tradeoffCallout?: string;
  optionsLabel?: string;
  options?: CaseStudyV2DesignDecisionOption[];
  images: CaseStudyV2DesignDecisionImage[];
  imageCaption?: string;
}

export interface CaseStudyV2ImpactStat {
  value: string;
  label: string;
}

export interface CaseStudyV2 {
  slug: string;
  title: string;
  hero: CaseStudyV2Hero;
  quickSummary: {
    title: string;
    columns: CaseStudyV2QuickSummaryColumn[];
  };
  businessProblem: {
    title: string;
    problems: CaseStudyV2ProblemSolutionCard[];
    solutions: CaseStudyV2ProblemSolutionCard[];
  };
  research: {
    title: string;
    primaryResearch: string;
    secondaryResearch: string;
    personas: CaseStudyV2Persona[];
  };
  productStrategy: {
    title: string;
    phase1: CaseStudyV2Phase;
    phase2: CaseStudyV2Phase;
    desktopImage: string;
    mobileImage: string;
    alt: string;
    desktopWidth: number;
    desktopHeight: number;
    mobileWidth: number;
    mobileHeight: number;
  };
  roleFlowsIntro: {
    title: string;
    description: string;
  };
  roles: CaseStudyV2RoleBlock[];
  impactStats: {
    title: string;
    stats: CaseStudyV2ImpactStat[];
  };
}

"use client";

import {
  CaseStudyTextCtaContent,
  caseStudyTextCtaClassName,
} from "@/components/CaseStudyTextCta";
import { ExpandableDecisionAsset } from "@/components/case-study/ExpandableDecisionAsset";

interface CaseStudyViewUserFlowCtaProps {
  src: string;
  className?: string;
}

/**
 * Mobile flow-diagram entry — same visual treatment as homepage "Read case study"
 * CTA; opens the shared lightbox via ExpandableDecisionAsset.
 */
export function CaseStudyViewUserFlowCta({
  src,
  className = "",
}: CaseStudyViewUserFlowCtaProps) {
  const classes = className
    ? `${caseStudyTextCtaClassName} ${className}`
    : caseStudyTextCtaClassName;

  return (
    <ExpandableDecisionAsset src={src} className={classes}>
      <CaseStudyTextCtaContent label="View user flow" />
    </ExpandableDecisionAsset>
  );
}

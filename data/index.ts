import { applatch } from "./applatch";
import { cbfFlo } from "./cbf-flo";
import { homeward } from "./homeward";
import { propheski } from "./propheski";
import type { CaseStudy } from "./types";
import { vendorConnect } from "./vendor-connect";

/** Archived case studies — routable but omitted from homepage, sitemap, and nav */
export const hiddenCaseStudySlugs = ["cbf-flo-v1"] as const;

export const caseStudies: Record<string, CaseStudy> = {
  "cbf-flo-v1": cbfFlo,
  applatch,
  propheski,
  "vendor-connect": vendorConnect,
  homeward,
};

export const caseStudySlugs = Object.keys(caseStudies);

export function isHiddenCaseStudySlug(slug: string): boolean {
  return (hiddenCaseStudySlugs as readonly string[]).includes(slug);
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies[slug];
}

/** Homepage card metadata — /cbf-flo uses v1 card copy but links to the v2 page */
export function getHomepageCaseStudy(slug: string): CaseStudy | undefined {
  if (slug === "cbf-flo") {
    return { ...cbfFlo, slug: "cbf-flo" };
  }
  return caseStudies[slug];
}

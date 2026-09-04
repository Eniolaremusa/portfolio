import { applatch } from "./applatch";
import { cbfFlo } from "./cbf-flo";
import { homeward } from "./homeward";
import { onarvoDesk } from "./onarvo-desk";
import { propheski } from "./propheski";
import type { CaseStudy } from "./types";
import { vendorConnect } from "./vendor-connect";

/** Archived case studies — omitted from homepage, sitemap, and public routes */
export const hiddenCaseStudySlugs = ["cbf-flo-v1", "vendor-connect"] as const;

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
  if (slug === "onarvo-desk") {
    return {
      slug: onarvoDesk.slug,
      title: onarvoDesk.title,
      description: onarvoDesk.description,
      role: onarvoDesk.hero.role,
      team: onarvoDesk.hero.team,
      timeline: onarvoDesk.hero.timeline,
      images: { hero: [onarvoDesk.hero.heroImage] },
      productContext: "",
      businessProblem: "",
      decisions: [],
      constraints: "",
      takeaways: "",
      isMobile: false,
      hasPullQuote: false,
    };
  }
  return caseStudies[slug];
}

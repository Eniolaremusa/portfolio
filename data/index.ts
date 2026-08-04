import { applatch } from "./applatch";
import { cbfFlo } from "./cbf-flo";
import { propheski } from "./propheski";
import type { CaseStudy } from "./types";
import { vendorConnect } from "./vendor-connect";

export const caseStudies: Record<string, CaseStudy> = {
  "cbf-flo": cbfFlo,
  applatch,
  propheski,
  "vendor-connect": vendorConnect,
};

export const caseStudySlugs = Object.keys(caseStudies);

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies[slug];
}

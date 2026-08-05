import Image from "next/image";
import Link from "next/link";
import { ExternalLinkArrow } from "@/components/ExternalLinkArrow";
import { StickySection } from "@/components/home/StickySection";
import { caseStudies } from "@/data";
import {
  homeCaseStudyCardImages,
  homeCaseStudyCardImagesMobile,
  homeCaseStudyOrder,
} from "@/data/home";
import type { CaseStudy } from "@/data/types";

const PADDED_IMAGE_SLUGS = new Set(["cbf-flo", "applatch", "vendor-connect"]);

function CaseStudyCard({ study }: { study: CaseStudy }) {
  const cardImage = homeCaseStudyCardImages[study.slug];
  const mobileCardImage = homeCaseStudyCardImagesMobile[study.slug];
  const isSvg = cardImage?.endsWith(".svg");
  const isMobileSvg = mobileCardImage?.endsWith(".svg");
  const hasImagePadding = PADDED_IMAGE_SLUGS.has(study.slug);
  const imageFitClass = hasImagePadding
    ? "object-contain object-top"
    : "object-cover object-top nav-hover:scale-[1.01] transition-transform duration-300";

  return (
    <Link
      href={`/${study.slug}`}
      className="group flex w-full max-w-none flex-col gap-card-gap min-[768px]:max-w-case-card"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-case-study-hero-bg min-[768px]:aspect-auto min-[768px]:h-case-card-image">
        <div
          className={
            hasImagePadding
              ? "absolute inset-0 case-study-frame-inset"
              : "absolute inset-0"
          }
        >
          {cardImage ? (
            <div className="relative h-full w-full">
              {mobileCardImage ? (
                <Image
                  src={mobileCardImage}
                  alt={`${study.title} product preview`}
                  fill
                  unoptimized={isMobileSvg}
                  className={`min-[768px]:hidden ${imageFitClass}`}
                  sizes="100vw"
                />
              ) : null}
              <Image
                src={cardImage}
                alt={`${study.title} product preview`}
                fill
                unoptimized={isSvg}
                className={`${mobileCardImage ? "hidden min-[768px]:block" : ""} ${imageFitClass}`}
                sizes="(max-width: 768px) 100vw, 380px"
              />
            </div>
          ) : null}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <h3 className="text-link-medium text-text-on-light">{study.title}</h3>
          <p className="text-body text-text-on-light">{study.description}</p>
        </div>
        <span className="text-body inline-flex items-center gap-1.5 text-text-on-light">
          <span className="underline decoration-from-font underline-offset-2">
            Read case study
          </span>
          <ExternalLinkArrow className="max-[495px]:hidden opacity-0 scale-90 transition-all duration-200 ease-out nav-group-hover:opacity-100 nav-group-hover:scale-100" />
        </span>
      </div>
    </Link>
  );
}

export function CaseStudiesSection() {
  const studies = homeCaseStudyOrder.map((slug) => caseStudies[slug]);

  return (
    <StickySection
      label="CASE STUDIES"
      contentClassName="grid w-full max-w-none grid-cols-1 gap-y-grid-gap-y min-[768px]:max-w-[792px] min-[768px]:grid-cols-2 min-[768px]:gap-x-grid-gap-x xl:justify-self-end"
    >
      {studies.map((study) => (
        <CaseStudyCard key={study.slug} study={study} />
      ))}
    </StickySection>
  );
}

import Image from "next/image";
import Link from "next/link";
import { CaseStudyTextCta } from "@/components/CaseStudyTextCta";
import { StickySection } from "@/components/home/StickySection";
import { getHomepageCaseStudy } from "@/data";
import {
  homeCaseStudyCardImages,
  homeCaseStudyCardImagesMobile,
  homeCaseStudyOrder,
} from "@/data/home";
import type { CaseStudy } from "@/data/types";

const PADDED_IMAGE_SLUGS = new Set([
  "cbf-flo",
  "applatch",
  "vendor-connect",
  "homeward",
]);
/** CBF Flo / Vendor Connect: flush to card bottom on tablet+ (Figma home cards) */
const FLUSH_BOTTOM_IMAGE_SLUGS = new Set(["cbf-flo", "vendor-connect"]);
/** Light frame behind assets that read better on #F7F4ED than dark */
const LIGHT_CARD_BG_SLUGS = new Set(["homeward", "applatch"]);

function CaseStudyCard({ study }: { study: CaseStudy }) {
  const cardImage = homeCaseStudyCardImages[study.slug];
  const mobileCardImage = homeCaseStudyCardImagesMobile[study.slug];
  const isSvg = cardImage?.endsWith(".svg");
  const hasImagePadding = PADDED_IMAGE_SLUGS.has(study.slug);
  const flushBottom = FLUSH_BOTTOM_IMAGE_SLUGS.has(study.slug);
  const lightCardBg = LIGHT_CARD_BG_SLUGS.has(study.slug);
  const imageFitClass = hasImagePadding
    ? "object-contain object-top"
    : "object-cover object-top";
  const href = `/${study.slug}`;

  return (
    <div className="flex w-full min-w-0 flex-col gap-card-gap">
      <Link
        href={href}
        className="group block w-full min-w-0"
        aria-label={`${study.title} case study`}
      >
        <div
          className={`card-hover-press relative aspect-square w-full overflow-hidden min-[768px]:aspect-auto min-[768px]:h-case-card-image ${
            lightCardBg ? "bg-light-image-bg" : "bg-case-study-hero-bg"
          }`}
        >
          <div
            className={
              hasImagePadding
                ? `absolute inset-0 case-study-frame-inset${flushBottom ? " home-case-card-inset--flush-bottom" : ""}`
                : "absolute inset-0"
            }
          >
            {cardImage && mobileCardImage ? (
              <picture className="relative block h-full w-full">
                <source
                  media="(max-width: 767px)"
                  srcSet={encodeURI(mobileCardImage)}
                />
                {/* Desktop (and fallback): original desktop asset only */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={encodeURI(cardImage)}
                  alt=""
                  className={`card-hover-press-media absolute inset-0 h-full w-full ${imageFitClass}`}
                />
              </picture>
            ) : cardImage ? (
              <div className="relative h-full w-full">
                <Image
                  src={cardImage}
                  alt=""
                  fill
                  unoptimized={isSvg}
                  className={`card-hover-press-media ${imageFitClass}`}
                  sizes="(max-width: 768px) 100vw, 380px"
                />
              </div>
            ) : null}
          </div>
        </div>
      </Link>

      <div className="flex flex-col gap-2">
        <Link href={href} className="home-mobile-text flex flex-col gap-1">
          <h3 className="text-link-medium text-text-on-light">{study.title}</h3>
          <p className="text-body text-text-on-light">{study.description}</p>
        </Link>
        <div className="flex flex-col gap-1.5 min-[496px]:flex-row min-[496px]:flex-wrap min-[496px]:gap-x-5 min-[496px]:gap-y-1">
          <CaseStudyTextCta href={href} label="Read case study" />
          {study.prototypeUrl ? (
            <CaseStudyTextCta
              href={study.prototypeUrl}
              label="View Prototype"
              external
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function CaseStudiesSection() {
  const studies = homeCaseStudyOrder
    .map((slug) => getHomepageCaseStudy(slug))
    .filter((study): study is CaseStudy => Boolean(study));

  return (
    <StickySection
      label="CASE STUDIES"
      contentClassName="grid w-full min-w-0 grid-cols-1 gap-y-grid-gap-y min-[768px]:grid-cols-2 min-[768px]:gap-x-grid-gap-x"
    >
      {studies.map((study) => (
        <CaseStudyCard key={study.slug} study={study} />
      ))}
    </StickySection>
  );
}

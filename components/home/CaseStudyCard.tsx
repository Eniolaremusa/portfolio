import Image from "next/image";
import Link from "next/link";
import {
  CaseStudyTextCta,
  CaseStudyTextCtaContent,
  caseStudyReadCaseStudyCtaClassName,
} from "@/components/CaseStudyTextCta";
import {
  homeCaseStudyCardImages,
  homeCaseStudyCardImagesMobile,
} from "@/data/home";
import type { CaseStudy } from "@/data/types";
import { caseStudyImageUnoptimized } from "@/lib/caseStudyImage";

const PADDED_IMAGE_SLUGS = new Set([
  "cbf-flo",
  "applatch",
  "homeward",
  "onarvo-desk",
]);
const FLUSH_BOTTOM_IMAGE_SLUGS = new Set(["cbf-flo"]);
const LIGHT_CARD_BG_SLUGS = new Set(["homeward"]);
const ONARVO_DESK_CARD_SLUG = "onarvo-desk";
const DEPLOY_DS_CARD_SLUG = "deploy-design-system";

interface CaseStudyCardProps {
  study: CaseStudy;
  usePreviewSheet: boolean;
  onReadCaseStudy: () => void;
}

function CaseStudyCardImage({
  cardImage,
  mobileCardImage,
  unoptimized,
  hasImagePadding,
  flushBottom,
  lightCardBg,
  isOnarvoDesk,
  isDeployDs,
  darkCardBg,
  imageFitClass,
}: {
  cardImage: string | undefined;
  mobileCardImage: string | undefined;
  unoptimized: boolean;
  hasImagePadding: boolean;
  flushBottom: boolean;
  lightCardBg: boolean;
  isOnarvoDesk: boolean;
  isDeployDs: boolean;
  darkCardBg: boolean;
  imageFitClass: string;
}) {
  return (
    <div
      className={`card-hover-press relative aspect-square w-full overflow-hidden min-[768px]:aspect-[380/320] min-[768px]:h-auto ${
        darkCardBg
          ? "bg-[#22201d]"
          : lightCardBg
            ? "bg-light-image-bg"
            : "bg-case-study-hero-bg"
      }`}
    >
      <div
        className={
          isOnarvoDesk
            ? "absolute inset-0 home-case-card-inset--onarvo"
            : isDeployDs
              ? "absolute inset-0 case-study-frame-inset"
              : hasImagePadding
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
              unoptimized={unoptimized}
              className={`card-hover-press-media ${imageFitClass}`}
              sizes="(max-width: 767px) 100vw, (max-width: 1279px) 45vw, 30vw"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function CaseStudyCardCopy({ study }: { study: CaseStudy }) {
  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-link-medium text-text-heading">{study.title}</h3>
      <p className="text-body text-text-on-light">{study.description}</p>
    </div>
  );
}

export function CaseStudyCard({
  study,
  usePreviewSheet,
  onReadCaseStudy,
}: CaseStudyCardProps) {
  const cardImage = homeCaseStudyCardImages[study.slug];
  const mobileCardImage = homeCaseStudyCardImagesMobile[study.slug];
  const unoptimized =
    cardImage &&
    (caseStudyImageUnoptimized(cardImage) ||
      cardImage.includes("/Preview overlay/"));
  const hasImagePadding = PADDED_IMAGE_SLUGS.has(study.slug);
  const flushBottom = FLUSH_BOTTOM_IMAGE_SLUGS.has(study.slug);
  const lightCardBg = LIGHT_CARD_BG_SLUGS.has(study.slug);
  const isOnarvoDesk = study.slug === ONARVO_DESK_CARD_SLUG;
  const isDeployDs = study.slug === DEPLOY_DS_CARD_SLUG;
  const darkCardBg = isOnarvoDesk || isDeployDs;
  const imageFitClass =
    hasImagePadding || isDeployDs
      ? "object-contain object-top"
      : "object-cover object-top";
  const href = `/${study.slug}`;

  const image = (
    <CaseStudyCardImage
      cardImage={cardImage}
      mobileCardImage={mobileCardImage}
      unoptimized={Boolean(unoptimized)}
      hasImagePadding={hasImagePadding}
      flushBottom={flushBottom}
      lightCardBg={lightCardBg}
      isOnarvoDesk={isOnarvoDesk}
      isDeployDs={isDeployDs}
      darkCardBg={darkCardBg}
      imageFitClass={imageFitClass}
    />
  );

  const prototypeCta = study.prototypeUrl ? (
    <CaseStudyTextCta
      href={study.prototypeUrl}
      label="View Prototype"
      external
    />
  ) : null;

  if (usePreviewSheet) {
    return (
      <div className="flex w-full min-w-0 flex-col gap-card-gap">
        <button
          type="button"
          onClick={onReadCaseStudy}
          aria-label={`Open ${study.title} case study preview`}
          className="group flex w-full min-w-0 cursor-pointer flex-col gap-card-gap border-0 bg-transparent p-0 text-left"
        >
          {image}
          <div className="flex flex-col gap-2">
            <CaseStudyCardCopy study={study} />
            <div className="flex flex-col gap-1.5 min-[496px]:flex-row min-[496px]:flex-wrap min-[496px]:gap-x-5 min-[496px]:gap-y-1">
              <span className={caseStudyReadCaseStudyCtaClassName}>
                <CaseStudyTextCtaContent label="Read case study" />
              </span>
            </div>
          </div>
        </button>
        {prototypeCta ? (
          <div className="flex flex-col gap-1.5 min-[496px]:flex-row min-[496px]:flex-wrap min-[496px]:gap-x-5 min-[496px]:gap-y-1">
            {prototypeCta}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="flex w-full min-w-0 flex-col gap-card-gap">
      <Link
        href={href}
        className="group block w-full min-w-0"
        aria-label={`${study.title} case study`}
      >
        {image}
      </Link>

      <div className="flex flex-col gap-2">
        <Link href={href} className="flex flex-col gap-1">
          <CaseStudyCardCopy study={study} />
        </Link>
        <div className="flex flex-col gap-1.5 min-[496px]:flex-row min-[496px]:flex-wrap min-[496px]:gap-x-5 min-[496px]:gap-y-1">
          <CaseStudyTextCta href={href} label="Read case study" tone="read" />
          {prototypeCta}
        </div>
      </div>
    </div>
  );
}

"use client";

import { CaseStudyPageContainer } from "@/components/case-study/CaseStudyPageContainer";
import { CaseStudyV2Asset } from "@/components/case-study/v2/CaseStudyV2Asset";
import { useHasMounted, useIsMobileViewport } from "@/hooks/useMediaQuery";

interface CaseStudyProductStrategySectionProps {
  title: string;
  desktopImage: string;
  mobileImage: string;
  desktopWidth: number;
  desktopHeight: number;
  mobileWidth: number;
  mobileHeight: number;
}

export function CaseStudyProductStrategySection({
  title,
  desktopImage,
  mobileImage,
  desktopWidth,
  desktopHeight,
  mobileWidth,
  mobileHeight,
}: CaseStudyProductStrategySectionProps) {
  const mounted = useHasMounted();
  const isMobileViewport = useIsMobileViewport();
  const activeSrc = isMobileViewport ? mobileImage : desktopImage;
  const placeholderRatio = isMobileViewport
    ? `${mobileWidth} / ${mobileHeight}`
    : `${desktopWidth} / ${desktopHeight}`;

  return (
    <section className="bg-light-image-bg px-page-case-study py-case-study-v2-section">
      <CaseStudyPageContainer>
        <div className="flex flex-col gap-case-study-v2-within min-[1280px]:flex-row min-[1280px]:items-center">
          <h2 className="text-h2 w-full shrink-0 text-text-on-light min-[1280px]:w-[30%]">
            {title}
          </h2>

          <div className="w-full min-w-0 min-[1280px]:w-[70%]">
            {!mounted ? (
              <div
                className="w-full shrink-0 bg-light-image-bg"
                style={{ aspectRatio: placeholderRatio }}
                aria-hidden
              />
            ) : (
              <CaseStudyV2Asset
                src={activeSrc}
                background={isMobileViewport ? "primary" : "light"}
                padded={!isMobileViewport}
                responsiveFrame
              />
            )}
          </div>
        </div>
      </CaseStudyPageContainer>
    </section>
  );
}

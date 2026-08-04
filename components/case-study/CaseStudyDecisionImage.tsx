import { CaseStudyDualPhoneImage } from "@/components/case-study/CaseStudyDualPhoneImage";
import { CaseStudyImageCard } from "@/components/case-study/CaseStudyImageCard";

interface CaseStudyDecisionImageProps {
  src: string;
  imageSecondary?: string;
  mobileImage?: string;
  desktopImageScale?: number;
  isMobile: boolean;
  className?: string;
}

export function CaseStudyDecisionImage({
  src,
  imageSecondary,
  mobileImage,
  desktopImageScale,
  isMobile,
  className = "",
}: CaseStudyDecisionImageProps) {
  if (isMobile) {
    const secondary = imageSecondary ?? src;
    return (
      <CaseStudyDualPhoneImage
        images={[src, secondary]}
        variant="decision"
        className={className}
      />
    );
  }

  if (mobileImage) {
    return (
      <>
        <CaseStudyImageCard
          src={mobileImage}
          aspect="square"
          className={`max-[767px]:block min-[768px]:hidden ${className}`}
          padded
          background="secondary"
        />
        <CaseStudyImageCard
          src={src}
          className={`hidden min-[768px]:block ${className}`}
          padded
          desktopImageScale={desktopImageScale}
        />
      </>
    );
  }

  return <CaseStudyImageCard src={src} className={className} padded />;
}

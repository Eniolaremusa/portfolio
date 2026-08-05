import { CaseStudyDualPhoneImage } from "@/components/case-study/CaseStudyDualPhoneImage";
import { CaseStudyImageCard } from "@/components/case-study/CaseStudyImageCard";

interface CaseStudyHeroImageProps {
  images: string[];
  isMobile: boolean;
  heroIntrinsicAspect?: boolean;
  className?: string;
}

export function CaseStudyHeroImage({
  images,
  isMobile,
  heroIntrinsicAspect = false,
  className = "",
}: CaseStudyHeroImageProps) {
  if (isMobile && images.length >= 2) {
    return (
      <CaseStudyDualPhoneImage
        images={[images[0], images[1]]}
        variant="hero"
        className={className}
        priority
      />
    );
  }

  const src = images[0];
  if (!src) return null;

  const heroBackground = isMobile ? "secondary" : "primary";

  if (heroIntrinsicAspect) {
    return (
      <CaseStudyImageCard
        src={src}
        aspect="intrinsic"
        background={heroBackground}
        padded
        className={className}
        priority
      />
    );
  }

  const desktopAspect = isMobile ? "hero-mobile" : "wide";

  return (
    <>
      <CaseStudyImageCard
        src={src}
        aspect="square"
        background={heroBackground}
        imageFit="contain"
        padded
        className={`min-[768px]:hidden ${className}`}
        priority
      />
      <CaseStudyImageCard
        src={src}
        aspect={desktopAspect}
        background={heroBackground}
        imageFit={isMobile ? "contain" : "cover"}
        objectPosition={isMobile ? "center" : "top"}
        padded={isMobile}
        className={`hidden min-[768px]:block ${className}`}
        priority
      />
    </>
  );
}

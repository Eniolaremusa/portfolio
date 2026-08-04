import { CaseStudyDualPhoneImage } from "@/components/case-study/CaseStudyDualPhoneImage";
import { CaseStudyImageCard } from "@/components/case-study/CaseStudyImageCard";

interface CaseStudyHeroImageProps {
  images: string[];
  isMobile: boolean;
  className?: string;
}

export function CaseStudyHeroImage({
  images,
  isMobile,
  className = "",
}: CaseStudyHeroImageProps) {
  if (isMobile) {
    if (images.length >= 2) {
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

    return (
      <CaseStudyImageCard
        src={src}
        aspect="hero-mobile"
        background="secondary"
        imageFit="contain"
        className={className}
        priority
      />
    );
  }

  const src = images[0];
  if (!src) return null;

  return (
    <CaseStudyImageCard
      src={src}
      className={className}
      imageFit="cover"
      objectPosition="top"
      priority
    />
  );
}

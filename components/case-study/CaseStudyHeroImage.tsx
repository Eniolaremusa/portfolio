import Image from "next/image";

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
    return (
      <div
        className={`grid grid-cols-1 gap-4 min-[491px]:grid-cols-2 ${className}`}
      >
        {images.map((src) => (
          <div
            key={src}
            className="relative aspect-[9/19] w-full overflow-hidden bg-case-study-hero-image-bg"
          >
            <Image src={src} alt="" fill className="object-cover object-top" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
        ))}
      </div>
    );
  }

  const src = images[0];
  if (!src) return null;

  return (
    <div
      className={`relative h-[320px] w-full overflow-hidden bg-case-study-hero-bg min-[768px]:h-case-study-hero ${className}`}
    >
      <Image
        src={src}
        alt=""
        fill
        className="object-cover object-top"
        sizes="(max-width: 1312px) 100vw, 1312px"
        priority
      />
    </div>
  );
}

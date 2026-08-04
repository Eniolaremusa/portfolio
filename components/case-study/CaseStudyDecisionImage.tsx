import Image from "next/image";

interface CaseStudyDecisionImageProps {
  src: string;
  isMobile: boolean;
  className?: string;
}

export function CaseStudyDecisionImage({
  src,
  isMobile,
  className = "",
}: CaseStudyDecisionImageProps) {
  if (isMobile) {
    return (
      <div className={`grid grid-cols-1 gap-4 min-[491px]:grid-cols-2 ${className}`}>
        {[0, 1].map((index) => (
          <div
            key={index}
            className="relative aspect-[9/19] w-full overflow-hidden bg-case-study-hero-image-bg"
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`relative h-[280px] w-full overflow-hidden bg-case-study-hero-bg min-[768px]:h-case-study-image ${className}`}
    >
      <Image
        src={src}
        alt=""
        fill
        className="object-cover object-top"
        sizes="(max-width: 1312px) 100vw, 1312px"
      />
    </div>
  );
}

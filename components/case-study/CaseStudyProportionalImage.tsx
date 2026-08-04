import Image from "next/image";

interface CaseStudyProportionalImageProps {
  src: string;
  className?: string;
  padded?: boolean;
  priority?: boolean;
}

export function CaseStudyProportionalImage({
  src,
  className = "",
  padded = false,
  priority = false,
}: CaseStudyProportionalImageProps) {
  const isSvg = src.toLowerCase().endsWith(".svg");

  const image = (
    <Image
      src={src}
      alt=""
      width={0}
      height={0}
      sizes="100vw"
      priority={priority}
      unoptimized={isSvg}
      className="mx-auto h-auto w-full object-contain object-center"
    />
  );

  if (padded) {
    return (
      <div
        className={`w-full bg-case-study-hero-bg px-case-card-image-x pt-case-card-image-top ${className}`}
      >
        {image}
      </div>
    );
  }

  return <div className={`w-full bg-case-study-hero-bg ${className}`}>{image}</div>;
}

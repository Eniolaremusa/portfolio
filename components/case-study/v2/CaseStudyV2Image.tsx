import Image from "next/image";

interface CaseStudyV2ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
}

/** Raster-only image for CBF Flo v2 — no SVG unoptimized path. */
export function CaseStudyV2Image({
  src,
  alt,
  width,
  height,
  priority = false,
  className = "",
  sizes = "(max-width: 1312px) 100vw, 1312px",
}: CaseStudyV2ImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      className={`h-auto w-full ${className}`}
    />
  );
}

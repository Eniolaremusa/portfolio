import Image from "next/image";
import { caseStudyImageUnoptimized } from "@/lib/caseStudyImage";

interface CaseStudyV2ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
}

/** Raster-only image for CBF Flo v2 — skips Next recompression/WebP conversion. */
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
      unoptimized={caseStudyImageUnoptimized(src)}
      className={`h-auto w-full ${className}`}
    />
  );
}

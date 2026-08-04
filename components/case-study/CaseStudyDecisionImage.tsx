import { CaseStudyProportionalImage } from "@/components/case-study/CaseStudyProportionalImage";
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
        {[0, 1].map((index) => {
          const isSvg = src.toLowerCase().endsWith(".svg");
          return (
            <div
              key={index}
              className="w-full overflow-hidden bg-case-study-hero-image-bg"
            >
              <Image
                src={src}
                alt=""
                width={0}
                height={0}
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized={isSvg}
                className="mx-auto h-auto w-full object-contain object-center"
              />
            </div>
          );
        })}
      </div>
    );
  }

  return <CaseStudyProportionalImage src={src} className={className} padded />;
}

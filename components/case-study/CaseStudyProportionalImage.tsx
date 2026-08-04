import { CaseStudyImageCard } from "@/components/case-study/CaseStudyImageCard";

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
  return (
    <CaseStudyImageCard
      src={src}
      className={className}
      padded={padded}
      priority={priority}
    />
  );
}

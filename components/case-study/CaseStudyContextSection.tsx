import { CaseStudyBodyParagraphs } from "@/components/case-study/CaseStudyBodyParagraphs";
import { CaseStudyDivider } from "@/components/case-study/CaseStudyDivider";

interface CaseStudyContextSectionProps {
  productContext: string;
  businessProblem: string;
}

export function CaseStudyContextSection({
  productContext,
  businessProblem,
}: CaseStudyContextSectionProps) {
  if (!productContext && !businessProblem) return null;

  return (
    <section className="bg-light-bg px-page py-section">
      <div className="mx-auto flex max-w-[1312px] flex-col gap-10 min-[768px]:flex-row min-[768px]:items-stretch min-[768px]:gap-16">
        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <p className="text-eyebrow text-text-on-light">Product Context</p>
          <CaseStudyBodyParagraphs text={productContext} />
        </div>

        <CaseStudyDivider className="hidden min-[768px]:block" />

        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <p className="text-eyebrow text-text-on-light">Business Problem</p>
          <CaseStudyBodyParagraphs text={businessProblem} />
        </div>
      </div>
    </section>
  );
}

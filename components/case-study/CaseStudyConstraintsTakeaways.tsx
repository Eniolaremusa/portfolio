import { CaseStudyBodyParagraphs } from "@/components/case-study/CaseStudyBodyParagraphs";

interface CaseStudyConstraintsTakeawaysProps {
  constraintsTitle: string;
  constraints: string;
  takeawaysTitle: string;
  takeaways: string;
}

export function CaseStudyConstraintsTakeaways({
  constraintsTitle,
  constraints,
  takeawaysTitle,
  takeaways,
}: CaseStudyConstraintsTakeawaysProps) {
  if (!constraints && !takeaways) return null;

  return (
    <section className="bg-light-bg px-page py-section">
      <div className="mx-auto flex max-w-[1312px] flex-col gap-10 min-[768px]:flex-row min-[768px]:items-start min-[768px]:justify-center min-[768px]:gap-16">
        <div className="w-full min-[768px]:w-[35%]">
          <p className="text-eyebrow text-text-on-light">{constraintsTitle}</p>
          <div className="mt-4">
            <CaseStudyBodyParagraphs text={constraints} />
          </div>
        </div>
        <div className="w-full min-[768px]:w-[35%]">
          <p className="text-eyebrow text-text-on-light">{takeawaysTitle}</p>
          <div className="mt-4">
            <CaseStudyBodyParagraphs text={takeaways} />
          </div>
        </div>
      </div>
    </section>
  );
}

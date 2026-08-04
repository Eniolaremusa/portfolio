function BodyParagraphs({ text }: { text: string }) {
  const paragraphs = text.split("\n\n").filter(Boolean);

  return (
    <div className="flex flex-col gap-2">
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 40)} className="text-body text-text-on-light">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

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
      <div className="mx-auto grid max-w-[1312px] grid-cols-1 gap-10 min-[768px]:grid-cols-2 min-[768px]:gap-context-gap">
        <div className="flex max-w-[592px] flex-col gap-6">
          <p className="text-eyebrow text-text-on-light">Product Context</p>
          <BodyParagraphs text={productContext} />
        </div>
        <div className="flex max-w-[592px] flex-col gap-6">
          <p className="text-eyebrow text-text-on-light">Business Problem</p>
          <BodyParagraphs text={businessProblem} />
        </div>
      </div>
    </section>
  );
}

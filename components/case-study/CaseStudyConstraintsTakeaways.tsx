function BodyParagraphs({ text }: { text: string }) {
  const paragraphs = text.split("\n\n").filter(Boolean);

  return (
    <div className="mt-4 flex flex-col gap-2">
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 40)} className="text-body text-text-on-light">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

interface CaseStudyConstraintsTakeawaysProps {
  constraints: string;
  takeaways: string;
}

export function CaseStudyConstraintsTakeaways({
  constraints,
  takeaways,
}: CaseStudyConstraintsTakeawaysProps) {
  if (!constraints && !takeaways) return null;
  return (
    <section className="bg-light-bg px-page py-section">
      <div className="mx-auto flex max-w-[1312px] flex-col gap-10 min-[768px]:flex-row min-[768px]:justify-center min-[768px]:gap-constraints-gap">
        <div className="w-full max-w-constraints-column">
          <p className="text-eyebrow text-text-on-light">Designing Within Constraints</p>
          <BodyParagraphs text={constraints} />
        </div>
        <div className="w-full max-w-constraints-column">
          <p className="text-eyebrow text-text-on-light">Takeaways</p>
          <BodyParagraphs text={takeaways} />
        </div>
      </div>
    </section>
  );
}

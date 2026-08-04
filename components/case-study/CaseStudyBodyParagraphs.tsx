export function CaseStudyBodyParagraphs({ text }: { text: string }) {
  const paragraphs = text.split("\n\n").filter(Boolean);

  return (
    <div className="flex flex-col gap-2">
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 48)} className="text-body text-text-on-light">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

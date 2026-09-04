import Link from "next/link";
import { ExternalLinkArrow } from "@/components/ExternalLinkArrow";

/** Shared with homepage case study cards and case study title prototype link */
export const caseStudyTextCtaClassName =
  "group text-body inline-flex w-fit items-center gap-1.5 text-text-on-light";

export const caseStudyTextCtaArrowClassName =
  "max-[495px]:hidden opacity-0 scale-90 transition-all duration-200 ease-out nav-group-hover:opacity-100 nav-group-hover:scale-100";

export function CaseStudyTextCtaContent({ label }: { label: string }) {
  return (
    <>
      <span className="underline decoration-from-font underline-offset-2">
        {label}
      </span>
      <ExternalLinkArrow className={caseStudyTextCtaArrowClassName} />
    </>
  );
}

interface CaseStudyTextCtaProps {
  href: string;
  label: string;
  external?: boolean;
  className?: string;
}

export function CaseStudyTextCta({
  href,
  label,
  external = false,
  className = "",
}: CaseStudyTextCtaProps) {
  const classes = className
    ? `${caseStudyTextCtaClassName} ${className}`
    : caseStudyTextCtaClassName;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        <CaseStudyTextCtaContent label={label} />
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      <CaseStudyTextCtaContent label={label} />
    </Link>
  );
}

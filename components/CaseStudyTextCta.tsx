import Link from "next/link";
import { ExternalLinkArrow } from "@/components/ExternalLinkArrow";

/** Prototype / external links — accent by default */
export const caseStudyTextCtaClassName =
  "group text-body inline-flex w-fit items-center gap-1.5 text-accent transition-opacity duration-200 ease-out hover:opacity-85";

/** Homepage “Read case study” — body color until hover */
export const caseStudyReadCaseStudyCtaClassName =
  "group text-body inline-flex w-fit items-center gap-1.5 text-text-on-light transition-colors duration-220 ease-out group-hover:text-accent hover:text-accent";

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
  /** `read` matches homepage case study preview entry links */
  tone?: "accent" | "read";
}

export function CaseStudyTextCta({
  href,
  label,
  external = false,
  className = "",
  tone = "accent",
}: CaseStudyTextCtaProps) {
  const baseClassName =
    tone === "read"
      ? caseStudyReadCaseStudyCtaClassName
      : caseStudyTextCtaClassName;
  const classes = className
    ? `${baseClassName} ${className}`
    : baseClassName;

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

import { SiteNav } from "@/components/SiteNav";

interface FooterProps {
  paddingClass?: "px-page" | "px-page-case-study";
  /** Homepage footer — accent background, white name, muted links */
  variant?: "default" | "home";
}

export function Footer({
  paddingClass = "px-page",
  variant = "default",
}: FooterProps) {
  return (
    <SiteNav
      as="footer"
      paddingClass={paddingClass}
      theme={variant === "home" ? "accent" : "light"}
    />
  );
}

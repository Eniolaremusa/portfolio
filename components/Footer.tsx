import { SiteNav } from "@/components/SiteNav";

interface FooterProps {
  paddingClass?: "px-page" | "px-page-case-study";
}

export function Footer({ paddingClass = "px-page" }: FooterProps) {
  return <SiteNav as="footer" paddingClass={paddingClass} />;
}

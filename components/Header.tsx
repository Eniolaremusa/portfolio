import { SiteNav } from "@/components/SiteNav";

interface HeaderProps {
  variant?: "light" | "dark";
  paddingClass?: "px-page" | "px-page-case-study";
}

export function Header({ variant = "light", paddingClass = "px-page" }: HeaderProps) {
  return <SiteNav as="header" theme={variant} paddingClass={paddingClass} />;
}

import { SiteNav } from "@/components/SiteNav";

interface HeaderProps {
  variant?: "light" | "dark";
}

export function Header({ variant = "light" }: HeaderProps) {
  return <SiteNav as="header" theme={variant} />;
}

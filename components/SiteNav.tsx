import Link from "next/link";
import { DesktopNavLinks, MobileNavMenu } from "@/components/NavMenu";
import { siteConfig } from "@/data/home";

interface SiteNavProps {
  as?: "header" | "footer";
  theme?: "light" | "dark";
  paddingClass?: "px-page" | "px-page-case-study";
}

export function SiteNav({
  as = "header",
  theme = "light",
  paddingClass = "px-page",
}: SiteNavProps) {
  const Tag = as;
  const isDark = theme === "dark";

  return (
    <Tag
      className={`${paddingClass} py-6 ${isDark ? "bg-case-study-hero-bg" : "bg-light-bg"}`}
    >
      <div className="mx-auto flex w-full min-w-0 max-w-page items-center justify-between gap-6">
        <Link
          href="/"
          className={`text-wordmark shrink-0 ${isDark ? "text-on-dark" : "text-text-on-light"}`}
        >
          {siteConfig.name}
        </Link>
        <DesktopNavLinks theme={theme} />
        <MobileNavMenu placement={as} theme={theme} />
      </div>
    </Tag>
  );
}

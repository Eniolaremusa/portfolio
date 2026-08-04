import Link from "next/link";
import { DesktopNavLinks, MobileNavMenu } from "@/components/NavMenu";
import { siteConfig } from "@/data/home";

interface SiteNavProps {
  as?: "header" | "footer";
  theme?: "light" | "dark";
}

export function SiteNav({ as = "header", theme = "light" }: SiteNavProps) {
  const Tag = as;
  const isDark = theme === "dark";

  return (
    <Tag
      className={`px-page py-6 ${isDark ? "bg-case-study-hero-bg" : "bg-light-bg"}`}
    >
      <div className="mx-auto flex max-w-[1312px] items-center justify-between gap-6">
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

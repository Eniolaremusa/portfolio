import Link from "next/link";
import { DesktopNavLinks, MobileNavMenu } from "@/components/NavMenu";
import { siteConfig } from "@/data/home";

interface SiteNavProps {
  as?: "header" | "footer";
}

export function SiteNav({ as = "header" }: SiteNavProps) {
  const Tag = as;

  return (
    <Tag className="bg-light-bg px-page py-6">
      <div className="mx-auto flex max-w-[1312px] items-center justify-between gap-6">
        <Link href="/" className="text-wordmark shrink-0 text-text-on-light">
          {siteConfig.name}
        </Link>
        <DesktopNavLinks />
        <MobileNavMenu placement={as} />
      </div>
    </Tag>
  );
}

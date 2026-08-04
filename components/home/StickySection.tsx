import type { ReactNode } from "react";

interface StickySectionProps {
  label: string;
  children: ReactNode;
  contentClassName?: string;
}

/**
 * Side-by-side layout with an independently sticky section label on xl+.
 * On smaller breakpoints the label scrolls with the page (grid stacks).
 */
export function StickySection({
  label,
  children,
  contentClassName = "",
}: StickySectionProps) {
  return (
    <section className="bg-light-bg px-page py-section">
      <div className="mx-auto grid max-w-[1312px] grid-cols-1 gap-10 xl:grid-cols-[426px_minmax(0,1fr)] xl:gap-[94px]">
        <div className="self-stretch">
          <h2 className="text-section-label bg-light-bg text-text-on-light xl:sticky xl:top-[69px] xl:z-10 xl:py-2">
            {label}
          </h2>
        </div>
        <div className={contentClassName}>{children}</div>
      </div>
    </section>
  );
}

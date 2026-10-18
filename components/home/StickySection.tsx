import type { ReactNode } from "react";

interface StickySectionProps {
  label: string;
  children: ReactNode;
  contentClassName?: string;
  /** Outer two-column grid (defaults to 426px label + fluid content on xl). */
  gridClassName?: string;
  /** Heading typography; defaults to uppercase section label. */
  labelHeadingClassName?: string;
}

/**
 * Side-by-side layout with an independently sticky section label on xl+.
 * On smaller breakpoints the label scrolls with the page (grid stacks).
 */
const DEFAULT_GRID_CLASS =
  "mx-auto grid max-w-[1312px] grid-cols-1 gap-[34px] min-[768px]:gap-10 xl:grid-cols-[426px_minmax(0,1fr)] xl:gap-[94px]";

const DEFAULT_LABEL_CLASS =
  "text-section-label bg-light-bg text-text-on-light xl:sticky xl:top-[69px] xl:z-10 xl:py-2";

export function StickySection({
  label,
  children,
  contentClassName = "",
  gridClassName = DEFAULT_GRID_CLASS,
  labelHeadingClassName = DEFAULT_LABEL_CLASS,
}: StickySectionProps) {
  return (
    <section className="bg-light-bg px-page py-section">
      <div className={gridClassName}>
        <div className="self-stretch">
          <h2 className={labelHeadingClassName}>{label}</h2>
        </div>
        <div className={contentClassName}>{children}</div>
      </div>
    </section>
  );
}

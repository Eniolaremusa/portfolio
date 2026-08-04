"use client";

import { useEffect, useRef, useState } from "react";
import { EmailLink } from "@/components/EmailLink";
import { siteConfig } from "@/data/home";

const navLinkClassName = "text-nav text-nav-link";

function NavLinks({
  onNavigate,
  align = "default",
}: {
  onNavigate?: () => void;
  align?: "default" | "start";
}) {
  const linkClass =
    align === "start" ? `${navLinkClassName} block w-full text-left` : navLinkClassName;

  return (
    <>
      <a
        href={siteConfig.resumeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
        onClick={onNavigate}
      >
        {"{resume}"}
      </a>
      <a
        href={siteConfig.linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
        onClick={onNavigate}
      >
        {"{linkedin}"}
      </a>
      <a
        href={siteConfig.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
        onClick={onNavigate}
      >
        {"{github}"}
      </a>
      <EmailLink
        email={siteConfig.email}
        className={align === "start" ? `${navLinkClassName} block w-full text-left` : navLinkClassName}
      />
    </>
  );
}

interface FooterPanelPosition {
  bottom: number;
  paddingInline: number;
}

function useFooterPanelPosition(
  open: boolean,
  buttonRef: React.RefObject<HTMLButtonElement | null>,
) {
  const [position, setPosition] = useState<FooterPanelPosition | null>(null);

  useEffect(() => {
    if (!open || !buttonRef.current) return;

    const footer = buttonRef.current.closest("footer");
    if (!footer) return;

    function update() {
      const footerRect = footer!.getBoundingClientRect();
      const styles = window.getComputedStyle(footer!);
      setPosition({
        bottom: window.innerHeight - footerRect.top + 12,
        paddingInline: parseFloat(styles.paddingLeft),
      });
    }

    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
    };
  }, [open, buttonRef]);

  return position;
}

interface MobileNavMenuProps {
  placement?: "header" | "footer";
}

export function MobileNavMenu({ placement = "header" }: MobileNavMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const footerPosition = useFooterPanelPosition(open, buttonRef);
  const isFooter = placement === "footer";

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const panelContent = (
    <nav
      className={`text-nav flex flex-col gap-4 ${isFooter ? "items-start" : ""}`}
    >
      <NavLinks onNavigate={() => setOpen(false)} align={isFooter ? "start" : "default"} />
    </nav>
  );

  return (
    <div ref={containerRef} className="relative min-[496px]:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((prev) => !prev)}
        className={`${navLinkClassName} cursor-pointer`}
      >
        {"{menu}"}
      </button>
      {open && isFooter && footerPosition ? (
        <div
          role="menu"
          className="fixed inset-x-0 z-50"
          style={{
            bottom: footerPosition.bottom,
            paddingInline: footerPosition.paddingInline,
          }}
        >
          <div className="w-full rounded-lg border border-light-image-bg bg-light-bg p-4 shadow-photo">
            {panelContent}
          </div>
        </div>
      ) : null}
      {open && !isFooter ? (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-3 min-w-[160px] rounded-lg border border-light-image-bg bg-light-bg p-4 shadow-photo"
        >
          {panelContent}
        </div>
      ) : null}
    </div>
  );
}

export function DesktopNavLinks() {
  return (
    <nav className="text-nav max-[495px]:hidden min-[496px]:flex min-[496px]:flex-wrap min-[496px]:items-center min-[496px]:justify-end min-[496px]:gap-nav-gap">
      <NavLinks />
    </nav>
  );
}

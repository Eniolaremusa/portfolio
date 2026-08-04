"use client";

import { useEffect, useRef, useState } from "react";
import { EmailLink } from "@/components/EmailLink";
import { siteConfig } from "@/data/home";

function getNavLinkClass(theme: "light" | "dark", align: "default" | "start") {
  const base = theme === "dark" ? "text-nav text-nav-link-on-dark" : "text-nav text-nav-link";
  return align === "start" ? `${base} block w-full text-left` : base;
}

function NavLinks({
  onNavigate,
  align = "default",
  theme = "light",
}: {
  onNavigate?: () => void;
  align?: "default" | "start";
  theme?: "light" | "dark";
}) {
  const linkClass = getNavLinkClass(theme, align);

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
        className={getNavLinkClass(theme, align)}
      />
    </>
  );
}

function useFooterPanelLayout(
  open: boolean,
  buttonRef: React.RefObject<HTMLButtonElement | null>,
) {
  const [layout, setLayout] = useState<{
    bottom: number;
    paddingClass: "px-page" | "px-page-case-study";
  } | null>(null);

  useEffect(() => {
    if (!open || !buttonRef.current) return;

    const footer = buttonRef.current.closest("footer");
    if (!footer) return;

    function update() {
      const footerRect = footer!.getBoundingClientRect();
      setLayout({
        bottom: window.innerHeight - footerRect.top + 12,
        paddingClass: footer!.classList.contains("px-page-case-study")
          ? "px-page-case-study"
          : "px-page",
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

  return layout;
}

interface MobileNavMenuProps {
  placement?: "header" | "footer";
  theme?: "light" | "dark";
}

export function MobileNavMenu({ placement = "header", theme = "light" }: MobileNavMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const footerPanelLayout = useFooterPanelLayout(open, buttonRef);
  const isFooter = placement === "footer";
  const menuButtonClass =
    theme === "dark" ? "text-nav text-nav-link-on-dark cursor-pointer" : "text-nav text-nav-link cursor-pointer";

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
    <nav className={`text-nav flex w-full flex-col gap-4 ${isFooter ? "items-start" : "items-end"}`}>
      <NavLinks onNavigate={() => setOpen(false)} align={isFooter ? "start" : "default"} theme={theme} />
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
        className={menuButtonClass}
      >
        {"{menu}"}
      </button>
      {open && isFooter && footerPanelLayout ? (
        <div
          role="menu"
          className={`fixed inset-x-0 z-50 ${footerPanelLayout.paddingClass}`}
          style={{ bottom: footerPanelLayout.bottom }}
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

export function DesktopNavLinks({ theme = "light" }: { theme?: "light" | "dark" }) {
  return (
    <nav className="text-nav max-[495px]:hidden min-[496px]:flex min-[496px]:flex-wrap min-[496px]:items-center min-[496px]:justify-end min-[496px]:gap-nav-gap">
      <NavLinks theme={theme} />
    </nav>
  );
}

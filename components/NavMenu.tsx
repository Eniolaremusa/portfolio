"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { EmailLink } from "@/components/EmailLink";
import { siteConfig } from "@/data/home";

function getNavLinkClass(theme: "light" | "dark") {
  return theme === "dark" ? "text-nav text-nav-link-on-dark" : "text-nav text-nav-link";
}

function getMobileNavLinkClass(theme: "light" | "dark") {
  return theme === "dark"
    ? "text-nav text-on-dark block w-full self-start text-left"
    : "text-nav text-text-on-light block w-full self-start text-left";
}

function NavLinks({
  onNavigate,
  theme = "light",
  mobile = false,
}: {
  onNavigate?: () => void;
  theme?: "light" | "dark";
  mobile?: boolean;
}) {
  const linkClass = mobile ? getMobileNavLinkClass(theme) : getNavLinkClass(theme);

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
      <EmailLink email={siteConfig.email} className={linkClass} />
    </>
  );
}

function useMobilePanelPosition(
  open: boolean,
  buttonRef: React.RefObject<HTMLButtonElement | null>,
  placement: "header" | "footer",
) {
  const [position, setPosition] = useState<{ top?: number; bottom?: number } | null>(null);

  useEffect(() => {
    if (!open || !buttonRef.current) return;

    const anchor = buttonRef.current.closest(placement);
    if (!anchor) return;

    function update() {
      const rect = anchor!.getBoundingClientRect();
      if (placement === "header") {
        setPosition({ top: rect.bottom });
      } else {
        setPosition({ bottom: window.innerHeight - rect.top });
      }
    }

    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
    };
  }, [open, buttonRef, placement]);

  return position;
}

interface MobileNavMenuProps {
  placement?: "header" | "footer";
  theme?: "light" | "dark";
}

export function MobileNavMenu({ placement = "header", theme = "light" }: MobileNavMenuProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelPosition = useMobilePanelPosition(open, buttonRef, placement);
  const isDark = theme === "dark";
  const menuButtonClass = isDark
    ? "text-nav text-nav-link-on-dark cursor-pointer"
    : "text-nav text-nav-link cursor-pointer";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        containerRef.current?.contains(target) ||
        panelRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
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

  const panelBg = isDark ? "bg-case-study-hero-bg" : "bg-light-bg";

  const panel =
    open && panelPosition && mounted ? (
      <div
        ref={panelRef}
        role="menu"
        className={`fixed left-0 z-50 w-screen max-w-none rounded-none ${panelBg}`}
        style={
          placement === "header"
            ? { top: panelPosition.top }
            : { bottom: panelPosition.bottom }
        }
      >
        <nav className="text-nav flex w-full flex-col items-stretch gap-4 px-6 py-4">
          <NavLinks onNavigate={() => setOpen(false)} theme={theme} mobile />
        </nav>
      </div>
    ) : null;

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
      {panel && createPortal(panel, document.body)}
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

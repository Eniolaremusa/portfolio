"use client";

import { useEffect, useRef, useState } from "react";
import { EmailLink } from "@/components/EmailLink";
import { siteConfig } from "@/data/home";

const navLinkClassName = "text-nav text-nav-link";

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <a
        href={siteConfig.resumeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={navLinkClassName}
        onClick={onNavigate}
      >
        {"{resume}"}
      </a>
      <a
        href={siteConfig.linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={navLinkClassName}
        onClick={onNavigate}
      >
        {"{linkedin}"}
      </a>
      <a
        href={siteConfig.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={navLinkClassName}
        onClick={onNavigate}
      >
        {"{github}"}
      </a>
      <EmailLink email={siteConfig.email} className={navLinkClassName} />
    </>
  );
}

export function MobileNavMenu() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={containerRef} className="relative min-[496px]:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((prev) => !prev)}
        className={`${navLinkClassName} cursor-pointer`}
      >
        {"{menu}"}
      </button>
      {open ? (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-3 min-w-[160px] rounded-lg border border-light-image-bg bg-light-bg p-4 shadow-photo"
        >
          <nav className="text-nav flex flex-col gap-4">
            <NavLinks onNavigate={() => setOpen(false)} />
          </nav>
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

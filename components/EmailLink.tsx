"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface EmailLinkProps {
  email: string;
  className?: string;
}

export function EmailLink({ email, className = "" }: EmailLinkProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [email]);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`text-nav cursor-pointer text-left ${className}`}
    >
      {copied ? "{Copied}" : "{email me}"}
    </button>
  );
}

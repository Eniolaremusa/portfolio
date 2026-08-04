import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-light-image-bg px-container py-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="text-eyebrow text-text-on-light">
          Eniola Aigbokhaode
        </Link>
        <nav className="text-eyebrow flex gap-6 text-text-on-light">
          <span>Resume</span>
          <span>LinkedIn</span>
          <span>GitHub</span>
          <span>Email</span>
        </nav>
      </div>
    </footer>
  );
}

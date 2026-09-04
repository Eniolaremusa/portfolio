/** Case study image helpers — shared by CBF Flo v2, Onarvo Desk, and v1 pages. */

export function isSvgSrc(src: string): boolean {
  return src.split("?")[0]?.toLowerCase().endsWith(".svg") ?? false;
}

function caseStudySrcExtension(src: string): string {
  const path = src.split("?")[0]?.toLowerCase() ?? "";
  const dot = path.lastIndexOf(".");
  return dot >= 0 ? path.slice(dot) : "";
}

/**
 * Pre-exported 2x PNG/JPEG assets must bypass Next.js optimization.
 * Default quality (75) recompresses flat UI screenshots, and the optimizer
 * converts PNG → WebP/AVIF which softens edges further than photos.
 */
export function caseStudyImageUnoptimized(src: string): boolean {
  if (isSvgSrc(src)) return true;

  const ext = caseStudySrcExtension(src);
  return ext === ".png" || ext === ".jpg" || ext === ".jpeg" || ext === ".webp" || ext === ".avif";
}

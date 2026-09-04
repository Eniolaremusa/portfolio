export const PAGE_INTRO_SESSION_KEY = "portfolio-session-intro-seen";
export const PAGE_INTRO_HTML_CLASS = "page-intro-active";

/** Runs in <head> before first paint — must stay synchronous (no defer/async). */
export function getPageIntroBlockingScript(): string {
  return `(function(){try{if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;if(sessionStorage.getItem("${PAGE_INTRO_SESSION_KEY}"))return;document.documentElement.classList.add("${PAGE_INTRO_HTML_CLASS}");}catch(e){}})();`;
}

export function clearPageIntroClass(): void {
  document.documentElement.classList.remove(PAGE_INTRO_HTML_CLASS);
}

# Case Study Technical Spec

> Generated from repo audit (Sep 2026). Canonical reference: **CBF Flo** unless noted.
> No MDX — all case studies are TS data modules + shared React components.

---

## 1. Asset load diagnostics (why pages take 60s+)

### Summary

Case study pages feel slow because **each page downloads 6–17 MB of mostly unoptimized SVG**, then the browser must **parse and rasterize** them. On a typical connection (~1 Mbps), **15 MB alone ≈ 120 seconds** of transfer before paint completes for below-fold sections. Rendering cost from SVG filters and embedded rasters adds further delay after download.

This is **not** a Next.js Image misconfiguration alone — `unoptimized` on SVG is correct (Next does not compress SVG), but the **source files are too large** for web delivery.

### Repo-wide asset inventory

| Study folder | Files | Total size |
|---|---|---|
| `public/case study/CBF FLO/` | 12 | **36.75 MB** |
| `public/case study/propheski/` | 7 | **18.40 MB** |
| `public/case study/Applatch/` | 8 | **9.30 MB** |
| `public/case study/Vendor connect/` | 7 | **9.00 MB** |
| `public/case study/Homeward/` | 7 | **6.37 MB** |
| **All case study assets** | 46 | **~85.85 MB** |

### Per-page transfer budget (assets referenced in data, full scroll)

| Slug | Desktop assets | Desktop MB | Mobile assets | Mobile MB |
|---|---|---|---|---|
| `cbf-flo` | 4 | **15.12** | 4 | **10.00** |
| `propheski` | 4 | **10.68** | 4 | **16.64** |
| `applatch` | 4 | **7.91** | 4 | **7.68** |
| `vendor-connect` | 4 | **6.05** | 4 | **6.05** |
| `homeward` | 6 | **5.78** | 6 | **6.00** |

**CBF Flo desktop largest files:**

```
6.21 MB  public/case study/CBF FLO/ds2.svg
5.56 MB  public/case study/CBF FLO/ds3.svg
2.68 MB  public/case study/CBF FLO/Ds1.svg
0.67 MB  public/case study/CBF FLO/Hero.svg
```

**Propheski mobile largest (pair carousel loads both):**

```
8.92 MB  public/case study/propheski/Propheski hero.svg
4.97 MB  public/case study/propheski/p ds2b.svg  (40 filter ops, embedded raster)
2.36 MB  public/case study/propheski/p ds1b.svg  (88 filter ops)
```

### Root causes (ranked)

1. **Oversized SVG exports** — Heroes and decision frames are 0.7–8.9 MB each. Figma/SVG exports with full fidelity are stored verbatim in `public/`.

2. **`unoptimized={true}` on all SVGs** — Required behavior in `CaseStudyImageCard`:
   ```tsx
   const unoptimized = isSvgSrc(src);
   ```
   Next.js passes SVG through without transformation. No WebP/AVIF fallback exists.

3. **Embedded base64 rasters inside SVG** — 12 files contain `data:image` payloads (e.g. `Applatch/Ap hero.svg` at 6.62 MB, `propheski/p ds2b.svg` at 4.97 MB). These inflate file size and decode slowly.

4. **SVG filter effects** — 21 files contain `feGaussianBlur`, `feDropShadow`, or `<filter>` nodes. Examples:
   - `propheski/p ds1b.svg` — ~88 filter references
   - `Homeward/Home ds1a.svg` — ~72 filter references
   - Filters force expensive CPU/GPU rasterization on every paint.

5. **No responsive raster fallbacks** — Desktop and mobile load different SVGs where configured, but both sets are large. Mobile Propheski is *worse* (16.64 MB) because pair carousels load two phone SVGs per decision.

6. **Lazy load helps first paint, not total session** — Below-fold decision images omit `priority` (correct), but scrolling the full page still fetches every asset. Gallery lightbox re-fetches the same URLs with `priority` when opened.

7. **Empty `next.config.ts`** — No `images` remote patterns, formats, or size limits:
   ```ts
   const nextConfig: NextConfig = {};
   ```

8. **Client mount gate delays first image** — `useHasMounted()` + `useIsMobileViewport()` defer the correct breakpoint asset until hydration. Placeholder renders first (`aspectRatio: "16 / 10"` or `case-study-image-card-square`), then full SVG fetch begins.

### What is *not* the problem

- Duplicate hidden `<img>` twins — explicitly avoided; comment in `CaseStudyDecisionImage`: *"Only the active viewport asset is mounted"*.
- Gallery preloading all images — `CaseStudyGalleryProvider` builds a URL list but does not prefetch; lightbox loads on open only.
- Case study pages do not use video — MP4 exists only on homepage Personal Explorations.

### Recommended fix direction (documentation only — no code changed)

1. Re-export decision/hero art as **WebP/AVIF PNG at 2×** for `<picture>` or replace SVG with optimized PNG.
2. Strip **filters and embedded rasters** from SVGs at export (SVGO / Figma export settings).
3. Target **< 200 KB per below-fold frame**, **< 500 KB hero**.
4. Keep SVG only for simple vector UI chrome, not full product screenshots.

---

## 2. File / route structure

### Routing

```
app/[slug]/page.tsx     → dynamic case study route (SSG via generateStaticParams)
app/page.tsx            → homepage index (not a case study)
app/layout.tsx          → root layout, fonts, global metadata
```

**No MDX.** Content lives in `data/*.ts`. UI is composed entirely from React components.

### Page composition (`app/[slug]/page.tsx`)

```tsx
export function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({ slug }));
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) notFound();

  const isComplete = Boolean(caseStudy.productContext);

  return (
    <>
      <Header
        variant={isComplete ? "dark" : "light"}
        paddingClass={isComplete ? "px-page-case-study" : "px-page"}
      />
      <main className="overflow-x-clip">
        {isComplete ? (
          <CaseStudyLayout study={caseStudy} />
        ) : (
          <CaseStudyPlaceholder title={caseStudy.title} />
        )}
      </main>
      <Footer paddingClass={isComplete ? "px-page-case-study" : "px-page"} />
    </>
  );
}
```

### Data layer

```
data/index.ts           → caseStudies registry, getCaseStudy(), caseStudySlugs
data/types.ts           → CaseStudy, DecisionContent interfaces
data/cbf-flo.ts         → CBF Flo content (canonical)
data/applatch.ts
data/homeward.ts
data/vendor-connect.ts
data/propheski.ts
data/home.ts            → homeCaseStudyOrder, card images (index only)
```

Registry:

```tsx
export const caseStudies: Record<string, CaseStudy> = {
  "cbf-flo": cbfFlo,
  applatch,
  propheski,
  "vendor-connect": vendorConnect,
  homeward,
};
```

### Layout section order (`CaseStudyLayout.tsx`)

1. **Hero** — dark bg, title block + hero image
2. **Context** — Product Context + Business Problem (light bg)
3. **Pull quote** — conditional (`hasPullQuote` + image + quote text)
4. **Decisions** — mapped from `study.decisions[]`, skips `title === "Placeholder"`
5. **Constraints / Takeaways** — two-column footer section

Wrapped in `CaseStudyGalleryProvider` for lightbox.

### Static assets

```
public/case study/{Study Name}/*.svg
public/images/cbf-flo/pull-quote-map.png   (CBF pull quote — unused, hasPullQuote: false)
public/images/home/case-studies/         (homepage card thumbnails only)
```

---

## 3. Shared components

All live under `components/case-study/` unless noted.

### `CaseStudyLayout`

**Path:** `components/case-study/CaseStudyLayout.tsx`

```tsx
interface CaseStudyLayoutProps {
  study: CaseStudy;
}
```

Orchestrates the full page. Wraps content in `CaseStudyGalleryProvider`.

---

### `CaseStudyGalleryProvider`

**Path:** `components/case-study/CaseStudyGalleryProvider.tsx`

```tsx
interface CaseStudyGalleryProviderProps {
  study: CaseStudy;
  children: ReactNode;
}
```

Context API:

```tsx
interface CaseStudyGalleryContextValue {
  images: readonly string[];
  openSrc: (src: string) => void;
  openIndex: (index: number) => void;
}
```

Builds gallery sequence via `getCaseStudyGalleryImages(study, isMobileViewport)` from `lib/caseStudyGallery.ts`. Renders `CaseStudyImageLightbox`.

---

### `CaseStudyPageContainer`

**Path:** `components/case-study/CaseStudyPageContainer.tsx`

```tsx
interface CaseStudyPageContainerProps {
  children: ReactNode;
  className?: string;
}
```

Classes: `` `mx-auto w-full min-w-0 max-w-page ${className}` ``

`max-w-page` → `--width-page-max: 1312px`

---

### `CaseStudyTitleBlock`

**Path:** `components/case-study/CaseStudyTitleBlock.tsx`

```tsx
interface CaseStudyTitleBlockProps {
  study: CaseStudy;
  variant?: "light" | "dark";  // default "light"; case studies use "dark"
}
```

Renders eyebrow, h1, intro, optional prototype link, Role/Team/Timeline metadata.

---

### `CaseStudyHeroImage`

**Path:** `components/case-study/CaseStudyHeroImage.tsx` (client)

```tsx
interface CaseStudyHeroImageProps {
  images: string[];
  heroMobile?: string;
  isMobile: boolean;
  heroIntrinsicAspect?: boolean;
  heroPadded?: boolean;       // default true
  className?: string;
}
```

Branches: dual-phone hero (`isMobile && images.length >= 2`), intrinsic aspect, fixed aspect with mobile/desktop swap via `useIsMobileViewport()`.

---

### `CaseStudyContextSection`

**Path:** `components/case-study/CaseStudyContextSection.tsx`

```tsx
interface CaseStudyContextSectionProps {
  productContext: string;
  businessProblem: string;
}
```

---

### `CaseStudyDecisionSection`

**Path:** `components/case-study/CaseStudyDecisionSection.tsx`

```tsx
interface CaseStudyDecisionSectionProps {
  decision: DecisionContent;
  isMobile: boolean;
  tabletDecisionImageScale?: number;
}
```

Renders eyebrow, h2 title, three-column beats (Explored / Rejected | Decided), then `CaseStudyDecisionImage`.

---

### `CaseStudyConstraintsTakeaways`

**Path:** `components/case-study/CaseStudyConstraintsTakeaways.tsx`

```tsx
interface CaseStudyConstraintsTakeawaysProps {
  constraintsTitle: string;
  constraints: string;
  takeawaysTitle: string;
  takeaways: string;
}
```

---

### `CaseStudyPullQuote`

**Path:** `components/case-study/CaseStudyPullQuote.tsx`

```tsx
interface CaseStudyPullQuoteProps {
  image: string;
  quote: string;
}
```

Only rendered when **all three** exist: `hasPullQuote && pullQuote && images.pullQuote`.

---

### `CaseStudyDecisionImage`

**Path:** `components/case-study/CaseStudyDecisionImage.tsx` (client)

```tsx
interface CaseStudyDecisionImageProps {
  src: string;
  imageSecondary?: string;
  imageTertiary?: string;
  imageArrangement?: DecisionImageArrangement;  // "single" | "pair" | "single-then-pair"
  mobileImage?: string;
  desktopImageScale?: number;
  padded?: boolean;
  imageFit?: "contain" | "cover";
  objectPosition?: "top" | "center" | "bottom";
  tabletDecisionImageScale?: number;
  isMobile: boolean;
  className?: string;
}
```

---

### `CaseStudyImageCard`

**Path:** `components/case-study/CaseStudyImageCard.tsx`

```tsx
interface CaseStudyImageCardProps {
  src: string;
  className?: string;
  padded?: boolean;
  priority?: boolean;
  background?: "primary" | "secondary" | "light";
  aspect?: "wide" | "square" | "hero-mobile" | "hero-short" | "intrinsic" | "phone" | "pair";
  imageFit?: "contain" | "cover";
  desktopImageScale?: number;
  belowDesktopImageScale?: number;
  objectPosition?: "top" | "center" | "bottom";
  hoverRounded?: boolean;
}
```

Core image shell. Uses `next/image`. SVG → `unoptimized={true}`.

---

### `CaseStudyDualPhoneImage`

**Path:** `components/case-study/CaseStudyDualPhoneImage.tsx` (client)

```tsx
interface CaseStudyDualPhoneImageProps {
  images: [string, string];
  className?: string;
  variant?: "hero" | "decision";  // default "decision"
  priority?: boolean;
  tabletImageScale?: number;
}
```

---

### `CaseStudyPhoneCarousel`

**Path:** `components/case-study/CaseStudyPhoneCarousel.tsx` (client)

```tsx
interface CaseStudyPhoneCarouselProps {
  images: readonly string[];
  className?: string;
  imageFit?: "contain" | "cover";
  alts?: readonly string[];
  expandable?: boolean;
}
```

Constants: `GAP_PX = 12`, `SLIDE_PX = 345`, `TAP_MOVE_THRESHOLD_PX = 10`.

---

### `ExpandableDecisionAsset`

**Path:** `components/case-study/ExpandableDecisionAsset.tsx` (client)

```tsx
interface ExpandableDecisionAssetProps {
  src: string;
  children: ReactNode;
  className?: string;
}
```

Classes: `` `w-full cursor-zoom-in appearance-none border-0 bg-transparent p-0 text-left ${className}` ``

`aria-label="View design fullscreen"`

---

### `CaseStudyImageLightbox`

**Path:** `components/case-study/CaseStudyImageLightbox.tsx` (client)

```tsx
interface CaseStudyImageLightboxProps {
  images: readonly string[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}
```

Framer Motion overlay. Portal to `document.body`.

---

### `CaseStudyBodyParagraphs`

**Path:** `components/case-study/CaseStudyBodyParagraphs.tsx`

```tsx
{ text: string }
```

Splits on `\n\n` into `<p className="text-body text-text-on-light">`.

---

### `CaseStudyDivider`

**Path:** `components/case-study/CaseStudyDivider.tsx`

```tsx
interface CaseStudyDividerProps {
  orientation?: "vertical" | "horizontal";  // default "vertical"
  className?: string;
}
```

Vertical: `` `w-px shrink-0 self-stretch bg-case-study-divider ${className}` ``
Horizontal: `` `h-px w-full shrink-0 bg-case-study-divider ${className}` ``

---

### `CaseStudyProportionalImage`

**Path:** `components/case-study/CaseStudyProportionalImage.tsx`

Thin wrapper around `CaseStudyImageCard`. **Currently unused** in any route.

---

### Page chrome (not in `case-study/`)

| Component | Path | Case study usage |
|---|---|---|
| `Header` | `components/Header.tsx` | `variant="dark"`, `paddingClass="px-page-case-study"` |
| `Footer` | `components/Footer.tsx` | `paddingClass="px-page-case-study"` |
| `SiteNav` | `components/SiteNav.tsx` | `max-w-page`, nav links |
| `ExternalLinkArrow` | `components/ExternalLinkArrow.tsx` | Prototype CTA in title block |

---

## 4. Section margins, vertical rhythm, container widths

### Page-level wrapper

```tsx
<div className="case-study-page">
```

Mobile typography overrides scoped under `.case-study-page` in `globals.css`.

### Horizontal padding (case study pages)

Class: `px-page-case-study`

```css
/* globals.css */
--spacing-container-mobile: 24px;    /* default */
--spacing-container-tablet: 74px;  /* @media (min-width: 768px) */
--spacing-container-desktop: 100px;  /* @media (min-width: 1024px) */
--spacing-container-large: 200px;    /* @media (min-width: 1536px) */
```

### Content max-width

```tsx
// CaseStudyPageContainer
className="mx-auto w-full min-w-0 max-w-page"
```

```css
--width-page-max: 1312px;
```

Root layout also constrains: `className="mx-auto w-full max-w-viewport"` where `--width-viewport-max: 1920px`.

### Vertical section padding

Class: `py-case-study-section` / `pb-case-study-section`

```css
--spacing-case-study-section-mobile: 24px;   /* default */
--spacing-section-tablet: 40px;              /* @media (min-width: 768px) */
--spacing-section-desktop: 72px;             /* @media (min-width: 1024px) */
```

Hero section uses `pb-case-study-section pt-8` (not full vertical padding on top).

### Section-specific layout classes

| Section | Section wrapper | Inner layout |
|---|---|---|
| Hero | `bg-case-study-hero-bg px-page-case-study pb-case-study-section pt-8` | `CaseStudyPageContainer` |
| Context | `bg-light-bg px-page-case-study py-case-study-section` | `flex flex-col gap-10 min-[768px]:flex-row min-[768px]:items-start min-[768px]:justify-center min-[768px]:gap-16` |
| Pull quote | `bg-case-study-hero-bg px-page-case-study py-case-study-section` | `flex flex-col gap-10 min-[768px]:flex-row min-[768px]:items-center min-[768px]:gap-16` |
| Decision | `bg-light-bg px-page-case-study py-case-study-section` | See decision grid below |
| Constraints | `bg-light-bg px-page-case-study py-case-study-section` | `flex flex-col gap-10 min-[768px]:flex-row min-[768px]:items-start min-[768px]:justify-center min-[768px]:gap-16` |

### Title block (hero)

```tsx
className="flex flex-col gap-10 min-[768px]:flex-row min-[768px]:flex-wrap min-[768px]:items-start min-[1024px]:flex-nowrap min-[1024px]:items-center min-[1024px]:gap-case-study-title-gap"
```

```css
--spacing-case-study-title-gap: 100px;
```

Columns at ≥1024px:
- Left: `min-[1024px]:w-[60%] min-[1024px]:shrink-0`
- Metadata: `min-[1024px]:w-[40%] min-[1024px]:shrink-0` (hidden below 768px: `hidden … min-[768px]:flex`)

### Context / constraints columns

```tsx
// Product Context (tablet+ only)
className="hidden w-full min-[768px]:block min-[768px]:w-[40%]"

// Business Problem / constraints / takeaways
className="w-full min-[768px]:w-[40%]"
```

Section heading stack:

```tsx
className="flex flex-col gap-section-heading"
// gap-section-heading: 20px mobile → 24px @768px
```

Body offset: `mt-section-heading` (14px mobile → 16px @768px)

### Decision section grid

```tsx
// Outer
className="flex flex-col gap-case-study-decision-stack min-[768px]:flex-row min-[768px]:items-start min-[768px]:gap-10"

// Left column (eyebrow + title)
className="w-full shrink-0 min-[768px]:w-[30%]"

// Right column (beats)
className="w-full min-[768px]:w-[70%]"
```

Three-column beats at ≥1024px:

```tsx
className="flex flex-col gap-case-study-decision-beats min-[1024px]:flex-row min-[1024px]:items-stretch min-[1024px]:gap-decision-col-gap"
```

```css
--spacing-case-study-decision-eyebrow-gap: 12px;
--spacing-case-study-decision-beat-gap: 16px;
--spacing-case-study-decision-stack-gap: 24px;
--spacing-decision-col-gap: 64px;
```

Decision image top margin:

```tsx
className="mt-10 min-[768px]:mt-section"
```

> **Inconsistency:** `mt-section` is used but **no `.mt-section` utility is defined** in `globals.css` (unlike `py-section`). Only `mt-section-heading` exists. At ≥768px the intended margin may not apply. **Canonical intent:** match `py-section` desktop value (`72px`) — verify in DevTools.

### Image frame tokens

```css
--spacing-case-study-frame-inset-x-mobile: 24px;
--spacing-case-study-frame-inset-y-mobile: 24px;
--spacing-case-study-frame-inset-x: 40px;
--spacing-case-study-frame-inset-y: 40px;
--height-case-study-hero: 656px;
--height-case-study-image: 504px;
--width-constraints-column: 426px;   /* defined, not used in current components */
--spacing-constraints-gap: 164px;    /* defined, not used in current components */
--spacing-context-gap: 128px;        /* defined, not used in current components */
```

Aspect ratio utilities:

```css
.case-study-image-card              { aspect-ratio: 1312 / 504; }
.case-study-image-card-square       { aspect-ratio: 1 / 1; }
.case-study-image-card-hero-mobile  { aspect-ratio: 1312 / 656; }
.case-study-image-card-hero-short   { aspect-ratio: 342 / 300; }
.case-study-image-card-phone        { aspect-ratio: 315 / 600; }
.case-study-image-card-pair         { aspect-ratio: 636 / 690; }
.case-study-dual-phone-frame-hero   { aspect-ratio: 1312 / 656; }
.case-study-decision-phone-column   { aspect-ratio: 636 / 690; }
```

---

## 5. Type scale

Defined in `app/globals.css` `@theme` + `@layer utilities`.

| Role | Class | Desktop | Mobile (case study) |
|---|---|---|---|
| Page title (h1) | `text-title` | 48px / 48px lh, Crimson, `-0.02em` | 32px / 36px lh (`max-width: 767px`) |
| Section title (h2) | `text-callout` | 24px / 24px lh, Crimson, `-0.02em` | 17px / 22px lh (`.case-study-page`) |
| Body | `text-body` | 15px / 21px lh, Geist, `-0.3px` | 13px / 19px lh (`.case-study-page`) |
| Eyebrow / section label | `text-eyebrow` | 15px, Geist Mono, uppercase, `-0.02em` | 13px (`.case-study-page`) |
| Metadata label | `text-label-sm` | 13px, Geist Mono, uppercase, `-0.26px` | same |
| Metadata value | `text-body` | 15px Geist | 13px in case study |
| Nav | `text-nav` | 14px Geist, `-0.28px` | — |
| Wordmark | `text-wordmark` | 16px Crimson, `-0.32px` | — |
| Link emphasis | `text-link-medium` | 15px Geist medium | — |
| Pull quote | `text-callout` | on dark: `text-on-dark` | mobile callout scale |
| Section label (home) | `text-section-label` | 15px Geist Mono, uppercase, `-0.3px` | — |

Dark hero text: `text-on-dark` → `#fcfaf4`
Light body text: `text-text-on-light` → `#5b5855`
Muted: `text-text-muted` / `text-metadata-label` → `#99938e` / `#94908b`

---

## 6. Colour tokens

All in `app/globals.css` `@theme`:

```css
--color-light-bg: #fcfaf4;
--color-text-on-light: #5b5855;
--color-text-muted: #99938e;
--color-nav-link: #94908b;
--color-nav-link-hover: #5b5855;
--color-light-image-bg: #f7f4ed;
--color-case-study-divider: #f9f3ed;
--color-case-study-hero-bg: #22201d;
--color-case-study-hero-image-bg: #2d2b29;
--color-text-on-dark: #fcfaf4;
--color-photo-border: #fcfcfc;
--color-photo-shadow: rgba(91, 88, 85, 0.16);
```

Utility mappings:

| Token | Class |
|---|---|
| `--color-case-study-hero-bg` | `bg-case-study-hero-bg` |
| `--color-case-study-hero-image-bg` | `bg-case-study-hero-image-bg` (via component logic) |
| `--color-light-image-bg` | `bg-light-image-bg` |
| `--color-case-study-divider` | `bg-case-study-divider` |
| `--color-text-on-dark` | `text-on-dark` |

Image card backgrounds (`CaseStudyImageCard`):

```tsx
background === "secondary" ? "bg-case-study-hero-image-bg"
  : background === "light" ? "bg-light-image-bg"
  : "bg-case-study-hero-bg"                          // "primary"
```

---

## 7. Breakpoints and section behaviour

### Site breakpoints

| Breakpoint | Usage |
|---|---|
| `max-[495px]` / `min-[496px]` | Nav menu vs desktop links; card hover press |
| `max-[767px]` / `min-[768px]` | Primary mobile/desktop split (`useIsMobileViewport`) |
| `min-[1024px]` | Title 60/40, decision 3-column beats |
| `min-[1536px]` | Page padding → 200px |
| `xl:` (1280px) | Homepage sticky section label only |

### Hero image behaviour

| Condition | Behaviour |
|---|---|
| `isMobile && images.length >= 2` | `CaseStudyDualPhoneImage` variant `"hero"` |
| `heroIntrinsicAspect` + `heroMobile` | Mount gate → mobile SVG or desktop SVG |
| `heroIntrinsicAspect` (CBF Flo) | `aspect="intrinsic"`, width 1312×800 placeholder dims |
| `heroPadded: false` | No `case-study-frame-inset` (CBF Flo, Applatch, Homeward, Vendor Connect) |
| `heroPadded: true` | Inset applied (Propheski only) |

### Decision image behaviour

| `isMobile` | `imageArrangement` | Component path |
|---|---|---|
| `true` | any | `CaseStudyDualPhoneImage` → carousel on phone, columns on tablet+ |
| `false` | `"single"` (default) | `CaseStudyImageCard` wide/square; optional `mobileImage` swap |
| `false` | `"pair"` | Two `636/690` frames (Homeward ds3, Applatch all) |
| `false` | `"single-then-pair"` | Full-width + pair row (Homeward ds1) |

### Metadata visibility

```tsx
className="hidden … min-[768px]:flex"
```

Role / Team / Timeline **hidden on mobile** for all case studies.

### Product Context visibility

```tsx
className="hidden w-full min-[768px]:block min-[768px]:w-[40%]"
```

Product Context **hidden on mobile**; Business Problem always visible.

---

## 8. Scroll, animation, sticky, easing

### Scroll behaviours

- **No scroll-linked animations** on case study pages.
- **No sticky elements** on case study pages (sticky exists only on homepage `StickySection` at `xl:sticky xl:top-[69px]`).
- **Phone carousel** — native horizontal scroll with `scroll-snap-type`, infinite loop via scroll position jump (`CaseStudyPhoneCarousel`).
- **Lightbox open** — `document.body.style.overflow = "hidden"`.

### Framer Motion (lightbox only)

File: `CaseStudyImageLightbox.tsx`

Constants:

```tsx
const EASE = [0.22, 1, 0.36, 1] as const;
const DURATION = 0.28;
const SLIDE_DURATION = 0.35;
const SWIPE_THRESHOLD_PX = 48;
```

Overlay fade:

```tsx
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
transition={{ duration: DURATION, ease: EASE }}
```

Content scale:

```tsx
initial={{ opacity: 0, scale: 0.96 }}
animate={{ opacity: 1, scale: 1 }}
exit={{ opacity: 0, scale: 0.96 }}
transition={{ duration: DURATION, ease: EASE }}
```

Slide variants:

```tsx
const slideVariants = {
  enter: (direction: number) => ({
    x: direction >= 0 ? "70%" : "-70%",
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction >= 0 ? "-70%" : "70%",
    opacity: 0,
  }),
};
```

### CSS card hover (not Framer)

```css
.card-hover-press {
  border-radius: 0;
  transition: border-radius 480ms cubic-bezier(0.22, 1, 0.36, 1);
}
.card-hover-press-media {
  transition: transform 480ms cubic-bezier(0.22, 1, 0.36, 1);
}
@media (min-width: 496px) {
  .card-hover-press:hover { border-radius: 10px; }
  .card-hover-press:hover .card-hover-press-media { transform: scale(0.95); }
}
```

Applied via `hoverRounded` on decision/hero frames.

### Reduced motion

**No `prefers-reduced-motion` handling** in case study components or `globals.css` production code.

---

## 9. Image handling

### next/image config

`next.config.ts` is empty — no custom `images` config.

### SVG detection

```tsx
function isSvgSrc(src: string) {
  return src.split("?")[0]?.toLowerCase().endsWith(".svg") ?? false;
}
```

Used in: `CaseStudyImageCard`, `CaseStudyDualPhoneImage`, `CaseStudyPhoneCarousel`, `CaseStudyImageLightbox`.

### Loading strategy

| Asset | priority | lazy | Notes |
|---|---|---|---|
| Hero | `priority={true}`, `fetchPriority="high"` | no | Above fold |
| Decision frames | default | yes | Below fold |
| Lightbox | `priority` on open | — | Full-size re-render |
| Pull quote PNG | default | yes | `CaseStudyPullQuote` uses `fill` |

### sizes attribute

```tsx
// CaseStudyImageCard (wide / intrinsic)
sizes="(max-width: 1312px) 100vw, 1312px"

// Dual phone tablet
sizes="(max-width: 1023px) 40vw, 315px"

// Carousel
sizes="345px"

// Lightbox
sizes="100vw"
```

### Breakpoint asset mounting

Client hooks from `hooks/useMediaQuery.ts`:

```tsx
export function useIsMobileViewport(): boolean {
  return useMediaQuery("(max-width: 767px)");
}
```

Pattern: render placeholder until `useHasMounted()`, then mount correct asset. Prevents wrong file fetch but delays first real request until hydration.

### Video

**Not used on case study pages.** Homepage explorations use `<video>` in `PersonalExplorationsSection` only.

### Homepage card images (index)

Separate from case study page assets — see `data/home.ts` `homeCaseStudyCardImages`. Uses raw `<picture>` / `<img>` for some cards, not `CaseStudyImageCard`.

---

## 10. SEO / metadata / OG / slugs

### Root metadata only (`app/layout.tsx`)

```tsx
export const metadata: Metadata = {
  title: "Eniola Glory — Product Designer",
  description: "Personal portfolio site for Eniola Glory, product designer.",
  icons: { /* favicon-light.svg / favicon-dark.svg */ },
};
```

### Per-case-study metadata

**None.** `app/[slug]/page.tsx` does not export `generateMetadata`. All case study URLs share the same `<title>` and description.

### OG images

**Not implemented.** No `opengraph-image` route, no `metadata.openGraph.images`.

### Slug handling

- Slugs defined in each data file: `slug: "cbf-flo"`, `"applatch"`, `"homeward"`, `"vendor-connect"`, `"propheski"`.
- Route: `/[slug]` → `/cbf-flo`, etc.
- Invalid slug → `notFound()`.
- SSG: `generateStaticParams()` from `caseStudySlugs`.

---

## 11. Index / nav registration

### Case study index (homepage grid)

`data/home.ts`:

```tsx
export const homeCaseStudyOrder = [
  "cbf-flo",
  "applatch",
  "homeward",
  "vendor-connect",
  "propheski",
] as const;
```

Rendered by `components/home/CaseStudiesSection.tsx` → links to `/${study.slug}`.

### Data registry (route availability)

All slugs in `data/index.ts` `caseStudies` object get a route via `generateStaticParams`. Homepage order can differ from registry keys but currently includes all five.

### Nav menu

`components/NavMenu.tsx` — **no case study links**. Only `{resume}`, `{linkedin}`, `{github}`, email.

Case studies are reached via homepage cards or direct URL.

---

## 12. Accessibility patterns

### Present

| Pattern | Implementation |
|---|---|
| Lightbox dialog | `role="dialog"`, `aria-modal="true"`, `aria-labelledby` + `sr-only` title |
| Lightbox close / nav | `aria-label="Close fullscreen preview"`, `"Previous design"`, `"Next design"` |
| Expand buttons | `aria-label="View design fullscreen"` on `ExpandableDecisionAsset` |
| Carousel expand | `role="button"`, `tabIndex={0}`, keyboard Enter/Space |
| Decorative dividers | `aria-hidden` on `CaseStudyDivider` |
| Nav menu | `aria-expanded`, `aria-haspopup`, `role="menu"` |
| Mobile nav | `aria-label="Close menu"` |
| Comma separators | `aria-hidden` on hero skill commas (homepage) |

### Conventions / gaps

| Topic | Current state |
|---|---|
| **Alt text** | All case study product images use `alt=""` (decorative). No descriptive alts. |
| **Focus states** | Lightbox buttons use `active:scale-[0.97]` only; no visible `:focus-visible` ring on expand buttons. |
| **Reduced motion** | Not handled; Framer + CSS transitions always run. |
| **Pull quote** | Propheski has `hasPullQuote: true` but no `images.pullQuote` — section never renders (dead config). |
| **Color contrast** | Dark hero `#fcfaf4` on `#22201d` — generally good; metadata labels `#94908b` on `#22201d` — verify WCAG for small text. |

---

## 13. Cross-page inconsistencies & canonical choices

| Topic | CBF Flo (canonical) | Others | Recommendation |
|---|---|---|---|
| `isMobile` | `false` | Applatch, Propheski: `true` | Keep per product; drives carousel vs desktop frames |
| `heroPadded` | `false` | Propheski: `true` | **Canonical: `false`** for intrinsic heroes (CBF Flo, Homeward, Vendor Connect, Applatch) |
| `heroMobile` | yes | Applatch, Homeward, Vendor Connect, Propheski: no | Add only when mobile crop differs |
| `mobileImage` per decision | yes (all 3) | Vendor Connect: yes; Homeward/Applatch/Propheski: no | **Canonical for desktop studies:** provide `mobileImage` when layout differs |
| `desktopImageScale` | `0.85` on ds1, ds3 | Homeward/Vendor: all decisions; Applatch/Propheski: none on card path | **Canonical: `0.85`** where inset needed |
| `tabletDecisionImageScale` | not set | Applatch, Propheski: `0.85` | Apply to mobile-product studies only |
| `imageArrangement` | default `"single"` | Homeward: mixed; Applatch/Propheski: `"pair"` via dual phone | Data-driven — no single canonical |
| `constraintsTitle` | `"Designing Within Constraints"` | Homeward, Vendor Connect: `"Outcomes"` | **Canonical title pair:** Constraints + Takeaways (CBF Flo) |
| `hasPullQuote` | `false` | Propheski: `true` (broken — no image) | Fix Propheski image path or set `hasPullQuote: false` |
| Decision `explored` field | all decisions | Vendor Connect ds1: missing `explored` | **Canonical:** include all three beats when using `layoutVariant: "three-column"` |
| Title block layout | flex 60/40 @1024 | Same component everywhere | **Canonical:** `CaseStudyTitleBlock` |
| Page container | `max-w-page` (1312px) | Same | **Canonical** |
| Hero aspect | `heroIntrinsicAspect: true` | All complete studies | **Canonical** — avoid fixed `1312/656` letterboxing |
| Image component | `CaseStudyImageCard` + `next/image` | Same | **Canonical** |
| Metadata on mobile | hidden | Same | **Canonical** (intentional) |
| `mt-section` utility | used in decisions | undefined in CSS | **Fix gap:** use explicit `min-[768px]:mt-[72px]` or define `.mt-section` |

---

## 14. CBF Flo reference config (canonical)

```tsx
// data/cbf-flo.ts (key flags)
isMobile: false,
heroIntrinsicAspect: true,
heroPadded: false,
hasPullQuote: false,
tabletDecisionImageScale: undefined,
// decisions: layoutVariant "three-column", mobileImage on each, desktopImageScale 0.85 on ds1/ds3
```

Asset paths:

```
/case study/CBF FLO/Hero.svg          (hero desktop)
/case study/CBF FLO/cb hero m.svg      (hero mobile)
/case study/CBF FLO/Ds1.svg            (decision 1 desktop)
/case study/CBF FLO/cb ds1 m.svg       (decision 1 mobile)
/case study/CBF FLO/ds2.svg
/case study/CBF FLO/cb ds2 m.svg
/case study/CBF FLO/ds3.svg
/case study/CBF FLO/cb ds3 m.svg
```

---

## 15. Gallery sequence (`lib/caseStudyGallery.ts`)

Order for lightbox navigation:

1. Hero (mobile: `heroMobile` if viewport <768; dual-phone: both hero images if `isMobile`)
2. Each decision in array order, skipping `title === "Placeholder"`
3. Per decision: respects `imageArrangement`, `mobileImage`, `isMobile` product flag

CBF Flo desktop gallery = 4 images (hero + 3 decisions).

---

*End of spec.*

---

## Deferred cleanup

- **`.mt-section` utility** — Used in legacy decision sections (`CaseStudyDecisionSection`) but not defined in `globals.css`. Defining it would change spacing on all four existing case studies. CBF Flo v2 uses explicit `min-[768px]:mt-[72px]` instead. Define `.mt-section` in a dedicated spacing pass once legacy pages are audited.

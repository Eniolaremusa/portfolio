CURSOR.md — Portfolio Site

Read portfolio-prd.md in full before writing any code. This file is quick-reference only.

What this is
Personal portfolio site for a product designer. Next.js + Tailwind, deployed on Vercel. No CMS — content lives in local data files. Two page types: home (one page) and case study (repeated template, 4 instances).

Stack
Next.js (App Router)
Tailwind CSS
Framer Motion — for scroll-driven reveals and interaction animation. In scope for v1. Build static layout first, section by section; layer animation in once that section's structure is stable, not simultaneously.
Deploy: Vercel via GitHub
Naming — non-negotiable, check every time before writing copy or filenames
CBF Flo (not CBFlow)
Propheski (not Prophesikl)
Vendor Connect (not BoothMatch — retired name, never use)
Applatch

If you're about to write a product name and you're not 100% sure of the spelling above, stop and check this file again rather than guessing.

Typography
Crimson Text — titles (48px/48px/-2%) and callouts (24px/24px/-2%)
Geist — body text (15px/21px/-2%)
Geist Mono — 15px/-2%, used for metadata/eyebrow-style text (confirm exact placement against PRD section 4 as each section is built)
Set these up as shared Tailwind text utilities or a typography component immediately — do not hardcode font-size/line-height/letter-spacing inline per instance.
Typography
Use	Font	Size	Line height	Letter spacing
Titles	Crimson Text	48px	48px	-2%
Callouts	Crimson Text	24px	24px	-2%
Body	Geist	15px	21px	-2%
Eyebrow / section headers	Geist Mono	15px	—	-2%

Scale down responsively on smaller breakpoints — never ship desktop type sizes unchanged on mobile.

Colors
Light bg: 
#FFFEFB · text on light bg: 
#5B5855
Light image bg (e.g. Applatch images): 
#F7F4ED

Hard requirement, not a stretch goal. Mobile, tablet, desktop, and large-monitor breakpoints must all work cleanly. Build mobile-first.

Conventions
Container margin: 100px — full-bleed decision images sit within this margin
Constraints/Takeaways section: two fixed 426px columns, 164px gap
Desktop product hero/decision images (CBF Flo, Vendor Connect): single full-width rectangle
Mobile product hero/decision images (Applatch, Propheski): two side-by-side phone-sized rectangles instead of one wide rectangle — always check whether a case study is "desktop" or "mobile" before laying out its images
Header/footer are identical components, reused site-wide
Email link copies to clipboard with a ~2s "Copied" confirmation — does not open a mail client
Case study template order (do not vary per project except where noted)
Title block (title/description left, Role/Team/Timeline right)
Hero image
Context (two columns: Product Context / Business Problem)
Pull-quote image — CBF Flo and Propheski only. Skip for Applatch. TBD for Vendor Connect (check content status before building).
Design Decision 1, 2, 3 — each: eyebrow + reframed title, then either:
Three-column Explored / Rejected / Decided (default), or
Two-column Decided-only, when no genuine rejected alternative exists (e.g. Vendor Connect Decision 1) Never fabricate an "Explored" or "Rejected" beat that isn't in the source content — check the content file first. Full-bleed image after the text.
Constraints & Takeaways (two-column, fixed width)
Footer
Data-driven, not hardcoded-per-page

Each case study pulls from a per-project data object (title, role, team, timeline, image paths, decision content, isMobile flag, hasPullQuote flag, per-decision layout variant) into one shared layout component. Do not build four separate page layouts by hand. If you find yourself duplicating JSX across case study pages, stop and refactor into the shared template first.

Build order
Scaffold + deploy a blank page first, confirm the pipeline works end to end
Header/footer component (with clipboard-copy email)
Case study template component, built and proven against CBF Flo's content first (most complete)
Point Applatch and Propheski at the same template — adjust only the mobile image-slot variant and the pull-quote toggle
Add Vendor Connect once its content file is complete (currently missing constraints, takeaways, metadata — check content status before building this page)
Home page last, once all four case studies are live and linkable
Before you write any case study copy or content file

Check portfolio-prd.md section 7 (Content status) for what's actually confirmed vs. still open for that project. Do not invent metadata, constraints, or decisions that aren't in the source conten
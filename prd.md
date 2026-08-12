Portfolio Site — Product Requirements Document
1. Overview

A personal portfolio site for Eniola Glory, product designer. Replaces the current Framer-hosted site. Built in code (Next.js) to remove the recurring subscription cost and to demonstrate the "builds what she designs" positioning directly through the site itself.

Two page types:

Home page (single page, one URL)
Case study page (repeated template, one URL per project)

Out of scope for v1: CMS, blog, contact form, dark/light mode toggle.

In scope: interaction and scroll-driven animations (Framer Motion) — not limited to basic scroll reveals.

Responsiveness is a hard requirement, not a stretch goal. Every page must work cleanly across mobile, tablet, desktop, and large monitor breakpoints. Build mobile-first; do not treat responsive behavior as a pass done at the end.

Scroll-driven and interaction animations are in scope — not deferred. See section 4 for animation notes.

2. Tech stack
Framework: Next.js (App Router)
Styling: Tailwind CSS
Animation: Framer Motion (for scroll-driven reveals, once base layout is stable)
Deployment: Vercel, connected to GitHub for auto-deploy on push
Content: Hardcoded in MDX or local JSON/TS data files for v1. No CMS. Revisit only if update frequency becomes painful.
Images/video: Stored in /public, served statically. Video for personal explorations either self-hosted (small files) or linked out (embed thumbnail, click-through to external prototype).
Domain: eniola.design, pointed at Vercel.

No monthly cost beyond the existing domain registration.

3. Typography
Use	Font	Size	Line height	Letter spacing
Titles	Crimson Text	48px	48px	-2%
Callouts	Crimson Text	24px	24px	-2%
Body text	Geist	15px	21px	-2%
Eyebrow text / section headers (e.g. "Case Studies," "Personal Exploration")	Geist Mono	15px	—	-2%

All sizes above are desktop reference values — scale down responsively for smaller breakpoints per section 4's responsiveness requirement; do not ship the 48px title at that size on mobile unchanged.

4. Color system
Token	Hex	Usage
Light background	
#FFFEFB	Default page background (home page, light sections)
Text on light bg	
#5B5855	Body text color on light backgrounds
Light image background	
#F7F4ED	Background behind images on light sections (e.g. Applatch case study images)
Case study hero background	
#22221D	Only used for the hero background on case study pages 
Case study hero image background	
#2D2B29	Only used behind the hero image on case study pages — not a general dark background token, do not reuse elsewhere


5. Confirmed product names — use exactly these, everywhere
CBF Flo (not CBFlow)
Propheski (not Prophesikl)
Vendor Connect (two words, not BoothMatch — BoothMatch was an earlier working name, retired)
Applatch
6. Global elements
Header (repeats identically in footer)
Left: name/wordmark, links to home
Right: four links — Resume (opens PDF), LinkedIn (external), GitHub (external), Email
Email behavior: click copies address to clipboard, shows a brief inline "Copied" confirmation (~2s), does not open a mail client.
Typography

Two type families, used consistently across home and case study pages:

Crimson Text — titles and callouts

Titles: 48px / 48px line-height / -2% letter-spacing
Callouts: 24px / 24px line-height / -2% letter-spacing

Geist — body text

15px / 21px line-height / -2% letter-spacing

Geist Mono — used where noted (e.g. metadata labels, eyebrows — confirm exact usage per section as built)

15px / -2% letter-spacing

Set these as reusable Tailwind text style utilities (or a shared typography component) rather than repeating raw values inline, so a spacing/size change only needs updating in one place.

Colors

See section 4 for the full color system. Quick reference:

Home page / light sections: 
#FFFEFB background, 
#5B5855 text
Case study hero background only: 
#22221D
Light image background (e.g. Applatch images): 
#F7F4ED
Animation

In scope for v1 (not deferred): scroll-driven reveals and interaction animations, using Framer Motion. Build static layout first, section by section, then layer in animation once a page's structure is stable — don't build animation and layout simultaneously.

Layout constants
Container margin: 100px (used for full-bleed decision images within the container)
Constraints/Takeaways two-up: fixed width 426px each, 164px gap between
7. Home page structure

Single scrolling page, sections in order:

Header (see Global elements)
Hero
Left: intro copy (name, headline, one-paragraph bio)
Right: two images of self, layered/offset for depth
Case studies
2×2 grid (2 rows, 2 columns)
Slots: CBF Flo, Applatch, Propheski, Vendor Connect
Each card: static hero image, title, one-line description
Click through to case study page
Personal explorations
Video embeds (stock purchase interaction, document extractor, others as built)
Title text links out to the external live prototype
Distinct visual treatment from case study cards
Hobbies
Four images, no case-study framing, purely personal/human section
Footer (identical structure to header)
8. Case study page structure

Repeats per project (CBF Flo, Applatch, Propheski, Vendor Connect).

Header (global)
Title block
Left: case study title + one-line description
Right: metadata — Role, Team, Timeline (stacked, small caps per existing pattern)
Hero image
Desktop products (CBF Flo, Vendor Connect): single full-width rectangular image
Mobile products (Applatch, Propheski): two side-by-side rectangular slots sized for phone screens, not one stretched rectangle
Context section (two columns)
Left: Product Context
Right: Business Problem
Pull-quote image (CBF Flo and Propheski only — not Applatch; Vendor Connect TBD)
Full-bleed image with an overlaid callout quote
Design Decision 1 (repeats identically for Decisions 2 and 3)
Callout/eyebrow text (decision number + reframed title)
Three columns: Explored → Rejected → Decided
Note: not every decision has a genuine "Explored/Rejected" beat (e.g. Vendor Connect's ratings decision is Decided-only) — do not fabricate a rejected alternative where none existed. Use a two-column Decided-only layout for those cases rather than forcing three columns.
Full-bleed image below, filling the container at the 100px margin
Mobile products: image area splits into two side-by-side phone-sized slots instead of one wide image
Constraints & Takeaways
Two fixed-width columns (426px each, 164px gap), side by side
Left: Constraints, Right: Takeaways/Outcomes
Footer (global)
9. Content status
Case study	Copy status	Images status
CBF Flo	Written, following full template	In progress
Applatch	Written, following full template (no pull-quote section)	In progress
Propheski	Written; needs metadata (role/team) corrected	In progress
Vendor Connect	Drafted — Decision 1 (ratings) is Decided-only, no rejected alternative; Decisions 2 and 3 have full Explored/Rejected/Decided; Constraints and Takeaways still open	Not started
10. Open items (do not block build on these)
Vendor Connect metadata. Role, team, and timeline not yet confirmed.
Vendor Connect Constraints & Takeaways. Not yet written.
Vendor Connect pull-quote section. Decide whether it applies (currently marked TBD).
OnarVo as a possible 5th/alternate case study. Under review — some parts of the product may be too dated to show; front-end-only framing may still be usable.
Final naming grep. Before launch, search the whole codebase and all copy for any stray "CBFlow," "Prophesikl," or "BoothMatch" and correct.

11. Build sequencing (recommended)
Scaffold Next.js + Tailwind project, deploy a blank page to Vercel to confirm the pipeline works end to end.
Build global Header/Footer component (with copy-to-clipboard email) once — reused everywhere.
Build the case study template as a single reusable component/layout, driven by a per-project data file (title, role, team, timeline, images, decision content, isMobile flag, hasPullQuote flag, decision layout variant [3-column vs 2-column]). Build CBF Flo first since its content is most complete.
Point Applatch and Propheski at the same template once it's proven, adjusting only the mobile image-slot variant and the pull-quote toggle.
Add Vendor Connect once its remaining content (constraints, takeaways, metadata) is filled in.
Build the home page last, once all four case studies are live and linkable.
Resolve open items and run the final naming pass before launch.
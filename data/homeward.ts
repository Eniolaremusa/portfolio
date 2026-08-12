import type { CaseStudy } from "./types";

const assetBase = "/case study/Homeward";

export const homeward: CaseStudy = {
  slug: "homeward",
  title: "Homeward Healthcare",
  description:
    "A coordination platform for clinical home care, helping agencies manage patient intake, staff assignment, and medication monitoring without spreadsheets and group texts.",
  eyebrow: "HOMEWARD HEALTHCARE CASE STUDY",
  headline: "Coordination platform for clinical home\u00A0care.",
  intro:
    "Homeward Healthcare is a coordination platform for clinical home care. It helps private agencies manage patient intake, staff assignment, and medication monitoring so qualified nurses can deliver care in the home, without relying on spreadsheets, group texts, and memory.",
  role: "Design Engineer",
  team: "Solo",
  timeline: "1 week",
  images: {
    hero: [`${assetBase}/Home hero.svg`],
  },
  productContext:
    "I deal with migraines, and there have been days I physically couldn't get myself to a hospital for an injection I needed, not because the care wasn't available, but because getting there wasn't possible.\n\nThat pointed me toward something real: for people who are elderly, post-surgical, or living with physical disabilities, the gap between needing clinical care and being able to access it isn't a minor inconvenience, it plays out daily.\n\nThe answer isn't just sending nurses to homes, it's making the coordination behind that reliable enough to function at scale. This is a self-directed project designing that coordination layer.",
  businessProblem:
    "Private home care agencies manage patients with real medical needs, post-surgical wound care, IV therapy, physiotherapy, chronic disease management, delivered by qualified nurses across a city.\n\nThe people running that day to day are coordinators, and most are doing it on spreadsheets, group texts, and memory. Every decision, who to send, when, with what information, carries real clinical weight, and none of the tools built for it reflect that.",
  decisions: [
    {
      eyebrow: "DESIGN DECISION 01",
      title: "Rebuilding patient intake",
      explored:
        "A single long intake form capturing identity, emergency contacts, insurance, and care preferences all at once.",
      rejected:
        "A long form front-loads friction before any clinical work begins, and for a coordinator often filling this in under time pressure, one undifferentiated form invites errors and abandonment.",
      decided:
        "A three-step intake, identity, emergency contacts, then insurance and care preferences, matching how a coordinator actually gathers this information.",
      layoutVariant: "three-column",
      imageArrangement: "single-then-pair",
      image: `${assetBase}/Home ds1a.svg`,
      imageSecondary: `${assetBase}/Home ds1b.svg`,
      imageTertiary: `${assetBase}/Home ds1c.svg`,
      desktopImageScale: 0.85,
    },
    {
      eyebrow: "DESIGN DECISION 02",
      title: "Assigning staff with real constraints visible",
      explored:
        "A simple staff list a coordinator could scroll and pick from.",
      rejected:
        "Assigning care isn't just about who's free, it's about distance, skill match, and route impact. A flat list hides all of that.",
      decided:
        "A three-column, map-assisted screen, patient requirements left, interactive map center, staff recommendations right. Clicking a staff member highlights them on the map and expands their card to show distance, skills, and route impact before committing.",
      layoutVariant: "three-column",
      imageArrangement: "single",
      image: `${assetBase}/Home ds2.svg`,
      desktopImageScale: 0.85,
    },
    {
      eyebrow: "DESIGN DECISION 03",
      title: "Redesigning medication monitoring",
      explored:
        "A dense table version designed for a similar problem years earlier, one row per medication entry.",
      rejected:
        "Returning to it, the table didn't give a one-glance read of what was happening, too much was buried in identical-looking rows.",
      decided:
        "Grouped by medication, with each dose tracked individually and tagged by status (Taken, Refused, Missed). The improvement in pattern recognition was significant.",
      layoutVariant: "three-column",
      imageArrangement: "pair",
      image: `${assetBase}/Home ds3a.svg`,
      imageSecondary: `${assetBase}/Home ds3b.svg`,
      desktopImageScale: 0.85,
    },
  ],
  constraints:
    "This is a self-directed project, so there's no live usage to report.",
  constraintsTitle: "Outcomes",
  takeaways:
    "What it reinforced: healthcare coordination isn't only about patient care, it's about operational clarity, connecting information, logistics, staffing, and continuity across the full care lifecycle.\n\nThe medication redesign taught me something I still apply: revisiting your own past work with fresh eyes is often where the real improvement is found.",
  takeawaysTitle: "Learnings",
  isMobile: false,
  /** Same as CBF Flo: container height follows the asset — no fixed-frame letterboxing */
  heroIntrinsicAspect: true,
  /** Flush edge-to-edge like Vendor Connect — no case-study-frame-inset on hero */
  heroPadded: false,
  prototypeUrl: "https://homeward-healthcare.vercel.app",
  hasPullQuote: false,
};

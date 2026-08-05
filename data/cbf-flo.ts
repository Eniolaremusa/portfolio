import type { CaseStudy } from "./types";

export const cbfFlo: CaseStudy = {
  slug: "cbf-flo",
  title: "CBF Flo",
  description:
    "An all-in-one platform that helps cleaning companies manage scheduling, staff, customers, payroll, and day-to-day operations from a single system.",
  eyebrow: "CBF FLO CASE STUDY",
  headline: "Operations platform for commercial cleaning businesses.",
  intro:
    "CBF Flo helps commercial cleaning companies manage scheduling, staffing, payroll, customer relationships, and day-to-day field operations from a single platform. It replaces the stitched-together spreadsheets & disconnected tools most cleaning companies run on.",
  role: "Founding Product designer",
  team: "Founder & 2 engineers",
  timeline: "7 months",
  images: {
    hero: ["/case study/CBF FLO/Hero.svg"],
    pullQuote: "/images/cbf-flo/pull-quote-map.png",
  },
  productContext:
    "When I joined CBF Flo, there wasn't a product to redesign, there wasn't a product yet.\n\nThe founder had deep domain expertise but no product documentation, or existing workflows. My role wasn't to only design interfaces, but to help define what the product should become, identify which operational problems mattered most, and turn those into a cohesive platform.\n\nOver seven months, we designed an operations platform spanning scheduling, CRM, hiring, payroll, and mobile experiences for field workers that serves 3 main users; back office staff, clients and cleaners.",
  businessProblem:
    "Cleaning businesses don't struggle because they lack scheduling software. They struggle because assigning a cleaner isn't a scheduling decision, it's an operational one.\n\nA scheduler weighs roughly eight factors, availability, drive time, capacity, efficiency, grade, level, revenue, and payroll, quickly, many times a day. All of that data already existed in the system. It just wasn't decidable.\n\nThe goal became to help managers understand the consequences of assignments.",
  pullQuote:
    "This case study focuses on scheduling,\nthe hardest and most central problem in the product.",
  decisions: [
    {
      eyebrow: "DESIGN DECISION 01",
      title: "How I reframed scheduling as decision support.",
      explored:
        "The existing view showed each cleaner's current efficiency, drive time, and capacity, useful information, but static. A scheduler could see who was available, not what assigning them would actually do",
      rejected:
        "Displaying more raw metrics on the card, more numbers, more granularity, would have made the decision harder, not easier, adding noise without adding a way to compare options.",
      decided:
        "Each card shows current state next to projected state: assign this job, and efficiency moves from 96.7% to 97%, drive time from 30 to 38 minutes, revenue from $289 to $391. A day timeline highlights exactly where the new job lands in that cleaner's route. The manager sees the consequence before committing, not after.",
      layoutVariant: "three-column",
      image: "/case study/CBF FLO/Ds1.svg",
      mobileImage: "/case study/CBF FLO/cb ds 1 m.svg",
      desktopImageScale: 0.85,
    },
    {
      eyebrow: "DESIGN DECISION 02",
      title: "One view can't answer every question",
      explored:
        "Relying on a single, information-dense view (or on the map alone) to answer every scheduling question.",
      rejected:
        "Cramming everything into one view. Different questions (what's scheduled, who has room, where is everything) need different representations, not more density on one screen.",
      decided:
        "Three coordinated views. Then, as a supporting beat within \"map,\" mention the colour shift specifically, assigned/unassigned to live status, as the reasoning behind that view once you'd decided it needed to exist.",
      layoutVariant: "three-column",
      image: "/case study/CBF FLO/ds2.svg",
      mobileImage: "/case study/CBF FLO/cb ds 2 m.svg",
    },
    {
      eyebrow: "DESIGN DECISION 03",
      title: "Designing against context switching",
      explored:
        "Cleaners received client details and route information verbally or through separate messages before a job. Sales managers manually looked up new client addresses to understand the property before onboarding.",
      rejected:
        "Both problems could have been solved by better documentation or training. Neither would have removed the actual cost, which was people leaving the app, or leaving the conversation, to go find information elsewhere.",
      decided:
        "Cleaners get their full day mapped, home to each appointment and back, with complete client context embedded at every stop, the same details the back office sees. For sales, a Zillow integration auto-fills property details, bedrooms, bathrooms, square footage, from an address, so onboarding a new client no longer means manual lookup mid-conversation.",
      layoutVariant: "three-column",
      image: "/case study/CBF FLO/ds3.svg",
      mobileImage: "/case study/CBF FLO/cb ds 3 m.svg",
      desktopImageScale: 0.85,
    },
  ],
  constraints:
    "The product was built on Bubble, a no-code platform, which couldn't render the map interactions we needed. Rather than ship a degraded version, we scoped the requirement properly and brought in a developer to build a custom map plugin.\n\nDesign direction wasn't always my call alone. I wanted more colour differentiation across the analytics views; the founder held to the brand's pink palette. We compromised on tonal variation within pink rather than introducing new hues, a reminder that not every disagreement is worth winning outright.",
  constraintsTitle: "Designing Within Constraints",
  takeaways:
    "In enterprise design, context is everything. The goal is giving the user as much context as they need to act, without overwhelming them, which was the tension running through every decision here.\n\nAnd finally actionable data should always take precedence over informational data, this reduces the chances of choice fatigue.",
  takeawaysTitle: "Takeaways",
  isMobile: false,
  heroIntrinsicAspect: true,
  hasPullQuote: false,
};

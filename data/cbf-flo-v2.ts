import type { CaseStudyV2 } from "./cbf-flo-v2-types";

const asset = (filename: string) => `/images/cbf-flo new/${filename}`;

export const cbfFloV2: CaseStudyV2 = {
  slug: "cbf-flo",
  title: "CBF Flo",
  hero: {
    eyebrow: "CBF FLO CASE STUDY",
    headline:
      "Cutting estimate creation from 60 minutes to 15 for a B2B cleaning software",
    intro:
      "I rebuilt how a lead becomes a priced, scheduled, paid customer for commercial cleaning companies",
    role: "Founding Product designer",
    team: "Founder & 2 engineers",
    timeline: "6 months",
    industry: "Enterprise B2B, Field service",
    heroImage: asset("CBF HERO.png"),
    heroAlt:
      "CBF Flo business overview dashboard showing revenue forecasts, service breakdowns, and operational KPIs",
    heroWidth: 1920,
    heroHeight: 1074,
  },
  quickSummary: {
    title: "Quick Summary - If you’re in a rush",
    columns: [
      {
        label: "HIGHLIGHTS",
        items: [
          "Solo designer, no existing brief, scope was defined directly with the founder",
          "Caught a scheduling bug in QA where the ranking logic for cleaners didn't match the underlying data",
          "Turned a rejected pricing proposal into a shipped feature by pinpointing the exact usability problem it fixed",
        ],
      },
      {
        label: "SOLUTIONS",
        items: [
          "Automated the two most repetitive manual steps: property lookup and price calculation",
          "Turned scheduling into a recommendation, not an automatic decision",
          "Replaced ad hoc payment chasing with a configurable reminder sequence",
        ],
      },
      {
        label: "IMPACT",
        items: [
          "Up to 66% faster estimate creation",
          "20% fewer same-day reassignments",
          "Payroll cycle reduced from several hours → 1–2 hrs",
        ],
      },
    ],
  },
  businessProblem: {
    title: "CBF FLO’s business problem",
    problems: [
      { text: "Manual data entry delayed property pricing." },
      { text: "Estimates were priced differently depending on who wrote IT" },
      { text: "Managers scheduled cleaners without proper visibility." },
      {
        text: "Failed payments & missed check-ins caused endless support tickets",
      },
    ],
    solutions: [
      { text: "Automate data lookup, price calculation wherever possible." },
      { text: "Streamline pricing model with necessary flexibility." },
      { text: "Surface the right data for managers to improve visibility." },
      { text: "Design for failure states as much as possible." },
    ],
  },
  research: {
    title: "Research - How did we figure out what to build for the users?",
    primaryResearch:
      "Interviews with the people running the business day to day; sales, scheduling and finance over 3 weeks in April 2025. Turned their insights into these three personas below.",
    secondaryResearch:
      "Looked at how existing cleaning-ops and field-service tools like maid central handled maps and availability, to see what to borrow & what to avoid.",
    personas: [
      {
        label: "SALES MANAGER",
        image: asset("sales manager.png"),
        alt: "Illustrated persona of a sales manager holding a phone",
        width: 715,
        height: 356,
        pain: "Pain — gathers property details and calculates price by hand for every estimate.",
        consequence:
          "Consequence — quotes take 30–60 minutes and vary depending on who wrote them.",
        need: "Need — the system pulls the data and prices the job consistently.",
      },
      {
        label: "SCHEDULE MANAGER",
        image: asset("schedule manager.png"),
        alt: "Illustrated persona of a scheduling manager reviewing a map",
        width: 715,
        height: 356,
        pain: "Pain — holds availability, capacity and drive time in their head for every assignment.",
        consequence:
          "Consequence —  bad assignments surface the morning of, forcing same-day fixes.",
        need: "Need —see availability, capacity, and drive time together, but still make the final call themselves",
      },
      {
        label: "FINANCE MANAGER",
        image: asset("finance manager.png"),
        alt: "Illustrated persona of a finance manager reviewing payment records",
        width: 715,
        height: 356,
        pain: "Pain — reconciles scheduled vs. actual time by hand, and chases failed payments with no set process.",
        consequence:
          "Consequence —  payroll takes hours per cycle; failed payments become open-ended risk.",
        need: "Need — a staged payout process and a configurable response to non-payment.",
      },
    ],
  },
  productStrategy: {
    title: "Product Strategy - Deciding what was needed for Phase 1",
    phase1: {
      title: "Phase 1",
      items: [
        "Lead intake & light automation",
        "Estimate creation (Zillow-integration)",
        "Master pricing model",
        "Scheduling & map decision support",
        "Service visit check-in (incl. failure states)",
        "Payment collection & failure handling",
        "Payroll validation → QuickBooks",
      ],
    },
    phase2: {
      title: "Phase 2",
      items: [
        "Inventory & supplies management",
        "Social media management",
        "Deeper finance beyond payroll push",
        "AI-assisted features",
      ],
    },
    desktopImage: asset("Product strategy web.png"),
    mobileImage: asset("Product strategy mobile.png"),
    alt: "Product strategy scope card comparing Phase 1 and Phase 2 deliverables",
    desktopWidth: 1224,
    desktopHeight: 720,
    mobileWidth: 706,
    mobileHeight: 918,
  },
  roleFlowsIntro: {
    title: "Creating the new system flow by designing for each role. .",
    description:
      "Three personas, one shared customer journey. Tradeoffs, constraints and edges cases live inside each one.",
  },
  roles: [
    {
      title: "Sales Manager",
      description:
        "The sales manager’s job is to turn a qualified lead into a signed, priced customer as quickly and consistently as possible. Two bottlenecks dominated: gathering property data and producing a reliable price.",
      flowImage: asset("sales flow.png"),
      flowAlt:
        "Flow diagram for the sales manager role from lead call through Zillow property lookup, automated pricing, and estimate delivery",
      flowWidth: 1782,
      flowHeight: 1008,
      impactLine:
        "Estimate creation: 30–60 min → 15–20 min · pricing error down 20%",
      decisions: [
        {
          title: "Property data gathered by hand, every time",
          body: "Every estimate required square footage, rooms, and stories. Looking that up manually cost roughly ten minutes before pricing could begin. So we integrated Zillow for a faster workflow.",
          tradeoffCallout:
            "Tradeoff: When Zillow has nothing: a clean manual-entry path opens instead of a dead end. The system never blocks the sales manager.",
          options: [
            {
              label: "OPTION 1",
              text: "Improve manual entry with better UX. Reliable, but still involves minutes of work we were trying to remove.",
            },
            {
              label: "OPTION 2",
              text: "Decision: Zillow integration, with a manual fallback that never blocks the estimate",
              isDecision: true,
            },
          ],
          images: [
            {
              src: asset("Property data 2.png"),
              alt: "Estimate form with Zillow auto-populated property details including square footage and room counts",
              width: 1180,
              height: 1260,
            },
            {
              src: asset("Property data 1.png"),
              alt: "Estimate form manual property entry workflow when Zillow data is unavailable",
              width: 1180,
              height: 1260,
            },
          ],
          imageCaption:
            "Slide 1 with zillow integrations, slide 2 with manual workflow",
        },
        {
          title: "Moving pricing out of people's heads",
          body: "The same job could be quoted differently depending on who wrote the estimate. A master pricing model now calculates a consistent price from property and service attributes.",
          tradeoffCallout:
            "Tradeoff: Standardized logic made the table denser → color coding added as secondary affordance to preserve context while scrolling",
          options: [
            {
              label: "OPTION 1",
              text: "Hard-code every price combination — rigid, breaks the first time a rate changes",
            },
            {
              label: "OPTION 2",
              text: "Decision: Configurable master pricing model, calculated from property and service attributes",
              isDecision: true,
            },
          ],
          images: [
            {
              src: asset("Moving pricing.png"),
              alt: "Master square-foot pricing table with color-coded service tiers and rate columns",
              width: 2512,
              height: 1260,
            },
          ],
        },
      ],
    },
    {
      title: "Scheduling  Manager",
      description:
        "Assigning a cleaner is not one decision. It is availability, capacity, drive time, and efficiency considered together. Managers were holding all of it in their heads and correcting bad assignments the morning of the job.",
      flowImage: asset("schedule flow.png"),
      flowAlt:
        "Flow diagram for the scheduling manager role showing appointment assignment paths via form or map with projected cleaner metrics",
      flowWidth: 1782,
      flowHeight: 1008,
      impactLine: "Same-day reassignments down 20%",
      decisions: [
        {
          title: "Turning operational data into decision support",
          body: "Every estimate required square footage, rooms, and stories. Looking that up manually cost roughly ten minutes before pricing could begin. So we integrated Zillow for a faster workflow.",
          tradeoffCallout:
            "Tradeoff: surfacing every matched cleaner with five projected metrics can turn a fast decision into a harder one due to choice fatigue",
          options: [
            {
              label: "OPTION 1",
              text: "Auto-assign the top-ranked cleaner; removes context managers actually have, like a client relationship",
            },
            {
              label: "OPTION 2",
              text: "Decision: Rank and surface the variables, leave the cleaner assignment to the manager.",
              isDecision: true,
            },
          ],
          images: [
            {
              src: asset("Operational data.png"),
              alt: "Scheduling interface comparing before and after states with projected cleaner metrics for assignment decisions",
              width: 1568,
              height: 1261,
            },
          ],
        },
        {
          title: "The same filter, rebuilt every morning",
          body: "Managers face different scenarios throughout the week; under-capacity cleaners, jobs clustered in one zone, tight drive-time windows, end-of-day returns home. Rebuilding the same filters every time was pure friction.",
          decisionCallout:
            "Decision: Let managers name and save their own filtered views, reused on demand",
          tradeoffCallout:
            "Tradeoff: Saved views added a level of interface complexity in exchange for removing repeated daily setup.",
          images: [
            {
              src: asset("same filter 1.png"),
              alt: "Map scheduling view with filter panel and route metrics for available cleaners",
              width: 2000,
              height: 1302,
            },
            {
              src: asset("same filter 2.png"),
              alt: "Save view modal for naming and reusing a filtered scheduling map configuration",
              width: 1802,
              height: 1512,
            },
          ],
        },
      ],
    },
    {
      title: "Finance  Manager",
      description:
        "A signed estimate is not revenue until the charge succeeds. A completed visit is not a paycheck until the data has been validated. Both needed designed states, not support tickets.",
      flowImage: asset("Finance flow.png"),
      flowAlt:
        "Flow diagram for the finance manager role covering payment collection, validation, payroll batching, and QuickBooks export",
      flowWidth: 1782,
      flowHeight: 1008,
      impactLine: "Payroll processing: several hours → 1–2 hrs per cycle",
      decisions: [
        {
          title: "Failed payments had no consistent follow-up",
          body: "Failure had to be a first-class path. Different businesses also tolerate different levels of risk, so the response could not be a single hard-coded rule.",
          tradeoffCallout:
            "Tradeoff: one hard rule is simpler; a configurable one respects different risk tolerance",
          options: [
            {
              label: "OPTION 1",
              text: "Cancel future bookings automatically on any failure; punishes a one-off card issue the same as a real non-payer",
            },
            {
              label: "OPTION 2",
              text: "No automated action, flag for manual follow-up; back to the manual burden this was meant to remove",
            },
            {
              label: "OPTION 3",
              text: "Decision: Configurable reminder sequence, then cancel or allow limited unpaid visits",
              isDecision: true,
            },
          ],
          images: [
            {
              src: asset("Failed payments.png"),
              alt: "Failed payment settings with configurable reminder sequence and reactivation rules",
              width: 2440,
              height: 1356,
            },
          ],
        },
        {
          title: "Payroll — messy data to validated payout",
          body: "Scheduled time, actual time, revenue, and tips all come from the same visit record. None of it could skip review before money moved.",
          decisionCallout:
            "Decision: batch-validate appointments before payout, instead of single processing",
          tradeoffCallout:
            "Tradeoff: faster than line-by-line review, but still needs a manager's sign-off before it reaches QuickBooks,",
          images: [
            {
              src: asset("Payroll.png"),
              alt: "Payroll validation screen listing unvalidated appointments before batch export to QuickBooks",
              width: 2444,
              height: 1248,
            },
          ],
        },
      ],
    },
  ],
  impactStats: {
    title: "What changed",
    stats: [
      { value: "66%", label: "Faster estimate creation" },
      { value: "20%", label: "decrease in Same-day reassignments" },
      { value: "1-2hrs", label: "faster payroll per cycle" },
      { value: "20%", label: "pricing errors & rework" },
    ],
  },
};

import type { OnarvoDesk } from "./onarvo-desk-types";

const asset = (filename: string) => `/images/Onarvo desk/${filename}`;

export const onarvoDesk: OnarvoDesk = {
  slug: "onarvo-desk",
  title: "Onarvo Desk",
  description:
    "Rebuilding Onarvo Front Desk from a basic ticket list into a full-context agent workspace with AI and automation support for a 30+ person care company.",
  hero: {
    eyebrow: "ONARVO FRONT DESK CASE STUDY",
    headline: "Cut average first response time from 4 hours to 1.5 hours",
    intro:
      "Rebuilding Onarvo Front Desk from a basic ticket list into a full-context agent workspace with in-app communication, metrics, AI and automation support for a 30+ person care company.",
    role: "Product designer",
    team: "PM + engineering",
    timeline: "3 weeks",
    industry: "B2B, Care operations",
    heroImage: asset("onarvo hero.png"),
    heroAlt:
      "Onarvo Front Desk ticket workspace showing conversation thread, AI summary, and context panel",
    heroWidth: 2102,
    heroHeight: 1200,
  },
  quickSummary: {
    title: "Quick Summary - If you're in a rush",
    columns: [
      {
        label: "GOALS",
        variant: "neutral",
        items: [
          "Full context while agents reply",
          "Clear ownership and history",
          "Safe automation managers can control",
          "Keep the system simple for non-technical users",
        ],
      },
      {
        label: "SOLUTIONS",
        variant: "solutions",
        items: [
          "A two column conversation-plus-context layout",
          "Related tickets + team-scoped privacy",
          "Macros + conditional workflows",
          "AI summaries and basic reporting",
        ],
      },
      {
        label: "RESULTS",
        variant: "results",
        items: [
          "62% faster first response time",
          "Resolution time down from 3 days to 2",
          "Overdue tickets down from 23% to 9%",
        ],
      },
    ],
  },
  beforeAfter: {
    title: "The earlier Front Desk",
    subtitle:
      "Here's what changed underneath everything else in this case study.",
    beforeLabel: "What agents could not do",
    afterLabel: "REDESIGNING FOR Agent CONTEXT + automation",
    before: [
      { text: "Single-column ticket details view" },
      { text: "No in-ticket conversation or reply" },
      { text: "No macros, no workflows. Every action was manual" },
      {
        text: "No reporting at all. No way to see response time, volume, or anything else",
      },
      { text: "No related tickets, no AI summary" },
    ],
    after: [
      { text: "Two-column layout (conversation + persistent context)" },
      { text: "Live conversation with reply, AI summary" },
      { text: "Workflows (conditional) + Macros (one-click)" },
      { text: "Team-scoped visibility for privacy" },
      {
        text: "Reporting on response time, resolution, and overdue tickets",
      },
    ],
    screenshot: {
      src: asset("earlier front desk.png"),
      alt: "V1 single-column ticket details view in Onarvo Front Desk",
      width: 1902,
      height: 1264,
      caption: "V1 - Single-column ticket details view",
    },
  },
  research: {
    title: "Conversations, and a teardown of what already existed",
    primaryResearch:
      "Requirements came from the PM and directly from care staff, talking through where support was actually breaking down.",
    secondaryResearch:
      "Also, I ran an informal teardown of existing tools such as Intercom, Zendesk and Gorgias to understand where the category already was, and where it wasn't.",
    findings: [
      {
        lead: "What none of them had:",
        body: "a way to see a contact's related tickets from inside the one you're looking at. That gap became the related-tickets card.",
      },
      {
        lead: "Inconsistencies across all three:",
        body: "AI summarization was rare, and macro or workflow support varied, some had one, some had the others.",
      },
      {
        lead: "Audits were uncommon:",
        body: "No clear audit trail of who changed what and when",
      },
    ],
  },
  decisionsIntro: {
    title: "What actually changed, and what it cost",
    description:
      "Designing for each role. Three personas, one shared customer journey. Tradeoffs, constraints and edges cases",
  },
  decisions: [
    {
      number: "01",
      title: "Context cards & related tickets",
      body: "Agents live on this screen. Conversation stays central; customer, ownership, and related tickets stay visible.",
      optionsLabel: "Options Considered",
      options: [
        {
          label: "OPTION 1",
          variant: "option",
          text: "Move details to a separate tab → loses real-time context",
        },
        {
          label: "OPTION 2",
          variant: "decision",
          text: "Decision: 60/40 split. Related tickets only surface within the agent's team.",
        },
      ],
      tradeoffCallout:
        "Tradeoff: Solving for context created a privacy problem the original design didn't have. Teams fixed it.",
      image: {
        src: asset("Context cards.png"),
        alt: "Onarvo Front Desk context panel with related tickets and contact details",
        width: 1320,
        height: 1093,
      },
    },
    {
      number: "02",
      title: "Trust the summary, not the source",
      body: "AI summaries help when the thread is long. They become dangerous if agents can't tell AI output from real messages.",
      optionsLabel: "Options Considered",
      options: [
        {
          label: "OPTION 1",
          variant: "option",
          text: "Insert AI summary as a normal message → fastest to scan, easy to confuse",
        },
        {
          label: "OPTION 2",
          variant: "decision",
          text: "Decision: Color-coded by source, plus a label - purple for the customer, none for the team, black with an icon.",
        },
      ],
      tradeoffCallout:
        "Tradeoff: Adds a half-second of reading. Removes the risk of treating AI interpretation as the actual record.",
      image: {
        src: asset("trust the summary.png"),
        alt: "AI ticket summary card with source attribution in Onarvo Front Desk",
        width: 1395,
        height: 906,
      },
    },
    {
      number: "03",
      title: "Two kinds of automation, on purpose",
      body: "Workflows = recurring + conditional (match all / match any). Macros = one-click, no conditions.",
      options: [
        {
          label: "",
          variant: "decision",
          text: "Decision: Keep them as two separate concepts instead of one flexible builder.",
        },
      ],
      tradeoffCallout:
        "Tradeoff: Two simpler tools felt safer for a non-technical team than one powerful system that could feel technical.",
      image: {
        src: asset("Two kinds.png"),
        alt: "Macro management interface showing one-click agent actions in Onarvo Front Desk",
        width: 1388,
        height: 1309,
      },
    },
  ],
  impactStats: {
    title: "What changed",
    stats: [
      {
        value: "1.5h",
        label: "Avg first response (from 4h)",
      },
      {
        value: "2d",
        label: "Avg resolution (from 3d)",
      },
      {
        value: "90%",
        label: "Tickets with resolution note",
      },
    ],
  },
  reflection: {
    title: "What I would do differently",
    items: [
      {
        title: "Automate ticket creation",
        body: "Most tickets still required a manual form. An email-to-ticket path (and later phone/WhatsApp notes) would have removed a repetitive step and reduced the chance of issues being logged late or forgotten.",
      },
      {
        title: "Revisit the two-concept model",
        body: "Keeping Workflows and Macros separate matched how managers thought at the time. With more maturity I would test whether a single, well-designed automation builder could cover both without feeling technical.",
      },
    ],
  },
};

import type { CaseStudy } from "./types";

const assetBase = "/case study/propheski";

export const propheski: CaseStudy = {
  slug: "propheski",
  title: "Propheski",
  description:
    "A fantasy skiing app where fans draft skiers, track live race results, compete on leaderboards and follow World Cup & Olympic skiing.",
  eyebrow: "PROPHESKI CASE STUDY",
  headline: "Fantasy sports app for Olympic and World Cup alpine skiing.",
  intro:
    "Propheski is a fantasy skiing platform where users build teams, compete across leagues, and manage lineups. I redesigned key workflows to reduce information overload, improve decision-making, and make the product easier to navigate for both new and experienced players.",
  role: "Product designer",
  team: "Founder, PM & 1 engineer",
  timeline: "2 months",
  images: {
    hero: [`${assetBase}/P hero.svg`],
    // Add pull-quote image to public/case study/propheski/ then set this path
    // pullQuote: `${assetBase}/pull-quote.png`,
  },
  productContext:
    "The platform had accumulated features over time, but important workflows had become increasingly difficult to navigate. Users needed to manage teams, follow races, and compete across leagues, yet critical information was buried beneath crowded interfaces and competing priorities. My role was to reorganize these experiences into clearer, more focused decision-making flows.",
  businessProblem:
    "The client already had a platform, but it made an unfamiliar sport harder to follow, not easier. The homepage packed competing leaderboards with no single view of your teams, predictions, or leagues. Team creation crammed both rosters and every race discipline onto one screen. League details mixed standings, races, and matchups together. Every screen tried to answer several questions at once, and answered none of them clearly.",
  pullQuote: "You can't design what you don't understand.",
  decisions: [
    {
      eyebrow: "DESIGN DECISION 01",
      title: "Prioritizing decisions, not leaderboards",
      rejected:
        "Competing leaderboards on home page meant no single view of what actually mattered: your teams, your predictions, your leagues, all at a glance. Users landed on the homepage and had to hunt for what to do next",
      decided:
        "The homepage became a quick check-in: your men's and women's teams, your prediction scores, and your leagues, all visible without digging through separate leaderboard screens.",
      layoutVariant: "three-column",
      image: `${assetBase}/p ds1a.svg`,
      imageSecondary: `${assetBase}/p ds1b.svg`,
    },
    {
      eyebrow: "DESIGN DECISION 02",
      title: "Slowing down team creation",
      rejected:
        "The original flow put team creation on one crowded screen, both men's and women's rosters, all four disciplines, athletes shown by name and price only. One screen for everything meant users were picking blind and fast, deciding on price and name alone with no sense of who they were actually drafting.",
      decided:
        "Team creation split into separate routes for men's and women's teams, with switching between disciplines, Slalom, GS, Super-G, Downhill. Athletes show rank, name, price, and photo; tapping in surfaces last five results, FIS ranking, and season points. Choosing became informed instead of blind.",
      layoutVariant: "three-column",
      image: `${assetBase}/p ds2a.svg`,
      imageSecondary: `${assetBase}/p ds2b.svg`,
    },
    {
      eyebrow: "DESIGN DECISION 03",
      title: "Separating what you're deciding from what you're reviewing",
      rejected:
        "League screens showed standings, races, and matchups all on one screen. Mixing three different questions on one screen forced users to parse everything just to find the one thing they came for.",
      decided:
        "League details split into tabs, leaderboard, races, and knockouts, so each answers one question at a time, and users can follow every league without wading through unrelated information to get there.",
      layoutVariant: "three-column",
      image: `${assetBase}/p ds3a.svg`,
      imageSecondary: `${assetBase}/p ds3b.svg`,
    },
  ],
  constraints:
    "The core constraint wasn't technical, it was unfamiliarity. Every decision had to be checked against how the sport and the fantasy format actually worked, not how I assumed they worked, which meant hands-on research (playing FPL myself) rather than desk research alone.",
  constraintsTitle: "Designing Within Constraints",
  takeaways:
    "Working on Propheski reinforced that simplifying a product isn't about removing complexity, it's about organizing it. By restructuring information around the decisions users were trying to make, I learned how thoughtful information architecture can make even a feature-rich platform feel approachable without sacrificing capability.",
  takeawaysTitle: "Takeaways",
  tabletDecisionImageScale: 0.85,
  /** Hero SVG is 1077×794 — wrap intrinsic height to avoid letterboxing in a fixed 1312/656 frame */
  heroIntrinsicAspect: true,
  /** Flush edge-to-edge — no case-study-frame-inset on hero */
  heroPadded: false,
  isMobile: true,
  hasPullQuote: true,
};

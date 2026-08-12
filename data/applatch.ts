import type { CaseStudy } from "./types";

const assetBase = "/case study/Applatch";

export const applatch: CaseStudy = {
  slug: "applatch",
  title: "Applatch",
  description:
    "Educational app that turns learning into earned screen time by combining quizzes, rewards, and parental controls to help children build consistent learning habits.",
  eyebrow: "APPLATCH KIDS CASE STUDY",
  headline: "Designing learning that children actually wanted to return to.",
  intro:
    "Applatch is a gamified educational platform that combines quizzes, rewards, screen-time management, and location awareness to help children build healthier digital habits while giving parents visibility and control.",
  role: "Founding Product designer",
  team: "CTO, PM & 2 engineers",
  timeline: "14 months",
  images: {
    hero: [`${assetBase}/Ap hero.svg`],
  },
  productContext:
    "I joined Applatch shortly after the company pivoted from an adult productivity app into children's education. While an early visual direction already existed, it no longer reflected the product's new audience. Working closely with the founder and engineers, I evolved the design language into a more playful and accessible system while designing core experiences across onboarding, learning, parental controls, rewards, and location tracking.",
  businessProblem:
    "Most parental-control apps solve one side of this: they restrict. Applatch had to do two things at once, restrict access responsibly and make the restriction feel earned rather than punitive, for an audience that included children too young to read. Every decision had to satisfy a parent's need for control and a child's need for the app to feel worth using.",
  decisions: [
    {
      eyebrow: "DESIGN DECISION 01",
      title: "Designing the learning loop for every age",
      explored:
        "A single quiz format across all ages, standard multiple choice.",
      rejected:
        "Multiple choice text assumes reading fluency. It would have locked out the youngest users, the exact group least able to self-regulate screen time and most in need of the product.",
      decided:
        "Questions adapt to age: picture-based choices with illustrations for pre-readers (A for apple, B for ball), standard multiple choice for older kids, and a tap-to-listen function on every question so reading was never a barrier to participating.",
      layoutVariant: "three-column",
      image: `${assetBase}/age 3-5.svg`,
      imageSecondary: `${assetBase}/Ap ds1b.svg`,
    },
    {
      eyebrow: "DESIGN DECISION 02",
      title: "Motivation without exposure",
      explored:
        "A public leaderboard with personalized avatars, kids could upload their own photo, and their real name displayed alongside their rank.",
      rejected:
        "Removing avatars killed the personalization. Removing the leaderboard killed the competition. Both solved privacy by deleting the feature's purpose.",
      decided:
        "Default system avatars only, no uploads, and names masked to the first letters with the rest replaced by asterisks. Kids still see where they rank. Nobody outside the family can identify who. This came directly from a pre-launch parent testing group flagging the exposure risk before it shipped.",
      layoutVariant: "three-column",
      image: `${assetBase}/ap ds1a.svg`,
      imageSecondary: `${assetBase}/Ap ds2b.svg`,
    },
    {
      eyebrow: "DESIGN DECISION 03",
      title: "Rebuilding onboarding around the parent",
      explored:
        "Setup started on the child's device: the child generated a pairing code, which the parent then entered on their own phone to link accounts.",
      rejected:
        "After launch, this generated a wave of support calls. Parents weren't sure whether to start on their own phone or their child's, and the pairing step assumed a level of technical confidence many didn't have.",
      decided:
        "Onboarding starts on the parent's device: create the account and child profile first, then the child signs in and selects theirs. A \"Whose phone is this?\" screen with a confirmation modal at the moment of choice, plus a linked walkthrough video for parents who want more.",
      layoutVariant: "three-column",
      image: `${assetBase}/Ap ds3a.svg`,
      imageSecondary: `${assetBase}/modal.svg`,
    },
  ],
  constraints:
    "Rewards system. Kids could redeem points for time or gifts. Scoped, never shipped, engineering bandwidth ran out. Shipped as a visible \"coming soon\" instead of hiding it, since kids had already asked for it during early school visits.\n\nParent-voice narration. Cut for cost and development time.\n\nMessage screenshotting for trigger words. Blocked by platform privacy restrictions.",
  constraintsTitle: "Designing Within Constraints",
  takeaways:
    "Redesigned onboarding lifted sign-up completion by 40%.\n\nReached 3,000+ signups in the first three weeks.\n\nBTA Awards UK finalist, 2025.\n\nWinner, Education and Training category, UK Startup Awards.",
  takeawaysTitle: "Outcomes",
  tabletDecisionImageScale: 0.85,
  /** Flush intrinsic hero — avoids letterboxing in the old fixed 1312/656 frame */
  heroIntrinsicAspect: true,
  heroPadded: false,
  isMobile: true,
  hasPullQuote: false,
};

export const siteConfig = {
  name: "eniola.aigbokhaode",
  email: "aigbokhaode0@gmail.com",
  resumeUrl: "/resume/resume-eniola-aigbokhaode.pdf",
  linkedinUrl: "https://www.linkedin.com/in/eniola-aigbokhaode/",
  githubUrl: "https://github.com/Eniolaremusa",
} as const;

export const heroContent = {
  headline:
    "Designing products that feel intuitive & human, especially in complex, regulated industries.",
  bio: "I work across product strategy, UX, and interaction design, taking products from early ideas to thoughtful, scalable experiences. Lately, I've been spending more time in Cursor and Codex, exploring how far I can take my design ideas beyond Figma.",
  reachOutLabel: "{Reach out to me}",
  clientsLabel: "Designed websites and products for:",
  clients: [
    {
      name: "DoorLoop",
      src: "/images/home/hero-logos/doorloop.svg",
      width: 86,
      height: 22,
    },
    {
      name: "Daloopa",
      src: "/images/home/hero-logos/daloopa.svg",
      width: 107,
      height: 18,
    },
    {
      name: "Dealpage",
      src: "/images/home/hero-logos/dealpage.svg",
      width: 72,
      height: 22,
    },
    {
      name: "Applatch",
      src: "/images/home/hero-logos/applatch.svg",
      width: 94,
      height: 22,
    },
    {
      name: "Wedgewood Weddings",
      src: "/images/home/hero-logos/wedgewood-weddings.svg",
      width: 119,
      height: 22,
    },
  ],
} as const;

export interface PersonalExploration {
  slug: string;
  title: string;
  description: string;
  video: string;
  prototypeUrl: string;
}

export const personalExplorationsHeading =
  "Small personal experiments in design, interaction, and code. Give one a try.";

/** Homepage personal explorations — FarmAI, Font Selector, Stock Purchase */
export const personalExplorations: PersonalExploration[] = [
  {
    slug: "farm-ai",
    title: "FarmAI",
    description:
      "Discover which crops are best suited to a piece of farmland using simulated USDA soil data.",
    video: "/Explorations/farm ai framer.mp4",
    prototypeUrl: "https://farm-ai-mu.vercel.app/",
  },
  {
    slug: "font-selector",
    title: "Font Selector",
    description:
      "Find fonts that match your style by adjusting characteristics like warmth, presence, width, and serifness.",
    video: "/Explorations/Font selector.mp4",
    prototypeUrl: "https://font-selector-phi.vercel.app/",
  },
  {
    slug: "stock-purchase",
    title: "Stock Purchase",
    description:
      "Explore buying stocks on the web, from selecting a stock and entering an amount to completing a purchase.",
    video: "/Explorations/Stock Linkedin.mp4",
    prototypeUrl: "https://stock-purchase-amber.vercel.app/",
  },
];

/** Homepage hobbies carousel + grid — set true to show again */
export const showHobbiesSection = false;

/** Order: coding, reading, painting, baking */
export const hobbyImages = [
  "/Hobbies/Coding.jpg",
  "/Hobbies/Reading.jpg",
  "/Hobbies/Painting.jpg",
  "/Hobbies/Baking.JPG",
] as const;

export const homeCaseStudyOrder = [
  "cbf-flo",
  "onarvo-desk",
  "applatch",
  "deploy-design-system",
] as const;

export const homeCaseStudyCardImages: Record<string, string> = {
  "cbf-flo": "/case study/Cbf.svg",
  applatch: "/case study/Applatch.svg",
  "vendor-connect": "/case study/Vendor.svg",
  propheski: "/case study/image copy.png",
  "deploy-design-system":
    "/Preview overlay/Deploy Design system/Frame 1618873207.png",
  "onarvo-desk": "/case study/Onarvo homepage.png",
  homeward: "/images/home/case-studies/Homeward case study.svg",
};

export const homeCaseStudyCardImagesMobile: Record<string, string> = {
  "cbf-flo": "/case study/CBF FLO/cb home m.svg",
  "vendor-connect": "/case study/Vendor connect/vc home m.svg",
};

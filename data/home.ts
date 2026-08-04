export const siteConfig = {
  name: "Eniola Aigbokhaode",
  email: "aigbokhaode0@gmail.com",
  resumeUrl: "/resume/Eniola's resume q4.pdf",
  linkedinUrl: "https://www.linkedin.com/in/eniola-aigbokhaode/",
  githubUrl: "https://github.com/Eniolaremusa",
} as const;

export const heroContent = {
  headline:
    "Designing products people depend on, from product strategy to shipped experience.",
  bio: "I design complex B2B SaaS and operational platforms, partnering with founders and product teams from product strategy through shipped interfaces. Currently a Senior Product Designer at L&S Creative Agency, designing digital products for Series B companies including DoorLoop and Daloopa, while increasingly bringing ideas to life with AI-assisted code.",
  toolsLabel: "TOOLS I USE",
  tools: "Figma,  Cursor,  Framer, Claude",
  portraits: [
    {
      src: "/images/home/hero-portrait-1-source.png",
      rotation: "-8.02deg",
      className: "relative z-10",
    },
    {
      src: "/images/home/hero-portrait-2-source.png",
      rotation: "6.76deg",
      className: "absolute right-0 top-0 z-20 lg:right-[-8%] lg:top-[-4px]",
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

/** Order matches Figma frame 56:3158, plus Farm AI */
export const personalExplorations: PersonalExploration[] = [
  {
    slug: "font-selector",
    title: "Font selector",
    description: "Subjective style of choosing fonts.",
    video: "/Explorations/Font selector.mp4",
    prototypeUrl: "https://font-selector-phi.vercel.app/",
  },
  {
    slug: "stock-approval",
    title: "Stock approval",
    description: "Purchasing a stock on web.",
    video: "/Explorations/Stock Linkedin.mp4",
    prototypeUrl: "https://stock-purchase-amber.vercel.app/",
  },
  {
    slug: "contract-reader",
    title: "Contract reader",
    description: "Using AI to verify contracts before signing",
    video: "/Explorations/Contract framer.mp4",
    prototypeUrl: "https://july-stream-13187209.figma.site",
  },
  {
    slug: "farm-ai",
    title: "Farm AI",
    description: "Soil intelligence platform.",
    video: "/Explorations/farm ai framer.mp4",
    prototypeUrl: "https://farm-ai-mu.vercel.app/",
  },
];

/** Order: coding, reading, painting, baking */
export const hobbyImages = [
  "/Hobbies/Coding.jpg",
  "/Hobbies/Reading.jpg",
  "/Hobbies/Painting.jpg",
  "/Hobbies/Baking.JPG",
] as const;

export const homeCaseStudyOrder = [
  "cbf-flo",
  "applatch",
  "vendor-connect",
  "propheski",
] as const;

export const homeCaseStudyCardImages: Record<string, string> = {
  "cbf-flo": "/case study/Cbf.svg",
  applatch: "/case study/Applatch.svg",
  "vendor-connect": "/case study/Vendor.svg",
  propheski: "/case study/image copy.png",
};

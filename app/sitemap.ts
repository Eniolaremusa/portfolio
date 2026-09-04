import type { MetadataRoute } from "next";
import { homeCaseStudyOrder } from "@/data/home";

function getBaseUrl(): string {
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...homeCaseStudyOrder.map((slug) => ({
      url: `${baseUrl}/${slug}`,
      lastModified: new Date(),
    })),
  ];
}

import type { Metadata } from "next";
import { Crimson_Text } from "next/font/google";
import { GeistMono, GeistSans } from "geist/font";
import { Analytics } from "@vercel/analytics/next";
import { PageLoadIntro } from "@/components/PageLoadIntro";
import { heroContent } from "@/data/home";
import { getPageIntroBlockingScript } from "@/lib/pageIntro";
import "./globals.css";

const crimsonText = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-crimson-text",
});

export const metadata: Metadata = {
  title: "Eniola Glory — Product Designer",
  description: heroContent.bio,
  openGraph: {
    title: "Eniola Glory — Product Designer",
    description: heroContent.bio,
  },
  twitter: {
    card: "summary_large_image",
    title: "Eniola Glory — Product Designer",
    description: heroContent.bio,
  },
  icons: {
    icon: [
      {
        url: "/favicon-light.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-dark.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${crimsonText.variable} ${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: getPageIntroBlockingScript() }}
        />
      </head>
      <body className="font-geist antialiased">
        <div id="page-intro-splash" aria-hidden="true" />
        <div className="page-main mx-auto w-full max-w-viewport">{children}</div>
        <PageLoadIntro />
        <Analytics />
      </body>
    </html>
  );
}

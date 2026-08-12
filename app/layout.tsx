import type { Metadata } from "next";
import { Crimson_Text } from "next/font/google";
import { GeistMono, GeistSans } from "geist/font";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const crimsonText = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-crimson-text",
});

export const metadata: Metadata = {
  title: "Eniola Glory — Product Designer",
  description: "Personal portfolio site for Eniola Glory, product designer.",
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
    >
      <body className="font-geist antialiased">
        <div className="mx-auto w-full max-w-viewport">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}

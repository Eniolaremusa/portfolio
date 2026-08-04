import type { Metadata } from "next";
import { Crimson_Text } from "next/font/google";
import { GeistMono, GeistSans } from "geist/font";
import "./globals.css";

const crimsonText = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-crimson-text",
});

export const metadata: Metadata = {
  title: "Eniola Aigbokhaode — Product Designer",
  description: "Personal portfolio site for Eniola Aigbokhaode, product designer.",
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
      <body className="font-geist antialiased">{children}</body>
    </html>
  );
}

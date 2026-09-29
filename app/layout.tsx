import type { Metadata, Viewport } from "next";
import { Anton, Barlow, Inter, JetBrains_Mono } from "next/font/google";

import { Providers } from "@/components/providers";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
  weight: ["500", "600", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

/** Display face for the wordmark only — Anton has no lowercase by design. */
const anton = Anton({
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "Coin Cartel",
    template: "%s · Coin Cartel",
  },
  description:
    "A neon-noir text-and-timer crime strategy game. Every job pays, and every job can be rolled.",
};

export const viewport: Viewport = {
  themeColor: "#06090A",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${barlow.variable} ${mono.variable} ${anton.variable} min-h-dvh bg-noir-950 text-white`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif, Outfit } from "next/font/google";
import { provider } from "@tdm/esign-core/agreement";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import "./globals.css";

// Same fonts as the website (src/app/layout.tsx at the repo root).
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const display = Outfit({ variable: "--font-display", weight: "600", subsets: ["latin"] });
const serif = Instrument_Serif({ variable: "--font-serif", weight: "400", style: "italic", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.techdigitalmarketer.com"),
  title: { default: `E-Sign | ${provider.name}`, template: `%s | ${provider.name} E-Sign` },
  description: "Create an account, choose your plan and sign your service agreement online.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#f6f5fb",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${display.variable} ${serif.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}

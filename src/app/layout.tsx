import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { site } from "@/content/site";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif-var",
  display: "swap",
});

const sans = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-sans-var",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-var",
  display: "swap",
});

const basePath = process.env.GITHUB_PAGES === "true" ? "/My_Portfolio" : "";

export const metadata: Metadata = {
  metadataBase: new URL("https://saieeshkanakula.com"),
  title: {
    default: `${site.name} — AI Systems Architect & Product Builder`,
    template: `%s — ${site.name}`,
  },
  description:
    "Portfolio of Saieesh Kanakula: AI systems architecture, agent orchestration, local-first intelligence and automation engineering. Eleven years in product and marketing operations, building the systems he specifies.",
  keywords: [
    "AI systems architect",
    "agent orchestration",
    "local-first AI",
    "MCP",
    "automation engineering",
    "product management",
    "Saieesh Kanakula",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "en_GB",
    title: `${site.name} — AI Systems Architect`,
    description:
      "AI agents, autonomous workflows and local-first intelligence platforms — designed, engineered and verified.",
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — AI Systems Architect`,
    description:
      "AI agents, autonomous workflows and local-first intelligence platforms.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: `${basePath}/favicon.ico`, sizes: "32x32", type: "image/x-icon" },
      { url: `${basePath}/favicon.svg`, type: "image/svg+xml" },
    ],
    shortcut: `${basePath}/favicon.ico`,
    apple: `${basePath}/apple-touch-icon.png`,
  },
};

export const viewport: Viewport = {
  themeColor: "#08090a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="grain min-h-screen antialiased">
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-paper focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-ink"
        >
          Skip to content
        </a>
        <MotionProvider>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, JetBrains_Mono } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

/** The same face Bandhu is built in. The portfolio should look like the same hand. */
const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

/** Only used where digits have to line up: the live demo counters. */
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.firstName} ${site.lastName}`,
  description: site.metaDescription,
  authors: [{ name: `${site.firstName} ${site.lastName}`, url: site.github }],
  openGraph: {
    title: `${site.firstName} ${site.lastName} — ${site.role}`,
    description: site.metaDescription,
    type: "profile",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9f9f7" },
    { media: "(prefers-color-scheme: dark)", color: "#141917" },
  ],
};

const BOOT = `(function(){try{var r=document.documentElement;r.classList.add("js");var t=localStorage.getItem("vkr-theme");if(t==="dark"||t==="light")r.setAttribute("data-theme",t)}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${beVietnam.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

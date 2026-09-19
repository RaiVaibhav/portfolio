import type { Metadata, Viewport } from "next";
import { Archivo, Newsreader, IBM_Plex_Mono } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--f-display",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--f-body",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--f-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.firstName} ${site.lastName} — ${site.role}`,
  description: site.metaDescription,
  applicationName: `${site.firstName} ${site.lastName}`,
  authors: [{ name: `${site.firstName} ${site.lastName}`, url: site.github }],
  creator: `${site.firstName} ${site.lastName}`,
  keywords: [
    "Vaibhav Kumar Rai",
    "senior software engineer",
    "senior frontend engineer",
    "React",
    "Next.js",
    "TypeScript",
    "design systems",
    "PostgreSQL",
    "FastAPI",
    "micro frontends",
    "frontend architecture",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "profile",
    url: site.url,
    siteName: `${site.firstName} ${site.lastName}`,
    title: `${site.firstName} ${site.lastName} — ${site.role}`,
    description: site.metaDescription,
    locale: "en_US",
    firstName: site.firstName,
    lastName: site.lastName,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.firstName} ${site.lastName} — ${site.role}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.firstName} ${site.lastName} — ${site.role}`,
    description: site.metaDescription,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#E9EAE6" },
    { media: "(prefers-color-scheme: dark)", color: "#0D1014" },
  ],
};

const PERSON = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: `${site.firstName} ${site.lastName}`,
  givenName: site.firstName,
  familyName: site.lastName,
  url: site.url,
  email: `mailto:${site.email}`,
  jobTitle: site.role,
  description: site.metaDescription,
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Shri Mata Vaishno Devi University",
  },
  knowsAbout: [
    "Frontend architecture",
    "React",
    "Next.js",
    "TypeScript",
    "Design systems",
    "Micro frontends",
    "Web performance",
    "Accessibility",
    "PostgreSQL",
    "FastAPI",
  ],
  sameAs: [site.github, site.linkedin],
};

const BOOT = `(function(){try{var r=document.documentElement;r.classList.add("js");var t=localStorage.getItem("vkr-theme");if(t==="dark"||t==="light")r.setAttribute("data-theme",t);}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${newsreader.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

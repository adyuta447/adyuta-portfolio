import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/animations/theme-provider";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Adyuta — Personal Portfolio",
    template: "%s — Adyuta",
  },
  description:
    "Personal portfolio of Jan Agra Adyuta Harnowo, showcasing projects, blog posts, and experiments in software engineering, web development, AI, and more.",
  keywords: [
    "personal portfolio",
    "software engineering",
    "web development",
    "AI experiments",
    "open source",
    "projects",
    "blog",
    "Jan Agra Adyuta Harnowo",
    "Adyuta",
  ],
  authors: [
    { name: "Jan Agra Adyuta Harnowo", url: "https://github.com/adyuta447" },
  ],
  creator: "Jan Agra Adyuta Harnowo",
  publisher: "Jan Agra Adyuta Harnowo",
  generator: "v0.app",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Adyuta — Jan Agra Adyuta Harnowo's Digital Laboratory",
    description:
      "Personal portfolio of Jan Agra Adyuta Harnowo, showcasing projects, blog posts, and experiments in software engineering, web development, AI, and more.",
    siteName: "Adyuta",
    images: [
      {
        url: "/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: "Adyuta — Jan Agra Adyuta Harnowo's Digital Laboratory",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/favicon-96x96.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-96x96.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} ${spaceGrotesk.variable}`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          storageKey="theme-mode"
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AUTOMATIS — The Dark Architecture Of Intelligence",
  description: "Autonomous AI infrastructure. Agents, automations, web scraping, document generation. An operating system for thought.",
  keywords: ["AI automation", "autonomous agents", "web scraping", "workflow automation", "artificial intelligence"],
  icons: {
    icon: "/favicon.svg",
  },
  verification: {
    google: "KKEVjHH5TfJs0ePa0DyNVyeO67NlUBLvcd-g37Qv_Po",
  },
  openGraph: {
    title: "AUTOMATIS — The Dark Architecture Of Intelligence",
    description: "Autonomous AI infrastructure. An operating system for thought.",
    url: "https://automatis.io",
    siteName: "AUTOMATIS",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Cinzel+Decorative:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2595549931822625"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${inter.className} antialiased h-full`} style={{ background: '#050505', color: '#e8e0d5' }}>
        {children}
      </body>
    </html>
  );
}

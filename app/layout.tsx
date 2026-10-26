import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  themeColor: "#2563EB",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://photokb.net"),
  title: {
    default: "PhotoKB - Free Online Image Tools | Resize, Compress & Convert in Seconds",
    template: "%s | PhotoKB",
  },
  description:
    "Free, fast, and easy-to-use online image tools. Compress image to 20 KB, 50 KB, 100 KB, resize dimensions in pixels/cm, and convert JPG, PNG, WEBP without losing quality. 100% private in-browser engine.",
  keywords: [
    "photokb",
    "compress image to 20 kb",
    "compress image to 50 kb",
    "compress image to 100 kb",
    "online image resizer",
    "passport photo maker",
    "jpg to pdf",
    "image converter",
    "photo resizer in kb",
    "reduce photo size online"
  ],
  authors: [{ name: "PhotoKB Team" }],
  creator: "PhotoKB",
  publisher: "PhotoKB",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://photokb.net",
    siteName: "PhotoKB",
    title: "PhotoKB - Free Online Image Tools | Every Photo, The Perfect Size",
    description:
      "Resize, compress and convert images in seconds without losing quality. Exact 20 KB, 50 KB, and 100 KB target sizes for SSC, UPSC, and government portals.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PhotoKB - Free Online Image Tools",
    description: "Resize, compress and convert images in seconds. Free, fast and private.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth antialiased`} data-scroll-behavior="smooth">
      <head>
        <link rel="canonical" href="https://photokb.net/" />
      </head>
      <body suppressHydrationWarning className="flex min-h-screen flex-col bg-slate-50/50 font-sans text-slate-900 transition-colors selection:bg-blue-600 selection:text-white dark:bg-slate-950 dark:text-slate-100">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

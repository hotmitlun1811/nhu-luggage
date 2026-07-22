import type { Metadata } from "next";
import { Inter, Poppins, Geist_Mono, Playfair_Display } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  /* ── Title ──
     Primary keyword first. Template means sub-pages auto-append "| Stow Da Nang".
     E.g. the /book page title becomes "Book Storage | Stow Da Nang". */
  title: {
    default: "Luggage Storage Da Nang | Stow",
    template: "%s | Stow Da Nang",
  },

  /* ── Description ──
     155 chars. Answers: where, how much, who for, hours, address.
     AI search engines (Perplexity, ChatGPT) pull exact facts from descriptions —
     specifics beat adjectives every time. */
  description:
    "Luggage storage in Da Nang from 15,000₫/hr or 60,000₫/day. Flat-rate plans for expats from 150,000₫/week. CCTV monitored. Open 7am–10pm daily at 55 Ba Bang Nhan, Ngu Hanh Son.",

  keywords: [
    "luggage storage Da Nang",
    "bag storage Da Nang",
    "store luggage Da Nang",
    "left luggage Da Nang",
    "baggage storage Da Nang Vietnam",
    "short term storage Da Nang",
    "expat storage Da Nang",
    "visa run luggage storage",
    "Da Nang travel tips",
    "Ngu Hanh Son luggage storage",
  ],

  authors: [{ name: "Stow Da Nang" }],
  creator: "Stow Da Nang",

  /* ── Replace with your real domain once live ── */
  metadataBase: new URL("https://stowdanang.com"),

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://stowdanang.com",
    siteName: "Stow — Luggage Storage Da Nang",
    title: "Luggage Storage Da Nang | Stow",
    description:
      "Store your bags in Da Nang from 15,000₫/hr or 60,000₫/day. Flat-rate plans for expats and visa runners from 150,000₫/week. Open 7am–10pm daily.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Stow — Luggage Storage Da Nang",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Luggage Storage Da Nang | Stow",
    description:
      "From 15,000₫/hr or flat-rate monthly plans. CCTV monitored, open 7am–10pm daily. 55 Ba Bang Nhan, Ngu Hanh Son, Da Nang.",
    images: ["/og-image.png"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
    >
      <body>{children}</body>
      <GoogleAnalytics gaId="G-FCXSCK0ZCH" />
    </html>
  );
}

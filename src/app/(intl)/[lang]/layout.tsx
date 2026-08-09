import type { Metadata } from "next";
import { Inter, Poppins, Geist_Mono, Playfair_Display } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { localBusinessJsonLd } from "@/lib/structured-data";
import { getDictionary } from "@/content/dictionary";
import { isIntlLocale } from "@/content/locales";
import { notFound } from "next/navigation";
import "../../globals.css";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isIntlLocale(lang)) notFound();

  return {
    /* noindex until a native speaker reviews the translation — i18n plan
       Phase 1 gate. Flip to indexed + add alternates.languages in the
       same commit as that review, not before (see the plan's decision #7). */
    robots: { index: false, follow: true },
    alternates: { canonical: `/${lang}` },
  };
}

export async function generateStaticParams() {
  // Only ko exists so far — zh is Phase 3 of the i18n plan, not built yet.
  return [{ lang: "ko" }];
}

// Restricts this segment to exactly the locales above — without this, an
// unmatched path like /xx would still render instead of 404ing, since a
// bare [lang] dynamic segment matches anything by default.
export const dynamicParams = false;

export default async function IntlLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!isIntlLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <html
      lang={lang}
      className={`${inter.variable} ${poppins.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
    >
      <body>
        {children}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd(dict)) }}
        />
      </body>
      <GoogleAnalytics gaId="G-FCXSCK0ZCH" />
    </html>
  );
}

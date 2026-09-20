import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Cormorant_Infant, Noto_Sans_JP, Noto_Serif_JP, Oswald } from "next/font/google";
import { LoadingScreen } from "@/components/loading-screen";
import { Providers } from "@/components/providers";
import { TransitionOverlay } from "@/components/transition-overlay";
import { SideRails } from "@/components/side-rails";
import { SiteNavbar } from "@/components/site-navbar";
import { SmoothScroll } from "@/components/smooth-scroll";
import { SiteFooter } from "@/components/site-footer";
import { SITE } from "@/data/site";
import { SITE_URL } from "@/lib/seo";
import "./globals.css";

const cormorant = Cormorant_Infant({
  variable: "--font-cormorant",
  weight: ["600", "700"],
  subsets: ["latin"],
});

const notoSerifJp = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE.title} | 公式サイト`,
    template: `%s | ${SITE.title}`,
  },
  description: SITE.seo.description,
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: SITE.seo.siteName,
    title: `${SITE.title} -${SITE.titleEn}-`,
    description: SITE.seo.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.title} -${SITE.titleEn}-`,
    description: SITE.seo.description,
  },
  // canonical はここに置かない。metadata を書き忘れたページがトップの canonical を
  // 継承し、重複扱いでインデックスから落ちるため、各ページで pageMetadata() から出す。
  // 既定でも index されるが、Google に大きい画像プレビューと長い抜粋を許可するには明示が要る
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Search Console の所有権確認。DNS やアナリティクスで確認済みなら未設定のままでよい
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      suppressHydrationWarning
      className={`${cormorant.variable} ${notoSerifJp.variable} ${notoSansJp.variable} ${oswald.variable} h-full bg-[#faf5f9] antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-[#333]">
        <Providers>
          <SmoothScroll />
          <TransitionOverlay />
          <LoadingScreen />
          <SiteNavbar />
          <SideRails />
          <div className="flex flex-1 flex-col">{children}</div>
          <SiteFooter />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}

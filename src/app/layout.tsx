import type { Metadata } from "next";
import { Cormorant_Infant, Noto_Sans_JP, Oswald } from "next/font/google";
import { LoadingScreen } from "@/components/loading-screen";
import { Providers } from "@/components/providers";
import { SideRails } from "@/components/side-rails";
import { SiteNavbar } from "@/components/site-navbar";
import { SmoothScroll } from "@/components/smooth-scroll";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const cormorant = Cormorant_Infant({
  variable: "--font-cormorant",
  weight: ["600", "700"],
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
  title: {
    default: "カラーリコレクション | 公式サイト",
    template: "%s | カラーリコレクション",
  },
  description:
    "【修正依頼】に出された自動人形たちと対話し、彼らの運命を決める、近未来ヒューマンドラマADV「カラーリコレクション」公式サイト",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      suppressHydrationWarning
      className={`${cormorant.variable} ${notoSansJp.variable} ${oswald.variable} h-full bg-white antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-[#333]">
        <Providers>
          <SmoothScroll />
          <LoadingScreen />
          <SiteNavbar />
          <SideRails />
          <div className="flex flex-1 flex-col">{children}</div>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}

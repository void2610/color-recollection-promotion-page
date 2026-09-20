import type { Metadata } from "next";
import { SITE } from "@/data/site";

// 公開 URL の解決順: 明示指定 → Vercel の本番ドメイン (独自ドメインがあればそれが入る) → ローカル。
// canonical / OGP / robots.txt / sitemap.xml がすべて同じ絶対 URL を指すよう、ここに一元化する
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/+$/, "");

// プレビューデプロイ (本番以外) は本番と同一内容なので、重複インデックスを防ぐ判定に使う。
// VERCEL_ENV が無い = ローカル開発なので、本番と同じ出力を確認できるよう true 扱いにする
export const IS_PRODUCTION_DEPLOYMENT =
  !process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production";

/** サイトルート基準のパス ("/story") を絶対 URL にする */
export function absoluteUrl(path: string) {
  return new URL(path, `${SITE_URL}/`).toString();
}

// app/opengraph-image.jpg のルート。ページ側で openGraph を宣言すると
// ルートから継承されるファイルベースの OG 画像が外れるので、明示的に指定し直す
// (alt は app/opengraph-image.alt.txt と同じ文言を保つ)
const OG_IMAGE = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: `${SITE.title} -${SITE.titleEn}- キービジュアル`,
};

type PageMetaInput = {
  /** ページ単体のタイトル。title.template により「| カラーリコレクション」が付く */
  title: string;
  description: string;
  /** サイトルートからのパス (例: "/story") */
  path: string;
};

// 下層ページの metadata はこれで組む。
// openGraph を省くとルートレイアウトの openGraph がまるごと継承され、
// 全ページの og:title / og:url がトップページのものになってしまう (Next.js のフィールド継承仕様)
export function pageMetadata({ title, description, path }: PageMetaInput): Metadata {
  const ogTitle = `${title} | ${SITE.title}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "ja_JP",
      siteName: SITE.seo.siteName,
      title: ogTitle,
      description,
      url: path,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [OG_IMAGE],
    },
  };
}

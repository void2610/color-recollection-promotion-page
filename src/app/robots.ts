import type { MetadataRoute } from "next";
import { IS_PRODUCTION_DEPLOYMENT, SITE_URL, absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  // プレビューデプロイは本番と同一内容なので、重複インデックスを防ぐため全面的に拒否する
  if (!IS_PRODUCTION_DEPLOYMENT) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  // JS / CSS を弾くとレンダリングに失敗するので /_next/ は塞がない
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE_URL,
  };
}

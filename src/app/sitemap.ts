import type { MetadataRoute } from "next";
import { CHARACTERS } from "@/data/characters";
import { NEWS } from "@/data/news";
import { absoluteUrl } from "@/lib/seo";

// 静的サイトなのでビルド日時は更新日にならない。実際に内容が動く最新のお知らせ日付を使う
const latestNewsDate = NEWS[0]?.date;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      changeFrequency: "weekly",
      priority: 1,
      lastModified: latestNewsDate,
    },
    {
      url: absoluteUrl("/news"),
      changeFrequency: "weekly",
      priority: 0.7,
      lastModified: latestNewsDate,
    },
    { url: absoluteUrl("/story"), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/characters"), changeFrequency: "monthly", priority: 0.8 },
    ...CHARACTERS.map((character) => ({
      url: absoluteUrl(`/characters/${character.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { url: absoluteUrl("/creators"), changeFrequency: "monthly", priority: 0.5 },
  ];
}

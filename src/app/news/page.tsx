import type { Metadata } from "next";
import { NewsList } from "@/components/news-list";
import { SectionHeading } from "@/components/section-heading";
import { NEWS } from "@/data/news";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "最新情報",
  description:
    "「カラーリコレクション」の開発状況・ストアページ公開・リリースなどの最新情報をお知らせします。",
  path: "/news",
});

export default function NewsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16 min-h-[calc(100vh-120px)]">
      <SectionHeading en="NEWS" ja="最新情報" />
      <NewsList items={NEWS} />
    </main>
  );
}

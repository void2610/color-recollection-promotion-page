import type { Metadata } from "next";
import { NewsList } from "@/components/news-list";
import { SectionHeading } from "@/components/section-heading";
import { NEWS } from "@/data/news";

export const metadata: Metadata = {
  title: "最新情報",
  description: "カラーリコレクションの最新情報",
};

export default function NewsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16 min-h-[calc(100vh-120px)]">
      <SectionHeading en="NEWS" ja="最新情報" />
      <NewsList items={NEWS} />
    </main>
  );
}

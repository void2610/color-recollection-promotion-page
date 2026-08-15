import type { Metadata } from "next";
import { CreatorCard } from "@/components/creator-card";
import { SectionHeading } from "@/components/section-heading";
import { CIRCLE_NAME, CREATORS } from "@/data/creators";

export const metadata: Metadata = {
  title: "クリエイター",
  description: "カラーリコレクションの制作者紹介",
};

export default function CreatorsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16 min-h-[calc(100vh-120px)]">
      <SectionHeading en="CREATOR" ja="クリエイター" />
      <p className="font-mincho mb-8 text-lg text-[#333]/80">制作サークル: {CIRCLE_NAME}</p>
      <div className="grid gap-6 sm:grid-cols-2">
        {CREATORS.map((creator) => (
          <CreatorCard key={creator.name} creator={creator} />
        ))}
      </div>
      <p className="mt-8 text-sm text-[#333]/60">
        お借りしている素材の一覧は、リリースに合わせて掲載予定です。
      </p>
    </main>
  );
}

import type { Metadata } from "next";
import { CreatorCredit } from "@/components/creator-credit";
import { SectionHeading } from "@/components/section-heading";
import { CIRCLE_NAME, CREATORS } from "@/data/creators";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "クリエイター",
  description: `「カラーリコレクション」を制作したサークル ${CIRCLE_NAME} のメンバー紹介。`,
  path: "/creators",
});

export default function CreatorsPage() {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-16 min-h-[calc(100vh-120px)]">
      <SectionHeading en="CREATOR" ja="クリエイター" />
      <div className="nine-hairline border-t-2 border-nine-blue/20 py-8 text-center">
        <p className="text-xs tracking-[0.2em] text-nine-blue">制作サークル</p>
        <p className="mt-2 text-4xl font-bold tracking-[0.1em] text-[#333]">{CIRCLE_NAME}</p>
      </div>
      <div className="grid gap-x-12 sm:grid-cols-2">
        {CREATORS.map((creator) => (
          <CreatorCredit key={creator.name} creator={creator} />
        ))}
      </div>
      <p className="mt-10 text-sm text-[#333]/60">
        お借りしている素材の一覧は、リリースに合わせて掲載予定です。
      </p>
    </main>
  );
}

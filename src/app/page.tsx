import Image from "next/image";
import { ScreenshotCarousel } from "@/components/screenshot-carousel";
import { SectionHeading } from "@/components/section-heading";
import { CharacterCard } from "@/components/character-card";
import { CreatorCard } from "@/components/creator-card";
import { DiaDeco } from "@/components/dia-deco";
import { ViewMore } from "@/components/view-more";
import { CHARACTERS } from "@/data/characters";
import { CIRCLE_NAME, CREATORS } from "@/data/creators";
import { NEWS } from "@/data/news";
import { SITE } from "@/data/site";

const SPEC_ROWS = [
  ["ジャンル", SITE.genre],
  ["プラットフォーム", SITE.platform],
  ["プレイ時間", SITE.playTime],
  ["価格", SITE.price],
  ["配信", SITE.distribution],
  ["ステータス", SITE.status],
] as const;

export default function Home() {
  return (
    <main className="overflow-x-clip">
      {/* メインビジュアル */}
      <section className="relative">
        {/* ゲーム UI のホログラム調パステルを淡く敷く */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(45% 60% at 15% 25%, #bfe6f2 0%, transparent 70%), radial-gradient(45% 60% at 85% 30%, #f3c6e2 0%, transparent 70%), radial-gradient(55% 55% at 50% 95%, #f6e9c0 0%, transparent 70%)",
          }}
        />
        <DiaDeco className="top-0 -left-16" />
        <DiaDeco className="right-0 bottom-0 scale-x-[-1]" />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-32 text-center">
          <h1>
            <Image
              src="/logo.svg"
              alt={SITE.title}
              width={433}
              height={68}
              priority
              className="h-auto w-[80vw] max-w-[520px]"
            />
          </h1>
          <p className="font-mincho text-lg text-[#333]">{SITE.catchcopy}</p>
          <p className="max-w-xl text-sm leading-relaxed text-[#333]/70">{SITE.description}</p>
          <span className="border border-nine-blue px-6 py-1.5 font-oswald text-sm tracking-[0.1em] text-nine-blue">
            NOW IN DEVELOPMENT
          </span>
        </div>
      </section>

      {/* 最新情報 */}
      <section className="relative mx-auto max-w-5xl px-6 py-16">
        <SectionHeading en="NEWS" ja="ニュース" />
        <ul>
          {NEWS.slice(0, 6).map((item) => (
            <li key={`${item.date}-${item.title}`} className="nine-hairline">
              <div className="flex flex-wrap items-center gap-4 py-5">
                <time className="font-oswald text-sm tracking-[0.1em] text-nine-blue">
                  {item.date.replaceAll("-", ".")}
                </time>
                <span className="border border-nine-blue px-3 py-0.5 text-xs text-nine-blue">
                  {item.category}
                </span>
                <span className="text-sm">{item.title}</span>
              </div>
            </li>
          ))}
        </ul>
        <ViewMore href="/news" />
      </section>

      {/* ストーリー */}
      <section className="relative">
        <DiaDeco className="top-8 right-0 scale-x-[-1]" />
        <div className="mx-auto max-w-5xl px-6 py-16">
          <SectionHeading en="STORY" ja="ストーリー" />
          <div className="space-y-4 leading-loose text-[#333]">
            <p>
              ――オートマタができてから、世の中は便利になった。
              <br />
              やがて人々は、機械に心を求め始める。しかし、量産型ではそれは実現できない。
            </p>
            <p>
              舞台は近未来のフランス。客の特殊なニーズに合わせて自動人形をオーダーメイドで製造する職人は、いつしか【仕立て屋（テイラー）】と呼ばれるようになった。
            </p>
            <p>
              祖父の工房を継いだあなたのもとに、ある日届く【修正依頼】のメール。持ち込まれた自動人形たちとの対話が、彼らの――そしてあなたの運命を決めていく。
            </p>
          </div>
          <ViewMore href="/story" />
        </div>
      </section>

      {/* 登場人物 */}
      <section className="relative bg-[#f5f0f9] py-16">
        <p
          aria-hidden
          className="nine-watermark pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 font-display text-[7rem] font-bold tracking-[0.1em] whitespace-nowrap sm:text-[10rem]"
        >
          PROFILE
        </p>
        <div className="relative mx-auto max-w-5xl px-6">
          <SectionHeading en="CHARACTER" ja="キャラクター" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CHARACTERS.slice(0, 3).map((character) => (
              <CharacterCard key={character.slug} character={character} />
            ))}
          </div>
          <ViewMore href="/characters" />
        </div>
      </section>

      {/* クリエイター */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <SectionHeading en="CREATOR" ja="クリエイター" />
        <p className="mb-8 text-[#333]">制作サークル: {CIRCLE_NAME}</p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CREATORS.map((creator) => (
            <CreatorCard key={creator.name} creator={creator} />
          ))}
        </div>
        <ViewMore href="/creators" />
      </section>

      {/* 製品概要 */}
      <section className="relative mx-auto max-w-5xl px-6 py-16">
        <DiaDeco className="top-0 right-0 scale-x-[-1]" />
        <SectionHeading en="GAME" ja="製品概要" />
        <h3 className="nine-hairline pb-3 text-2xl font-bold text-nine-blue">
          {SITE.title}
          <span className="ml-3 font-display text-base font-semibold text-nine-blue/70">
            {SITE.titleEn}
          </span>
        </h3>
        <div className="mt-8">
          <ScreenshotCarousel />
        </div>
        <dl className="mt-6">
          {SPEC_ROWS.map(([label, value]) => (
            <div
              key={label}
              className="nine-hairline grid grid-cols-1 gap-1 py-4 sm:grid-cols-[12rem_1fr]"
            >
              <dt className="text-sm font-medium text-nine-blue">{label}</dt>
              <dd className="text-sm">{value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}

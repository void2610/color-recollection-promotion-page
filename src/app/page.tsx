import Image from "next/image";
import Link from "next/link";
import { NewsList } from "@/components/news-list";
import { ScreenshotCarousel } from "@/components/screenshot-carousel";
import { SectionHeading } from "@/components/section-heading";
import { CharacterShowcase } from "@/components/character-showcase";
import { DiaDeco } from "@/components/dia-deco";
import { ViewMore } from "@/components/view-more";
import { CHARACTERS } from "@/data/characters";
import { CIRCLE_NAME, CREATORS } from "@/data/creators";
import { NEWS } from "@/data/news";
import { SITE, STORES } from "@/data/site";

const SPEC_ROWS = [
  ["タイトル", SITE.title],
  ["ジャンル", SITE.genre],
  ["ステータス", SITE.status],
  ["プラットフォーム", SITE.platform],
  ["価格", SITE.price],
  ["配信", SITE.distribution],
  ["プレイ時間", SITE.playTime],
] as const;

const STORY_PARAGRAPHS = [
  ["――オートマタができてから、世の中は便利になった。", "やがて人々は、機械に心を求め始める。しかし、量産型ではそれは実現できない。"],
  [
    "舞台は近未来のフランス。",
    "客の特殊なニーズに合わせて自動人形をオーダーメイドで製造する職人は、",
    "いつしか【仕立て屋（テイラー）】と呼ばれるようになった。",
  ],
  [
    "祖父の工房を継いだあなたのもとに、ある日届く【修正依頼】のメール。",
    "持ち込まれた自動人形たちとの対話が、彼らの――そしてあなたの運命を決めていく。",
  ],
];

// hirahirahihiru.com 準拠のトップ構成: 全画面ヒーロー (KV 左 / 情報右) → 中央見出しのセクション縦積み
export default function Home() {
  return (
    <main className="overflow-x-clip">
      {/* 全セクションの背後に KV をぼかして敷く (参考サイトの固定背景の再現) */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* ヒーロー KV と同じ位置・スケールに揃え、スクロール後も同じ場所に顔の影が残るようにする */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-[62%]">
          <Image
            src="/kv.jpg"
            alt=""
            fill
            sizes="(min-width: 1024px) 62vw, 100vw"
            className="translate-y-10 object-cover object-[75%_center] opacity-30 blur-md saturate-[0.8]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#faf5f9]/40 via-[#faf5f9]/70 to-[#faf5f9]/40" />
      </div>

      {/* ヒーロー: 左 3/5 に KV、右 2/5 にロゴ・ストア導線・最新トピック */}
      <section className="relative -mt-[120px] min-h-[100svh] pt-[120px]">
        <div className="absolute inset-y-0 left-0 w-full lg:w-[62%]">
          <Image
            src="/kv.jpg"
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 62vw, 100vw"
            className="translate-y-10 object-cover object-[75%_center] opacity-40 lg:opacity-100"
            style={{
              maskImage:
                "linear-gradient(to right, black 55%, transparent 100%), linear-gradient(to bottom, transparent, black 8%, black 60%, transparent 100%)",
              maskComposite: "intersect",
              WebkitMaskComposite: "source-in",
            }}
          />
        </div>
        <DiaDeco className="right-0 bottom-0 scale-x-[-1]" />

        <div className="relative mx-auto flex min-h-[calc(100svh-120px)] max-w-7xl flex-col justify-center px-6 pb-24 lg:ml-[58%] lg:mr-auto lg:max-w-[36rem] lg:pl-0">
          <div className="flex flex-col items-center gap-5 text-center lg:items-start lg:text-left">
            <h1>
              <Image
                src="/logo.svg"
                alt={SITE.title}
                width={433}
                height={68}
                priority
                className="h-auto w-[80vw] max-w-[480px]"
              />
            </h1>
            <p className="font-mincho text-lg tracking-[0.1em] text-[#333]">{SITE.catchcopy}</p>
            <p className="font-mincho text-2xl tracking-[0.3em] text-nine-blue">
              {SITE.status}
              <span className="font-oswald ml-3 text-sm tracking-[0.15em] text-nine-blue/70">
                NOW IN DEVELOPMENT
              </span>
            </p>
          </div>

          {/* ストア導線 (参考サイトのストアボタン列) */}
          <ul className="mt-8 grid grid-cols-2 gap-3">
            {STORES.map((store) => {
              const inner = (
                <>
                  <span className="font-oswald text-lg tracking-[0.15em]">{store.name}</span>
                  <span className="text-[10px] tracking-[0.1em] text-nine-blue/70">
                    {store.href ? store.note : "COMING SOON"}
                  </span>
                </>
              );
              const cls =
                "flex h-16 flex-col items-center justify-center border-2 border-grad-primary bg-white/70 text-nine-blue backdrop-blur-sm";
              return (
                <li key={store.name}>
                  {store.href ? (
                    <a
                      href={store.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${cls} transition-colors hover:bg-white`}
                    >
                      {inner}
                    </a>
                  ) : (
                    <span className={`${cls} opacity-70`}>{inner}</span>
                  )}
                </li>
              );
            })}
          </ul>

          {/* 最新トピック 2 件 (参考サイトのお知らせバー) */}
          <ul className="mt-3 space-y-3">
            {NEWS.slice(0, 2).map((item) => (
              <li key={`${item.date}-${item.title}`}>
                <Link
                  href="/news"
                  className="flex h-14 items-center justify-center gap-4 border border-nine-blue/50 bg-white/70 px-4 text-sm text-[#333] backdrop-blur-sm transition-colors hover:bg-white"
                >
                  <span className="truncate">{item.title}</span>
                  <time className="font-oswald shrink-0 text-xs tracking-[0.15em] text-nine-blue/70">
                    - {item.date.replaceAll("-", ".")} -
                  </time>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
          <span className="font-oswald text-xs tracking-[0.3em] text-nine-blue">Scroll</span>
          <span aria-hidden className="scroll-line relative block h-14 w-px bg-nine-blue/20" />
        </div>
      </section>

      {/* 最新情報: 一定高さで内側スクロール */}
      <section className="relative mx-auto max-w-5xl px-6 py-24">
        <SectionHeading en="NEWS" ja="ニュース" align="center" />
        <div className="news-scroll max-h-[26rem] overflow-y-auto pr-4">
          <NewsList items={NEWS} />
        </div>
        <ViewMore href="/news" />
      </section>

      {/* ストーリー: 中央寄せの物語文 */}
      <section className="relative py-24">
        <DiaDeco className="top-8 right-0 scale-x-[-1]" />
        <div className="mx-auto max-w-4xl px-6 text-center">
          <SectionHeading en="STORY" ja="ストーリー" align="center" />
          <p className="font-mincho text-2xl font-bold tracking-[0.15em] text-[#333] sm:text-3xl">
            {SITE.catchcopy}
          </p>
          <div className="font-mincho mt-10 space-y-8 text-[15px] leading-loose tracking-[0.08em] text-[#333]">
            {STORY_PARAGRAPHS.map((lines) => (
              <p key={lines[0]}>
                {lines.map((line, i) => (
                  <span key={line}>
                    {i > 0 && <br />}
                    {line}
                  </span>
                ))}
              </p>
            ))}
          </div>
          <ViewMore href="/story" />
        </div>
      </section>

      {/* 登場人物: サムネ選択式ショーケース */}
      <section className="relative py-24">
        <p
          aria-hidden
          className="nine-watermark pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 font-display text-[7rem] font-bold tracking-[0.1em] whitespace-nowrap sm:text-[10rem]"
        >
          PROFILE
        </p>
        <div className="relative mx-auto max-w-6xl px-6">
          <SectionHeading en="CHARACTER" ja="キャラクター" align="center" />
          <CharacterShowcase characters={CHARACTERS} />
          <ViewMore href="/characters" />
        </div>
      </section>

      {/* クリエイター: 役職小 + 名前大の罫線グリッド */}
      <section className="mx-auto max-w-4xl px-6 py-24">
        <SectionHeading en="CREATOR" ja="クリエイター" align="center" />
        <dl className="nine-hairline border-t-2 border-nine-blue/20 py-2 text-center">
          <div className="grid gap-y-1 py-6">
            <dt className="text-xs tracking-[0.2em] text-nine-blue">制作サークル</dt>
            <dd className="font-mincho text-3xl font-bold tracking-[0.1em] text-[#333]">{CIRCLE_NAME}</dd>
          </div>
        </dl>
        <dl className="grid sm:grid-cols-2 lg:grid-cols-4">
          {CREATORS.map((creator) => (
            <div key={creator.name} className="nine-hairline flex flex-col justify-end gap-2 px-2 py-6 text-center">
              <dt className="text-xs leading-relaxed tracking-[0.1em] text-nine-blue">
                {creator.roles.join(" / ")}
              </dt>
              <dd className="font-mincho text-2xl font-bold tracking-[0.05em] text-[#333]">{creator.name}</dd>
            </div>
          ))}
        </dl>
        <ViewMore href="/creators" />
      </section>

      {/* ギャラリー */}
      <section className="relative mx-auto max-w-5xl px-6 py-24">
        <SectionHeading en="GALLERY" ja="ギャラリー" align="center" />
        <ScreenshotCarousel />
      </section>

      {/* 製品概要: 見出し左 + ラベル/値グリッド */}
      <section className="relative mx-auto max-w-6xl px-6 py-24">
        <DiaDeco className="top-0 right-0 scale-x-[-1]" />
        <div className="grid gap-10 lg:grid-cols-[10rem_1fr]">
          <p className="text-grad-primary font-display text-5xl font-semibold tracking-[0.3em] lg:pt-1">
            SPEC
          </p>
          <dl className="font-mincho grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {SPEC_ROWS.map(([label, value]) => (
              <div key={label} className={label === "ジャンル" ? "sm:col-span-2" : ""}>
                <dt className="nine-hairline pb-2 text-xs tracking-[0.2em] text-nine-blue">{label}</dt>
                <dd className="mt-3 text-base tracking-[0.05em] text-[#333]">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  );
}

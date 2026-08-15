import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { CharacterCard } from "@/components/character-card";
import { CHARACTERS } from "@/data/characters";
import { NEWS } from "@/data/news";
import { SITE } from "@/data/site";

const SPEC_ROWS = [
  ["タイトル", `${SITE.title} (${SITE.titleEn})`],
  ["ジャンル", SITE.genre],
  ["プラットフォーム", SITE.platform],
  ["プレイ時間", SITE.playTime],
  ["価格", SITE.price],
  ["配信", SITE.distribution],
  ["ステータス", SITE.status],
] as const;

export default function Home() {
  return (
    <main>
      {/* ヒーロー */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            background:
              "radial-gradient(40% 60% at 20% 30%, #00b7eb 0%, transparent 70%), radial-gradient(40% 60% at 80% 30%, #e0218a 0%, transparent 70%), radial-gradient(50% 60% at 50% 90%, #f5c518 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-32 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-foreground-500">
            {SITE.titleEn}
          </p>
          <h1 className="text-5xl font-bold tracking-wide sm:text-6xl">{SITE.title}</h1>
          <p className="text-lg text-foreground-600">{SITE.catchcopy}</p>
          <p className="max-w-xl text-sm leading-relaxed text-foreground-500">
            {SITE.description}
          </p>
          <span className="rounded-full border border-foreground/20 px-4 py-1 text-sm text-foreground-500">
            {SITE.status} — 続報をお待ちください
          </span>
        </div>
      </section>

      {/* 最新情報 */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <SectionHeading en="News" ja="最新情報" />
        <ul className="space-y-3">
          {NEWS.slice(0, 3).map((item) => (
            <li key={`${item.date}-${item.title}`} className="flex flex-wrap items-center gap-4">
              <time className="font-mono text-sm text-foreground-500">{item.date}</time>
              <span className="rounded-full bg-foreground/10 px-3 py-0.5 text-xs">
                {item.category}
              </span>
              <span>{item.title}</span>
            </li>
          ))}
        </ul>
        <MoreLink href="/news" label="最新情報をすべて見る" />
      </section>

      {/* ストーリー */}
      <section className="border-y border-foreground/10 bg-content1/50">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <SectionHeading en="Story" ja="ストーリー" />
          <div className="space-y-4 leading-loose text-foreground-600">
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
          <MoreLink href="/story" label="ストーリー・世界観を読む" />
        </div>
      </section>

      {/* 登場人物 */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <SectionHeading en="Characters" ja="登場人物" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CHARACTERS.slice(0, 3).map((character) => (
            <CharacterCard key={character.slug} character={character} />
          ))}
        </div>
        <MoreLink href="/characters" label="登場人物をすべて見る" />
      </section>

      {/* 製品概要 */}
      <section className="border-t border-foreground/10">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <SectionHeading en="Product" ja="製品概要" />
          <dl className="divide-y divide-foreground/10 overflow-hidden rounded-2xl border border-foreground/10">
            {SPEC_ROWS.map(([label, value]) => (
              <div key={label} className="grid grid-cols-1 gap-1 p-4 sm:grid-cols-[10rem_1fr]">
                <dt className="text-sm font-semibold text-foreground-500">{label}</dt>
                <dd className="text-sm">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  );
}

function MoreLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="mt-8 inline-flex items-center gap-1 text-sm font-semibold text-foreground-500 transition-colors hover:text-foreground"
    >
      {label}
      <ArrowRight size={16} />
    </Link>
  );
}

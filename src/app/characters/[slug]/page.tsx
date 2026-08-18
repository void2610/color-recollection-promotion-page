import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CHARACTERS } from "@/data/characters";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CHARACTERS.map((character) => ({ slug: character.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const character = CHARACTERS.find((c) => c.slug === slug);
  if (!character) return {};
  return {
    title: `${character.name} | 登場人物`,
    description: character.description,
  };
}

export default async function CharacterPage({ params }: Props) {
  const { slug } = await params;
  const index = CHARACTERS.findIndex((c) => c.slug === slug);
  if (index < 0) notFound();
  const character = CHARACTERS[index];
  const prev = CHARACTERS[(index - 1 + CHARACTERS.length) % CHARACTERS.length];
  const next = CHARACTERS[(index + 1) % CHARACTERS.length];

  return (
    <main className="overflow-x-clip px-6 py-16">
      {/* 中央見出し (9-nine 実測: EN 42px/0.075em, JA 12px/0.05em, 下 50px + コンテンツ幅の極薄罫線) */}
      <div className="mx-auto max-w-5xl border-b border-nine-pale pt-6 pb-12 text-center">
        <p className="font-display text-[42px] leading-none font-semibold tracking-[0.075em] text-nine-blue">
          CHARACTER
        </p>
        <p className="mt-2.5 text-xs font-medium tracking-[0.05em] text-nine-blue">キャラクター</p>
      </div>

      {/* パンくず */}
      <nav
        aria-label="パンくず"
        className="mx-auto mt-6 max-w-5xl font-oswald text-xs tracking-[0.2em] text-nine-blue"
      >
        <Link href="/" className="hover:underline">
          HOME
        </Link>
        <span className="mx-3 text-nine-blue/50">&gt;</span>
        <Link href="/characters" className="hover:underline">
          CHARACTER
        </Link>
        <span className="mx-3 text-nine-blue/50">&gt;</span>
        <span className="text-[#333]">{character.name}</span>
      </nav>

      <section className="relative mx-auto mt-24 max-w-5xl">
        {/* 背景の英字透かし */}
        <p
          aria-hidden
          className="nine-watermark pointer-events-none absolute -top-20 right-0 z-10 font-display text-[5rem] leading-none font-bold tracking-[0.05em] uppercase sm:text-[7rem]"
        >
          {character.nameEn}
        </p>

        <div className="relative border border-nine-blue">
          {/* 斜めの淡色ウェッジ */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: "linear-gradient(115deg, transparent 42%, rgba(233, 220, 234, 0.55) 42%)",
            }}
          />
          <div className="relative grid lg:grid-cols-2">
            {/* 立ち絵は枠の上へはみ出させる */}
            <div className="flex items-end justify-center px-6 lg:-mt-44">
              {character.image ? (
                <Image
                  src={character.image}
                  alt={character.name}
                  width={500}
                  height={1400}
                  priority
                  className="h-[560px] w-auto max-w-none object-contain object-bottom drop-shadow-[18px_14px_14px_rgba(58,55,130,0.28)] sm:h-[860px]"
                />
              ) : (
                <div className="flex h-[420px] flex-col items-center justify-center gap-5 sm:h-[560px]">
                  <span aria-hidden className="h-20 w-20 rotate-45 border border-nine-blue/25 bg-nine-pale/50" />
                  <span className="font-oswald text-xs tracking-[0.3em] text-nine-blue/50">
                    COMING SOON
                  </span>
                </div>
              )}
            </div>

            <div className="px-6 py-10 lg:py-[60px] lg:pr-0 lg:pl-0">
              {/* 本家実測: タブはブロック左上に absolute の紺ベタ、白 Cormorant 12px 縦書き */}
              <div className="relative border-l border-nine-blue/10 pr-6 pl-9 lg:pr-[89px]">
                <span
                  aria-hidden
                  className="absolute top-0 left-0 -translate-x-1/2 bg-nine-blue font-display text-xs leading-[1.2] tracking-[0.1em] text-white"
                  style={{ writingMode: "vertical-rl", padding: "4px 1px", left: "-1px" }}
                >
                  PROFILE
                </span>

                <div className="min-w-0">
                <p className="font-display text-base leading-none tracking-[0.05em] text-nine-blue">
                  {character.nameEn}
                </p>
                <h1 className="mt-3 font-mincho text-[46px] leading-none font-normal tracking-[0.05em] text-nine-blue">
                  {character.name}
                </h1>
                <p className="font-mincho mt-[22px] text-sm text-nine-blue">「{character.quote}」</p>

                <div className="font-mincho mt-6 space-y-4 text-sm leading-loose text-[#333]/80">
                  <p>{character.description}</p>
                </div>

                </div>
              </div>

              {/* SPEC */}
              <div className="relative mt-12 border-l border-nine-blue/10 pr-6 pl-9">
                <span
                  aria-hidden
                  className="absolute top-0 left-0 -translate-x-1/2 bg-nine-blue font-display text-xs leading-[1.2] tracking-[0.1em] text-white"
                  style={{ writingMode: "vertical-rl", padding: "4px 1px", left: "-1px" }}
                >
                  SPEC
                </span>
                <dl className="min-w-0">
                    {character.profile.map(({ label, value }) => (
                      <div
                        key={label}
                        className="grid grid-cols-[115px_1fr] gap-2 py-2 text-sm leading-none"
                      >
                        <dt className="font-bold text-[#333]">{label}</dt>
                        <dd className="text-[#333]/80">{value}</dd>
                      </div>
                    ))}
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* 前後のキャラクターへ */}
        <nav className="mt-12 flex items-center justify-between font-oswald text-sm tracking-[0.15em]">
          <Link
            href={`/characters/${prev.slug}`}
            className="flex items-center gap-2 text-nine-blue transition-colors hover:text-nine-blue-hover"
          >
            <span aria-hidden>‹</span>
            {prev.name}
          </Link>
          <Link
            href="/characters"
            className="text-nine-blue/70 transition-colors hover:text-nine-blue"
          >
            一覧へ
          </Link>
          <Link
            href={`/characters/${next.slug}`}
            className="flex items-center gap-2 text-nine-blue transition-colors hover:text-nine-blue-hover"
          >
            {next.name}
            <span aria-hidden>›</span>
          </Link>
        </nav>
      </section>
    </main>
  );
}

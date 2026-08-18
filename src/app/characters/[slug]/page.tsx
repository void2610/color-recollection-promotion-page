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
      {/* 中央見出し (9-nine のキャラ個別ページ準拠: 単色・控えめサイズ + 細罫線) */}
      <div className="text-center">
        <p className="font-display text-4xl font-semibold tracking-[0.15em] text-nine-blue">
          CHARACTER
        </p>
        <p className="mt-2 text-xs font-medium tracking-[0.4em] text-nine-blue">キャラクター</p>
      </div>
      <div aria-hidden className="mx-auto mt-8 max-w-5xl border-b border-nine-blue/20" />

      {/* パンくず */}
      <nav
        aria-label="パンくず"
        className="mx-auto mt-8 max-w-5xl font-oswald text-xs tracking-[0.2em] text-nine-blue"
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

        <div className="relative border border-nine-blue/30 bg-white/70">
          {/* 斜めの淡色ウェッジ */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: "linear-gradient(115deg, transparent 42%, rgba(233, 220, 234, 0.55) 42%)",
            }}
          />
          <div className="relative grid gap-6 lg:grid-cols-[minmax(0,400px)_1fr]">
            {/* 立ち絵は枠の上へはみ出させる */}
            <div className="flex items-end justify-center px-6 lg:-mt-28">
              {character.image ? (
                <Image
                  src={character.image}
                  alt={character.name}
                  width={500}
                  height={1400}
                  priority
                  className="h-[520px] w-auto object-contain object-bottom drop-shadow-[18px_14px_14px_rgba(58,55,130,0.28)] sm:h-[720px]"
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

            <div className="flex gap-5 px-6 py-10 lg:px-0 lg:pr-12">
              {/* PROFILE の縦タブ */}
              <span
                aria-hidden
                className="grad-primary h-fit px-1 py-3 font-oswald text-[10px] tracking-[0.2em] text-white"
                style={{ writingMode: "vertical-rl" }}
              >
                PROFILE
              </span>

              <div className="min-w-0 flex-1">
                <p className="font-display text-sm tracking-[0.2em] text-nine-blue">
                  {character.nameEn}
                </p>
                <h1 className="mt-1 text-4xl font-bold text-nine-blue sm:text-5xl">
                  {character.name}
                </h1>
                <p className="font-mincho mt-4 text-sm text-[#333]/70">「{character.quote}」</p>

                <div className="font-mincho mt-6 space-y-4 text-sm leading-loose text-[#333]/80">
                  <p>{character.description}</p>
                </div>

                {/* SPEC */}
                <div className="mt-10 flex gap-5">
                  <span
                    aria-hidden
                    className="grad-primary h-fit px-1 py-3 font-oswald text-[10px] tracking-[0.2em] text-white"
                    style={{ writingMode: "vertical-rl" }}
                  >
                    SPEC
                  </span>
                  <dl className="min-w-0 flex-1">
                    {character.profile.map(({ label, value }) => (
                      <div
                        key={label}
                        className="grid grid-cols-[7rem_1fr] gap-2 py-1.5 text-sm"
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

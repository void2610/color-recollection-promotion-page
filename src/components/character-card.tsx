import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Character, CharacterArt } from "@/data/characters";

// 頭頂から腿あたりまでが枠に収まるよう、身長差を無視して全員同じ構図に揃える
function bustStyle(art: CharacterArt): CSSProperties {
  const figure = (art.feet - art.headTop) / 100;
  const heightRatio = 0.9 / (figure * 0.6);
  return {
    height: `${heightRatio * 100}%`,
    top: `${(0.1 - (art.headTop / 100) * heightRatio) * 100}%`,
    transform: `translateX(-${art.cx}%)`,
  };
}

const FOLD = "1.75rem";

// ゲームの依頼書選択画面準拠: キャラ色がにじむ書類 + 角の折り返し + 英字名の矢印リボン
export function CharacterCard({ character }: { character: Character }) {
  const tint = { "--tint": character.color } as CSSProperties;

  return (
    <Link
      href={`/characters/${character.slug}`}
      style={tint}
      className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-nine-blue"
    >
      <article
        className="grad-primary relative h-full p-px"
        style={{ clipPath: `polygon(0 0, calc(100% - ${FOLD}) 0, 100% ${FOLD}, 100% 100%, 0 100%)` }}
      >
        <div
          className="relative flex h-full flex-col bg-white"
          style={{ clipPath: `polygon(0 0, calc(100% - ${FOLD}) 0, 100% ${FOLD}, 100% 100%, 0 100%)` }}
        >
          <div
            className="relative isolate aspect-[4/5] overflow-hidden"
            style={{
              backgroundImage:
                "linear-gradient(rgba(58,55,130,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(58,55,130,0.07) 1px, transparent 1px), linear-gradient(170deg, color-mix(in srgb, var(--tint) 32%, white), white 75%)",
              backgroundSize: "28px 28px, 28px 28px, auto",
            }}
          >
            {character.image && character.art ? (
              <>
                <Image
                  src={character.image}
                  alt=""
                  width={500}
                  height={1400}
                  sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
                  className="absolute left-1/2 w-auto max-w-none transition-[filter] duration-500 ease-out group-hover:brightness-0 motion-reduce:transition-none"
                  style={bustStyle(character.art)}
                />
                {/* 黒く潰した立ち絵にだけ色が乗る (淡い背景は lighten で元の色が勝つ) */}
                <span
                  aria-hidden
                  className="absolute inset-0 opacity-0 mix-blend-lighten transition-opacity duration-500 ease-out group-hover:opacity-100 motion-reduce:transition-none"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, color-mix(in srgb, var(--tint) 40%, #2c2a96), #2c2a96 85%)",
                  }}
                />
              </>
            ) : (
              <span className="font-oswald absolute inset-0 flex items-center justify-center text-xs tracking-[0.3em] text-nine-blue/50">
                COMING SOON
              </span>
            )}

            {/* 英字名の矢印リボン */}
            <div
              className="absolute bottom-6 left-0 w-[78%] py-1.5 pr-8 pl-5 transition-[width] duration-500 ease-out group-hover:w-[86%] motion-reduce:transition-none"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, color-mix(in srgb, var(--tint) 85%, #3a3782), color-mix(in srgb, var(--tint) 45%, #3a3782))",
                clipPath: "polygon(0 0, calc(100% - 1rem) 0, 100% 50%, calc(100% - 1rem) 100%, 0 100%)",
              }}
            >
              <span className="font-display text-3xl font-semibold tracking-[0.06em] text-white [text-shadow:0_1px_6px_rgba(44,42,150,0.45)]">
                {character.nameEn}
              </span>
            </div>
          </div>

          {/* 折り返した角 */}
          <span
            aria-hidden
            className="absolute top-0 right-0"
            style={{
              width: FOLD,
              height: FOLD,
              backgroundImage: "linear-gradient(225deg, transparent 50%, color-mix(in srgb, var(--tint) 45%, #e9dcea) 50%)",
            }}
          />

          <div className="flex flex-1 flex-col px-6 pt-5 pb-6">
            <p className="text-xs tracking-[0.2em] text-nine-blue/70">— {character.role}</p>
            <h3 className="mt-1 text-2xl font-bold tracking-[0.08em] text-[#333]">{character.name}</h3>
            <blockquote className="mt-3 text-sm leading-relaxed text-[#333]/75">「{character.quote}」</blockquote>
          </div>
        </div>
      </article>
    </Link>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { Character } from "@/data/characters";

// 9-nine 準拠: 白カード + 青の底罫 + 右下コーナー飾り
export function CharacterCard({ character }: { character: Character }) {
  return (
    <Link
      href={`/characters/${character.slug}`}
      className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nine-blue"
    >
      <article className="relative h-full border-b-2 border-grad-primary bg-white p-6 shadow-[0_2px_12px_rgba(45,42,110,0.08)] transition-transform hover:-translate-y-1">
        <span
          aria-hidden
          className="absolute right-0 bottom-0 h-0 w-0 border-b-8 border-l-8 border-b-nine-blue border-l-transparent"
        />
        {character.image ? (
          <div className="mb-4 flex h-64 items-end justify-center overflow-hidden">
            <Image
              src={character.image}
              alt={character.name}
              width={400}
              height={1000}
              className="h-full w-auto object-contain object-bottom"
            />
          </div>
        ) : (
          <div className="mb-4 flex h-64 flex-col items-center justify-center gap-4">
            <span aria-hidden className="h-16 w-16 rotate-45 border border-nine-blue/25 bg-nine-pale/50" />
            <span className="font-oswald text-xs tracking-[0.3em] text-nine-blue/50">
              COMING SOON
            </span>
          </div>
        )}
        <div className="flex items-baseline gap-3">
          <h3 className="text-2xl font-bold text-[#333]">{character.name}</h3>
          <span className="font-display text-sm text-nine-blue">{character.nameEn}</span>
        </div>
        <p className="mt-1 text-xs font-medium" style={{ color: character.color === "#eaeef5" ? "#3a3782" : character.color }}>
          {character.role}
        </p>
        <blockquote className="mt-4 border-l-2 border-nine-blue/40 pl-3 text-sm italic text-[#333]/70">
          「{character.quote}」
        </blockquote>
        <p className="mt-4 text-sm leading-relaxed text-[#333]/80">{character.description}</p>
      </article>
    </Link>
  );
}

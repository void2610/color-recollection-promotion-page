import Link from "next/link";
import type { Character } from "@/data/characters";

export function CharacterCard({ character }: { character: Character }) {
  return (
    <Link
      href={`/characters/${character.slug}`}
      className="block rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <article
      className="rounded-2xl border border-foreground/10 bg-content1 p-6 transition-transform hover:-translate-y-1"
      style={{ borderTopColor: character.color, borderTopWidth: 3 }}
    >
      <div className="flex items-baseline justify-between">
        <h3 className="text-2xl font-bold">{character.name}</h3>
        <span className="text-sm text-foreground-500">{character.nameEn}</span>
      </div>
      <p className="mt-1 text-sm font-semibold" style={{ color: character.color }}>
        {character.role} — {character.colorLabel}
      </p>
      <blockquote className="mt-4 border-l-2 pl-3 text-sm italic text-foreground-600" style={{ borderColor: character.color }}>
        「{character.quote}」
      </blockquote>
      <p className="mt-4 text-sm leading-relaxed text-foreground-600">{character.description}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {character.traits.map((trait) => (
          <li
            key={trait}
            className="rounded-full border border-foreground/15 px-3 py-1 text-xs text-foreground-500"
          >
            {trait}
          </li>
        ))}
      </ul>
      </article>
    </Link>
  );
}

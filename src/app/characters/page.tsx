import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { CharacterCard } from "@/components/character-card";
import { CHARACTERS } from "@/data/characters";

export const metadata: Metadata = {
  title: "登場人物",
  description: "カラーリコレクションの登場人物紹介",
};

export default function CharactersPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <SectionHeading en="Characters" ja="登場人物" />
      <div className="grid gap-6 sm:grid-cols-2">
        {CHARACTERS.map((character) => (
          <CharacterCard key={character.slug} character={character} />
        ))}
      </div>
      <p className="mt-10 text-sm text-foreground-500">
        ……そのほかの登場人物は、ゲーム本編でお確かめください。
      </p>
    </main>
  );
}

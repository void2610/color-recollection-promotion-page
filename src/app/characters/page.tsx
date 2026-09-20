import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { CharacterCard } from "@/components/character-card";
import { CHARACTERS } from "@/data/characters";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "登場人物",
  description: `「カラーリコレクション」に登場するキャラクターの紹介。${CHARACTERS.map((c) => c.name).join("、")}。`,
  path: "/characters",
});

export default function CharactersPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <SectionHeading en="CHARACTER" ja="登場人物" />
      <div className="grid gap-6 sm:grid-cols-2">
        {CHARACTERS.map((character) => (
          <CharacterCard key={character.slug} character={character} />
        ))}
      </div>
      <p className="mt-10 text-sm text-[#333]/60">
        ……そのほかの登場人物は、ゲーム本編でお確かめください。
      </p>
    </main>
  );
}

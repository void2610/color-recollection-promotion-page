import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
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
  const character = CHARACTERS.find((c) => c.slug === slug);
  if (!character) notFound();

  return (
    <main className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          background: `radial-gradient(60% 50% at 50% 0%, ${character.color} 0%, transparent 70%)`,
        }}
      />
      <div className="relative mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/characters"
          className="inline-flex items-center gap-1 text-sm text-foreground-500 transition-colors hover:text-foreground"
        >
          <ArrowLeft size={16} />
          登場人物一覧へ
        </Link>

        <header className="mt-8">
          <p className="text-sm font-semibold" style={{ color: character.color }}>
            {character.role} — {character.colorLabel}
          </p>
          <div className="mt-1 flex flex-wrap items-baseline gap-3">
            <h1 className="text-5xl font-bold">{character.name}</h1>
            <span className="text-lg text-foreground-500">{character.nameEn}</span>
          </div>
        </header>

        <blockquote
          className="mt-8 border-l-4 pl-4 text-lg italic text-foreground-600"
          style={{ borderColor: character.color }}
        >
          「{character.quote}」
        </blockquote>

        <div className="mt-8 space-y-4 leading-loose text-foreground-600">
          <p>{character.description}</p>
          <p>{character.detail}</p>
        </div>

        <ul className="mt-8 flex flex-wrap gap-2">
          {character.traits.map((trait) => (
            <li
              key={trait}
              className="rounded-full border border-foreground/15 px-3 py-1 text-xs text-foreground-500"
            >
              {trait}
            </li>
          ))}
        </ul>

        <h2 className="mt-12 text-xl font-bold">プロフィール</h2>
        <dl className="mt-4 divide-y divide-foreground/10 overflow-hidden rounded-2xl border border-foreground/10">
          {character.profile.map(({ label, value }) => (
            <div key={label} className="grid grid-cols-1 gap-1 p-4 sm:grid-cols-[10rem_1fr]">
              <dt className="text-sm font-semibold text-foreground-500">{label}</dt>
              <dd className="text-sm">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </main>
  );
}

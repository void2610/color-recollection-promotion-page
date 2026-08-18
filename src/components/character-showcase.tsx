"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Character } from "@/data/characters";

// hirahirahihiru.com 準拠: 左サムネイル一覧 / 中央に大きな絵 / 右にプロフィール文
export function CharacterShowcase({ characters }: { characters: Character[] }) {
  const [current, setCurrent] = useState(characters[0]);

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[auto_minmax(0,22rem)_minmax(0,1fr)] lg:gap-14">
      {/* サムネイル (頭部を切り出し) */}
      <ul className="order-2 flex flex-wrap justify-center gap-3 lg:order-1 lg:grid lg:grid-cols-2">
        {characters.map((character) => {
          const isActive = character.slug === current.slug;
          return (
            <li key={character.slug}>
              <button
                type="button"
                onClick={() => setCurrent(character)}
                aria-label={character.name}
                aria-pressed={isActive}
                className={`relative h-20 w-16 overflow-hidden bg-white/70 transition-[opacity,box-shadow] ${
                  isActive
                    ? "opacity-100 shadow-[0_0_0_2px_#6247c8]"
                    : "opacity-60 shadow-[0_0_0_1px_rgba(58,55,130,0.25)] hover:opacity-100"
                }`}
              >
                {character.image ? (
                  <Image
                    src={character.image}
                    alt=""
                    width={160}
                    height={400}
                    className="absolute top-1 left-1/2 w-24 max-w-none -translate-x-1/2"
                  />
                ) : (
                  <span className="font-oswald absolute inset-0 flex items-center justify-center text-[9px] tracking-[0.2em] text-nine-blue/60">
                    ???
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {/* 菱形フレームの中に立ち絵の上半身を収める */}
      <div className="order-1 flex justify-center lg:order-2">
        <div className="relative m-8 h-64 w-64 rotate-45 overflow-hidden border-2 border-grad-primary bg-white/60 sm:h-80 sm:w-80">
          <div key={current.slug} className="swap-in absolute inset-0 -rotate-45 scale-[1.42]">
            {current.image ? (
              <Image
                src={current.image}
                alt={current.name}
                width={560}
                height={1400}
                priority
                className="absolute top-[4%] left-1/2 h-[190%] w-auto max-w-none -translate-x-1/2"
              />
            ) : (
              <span className="font-oswald absolute inset-0 flex items-center justify-center text-xs tracking-[0.3em] text-nine-blue/60">
                COMING SOON
              </span>
            )}
          </div>
          <span aria-hidden className="sparkle absolute -top-3 -left-3 -rotate-45 text-xl">
            ✦
          </span>
          <span aria-hidden className="sparkle absolute -right-3 -bottom-3 -rotate-45 text-xl">
            ✦
          </span>
        </div>
      </div>

      {/* プロフィール */}
      <div key={current.slug} className="swap-in order-3 text-center lg:text-left">
        <p className="font-display text-sm tracking-[0.3em] text-nine-blue">{current.nameEn}</p>
        <h3 className="mt-1 text-4xl font-bold text-[#333]">{current.name}</h3>
        <p className="mt-2 text-sm tracking-[0.1em] text-nine-blue">{current.role}</p>
        <blockquote className="mt-6 text-lg text-[#333]/80">「{current.quote}」</blockquote>
        <p className="mt-4 text-sm leading-loose text-[#333]/80">{current.description}</p>
        <Link
          href={`/characters/${current.slug}`}
          className="font-oswald mt-6 inline-block border-b border-grad-primary pb-1 text-sm tracking-[0.2em] text-nine-blue transition-opacity hover:opacity-70"
        >
          VIEW PROFILE →
        </Link>
      </div>
    </div>
  );
}

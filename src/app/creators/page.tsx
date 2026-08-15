import type { Metadata } from "next";
import { GithubIcon, XIcon } from "@/components/brand-icons";
import { SectionHeading } from "@/components/section-heading";
import { CIRCLE_NAME, CREATORS } from "@/data/creators";

export const metadata: Metadata = {
  title: "クリエイター",
  description: "カラーリコレクションの制作者紹介",
};

export default function CreatorsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <SectionHeading en="Creators" ja="クリエイター" />
      <p className="mb-8 text-foreground-600">制作サークル: {CIRCLE_NAME}</p>
      <div className="grid gap-6 sm:grid-cols-2">
        {CREATORS.map((creator) => (
          <div key={creator.name} className="rounded-2xl border border-foreground/10 p-6">
            <h3 className="text-xl font-bold">{creator.name}</h3>
            <ul className="mt-1 text-sm text-foreground-500">
              {creator.roles.map((role) => (
                <li key={role}>{role}</li>
              ))}
            </ul>
            <div className="mt-4 flex gap-4">
              {creator.x && (
                <a
                  href={creator.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${creator.name} の X (Twitter)`}
                  className="text-foreground-500 transition-colors hover:text-foreground"
                >
                  <XIcon />
                </a>
              )}
              {creator.github && (
                <a
                  href={creator.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${creator.name} の GitHub`}
                  className="text-foreground-500 transition-colors hover:text-foreground"
                >
                  <GithubIcon />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-8 text-sm text-foreground-500">
        お借りしている素材の一覧は、リリースに合わせて掲載予定です。
      </p>
    </main>
  );
}

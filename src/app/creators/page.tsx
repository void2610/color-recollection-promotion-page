import type { Metadata } from "next";
import { GithubIcon, XIcon } from "@/components/brand-icons";
import { SectionHeading } from "@/components/section-heading";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "クリエイター",
  description: "カラーリコレクションの制作者紹介",
};

export default function CreatorsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <SectionHeading en="Creators" ja="クリエイター" />
      <div className="rounded-2xl border border-foreground/10 p-6">
        <h3 className="text-xl font-bold">void2610</h3>
        <p className="mt-1 text-sm text-foreground-500">企画 / プログラム</p>
        <div className="mt-4 flex gap-4">
          <a
            href={SITE.links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            className="text-foreground-500 transition-colors hover:text-foreground"
          >
            <XIcon />
          </a>
          <a
            href={SITE.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-foreground-500 transition-colors hover:text-foreground"
          >
            <GithubIcon />
          </a>
        </div>
      </div>
      <p className="mt-8 text-sm text-foreground-500">
        そのほかのクレジット・お借りしている素材の一覧は、リリースに合わせて掲載予定です。
      </p>
    </main>
  );
}

import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { NEWS } from "@/data/news";

export const metadata: Metadata = {
  title: "最新情報",
  description: "カラーリコレクションの最新情報",
};

export default function NewsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <SectionHeading en="News" ja="最新情報" />
      <ul className="space-y-8">
        {NEWS.map((item) => (
          <li key={`${item.date}-${item.title}`} className="rounded-2xl border border-foreground/10 p-6">
            <div className="flex flex-wrap items-center gap-3">
              <time className="font-mono text-sm text-foreground-500">{item.date}</time>
              <span className="rounded-full bg-foreground/10 px-3 py-0.5 text-xs">
                {item.category}
              </span>
            </div>
            <h3 className="mt-3 text-lg font-bold">{item.title}</h3>
            {item.body && (
              <p className="mt-2 text-sm leading-relaxed text-foreground-600">{item.body}</p>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}

import type { ReactNode } from "react";
import { SteamWidget } from "@/components/steam-widget";

export type NewsItem = {
  date: string;
  category: "お知らせ" | "開発" | "リリース";
  title: string;
  // 文字列のほか JSX も書ける (埋め込み・リンク・複数段落など)
  body?: ReactNode;
};

// 新しい順に並べる
export const NEWS: NewsItem[] = [
  {
    date: "2026-08-19",
    category: "お知らせ",
    title: "Steam ストアページを公開しました",
    body: (
      <>
        <p>
          カラーリコレクションの Steam ストアページを公開しました。発売はまだ先ですが、ウィッシュリストに登録いただけると開発の励みになります。
        </p>
        <SteamWidget appId="4848670" />
      </>
    ),
  },
  {
    date: "2026-08-15",
    category: "お知らせ",
    title: "公式サイトを公開しました",
    body: "カラーリコレクションの公式サイトを公開しました。最新情報は本ページとXでお知らせします。",
  },
];

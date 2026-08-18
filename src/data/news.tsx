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
    date: "2026-08-18",
    category: "開発",
    title: "【ダミー】制作パートの UI を改善しました",
    body: "テスト用のダミー記事です。制作パートの操作感を調整し、パーツ選択のレスポンスを改善しました。正式なお知らせは追って掲載します。",
  },
  {
    date: "2026-08-17",
    category: "お知らせ",
    title: "【ダミー】体験版の配信時期について",
    body: "テスト用のダミー記事です。無料体験版は BOOTH での配信を予定しています。時期が確定し次第、本ページと X でお知らせします。",
  },
  {
    date: "2026-08-16",
    category: "リリース",
    title: "【ダミー】タイトルが長い場合の折り返し確認用のお知らせ記事です",
  },
  {
    date: "2026-08-15",
    category: "お知らせ",
    title: "公式サイトを公開しました",
    body: "カラーリコレクションの公式サイトを公開しました。最新情報は本ページとXでお知らせします。",
  },
];

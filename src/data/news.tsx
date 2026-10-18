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
    date: "2026-10-18",
    category: "お知らせ",
    title: "DREAMSCAPE5 に出展します",
    body: (
      <>
        <p>
          2026年10月24日（土）に開催されるインディーゲーム展示イベント「DREAMSCAPE5」に、カラーリコレクションを出展します（Art カテゴリ）。
        </p>
        <p>
          同じく Pico2☆ミ が制作した、ひと夏の思い出をめぐるエモ怖乙女ゲーム「
          <a
            href="https://novelgame.jp/games/show/13213"
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap border-b border-grad-primary text-nine-blue transition-opacity hover:opacity-70"
          >
            廻ノ夏レコード
          </a>
          」もあわせて出展します。
        </p>
        <p>
          日時：2026年10月24日（土）13:00〜19:00
          <br />
          会場：東京国際フォーラム E2ホール（東京都千代田区丸の内3-5-1）
          <br />
          入場料：一般 1,500円 / U-18 1,000円（当日券は +300円）
        </p>
        <p>
          詳しくは{" "}
          <a
            href="https://dreamscape-game.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-grad-primary text-nine-blue transition-opacity hover:opacity-70"
          >
            DREAMSCAPE 公式サイト
          </a>
          をご覧ください。
        </p>
      </>
    ),
  },
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

export type NewsItem = {
  date: string;
  category: "お知らせ" | "開発" | "リリース";
  title: string;
  body?: string;
};

// 新しい順に並べる
export const NEWS: NewsItem[] = [
  {
    date: "2026-08-15",
    category: "お知らせ",
    title: "公式サイトを公開しました",
    body: "カラーリコレクションの公式サイトを公開しました。最新情報は本ページとXでお知らせします。",
  },
];

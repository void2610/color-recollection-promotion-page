export const SITE = {
  title: "カラーリコレクション",
  titleEn: "Color Recollection",
  catchcopy: "その色は、誰かの記憶でできている。",
  description:
    "【修正依頼】に出された自動人形たちと対話し、彼らの運命を決める、近未来ヒューマンドラマADV。",
  genre: "パズルとキーワード選択によって進行するADVゲーム",
  platform: "PC (Windows / Mac)、スマートフォン",
  playTime: "1周 15分〜20分",
  price: "700円〜1,000円程度 (予定)",
  distribution: "Steam (有料販売) / BOOTH (無料体験版)",
  status: "開発中",
  links: {
    github: "https://github.com/void2610",
    twitter: "https://twitter.com/void2610",
  },
} as const;

export const NAV_ITEMS = [
  { href: "/", en: "HOME", ja: "ホーム" },
  { href: "/story", en: "STORY", ja: "ストーリー" },
  { href: "/characters", en: "CHARACTER", ja: "登場人物" },
  { href: "/news", en: "NEWS", ja: "最新情報" },
  { href: "/creators", en: "CREATOR", ja: "クリエイター" },
] as const;

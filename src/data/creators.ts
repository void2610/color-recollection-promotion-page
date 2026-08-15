export type Creator = {
  name: string;
  roles: string[];
  x?: string;
  github?: string;
};

export const CIRCLE_NAME = "Pico2☆ミ";

export const CREATORS: Creator[] = [
  {
    name: "余々暇",
    roles: ["メインシナリオライター", "キャラクターデザイン", "イラスト"],
    x: "https://x.com/44ka_9ka",
  },
  {
    name: "ひいらぎ",
    roles: ["サブシナリオライター", "UIデザイン", "実装"],
    x: "https://x.com/Snow_alf10",
  },
  {
    name: "水かもめ",
    roles: ["背景アーティスト"],
    x: "https://x.com/mizukamomeeee",
  },
  {
    name: "void2610",
    roles: ["プログラム"],
    x: "https://twitter.com/void2610",
    github: "https://github.com/void2610",
  },
];

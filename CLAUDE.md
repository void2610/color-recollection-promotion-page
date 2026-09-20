# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## プロジェクト概要

ノベルゲーム「カラーリコレクション」(制作: Pico2☆ミ) の公式サイト。Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + HeroUI v2。レイアウトは https://9-nine-project.com/ (共通パーツ・下層ページ) と https://hirahirahihiru.com/ (トップページ: 全画面ヒーロー + 中央見出しのセクション縦積み) を、配色・質感はゲーム本体の UI 素材を再現している。

- **デプロイ**: Vercel 接続済み。main へ push するだけで自動デプロイされる (ブランチ / PR は使っていない)
- **検証**: `npm run build` と `npm run lint` (eslint) を通してからコミットする。テストは無い
- **開発サーバー**: `npm run dev`。ユーザーが localhost:3001 で常駐起動していることが多く、ホットリロードで確認できる

## コンテンツはデータ駆動

文面・掲載情報は `src/data/*.ts` に集約されており、ページ実装を触らず編集できる。

- `site.ts` — タイトル・キャッチコピー・製品情報・ナビ項目・SNS リンク
- `characters.ts` — キャラ紹介 (一覧・個別ページ共用)。**ネタバレ方針**: 隠しルート・二周目要素・各キャラの核心設定 (`Docs/narrative/` の「重要ポイント」) は掲載しない。出典はゲーム側リポジトリ `../color-recollection/Docs/narrative/`
- `news.ts` / `creators.ts` — 新しい順に追記するだけ

画像素材 (`public/characters/`, `public/screenshots/`, `logo.svg`) はゲーム側リポジトリからコピーしたもの。差し替え時は sips でリサイズ・JPEG 化して軽量化する。

## SEO / クローラー対応

絶対 URL・canonical・OGP の組み立ては `src/lib/seo.ts` に集約している。

- **公開 URL**: `SITE_URL` は `NEXT_PUBLIC_SITE_URL` → Vercel の `VERCEL_PROJECT_PRODUCTION_URL` (独自ドメインがあればそれが入る) → localhost の順で解決。独自ドメインを当てたら Vercel 側に `NEXT_PUBLIC_SITE_URL` を設定すると確実
- **robots.txt / sitemap.xml**: `src/app/robots.ts` / `src/app/sitemap.ts` がビルド時に生成する。**ページを増やしたら sitemap.ts にパスを足す** (自動収集はしていない)。プレビューデプロイ (`VERCEL_ENV !== "production"`) は本番と内容が重複するので robots.txt で全面拒否している
- **下層ページの metadata は必ず `pageMetadata({ title, description, path })` で組む**。canonical・og:title・og:url・OG 画像がまとめて入る
- **構造化データ (JSON-LD)**: ビルダーは `src/lib/structured-data.ts`、埋め込みは `<JsonLd>`。トップに WebSite + Organization + VideoGame、キャラ個別ページに画面のパンくずと対応する BreadcrumbList。価格・発売日が未確定なので `offers` は意図的に入れていない
- **Search Console**: 環境変数 `GOOGLE_SITE_VERIFICATION` を入れると `google-site-verification` の meta が出る (DNS で所有権確認済みなら不要)

### 踏んだ罠

- **canonical をルートレイアウトに置かない**。metadata を書き忘れたページがトップの canonical を継承し、重複扱いでインデックスから落ちる
- **ページ側で `openGraph` を宣言すると `app/opengraph-image.jpg` から継承されていた OG 画像が外れる**。`pageMetadata` が `images` を明示指定して補っている

## デザインシステム (globals.css に集約)

- 配色トークン: `--color-nine-blue` (藍紫、ロゴ準拠) / `--color-nine-pale` (モーブ)。基調はゲームタイトル画面から実測した**くすんだモーブ (#b090b0 系)**で、青に寄せない
- グラデーショントークン: `--grad-primary` (藍→青紫→赤紫) / `--grad-holo` / `--grad-band`。ゲーム UI は**ほぼ全要素がグラデーション**なので、単色のボタン・罫線・見出しを追加しない。`grad-primary` `text-grad-primary` `border-grad-primary` `nine-hairline` `sparkle` (✦) を使う
- 全ページ共通の市松模様背景は `body::before` (fixed)。セクションに不透明背景を敷くと隠れるので注意
- フォント: 既定はゴシック (Noto Sans JP)。見出し (h1–h4)・blockquote・figcaption は要素セレクタで明朝 (Noto Serif JP)、リード文・物語調の本文・製品概要テーブルは `font-mincho` クラスで明朝。英字見出しは Cormorant Infant (`font-display`)、日付・ボタンは Oswald (`font-oswald`)

## アニメーション実装の制約 (実際に踏んだ罠)

- **持続する transform アニメーションは子孫の `fixed` 要素の位置基準を壊す** (containing block 化)。ページ遷移 (`.page-enter`) は opacity のみ、スクロール出現は animation でなく transition (`.reveal` 方式) にする
- **同名 keyframes を direction: reverse で再利用してもアニメーションは再始動しない**。閉じる用は専用の `-out` keyframes を定義する (ライトボックス参照)
- スムーススクロールは Lenis (`smooth-scroll.tsx`)。**ルート遷移時に `lenis.scrollTo(0, {immediate})` + `resize()` で内部状態を同期**しないと、短いページで最後までスクロールできなくなる
- 全アニメーションに `prefers-reduced-motion: reduce` の無効化を付ける

## 構成メモ

- `layout.tsx` が LoadingScreen (初回ロゴ演出)・SmoothScroll・SiteNavbar・SideRails (左右の fixed レール)・SiteFooter を組み、`template.tsx` が遷移ごとの白フラッシュ + フェードインを担う
- HeroUI v2 は Tailwind v4 に `globals.css` の `@config "./tailwind.config.js"` で接続している (v4 は legacy config を明示参照しないと無視する)。HeroUI コンポーネントは Server Component から直接使えない (`"use client"` 必須)
- lucide-react v1 にブランドアイコンは無い。X / GitHub は `brand-icons.tsx` のインライン SVG を使う

import { CHARACTERS } from "@/data/characters";
import { CIRCLE_NAME } from "@/data/creators";
import { SITE, STORES } from "@/data/site";
import { absoluteUrl } from "@/lib/seo";

// @id で実体を一意にし、ページ間で同じサークル・同じ作品を指していると検索エンジンに伝える
const WEBSITE_ID = absoluteUrl("/#website");
const CIRCLE_ID = absoluteUrl("/#circle");
const GAME_ID = absoluteUrl("/#game");

// STORES は as const なので href は各リテラル型。flatMap で undefined を落としつつ string[] にする
const storeUrls: string[] = STORES.flatMap((store) => (store.href ? [store.href] : []));

// トップページに載せる、サイト・サークル・作品のまとまり。
// 価格・発売日が未確定なので offers は意図的に入れない (不確かな値は構造化データの警告になる)
export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: absoluteUrl("/"),
        name: SITE.seo.siteName,
        description: SITE.description,
        inLanguage: "ja",
        publisher: { "@id": CIRCLE_ID },
        about: { "@id": GAME_ID },
      },
      {
        "@type": "Organization",
        "@id": CIRCLE_ID,
        name: CIRCLE_NAME,
        url: absoluteUrl("/creators"),
        sameAs: [SITE.links.twitter, SITE.links.github],
      },
      {
        "@type": "VideoGame",
        "@id": GAME_ID,
        name: SITE.title,
        alternateName: SITE.titleEn,
        url: absoluteUrl("/"),
        image: absoluteUrl("/kv.jpg"),
        description: SITE.description,
        genre: SITE.genre,
        gamePlatform: SITE.platform,
        applicationCategory: "Game",
        inLanguage: "ja",
        author: { "@id": CIRCLE_ID },
        publisher: { "@id": CIRCLE_ID },
        sameAs: storeUrls,
        character: CHARACTERS.map((character) => ({
          "@type": "Person",
          name: character.name,
          alternateName: character.nameEn,
          url: absoluteUrl(`/characters/${character.slug}`),
        })),
      },
    ],
  };
}

// 画面に出しているパンくずと同じ階層を渡す (最後の要素は現在地なので path を省く)
export function breadcrumbJsonLd(items: { name: string; path?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: absoluteUrl(item.path) } : {}),
    })),
  };
}

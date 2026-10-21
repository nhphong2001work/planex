import type { MetadataRoute } from "next";
import { paths, type Locale, type PageKey } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";
import { localizedPath } from "@/lib/i18n";
import { assets } from "@/lib/assets";

const locales: Locale[] = ["ja", "en"];
const pageKeys = Object.keys(paths) as PageKey[];
const imagesByPage: Partial<Record<PageKey, readonly string[]>> = {
  home: [assets.moldedProducts[0], assets.cadCam],
  products: [assets.moldedProducts[0], assets.vibrationWelded],
  "injection-products": assets.moldedProducts,
  "welded-products": [assets.vibrationWelded],
  news: assets.newsImages,
};

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    pageKeys.map((pageKey) => {
      const pagePath = paths[pageKey];
      const localizedPagePath = localizedPath(locale, pagePath);
      const languages = {
        ja: absoluteUrl(localizedPath("ja", pagePath)),
        en: absoluteUrl(localizedPath("en", pagePath)),
        "x-default": absoluteUrl(localizedPath("ja", pagePath)),
      };

      return {
        url: absoluteUrl(localizedPagePath),
        images: imagesByPage[pageKey]?.map(absoluteUrl),
        changeFrequency: pageKey === "news" ? "weekly" : "monthly",
        priority: pageKey === "home" ? 1 : pageKey === "business" || pageKey === "products" ? 0.8 : 0.6,
        alternates: { languages },
      };
    }),
  );
}

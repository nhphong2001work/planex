import type { Locale } from "@/lib/content";
export type { Locale } from "@/lib/content";

export function isLocale(value: string | undefined): value is Locale {
  return value === "ja" || value === "en";
}

export function localizedPath(locale: Locale, path: string): string {
  const cleanPath = path.replace(/^\/+|\/+$/g, "");
  return cleanPath ? `/${locale}/${cleanPath}` : `/${locale}`;
}

export const siteOrigin =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.planex-jp.com";

export function absoluteUrl(path: string): string {
  return new URL(path, siteOrigin).toString();
}

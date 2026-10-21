import type { Locale } from "@/lib/content";
import { ui } from "@/lib/ui";

export function NavLabel({ text, locale }: { text: string; locale: Locale }) {
  const normalizedText = locale === "ja" ? text.replace(/\s+/g, "") : text;
  const companyStart = locale === "ja" ? normalizedText.indexOf("（") : -1;

  if (companyStart < 0) {
    return normalizedText;
  }

  return (
    <>
      <span>{normalizedText.slice(0, companyStart)}</span>
      <span className={ui.mobileCompany}>
        {normalizedText.slice(companyStart)}
      </span>
    </>
  );
}

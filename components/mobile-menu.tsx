"use client";

import { useState } from "react";
import Link from "next/link";
import { nav, navLabels, paths, type Locale, type PageKey } from "@/lib/content";
import { localizedPath } from "@/lib/i18n";
import { NavLabel } from "@/components/nav-label";
import { ui } from "@/lib/ui";

function localizedUrl(locale: Locale, page: PageKey) {
  return localizedPath(locale, paths[page]);
}

function label(locale: Locale, japanese: string, english: string) {
  return locale === "ja" ? japanese : english;
}

export function MobileMenu({
  locale,
  page,
}: {
  locale: Locale;
  page: PageKey;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const items = nav.flatMap((item) => [
    {
      key: item.key,
      text: item[locale],
      href: item.key,
      active: item.key === page || item.children?.includes(page) === true,
      parent: true,
    },
    ...(item.children ?? [])
      .filter((child) => child !== item.key)
      .map((child) => ({
        key: child,
        text: navLabels[child][locale],
        href: child,
        active: child === page,
        parent: false,
      })),
  ]);

  return (
    <div className={ui.mobileControl}>
      <button
        className={ui.menuToggle}
        aria-expanded={menuOpen}
        aria-label={label(locale, "メニュー", "Menu")}
        onClick={() => setMenuOpen((isOpen) => !isOpen)}
      >
        {menuOpen ? label(locale, "閉じる", "Close") : "☰"}
      </button>

      {menuOpen && (
        <nav
          className={ui.mobileNav}
          data-open="true"
          aria-label={label(locale, "モバイルナビゲーション", "Mobile navigation")}
        >
          <div className={ui.mobileNavInner}>
            {items.map((item, index) => (
              <Link
                className={item.parent
                  ? `${ui.mobileNavLink}${item.active ? ` ${ui.mobileParentActive}` : ""}`
                  : ui.mobileChildLink}
                key={`${item.key}-${index}`}
                href={localizedUrl(locale, item.href)}
                aria-current={item.key === page ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {item.parent ? item.text : <NavLabel text={item.text} locale={locale} />}
              </Link>
            ))}
            <div className={ui.mobileLanguage}>
              <Link href={localizedUrl("ja", page)} hrefLang="ja">
                日本語
              </Link>
              {"　|　"}
              <Link href={localizedUrl("en", page)} hrefLang="en">
                EN
              </Link>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}

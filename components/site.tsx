import Image from "next/image";
import Link from "next/link";
import { assets } from "@/lib/assets";
import {
  nav,
  navLabels,
  paths,
  tagline,
  titles,
  type Locale,
  type PageKey,
} from "@/lib/content";
import { localizedPath } from "@/lib/i18n";
import { MobileMenu } from "@/components/mobile-menu";
import { ui } from "@/lib/ui";

function localizedUrl(locale: Locale, page: PageKey) {
  return localizedPath(locale, paths[page]);
}

function label(locale: Locale, japanese: string, english: string) {
  return locale === "ja" ? japanese : english;
}

export function SiteHeader({
  locale,
  page,
}: {
  locale: Locale;
  page: PageKey;
}) {
  return (
    <header className={ui.siteHeader}>
      <div className={ui.headerInner}>
        <Link
          className={ui.brand}
          href={localizedUrl(locale, "home")}
          aria-label="PLANEX Home"
        >
          <Image
            className={ui.headerLogo}
            src={assets.headerLogo}
            alt="株式会社プラネックス"
            width={440}
            height={168}
            unoptimized
          />
        </Link>

        <nav
          className={ui.nav}
          aria-label={label(locale, "メインナビゲーション", "Main navigation")}
        >
          {nav.map((item) => {
            const active =
              item.key === page || item.children?.includes(page) === true;

            return (
              <div className="group relative flex-none" key={item.key}>
                <Link
                  className={`${ui.navLink}${active ? ` ${ui.navLinkActive}` : ""}`}
                  href={localizedUrl(locale, item.key)}
                  aria-label={item[locale]}
                  aria-current={item.key === page ? "page" : undefined}
                >
                  {item[locale]}
                </Link>
                {item.children && (
                  <div className={ui.navDropdown}>
                    {item.children
                      .filter((child) => child !== item.key)
                      .map((child) => (
                        <Link
                          className={ui.navDropdownLink}
                          key={child}
                          href={localizedUrl(locale, child)}
                          aria-current={child === page ? "page" : undefined}
                        >
                          {navLabels[child][locale]}
                        </Link>
                      ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className={ui.lang}>
          <Link
            href={localizedUrl("ja", page)}
            hrefLang="ja"
            aria-current={locale === "ja" ? "page" : undefined}
          >
            日本語
          </Link>
          {"　|　"}
          <Link
            href={localizedUrl("en", page)}
            hrefLang="en"
            aria-current={locale === "en" ? "page" : undefined}
          >
            EN
          </Link>
        </div>

        <MobileMenu locale={locale} page={page} />
      </div>
    </header>
  );
}

export function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className={ui.footer}>
      <div className={ui.wrap}>
        <div className={ui.footerGrid} id="site-map">
          <div>
            <div className={ui.footerBrand}>
              <Image
                className={`${ui.footerLogo} ${ui.footerLogoSecondary}`}
                src={assets.planexLogo}
                alt="株式会社プラネックス"
                width={317}
                height={43}
                unoptimized
              />
              <Image
                className={ui.footerLogo}
                src={assets.gikenLogo}
                alt="株式会社プラネックス技研"
                width={436}
                height={64}
                unoptimized
              />
            </div>
            <p className={`${ui.muted} ${ui.footerTagline}`}>{tagline[locale]}</p>
          </div>

          <div>
            <strong className={ui.footerHeading}>{label(locale, "お問い合わせ", "Contact")}</strong>
            <p className={ui.muted}>
              〒371-0122<br />
              {label(
                locale,
                "群馬県前橋市小坂子町922-4（東部芳賀工業団地内）",
                "922-4 Kosako-machi, Maebashi, Gunma 371-0122, Japan (Tobu Haga Industrial Park)",
              )}
            </p>
            <p>
              <a href="tel:0272696321">TEL 027-269-6321</a>
              <br />
              FAX 027-269-6320<br />
              <a href="mailto:planex@mx7.mesh.ne.jp">
                planex@mx7.mesh.ne.jp
              </a>
            </p>
          </div>

          <div>
            <strong className={ui.footerHeading}>{label(locale, "サイトマップ", "Site map")}</strong>
            <div className={ui.footerLinks}>
              {nav.map((item) => (
                <Link key={item.key} href={localizedUrl(locale, item.key)}>
                  {item[locale]}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className={ui.copyright}>
          {locale === "ja"
            ? "© 株式会社プラネックス / 株式会社プラネックス技研"
            : "© PLANEX / PLANEX GIKEN"}
        </div>
      </div>
    </footer>
  );
}

export function Breadcrumb({
  locale,
  page,
}: {
  locale: Locale;
  page: PageKey;
}) {
  return (
    <div className={ui.crumb}>
      <Link href={localizedUrl(locale, "home")}>
        {label(locale, "ホーム 金型製作・射出成型", "Home · Moldmaking and injection molding")}
      </Link>
      {"　/　"}
      {titles[page][locale]}
    </div>
  );
}

export function PageHeading({
  locale,
  page,
}: {
  locale: Locale;
  page: PageKey;
}) {
  return (
    <section className={ui.pageHero}>
      <div className={ui.wrap}>
        <h1 className={ui.pageHeroTitle}>{titles[page][locale]}</h1>
        <div className={ui.muted}>{tagline[locale]}</div>
        <Breadcrumb locale={locale} page={page} />
      </div>
    </section>
  );
}

export function LayoutFrame({
  children,
  locale,
  page,
}: {
  children: React.ReactNode;
  locale: Locale;
  page: PageKey;
}) {
  return (
    <>
      <SiteHeader locale={locale} page={page} />
      <div className="flex-1">{children}</div>
      <SiteFooter locale={locale} />
      <Link className={`${ui.button} ${ui.mobileContact}`} href={localizedUrl(locale, "contact")}>
        {label(locale, "お問い合わせ", "Contact")} →
      </Link>
    </>
  );
}

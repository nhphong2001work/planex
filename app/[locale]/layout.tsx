import type { Metadata } from "next";
import { absoluteUrl, siteOrigin } from "@/lib/seo";
import { isLocale, localizedPath, type Locale } from "@/lib/i18n";
import "../globals.css";

const siteDetails = {
    ja: {
        brand: "株式会社プラネックス",
        title: "株式会社プラネックス | 商品開発のベストパートナー",
        description:
            "簡易金型、射出成形、CAD/CAM請負・派遣、治工具製作まで。株式会社プラネックス・株式会社プラネックス技研。",
        openGraphLocale: "ja_JP",
        imageAlt: "株式会社プラネックスのCAD/CAM業務",
    },
    en: {
        brand: "PLANEX",
        title: "PLANEX | Product Development Partner",
        description:
            "PLANEX and Planex Giken support product development through prototype moldmaking, injection molding, CAD/CAM design and staffing, and manufacturing tooling.",
        openGraphLocale: "en_US",
        imageAlt: "PLANEX CAD/CAM services",
    },
} as const;

type LocaleLayoutProps = Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>;

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
    const { locale: requestedLocale } = await params;
    const locale: Locale = isLocale(requestedLocale) ? requestedLocale : "ja";
    const details = siteDetails[locale];

    return {
        metadataBase: new URL(siteOrigin),
        title: {
            default: details.title,
            template: `%s | ${details.brand}`,
        },
        description: details.description,
        applicationName: details.brand,
        icons: {
            icon: "/images/planex/header-logo.png",
        },
        alternates: {
            canonical: localizedPath(locale, ""),
            languages: {
                ja: absoluteUrl("/ja"),
                en: absoluteUrl("/en"),
                "x-default": absoluteUrl("/ja"),
            },
        },
        openGraph: {
            type: "website",
            siteName:
                locale === "ja"
                    ? "株式会社プラネックス | PLANEX"
                    : "PLANEX | Planex Giken",
            locale: details.openGraphLocale,
            title: details.title,
            description: details.description,
            images: [{
                url: "/images/planex/cad-cam.jpg",
                width: 631,
                height: 353,
                alt: details.imageAlt,
            }],
        },
        twitter: {
            card: "summary_large_image",
            title: details.title,
            description: details.description,
            images: ["/images/planex/cad-cam.jpg"],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-image-preview": "large",
                "max-snippet": -1,
                "max-video-preview": -1,
            },
        },
    };
}

export default async function LocaleRootLayout({
    children,
    params,
}: LocaleLayoutProps) {
    const { locale: requestedLocale } = await params;
    const locale: Locale = isLocale(requestedLocale) ? requestedLocale : "ja";

    return (
        <html
            lang={locale}
            data-scroll-behavior="smooth"
            className="scroll-smooth motion-reduce:scroll-auto"
        >
            <body className="m-0 flex min-h-screen flex-col bg-white font-japanese text-lg font-semibold leading-loose text-ink max-[760px]:text-base">
                {children}
            </body>
        </html>
    );
}

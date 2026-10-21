import type { NextConfig } from "next";

const legacyRedirects = [
    ["/", "/ja"],
    ["/home", "/ja"],
    ["/事業内容", "/ja/business"],
    [
        "/事業内容/cad-cam-設計請負-人材派遣-株式会社プラネックス技研",
        "/ja/services/cad-cam",
    ],
    ["/振動溶着治具-治工具", "/ja/services/vibration-welding-jigs"],
    [
        "/金型加工機-成形エンジニア人材派遣-株式会社プラネックス技研",
        "/ja/services/molding-engineers",
    ],
    ["/射出成形金型-株式会社プラネックス", "/ja/services/injection-mold"],
    ["/製品紹介", "/ja/products"],
    ["/製品紹介/射出成型品", "/ja/products/injection-molded"],
    ["/製品紹介/振動溶着品", "/ja/products/vibration-welded"],
    ["/製品紹介/振動溶着治具-治工具", "/ja/products/jigs"],
    [
        "/製品紹介/振動溶着治具-治工具-株式会社プラネックス",
        "/ja/products/jigs",
    ],
    ["/会社概要", "/ja/company"],
    ["/沿革", "/ja/history"],
    ["/contact-10", "/ja/contact"],
    ["/複製-お問い合わせ", "/ja/contact"],
    ["/求人募集", "/ja/careers/apply"],
    ["/複製-求人募集-cad-cam-itエンジニア", "/ja/careers/apply"],
    ["/求人募集itエンジニア", "/ja/careers/it-engineers"],
    ["/求人応募一般", "/ja/careers/apply"],
    ["/お知らせ", "/ja/news"],
    ["/post/:slug", "/ja/news"],
    ["/it関連", "/ja/it"],
    ["/itエンジニア紹介", "/ja/services/it-engineers"],
] as const;

const nextConfig: NextConfig = {
    cacheComponents: true,
    partialPrefetching: true,
    async redirects() {
        return legacyRedirects.map(([source, destination]) => ({
            source: encodeURI(source),
            destination,
            permanent: true,
        }));
    },
};

export default nextConfig;

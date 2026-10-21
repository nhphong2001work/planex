import Image from "next/image";
import Link from "next/link";
import { assets } from "@/lib/assets";
import { products, paths, type Locale, t } from "@/lib/content";
import { localizedPath } from "@/lib/i18n";
import { ui } from "@/lib/ui";

function path(locale: Locale, page: string) {
return localizedPath(locale, page);
}

export function ProductCategoryGallery({ locale }: { locale: Locale }) {
const categoryImages = [
  { src: assets.moldedProducts[0], alt: t(locale, "射出成形品", "Injection-molded product"), width: 456, height: 301 },
  { src: assets.vibrationWelded, alt: t(locale, "振動溶着品", "Vibration-welded product"), width: 775, height: 514 },
  { src: assets.customerStorySlides[1], alt: t(locale, "製造工程で使用する切削工具", "Cutting tool used in the manufacturing process"), width: 720, height: 384 },
];
return (
<div className={ui.grid3}>
  {products.map((product, index) => (
  <Link className={`${ui.card} ${ui.productCategory} overflow-hidden !p-0`} key={product.key} href={path(locale, paths[product.key])}>
    <Image
      src={categoryImages[index].src}
      alt={categoryImages[index].alt}
      width={categoryImages[index].width}
      height={categoryImages[index].height}
      unoptimized
      className="aspect-[1.7/1] h-auto w-full object-cover"
    />
    <div className="p-6">
      <h2>{locale === "ja" ? product.ja : product.en}</h2>
      <span>{t(locale, "詳しく見る", "Learn more")}　↗</span>
    </div>
  </Link>
  ))}
</div>
);
}

export function InjectionProductGallery({ locale }: { locale: Locale }) {
const captionsEn = ["Cover", "Impeller", "Secondary-molded clamp", "Case", "Box", "Vibration-welded product"];
return (
<div className={`${ui.grid3} ${ui.productGallery}`}>
  {products[0].labels.map((caption, index) => (
  <figure className="min-w-0" key={caption}>
    <Image
    className={ui.imageReveal}
    src={assets.moldedProducts[index]}
    alt={locale === "ja" ? caption : captionsEn[index]}
    width={456}
    height={301}
    unoptimized
    />
  <figcaption className={ui.galleryCaption}>{locale === "ja" ? caption : captionsEn[index]}</figcaption>
  </figure>
  ))}
</div>
);
}

export function VibrationProductImage({ locale }: { locale: Locale }) {
return (
<figure className={`${ui.vibrationImage} min-w-0`}>
  <Image
  className={ui.imageReveal}
  src={assets.vibrationWelded}
  alt={t(locale, "振動溶着品", "Vibration-welded product")}
  width={775}
  height={514}
  unoptimized
  />
<figcaption className={ui.galleryCaption}>{t(locale, "振動溶着品", "Vibration-welded product")}</figcaption>
</figure>
);
}

export function CadCamImage() {
return (
<figure className={ui.cadCamImage}>
  <Image className={ui.imageReveal} src={assets.cadCam} alt="CATIA" width={631} height={353} unoptimized />
</figure>
);
}

export function InjectionProductsPage({ locale }: { locale: Locale }) {
return (
<section className={ui.section}>
  <div className={ui.wrap}>
    <p className="mb-7 text-xl leading-relaxed">
      {t(
      locale,
      "プラネックスでは金型設計・金型製作・成形・検査の全ての工程を自社グループ企業内で一貫して行えることが最大の特徴であり強みとなっております。一貫生産（一貫した品質管理）を行えることのメリットを最大限に活かして、安定した品質の製品提供をお約束致します。また、金型設計の約半分を海外グループ会社（フィリピン）で行う事により、一層の低コストと短納期を実現しております。",
      "Planex’s greatest strength is the ability to carry out every process—from mold design and mold production to molding and inspection—within its group companies. By making the most of integrated production (consistent quality control), we promise to provide products with stable quality. In addition, approximately half of mold design is performed by our overseas group company in the Philippines, achieving further cost reductions and shorter lead times.",
      )}
    </p>
    <InjectionProductGallery locale={locale} />
  </div>
</section>
);
}

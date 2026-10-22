import Image from "next/image";
import Link from "next/link";
import { assets } from "@/lib/assets";
import { products, paths, type Locale, t } from "@/lib/content";
import { localizedPath } from "@/lib/i18n";
import { ui } from "@/lib/ui";

function path(locale: Locale, page: string) {
  return localizedPath(locale, page);
}

export function PhotoPlaceholder({ locale, className }: { locale: Locale; className: string }) {
  return (
    <div className={`flex items-center justify-center bg-paper px-4 text-center text-muted ${className}`}>
      {t(locale, "※写真準備中", "Photo coming soon")}
    </div>
  );
}

export function ProductCategoryGallery({ locale }: { locale: Locale }) {
  const categoryImages = [
    { src: assets.moldedProducts[0], alt: t(locale, "射出成形品", "Injection-molded product"), width: 456, height: 301 },
    { src: assets.vibrationWelded, alt: t(locale, "振動溶着品", "Vibration-welded product"), width: 775, height: 514 },
    null,
  ];
  return (
    <div className={ui.grid3}>
      {products.map((product, index) => (
        <Link className={`${ui.card} ${ui.productCategory} overflow-hidden p-0!`} key={product.key} href={path(locale, paths[product.key])}>
          {categoryImages[index] ? (
            <Image
              src={categoryImages[index].src}
              alt={categoryImages[index].alt}
              width={categoryImages[index].width}
              height={categoryImages[index].height}
              unoptimized
              className="aspect-[1.7/1] h-auto w-full object-cover"
            />
          ) : (
            <PhotoPlaceholder locale={locale} className="aspect-[1.7/1] w-full" />
          )}
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
        <p className={ui.muted}>
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

export function InjectionMoldServiceGallery({ locale }: { locale: Locale }) {
  const processImages = [
    {
      src: "/images/planex/injection-mold1.avif",
      alt: t(locale, "射出成形工程", "Injection molding process"),
      caption: t(locale, "CNC加工機の操作", "CNC Machine Operation"),
    },
    {
      src: "/images/planex/injection-mold2.avif",
      alt: t(locale, "射出成形の金型", "Injection mold"),
      caption: t(locale, "精密フライス加工", "Precision Milling"),
    },
    {
      src: "/images/planex/injection-mold3.avif",
      alt: t(locale, "射出成形設備", "Injection molding equipment"),
      caption: t(locale, "品質検査", "Quality Inspection"),
    },
    {
      src: "/images/planex/injection-mold4.avif",
      alt: t(locale, "成形品の確認", "Inspecting a molded part"),
      caption: t(locale, "完成部品", "Finished Components"),
    },
  ];
  return (
    <section>
      <p className={ui.eyebrow}>{t(locale, "現場の様子", "INSIDE OUR PROCESS")}</p>
      <h2 className={ui.sectionTitle}>{t(locale, "金型から成形まで、一貫したものづくり", "From mold to finished part")}</h2>
      <div className="mt-8 grid grid-cols-2 gap-5 max-[760px]:grid-cols-1">
        {processImages.map((image) => (
          <figure className="group relative m-0 min-w-0 overflow-hidden bg-paper" key={image.src}>
            <Image
              src={image.src}
              alt={image.alt}
              width={1200}
              height={800}
              unoptimized
              className="aspect-3/2 h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none"
            />
            <figcaption className="absolute bottom-4 left-4 max-w-[calc(100%-2rem)] bg-navy/85 px-3 py-2 text-sm font-bold text-white">
              {image.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

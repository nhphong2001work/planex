import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { LayoutFrame, PageHeading } from "@/components/site";
import { EmailForm } from "@/components/forms";
import { HomePage } from "@/components/home";
import { LocationMap } from "@/components/location-map";
import { HistoryTimeline } from "@/components/history-timeline";
import { companyLocation, paths, titles, seoDescriptions, serviceCards, newsItems, type Locale, type PageKey, t } from "@/lib/content";
import Link from "next/link";
import { ProductCategoryGallery, InjectionProductsPage, InjectionMoldServiceGallery, VibrationProductImage, CadCamImage, PhotoPlaceholder } from "@/components/galleries";
import { ItCareersPage, ItHomePage, ItServicePage } from "@/components/it-pages";
import { isLocale, localizedPath } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { assets } from "@/lib/assets";
const keys = Object.keys(paths) as PageKey[];
const socialImages: Partial<Record<PageKey, {
  src: string;
  alt: Record<Locale, string>;
}>> = {
  home: {
    src: assets.moldedProducts[0],
    alt: { ja: "簡易金型製作・射出成形品", en: "Prototype moldmaking and injection molding" },
  },
  cad: {
    src: assets.cadCam,
    alt: { ja: "CAD/CAM設計作業", en: "CAD/CAM design work" },
  },
  "jigs-service": {
    src: assets.customerStorySlides[1],
    alt: { ja: "製造工程で使用する切削工具", en: "Cutting tool used in the manufacturing process" },
  },
  engineers: {
    src: assets.customerStorySlides[0],
    alt: { ja: "製造現場での加工の様子", en: "Machining work on the production floor" },
  },
  mold: {
    src: assets.moldedProducts[0],
    alt: { ja: "射出成形品", en: "Injection-molded product" },
  },
  products: {
    src: assets.moldedProducts[0],
    alt: { ja: "プラネックスの製品", en: "Planex product" },
  },
  "injection-products": {
    src: assets.moldedProducts[0],
    alt: { ja: "射出成形品", en: "Injection-molded product" },
  },
  "welded-products": {
    src: assets.vibrationWelded,
    alt: { ja: "振動溶着品", en: "Vibration-welded product" },
  },
  "jigs-products": {
    src: assets.customerStorySlides[1],
    alt: { ja: "製造工程で使用する切削工具", en: "Cutting tool used in the manufacturing process" },
  },
  "it-home": {
    src: assets.itCoding,
    alt: { ja: "ITシステムの開発作業", en: "IT system development" },
  },
  "it-service": {
    src: assets.itCoding,
    alt: { ja: "ITシステムの開発作業", en: "IT system development" },
  },
  "it-careers": {
    src: assets.itCoding,
    alt: { ja: "ITエンジニアの業務", en: "IT engineering work" },
  },
};
function url(locale: Locale, key: PageKey) { return localizedPath(locale, paths[key]); }

export const instant = false;
export function generateStaticParams() { return (["ja", "en"] as Locale[]).flatMap(locale => keys.map(key => ({ locale, slug: paths[key] ? paths[key].split("/") : [] }))); }
export async function generateMetadata({ params }: {
  params: Promise<{ locale: string; slug?: string[] }>;
}): Promise<Metadata> {
  const { locale: routeLocale, slug } = await params;
  const locale: Locale = isLocale(routeLocale) ? routeLocale : "ja";
  const key = keys.find((pageKey) => paths[pageKey] === (slug ?? []).join("/")) ?? "home";
  const localizedTitle = titles[key][locale];
  const brand = locale === "ja" ? "株式会社プラネックス" : "PLANEX";
  const pagePath = paths[key];
  const canonicalPath = localizedPath(locale, pagePath);
  const description = seoDescriptions[key][locale];
  const socialTitle = `${localizedTitle} | ${brand}`;
  const socialImage = socialImages[key] ?? {
    src: assets.cadCam,
    alt: {
      ja: "株式会社プラネックスのCAD/CAM業務",
      en: "PLANEX CAD/CAM services",
    },
  };

  return {
    title: { absolute: socialTitle },
    description,
    alternates: {
      canonical: canonicalPath,
      languages: {
        ja: localizedPath("ja", pagePath),
        en: localizedPath("en", pagePath),
        "x-default": localizedPath("ja", pagePath),
      },
    },
    openGraph: {
      type: "website",
      siteName: "株式会社プラネックス | PLANEX",
      locale: locale === "ja" ? "ja_JP" : "en_US",
      url: canonicalPath,
      title: socialTitle,
      description,
      images: [{ url: socialImage.src, alt: socialImage.alt[locale] }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [socialImage.src],
    },
  };
}
export default async function Page({ params }: {
  params: Promise<{
    locale: string;
    slug?: string[];
  }>;
}) {
  const p = await params;
  if (!isLocale(p.locale)) notFound();
  const locale = p.locale as Locale;
  const key = keys.find(k => paths[k] === (p.slug ?? []).join("/"));
  if (!key)
    notFound();
  return (
    <div className="flex min-h-screen flex-col">
      <LayoutFrame locale={locale} page={key}>
        {key === "home" ? (
          <HomePage locale={locale} />
        ) : (
          <>
            <PageHeading locale={locale} page={key} />
            <main>
              <PageContent locale={locale} page={key} />
            </main>
          </>
        )}
      </LayoutFrame>
    </div>
  );
}
function ServiceList({ locale }: {
  locale: Locale;
}) {
  return <div className="mt-6">{serviceCards.map((s, i) =>
    <Link className={ui.serviceRow} key={s.key} href={url(locale, s.key)}>
      <span className={ui.serviceNum}>0{i + 1}</span>
      <span>
        <h3 className={ui.serviceTitle}>{locale === "ja" ? s.ja : s.en}</h3>
        <p className={ui.serviceText}>{locale === "ja" ? s.descJa : s.descEn}</p>
      </span>
      <span className={ui.arrow} aria-hidden="true">↗</span>
    </Link>)}</div>;
}
function PageContent({ locale, page }: {
  locale: Locale;
  page: PageKey;
}) {
  switch (page) {
    case "business": return <section className={ui.section}>
      <div className={ui.wrap}>
        <p className={ui.muted}>{t(locale, "簡易金型、射出成形、治工具、CAD/CAM人材派遣・設計請負など、グループ各社が担う事業をご案内します。", "An overview of our group’s work in prototype molds, injection molding, tooling, and CAD/CAM staffing and design outsourcing.")}</p>
        <ServiceList locale={locale} />
      </div>
    </section>;
    case "cad": return <>
      <CadCamImage />
      <Cad locale={locale} />
    </>;
    case "jigs-service": return <Jigs locale={locale} />;
    case "engineers": return <Engineers locale={locale} />;
    case "mold": return <Mold locale={locale} />;
    case "products": return <section className={ui.section}>
      <div className={ui.wrap}>
        <ProductCategoryGallery locale={locale} />
      </div>
    </section>;
    case "injection-products": return <InjectionProductsPage locale={locale} />;
    case "welded-products": return <section className={ui.section}>
      <div className={ui.wrap}>
        <p className={ui.muted}>{t(locale, "エンジンのインテークマニホールド、エアークリーナー、グローブボックやスポイラー等、\n振動溶着を必要とする自動車部品は増加傾向にあります。\n製品のデータを基に振動溶着機で溶着作業まで一貫して行っております。", "Automotive components requiring vibration welding, such as engine intake manifolds, air cleaners, glove boxes and spoilers, are increasing. Welding is carried out through to the vibration-welding machine process based on product data.")}</p>
        <VibrationProductImage locale={locale} />
      </div>
    </section>;
    case "jigs-products": return <section className={ui.section}>
      <div className={ui.wrap}>
        <p className={ui.notice + " mb-4"}>{t(locale, "治具設計から試作・量産用振動溶着治具・治工具の製作、及び 試作品は溶着作業も行っております。", "From jig design through production of prototype and production vibration-welding jigs and tools; welding work is also available for prototypes.")}</p>
        <div className={ui.grid2}>
          <div>
            <h2>{t(locale, "試作用振動溶着治具 UPPER", "Prototype vibration-welding jig UPPER")}</h2>
            <figure className="m-0 min-w-0">
              <PhotoPlaceholder locale={locale} className="aspect-[1.875/1] w-full" />
            </figure>
          </div>
          <div>
            <h2>{t(locale, "試作用振動溶着治具 LOWER", "Prototype vibration-welding jig LOWER")}</h2>
            <figure className="m-0 min-w-0">
              <PhotoPlaceholder locale={locale} className="aspect-[1.875/1] w-full" />
            </figure>
          </div>
        </div>
      </div>
    </section>;
    case "company": return <div className={ui.wrap}>
      <Company locale={locale} />
      <LocationMap locale={locale} />
    </div>;

    case "history": return <History locale={locale} />;
    case "contact": return <section className={ui.section}>
      <div className={ui.wrap}>
        <div className={ui.grid2}>
          <div className="max-lg:hidden">
            <div className={ui.eyebrow}>CONTACT</div>
            <h2 className={ui.sectionTitle}>{t(locale, "お問い合わせ先", "Contact information")}</h2>
            <div className={ui.card}>
              <h3>{companyLocation.name[locale]}</h3>
              <p>{t(locale, "金型・治具製作、射出成形、CAD/CAM受託、人材派遣", "Mold and jig production, injection molding, CAD/CAM outsourcing, and staffing")}</p>
              <p>{t(locale, "〒371-0122", "〒371-0122")}<br />{companyLocation.address[locale].replace(/^〒371-0122\s*/, "")}</p>
              <div className="mt-5 border-t border-line pt-4">
                <p className="m-0 text-sm font-bold text-muted">{t(locale, "電話番号", "Phone")}</p>
                <a className="mt-1 block text-lg font-bold text-navy hover:text-blue" href="tel:0272696321">027-269-6321</a>
              </div>
              <div className="mt-4 border-t border-line pt-4">
                <p className="m-0 text-sm font-bold text-muted">{t(locale, "メールアドレス", "Email")}</p>
                <a className="mt-1 block break-all text-lg font-bold text-navy hover:text-blue" href="mailto:planex@mx7.mesh.ne.jp">planex@mx7.mesh.ne.jp</a>
              </div>
              <p className="mb-0 mt-5">
                <a href="https://www.google.com/maps/search/?api=1&query=%E6%A0%AA%E5%BC%8F%E4%BC%9A%E7%A4%BE%E3%83%97%E3%83%A9%E3%83%8D%E3%83%83%E3%82%AF%E3%82%B9%E5%89%8D%E6%A9%8B%E5%B7%A5%E5%A0%B4" 
                target="_blank" rel="noreferrer">{t(locale, "Googleマップで所在地を確認", "View location on Google Maps")} ↗</a>
              </p>
            </div>
          </div>
          <div>
            <div className={ui.eyebrow}>CONTACT FORM</div>
            <h2 className={ui.sectionTitle}>{t(locale, "お問い合わせフォーム", "Enquiry form")}</h2>
            <p className={ui.muted + " mb-3"}>{t(locale, "ご相談・お見積もりのご依頼など、お気軽にお問い合わせください。", "Please feel free to contact us with questions or quotation requests.")}</p>
            <EmailForm kind="contact" locale={locale} />
          </div>
        </div>
      </div>
    </section>;
    case "apply": return <section className={ui.section}>
      <div className={ui.wrap}>
        <h2 className={ui.sectionTitle}>{t(locale, "エントリー・採用に関するお問い合わせ", "Applications and recruitment enquiries")}</h2>
        <p className={ui.muted}>
          {t(
            locale,
            "ご応募や採用に関するご質問は、以下のフォームよりお送りください。内容を確認のうえ、担当者よりご連絡いたします。",
            "Please use the form below to apply or ask questions about recruitment. Our team will review your message and get back to you.",
          )}
        </p>
        <EmailForm kind="apply" locale={locale} />
      </div>
    </section>;
    case "careers": return <Careers locale={locale} />;
    case "it-careers": return <ItCareersPage locale={locale} />;
    case "news": return <News locale={locale} />;
    case "it-home": return <ItHomePage locale={locale} />;
    case "it-service": return <ItServicePage locale={locale} />;
  }
}
function Cad({ locale }: {
  locale: Locale;
}) {
  const ja = locale === "ja"; const paragraphs = ja ? ["製品や部品の設計を行うため、設計者はCADソフトウェアを使用して、3Dモデルや2D図面を作成します。これにより、設計プロセスが効率化され、正確な寸法や形状が得られます。CADは機械設計、電子機器・自動車樹脂部品などのさまざまな分野で使用されています。", "CADで作成された設計データをもとに、工作機械のNCデータ作成をします。CAMは、切削加工、穴あけなどの製造プロセスに適用されます。これにより、生産効率が向上し、品質が向上します。", "CADやCAMの専門知識を持つエンジニアを必要とするプロジェクトに対して、適切なスキルを持つ人材を派遣します。", "派遣要員を受け入れる程ではないが工数が足りない。急ぎのデータ処理をしなければならないが工数に空きがない。プラネックスでは国内のみならず、海外子会社と連携して短期間で正確なデータ作成のお手伝いを致します。", "自動車部品ならばインパネやバンパー、グローブボックスなどのプラスティック部品に限らず、ドアやボンネット、シャシーなどの金属部品およびプレス金型等のCAD/CAMデータの作成を行っております。"] : ["Designers use CAD software to create 3D models and 2D drawings of products and components. CAD supports accurate dimensions and shapes across mechanical design, electronic equipment and automotive resin parts.", "CAM uses CAD design data to create NC data for machine tools, for processes such as cutting and drilling.", "We dispatch engineers with CAD/CAM expertise to projects that need those skills.", "When a team lacks capacity for urgent data processing, Planex can collaborate with domestic and overseas group companies to support accurate data creation in a short time.", "Automotive work includes CAD/CAM data for resin parts such as instrument panels, bumpers and glove boxes, as well as metal parts such as doors, hoods, chassis and press dies."]; return <section className={ui.section}>
    <div className={ui.wrap}>
      <div className={ui.grid2}>{["CAD", "CAM", ja ? "人材派遣" : "Staffing", ja ? "CAD・CAM設計請負" : "Design outsourcing"].map((h, i) =>
        <article className={ui.card} key={h}>
          <div className={ui.eyebrow}>0{i + 1}</div>
          <h2>{h}</h2>
          <p className={ui.muted}>{paragraphs[i]}</p>
        </article>)}</div>
      <p className={`${ui.notice} mb-5 mt-24`}>{paragraphs[4]}</p>
      <h2 className={ui.sectionTitle}>{t(locale, "保有CAD・CAMソフトウエア", "CAD/CAM software listed on the source site")}</h2>
      <table className={ui.table}>
        <tbody>{[["CATIA V5", "7台", "7 systems"], ["Cimatron E", "2台", "2 systems"], ["CADmeister", "9台", "9 systems"], ["Autodesk Inventor", "1台", "1 system"], ["NX", "2台", "2 systems"], ["AutoCAD", "1台", "1 system"]].map(([n, j, e]) =>
          <tr key={n}>
            <th>{n}</th>
            <td>{ja ? j : e}</td>
          </tr>)}</tbody>
      </table>
    </div>
  </section>;
}
function Jigs({ locale }: { locale: Locale }) {
  return <section className={ui.section}>
    <div className={ui.wrap}>
      <p className={ui.notice}>{t(locale, "治具設計から試作・量産用振動溶着治具・治工具の製作、及び試作品は溶着作業も行っております。", "We design and manufacture prototype and production vibration-welding jigs and tools. Welding work is also available for prototypes.")}</p>
      <h2 className={`${ui.sectionTitle} mt-11`}>{t(locale, "振動溶着治具", "Vibration-welding jigs")}</h2>
      <p>{t(locale, "振動溶着治具は、プラスチック製品の成型工程後の製品組立工程で使用されます。製品と製品の受けを作って接合させる「振動溶着機」と呼ばれる機械に、当社内製治具と製品をセットし、機械が製品に加圧をかけ、治具と製品を振動させます。これによって生じた摩擦熱が樹脂を溶かして接合する工法です。", "Vibration-welding jigs are used to assemble plastic products after molding. The jig and product are placed in a machine called a vibration welder, which supports and joins the parts. The machine applies pressure to the product and vibrates the jig and product. The resulting frictional heat melts the resin and bonds the parts.")}</p>
      <p>{t(locale, "当社では、その中でも主に「振動溶着治具」を設計・製造しています。振動溶着治具は、プラスチック部品同士を効率的に接合するための重要なツールです。以下に詳細を説明します。", "Among these, Planex primarily designs and manufactures vibration-welding jigs. These jigs are essential tools for efficiently joining plastic parts. More details are provided below.")}</p>
      <div className={`${ui.grid3} mt-8`}>{[[t(locale, "役割", "Role"), t(locale, "部品同士を正確に位置合わせし、圧力と振動を加えて接合します。", "Jigs align plastic parts and apply pressure and vibration for joining.")], [t(locale, "設計・製造", "Design and production"), t(locale, "部品の3Dデータをもとに、形状・材質・仕様を考慮して設計します。", "Jigs are designed from 3D part data, taking shape, material and specifications into account.")], [t(locale, "適用分野", "Applications"), t(locale, "自動車、医療、家庭用品、家電、建築部品などで活用されています。", "Applications include automotive, medical, household, appliance and building components.")]].map(([h, b]) =>
        <div className={ui.card} key={h}>
          <h3>{h}</h3>
          <p className={ui.muted}>{b}</p>
        </div>)}</div>
      <h3 className="mt-10">{t(locale, "振動溶着治具生産実績数", "Vibration-welding jigs produced")}</h3>
      <div className={ui.grid2}>
        <div className={ui.card}>
          <strong>30 {t(locale, "台", "units")}</strong>
          <br />{t(locale, "量産用振動溶着治具", "Production jigs")}</div>
        <div className={ui.card}>
          <strong>50 {t(locale, "台", "units")}</strong>
          <br />{t(locale, "試作用振動溶着治具", "Prototype jigs")}</div>
      </div>
    </div>
  </section>;
}
function Engineers({ locale }: {
  locale: Locale;
}) {
  const ja = locale === "ja"; const list = ja ? ["豊富な経験と実績: 経験と実績に基づき、お客様のニーズに的確に応えます。", "全国各地に多種多様な職種の人材を迅速にご提供いたします。", "高い専門性: 製造現場に関する深い知識と経験を持つスタッフが常駐しております。"] : ["Extensive experience: We respond to customer needs based on experience and track record.", "We provide people across a range of roles throughout Japan.", "Specialist knowledge: Staff have deep knowledge and experience in manufacturing operations."]; return <section className={ui.section}>
    <div className={ui.wrap}>
      <h2 className={ui.sectionTitle}>{t(locale, "製造業の人材不足にお困りではありませんか？", "Facing a staffing shortage in manufacturing?")}</h2>
      <p className={ui.notice}>{t(locale, "製造現場に必要なあらゆる人材を派遣いたします。お客様のニーズに合わせた最適な人材をご提案し、製造現場の課題解決と事業発展をサポートいたします。", "We dispatch personnel for manufacturing operations and propose candidates suited to your needs, supporting the resolution of operational challenges and business development.")}</p>
      <div className={`${ui.grid3} mt-8`}>{list.map((x, i) =>
        <div className={ui.card} key={i}>
          <div className={ui.eyebrow}>0{i + 1}</div>
          <p>{x}</p>
        </div>)}</div>
      <h3 className="mt-10">{t(locale, "このようなお客様に", "For customers who")}</h3>
      <ul className="mb-4">
        <li>{t(locale, "製造現場の人手不足にお困りのお客様", "Are experiencing staff shortages in manufacturing")}</li>
        <li>{t(locale, "製造現場の課題解決をお考えのお客様", "Are looking to address manufacturing-site challenges")}</li>
      </ul>
      <Link href={url(locale, "contact")} className={ui.button}>{t(locale, "まずはお気軽にご相談ください。", "Please get in touch to discuss your needs.")} →</Link>
    </div>
  </section>;
}
function Mold({ locale }: {
  locale: Locale;
}) {
  const ja = locale === "ja"; const sections = ja ? [["簡易金型とは？", ["簡易金型は、アルミニウムなどの加工しやすい材料で製作される金型です。", "量産用金型と比較して、初期費用を抑えることができます。", "耐久性は量産用金型に劣りますが、約10個から1,000個程度のロット数で十分なコストメリットを感じられることが多いです。"]], ["当社の特徴", ["当社は試作・簡易金型による射出成形を専門としています。", "金型内製率は100%で、3Dデータを送付いただければ金型製作から射出成形まで一貫して対応できます。", "熟練の技術により、段取りほぼゼロで加工を開始でき、短納期・特急対応が可能です。"]], ["取引実績", ["自動車、産業機械、建築、ホビー、保安部品など、さまざまな業界との取引実績があります。", "成形サイズでは350トンまでに対応し、ABS、ポリカーボネート、ナイロンなどの各樹脂素材での射出成形に対応しています。"]]] : [["What is a prototype mold?", ["Prototype molds are made from easy-to-machine materials such as aluminum.", "Compared with production molds, they can reduce initial cost.", "Durability is lower than production molds, but cost benefits are often realized for runs of approximately 10 to 1,000 units."]], ["Our capabilities", ["We specialize in prototyping and injection molding with simplified molds.", "The source site states that in-house mold production is 100%; with 3D data, support can cover moldmaking through injection molding.", "The source describes machining starting with almost no setup, supporting short lead times and rush orders."]], ["Experience and materials", ["Industries listed include automotive, industrial machinery, construction, hobbies and safety-related parts.", "The source states molding capacity up to 350 tons and materials including ABS, polycarbonate and nylon."]]]; return <section className={ui.section}>
    <div className={ui.wrap}>{sections.map(([h, ps]) =>
      <section className="mb-10" key={h as string}>
        <h2 className={ui.sectionTitle}>{h as string}</h2>
        <div className={ui.grid2}>{(ps as string[]).map((p, i) =>
          <div className={ui.card} key={i}>
            <span className={ui.serviceNum}>0{i + 1}</span>
            <p>{p}</p>
          </div>)}</div>
      </section>)}
      <InjectionMoldServiceGallery locale={locale} />
    </div>
  </section>;
}
function Company({ locale }: {
  locale: Locale;
}) {
  const ja = locale === "ja";
  const businessItems = {
    ja: [
      "簡易型による試作品製作、小ロット製品の製作、量産型・射出成形",
      "各種治工具（振動溶着、熱板溶着、検査治具、測定治具、他）製作",
      "CAD/CAMエンジニア派遣事業・CAD/CAM請負事業",
      "ITエンジニア紹介事業",
    ],
    en: [
      "Prototype and small-lot production using simplified molds, production molds, and injection molding",
      "Manufacture of tooling, including vibration-welding and hot-plate-welding tools, inspection jigs, and measuring jigs",
      "CAD/CAM engineer staffing and outsourcing",
      "IT engineer placement",
    ],
  };
  const rows: [string, string | string[], string | string[]][] = [
    ["社名", "株式会社プラネックス", "Planex"],
    ["創業", "昭和31年", "Founded 1956"],
    ["設立", "昭和52年", "Established 1977"],
    ["資本金", "5千万円", "Capital: ¥50 million"],
    ["代表取締役社長", "内山 清昭", "President: 内山 清昭"],
    ["売上高", "10億円", "Sales: ¥1 billion"],
    ["グループ会社", "株式会社プラネックス技研（日本）／Planex Technology Inc.（Philippines）", "Planex Giken (Japan) / Planex Technology Inc. (Philippines)"],
    ["事業内容", businessItems.ja, businessItems.en],
    // ["所在地", "〒371-0122 群馬県前橋市小坂子町922-4（東部芳賀工業団地内）", "922-4 Kosako-machi, Maebashi, Gunma 371-0122, Japan (Tobu Haga Industrial Park)"],
    // ["電話・FAX", "027-269-6321 / 027-269-6320", "+81-27-269-6321 / +81-27-269-6320"],
    // ["Email", "planex@mx7.mesh.ne.jp", "planex@mx7.mesh.ne.jp"],
  ];
  return <section className={ui.section}>
    <p className={`${ui.muted} mb-7`}>{t(locale, "アプリ開発・派遣　CAD/CAM請負・派遣　簡易金型製作まで商品開発のベストパートナー 株式会社プラネックス・株式会社プラネックス技研", "Application development and staffing, CAD/CAM outsourcing and staffing, prototype moldmaking — Planex and Planex Giken, your product development partner.")}</p>
    <table className={ui.table}>
      <tbody>{rows.map(([label, j, e]) =>
        <tr key={label}>
          <th>{t(locale, label, ({ 社名: "Company", 創業: "Founded", 設立: "Established", 資本金: "Capital", 代表取締役社長: "President", 売上高: "Sales", グループ会社: "Group companies", 事業内容: "Business activities", 所在地: "Address", "電話・FAX": "Phone / Fax", Email: "Email" } as Record<string, string>)[label])}</th>
          <td>
            {label === "事業内容" ? (
              <ul className="list-disc space-y-2 pl-5">
                {(ja ? businessItems.ja : businessItems.en).map((item) => <li key={item}>{item}</li>)}
              </ul>
            ) : ja ? j : e}
          </td>
        </tr>)}</tbody>
    </table>
  </section>;
}
function Careers({ locale }: {
  locale: Locale;
}) {
  const ja = locale === "ja"; const rows: [
    string,
    string,
    string
  ][] = [["業務内容", "CAD/CAM設計者・自動車部品設計", "CAD/CAM designer · automotive parts design"], ["要件", "CAD/CAMに多少の知識があればなお可。但し、無くても可。", "Some CAD/CAM knowledge preferred, but not required."], ["勤務時間", "平日 8:30～17:30", "Weekdays, 8:30–17:30"], ["勤務地", "前橋事業本部・秋田事業所", "Maebashi business office · Akita office"], ["休日", "土曜日・日曜日 ※第1土曜有給奨励／ゴールデンウィーク、お盆、年末年始", "Saturday and Sunday (paid leave encouraged on first Saturday); Golden Week, summer and year-end holidays."], ["給与（現行・見込）", "月給：基本給180,000円、住宅手当20,000円、食事手当8,000円、精勤手当5,000円、残業手当（残業時間に応じて支払い）。合計213,000円。", "Monthly: base ¥180,000; housing ¥20,000; meal ¥8,000; attendance ¥5,000; overtime paid according to hours. Total ¥213,000."], ["交通費", "ガソリン券支給", "Gasoline vouchers provided."], ["加入保険", "健康・厚生・雇用・労災", "Health, employees’ pension, employment and workers’ compensation insurance."], ["退職金制度", "有り", "Available."], ["応募・選考要領", "応募書類：履歴書・卒業見込証明書／選考方法：面接／受付期間：2026年2月1日以降", "Documents: résumé and expected-graduation certificate. Selection: interview. Applications accepted from February 1, 2026."]]; const english: Record<string, string> = { 業務内容: "Responsibilities", 要件: "Qualifications", 勤務時間: "Working hours", 勤務地: "Location", 休日: "Days off", "給与（現行・見込）": "Compensation", 交通費: "Transport", 加入保険: "Insurance", 退職金制度: "Retirement benefit", "応募・選考要領": "Application and selection" }; return <section className={ui.section}>
    <div className={ui.wrap}>
      <table className={`${ui.table} mt-5`}>
        <tbody>{rows.map(([a, b, c]) =>
          <tr key={a}>
            <th>{ja ? a : english[a]}</th>
            <td>{ja ? b : c}</td>
          </tr>)}</tbody>
      </table>
      <div className="mt-6">
        <Link className={ui.button} href={url(locale, "apply")}>{t(locale, "求人応募 一般", "General application")} →</Link>
      </div>
    </div>
  </section>;
}
function History({ locale }: {
  locale: Locale;
}) {
  return <section className={ui.section}>
    <div className={`${ui.wrap} ${ui.grid2}`}>
      <div className="col-span-2 max-[760px]:col-span-1">
        <div className={ui.eyebrow}>OUR HISTORY</div>
        <h2 className={ui.sectionTitle}>{t(locale, "創業と設立", "Founding and establishment")}</h2>
        <p className={ui.notice}>{t(locale, "株式会社プラネックスは昭和31年に創業。当初は「内山商会」として始まり、その後有限会社となり「東協工業有限会社」に改称しました。", "Planex was founded in 1956 as Uchiyama Shokai. It later became a limited company and was renamed Tōkyō Kōgyō Yūgen Kaisha (東協工業有限会社).")}</p>
      </div>
      <div className="min-w-0">
        <div className={`${ui.card} mt-6 min-w-0 max-[760px]:p-5`}>
          <h3 className="mb-2">{t(locale, "主な事業", "Main businesses")}</h3>
          <ul className="list-disc space-y-2 wrap-break-word pl-5">
            <li>{t(locale, "簡易型による試作品製作、小ロット製品の製作、量産型・射出成形", "Prototype and small-lot production using simplified molds, production molds, and injection molding")}</li>
            <li>{t(locale, "各種治工具（振動溶着、熱板溶着、検査治具、測定治具など）の製作", "Manufacture of tooling, including vibration-welding and hot-plate-welding tools, inspection jigs, and measuring jigs")}</li>
            <li>{t(locale, "CAD/CAMエンジニア派遣事業・CAD/CAM請負事業", "CAD/CAM engineer staffing and outsourcing")}</li>
          </ul>
        </div>
        <div className={`${ui.card} mt-6 min-w-0 max-[760px]:p-5`}>
          <h3 className="mb-2">{t(locale, "グループ各社の役割", "Group locations and roles")}</h3>
          <ul className="list-disc space-y-2 wrap-break-word pl-5">
            <li>{t(locale, "株式会社プラネックス前橋事業本部：射出成形用簡易型の製作、成形、治工具の設計製作。", "Planex Maebashi: prototype injection molds, molding, and jig/tool design and production.")}</li>
            <li>{t(locale, "株式会社プラネックス技研：CAD/CAMエンジニア派遣・請負。", "Planex Giken: CAD/CAM engineer staffing and outsourcing.")}</li>
            <li>{t(locale, "Planex Technology, Inc.（Philippines）：CAD/CAM設計支援、エンジニアの教育。", "Planex Technology, Inc. (Philippines): CAD/CAM design support and engineer training.")}</li>
          </ul>
        </div>
      </div>
      <div className="min-w-0">
        <h2 className={ui.sectionTitle}>{t(locale, "当社の沿革", "Company timeline")}</h2>
        <HistoryTimeline locale={locale} />
      </div>
    </div>
  </section>;
}
function News({ locale }: {
  locale: Locale;
}) {
  const ja = locale === "ja"; return <section className={ui.section}>
    <div className={ui.wrap}>
      {newsItems.map((n, index) =>
        <article className={ui.newsRow} key={n.date}>
          <span className={ui.muted}>{ja ? n.date : n.dateEn}</span>
          <div>
            <span className={ui.tag}>{t(locale, "お知らせ", "Notice")}</span>
            <h2 className="my-2 text-lg">{ja ? n.title : n.titleEn}</h2>
            <p>{ja ? n.body : n.bodyEn}</p>
            <Image
              src={assets.newsImages[index]}
              alt={ja ? n.title : n.titleEn}
              width={1200}
              height={800}
              unoptimized
              className="mt-4 aspect-3/2 h-auto w-full max-w-115 object-cover"
            />
          </div>
        </article>)}</div>
  </section>;
}

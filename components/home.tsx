import Image from "next/image";
import Link from "next/link";
import { assets } from "@/lib/assets";
import { paths, type Locale } from "@/lib/content";
import { localizedPath } from "@/lib/i18n";
import { OrganizationJsonLd } from "@/components/organization-jsonld";
import { ui } from "@/lib/ui";
import { customerStory } from "@/lib/content";
import { CustomerStoryMedia } from "@/components/customer-story-media";

function href(locale: Locale, page: string) {
return localizedPath(locale, page);
}

export function HomePage({ locale }: { locale: Locale }) {
const japanese = locale === "ja";

return (
<main>
  <OrganizationJsonLd />
  <section className="grid grid-cols-2 items-stretch max-[760px]:grid-cols-1" id="service-chooser">
    <div className="flex min-w-0 items-center bg-[#f2f6f4] py-18 pl-[max(24px,calc((100vw-1480px)/2))] pr-8 max-[760px]:px-[max(18px,calc((100vw-560px)/2))] max-[760px]:py-12">
      <div className="w-full max-w-[700px]">
      <h1 className={ui.heroTitle}>{japanese ? "簡易金型・CAD／CAM" : "Prototype molds · CAD/CAM"}</h1>
        <ul className={ui.homeList}>
        <li>{japanese ? "簡易金型製造" : "Prototype moldmaking"}</li>
        <li>{japanese ? "射出成形" : "Injection molding"}</li>
        <li>{japanese ? "CAD/CAM請負/派遣" : "CAD/CAM outsourcing / staffing"}</li>
        <li>{japanese ? "振動溶着治具製造" : "Vibration-welding jig production"}</li>
        </ul>
        <Link className={ui.button} href={href(locale, paths.business)}>
          GO →
        </Link>
      <h2 className={ui.homeItTitle}>{japanese ? "IT関連" : "IT-related"}</h2>
        <ul className={ui.homeList}>
        <li>{japanese ? "アプリ開発" : "Application development"}</li>
        <li>{japanese ? "ITエンジニア派遣" : "IT engineer staffing"}</li>
        </ul>
        <Link className={ui.buttonLight} href={href(locale, paths["it-home"])}>
          GO →
        </Link>
      </div>
    </div>
    <div className="flex min-w-0 items-center bg-[#e4ece9] py-18 pl-8 pr-[max(24px,calc((100vw-1480px)/2))] max-[760px]:px-[max(18px,calc((100vw-560px)/2))] max-[760px]:py-12">
      <div className={`${ui.homeImages} w-full max-w-[700px]`}>
        <figure>
          <Image className={ui.imageReveal}
          src={assets.moldedProducts[0]}
          alt={japanese ? "株式会社プラネックス 金型製作・射出成形" : "Planex moldmaking and injection molding"}
          width={760}
          height={500}
          unoptimized
          />
        <figcaption className={ui.homeCaption}>{japanese ? "株式会社プラネックス 金型製作・射出成形" : "Planex moldmaking and injection molding"}</figcaption>
        </figure>
        <figure>
          <Image className={ui.imageReveal}
          src={assets.cadCam}
          alt={japanese ? "CAD/CAM請負・派遣" : "CAD/CAM outsourcing and staffing"}
          width={760}
          height={430}
          unoptimized
          />
        <figcaption className={ui.homeCaption}>{japanese ? "CAD/CAM請負・派遣" : "CAD/CAM outsourcing and staffing"}</figcaption>
        </figure>
      </div>
    </div>
  </section>
  <section className="grid grid-cols-2 items-stretch max-[760px]:grid-cols-1" aria-labelledby="customer-story-title">
    <div className="order-1 flex min-w-0 items-center bg-[#e4ece9] py-16 pl-[max(24px,calc((100vw-1480px)/2))] pr-8 max-[760px]:order-2 max-[760px]:px-[max(18px,calc((100vw-560px)/2))] max-[760px]:py-10">
      <div className="w-full max-w-[720px]">
        <CustomerStoryMedia locale={locale} />
      </div>
    </div>
    <div className="order-2 flex min-w-0 items-center bg-[#f2f6f4] py-16 pl-8 pr-[max(24px,calc((100vw-1480px)/2))] max-[760px]:order-1 max-[760px]:px-[max(18px,calc((100vw-560px)/2))] max-[760px]:py-10">
      <div className="w-full max-w-[720px]">
        <p className="mb-3 text-sm font-bold tracking-[0.18em] text-blue">
          {japanese ? "PLANEXのものづくり" : "HOW WE MAKE A DIFFERENCE"}
        </p>
        <h2 id="customer-story-title" className={ui.sectionTitle}>
          {customerStory.title[locale]}
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-[1.95] text-ink max-[760px]:text-base">
          {customerStory.paragraphs.map((paragraph, index) => (
            <p key={index} className="m-0">{paragraph[locale]}</p>
          ))}
        </div>
      </div>
    </div>
  </section>
</main>
);
}

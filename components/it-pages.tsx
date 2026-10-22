import Image from "next/image";
import Link from "next/link";
import { assets } from "@/lib/assets";
import { itCareerDetails, paths, type Locale, t } from "@/lib/content";
import { localizedPath } from "@/lib/i18n";
import { ui } from "@/lib/ui";

function href(locale: Locale, destination: string) {
return localizedPath(locale, destination);
}

export function ItHomePage({ locale }: { locale: Locale }) {
return (
<section className={ui.section}>
  <div className={ui.wrap}>
    <div className={ui.itImageGrid}>
      <figure>
        <Image className={ui.imageReveal} src={assets.itCoding} alt={t(locale, "コンピューターでのコーディング", "Coding on a computer")} width={980} height={654} unoptimized />
      <figcaption className={`${ui.homeCaption} max-[760px]:text-sm`}>{t(locale, "コンピューターでのコーディング", "Coding on a computer")}</figcaption>
      </figure>
      <figure>
        <Image className={ui.imageReveal} src={assets.itNetwork} alt={t(locale, "ネットワークケーブル", "Network cable")} width={980} height={652} unoptimized />
      <figcaption className={`${ui.homeCaption} max-[760px]:text-sm`}>{t(locale, "ネットワークケーブル", "Network cable")}</figcaption>
      </figure>
    </div>
    <h2 className={`${ui.sectionTitle} mb-6 mt-4 text-3xl max-[760px]:text-2xl`}>
      {t(locale, "株式会社プラネックスは、ITで未来を切り開く企業です。", "Planex is a company opening up the future through IT.")}
    </h2>
    <p className="max-[760px]:text-sm">
      {t(
      locale,
      "株式会社プラネックスは、ITで未来を切り開く企業です。私たちはPython・C言語・PHP・Javaを駆使して、革新的なアプリ開発をしています。業界のトレンドを先取りし、常に進化を続けことで、IT企業として成長を目指しています。お客様のニーズに応えるソリューションを提供し、共に未来を築いていきます。",
      "We develop innovative applications using Python, C, PHP and Java. By staying ahead of industry trends and continuing to evolve, we aim to grow as an IT company. We provide solutions that meet our customers’ needs and build the future together.",
      )}
    </p>
    <div className={ui.itActions}>
    <Link className={ui.button} href={href(locale, paths["it-service"])}>{t(locale, "業務内容", "Services")} →</Link>
    <Link className={ui.buttonLight} href={href(locale, paths["it-careers"])}>{t(locale, "求人募集", "Careers")} →</Link>
    <Link className={ui.buttonLight} href={href(locale, paths.contact)}>{t(locale, "お問い合わせ", "Contact")} →</Link>
    </div>
  </div>
</section>
);
}

export function ItServicePage({ locale }: { locale: Locale }) {
return (
<section className={ui.section}>
  <div className={ui.wrap}>
  <h2 className={ui.sectionTitle}>{t(locale, "アプリ開発", "Application Development")}</h2>
    <p className="mb-10 max-[760px]:text-sm">
      {t(
      locale,
      "Python・C言語・PHP・Javaを使用したアプリ開発を行っています。私たちの専門知識を活かし、クライアントのニーズに応じた高品質なアプリケーションを提供します。",
      "We develop applications using Python, C, PHP and Java. Drawing on our expertise, we provide high-quality applications tailored to client needs.",
      )}
    </p>
    <div className={ui.itServiceLayout}>
      <div>
      <h2 className={ui.sectionTitle}>{t(locale, "ITエンジニアを必要としていませんか？", "Do you need IT engineers?")}</h2>
      <h3>{t(locale, "派遣までの流れ", "Staffing process")}</h3>
        <ol className={`${ui.processList} max-[760px]:text-sm`}>
        <li>{t(locale, "弊社へご連絡いただき、後日、担当営業とお打合せをさせていただきます。", "Contact us. A sales representative will arrange a meeting with you." )}</li>
        <li>{t(locale, "お客様にご紹介するITエンジニアとの面接を行っていただきます。", "Interview the IT engineer we introduce to you.")}</li>
        <li className="mb-4">{t(locale, "双方合意した場合は、派遣社員として勤務することとなります。", "If both parties agree, the engineer will work as a dispatched employee.")}</li>
        </ol>
        <Link className={ui.button} href={href(locale, paths.contact)}>
          {t(locale, "まずはお気軽にご相談ください。", "Please feel free to contact us.")} →
        </Link>
      </div>
      <Image src={assets.itMachine} alt="MC" width={679} height={449} unoptimized />
    </div>
  </div>
</section>
);
}

export function ItCareersPage({ locale }: { locale: Locale }) {
  const japanese = locale === "ja";

  return (
    <section className={ui.section}>
      <div className={ui.wrap}>
        <table className={`${ui.table} mt-5 max-[760px]:[&_td]:text-sm max-[760px]:[&_th]:text-sm`}>
          <tbody>
            {itCareerDetails.map((detail) => (
              <tr key={detail.jaLabel}>
                <th>{japanese ? detail.jaLabel : detail.enLabel}</th>
                <td>{japanese ? detail.ja : detail.en}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-7">
          <Link className={ui.button} href={href(locale, paths.apply)}>
            {t(locale, "求人応募 一般", "General job application")} →
          </Link>
        </div>
      </div>
    </section>
  );
}

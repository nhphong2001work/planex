import { absoluteUrl } from "@/lib/seo";

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "株式会社プラネックス",
  alternateName: "Planex",
  url: absoluteUrl("/ja"),
  logo: absoluteUrl("/images/planex/planex-logo.png"),
  telephone: "+81-27-269-6321",
  email: "planex@mx7.mesh.ne.jp",
  address: {
    "@type": "PostalAddress",
    postalCode: "371-0122",
    addressCountry: "JP",
    addressRegion: "群馬県",
    addressLocality: "前橋市",
    streetAddress: "小坂子町922-4（東部芳賀工業団地内）",
  },
  knowsAbout: [
    "簡易金型製作",
    "射出成形",
    "CAD/CAM",
    "振動溶着治具製作",
  ],
};

export function OrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
    />
  );
}

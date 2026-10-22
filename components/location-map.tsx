
import { companyLocation, type Locale } from "@/lib/content";
import { ui } from "@/lib/ui";

const mapEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6420.968597712414!2d139.1096358!3d36.4216705!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601ef3dd4bb4591b%3A0x6f701eebc9945a32!2z5qCq5byP5Lya56S-44OX44Op44ON44OD44Kv44K5IOWJjeapi-W3peWgtA!5e0!3m2!1sen!2sjp!4v1792632341029!5m2!1sen!2sjp";

export function LocationMap({ locale }: { locale: Locale }) {
  return (
    <section className={ui.locationSection}>
      <div className={ui.locationHeader}>
        <div>
          <p className={ui.eyebrow}>{companyLocation.eyebrow[locale]}</p>
          <h2 className={ui.sectionTitle}>{companyLocation.title[locale]}</h2>
          <p className={ui.locationAddress}>
            <strong>{companyLocation.name[locale]}</strong>
            <br />
            {companyLocation.address[locale]}
          </p>
        </div>
        <a
          href={companyLocation.directionsUrl}
          target="_blank"
          rel="noreferrer"
          className={ui.button}
        >
          {companyLocation.directionsLabel[locale]}
          <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className={`${ui.card} ${ui.locationMapFrame}`}>
        <iframe
          src={mapEmbedUrl}
          title={companyLocation.mapTitle[locale]}
          className={ui.locationMap}
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </section>
  );
}

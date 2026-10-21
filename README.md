# PLANEX corporate website

Local bilingual rebuild using Next.js 16, React 19, TypeScript and Tailwind CSS 4.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000/ja` for Japanese or `http://localhost:3000/en` for English. Build with `npm run build`; run lint with `npm run lint`.

## Search metadata

Localized page titles and descriptions, canonical URLs, language alternates, Open Graph cards, Organization structured data, and the generated `/sitemap.xml` and `/robots.txt` are included. The canonical site origin defaults to `https://www.planex-jp.com`; set `NEXT_PUBLIC_SITE_URL` to the final public origin if it changes. Search ranking depends on Google's indexing and many external factors, so metadata cannot guarantee a particular position.

All route content is available under `app/[locale]/[[...slug]]/page.tsx`; route names and shared copy are centralized in `lib/content.ts`. Shared layout/navigation lives in `components/site.tsx`; shared contact and application forms are in `components/forms.tsx`.

## EmailJS form delivery

The contact and job application forms post to the server-side `/api/forms` route. To enable delivery:

1. Create an EmailJS email service and an admin-notification template. Set **To Email** to `{{to_email}}` and **Bcc** to `{{bcc_emails}}`. The first configured admin address receives the visible To copy; remaining admin addresses receive blind copies.
2. Add `{{description}}` to the admin notification template body. The API formats the submitted contact or application fields into this Japanese description. CV upload is currently disabled in the application form.
3. Create a separate Japanese auto-reply template. Set **To Email** and **Reply To** to `{{to_email}}`, **Subject** to `{{auto_reply_subject}}`, and the message body to `{{description}}`.
4. Copy `.env.example` to `.env.local`, replace the example service, template and public key values, and set `EMAILJS_RECIPIENTS` to the comma-separated admin email list. This single list receives both contact enquiries and job applications. Keep the private key, if used, server-side only.
5. Restart the local server after changing environment variables.

Submissions are forwarded to EmailJS and are not stored by this application. EmailJS account history and retention are subject to the EmailJS account configuration and policies. CV upload and attachment delivery are currently disabled.

## Source audit and TODOs

- The public source pages were inspected on 20 October 2026. The routes cover home, services overview and four details, product overview and three product categories, company overview, history, contact, CAD/CAM recruitment, general application, and news.
- Source page paths, menus, and form behavior do not map exactly to the rebuilt slugs. Legacy Japanese links and `/contact-10` have redirects; original URL patterns should be reviewed if external links are important.
- All 14 original images currently used by the rebuilt pages are saved locally in `public/images/planex/` and mapped in `lib/assets.ts`. Their source URLs are collected in `scripts/download-planex-images.mjs`.
- The vibration-welding jig page itself marks the UPPER and LOWER prototype-jig photos “写真準備中”; those captions are preserved as placeholders. News thumbnails and the author photo were not needed to reproduce the original text and are not included.
- Original news lists a 2026 summer holiday notice dated July 8, 2026; source extraction and site display differ in date precision. Current holiday schedules need company confirmation.
- Recruitment page details have been transcribed from the source, including an application start date of 1 February 2026. Since that date has passed, current vacancy and compensation must be confirmed.
- The original general application form’s selectable options were inspected and reproduced: 営業, 事務, 設計 (金型・製品・治工具), 製造 (射出成型), 製造 (機械加工), その他: 履歴書を提出.
- The general contact page has no verifiable full privacy policy or data retention details. Confirm the company's privacy notice and EmailJS retention settings before accepting live personal information.
- Financial, leadership, capacity, production-rate, production-count, lot-size, and CAD/CAM software inventory details reflect the public site/specification and need company verification before publication.
- The source page named “選択画面” (selection screen) did not reveal its purpose or behavior; no equivalent destination could be verified. IT service detail copy was similarly not available beyond application development and IT engineer staffing.
- English copy is a faithful business-English translation of source information, but should receive native/company review before production use.

Email delivery remains disabled until valid EmailJS environment variables and a matching EmailJS template are configured.

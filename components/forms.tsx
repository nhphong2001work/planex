"use client";

import { useState, type FormEvent } from "react";
import type { Locale } from "@/lib/content";
import { isValidEmail } from "@/lib/form-validation";
import { ui } from "@/lib/ui";

type FormKind = "contact" | "apply";
type FieldName =
  | "company"
  | "department"
  | "last"
  | "first"
  | "phone"
  | "email"
  | "message"
  | "address"
  | "role"
  | "resume"
  | "pr";

type FormField = {
  name: FieldName;
  type?: "text" | "tel" | "email" | "url" | "file";
  required?: boolean;
};

type FormConfig = {
  fields: FormField[];
  requiredFields: FieldName[];
  successJa: string;
  successEn: string;
  submitJa: string;
  submitEn: string;
};

const fieldLabels: Record<FieldName, [string, string]> = {
  company: ["会社名", "Company"],
  department: ["部署名", "Department"],
  last: ["姓", "Last name"],
  first: ["名", "First name"],
  phone: ["電話番号", "Phone"],
  email: ["メール", "Email"],
  message: ["ご依頼内容を入力", "How can we help?"],
  address: ["住所", "Address"],
  role: ["希望職種", "Preferred position"],
  resume: ["履歴書 URL(任意)", "Résumé URL (optional)"],
  pr: ["自己PR", "About you"],
};

const formConfigs: Record<FormKind, FormConfig> = {
  contact: {
    fields: [
      { name: "company" },
      { name: "department" },
      { name: "last" },
      { name: "first" },
      { name: "phone", type: "tel" },
      { name: "email", type: "email" },
      { name: "message" },
    ],
    requiredFields: [
      "company",
      "department",
      "last",
      "first",
      "phone",
      "email",
      "message",
    ],
    successJa: "送信ありがとうございました。",
    successEn: "Thank you for your enquiry.",
    submitJa: "送信する",
    submitEn: "Send enquiry",
  },
  apply: {
    fields: [
      { name: "last" },
      { name: "first" },
      { name: "address" },
      { name: "phone", type: "tel" },
      { name: "email", type: "email" },
      { name: "role" },
      { name: "resume", type: "url", required: false },
      { name: "pr" },
    ],
    requiredFields: ["last", "first", "address", "phone", "email", "role", "pr"],
    successJa: "ご応募ありがとうございました。",
    successEn: "Thank you for your application.",
    submitJa: "送信",
    submitEn: "Submit application",
  },
};

const roleOptions: [string, string][] = [
  ["CAD/CAM設計者", "CAD/CAM designer"],
  [
    "ITエンジニア（システム開発・構築・保守）",
    "IT engineer (system development, implementation and maintenance)",
  ],
  ["営業", "Sales"],
  ["事務", "Administration"],
  ["設計 (金型・製品・治工具)", "Design (molds, products, jigs and tools)"],
  ["製造 (射出成型)", "Manufacturing (injection molding)"],
  ["製造 (機械加工)", "Manufacturing (machining)"],
  ["その他: 履歴書を提出", "Other: submit a résumé"],
];

export function EmailForm({ kind, locale }: { kind: FormKind; locale: Locale }) {
  const isJapanese = locale === "ja";
  const config = formConfigs[kind];
  const [consent, setConsent] = useState(false);
  const [sent, setSent] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendFailed, setSendFailed] = useState(false);
  const [autoReplyFailed, setAutoReplyFailed] = useState(false);

  const text = (japanese: string, english: string) =>
    isJapanese ? japanese : english;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const hasMissingField = config.requiredFields.some((name) =>
      !String(formData.get(name) ?? "").trim(),
    );
    const email = String(formData.get("email") ?? "");
    const validEmail = isValidEmail(email);
    const isValid = !hasMissingField && validEmail;

    setHasErrors(!isValid);
    setSendFailed(false);

    if (!isValid) return;

    setIsSending(true);
    try {
      const response = await fetch("/api/forms", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        setSendFailed(true);
        return;
      }

      const result = await response.json() as { autoReplySent?: boolean };
      setAutoReplyFailed(result.autoReplySent === false);
      setSent(true);
      form.reset();
    } catch {
      setSendFailed(true);
    } finally {
      setIsSending(false);
    }
  }

  function renderField({ name, type = "text", required = true }: FormField) {
    const title = fieldLabels[name][isJapanese ? 0 : 1];

    return (
      <div className={ui.field} key={name}>
        <label htmlFor={name}>
          {title}
          {required && <span aria-label={text("必須", "required")}> *</span>}
        </label>
        {name === "message" || name === "pr" ? (
          <textarea id={name} name={name} required={required} />
        ) : name === "role" ? (
          <select id={name} name={name} required={required}>
            <option value="">{text("選択してください", "Please select")}</option>
            {roleOptions.map(([japanese, english]) => (
              <option key={japanese} value={isJapanese ? japanese : english}>
                {text(japanese, english)}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            required={required}
          />
        )}
      </div>
    );
  }

  if (sent) {
    return (
      <div className={ui.success} role="status">
        <strong>{text(config.successJa, config.successEn)}</strong>
        <p>
          {autoReplyFailed
            ? text(
                "お問い合わせ内容を送信しましたが、自動返信メールを送信できませんでした。",
                "Your submission was sent, but we could not send the confirmation email.",
              )
            : text(
                "確認メールをお送りしました。メールが届かない場合は、迷惑メールフォルダーもご確認ください。",
                "A confirmation email has been sent. If you do not see it, please check your spam folder.",
              )}
        </p>
      </div>
    );
  }

  return (
    <div className={ui.formShell}>
      <p className={ui.notice}>
        {kind === "apply"
          ? text(
              "応募内容は選考のためにEmailJSを通じて送信されます。",
              "Your application will be sent through EmailJS for recruitment purposes.",
            )
          : text(
              "入力内容はお問い合わせへの回答のためにEmailJSを通じて送信されます。",
              "Your enquiry will be sent through EmailJS so we can respond.",
            )}
      </p>

      <label className={ui.consent}>
        <input
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
        />
        <span>
          {text("入力項目を表示", "Show form fields")}
          <br />
          <small>
            {kind === "contact"
              ? text(
                  "(＊上記にチェックすると入力項目が表示されます。)",
                  "(Check above to display the form fields.)",
                )
              : text(
                  "(＊上記をチェックすると入力項目が表示されます。)",
                  "(Check above to display the form fields.)",
                )}
          </small>
        </span>
      </label>

      {consent && (
        <form onSubmit={submit} noValidate encType="multipart/form-data">
          <input type="hidden" name="kind" value={kind} />
          <input type="hidden" name="locale" value={locale} />
          {config.fields.map(renderField)}

          {hasErrors && (
            <div className={ui.error} role="alert">
              {text(
                "必須項目とメールアドレスをご確認ください。",
                "Check the required fields and your email address.",
              )}
            </div>
          )}

          {sendFailed && (
            <div className={ui.error} role="alert">
              {text(
                "送信できませんでした。時間をおいて再度お試しください。",
                "We could not send your message. Please try again later.",
              )}
            </div>
          )}

          <button className={ui.button} type="submit" disabled={isSending}>
            {isSending
              ? text("送信中…", "Sending…")
              : text(config.submitJa, config.submitEn)} →
          </button>
        </form>
      )}
    </div>
  );
}

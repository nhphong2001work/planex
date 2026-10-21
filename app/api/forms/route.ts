import { isAllowedCv, isValidEmail } from "@/lib/form-validation";

const EMAILJS_ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send-form";
const EMAILJS_RATE_LIMIT_DELAY_MS = 1_100;

function jsonError(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

function createEmailForm({
  serviceId,
  templateId,
  publicKey,
  privateKey,
}: {
  serviceId: string;
  templateId: string;
  publicKey: string;
  privateKey?: string;
}) {
  const form = new FormData();
  form.set("service_id", serviceId);
  form.set("template_id", templateId);
  form.set("user_id", publicKey);

  if (privateKey) {
    form.set("accessToken", privateKey);
  }

  return form;
}

async function sendEmail(form: FormData) {
  const response = await fetch(EMAILJS_ENDPOINT, {
    method: "POST",
    body: form,
    signal: AbortSignal.timeout(20_000),
    cache: "no-store",
  });

  const responseBody = await response.text();

  return {
    ok: response.ok,
    status: response.status,
    error: response.ok ? undefined : responseBody.slice(0, 1_000),
  };
}

export async function POST(request: Request) {
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const autoReplyTemplateId = process.env.EMAILJS_AUTOREPLY_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;

  if (!serviceId || !templateId || !autoReplyTemplateId || !publicKey) {
    return jsonError("Email delivery is not configured.", 503);
  }

  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return jsonError("Invalid form submission.", 400);
  }

  const kind = data.get("kind");
  if (kind !== "contact" && kind !== "apply") {
    return jsonError("Invalid form type.", 400);
  }

  const recipients = process.env.EMAILJS_RECIPIENTS
    ?.split(",")
    .map((recipient) => recipient.trim())
    .filter(Boolean);

  if (
    !recipients?.length ||
    recipients.length > 25 ||
    recipients.some((recipient) => !isValidEmail(recipient))
  ) {
    return jsonError("Email recipients are not configured correctly.", 503);
  }

  const requiredFields = kind === "contact"
    ? ["company", "department", "last", "first", "phone", "email", "message"]
    : ["last", "first", "address", "phone", "email", "role", "pr"];

  for (const field of requiredFields) {
    if (!String(data.get(field) ?? "").trim()) {
      return jsonError("Please complete all required fields.", 400);
    }
  }

  const email = String(data.get("email") ?? "");
  if (!isValidEmail(email)) {
    return jsonError("Please enter a valid email address.", 400);
  }

  const cvEntry = data.get("cv");
  const cv = cvEntry instanceof File && cvEntry.size > 0 ? cvEntry : null;

  if (cv && kind !== "apply") {
    return jsonError("Attachments are only accepted with applications.", 400);
  }

  if (cv && !isAllowedCv(cv)) {
    return jsonError("The CV must be a PDF, DOC or DOCX file up to 10 MB.", 400);
  }

  const notificationForm = createEmailForm({
    serviceId,
    templateId,
    publicKey,
    privateKey,
  });
  notificationForm.set("to_email", recipients[0]);
  notificationForm.set("bcc_emails", recipients.slice(1).join(", "));

  const fieldValue = (name: string) => String(data.get(name) ?? "").trim();
  const submittedLanguage = String(data.get("locale") ?? "ja") === "en" ? "英語" : "日本語";
  const description = kind === "contact"
    ? [
        "【お問い合わせ】",
        `送信言語：${submittedLanguage}`,
        `会社名：${fieldValue("company")}`,
        `部署名：${fieldValue("department")}`,
        `氏名：${fieldValue("last")} ${fieldValue("first")}`,
        `電話番号：${fieldValue("phone")}`,
        `メールアドレス：${fieldValue("email")}`,
        "お問い合わせ内容：",
        fieldValue("message"),
      ].join("\n")
    : [
        "【求人応募】",
        `送信言語：${submittedLanguage}`,
        `氏名：${fieldValue("last")} ${fieldValue("first")}`,
        `住所：${fieldValue("address")}`,
        `電話番号：${fieldValue("phone")}`,
        `メールアドレス：${fieldValue("email")}`,
        `希望職種：${fieldValue("role")}`,
        `履歴書URL：${fieldValue("resume") || "未入力"}`,
        "自己PR：",
        fieldValue("pr"),
      ].join("\n");
  notificationForm.set("description", description);

  // CV uploads are accepted and validated, but are not sent as EmailJS attachments.
  // To re-enable delivery, restore the following line and configure the EmailJS
  // template's Form File Attachment parameter as `cv`.
  // if (cv) notificationForm.set("cv", cv, cv.name);

  const autoReplyForm = createEmailForm({
    serviceId,
    templateId: autoReplyTemplateId,
    publicKey,
    privateKey,
  });
  const isApplication = kind === "apply";
  const recipientName = `${String(data.get("last") ?? "").trim()} ${String(data.get("first") ?? "").trim()}`.trim();
  autoReplyForm.set("to_email", email);
  autoReplyForm.set("auto_reply_subject", isApplication
    ? "ご応募ありがとうございます"
    : "お問い合わせありがとうございます");
  const autoReplyMessage = isApplication
    ? "この度は株式会社プラネックスへご応募いただき、誠にありがとうございます。応募内容を確認のうえ、担当者よりご連絡いたします。"
    : "この度は株式会社プラネックスへお問い合わせいただき、誠にありがとうございます。お問い合わせ内容を確認のうえ、担当者よりご連絡いたします。";
  const autoReplyDescription = `${recipientName} 様\n\n${autoReplyMessage}\n\nこのメールは自動送信です。`;
  autoReplyForm.set("description", autoReplyDescription);

  let notificationResult: Awaited<ReturnType<typeof sendEmail>>;
  try {
    notificationResult = await sendEmail(notificationForm);
  } catch {
    return jsonError("EmailJS could not be reached.", 502);
  }

  if (!notificationResult.ok) {
    const safeError = notificationResult.error?.replace(
      /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi,
      "[email address]",
    );
    console.error("EmailJS rejected the form notification.", {
      status: notificationResult.status,
      error: safeError,
    });
    return jsonError("EmailJS could not send this submission.", 502);
  }

  await new Promise((resolve) => setTimeout(resolve, EMAILJS_RATE_LIMIT_DELAY_MS));

  let autoReplySent = false;
  try {
    autoReplySent = (await sendEmail(autoReplyForm)).ok;
  } catch {
    // The admin notification has already been delivered; keep that submission successful.
  }

  return Response.json({ sent: true, autoReplySent });
}

import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { BackToHome } from "@/components/site/BackToHome";
import { useLanguage, withoutTerminalDots, type LocalizedString } from "@/i18n";
import { submitAsset } from "@/lib/api/submission.functions";

export const Route = createFileRoute("/submit")({
  head: () => ({
    meta: [
      { title: "Submit an Asset — REPOSITION LAB" },
      {
        name: "description",
        content:
          "Submit an asset for confidential strategic review by REPOSITION LAB. Reviews are subject to mandate capacity.",
      },
      { property: "og:title", content: "Submit an Asset — REPOSITION LAB" },
      {
        property: "og:description",
        content: "Confidential asset submission for strategic review.",
      },
    ],
  }),
  component: Submit,
});

const page = {
  eyebrow: { en: "Submit an Asset", ru: "Предложить объект" },
  title: {
    en: "Request a confidential strategic review.",
    ru: "Оставить заявку на конфиденциальный разбор объекта.",
  },
  intro: {
    en: "Information submitted through this form is intended for confidential internal review. A formal NDA or secure communication channel may be arranged separately where appropriate.",
    ru: "Информация, переданная через эту форму, предназначена для конфиденциального внутреннего разбора. Формальный NDA или защищённый канал связи могут быть согласованы отдельно там, где это уместно.",
  },
  confidentiality: { en: "Confidentiality", ru: "Конфиденциальность" },
  confidentialityText: {
    en: "Material submitted is intended for internal review only. It should not be treated as a substitute for a formal NDA, secure transfer process or legal instruction.",
    ru: "Переданные материалы предназначены только для внутреннего разбора. Они не заменяют формальный NDA, защищённый процесс передачи материалов или юридическое поручение.",
  },
  next: { en: "What happens next", ru: "Что происходит дальше" },
  nextText: {
    en: "Submissions are reviewed for relevance, asset type, available information and strategic fit. Where appropriate, a follow-up discussion or secure exchange of materials may be arranged. Submission does not guarantee engagement.",
    ru: "Заявки рассматриваются по типу объекта, доступной информации, исходной проблеме и стратегическому соответствию. Там, где это уместно, может быть организовано последующее обсуждение или защищённый обмен материалами. Передача заявки не гарантирует начало работы.",
  },
  capacity: { en: "Capacity", ru: "Ограниченная работа с мандатами" },
  capacityText: {
    en: "We accept a constrained number of mandates per year. Submitting an asset is not a guarantee of engagement.",
    ru: "Мы принимаем ограниченное количество мандатов в год. Предложение объекта не является гарантией начала работы.",
  },
  restrictions: { en: "Restrictions", ru: "Ограничения" },
  restrictionsText: {
    en: "We do not provide retail brokerage, securities offerings or investment recommendations.",
    ru: "Мы не оказываем розничные брокерские услуги, не размещаем предложения ценных бумаг и не даём инвестиционные рекомендации.",
  },
  received: { en: "Received", ru: "Получено" },
  successTitle: {
    en: "Thank you. Your submission has been prepared for confidential review.",
    ru: "Спасибо. Ваша заявка подготовлена для конфиденциального разбора.",
  },
  successBody: {
    en: "This prototype reflects the intended confidential intake flow. In the live version, submissions will be processed through a secure backend with appropriate notification and review handling.",
    ru: "Этот прототип отражает предполагаемый конфиденциальный процесс приёма материалов. В рабочей версии заявки будут обрабатываться через защищённую систему с соответствующими уведомлениями и процедурой рассмотрения.",
  },
  consent: {
    en: "By submitting, you acknowledge that materials are reviewed selectively and that formal confidentiality arrangements may be handled separately where appropriate.",
    ru: "Отправляя форму, вы подтверждаете, что материалы рассматриваются выборочно, а формальные договорённости о конфиденциальности могут быть оформлены отдельно там, где это уместно.",
  },
  button: { en: "Submit Request", ru: "Отправить заявку" },
  submitting: { en: "Sending…", ru: "Отправка…" },
  error: {
    en: "The submission could not be sent. Please try again later or contact office@repositionlab.com.",
    ru: "Не удалось отправить заявку. Повторите попытку позже или напишите на office@repositionlab.com.",
  },
  fileError: {
    en: "Attach up to 3 PDF, JPG, PNG, WEBP or TXT files, no larger than 2 MB each.",
    ru: "Приложите не более 3 файлов PDF, JPG, PNG, WEBP или TXT размером до 2 МБ каждый.",
  },
  select: { en: "Select", ru: "Выбрать" },
} satisfies Record<string, LocalizedString>;

const fields = {
  assetType: { en: "Asset type", ru: "Тип объекта" },
  assetTypePlaceholder: {
    en: "e.g. heritage hotel, industrial, mixed-use",
    ru: "например, исторический отель, индустриальный объект, смешанное использование",
  },
  location: { en: "Asset Location", ru: "Локация объекта" },
  locationPlaceholder: { en: "City, country", ru: "Город, страна" },
  condition: { en: "Current condition", ru: "Текущее состояние" },
  conditionPlaceholder: {
    en: "Operational, stalled, distressed...",
    ru: "Работает, остановлен, проблемное состояние...",
  },
  ownership: { en: "Ownership structure", ru: "Структура владения" },
  ownershipPlaceholder: {
    en: "Single owner, JV, bank-held, fund...",
    ru: "Единоличный владелец, совместное владение, банковское владение, фонд...",
  },
  challenge: { en: "Challenge description", ru: "Описание проблемы" },
  challengePlaceholder: {
    en: "What is trapping value or recovery today?",
    ru: "Что сегодня мешает объекту раскрыть ценность или выйти на более сильный рыночный сценарий?",
  },
  files: { en: "Upload supporting materials", ru: "Загрузить подтверждающие материалы" },
  name: { en: "Name", ru: "Имя" },
  email: { en: "Email", ru: "Email" },
  organization: { en: "Company", ru: "Компания" },
  contactMethod: { en: "Preferred contact method", ru: "Предпочтительный способ связи" },
} satisfies Record<string, LocalizedString>;

const contactOptions: LocalizedString[] = [
  { en: "Email", ru: "Email" },
  { en: "Secure communication", ru: "Защищённая связь" },
  { en: "Introduced by counterparty", ru: "Через представление контрагента" },
];

type AllowedFileType = "application/pdf" | "image/jpeg" | "image/png" | "image/webp" | "text/plain";

function Field({
  label,
  name,
  type = "text",
  required,
  as,
  placeholder,
  selectLabel,
  options,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  as?: "textarea" | "select";
  placeholder?: string;
  selectLabel?: string;
  options?: string[];
}) {
  const base =
    "w-full bg-transparent border-b border-rule focus:border-accent focus:outline-none py-3 text-foreground placeholder:text-muted-foreground/50";
  return (
    <label className="block">
      <span className="eyebrow block mb-3 text-accent">
        {label}
        {required && " *"}
      </span>
      {as === "textarea" ? (
        <textarea
          name={name}
          required={required}
          rows={5}
          placeholder={placeholder}
          className={base}
        />
      ) : as === "select" ? (
        <select name={name} required={required} className={base} defaultValue="">
          <option value="" disabled>
            {selectLabel}
          </option>
          {options?.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      ) : type === "file" ? (
        <input
          type="file"
          name={name}
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.webp,.txt,application/pdf,image/jpeg,image/png,image/webp,text/plain"
          className="block text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:border file:border-rule file:bg-transparent file:text-xs file:tracking-[0.18em] file:uppercase file:text-foreground hover:file:bg-foreground hover:file:text-background"
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          className={base}
        />
      )}
    </label>
  );
}

function Submit() {
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { l } = useLanguage();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSubmitting) return;

    setError(null);
    setIsSubmitting(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const files = formData
        .getAll("files")
        .filter((value): value is File => value instanceof File && value.size > 0);
      const allowedTypes = new Set<string>([
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/webp",
        "text/plain",
      ]);

      if (
        files.length > 3 ||
        files.some((file) => file.size > 2_000_000 || !allowedTypes.has(file.type))
      ) {
        setError(l(page.fileError));
        return;
      }

      const attachments = await Promise.all(
        files.map(
          (file) =>
            new Promise<{ filename: string; content: string; contentType: AllowedFileType }>(
              (resolve, reject) => {
                const reader = new FileReader();
                reader.onerror = () => reject(new Error("File could not be read"));
                reader.onload = () => {
                  const result = String(reader.result);
                  resolve({
                    filename: file.name,
                    content: result.slice(result.indexOf(",") + 1),
                    contentType: file.type as AllowedFileType,
                  });
                };
                reader.readAsDataURL(file);
              },
            ),
        ),
      );

      const value = (name: string) => String(formData.get(name) ?? "");
      const result = await submitAsset({
        data: {
          assetType: value("asset_type"),
          location: value("location"),
          condition: value("condition"),
          ownership: value("ownership"),
          challenge: value("challenge"),
          name: value("name"),
          email: value("email"),
          organization: value("organization"),
          contactMethod: value("contact_method"),
          website: value("website"),
          attachments,
        },
      });

      if (!result.ok) {
        setError(l(page.error));
        return;
      }

      form.reset();
      setSent(true);
    } catch {
      setError(l(page.error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <article>
      <BackToHome />
      <header className="standard-page-hero standard-page-hero-content container-rl">
        <p className="eyebrow text-accent page-reveal page-reveal-delay-1">{l(page.eyebrow)}</p>
        <h1 className="standard-page-hero-title mobile-safe-text serif mt-6 max-w-4xl text-foreground page-reveal page-reveal-delay-2">
          {withoutTerminalDots(l(page.title))}
        </h1>
        <p className="mt-8 max-w-2xl text-foreground/75 text-lg leading-relaxed page-reveal page-reveal-delay-3">
          {l(page.intro)}
        </p>
      </header>

      <section className="border-t border-rule">
        <div className="container-rl py-16 grid lg:grid-cols-12 gap-12">
          <aside className="lg:col-span-4 space-y-8">
            <div>
              <p className="eyebrow mb-3 text-accent">{l(page.confidentiality)}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {l(page.confidentialityText)}
              </p>
            </div>
            <div>
              <p className="eyebrow mb-3 text-accent">{l(page.next)}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{l(page.nextText)}</p>
            </div>
            <div>
              <p className="eyebrow mb-3 text-accent">{l(page.capacity)}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {l(page.capacityText)}
              </p>
            </div>
            <div>
              <p className="eyebrow mb-3 text-accent">{l(page.restrictions)}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {l(page.restrictionsText)}
              </p>
            </div>
          </aside>

          <div className="lg:col-span-8">
            {sent ? (
              <div className="border border-rule p-6 bg-paper sm:p-10">
                <p className="eyebrow text-accent">{l(page.received)}</p>
                <h2 className="mobile-safe-text serif text-3xl mt-4 text-foreground">
                  {l(page.successTitle)}
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">{l(page.successBody)}</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid sm:grid-cols-2 gap-x-8 gap-y-10">
                <label className="sr-only" aria-hidden="true">
                  Website
                  <input name="website" type="text" tabIndex={-1} autoComplete="off" />
                </label>
                <Field
                  label={l(fields.assetType)}
                  name="asset_type"
                  placeholder={l(fields.assetTypePlaceholder)}
                  required
                />
                <Field
                  label={l(fields.location)}
                  name="location"
                  placeholder={l(fields.locationPlaceholder)}
                  required
                />
                <Field
                  label={l(fields.condition)}
                  name="condition"
                  placeholder={l(fields.conditionPlaceholder)}
                />
                <Field
                  label={l(fields.ownership)}
                  name="ownership"
                  placeholder={l(fields.ownershipPlaceholder)}
                />
                <div className="sm:col-span-2">
                  <Field
                    label={l(fields.challenge)}
                    name="challenge"
                    as="textarea"
                    placeholder={l(fields.challengePlaceholder)}
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <Field label={l(fields.files)} name="files" type="file" />
                </div>
                <Field label={l(fields.name)} name="name" required />
                <Field label={l(fields.email)} name="email" type="email" required />
                <Field label={l(fields.organization)} name="organization" />
                <Field
                  label={l(fields.contactMethod)}
                  name="contact_method"
                  as="select"
                  selectLabel={l(page.select)}
                  options={contactOptions.map((option) => l(option))}
                  required
                />

                <div className="sm:col-span-2 pt-4 flex flex-col items-stretch gap-6 border-t border-rule sm:flex-row sm:items-center sm:justify-between">
                  <div className="max-w-md pt-4">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {l(page.consent)}
                    </p>
                    {error ? (
                      <p role="alert" className="mt-3 text-sm leading-relaxed text-destructive">
                        {error}
                      </p>
                    ) : null}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="premium-action px-7 py-3.5 text-[12px] tracking-[0.16em] uppercase disabled:cursor-not-allowed disabled:opacity-50 sm:tracking-[0.18em]"
                  >
                    {isSubmitting ? l(page.submitting) : l(page.button)}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </article>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, type FormEvent } from "react";
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
    en: "Your information has been received for internal review. If the asset is relevant to the practice, we will contact you through your preferred channel to arrange the next exchange.",
    ru: "Информация получена для внутреннего рассмотрения. Если объект соответствует профилю практики, мы свяжемся с вами предпочтительным способом для организации дальнейшего обмена.",
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
  rateLimitError: {
    en: "Too many requests were sent. Please wait an hour before trying again.",
    ru: "Отправлено слишком много запросов. Подождите час перед повторной попыткой.",
  },
  fileError: {
    en: "Supporting materials will be requested through a secure channel after the initial review.",
    ru: "Дополнительные материалы будут запрошены через защищённый канал после первичного рассмотрения.",
  },
  select: { en: "Select", ru: "Выбрать" },
  assetSection: { en: "Asset information", ru: "Информация об объекте" },
  contactSection: { en: "Contact information", ru: "Контактные данные" },
  materialsSection: { en: "Supporting materials", ru: "Дополнительные материалы" },
  requiredError: { en: "Please complete this field.", ru: "Заполните это поле." },
  emailError: { en: "Enter a valid email address.", ru: "Введите корректный email." },
  challengeError: {
    en: "Provide at least 10 characters so the challenge can be understood.",
    ru: "Опишите проблему минимум в 10 символах.",
  },
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

function Field({
  label,
  name,
  type = "text",
  required,
  as,
  placeholder,
  selectLabel,
  options,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  as?: "textarea" | "select";
  placeholder?: string;
  selectLabel?: string;
  options?: string[];
  error?: string;
}) {
  const id = `submission-${name}`;
  const errorId = `${id}-error`;
  const base = `submission-control ${error ? "submission-control--error" : ""}`;
  return (
    <label className="submission-field" htmlFor={id}>
      <span className="submission-label eyebrow text-accent">
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </span>
      {as === "textarea" ? (
        <textarea
          id={id}
          name={name}
          rows={5}
          placeholder={placeholder}
          className={base}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
        />
      ) : as === "select" ? (
        <select
          id={id}
          name={name}
          className={base}
          defaultValue=""
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
        >
          <option value="" disabled>
            {selectLabel}
          </option>
          {options?.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          className={base}
          autoComplete={name === "name" ? "name" : name === "email" ? "email" : "off"}
          inputMode={type === "email" ? "email" : undefined}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
        />
      )}
      {error ? (
        <span id={errorId} className="submission-field-error" role="alert">
          {error}
        </span>
      ) : null}
    </label>
  );
}

function Submit() {
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const resultRef = useRef<HTMLDivElement>(null);
  const { l, language } = useLanguage();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSubmitting) return;

    setError(null);
    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const value = (name: string) => String(formData.get(name) ?? "").trim();
      const nextErrors: Record<string, string> = {};

      for (const name of ["asset_type", "location", "name", "contact_method"]) {
        if (value(name).length < 2) nextErrors[name] = l(page.requiredError);
      }
      if (value("challenge").length < 10) nextErrors.challenge = l(page.challengeError);
      if (!/^\S+@\S+\.\S+$/.test(value("email"))) nextErrors.email = l(page.emailError);

      if (Object.keys(nextErrors).length > 0) {
        setFieldErrors(nextErrors);
        const firstInvalid = form.elements.namedItem(Object.keys(nextErrors)[0]);
        if (firstInvalid instanceof HTMLElement) firstInvalid.focus();
        return;
      }

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
          locale: language,
          website: value("website"),
        },
      });

      if (!result.ok) {
        setError(result.code === "rate_limited" ? l(page.rateLimitError) : l(page.error));
        return;
      }

      form.reset();
      setSent(true);
      requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: "smooth" }));
    } catch {
      setError(l(page.error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <article className="submission-page">
      <BackToHome />
      <header className="submission-hero standard-page-hero standard-page-hero-content container-rl">
        <p className="eyebrow text-accent page-reveal page-reveal-delay-1">{l(page.eyebrow)}</p>
        <h1 className="standard-page-hero-title mobile-safe-text serif mt-6 max-w-4xl text-foreground page-reveal page-reveal-delay-2">
          {withoutTerminalDots(l(page.title))}
        </h1>
        <p className="submission-hero-intro page-reveal page-reveal-delay-3">{l(page.intro)}</p>
      </header>

      <section className="submission-section">
        <div className="container-rl submission-layout">
          <aside className="submission-context">
            <div className="submission-context-item">
              <p className="eyebrow text-accent">{l(page.confidentiality)}</p>
              <p>{l(page.confidentialityText)}</p>
            </div>
            <div className="submission-context-item">
              <p className="eyebrow text-accent">{l(page.next)}</p>
              <p>{l(page.nextText)}</p>
            </div>
            <div className="submission-context-item">
              <p className="eyebrow text-accent">{l(page.capacity)}</p>
              <p>{l(page.capacityText)}</p>
            </div>
            <div className="submission-context-item">
              <p className="eyebrow text-accent">{l(page.restrictions)}</p>
              <p>{l(page.restrictionsText)}</p>
            </div>
          </aside>

          <div className="submission-form-column" ref={resultRef}>
            {sent ? (
              <div className="submission-success" role="status" tabIndex={-1}>
                <p className="eyebrow text-accent">{l(page.received)}</p>
                <h2 className="mobile-safe-text serif submission-success-title">
                  {l(page.successTitle)}
                </h2>
                <p className="submission-success-copy">{l(page.successBody)}</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="submission-form" noValidate>
                <label className="sr-only" aria-hidden="true">
                  Website
                  <input name="website" type="text" tabIndex={-1} autoComplete="off" />
                </label>

                <fieldset className="submission-group">
                  <legend className="submission-group-title serif">
                    <span className="submission-group-index" aria-hidden="true">
                      01
                    </span>
                    {l(page.assetSection)}
                  </legend>
                  <div className="submission-fields-grid">
                    <Field
                      label={l(fields.assetType)}
                      name="asset_type"
                      placeholder={l(fields.assetTypePlaceholder)}
                      required
                      error={fieldErrors.asset_type}
                    />
                    <Field
                      label={l(fields.location)}
                      name="location"
                      placeholder={l(fields.locationPlaceholder)}
                      required
                      error={fieldErrors.location}
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
                  </div>
                  <div className="submission-field-wide">
                    <Field
                      label={l(fields.challenge)}
                      name="challenge"
                      as="textarea"
                      placeholder={l(fields.challengePlaceholder)}
                      required
                      error={fieldErrors.challenge}
                    />
                  </div>
                </fieldset>

                <fieldset className="submission-group">
                  <legend className="submission-group-title serif">
                    <span className="submission-group-index" aria-hidden="true">
                      02
                    </span>
                    {l(page.materialsSection)}
                  </legend>
                  <label className="submission-upload" htmlFor="submission-files">
                    <span className="submission-upload-label">
                      <span className="submission-upload-icon" aria-hidden="true">
                        ↑
                      </span>
                      <span className="submission-label eyebrow text-accent">
                        {l(fields.files)}
                      </span>
                    </span>
                    <span className="submission-upload-help">{l(page.fileError)}</span>
                    <input id="submission-files" name="files" type="file" disabled />
                  </label>
                </fieldset>

                <fieldset className="submission-group">
                  <legend className="submission-group-title serif">
                    <span className="submission-group-index" aria-hidden="true">
                      03
                    </span>
                    {l(page.contactSection)}
                  </legend>
                  <div className="submission-fields-grid">
                    <Field label={l(fields.name)} name="name" required error={fieldErrors.name} />
                    <Field
                      label={l(fields.email)}
                      name="email"
                      type="email"
                      required
                      error={fieldErrors.email}
                    />
                    <Field label={l(fields.organization)} name="organization" />
                    <Field
                      label={l(fields.contactMethod)}
                      name="contact_method"
                      as="select"
                      selectLabel={l(page.select)}
                      options={contactOptions.map((option) => l(option))}
                      required
                      error={fieldErrors.contact_method}
                    />
                  </div>
                </fieldset>

                <div className="submission-actions">
                  <div className="submission-consent">
                    <p>{l(page.consent)}</p>
                    {error ? (
                      <p role="alert" className="submission-form-error">
                        {error}
                      </p>
                    ) : null}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="submission-button premium-action"
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

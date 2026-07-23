import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { B as BackToHome } from "./BackToHome-CBrko6Qo.mjs";
import { u as useLanguage, w as withoutTerminalDots } from "./router-BOowU5Nw.mjs";
import { a as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-wYDH_eUB.mjs";
import "../_libs/seroval.mjs";
import { o as objectType, a as arrayType, s as stringType, e as enumType } from "../_libs/zod.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const attachmentSchema = objectType({
  filename: stringType().min(1).max(160),
  content: stringType().min(1).max(3e6),
  contentType: enumType(["application/pdf", "image/jpeg", "image/png", "image/webp", "text/plain"])
});
const submissionSchema = objectType({
  assetType: stringType().trim().min(2).max(160),
  location: stringType().trim().min(2).max(160),
  condition: stringType().trim().max(300),
  ownership: stringType().trim().max(300),
  challenge: stringType().trim().min(10).max(5e3),
  name: stringType().trim().min(2).max(120),
  email: stringType().trim().email().max(254),
  organization: stringType().trim().max(180),
  contactMethod: stringType().trim().min(2).max(120),
  website: stringType().max(0),
  attachments: arrayType(attachmentSchema).max(3)
});
const submitAsset = createServerFn({
  method: "POST"
}).inputValidator(submissionSchema).handler(createSsrRpc("3c64988934d7bd1d0cd30dfde5cd832298947c4e0ce9234ab57b3581bd2d61f7"));
const page = {
  eyebrow: {
    en: "Submit an Asset",
    ru: "Предложить объект"
  },
  title: {
    en: "Request a confidential strategic review.",
    ru: "Оставить заявку на конфиденциальный разбор объекта."
  },
  intro: {
    en: "Information submitted through this form is intended for confidential internal review. A formal NDA or secure communication channel may be arranged separately where appropriate.",
    ru: "Информация, переданная через эту форму, предназначена для конфиденциального внутреннего разбора. Формальный NDA или защищённый канал связи могут быть согласованы отдельно там, где это уместно."
  },
  confidentiality: {
    en: "Confidentiality",
    ru: "Конфиденциальность"
  },
  confidentialityText: {
    en: "Material submitted is intended for internal review only. It should not be treated as a substitute for a formal NDA, secure transfer process or legal instruction.",
    ru: "Переданные материалы предназначены только для внутреннего разбора. Они не заменяют формальный NDA, защищённый процесс передачи материалов или юридическое поручение."
  },
  next: {
    en: "What happens next",
    ru: "Что происходит дальше"
  },
  nextText: {
    en: "Submissions are reviewed for relevance, asset type, available information and strategic fit. Where appropriate, a follow-up discussion or secure exchange of materials may be arranged. Submission does not guarantee engagement.",
    ru: "Заявки рассматриваются по типу объекта, доступной информации, исходной проблеме и стратегическому соответствию. Там, где это уместно, может быть организовано последующее обсуждение или защищённый обмен материалами. Передача заявки не гарантирует начало работы."
  },
  capacity: {
    en: "Capacity",
    ru: "Ограниченная работа с мандатами"
  },
  capacityText: {
    en: "We accept a constrained number of mandates per year. Submitting an asset is not a guarantee of engagement.",
    ru: "Мы принимаем ограниченное количество мандатов в год. Предложение объекта не является гарантией начала работы."
  },
  restrictions: {
    en: "Restrictions",
    ru: "Ограничения"
  },
  restrictionsText: {
    en: "We do not provide retail brokerage, securities offerings or investment recommendations.",
    ru: "Мы не оказываем розничные брокерские услуги, не размещаем предложения ценных бумаг и не даём инвестиционные рекомендации."
  },
  received: {
    en: "Received",
    ru: "Получено"
  },
  successTitle: {
    en: "Thank you. Your submission has been prepared for confidential review.",
    ru: "Спасибо. Ваша заявка подготовлена для конфиденциального разбора."
  },
  successBody: {
    en: "Your information has been received for internal review. If the asset is relevant to the practice, we will contact you through your preferred channel to arrange the next exchange.",
    ru: "Информация получена для внутреннего рассмотрения. Если объект соответствует профилю практики, мы свяжемся с вами предпочтительным способом для организации дальнейшего обмена."
  },
  consent: {
    en: "By submitting, you acknowledge that materials are reviewed selectively and that formal confidentiality arrangements may be handled separately where appropriate.",
    ru: "Отправляя форму, вы подтверждаете, что материалы рассматриваются выборочно, а формальные договорённости о конфиденциальности могут быть оформлены отдельно там, где это уместно."
  },
  button: {
    en: "Submit Request",
    ru: "Отправить заявку"
  },
  submitting: {
    en: "Sending…",
    ru: "Отправка…"
  },
  error: {
    en: "The submission could not be sent. Please try again later or contact office@repositionlab.com.",
    ru: "Не удалось отправить заявку. Повторите попытку позже или напишите на office@repositionlab.com."
  },
  fileError: {
    en: "Attach up to 3 PDF, JPG, PNG, WEBP or TXT files, no larger than 2 MB each.",
    ru: "Приложите не более 3 файлов PDF, JPG, PNG, WEBP или TXT размером до 2 МБ каждый."
  },
  select: {
    en: "Select",
    ru: "Выбрать"
  },
  assetSection: {
    en: "Asset information",
    ru: "Информация об объекте"
  },
  contactSection: {
    en: "Contact information",
    ru: "Контактные данные"
  },
  materialsSection: {
    en: "Supporting materials",
    ru: "Дополнительные материалы"
  },
  requiredError: {
    en: "Please complete this field.",
    ru: "Заполните это поле."
  },
  emailError: {
    en: "Enter a valid email address.",
    ru: "Введите корректный email."
  },
  challengeError: {
    en: "Provide at least 10 characters so the challenge can be understood.",
    ru: "Опишите проблему минимум в 10 символах."
  },
  removeFile: {
    en: "Remove",
    ru: "Удалить"
  }
};
const fields = {
  assetType: {
    en: "Asset type",
    ru: "Тип объекта"
  },
  assetTypePlaceholder: {
    en: "e.g. heritage hotel, industrial, mixed-use",
    ru: "например, исторический отель, индустриальный объект, смешанное использование"
  },
  location: {
    en: "Asset Location",
    ru: "Локация объекта"
  },
  locationPlaceholder: {
    en: "City, country",
    ru: "Город, страна"
  },
  condition: {
    en: "Current condition",
    ru: "Текущее состояние"
  },
  conditionPlaceholder: {
    en: "Operational, stalled, distressed...",
    ru: "Работает, остановлен, проблемное состояние..."
  },
  ownership: {
    en: "Ownership structure",
    ru: "Структура владения"
  },
  ownershipPlaceholder: {
    en: "Single owner, JV, bank-held, fund...",
    ru: "Единоличный владелец, совместное владение, банковское владение, фонд..."
  },
  challenge: {
    en: "Challenge description",
    ru: "Описание проблемы"
  },
  challengePlaceholder: {
    en: "What is trapping value or recovery today?",
    ru: "Что сегодня мешает объекту раскрыть ценность или выйти на более сильный рыночный сценарий?"
  },
  files: {
    en: "Upload supporting materials",
    ru: "Загрузить подтверждающие материалы"
  },
  name: {
    en: "Name",
    ru: "Имя"
  },
  email: {
    en: "Email",
    ru: "Email"
  },
  organization: {
    en: "Company",
    ru: "Компания"
  },
  contactMethod: {
    en: "Preferred contact method",
    ru: "Предпочтительный способ связи"
  }
};
const contactOptions = [{
  en: "Email",
  ru: "Email"
}, {
  en: "Secure communication",
  ru: "Защищённая связь"
}, {
  en: "Introduced by counterparty",
  ru: "Через представление контрагента"
}];
function Field({
  label,
  name,
  type = "text",
  required,
  as,
  placeholder,
  selectLabel,
  options,
  error
}) {
  const id = `submission-${name}`;
  const errorId = `${id}-error`;
  const base = `submission-control ${error ? "submission-control--error" : ""}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "submission-field", htmlFor: id, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "submission-label eyebrow text-accent", children: [
      label,
      required ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: " *" }) : null
    ] }),
    as === "textarea" ? /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { id, name, rows: 5, placeholder, className: base, "aria-invalid": Boolean(error), "aria-describedby": error ? errorId : void 0 }) : as === "select" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { id, name, className: base, defaultValue: "", "aria-invalid": Boolean(error), "aria-describedby": error ? errorId : void 0, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", disabled: true, children: selectLabel }),
      options?.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: option }, option))
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id, type, name, placeholder, className: base, autoComplete: name === "name" ? "name" : name === "email" ? "email" : "off", inputMode: type === "email" ? "email" : void 0, "aria-invalid": Boolean(error), "aria-describedby": error ? errorId : void 0 }),
    error ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { id: errorId, className: "submission-field-error", role: "alert", children: error }) : null
  ] });
}
function Submit() {
  const [sent, setSent] = reactExports.useState(false);
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [fieldErrors, setFieldErrors] = reactExports.useState({});
  const [selectedFiles, setSelectedFiles] = reactExports.useState([]);
  const resultRef = reactExports.useRef(null);
  const {
    l
  } = useLanguage();
  function onFilesSelected(event) {
    const files = Array.from(event.target.files ?? []);
    const allowedTypes = /* @__PURE__ */ new Set(["application/pdf", "image/jpeg", "image/png", "image/webp", "text/plain"]);
    if (files.length > 3 || files.some((file) => file.size > 2e6 || !allowedTypes.has(file.type))) {
      setSelectedFiles([]);
      setError(l(page.fileError));
      event.target.value = "";
      return;
    }
    setError(null);
    setSelectedFiles(files);
  }
  async function onSubmit(e) {
    e.preventDefault();
    if (isSubmitting) return;
    setError(null);
    setFieldErrors({});
    setIsSubmitting(true);
    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const value = (name) => String(formData.get(name) ?? "").trim();
      const nextErrors = {};
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
      const files = selectedFiles;
      const allowedTypes = /* @__PURE__ */ new Set(["application/pdf", "image/jpeg", "image/png", "image/webp", "text/plain"]);
      if (files.length > 3 || files.some((file) => file.size > 2e6 || !allowedTypes.has(file.type))) {
        setError(l(page.fileError));
        return;
      }
      const attachments = await Promise.all(files.map((file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(new Error("File could not be read"));
        reader.onload = () => {
          const result2 = String(reader.result);
          resolve({
            filename: file.name,
            content: result2.slice(result2.indexOf(",") + 1),
            contentType: file.type
          });
        };
        reader.readAsDataURL(file);
      })));
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
          attachments
        }
      });
      if (!result.ok) {
        setError(l(page.error));
        return;
      }
      form.reset();
      setSelectedFiles([]);
      setSent(true);
      requestAnimationFrame(() => resultRef.current?.scrollIntoView({
        behavior: "smooth"
      }));
    } catch {
      setError(l(page.error));
    } finally {
      setIsSubmitting(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "submission-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(BackToHome, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "submission-hero standard-page-hero standard-page-hero-content container-rl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow text-accent page-reveal page-reveal-delay-1", children: l(page.eyebrow) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "standard-page-hero-title mobile-safe-text serif mt-6 max-w-4xl text-foreground page-reveal page-reveal-delay-2", children: withoutTerminalDots(l(page.title)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "submission-hero-intro page-reveal page-reveal-delay-3", children: l(page.intro) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "submission-section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-rl submission-layout", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "submission-context", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "submission-context-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow text-accent", children: l(page.confidentiality) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: l(page.confidentialityText) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "submission-context-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow text-accent", children: l(page.next) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: l(page.nextText) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "submission-context-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow text-accent", children: l(page.capacity) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: l(page.capacityText) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "submission-context-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow text-accent", children: l(page.restrictions) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: l(page.restrictionsText) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "submission-form-column", ref: resultRef, children: sent ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "submission-success", role: "status", tabIndex: -1, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow text-accent", children: l(page.received) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mobile-safe-text serif submission-success-title", children: l(page.successTitle) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "submission-success-copy", children: l(page.successBody) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "submission-form", noValidate: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "sr-only", "aria-hidden": "true", children: [
          "Website",
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name: "website", type: "text", tabIndex: -1, autoComplete: "off" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { className: "submission-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "submission-group-title serif", children: l(page.assetSection) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "submission-fields-grid", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: l(fields.assetType), name: "asset_type", placeholder: l(fields.assetTypePlaceholder), required: true, error: fieldErrors.asset_type }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: l(fields.location), name: "location", placeholder: l(fields.locationPlaceholder), required: true, error: fieldErrors.location }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: l(fields.condition), name: "condition", placeholder: l(fields.conditionPlaceholder) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: l(fields.ownership), name: "ownership", placeholder: l(fields.ownershipPlaceholder) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "submission-field-wide", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: l(fields.challenge), name: "challenge", as: "textarea", placeholder: l(fields.challengePlaceholder), required: true, error: fieldErrors.challenge }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { className: "submission-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "submission-group-title serif", children: l(page.materialsSection) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "submission-upload", htmlFor: "submission-files", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "submission-label eyebrow text-accent", children: l(fields.files) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "submission-upload-help", children: l(page.fileError) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "submission-files", name: "files", type: "file", multiple: true, onChange: onFilesSelected, accept: ".pdf,.jpg,.jpeg,.png,.webp,.txt,application/pdf,image/jpeg,image/png,image/webp,text/plain" })
          ] }),
          selectedFiles.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "submission-file-list", "aria-live": "polite", children: selectedFiles.map((file, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: file.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              (file.size / 1e6).toFixed(2),
              " MB"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setSelectedFiles((files) => files.filter((_, i) => i !== index)), children: l(page.removeFile) })
          ] }, `${file.name}-${file.lastModified}`)) }) : null
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { className: "submission-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "submission-group-title serif", children: l(page.contactSection) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "submission-fields-grid", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: l(fields.name), name: "name", required: true, error: fieldErrors.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: l(fields.email), name: "email", type: "email", required: true, error: fieldErrors.email }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: l(fields.organization), name: "organization" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: l(fields.contactMethod), name: "contact_method", as: "select", selectLabel: l(page.select), options: contactOptions.map((option) => l(option)), required: true, error: fieldErrors.contact_method })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "submission-actions", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "submission-consent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: l(page.consent) }),
            error ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { role: "alert", className: "submission-form-error", children: error }) : null
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: isSubmitting, className: "submission-button premium-action", children: isSubmitting ? l(page.submitting) : l(page.button) })
        ] })
      ] }) })
    ] }) })
  ] });
}
export {
  Submit as component
};

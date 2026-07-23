import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as BackToHome } from "./BackToHome-CBrko6Qo.mjs";
import { u as useLanguage, w as withoutTerminalDots } from "./router-BOowU5Nw.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
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
const page = {
  eyebrow: {
    en: "Contact",
    ru: "Контакт"
  },
  title: {
    en: "Discreet, institutional, written.",
    ru: "Закрытый профессиональный контакт. Только по существу."
  },
  practice: {
    en: "Practice",
    ru: "Практика"
  },
  location: {
    en: "London, United Kingdom",
    ru: "Лондон, Великобритания"
  },
  operations: {
    en: "Strategic Operations",
    ru: "География работы"
  },
  channels: {
    en: "Channels",
    ru: "Каналы"
  },
  primaryChannel: {
    en: "Primary written contact channel.",
    ru: "Основной письменный канал связи."
  },
  secure: {
    en: "Secure communication",
    ru: "Защищённая связь"
  },
  secureText: {
    en: "Secure communication can be arranged separately for qualified counterparties where appropriate.",
    ru: "Защищённая связь может быть организована отдельно для квалифицированных контрагентов там, где это уместно."
  },
  note: {
    en: "Note",
    ru: "Важно"
  },
  noteText: {
    en: "REPOSITION LAB does not engage with retail enquiries, unsolicited listings or speculative investment offers. For asset submissions, use the confidential review form.",
    ru: "REPOSITION LAB не работает с розничными запросами, обычными объявлениями о продаже или спекулятивными инвестиционными предложениями. Чтобы предложить объект на предварительный разбор, используйте конфиденциальную форму."
  }
};
function Contact() {
  const {
    t,
    l
  } = useLanguage();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "contact-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(BackToHome, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "contact-hero standard-page-hero standard-page-hero-content container-rl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow text-accent page-reveal page-reveal-delay-1", children: l(page.eyebrow) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "standard-page-hero-title mobile-safe-text serif mt-6 max-w-4xl text-foreground page-reveal page-reveal-delay-2", children: withoutTerminalDots(l(page.title)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "contact-details", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-rl contact-details-grid", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "contact-detail contact-detail--practice", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow text-accent", children: l(page.practice) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "contact-practice-name serif", children: "RANTA LIMITED" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "contact-secondary", children: l(page.location) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "contact-detail", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow text-accent", children: l(page.operations) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "contact-locations", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Latvia" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Slovenia" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Turkey" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "contact-detail contact-detail--channel", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow text-accent", children: l(page.channels) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "contact-channels", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:office@repositionlab.com", className: "contact-email mobile-safe-text", children: "office@repositionlab.com" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "contact-channel-caption", children: l(page.primaryChannel) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "contact-secure", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "contact-secure-title", children: l(page.secure) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "contact-channel-caption", children: l(page.secureText) })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "contact-note paper", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-rl contact-note-grid", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow text-accent", children: l(page.note) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "contact-note-content", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mobile-safe-text serif contact-note-text", children: l(page.noteText) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/submit", className: "contact-submit premium-action", children: l(t.common.submitAnAsset) })
      ] })
    ] }) })
  ] });
}
export {
  Contact as component
};

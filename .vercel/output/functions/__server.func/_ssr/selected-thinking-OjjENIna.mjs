import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { B as BackToHome } from "./BackToHome-CBrko6Qo.mjs";
import { u as useLanguage, w as withoutTerminalDots } from "./router-BOowU5Nw.mjs";
import "../_libs/tanstack__react-router.mjs";
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
    en: "Selected Thinking",
    ru: "ИЗБРАННЫЕ МАТЕРИАЛЫ"
  },
  title: {
    en: "Notes on recovery, repositioning and real estate intelligence.",
    ru: "Материалы о перепозиционировании, ликвидности и рыночной логике сложной недвижимости."
  },
  intro: {
    en: "A running set of internal positions. Written for owners and capital who already recognise the problem. Full essays are released selectively under mandate.",
    ru: "Рабочий набор аналитических позиций для собственников и капитала, которые уже видят проблему объекта. Полные материалы раскрываются выборочно в рамках мандата."
  }
};
const pieces = [{
  title: {
    en: "Why distressed assets fail",
    ru: "Почему проблемные объекты теряют рыночную логику"
  },
  excerpt: {
    en: "Most distressed real estate does not fail because of the building. It fails because the thesis around the building collapsed and was never rewritten.",
    ru: "Большинство проблемных объектов теряют позицию не из-за самого здания. Проблема возникает тогда, когда рыночная логика вокруг здания разрушилась и не была переписана."
  }
}, {
  title: {
    en: "Hidden value vs market value",
    ru: "Скрытая стоимость и рыночная стоимость"
  },
  excerpt: {
    en: "Market value reflects how the asset is read today. Hidden value reflects how it can be defensibly re-read. The gap is the discipline.",
    ru: "Рыночная стоимость отражает то, как объект воспринимается сегодня. Скрытый потенциал показывает, как его можно обоснованно переосмыслить. Работа начинается с разницы между этими двумя состояниями."
  }
}, {
  title: {
    en: "Why banks misprice unusual real estate",
    ru: "Почему банки неверно оценивают нестандартную недвижимость"
  },
  excerpt: {
    en: "Institutional pricing models do not accommodate narrative-led assets. The result is systematic underpricing of heritage, industrial and special-situation collateral.",
    ru: "Институциональные модели ценообразования плохо учитывают объекты, чья ценность зависит от истории, сценария использования и восприятия. Результат — системное недооценивание наследия, индустриальных объектов и нестандартного обеспечения."
  }
}, {
  title: {
    en: "Heritage repositioning economics",
    ru: "Экономика репозиционирования наследия"
  },
  excerpt: {
    en: "Heritage value is not a discount. It is a constraint with a yield profile. Treated as such, it becomes capital-attractive.",
    ru: "Ценность наследия — не дисконт. Это ограничение с собственным профилем доходности. Если обращаться с ним правильно, оно становится привлекательным для капитала."
  }
}, {
  title: {
    en: "Hospitality conversion logic",
    ru: "Логика гостиничной конверсии"
  },
  excerpt: {
    en: "Conversion to hospitality is the most over-promised and under-engineered move in distressed real estate. The thesis must precede the floor plan.",
    ru: "Гостиничная конверсия — один из самых часто переобещанных и недоработанных ходов в проблемной недвижимости. Тезис должен предшествовать планировке."
  }
}, {
  title: {
    en: "Liquidity engineering in real estate",
    ru: "Как формируется ликвидность недвижимости"
  },
  excerpt: {
    en: "Illiquidity is a design problem. The path to liquidity is structured before it is marketed.",
    ru: "Неликвидность часто связана не только с ценой, но и со структурой предложения. Путь к ликвидности формируется до того, как объект выводится на рынок."
  }
}, {
  title: {
    en: "Narrative-driven asset repositioning",
    ru: "Репозиционирование через новую рыночную историю"
  },
  excerpt: {
    en: "An asset is the story qualified capital can defend about it. Repositioning is the deliberate authorship of that story.",
    ru: "Объект становится понятнее рынку, когда вокруг него можно обоснованно сформулировать новую историю. Перепозиционирование — сознательная работа с этой историей."
  }
}, {
  title: {
    en: "Adaptive reuse strategies",
    ru: "Стратегии адаптивного использования"
  },
  excerpt: {
    en: "Adaptive reuse succeeds where the new use respects the structural logic of the building — and fails where it fights it.",
    ru: "Адаптивное использование работает там, где новая функция уважает структурную логику здания, и проваливается там, где борется с ней."
  }
}, {
  title: {
    en: "Recovery-focused real estate intelligence",
    ru: "Аналитика недвижимости для сложных объектов"
  },
  excerpt: {
    en: "Recovery is not the opposite of growth. It is the discipline that determines whether growth is defensible.",
    ru: "Рост стоимости имеет смысл только тогда, когда его можно объяснить. Для сложных объектов аналитика должна показывать, какой сценарий действительно можно защитить."
  }
}];
function Thinking() {
  const {
    l
  } = useLanguage();
  const entryRefs = reactExports.useRef([]);
  const [activeEntry, setActiveEntry] = reactExports.useState(0);
  const [effectsReady, setEffectsReady] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const entries = entryRefs.current.filter((entry) => entry !== null);
    if (entries.length === 0) return;
    setEffectsReady(true);
    const observer = new IntersectionObserver((observedEntries) => {
      observedEntries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const index = Number(entry.target.dataset.thinkingIndex);
        setActiveEntry(index);
        entry.target.classList.add("thinking-entry--revealed");
      });
    }, {
      rootMargin: "-22% 0px -48%",
      threshold: 0.08
    });
    entries.forEach((entry) => observer.observe(entry));
    return () => observer.disconnect();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "thinking-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(BackToHome, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "container-rl thinking-hero standard-page-hero standard-page-hero-content", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow text-accent page-reveal page-reveal-delay-1", children: l(page.eyebrow) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "standard-page-hero-title mobile-safe-text serif mt-6 max-w-4xl text-foreground page-reveal page-reveal-delay-2", children: withoutTerminalDots(l(page.title)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "thinking-hero-intro page-reveal page-reveal-delay-3", children: l(page.intro) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-rl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: `thinking-essay ${effectsReady ? "thinking-essay--ready" : ""}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: (element) => {
        entryRefs.current[0] = element;
      }, "data-thinking-index": "0", className: `thinking-essay-opening thinking-entry ${activeEntry === 0 ? "thinking-entry--active" : ""}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mobile-safe-text serif thinking-essay-title", children: l(pieces[0].title) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "thinking-essay-opening-copy", children: l(pieces[0].excerpt) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "thinking-essay-flow", children: pieces.slice(1).map((piece, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { ref: (element) => {
        entryRefs.current[index + 1] = element;
      }, "data-thinking-index": index + 1, className: `thinking-essay-paragraph thinking-entry ${activeEntry === index + 1 ? "thinking-entry--active" : ""}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "serif thinking-essay-lead", children: l(piece.title) }),
        " ",
        l(piece.excerpt)
      ] }, piece.title.en)) })
    ] }) }) })
  ] });
}
export {
  Thinking as component
};

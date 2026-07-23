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
function WhoWeAre() {
  const {
    t,
    l
  } = useLanguage();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "who-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(BackToHome, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "who-hero who-hero--designed standard-page-hero", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "who-hero-bg", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "who-gradient-orb who-gradient-orb--1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "who-gradient-orb who-gradient-orb--2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "who-gradient-orb who-gradient-orb--3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "who-gradient-orb who-gradient-orb--4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "who-light-ribbon who-light-ribbon--1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "who-light-ribbon who-light-ribbon--2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "who-light-ribbon who-light-ribbon--3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "who-refraction-beam who-refraction-beam--1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "who-refraction-beam who-refraction-beam--2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "who-refraction-beam who-refraction-beam--3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "who-caustic-sheen" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "who-architectural-lines", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 720 720", role: "presentation", focusable: "false", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "462", cy: "328", r: "216" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "462", cy: "328", r: "134" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M462 112 A216 216 0 0 1 678 328" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M462 462 A134 134 0 0 0 596 328" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M86 546 C210 376 338 258 646 128" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M138 206 C284 292 418 340 676 346" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M246 694 L642 88" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "462", y1: "58", x2: "462", y2: "678" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "104", y1: "328", x2: "704", y2: "328" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "228", y1: "104", x2: "666", y2: "542" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "598", y1: "116", x2: "598", y2: "646" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "who-hero-content container-rl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow text-accent page-reveal page-reveal-delay-1", children: l(t.who.eyebrow) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "standard-page-hero-title mobile-safe-text serif mt-6 max-w-4xl text-foreground page-reveal page-reveal-delay-2", children: withoutTerminalDots(l(t.who.title)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "who-paper-section paper py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-rl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "who-statement-copy max-w-4xl mx-auto", children: t.who.paragraphs.map((paragraph, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: index === 0 ? "who-statement-lead" : void 0, children: l(paragraph) }, paragraph.en)) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "who-principles-section py-24 border-t border-rule", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-rl grid md:grid-cols-2 gap-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "who-principles-column", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow text-accent", children: l(t.who.believeLabel) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-8 text-muted-foreground leading-relaxed", children: t.who.believe.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "who-principle-item mobile-safe-text border-t border-rule/50 py-3", children: l(item) }, item.en)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "who-principles-column", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow text-accent", children: l(t.who.workLabel) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-8 text-muted-foreground leading-relaxed", children: t.who.work.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "who-principle-item mobile-safe-text border-t border-rule/50 py-3", children: l(item) }, item.en)) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 border-t border-rule", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-rl text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/submit", className: "premium-action px-7 py-3.5 text-[12px] tracking-[0.18em] uppercase", children: l(t.who.cta) }) }) })
  ] });
}
export {
  WhoWeAre as component
};

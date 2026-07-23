import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as BackToHome } from "./BackToHome-CBrko6Qo.mjs";
import { u as useLanguage, w as withoutTerminalDots, c as cases } from "./router-BOowU5Nw.mjs";
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
function Cases() {
  const {
    t,
    l
  } = useLanguage();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "cases-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "cases-hero standard-page-hero", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "cases-hero-bg", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "cases-hero-orb cases-hero-orb--1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "cases-hero-orb cases-hero-orb--2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "cases-hero-ribbon cases-hero-ribbon--1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "cases-hero-ribbon cases-hero-ribbon--2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "cases-hero-ribbon cases-hero-ribbon--3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "cases-hero-flare cases-hero-flare--1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "cases-hero-flare cases-hero-flare--2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "cases-hero-linework", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 760 520", role: "presentation", focusable: "false", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "560", cy: "260", r: "214" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "560", cy: "260", r: "122" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M560 46 A214 214 0 0 1 744 151" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M68 462 C246 270 386 178 724 64" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M106 94 C270 210 430 286 756 306" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M362 518 L714 26" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "560", y1: "0", x2: "560", y2: "520" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "104", y1: "260", x2: "760", y2: "260" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(BackToHome, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "container-rl cases-hero-content", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow text-accent page-reveal page-reveal-delay-1", children: l(t.cases.eyebrow) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "standard-page-hero-title mobile-safe-text serif mt-6 max-w-4xl text-foreground page-reveal page-reveal-delay-2", children: withoutTerminalDots(l(t.cases.title)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 max-w-2xl text-foreground/75 text-lg leading-relaxed page-reveal page-reveal-delay-3", children: l(t.cases.intro) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-rl space-y-px", children: cases.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/cases/$slug", params: {
      slug: c.slug
    }, className: "group grid md:grid-cols-12 gap-10 py-12 border-t border-rule items-start transition-colors hover:border-accent", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `md:col-span-6 ${i % 2 ? "md:order-2" : ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] overflow-hidden border border-rule transition-colors group-hover:border-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: c.img, alt: l(c.title), loading: "lazy", width: 1280, height: 960, className: "w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]", style: c.imgPosition ? {
        objectPosition: c.imgPosition
      } : void 0 }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-6 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mobile-safe-text serif text-2xl md:text-3xl text-foreground group-hover:text-accent transition-colors", children: l(c.title) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow mobile-safe-text text-accent sm:whitespace-nowrap", children: l(c.theme) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow text-accent", children: l(t.cases.assetChallenge) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground leading-relaxed", children: l(c.challenge) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow text-accent", children: l(t.cases.logic) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground leading-relaxed", children: l(c.logic) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow text-accent", children: l(t.cases.direction) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-foreground/85 leading-relaxed", children: l(c.direction) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] tracking-[0.18em] uppercase text-accent", children: l(t.common.readCase) })
      ] })
    ] }, c.slug)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-rl text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/submit", className: "premium-action px-7 py-3.5 text-[12px] tracking-[0.18em] uppercase", children: l(t.cases.submit) }) }) })
  ] });
}
export {
  Cases as component
};

import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
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
function Approach() {
  const [openStage, setOpenStage] = reactExports.useState(null);
  const {
    t,
    l
  } = useLanguage();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "approach-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "approach-page-lightfield", "aria-hidden": "true", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "approach-lightfield-orb approach-lightfield-orb--1" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "approach-lightfield-orb approach-lightfield-orb--2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "approach-lightfield-orb approach-lightfield-orb--3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "approach-lightfield-orb approach-lightfield-orb--4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "approach-lightfield-orb approach-lightfield-orb--5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "approach-lightfield-ribbon approach-lightfield-ribbon--1" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "approach-lightfield-ribbon approach-lightfield-ribbon--2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "approach-lightfield-ribbon approach-lightfield-ribbon--3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "approach-lightfield-highlight approach-lightfield-highlight--1" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "approach-lightfield-highlight approach-lightfield-highlight--2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "approach-lightfield-highlight approach-lightfield-highlight--3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "approach-lightfield-highlight approach-lightfield-highlight--4" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BackToHome, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "approach-hero standard-page-hero standard-page-hero-content container-rl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow text-accent page-reveal page-reveal-delay-1", children: l(t.approach.eyebrow) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "standard-page-hero-title mobile-safe-text serif mt-6 max-w-4xl text-foreground page-reveal page-reveal-delay-2", children: withoutTerminalDots(l(t.approach.title)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "approach-process-section", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "approach-process-shell container-rl", children: t.approach.stages.map((s, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `approach-stage-block approach-stage-delay-${index + 1} grid gap-7 md:grid-cols-12 md:gap-8`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "approach-stage-title md:col-span-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "approach-stage-heading mobile-safe-text serif text-foreground", children: l(s.t) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "approach-stage-content md:col-span-7 md:col-start-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: l(s.d) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: "approach-stage-trigger group inline-flex min-h-10 max-w-full items-center gap-2 text-left text-[11px] uppercase tracking-[0.14em] text-accent transition-colors hover:text-foreground sm:tracking-[0.18em]", "aria-expanded": openStage === s.n, "aria-controls": `approach-note-${s.n}`, onClick: () => setOpenStage((current) => current === s.n ? null : s.n), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mobile-safe-text", children: l(s.trigger) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, className: "transition-transform group-hover:translate-x-1", children: openStage === s.n ? "↑" : "↓" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `approach-memo-frame ${openStage === s.n ? "approach-memo-frame-open" : ""}`, "aria-hidden": openStage !== s.n, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: `approach-note-${s.n}`, className: "approach-memo mt-4 max-w-2xl space-y-3 text-base leading-7 text-muted-foreground", children: s.note.map((paragraph, index2) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: index2 === s.note.length - 1 ? "text-foreground/85" : void 0, children: l(paragraph) }, paragraph.en)) }) })
        ] })
      ] })
    ] }, s.n)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "approach-discipline paper", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-rl approach-discipline-grid", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "approach-discipline-title mobile-safe-text serif text-ink", children: l(t.approach.disciplineTitle) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "approach-discipline-copy md:col-span-8", children: t.approach.discipline.map((paragraph) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: l(paragraph) }, paragraph.en)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-rl text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/submit", className: "premium-action px-7 py-3.5 text-[12px] tracking-[0.18em] uppercase", children: l(t.approach.cta) }) }) })
  ] });
}
export {
  Approach as component
};

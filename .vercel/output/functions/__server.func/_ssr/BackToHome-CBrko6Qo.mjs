import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useLanguage } from "./router-BOowU5Nw.mjs";
function BackToHome() {
  const { t, l } = useLanguage();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "back-to-home-wrap container-rl pt-24 md:pt-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/",
      className: "page-reveal page-reveal-delay-1 mobile-safe-text inline-flex max-w-full items-center gap-2 text-[11px] tracking-[0.16em] uppercase text-muted-foreground hover:text-accent transition-colors border-b border-transparent hover:border-accent/40 pb-1 sm:tracking-[0.22em]",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, children: "←" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: l(t.common.backToHome) })
      ]
    }
  ) });
}
export {
  BackToHome as B
};

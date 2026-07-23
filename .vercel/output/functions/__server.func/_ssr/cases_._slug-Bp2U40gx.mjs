import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as BackToHome } from "./BackToHome-CBrko6Qo.mjs";
import { R as Route, u as useLanguage, c as cases } from "./router-BOowU5Nw.mjs";
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
const AUTO_REVEAL_DELAY_MS = 500;
const AUTO_REVEAL_DURATION_MS = 9e3;
const MAX_ZOOM_SCALE = 1.025;
const INTERSECTION_THRESHOLD = 0.4;
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function clampPercent(value) {
  return Math.min(100, Math.max(0, value));
}
function BeforeAfterReveal({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeLabel = { eyebrow: "Before", caption: "Underutilized Heritage" },
  afterLabel = { eyebrow: "After", caption: "Cultural Destination" },
  replayLabel = "Replay transformation",
  replayLabelShort = "Replay",
  conceptEyebrow = "Repositioning strategy",
  conceptTitle = "From a static asset to a working platform",
  conceptItems = ["Creative production", "Education & exchange", "Selective hospitality"],
  className = ""
}) {
  const containerRef = reactExports.useRef(null);
  const afterClipRef = reactExports.useRef(null);
  const dividerRef = reactExports.useRef(null);
  const beforeImgRef = reactExports.useRef(null);
  const afterImgRef = reactExports.useRef(null);
  const beforeLabelRef = reactExports.useRef(null);
  const afterLabelRef = reactExports.useRef(null);
  const conceptOverlayRef = reactExports.useRef(null);
  const percentRef = reactExports.useRef(0);
  const rafRef = reactExports.useRef(null);
  const delayTimeoutRef = reactExports.useRef(null);
  const hasAutoPlayedRef = reactExports.useRef(false);
  const [phase, setPhase] = reactExports.useState("pending");
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const [beforeLoaded, setBeforeLoaded] = reactExports.useState(false);
  const [afterLoaded, setAfterLoaded] = reactExports.useState(false);
  const [readyForReplay, setReadyForReplay] = reactExports.useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = reactExports.useState(false);
  const imagesReady = beforeLoaded && afterLoaded;
  const applyPercent = reactExports.useCallback((rawPercent) => {
    const percent = clampPercent(rawPercent);
    percentRef.current = percent;
    if (afterClipRef.current) {
      afterClipRef.current.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
    }
    if (dividerRef.current) {
      dividerRef.current.style.left = `${percent}%`;
    }
    if (beforeLabelRef.current) {
      beforeLabelRef.current.style.opacity = percent < 55 ? "1" : "0";
    }
    if (afterLabelRef.current) {
      afterLabelRef.current.style.opacity = percent > 50 ? "1" : "0";
    }
    if (containerRef.current) {
      containerRef.current.setAttribute("aria-valuenow", String(Math.round(percent)));
    }
  }, []);
  const applyZoom = reactExports.useCallback((eased) => {
    const scale = 1 + (MAX_ZOOM_SCALE - 1) * eased;
    if (beforeImgRef.current) {
      beforeImgRef.current.style.transform = `scale(${scale})`;
    }
    if (afterImgRef.current) {
      afterImgRef.current.style.transform = `scale(${scale})`;
    }
  }, []);
  const applyConceptOverlay = reactExports.useCallback((progress) => {
    if (!conceptOverlayRef.current) {
      return;
    }
    const fadeIn = Math.min(1, Math.max(0, (progress - 0.05) / 0.1));
    const fadeOut = 1 - Math.min(1, Math.max(0, (progress - 0.58) / 0.12));
    const opacity = fadeIn * fadeOut;
    const lift = 18 * (1 - fadeIn) - 8 * (1 - fadeOut);
    conceptOverlayRef.current.style.opacity = String(opacity);
    conceptOverlayRef.current.style.transform = `translate3d(0, ${lift}px, 0)`;
  }, []);
  const clearTimers = reactExports.useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (delayTimeoutRef.current !== null) {
      window.clearTimeout(delayTimeoutRef.current);
      delayTimeoutRef.current = null;
    }
  }, []);
  const runAutoReveal = reactExports.useCallback(() => {
    clearTimers();
    setPhase("auto");
    applyPercent(0);
    applyZoom(0);
    applyConceptOverlay(0);
    delayTimeoutRef.current = window.setTimeout(() => {
      const start = performance.now();
      const step = (now) => {
        const elapsed = now - start;
        const t = Math.min(1, elapsed / AUTO_REVEAL_DURATION_MS);
        const revealProgress = Math.min(1, Math.max(0, (t - 0.6) / 0.4));
        const eased = easeInOutCubic(revealProgress);
        applyPercent(eased * 100);
        applyZoom(eased);
        applyConceptOverlay(t);
        if (t < 1) {
          rafRef.current = requestAnimationFrame(step);
        } else {
          rafRef.current = null;
          setPhase("interactive");
          setReadyForReplay(true);
          applyConceptOverlay(1);
        }
      };
      rafRef.current = requestAnimationFrame(step);
    }, AUTO_REVEAL_DELAY_MS);
  }, [applyConceptOverlay, applyPercent, applyZoom, clearTimers]);
  reactExports.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPrefersReducedMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);
  reactExports.useEffect(() => {
    if (beforeImgRef.current?.complete) {
      setBeforeLoaded(true);
    }
    if (afterImgRef.current?.complete) {
      setAfterLoaded(true);
    }
  }, []);
  reactExports.useEffect(() => {
    if (!prefersReducedMotion) {
      return;
    }
    clearTimers();
    hasAutoPlayedRef.current = true;
    applyPercent(50);
    applyZoom(0);
    applyConceptOverlay(1);
    setPhase("interactive");
  }, [prefersReducedMotion, applyConceptOverlay, applyPercent, applyZoom, clearTimers]);
  reactExports.useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    const node = containerRef.current;
    if (!node || !imagesReady) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting && !hasAutoPlayedRef.current) {
          hasAutoPlayedRef.current = true;
          runAutoReveal();
        }
      },
      { threshold: INTERSECTION_THRESHOLD }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [imagesReady, prefersReducedMotion, runAutoReveal]);
  reactExports.useEffect(() => clearTimers, [clearTimers]);
  const percentFromPointer = reactExports.useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) {
      return percentRef.current;
    }
    return (clientX - rect.left) / rect.width * 100;
  }, []);
  const handlePointerDown = (event) => {
    if (phase !== "interactive") {
      return;
    }
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
    applyPercent(percentFromPointer(event.clientX));
  };
  const handlePointerMove = (event) => {
    if (!isDragging) {
      return;
    }
    applyPercent(percentFromPointer(event.clientX));
  };
  const endDrag = (event) => {
    if (!isDragging) {
      return;
    }
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };
  const handleKeyDown = (event) => {
    if (phase !== "interactive") {
      return;
    }
    let next = percentRef.current;
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      next -= 5;
    } else if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      next += 5;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = 100;
    } else {
      return;
    }
    event.preventDefault();
    applyPercent(next);
  };
  const handleReplay = () => {
    if (!imagesReady) {
      return;
    }
    runAutoReveal();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `w-full ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        ref: containerRef,
        role: "slider",
        "aria-label": `${beforeLabel.eyebrow} / ${afterLabel.eyebrow} comparison`,
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": 0,
        tabIndex: phase === "interactive" ? 0 : -1,
        onPointerDown: handlePointerDown,
        onPointerMove: handlePointerMove,
        onPointerUp: endDrag,
        onPointerCancel: endDrag,
        onKeyDown: handleKeyDown,
        className: "relative aspect-[4/3] sm:aspect-[5/4] md:aspect-[16/9] w-full overflow-hidden border border-[var(--rule)] bg-[var(--muted)] select-none",
        style: {
          touchAction: "pan-y",
          cursor: phase === "interactive" ? isDragging ? "grabbing" : "ew-resize" : "default"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              ref: beforeImgRef,
              src: beforeSrc,
              alt: beforeAlt,
              loading: "eager",
              draggable: false,
              onLoad: () => setBeforeLoaded(true),
              className: "absolute inset-0 h-full w-full object-cover",
              style: { objectPosition: "center 38%", transform: "scale(1)", willChange: "transform" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              ref: afterClipRef,
              className: "absolute inset-0",
              style: { clipPath: "inset(0 100% 0 0)", willChange: "clip-path" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  ref: afterImgRef,
                  src: afterSrc,
                  alt: afterAlt,
                  loading: "eager",
                  draggable: false,
                  onLoad: () => setAfterLoaded(true),
                  className: "absolute inset-0 h-full w-full object-cover",
                  style: { objectPosition: "center 38%", transform: "scale(1)", willChange: "transform" }
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              ref: conceptOverlayRef,
              "aria-hidden": "true",
              className: "pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-5 opacity-0 sm:px-10",
              style: { willChange: "opacity, transform" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-[760px] overflow-hidden border border-white/25 bg-[#17130f]/78 px-5 py-6 text-[#fbfaf7] shadow-[0_24px_80px_rgba(0,0,0,0.38)] backdrop-blur-md sm:px-9 sm:py-8", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute inset-x-0 top-0 h-px",
                    style: {
                      background: "linear-gradient(90deg, transparent, rgba(191,153,118,.95), transparent)"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] tracking-[0.28em] uppercase text-[#d4ad89] sm:text-[10px]", children: conceptEyebrow }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "serif mt-3 max-w-2xl text-xl leading-tight sm:text-3xl", children: conceptTitle }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-6 grid gap-2 sm:mt-8 sm:grid-cols-3 sm:gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-[12%] right-[12%] top-[13px] hidden h-px bg-white/20 sm:block" }),
                  conceptItems.slice(0, 3).map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center gap-3 sm:block sm:text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#d4ad89]/70 bg-[#17130f] text-[9px] text-[#d4ad89]", children: [
                      "0",
                      index + 1
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] tracking-[0.15em] uppercase text-white/80 sm:mt-3 sm:text-[10px] sm:leading-relaxed", children: item })
                  ] }, item))
                ] })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              ref: dividerRef,
              "aria-hidden": "true",
              className: "pointer-events-none absolute top-0 bottom-0",
              style: {
                left: prefersReducedMotion ? "50%" : "0%",
                width: "2px",
                marginLeft: "-1px",
                background: "linear-gradient(180deg, rgba(191,153,118,0), rgba(191,153,118,0.95) 12%, rgba(191,153,118,0.95) 88%, rgba(191,153,118,0))",
                boxShadow: "0 0 18px 4px rgba(191, 153, 118, 0.55), 0 0 48px 12px rgba(191, 153, 118, 0.22)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              ref: beforeLabelRef,
              className: "pointer-events-none absolute bottom-0 left-0 p-4 sm:p-6 transition-opacity duration-500 ease-out",
              style: { opacity: prefersReducedMotion ? 0 : 1 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#fbfaf7]",
                    style: { textShadow: "0 1px 10px rgba(0,0,0,0.45)" },
                    children: beforeLabel.eyebrow
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "mt-1 text-[9px] sm:text-[10px] tracking-[0.22em] uppercase text-[#fbfaf7]/80",
                    style: { textShadow: "0 1px 10px rgba(0,0,0,0.45)" },
                    children: beforeLabel.caption
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              ref: afterLabelRef,
              className: "pointer-events-none absolute bottom-0 right-0 p-4 sm:p-6 text-right transition-opacity duration-500 ease-out",
              style: { opacity: prefersReducedMotion ? 1 : 0 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#fbfaf7]",
                    style: { textShadow: "0 1px 10px rgba(0,0,0,0.45)" },
                    children: afterLabel.eyebrow
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "mt-1 text-[9px] sm:text-[10px] tracking-[0.22em] uppercase text-[#fbfaf7]/80",
                    style: { textShadow: "0 1px 10px rgba(0,0,0,0.45)" },
                    children: afterLabel.caption
                  }
                )
              ]
            }
          )
        ]
      }
    ),
    !prefersReducedMotion && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: handleReplay,
        disabled: !readyForReplay || phase === "auto",
        className: "text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-muted-foreground hover:text-accent transition-colors border-b border-transparent hover:border-accent/40 pb-0.5 disabled:opacity-40 disabled:pointer-events-none",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: replayLabel }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: replayLabelShort })
        ]
      }
    ) })
  ] });
}
const slivnicaCastleLineArt = "/assets/slivnica-line-art-BE3qJWrD.png";
const bauskasLineArt = "/assets/bauskas-line-art-DgtnwSSq.png";
function CastleLineDrawing({ variant = "slivnica" }) {
  const isBauskas = variant === "bauskas";
  const imageSrc = isBauskas ? bauskasLineArt : slivnicaCastleLineArt;
  const maskId = isBauskas ? "bauskas-live-drawing-mask" : "slivnica-live-drawing-mask";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `castle-line-drawing ${isBauskas ? "castle-line-drawing--bauskas" : ""}`,
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 1536 1024", preserveAspectRatio: "xMidYMid meet", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("filter", { id: "castle-brush-softness", x: "-10%", y: "-10%", width: "120%", height: "120%", children: /* @__PURE__ */ jsxRuntimeExports.jsx("feGaussianBlur", { stdDeviation: "8" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("mask", { id: maskId, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "1536", height: "1024", fill: "black" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "g",
              {
                fill: "none",
                stroke: "white",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                filter: "url(#castle-brush-softness)",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "path",
                    {
                      className: "castle-draw-stroke castle-draw-stroke--1",
                      pathLength: "1",
                      strokeWidth: "185",
                      d: "M34 710 C170 560 280 460 420 360 S700 250 930 255 1220 220 1480 150"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "path",
                    {
                      className: "castle-draw-stroke castle-draw-stroke--2",
                      pathLength: "1",
                      strokeWidth: "235",
                      d: "M20 855 C170 790 300 710 440 640 S690 550 930 535"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "path",
                    {
                      className: "castle-draw-stroke castle-draw-stroke--2b",
                      pathLength: "1",
                      strokeWidth: "240",
                      d: "M245 525 C480 470 725 455 970 470 S1240 500 1490 455"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "path",
                    {
                      className: "castle-draw-stroke castle-draw-stroke--3",
                      pathLength: "1",
                      strokeWidth: "230",
                      d: "M360 775 C610 720 840 700 1085 705 S1310 730 1485 760"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "path",
                    {
                      className: "castle-draw-stroke castle-draw-stroke--4",
                      pathLength: "1",
                      strokeWidth: "190",
                      d: "M385 910 C650 875 895 875 1155 895 S1360 900 1495 885"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "path",
                    {
                      className: "castle-draw-stroke castle-draw-stroke--5",
                      pathLength: "1",
                      strokeWidth: "235",
                      d: "M1322 875 C1310 690 1322 500 1340 330 S1365 145 1395 65"
                    }
                  )
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "image",
          {
            href: imageSrc,
            width: "1536",
            height: "1024",
            preserveAspectRatio: "xMidYMid meet",
            mask: `url(#${maskId})`
          }
        )
      ] })
    }
  );
}
const leaves = [
  { x: 6, delay: -3, duration: 16, drift: 190, size: 18 },
  { x: 15, delay: -11, duration: 21, drift: 235, size: 24 },
  { x: 27, delay: -6, duration: 18, drift: 175, size: 16 },
  { x: 39, delay: -15, duration: 23, drift: 260, size: 21 },
  { x: 51, delay: -1, duration: 19, drift: 210, size: 15 },
  { x: 62, delay: -9, duration: 22, drift: 250, size: 23 },
  { x: 73, delay: -17, duration: 25, drift: 280, size: 17 },
  { x: 84, delay: -5, duration: 20, drift: 205, size: 20 },
  { x: 93, delay: -13, duration: 24, drift: 245, size: 14 }
];
function FallingLeaves() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "falling-leaves", "aria-hidden": "true", children: leaves.map((leaf, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `falling-leaves__leaf falling-leaves__leaf--${index % 3 + 1}`,
      style: {
        "--leaf-x": `${leaf.x}%`,
        "--leaf-delay": `${leaf.delay}s`,
        "--leaf-duration": `${leaf.duration}s`,
        "--leaf-drift": `${leaf.drift}px`,
        "--leaf-drift-mid": `${Math.round(leaf.drift * 0.42)}px`,
        "--leaf-size": `${leaf.size}px`
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 28 44", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M14 41C5 32 2 21 6 12C8 7 12 4 18 2C23 11 24 20 20 28C18 33 16 37 14 41Z" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M8 31C12 25 15 18 18 8" })
      ] })
    },
    `${leaf.x}-${leaf.delay}`
  )) });
}
function MountainLineDrawing() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mountain-line-drawing", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 1920 620", preserveAspectRatio: "none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("g", { className: "mountain-line-drawing__ridge mountain-line-drawing__ridge--far", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        pathLength: "1",
        d: "M-90 318 C40 264 130 250 238 302 C340 350 424 340 500 266 L590 170 Q610 148 635 170 L780 224 C884 315 956 390 1042 328 C1134 262 1208 250 1280 286 L1320 314 C1408 360 1490 348 1570 290 L1660 218 Q1680 202 1702 220 L1850 282 C1905 335 1950 330 2010 292"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("g", { className: "mountain-line-drawing__ridge mountain-line-drawing__ridge--middle", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        pathLength: "1",
        d: "M-100 430 C40 356 150 346 270 404 C380 456 468 442 548 370 L650 282 Q670 262 692 282 L856 364 C952 460 1045 446 1142 360 C1226 286 1304 280 1372 338 L1428 378 C1518 465 1610 452 1682 390 L1772 310 Q1794 290 1818 310 L2018 390"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("g", { className: "mountain-line-drawing__ridge mountain-line-drawing__ridge--near", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        pathLength: "1",
        d: "M-110 540 C36 460 158 448 286 508 C398 562 496 548 586 480 L690 396 Q714 376 738 398 L914 480 C1018 575 1118 558 1200 488 L1302 398 Q1328 376 1352 400 L1528 484 C1626 574 1730 552 1804 480 L1870 418 Q1892 398 1916 420 L2025 474"
      }
    ) })
  ] }) });
}
function CaseDetail() {
  const articleRef = reactExports.useRef(null);
  const {
    slug
  } = Route.useParams();
  const {
    t,
    l
  } = useLanguage();
  const caseStudy = cases.find((item) => item.slug === slug);
  const hasArchitecturalDrawing = slug === "slovenia-castle" || slug === "bauskas-16a-riga";
  const hasMountainDrawing = slug === "turkey-lifestyle-repositioning";
  const hasFallingLeaves = slug === "distressed-prime-apartments";
  const hasEditorialGallery = slug === "slovenia-castle" || slug === "bauskas-16a-riga" || slug === "turkey-lifestyle-repositioning" || slug === "distressed-prime-apartments" || slug === "kekava-production-campus" || slug === "flotes-8-community-infrastructure";
  reactExports.useEffect(() => {
    const article = articleRef.current;
    if (!article) {
      return;
    }
    const items = Array.from(article.querySelectorAll(".case-photo-reveal"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    article.classList.add("case-photo-reveal-ready");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: "0px 0px -4% 0px"
    });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [slug]);
  if (!caseStudy) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BackToHome, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "container-rl pt-8 pb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/cases", className: "page-reveal page-reveal-delay-1 mobile-safe-text inline-flex max-w-full items-center gap-2 text-[11px] tracking-[0.16em] uppercase text-muted-foreground hover:text-accent transition-colors border-b border-transparent hover:border-accent/40 pb-1 sm:tracking-[0.22em]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, children: "←" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: l(t.common.backToCases) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mt-10 text-accent page-reveal page-reveal-delay-1", children: l(t.cases.notFoundLabel) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mobile-safe-text serif text-4xl md:text-6xl mt-6 max-w-3xl leading-[1.05] text-foreground page-reveal page-reveal-delay-2", children: l(t.cases.notFoundTitle) })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { ref: articleRef, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(BackToHome, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: `container-rl pt-8 pb-16 ${hasArchitecturalDrawing || hasMountainDrawing || hasFallingLeaves ? "line-art-case-hero" : ""}`, children: [
      caseStudy.slug === "slovenia-castle" && /* @__PURE__ */ jsxRuntimeExports.jsx(CastleLineDrawing, { variant: "slivnica" }),
      caseStudy.slug === "bauskas-16a-riga" && /* @__PURE__ */ jsxRuntimeExports.jsx(CastleLineDrawing, { variant: "bauskas" }),
      hasMountainDrawing && /* @__PURE__ */ jsxRuntimeExports.jsx(MountainLineDrawing, {}),
      hasFallingLeaves && /* @__PURE__ */ jsxRuntimeExports.jsx(FallingLeaves, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/cases", className: "page-reveal page-reveal-delay-1 mobile-safe-text inline-flex max-w-full items-center gap-2 text-[11px] tracking-[0.16em] uppercase text-muted-foreground hover:text-accent transition-colors border-b border-transparent hover:border-accent/40 pb-1 sm:tracking-[0.22em]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, children: "←" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: l(t.common.backToCases) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mt-10 text-accent page-reveal page-reveal-delay-1", children: l(caseStudy.theme) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mobile-safe-text serif text-4xl md:text-6xl mt-6 max-w-4xl leading-[1.05] text-foreground page-reveal page-reveal-delay-2", children: l(caseStudy.title) }),
        caseStudy.subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground page-reveal page-reveal-delay-3", children: l(caseStudy.subtitle) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "case-file-intro border-t border-rule", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-rl py-12 grid gap-10 items-start lg:grid-cols-12 lg:gap-14 lg:py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "case-file-visual lg:col-span-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "case-file-image case-photo-reveal case-photo-reveal-light case-photo-reveal-zoom aspect-[4/3] overflow-hidden bg-muted border border-rule", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: caseStudy.img, alt: l(caseStudy.title), loading: "lazy", width: 1280, height: 960, className: "w-full h-full object-cover", style: caseStudy.imgPosition ? {
        objectPosition: caseStudy.imgPosition
      } : void 0 }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "case-file-dossier lg:col-span-7", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "case-file-finding", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow text-accent", children: l(t.cases.assetChallenge) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground leading-relaxed text-lg", children: l(caseStudy.challenge) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "case-file-finding", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow text-accent", children: l(t.cases.logic) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground leading-relaxed text-lg", children: l(caseStudy.logic) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "case-file-finding", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow text-accent", children: l(t.cases.direction) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-foreground/85 leading-relaxed text-lg", children: l(caseStudy.direction) })
        ] })
      ] })
    ] }) }),
    caseStudy.sections && caseStudy.sections.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "case-file-sections border-t border-rule py-16 md:py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-rl max-w-5xl space-y-14 md:space-y-20", children: caseStudy.sections.map((s, i) => {
      const gl = caseStudy.gallery ?? [];
      const extItem = gl.find((g) => g.type === "exterior");
      const upperItem = gl.find((g) => g.type === "upper");
      const intItem = gl.find((g) => g.type === "interior");
      const detailItem = gl.find((g) => g.type === "detail");
      const lowerItem = gl.find((g) => g.type === "lower");
      const atmItem = gl.find((g) => g.type === "atmosphere");
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "case-file-chapter", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow text-accent", children: l(s.eyebrow) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 max-w-4xl space-y-5 text-lg leading-relaxed text-foreground/80", children: s.body.map((para, j) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: l(para) }, j)) }),
        hasEditorialGallery && i === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "case-file-evidence-zone mt-12", children: extItem ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "case-file-evidence-plate case-file-evidence-plate-wide case-photo-reveal case-photo-reveal-panorama aspect-[16/9] overflow-hidden border border-rule", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: extItem.src, alt: extItem.alt, loading: "lazy", width: 1280, height: 720, className: "w-full h-full object-cover", style: extItem.objectPosition ? {
          objectPosition: extItem.objectPosition
        } : void 0 }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "case-file-photo-slot aspect-[16/9]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] tracking-[0.18em] uppercase text-muted-foreground/50", children: "Image slot — exterior" }) }) }),
        hasEditorialGallery && i === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "case-file-evidence-zone mt-12 grid sm:grid-cols-2 gap-5", children: [
          intItem ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "case-file-evidence-plate case-photo-reveal case-photo-reveal-light case-photo-reveal-zoom aspect-[4/3] overflow-hidden border border-rule", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: intItem.src, alt: intItem.alt, loading: "lazy", width: 800, height: 600, className: "w-full h-full object-cover", style: intItem.objectPosition ? {
            objectPosition: intItem.objectPosition
          } : void 0 }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "case-file-photo-slot aspect-[4/3]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] tracking-[0.18em] uppercase text-muted-foreground/50", children: "Image slot — interior atmosphere" }) }),
          detailItem ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "case-file-evidence-plate case-photo-reveal case-photo-reveal-light case-photo-reveal-zoom aspect-[4/3] overflow-hidden border border-rule", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: detailItem.src, alt: detailItem.alt, loading: "lazy", width: 800, height: 600, className: "w-full h-full object-cover", style: detailItem.objectPosition ? {
            objectPosition: detailItem.objectPosition
          } : void 0 }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "case-file-photo-slot aspect-[4/3]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] tracking-[0.18em] uppercase text-muted-foreground/50", children: "Image slot — architectural detail" }) })
        ] }),
        hasEditorialGallery && i === 2 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "case-file-evidence-zone mt-12", children: upperItem ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "case-file-evidence-plate case-file-evidence-plate-wide case-photo-reveal case-photo-reveal-panorama aspect-[16/9] overflow-hidden border border-rule", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: upperItem.src, alt: upperItem.alt, loading: "lazy", width: 1280, height: 720, className: "w-full h-full object-cover", style: upperItem.objectPosition ? {
          objectPosition: upperItem.objectPosition
        } : void 0 }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "case-file-photo-slot aspect-[16/9]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] tracking-[0.18em] uppercase text-muted-foreground/50", children: "Image slot — upper representative space" }) }) }),
        hasEditorialGallery && i === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "case-file-evidence-zone mt-12 grid sm:grid-cols-2 gap-5", children: [
          lowerItem ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "case-file-evidence-plate case-photo-reveal case-photo-reveal-light case-photo-reveal-zoom aspect-[4/3] overflow-hidden border border-rule", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: lowerItem.src, alt: lowerItem.alt, loading: "lazy", width: 800, height: 600, className: "w-full h-full object-cover", style: lowerItem.objectPosition ? {
            objectPosition: lowerItem.objectPosition
          } : void 0 }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "case-file-photo-slot aspect-[4/3]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] tracking-[0.18em] uppercase text-muted-foreground/50", children: "Image slot — residential floor" }) }),
          atmItem ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "case-file-evidence-plate case-photo-reveal case-photo-reveal-light case-photo-reveal-zoom aspect-[4/3] overflow-hidden border border-rule", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: atmItem.src, alt: atmItem.alt, loading: "lazy", width: 800, height: 600, className: "w-full h-full object-cover", style: atmItem.objectPosition ? {
            objectPosition: atmItem.objectPosition
          } : void 0 }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "case-file-photo-slot aspect-[4/3]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] tracking-[0.18em] uppercase text-muted-foreground/50", children: "Image slot — lower level" }) })
        ] })
      ] }, s.eyebrow.en);
    }) }) }),
    caseStudy.advantages && caseStudy.advantages.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-rule py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-rl max-w-4xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "case-file-advantages-label eyebrow text-accent", children: l(t.cases.advantagesLabel) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid gap-7 md:grid-cols-2", children: caseStudy.advantages.map((advantage) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "serif text-2xl text-foreground", children: l(advantage.title) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground leading-relaxed", children: l(advantage.body) })
      ] }, advantage.title.en)) })
    ] }) }),
    caseStudy.slug === "slovenia-castle" && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "case-file-chapter border-t border-rule py-16 md:py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-rl max-w-5xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow text-accent", children: l({
        en: "Repositioning in Motion",
        ru: "Репозиционирование в движении"
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BeforeAfterReveal, { beforeSrc: "/sliv1.jpg", afterSrc: "/sliv2.jpg", beforeAlt: l({
        en: "Slivnica Castle before repositioning — underutilized heritage structure",
        ru: "Замок Сливница до перепозиционирования — недоиспользуемый объект наследия"
      }), afterAlt: l({
        en: "Slivnica Castle after repositioning — cultural destination",
        ru: "Замок Сливница после перепозиционирования — культурное направление"
      }), beforeLabel: {
        eyebrow: l({
          en: "Before",
          ru: "До"
        }),
        caption: l({
          en: "Underutilized Heritage",
          ru: "Недоиспользуемое наследие"
        })
      }, afterLabel: {
        eyebrow: l({
          en: "After",
          ru: "После"
        }),
        caption: l({
          en: "Cultural Destination",
          ru: "Культурное направление"
        })
      }, replayLabel: l({
        en: "Replay transformation",
        ru: "Повторить трансформацию"
      }), replayLabelShort: l({
        en: "Replay",
        ru: "Повтор"
      }), conceptEyebrow: l({
        en: "Repositioning strategy",
        ru: "Стратегия репозиционирования"
      }), conceptTitle: l({
        en: "From a static heritage asset to an international working platform",
        ru: "От статичного объекта наследия к международной работающей платформе"
      }), conceptItems: [l({
        en: "Creative production",
        ru: "Креативное производство"
      }), l({
        en: "Education & exchange",
        ru: "Образование и обмен"
      }), l({
        en: "Selective hospitality",
        ru: "Камерное гостеприимство"
      })] }) })
    ] }) }),
    !hasEditorialGallery && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "paper py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-rl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "case-file-evidence-label eyebrow text-accent", children: l(t.cases.evidenceLabel) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 border border-rule min-h-[220px] flex items-center justify-center px-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-ink/65 max-w-xl leading-relaxed", children: l(t.cases.evidenceText) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-rl text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/submit", className: "premium-action px-7 py-3.5 text-[12px] tracking-[0.18em] uppercase", children: l(t.cases.submit) }) }) })
  ] });
}
export {
  CaseDetail as component
};

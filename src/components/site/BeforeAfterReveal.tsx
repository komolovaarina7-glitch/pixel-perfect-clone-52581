import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";

export interface BeforeAfterRevealLabel {
  eyebrow: string;
  caption: string;
}

export interface BeforeAfterRevealProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel?: BeforeAfterRevealLabel;
  afterLabel?: BeforeAfterRevealLabel;
  replayLabel?: string;
  replayLabelShort?: string;
  conceptEyebrow?: string;
  conceptTitle?: string;
  conceptItems?: string[];
  className?: string;
}

const AUTO_REVEAL_DELAY_MS = 500;
const AUTO_REVEAL_DURATION_MS = 9000;
const MAX_ZOOM_SCALE = 1.025;
const INTERSECTION_THRESHOLD = 0.4;

type Phase = "pending" | "auto" | "interactive";

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function clampPercent(value: number) {
  return Math.min(100, Math.max(0, value));
}

export function BeforeAfterReveal({
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
  className = "",
}: BeforeAfterRevealProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const afterClipRef = useRef<HTMLDivElement | null>(null);
  const dividerRef = useRef<HTMLDivElement | null>(null);
  const beforeImgRef = useRef<HTMLImageElement | null>(null);
  const afterImgRef = useRef<HTMLImageElement | null>(null);
  const beforeLabelRef = useRef<HTMLDivElement | null>(null);
  const afterLabelRef = useRef<HTMLDivElement | null>(null);
  const conceptOverlayRef = useRef<HTMLDivElement | null>(null);

  const percentRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const delayTimeoutRef = useRef<number | null>(null);
  const hasAutoPlayedRef = useRef(false);

  const [phase, setPhase] = useState<Phase>("pending");
  const [isDragging, setIsDragging] = useState(false);
  const [beforeLoaded, setBeforeLoaded] = useState(false);
  const [afterLoaded, setAfterLoaded] = useState(false);
  const [readyForReplay, setReadyForReplay] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const imagesReady = beforeLoaded && afterLoaded;

  const applyPercent = useCallback((rawPercent: number) => {
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

  const applyZoom = useCallback((eased: number) => {
    const scale = 1 + (MAX_ZOOM_SCALE - 1) * eased;
    if (beforeImgRef.current) {
      beforeImgRef.current.style.transform = `scale(${scale})`;
    }
    if (afterImgRef.current) {
      afterImgRef.current.style.transform = `scale(${scale})`;
    }
  }, []);

  const applyConceptOverlay = useCallback((progress: number) => {
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

  const clearTimers = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (delayTimeoutRef.current !== null) {
      window.clearTimeout(delayTimeoutRef.current);
      delayTimeoutRef.current = null;
    }
  }, []);

  const runAutoReveal = useCallback(() => {
    clearTimers();
    setPhase("auto");
    applyPercent(0);
    applyZoom(0);
    applyConceptOverlay(0);

    delayTimeoutRef.current = window.setTimeout(() => {
      const start = performance.now();

      const step = (now: number) => {
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

  // Detect reduced-motion preference once on mount and fall back to a static, fully interactive comparison.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPrefersReducedMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // Server-rendered <img> tags can finish loading before React hydrates and attaches
  // onLoad, so the load event never fires client-side. Catch that already-complete case.
  useEffect(() => {
    if (beforeImgRef.current?.complete) {
      setBeforeLoaded(true);
    }
    if (afterImgRef.current?.complete) {
      setAfterLoaded(true);
    }
  }, []);

  useEffect(() => {
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

  useEffect(() => {
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
      { threshold: INTERSECTION_THRESHOLD },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [imagesReady, prefersReducedMotion, runAutoReveal]);

  useEffect(() => clearTimers, [clearTimers]);

  const percentFromPointer = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) {
      return percentRef.current;
    }
    return ((clientX - rect.left) / rect.width) * 100;
  }, []);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (phase !== "interactive") {
      return;
    }
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
    applyPercent(percentFromPointer(event.clientX));
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging) {
      return;
    }
    applyPercent(percentFromPointer(event.clientX));
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging) {
      return;
    }
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
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

  return (
    <div className={`w-full ${className}`}>
      <div
        ref={containerRef}
        role="slider"
        aria-label={`${beforeLabel.eyebrow} / ${afterLabel.eyebrow} comparison`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={0}
        tabIndex={phase === "interactive" ? 0 : -1}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={handleKeyDown}
        className="relative aspect-[4/3] sm:aspect-[5/4] md:aspect-[16/9] w-full overflow-hidden border border-[var(--rule)] bg-[var(--muted)] select-none"
        style={{
          touchAction: "pan-y",
          cursor: phase === "interactive" ? (isDragging ? "grabbing" : "ew-resize") : "default",
        }}
      >
        <img
          ref={beforeImgRef}
          src={beforeSrc}
          alt={beforeAlt}
          loading="eager"
          draggable={false}
          onLoad={() => setBeforeLoaded(true)}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "center 38%", transform: "scale(1)", willChange: "transform" }}
        />

        <div
          ref={afterClipRef}
          className="absolute inset-0"
          style={{ clipPath: "inset(0 100% 0 0)", willChange: "clip-path" }}
        >
          <img
            ref={afterImgRef}
            src={afterSrc}
            alt={afterAlt}
            loading="eager"
            draggable={false}
            onLoad={() => setAfterLoaded(true)}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "center 38%", transform: "scale(1)", willChange: "transform" }}
          />
        </div>

        <div
          ref={conceptOverlayRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-5 opacity-0 sm:px-10"
          style={{ willChange: "opacity, transform" }}
        >
          <div className="relative w-full max-w-[760px] overflow-hidden border border-white/25 bg-[#17130f]/78 px-5 py-6 text-[#fbfaf7] shadow-[0_24px_80px_rgba(0,0,0,0.38)] backdrop-blur-md sm:px-9 sm:py-8">
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(191,153,118,.95), transparent)",
              }}
            />
            <p className="text-[9px] tracking-[0.28em] uppercase text-[#d4ad89] sm:text-[10px]">
              {conceptEyebrow}
            </p>
            <p className="serif mt-3 max-w-2xl text-xl leading-tight sm:text-3xl">
              {conceptTitle}
            </p>

            <div className="relative mt-6 grid gap-2 sm:mt-8 sm:grid-cols-3 sm:gap-4">
              <div className="absolute left-[12%] right-[12%] top-[13px] hidden h-px bg-white/20 sm:block" />
              {conceptItems.slice(0, 3).map((item, index) => (
                <div key={item} className="relative flex items-center gap-3 sm:block sm:text-center">
                  <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#d4ad89]/70 bg-[#17130f] text-[9px] text-[#d4ad89]">
                    0{index + 1}
                  </span>
                  <p className="text-[9px] tracking-[0.15em] uppercase text-white/80 sm:mt-3 sm:text-[10px] sm:leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          ref={dividerRef}
          aria-hidden="true"
          className="pointer-events-none absolute top-0 bottom-0"
          style={{
            left: prefersReducedMotion ? "50%" : "0%",
            width: "2px",
            marginLeft: "-1px",
            background: "linear-gradient(180deg, rgba(191,153,118,0), rgba(191,153,118,0.95) 12%, rgba(191,153,118,0.95) 88%, rgba(191,153,118,0))",
            boxShadow: "0 0 18px 4px rgba(191, 153, 118, 0.55), 0 0 48px 12px rgba(191, 153, 118, 0.22)",
          }}
        />

        <div
          ref={beforeLabelRef}
          className="pointer-events-none absolute bottom-0 left-0 p-4 sm:p-6 transition-opacity duration-500 ease-out"
          style={{ opacity: prefersReducedMotion ? 0 : 1 }}
        >
          <p
            className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#fbfaf7]"
            style={{ textShadow: "0 1px 10px rgba(0,0,0,0.45)" }}
          >
            {beforeLabel.eyebrow}
          </p>
          <p
            className="mt-1 text-[9px] sm:text-[10px] tracking-[0.22em] uppercase text-[#fbfaf7]/80"
            style={{ textShadow: "0 1px 10px rgba(0,0,0,0.45)" }}
          >
            {beforeLabel.caption}
          </p>
        </div>

        <div
          ref={afterLabelRef}
          className="pointer-events-none absolute bottom-0 right-0 p-4 sm:p-6 text-right transition-opacity duration-500 ease-out"
          style={{ opacity: prefersReducedMotion ? 1 : 0 }}
        >
          <p
            className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#fbfaf7]"
            style={{ textShadow: "0 1px 10px rgba(0,0,0,0.45)" }}
          >
            {afterLabel.eyebrow}
          </p>
          <p
            className="mt-1 text-[9px] sm:text-[10px] tracking-[0.22em] uppercase text-[#fbfaf7]/80"
            style={{ textShadow: "0 1px 10px rgba(0,0,0,0.45)" }}
          >
            {afterLabel.caption}
          </p>
        </div>
      </div>

      {!prefersReducedMotion && (
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={handleReplay}
            disabled={!readyForReplay || phase === "auto"}
            className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-muted-foreground hover:text-accent transition-colors border-b border-transparent hover:border-accent/40 pb-0.5 disabled:opacity-40 disabled:pointer-events-none"
          >
            <span className="hidden sm:inline">{replayLabel}</span>
            <span className="sm:hidden">{replayLabelShort}</span>
          </button>
        </div>
      )}
    </div>
  );
}

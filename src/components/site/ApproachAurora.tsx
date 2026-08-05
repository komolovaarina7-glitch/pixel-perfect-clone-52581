import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  radius: number;
  phase: number;
  speed: number;
  driftX: number;
  driftY: number;
  warmth: number;
};

function seededRandom(seed: number) {
  const value = Math.sin(seed * 12_989.8) * 43_758.5453;
  return value - Math.floor(value);
}

function createStars(count: number): Star[] {
  return Array.from({ length: count }, (_, index) => ({
    x: seededRandom(index + 11),
    y: seededRandom(index + 107),
    radius: 0.4 + seededRandom(index + 211) * 0.8,
    phase: seededRandom(index + 307) * Math.PI * 2,
    speed: 0.22 + seededRandom(index + 401) * 0.42,
    driftX: (seededRandom(index + 503) - 0.5) * 0.012,
    driftY: (seededRandom(index + 601) - 0.5) * 0.008,
    warmth: seededRandom(index + 701),
  }));
}

export function ApproachAurora() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;

    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compact = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
    const stars = createStars(compact ? 54 : 96);
    let width = 1;
    let height = 1;
    let frame = 0;
    let visible = true;
    let start = performance.now();

    const resize = () => {
      const bounds = container.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, compact ? 1 : 1.25);
      width = Math.max(1, Math.round(bounds.width));
      height = Math.max(1, Math.round(bounds.height));
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const drawMist = (
      x: number,
      y: number,
      radius: number,
      color: string,
      middleOpacity: number,
    ) => {
      const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, color.replace("ALPHA", String(middleOpacity * 1.18)));
      gradient.addColorStop(0.32, color.replace("ALPHA", String(middleOpacity)));
      gradient.addColorStop(0.68, color.replace("ALPHA", String(middleOpacity * 0.36)));
      gradient.addColorStop(1, color.replace("ALPHA", "0"));
      context.fillStyle = gradient;
      context.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    };

    const render = (now: number) => {
      const time = reducedMotion ? 0 : (now - start) / 1000;
      const base = context.createLinearGradient(0, 0, 0, height);
      base.addColorStop(0, "#f8f4ed");
      base.addColorStop(0.48, "#f6f1e8");
      base.addColorStop(1, "#f3eadf");
      context.fillStyle = base;
      context.fillRect(0, 0, width, height);

      context.globalCompositeOperation = "source-over";
      drawMist(
        width * (0.2 + Math.sin(time * 0.055) * 0.1),
        height * (-0.02 + Math.cos(time * 0.043) * 0.035),
        Math.max(width * 0.58, height * 0.72),
        "rgba(201,174,139,ALPHA)",
        0.2,
      );
      drawMist(
        width * (0.82 + Math.cos(time * 0.048) * 0.09),
        height * (0.06 + Math.sin(time * 0.039) * 0.04),
        Math.max(width * 0.48, height * 0.62),
        "rgba(201,164,155,ALPHA)",
        0.16,
      );
      drawMist(
        width * (0.28 + Math.cos(time * 0.044) * 0.12),
        height * (1.04 + Math.sin(time * 0.036) * 0.045),
        Math.max(width * 0.62, height * 0.76),
        "rgba(215,192,165,ALPHA)",
        0.24,
      );
      drawMist(
        width * (0.86 + Math.sin(time * 0.051) * 0.08),
        height * (0.96 + Math.cos(time * 0.041) * 0.04),
        Math.max(width * 0.46, height * 0.58),
        "rgba(166,111,76,ALPHA)",
        0.11,
      );

      context.globalCompositeOperation = "source-over";
      stars.forEach((star, index) => {
        const twinkle = 0.5 + Math.sin(time * star.speed + star.phase) * 0.5;
        const pulse = 0.22 + twinkle * 0.66;
        const x = ((star.x + time * star.driftX + 1) % 1) * width;
        const y = ((star.y + time * star.driftY + 1) % 1) * height;
        const radius = star.radius * (0.86 + twinkle * 0.2);
        const color =
          star.warmth > 0.7
            ? `rgba(166,111,76,${pulse * 0.76})`
            : star.warmth > 0.38
              ? `rgba(184,137,73,${pulse * 0.66})`
              : `rgba(145,113,91,${pulse * 0.54})`;

        if (index % 19 === 0) {
          const glow = context.createRadialGradient(x, y, 0, x, y, radius * 3.4);
          glow.addColorStop(0, `rgba(255,248,232,${pulse * 0.72})`);
          glow.addColorStop(0.2, `rgba(201,174,139,${pulse * 0.24})`);
          glow.addColorStop(1, "rgba(201,174,139,0)");
          context.fillStyle = glow;
          context.beginPath();
          context.arc(x, y, radius * 3.4, 0, Math.PI * 2);
          context.fill();
        }

        context.fillStyle = color;
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();

        context.fillStyle = `rgba(255,253,247,${0.35 + pulse * 0.42})`;
        context.beginPath();
        context.arc(x, y, Math.max(0.32, radius * 0.34), 0, Math.PI * 2);
        context.fill();

        if (index % 19 === 0) {
          context.strokeStyle = `rgba(184,137,73,${pulse * 0.58})`;
          context.lineWidth = 0.45;
          context.beginPath();
          context.moveTo(x - radius * 3.2, y);
          context.lineTo(x + radius * 3.2, y);
          context.moveTo(x, y - radius * 3.2);
          context.lineTo(x, y + radius * 3.2);
          context.stroke();
        }
      });
      context.globalCompositeOperation = "source-over";

      if (!reducedMotion && visible) frame = requestAnimationFrame(render);
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      start = performance.now();
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(render);
    });
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      cancelAnimationFrame(frame);
      if (visible && !reducedMotion) frame = requestAnimationFrame(render);
    });

    resize();
    resizeObserver.observe(container);
    visibilityObserver.observe(canvas);
    frame = requestAnimationFrame(render);

    return () => {
      visible = false;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="approach-aurora" aria-hidden="true" />;
}

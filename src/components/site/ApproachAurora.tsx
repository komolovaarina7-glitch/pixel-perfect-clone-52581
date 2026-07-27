import { useEffect, useRef } from "react";

const COLORS = [
  [166, 111, 76],
  [201, 164, 155],
  [201, 174, 139],
] as const;

export function ApproachAurora() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compact = window.matchMedia("(max-width: 767px)").matches;
    let width = 0;
    let height = 0;
    let frame = 0;
    let active = true;
    let lastFrame = 0;

    const resize = () => {
      const bounds = container.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, compact ? 1 : 1.5);
      width = Math.max(1, Math.round(bounds.width));
      height = Math.max(1, Math.round(bounds.height));
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const drawRibbon = (time: number, index: number) => {
      const color = COLORS[index];
      const phase = time * (0.14 + index * 0.025) + index * 2.1;
      const baseY = height * (0.2 + index * 0.27);
      const amplitude = height * (0.08 + index * 0.018);
      const gradient = context.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, `rgba(${color.join(",")},0)`);
      gradient.addColorStop(0.24, `rgba(${color.join(",")},0.16)`);
      gradient.addColorStop(0.56, `rgba(${color.join(",")},0.31)`);
      gradient.addColorStop(1, `rgba(${color.join(",")},0)`);

      const trace = () => {
        context.beginPath();
        for (let x = -30; x <= width + 30; x += 22) {
          const progress = x / Math.max(width, 1);
          const y =
            baseY +
            Math.sin(progress * Math.PI * (1.55 + index * 0.16) + phase) * amplitude +
            Math.sin(progress * 7.2 - phase * 0.55) * amplitude * 0.22;
          if (x === -30) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
      };

      context.strokeStyle = gradient;
      context.lineCap = "round";
      context.lineJoin = "round";
      context.lineWidth = height * (0.2 - index * 0.022);
      context.globalAlpha = 0.18;
      trace();
      context.stroke();

      context.lineWidth = height * (0.075 - index * 0.006);
      context.globalAlpha = 0.3;
      trace();
      context.stroke();

      context.lineWidth = Math.max(1, height * 0.004);
      context.strokeStyle = `rgba(255,250,242,${0.28 - index * 0.04})`;
      context.globalAlpha = 1;
      trace();
      context.stroke();
    };

    const render = (timestamp = 0) => {
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "source-over";
      drawRibbon(timestamp * 0.001, 0);
      drawRibbon(timestamp * 0.001, 1);
      drawRibbon(timestamp * 0.001, 2);
      context.globalAlpha = 1;
    };

    const animate = (timestamp: number) => {
      if (!active) return;
      if (timestamp - lastFrame >= (compact ? 42 : 30)) {
        render(timestamp);
        lastFrame = timestamp;
      }
      frame = requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      render(lastFrame);
    });
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (active && !reducedMotion) frame = requestAnimationFrame(animate);
    });

    resize();
    render();
    resizeObserver.observe(container);
    visibilityObserver.observe(canvas);
    if (!reducedMotion) frame = requestAnimationFrame(animate);

    return () => {
      active = false;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="approach-aurora" aria-hidden="true" />;
}

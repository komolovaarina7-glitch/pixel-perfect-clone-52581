import { useEffect, useRef } from "react";

type Haze = {
  color: [number, number, number];
  x: number;
  y: number;
  radiusX: number;
  radiusY: number;
  driftX: number;
  driftY: number;
  phase: number;
  opacity: number;
};

const HAZE_FIELDS: Haze[] = [
  {
    color: [201, 174, 139],
    x: 0.16,
    y: 0.28,
    radiusX: 0.3,
    radiusY: 0.2,
    driftX: 0.035,
    driftY: 0.022,
    phase: 0.2,
    opacity: 0.24,
  },
  {
    color: [201, 164, 155],
    x: 0.78,
    y: 0.22,
    radiusX: 0.27,
    radiusY: 0.24,
    driftX: -0.03,
    driftY: 0.025,
    phase: 2.4,
    opacity: 0.2,
  },
  {
    color: [166, 111, 76],
    x: 0.88,
    y: 0.7,
    radiusX: 0.34,
    radiusY: 0.22,
    driftX: -0.04,
    driftY: -0.018,
    phase: 4.1,
    opacity: 0.16,
  },
  {
    color: [238, 227, 211],
    x: 0.36,
    y: 0.76,
    radiusX: 0.38,
    radiusY: 0.27,
    driftX: 0.025,
    driftY: -0.024,
    phase: 5.3,
    opacity: 0.42,
  },
];

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

    const drawHaze = (time: number, field: Haze, index: number) => {
      const x =
        width * (field.x + Math.sin(time * (0.055 + index * 0.008) + field.phase) * field.driftX);
      const y =
        height * (field.y + Math.cos(time * (0.048 + index * 0.006) + field.phase) * field.driftY);
      const radiusX = width * field.radiusX;
      const radiusY = height * field.radiusY;
      const gradient = context.createRadialGradient(0, 0, 0, 0, 0, 1);
      const [red, green, blue] = field.color;
      gradient.addColorStop(0, `rgba(${red},${green},${blue},${field.opacity})`);
      gradient.addColorStop(0.38, `rgba(${red},${green},${blue},${field.opacity * 0.58})`);
      gradient.addColorStop(1, `rgba(${red},${green},${blue},0)`);

      context.save();
      context.translate(x, y);
      context.rotate(Math.sin(time * 0.035 + field.phase) * 0.12);
      context.scale(radiusX, radiusY);
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(0, 0, 1, 0, Math.PI * 2);
      context.fill();
      context.restore();
    };

    const drawRay = (
      time: number,
      offset: number,
      thickness: number,
      opacity: number,
      speed: number,
    ) => {
      const travel = Math.sin(time * speed + offset * 8) * height * 0.025;
      const startX = -width * 0.08;
      const startY = height * (0.1 + offset) + travel;
      const endX = width * 1.08;
      const endY = height * (0.58 + offset * 0.42) + travel;
      const gradient = context.createLinearGradient(startX, startY, endX, endY);
      gradient.addColorStop(0, "rgba(255,252,246,0)");
      gradient.addColorStop(0.2, `rgba(255,250,240,${opacity * 0.38})`);
      gradient.addColorStop(0.56, `rgba(201,174,139,${opacity})`);
      gradient.addColorStop(0.82, `rgba(166,111,76,${opacity * 0.35})`);
      gradient.addColorStop(1, "rgba(166,111,76,0)");

      context.save();
      context.shadowColor = `rgba(201,174,139,${opacity * 0.28})`;
      context.shadowBlur = compact ? 9 : 16;
      context.fillStyle = gradient;
      context.beginPath();
      context.moveTo(startX, startY - thickness);
      context.lineTo(endX, endY - thickness * 0.26);
      context.lineTo(endX, endY + thickness * 0.26);
      context.lineTo(startX, startY + thickness);
      context.closePath();
      context.fill();
      context.restore();
    };

    const drawLightSource = (time: number) => {
      const x = width * (0.1 + Math.sin(time * 0.045) * 0.018);
      const y = height * (0.15 + Math.cos(time * 0.04) * 0.018);
      const radius = Math.max(width, height) * 0.38;
      const glow = context.createRadialGradient(x, y, 0, x, y, radius);
      glow.addColorStop(0, "rgba(255,254,250,0.92)");
      glow.addColorStop(0.16, "rgba(255,248,235,0.38)");
      glow.addColorStop(0.54, "rgba(238,227,211,0.12)");
      glow.addColorStop(1, "rgba(238,227,211,0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);
    };

    const render = (timestamp = 0) => {
      const time = timestamp * 0.001;
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "source-over";
      HAZE_FIELDS.slice(0, compact ? 3 : 4).forEach((field, index) => drawHaze(time, field, index));
      drawLightSource(time);
      context.globalCompositeOperation = "soft-light";
      drawRay(time, 0.05, height * 0.095, 0.24, 0.07);
      drawRay(time, 0.17, height * 0.04, 0.32, 0.09);
      drawRay(time, 0.28, height * 0.012, 0.54, 0.11);
      if (!compact) {
        drawRay(time, 0.36, height * 0.006, 0.46, 0.08);
        drawRay(time, 0.43, height * 0.002, 0.62, 0.13);
      }
      context.globalAlpha = 1;
      context.globalCompositeOperation = "source-over";
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

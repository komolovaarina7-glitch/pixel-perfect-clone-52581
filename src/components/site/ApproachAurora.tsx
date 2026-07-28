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
    opacity: 0.34,
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
    opacity: 0.3,
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
    opacity: 0.24,
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
    opacity: 0.5,
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
      const [red, green, blue] = field.color;

      context.save();
      context.translate(x, y);
      context.rotate(Math.sin(time * 0.035 + field.phase) * 0.12);
      context.globalCompositeOperation = index === 3 ? "screen" : "source-over";

      for (let lobe = 0; lobe < 4; lobe += 1) {
        const phase = time * (0.075 + lobe * 0.006) + field.phase + lobe * 1.7;
        const lobeX = Math.sin(phase) * radiusX * 0.24 + (lobe - 1.5) * radiusX * 0.16;
        const lobeY = Math.cos(phase * 0.78) * radiusY * 0.2;
        const lobeRadiusX = radiusX * (0.56 + lobe * 0.07);
        const lobeRadiusY = radiusY * (0.54 + ((lobe + 1) % 2) * 0.16);
        const shadow = context.createRadialGradient(0, 0, 0, 0, 0, 1);
        const gradient = context.createRadialGradient(0, 0, 0, 0, 0, 1);
        const lobeOpacity = field.opacity * (0.42 - lobe * 0.045);
        shadow.addColorStop(0, `rgba(92,70,59,${lobeOpacity * 0.2})`);
        shadow.addColorStop(0.48, `rgba(166,111,76,${lobeOpacity * 0.11})`);
        shadow.addColorStop(1, "rgba(92,70,59,0)");
        gradient.addColorStop(0, `rgba(255,252,246,${lobeOpacity * 1.18})`);
        gradient.addColorStop(0.2, `rgba(${red},${green},${blue},${lobeOpacity})`);
        gradient.addColorStop(0.48, `rgba(${red},${green},${blue},${lobeOpacity * 0.55})`);
        gradient.addColorStop(0.72, `rgba(${red},${green},${blue},${lobeOpacity * 0.18})`);
        gradient.addColorStop(1, `rgba(${red},${green},${blue},0)`);

        context.save();
        context.translate(lobeX, lobeY);
        context.scale(lobeRadiusX, lobeRadiusY);
        context.fillStyle = shadow;
        context.beginPath();
        context.arc(0.08, 0.15, 1.08, 0, Math.PI * 2);
        context.fill();
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(-0.08, -0.1, 1, 0, Math.PI * 2);
        context.fill();
        context.restore();
      }
      context.restore();
    };

    const drawBeam = (
      time: number,
      offset: number,
      thickness: number,
      opacity: number,
      speed: number,
    ) => {
      const travel = Math.sin(time * speed + offset * 8) * height * 0.025;
      const startX = -width * 0.12;
      const startY = height * (0.08 + offset) + travel;
      const endX = width * 1.12;
      const endY = height * (0.48 + offset * 0.42) + travel;
      const bend = Math.sin(time * speed * 0.7 + offset * 11) * thickness * 0.18;
      const gradient = context.createLinearGradient(startX, startY, endX, endY);
      gradient.addColorStop(0, "rgba(255,252,246,0)");
      gradient.addColorStop(0.18, `rgba(255,250,240,${opacity * 0.3})`);
      gradient.addColorStop(0.52, `rgba(224,203,177,${opacity})`);
      gradient.addColorStop(0.78, `rgba(180,132,101,${opacity * 0.3})`);
      gradient.addColorStop(1, "rgba(166,111,76,0)");

      context.save();
      context.filter = `blur(${compact ? 10 : 18}px)`;
      context.shadowColor = `rgba(92,70,59,${opacity * 0.18})`;
      context.shadowBlur = compact ? 12 : 24;
      context.fillStyle = gradient;
      context.beginPath();
      context.moveTo(startX, startY - thickness * 0.66);
      context.bezierCurveTo(
        width * 0.25,
        startY - thickness + bend,
        width * 0.68,
        endY - thickness * 0.42 - bend,
        endX,
        endY - thickness * 0.16,
      );
      context.bezierCurveTo(
        width * 0.72,
        endY + thickness * 0.36 + bend,
        width * 0.22,
        startY + thickness * 0.82 - bend,
        startX,
        startY + thickness * 0.66,
      );
      context.closePath();
      context.fill();

      context.filter = `blur(${compact ? 3 : 6}px)`;
      context.shadowBlur = 0;
      context.globalAlpha = 0.5;
      context.beginPath();
      context.moveTo(startX, startY - thickness * 0.08);
      context.bezierCurveTo(
        width * 0.3,
        startY - thickness * 0.2 + bend,
        width * 0.7,
        endY - thickness * 0.1 - bend,
        endX,
        endY,
      );
      context.bezierCurveTo(
        width * 0.66,
        endY + thickness * 0.09,
        width * 0.28,
        startY + thickness * 0.14,
        startX,
        startY + thickness * 0.08,
      );
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
      context.globalCompositeOperation = "multiply";
      drawBeam(time, 0.04, height * 0.12, 0.18, 0.07);
      context.globalCompositeOperation = "soft-light";
      drawBeam(time, 0.18, height * 0.052, 0.3, 0.09);
      drawBeam(time, 0.3, height * 0.018, 0.42, 0.11);
      if (!compact) {
        drawBeam(time, 0.38, height * 0.009, 0.38, 0.08);
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

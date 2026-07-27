import type { SyntheticEvent } from "react";

const SAMPLE_SIZE = 18;

function averageEdge(pixels: Uint8ClampedArray, points: Array<[number, number]>) {
  const total = points.reduce(
    (sum, [x, y]) => {
      const offset = (y * SAMPLE_SIZE + x) * 4;
      sum[0] += pixels[offset];
      sum[1] += pixels[offset + 1];
      sum[2] += pixels[offset + 2];
      return sum;
    },
    [0, 0, 0],
  );

  return total.map((channel) => Math.round(channel / points.length));
}

function asRgb(color: number[]) {
  return `rgb(${color[0]} ${color[1]} ${color[2]})`;
}

export function setImageEdgeGlow(event: SyntheticEvent<HTMLImageElement>) {
  const image = event.currentTarget;
  const glow = image.closest<HTMLElement>(".case-image-glow");
  if (!glow) return;

  const canvas = document.createElement("canvas");
  canvas.width = SAMPLE_SIZE;
  canvas.height = SAMPLE_SIZE;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return;

  try {
    context.drawImage(image, 0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
    const pixels = context.getImageData(0, 0, SAMPLE_SIZE, SAMPLE_SIZE).data;
    const range = Array.from({ length: SAMPLE_SIZE }, (_, index) => index);
    const top = averageEdge(
      pixels,
      range.map((x) => [x, 0]),
    );
    const right = averageEdge(
      pixels,
      range.map((y) => [SAMPLE_SIZE - 1, y]),
    );
    const bottom = averageEdge(
      pixels,
      range.map((x) => [x, SAMPLE_SIZE - 1]),
    );
    const left = averageEdge(
      pixels,
      range.map((y) => [0, y]),
    );

    glow.style.setProperty("--image-glow-top", asRgb(top));
    glow.style.setProperty("--image-glow-right", asRgb(right));
    glow.style.setProperty("--image-glow-bottom", asRgb(bottom));
    glow.style.setProperty("--image-glow-left", asRgb(left));
  } catch {
    // The warm neutral CSS fallback remains when browser canvas access is unavailable.
  }
}

import type { CSSProperties } from "react";

const leaves = [
  { x: 6, delay: -3, duration: 16, drift: 190, size: 18 },
  { x: 15, delay: -11, duration: 21, drift: 235, size: 24 },
  { x: 27, delay: -6, duration: 18, drift: 175, size: 16 },
  { x: 39, delay: -15, duration: 23, drift: 260, size: 21 },
  { x: 51, delay: -1, duration: 19, drift: 210, size: 15 },
  { x: 62, delay: -9, duration: 22, drift: 250, size: 23 },
  { x: 73, delay: -17, duration: 25, drift: 280, size: 17 },
  { x: 84, delay: -5, duration: 20, drift: 205, size: 20 },
  { x: 93, delay: -13, duration: 24, drift: 245, size: 14 },
];

export function FallingLeaves() {
  return (
    <div className="falling-leaves" aria-hidden="true">
      {leaves.map((leaf, index) => (
        <span
          className={`falling-leaves__leaf falling-leaves__leaf--${(index % 3) + 1}`}
          key={`${leaf.x}-${leaf.delay}`}
          style={
            {
              "--leaf-x": `${leaf.x}%`,
              "--leaf-delay": `${leaf.delay}s`,
              "--leaf-duration": `${leaf.duration}s`,
              "--leaf-drift": `${leaf.drift}px`,
              "--leaf-drift-mid": `${Math.round(leaf.drift * 0.42)}px`,
              "--leaf-size": `${leaf.size}px`,
            } as CSSProperties
          }
        >
          <svg viewBox="0 0 28 44">
            <path d="M14 41C5 32 2 21 6 12C8 7 12 4 18 2C23 11 24 20 20 28C18 33 16 37 14 41Z" />
            <path d="M8 31C12 25 15 18 18 8" />
          </svg>
        </span>
      ))}
    </div>
  );
}

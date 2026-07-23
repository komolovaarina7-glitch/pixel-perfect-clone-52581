import slivnicaCastleLineArt from "@/assets/slivnica-line-art.png";
import bauskasLineArt from "@/assets/bauskas-line-art.png";

interface CastleLineDrawingProps {
  variant?: "slivnica" | "bauskas";
}

export function CastleLineDrawing({ variant = "slivnica" }: CastleLineDrawingProps) {
  const isBauskas = variant === "bauskas";
  const imageSrc = isBauskas ? bauskasLineArt : slivnicaCastleLineArt;
  const maskId = isBauskas ? "bauskas-live-drawing-mask" : "slivnica-live-drawing-mask";

  return (
    <div
      className={`castle-line-drawing ${isBauskas ? "castle-line-drawing--bauskas" : ""}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1536 1024" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="castle-brush-softness" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
          <mask id={maskId}>
            <rect width="1536" height="1024" fill="black" />
            <g
              fill="none"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#castle-brush-softness)"
            >
              <path
                className="castle-draw-stroke castle-draw-stroke--1"
                pathLength="1"
                strokeWidth="185"
                d="M34 710 C170 560 280 460 420 360 S700 250 930 255 1220 220 1480 150"
              />
              <path
                className="castle-draw-stroke castle-draw-stroke--2"
                pathLength="1"
                strokeWidth="235"
                d="M20 855 C170 790 300 710 440 640 S690 550 930 535"
              />
              <path
                className="castle-draw-stroke castle-draw-stroke--2b"
                pathLength="1"
                strokeWidth="240"
                d="M245 525 C480 470 725 455 970 470 S1240 500 1490 455"
              />
              <path
                className="castle-draw-stroke castle-draw-stroke--3"
                pathLength="1"
                strokeWidth="230"
                d="M360 775 C610 720 840 700 1085 705 S1310 730 1485 760"
              />
              <path
                className="castle-draw-stroke castle-draw-stroke--4"
                pathLength="1"
                strokeWidth="190"
                d="M385 910 C650 875 895 875 1155 895 S1360 900 1495 885"
              />
              <path
                className="castle-draw-stroke castle-draw-stroke--5"
                pathLength="1"
                strokeWidth="235"
                d="M1322 875 C1310 690 1322 500 1340 330 S1365 145 1395 65"
              />
            </g>
          </mask>
        </defs>
        <image
          href={imageSrc}
          width="1536"
          height="1024"
          preserveAspectRatio="xMidYMid meet"
          mask={`url(#${maskId})`}
        />
      </svg>
    </div>
  );
}

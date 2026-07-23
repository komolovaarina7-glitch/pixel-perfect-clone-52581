export function MountainLineDrawing() {
  return (
    <div className="mountain-line-drawing" aria-hidden="true">
      <svg viewBox="0 0 1920 620" preserveAspectRatio="none">
        <g className="mountain-line-drawing__ridge mountain-line-drawing__ridge--far">
          <path
            pathLength="1"
            d="M-90 318 C40 264 130 250 238 302 C340 350 424 340 500 266 L590 170 Q610 148 635 170 L780 224 C884 315 956 390 1042 328 C1134 262 1208 250 1280 286 L1320 314 C1408 360 1490 348 1570 290 L1660 218 Q1680 202 1702 220 L1850 282 C1905 335 1950 330 2010 292"
          />
        </g>
        <g className="mountain-line-drawing__ridge mountain-line-drawing__ridge--middle">
          <path
            pathLength="1"
            d="M-100 430 C40 356 150 346 270 404 C380 456 468 442 548 370 L650 282 Q670 262 692 282 L856 364 C952 460 1045 446 1142 360 C1226 286 1304 280 1372 338 L1428 378 C1518 465 1610 452 1682 390 L1772 310 Q1794 290 1818 310 L2018 390"
          />
        </g>
        <g className="mountain-line-drawing__ridge mountain-line-drawing__ridge--near">
          <path
            pathLength="1"
            d="M-110 540 C36 460 158 448 286 508 C398 562 496 548 586 480 L690 396 Q714 376 738 398 L914 480 C1018 575 1118 558 1200 488 L1302 398 Q1328 376 1352 400 L1528 484 C1626 574 1730 552 1804 480 L1870 418 Q1892 398 1916 420 L2025 474"
          />
        </g>
      </svg>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatedHeroBackground } from "@/components/site/AnimatedHeroBackground";
import { AnimatedHeroTitle } from "@/components/site/AnimatedHeroTitle";
import { BackToHome } from "@/components/site/BackToHome";
import { useLanguage, withoutTerminalDots } from "@/i18n";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services - REPOSITION LAB" },
      {
        name: "description",
        content:
          "Rapid Asset Recovery, Portfolio Screening, Full Repositioning & Packaging, Distressed Heritage and Digital Structuring Readiness.",
      },
      { property: "og:title", content: "Services - REPOSITION LAB" },
      {
        property: "og:description",
        content: "Five disciplines of strategic real estate recovery.",
      },
    ],
  }),
  component: Services,
});

function Services() {
  const { t, l } = useLanguage();

  return (
    <article className="services-flow-background">
      <svg
        className="services-wave-flow"
        viewBox="0 0 2400 1800"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="services-wave-cream" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fbfaf7" stopOpacity="0" />
            <stop offset="24%" stopColor="#f7f0e7" stopOpacity="0.7" />
            <stop offset="52%" stopColor="#ecdcca" stopOpacity="0.48" />
            <stop offset="76%" stopColor="#fbfaf7" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#fbfaf7" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="services-wave-sand" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fbfaf7" stopOpacity="0" />
            <stop offset="28%" stopColor="#f3e8da" stopOpacity="0.5" />
            <stop offset="56%" stopColor="#e2ccb2" stopOpacity="0.34" />
            <stop offset="78%" stopColor="#c8a178" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#fbfaf7" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="services-wave-light" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fbfaf7" stopOpacity="0" />
            <stop offset="36%" stopColor="#f7f0e7" stopOpacity="0.52" />
            <stop offset="64%" stopColor="#f3e8da" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#fbfaf7" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="services-wave-bronze" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fbfaf7" stopOpacity="0" />
            <stop offset="32%" stopColor="#ecdcca" stopOpacity="0.34" />
            <stop offset="58%" stopColor="#d5b392" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#fbfaf7" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="services-wave-veil" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fbfaf7" stopOpacity="0" />
            <stop offset="44%" stopColor="#f7f0e7" stopOpacity="0.42" />
            <stop offset="72%" stopColor="#e2ccb2" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#fbfaf7" stopOpacity="0" />
          </linearGradient>
        </defs>

        <g className="services-wave-track services-wave-track-a">
          <path
            d="M-620 280 C-270 166 70 402 450 286 C820 174 1100 404 1480 286 C1840 174 2130 406 2500 286 C2860 178 3140 388 3440 292 L3440 560 C3060 656 2780 460 2440 552 C2080 654 1780 450 1430 552 C1070 654 780 456 430 552 C70 656 -260 462 -620 554 Z"
            fill="url(#services-wave-cream)"
          />
        </g>
        <g className="services-wave-track services-wave-track-d">
          <path
            d="M-700 520 C-330 432 10 608 360 528 C740 440 1020 612 1390 524 C1780 430 2030 604 2420 518 C2830 428 3120 594 3480 522 L3480 760 C3100 828 2810 682 2420 760 C2020 842 1750 680 1370 760 C990 842 720 686 350 760 C-10 836 -330 688 -700 762 Z"
            fill="url(#services-wave-bronze)"
          />
        </g>
        <g className="services-wave-track services-wave-track-b">
          <path
            d="M-660 830 C-310 696 20 952 410 824 C790 700 1080 956 1460 824 C1840 694 2140 950 2530 824 C2920 696 3170 934 3440 830 L3440 1115 C3060 1222 2780 1004 2460 1102 C2080 1218 1780 998 1450 1102 C1090 1214 790 1002 420 1102 C60 1206 -280 1004 -660 1104 Z"
            fill="url(#services-wave-sand)"
          />
        </g>
        <g className="services-wave-track services-wave-track-e">
          <path
            d="M-580 1060 C-190 958 130 1136 520 1062 C880 994 1160 1140 1530 1060 C1900 978 2190 1132 2580 1060 C2920 998 3150 1122 3380 1064 L3380 1278 C3040 1344 2820 1230 2560 1290 C2180 1374 1900 1226 1530 1294 C1160 1362 890 1234 520 1292 C150 1352 -190 1230 -580 1296 Z"
            fill="url(#services-wave-veil)"
          />
        </g>
        <g className="services-wave-track services-wave-track-c">
          <path
            d="M-560 1430 C-210 1328 130 1540 520 1434 C880 1334 1160 1538 1530 1432 C1900 1330 2200 1534 2580 1430 C2960 1328 3180 1514 3400 1436 L3400 1635 C3040 1718 2800 1568 2520 1640 C2140 1736 1880 1564 1530 1640 C1160 1718 890 1570 520 1640 C150 1710 -200 1570 -560 1640 Z"
            fill="url(#services-wave-light)"
          />
        </g>
      </svg>
      <BackToHome />
      <header className="services-hero standard-page-hero standard-page-hero-content container-rl">
        <AnimatedHeroBackground className="services-hero-lights" />
        <div className="services-hero-content">
          <p className="internal-hero-eyebrow eyebrow text-accent">{l(t.services.eyebrow)}</p>
          <h1 className="standard-page-hero-title mobile-safe-text serif mt-6 max-w-4xl text-foreground">
            <AnimatedHeroTitle>{withoutTerminalDots(l(t.services.title))}</AnimatedHeroTitle>
          </h1>
          <div className="internal-hero-subtitle services-intro">
            {t.services.intro.map((paragraph, index) => (
              <p key={paragraph.en} className={index === 0 ? "services-intro-lead" : undefined}>
                {l(paragraph)}
              </p>
            ))}
          </div>
        </div>
      </header>

      <section className="services-dossier">
        <div className="container-rl services-dossier-shell max-w-6xl">
          {t.services.items.map((service) => (
            <section
              key={service.title.en}
              className="services-dossier-row grid gap-6 md:grid-cols-12 md:gap-8"
            >
              <div className="services-dossier-heading md:col-span-5">
                <h2 className="mobile-safe-text serif">{l(service.title)}</h2>
              </div>
              <div className="services-dossier-copy md:col-span-7">
                <p className="services-dossier-thesis mobile-safe-text">{l(service.support)}</p>
                <div className="services-dossier-body">
                  <p>{l(service.body)}</p>
                  <p>{l(service.detail)}</p>
                </div>
              </div>
            </section>
          ))}
        </div>
      </section>

      <div className="services-closing">
        <section className="services-closing-section">
          <div className="container-rl max-w-6xl services-closing-grid">
            <h2 className="mobile-safe-text serif services-closing-title">
              {l(t.services.valuationTitle)}
            </h2>
            <div className="services-closing-copy">
              {t.services.valuation.map((paragraph) => (
                <p key={paragraph.en}>{l(paragraph)}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="services-closing-section">
          <div className="container-rl max-w-6xl services-closing-grid">
            <h2 className="mobile-safe-text serif services-closing-title">
              {l(t.services.mandateTitle)}
            </h2>
            <div className="services-closing-copy services-closing-copy--emphasis">
              {t.services.mandate.map((paragraph) => (
                <p key={paragraph.en}>{l(paragraph)}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="services-closing-action">
          <div className="container-rl text-center">
            <Link
              to="/submit"
              className="premium-action px-7 py-3.5 text-[12px] tracking-[0.18em] uppercase"
            >
              {l(t.common.submitAnAsset)}
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}

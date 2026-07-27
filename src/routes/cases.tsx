import { createFileRoute, Link } from "@tanstack/react-router";
import { BackToHome } from "@/components/site/BackToHome";
import { cases } from "@/data/cases";
import { useLanguage, withoutTerminalDots } from "@/i18n";
import {
  blurCaseSpotlight,
  clearCaseSpotlight,
  focusCaseSpotlight,
  updateCaseSpotlight,
} from "@/lib/caseSpotlight";

export const Route = createFileRoute("/cases")({
  head: () => ({
    meta: [
      { title: "Transformation Intelligence Cases — REPOSITION LAB" },
      {
        name: "description",
        content:
          "Selected repositioning theses across heritage, industrial, urban and lifestyle real estate.",
      },
      { property: "og:title", content: "Transformation Intelligence Cases" },
      {
        property: "og:description",
        content:
          "Selected repositioning theses across heritage, industrial and special-situation real estate.",
      },
      { property: "og:image", content: cases[0].img },
    ],
  }),
  component: Cases,
});

function Cases() {
  const { t, l } = useLanguage();
  const visibleCases = cases.filter(
    (caseStudy) => caseStudy.slug !== "industrial-heritage-slovenia",
  );

  return (
    <article className="cases-page">
      <section className="cases-hero standard-page-hero">
        <div className="cases-hero-bg" aria-hidden="true">
          <span className="cases-hero-orb cases-hero-orb--1" />
          <span className="cases-hero-orb cases-hero-orb--2" />
          <span className="cases-hero-ribbon cases-hero-ribbon--1" />
          <span className="cases-hero-ribbon cases-hero-ribbon--2" />
          <span className="cases-hero-ribbon cases-hero-ribbon--3" />
          <span className="cases-hero-flare cases-hero-flare--1" />
          <span className="cases-hero-flare cases-hero-flare--2" />
          <div className="cases-hero-linework">
            <svg viewBox="0 0 760 520" role="presentation" focusable="false">
              <circle cx="560" cy="260" r="214" />
              <circle cx="560" cy="260" r="122" />
              <path d="M560 46 A214 214 0 0 1 744 151" />
              <path d="M68 462 C246 270 386 178 724 64" />
              <path d="M106 94 C270 210 430 286 756 306" />
              <path d="M362 518 L714 26" />
              <line x1="560" y1="0" x2="560" y2="520" />
              <line x1="104" y1="260" x2="760" y2="260" />
            </svg>
          </div>
        </div>

        <BackToHome />
        <header className="container-rl cases-hero-content">
          <p className="eyebrow text-accent page-reveal page-reveal-delay-1">
            {l(t.cases.eyebrow)}
          </p>
          <h1 className="standard-page-hero-title mobile-safe-text serif mt-6 max-w-4xl text-foreground page-reveal page-reveal-delay-2">
            {withoutTerminalDots(l(t.cases.title))}
          </h1>
          <p className="mt-8 max-w-2xl text-foreground/75 text-lg leading-relaxed page-reveal page-reveal-delay-3">
            {l(t.cases.intro)}
          </p>
        </header>
      </section>

      <section>
        <div className="container-rl space-y-px">
          {visibleCases.map((c, i) => (
            <Link
              key={c.slug}
              to="/cases/$slug"
              params={{ slug: c.slug }}
              className="case-spotlight case-spotlight--feature group grid gap-10 border-t border-rule py-12 transition-colors hover:border-accent md:grid-cols-12"
              onPointerEnter={updateCaseSpotlight}
              onPointerMove={updateCaseSpotlight}
              onPointerLeave={clearCaseSpotlight}
              onFocus={focusCaseSpotlight}
              onBlur={blurCaseSpotlight}
            >
              <div className={`md:col-span-6 ${i % 2 ? "md:order-2" : ""}`}>
                <div className="aspect-[4/3] overflow-hidden border border-rule transition-colors group-hover:border-accent">
                  <img
                    src={c.img}
                    alt={l(c.title)}
                    loading="lazy"
                    width={1280}
                    height={960}
                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                    style={c.imgPosition ? { objectPosition: c.imgPosition } : undefined}
                  />
                </div>
              </div>
              <div className="md:col-span-6 space-y-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                  <h2 className="mobile-safe-text serif text-2xl md:text-3xl text-foreground group-hover:text-accent transition-colors">
                    {l(c.title)}
                  </h2>
                  <span className="eyebrow mobile-safe-text text-accent sm:whitespace-nowrap">
                    {l(c.theme)}
                  </span>
                </div>
                <div>
                  <p className="eyebrow text-accent">{l(t.cases.assetChallenge)}</p>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{l(c.challenge)}</p>
                </div>
                <div>
                  <p className="eyebrow text-accent">{l(t.cases.logic)}</p>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{l(c.logic)}</p>
                </div>
                <div>
                  <p className="eyebrow text-accent">{l(t.cases.direction)}</p>
                  <p className="mt-2 text-foreground/85 leading-relaxed">{l(c.direction)}</p>
                </div>
                <p className="text-[11px] tracking-[0.18em] uppercase text-accent">
                  {l(t.common.readCase)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-24">
        <div className="container-rl text-center">
          <Link
            to="/submit"
            className="premium-action px-7 py-3.5 text-[12px] tracking-[0.18em] uppercase"
          >
            {l(t.cases.submit)}
          </Link>
        </div>
      </section>
    </article>
  );
}

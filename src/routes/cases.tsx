import { createFileRoute, Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { BackToHome } from "@/components/site/BackToHome";
import { cases } from "@/data/cases";
import { useLanguage, withoutTerminalDots } from "@/i18n";
import { setImageEdgeGlow } from "@/lib/imageEdgeGlow";

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

function CasesHeadline({ children }: { children: string }) {
  let letterIndex = 0;

  return (
    <span aria-label={children}>
      {children.split(/(\s+)/).map((part, partIndex) => {
        if (/^\s+$/.test(part)) {
          return <span key={`space-${partIndex}`}> </span>;
        }

        return (
          <span aria-hidden="true" className="cases-hero-word" key={`${part}-${partIndex}`}>
            {Array.from(part).map((character) => {
              const currentIndex = letterIndex++;
              return (
                <span
                  className="cases-hero-letter"
                  key={`${character}-${currentIndex}`}
                  style={{ "--letter-index": currentIndex } as CSSProperties}
                >
                  {character}
                </span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}

function Cases() {
  const { t, l } = useLanguage();
  const visibleCases = cases.filter(
    (caseStudy) => caseStudy.slug !== "industrial-heritage-slovenia",
  );

  return (
    <article className="cases-page">
      <section className="cases-hero standard-page-hero">
        <div className="cases-hero-bg" aria-hidden="true">
          <span className="cases-hero-light cases-hero-light--1" />
          <span className="cases-hero-light cases-hero-light--2" />
          <span className="cases-hero-light cases-hero-light--3" />
          <span className="cases-hero-light cases-hero-light--4" />
          <span className="cases-hero-light cases-hero-light--5" />
          <span className="cases-hero-light cases-hero-light--6" />
        </div>

        <BackToHome />
        <header className="container-rl cases-hero-content">
          <p className="cases-hero-eyebrow eyebrow">{l(t.cases.eyebrow)}</p>
          <h1 className="cases-hero-title mobile-safe-text serif">
            <CasesHeadline>{withoutTerminalDots(l(t.cases.title))}</CasesHeadline>
          </h1>
          <p className="cases-hero-intro">{l(t.cases.intro)}</p>
        </header>
      </section>

      <section>
        <div className="container-rl space-y-px">
          {visibleCases.map((c, i) => (
            <Link
              key={c.slug}
              to="/cases/$slug"
              params={{ slug: c.slug }}
              className="group grid gap-10 border-t border-rule py-12 transition-colors hover:border-accent md:grid-cols-12"
            >
              <div className={`md:col-span-6 ${i % 2 ? "md:order-2" : ""}`}>
                <div className="case-image-glow">
                  <div className="case-image-frame aspect-[4/3] overflow-hidden border border-rule transition-colors">
                    <img
                      src={c.img}
                      alt={l(c.title)}
                      loading="lazy"
                      width={1280}
                      height={960}
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                      style={c.imgPosition ? { objectPosition: c.imgPosition } : undefined}
                      onLoad={setImageEdgeGlow}
                    />
                  </div>
                </div>
              </div>
              <div className="md:col-span-6 space-y-6">
                <div className="space-y-2">
                  <h2 className="case-card-title mobile-safe-text serif text-2xl md:text-3xl text-foreground group-hover:text-accent transition-colors">
                    {l(c.title)}
                  </h2>
                  <span className="eyebrow mobile-safe-text block text-accent">{l(c.theme)}</span>
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

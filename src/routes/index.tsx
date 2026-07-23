import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatedHeroBackground } from "@/components/site/AnimatedHeroBackground";
import { cases, type CaseStudy } from "@/data/cases";
import { useLanguage } from "@/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "REPOSITION LAB — Strategic Real Estate Repositioning & Recovery Intelligence",
      },
      {
        name: "description",
        content:
          "Strategic recovery and real estate intelligence partner. We help banks, asset holders and institutional owners unlock hidden value in distressed and underutilized assets.",
      },
      {
        property: "og:title",
        content: "REPOSITION LAB",
      },
      {
        property: "og:description",
        content:
          "Strategic repositioning and recovery intelligence for distressed and underutilized real estate.",
      },
    ],
  }),
  component: Home,
});

const previewSlugs = ["slovenia-castle", "bauskas-16a-riga"];

const directionOrder = [
  "/who-we-are",
  "/services",
  "/cases",
  "/approach",
  "/recovery-validation",
  "/selected-thinking",
  "/contact",
  "/submit",
] as const;

function Home() {
  const { t, l } = useLanguage();

  const previewCases = previewSlugs
    .map((slug) => cases.find((caseStudy) => caseStudy.slug === slug))
    .filter((caseStudy): caseStudy is CaseStudy => Boolean(caseStudy));

  const directions = directionOrder
    .map((path) => t.home.directions.find((direction) => direction.to === path))
    .filter((direction): direction is (typeof t.home.directions)[number] => Boolean(direction));

  return (
    <div>
      <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-background">
        <AnimatedHeroBackground />

        <div className="container-rl relative pb-16 pt-32">
          <p className="eyebrow hero-text-reveal hero-text-reveal-eyebrow page-reveal page-reveal-delay-1 text-accent">
            {l(t.home.eyebrow)}
          </p>

          <h1 className="mobile-safe-text serif hero-text-reveal hero-text-reveal-headline page-reveal page-reveal-delay-2 mt-5 max-w-4xl text-3xl leading-[1.05] text-foreground md:text-5xl lg:text-6xl">
            {l(t.home.headlineStart)}{" "}
            <em className="not-italic text-accent">{l(t.home.headlineEm)}</em>
          </h1>

          <p className="hero-text-reveal hero-text-reveal-subtitle page-reveal page-reveal-delay-3 mt-6 max-w-xl text-sm leading-relaxed text-foreground/75 md:text-base">
            {l(t.home.intro)}
          </p>
        </div>
      </section>

      <section className="home-value-proof">
        <div className="container-rl home-value-proof-shell">
          <div className="home-value-proof-intro">
            <h2 className="mobile-safe-text serif home-value-proof-thesis">
              {l(t.home.valueProof.thesis)}
            </h2>
            <p className="mobile-safe-text home-value-proof-explanation">
              {l(t.home.valueProof.explanation)}
            </p>
          </div>

          <div className="home-value-proof-directions">
            {t.home.valueProof.directions.map((direction) => (
              <div className="home-value-proof-direction" key={direction.title.en}>
                <h3 className="mobile-safe-text serif">{l(direction.title)}</h3>
                <p className="mobile-safe-text">{l(direction.text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-rule py-20">
        <div className="container-rl">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="serif mt-3 max-w-2xl text-2xl text-foreground md:text-4xl">
                {l(t.home.directionTitle)}
              </h2>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {directions.map((direction) => {
              const title =
                direction.to === "/recovery-validation"
                  ? {
                      en: "Potential Review",
                      ru: "Оценка потенциала",
                    }
                  : direction.title;

              return (
                <Link
                  key={direction.to}
                  to={direction.to}
                  className="homepage-hub-card group flex min-h-[190px] flex-col p-6 sm:min-h-[210px] md:p-7"
                >
                  <div className="flex items-start justify-between gap-5">
                    <h3 className="mobile-safe-text serif min-w-0 text-2xl text-foreground transition-colors group-hover:text-accent md:text-[30px] md:leading-tight">
                      {l(title)}
                    </h3>

                    <span className="shrink-0 pt-1 text-[10px] uppercase tracking-[0.18em] text-accent/80 transition-colors group-hover:text-accent">
                      {l(t.common.open)}
                    </span>
                  </div>

                  <p className="mobile-safe-text mt-auto pt-8 text-base leading-relaxed text-muted-foreground md:text-[17px]">
                    {l(direction.desc)}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="paper py-16">
        <div className="container-rl max-w-3xl">
          <p className="serif text-xl leading-snug text-ink md:text-2xl">{l(t.home.position)}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-rl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-accent">{l(t.home.selectedCasesLabel)}</p>

              <h2 className="mobile-safe-text serif mt-3 text-2xl text-foreground md:text-3xl">
                {l(t.home.selectedCasesTitle)}
              </h2>
            </div>

            <Link
              to="/cases"
              className="premium-action px-4 py-2 text-[11px] uppercase tracking-[0.18em]"
            >
              {l(t.common.viewAllCases)}
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {previewCases.map((caseStudy) => (
              <Link
                key={caseStudy.slug}
                to="/cases/$slug"
                params={{ slug: caseStudy.slug }}
                className="group block"
              >
                <div className="aspect-[4/3] overflow-hidden border border-rule bg-muted">
                  <img
                    src={caseStudy.img}
                    alt={l(caseStudy.title)}
                    loading="lazy"
                    width={1280}
                    height={960}
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                  />
                </div>

                <div className="mt-4 flex items-baseline justify-between gap-3">
                  <h3 className="mobile-safe-text serif text-lg text-foreground">
                    {l(caseStudy.title)}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-rule py-20">
        <div className="container-rl max-w-2xl text-center">
          <p className="eyebrow text-accent">{l(t.home.confidential)}</p>

          <h2 className="serif mt-5 text-2xl leading-tight text-foreground md:text-3xl">
            {l(t.home.ctaTitle)}
          </h2>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/submit"
              className="premium-action px-6 py-3 text-[11px] uppercase tracking-[0.18em]"
            >
              {l(t.common.submitAnAsset)}
            </Link>

            <Link
              to="/contact"
              className="premium-action px-6 py-3 text-[11px] uppercase tracking-[0.18em]"
            >
              {l(t.common.contact)}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
